import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { useCallback } from 'react';
import { cx } from '../libs/classnames.js';
import { toPx } from '../libs/to_px.js';
import sheet from './overlay_popup.css' with { type: 'css' };
document.adoptedStyleSheets.push(sheet);
export const PopupOverlay = ({ children, onClick, isFixedOnTop = false, hasBackground = true }) => {
    const onInsideClick = useCallback((event) => {
        event.stopPropagation();
    }, []);
    return (_jsx("div", { className: cx('b-popup-overlay', {
            'has-background': hasBackground,
            'is-fixed-on-top': isFixedOnTop,
        }), onClick: onClick, children: _jsx("div", { onClick: onInsideClick, children: children }) }));
};
export const PopupContainer = ({ children, className = '', width = 380, minWidth = 380, maxWidth = 'auto', height = 'auto', minHeight = 'auto', maxHeight = 560, borderRadius = 8, background = 'var(--popup-bg-color)', }) => {
    return (_jsx("div", { className: cx('popup-container', className), style: {
            background, borderRadius: toPx(borderRadius),
            width: toPx(width), minWidth: toPx(minWidth), maxWidth: toPx(maxWidth),
            height: toPx(height), minHeight: toPx(minHeight), maxHeight: toPx(maxHeight),
        }, children: children }));
};
