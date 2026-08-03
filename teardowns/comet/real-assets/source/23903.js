// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import "chrome://resources/cr_components/cr_shortcut_input/cr_shortcut_input.js";
import "chrome://resources/cr_elements/cr_button/cr_button.js";
import "chrome://resources/cr_elements/cr_dialog/cr_dialog.js";
import 'chrome://resources/cr_elements/cr_icon/cr_icon.js';
import "chrome://resources/cr_elements/cr_icon_button/cr_icon_button.js";
import "chrome://resources/cr_elements/cr_input/cr_input.js";
import "chrome://resources/cr_elements/cr_shared_style.css.js";
import "../settings_shared.css.js";
import "../settings_page/settings_section.js";
import "../controls/settings_toggle_button.js";
import { loadTimeData } from "../i18n_setup.js";
import { PrefsMixin } from "/shared/settings/prefs/prefs_mixin.js";
import { PolymerElement } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { getTemplate } from "./perplexity_shortcuts_page_v1.html.js";
const PerplexityShortcutsPageV1ElementBase = PrefsMixin(PolymerElement);
export class PerplexityShortcutsPageV1Element extends PerplexityShortcutsPageV1ElementBase {
    static get is() {
        return "perplexity-shortcuts-page-v1";
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
            searchQuery_: {
                type: String,
                value: "",
            },
            addingForCommandId_: {
                type: String,
                value: "",
                notify: true,
            },
            newShortcutValue_: {
                type: String,
                value: "",
                notify: true,
            },
            duplicateShortcut_: {
                type: String,
                value: "",
            },
            duplicateCommand_: {
                type: String,
                value: "",
            },
            pendingDuplicateShortcut_: {
                type: Object,
                value: null,
            },
            hasAnyUserShortcuts_: {
                type: Boolean,
                computed: "computeHasAnyUserShortcuts_(commands_.*)",
            },
            filteredCommands_: {
                type: Array,
                computed: "computeFilteredCommands_(commands_.*, searchQuery_)",
            },
            lruTabSwitcherFeatureEnabled_: {
                type: Boolean,
                value: () => {
                    return loadTimeData.getBoolean("lruTabSwitcherFeatureEnabled");
                },
            },
        };
    }
    ready() {
        super.ready();
        this.loadShortcuts_();
    }
    isValidShortcut_(shortcut) {
        return !!shortcut && !!shortcut.code && !!shortcut.modifiers;
    }
    async loadShortcuts_(showLoading = true) {
        try {
            if (showLoading) {
                this.loading_ = true;
            }
            this.commands_ = await chrome.perplexity.shortcuts.getCurrentShortcuts();
            this.loading_ = false;
        }
        catch (error) {
            console.error("Failed to load shortcuts:", error);
            this.loading_ = false;
        }
    }
    async onShortcutUpdated_(event) {
        const target = event.target;
        const commandId = target.dataset["commandId"];
        const newShortcut = event.detail;
        const isNew = target.dataset["isNew"] === "true";
        const oldShortcutText = target.dataset["oldShortcutText"] || "";
        if (!commandId) {
            return;
        }
        const previousValue = isNew ? this.newShortcutValue_ : oldShortcutText;
        if (isNew) {
            this.newShortcutValue_ = newShortcut;
        }
        try {
            if (!newShortcut || newShortcut.trim() === "") {
                await this.handleEmptyShortcut_(commandId, isNew, oldShortcutText);
                return;
            }
            const { keyCode, modifiers } = this.parseShortcut_(newShortcut);
            if (!keyCode || !modifiers.length) {
                return;
            }
            const isDuplicate = await this.handleDuplicateShortcut_(newShortcut, commandId, isNew, previousValue, oldShortcutText);
            if (isDuplicate) {
                return;
            }
            await this.clearOldShortcut_(commandId, isNew, oldShortcutText);
            await this.setNewShortcut_(keyCode, modifiers, commandId, isNew);
        }
        catch (error) {
            console.error("Error updating shortcut:", error);
        }
    }
    async handleEmptyShortcut_(commandId, isNew, oldShortcutText) {
        if (!isNew && oldShortcutText) {
            const command = this.commands_.find((c) => c.id === commandId);
            if (command) {
                const userShortcuts = this.getUserShortcuts_(command.shortcuts);
                const oldShortcut = userShortcuts.find((s) => s.shortcut_text === oldShortcutText);
                if (this.isValidShortcut_(oldShortcut)) {
                    await chrome.perplexity.shortcuts.clearShortcut(oldShortcut.code, oldShortcut.modifiers);
                    await this.loadShortcuts_(false);
                }
            }
        }
        if (isNew) {
            this.newShortcutValue_ = "";
            this.addingForCommandId_ = "";
        }
    }
    async handleDuplicateShortcut_(newShortcut, commandId, isNew, previousValue, oldShortcutText) {
        const existing = this.findExistingShortcut_(newShortcut);
        if (!existing) {
            return false;
        }
        const { keyCode, modifiers } = this.parseShortcut_(newShortcut);
        this.pendingDuplicateShortcut_ = {
            keyCode,
            modifiers,
            commandId,
            isNew,
            oldShortcutText,
        };
        this.showDuplicateShortcutDialog_(newShortcut, existing.command.translated_name);
        if (isNew) {
            this.newShortcutValue_ = previousValue;
            if (!previousValue) {
                this.addingForCommandId_ = "";
            }
        }
        else {
            await this.restoreOldShortcut_(commandId, oldShortcutText);
        }
        await this.loadShortcuts_(false);
        return true;
    }
    async restoreOldShortcut_(commandId, oldShortcutText) {
        if (!oldShortcutText) {
            return;
        }
        const command = this.commands_.find((c) => c.id === commandId);
        if (!command) {
            return;
        }
        const userShortcuts = this.getUserShortcuts_(command.shortcuts);
        const oldShortcut = userShortcuts.find((s) => s.shortcut_text === oldShortcutText);
        if (this.isValidShortcut_(oldShortcut)) {
            await chrome.perplexity.shortcuts.setShortcut(oldShortcut.code, oldShortcut.modifiers, commandId);
        }
    }
    async clearOldShortcut_(commandId, isNew, oldShortcutText) {
        if (isNew || !oldShortcutText) {
            return;
        }
        const command = this.commands_.find((c) => c.id === commandId);
        if (!command) {
            return;
        }
        const userShortcuts = this.getUserShortcuts_(command.shortcuts);
        const oldShortcut = userShortcuts.find((s) => s.shortcut_text === oldShortcutText);
        if (this.isValidShortcut_(oldShortcut)) {
            await chrome.perplexity.shortcuts.clearShortcut(oldShortcut.code, oldShortcut.modifiers);
        }
    }
    async setNewShortcut_(keyCode, modifiers, commandId, isNew) {
        const success = await chrome.perplexity.shortcuts.setShortcut(keyCode, modifiers, commandId);
        if (success) {
            if (isNew) {
                this.newShortcutValue_ = "";
                this.addingForCommandId_ = "";
            }
            await this.loadShortcuts_(false);
        }
        else {
            console.error("Failed to set shortcut");
            if (isNew) {
                this.addingForCommandId_ = commandId;
            }
        }
    }
    onAddShortcutClicked_(e) {
        const target = e.currentTarget;
        const commandId = target.dataset["commandId"] || "";
        this.addingForCommandId_ = commandId;
    }
    async onDeleteShortcut_(e) {
        const target = e.currentTarget;
        const commandId = target.dataset["commandId"] || "";
        const shortcutText = target.dataset["shortcutText"] || "";
        const command = this.commands_.find((c) => c.id === commandId);
        if (!command)
            return;
        const userShortcuts = this.getUserShortcuts_(command.shortcuts);
        const shortcutToDelete = userShortcuts.find((s) => s.shortcut_text === shortcutText);
        if (this.isValidShortcut_(shortcutToDelete)) {
            await chrome.perplexity.shortcuts.clearShortcut(shortcutToDelete.code, shortcutToDelete.modifiers);
            await this.loadShortcuts_(false);
        }
    }
    async onResetCommand_(e) {
        const target = e.currentTarget;
        const commandId = target.dataset["commandId"] || "";
        const command = this.commands_.find((c) => c.id === commandId);
        if (!command)
            return;
        const user = this.getUserShortcuts_(command.shortcuts);
        if (user.length === 0)
            return;
        for (const s of user) {
            if (this.isValidShortcut_(s)) {
                await chrome.perplexity.shortcuts.clearShortcut(s.code, s.modifiers);
            }
        }
        await this.loadShortcuts_(false);
    }
    async onDuplicateDialogOk_() {
        const dialog = (this.$["duplicateDialog"] ||
            this.shadowRoot?.querySelector("#duplicateDialog"));
        if (dialog && dialog.close) {
            dialog.close();
        }
        if (this.pendingDuplicateShortcut_) {
            const { keyCode, modifiers, commandId, isNew, oldShortcutText } = this.pendingDuplicateShortcut_;
            await this.clearOldShortcut_(commandId, isNew, oldShortcutText);
            await this.setNewShortcut_(keyCode, modifiers, commandId, isNew);
            this.pendingDuplicateShortcut_ = null;
        }
    }
    onDuplicateDialogCancel_() {
        const dialog = (this.$["duplicateDialog"] ||
            this.shadowRoot?.querySelector("#duplicateDialog"));
        if (dialog && dialog.close) {
            dialog.close();
        }
        this.pendingDuplicateShortcut_ = null;
    }
    onResetAllShortcuts_() {
        if (!this.hasAnyUserShortcuts_) {
            return;
        }
        const dialog = (this.$["resetAllDialog"] ||
            this.shadowRoot?.querySelector("#resetAllDialog"));
        if (dialog && dialog.showModal) {
            dialog.showModal();
        }
    }
    async onResetAllDialogOk_() {
        const dialog = (this.$["resetAllDialog"] ||
            this.shadowRoot?.querySelector("#resetAllDialog"));
        if (dialog && dialog.close) {
            dialog.close();
        }
        await this.resetAllUserShortcuts_();
    }
    onResetAllDialogCancel_() {
        const dialog = (this.$["resetAllDialog"] ||
            this.shadowRoot?.querySelector("#resetAllDialog"));
        if (dialog && dialog.close) {
            dialog.close();
        }
    }
    async resetAllUserShortcuts_() {
        try {
            for (const command of this.commands_) {
                const userShortcuts = this.getUserShortcuts_(command.shortcuts);
                for (const shortcut of userShortcuts) {
                    if (this.isValidShortcut_(shortcut)) {
                        await chrome.perplexity.shortcuts.clearShortcut(shortcut.code, shortcut.modifiers);
                    }
                }
            }
            await this.loadShortcuts_(false);
        }
        catch (error) {
            console.error("Failed to reset all user shortcuts:", error);
        }
    }
    onInputCaptureChange_(event) {
        chrome.developerPrivate.setShortcutHandlingSuspended(event.detail);
    }
    getBuiltInShortcuts_(list) {
        return (list || []).filter((s) => s.source === chrome.perplexity.shortcuts.Source.BUILT_IN);
    }
    getUserShortcuts_(list) {
        return (list || []).filter((s) => s.source === chrome.perplexity.shortcuts.Source.USER_DEFINED);
    }
    hasUserShortcuts_(list) {
        const userShortcuts = this.getUserShortcuts_(list);
        return userShortcuts.length > 0;
    }
    computeHasAnyUserShortcuts_() {
        return this.commands_.some((command) => this.hasUserShortcuts_(command.shortcuts));
    }
    computeFilteredCommands_() {
        if (!this.searchQuery_ || this.searchQuery_.trim() === "") {
            return this.commands_;
        }
        const query = this.searchQuery_.toLowerCase().trim();
        return this.commands_.filter((command) => command.translated_name.toLowerCase().includes(query));
    }
    onSearchChanged_(event) {
        this.searchQuery_ = event.detail.value;
    }
    shouldShowDivider_(list) {
        const builtIn = this.getBuiltInShortcuts_(list);
        const user = this.getUserShortcuts_(list);
        return builtIn.length > 0 && user.length > 0;
    }
    findExistingShortcut_(shortcutText) {
        const normalizedInput = this.normalizeShortcutText_(shortcutText);
        const { keyCode: inputKeyCode, modifiers: inputModifiers } = this.parseShortcut_(shortcutText);
        if (!inputKeyCode || !inputModifiers.length) {
            return null;
        }
        for (const command of this.commands_) {
            for (const shortcut of command.shortcuts) {
                const normalizedExisting = this.normalizeShortcutText_(shortcut.shortcut_text);
                if (normalizedExisting === normalizedInput) {
                    return { command, shortcut };
                }
                if (this.isValidShortcut_(shortcut)) {
                    const existingKeyCode = shortcut.code;
                    const existingModifiers = shortcut.modifiers || [];
                    if (existingKeyCode === inputKeyCode &&
                        this.areModifiersEquivalent_(inputModifiers, existingModifiers)) {
                        return { command, shortcut };
                    }
                }
            }
        }
        return null;
    }
    areModifiersEquivalent_(modifiers1, modifiers2) {
        if (modifiers1.length !== modifiers2.length) {
            return false;
        }
        const sorted1 = [...modifiers1].sort();
        const sorted2 = [...modifiers2].sort();
        for (let i = 0; i < sorted1.length; i++) {
            if (sorted1[i] !== sorted2[i]) {
                return false;
            }
        }
        return true;
    }
    getSourceText_(source) {
        switch (source) {
            case chrome.perplexity.shortcuts.Source.BUILT_IN:
                return "Built-in";
            case chrome.perplexity.shortcuts.Source.USER_DEFINED:
                return "User defined";
            default:
                return "";
        }
    }
    showDuplicateShortcutDialog_(shortcutText, existingCommand) {
        this.duplicateShortcut_ = shortcutText;
        this.duplicateCommand_ = existingCommand;
        const dialog = (this.$["duplicateDialog"] ||
            this.shadowRoot?.querySelector("#duplicateDialog"));
        if (dialog && dialog.showModal) {
            dialog.showModal();
        }
    }
    getNewShortcutValue_(commandId) {
        return this.addingForCommandId_ === commandId ? this.newShortcutValue_ : "";
    }
    normalizeShortcutText_(shortcutText) {
        return shortcutText
            .replace(/⌘/g, "Command+")
            .replace(/⌃/g, "Control+")
            .replace(/⌥/g, "Alt+")
            .replace(/⇧/g, "Shift+")
            .replace(/⌫/g, "Backspace")
            .replace(/⇥/g, "Tab")
            .replace(/⇟/g, "PageDown")
            .replace(/⇞/g, "PageUp")
            .replace(/→/g, "ArrowRight")
            .replace(/←/g, "ArrowLeft")
            .replace(/↑/g, "ArrowUp")
            .replace(/↓/g, "ArrowDown")
            .replace(/\(fn\) /g, "")
            .replace(/\+\+/g, "+")
            .replace(/\+$/, "")
            .toLowerCase();
    }
    parseShortcut_(shortcutText) {
        if (!shortcutText) {
            return { keyCode: "", modifiers: [] };
        }
        let normalizedText = shortcutText;
        normalizedText = normalizedText
            .replace(/⌘/g, "Command")
            .replace(/⇧/g, "Shift")
            .replace(/⌥/g, "Alt")
            .replace(/⌃/g, "Ctrl");
        const parts = normalizedText.split(/\s*\+\s*|\s+/);
        const keySymbol = parts[parts.length - 1];
        const modifiers = [];
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i].toLowerCase().trim();
            switch (part) {
                case "ctrl":
                case "control":
                    modifiers.push(chrome.perplexity.shortcuts.Modifier.CONTROL);
                    break;
                case "shift":
                    modifiers.push(chrome.perplexity.shortcuts.Modifier.SHIFT);
                    break;
                case "alt":
                case "option":
                    modifiers.push(chrome.perplexity.shortcuts.Modifier.ALT);
                    break;
                case "cmd":
                case "command":
                    modifiers.push(chrome.perplexity.shortcuts.Modifier.COMMAND);
                    break;
            }
        }
        const keyCode = this.convertKeySymbolToDomCode_(keySymbol);
        return { keyCode, modifiers };
    }
    convertKeySymbolToDomCode_(keySymbol) {
        if (!keySymbol) {
            return "";
        }
        const key = keySymbol.toUpperCase();
        if (key.length === 1 && key >= "A" && key <= "Z") {
            return `Key${key}`;
        }
        if (key.length === 1 && key >= "0" && key <= "9") {
            return `Digit${key}`;
        }
        switch (key) {
            case "SPACE":
            case " ":
                return "Space";
            case "ENTER":
            case "RETURN":
                return "Enter";
            case "TAB":
                return "Tab";
            case "ESCAPE":
            case "ESC":
                return "Escape";
            case "BACKSPACE":
                return "Backspace";
            case "DELETE":
                return "Delete";
            case "ARROWUP":
            case "UP":
                return "ArrowUp";
            case "ARROWDOWN":
            case "DOWN":
                return "ArrowDown";
            case "ARROWLEFT":
            case "LEFT":
                return "ArrowLeft";
            case "ARROWRIGHT":
            case "RIGHT":
                return "ArrowRight";
            case "HOME":
                return "Home";
            case "END":
                return "End";
            case "PAGEUP":
                return "PageUp";
            case "PAGEDOWN":
                return "PageDown";
            case "INSERT":
                return "Insert";
            default:
                return keySymbol;
        }
    }
}
customElements.define(PerplexityShortcutsPageV1Element.is, PerplexityShortcutsPageV1Element);
