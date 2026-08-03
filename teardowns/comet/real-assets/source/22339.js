import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { createContext, useLayoutEffect, useContext, useRef, } from "react";
const LayoutControllerContext = createContext(null);
export const useLayoutController = () => {
    const context = useContext(LayoutControllerContext);
    if (!context) {
        throw new Error("useLayout must be used within LayoutProvider");
    }
    return context;
};
export var AnimatablePart;
(function (AnimatablePart) {
    AnimatablePart["Orbs"] = "orbs";
    AnimatablePart["Gradient"] = "gradient";
    AnimatablePart["Stardust"] = "stardust";
    AnimatablePart["Header"] = "header";
})(AnimatablePart || (AnimatablePart = {}));
export var TransitionType;
(function (TransitionType) {
    TransitionType["FadeIn"] = "fade-in";
    TransitionType["FadeOut"] = "fade-out";
    TransitionType["SlideIn"] = "slide-in";
})(TransitionType || (TransitionType = {}));
export const LayoutController = ({ children, }) => {
    const registry = useRef({
        [AnimatablePart.Orbs]: null,
        [AnimatablePart.Gradient]: null,
        [AnimatablePart.Stardust]: null,
        [AnimatablePart.Header]: null,
    });
    const registerAnimatedElement = (part, element) => (registry.current[part] = element);
    const hide = (part) => {
        const element = registry.current[part];
        if (element) {
            element.style.opacity = "0";
        }
    };
    const animateLayout = (part, tranistionType, options = {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
    }) => {
        const element = registry.current[part];
        if (!element) {
            return;
        }
        if (tranistionType === TransitionType.FadeIn) {
            const { opacity } = window.getComputedStyle(element);
            if (opacity === "0") {
                if (part === AnimatablePart.Gradient) {
                    element.animate([{ opacity: 0 }, { opacity: 0.6 }], options);
                }
                else {
                    element.animate([{ opacity: 0 }, { opacity: 1 }], options);
                }
            }
        }
        if (tranistionType === TransitionType.FadeOut) {
            const { opacity } = window.getComputedStyle(element);
            if (opacity === "1") {
                element.animate([{ opacity: 1 }, { opacity: 0 }], options);
            }
        }
        if (tranistionType === TransitionType.SlideIn) {
            element.animate([
                { transform: "translateY(10%)", opacity: 0 },
                { transform: "translateX(0)", opacity: 1 },
            ], options);
        }
    };
    return (_jsx(LayoutControllerContext.Provider, { value: { registerAnimatedElement, animateLayout, hide }, children: children }));
};
export const useInitLayout = () => {
    const { registerAnimatedElement, hide } = useLayoutController();
    const headerRef = useRef(null);
    const orbsRef = useRef(null);
    const stardustRef = useRef(null);
    const gradientRef = useRef(null);
    useLayoutEffect(() => {
        if (headerRef.current) {
            registerAnimatedElement(AnimatablePart.Header, headerRef.current);
            hide(AnimatablePart.Header);
        }
        if (orbsRef.current) {
            registerAnimatedElement(AnimatablePart.Orbs, orbsRef.current);
            hide(AnimatablePart.Orbs);
        }
        if (stardustRef.current) {
            registerAnimatedElement(AnimatablePart.Stardust, stardustRef.current);
            hide(AnimatablePart.Stardust);
        }
        if (gradientRef.current) {
            registerAnimatedElement(AnimatablePart.Gradient, gradientRef.current);
            hide(AnimatablePart.Gradient);
        }
    }, []);
    return {
        headerRef,
        orbsRef,
        stardustRef,
        gradientRef,
    };
};
