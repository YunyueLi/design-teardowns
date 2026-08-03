import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "../../components/button/button.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { Step, useStep } from "../context.js";
import { onboardingService } from "../../services/onboarding_service.js";
import { SetDefaultInstructionWin11 } from "./set_default_instruction_win11.js";
import { SetDefaultInstructionWin10 } from "./set_default_instruction_win10.js";
import { DefaultBrowserStepLayout } from "./default_browser_step_layout.js";
import { useIsWin10 } from "./use_is_win10.js";
import { useStepsControllerWithAnalyticsForStep } from "../../steps/analytics.js";
export const DefaultBrowserStep = () => {
    const { toPrevStep, toNextStep } = useStepsControllerWithAnalyticsForStep(Step.DefaultBrowser);
    const [isDefaultBrowser, setIsDefaultBrowser] = useState(false);
    const isWin10 = useIsWin10();
    const { step } = useStep();
    const isStepVisible = step === Step.DefaultBrowser;
    const openSettings = () => {
        onboardingService.setBrowserAsDefault(true);
    };
    const openSettingsAndWait = () => {
        openSettings();
        waitForBrowserIsDefault();
    };
    const handleGoBack = () => {
        toPrevStep({ action: "go back" });
    };
    const handleSkip = () => {
        toNextStep({ action: "skip" });
    };
    const handleContinue = () => {
        toNextStep({ action: "continue" });
    };
    const stopWaitingRef = useRef();
    const waitForBrowserIsDefault = () => {
        stopWaitingRef.current?.();
        onboardingService.addAnalyticsContext({
            opened_default_settings_pane: true,
        });
        stopWaitingRef.current = onboardingService.waitForBrowserIsDefault(() => {
            setIsDefaultBrowser(true);
            onboardingService.addAnalyticsContext({ default_browser_status: true });
            if (isStepVisible) {
                toNextStep({ action: "open settings" });
            }
        });
    };
    useEffect(() => {
        if (!isStepVisible) {
            stopWaitingRef.current?.();
        }
    }, [isStepVisible]);
    const onMount = useCallback(() => {
        onboardingService.addAnalyticsContext({
            opened_default_settings_pane: false,
            default_browser_status: false,
        });
        onboardingService.isPerplexityDefaultBrowser().then((value) => {
            setIsDefaultBrowser(value);
            onboardingService.addAnalyticsContext({ default_browser_status: value });
        });
    }, []);
    useEffect(() => {
        onMount();
    }, [onMount]);
    const renderOpenSettingsButton = () => {
        return (_jsx(Button, { className: "b-default-browser-step__button", view: "primary", shadowed: true, size: "large", onClick: isDefaultBrowser ? handleContinue : openSettingsAndWait, children: isDefaultBrowser
                ? i18n("continue_button_label")
                : i18n("open_settings_button_label") }));
    };
    if (isWin10) {
        return (_jsx(DefaultBrowserStepLayout, { instruction: _jsx(SetDefaultInstructionWin10, { openSettingsButton: renderOpenSettingsButton() }), subtitle: i18n("default_step_win10_subtitle"), onGoBack: handleGoBack, onSkip: handleSkip }));
    }
    return (_jsx(DefaultBrowserStepLayout, { instruction: _jsx(SetDefaultInstructionWin11, {}), openSettingsButton: renderOpenSettingsButton(), subtitle: i18n("default_browser_step_subtitle"), onGoBack: handleGoBack, onSkip: handleSkip }));
};
