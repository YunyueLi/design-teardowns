// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
import { parseUrl, restoreProtocol } from './url.js';
/**
 * Get link to the favicon of the page by URL.
 * Since no network download is required, the maximum resolution and scale are used by default.
 *
 * @see https://chromium.googlesource.com/chromium/src/+/master/components/favicon_base/favicon_url_parser.h
 * @param url - Page URL
 * @param size - Size in pixels
 * @param scale -  Scale
 * @returns  Link to the favicon
 */
export const composeFaviconUrl = (url, size = 64, scale = '3x') => {
    // Without the protocol, chrome will consider the request invalid
    // and the default favicon in the minimum resolution (16px, 1x)
    const safeUrl = restoreProtocol(url);
    // TODO: use favicon2 or custom API
    return `chrome://favicon/size/${size}@${scale}/` + decodeURIComponent(safeUrl);
};
/**
 * Get link to the favicon using favicon2 service.
 * This function uses the newer favicon2 API similar to functions in resources/js/icon.ts,
 * but doesn't use image-set to be able to use it in js and fallback to globe
 */
export const composeFavicon2Url = (url, size = 16, isSyncedUrlForHistoryUi = false, remoteIconUrlForUma = '', forceLightMode = false, fallbackToHost = true) => {
    // Without the protocol, chrome will consider the request invalid
    const safeUrl = restoreProtocol(url);
    // Note: URL param keys used below must match those in the description of
    // chrome://favicon2 format in components/favicon_base/favicon_url_parser.h.
    const faviconUrl = new URL('chrome://favicon2/');
    faviconUrl.searchParams.set('size', size.toString());
    faviconUrl.searchParams.set('pageUrl', safeUrl);
    const fallback = isSyncedUrlForHistoryUi ? '1' : '0';
    faviconUrl.searchParams.set('allowGoogleServerFallback', fallback);
    if (isSyncedUrlForHistoryUi) {
        faviconUrl.searchParams.set('iconUrl', remoteIconUrlForUma);
    }
    if (forceLightMode) {
        faviconUrl.searchParams.set('forceLightMode', 'true');
    }
    if (!fallbackToHost) {
        faviconUrl.searchParams.set('fallbackToHost', '0');
    }
    return faviconUrl.toString();
};
export const composeFaviconBackendUrl = (url) => {
    const safeUrl = parseUrl(url);
    if (!safeUrl)
        return null;
    return `https://www.perplexity.ai/rest/browser/favicon?url=${safeUrl.hostname}`;
};
