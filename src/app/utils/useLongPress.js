import { useState, useEffect, useCallback } from 'react';

export default function useLongPress(onStart, onEnd, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(onEnd, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [onStart, ms, startLongPress]);

  const start = useCallback(() => {
    onStart()
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    onEnd()
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}