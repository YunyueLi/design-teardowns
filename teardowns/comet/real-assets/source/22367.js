import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useId } from "react";
import { Checkbox } from "../../components/checkbox/checkbox.js";
export const ImportOptionCheckbox = ({ id, title, value, onChange }) => {
    const uniqId = useId();
    return (_jsxs("div", { className: "b-import-option-checkbox__root", children: [_jsx(Checkbox, { value: value, onChange: (value) => onChange(id, value), name: uniqId, size: "s" }), _jsx("label", { className: "b-import-option-checkbox__label", htmlFor: uniqId, children: title })] }));
};
