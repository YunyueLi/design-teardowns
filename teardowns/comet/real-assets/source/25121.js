// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { html } from "//resources/lit/v3_0/lit.rollup.js";
export function getHtml() {
    return html `
    <span class="shortcut ${this.useSystemFont ? "system-font" : ""}"
      >${this.renderKeys_()}</span
    >
  `;
}
