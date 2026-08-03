import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { Button } from "../../components/button/button.js";
import { Checkbox } from "../../components/checkbox/checkbox.js";
import { StepHeading } from "../../components/layout/step_heading.js";
import { onboardingService } from "../../services/onboarding_service.js";
import { Option } from "./option.js";
import { StepLayout } from "../../components/layout/step.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { useStepsControllerWithAnalyticsForStep } from "../../steps/analytics.js";
import { Step } from "../../steps/context.js";
const FORM_ID = "option-form";
export const OptionsStep = ({ showGoBack }) => {
    const { toPrevStep } = useStepsControllerWithAnalyticsForStep(Step.Options);
    const options = onboardingService.getOptions();
    const confirmChoices = (event) => {
        event.preventDefault();
        const formElement = event.target;
        if (!formElement || !(formElement instanceof HTMLFormElement))
            return;
        const formData = new FormData(formElement);
        const isEnabled = (name) => formData.get(name) === "on";
        const isRendered = (name) => options.includes(name);
        const getRenderedValue = (name) => {
            return isRendered(name) ? isEnabled(name) : undefined;
        };
        onboardingService.finish({
            areMetricsAllowed: getRenderedValue("share-analytics"),
            shouldSetDefaultBrowser: getRenderedValue("default-browser"),
            shouldAddToDock: getRenderedValue("add-to-dock"),
            shouldLaunchOnStartup: getRenderedValue("add-to-startup-items"),
        });
    };
    const handleGoBack = () => {
        toPrevStep({ action: "go back" });
    };
    return (_jsx(StepLayout, { title: _jsx(StepHeading, { title: i18n("options_step_title") }), content: _jsx("form", { id: FORM_ID, className: "b-options-step__form", onSubmit: confirmChoices, children: _jsx("div", { className: "b-options-step__options-group", children: options.map((type) => {
                    return (_jsx("div", { className: "b-options-step__option", children: _jsx(Option, { type: type, action: _jsx(Checkbox, { name: type }) }) }, type));
                }) }) }), footer: _jsxs("div", { className: "b-options-step__actions", children: [_jsx("div", { children: showGoBack && (_jsx(Button, { type: "button", view: "secondary", size: "large", onClick: handleGoBack, children: i18n("go_back_button_label") })) }), _jsx(Button, { form: FORM_ID, type: "submit", className: "b-options-step__button", view: "primary", shadowed: true, size: "large", children: i18n("launch_button_label") })] }) }));
};
