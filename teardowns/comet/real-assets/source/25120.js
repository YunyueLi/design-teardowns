// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { SpotlightHandler } from './perplexity_spotlight.mojom-webui.js';
let instance = null;
export class SpotlightBrowserProxy {
    handler;
    constructor() {
        this.handler = SpotlightHandler.getRemote();
    }
    static getInstance() {
        if (!instance) {
            instance = new SpotlightBrowserProxy();
        }
        return instance;
    }
    static setInstance(obj) {
        instance = obj;
    }
    showSpotlight() {
        this.handler.showSpotlight();
    }
}
