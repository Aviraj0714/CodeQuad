import { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimension";

// Adjust layout responsiveness, especially for mobile devices
function useResponsive() {
    const [minHeightReached, setMinHeightReached] = useState(false);
    const { height, isMobile } = useWindowDimensions();
    const [viewHeight, setViewHeight] = useState(height);

    useEffect(() => {
        if (!height || typeof isMobile === "undefined") return;

        if (isMobile) {
            if (height < 500) {
                if (!minHeightReached) setMinHeightReached(true);
                if (viewHeight !== height) setViewHeight(height);
            } else {
                if (minHeightReached) setMinHeightReached(false);
                if (viewHeight !== height - 50) setViewHeight(height - 50);
            }
        } else {
            if (minHeightReached) setMinHeightReached(false);
            if (viewHeight !== height) setViewHeight(height);
        }
    }, [height, isMobile, minHeightReached, viewHeight]);

    return { viewHeight, minHeightReached };
}

export default useResponsive;
