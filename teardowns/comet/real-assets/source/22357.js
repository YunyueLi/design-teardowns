import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { cx } from "//resources/perplexity/libs/classnames.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
export const ProfileNameInput = ({ value, onChange, iconSlot, }) => {
    return (_jsx("div", { className: "b-profile-name-input__root", children: _jsx("div", { className: "b-profile-name-input__outer-outline", children: _jsx("div", { className: "b-profile-name-input__inner-outline", children: _jsxs("div", { className: cx("b-profile-name-input__input-wrapper", value
                        ? "b-profile-name-input__input-wrapper--has-value"
                        : undefined), children: [iconSlot, _jsx("input", { value: value, onChange: (e) => onChange(e.target.value), placeholder: i18n("name_input_placeholder"), className: "b-profile-name-input__input" })] }) }) }) }));
};
