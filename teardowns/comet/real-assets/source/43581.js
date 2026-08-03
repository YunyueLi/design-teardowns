// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { html } from '//resources/lit/v3_0/lit.rollup.js';
import { handleCustomUrlClick } from './comet_app.js';
export function getHtml() {
    return html `
<h2>List of Comet URLs</h2>
<ul>
  ${this.webuiUrlInfos_.map(info => html `
    ${info.enabled ?
        html `<li>
        <a href="${info.url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}"
            data-original-url="${info.url}"
            @click="${handleCustomUrlClick}">
          ${info.url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}
        </a>
      </li>` :
        html `<li>${info.url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}</li>`}`)}
</ul>

${this.internalUrlInfos_.length ? html `
  <h2 id="internal-debugging-pages">Internal Debugging Page URLs</h2>
  <p id="debug-pages-description">
    <span>Internal debugging pages are currently </span>
    <span class="bold">${this.getDebugPagesEnabledText_()}</span><span>.</span>
  </p>
  <cr-button @click="${this.onToggleDebugPagesClick_}"
      ?disabled="${this.debugPagesButtonDisabled_}">
    ${this.getDebugPagesToggleButtonLabel_()}
  </cr-button>
  <ul>
    ${this.internalUrlInfos_.map(info => html `
      ${this.isInternalUiEnabled_(info) ?
        html `<li>
          <a href="${info.url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}"
              data-original-url="${info.url}"
              @click="${handleCustomUrlClick}">
            ${info.url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}
          </a>
        </li>` :
        html `<li>${info.url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}</li>`}`)}
  </ul>` : ''}

${this.commandUrls_.length ? html `
  <h2>Command URLs for Debug</h2>
  <p>
    The following URLs are for debugging purposes only. Because they crash or
    hang the renderer, they're not linked directly; you can type them into the
    address bar if you need them.
  </p>
  <ul>
    ${this.commandUrls_.map(url => html `
      <li>${url.replace(/^chrome(-untrusted)?:\/\//, 'comet$1://')}</li>
    `)}
  </ul>` : ''}`;
}
