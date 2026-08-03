// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
/**
 * Check the property existing in the object
 *
 * @param target - The object
 * @param property - The property name
 * @param onlyOwn - If true that will check existing only in own level without checking prototypes
 */
export const has = (target, property, onlyOwn = true) => {
    return onlyOwn ? target.hasOwnProperty(property) : property in target;
};
