"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import ParticlesCanvas from "./ParticlesCanvas";

// Softer expo-out — less aggressive initial snap
const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  { label: "Website Revamping",        icon: "tabler:refresh"         },
  { label: "Web Design & Development", icon: "tabler:code"            },
  { label: "App Design & Development", icon: "tabler:device-mobile"   },
  { label: "Branding & UI/UX Design",  icon: "tabler:brush"           },
  { label: "Social Media Management",  icon: "tabler:brand-instagram" },
  { label: "Video Editing",            icon: "tabler:video"           },
];

function AnimatedHeadline({
  text,
  className,
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.25 }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: "100%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export default function HeroSection() {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 pt-35 pb-30"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #0A009A 0%, #01004C 55%, #000018 100%)",
      }}
    >
      <ParticlesCanvas />

      {/* Glow orbs */}
      <motion.div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1800C8 0%, transparent 70%)" }}
        animate={{ y: [0, -22, 0], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-[-60px] w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3520DC 0%, transparent 70%)" }}
        animate={{ y: [0, 22, 0], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Badge — blur-fade, no spring bounce */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
          style={{
            background: "rgba(139,128,255,0.1)",
            border: "1px solid rgba(139,128,255,0.28)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B80FF] animate-pulse" />
          <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">
            Award-Winning Digital Agency
          </span>
        </motion.div>

        {/* Headline — word-by-word slide-up, delays spread out */}
        <AnimatedHeadline
          text="We Build Software That"
          delay={0.42}
          className="font-extrabold text-white tracking-tight mb-0 block"
          style={{ fontSize: "clamp(2.6rem, 6vw, 3.8rem)", letterSpacing: "-0.02em" }}
        />
        <AnimatedHeadline
          text="Grows Your Business"
          delay={0.72}
          className="font-extrabold tracking-tight mb-0 bg-clip-text text-transparent block"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 3.8rem)",
            letterSpacing: "-0.02em",
            backgroundImage: "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
          }}
        />

        {/* Subtext — blur fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: EASE, delay: 1.1 }}
          className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We are a full-service digital agency with{" "}
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[#C0BAFF] font-semibold text-base align-middle"
            style={{
              background: "rgba(139,128,255,0.15)",
              border: "1px solid rgba(139,128,255,0.3)",
            }}
          >
            6+ years
          </span>{" "}
          and{" "}
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[#C0BAFF] font-semibold text-base align-middle"
            style={{
              background: "rgba(139,128,255,0.15)",
              border: "1px solid rgba(139,128,255,0.3)",
            }}
          >
            445+ projects
          </span>
          &nbsp;
          We help businesses build powerful digital experiences on time and on budget.
        </motion.p>

        {/* Service chips — layoutId sliding background */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 1.3 } },
          }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {services.map((s, i) => (
            <motion.button
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.82, y: 16 },
                show: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 22 },
                },
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveService(i)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: activeService === i
                  ? "1px solid rgba(139,128,255,0.55)"
                  : "1px solid rgba(255,255,255,0.12)",
                color: activeService === i ? "#C0BAFF" : "rgba(255,255,255,0.65)",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.3s, color 0.3s",
              }}
            >
              {/* Sliding active background — animates position between chips */}
              {activeService === i && (
                <motion.span
                  layoutId="active-chip"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(91,79,240,0.22)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                <Icon icon={s.icon} className="w-4 h-4 flex-shrink-0" />
                {s.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ minWidth: "210px" }}
          >
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-[15px] w-full"
              style={{
                background: "linear-gradient(135deg, #1800C8 0%, #3520DC 100%)",
                boxShadow: "0 0 28px rgba(53,32,220,0.45)",
              }}
            >
              Request a Quote
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ minWidth: "210px" }}
          >
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-[15px] w-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(139,128,255,0.35)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Free Consultation
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
