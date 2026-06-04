"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    title: "FoodieHub",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    overlay: "rgba(24,0,200,0.52)",
    tags: ["Next.js", "Node.js"],
  },
  {
    title: "StyleKart",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    overlay: "rgba(53,32,220,0.48)",
    tags: ["Shopify", "Branding"],
  },
  {
    title: "FitApp",
    category: "App Design",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80",
    overlay: "rgba(107,33,168,0.50)",
    tags: ["React Native", "Flutter"],
  },
  {
    title: "Nova Brand",
    category: "Branding & UI/UX",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    overlay: "rgba(45,27,105,0.52)",
    tags: ["Branding", "Figma"],
  },
  {
    title: "SocialPulse",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    overlay: "rgba(124,58,237,0.50)",
    tags: ["Instagram", "Video"],
  },
  {
    title: "TechVault",
    category: "Website Revamping",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    overlay: "rgba(12,0,64,0.55)",
    tags: ["Revamp", "SEO"],
  },
  {
    title: "MediCare",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    overlay: "rgba(0,80,160,0.52)",
    tags: ["Next.js", "UI/UX"],
  },
  {
    title: "EduLearn",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    overlay: "rgba(30,0,180,0.50)",
    tags: ["React", "Firebase"],
  },
  {
    title: "FinTrack",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    overlay: "rgba(20,0,100,0.54)",
    tags: ["Dashboard", "Node.js"],
  },
];

// Fan-out initial states:
// col 1 (middle) → drops in from slightly above (anchor card)
// col 0 (left)   → starts stacked behind middle (x: +350), slides left to its column
// col 2 (right)  → starts stacked behind middle (x: -350), slides right to its column
function getCardInitial(colIndex: number) {
  if (colIndex === 0) return { opacity: 0, x: 350, y: 0, scale: 0.85 };
  if (colIndex === 2) return { opacity: 0, x: -350, y: 0, scale: 0.85 };
  return { opacity: 0, x: 0, y: -50, scale: 0.92 };
}

function ProjectCard({
  project,
  tall,
  index,
  colIndex,
}: {
  project: (typeof projects)[number];
  tall: boolean;
  index: number;
  colIndex: number;
}) {
  return (
    <motion.div
      initial={getCardInitial(colIndex)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: colIndex === 1 ? 0.65 : 0.75,
        ease: EASE,
        // middle drops first, then sides emerge from behind it
        delay: colIndex === 1 ? 0 : 0.18,
      }}
      className="group/card flex flex-col gap-3"
    >
      {/* ── Title row ── */}
      <div className="flex items-center justify-between pr-1">
        <div className="flex items-center gap-2.5">
          <span
            className="text-[11px] font-bold tabular-nums"
            style={{ color: "rgba(139,128,255,0.55)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-semibold text-white transition-colors duration-200 group-hover/card:text-[#C0BAFF]"
            style={{
              fontSize: tall ? "1.05rem" : "0.95rem",
              letterSpacing: "-0.01em",
            }}
          >
            {project.title}
          </h3>
        </div>
        <span
          className="flex items-center justify-center w-6 h-6 rounded-full opacity-0 group-hover/card:opacity-100 -translate-x-1 group-hover/card:translate-x-0 transition-all duration-200"
          style={{
            background: "rgba(139,128,255,0.15)",
            border: "1px solid rgba(139,128,255,0.28)",
          }}
        >
          <Icon icon="tabler:arrow-right" className="w-3 h-3 text-[#8B80FF]" />
        </span>
      </div>

      {/* ── Image card ── */}
      <div
        className="relative"
        style={
          tall
            ? {
                borderRadius: "1rem",
                boxShadow:
                  "0 0 0 1px rgba(139,128,255,0.16), 0 0 55px rgba(53,32,220,0.32)",
              }
            : undefined
        }
      >
        <motion.div
          whileHover={{ y: -7, transition: { type: "spring", stiffness: 300, damping: 22 } }}
          className="group relative rounded-2xl overflow-hidden cursor-pointer"
          style={{
            height: tall ? "308px" : "232px",
            border: tall
              ? "1px solid rgba(139,128,255,0.30)"
              : "1px solid rgba(139,128,255,0.13)",
            transition: "border-color 0.35s, box-shadow 0.35s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "rgba(139,128,255,0.58)";
            el.style.boxShadow =
              "0 0 0 1px rgba(139,128,255,0.22), 0 18px 55px rgba(53,32,220,0.45)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = tall
              ? "rgba(139,128,255,0.30)"
              : "rgba(139,128,255,0.13)";
            el.style.boxShadow = "none";
          }}
        >
          {/* ── Image — CSS group-hover scale (no ref callback) ── */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.08]"
            style={{ transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
          />

          {/* Brand colour multiply */}
          <div
            className="absolute inset-0"
            style={{ background: project.overlay, mixBlendMode: "multiply" }}
          />

          {/* Rich gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(0,0,18,0.05) 0%, rgba(0,0,18,0.10) 40%, rgba(0,0,18,0.72) 100%)",
            }}
          />

          {/* Radial inner glow — top-left corner */}
          <div
            className="absolute -top-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(139,128,255,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Shine sweep on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)",
            }}
          />

          {/* Top accent line — CSS group-hover opacity (no ref callback) */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[320ms]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(192,186,255,0.85) 50%, transparent 100%)",
            }}
          />

          {/* ── Bottom content row ── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-10"
            style={{
              background: "linear-gradient(to top, rgba(0,0,18,0.82) 0%, transparent 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(0,0,18,0.55)",
                  border: "1px solid rgba(139,128,255,0.28)",
                  color: "rgba(192,186,255,0.95)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {project.category}
              </span>

              <span
                className="flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                style={{
                  background: "rgba(139,128,255,0.22)",
                  border: "1px solid rgba(139,128,255,0.40)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Icon icon="tabler:arrow-up-right" className="w-4 h-4 text-[#C0BAFF]" />
              </span>
            </div>
          </div>

          {/* Tall card: subtle corner dots decoration */}
          {tall && (
            <div
              className="absolute top-3 right-3 grid gap-[5px] pointer-events-none"
              style={{ gridTemplateColumns: "repeat(3, 5px)" }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ background: "rgba(139,128,255,0.28)" }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(139,128,255,0.07)",
              border: "1px solid rgba(139,128,255,0.16)",
              color: "rgba(192,186,255,0.75)",
            }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "rgba(139,128,255,0.55)" }}
            />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, 6);

  const rows: (typeof projects)[] = [];
  for (let i = 0; i < visible.length; i += 3) {
    rows.push(visible.slice(i, i + 3));
  }

  return (
    <section
      className="relative w-full py-28 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000018 0%, #010038 35%, #01004C 65%, #000028 100%)",
      }}
    >
      {/* Glow orbs */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-16 w-[640px] h-[280px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #1800C8 0%, transparent 70%)", opacity: 0.16 }}
      />
      <div
        className="absolute right-[-80px] bottom-0 w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3520DC 0%, transparent 70%)", opacity: 0.12 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
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
            <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">Our Projects</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-extrabold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Work That{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)" }}
            >
              Speaks for Itself
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed"
          >
            A selection of projects we've delivered — from brand identities to
            full-scale web and mobile applications.
          </motion.p>
        </div>

        {/* ── Rows ── */}
        <div className="flex flex-col gap-14 mb-14">
          <AnimatePresence>
            {rows.map((row, rowIdx) => (
              <motion.div
                key={rowIdx}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-7 items-end"
              >
                {row.map((project, colIdx) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    tall={colIdx === 1}
                    index={rowIdx * 3 + colIdx}
                    colIndex={colIdx}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="flex justify-center"
        >
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-[15px] cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #1800C8 0%, #3520DC 100%)",
                boxShadow: "0 0 28px rgba(53,32,220,0.45)",
              }}
            >
              View All Projects
              <Icon icon="tabler:arrow-down" className="w-5 h-5" />
            </button>
          ) : (
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-[15px]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1.5px solid rgba(139,128,255,0.35)",
                backdropFilter: "blur(10px)",
              }}
            >
              See Full Portfolio
              <Icon icon="tabler:arrow-right" className="w-5 h-5" />
            </Link>
          )}
        </motion.div>

      </div>
    </section>
  );
}
