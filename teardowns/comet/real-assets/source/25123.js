// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { html } from "//resources/lit/v3_0/lit.rollup.js";
export function getHtml() {
    return this.results.length === 0
        ? html ` <div class="empty-state"></div> `
        : html `
        <div
          id="container"
          class="container"
          role="listbox"
          aria-label="Search matches"
          aria-activedescendant=${this.selectedIndex !== -1
            ? `match-${this.selectedIndex}`
            : ""}
        >
          ${this.results.map((match, index) => html `
              <div
                class="spotlight-autocomplete-match"
                data-index=${index}
                role="option"
                aria-selected=${index === this.selectedIndex ? "true" : "false"}
                tabindex=${index === this.selectedIndex ? "0" : "-1"}
                @mouseenter=${() => this.onItemMouseEnter_(index)}
              >
                ${match.type === "site"
            ? html `<site-autocomplete-match
                      .data=${match}
                      .selected=${index === this.selectedIndex}
                      .hovered=${index === this.latestHoveredIndex}
                      @open=${this.onOpen_}
                    ></site-autocomplete-match>`
            : match.type === "query"
                ? html `<query-autocomplete-match
                        .data=${match}
                        .selected=${index === this.selectedIndex}
                        .hovered=${index === this.latestHoveredIndex}
                        @open=${this.onOpen_}
                        @search-secondary=${this.onSearchSecondary_}
                      ></query-autocomplete-match>`
                : ""}
              </div>
            `)}
        </div>
      `;
}
