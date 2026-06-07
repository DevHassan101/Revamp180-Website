"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    dotDelay: 0.55,
    cardLeft: "7.5%",
    cardTop: "64%",
  },
  {
    number: "2",
    title: "Design & Build",
    description:
      "Pixel-perfect UI crafted and developed with regular milestone check-ins.",
    icon: "tabler:code",
    svgX: 51,
    svgY: 38,
    dotDelay: 1.2,
    cardLeft: "40.5%",
    cardTop: "40%",
  },
  {
    number: "3",
    title: "Launch & Grow",
    description:
      "Go live with full testing, handover, and ongoing growth support.",
    icon: "tabler:rocket",
    svgX: 84,
    svgY: 12.5,
    dotDelay: 1.85,
    cardLeft: "73.5%",
    cardTop: "15%",
  },
];

// Path endpoints match svgX/svgY exactly so dots sit precisely on the wave
const WAVE =
  "M 3 68 C 9 70, 13 68, 18 65 C 32 52, 38 40, 50 40 C 62 40, 74 13, 94 12";

export default function HowWeWorkSection() {

  return (
    <section className="relative max-w-360 mx-auto min-h-250">
      {/* ── Left heading — absolute top-left ── */}
      <div className="absolute top-16 left-8 sm:left-12 lg:left-20 max-w-137.5 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
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
          className="font-extrabold text-white mb-5"
          style={{
            fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)",
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
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
          className="text-white/50 text-[0.95rem] leading-relaxed mb-8"
        >
          A simple 3-step process built for clarity and results from the first
          call to your final launch.
        </motion.p>

        {/* Step list — left panel */}
        <div className="space-y-5 mb-10">
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
              className="flex items-start gap-4"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
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
                <p className="text-white font-semibold text-[0.95rem]">
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
          <Link
            href="/contact"
            className="group/btn relative inline-flex items-center gap-4 bg-[linear-gradient(135deg,#080B78,#00004D)] pl-1.5 pr-8 md:pr-10 py-1.5 rounded-full transition-all duration-700 shadow-[0_10px_20px_rgba(8,11,120,0.45)] hover:shadow-[0_0_32px_rgba(8,11,120,0.85),0_0_60px_rgba(80,70,255,0.35)] cursor-pointer overflow-hidden"
          >
            <div className="relative z-10 flex items-center transition-all duration-700 group-hover/btn:gap-4 gap-3">
              <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all duration-700 ease-out shadow-lg -rotate-40 group-hover/btn:rotate-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-5.5 md:h-5.5 fill-[#080B78] transition-all duration-700" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-wide text-sm md:text-[17px] whitespace-nowrap transition-all duration-700 drop-shadow-sm group-hover/btn:tracking-wider">
                Free Consultation
              </span>
            </div>
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
          </Link>
        </motion.div>
      </div>

      {/* ── Wave + Dots + Cards ── */}
      <div className="absolute inset-0 top-10 left-10 right-10">
        {/* ── Full-width SVG wave ── */}
        <svg
          className="absolute inset-0 w-full h-full "
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

          {/* Main line */}
          <motion.path
            d={WAVE}
            stroke="url(#waveGrad2)"
            strokeWidth="0.45"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Soft glow duplicate */}
          <motion.path
            d={WAVE}
            stroke="url(#waveGrad2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.11"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>

        {/* ── Dots on wave — HTML divs at svgX/svgY % ── */}
        {steps.map((step) => (
          <StepDot key={`dot-${step.number}`} step={step} />
        ))}

        {/* ── Step glass cards ── */}
        {steps.map((step) => (
          <motion.div
            key={`card-${step.number}`}
            className="absolute z-20 w-[320px]"
            style={{ left: step.cardLeft, top: step.cardTop }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: step.dotDelay + 0.2,
            }}
          >
            <StepContent step={step} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StepContent({ step }: { step: (typeof steps)[number] }) {
  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "rgba(8,0,55,0.82)",
        border: "1px solid rgba(139,128,255,0.25)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow:
          "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.65), transparent)",
        }}
      />

      {/* Inner top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,128,255,0.09) 0%, transparent 100%)",
        }}
      />

      {/* Step number — top right */}
      <span
        className="absolute top-4 right-5 text-[11px] font-black uppercase tracking-[0.18em]"
        style={{ color: "rgba(139,128,255,0.4)" }}
      >
        {step.number.padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="relative mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(24,0,200,0.6) 0%, rgba(53,32,220,0.42) 100%)",
            border: "1px solid rgba(139,128,255,0.35)",
            boxShadow: "0 0 20px rgba(53,32,220,0.35)",
          }}
        >
          <Icon icon={step.icon} className="w-6 h-6 text-[#C0BAFF]" />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative text-white font-bold text-[1.05rem] mb-2 leading-snug">
        {step.title}
      </h3>

      {/* Divider */}
      <div
        className="w-8 h-[1.5px] mb-3"
        style={{
          background:
            "linear-gradient(90deg, rgba(139,128,255,0.5), transparent)",
        }}
      />

      {/* Description */}
      <p className="relative text-white/55 text-[0.95rem] leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}

function StepDot({ step }: { step: (typeof steps)[number] }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${step.svgX}%`,
        top: `${step.svgY}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 100,
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
        delay: step.dotDelay,
      }}
    >
      {/* Pulsing outer ring */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: "-12px",
          border: "1px solid rgba(139,128,255,0.25)",
        }}
        animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: step.dotDelay * 0.35,
        }}
      />

      {/* Soft halo */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "-6px",
          background: "rgba(139,128,255,0.10)",
          border: "1px solid rgba(139,128,255,0.2)",
        }}
      />

      {/* Main dot */}
      <div
        className="relative w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle, #C0BAFF 0%, #8B80FF 55%, #3520DC 100%)",
          boxShadow:
            "0 0 18px rgba(139,128,255,0.8), 0 0 36px rgba(53,32,220,0.4)",
        }}
      >
        <Icon icon={step.icon} className="w-2.75 h-2.75 text-white/95" />
      </div>
    </motion.div>
  );
}
