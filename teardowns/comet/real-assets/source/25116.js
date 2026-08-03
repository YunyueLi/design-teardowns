// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "/strings.m.js";
import "chrome://resources/cr_elements/cr_icon/cr_icon.js";
import "chrome://resources/perplexity/icons/icons.html.js";
import "./spotlight_shortcut_view.js";
import { CrLitElement } from "//resources/lit/v3_0/lit.rollup.js";
import { getCss } from "./base_autocomplete_match.css.js";
import { getHtml } from "./base_autocomplete_match.html.js";
export class BaseAutocompleteMatchElement extends CrLitElement {
    static get is() {
        return "base-autocomplete-match";
    }
    static get styles() {
        return getCss();
    }
    render() {
        return getHtml.bind(this)();
    }
    static get properties() {
        return {
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
    updated(changedProperties) {
        super.updated(changedProperties);
        this.updateTitleVisibility_();
    }
    onTitleSlotchange_() {
        this.updateTitleVisibility_();
    }
    updateTitleVisibility_() {
        const titleElement = this.shadowRoot?.querySelector(".title");
        const titleSlot = this.shadowRoot?.querySelector('slot[name="title"]');
        if (titleElement && titleSlot) {
            const hasContent = titleSlot.assignedNodes().length > 0;
            titleElement.classList.toggle("hidden", !hasContent);
        }
    }
}
customElements.define(BaseAutocompleteMatchElement.is, BaseAutocompleteMatchElement);
