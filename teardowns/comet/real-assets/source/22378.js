import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useRef } from "react";
import { Button } from "../../components/button/button.js";
import { PickerIcon } from "./icons.js";
import { useClickOutside } from "../../components/popup/use_click_outside.js";
import { CrThemeColorPicker } from "//resources/perplexity/components/cr_components.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { useColorTheme } from "./utils.js";
export const ColorPickerButton = () => {
    const [isCustomColorPickerShown, setIsCustomColorPickerShown] = useState(false);
    const pickerRef = useRef(null);
    useClickOutside(pickerRef, undefined, () => setIsCustomColorPickerShown(false));
    const colorTheme = useColorTheme();
    return (_jsxs("div", { ref: pickerRef, className: "b-color-picker-button__root", children: [_jsx(Button, { onClick: () => setIsCustomColorPickerShown((v) => !v), className: cx("b-color-picker-button__button", isCustomColorPickerShown
                    ? "b-color-picker-button__button--pressed"
                    : undefined), size: "large", shadowed: true, view: "secondary", children: _jsx("div", { className: cx("b-color-picker-button__icon", colorTheme ? "b-color-picker-button__icon--themed" : undefined), children: _jsx(PickerIcon, { width: 16, height: 16 }) }) }), _jsx("div", { className: cx("b-color-picker-button__picker", isCustomColorPickerShown
                    ? "b-color-picker-button__picker--visible"
                    : undefined), children: _jsx(CrThemeColorPicker, { columns: 6 }) })] }));
};
