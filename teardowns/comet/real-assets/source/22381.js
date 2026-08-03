// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useState, useEffect } from "react";
import { ColorSchemeMode } from "//resources/cr_components/customize_color_scheme_mode/customize_color_scheme_mode.mojom-webui.js";
import { themeService } from "../../services/theme_service.js";
export const useTheme = () => {
    const [mode, setMode] = useState(ColorSchemeMode.kSystem);
    useEffect(() => {
        const unsubscribe = themeService.subscribeToColorModesUpdated(setMode);
        themeService.init();
        return () => {
            unsubscribe();
        };
    }, []);
    return mode;
};
export const useColorTheme = () => {
    const [colorTheme, setColorTheme] = useState("");
    useEffect(() => {
        themeService.getCurrentColorTheme().then(setColorTheme);
    }, []);
    useEffect(() => {
        const unsubscribe = themeService.subscribeToColorThemeChange(setColorTheme);
        return unsubscribe;
    }, []);
    return colorTheme;
};
