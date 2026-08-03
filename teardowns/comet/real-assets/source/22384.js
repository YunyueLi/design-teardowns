// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { OnboardingAnalyticsService } from "./analytics_service.js";
import { ImportStatus, Platform, WindowsVersion, } from "./types.js";
import { addWebUiListener, removeWebUiListener, sendWithPromise, } from "//resources/js/cr.js";
import { makeSentryProxy } from "//resources/perplexity/libs/make_sentry_proxy.js";
import { seconds } from "//resources/perplexity/libs/time.js";
import { wait } from "//resources/perplexity/libs/wait.js";
const WAIT_FOR_ONBOARDING_COMPLETED_EVENT_LANDED_TIMEOUT_MIN = 300;
const WAIT_FOR_ONBOARDING_COMPLETED_EVENT_LANDED_TIMEOUT_MAX = 500;
const IMPORT_STATUS_PREF = "perplexity.onboarding_import_status";
export class OnboardingService {
    #analyticsService = new OnboardingAnalyticsService();
    #isFinishing = false;
    initializeImport() {
        return sendWithPromise("initializeImportDialog");
    }
    importData(profileIndex, importDataDto) {
        return chrome.send("importData", [profileIndex, importDataDto]);
    }
    importFromBookmarksFile() {
        return chrome.send("importFromBookmarksFile");
    }
    onImportStatusChanged(callback) {
        const listener = addWebUiListener("import-data-status-changed", callback);
        return () => removeWebUiListener(listener);
    }
    async finish({ areMetricsAllowed, shouldSetDefaultBrowser, shouldAddToDock, shouldLaunchOnStartup, }) {
        if (this.#isFinishing)
            return;
        this.#isFinishing = true;
        this.addAnalyticsContext({
            are_metrics_allowed: areMetricsAllowed,
            set_default_browser: shouldSetDefaultBrowser,
            added_to_dock: shouldAddToDock,
            agreed_to_launch_on_start: shouldLaunchOnStartup,
        });
        // We want to wait for analytics request to land before onboarding finished
        // But no longer than specified timeout
        await Promise.allSettled([
            Promise.race([
                this.#sendFinishEvent(),
                wait(WAIT_FOR_ONBOARDING_COMPLETED_EVENT_LANDED_TIMEOUT_MAX),
            ]),
            wait(WAIT_FOR_ONBOARDING_COMPLETED_EVENT_LANDED_TIMEOUT_MIN),
        ]);
        if (typeof areMetricsAllowed === "boolean") {
            this.#setMetricsAllowed(areMetricsAllowed);
        }
        if (typeof shouldSetDefaultBrowser === "boolean") {
            await this.setBrowserAsDefault(shouldSetDefaultBrowser);
        }
        if (typeof shouldAddToDock === "boolean") {
            this.#addToDock(shouldAddToDock);
        }
        if (typeof shouldLaunchOnStartup === "boolean") {
            this.#addToStartupItems(shouldLaunchOnStartup);
        }
        chrome.send("finish-onboarding");
        this.#isFinishing = false;
    }
    getOptions() {
        let options = [
            "default-browser",
            "add-to-startup-items",
            "share-analytics",
        ];
        if (this.#isAddingToDockSupported()) {
            // Inject dock option into 2nd place
            options = options.toSpliced(1, 0, "add-to-dock");
        }
        if (this.isDefaultBrowserStepEnabled()) {
            // We don't need corresponding option if we have separate step for this
            options = options.toSpliced(options.indexOf("default-browser"), 1);
        }
        return options;
    }
    #addToDock(shouldAdd) {
        if (!this.#isAddingToDockSupported()) {
            return;
        }
        if (shouldAdd) {
            chrome.send("add-to-dock");
        }
    }
    #setMetricsAllowed(value) {
        chrome.settingsPrivate.setPref("perplexity.metrics_allowed", value);
    }
    async getPerplexityUrl(path) {
        const host = await this.getPerplexityHost();
        return new URL(path, host);
    }
    async setBrowserAsDefault(value) {
        if (!value || (await this.isPerplexityDefaultBrowser()))
            return;
        await Promise.race([
            chrome.perplexity.system.setPerplexityAsDefaultBrowser(),
            wait(seconds(1)),
        ]);
    }
    addAnalyticsContext(fields) {
        this.#analyticsService.updateContext(fields);
    }
    getPerplexityHost() {
        return chrome.settingsPrivate.getPerplexityBackendUrl();
    }
    getAvailableIcons() {
        return sendWithPromise("getAvailableIcons");
    }
    setProfileName(name) {
        return chrome.send("setProfileName", [name]);
    }
    setProfileIconToDefaultAvatar(index) {
        return chrome.send("setProfileIconToDefaultAvatar", [index]);
    }
    resizeWindow(width, height) {
        chrome.send("resize-widget", [width, height]);
    }
    sendStartedEvent() {
        return this.#analyticsService.sendStarted();
    }
    sendStepAdvancedEvent(event) {
        return this.#analyticsService.sendAdvanced(event);
    }
    #addToStartupItems(shouldAdd) {
        if (!shouldAdd) {
            return;
        }
        return sendWithPromise("add-to-startup-items");
    }
    async setImportStatus(value) {
        // They could be imported in previous run of onboarding
        const status = await this.#getImportStatus();
        if (status === ImportStatus.Imported) {
            return;
        }
        return chrome.settingsPrivate.setPref(IMPORT_STATUS_PREF, value ? ImportStatus.Imported : ImportStatus.NotImported);
    }
    async #getImportStatus() {
        const pref = await chrome.settingsPrivate.getPref(IMPORT_STATUS_PREF);
        return pref.value;
    }
    #sendFinishEvent() {
        return this.#analyticsService.sendFinished();
    }
    isPerplexityDefaultBrowser() {
        return chrome.perplexity.system.isPerplexityDefaultBrowser();
    }
    waitForBrowserIsDefault(callback) {
        const interval = setInterval(async () => {
            if (await this.isPerplexityDefaultBrowser()) {
                callback();
                clearInterval(interval);
            }
        }, seconds(1));
        return () => {
            clearInterval(interval);
        };
    }
    #isAddingToDockSupported() {
        const supportedPlatforms = [Platform.MacOS, Platform.Windows];
        return supportedPlatforms.includes(this.platform());
    }
    isDefaultBrowserStepEnabled() {
        return this.platform() === Platform.Windows;
    }
    platform() {
        let result = Platform.Other;
        // 
        result = Platform.MacOS;
        // 
        // 
        return result;
    }
    /**
     * Windows 10 and 11 have the same major version.
     * We can tell them apart only via build number
     * */
    async windowsVersion() {
        const data = await chrome.perplexity.system.getCPUArchitecture();
        // To process versions like 10.0.15431 SP1
        const version = data.osVersion.split(" ").at(0);
        if (!version) {
            return WindowsVersion.Unsupported;
        }
        const [major, _, buildNumber] = version.split(".").map(Number);
        const lowestSupportedMajorVersion = 10;
        const isWindows = this.platform() === Platform.Windows;
        if (!isWindows ||
            !buildNumber ||
            !major ||
            major < lowestSupportedMajorVersion) {
            return WindowsVersion.Unsupported;
        }
        const latestWin10BuildNumber = 19045;
        return buildNumber > latestWin10BuildNumber
            ? WindowsVersion.Win11
            : WindowsVersion.Win10;
    }
    static getInstance() {
        if (!instance) {
            instance = makeSentryProxy(OnboardingService, []);
        }
        return instance;
    }
}
let instance;
export const onboardingService = OnboardingService.getInstance();
