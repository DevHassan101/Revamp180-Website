"use client";

import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { getProject } from "@/data/projects";

// ─── Easing curves ────────────────────────────────────────────────────────────
// Gentle spring-like decelerate — feels organic, not mechanical
const EASE = [0.22, 1, 0.36, 1] as const;

// Material "decelerate" curve — starts at full speed, coasts gently to rest
const FAN_EASE = [0, 0, 0.2, 1] as const;

// ─── Project data ─────────────────────────────────────────────────────────────
// Homepage feature order + which cover to show per project — see
// public/images/projects-images/Homepage.txt. `image` is a 0-based index into
// the project's images[]; `video: true` uses the project's video instead.
const HOMEPAGE_FEATURE = [
  { slug: "three-angle-marketing", image: 1 }, // 2nd image
  { slug: "fight-tv", image: 0 }, // 1st image
  { slug: "bunzilla", image: 0 }, // 1st image
  { slug: "the-royal-seat", image: 1 }, // 2nd image
  { slug: "stampbox", image: 0 }, // 1st image
  { slug: "pulse-media", video: true }, // video
  { slug: "legit-ai-solutions", image: 1 }, // 2nd image
  { slug: "qr-code", image: 0 }, // 1st image
  { slug: "yong-real-estate", image: 1 }, // 2nd image
] as const;

const projects = HOMEPAGE_FEATURE.map((entry) => {
  const p = getProject(entry.slug)!;
  const useVideo = "video" in entry && entry.video;
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    overlay: p.overlay,
    tags: p.tags,
    image: useVideo ? undefined : p.images["image" in entry ? entry.image : 0],
    video: useVideo ? p.video : undefined,
  };
});

// ─── Fan-in initial states ────────────────────────────────────────────────────
// Desktop: col 1 (middle) drops from above; col 0 fans from right; col 2 fans from left
// Mobile:  cards alternate sliding in from left / right (small offset, no overflow)
function getCardInitial(colIndex: number, index: number, isMobile: boolean) {
  if (isMobile) {
    return index % 2 === 0
      ? { opacity: 0, x: -70, y: 0, scale: 0.96 }
      : { opacity: 0, x: 70, y: 0, scale: 0.96 };
  }
  if (colIndex === 0) return { opacity: 0, x: 320, y: 0, scale: 0.82 };
  if (colIndex === 2) return { opacity: 0, x: -320, y: 0, scale: 0.82 };
  return { opacity: 0, x: 0, y: -58, scale: 0.88 };
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  tall,
  index,
  colIndex,
  isMobile,
}: {
  project: (typeof projects)[number];
  tall: boolean;
  index: number;
  colIndex: number;
  isMobile: boolean;
}) {
  const delay = isMobile ? 0 : colIndex === 1 ? 0 : 0.18;
  const duration = isMobile ? 0.65 : colIndex === 1 ? 0.9 : 1.1;

  return (
    <motion.div
      initial={{
        ...getCardInitial(colIndex, index, isMobile),
        filter: "blur(6px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        x: { duration, ease: FAN_EASE, delay },
        y: { duration, ease: FAN_EASE, delay },
        scale: { duration, ease: FAN_EASE, delay },
        opacity: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay },
        filter: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
      }}
      className="group/card flex flex-col gap-3"
    >
      {/* ── Title row ── */}
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center w-full">
          <h3
            className="font-semibold text-white"
            style={{
              fontSize: tall ? "1.20rem" : "1.20rem",
              letterSpacing: "-0.01em",
              // FIX: transition on color only — smooth & GPU-friendly
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* FIX: arrow icon — pure CSS transition, no JS handlers */}
        {/* <span
          className="flex items-center justify-center w-6 h-6 rounded-full"
          style={{
            background: "rgba(139,128,255,0.15)",
            border: "1px solid rgba(139,128,255,0.28)",
            opacity: 0,
            transform: "translateX(-4px)",
            // Single unified transition — avoids Tailwind + inline style conflicts
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}
          // FIX: group-hover via CSS custom property trick not needed;
          // instead use Framer whileHover on parent
        >
          <Icon icon="tabler:arrow-right" className="w-3 h-3 text-[#8B80FF]" />
        </span> */}
      </div>

      {/* ── Image card ── */}
      {/*
        FIX: Removed onMouseEnter/onMouseLeave JS handlers entirely.
        All hover effects now live in a single CSS <style> block scoped
        to .project-image-card so transitions are handled by the browser's
        compositor thread — buttery smooth, no JS paint.
      */}
      <div
        className={`project-image-card${tall ? " tall" : ""}`}
        style={{
          position: "relative",
          borderRadius: "1rem",
          // Tall card gets its shadow always; short card gets it on hover via CSS
          boxShadow: tall
            ? "0 0 0 1px rgba(139,128,255,0.16), 0 0 55px rgba(53,32,220,0.32)"
            : undefined,
        }}
      >
        <div
          className="card-inner"
          style={{
            position: "relative",
            borderRadius: "1rem",
            overflow: "hidden",
            cursor: "pointer",
            height: tall ? "308px" : "232px",
            border: tall
              ? "1px solid rgba(139,128,255,0.30)"
              : "1px solid rgba(139,128,255,0.13)",
            // FIX: One unified transition string — no split between Tailwind and inline
            // Using will-change: transform to promote to compositor
            willChange: "transform",
            transition:
              "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          {project.video ? (
            <video
              src={project.video}
              className="card-img"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "transform",
                transition:
                  "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image}
              alt={project.title}
              className="card-img"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                willChange: "transform",
                // FIX: longer duration + ease-out for silky image zoom
                transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          )}

          {/* Brand colour multiply */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: project.overlay,
              mixBlendMode: "multiply",
            }}
          />

          {/* Rich gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(160deg, rgba(0,0,18,0.05) 0%, rgba(0,0,18,0.10) 40%, rgba(0,0,18,0.72) 100%)",
            }}
          />

          {/* Radial inner glow */}
          <div
            style={{
              position: "absolute",
              top: "-2rem",
              left: "-2rem",
              width: "10rem",
              height: "10rem",
              borderRadius: "50%",
              pointerEvents: "none",
              background:
                "radial-gradient(circle, rgba(139,128,255,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Shine sweep — CSS class toggled on hover */}
          <div
            className="card-shine"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0,
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)",
              transition: "opacity 0.45s ease",
            }}
          />

          {/* Top accent line */}
          <div
            className="card-accent-line"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              zIndex: 10,
              opacity: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(192,186,255,0.85) 50%, transparent 100%)",
              transition: "opacity 0.32s ease",
            }}
          />

          {/* ── Bottom content ── */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              padding: "2.5rem 1rem 1rem",
              background:
                "linear-gradient(to top, rgba(0,0,18,0.82) 0%, transparent 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  background: "rgba(0,0,18,0.55)",
                  border: "1px solid rgba(139,128,255,0.28)",
                  color: "rgba(192,186,255,0.95)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {project.category}
              </span>

              {/* Arrow button — opacity/transform via CSS class */}
              <span
                className="card-arrow-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  background: "rgba(139,128,255,0.22)",
                  border: "1px solid rgba(139,128,255,0.40)",
                  backdropFilter: "blur(6px)",
                  opacity: 0,
                  transform: "translateY(6px)",
                  // FIX: unified transition, one declaration
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <Icon
                  icon="tabler:arrow-up-right"
                  className="w-4 h-4 text-[#C0BAFF]"
                />
              </span>
            </div>
          </div>

          {/* Tall card corner dots */}
          {tall && (
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 5px)",
                gap: "5px",
                pointerEvents: "none",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "rgba(139,128,255,0.28)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Tags ── */}
      <div className="flex flex-wrap justify-center items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "9999px",
              background: "rgba(139,128,255,0.07)",
              border: "1px solid rgba(139,128,255,0.16)",
              color: "rgba(192,186,255,0.75)",
            }}
          >
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                flexShrink: 0,
                background: "rgba(139,128,255,0.55)",
              }}
            />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // useLayoutEffect fires synchronously before the browser paints.
  // This ensures cards mount with the correct initial transform so the
  // IntersectionObserver never sees them clipped outside overflow-hidden.
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible = showAll ? projects : projects.slice(0, 6);

  const rows: (typeof projects)[] = [];
  for (let i = 0; i < visible.length; i += 3) {
    rows.push(visible.slice(i, i + 3));
  }

  return (
    <section className="relative w-full py-28 px-4 overflow-hidden">
      {/*
        ── Scoped CSS for hover states ────────────────────────────────────────
        FIX: All hover micro-interactions live here, handled purely by browser
        compositor. No JS event handlers = no layout thrashing = buttery smooth.
      */}
      <style>{`
        /* Card lift + border glow + shadow on hover */
        .project-image-card .card-inner:hover {
          transform: translateY(-7px);
          border-color: rgba(139, 128, 255, 0.58) !important;
          box-shadow: 0 0 0 1px rgba(139,128,255,0.22), 0 20px 60px rgba(53,32,220,0.48);
        }

        /* Image zoom on card hover */
        .project-image-card .card-inner:hover .card-img {
          transform: scale(1.06);
        }

        /* Shine sweep reveal */
        .project-image-card .card-inner:hover .card-shine {
          opacity: 1;
        }

        /* Top accent line reveal */
        .project-image-card .card-inner:hover .card-accent-line {
          opacity: 1;
        }

        /* Arrow button reveal */
        .project-image-card .card-inner:hover .card-arrow-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* Title colour on card group hover */
        .group\/card:hover h3 {
          color: #C0BAFF;
        }

        /* Title row arrow reveal */
        .group\/card:hover .title-arrow {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>

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
            <span className="text-[#C0BAFF] text-sm font-medium tracking-wide">
              Our Projects
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
            Work That&nbsp;
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
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
                    key={`${project.title}-${isMobile}`}
                    project={project}
                    tall={colIdx === 1}
                    index={rowIdx * 3 + colIdx}
                    colIndex={colIdx}
                    isMobile={isMobile}
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
              className="group group/btn relative inline-flex items-center gap-4
              bg-[linear-gradient(135deg,#080B78,#00004D)]
              pl-8 pr-1.5 py-1.5 rounded-full overflow-hidden
              transition-all duration-700 
                shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
                hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]"
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(180,190,255,0.50) , 0 0 17px rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(8,11,120,0.55)")
              }
            >
              <span className="text-white font-semibold tracking-wide text-sm md:text-[15px] whitespace-nowrap">
                View More
              </span>

              <div
                className="
                  bg-white w-10 h-10 md:w-11 md:h-11 rounded-full
                  flex items-center justify-center
                  transition-all duration-500 ease-out
                  shadow-lg
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="
                    w-4.5 h-4.5 fill-[#080B78]
                    transition-all duration-700
                    group-hover:rotate-90
                  "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </div>

              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
            </button>
          ) : (
            <Link
              href="/projects"
              className="group group/btn relative inline-flex items-center gap-4
              bg-[linear-gradient(135deg,#080B78,#00004D)]
              pl-8 pr-1.5 py-1.5 rounded-full overflow-hidden
              transition-all duration-700 
                shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
                hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]"
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 14px rgba(180,190,255,0.50) , 0 0 17px rgba(255,255,255,0.25)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(8,11,120,0.55)")
              }
            >
              <span className="text-white font-semibold tracking-wide text-sm md:text-[15px] whitespace-nowrap">
                See All Projects
              </span>

              <div
                className="
                  bg-white w-10 h-10 md:w-11 md:h-11 rounded-full
                  flex items-center justify-center
                  transition-all duration-500 ease-out
                  shadow-lg
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="
                    w-4.5 h-4.5 fill-[#080B78]
                    transition-all duration-700
                    group-hover:-rotate-90
                  "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </div>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
