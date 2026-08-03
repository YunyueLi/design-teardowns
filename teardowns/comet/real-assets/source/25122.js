// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { CrLitElement, css } from "//resources/lit/v3_0/lit.rollup.js";
import { isMac } from "//resources/js/platform.js";
import { getHtml } from "./spotlight_shortcut_view.html.js";
export var SpecialKey;
(function (SpecialKey) {
    SpecialKey["Ctrl"] = "Ctrl";
    SpecialKey["Shift"] = "Shift";
    SpecialKey["Meta"] = "Meta";
})(SpecialKey || (SpecialKey = {}));
function formatKey(key) {
    if (key === SpecialKey.Ctrl) {
        return isMac ? "⌃" : "Ctrl";
    }
    if (key === SpecialKey.Shift) {
        return isMac ? "⇧" : "Shift";
    }
    if (key === SpecialKey.Meta) {
        return isMac ? "⌘" : "Win";
    }
    return key;
}
export class SpotlightShortcutViewElement extends CrLitElement {
    static get is() {
        return "spotlight-shortcut-view";
    }
    static get styles() {
        return css `
      :host {
        display: inline-block;
      }

      .shortcut {
        --default-font: "Berkeley Mono", monospace;

        display: inline-block;
        padding: 4px 6px;
        border: 1px solid var(--perplexity-border-offset-dynamic);
        border-radius: 4px;
        font-family: var(--spotlight-shortcut-view-font, var(--default-font));
        font-size: 11px;
        line-height: 11px;
        color: var(--perplexity-text-secondary-v2);
        white-space: nowrap;
        user-select: none;
      }

      .system-font {
        --spotlight-shortcut-view-font: system-ui, sans-serif;
      }
    `;
    }
    render() {
        return getHtml.bind(this)();
    }
    static get properties() {
        return {
            combination: { type: String },
            useSystemFont: { type: Boolean },
        };
    }
    #combination_accessor_storage = "";
    get combination() { return this.#combination_accessor_storage; }
    set combination(value) { this.#combination_accessor_storage = value; }
    #useSystemFont_accessor_storage = false;
    get useSystemFont() { return this.#useSystemFont_accessor_storage; }
    set useSystemFont(value) { this.#useSystemFont_accessor_storage = value; }
    /**
     * - `${SpecialKey.CTRL} V` -> "Ctrl V" on Windows, "^ V" on Mac
     * - `${SpecialKey.SHIFT} tab` -> "Shift tab" on Windows, "⇧ tab" on Mac
     * - "tab" -> "tab"
     */
    renderKeys_() {
        if (!this.combination || this.combination.length === 0) {
            return "";
        }
        return this.combination
            .split(" ")
            .map((key) => formatKey(key))
            .join(" ");
    }
}
customElements.define(SpotlightShortcutViewElement.is, SpotlightShortcutViewElement);
