// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import { loadTimeData } from "chrome://resources/js/load_time_data.js";
import { PolymerElement } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { getTemplate } from "./perplexity_shortcuts_page.html.js";
import "./perplexity_shortcuts_page_v2.js";
import "./perplexity_shortcuts_page_v1.js";
export class PerplexityShortcutsPageElement extends PolymerElement {
    static get is() {
        return "perplexity-shortcuts-page";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            prefs: Object,
            useV2_: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("shortcutsPageV2Enabled"),
                readOnly: true,
            },
        };
    }
}
customElements.define(PerplexityShortcutsPageElement.is, PerplexityShortcutsPageElement);
