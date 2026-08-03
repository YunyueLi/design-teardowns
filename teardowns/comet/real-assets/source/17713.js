import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "/strings.m.js";
import { useState, useEffect, useLayoutEffect } from "react";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { assert } from "//resources/perplexity/libs/assert.js";
import { restoreProtocol } from "//resources/perplexity/libs/url.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { startClient } from "//resources/perplexity/libs/start_client.js";
import { usePreventZoom } from "//resources/perplexity/hooks/prevent_zoom.js";
import { useColorThemeAutoupdate } from "//resources/perplexity/hooks/use_color_theme_autoupdate.js";
import { CrButton, CrToggle } from "//resources/perplexity/components/cr_components.js";
import { SettingsIcon } from "//resources/perplexity/icons/settings_icon.js";
import { AdblockPopupCallbackRouter, AdblockPopupHandlerFactory, AdblockPopupHandlerRemote, } from "./perplexity_adblock_popup_ui.mojom-webui.js";
class AdblockPopupAPI {
    callbackRouter = new AdblockPopupCallbackRouter();
    handler = new AdblockPopupHandlerRemote();
    constructor() {
        const factory = AdblockPopupHandlerFactory.getRemote();
        factory.createHandler(this.callbackRouter.$.bindNewPipeAndPassRemote(), this.handler.$.bindNewPipeAndPassReceiver());
        this.callbackRouter.onConnectionError.addListener(console.error);
    }
    showUI() {
        return this.handler.showUI();
    }
    async activeTabGetState() {
        const { state } = await this.handler.activeTabGetState();
        return state;
    }
    activeTabToggleAdblock(enabled) {
        this.handler.activeTabToggleAdblock(enabled);
    }
    activeTabToggleCookieNoticeHiding(enabled) {
        this.handler.activeTabToggleCookieNoticeHiding(enabled);
    }
    static getInstance() {
        return instance || (instance = new AdblockPopupAPI());
    }
}
let instance = null;
const WIDTH = 320;
const ROOT_ELEMENT = "#root";
function faviconURL(domain, size = 64) {
    const url = new URL("chrome://favicon2");
    url.searchParams.set("pageUrl", restoreProtocol(domain));
    url.searchParams.set("size", size.toString());
    return url.toString();
}
const usePopupContainerSize = (width, elementSelector = "#root") => {
    useLayoutEffect(() => {
        const appElement = document.querySelector(elementSelector);
        assert(appElement instanceof HTMLElement, "No app element to set popup container size");
        appElement.style.width = `${width.toString()}px`;
        appElement.style.minHeight = "1px";
        appElement.style.overflow = "auto";
        return () => {
            const appElement = document.getElementById("app");
            assert(appElement, "No app element to clean up container properties");
            appElement.style.removeProperty("width");
            appElement.style.removeProperty("minHeight");
            appElement.style.removeProperty("overflow");
        };
    }, [width, elementSelector]);
};
const DomainFavIcon = ({ domain, faviconSize, className = "" }) => {
    return (_jsx("img", { style: { width: faviconSize, height: faviconSize }, width: faviconSize, height: faviconSize, className: cx("object-fit", className), draggable: "false", src: faviconURL(domain) }));
};
const Section = ({ children, className, }) => {
    return _jsx("div", { className: cx("p-[8px] w-full", className), children: children });
};
const AdblockPopup = ({}) => {
    const api = AdblockPopupAPI.getInstance();
    const domainInHiddenWhiteList = false;
    const [enabled, setEnabled] = useState(false);
    const [cookieNoticeHidingEnabled, setCookieNoticeHidingEnabled] = useState(false);
    const [showCookieSuppressorUx, setShowCookieSuppressorUx] = useState(false);
    const [hostname, setHostname] = useState("");
    const [title, setTitle] = useState("");
    const handleAdblockToggle = () => {
        setEnabled(!enabled);
        api.activeTabToggleAdblock(!enabled);
    };
    const handleCookieNoticeToggle = () => {
        setCookieNoticeHidingEnabled(!cookieNoticeHidingEnabled);
        api.activeTabToggleCookieNoticeHiding(!cookieNoticeHidingEnabled);
    };
    useColorThemeAutoupdate();
    useEffect(() => {
        api
            .activeTabGetState()
            .then((state) => {
            setEnabled(state.enabled);
            setCookieNoticeHidingEnabled(state.cookieNoticeHidingEnabled);
            setShowCookieSuppressorUx(state.showCookieSuppressorUx);
            setHostname(state.hostname);
            setTitle(state.title);
            return api.showUI();
        })
            .catch(reportError);
    }, [setEnabled]);
    usePopupContainerSize(WIDTH, ROOT_ELEMENT);
    usePreventZoom();
    const openSettings = () => {
        chrome.tabs.create({ url: "chrome://settings/adBlock", active: true });
    };
    return (_jsxs("div", { style: { width: "100%", height: "100%" }, className: "bg-raised flex flex-col rounded-lg p-[8px] text-primary text-default", children: [_jsxs(Section, { className: "flex gap-[6px] items-center", children: [_jsx(DomainFavIcon, { domain: hostname, faviconSize: 16 }), _jsx("div", { className: "text-subhead font-medium truncate overflow-hidden overflow-ellipsis", children: title })] }), !domainInHiddenWhiteList && (_jsx(_Fragment, { children: _jsx(Section, { className: "flex", children: _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { children: i18n("header") }), _jsx("div", { className: "flex items-center", children: _jsx(CrToggle, { checked: enabled, onchange: handleAdblockToggle }) })] }) }) })), showCookieSuppressorUx && (_jsx(Section, { className: "flex", children: _jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsx("div", { children: i18n("cookieHeader") }), _jsx("div", { className: "flex items-center", children: _jsx(CrToggle, { checked: cookieNoticeHidingEnabled, disabled: !enabled, onchange: handleCookieNoticeToggle }) })] }) })), !domainInHiddenWhiteList && (_jsx(Section, { children: _jsx("div", { className: "text-secondary", children: i18n("description") }) })), _jsxs(Section, { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-secondary", children: i18n("settings") }), _jsx(CrButton, { className: "secondary-button h-[32px] text-action", onClick: openSettings, children: _jsxs("span", { className: "flex items-center gap-[6px]", children: [_jsx(SettingsIcon, { width: 14, height: 14 }), i18n("manage")] }) })] })] }));
};
startClient(ROOT_ELEMENT, _jsx(AdblockPopup, {}));
