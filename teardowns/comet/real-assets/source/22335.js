import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useRef } from "react";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { useClickOutside } from "./use_click_outside.js";
export const Popup = ({ heading, children, width = 800, radius = "m", bgColor = "raised", className, onClickOutside, anchorRef, }) => {
    const ref = useRef(null);
    useClickOutside(ref, anchorRef, onClickOutside);
    return (_jsxs("section", { ref: ref, className: cx("b-popup__root", `b-popup__root--radius-${radius}`, `b-popup__root--bg-${bgColor}`, className), style: { width }, children: [heading && _jsx("div", { className: "b-popup__heading", children: heading }), children] }));
};
