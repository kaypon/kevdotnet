"use client";

import { useCallback, useRef, useState } from "react";

/** Small char-by-char reveal/delete effect, used for the credit line's
 * entrance typing and the hidden sequence's delete/lore-typing beats. */
export function useTypewriter(initialText = "", speed = 35) {
  const [text, setText] = useState(initialText);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelRef = useRef(false);

  const cancel = useCallback(() => {
    cancelRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const typeIn = useCallback(
    (fullText: string, onDone?: () => void) => {
      cancel();
      cancelRef.current = false;
      let i = 0;
      const tick = () => {
        if (cancelRef.current) return;
        i += 1;
        setText(fullText.slice(0, i));
        if (i < fullText.length) {
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          onDone?.();
        }
      };
      tick();
    },
    [cancel, speed]
  );

  const typeOut = useCallback(
    (fromText: string, onDone?: () => void) => {
      cancel();
      cancelRef.current = false;
      let i = fromText.length;
      const tick = () => {
        if (cancelRef.current) return;
        i -= 1;
        setText(fromText.slice(0, Math.max(i, 0)));
        if (i > 0) {
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          onDone?.();
        }
      };
      tick();
    },
    [cancel, speed]
  );

  return { text, typeIn, typeOut, cancel };
}
