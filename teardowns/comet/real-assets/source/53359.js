// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { DetailedError, ErrorLevel } from "./detailed_error.js";
let sentry = null;
const getConsoleLogger = (level) => {
    if (level === ErrorLevel.DEBUG) {
        return console.debug;
    }
    if (level === ErrorLevel.INFO) {
        return console.info;
    }
    if (level === ErrorLevel.LOG) {
        return console.log;
    }
    if (level === ErrorLevel.WARNING) {
        return console.warn;
    }
    return console.error;
};
/**
 * Reports errors to sentry whether sentry is defined
 */
export const captureError = (error, captureContext = undefined) => {
    if (error instanceof DetailedError) {
        const logger = getConsoleLogger(error.context.level);
        logger(error, error.context.tags, error.context.extra);
    }
    else {
        console.error(error);
    }
    if (sentry) {
        sentry.captureException(error, captureContext);
    }
};
export const filterWithTabId = ["No tab with id:"];
/**
 * Filter errors base on your use case
 * @example tabs.remove(id) we can filter no tab error because its not necessary
 */
export const catchWithFilter = (error, filter = filterWithTabId, onFilterMatching) => {
    if (error instanceof Error &&
        filter.some((item) => error.message.includes(item))) {
        onFilterMatching?.();
        return;
    }
    throw error;
};
/**
 * Defines sentry instance
 * */
export const setGlobalSentryInstance = (instance) => {
    sentry = instance;
};
export const getSentryInstance = () => sentry;
