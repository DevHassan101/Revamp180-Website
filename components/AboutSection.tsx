"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  {
    icon: "tabler:map-pin",
    text: "Based in Karachi — serving clients globally",
  },
  {
    icon: "tabler:layout-grid",
    text: "End-to-end digital solutions under one roof",
  },
  { icon: "tabler:users", text: "Dedicated team with deep domain expertise" },
  {
    icon: "tabler:message-dots",
    text: "Agile workflow with transparent communication",
  },
];

const stats = [
  { value: "6+", label: "Years Active" },
  { value: "445+", label: "Projects Done" },
  { value: "100%", label: "Satisfaction" },
];

const servicePills = [
  "Web Design",
  "Development",
  "Branding",
  "Social Media",
  "Video Editing",
  "App Design",
];

// Animates a number from 0 to `to` once `inView` becomes true
function CountUp({
  to,
  suffix = "",
  delay = 0,
  inView,
}: {
  to: number;
  suffix?: string;
  delay?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    startRef.current = null;
    let raf: number;
    const DURATION = 1500;
    const DELAY_MS = delay * 1000;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current - DELAY_MS;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / DURATION, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, delay]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section className="relative w-full py-28 px-4 overflow-hidden">
      {/* Glow orbs */}
      <div
        className="absolute left-[-80px] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
          opacity: 0.12,
        }}
      />
      <div
        className="absolute right-[-60px] bottom-0 w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #3520DC 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">
        {/* ── LEFT: Visual cards ── */}
        <motion.div
          initial={{ opacity: 0, x: -44, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative"
        >
          {/* Main card */}
          <div
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(139,128,255,0.18)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #8B80FF 50%, transparent 100%)",
              }}
            />
            {/* Inner glow */}
            <div
              className="absolute top-0 left-0 right-0 h-36 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(139,128,255,0.08) 0%, transparent 100%)",
              }}
            />

            <div className="relative z-10">
              {/* Agency label */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2"
                style={{ color: "rgba(139,128,255,0.7)" }}
              >
                Revamp 180° — Est. 2018
              </motion.p>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
                className="font-bold text-white text-xl mb-1"
                style={{ letterSpacing: "-0.01em" }}
              >
                Digital Agency
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="text-sm mb-7"
                style={{ color: "rgba(255,255,255,0.38)" }}
              >
                Karachi, Pakistan
              </motion.p>

              {/* Service pills — staggered entrance */}
              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.28 },
                  },
                }}
              >
                {servicePills.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={{
                      hidden: { opacity: 0, scale: 0.76, y: 8 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 280,
                          damping: 22,
                        },
                      },
                    }}
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(139,128,255,0.10)",
                      border: "1px solid rgba(139,128,255,0.22)",
                      color: "#C0BAFF",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Stats row — staggered boxes + count-up numbers */}
              <motion.div
                ref={statsRef}
                className="grid grid-cols-3 gap-3"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.13 } },
                }}
              >
                {stats.map((s, i) => {
                  const match = s.value.match(/^(\d+)(.*)$/);
                  const num = match ? parseInt(match[1]) : 0;
                  const suffix = match ? match[2] : s.value;
                  return (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 16, scale: 0.88 },
                        show: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.55, ease: EASE },
                        },
                      }}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "rgba(139,128,255,0.07)",
                        border: "1px solid rgba(139,128,255,0.14)",
                      }}
                    >
                      <p
                        className="font-black text-white text-xl"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        <CountUp
                          to={num}
                          suffix={suffix}
                          delay={i * 0.15}
                          inView={statsInView}
                        />
                      </p>
                      <p
                        className="text-[9px] font-semibold tracking-wider uppercase mt-0.5"
                        style={{ color: "rgba(192,186,255,0.55)" }}
                      >
                        {s.label}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Floating award badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -right-4 px-4 py-2.5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #1800C8 0%, #3520DC 100%)",
              border: "1px solid rgba(139,128,255,0.3)",
              boxShadow: "0 0 30px rgba(24,0,200,0.45)",
            }}
          >
            <p className="text-white font-bold text-sm leading-tight">
              Award-Winning
            </p>
            <p className="text-[#C0BAFF] text-xs">Digital Agency</p>
          </motion.div>

          {/* Bottom accent card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.38 }}
            className="flex items-center gap-4 mt-4 p-4 rounded-2xl"
            style={{
              background: "rgba(139,128,255,0.06)",
              border: "1px solid rgba(139,128,255,0.14)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,128,255,0.18) 0%, rgba(53,32,220,0.12) 100%)",
                border: "1px solid rgba(139,128,255,0.28)",
              }}
            >
              <Icon icon="tabler:rocket" className="w-5 h-5 text-[#8B80FF]" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">
                Ready to transform your brand?
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Book a free consultation — no commitment
              </p>
            </div>
            <Icon
              icon="tabler:arrow-right"
              className="w-4 h-4 ml-auto flex-shrink-0 text-[#8B80FF]"
            />
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Text content ── */}
        <div>
          {/* Badge — blur fade, no spring snap */}
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(139,128,255,0.10)",
              border: "1px solid rgba(139,128,255,0.28)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B80FF] animate-pulse" />
            <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">
              Who We Are
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="font-extrabold text-white mb-5"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            A Digital Agency That{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
            >
              Actually Delivers
            </span>
          </motion.h2>

          {/* Description paragraphs */}
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
            className="text-white/50 text-base leading-relaxed mb-4"
          >
            Founded in 2018, Revamp 180° is a full-service digital agency from
            Karachi, Pakistan. We've helped 445+ businesses across multiple
            industries build powerful digital experiences that generate real,
            measurable results.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}
            className="text-white/50 text-base leading-relaxed mb-8"
          >
            From brand identity to complex web applications — we handle
            everything under one roof, so you get a cohesive result without the
            coordination headache.
          </motion.p>

          {/* Highlights — per-item x-slide stagger */}
          <motion.div
            className="space-y-3 mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.52, ease: EASE },
                  },
                }}
                className="flex items-center gap-3"
              >
                <motion.span
                  variants={{
                    hidden: { scale: 0.7, opacity: 0 },
                    show: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: i * 0.05,
                      },
                    },
                  }}
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(139,128,255,0.10)",
                    border: "1px solid rgba(139,128,255,0.24)",
                  }}
                >
                  <Icon icon={item.icon} className="w-4 h-4 text-[#8B80FF]" />
                </motion.span>
                <span className="text-sm text-white/60">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.35 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/contact"
              className="group/btn relative inline-flex items-center gap-4 bg-[linear-gradient(135deg,#080B78,#00004D)] pl-1.5 pr-8 md:pr-10 py-1.5 rounded-full transition-all duration-700
    shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
    hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
    cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all duration-700 ease-out shadow-lg rotate-0 group-hover/btn:-rotate-[-90deg]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-5.5 md:h-5.5 fill-[#080B78] transition-all duration-700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </div>
                <span className="text-white font-semibold tracking-wide text-sm md:text-[17px] whitespace-nowrap drop-shadow-sm">
                  Meet the Team
                </span>
              </div>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
            </Link>

            <Link
              href="/quote"
              className="group/btn relative inline-flex items-center gap-4 bg-[linear-gradient(135deg,#080B78,#00004D)] pl-1.5 pr-8 md:pr-10 py-1.5 rounded-full transition-all duration-700
    shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
    hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
    cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center transition-all duration-700 ease-out shadow-lg rotate-0 group-hover/btn:-rotate-40">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-5.5 md:h-5.5 fill-[#080B78] transition-all duration-700"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </div>
                <span className="text-white font-semibold tracking-wide text-sm md:text-[17px] whitespace-nowrap drop-shadow-sm">
                  Get a free Quote
                </span>
              </div>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
