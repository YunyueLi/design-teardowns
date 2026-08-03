import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { CometIcon } from "./comet_icon.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
export const PopupHeader = ({ children, className, }) => {
    return (_jsxs("header", { className: cx("b-popup-header__root", className), children: [_jsx(CometIcon, {}), _jsx("h2", { className: "b-popup-header__text", children: children })] }));
};
