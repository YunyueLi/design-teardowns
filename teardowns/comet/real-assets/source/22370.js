// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
export const getBrowserName = (name) => {
    return name?.split("-")[0]?.trim() ?? "";
};
export const getProfileName = (name) => {
    return name?.split("-")[1]?.trim() ?? "";
};
