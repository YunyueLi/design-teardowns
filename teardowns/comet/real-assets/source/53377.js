// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
/**
 * Return value with px postfix
 *
 * @example
 * ```ts
 *   toPx('100%') // => '100%'
 *   toPx(100) // => '100px'
 * ```
 * */
export const toPx = (value) => {
    if (typeof value === 'number')
        return `${value}px`;
    return value;
};
