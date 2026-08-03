import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { onboardingService } from "../../services/onboarding_service.js";
import { cx } from "//resources/perplexity/libs/classnames.js";
import { i18n } from "//resources/perplexity/libs/i18n.js";
const DEFAULT_WINDOW_PARAMS = "popup=true,width=1000,height=800,top=100,left=200,noopener=true,noreferrer=true";
const openPopup = (url, params = DEFAULT_WINDOW_PARAMS) => {
    window.open(url, undefined, params);
};
export const LegalLinks = ({ className }) => {
    const openTermsOfService = async () => {
        openPopup(await onboardingService.getPerplexityUrl("/hub/legal/terms-of-service"));
    };
    const openPrivacyPolicy = async () => {
        openPopup(await onboardingService.getPerplexityUrl("/hub/legal/privacy-policy"));
    };
    return (_jsxs("div", { className: cx("b-legal-links__terms", className), children: [i18n("legal_links_text"), " ", _jsx("button", { onClick: openTermsOfService, className: "b-legal-links__window-link", children: i18n("legal_links_terms") }), " ", i18n("legal_links_and"), " ", _jsx("button", { onClick: openPrivacyPolicy, className: "b-legal-links__window-link", children: i18n("legal_links_policy") }), " "] }));
};
