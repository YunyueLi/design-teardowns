import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState } from "react";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { TickIcon } from "./tick_icon.js";
export const Checkbox = ({ name, initialValue = true, onChange, value, disabled, hidden, size = "m", }) => {
    const isControlledCheckbox = typeof value !== "undefined" && typeof onChange !== "undefined";
    const [checked, setChecked] = useState(isControlledCheckbox ? value : initialValue);
    const toggle = () => {
        const newValue = !checked;
        setChecked(newValue);
        if (isControlledCheckbox) {
            onChange(newValue);
        }
    };
    return (_jsxs("label", { className: cx("b-checkbox__root", disabled ? `b-checkbox__root--disabled` : undefined, hidden ? `b-checkbox__root--hidden` : undefined, `b-checkbox__root--${size}`), children: [_jsx("input", { id: name, name: name, type: "checkbox", checked: isControlledCheckbox ? value : checked, onChange: toggle, className: "b-checkbox__input" }), _jsx("span", { className: "b-checkbox__custom", children: _jsx("span", { className: "b-checkbox__tick", children: _jsx(TickIcon, { className: "b-checkbox__tick-icon" }) }) })] }));
};
