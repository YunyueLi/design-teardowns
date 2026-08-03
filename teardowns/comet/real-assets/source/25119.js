// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "/strings.m.js";
import "chrome://resources/cr_elements/cr_icon/cr_icon.js";
import { I18nMixinLit } from "//resources/cr_elements/i18n_mixin_lit.js";
import "chrome://resources/perplexity/icons/icons.html.js";
import "./spotlight_shortcut_view.js";
import "./base_autocomplete_match.js";
import { CrLitElement } from "//resources/lit/v3_0/lit.rollup.js";
import { getCss } from "./site_autocomplete_match.css.js";
import { getHtml } from "./site_autocomplete_match.html.js";
import { dispatchAutocompleteMatchActionEvent } from "./events.js";
export class SiteAutocompleteMatchElement extends I18nMixinLit(CrLitElement) {
    static get is() {
        return "site-autocomplete-match";
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
            faviconError: { type: Boolean, state: true },
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
    #faviconError_accessor_storage = false;
    get faviconError() { return this.#faviconError_accessor_storage; }
    set faviconError(value) { this.#faviconError_accessor_storage = value; }
    keydownHandler;
    constructor() {
        super();
        this.keydownHandler = this.onKeydown_.bind(this);
        this.dispatchOpen = this.dispatchOpen.bind(this);
        this.onFaviconError_ = this.onFaviconError_.bind(this);
        this.onFaviconLoad_ = this.onFaviconLoad_.bind(this);
    }
    onKeydown_(event) {
        if (!this.selected) {
            return;
        }
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.dispatchOpen();
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
    onFaviconError_() {
        this.faviconError = true;
    }
    onFaviconLoad_() {
        this.faviconError = false;
    }
}
customElements.define(SiteAutocompleteMatchElement.is, SiteAutocompleteMatchElement);
