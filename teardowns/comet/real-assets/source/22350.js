// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useEffect } from "react";
import { onboardingService } from "../../services/onboarding_service.js";
import { WindowsVersion } from "../../services/types.js";
export const useIsWin10 = () => {
    const [isWin10, setIsWin10] = useState(false);
    useEffect(() => {
        onboardingService.windowsVersion().then((version) => {
            setIsWin10(version === WindowsVersion.Win10);
        });
    }, []);
    return isWin10;
};
