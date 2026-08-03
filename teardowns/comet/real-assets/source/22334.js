// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useEffect } from "react";
export const useClickOutside = (ref, anchorRef, callback) => {
    useEffect(() => {
        if (!callback)
            return;
        const handleClickOutside = (event) => {
            const target = event.target;
            if (ref.current &&
                !ref.current.contains(target) &&
                !anchorRef?.current?.contains(target)) {
                callback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback]);
};
