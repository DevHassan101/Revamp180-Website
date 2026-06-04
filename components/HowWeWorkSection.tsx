"use client";

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
    // dot position as % of right panel
    dotLeft: "8%",
    dotTop: "78%",
    dotDelay: 0.55,
  },
  {
    number: "2",
    title: "Design & Build",
    description:
      "Pixel-perfect UI crafted and developed with regular milestone check-ins.",
    icon: "tabler:code",
    dotLeft: "50%",
    dotTop: "46%",
    dotDelay: 1.2,
  },
  {
    number: "3",
    title: "Launch & Grow",
    description:
      "Go live with full testing, handover, and ongoing growth support.",
    icon: "tabler:rocket",
    dotLeft: "92%",
    dotTop: "16%",
    dotDelay: 1.85,
  },
];

export default function HowWeWorkSection() {
  return (
    <section
      className="relative w-full py-24 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000028 0%, #010045 35%, #01004C 65%, #000028 100%)",
      }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.22), transparent)",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />
      <div
        className="absolute right-[-60px] bottom-10 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #3520DC 0%, transparent 70%)",
          opacity: 0.09,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">

          {/* ── Left: Section content ── */}
          <div className="lg:pr-8">
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
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
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
              className="text-white/50 text-[1.05rem] leading-relaxed mb-8 max-w-md"
            >
              A simple 3-step process built for clarity and results — from the
              first call to your final launch.
            </motion.p>

            {/* Step list — left panel */}
            <div className="space-y-5 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
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
              transition={{ duration: 0.6, ease: EASE, delay: 0.48 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-[15px] transition-all duration-200 hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(135deg, #1800C8 0%, #3520DC 100%)",
                  boxShadow: "0 0 26px rgba(53,32,220,0.42)",
                }}
              >
                Book Free Consultation
                <Icon icon="tabler:arrow-right" className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Wave visualization ── */}
          <div className="relative h-[480px]">


            {/* SVG wave path — preserveAspectRatio none so % coords match HTML */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#3520DC" stopOpacity="0.5" />
                  <stop offset="50%"  stopColor="#5B4FF0" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#8B80FF" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Main wave */}
              <motion.path
                d="M 8 78 C 24 78 36 46 50 46 C 64 46 76 16 92 16"
                stroke="url(#waveGrad)"
                strokeWidth="0.45"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.25 }}
              />

              {/* Soft glow duplicate — thicker, lower opacity */}
              <motion.path
                d="M 8 78 C 24 78 36 46 50 46 C 64 46 76 16 92 16"
                stroke="url(#waveGrad)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.12"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 0.25 }}
              />
            </svg>

            {/* Step dots */}
            {steps.map((step) => (
              <StepDot key={step.number} step={step} />
            ))}

            {/* Content cards — aligned with wave dots */}

            {/* Step 1 — above its dot at (8%, 78%) */}
            <motion.div
              className="absolute w-[190px]"
              style={{ left: "0%", top: "44%" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.75 }}
            >
              <StepContent step={steps[0]} />
            </motion.div>

            {/* Step 2 — below its dot at (50%, 46%) */}
            <motion.div
              className="absolute w-[190px]"
              style={{ left: "35%", top: "54%" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.4 }}
            >
              <StepContent step={steps[1]} />
            </motion.div>

            {/* Step 3 — below its dot at (92%, 16%) */}
            <motion.div
              className="absolute w-[190px]"
              style={{ right: "0%", top: "22%" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 2.05 }}
            >
              <StepContent step={steps[2]} align="right" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function StepDot({ step }: { step: (typeof steps)[number] }) {
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: step.dotLeft,
        top: step.dotTop,
        transform: "translate(-50%, -50%)",
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
        className="relative w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle, #C0BAFF 0%, #8B80FF 55%, #3520DC 100%)",
          boxShadow:
            "0 0 18px rgba(139,128,255,0.8), 0 0 36px rgba(53,32,220,0.4)",
        }}
      >
        <Icon icon={step.icon} className="w-[11px] h-[11px] text-white/95" />
      </div>
    </motion.div>
  );
}

function StepContent({
  step,
  align = "left",
}: {
  step: (typeof steps)[number];
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      className="relative rounded-2xl p-4 overflow-hidden"
      style={{
        background: "rgba(10,0,60,0.75)",
        border: "1px solid rgba(139,128,255,0.22)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.55), transparent)",
        }}
      />

      {/* Inner top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-14 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,128,255,0.07) 0%, transparent 100%)",
        }}
      />

      {/* Icon + step label */}
      <div
        className={`relative flex items-center gap-2.5 mb-3 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(24,0,200,0.55) 0%, rgba(53,32,220,0.38) 100%)",
            border: "1px solid rgba(139,128,255,0.3)",
            boxShadow: "0 0 14px rgba(53,32,220,0.3)",
          }}
        >
          <Icon icon={step.icon} className="w-4 h-4 text-[#C0BAFF]" />
        </div>
        <span
          className="text-[9.5px] font-black uppercase tracking-[0.18em]"
          style={{ color: "rgba(139,128,255,0.75)" }}
        >
          Step {step.number}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`relative text-white font-bold text-[0.9rem] mb-1.5 leading-snug ${
          align === "right" ? "text-right" : align === "center" ? "text-center" : ""
        }`}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className={`relative text-white/42 text-[11.5px] leading-relaxed ${
          align === "right" ? "text-right" : align === "center" ? "text-center" : ""
        }`}
      >
        {step.description}
      </p>
    </div>
  );
}
