import { useEffect, useState, useCallback } from "react";

/**
 * @typedef {Object} WindowDimensions
 * @property {number} width
 * @property {number} height
 */

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );

    const updateWindowDimensions = useCallback(() => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        // Check if `window` exists to ensure compatibility with SSR
        if (typeof window === "undefined") return;

        const debouncedResize = debounce(updateWindowDimensions, 100);
        window.addEventListener("resize", debouncedResize);

        // Set dimensions initially in case of SSR rendering
        updateWindowDimensions();

        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [updateWindowDimensions]);

    return { ...windowDimensions, isMobile };
}

// Utility function: Debounce
function debounce(func, wait) {
    let timeout = null;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export default useWindowDimensions;
