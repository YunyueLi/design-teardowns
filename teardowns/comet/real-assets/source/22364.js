import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useRef, useCallback, useEffect } from "react";
import { useStep, Step } from "../context.js";
import { StepLayout } from "../../components/layout/step.js";
import { LegalLinks } from "../../features/legal/legal_links.js";
import { PrivacyPopup } from "../../features/privacy/privacy_popup.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { seconds } from "//resources/perplexity/libs/time.js";
import { StepHeading } from "../../components/layout/step_heading.js";
import { StartButton } from "./start_button.js";
import { AnimatablePart, TransitionType, useLayoutController, } from "../../components/layout/context.js";
import { Portal } from "../../components/layout/portal.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { captureVideoError, VideoError } from "./utils.js";
import { captureError } from "//resources/perplexity/libs/capture_error.js";
import { useStepsControllerWithAnalyticsForStep } from "../../steps/analytics.js";
const INTRO_VIDEO_STUCKED_TIMEOUT = seconds(20);
const wait = async (ms) => {
    return new Promise((res) => setTimeout(res, ms));
};
const VIDEO_SIZE = 436;
export const WelcomeStep = () => {
    const { toNextStep } = useStepsControllerWithAnalyticsForStep(Step.Welcome);
    const [isIntroEnded, setIsIntroEnded] = useState(false);
    const [isIntroRemoved, setIsIntroRemoved] = useState(false);
    const [canCleanUp, setCanCleanUp] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const { step } = useStep();
    const planetContainerRef = useRef(null);
    const planetRef = useRef(null);
    const introRef = useRef();
    const titleRef = useRef(null);
    const footerRef = useRef(null);
    const buttonRef = useRef(null);
    const { animateLayout } = useLayoutController();
    const showHeader = () => {
        animateLayout(AnimatablePart.Header, TransitionType.FadeIn, {
            duration: 1000,
            fill: "forwards",
            easing: "ease-in-out",
        });
    };
    const showStardust = () => {
        animateLayout(AnimatablePart.Stardust, TransitionType.FadeIn, {
            duration: 1600,
            fill: "forwards",
            easing: "ease-in-out",
        });
    };
    const showButton = () => {
        buttonRef.current?.classList.add("b-welcome-step__button-container--visible");
    };
    const hideButton = () => {
        buttonRef.current?.classList.remove("b-welcome-step__button-container--visible");
    };
    const triggerButtonHover = () => {
        setIsButtonHovered(true);
    };
    const removeButtonHover = () => {
        setIsButtonHovered(false);
    };
    const showPlanet = () => {
        planetContainerRef.current?.classList.add("b-welcome-step__video-container--visible");
    };
    const hidePlanet = () => {
        planetContainerRef.current?.classList.remove("b-welcome-step__video-container--visible");
    };
    const startRotatingPlanet = () => {
        planetRef.current?.play();
    };
    const stopRotatingPlanet = () => {
        planetRef.current?.pause();
    };
    const isStepVisible = step === Step.Welcome;
    const timeoutRef = useRef();
    const scheduleSkippingVideoIfTimedOut = useCallback(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            const introVideo = introRef.current;
            if (introVideo && !introVideo.ended) {
                introVideo.pause();
                captureVideoError(introVideo, "Intro hasn't ended after 20 seconds");
            }
            if (!introVideo) {
                captureError(new VideoError("No intro video found for some reason, skipping..."));
            }
            setIsIntroEnded(true);
        }, INTRO_VIDEO_STUCKED_TIMEOUT);
    }, []);
    useEffect(() => {
        scheduleSkippingVideoIfTimedOut();
    }, []);
    /** Warmup animations, because gpu pipeline can be laggy on the onboarding */
    const introRefCallback = useCallback((node) => {
        if (!node)
            return;
        introRef.current = node;
        const warmupAnimations = async () => {
            showPlanet();
            startRotatingPlanet();
            showButton();
            triggerButtonHover();
            await wait(100);
            hidePlanet();
            stopRotatingPlanet();
            hideButton();
            removeButtonHover();
        };
        node.pause();
        warmupAnimations().finally(() => {
            node
                .play()
                .catch((err) => {
                captureVideoError(node, err.message);
            })
                .finally(() => {
                scheduleSkippingVideoIfTimedOut();
            });
        });
    }, []);
    useEffect(() => {
        if (!isStepVisible) {
            animateLayout(AnimatablePart.Gradient, TransitionType.FadeIn);
            animateLayout(AnimatablePart.Orbs, TransitionType.FadeIn);
        }
    }, [animateLayout, isStepVisible]);
    const hideIntroVideo = () => {
        introRef.current?.classList.add("b-welcome-step__video-intro--hidden");
    };
    const showFooter = () => {
        footerRef.current?.classList.add("b-welcome-step__footer--visible");
    };
    const handleClick = () => {
        planetRef.current?.pause();
        setTimeout(() => {
            toNextStep({ action: "continue" });
        }, 50);
        // Remove completely after transition
        setTimeout(() => {
            setCanCleanUp(true);
        }, 1000);
    };
    const removeIntro = () => {
        setIsIntroRemoved(true);
    };
    const showTitle = () => {
        titleRef.current?.classList.add("b-welcome-step__title--visible");
    };
    useEffect(() => {
        if (isIntroEnded) {
            (async () => {
                hideIntroVideo();
                showStardust();
                await wait(1700);
                startRotatingPlanet();
                await wait(50);
                showPlanet();
                await wait(2000);
                showHeader();
                showFooter();
                await wait(1000);
                showTitle();
                await wait(1000);
                removeIntro();
                showButton();
            })();
        }
    }, [isIntroEnded]);
    const handlePlanetError = useCallback(() => {
        if (!planetRef.current)
            return;
        captureVideoError(planetRef.current, "Error while playing planet video");
    }, []);
    const handleIntroEnded = useCallback(() => {
        setIsIntroEnded(true);
    }, []);
    const handleIntroError = useCallback(() => {
        setIsIntroEnded(true);
        if (!introRef.current) {
            captureError(new VideoError("No intro video found"));
            return;
        }
        captureVideoError(introRef.current, "Error while playing intro");
    }, []);
    if (!isStepVisible) {
        return;
    }
    return (_jsx(StepLayout, { title: _jsx("div", { className: "b-welcome-step__title-container", children: _jsx("div", { ref: titleRef, className: "b-welcome-step__title", children: _jsx(StepHeading, { title: i18n("welcome_step_title") }) }) }), content: _jsxs(_Fragment, { children: [_jsxs("div", { ref: planetContainerRef, className: "b-welcome-step__video-container", children: [!canCleanUp && (_jsx("video", { ref: planetRef, muted: true, width: VIDEO_SIZE, height: VIDEO_SIZE, loop: true, onError: handlePlanetError, playsInline: true, className: "b-welcome-step__video", children: _jsx("source", { src: "assets/planet.mp4", type: "video/mp4" }) })), _jsx("div", { className: cx("b-welcome-step__overlay", "b-welcome-step__blur") }), _jsx("div", { className: cx("b-welcome-step__overlay", "b-welcome-step__glow") }), _jsx("div", { className: cx("b-welcome-step__overlay", "b-welcome-step__button-overlay"), children: _jsx("div", { ref: buttonRef, className: "b-welcome-step__button-container", children: _jsx(StartButton, { onClick: handleClick, 
                                    // Use it to prewarm animation
                                    isHovered: isButtonHovered }) }) })] }), isStepVisible && !isIntroRemoved && (_jsx(Portal, { children: _jsx("video", { autoPlay: true, ref: introRefCallback, playsInline: true, onPlay: scheduleSkippingVideoIfTimedOut, onEnded: handleIntroEnded, onError: handleIntroError, src: "assets/comet_intro.mp4", className: cx("b-welcome-step__video-intro") }) }))] }), footer: _jsxs("div", { ref: footerRef, className: "b-welcome-step__footer", children: [_jsx(LegalLinks, { className: "b-welcome-step__legal-links" }), _jsx(PrivacyPopup, {})] }) }));
};
