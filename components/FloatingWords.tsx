"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const WORDS = ["Refresh", "Redesign", "Relaunch"];

// A few keyframe "stops" per word — the text smoothly drifts between them and
// loops forever. Each value is a fraction (0–1) of the container size, so the
// motion adapts to any footer width/height.
const PATHS = [
  {
    x: [0.05, 0.55, 0.8, 0.3, 0.05],
    y: [0.15, 0.05, 0.6, 0.8, 0.15],
    duration: 26,
  },
  {
    x: [0.7, 0.2, 0.05, 0.6, 0.7],
    y: [0.7, 0.5, 0.1, 0.25, 0.7],
    duration: 32,
  },
  {
    x: [0.35, 0.85, 0.45, 0.1, 0.35],
    y: [0.85, 0.35, 0.15, 0.55, 0.85],
    duration: 29,
  },
];

export default function FloatingWords() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = size.w > 0 && size.h > 0;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {ready &&
        WORDS.map((word, i) => {
          const p = PATHS[i % PATHS.length];
          const xs = p.x.map((f) => f * size.w);
          const ys = p.y.map((f) => f * size.h);
          return (
            <motion.span
              key={word}
              className="absolute left-0 top-0 select-none whitespace-nowrap font-extrabold uppercase tracking-tight"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                color: "rgba(139,128,255,0.2)",
              }}
              initial={{ x: xs[0], y: ys[0] }}
              animate={{ x: xs, y: ys }}
              transition={{
                duration: p.duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {word}
            </motion.span>
          );
        })}
    </div>
  );
}
