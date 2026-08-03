// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import "chrome://resources/cr_elements/cr_button/cr_button.js";
import "chrome://resources/cr_elements/cr_icon/cr_icon.js";
import { I18nMixin } from "chrome://resources/cr_elements/i18n_mixin.js";
import { PolymerElement } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { getTemplate } from "./perplexity_menu_action.html.js";
const PerplexityMenuActionElementBase = I18nMixin(PolymerElement);
export class PerplexityMenuActionElement extends PerplexityMenuActionElementBase {
    static get is() {
        return "perplexity-menu-action";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            actionId: {
                type: String,
                value: "",
                observer: "onActionIdChanged_",
            },
            shortcut: {
                type: Object,
            },
            action_: {
                type: Object,
                value: () => ({ label: "", icon: "" }),
            },
        };
    }
    onActionIdChanged_() {
        switch (this.actionId) {
            case "add-alternative":
                this.action_ = {
                    label: this.i18n("addAlternativeShortcutAction"),
                    icon: "pplx:plus",
                };
                break;
            case "remove-shortcut":
                this.action_ = {
                    label: this.i18n("removeShortcutAction"),
                    icon: "pplx:trash",
                };
                break;
            case "reset-to-default":
                this.action_ = {
                    label: this.i18n("resetToDefaultShortcutAction"),
                    icon: "pplx:reload",
                };
                break;
            default:
                this.action_ = { label: "", icon: "" };
        }
    }
    onClick_(e) {
        e.stopPropagation();
        let detail = undefined;
        switch (this.actionId) {
            case "remove-shortcut":
            case "reset-to-default":
                detail = this.shortcut ? { shortcut: this.shortcut } : undefined;
                break;
            case "add-alternative":
                break;
        }
        this.dispatchEvent(new CustomEvent(this.actionId, {
            bubbles: true,
            composed: true,
            detail,
        }));
    }
}
customElements.define(PerplexityMenuActionElement.is, PerplexityMenuActionElement);
