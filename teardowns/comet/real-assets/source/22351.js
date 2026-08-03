import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useEffect, useState } from "react";
import { useImportableProfiles } from "../../features/import/hooks.js";
import { Button } from "../../components/button/button.js";
import { StepLayout } from "../../components/layout/step.js";
import { ImportForm } from "../../features/import/import_form.js";
import { onboardingService } from "../../services/onboarding_service.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { useStep, Step } from "../context.js";
import { StepHeading } from "../../components/layout/step_heading.js";
import { useStepsControllerWithAnalyticsForStep } from "../../steps/analytics.js";
export const ImportStep = () => {
    const { profiles } = useImportableProfiles();
    const [importPopupOpen, setImportPopupOpen] = useState(false);
    const { toNextStep } = useStepsControllerWithAnalyticsForStep(Step.Import);
    const { step } = useStep();
    useEffect(() => {
        onboardingService.addAnalyticsContext({
            used_import: false,
        });
    }, []);
    const handleFinish = () => {
        toNextStep({ action: "continue" });
    };
    const handleSkip = () => {
        toNextStep({ action: "skip" });
    };
    return (_jsx(StepLayout, { title: _jsx(StepHeading, { title: i18n("import_step_title") }), subtitle: i18n("import_step_subtitle"), content: _jsx("div", { className: "b-import-step__form-wrapper", children: _jsx(ImportForm, { isVisible: step === Step.Import, onFinish: handleFinish, popupOpen: importPopupOpen, onPopupClose: () => setImportPopupOpen(false), profiles: profiles ?? [], className: "b-import-step__form" }) }), footer: _jsxs("div", { className: "b-import-step__footer", children: [_jsx(Button, { className: "b-import-step__skip-button", onClick: handleSkip, size: "large", view: "secondary", children: i18n("do_later_button_label") }), _jsxs("div", { className: "b-import-step__options-button-container", children: [i18n("import_all_title_1"), _jsxs("span", { onClick: () => setImportPopupOpen(true), className: "b-import-step__options-button", children: [i18n("import_all_title_2"), " \u2197"] })] }), _jsx("div", {})] }) }));
};
