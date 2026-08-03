// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { sendWithPromise } from "//resources/js/cr.js";
import { AnalyticsService } from "//resources/perplexity/libs/analytics/analytics_service.js";
import { captureError } from "//resources/perplexity/libs/capture_error.js";
const BROWSER_ANALYTICS_INITIALISED_PREF = "perplexity.analytics_observer_initialised";
export class OnboardingAnalyticsService {
    #context = {};
    #analyticsService;
    constructor() {
        this.#analyticsService = new AnalyticsService({
            logger: console,
            shouldCollectBasicContextParams: true,
            shouldCollectDynamicContextParams: false,
            isDebugMode: window.PERPLEXITY_ENVIRONMENT !== "production",
            retriesCount: 5,
            flushingIntervalMS: Math.pow(2, 29), // disable auto flushing
            keepalive: true,
            offline: {
                offlineTracker: {
                    addOfflineListener: (listener) => window.addEventListener("offline", listener),
                    addOnlineListener: (listener) => window.addEventListener("online", listener),
                    isOnlineNow: navigator.onLine,
                },
                maxOfflineStoredEvents: 50,
            },
        });
    }
    updateContext(fields) {
        this.#context = { ...this.#context, ...fields };
    }
    async sendAdvanced(event) {
        return this.#sendEvent({
            name: "onboarding step advanced",
            additional: event,
        });
    }
    async sendStarted() {
        return this.#sendEvent({
            name: "onboarding started",
            additional: {
                started_at: Date.now(),
                is_from_dmg: await sendWithPromise("is-running-from-dmg"),
            },
        });
    }
    async sendFinished() {
        const [mode_selected, theme_selected] = await this.#getThemeContext();
        return this.#sendEvent({
            name: "onboarding completed",
            additional: {
                ...this.#context,
                mode_selected,
                theme_selected,
                completed_at: Date.now(),
            },
        }, true);
    }
    async #sendEvent(event, tryToUseBrowser = false) {
        if (!navigator.onLine) {
            return this.#sendOfflineEvent(event);
        }
        if (tryToUseBrowser && (await this.#isAnalyticsReady())) {
            return this.#delegateEventToBrowserAnalytics(event);
        }
        this.#analyticsService.trackEvent(event);
        return this.#analyticsService.flush().catch(captureError);
    }
    /**
     * We can't use local analyticsService for offline mode,
     * because it will be destroyed right after onboarding finished
     * */
    #sendOfflineEvent(event) {
        this.#ensureBrowserAnalyticsReady().then(() => {
            this.#delegateEventToBrowserAnalytics(event);
        });
    }
    #delegateEventToBrowserAnalytics(event) {
        chrome.perplexity.analytics.recordEvent(event.name, JSON.stringify(event.additional));
    }
    async #ensureBrowserAnalyticsReady() {
        const isReady = await this.#isAnalyticsReady();
        if (isReady) {
            return;
        }
        return new Promise((resolve, reject) => {
            const onChangedCallback = (prefs) => {
                const pref = prefs.find((pref) => pref.key === BROWSER_ANALYTICS_INITIALISED_PREF);
                if (!pref)
                    return;
                pref.value ? resolve() : reject();
                chrome.settingsPrivate.onPrefsChanged.removeListener(onChangedCallback);
            };
            chrome.settingsPrivate.onPrefsChanged.addListener(onChangedCallback);
        });
    }
    async #isAnalyticsReady() {
        try {
            return (await chrome.settingsPrivate.getPref(BROWSER_ANALYTICS_INITIALISED_PREF)).value;
        }
        catch (err) {
            return false;
        }
    }
    async #getThemeContext() {
        try {
            return await Promise.all([
                chrome.perplexity.themes.getCurrentThemeSetting(),
                chrome.perplexity.themes.getCurrentColorTheme(chrome.perplexity.themes.Representation.HEX),
            ]);
        }
        catch {
            return [];
        }
    }
}
