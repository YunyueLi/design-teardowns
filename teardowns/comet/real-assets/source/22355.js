import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useRef } from "react";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { PLANET_JS_CONTROLLER } from "./use_width_animation.js";
export const ProfileAvatar = ({ isHovered, avatar, position, onClick, }) => {
    const ref = useRef(null);
    const [loaded, setLoaded] = useState(false);
    return (_jsxs("button", { className: cx("b-profile-avatar__root", isHovered ? "b-profile-avatar__root--hovered" : undefined), onClick: onClick, children: [_jsx("img", { ref: ref, "data-js-controller": PLANET_JS_CONTROLLER, onLoad: () => setLoaded(true), width: 73, className: cx("b-profile-avatar__avatar", loaded ? "b-profile-avatar__avatar--loaded" : undefined), src: avatar.url }), isHovered && (_jsxs("div", { className: "b-profile-avatar__overlay", children: [_jsx("div", { children: _jsx("div", { className: "b-profile-avatar__number", children: position > 9 ? position : `0${position}` }) }), _jsx("div", { children: _jsx("p", { className: "b-profile-avatar__label", children: avatar.label }) })] }))] }));
};
