"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "CEO, NovaTech Solutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    ringColor: "rgba(139,128,255,0.55)",
    rating: 5,
    text: "Working with this team was a complete game-changer. They revamped our entire digital presence and we saw 3× more qualified leads within the first month.",
  },
  {
    name: "James Thornton",
    role: "Marketing Director, Bloom Agency",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    ringColor: "rgba(96,165,250,0.55)",
    rating: 5,
    text: "The creative vision they brought exceeded every expectation. Our brand identity now feels genuinely premium — clients noticed the difference immediately.",
  },
  {
    name: "Priya Sharma",
    role: "Founder, Orbis Digital",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    ringColor: "rgba(52,211,153,0.55)",
    rating: 5,
    text: "Fast, precise, and zero back-and-forth. They understood our vision from the very first call and delivered something beyond what we had imagined.",
  },
  {
    name: "Daniel Reeves",
    role: "Product Lead, Stacklane",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    ringColor: "rgba(251,191,36,0.55)",
    rating: 5,
    text: "Our app went from feeling generic to genuinely premium. The UX improvements alone boosted user retention by 40%. These people think in outcomes.",
  },
  {
    name: "Leila Hassan",
    role: "COO, Meridian Group",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    ringColor: "rgba(251,113,133,0.55)",
    rating: 5,
    text: "Professional, responsive, and brilliant at what they do. The social strategy they crafted tripled our engagement in just 60 days. Highly recommended.",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_DELAY = 4200;
const N = reviews.length;

// ─── Stars ───────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#8B80FF" className="w-4.5 h-4.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── NavBtn ──────────────────────────────────────────────────────────────────

function NavBtn({
  onClick,
  dir,
}: {
  onClick: () => void;
  dir: "prev" | "next";
}) {
  return (
    <button
      onClick={onClick}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        background: "rgba(139,128,255,0.09)",
        border: "1px solid rgba(139,128,255,0.26)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(139,128,255,0.20)";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(139,128,255,0.50)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(139,128,255,0.09)";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(139,128,255,0.26)";
      }}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(192,186,255,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        {dir === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

// ─── ReviewCard ───────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div
      className="relative rounded-2xl flex flex-col overflow-hidden"
      style={{
        minHeight: "280px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(139,128,255,0.15)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.6), transparent)",
        }}
      />

      {/* Inner top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,128,255,0.06) 0%, transparent 100%)",
        }}
      />

      {/* Watermark quote — large, bottom-right */}
      <div
        className="absolute bottom-4 right-5 text-[96px] font-black leading-none pointer-events-none select-none"
        style={{ color: "rgba(139,128,255,0.06)", fontFamily: "Georgia, serif" }}
      >
        &ldquo;
      </div>

      {/* Card body */}
      <div className="relative z-10 flex flex-col flex-1 p-6">

        {/* Stars row */}
        <div className="mb-4">
          <Stars count={review.rating} />
        </div>

        {/* Review text */}
        <p
          className="leading-relaxed flex-1 mb-6"
          style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.68)" }}
        >
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-5"
          style={{ background: "rgba(139,128,255,0.12)" }}
        />

        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          {/* Photo with colored ring */}
          <div
            className="flex-shrink-0 rounded-full p-[2px]"
            style={{
              background: `linear-gradient(135deg, ${review.ringColor}, rgba(139,128,255,0.2))`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={review.avatar}
              alt={review.name}
              width={44}
              height={44}
              className="rounded-full object-cover block"
              style={{
                width: "44px",
                height: "44px",
                border: "2px solid rgba(0,0,50,0.6)",
              }}
            />
          </div>

          <div className="min-w-0">
            <p
              className="text-white font-semibold leading-tight truncate"
              style={{ fontSize: "14px" }}
            >
              {review.name}
            </p>
            <p
              className="text-[11.5px] mt-0.5 truncate"
              style={{ color: "rgba(192,186,255,0.50)" }}
            >
              {review.role}
            </p>
          </div>

          {/* Verified badge */}
          <div className="ml-auto flex-shrink-0">
            <svg
              viewBox="0 0 20 20"
              className="w-[18px] h-[18px]"
              fill="#8B80FF"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible]  = useState(3);
  const [paused, setPaused]    = useState(false);
  const timerRef               = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect how many cards are visible based on breakpoint
  useEffect(() => {
    const check = () => setVisible(window.innerWidth < 640 ? 1 : 3);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const maxIndex = N - visible;

  const next = useCallback(
    () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
    [maxIndex]
  );
  const prev = useCallback(
    () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1)),
    [maxIndex]
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_DELAY);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  // Clamp current when visible changes (e.g. resize desktop→mobile)
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  // translateX: each step = 1 card = (1/N) of total track width
  const tx = -(current / N) * 100;

  return (
    <section className="relative w-full pt-10 pb-24 px-4 overflow-hidden">
      {/* BG ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 w-[700px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,128,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Header + Nav (title left, arrows right — slider2 style) ── */}
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "rgba(139,128,255,0.10)",
                border: "1px solid rgba(139,128,255,0.28)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B80FF] animate-pulse" />
              <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">
                Client Reviews
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
              className="font-extrabold text-white"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
                }}
              >
                Growing Brands
              </span>
            </motion.h2>
          </div>

          {/* Arrows — top right */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="flex gap-3 flex-shrink-0 pb-1"
          >
            <NavBtn onClick={prev} dir="prev" />
            <NavBtn onClick={next} dir="next" />
          </motion.div>
        </div>

        {/* ── Slider viewport ── */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track — all N cards side by side */}
          <div
            className="flex"
            style={{
              transform: `translateX(${tx}%)`,
              transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.name}
                /* w-full on mobile (1 visible), w-1/3 on sm+ (3 visible).
                   px-2.5 gives the gap between cards without breaking the math. */
                className="flex-shrink-0 w-full sm:w-1/3 px-2.5"
              >
                <ReviewCard review={r} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "7px",
                height: "7px",
                background:
                  i === current
                    ? "#8B80FF"
                    : "rgba(139,128,255,0.28)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
