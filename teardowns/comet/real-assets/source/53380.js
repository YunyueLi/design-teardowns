// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { getSentryInstance } from "./capture_error.js";
export const makeSentryProxy = (WrappedClass, args) => {
    const instance = new WrappedClass(...args);
    return new Proxy(instance, {
        get(target, prop) {
            const value = target[prop];
            if (typeof value === "function") {
                return (...args) => {
                    if (!prop.startsWith("use")) {
                        getSentryInstance()?.addBreadcrumb({
                            category: `${WrappedClass.name}.${prop}`,
                            type: "debug",
                            level: "debug",
                            message: `Calling method ${WrappedClass.name}.${prop}`,
                        });
                    }
                    return value.apply(target, args);
                };
            }
            return value;
        },
    });
};
