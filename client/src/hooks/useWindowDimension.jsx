import { useEffect, useState, useCallback } from "react";

interface WindowDimensions {
    width: number;
    height: number;
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    const [isMobile, setIsMobile] = useState<boolean>(
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );

    const updateWindowDimensions = useCallback((): void => {
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
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export default useWindowDimensions;
