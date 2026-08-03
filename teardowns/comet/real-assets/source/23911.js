// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
/**
 * @fileoverview
 * 'perplexity-enter-sync-code-dialog' is a dialog component for entering sync code.
 */
import 'chrome://resources/cr_elements/cr_button/cr_button.js';
import 'chrome://resources/cr_elements/cr_dialog/cr_dialog.js';
import 'chrome://resources/cr_elements/cr_input/cr_input.js';
import 'chrome://resources/cr_elements/cr_shared_style.css.js';
import '../settings_shared.css.js';
import { PolymerElement } from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { loadTimeData } from 'chrome://resources/js/load_time_data.js';
import { Router } from '../router.js';
import { routes } from '../route.js';
import { SynchronisationBrowserProxyImpl } from './perplexity_synchronisation_browser_proxy.js';
import { getTemplate } from './perplexity_enter_sync_code_dialog.html.js';
export class PerplexityEnterSyncCodeDialogElement extends PolymerElement {
    static get is() {
        return 'perplexity-enter-sync-code-dialog';
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            inputSyncCode_: {
                type: String,
                value: '',
            },
            invalid_: {
                type: Boolean,
                value: false,
            },
            errorMessage_: {
                type: String,
                value: '',
            },
        };
    }
    browserProxy_ = SynchronisationBrowserProxyImpl.getInstance();
    connectedCallback() {
        super.connectedCallback();
        this.errorMessage_ =
            loadTimeData.getString('synchronisationInputCodeErrorLine1') + '\n' +
                loadTimeData.getString('synchronisationInputCodeErrorLine2');
        const dialog = this.shadowRoot.querySelector('#enterSyncCodeDialog');
        if (dialog) {
            dialog.showModal();
        }
    }
    async onInputCodeDialogConfirmClick_() {
        const code = this.inputSyncCode_.trim();
        const onError = () => {
            this.invalid_ = true;
        };
        if (code) {
            try {
                const response = await this.browserProxy_.joinSynchronisationByCode(code);
                if (response === code) {
                    this.onClose_();
                }
                else {
                    onError();
                }
            }
            catch {
                onError();
            }
        }
    }
    onInputChange_() {
        if (this.invalid_) {
            this.invalid_ = false;
        }
    }
    onClose_() {
        const dialog = this.shadowRoot.querySelector('#enterSyncCodeDialog');
        if (dialog) {
            dialog.close();
        }
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        Router.getInstance().navigateTo(routes.SYNCHRONISATION);
    }
}
customElements.define(PerplexityEnterSyncCodeDialogElement.is, PerplexityEnterSyncCodeDialogElement);
