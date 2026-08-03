// Copyright 2025 The Perplexity Browser Authors. All rights reserved.
import { useEffect, useRef, useState } from "react";
const DEFAULT_DELAY_MS = 100;
export const useDelayedHover = (delayMs = DEFAULT_DELAY_MS) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [intendedHoverIndex, setIntendedHoverIndex] = useState(null);
    const intentionTimeoutRef = useRef();
    useEffect(() => {
        if (hoveredIndex !== null) {
            setIntendedHoverIndex(null);
            intentionTimeoutRef.current = setTimeout(() => {
                setIntendedHoverIndex(hoveredIndex);
            }, delayMs);
        }
        else {
            setIntendedHoverIndex(null);
        }
        return () => clearTimeout(intentionTimeoutRef.current);
    }, [hoveredIndex]);
    return {
        setHoveredIndex,
        index: intendedHoverIndex,
    };
};
