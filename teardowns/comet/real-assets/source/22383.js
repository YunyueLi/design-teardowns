// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { addWebUiListener, removeWebUiListener, sendWithPromise, } from "//resources/js/cr.js";
import { makeSentryProxy } from "//resources/perplexity/libs/make_sentry_proxy.js";
export class ImportService {
    #profilesPromise = this.initializeImport();
    async initializeImport() {
        return sendWithPromise("initializeImportDialog");
    }
    getProfiles() {
        return this.#profilesPromise;
    }
    importData(profileIndex, importDataDto) {
        return chrome.send("importData", [profileIndex, importDataDto]);
    }
    importFromBookmarksFile() {
        return chrome.send("importFromBookmarksFile");
    }
    onImportStatusChanged(callback) {
        const listener = addWebUiListener("import-data-status-changed", callback);
        return () => removeWebUiListener(listener);
    }
    static getInstance() {
        if (!instance) {
            instance = makeSentryProxy(ImportService, []);
        }
        return instance;
    }
}
let instance;
export const importService = ImportService.getInstance();
