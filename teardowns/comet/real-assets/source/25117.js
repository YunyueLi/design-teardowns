// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
export function dispatchAutocompleteMatchActionEvent(element, type, detail, options) {
    return element.dispatchEvent(new CustomEvent(type, {
        detail,
        bubbles: true,
        composed: true,
        ...options,
    }));
}
export function dispatchMatchSelected(element, value) {
    return element.dispatchEvent(new CustomEvent("match-selected", {
        detail: value,
        bubbles: true,
        composed: true,
    }));
}
