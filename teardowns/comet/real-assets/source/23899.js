// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import "chrome://resources/cr_components/cr_shortcut_input/cr_shortcut_input.js";
import "chrome://resources/cr_elements/cr_button/cr_button.js";
import "chrome://resources/cr_elements/cr_dialog/cr_dialog.js";
import 'chrome://resources/cr_elements/cr_icon/cr_icon.js';
import "chrome://resources/cr_elements/cr_icon_button/cr_icon_button.js";
import "chrome://resources/cr_elements/cr_lazy_render/cr_lazy_render.js";
import "chrome://resources/cr_elements/cr_shared_style.css.js";
import "chrome://resources/perplexity/icons/icons.html.js";
import "./perplexity_menu_action.js";
import "chrome://resources/cr_elements/cr_action_menu/cr_action_menu.js";
import { afterNextRender, PolymerElement, } from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import { getTemplate } from "./perplexity_command.html.js";
import { parseShortcut, findShortcutByText, shortcutToText, } from "./perplexity_shortcuts_utils.js";
import { shortcutsService, } from "./perplexity_shortcuts_service.js";
import { AnchorAlignment } from "chrome://resources/cr_elements/cr_action_menu/cr_action_menu.js";
const MENU_BUTTON_SIZE = 32;
const MENU_BUTTON_MENU_OFFSET = 6;
export class PerplexityCommandElement extends PolymerElement {
    static get is() {
        return "perplexity-command";
    }
    static get template() {
        return getTemplate();
    }
    static get properties() {
        return {
            command: {
                type: Object,
            },
            addingInProgress_: {
                type: Boolean,
            },
            duplicateCommandName_: {
                type: String,
                value: "",
            },
            pendingDuplicateShortcutPayload_: {
                type: Object,
                value: null,
            },
            activeMenu_: {
                type: Object,
                value: null,
            },
        };
    }
    static get observers() {
        return ["onCommandShortcutsChanged_(command.shortcuts.*)"];
    }
    menuActionsCache_ = new WeakMap();
    onCommandShortcutsChanged_() {
        this.menuActionsCache_ = new WeakMap();
        this.addingInProgress_ = false;
    }
    isFirstShortcut_(index) {
        return index === 0;
    }
    computeMenuActions_(shortcut) {
        if (shortcut.isVirtual) {
            return shortcut.isRestorable ? [{ actionId: "reset-to-default", shortcut }] : [];
        }
        const actions = [];
        if (shortcut.isRestorable) {
            actions.push({ actionId: "reset-to-default", shortcut });
        }
        if (shortcut.isPrimary) {
            actions.push({ actionId: "add-alternative", shortcut });
        }
        actions.push({ actionId: "remove-shortcut", shortcut });
        return actions;
    }
    getMenuActions_(shortcut) {
        if (this.menuActionsCache_.has(shortcut)) {
            return this.menuActionsCache_.get(shortcut);
        }
        const actions = this.computeMenuActions_(shortcut);
        this.menuActionsCache_.set(shortcut, actions);
        return actions;
    }
    hasMenuActions_(shortcut) {
        return this.getMenuActions_(shortcut).length > 0;
    }
    getDuplicateDialog_() {
        const lazyRender = this.shadowRoot?.querySelector("#duplicateDialogLazy");
        return lazyRender?.get() || null;
    }
    emitShortcutsChanged_() {
        this.dispatchEvent(new CustomEvent("shortcuts-changed", {
            bubbles: true,
            composed: true,
        }));
    }
    findVirtualShortcutIndex_() {
        const index = this.command.shortcuts.findIndex(s => s.isVirtual);
        return index !== -1 ? index : null;
    }
    focusFirstVirtualField_(index) {
        afterNextRender(this, () => {
            const allInputs = this.shadowRoot?.querySelectorAll('cr-shortcut-input');
            const virtualInput = allInputs?.[index];
            virtualInput?.focusInput();
        });
    }
    showAlternativeField_() {
        this.addingInProgress_ = true;
        afterNextRender(this, () => {
            const shortcutInput = this.shadowRoot?.querySelector('#newShortcutInput');
            shortcutInput?.focusInput();
        });
    }
    async onDeleteShortcut_(e) {
        e.stopPropagation();
        const target = e.currentTarget;
        const shortcutText = target.dataset["shortcutText"] || "";
        const shortcutToDelete = findShortcutByText(this.command.shortcuts, shortcutText);
        if (!shortcutToDelete) {
            return;
        }
        await shortcutsService.clearShortcut(shortcutToDelete);
        this.emitShortcutsChanged_();
    }
    startAddingShortcut_() {
        const virtualIndex = this.findVirtualShortcutIndex_();
        if (virtualIndex !== null) {
            this.focusFirstVirtualField_(virtualIndex);
        }
        else {
            this.showAlternativeField_();
        }
    }
    extractShortcutUpdateData_(e) {
        const target = e.target;
        return {
            commandId: target.dataset["commandId"],
            oldShortcutText: target.dataset["oldShortcutText"] || "",
            newShortcutText: e.detail,
        };
    }
    async handleDuplicateShortcut_(payload) {
        this.pendingDuplicateShortcutPayload_ = payload;
        const shortcutText = shortcutToText(payload.shortcut);
        await this.showDuplicateShortcutDialog_(shortcutText);
    }
    async onShortcutUpdated_(e) {
        e.stopPropagation();
        const { commandId, oldShortcutText, newShortcutText } = this.extractShortcutUpdateData_(e);
        if (!commandId) {
            return;
        }
        try {
            const { keyCode, modifiers } = parseShortcut(newShortcutText);
            if (!keyCode || !modifiers.length) {
                return;
            }
            const duplicate = await shortcutsService.getShortcutIfExists(newShortcutText);
            const payload = {
                shortcut: {
                    code: keyCode,
                    modifiers,
                },
                shortcutToReplace: findShortcutByText(this.command.shortcuts, oldShortcutText),
                commandId,
            };
            const isDuplicated = duplicate && duplicate.command.id !== commandId;
            if (isDuplicated) {
                await this.handleDuplicateShortcut_(payload);
                return;
            }
            await shortcutsService.addOrReplaceShortcut(payload);
            this.emitShortcutsChanged_();
        }
        catch (error) {
            console.error("Error updating shortcut:", error);
        }
    }
    onInputCaptureChange_(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent("input-capture-change", {
            bubbles: true,
            composed: true,
            detail: e.detail,
        }));
    }
    async showDuplicateShortcutDialog_(shortcutText) {
        const duplicate = await shortcutsService.getShortcutIfExists(shortcutText);
        const duplicateCommandName = duplicate?.command.translated_name;
        if (!duplicateCommandName) {
            return;
        }
        this.duplicateCommandName_ = duplicateCommandName;
        const dialog = this.getDuplicateDialog_();
        if (dialog && dialog.showModal) {
            dialog.showModal();
        }
    }
    closeDuplicateDialog_() {
        const dialog = this.getDuplicateDialog_();
        if (dialog && dialog.close) {
            dialog.close();
        }
    }
    async onDuplicateDialogOk_() {
        if (this.pendingDuplicateShortcutPayload_) {
            await shortcutsService.addOrReplaceShortcut(this.pendingDuplicateShortcutPayload_);
        }
        this.closeDuplicateDialog_();
        this.emitShortcutsChanged_();
        this.pendingDuplicateShortcutPayload_ = null;
        this.addingInProgress_ = false;
    }
    onDuplicateDialogCancel_() {
        this.closeDuplicateDialog_();
        this.pendingDuplicateShortcutPayload_ = null;
        this.addingInProgress_ = false;
        this.emitShortcutsChanged_();
    }
    onMenuButtonClick_(e) {
        e.stopPropagation();
        const button = e.currentTarget;
        const shortcutIndex = button.dataset["shortcutIndex"];
        if (shortcutIndex !== undefined) {
            const lazyRender = this.shadowRoot?.querySelector(`#shortcut-menu-lazy-${shortcutIndex}`);
            if (lazyRender) {
                this.activeMenu_ = lazyRender.get();
                this.activeMenu_?.showAt(button, {
                    anchorAlignmentX: AnchorAlignment.CENTER,
                    anchorAlignmentY: AnchorAlignment.AFTER_END,
                    width: MENU_BUTTON_SIZE,
                    height: MENU_BUTTON_SIZE + MENU_BUTTON_MENU_OFFSET,
                });
            }
        }
    }
    onAddAlternative_(e) {
        e.stopPropagation();
        this.startAddingShortcut_();
        this.closeActionMenu_();
    }
    async onRemoveShortcut_(e) {
        e.stopPropagation();
        const shortcut = e.detail.shortcut;
        if (!shortcut) {
            this.closeActionMenu_();
            return;
        }
        if (shortcut.source === chrome.perplexity.shortcuts.Source.BUILT_IN) {
            await shortcutsService.disableBuiltInShortcut({
                code: shortcut.code,
                modifiers: shortcut.modifiers,
            });
        }
        else {
            await shortcutsService.clearShortcut(shortcut);
        }
        this.emitShortcutsChanged_();
        this.closeActionMenu_();
    }
    closeActionMenu_() {
        if (this.activeMenu_ && this.activeMenu_.open) {
            this.activeMenu_.close();
        }
        this.activeMenu_ = null;
    }
    async onResetToDefault_(e) {
        e.stopPropagation();
        const currentShortcut = e.detail?.shortcut;
        const restorationIndex = currentShortcut?.restorationIndex ?? 0;
        const builtInShortcut = await shortcutsService.getBuiltInShortcutByIndex(restorationIndex, this.command.id);
        if (!builtInShortcut) {
            this.closeActionMenu_();
            return;
        }
        if (builtInShortcut.status !==
            chrome.perplexity.shortcuts.BuiltInShortcutStatus.ENABLED) {
            const duplicate = await shortcutsService.getShortcutIfExists(builtInShortcut.shortcut_text);
            if (duplicate) {
                await this.handleDuplicateShortcut_({
                    shortcut: builtInShortcut,
                    shortcutToReplace: currentShortcut,
                    commandId: this.command.id,
                });
                this.closeActionMenu_();
                return;
            }
        }
        if (currentShortcut && !currentShortcut.isVirtual) {
            await shortcutsService.clearShortcut(currentShortcut);
        }
        const success = await shortcutsService.resetToDefault(this.command.id, restorationIndex);
        if (success) {
            this.emitShortcutsChanged_();
        }
        this.closeActionMenu_();
    }
    getShortcutClass_(isRestorable) {
        return isRestorable ? "restorable-shortcut" : "";
    }
}
customElements.define(PerplexityCommandElement.is, PerplexityCommandElement);
