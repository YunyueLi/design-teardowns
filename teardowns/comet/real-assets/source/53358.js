// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { DetailedError } from './detailed_error.js';
/**
 * Error for data that is required but not present
 * @see assert
 * */
export class AssertionError extends DetailedError {
    constructor(message, extra) {
        super(message, { extra });
        this.name = 'AssertionError';
    }
}
/**
 * Verifying invariants
 * @param value - The input that is checked for being truthy
 * @param message - Message of error if assertion will be failed
 * @param extra - Extra payload that will be sent to Sentry as additional unsearchable data
 */
export function assert(value, message = 'Assertion failed', extra) {
    if (!value)
        throw new AssertionError(message, extra);
}
