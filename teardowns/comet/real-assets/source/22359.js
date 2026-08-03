// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useEffect } from "react";
import { onboardingService } from "../../services/onboarding_service.js";
const FIRST_AVATAR_INDEX_FROM_CPP = 26;
const LAST_AVATAR_INDEX_FROM_CPP = 35;
const sortAvatars = (avatars) => {
    if (avatars.length !== 10 ||
        avatars[0]?.index !== FIRST_AVATAR_INDEX_FROM_CPP ||
        avatars[avatars.length - 1]?.index !== LAST_AVATAR_INDEX_FROM_CPP) {
        console.warn("Could not sort, because configuration of avatars has changed");
        return avatars;
    }
    const sortOrder = [33, 32, 30, 28, 31, 27, 34, 29, 35, 26]; // from design
    return sortOrder
        .map((index) => avatars[index - FIRST_AVATAR_INDEX_FROM_CPP])
        .filter(Boolean);
};
export const useAvatars = () => {
    const [avatars, setAvatars] = useState([]);
    useEffect(() => {
        onboardingService
            .getAvailableIcons()
            .then((avs) => setAvatars(sortAvatars(avs)));
    }, []);
    return avatars;
};
