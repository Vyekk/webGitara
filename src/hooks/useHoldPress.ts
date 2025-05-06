import { useRef, useCallback, useEffect } from 'react';

export const useHoldPress = (action: () => void, delay = 300, interval = 100) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const intervalRef = useRef<NodeJS.Timeout>();
    const isHoldingRef = useRef(false);

    const start = useCallback(() => {
        isHoldingRef.current = true;
        action();

        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(action, interval);
        }, delay);
    }, [action, delay, interval]);

    const stop = useCallback(() => {
        isHoldingRef.current = false;
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
        };
    }, []);

    return { onMouseDown: start, onMouseUp: stop, onMouseLeave: stop };
};
