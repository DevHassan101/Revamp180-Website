"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Stat {
  label: string;
  sublabel: string;
  to: number;
  suffix: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const stats: Stat[] = [
  { label: "Years Active",  sublabel: "Building digital products",  to: 6,   suffix: "+" },
  { label: "Projects Done", sublabel: "Shipped across industries",  to: 445, suffix: "+" },
  { label: "Satisfaction",  sublabel: "Client retention rate",      to: 100, suffix: "%" },
];

// ─── Ease ─────────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── CountUp ─────────────────────────────────────────────────────────────────

function CountUp({
  to,
  suffix,
  delayMs = 0,
  inView,
}: {
  to: number;
  suffix: string;
  delayMs?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const rafRef   = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    startRef.current = null;
    const DURATION = 3200;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current - delayMs;
      if (elapsed < 0) { rafRef.current = requestAnimationFrame(tick); return; }

      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * to));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [inView, to, delayMs]);

  return <>{display}{suffix}</>;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function StatsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full py-10 px-4 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>

        {/* ── Single unified strip (not 3 separate cards) ── */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            // border: "1px solid rgba(139,128,255,0.18)"
          }}
        >
          {/* Full-width gradient accent line at top */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #8B80FF 25%, #C0BAFF 40%, #8B80FF 55%, transparent 100%)",
            }}
          />


          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 relative">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.13, ease: EASE }}
                className="relative flex flex-col items-center text-center px-10 py-12"
              >
                {/* Vertical divider — between items on sm+ screens */}
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block w-[1px] h-[55%]"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(139,128,255,0.25) 40%, rgba(139,128,255,0.25) 60%, transparent 100%)",
                    }}
                  />
                )}

                {/* Horizontal divider — between items on mobile */}
                {i > 0 && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 sm:hidden h-[1px] w-[55%]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(139,128,255,0.25) 40%, rgba(139,128,255,0.25) 60%, transparent 100%)",
                    }}
                  />
                )}

                {/* Counter number — bigger, no icon box */}
                <div
                  className="font-black tabular-nums leading-none mb-2"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 4.2rem)",
                    letterSpacing: "-0.05em",
                    background: "linear-gradient(160deg, #ffffff 25%, #8B80FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <CountUp
                    to={stat.to}
                    suffix={stat.suffix}
                    delayMs={i * 220}
                    inView={inView}
                  />
                </div>

                {/* Primary label */}
                <p
                  className="text-[11px] font-bold tracking-[0.22em] uppercase mb-1.5"
                  style={{ color: "rgba(192,186,255,0.75)" }}
                >
                  {stat.label}
                </p>

                {/* Sub-label — absent in Services cards */}
                <p
                  className="text-[12px] leading-snug"
                  style={{ color: "rgba(255,255,255,0.22)" }}
                >
                  {stat.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
