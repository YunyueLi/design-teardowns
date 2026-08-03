// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "/strings.m.js";
import "chrome://resources/cr_elements/cr_button/cr_button.js";
import "chrome://resources/cr_elements/cr_icon/cr_icon.js";
import "chrome://resources/cr_elements/cr_input/cr_input.js";
import { I18nMixinLit } from "//resources/cr_elements/i18n_mixin_lit.js";
import "chrome://resources/perplexity/icons/icons.html.js";
import { ColorChangeUpdater } from "//resources/cr_components/color_change_listener/colors_css_updater.js";
import { CrLitElement, } from "//resources/lit/v3_0/lit.rollup.js";
import { AutocompleteService, } from "./autocomplete_service.js";
import { SpotlightBrowserProxy } from "./spotlight_browser_proxy.js";
import { getCss } from "./app.css.js";
import { getHtml } from "./app.html.js";
import "./site_autocomplete_match.js";
import "./query_autocomplete_match.js";
import "./autocomplete_matches.js";
const emptyInput = {
    text: "",
    inline: "",
    icon: "",
};
export class SpotlightAppElement extends I18nMixinLit(CrLitElement) {
    static get is() {
        return "spotlight-app";
    }
    static get styles() {
        return getCss();
    }
    render() {
        return getHtml.bind(this)();
    }
    static get properties() {
        return {
            searchQuery_: { type: String },
            searchResults_: { type: Array },
            isDeletingInput_: { type: Boolean },
            lastInput_: { type: Object },
        };
    }
    #searchQuery__accessor_storage = "";
    get searchQuery_() { return this.#searchQuery__accessor_storage; }
    set searchQuery_(value) { this.#searchQuery__accessor_storage = value; }
    #searchResults__accessor_storage = [];
    get searchResults_() { return this.#searchResults__accessor_storage; }
    set searchResults_(value) { this.#searchResults__accessor_storage = value; }
    #isDeletingInput__accessor_storage = false;
    get isDeletingInput_() { return this.#isDeletingInput__accessor_storage; }
    set isDeletingInput_(value) { this.#isDeletingInput__accessor_storage = value; }
    #lastInput__accessor_storage = emptyInput;
    get lastInput_() { return this.#lastInput__accessor_storage; }
    set lastInput_(value) { this.#lastInput__accessor_storage = value; }
    autocompleteService_;
    spotlightProxy_;
    resultsCallback_;
    lastQueriedInput_ = "";
    pastedInInput_ = false;
    cachedZeroSuggestions_ = [];
    constructor() {
        super();
        this.autocompleteService_ = AutocompleteService.getInstance();
        this.spotlightProxy_ = SpotlightBrowserProxy.getInstance();
        this.resultsCallback_ = this.onAutocompleteResults_.bind(this);
        ColorChangeUpdater.forDocument().start();
    }
    connectedCallback() {
        super.connectedCallback();
        this.autocompleteService_.initialize();
        this.autocompleteService_.addResultsCallback(this.resultsCallback_);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.autocompleteService_.removeResultsCallback(this.resultsCallback_);
        this.autocompleteService_.dispose();
        this.clearSearch_();
        this.updateSearchResult_([]);
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.$.searchInput.focus();
        this.queryZeroSuggest();
        this.spotlightProxy_.showSpotlight();
    }
    onSearchInput_(event) {
        const input = event.target;
        const inputValue = input.value;
        const lastInputValue = this.lastInput_.text + this.lastInput_.inline;
        if (lastInputValue === inputValue) {
            return;
        }
        this.updateInput_({ text: inputValue, inline: "" });
        // For spotlight, re-query autocomplete for all updates to the input
        this.queryAutocomplete_(inputValue, event.isComposing);
        if (!inputValue.trim()) {
            this.clearSearch_();
            this.setZeroResults_();
        }
        this.pastedInInput_ = false;
    }
    /**
     * Updates the input state (text and inline autocompletion) with |update|.
     * Based on searchbox.ts implementation for accurate inline selection handling.
     */
    updateInput_(update) {
        const newInput = Object.assign({}, this.lastInput_, update);
        const newInputValue = newInput.text + newInput.inline;
        const lastInputValue = this.lastInput_.text + this.lastInput_.inline;
        // Selection could be already changed by user, so we think the inline part
        // differs only if it differs from previous computed value
        const currentSelection = this.$.searchInput.value.substring(this.$.searchInput.selectionStart, this.$.searchInput.selectionEnd);
        const inlineDiffers = newInput.inline !== this.lastInput_.inline &&
            currentSelection === this.lastInput_.inline;
        const preserveSelection = !inlineDiffers && !update.moveCursorToEnd;
        let needsSelectionUpdate = !preserveSelection;
        const oldSelectionStart = this.$.searchInput.selectionStart;
        const oldSelectionEnd = this.$.searchInput.selectionEnd;
        if (newInputValue !== this.$.searchInput.value) {
            this.$.searchInput.value = newInputValue;
            needsSelectionUpdate = true; // Setting .value blows away selection.
        }
        if (newInputValue.trim() && needsSelectionUpdate) {
            // If the cursor is to be moved to the end (implies selection should not
            // be preserved), set the selection start to same as the selection end.
            this.$.searchInput.selectionStart = preserveSelection
                ? oldSelectionStart
                : update.moveCursorToEnd
                    ? newInputValue.length
                    : newInput.text.length;
            this.$.searchInput.selectionEnd = preserveSelection
                ? oldSelectionEnd
                : newInputValue.length;
        }
        this.isDeletingInput_ =
            lastInputValue.length > newInputValue.length &&
                lastInputValue.startsWith(newInputValue);
        this.lastInput_ = newInput;
    }
    onAutocompleteResults_(results, queriedInput) {
        if (this.lastQueriedInput_ === queriedInput) {
            // Only process results that match the last queried input to avoid stale results
            this.updateSearchResult_(results);
        }
        if (queriedInput === "" &&
            results.length > 0 &&
            results.length !== this.cachedZeroSuggestions_.length) {
            this.cacheZeroResults_(results);
        }
    }
    onMatchSelected_(event) {
        this.$.searchInput.focus();
        const fillIntoEdit = event.detail.fillIntoEdit;
        const inlineAutocompletion = event.detail.inlineAutocompletion;
        let textPart = fillIntoEdit.substring(0, fillIntoEdit.length - inlineAutocompletion.length);
        // Try to respect user input's case
        textPart =
            this.lastQueriedInput_?.toLocaleLowerCase() ===
                textPart.toLocaleLowerCase()
                ? this.lastQueriedInput_
                : textPart;
        // Patching a behavior (prob bug) where for input ended with " " or "/" first match's fillIntoEdit
        // should have the symbol in the end, but doesn't have it
        const shouldPreventFilling = event.detail.isAutoselectedMetadata &&
            this.lastQueriedInput_ &&
            (this.lastQueriedInput_.endsWith(" ") ||
                this.lastQueriedInput_.endsWith("/"));
        if (shouldPreventFilling) {
            return;
        }
        if (event.detail.allowedToBeDefaultMatch &&
            event.detail.inlineAutocompletion.length) {
            this.updateInput_({
                text: textPart,
                inline: inlineAutocompletion,
                moveCursorToEnd: false,
                icon: event.detail.displayImage,
            });
        }
        else {
            this.updateInput_({
                text: fillIntoEdit,
                inline: "",
                moveCursorToEnd: !event.detail.isAutoselectedMetadata,
                icon: event.detail.displayImage,
            });
        }
    }
    setZeroResults_() {
        this.updateSearchResult_(this.cachedZeroSuggestions_);
    }
    cacheZeroResults_(value) {
        this.cachedZeroSuggestions_ = value;
    }
    updateSearchResult_(value) {
        this.searchResults_ = value;
    }
    queryAutocomplete_(input, preventInlineAutocomplete = false) {
        this.lastQueriedInput_ = input;
        const caretNotAtEnd = this.$.searchInput.selectionStart !== input.length;
        preventInlineAutocomplete =
            preventInlineAutocomplete ||
                this.isDeletingInput_ ||
                this.pastedInInput_ ||
                caretNotAtEnd;
        if (input === "" && this.cachedZeroSuggestions_.length > 0) {
            this.updateSearchResult_(this.cachedZeroSuggestions_.slice());
            return;
        }
        this.autocompleteService_.performSearch(input, preventInlineAutocomplete);
    }
    onInputKeydown_(e) {
        // Ignore this event if the input does not have any inline autocompletion.
        if (!this.lastInput_.inline) {
            return;
        }
        const inputValue = this.$.searchInput.value;
        const inputSelection = inputValue.substring(this.$.searchInput.selectionStart, this.$.searchInput.selectionEnd);
        const lastInputValue = this.lastInput_.text + this.lastInput_.inline;
        // If the current input state (its value and selection) matches its last
        // state (text and inline autocompletion) and the user types the next
        // character in the inline autocompletion, stop the keydown event. Just move
        // the selection and requery autocomplete. This is needed to avoid flicker.
        if (inputSelection === this.lastInput_.inline &&
            inputValue === lastInputValue &&
            this.lastInput_.inline[0].toLocaleLowerCase() ===
                e.key.toLocaleLowerCase()) {
            const text = this.lastInput_.text + e.key;
            this.updateInput_({
                text: text,
                inline: this.lastInput_.inline.substr(1),
            });
            this.queryAutocomplete_(this.lastInput_.text);
            e.preventDefault();
        }
    }
    onInputPaste_() {
        this.pastedInInput_ = true;
    }
    clearSearch_() {
        this.searchQuery_ = "";
        this.isDeletingInput_ = false;
        this.lastInput_ = emptyInput;
        this.lastQueriedInput_ = "";
        this.pastedInInput_ = false;
        const searchInput = this.shadowRoot?.querySelector("#searchInput");
        if (searchInput) {
            searchInput.value = "";
        }
    }
    queryZeroSuggest() {
        this.queryAutocomplete_("", false);
    }
}
customElements.define(SpotlightAppElement.is, SpotlightAppElement);
