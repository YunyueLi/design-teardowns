// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
/**
 * @param value string that should be parsed
 * @returns parsed JSON or undefined if something went wrong
 */
export const parseJson = (value) => {
    if (!value)
        return undefined;
    try {
        return JSON.parse(value);
    }
    catch (err) {
        return undefined;
    }
};
