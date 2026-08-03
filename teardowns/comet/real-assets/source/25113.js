// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { composeFavicon2Url } from "//resources/perplexity/libs/favicon.js";
import { validUrl } from "//resources/perplexity/libs/url.js";
export class AutocompleteMatchFactory {
    static #searchEngine = "Perplexity";
    static #searchEnginesInfo = null;
    static init(params) {
        this.#searchEngine = params.searchEngine;
        if (params.searchEnginesInfo) {
            this.#searchEnginesInfo = params.searchEnginesInfo;
        }
    }
    static getSecondarySearchEngine() {
        const secondary = this.#searchEnginesInfo?.secondary;
        if (!secondary) {
            return null;
        }
        return {
            name: secondary.name,
            keyword: secondary.keyword,
            isAvailable: secondary.isAvailable,
        };
    }
    static fromAutocompleteResult(result) {
        return this.#uniqOnly(result.matches
            .map((match, index) => this.fromAutocompleteMatchMojo(match, index))
            .filter(Boolean));
    }
    static fromAutocompleteMatchMojo(mojoMatch, index) {
        console.log(`mojoMatch ${index}`, mojoMatch);
        if (this.#isSiteMatch(mojoMatch.type)) {
            return this.#createSiteMatch(mojoMatch, index);
        }
        else if (this.#isQueryMatch(mojoMatch)) {
            return this.#createQueryMatch(mojoMatch, index);
        }
        else {
            return null;
        }
    }
    static #isSiteMatch(mojoType) {
        const navigationTypes = [
            "url-what-you-typed",
            "history-url",
            "history-title",
            "history-body",
            "history-keyword",
            "navsuggest",
            "navsuggest-personalized",
            "bookmark-title",
            "clipboard-url",
            "open-tab",
            "tile-most-visited-site",
            "tile-navsuggest",
        ];
        return navigationTypes.includes(mojoType);
    }
    static #isQueryMatch(mojoMatch) {
        const queryTypes = [
            "search-what-you-typed",
            "search-history",
            "search-suggest",
            "search-suggest-entity",
            "search-suggest-tail",
            "search-suggest-personalized",
            "search-suggest-profile",
            "search-other-engine",
            "voice-suggest",
            "clipboard-text",
            "tile-suggestion",
            "tile-repeatable-query",
            "featured-enterprise-search",
            "history-embeddings-answer",
            "perplexity-mac-app",
        ];
        return mojoMatch.isSearchType || queryTypes.includes(mojoMatch.type);
    }
    static #createSiteMatch(mojoMatch, line) {
        const commonData = this.#getCommonAutocompleteData(mojoMatch, line);
        return {
            type: "site",
            payload: {
                ...commonData,
                name: mojoMatch.description,
                fillIntoEdit: mojoMatch.contents,
                displayImage: this.#getFaviconUrl(mojoMatch),
                isTabOpen: false,
            },
        };
    }
    static #createQueryMatch(mojoMatch, line = 0) {
        const commonData = this.#getCommonAutocompleteData(mojoMatch, line);
        // Use iconUrl (data URI for app icons) or imageUrl for the display image.
        const displayImage = mojoMatch.iconUrl || mojoMatch.imageUrl || "";
        return {
            type: "query",
            payload: {
                ...commonData,
                displayImage,
                type: this.getQueryType(mojoMatch),
                imageUrl: mojoMatch.imageUrl,
                isRichSuggestion: mojoMatch.isRichSuggestion,
                description: mojoMatch.description,
                searchEngine: this.#searchEngine,
            },
        };
    }
    static getQueryType(mojoMatch) {
        const { type: mojoType } = mojoMatch;
        if (mojoType === "perplexity-mac-app") {
            return "app";
        }
        if (mojoType === "search-history") {
            return "historical";
        }
        return "default";
    }
    // In spotlight we don't need separate lines for primary and secondary search engines
    // so we deduplicate them and remove unnecessary description.
    // TODO: filter them in the C++ controller
    static #uniqOnly(matches) {
        const uniqueContentStorage = new Map();
        return matches.reduce((acc, next, index) => {
            const { payload } = next;
            const key = `${payload.backendType}+${payload.content}`;
            if (uniqueContentStorage.has(key)) {
                // Duplicated entries differ only in description, so we don't need it anymore
                const uniqItemIndex = uniqueContentStorage.get(key);
                const uniqItem = acc[uniqItemIndex];
                if (uniqItem?.payload && "description" in uniqItem?.payload) {
                    uniqItem.payload.description = "";
                }
                return acc;
            }
            uniqueContentStorage.set(key, index);
            acc.push(next);
            return acc;
        }, []);
    }
    static #getCommonAutocompleteData(mojoMatch, line) {
        return {
            url: this.#getUrl(mojoMatch),
            line,
            content: mojoMatch.contents,
            inlineAutocompletion: mojoMatch.inlineAutocompletion,
            allowedToBeDefaultMatch: mojoMatch.allowedToBeDefaultMatch,
            fillIntoEdit: mojoMatch.fillIntoEdit,
            backendType: mojoMatch.type,
        };
    }
    static #getUrl(mojoMatch) {
        return mojoMatch.destinationUrl ?? "";
    }
    static #getFaviconUrl(match) {
        // Use icon_url if available (e.g., for Mac app icons as data URIs).
        if (match.iconUrl) {
            return match.iconUrl;
        }
        const url = this.#getUrl(match);
        if (validUrl(url)) {
            return composeFavicon2Url(url, 64, true);
        }
        return "";
    }
}
