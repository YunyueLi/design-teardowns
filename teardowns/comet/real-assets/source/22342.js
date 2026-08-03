import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { cx } from "//resources/perplexity/libs/classnames.js";
export const StepLayout = ({ title, subtitle, content, footer, className, }) => {
    return (_jsxs("div", { className: cx("b-step__root", className), children: [_jsx("div", { className: "b-step__title-container", children: typeof title === "string" ? (_jsx("h3", { className: "b-step__title", children: title })) : (title) }), subtitle && (_jsx("div", { className: "b-step__subtitle-container", children: _jsx("div", { className: "b-step__subtitle", children: subtitle }) })), _jsx("div", { className: "b-step__body", children: content }), _jsx("div", { className: "b-step__footer", children: footer })] }));
};
