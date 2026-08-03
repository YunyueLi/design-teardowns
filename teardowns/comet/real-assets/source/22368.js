import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useCallback, useRef } from "react";
import { Button } from "../../components/button/button.js";
import { ChromeIcon, FirefoxIcon, SafariIcon, NullIcon, EdgeIcon, OperaIcon, ArcIcon, BraveIcon, } from "./icons.js";
import { getBrowserName, getProfileName } from "./utils.js";
import { ChevronDownIcon } from "//resources/perplexity/icons/chevron_down_icon.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { Popup } from "../../components/popup/popup.js";
var KnownBrowser;
(function (KnownBrowser) {
    KnownBrowser["Chrome"] = "chrome";
    KnownBrowser["Firefox"] = "mozilla firefox";
    KnownBrowser["Safari"] = "safari";
    KnownBrowser["Edge"] = "microsoft edge";
    KnownBrowser["Opera"] = "opera";
    KnownBrowser["Arc"] = "arc";
    KnownBrowser["Brave"] = "brave";
})(KnownBrowser || (KnownBrowser = {}));
const isKnownBrowser = (browserName) => {
    return Object.values(KnownBrowser).includes(browserName);
};
const getNameToRender = (profile) => {
    const { name } = profile;
    const browserName = getBrowserName(name);
    const profileName = getProfileName(name);
    if (profileName) {
        return `${browserName} - ${profileName}`;
    }
    if (profile.profileName) {
        return `${browserName} - ${profile.profileName}`;
    }
    return browserName;
};
const browserNameToIcon = {
    [KnownBrowser.Chrome]: ChromeIcon,
    [KnownBrowser.Firefox]: FirefoxIcon,
    [KnownBrowser.Safari]: SafariIcon,
    [KnownBrowser.Edge]: EdgeIcon,
    [KnownBrowser.Opera]: OperaIcon,
    [KnownBrowser.Arc]: ArcIcon,
    [KnownBrowser.Brave]: BraveIcon,
};
const BROWSER_ICON_SIZE = 16;
const nullIcon = (_jsx(NullIcon, { width: BROWSER_ICON_SIZE, height: BROWSER_ICON_SIZE }));
const prepareProfileToRender = (profile) => {
    if (!profile) {
        return {
            icon: nullIcon,
            text: "",
        };
    }
    const { name } = profile;
    const browserName = getBrowserName(name).toLowerCase();
    if (!isKnownBrowser(browserName)) {
        return {
            icon: nullIcon,
            text: name,
        };
    }
    const Icon = browserNameToIcon[browserName];
    return {
        icon: _jsx(Icon, { width: BROWSER_ICON_SIZE, height: BROWSER_ICON_SIZE }),
        text: getNameToRender(profile),
    };
};
export const ImportProfileSelect = ({ value, onChange, profiles, }) => {
    const [opened, setOpened] = useState(false);
    const { icon, text } = prepareProfileToRender(profiles[value] ?? null);
    const closeMenu = useCallback(() => setOpened(false), []);
    const toggleMenu = useCallback(() => setOpened((value) => !value), []);
    const containerRef = useRef(null);
    return (_jsxs("div", { ref: containerRef, children: [_jsxs(Button, { onClick: toggleMenu, size: "large", className: cx("b-import-profile-select__button", opened ? "b-import-profile-select__button--active" : undefined), view: "outline", children: [_jsxs("div", { className: "b-import-profile-select__display-option", children: [_jsx("div", { className: "b-import-profile-select__icon", children: icon }), _jsx("p", { className: "b-import-profile-select__display-text", children: text })] }), _jsx(ChevronDownIcon, { className: cx("b-import-profile-select__chevron", opened ? `b-import-profile-select__chevron--up` : undefined), width: 14, height: 14 })] }), _jsx(Popup, { radius: "s", width: 306, className: cx("b-import-profile-select__popup", opened ? "b-import-profile-select__popup--opened" : undefined), anchorRef: containerRef, onClickOutside: closeMenu, children: _jsx("div", { className: "b-import-profile-select__popup-body", children: profiles.map((profile, index) => {
                        const { icon, text } = prepareProfileToRender(profile);
                        return (_jsxs(Button, { view: "none", onClick: () => {
                                onChange(index);
                                closeMenu();
                            }, className: "b-import-profile-select__menu-option", children: [_jsx("span", { className: "b-import-profile-select__icon", children: icon }), _jsx("span", { className: "b-import-profile-select__menu-text", children: text })] }, profile.profileName));
                    }) }) })] }));
};
