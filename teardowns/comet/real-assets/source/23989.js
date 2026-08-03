// Copyright 2026 The Perplexity Browser Authors. All rights reserved.
export function isValidShortcutData(shortcut) {
    return !!shortcut && !!shortcut.code && !!shortcut.modifiers;
}
export function normalizeShortcutText(shortcutText) {
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
export function parseShortcut(shortcutText) {
    if (!shortcutText) {
        return { keyCode: "", modifiers: [] };
    }
    let normalizedText = shortcutText;
    normalizedText = shortcutText
        .replace(/⌘/g, "Command+")
        .replace(/⇧/g, "Shift+")
        .replace(/⌥/g, "Alt+")
        .replace(/⌃/g, "Ctrl+");
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
    const keyCode = convertKeySymbolToDomCode(keySymbol);
    return { keyCode, modifiers };
}
function convertKeySymbolToDomCode(keySymbol) {
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
function convertDomCodeToKeySymbol(code) {
    if (!code) {
        return "";
    }
    if (code.startsWith("Key") && code.length === 4) {
        return code.charAt(3);
    }
    if (code.startsWith("Digit") && code.length === 6) {
        return code.charAt(5);
    }
    return code;
}
export function shortcutToText(shortcutData) {
    if (!isValidShortcutData(shortcutData)) {
        return "";
    }
    const { code, modifiers } = shortcutData;
    const parts = [];
    if (modifiers.includes(chrome.perplexity.shortcuts.Modifier.CONTROL)) {
        parts.push("Ctrl");
    }
    if (modifiers.includes(chrome.perplexity.shortcuts.Modifier.SHIFT)) {
        parts.push("Shift");
    }
    if (modifiers.includes(chrome.perplexity.shortcuts.Modifier.ALT)) {
        parts.push("Alt");
    }
    if (modifiers.includes(chrome.perplexity.shortcuts.Modifier.COMMAND)) {
        parts.push("Command");
    }
    const keySymbol = convertDomCodeToKeySymbol(code);
    if (keySymbol) {
        parts.push(keySymbol);
    }
    return parts.join("+");
}
export function areModifiersEquivalent(modifiers1, modifiers2) {
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
export function filterBuiltInShortcuts(list) {
    return (list || []).filter((s) => s.source === chrome.perplexity.shortcuts.Source.BUILT_IN);
}
export function filterUserShortcuts(list) {
    return (list || []).filter((s) => s.source === chrome.perplexity.shortcuts.Source.USER_DEFINED);
}
export function hasUserShortcuts(list) {
    const userShortcuts = filterUserShortcuts(list);
    return userShortcuts.length > 0;
}
export function hasNonVirtualUserShortcuts(list) {
    const result = list.filter(s => !s.isVirtual
        && s.source === chrome.perplexity.shortcuts.Source.USER_DEFINED);
    return result.length > 0;
}
export function findUserShortcutByText(shortcuts, shortcutText) {
    const userShortcuts = filterUserShortcuts(shortcuts);
    return userShortcuts.find((s) => s.shortcut_text === shortcutText);
}
export function findShortcutByText(shortcuts, shortcutText) {
    return shortcuts.find((s) => s.shortcut_text === shortcutText);
}
export function findShortcutByCodeAndModifiers(shortcuts, code, modifiers) {
    return shortcuts.find((s) => s.code === code && areModifiersEquivalent(s.modifiers, modifiers));
}
export function isBuiltInEnabled(builtIn) {
    return (builtIn.status === chrome.perplexity.shortcuts.BuiltInShortcutStatus.ENABLED);
}
