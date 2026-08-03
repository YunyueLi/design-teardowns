// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
import { isValidShortcutData, parseShortcut, normalizeShortcutText, areModifiersEquivalent, filterUserShortcuts, filterBuiltInShortcuts, } from "./perplexity_shortcuts_utils.js";
import { loadTimeData } from "../i18n_setup.js";
import { isWindows } from "//resources/js/platform.js";
export class PerplexityShortcutsService {
    async loadCommands() {
        const commands = await this.getCommands();
        const builtInShortcuts = await this.getBuiltInShortcuts();
        const commandIdToBuiltIns = this.getCommandIdToBuiltInShortcutsMap(builtInShortcuts);
        let processedCommands = commands.map((command) => this.prepareCommand(command, commandIdToBuiltIns));
        if (isWindows) {
            processedCommands = this.omitCommandsWithoutBuiltInShortcuts(processedCommands, commandIdToBuiltIns);
        }
        const lruTabSwitcherEnabled = loadTimeData.getBoolean("lruTabSwitcherFeatureEnabled");
        if (lruTabSwitcherEnabled) {
            return [this.createCycleLruTabsCommand(), ...processedCommands];
        }
        return processedCommands;
    }
    createCycleLruTabsCommand() {
        return {
            id: "__CUSTOM_IDS_PPLX_CYCLE_LRU_TABS",
            isAssistantSpecific: false,
            isCometSpecific: false,
            shortcuts: [],
            translated_name: loadTimeData.getString("lruTabSwitcherHotkeyTitle"),
        };
    }
    prepareCommand(command, commandIdToBuiltIns) {
        const builtIns = commandIdToBuiltIns.get(command.id) || [];
        const shortcuts = this.prepareShortcuts(command, builtIns);
        return {
            ...command,
            shortcuts,
            isAssistantSpecific: this.isAssistantSpecific(command),
        };
    }
    omitCommandsWithoutBuiltInShortcuts(commands, commandIdToBuiltIns) {
        return commands.filter((command) => {
            const builtIns = commandIdToBuiltIns.get(command.id) || [];
            return builtIns.length > 0;
        });
    }
    getCommandIdToBuiltInShortcutsMap(builtIns) {
        return builtIns.reduce((acc, next) => {
            acc.set(next.command_id, next.built_in_shortcuts);
            return acc;
        }, new Map());
    }
    async setShortcut(shortcut, commandId) {
        if (!isValidShortcutData(shortcut) || !commandId) {
            console.error("Invalid shortcut or command ID", { shortcut, commandId });
            return false;
        }
        try {
            const success = await chrome.perplexity.shortcuts.setShortcut(shortcut.code, shortcut.modifiers, commandId);
            if (!success) {
                console.error("Failed to set shortcut", { shortcut, commandId });
            }
            return success;
        }
        catch (error) {
            console.error("Error setting shortcut:", error);
            return false;
        }
    }
    async disableBuiltInShortcut(shortcut) {
        if (!isValidShortcutData(shortcut)) {
            console.error("Invalid shortcut to disable", { shortcut });
            return false;
        }
        try {
            const success = await chrome.perplexity.shortcuts.disableBuiltInShortcut(shortcut.code, shortcut.modifiers);
            if (!success) {
                console.error("Failed to disable built-in shortcut", { shortcut });
            }
            return success;
        }
        catch (error) {
            console.error("Error disabling built-in shortcut:", error);
            return false;
        }
    }
    async clearShortcut(shortcut) {
        if (!isValidShortcutData(shortcut)) {
            console.error("Invalid shortcut to clear", { shortcut });
            return false;
        }
        try {
            const success = await chrome.perplexity.shortcuts.clearShortcut(shortcut.code, shortcut.modifiers);
            if (!success) {
                console.error("Failed to clear user shortcut", { shortcut });
            }
            return success;
        }
        catch (error) {
            console.error("Error clearing user shortcut:", error);
            return false;
        }
    }
    async addOrReplaceShortcut({ shortcut, shortcutToReplace, commandId, }) {
        try {
            if (shortcutToReplace && isValidShortcutData(shortcutToReplace)) {
                const isBuiltIn = await this.isBuiltInShortcut(shortcutToReplace, commandId);
                const success = isBuiltIn
                    ? await this.disableBuiltInShortcut(shortcutToReplace)
                    : await this.clearShortcut(shortcutToReplace);
                if (!success) {
                    console.warn("Failed to clear old shortcut", {
                        shortcutToReplace,
                        isBuiltIn,
                    });
                    return false;
                }
            }
            const builtInIndex = await this.findBuiltInShortcutIndex(shortcut, commandId);
            const isBuiltIn = builtInIndex !== -1;
            const success = isBuiltIn
                ? await this.resetToDefault(commandId, builtInIndex)
                : await this.setShortcut(shortcut, commandId);
            return success;
        }
        catch (error) {
            console.error("Error replacing shortcut:", error);
            return false;
        }
    }
    async getCommands() {
        try {
            const commands = await chrome.perplexity.shortcuts.getCurrentShortcuts();
            return commands || [];
        }
        catch (error) {
            console.error("Error getting shortcuts:", error);
            return [];
        }
    }
    getActiveBuiltInIndices(shortcuts, builtIns) {
        const builtInShortcuts = shortcuts.filter((s) => s.source === chrome.perplexity.shortcuts.Source.BUILT_IN);
        return new Set(builtInShortcuts
            .map((shortcut) => this.findBuiltInShortcutIndexForShortcut(shortcut, builtIns))
            .filter((index) => index >= 0));
    }
    getMissingBuiltInIndices(command, builtIns) {
        const activeIndices = this.getActiveBuiltInIndices(command.shortcuts, builtIns);
        return builtIns
            .map((_, index) => index)
            .filter((index) => !activeIndices.has(index));
    }
    markPrimaryShortcut(shortcuts) {
        const firstNonVirtual = shortcuts.find((s) => !s.isVirtual);
        if (firstNonVirtual) {
            firstNonVirtual.isPrimary = true;
        }
    }
    createVirtualShortcut(index) {
        return {
            code: "",
            modifiers: [],
            shortcut_text: "",
            source: chrome.perplexity.shortcuts.Source.BUILT_IN,
            isPrimary: false,
            isRestorable: true,
            restorationIndex: index,
            isVirtual: true,
        };
    }
    createUserDefinedVirtualShortcut() {
        return {
            code: "",
            modifiers: [],
            shortcut_text: "",
            source: chrome.perplexity.shortcuts.Source.USER_DEFINED,
            isPrimary: false,
            isRestorable: false,
            isVirtual: true,
        };
    }
    prepareShortcuts(command, builtIns) {
        const builtInShortcuts = this.prepareBuiltInShortcuts(command);
        const userShortcuts = this.prepareUserShortcuts(command, builtIns);
        const shortcuts = [...builtInShortcuts, ...userShortcuts];
        this.markPrimaryShortcut(shortcuts);
        return shortcuts;
    }
    prepareBuiltInShortcuts(command) {
        const builtInShortcuts = filterBuiltInShortcuts(command.shortcuts);
        return builtInShortcuts.map((shortcut) => this.createShortcutWithMetadata(shortcut, false, false));
    }
    prepareUserShortcuts(command, builtIns) {
        const missingBuiltInIndices = this.getMissingBuiltInIndices(command, builtIns);
        const rawUserShortcuts = filterUserShortcuts(command.shortcuts);
        const processedUserShortcuts = rawUserShortcuts.map((shortcut, i) => {
            const isRestorable = i < missingBuiltInIndices.length;
            const restorationIndex = isRestorable
                ? missingBuiltInIndices[i]
                : undefined;
            return this.createShortcutWithMetadata(shortcut, false, isRestorable, restorationIndex);
        });
        const virtualShortcuts = missingBuiltInIndices
            .slice(rawUserShortcuts.length)
            .map((index) => this.createVirtualShortcut(index));
        const hasNoShortcuts = !builtIns.length && !rawUserShortcuts.length;
        if (hasNoShortcuts && !isWindows) {
            virtualShortcuts.push(this.createUserDefinedVirtualShortcut());
        }
        return [...processedUserShortcuts, ...virtualShortcuts];
    }
    findBuiltInShortcutIndexForShortcut(shortcut, builtIns) {
        const index = builtIns.findIndex((bi) => bi.code === shortcut.code &&
            areModifiersEquivalent(bi.modifiers, shortcut.modifiers));
        return index >= 0 ? index : -1;
    }
    createShortcutWithMetadata(shortcut, isPrimary, isRestorable, restorationIndex) {
        return {
            ...shortcut,
            isPrimary,
            isRestorable,
            restorationIndex,
        };
    }
    isAssistantSpecific(command) {
        return (command.id === "IDC_PPLX_TOGGLE_ASSISTANT_PANEL" ||
            command.id === "IDC_PPLX_SUMMARIZE_PAGE" ||
            command.id === "IDC_PPLX_ACTIVATE_VOICE_INPUT" ||
            command.id === "IDC_PPLX_TRIGGER_VOICE_MODE");
    }
    async getBuiltInShortcuts() {
        return chrome.perplexity.shortcuts.getBuiltInShortcuts() || [];
    }
    async hasAnyDisabledOrOverriddenBuiltIns() {
        const builtInShortcuts = await this.getBuiltInShortcuts();
        for (const commandBuiltIns of builtInShortcuts) {
            for (const builtIn of commandBuiltIns.built_in_shortcuts) {
                if (builtIn.status === "disabled" || builtIn.status === "overridden") {
                    return true;
                }
            }
        }
        return false;
    }
    async resetAllToDefaults() {
        const commands = await this.getCommands();
        for (const command of commands) {
            const userShortcuts = filterUserShortcuts(command.shortcuts);
            for (const shortcut of userShortcuts) {
                await this.clearShortcut(shortcut);
            }
        }
        const builtInShortcuts = await this.getBuiltInShortcuts();
        for (const commandBuiltIns of builtInShortcuts) {
            for (let i = 0; i < commandBuiltIns.built_in_shortcuts.length; i++) {
                const builtIn = commandBuiltIns.built_in_shortcuts[i];
                if (builtIn.status === "disabled") {
                    await this.enableBuiltInShortcut(builtIn);
                }
            }
        }
    }
    async findCommandById(commandId) {
        const commands = await this.getCommands();
        return commands.find((c) => c.id === commandId) || null;
    }
    async findShortcut(commandId, shortcutText) {
        const command = await this.findCommandById(commandId);
        if (!command) {
            return null;
        }
        return (command.shortcuts.find((s) => s.shortcut_text === shortcutText) || null);
    }
    async getShortcutIfExists(shortcutText) {
        try {
            const commands = await this.getCommands();
            if (!commands.length) {
                return null;
            }
            const normalizedInput = normalizeShortcutText(shortcutText);
            const { keyCode: inputKeyCode, modifiers: inputModifiers } = parseShortcut(shortcutText);
            if (!inputKeyCode || !inputModifiers.length) {
                return null;
            }
            for (const command of commands) {
                for (const shortcut of command.shortcuts) {
                    const normalizedExisting = normalizeShortcutText(shortcut.shortcut_text);
                    if (normalizedExisting === normalizedInput) {
                        return { command, shortcut };
                    }
                    if (isValidShortcutData(shortcut)) {
                        const existingKeyCode = shortcut.code;
                        const existingModifiers = shortcut.modifiers || [];
                        if (existingKeyCode === inputKeyCode &&
                            areModifiersEquivalent(inputModifiers, existingModifiers)) {
                            return { command, shortcut };
                        }
                    }
                }
            }
            return null;
        }
        catch (error) {
            console.error("Error checking if shortcut exists:", error);
            return null;
        }
    }
    async enableBuiltInShortcut(shortcut) {
        if (!isValidShortcutData(shortcut)) {
            console.error("Invalid shortcut to enable", { shortcut });
            return false;
        }
        try {
            const success = await chrome.perplexity.shortcuts.enableBuiltInShortcut(shortcut.code, shortcut.modifiers);
            if (!success) {
                console.error("Failed to enable built-in shortcut", { shortcut });
            }
            return success;
        }
        catch (error) {
            console.error("Error enabling built-in shortcut:", error);
            return false;
        }
    }
    async resetToDefault(commandId, shortcutIndex = 0) {
        const builtInShortcut = await this.getBuiltInShortcutByIndex(shortcutIndex, commandId);
        if (!builtInShortcut) {
            return false;
        }
        const { status } = builtInShortcut;
        if (status === "overridden") {
            await this.restoreBuiltInShortcut(builtInShortcut);
        }
        else if (status === "disabled") {
            await this.enableBuiltInShortcut(builtInShortcut);
        }
        return true;
    }
    async getPrimaryBuiltInShortcutForCommand(commandId) {
        const builtInShortcuts = await this.getBuiltInShortcuts();
        const builtIn = builtInShortcuts.find((b) => b.command_id === commandId);
        if (!builtIn || builtIn.built_in_shortcuts.length === 0) {
            return;
        }
        return builtIn.built_in_shortcuts[0];
    }
    async getBuiltInShortcutByIndex(index, commandId) {
        const builtInShortcuts = await this.getBuiltInShortcuts();
        const builtIn = builtInShortcuts.find((b) => b.command_id === commandId);
        if (!builtIn || builtIn.built_in_shortcuts.length <= index) {
            return undefined;
        }
        return builtIn.built_in_shortcuts[index];
    }
    sortBuiltInShortcutsGoFirst(shortcuts) {
        return [...shortcuts].sort((a, b) => {
            const aIsBuiltIn = a.source === chrome.perplexity.shortcuts.Source.BUILT_IN;
            const bIsBuiltIn = b.source === chrome.perplexity.shortcuts.Source.BUILT_IN;
            return aIsBuiltIn === bIsBuiltIn ? 0 : aIsBuiltIn ? -1 : 1;
        });
    }
    async findBuiltInShortcutIndex(shortcut, commandId) {
        const builtInShortcuts = await this.getBuiltInShortcuts();
        const builtIn = builtInShortcuts.find((b) => b.command_id === commandId);
        if (!builtIn) {
            return -1;
        }
        return builtIn.built_in_shortcuts.findIndex((bi) => bi.code === shortcut.code &&
            areModifiersEquivalent(bi.modifiers, shortcut.modifiers));
    }
    async isBuiltInShortcut(shortcut, commandId) {
        const builtInShortcuts = await this.getBuiltInShortcuts();
        const builtIn = builtInShortcuts.find((b) => b.command_id === commandId);
        if (!builtIn) {
            return false;
        }
        return builtIn.built_in_shortcuts.some((bi) => bi.code === shortcut.code &&
            areModifiersEquivalent(bi.modifiers, shortcut.modifiers));
    }
    async restoreBuiltInShortcut({ overridden_command_id, code, modifiers, }) {
        if (!overridden_command_id) {
            return;
        }
        const overridingCommand = await this.findCommandById(overridden_command_id);
        if (overridingCommand) {
            const overridingShortcut = overridingCommand.shortcuts.find((s) => s.code === code && areModifiersEquivalent(s.modifiers, modifiers));
            if (overridingShortcut) {
                await this.clearShortcut(overridingShortcut);
            }
        }
        await this.enableBuiltInShortcut({ code, modifiers });
    }
}
export const shortcutsService = new PerplexityShortcutsService();
