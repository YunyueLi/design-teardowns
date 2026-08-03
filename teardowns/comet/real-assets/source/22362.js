import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useCallback, useMemo, useContext, useState, useRef, createContext, } from "react";
import { assert } from "//resources/perplexity/libs/assert.js";
import { useImportAvailability, useIsCometDefaultBrowser, } from "../features/import/hooks.js";
import { onboardingService } from "../services/onboarding_service.js";
export var Step;
(function (Step) {
    Step["Welcome"] = "welcome";
    Step["Import"] = "import";
    Step["Profile"] = "profile";
    Step["DefaultBrowser"] = "default-browser";
    Step["Options"] = "options";
})(Step || (Step = {}));
const StepsContext = createContext(undefined);
const StepsControllerContext = createContext(undefined);
const STEPS_ORDER = [Step.Welcome, Step.Import, Step.Profile, Step.Options];
const removeImportStep = (steps) => {
    return steps.toSpliced(steps.indexOf(Step.Import), 1);
};
const addDefaultBrowserStep = (steps) => {
    return steps.toSpliced(steps.indexOf(Step.Options), 0, Step.DefaultBrowser);
};
export const StepsProvider = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const prefIndexRef = useRef(-1);
    const { isImportAvailable } = useImportAvailability();
    const isDefaultBrowser = useIsCometDefaultBrowser();
    const steps = useMemo(() => {
        let result = [...STEPS_ORDER];
        if (!isImportAvailable) {
            result = removeImportStep(result);
        }
        if (onboardingService.isDefaultBrowserStepEnabled() && !isDefaultBrowser) {
            result = addDefaultBrowserStep(result);
        }
        return result;
    }, [isImportAvailable, isDefaultBrowser]);
    const toNextStep = useCallback(() => setCurrentIndex((index) => {
        prefIndexRef.current = index;
        return Math.min(index + 1, steps.length - 1);
    }), [steps]);
    const toPrevStep = useCallback(() => setCurrentIndex((index) => {
        prefIndexRef.current = index;
        return Math.max(index - 1, 0);
    }), [steps]);
    return (_jsx(StepsContext.Provider, { value: { currentIndex, steps }, children: _jsx(StepsControllerContext.Provider, { value: { toNextStep, toPrevStep }, children: children }) }));
};
function assertContext(hookName, ctx) {
    assert(ctx, `${hookName} must be used within StepsProvider`);
}
export function useSteps() {
    const ctx = useContext(StepsContext);
    assertContext("useSteps", ctx);
    return ctx.steps;
}
export function useStep() {
    const ctx = useContext(StepsContext);
    assertContext("useStep", ctx);
    return {
        step: ctx.steps[ctx.currentIndex],
        currentIndex: ctx.currentIndex,
    };
}
export function useStepsController() {
    const ctx = useContext(StepsControllerContext);
    assertContext("useStepsController", ctx);
    return ctx;
}
