import { jsx as _jsx } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useMemo } from "react";
import { cx } from "//resources/perplexity/libs/classnames.js";
const hasCyrillicLetters = (text) => {
    return /[\u0400-\u04FF]/.test(text);
};
export const StepHeading = ({ title, italicIndices = [] }) => {
    const shouldRenderByLetter = italicIndices.length > 0;
    const letters = useMemo(() => title.split("").map((letter, index) => ({
        letter,
        isItalic: italicIndices?.includes(index) || false,
    })), [title, italicIndices]);
    return (_jsx("h3", { className: cx("b-step-heading__root", hasCyrillicLetters(title) ? "b-step-heading__root--cyrillic" : undefined), children: shouldRenderByLetter
            ? letters.map(({ letter, isItalic }, index) => (_jsx("span", { className: cx("b-step-heading__letter", isItalic ? "b-step-heading__letter--italic" : undefined), children: letter }, `${letter}-${index}`)))
            : title }));
};
