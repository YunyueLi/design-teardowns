// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { has } from './has.js';
export var ErrorLevel;
(function (ErrorLevel) {
    ErrorLevel["FATAL"] = "fatal";
    ErrorLevel["ERROR"] = "error";
    ErrorLevel["WARNING"] = "warning";
    ErrorLevel["LOG"] = "log";
    ErrorLevel["INFO"] = "info";
    ErrorLevel["DEBUG"] = "debug";
})(ErrorLevel || (ErrorLevel = {}));
export class DetailedError extends Error {
    context;
    /**
     * Create detailed error that can be captured Sentry
     * @param message - Simple error message
     * @param context - Context options for Sentry
     */
    constructor(message, context = {}) {
        super(message);
        this.name = 'DetailedError';
        this.context = context;
        if (has(Error, 'captureStackTrace') && typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
