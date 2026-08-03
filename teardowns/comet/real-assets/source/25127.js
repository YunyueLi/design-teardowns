// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "/strings.m.js";
import "chrome://resources/cr_elements/cr_icon/cr_icon.js";
import { I18nMixinLit } from "//resources/cr_elements/i18n_mixin_lit.js";
import "chrome://resources/perplexity/icons/icons.html.js";
import "./base_autocomplete_match.js";
import "./spotlight_shortcut_view.js";
import { CrLitElement } from "//resources/lit/v3_0/lit.rollup.js";
import { SpecialKey } from "./spotlight_shortcut_view.js";
import { dispatchAutocompleteMatchActionEvent } from "./events.js";
import { getCss } from "./query_autocomplete_match.css.js";
import { getHtml } from "./query_autocomplete_match.html.js";
import { isMac } from "//resources/js/platform.js";
import { AutocompleteMatchFactory } from "./autocomplete_match_factory.js";
export class QueryAutocompleteMatchElement extends I18nMixinLit(CrLitElement) {
    static get is() {
        return "query-autocomplete-match";
    }
    static get styles() {
        return getCss();
    }
    render() {
        return getHtml.bind(this)();
    }
    static get properties() {
        return {
            data: { type: Object },
            selected: { type: Boolean },
            hovered: { type: Boolean },
        };
    }
    #selected_accessor_storage;
    get selected() { return this.#selected_accessor_storage; }
    set selected(value) { this.#selected_accessor_storage = value; }
    #hovered_accessor_storage;
    get hovered() { return this.#hovered_accessor_storage; }
    set hovered(value) { this.#hovered_accessor_storage = value; }
    #data_accessor_storage;
    get data() { return this.#data_accessor_storage; }
    set data(value) { this.#data_accessor_storage = value; }
    keydownHandler;
    constructor() {
        super();
        this.keydownHandler = this.onKeydown_.bind(this);
        this.dispatchOpen = this.dispatchOpen.bind(this);
    }
    getSecondaryEngine() {
        return AutocompleteMatchFactory.getSecondarySearchEngine();
    }
    getSecondaryShortcutCombination_() {
        return `${isMac ? SpecialKey.Meta : "Ctrl"} ⏎`;
    }
    onKeydown_(event) {
        if (!this.selected) {
            return;
        }
        const hasModifier = (isMac && event.metaKey) || (!isMac && event.shiftKey);
        if (!hasModifier && event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.dispatchOpen();
        }
        if (hasModifier && event.key === "Enter") {
            const secondaryEngine = this.getSecondaryEngine();
            // Only dispatch secondary search if the engine is available
            if (secondaryEngine?.isAvailable) {
                event.preventDefault();
                event.stopPropagation();
                dispatchAutocompleteMatchActionEvent(this, "search-secondary", {
                    url: this.data.payload.url,
                    line: this.data.payload.line,
                });
            }
        }
    }
    dispatchOpen() {
        dispatchAutocompleteMatchActionEvent(this, "open", {
            url: this.data.payload.url,
            line: this.data.payload.line,
        });
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("keydown", this.keydownHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("keydown", this.keydownHandler);
    }
    // TODO(nikizrailev): make separate type of match for apps
    isAppMatch_() {
        return this.data.payload.type === "app";
    }
    renderTextForActionBadge_(engineName) {
        if (this.isAppMatch_()) {
            return this.i18n("open_app_badge_text");
        }
        const isPerplexity = engineName.includes("Perplexity");
        if (isPerplexity) {
            return this.i18n("ask_using_search_engine_navigation_tail");
        }
        return this.i18n("search_using_search_engine_navigation_tail", engineName);
    }
}
customElements.define(QueryAutocompleteMatchElement.is, QueryAutocompleteMatchElement);
