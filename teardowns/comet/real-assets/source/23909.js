// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
/**
 * @fileoverview
 * 'perplexity-sync-code-dialog' is a dialog component for displaying a sync code.
 */
import 'chrome://resources/cr_elements/cr_button/cr_button.js';
import 'chrome://resources/cr_elements/cr_dialog/cr_dialog.js';
import 'chrome://resources/cr_elements/cr_icon/cr_icon.js';
import 'chrome://resources/cr_elements/cr_input/cr_input.js';
import 'chrome://resources/cr_elements/cr_icon_button/cr_icon_button.js';
import 'chrome://resources/cr_elements/cr_shared_style.css.js';
import '../settings_shared.css.js';
import { PolymerElement } from 'chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js';
import { Router } from '../router.js';
import { routes } from '../route.js';
import { SynchronisationBrowserProxyImpl, SyncAccountState } from './perplexity_synchronisation_browser_proxy.js';
import { getTemplate } from './perplexity_sync_code_dialog.html.js';
import './qr-code-styling.js';
export class PerplexitySyncCodeDialogElement extends PolymerElement {
    static get is() {
        return 'perplexity-sync-code-dialog';
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            syncCode: {
                type: String,
                value: '',
            },
            shouldStartNewSync: {
                type: Boolean,
                value: false,
            },
            isCopied_: {
                type: Boolean,
                value: false,
            },
            showQRCode_: {
                type: Boolean,
                value: false,
            },
            shouldShowQRCodeButton_: {
                type: Boolean,
                value: false,
            },
            qrCodeInitialized_: {
                type: Boolean,
                value: false,
            },
        };
    }
    static get observers() {
        return [
            'onShowQRCodeChanged_(showQRCode_, syncCode)',
        ];
    }
    browserProxy_ = SynchronisationBrowserProxyImpl.getInstance();
    themeChangedListener_ = null;
    ready() {
        super.ready();
        chrome.perplexity.features
            .getFlagValue('should-show-qr-in-sync-settings').then(flag => {
            this.shouldShowQRCodeButton_ = flag.value ?? false;
            if (flag.value) {
                this.showQRCode_ = true;
            }
        });
    }
    async connectedCallback() {
        super.connectedCallback();
        if (!this.syncCode) {
            try {
                const syncState = await this.browserProxy_.requestSynchronisationState();
                let shouldStartNew = false;
                if (syncState.syncDetails) {
                    const state = syncState.syncDetails.syncAccountState;
                    shouldStartNew = (state === SyncAccountState.kSignedInNotSyncing);
                }
                let code = null;
                if (shouldStartNew) {
                    code = await this.browserProxy_.startNewSynchronisation();
                }
                else {
                    code = await this.browserProxy_.getSynchronisationCode();
                }
                this.syncCode = code;
            }
            catch (error) {
                console.error('Failed to get sync code:', error);
            }
        }
        const dialog = this.shadowRoot.querySelector('#syncCodeDialog');
        if (dialog) {
            dialog.showModal();
        }
        this.themeChangedListener_ = () => this.onThemeChanged_();
        chrome.perplexity.themes.onCurrentThemeChanged.addListener(this.themeChangedListener_);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.themeChangedListener_) {
            chrome.perplexity.themes.onCurrentThemeChanged.removeListener(this.themeChangedListener_);
        }
    }
    onThemeChanged_() {
        if (this.showQRCode_ && this.syncCode) {
            // We need to add a timeout here, because css vars can not load instantly
            setTimeout(() => {
                this.regenerateQRCode_();
            }, 250);
        }
    }
    regenerateQRCode_() {
        const container = this.shadowRoot.querySelector('#qrCodeContainer');
        if (container) {
            const canvas = container.querySelector('canvas');
            if (canvas) {
                canvas.remove();
            }
        }
        this.qrCodeInitialized_ = false;
        this.generateQRCode_();
    }
    onSyncCodeClick_() {
        const input = this.shadowRoot.querySelector('#syncCodeInput');
        if (input && input.select) {
            input.select();
            navigator.clipboard.writeText(this.syncCode);
            this.isCopied_ = true;
            setTimeout(() => {
                this.isCopied_ = false;
            }, 5000);
        }
    }
    onViewQRCode_() {
        this.showQRCode_ = !this.showQRCode_;
    }
    onShowQRCodeChanged_(showQRCode, syncCode) {
        if (showQRCode && syncCode) {
            setTimeout(() => void this.generateQRCode_(), 0);
        }
    }
    getCSSVariableValue_(varName) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();
    }
    async generateQRCode_() {
        if (this.qrCodeInitialized_) {
            return;
        }
        const container = this.shadowRoot.querySelector('#qrCodeContainer');
        if (!container) {
            return;
        }
        const dotsColor = this.getCSSVariableValue_('--perplexity-text-primary');
        // Determine background color based on theme
        let theme = await chrome.perplexity.themes.getCurrentTheme();
        let isDark = theme === 'dark';
        if (theme === 'device') {
            // If theme is system-based, check prefers-color-scheme
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        // actually it's surface-raised but it has opacity, and we can't use colors with alpha here
        const backgroundColor = isDark ? '#333637' : '#F6F6F2';
        const qrSize = 180;
        const qrScale = 4;
        const qrRenderSize = qrSize * qrScale;
        container.style.width = `${qrSize}px`;
        container.style.height = `${qrSize}px`;
        container.style.margin = '0 auto';
        const backendUrl = await chrome.settingsPrivate.getPerplexityBackendUrl() ?? 'https://perplexity.ai';
        const joinUrl = new URL('/api/sync/join-chain', backendUrl);
        joinUrl.hash = `p=${this.syncCode}`;
        // @ts-ignore
        const qrCode = new window.QRCodeStyling({
            type: 'canvas',
            width: qrRenderSize,
            height: qrRenderSize,
            data: joinUrl.toString(),
            margin: 0,
            image: isDark ? 'chrome://settings/images/comet-logo-light.svg' : 'chrome://settings/images/comet-logo-dark.svg',
            qrOptions: {
                typeNumber: 0,
                mode: 'Byte',
                errorCorrectionLevel: 'H',
            },
            imageOptions: {
                saveAsBlob: true,
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0,
            },
            dotsOptions: {
                type: 'dots',
                color: dotsColor,
            },
            backgroundOptions: {
                color: backgroundColor,
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: dotsColor,
            },
            cornersDotOptions: {
                type: 'dot',
                color: dotsColor,
            },
        });
        qrCode.append(container);
        const canvas = container.querySelector('canvas');
        if (canvas) {
            canvas.style.width = `${qrSize}px`;
            canvas.style.height = `${qrSize}px`;
        }
        this.qrCodeInitialized_ = true;
    }
    onClose_() {
        const dialog = this.shadowRoot.querySelector('#syncCodeDialog');
        if (dialog) {
            dialog.close();
        }
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
        Router.getInstance().navigateTo(routes.SYNCHRONISATION);
    }
}
customElements.define(PerplexitySyncCodeDialogElement.is, PerplexitySyncCodeDialogElement);
