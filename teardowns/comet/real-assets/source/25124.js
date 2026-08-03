// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import "./site_autocomplete_match.js";
import "./query_autocomplete_match.js";
import { CrLitElement, css } from "//resources/lit/v3_0/lit.rollup.js";
import { AutocompleteService } from "./autocomplete_service.js";
import { getHtml } from "./autocomplete_matches.html.js";
export const NO_SELECTION = -1;
export const navigationKeys = Object.freeze([
    "ArrowUp",
    "ArrowDown",
    "Escape",
]);
export class AutocompleteMatchesElement extends CrLitElement {
    static get is() {
        return "autocomplete-matches";
    }
    static get styles() {
        return css `
      .container {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .spotlight-autocomplete-match {
        outline: none;
        scroll-margin: 8px 0;
      }

      .spotlight-autocomplete-match:first-child {
        padding-top: 8px;
      }

      .spotlight-autocomplete-match:last-child {
        scroll-margin-bottom: 8px;
      }
    `;
    }
    render() {
        return getHtml.bind(this)();
    }
    static get properties() {
        return {
            results: { type: Array },
            selectedIndex: { type: Number },
            latestHoveredIndex: { type: Number },
        };
    }
    #results_accessor_storage = [];
    get results() { return this.#results_accessor_storage; }
    set results(value) { this.#results_accessor_storage = value; }
    #selectedIndex_accessor_storage = NO_SELECTION;
    get selectedIndex() { return this.#selectedIndex_accessor_storage; }
    set selectedIndex(value) { this.#selectedIndex_accessor_storage = value; }
    #latestHoveredIndex_accessor_storage = NO_SELECTION;
    get latestHoveredIndex() { return this.#latestHoveredIndex_accessor_storage; }
    set latestHoveredIndex(value) { this.#latestHoveredIndex_accessor_storage = value; }
    selectedItem_ = null;
    firstSelectableIndex_ = NO_SELECTION;
    lastSelectableIndex_ = NO_SELECTION;
    keydownHandler;
    pointerLeaveHandler;
    constructor() {
        super();
        this.keydownHandler = this.onKeyDown_.bind(this);
        this.pointerLeaveHandler = this.onPointerLeave_.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("keydown", this.keydownHandler);
        this.addEventListener("pointerleave", this.pointerLeaveHandler);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("keydown", this.keydownHandler);
        this.removeEventListener("pointerleave", this.pointerLeaveHandler);
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        if (changedProperties.has("results")) {
            if (this.results.length === 0) {
                this.resetSelected();
            }
            this.firstSelectableIndex_ = this.getNextSelectableIndex_(-1);
            this.lastSelectableIndex_ = this.getPreviousSelectableIndex_(this.results.length);
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("results")) {
            const firstResult = this.results.at(0);
            if (!firstResult) {
                return;
            }
            if (!firstResult.payload.allowedToBeDefaultMatch) {
                this.resetSelected();
            }
            else {
                this.selectFirst();
                this.updateSelectedItem_();
                this.onFirstResultAutoselected_();
            }
        }
    }
    getNextSelectableIndex_(index) {
        const nextIndex = index + 1;
        const lastIndex = this.results.length - 1;
        return nextIndex > lastIndex ? NO_SELECTION : nextIndex;
    }
    getPreviousSelectableIndex_(index) {
        return index < 1 ? NO_SELECTION : index - 1;
    }
    getDomItem_(index) {
        return this.$.container.querySelector(`.spotlight-autocomplete-match:nth-child(${index + 1})`);
    }
    updateSelectedItem_() {
        if (!this.results) {
            return;
        }
        const domItem = this.selectedIndex === NO_SELECTION
            ? null
            : this.getDomItem_(this.selectedIndex);
        if (domItem === this.selectedItem_) {
            return;
        }
        this.selectedItem_ = domItem;
    }
    navigate(key, focusItem) {
        switch (key) {
            case "ArrowUp":
                if (this.selectedIndex === NO_SELECTION ||
                    this.selectedIndex === this.firstSelectableIndex_) {
                    this.selectedIndex = this.lastSelectableIndex_;
                }
                else {
                    this.selectedIndex = this.getPreviousSelectableIndex_(this.selectedIndex);
                }
                break;
            case "ArrowDown":
                if (this.selectedIndex === NO_SELECTION ||
                    this.selectedIndex === this.lastSelectableIndex_) {
                    this.selectedIndex = this.firstSelectableIndex_;
                }
                else {
                    const next = this.getNextSelectableIndex_(this.selectedIndex);
                    this.selectedIndex =
                        next === NO_SELECTION ? this.firstSelectableIndex_ : next;
                }
                break;
            default:
                break;
        }
        if (focusItem && this.selectedItem_) {
            this.selectedItem_.focus({ preventScroll: true });
        }
        this.scrollSelectedIntoView_();
        this.updateSelectedItem_();
        this.onSelectedChanged_();
    }
    resetSelected() {
        this.selectedIndex = NO_SELECTION;
    }
    setSelected(index) {
        if (index === NO_SELECTION) {
            this.resetSelected();
            return;
        }
        if (index >= 0 && index < this.results.length) {
            this.selectedIndex = index;
        }
    }
    selectFirst() {
        this.selectedIndex = this.firstSelectableIndex_;
    }
    selectLast() {
        this.selectedIndex = this.lastSelectableIndex_;
    }
    onKeyDown_(e) {
        // Don't interfere with modifier key combinations
        if (e.ctrlKey || e.metaKey || e.altKey) {
            return;
        }
        if (this.latestHoveredIndex !== NO_SELECTION) {
            this.switchFromMouseToKeyboard(this.latestHoveredIndex);
        }
        if (navigationKeys.includes(e.key)) {
            switch (e.key) {
                case "ArrowUp":
                case "ArrowDown":
                    e.stopPropagation();
                    e.preventDefault();
                    this.navigate(e.key, true);
                    break;
                case "Escape":
                    this.resetSelected();
                    break;
            }
        }
    }
    onPointerLeave_() {
        this.latestHoveredIndex = NO_SELECTION;
    }
    onSelectedChanged_() {
        this.scrollSelectedIntoView_();
        this.dispatchMatchSelected();
    }
    dispatchMatchSelected() {
        const selected = this.results[this.selectedIndex];
        if (!selected) {
            return;
        }
        this.fire('selected', selected.payload);
    }
    onFirstResultAutoselected_() {
        this.scrollSelectedIntoView_();
        this.dispatchFirstMatchAutoselected();
    }
    dispatchFirstMatchAutoselected() {
        const selected = this.results[0];
        if (!selected) {
            return;
        }
        this.fire("selected", {
            ...selected.payload,
            isAutoselectedMetadata: true,
        });
    }
    scrollSelectedIntoView_() {
        if (this.selectedItem_) {
            this.selectedItem_.scrollIntoView({
                behavior: "instant",
                block: "nearest",
            });
        }
    }
    // Handlers used from the html.ts template.
    onOpen_(e) {
        AutocompleteService.getInstance().openAutocompleteMatch(e.detail.line, e.detail.url);
    }
    onSearchSecondary_(e) {
        AutocompleteService.getInstance().openAutocompleteMatch(e.detail.line, e.detail.url, undefined, { shiftKey: true });
    }
    onItemMouseEnter_(index) {
        this.switchFromKeyboardToMouse(index);
    }
    switchFromKeyboardToMouse(currentIndex) {
        this.latestHoveredIndex = currentIndex;
        this.resetSelected();
    }
    switchFromMouseToKeyboard(currentIndex) {
        this.setSelected(currentIndex);
        this.latestHoveredIndex = NO_SELECTION;
    }
}
customElements.define(AutocompleteMatchesElement.is, AutocompleteMatchesElement);
