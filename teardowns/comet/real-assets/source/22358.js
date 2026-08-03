import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useCallback, useMemo } from "react";
import { Button } from "../../components/button/button.js";
import { ProfileNameInput } from "./profile_name_input.js";
import { onboardingService } from "../../services/onboarding_service.js";
import { ProfileAvatarPicker } from "./profile_avatar_picker.js";
import { useAvatars } from "./use_avatars.js";
import { StepLayout } from "../../components/layout/step.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { StepHeading } from "../../components/layout/step_heading.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { ThemeToggle } from "../../features/theme/theme_toggle.js";
import { Step } from "../context.js";
import { useStepsControllerWithAnalyticsForStep } from "../../steps/analytics.js";
const DEFAULT_PROFILE_NAME = "User";
export const ProfileStep = () => {
    const { toPrevStep, toNextStep } = useStepsControllerWithAnalyticsForStep(Step.Profile);
    const [name, setName] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const avatars = useAvatars();
    const selectedAvatar = useMemo(() => avatars?.find((a) => a.index === selectedIndex), [avatars, selectedIndex]);
    const handleSelectAvatar = useCallback((index) => {
        setSelectedIndex(index);
    }, []);
    const saveState = useCallback(() => {
        if (!name) {
            const selectedAvatarName = selectedAvatar?.label;
            onboardingService.setProfileName(selectedAvatarName ?? DEFAULT_PROFILE_NAME);
        }
        else {
            onboardingService.setProfileName(name);
        }
        if (selectedIndex) {
            onboardingService.setProfileIconToDefaultAvatar(selectedIndex);
        }
    }, [name, selectedIndex, selectedAvatar]);
    const handleContinue = () => {
        saveState();
        toNextStep({ action: "continue" });
    };
    const handleGoBack = () => {
        toPrevStep({ action: "go back" });
    };
    return (_jsx(StepLayout, { title: _jsx(StepHeading, { title: i18n("profiles_step_title"), italicIndices: [10] }), subtitle: i18n("profiles_step_subtitle"), content: _jsxs("div", { className: "b-profile-step__content", children: [_jsx("div", { className: "b-profile-step__body", children: _jsx(ProfileNameInput, { iconSlot: _jsx("div", { className: "b-profile-step__avatar-slot", children: avatars.map((avatar) => (_jsx("img", { className: cx("b-profile-step__avatar", avatar.index === selectedIndex
                                    ? "b-profile-step__avatar--selected"
                                    : undefined), src: avatar.url }, avatar.index))) }), value: name, onChange: setName }) }), _jsx(ProfileAvatarPicker, { avatars: avatars, onSelect: handleSelectAvatar })] }), footer: _jsxs("div", { className: "b-profile-step__footer", children: [_jsx("div", { children: _jsx(Button, { size: "large", type: "button", view: "secondary", onClick: handleGoBack, children: i18n("go_back_button_label") }) }), _jsx("div", { className: "b-profile-step__toggle-wrapper", children: _jsx(ThemeToggle, {}) }), _jsx(Button, { className: "b-profile-step__button", size: "large", view: "primary", shadowed: true, onClick: handleContinue, children: i18n("continue_button_label") })] }) }));
};
