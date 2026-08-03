// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { html } from "//resources/lit/v3_0/lit.rollup.js";
export function getHtml() {
    return !this.data
        ? html ``
        : html `
        <base-autocomplete-match
          .selected=${this.selected}
          .hovered=${this.hovered}
          @click=${this.dispatchOpen}
        >
          ${!this.data.payload.displayImage || this.faviconError
            ? html `<cr-icon
                slot="icon"
                icon="pplx:globe"
                class="icon"
              ></cr-icon>`
            : html `<img
                slot="icon"
                class="favicon"
                src="${this.data.payload.displayImage}"
                @error="${this.onFaviconError_}"
                @load="${this.onFaviconLoad_}"
              />`}
          ${this.data.payload.name
            ? html `<span slot="title">${this.data.payload.name}</span>`
            : ""}
          <span slot="subtitle">${this.data.payload.content}</span>
          <div slot="primaryAction" style="display: contents;">
            <span>${this.i18n("open_site_badge_text")}</span>
            <cr-icon icon="pplx:enter"></cr-icon>
          </div>
        </base-autocomplete-match>
      `;
}
