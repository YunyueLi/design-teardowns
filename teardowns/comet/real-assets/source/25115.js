// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { html } from "//resources/lit/v3_0/lit.rollup.js";
export function getHtml() {
    return html `
    <div
      class="autocomplete-match ${this.selected ? "selected" : ""} ${this
        .hovered
        ? "hovered"
        : ""}"
    >
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="info">
        <div class="title">
          <slot
            name="title"
            @slotchange="${this.onTitleSlotchange_}"
          ></slot>
        </div>
        <div class="subtitle">
          <slot name="subtitle"></slot>
        </div>
      </div>
      <div class="actions">
        <div class="secondary-action">
          <slot name="secondaryAction"></slot>
        </div>
        <div class="primary-action">
          <slot name="primaryAction"></slot>
        </div>
      </div>
    </div>
  `;
}
