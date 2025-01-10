import { useEffect } from "react";
import screenfull from "screenfull";

function detectMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
    ];
    return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
}

function useFullScreen() {
    const isMobile = detectMobile();

    useEffect(() => {
        if (!isMobile || !screenfull.isEnabled) return;

        try {
            screenfull.request();
        } catch (error) {
            console.error("Failed to enter fullscreen mode:", error);
        }
    }, [isMobile]);
}

export default useFullScreen;
