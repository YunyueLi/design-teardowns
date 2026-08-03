import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { cx } from "//resources/perplexity/libs/classnames.js";
export const Button = ({ children, view, size = "default", className, shadowed, ...nativeProps }) => {
    return (_jsx("button", { type: "button", className: cx("b-button", `b-button--${view}`, `b-button--size-${size}`, shadowed ? "b-button--shadowed" : undefined, className), ...nativeProps, children: children }));
};
