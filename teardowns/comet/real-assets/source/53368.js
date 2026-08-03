// Copyright 2024 The Perplexity Browser Authors. All rights reserved.
// Before using, you must import the local strings.m.js
// => import '/strings.m.js';
import { loadTimeData } from '//resources/js/load_time_data.js';
export const i18n = (name, ...options) => {
    return loadTimeData.getStringF(name, ...options)
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
};
