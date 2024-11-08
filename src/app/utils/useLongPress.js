import { useEffect, useCallback, useRef } from 'react';

export default function useLongPress(onStart, onEnd, ms = 300) {
  const timerIdRef = useRef(null);

  const stop = useCallback(() => {
    onEnd()
    timerIdRef.current = null
  }, [onEnd]);

  const start = useCallback(() => {
    onStart()
    timerIdRef.current = setTimeout(stop, ms);
  }, [onStart, ms, stop]);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}