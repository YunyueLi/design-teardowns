import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "/strings.m.js";
import { useEffect } from "react";
import { startClient } from "//resources/perplexity/libs/start_client.js";
import { useColorThemeAutoupdate } from "//resources/perplexity/hooks/use_color_theme_autoupdate.js";
import { onboardingService } from "./services/onboarding_service.js";
import { Layout } from "./components/layout/layout.js";
import { LayoutController } from "./components/layout/context.js";
import { SoundToggle } from "./features/sound/sound_toggle.js";
import { SoundProvider } from "./features/sound/sound_context.js";
import { Step, StepsProvider, useStep, useSteps } from "./steps/context.js";
import { Carousel } from "./components/layout/carousel.js";
import { ImportStep } from "./steps/import/import_step.js";
import { OptionsStep } from "./steps/options/options_step.js";
import { ProfileStep } from "./steps/profile/profile_step.js";
import { WelcomeStep } from "./steps/welcome/welcome_step.js";
import { DefaultBrowserStep } from "./steps/default_browser/default_browser_step.js";
import { useShrinkForSmallScreens } from "./hooks/use_shrink_for_small_screens.js";
const Onboarding = () => {
    useEffect(() => {
        onboardingService.sendStartedEvent();
    }, []);
    useColorThemeAutoupdate();
    useShrinkForSmallScreens();
    const steps = useSteps();
    const { currentIndex } = useStep();
    return (_jsx(Layout, { audioControl: _jsx(SoundToggle, {}), children: _jsx(Carousel, { currentIndex: currentIndex, children: steps.map((step) => {
                switch (step) {
                    case Step.Welcome:
                        return _jsx(WelcomeStep, {}, step);
                    case Step.Import:
                        return _jsx(ImportStep, {}, step);
                    case Step.Profile:
                        return _jsx(ProfileStep, {}, step);
                    case Step.DefaultBrowser:
                        return _jsx(DefaultBrowserStep, {}, step);
                    case Step.Options:
                        return (_jsx(OptionsStep, { showGoBack: steps.includes(Step.Import) }, step));
                    default:
                        return null;
                }
            }) }) }));
};
startClient("#root", _jsx(StepsProvider, { children: _jsx(LayoutController, { children: _jsx(SoundProvider, { children: _jsx(Onboarding, {}) }) }) }));
