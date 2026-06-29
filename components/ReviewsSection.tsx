"use client";

import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Isabella Brown",
    role: "Founder, Elevate",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    ringColor: "rgba(139,128,255,0.55)",
    rating: 5,
    text: "Our online store went from basic to beautiful. Browsing is effortless, sales are up, and customers constantly compliment the new look.",
  },
  {
    name: "James Smith",
    role: "Founder, Deep Code",
    avatar: "",
    ringColor: "rgba(96,165,250,0.55)",
    rating: 5,
    text: "They built us a sleek, modern website that perfectly captures our software brand. The whole process was smooth and the results spoke for themselves.",
  },
  {
    name: "Amelia Johnson",
    role: "Founder, Pago",
    avatar: "",
    ringColor: "rgba(52,211,153,0.55)",
    rating: 5,
    text: "They brought our juice brand to life with vibrant, fresh visuals. Our packaging and campaigns finally feel as premium as the product itself.",
  },
  {
    name: "Samuel Young",
    role: "Director, YONG Real Estate",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    ringColor: "rgba(251,191,36,0.55)",
    rating: 5,
    text: "Our social media finally looks professional and consistent. Engagement climbed fast and we're now getting real, qualified leads from it.",
  },
  {
    name: "Charlotte",
    role: "Marketing Manager, Pulse Media",
    avatar: "",
    ringColor: "rgba(251,113,133,0.55)",
    rating: 5,
    text: "They turned our raw footage into a cinematic property tour. The final video looked premium and helped our listings stand out instantly.",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Stars ───────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#8B80FF" className="w-4 h-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── ReviewCard ───────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div
      className="relative rounded-2xl flex flex-col overflow-hidden h-full"
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
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,128,255,0.06) 0%, transparent 100%)",
        }}
      />
      {/* Decorative quote mark */}
      <div
        className="absolute bottom-4 right-5 text-[96px] font-black leading-none pointer-events-none select-none"
        style={{ color: "rgba(139,128,255,0.06)", fontFamily: "Georgia, serif" }}
      >
        &ldquo;
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-6">
        <div className="mb-4">
          <Stars count={review.rating} />
        </div>
        <p
          className="leading-relaxed flex-1 mb-6"
          style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.68)" }}
        >
          &ldquo;{review.text}&rdquo;
        </p>
        <div
          className="w-full h-px mb-5"
          style={{ background: "rgba(139,128,255,0.12)" }}
        />
        <div className="flex items-center gap-3">
          <div
            className="flex-shrink-0 rounded-full p-[2px]"
            style={{
              background: `linear-gradient(135deg, ${review.ringColor}, rgba(139,128,255,0.2))`,
            }}
          >
            {review.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
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
            ) : (
              <div
                className="rounded-full flex items-center justify-center font-bold text-white select-none"
                style={{
                  width: "44px",
                  height: "44px",
                  fontSize: "17px",
                  border: "2px solid rgba(0,0,50,0.6)",
                  background: `linear-gradient(135deg, ${review.ringColor}, rgba(139,128,255,0.35))`,
                }}
              >
                {review.name.charAt(0).toUpperCase()}
              </div>
            )}
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
          <div className="ml-auto flex-shrink-0">
            <svg viewBox="0 0 20 20" className="w-[18px] h-[18px]" fill="#8B80FF">
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
  // Duplicate cards — CSS marquee needs 2 sets so the loop is seamless.
  // translateX(-50%) lands exactly at the start of the second set,
  // then the animation resets to 0 invisibly → zero jerk, zero JS.
  const doubled = [...reviews, ...reviews];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-inner {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee 18s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover .marquee-inner {
          animation-play-state: paused;
        }
      `}</style>

      <section className="relative w-full pt-10 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,128,255,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ── Header ── */}
          <div className="mb-10">
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

          {/* ── Marquee track ── */}
          <div className="relative overflow-hidden marquee-track">
            {/* Left fade edge */}
            <div
              className="hidden xl:flex absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, var(--bg-base, #08081a) 0%, transparent 100%)",
              }}
            />
            {/* Right fade edge */}
            <div
              className="hidden xl:flex absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, var(--bg-base, #08081a) 0%, transparent 100%)",
              }}
            />

            <div className="marquee-inner py-2">
              {doubled.map((r, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] md:w-[340px]">
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}