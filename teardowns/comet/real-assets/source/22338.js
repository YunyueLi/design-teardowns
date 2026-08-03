import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { Children } from "react";
const GAP_BETWEEN_SLIDES = 24;
export const TRANSITION_DURATION_MS = 500;
export const Carousel = ({ currentIndex, children, }) => {
    return (_jsx("div", { style: {
            "--gap": `${GAP_BETWEEN_SLIDES}px`,
            "--current-index": currentIndex,
            "--transition-duration": `${TRANSITION_DURATION_MS}ms`,
        }, className: "b-carousel__root", children: Children.toArray(children).map((slide, index) => (_jsx("div", { className: "b-carousel__slide", children: slide }, index))) }));
};
