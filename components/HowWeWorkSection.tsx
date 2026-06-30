"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "1",
    title: "Discovery Call",
    description:
      "Free consultation to map your goals, target audience, and full project scope.",
    icon: "tabler:phone-call",
    svgX: 18,
    svgY: 62,
    dotDelay: 0.4,
    cardLeft: "7.6%",
    cardTop: "64%",
  },
  {
    number: "2",
    title: "Design & Build",
    description:
      "Pixel-perfect UI crafted and developed with regular milestone check-ins.",
    icon: "tabler:code",
    svgX: 51,
    svgY: 37,
    dotDelay: 1.1,
    cardLeft: "40.3%",
    cardTop: "39%",
  },
  {
    number: "3",
    title: "Launch & Grow",
    description:
      "Go live with full testing, handover, and ongoing growth support.",
    icon: "tabler:rocket",
    svgX: 84,
    svgY: 12.5,
    dotDelay: 1.8,
    cardLeft: "73%",
    cardTop: "14%",
  },
];

const WAVE =
  "M 3 68 C 9 70, 13 68, 18 65 C 32 52, 38 40, 50 40 C 62 40, 74 13, 94 12";

function CTAButton() {
  return (
    <Link
      href="/consultation"
      className="group/btn relative inline-flex items-center gap-4 bg-[linear-gradient(135deg,#080B78,#00004D)] pl-1.5 pr-8 md:pr-10 py-1.5 rounded-full transition-all duration-700
    shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
    hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
    cursor-pointer overflow-hidden"
    >
      <div className="relative z-10 flex items-center gap-3">
        <div className="bg-white w-10 h-10 md:w-11 md:h-11 rounded-full flex justify-center items-center transition-all duration-700 ease-out shadow-lg group-hover/btn:-rotate-40">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 md:w-5.5 md:h-5.5 fill-[#080B78] transition-all duration-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </div>
        <span className="text-white font-semibold tracking-wide text-sm md:text-[16.5px] whitespace-nowrap drop-shadow-sm">
          Free Consultation
        </span>
      </div>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
    </Link>
  );
}

// ── Right Panel with shared useInView ref ──
function RightPanel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.65 });

  return (
    <div ref={ref} className="relative flex-1 overflow-hidden">
      {/* Wave SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        style={{ zIndex: 5 }}
      >
        <defs>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3520DC" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#5B4FF0" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#8B80FF" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d={WAVE}
          stroke="url(#waveGrad2)"
          strokeWidth="0.45"
          strokeLinecap="round"
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d={WAVE}
          stroke="url(#waveGrad2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.11"
          animate={
            isInView
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>

      {/* Dots */}
      {steps.map((step) => (
        <StepDot key={`dot-${step.number}`} step={step} isInView={isInView} />
      ))}

      {/* Cards */}
      {/* Cards */}
      {steps.map((step) => (
        <motion.div
          key={`card-${step.number}`}
          className="absolute z-20 w-[clamp(11rem,15vw,14.375rem)]"
          style={{ left: step.cardLeft, top: step.cardTop }}
          initial={{ opacity: 0, y: 12 }}          // ← yeh add karo
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
          }
          transition={{
            duration: 0.55,
            ease: EASE,
            delay: step.dotDelay + 0.15,
          }}
        >
          <CompactCard step={step} />
        </motion.div>
      ))}
    </div>
  );
}

export default function HowWeWorkSection() {
  return (
    <section className="relative max-w-360 mx-auto w-full h-auto max-h-auto lg:h-screen lg:max-h-[660px] overflow-hidden">
      {/* ─────── MOBILE / TABLET (below lg) ─────── */}
      <div className="lg:hidden px-5 sm:px-10 pt-10 pb-20 h-full overflow-y-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(139,128,255,0.10)",
            border: "1px solid rgba(139,128,255,0.28)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B80FF] animate-pulse" />
          <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">
            Our Process
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="font-extrabold text-white mb-3"
          style={{
            fontSize: "clamp(1.6rem, 7vw, 2.2rem)",
            letterSpacing: "-0.02em",
          }}
        >
          How We{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
            }}
          >
            Get It Done
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
          className="text-white/50 text-sm leading-relaxed mb-8"
        >
          A simple 3-step process built for clarity and results from the first
          call to your final launch.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={`mobile-card-${step.number}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 210,
                damping: 20,
                delay: 0.08 + i * 0.14,
              }}
            >
              <CompactCard step={step} />
            </motion.div>
          ))}
        </div>

        <CTAButton />
      </div>

      {/* ─────── DESKTOP (lg+) ─────── */}
      <div className="hidden lg:flex h-full items-stretch">
        {/* ── Left Panel ── */}
        <div className="relative z-20 flex flex-col justify-center pl-6 xl:pl-10 pr-0 w-[clamp(19rem,30vw,31.25rem)] shrink-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 w-fit"
            style={{
              background: "rgba(139,128,255,0.10)",
              border: "1px solid rgba(139,128,255,0.28)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B80FF] animate-pulse" />
            <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">
              Our Process
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-extrabold text-white mb-3 leading-tight"
            style={{
              fontSize: "clamp(1.6rem, 2.8vw, 2.7rem)",
              letterSpacing: "-0.02em",
            }}
          >
            How We{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
            >
              Get It Done
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            className="text-white/50 text-[15px] leading-relaxed mb-7"
          >
            A simple 3-step process built for clarity and results from the first
            call to your final launch.
          </motion.p>

          {/* Step list */}
          <div className="space-y-6 mb-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  ease: EASE,
                  delay: 0.2 + i * 0.1,
                }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(24,0,200,0.5) 0%, rgba(53,32,220,0.32) 100%)",
                    border: "1px solid rgba(139,128,255,0.3)",
                    boxShadow: "0 0 14px rgba(53,32,220,0.25)",
                  }}
                >
                  <Icon icon={step.icon} className="w-4 h-4 text-[#C0BAFF]" />
                </div>
                <div>
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.16em] mb-0.5"
                    style={{ color: "rgba(139,128,255,0.75)" }}
                  >
                    Step {step.number}
                  </p>
                  <p className="text-white font-semibold text-[15px]">
                    {step.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            <CTAButton />
          </motion.div>
        </div>

        {/* ── Right Panel (shared useInView) ── */}
        <RightPanel />
      </div>
    </section>
  );
}

// ── Compact Card (used on both mobile + desktop) ──
function CompactCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <div
      className="relative rounded-2xl px-4 py-4 overflow-hidden"
      style={{
        background: "rgba(8,0,55,0.82)",
        border: "1px solid rgba(139,128,255,0.25)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.65), transparent)",
        }}
      />

      {/* Header row: icon + STEP label */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(24,0,200,0.6) 0%, rgba(53,32,220,0.42) 100%)",
            border: "1px solid rgba(139,128,255,0.35)",
            boxShadow: "0 0 16px rgba(53,32,220,0.3)",
          }}
        >
          <Icon icon={step.icon} className="w-5 h-5 text-[#C0BAFF]" />
        </div>
        <p
          className="text-[10px] font-black uppercase tracking-[0.18em]"
          style={{ color: "rgba(139,128,255,0.75)" }}
        >
          Step {step.number}
        </p>
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-[0.95rem] mb-1.5 leading-snug">
        {step.title}
      </h3>

      {/* Divider */}
      <div
        className="w-7 h-[1.5px] mb-2"
        style={{
          background:
            "linear-gradient(90deg, rgba(139,128,255,0.5), transparent)",
        }}
      />

      {/* Description */}
      <p className="text-white/55 text-[0.82rem] leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

// ── Step Dot ──
function StepDot({
  step,
  isInView,
}: {
  step: (typeof steps)[number];
  isInView: boolean;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${step.svgX}%`,
        top: `${step.svgY}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 30,
      }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
        delay: step.dotDelay,
      }}
    >
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ inset: "-12px", border: "1px solid rgba(139,128,255,0.25)" }}
        animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: step.dotDelay * 0.35,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          inset: "-6px",
          background: "rgba(139,128,255,0.10)",
          border: "1px solid rgba(139,128,255,0.2)",
        }}
      />
      <div
        className="relative w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle, #C0BAFF 0%, #8B80FF 55%, #3520DC 100%)",
          boxShadow:
            "0 0 18px rgba(139,128,255,0.8), 0 0 36px rgba(53,32,220,0.4)",
        }}
      >
        <Icon icon={step.icon} className="w-2.5 h-2.5 text-white/95" />
      </div>
    </motion.div>
  );
}