import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useEffect, useRef, useMemo, useId } from "react";
import { Button } from "../../components/button/button.js";
import { emptyImportOptions, ImportDataStatus, } from "../../services/types.js";
import { onboardingService } from "../../services/onboarding_service.js";
import { ImportOptionCheckbox } from "./import_option_checkbox.js";
import { captureError } from "//resources/perplexity/libs/capture_error.js";
import { getBrowserName } from "./utils.js";
import { ImportProfileSelect } from "./import_profile_select.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
import { Popup } from "../../components/popup/popup.js";
import { Portal } from "../../components/layout/portal.js";
import { DISABLE_BOOKMARKS_FILES } from "./hooks.js";
const VIDEO_SIZE = 111;
const ALL_POSSIBLE_IMPORT_TYPES = [
    "history",
    "cookies",
    "autofillCreditCards",
    "favorites",
    "passwords",
    "extensions",
];
const defaultCheckboxes = {
    ...emptyImportOptions,
    import_dialog_history: true,
    import_dialog_cookies: true,
    import_dialog_autofill_credit_cards: true,
    import_dialog_bookmarks: true,
    import_dialog_saved_passwords: true,
    import_dialog_extensions: true,
};
const CHECKBOX_BY_TYPE = {
    history: {
        id: "import_dialog_history",
        title: i18n("history_checkbox_label"),
    },
    cookies: {
        id: "import_dialog_cookies",
        title: i18n("cookies_checkbox_label"),
    },
    autofillCreditCards: {
        id: "import_dialog_autofill_credit_cards",
        title: i18n("cards_checkbox_label"),
    },
    favorites: {
        id: "import_dialog_bookmarks",
        title: i18n("bookmarks_checkbox_label"),
    },
    passwords: {
        id: "import_dialog_saved_passwords",
        title: i18n("passwords_checkbox_label"),
    },
    extensions: {
        id: "import_dialog_extensions",
        title: i18n("extensions_checkbox_label"),
    },
};
const getCheckboxIdForType = (importType) => {
    return CHECKBOX_BY_TYPE[importType].id;
};
export const ImportForm = ({ profiles, onFinish, onPopupClose, popupOpen, className, isVisible, }) => {
    const videoRef = useRef(null);
    const formId = useId();
    const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
    useEffect(() => {
        let timeout;
        if (isVisible) {
            timeout = setTimeout(() => {
                videoRef.current?.play();
            }, 400);
        }
        else {
            timeout = setTimeout(() => {
                videoRef.current?.pause();
            }, 50);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [isVisible]);
    const selectedProfile = profiles[selectedProfileIndex];
    const [checkboxes, setCheckboxes] = useState(defaultCheckboxes);
    const [availableCheckboxes, setAvailableCheckboxes] = useState(ALL_POSSIBLE_IMPORT_TYPES);
    const selectedCheckboxes = useMemo(() => availableCheckboxes.filter((importType) => checkboxes[getCheckboxIdForType(importType)]), [availableCheckboxes, checkboxes]);
    const handleCheckboxChange = (id, value) => {
        setCheckboxes((prev) => ({ ...prev, [id]: value }));
    };
    useEffect(() => {
        if (!selectedProfile)
            return;
        setAvailableCheckboxes(ALL_POSSIBLE_IMPORT_TYPES.filter((importType) => selectedProfile[importType]));
    }, [selectedProfile]);
    useEffect(() => {
        const unsubscribe = onboardingService.onImportStatusChanged((status) => {
            if (status === ImportDataStatus.SUCCEEDED) {
                onboardingService.addAnalyticsContext({
                    used_import: true,
                    data_imported: selectedCheckboxes,
                    imported_from: getBrowserName(selectedProfile?.name).toLowerCase(),
                });
                onboardingService.setImportStatus(true);
            }
            else if (status === ImportDataStatus.FAILED) {
                const browserName = getBrowserName(selectedProfile?.name);
                captureError(new Error("Failed to import data"), {
                    extra: {
                        checkboxes,
                        availableCheckboxes,
                        browserName,
                    },
                });
            }
            else if (status === ImportDataStatus.DATA_UNLOCKED) {
                onFinish();
            }
        });
        return () => {
            unsubscribe();
        };
    }, [checkboxes, availableCheckboxes, selectedCheckboxes, selectedProfile]);
    const handleImportBookmarks = () => {
        onboardingService.importFromBookmarksFile();
    };
    useEffect(() => {
        onboardingService.setImportStatus(false);
    }, []);
    const handleImport = () => {
        const enabledAvailableOptions = availableCheckboxes.reduce((acc, importType) => {
            const checkboxId = getCheckboxIdForType(importType);
            acc[checkboxId] = checkboxes[checkboxId];
            return acc;
        }, { ...emptyImportOptions });
        onboardingService.importData(selectedProfileIndex, enabledAvailableOptions);
    };
    const bookmarksAndFavoritesOnly = !DISABLE_BOOKMARKS_FILES &&
        availableCheckboxes.length === 1 &&
        availableCheckboxes[0] === "favorites" &&
        selectedProfileIndex === profiles.length - 1;
    const noCheckboxesSelected = selectedCheckboxes.length === 0;
    if (!selectedProfile) {
        return;
    }
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "b-import-form__body", children: [_jsx("div", { className: "b-import-form__video-container", children: _jsx("video", { ref: videoRef, muted: true, loop: true, autoPlay: true, width: VIDEO_SIZE, height: VIDEO_SIZE, preload: "none", playsInline: true, src: "assets/rotating_bubble.mp4", className: "b-import-form__video" }) }), _jsx(ImportProfileSelect, { profiles: profiles, value: selectedProfileIndex, onChange: (index) => setSelectedProfileIndex(index) }), popupOpen && (_jsxs(Portal, { children: [_jsx("div", { className: "b-import-form__popup-backdrop" }), _jsx(Popup, { radius: "s", width: 350, onClickOutside: onPopupClose, className: "b-import-form__popup", children: _jsxs("div", { className: cx("b-import-form__content"), children: [_jsx("p", { className: "b-import-form__popup-title", children: i18n("import_title") }), _jsx("div", { className: "b-import-form__options", children: availableCheckboxes.map((importType) => {
                                                const { id, title } = CHECKBOX_BY_TYPE[importType];
                                                return (_jsx(ImportOptionCheckbox, { onChange: handleCheckboxChange, id: id, title: title, value: checkboxes[id] ?? false }, `${formId}-${id}`));
                                            }) }), _jsxs("div", { className: "b-import-form__popup-actions", children: [_jsx(Button, { className: "b-import-form__popup-button", view: "none", onClick: onPopupClose, children: i18n("cancel_button_label") }), _jsx(Button, { className: "b-import-form__popup-button", view: "primary", onClick: onPopupClose, children: i18n("done_button_label") })] })] }) })] }))] }), _jsx("div", { className: "b-import-form__footer", children: _jsx(Button, { disabled: noCheckboxesSelected, className: cx("b-import-form__action", "b-import-form__action--full-width"), size: "large", view: "primary", shadowed: true, onClick: bookmarksAndFavoritesOnly ? handleImportBookmarks : handleImport, children: bookmarksAndFavoritesOnly
                        ? i18n("file_button_label")
                        : i18n("import_button_label") }) })] }));
};
