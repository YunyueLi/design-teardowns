import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { ArrowRightIcon } from "//resources/perplexity/icons/arrow_right_icon.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
export const StartButton = ({ onClick, isHovered = false, }) => {
    return (_jsxs("button", { onClick: onClick, className: cx("b-start-button__root", {
            "b-start-button__root--hovered": isHovered,
        }), children: [_jsx("div", { className: "b-start-button__thumb", children: _jsx(ArrowRightIcon, { width: 24, height: 24 }) }), _jsxs("div", { className: "b-start-button__text-container", children: [_jsx("div", { className: "b-start-button__text b-start-button__text-upper", children: i18n("start_button_label") }), _jsx("div", { className: "b-start-button__text b-start-button__text-lower", children: i18n("start_button_label") })] })] }));
};
