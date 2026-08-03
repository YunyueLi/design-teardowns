// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { SearchboxBrowserProxy } from "//resources/cr_components/searchbox/searchbox_browser_proxy.js";
import { AutocompleteMatchFactory } from "./autocomplete_match_factory.js";
export class AutocompleteService {
    static instance_ = null;
    browserProxy_;
    callbackRouter_;
    autocompleteResultChangedListenerId_ = null;
    searchTimeout_ = null;
    isInitialized_ = false;
    searchEnginesInfo_ = null;
    onResultsCallbacks_ = new Set();
    constructor() {
        this.browserProxy_ = SearchboxBrowserProxy.getInstance();
        this.callbackRouter_ = this.browserProxy_.callbackRouter;
    }
    getSearchEnginesInfo() {
        return this.searchEnginesInfo_;
    }
    static getInstance() {
        if (!AutocompleteService.instance_) {
            AutocompleteService.instance_ = new AutocompleteService();
        }
        return AutocompleteService.instance_;
    }
    static resetInstance() {
        if (AutocompleteService.instance_) {
            AutocompleteService.instance_.dispose();
            AutocompleteService.instance_ = null;
        }
    }
    initialize() {
        if (this.isInitialized_) {
            return;
        }
        this.autocompleteResultChangedListenerId_ =
            this.callbackRouter_.autocompleteResultChanged.addListener(this.onAutocompleteResultChanged_.bind(this));
        this.#fetchSearchEnginesInfo();
        this.isInitialized_ = true;
    }
    async #fetchSearchEnginesInfo() {
        try {
            const { info } = await this.browserProxy_.handler.getSearchEnginesInfo();
            this.searchEnginesInfo_ = info;
            // Initialize the factory with primary search engine name
            if (info?.primary?.name) {
                AutocompleteMatchFactory.init({
                    searchEngine: info.primary.name,
                    searchEnginesInfo: info,
                });
            }
        }
        catch (error) {
            console.error("Failed to fetch search engines info:", error);
            // Fallback to the old method
            this.#getDefaultSearchEngineName().then((searchEngine) => {
                if (searchEngine) {
                    AutocompleteMatchFactory.init({ searchEngine });
                }
            });
        }
    }
    dispose() {
        if (this.autocompleteResultChangedListenerId_) {
            this.callbackRouter_.removeListener(this.autocompleteResultChangedListenerId_);
            this.autocompleteResultChangedListenerId_ = null;
        }
        if (this.searchTimeout_) {
            clearTimeout(this.searchTimeout_);
            this.searchTimeout_ = null;
        }
        this.onResultsCallbacks_.clear();
        this.isInitialized_ = false;
    }
    addResultsCallback(callback) {
        this.onResultsCallbacks_.add(callback);
    }
    removeResultsCallback(callback) {
        this.onResultsCallbacks_.delete(callback);
    }
    performSearch(query, preventInlineAutocomplete = false) {
        this.executeSearch_(query, preventInlineAutocomplete);
    }
    openAutocompleteMatch(matchIndex, url, mouseButton = 0, modifierKeys = {}) {
        try {
            this.browserProxy_.handler.openAutocompleteMatch(matchIndex, url, true, // are_matches_showing
            mouseButton, modifierKeys.altKey || false, modifierKeys.ctrlKey || false, modifierKeys.metaKey || false, modifierKeys.shiftKey || false);
        }
        catch (error) {
            console.error("Failed to open autocomplete match:", error);
        }
    }
    executeSearch_(query, preventInlineAutocomplete = false) {
        try {
            this.browserProxy_.handler.queryAutocomplete(query, preventInlineAutocomplete);
        }
        catch (error) {
            console.error("Failed to perform search:", error);
        }
    }
    onAutocompleteResultChanged_(result) {
        const convertedResults = this.convertAutocompleteResultToSuggests_(result);
        this.onResultsCallbacks_.forEach((callback) => {
            try {
                callback(convertedResults, result.input);
            }
            catch (error) {
                console.error("Error in results callback:", error);
            }
        });
    }
    convertAutocompleteResultToSuggests_(result) {
        return AutocompleteMatchFactory.fromAutocompleteResult(result);
    }
    async #getDefaultSearchEngineName() {
        const pref = await chrome.settingsPrivate.getPref("default_search_provider_data.template_url_data");
        if (pref.value && "short_name" in pref.value) {
            return pref.value.short_name;
        }
        return null;
    }
}
