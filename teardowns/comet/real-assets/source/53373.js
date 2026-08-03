// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { addBreadcrumb, browserTracingIntegration, captureException, captureMessage, init, setContext, setExtra, setUser, } from "@sentry/browser";
import { captureError } from "./capture_error.js";
import { has } from "./has.js";
const chance = (luck) => Math.random() < luck;
const isObject = (value) => typeof value === "object";
const hasDetailedContext = (context) => isObject(context);
const getSeverityFromErrorLevel = (errorLevel) => errorLevel;
const createSamplingRule = (ruleDefinition) => {
    if (ruleDefinition.exactMessage) {
        const { sampleRate, exactMessage } = ruleDefinition;
        return {
            sampleRate,
            test: (message) => message === exactMessage,
        };
    }
    if (ruleDefinition.matchMessage) {
        const { sampleRate, matchMessage } = ruleDefinition;
        const args = typeof matchMessage === "string"
            ? [matchMessage]
            : matchMessage;
        const regexp = new RegExp(...args);
        return {
            sampleRate,
            test: (message) => regexp.test(message),
        };
    }
    throw new Error("Unexpected rule definition");
};
const getErrorIdFromHint = (hint) => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const exception = hint.originalException || hint.syntheticException;
    const isExcObject = typeof exception === "object" && exception !== null;
    const stack = isExcObject && has(exception, "stack") && exception.stack;
    if (stack)
        return stack;
    const isExcString = typeof exception === "string";
    if (isExcString)
        return exception;
    if (isExcObject && has(exception, "message"))
        return exception.message;
    captureError(new Error("Couldn't get stack or message from error hint"));
    return "unknown";
};
const DEFAULT_CONFIG = {
    sampleRate: 1,
    tracesSampleRateUI: 0.002,
    tracesSampleRateBackground: 0.006,
    rules: [],
};
var SampleRate;
(function (SampleRate) {
    SampleRate[SampleRate["ALWAYS"] = 1] = "ALWAYS";
    SampleRate[SampleRate["NEVER"] = 0] = "NEVER";
    SampleRate[SampleRate["NOT_DEFINED"] = -1] = "NOT_DEFINED";
})(SampleRate || (SampleRate = {}));
export class Sentry {
    dsn;
    rules;
    sampleRate;
    tracesSampleRateUI;
    tracesSampleRateBackground;
    options;
    #reportedErrorIds = new Set();
    constructor(dsn, rules, sampleRate, tracesSampleRateUI, tracesSampleRateBackground, options) {
        this.dsn = dsn;
        this.rules = rules;
        this.sampleRate = sampleRate;
        this.tracesSampleRateUI = tracesSampleRateUI;
        this.tracesSampleRateBackground = tracesSampleRateBackground;
        this.options = options;
        if (this.dsn !== "") {
            this.#initSentry();
        }
    }
    static build(dsn, options) {
        if (options.isDebugMode) {
            return new Sentry(dsn, [], SampleRate.ALWAYS, SampleRate.ALWAYS, SampleRate.ALWAYS, options);
        }
        const configToUse = DEFAULT_CONFIG;
        return new Sentry(dsn, configToUse.rules, configToUse.sampleRate, configToUse.tracesSampleRateUI, configToUse.tracesSampleRateBackground, options);
    }
    addBreadcrumb = addBreadcrumb;
    captureException = captureException;
    captureMessage = captureMessage;
    setExtra = setExtra;
    setContext = setContext;
    setTracesSampleRateUI(value = DEFAULT_CONFIG.tracesSampleRateUI) {
        this.tracesSampleRateUI = value;
    }
    setTracesSampleRateBackground(value = DEFAULT_CONFIG.tracesSampleRateBackground) {
        this.tracesSampleRateBackground = value;
    }
    setSampleRate(value = DEFAULT_CONFIG.sampleRate) {
        this.sampleRate = value;
    }
    setRules(rules = []) {
        this.rules = rules.map(createSamplingRule);
    }
    setBrowserVersion(version) {
        this.setContext("browser", {
            name: "Comet",
            version,
        });
    }
    setOsInfo(name, version) {
        this.setContext("os", {
            name,
            version,
        });
    }
    setMachineId(machineId) {
        setUser({
            id: machineId,
        });
    }
    #initSentry() {
        const tags = {
            version: this.#getVersion(),
            type: this.options.type,
        };
        if (this.options.service) {
            tags['service'] = this.options.service;
        }
        init({
            dsn: this.dsn,
            release: this.#getVersion(),
            environment: this.options.environment || "development",
            initialScope: {
                tags,
            },
            beforeSend: this.#onBeforeSend.bind(this),
            beforeBreadcrumb: this.#onBeforeBreadcrumb.bind(this),
            integrations: [browserTracingIntegration()],
            tracesSampler: () => this.#getTracesSampleRate(),
            ignoreErrors: [
                /**
                 * Ignore standard network errors
                 * @see https://github.com/getsentry/sentry/issues/12676
                 */
                "Network request failed",
                "Failed to fetch",
                "NetworkError",
                "withrealtime/messaging",
                /**
                 * Ignore browser error with lowest priority
                 * @see https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
                 */
                "ResizeObserver loop limit exceeded",
                /**
                 * Unhandled errors from framework
                 * @see https://sentry.io/organizations/pushplaylabs/issues/1558515250/
                 */
                "not-requested",
                /**
                 * Don't send non informative rejection (without stack trace)
                 * @see https://sentry.io/organizations/pushplaylabs/issues/1541511507/
                 */
                "Non-Error promise rejection captured with keys",
                /**
                 * Ignore errors of tab modifying when it is already closed
                 * @see https://sentry.io/organizations/pushplaylabs/issues/1677513775/
                 */
                "The tab was closed.",
                /**
                 * @see https://sentry.io/organizations/pushplaylabs/issues/1985568693/
                 */
                "The browser is shutting down.",
                /**
                 * @see https://sentry.io/organizations/pushplaylabs/issues/2010746514/
                 */
                "The extensions gallery cannot be scripted.",
                /**
                 * @see https://sentry.io/organizations/pushplaylabs/issues/1809996211/
                 */
                "Extension context invalidated.",
            ],
            transportOptions: {
                fetchOptions: {
                    keepalive: this.options.keepalive,
                },
            },
        });
    }
    /**
     * Calculates error sampling rate. The docs: @see https://docs.sentry.io/platforms/javascript/configuration/sampling/#sampling-error-events.
     * @param hint - May contain additional information about the original error or message.
     * @returns a number between 0 and 1 representing a chance of an event to be sent to sentry.
     *          For dev environment the rate is always 0.
     */
    #getSampleRate(hint) {
        const exception = hint?.originalException;
        const isExcObject = typeof exception === "object" && exception !== null;
        const message = typeof exception === "string"
            ? exception
            : isExcObject &&
                has(exception, "message") &&
                exception.message;
        const universalRate = this.#getUniversalRate();
        if (universalRate !== SampleRate.NOT_DEFINED)
            return universalRate;
        // Let's send it "as is" in this case
        if (!message)
            return SampleRate.ALWAYS;
        const matchingRule = this.rules.find((rule) => rule.test(message));
        if (matchingRule) {
            return this.sampleRate * matchingRule.sampleRate;
        }
        return this.sampleRate;
    }
    /**
     * Calculates trace sampling rate. The docs: @see https://docs.sentry.io/platforms/javascript/configuration/sampling/#sampling-transaction-events
     * @returns a number between 0 and 1 representing a chance of an event to be sent to sentry.
     *          For dev environment the rate is always 0.
     */
    #getTracesSampleRate() {
        const universalRate = this.#getUniversalRate();
        if (universalRate !== SampleRate.NOT_DEFINED)
            return universalRate;
        return this.options.type === "UI"
            ? this.tracesSampleRateUI
            : this.tracesSampleRateBackground;
    }
    /**
     * For debug mod - always send data
     * For development but not debug - never send
     * Otherwise - up to rating function for transactions and errors
     */
    #getUniversalRate() {
        if (this.options.isDebugMode)
            return SampleRate.ALWAYS;
        if (this.options.environment !== "production")
            return SampleRate.NEVER;
        return SampleRate.NOT_DEFINED;
    }
    #getVersion() {
        return this.options.version;
    }
    #onBeforeSend(event, hint) {
        const sampleRate = this.#getSampleRate(hint);
        // Skip sending if sampling is enabled
        if (!chance(sampleRate))
            return null;
        // Skip sending duplicate events with same stack/message
        if (hint) {
            const errorId = getErrorIdFromHint(hint);
            if (this.#reportedErrorIds.has(errorId))
                return null;
            this.#reportedErrorIds.add(errorId);
            // should we report some error if hint is missing?
        }
        // Add meta data from context of detailed error
        const exception = hint?.originalException;
        const context = isObject(exception) &&
            has(exception, "context", false) &&
            exception.context;
        if (hasDetailedContext(context)) {
            if (context.isSilent)
                return null;
            if (context.level) {
                event.level = getSeverityFromErrorLevel(context.level);
            }
            if (context.groupId) {
                event.fingerprint = [context.groupId];
            }
            if (context.fingerprint) {
                event.fingerprint = context.fingerprint.slice();
            }
            if (context.extra) {
                event.extra = event.extra
                    ? { ...event.extra, ...context.extra }
                    : context.extra;
            }
            if (context.tags) {
                event.tags = event.tags
                    ? { ...event.tags, ...context.tags }
                    : context.tags;
            }
        }
        if (!event.fingerprint?.length &&
            isObject(exception) &&
            has(exception, "message")) {
            const str = String(exception.message);
            const messageWithoutDynamicParams = str.replace(/\d+/g, "[number]");
            event.fingerprint = [messageWithoutDynamicParams];
        }
        if (event.extra &&
            has(event.extra, "error") &&
            event.extra.error instanceof Error) {
            event.extra = {
                ...event.extra,
                error: {
                    message: event.extra.error.message,
                    stack: event.extra.error.stack,
                    name: event.extra.error.name,
                },
            };
        }
        // Send major version separately to allow searching and filtering
        const [majorReleaseVersion] = this.#getVersion().split(".");
        event.tags = { ...event.tags, majorReleaseVersion };
        return event;
    }
    #onBeforeBreadcrumb(breadcrumb) {
        // Don't send console logs because in the current time effector-logger generates too many logs
        if (breadcrumb.category === "console")
            return null;
        return breadcrumb;
    }
}
