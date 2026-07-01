"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { projects, services, type Project, type Service } from "@/data/projects";

// ─── Easing curves ────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const FAN_EASE = [0, 0, 0.2, 1] as const;

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.94, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
      transition={{
        duration: 0.55,
        ease: FAN_EASE,
        delay: (index % 3) * 0.08,
      }}
      className="group/card flex flex-col gap-3"
    >
      <Link href={`/projects/${project.slug}`} className="flex flex-col gap-3">
        {/* ── Title row ── */}
        <div className="flex justify-center items-center w-full">
          <h3
            className="font-semibold text-white"
            style={{
              fontSize: "1.20rem",
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* ── Image card ── */}
        <div
          className="project-image-card"
          style={{
            position: "relative",
            borderRadius: "1rem",
            // FIX: border + hover-lift live on THIS (unclipped) wrapper so the
            // border stays crisp & perfectly rounded. Clipping happens on the
            // inner element — separating the two avoids clip-path mangling the
            // border on iOS.
            border: "1px solid rgba(139,128,255,0.13)",
            willChange: "transform",
            transition:
              "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <div
            className="card-inner"
            style={{
              position: "relative",
              borderRadius: "1rem",
              overflow: "hidden",
              // FIX (iOS Safari): overflow:hidden + border-radius fails to clip a
              // transformed child (.card-img zoom). clip-path + translateZ(0)
              // (see <style> block) reliably rounds the corners on iOS.
              clipPath: "inset(0 round 1rem)",
              WebkitClipPath: "inset(0 round 1rem)",
              isolation: "isolate",
              cursor: "pointer",
              aspectRatio: "16 / 10",
            }}
          >
            {project.video ? (
              /* preload="none" + no autoPlay so the heavy video isn't fetched
                 on the listing — it only plays on the detail page. */
              <video
                src={project.video}
                className="card-img"
                muted
                loop
                playsInline
                preload="none"
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
              /* next/image: Vercel serves a resized WebP/AVIF and lazy-loads
                 off-screen cards instead of shipping the full-size JPG. */
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="card-img"
                style={{
                  objectFit: "cover",
                  willChange: "transform",
                  transition:
                    "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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

            {/* Shine sweep */}
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

                {/* Arrow button */}
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
      </Link>
    </motion.div>
  );
}

export default function ProjectPage() {
  const [active, setActive] = useState<Service>("All");

  const visible =
    active === "All"
      ? projects
      : projects.filter((p) => p.service === active);

  return (
    <main>
      <section className="relative w-full py-28 px-4 overflow-hidden">
        <style>{`
        /* FIX (iOS Safari): promote the clipping container to its own compositor
           layer so the transformed child (.card-img) doesn't escape the rounded
           clip. This element is static, so translateZ(0) conflicts with nothing. */
        .project-image-card .card-inner {
          transform: translateZ(0);
        }
        /* Card lift + border glow on hover — on the OUTER wrapper so the border
           (which lives there) lifts together with the image. */
        .project-image-card:hover {
          transform: translateY(-7px);
          border-color: rgba(139, 128, 255, 0.58) !important;
          box-shadow: 0 0 0 1px rgba(139,128,255,0.22), 0 20px 60px rgba(53,32,220,0.48) !important;
        }
        .project-image-card:hover .card-img {
          transform: scale(1.06);
        }
        .project-image-card:hover .card-shine {
          opacity: 1;
        }
        .project-image-card:hover .card-accent-line {
          opacity: 1;
        }
        .project-image-card:hover .card-arrow-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .group\\/card:hover h3 {
          color: #C0BAFF;
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
              A selection of projects we&apos;ve delivered — from brand
              identities to full-scale web and mobile applications.
            </motion.p>
          </div>

          {/* ── Service filters ── */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-2.5 max-w-3xl mx-auto mb-12">
            {services.map((service, index) => {
              const isActive = active === service;
              return (
                <motion.button
                  key={service}
                  type="button"
                  onClick={() => setActive(service)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: index * 0.05 }}
                  className={`rounded-full px-3.5 py-1.5 text-xs md:text-[13px] font-medium border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#8B80FF]/20 border-[#8B80FF]/55 text-[#C0BAFF] shadow-[0_0_18px_rgba(139,128,255,0.25)]"
                      : "bg-white/4 border-white/10 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/8"
                  }`}
                >
                  {service}
                </motion.button>
              );
            })}
          </div>

          {/* ── Projects grid ── */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-20"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, index) => (
                <ProjectCard
                  key={`${active}-${project.slug}`}
                  project={project}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Empty state ── */}
          {visible.length === 0 && (
            <p className="text-center text-white/50 text-lg mt-10">
              No projects in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
