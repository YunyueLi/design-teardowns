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
          ${this.data.payload.displayImage || this.data.payload.imageUrl
            ? html `
                <div slot="icon" class="image-wrapper">
                  <img
                    class="image"
                    width="20"
                    height="20"
                    src="${this.data.payload.displayImage ||
                this.data.payload.imageUrl}"
                  />
                </div>
              `
            : this.data.payload.type === "historical"
                ? html `<cr-icon
                  slot="icon"
                  icon="pplx:search-history"
                ></cr-icon>`
                : html `<cr-icon slot="icon" icon="pplx:search"></cr-icon>`}
          <span slot="title">${this.data.payload.content}</span>
          ${this.data.payload.description
            ? html `<span slot="subtitle"
                >${this.data.payload.description}</span
              >`
            : ""}
          ${this.getSecondaryEngine()?.isAvailable
            ? html `
                <div slot="secondaryAction" style="display: contents;">
                  <span
                    >${this.renderTextForActionBadge_(this.getSecondaryEngine().name)}</span
                  >
                  <spotlight-shortcut-view
                    use-system-font
                    combination="${this.getSecondaryShortcutCombination_()}"
                  ></spotlight-shortcut-view>
                </div>
              `
            : ""}
          <div slot="primaryAction" style="display: contents;">
            <span
              >${this.renderTextForActionBadge_(this.data.payload.searchEngine)}</span
            >
            <cr-icon icon="pplx:enter"></cr-icon>
          </div>
        </base-autocomplete-match>
      `;
}
