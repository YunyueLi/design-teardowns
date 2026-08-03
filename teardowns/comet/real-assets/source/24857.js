import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { useState, useRef, useEffect, useMemo } from 'react';
import '/strings.m.js';
import { cx } from '//resources/perplexity/libs/classnames.js';
import { i18n } from '//resources/perplexity/libs/i18n.js';
import { startClient } from '//resources/perplexity/libs/start_client.js';
import { URL_PATTERN_REGEXP, isIPAddress, isLocalhost, isSpecialProtocol, isValidHostname, restoreProtocol, } from '//resources/perplexity/libs/url.js';
import { captureError } from '//resources/perplexity/libs/capture_error.js';
import { AddAppIconPicker } from './components/app_icon_picker.js';
import { ApplicationsService } from "./services/applications/applications_service.js";
import { PopupsIds, PopupsService } from "./services/popups/popups_service.js";
const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});
function PopupAdd() {
    const titleInputRef = useRef(null);
    const appsService = ApplicationsService.getInstance();
    const popupsService = PopupsService.getInstance();
    const appId = appsService.useCurrentActiveAppId();
    const apps = appsService.useApps();
    const lastAppId = useRef(appId);
    const currentApp = useMemo(() => {
        return apps.find((app) => app.id === appId);
    }, [appId, apps]);
    const [appUrl, setAppUrl] = useState(currentApp?.url ?? '');
    const [appName, setAppName] = useState(currentApp?.name ?? '');
    const [iconData, setIconData] = useState();
    const [appUrlError, setAppUrlError] = useState(false);
    const [appNameError, setAppNameError] = useState(false);
    const resetData = () => {
        setAppName('');
        setAppUrl('');
        setIconData(undefined);
        setAppNameError(false);
        setAppUrlError(false);
    };
    const validateName = (name = appName, shouldSetErrors = true) => {
        let hasError = false;
        if (!name) {
            setAppNameError(shouldSetErrors && true);
            hasError = true;
        }
        else {
            setAppNameError(shouldSetErrors && false);
        }
        return !hasError;
    };
    const validateUrl = (innerUrl = appUrl, shouldSetErrors = true) => {
        if (!innerUrl) {
            setAppUrlError(shouldSetErrors && true);
            return false;
        }
        // Corner case because chrome.tabs.create can't open ip addresses (Invalid URL address)
        if (isIPAddress(innerUrl)) {
            setAppUrlError(shouldSetErrors && true);
            return false;
        }
        if (isSpecialProtocol(innerUrl) || isLocalhost(innerUrl)) {
            setAppUrlError(shouldSetErrors && false);
            return true;
        }
        if (URL_PATTERN_REGEXP.test(innerUrl)) {
            try {
                const urlWithProtocol = restoreProtocol(innerUrl);
                const urlObj = new URL(urlWithProtocol);
                if (!isValidHostname(urlObj.hostname)) {
                    setAppUrlError(shouldSetErrors && true);
                    return false;
                }
                setAppUrlError(shouldSetErrors && false);
                return true;
            }
            catch {
                setAppUrlError(shouldSetErrors && true);
                return false;
            }
        }
        setAppUrlError(shouldSetErrors && true);
        return false;
    };
    const normalizeUrl = (url) => {
        if (isSpecialProtocol(url) || isLocalhost(url) || isIPAddress(url)) {
            return url;
        }
        return restoreProtocol(url);
    };
    const processErrors = () => {
        let hasErrors = false;
        hasErrors = !validateName() || hasErrors;
        hasErrors = !validateUrl() || hasErrors;
        return hasErrors;
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (processErrors() || currentApp) {
            return;
        }
        try {
            if (iconData) {
                appsService.addApp(appName, normalizeUrl(appUrl), typeof iconData === 'string' ? iconData : await toBase64(iconData));
            }
            else {
                appsService.addApp(appName, normalizeUrl(appUrl));
            }
            resetData();
            popupsService.closePopup(PopupsIds.AppPopup).catch(console.error);
        }
        catch (error) {
            captureError(error);
        }
    };
    const handleSaveName = (shouldSetValidation = true) => {
        if (!lastAppId.current) {
            return;
        }
        if (!validateName(undefined, shouldSetValidation)) {
            return;
        }
        appsService.updateApp(lastAppId.current, {
            name: appName,
        });
    };
    const handleSaveUrl = (shouldSetValidation = true) => {
        if (!lastAppId.current) {
            return;
        }
        if (!validateUrl(undefined, shouldSetValidation)) {
            return;
        }
        appsService.updateApp(lastAppId.current, {
            url: normalizeUrl(appUrl),
        });
    };
    const closeAppTab = () => {
        if (!appId || !currentApp?.tabId) {
            return;
        }
        appsService.closeApp(appId).catch(console.error);
        popupsService.closePopup(PopupsIds.AppPopup).catch(console.error);
    };
    const removeApp = () => {
        if (!appId)
            return;
        appsService.deleteApp(appId);
        popupsService.closePopup(PopupsIds.AppPopup).catch(console.error);
    };
    const handleUpdateIcon = async (icon) => {
        setIconData(icon);
        if (appId && currentApp) {
            appsService.updateApp(appId, {
                icon: icon && typeof icon !== 'string' ? await toBase64(icon) : icon,
            });
        }
    };
    const handleNameChange = (value) => {
        setAppName(value);
        if (appNameError) {
            validateName(value);
        }
    };
    const handleUrlChange = (value) => {
        const trimmedValue = value.trim();
        setAppUrl(trimmedValue);
        if (appUrlError) {
            validateUrl(trimmedValue);
        }
    };
    const handleContextMenu = (event) => {
        if (event.target.tagName !== 'INPUT') {
            event.preventDefault();
        }
    };
    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);
    useEffect(() => {
        setAppName(currentApp?.name ?? '');
    }, [currentApp?.name]);
    useEffect(() => {
        setAppUrl(currentApp?.url ?? '');
    }, [currentApp?.url]);
    useEffect(() => {
        setIconData(currentApp?.icon ?? '');
    }, [currentApp?.icon]);
    useEffect(() => {
        if (!lastAppId.current) {
            lastAppId.current = appId;
            return;
        }
        handleSaveName(false);
        handleSaveUrl(false);
        lastAppId.current = appId;
    }, [appId]);
    useEffect(() => {
        // @ts-expect-error
        window.resetAddPopupData = resetData;
    }, []);
    return (_jsxs("div", { className: "wrapper", onContextMenu: handleContextMenu, children: [_jsx("div", { className: "header", children: appId ? i18n('edit_custom_title') : i18n('add_app_custom_title') }), _jsxs("form", { className: "form", onSubmit: onSubmit, children: [_jsxs("div", { className: "input-block", children: [_jsxs("label", { htmlFor: "pin-name-input", className: "input-label", children: [i18n('add_label_text'), appNameError && ' · ', appNameError && (_jsx("span", { className: "input-error-text", children: i18n('add_label_error') }))] }), _jsx("input", { placeholder: i18n('add_app_name_placeholder'), className: cx('app-form-input', {
                                    'form-input-error': appNameError,
                                }), id: "pin-name-input", value: appName, ref: titleInputRef, onBlur: () => handleSaveName(), onChange: (ev) => handleNameChange(ev.target.value) })] }), _jsxs("div", { className: "input-block", children: [_jsxs("label", { htmlFor: "pin-url-input", className: "input-label", children: [i18n('add_url_text'), appUrlError && ' · ', appUrlError && (_jsx("span", { className: "input-error-text", children: i18n('add_url_error') }))] }), _jsxs("div", { className: "input-with-picker", children: [_jsx("input", { placeholder: i18n('add_app_text'), className: cx('app-form-input', {
                                            'form-input-error': appUrlError,
                                        }), id: "pin-url-input", value: appUrl, onBlur: () => handleSaveUrl(), onChange: (ev) => handleUrlChange(ev.target.value) }), _jsx(AddAppIconPicker, { appUrl: normalizeUrl(appUrl), iconData: iconData, setIconData: handleUpdateIcon })] })] }), currentApp ? (_jsxs("div", { className: "buttons-row", children: [currentApp?.tabId ? (_jsx("button", { className: "secondary-button footer-button", onClick: closeAppTab, type: "button", children: i18n('edit_close_pin_tab') })) : null, _jsx("button", { className: "footer-button", onClick: removeApp, type: "button", children: i18n('edit_remove_pin') })] })) : (_jsx("button", { type: "submit", className: "footer-button", children: i18n('add_app_button_text') }))] })] }));
}
startClient('#root', _jsx(PopupAdd, {}));
