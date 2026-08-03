// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { CustomizeColorSchemeModeBrowserProxy } from "//resources/cr_components/customize_color_scheme_mode/browser_proxy.js";
import { makeSentryProxy } from "//resources/perplexity/libs/make_sentry_proxy.js";
export class ThemeService {
    handler = CustomizeColorSchemeModeBrowserProxy.getInstance().handler;
    router = CustomizeColorSchemeModeBrowserProxy.getInstance().callbackRouter;
    subscribeToColorModesUpdated(onUpdate) {
        const listenerId = this.router.setColorSchemeMode.addListener(onUpdate);
        return () => this.router.removeListener(listenerId);
    }
    init() {
        this.handler.initializeColorSchemeMode();
    }
    updateMode(mode) {
        this.handler.setColorSchemeMode(mode);
    }
    subscribeToColorThemeChange(onChange) {
        chrome.perplexity.themes.onCurrentColorThemeChanged.addListener(onChange);
        return () => {
            chrome.perplexity.themes.onCurrentColorThemeChanged.removeListener(onChange);
        };
    }
    getCurrentColorTheme() {
        return chrome.perplexity.themes.getCurrentColorTheme(chrome.perplexity.themes.Representation.HEX);
    }
    static getInstance() {
        if (!instance) {
            instance = makeSentryProxy(ThemeService, []);
        }
        return instance;
    }
}
let instance;
export const themeService = ThemeService.getInstance();
