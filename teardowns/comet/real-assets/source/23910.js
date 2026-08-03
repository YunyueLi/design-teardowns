// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
/**
 * @fileoverview
 * 'perplexity-confirmation-dialog' is a reusable confirmation dialog component.
 */
import 'chrome://resources/cr_elements/cr_button/cr_button.js';
import 'chrome://resources/cr_elements/cr_dialog/cr_dialog.js';
import 'chrome://resources/cr_elements/cr_shared_style.css.js';
import '../settings_shared.css.js';
import { PolymerElement } from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { getTemplate } from './perplexity_confirmation_dialog.html.js';
export class PerplexityConfirmationDialogElement extends PolymerElement {
    static get is() {
        return 'perplexity-confirmation-dialog';
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            title: {
                type: String,
                value: '',
            },
            description: {
                type: String,
                value: '',
            },
            cancelText: {
                type: String,
                value: '',
            },
            confirmText: {
                type: String,
                value: '',
            },
        };
    }
    onConfirmCallback_;
    show(config) {
        this.title = config.title;
        this.description = config.description;
        this.cancelText = config.cancelText;
        this.confirmText = config.confirmText;
        this.onConfirmCallback_ = config.onConfirm;
        const dialog = this.shadowRoot.querySelector('#confirmationDialog');
        if (dialog) {
            dialog.showModal();
        }
    }
    onCancelClick_() {
        const dialog = this.shadowRoot.querySelector('#confirmationDialog');
        if (dialog) {
            dialog.close();
        }
        this.onConfirmCallback_ = undefined;
    }
    async onConfirmClick_() {
        const dialog = this.shadowRoot.querySelector('#confirmationDialog');
        if (dialog) {
            dialog.close();
        }
        if (this.onConfirmCallback_) {
            try {
                await this.onConfirmCallback_();
            }
            catch (error) {
                console.error('Confirmation action failed:', error);
            }
            this.onConfirmCallback_ = undefined;
        }
    }
}
customElements.define(PerplexityConfirmationDialogElement.is, PerplexityConfirmationDialogElement);
