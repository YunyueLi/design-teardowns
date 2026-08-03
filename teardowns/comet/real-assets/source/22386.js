// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
export const emptyImportOptions = {
    import_dialog_autofill_form_data: false,
    import_dialog_autofill_credit_cards: false,
    import_dialog_bookmarks: false,
    import_dialog_cookies: false,
    import_dialog_history: false,
    import_dialog_saved_passwords: false,
    import_dialog_search_engine: false,
    import_dialog_extensions: false,
};
/**
 * These string values must be kept in sync with the C++ ImportDataHandler.
 */
export var ImportDataStatus;
(function (ImportDataStatus) {
    ImportDataStatus["INITIAL"] = "initial";
    ImportDataStatus["IN_PROGRESS"] = "inProgress";
    /** Means chromium code doesn't require user's action to unblock cookies and we can proceed */
    ImportDataStatus["DATA_UNLOCKED"] = "dataUnlocked";
    ImportDataStatus["SUCCEEDED"] = "succeeded";
    ImportDataStatus["FAILED"] = "failed";
})(ImportDataStatus || (ImportDataStatus = {}));
export var Platform;
(function (Platform) {
    Platform["MacOS"] = "macos";
    Platform["Windows"] = "windows";
    Platform["Other"] = "other";
})(Platform || (Platform = {}));
export var ImportStatus;
(function (ImportStatus) {
    ImportStatus["Imported"] = "IMPORTED";
    ImportStatus["NotImported"] = "NOT_IMPORTED";
    ImportStatus["Unavailable"] = "UNAVAILABLE";
})(ImportStatus || (ImportStatus = {}));
export var WindowsVersion;
(function (WindowsVersion) {
    WindowsVersion["Win10"] = "win10";
    WindowsVersion["Win11"] = "win11";
    WindowsVersion["Unsupported"] = "unsupported";
})(WindowsVersion || (WindowsVersion = {}));
