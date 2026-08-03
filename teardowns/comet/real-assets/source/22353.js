import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { HomePlusIcon } from "//resources/perplexity/icons/home_plus_icon.js";
import { ToolIcon } from "//resources/perplexity/icons/tool_icon.js";
import { LaptopIcon } from "//resources/perplexity/icons/laptop_icon.js";
import { WindowAppIcon } from "//resources/perplexity/icons/window_app_icon.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { Platform } from "../../services/types.js";
import { onboardingService } from "../../services/onboarding_service.js";
const ICON_SIZE = 24;
const OPTIONS = {
    "default-browser": {
        title: i18n("default_browser_option_title"),
        description: i18n("default_browser_option_desc"),
        icon: _jsx(HomePlusIcon, { width: ICON_SIZE, height: ICON_SIZE }),
    },
    "add-to-dock": {
        title: onboardingService.platform() === Platform.MacOS
            ? i18n("add_to_dock_option_title_mac")
            : i18n("add_to_dock_option_title_win"),
        icon: _jsx(LaptopIcon, { width: ICON_SIZE, height: ICON_SIZE }),
    },
    "add-to-startup-items": {
        title: i18n("autostart_option_title"),
        icon: _jsx(WindowAppIcon, { width: ICON_SIZE, height: ICON_SIZE }),
    },
    "share-analytics": {
        title: i18n("analytics_option_title"),
        description: i18n("analytics_option_desc"),
        icon: _jsx(ToolIcon, { width: ICON_SIZE, height: ICON_SIZE }),
    },
};
export const Option = ({ type, action }) => {
    const { title, description, icon } = OPTIONS[type];
    return (_jsxs("div", { className: "b-onboarding-option__root", children: [_jsx("div", { className: "b-onboarding-option__icon-wrapper", children: icon }), _jsxs("div", { className: "b-onboarding-option__text", children: [_jsx("p", { className: "b-onboarding-option__title", children: title }), description && (_jsx("p", { className: "b-onboarding-option__description", children: description }))] }), _jsx("div", { className: "b-onboarding-option__action-wrapper", children: action })] }));
};
