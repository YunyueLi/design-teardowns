import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useRef } from "react";
import { i18n } from "//resources/perplexity/libs/i18n.js";
const makeQuotedTextBold = (text) => {
    const parts = text.split(/(".*?")/g);
    return parts.map((part) => {
        if (part.startsWith('"') && part.endsWith('"')) {
            return _jsx("strong", { children: part }, part);
        }
        return part;
    });
};
const VIDEO_SIZE = 300;
export const SetDefaultInstructionWin10 = ({ openSettingsButton }) => {
    const videoRef = useRef(null);
    return (_jsxs("div", { className: "b-set-default-instruction-win10__wrapper", style: { "--win10-video-size": `${VIDEO_SIZE}px` }, children: [_jsx("div", { className: "b-set-default-instruction-win10__video-wrapper", children: _jsx("video", { className: "b-set-default-instruction-win10__video", ref: videoRef, muted: true, loop: true, autoPlay: true, preload: "none", playsInline: true, src: "assets/win10_default_browser.mp4" }) }), _jsxs("ul", { className: "b-set-default-instruction-win10__steps", children: [_jsx("li", { className: "b-set-default-instruction-win10__step", children: _jsxs("div", { children: [_jsx("span", { children: i18n("default_step_win10_step_1") }), _jsx("div", { className: "b-set-default-instruction-win10__button-wrapper", children: openSettingsButton })] }) }), _jsx("li", { className: "b-set-default-instruction-win10__step", children: _jsx("span", { children: makeQuotedTextBold(i18n("default_step_win10_step_2")) }) }), _jsx("li", { className: "b-set-default-instruction-win10__step", children: _jsx("span", { children: makeQuotedTextBold(i18n("default_step_win10_step_3")) }) })] })] }));
};
