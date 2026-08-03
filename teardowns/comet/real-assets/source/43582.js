// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import 'chrome://resources/cr_elements/cr_button/cr_button.js';
// Re-export everything from app.ts for comet_app.html.ts
export * from './app.js';
export function handleCustomUrlClick(e) {
    const link = e.currentTarget;
    const originalUrl = link?.dataset["originalUrl"];
    if (originalUrl) {
        e.preventDefault();
        window.location.href = originalUrl;
    }
}
