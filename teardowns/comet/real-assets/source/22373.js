import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import { useRef, useState } from "react";
import { Button } from "../../components/button/button.js";
import { Popup } from "../../components/popup/popup.js";
import { Portal } from "../../components/layout/portal.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
const POPUP_WIDTH = 356;
export const PrivacyPopup = () => {
    const [opened, setOpened] = useState(false);
    const anchorRef = useRef(null);
    const openPopup = () => {
        setOpened(true);
    };
    const closePopup = () => {
        setOpened(false);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "b-privacy-popup__line", children: [i18n("privacy_link_text"), " ", _jsx("button", { ref: anchorRef, type: "button", className: "b-privacy-popup__link", onClick: openPopup, children: i18n("privacy_link_label") }), " ", i18n("privacy_link_suffix")] }), opened && (_jsxs(Portal, { children: [_jsx("div", { className: "b-privacy-popup__backdrop" }), _jsxs(Popup, { radius: "s", width: POPUP_WIDTH, onClickOutside: closePopup, anchorRef: anchorRef, className: "b-privacy-popup__popup", children: [_jsx("p", { className: "b-privacy-popup__title", children: i18n("privacy_popup_title") }), _jsx("p", { className: "b-privacy-popup__body", children: i18n("privacy_popup_body") }), _jsx("div", { className: "b-privacy-popup__actions", children: _jsx(Button, { className: "b-privacy-popup__button", view: "primary", onClick: closePopup, children: i18n("done_button_label") }) })] })] }))] }));
};
