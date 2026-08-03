import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { Button } from "../../components/button/button.js";
import { StepHeading } from "../../components/layout/step_heading.js";
import { StepLayout } from "../../components/layout/step.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
export const DefaultBrowserStepLayout = ({ instruction, openSettingsButton, subtitle, onGoBack, onSkip, }) => {
    return (_jsx(StepLayout, { title: _jsx(StepHeading, { title: i18n("default_browser_step_title") }), subtitle: subtitle, content: _jsx("div", { className: "b-default-browser-step__content", children: instruction }), className: "b-default-browser-step__step", footer: _jsxs("div", { className: "b-default-browser-step__footer", children: [_jsx("div", { children: _jsx(Button, { type: "button", view: "secondary", size: "large", onClick: onGoBack, children: i18n("go_back_button_label") }) }), _jsxs("div", { className: "b-default-browser-step__continue-actions", children: [_jsx(Button, { view: "secondary", shadowed: true, size: "large", onClick: onSkip, children: i18n("skip_button_label") }), openSettingsButton] })] }) }));
};
