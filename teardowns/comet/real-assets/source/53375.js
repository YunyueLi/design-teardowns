// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { createRoot } from "react-dom/client";
import { assert } from "./assert.js";
import { SentryConfigurator } from "./sentry_configurator.js";
export function startClient(selector, component) {
    const SENTRY_DSN = window.PERPLEXITY_JS_SENTRY_DSN ?? "";
    const ENVIRONMENT = window.PERPLEXITY_ENVIRONMENT;
    SentryConfigurator.build(SENTRY_DSN, {
        type: "UI",
        environment: ENVIRONMENT,
        version: window.PERPLEXITY_VERSION ?? "development",
    });
    const doReload = () => window.location.reload();
    window.addEventListener("error", () => setTimeout(doReload, 1000), false);
    const client = () => {
        const root = document.querySelector(selector);
        assert(root instanceof HTMLElement, `Failed to render client, ${selector} is not HTMLElement`);
        createRoot(root).render(component);
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", client);
    }
    else {
        client();
    }
}
