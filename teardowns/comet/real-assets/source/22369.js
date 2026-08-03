// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useEffect, useCallback } from "react";
import { importService } from "../../services/import_service.js";
import { onboardingService } from "../../services/onboarding_service.js";
/**
 * This behaviour is rare and broken right now in the webui, so turn it off
 */
export const DISABLE_BOOKMARKS_FILES = true;
/**
 * @param profiles
 * Bookmarks profile is always the last one in the list
 * see chrome/browser/resources/settings/people_page/import_data_dialog.ts:143
 * @returns
 */
const trimBookmarks = (profiles) => {
    return profiles.slice(0, profiles.length - 1);
};
export const useImportableProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchAllProfiles = useCallback(async () => {
        try {
            const result = await importService.getProfiles();
            setProfiles(DISABLE_BOOKMARKS_FILES ? trimBookmarks(result) : result);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchAllProfiles();
    }, [fetchAllProfiles]);
    return { profiles, isLoading };
};
export const useImportAvailability = () => {
    const { profiles, isLoading } = useImportableProfiles();
    return { isImportAvailable: profiles.length > 0, isLoading };
};
export const useIsCometDefaultBrowser = () => {
    const [isDefault, setIsDefault] = useState(false);
    useEffect(() => {
        onboardingService
            .isPerplexityDefaultBrowser()
            .then((value) => setIsDefault(value));
    }, []);
    return isDefault;
};
