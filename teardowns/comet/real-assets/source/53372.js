// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { captureError, setGlobalSentryInstance } from "./capture_error.js";
import { Sentry } from "./sentry.js";
export class SentryConfigurator {
    sentry;
    constructor(sentry) {
        this.sentry = sentry;
        setGlobalSentryInstance(this.sentry);
    }
    static build(dsn, options) {
        const sentry = Sentry.build(dsn, {
            ...options,
            keepalive: true,
        });
        const configurator = new SentryConfigurator(sentry);
        configurator.#init().catch(captureError);
        chrome.settingsPrivate
            .getPref("perplexity.metrics_allowed")
            .then((pref) => {
            sentry.setSampleRate(pref.value ? 1 : 0);
        });
        chrome.settingsPrivate.onPrefsChanged.addListener((changes) => {
            const pref = changes.find((change) => change.key === "perplexity.metrics_allowed");
            if (!pref)
                return;
            sentry.setSampleRate(pref.value ? 1 : 0);
        });
        return [configurator];
    }
    setBrowserVersion(version) {
        this.sentry.setBrowserVersion(version);
    }
    setOsInfo(name, version) {
        this.sentry.setOsInfo(name, version);
    }
    async #init() {
        // TODO: https://linear.app/perplexity/issue/BRO-1092
        const [browserVersion, { osName, osVersion }, machineId] = await Promise.all([
            chrome.perplexity.system.getProductVersion(),
            chrome.perplexity.system.getCPUArchitecture(),
            chrome.perplexity.system.getMachineId(),
        ]);
        this.setBrowserVersion(browserVersion);
        this.setOsInfo(osName, osVersion);
        this.sentry.setMachineId(machineId);
    }
}
