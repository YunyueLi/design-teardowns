// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import 'chrome://resources/cr_components/cr_shortcut_input/cr_shortcut_input.js';
import 'chrome://resources/cr_elements/cr_button/cr_button.js';
import 'chrome://resources/cr_elements/cr_dialog/cr_dialog.js';
import 'chrome://resources/cr_elements/cr_icon/cr_icon.js';
import 'chrome://resources/cr_elements/cr_icon_button/cr_icon_button.js';
import 'chrome://resources/cr_elements/cr_input/cr_input.js';
import "chrome://resources/cr_elements/cr_lazy_render/cr_lazy_render.js";
import 'chrome://resources/cr_elements/cr_shared_style.css.js';
import '../settings_shared.css.js';
import '../settings_page/settings_section.js';
import "../controls/settings_toggle_button.js";
import "./perplexity_command.js";
import "./perplexity_shortcut_dropdown.js";
import "chrome://resources/perplexity/icons/icons.html.js";
import { isMac } from "//resources/js/platform.js";
import { loadTimeData } from "chrome://resources/js/load_time_data.js";
import { PrefsMixin } from "/shared/settings/prefs/prefs_mixin.js";
import { PolymerElement } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { getTemplate } from "./perplexity_shortcuts_page_v2.html.js";
import { hasNonVirtualUserShortcuts } from "./perplexity_shortcuts_utils.js";
import { shortcutsService, } from "./perplexity_shortcuts_service.js";
const PerplexityShortcutsPageV2ElementBase = PrefsMixin(PolymerElement);
export class PerplexityShortcutsPageV2Element extends PerplexityShortcutsPageV2ElementBase {
    static get is() {
        return "perplexity-shortcuts-page-v2";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            commands_: {
                type: Array,
                value: () => [],
            },
            loading_: {
                type: Boolean,
                value: true,
            },
            operationInProgress_: {
                type: Boolean,
                value: false,
            },
            searchQuery_: {
                type: String,
                value: "",
            },
            canResetShortcuts_: {
                type: Boolean,
                value: false,
            },
            filteredCommands_: {
                type: Array,
                computed: "computeFilteredCommands_(commands_.*, searchQuery_)",
            },
            filteredAssistantCommands_: {
                type: Array,
                computed: "computeAssistantCommands_(filteredCommands_)",
            },
            filteredGeneralCommands_: {
                type: Array,
                computed: "computeGeneralCommands_(filteredCommands_)",
            },
            filteredLruCommands_: {
                type: Array,
                computed: "computeLruCommands_(filteredCommands_)",
            },
            lruDropdownOptions_: {
                type: Array,
                value: () => {
                    const offLabel = loadTimeData.getString('shortcutOffLabel');
                    const shortcutLabel = isMac ? '\u2325\u21E5' : 'Ctrl + Tab';
                    return [
                        { label: offLabel, value: false },
                        { label: shortcutLabel, value: true },
                    ];
                },
            },
            pushToTalkDropdownOptions_: {
                type: Array,
                value: () => {
                    const offLabel = loadTimeData.getString('shortcutOffLabel');
                    const rightKeyLabel = loadTimeData.getString('pushToTalkRightKeyLabel');
                    const altKey = isMac ? '\u2325' : 'Alt';
                    const ctrlKey = isMac ? '\u2318' : 'Ctrl';
                    const altLabel = rightKeyLabel.replace('$1', altKey);
                    const ctrlLabel = rightKeyLabel.replace('$1', ctrlKey);
                    return [
                        { label: offLabel, value: 'off' },
                        { label: altLabel, value: 'right_alt' },
                        { label: ctrlLabel, value: 'right_ctrl' },
                    ];
                },
            },
            pushToTalkFeatureEnabled_: {
                type: Boolean,
                value: () => loadTimeData.getBoolean('pushToTalkFeatureEnabled'),
            },
        };
    }
    trackOtherTabsChangesCallback_ = null;
    ready() {
        super.ready();
        this.loadShortcuts_();
    }
    connectedCallback() {
        super.connectedCallback();
        this.trackOtherTabsChangesCallback_ = () => {
            // Ignore updates for our operations
            if (this.operationInProgress_) {
                return;
            }
            this.onShortcutsChanged_();
        };
        chrome.perplexity.shortcuts.onShortcutsUpdated.addListener(this.trackOtherTabsChangesCallback_);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.trackOtherTabsChangesCallback_) {
            chrome.perplexity.shortcuts.onShortcutsUpdated.removeListener(this.trackOtherTabsChangesCallback_);
            this.trackOtherTabsChangesCallback_ = null;
        }
    }
    async loadShortcuts_(showLoading = true) {
        try {
            if (showLoading) {
                this.loading_ = true;
            }
            const [commands, hasDisabledBuiltIns] = await Promise.all([
                shortcutsService.loadCommands(),
                shortcutsService.hasAnyDisabledOrOverriddenBuiltIns(),
            ]);
            const hasAnyUserShortcuts = commands.some((command) => hasNonVirtualUserShortcuts(command.shortcuts));
            this.setProperties({
                commands_: commands,
                canResetShortcuts_: hasAnyUserShortcuts || hasDisabledBuiltIns,
                loading_: false,
            });
        }
        catch (error) {
            console.error("Failed to load shortcuts:", error);
            this.loading_ = false;
        }
    }
    async onShortcutsChanged_() {
        await this.loadShortcuts_(false);
        this.operationInProgress_ = false;
    }
    getResetAllDialog_() {
        const lazyRender = this.shadowRoot?.querySelector("#resetAllDialogLazy");
        return lazyRender?.get() || null;
    }
    onResetAllShortcuts_() {
        if (!this.canResetShortcuts_) {
            return;
        }
        const dialog = this.getResetAllDialog_();
        if (dialog && dialog.showModal) {
            dialog.showModal();
        }
    }
    async onResetAllDialogOk_() {
        const dialog = this.getResetAllDialog_();
        if (dialog && dialog.close) {
            dialog.close();
        }
        await this.resetAllUserShortcuts_();
    }
    onResetAllDialogCancel_() {
        const dialog = this.getResetAllDialog_();
        if (dialog && dialog.close) {
            dialog.close();
        }
    }
    async resetAllUserShortcuts_() {
        try {
            this.operationInProgress_ = true;
            await shortcutsService.resetAllToDefaults();
            await this.loadShortcuts_(false);
        }
        catch (error) {
            console.error("Failed to reset all shortcuts:", error);
        }
        finally {
            this.operationInProgress_ = false;
        }
    }
    onInputCaptureChange_(event) {
        this.operationInProgress_ = true;
        chrome.developerPrivate.setShortcutHandlingSuspended(event.detail);
    }
    computeFilteredCommands_() {
        if (!this.searchQuery_ || this.searchQuery_.trim() === "") {
            return this.commands_;
        }
        const query = this.searchQuery_.toLowerCase().trim();
        return this.commands_.filter((command) => command.translated_name.toLowerCase().includes(query));
    }
    computeAssistantCommands_() {
        return this.filteredCommands_.filter((c) => c.isAssistantSpecific);
    }
    computeGeneralCommands_() {
        return this.filteredCommands_.filter((c) => !c.isAssistantSpecific && c.id !== "__CUSTOM_IDS_PPLX_CYCLE_LRU_TABS");
    }
    computeLruCommands_() {
        return this.filteredCommands_.filter((c) => c.id === "__CUSTOM_IDS_PPLX_CYCLE_LRU_TABS");
    }
    onSearchChanged_(event) {
        this.searchQuery_ = event.detail.value;
    }
}
customElements.define(PerplexityShortcutsPageV2Element.is, PerplexityShortcutsPageV2Element);
