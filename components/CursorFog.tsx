"use client";

import { useEffect, useRef } from "react";

const PUFF_COUNT = 7;
const PUFF_INTERVAL_MS = 72;

const puffSizes = ["3.25rem", "4.5rem", "3.75rem", "5rem", "3.5rem", "4.25rem", "3.9rem"];
const puffDrifts = [
  ["-8px", "-16px"],
  ["6px", "-21px"],
  ["-4px", "-14px"],
  ["10px", "-24px"],
  ["-11px", "-19px"],
  ["5px", "-17px"],
  ["-6px", "-23px"],
] as const;

export default function CursorFog() {
  const rootRef = useRef<HTMLDivElement>(null);
  const puffsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const nextPuffRef = useRef(0);
  const lastSpawnRef = useRef(-Infinity);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.closest<HTMLElement>(".hero");

    if (!root || !hero) {
      return;
    }

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let isListening = false;

    const cancelScheduledFrame = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const clearPuffs = () => {
      puffsRef.current.forEach((puff) => {
        puff?.classList.remove("is-active");
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest(".hero-copy-panel")) {
        cancelScheduledFrame();
        clearPuffs();
        return;
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame((timestamp) => {
        frameRef.current = null;

        if (timestamp - lastSpawnRef.current < PUFF_INTERVAL_MS) {
          return;
        }

        const puff = puffsRef.current[nextPuffRef.current];

        if (!puff) {
          return;
        }

        const puffIndex = nextPuffRef.current;
        const [driftX, driftY] = puffDrifts[puffIndex];

        puff.style.setProperty("--fog-x", `${pointerRef.current.x}px`);
        puff.style.setProperty("--fog-y", `${pointerRef.current.y}px`);
        puff.style.setProperty("--fog-size", puffSizes[puffIndex]);
        puff.style.setProperty("--fog-drift-x", driftX);
        puff.style.setProperty("--fog-drift-y", driftY);
        puff.classList.remove("is-active");
        void puff.offsetWidth;
        puff.classList.add("is-active");

        lastSpawnRef.current = timestamp;
        nextPuffRef.current = (puffIndex + 1) % PUFF_COUNT;
      });
    };

    const enableTrail = () => {
      if (isListening || motionQuery.matches) {
        return;
      }

      hero.addEventListener("pointermove", onPointerMove, { passive: true });
      isListening = true;
    };

    const disableTrail = () => {
      cancelScheduledFrame();
      clearPuffs();

      if (isListening) {
        hero.removeEventListener("pointermove", onPointerMove);
        isListening = false;
      }
    };

    const onMotionPreferenceChange = () => {
      if (motionQuery.matches) {
        disableTrail();
      } else {
        enableTrail();
      }
    };

    if (!motionQuery.matches) {
      enableTrail();
    }

    motionQuery.addEventListener("change", onMotionPreferenceChange);

    return () => {
      disableTrail();
      motionQuery.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-cursor-fog" aria-hidden="true">
      {Array.from({ length: PUFF_COUNT }, (_, index) => (
        <span
          key={index}
          ref={(puff) => {
            puffsRef.current[index] = puff;
          }}
          className="hero-cursor-fog__puff"
          style={{ pointerEvents: "none" }}
        />
      ))}
    </div>
  );
}
