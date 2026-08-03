// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import "chrome://resources/cr_elements/cr_button/cr_button.js";
import "chrome://resources/cr_elements/cr_icon/cr_icon.js";
import "chrome://resources/cr_elements/cr_action_menu/cr_action_menu.js";
import "chrome://resources/cr_elements/cr_lazy_render/cr_lazy_render.js";
import { PrefsMixin } from "/shared/settings/prefs/prefs_mixin.js";
import { PolymerElement } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { getTemplate } from "./perplexity_shortcut_dropdown.html.js";
import { AnchorAlignment } from "chrome://resources/cr_elements/cr_action_menu/cr_action_menu.js";
const PerplexityShortcutDropdownElementBase = PrefsMixin(PolymerElement);
export class PerplexityShortcutDropdownElement extends PerplexityShortcutDropdownElementBase {
    static get is() {
        return "perplexity-shortcut-dropdown";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            pref: {
                type: Object,
            },
            options: {
                type: Array,
                value: () => [],
            },
            prefPath: {
                type: String,
                value: '',
            },
            selectedOption_: {
                type: String,
                computed: "computeSelectedOption_(pref.value, options)",
            },
            isMenuOpen_: {
                type: Boolean,
                value: false,
            },
        };
    }
    activeMenu_ = null;
    computeSelectedOption_(prefValue, options) {
        if (prefValue === undefined || !options || options.length === 0) {
            return '';
        }
        const match = options.find(opt => opt.value === prefValue);
        return match ? match.label : (options[0]?.label ?? '');
    }
    onDropdownClick_(e) {
        e.stopPropagation();
        const button = e.currentTarget;
        const lazyRender = this.shadowRoot?.querySelector("#dropdownMenuLazy");
        if (lazyRender) {
            this.activeMenu_ = lazyRender.get();
            if (this.activeMenu_) {
                this.activeMenu_.addEventListener("close", () => {
                    this.isMenuOpen_ = false;
                    this.activeMenu_ = null;
                }, { once: true });
            }
            this.isMenuOpen_ = true;
            this.activeMenu_?.showAt(button, {
                anchorAlignmentX: AnchorAlignment.CENTER,
                anchorAlignmentY: AnchorAlignment.AFTER_END,
                height: 36 + 6,
                width: 120,
            });
        }
    }
    onOptionSelected_(e) {
        e.stopPropagation();
        const target = e.currentTarget;
        const index = Number(target.dataset['index']);
        const option = this.options[index];
        if (option !== undefined && this.prefPath) {
            this.setPrefValue(this.prefPath, option.value);
        }
        this.closeActionMenu_();
    }
    closeActionMenu_() {
        if (this.activeMenu_ && this.activeMenu_.open) {
            this.activeMenu_.close();
        }
        this.isMenuOpen_ = false;
        this.activeMenu_ = null;
    }
    getChevronClass_(isOpen) {
        return isOpen ? "chevron-icon open" : "chevron-icon";
    }
}
customElements.define(PerplexityShortcutDropdownElement.is, PerplexityShortcutDropdownElement);
