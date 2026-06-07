"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    label: "Website Revamping",
    icon: "tabler:refresh",
    badge: "Core Service",
    description:
      "Transform your outdated website into a modern, high-converting digital experience that drives real business results.",
  },
  {
    label: "Web Design & Development",
    icon: "tabler:code",
    description:
      "Custom websites built for speed, performance, and scale — from landing pages to complex web applications.",
  },
  {
    label: "App Design & Development",
    icon: "tabler:device-mobile",
    description:
      "Native and cross-platform mobile apps designed for engagement and built for long-term reliability.",
  },
  {
    label: "Branding & UI/UX Design",
    icon: "tabler:brush",
    description:
      "Identities and interfaces that leave a lasting impression — from logo design to full design systems.",
  },
  {
    label: "Social Media Management",
    icon: "tabler:brand-instagram",
    description:
      "Strategic content creation, scheduling, and growth management to expand your audience on every platform.",
  },
  {
    label: "Video Editing",
    icon: "tabler:video",
    description:
      "Professional video editing that tells your brand story and keeps your audience hooked from first frame to last.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: i * 0.09 },
  }),
};

export default function ServicesSection() {
  return (
    <section
      className="relative w-full pt-24 pb-20 px-4 overflow-hidden"
    >
      {/* Glow orb — top center */}
      {/* <div
        className="absolute left-1/2 -top-16 -translate-x-1/2 w-[640px] h-[280px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
          opacity: 0.18,
        }}
      /> */}
      {/* Glow orb — bottom right */}
      {/* <div
        className="absolute right-[-80px] bottom-0 w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #3520DC 0%, transparent 70%)",
          opacity: 0.12,
        }}
      /> */}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">

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
              What We Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-extrabold text-white mb-4"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Services Built to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
            >
              Grow Your Brand
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.18 }}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
          >
            From design to deployment — everything your business needs to stand
            out and scale online.
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.label} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
      className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(139,128,255,0.14)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        transition: "border-color 0.35s, box-shadow 0.35s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(139,128,255,0.5)";
        el.style.boxShadow =
          "0 0 0 1px rgba(139,128,255,0.18), 0 8px 40px rgba(53,32,220,0.28)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(139,128,255,0.14)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #8B80FF 50%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.35s",
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.closest(".group");
          parent?.addEventListener("mouseenter", () => (el.style.opacity = "1"));
          parent?.addEventListener("mouseleave", () => (el.style.opacity = "0"));
        }}
      />

      {/* Inner top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,128,255,0.07) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,128,255,0.18) 0%, rgba(53,32,220,0.10) 100%)",
              border: "1px solid rgba(139,128,255,0.28)",
              boxShadow: "0 0 20px rgba(139,128,255,0.10)",
            }}
          >
            <Icon icon={service.icon} className="w-7 h-7 text-[#8B80FF]" />
          </div>

          {service.badge && (
            <span
              className="text-[9px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0"
              style={{
                background: "rgba(53,32,220,0.7)",
                border: "1px solid rgba(139,128,255,0.3)",
              }}
            >
              {service.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-white font-bold mb-3 leading-snug"
          style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
        >
          {service.label}
        </h3>

        {/* Description */}
        <p className="text-white/40 text-[13.5px] leading-relaxed flex-1 mb-7">
          {service.description}
        </p>

        {/* Learn more */}
        <div
          className="flex items-center gap-2 text-sm font-semibold w-fit"
          style={{ color: "#8B80FF" }}
        >
          Learn more
          <span
            className="flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 group-hover:translate-x-1"
            style={{
              background: "rgba(139,128,255,0.15)",
              border: "1px solid rgba(139,128,255,0.25)",
            }}
          >
            <Icon icon="tabler:arrow-right" className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
