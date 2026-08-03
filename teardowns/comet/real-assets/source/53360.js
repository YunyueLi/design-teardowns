// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
const hasOwn = {}.hasOwnProperty;
function appendClass(value, newClass) {
    if (!newClass)
        return value;
    return value ? (value + ' ' + newClass) : newClass;
}
function parseValue(arg) {
    if (typeof arg === 'string') {
        return arg;
    }
    if (Array.isArray(arg)) {
        return cx.apply(null, arg);
    }
    if (typeof arg === 'object' && arg !== null) {
        let classes = '';
        for (const key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
                classes = appendClass(classes, key);
            }
        }
        return classes;
    }
    return '';
}
/*
 * Creates a string with a class from parameters
 */
export function cx(...args) {
    let classes = '';
    for (const arg of args) {
        if (arg)
            classes = appendClass(classes, parseValue(arg));
    }
    return classes;
}
