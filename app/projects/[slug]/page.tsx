"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Icon } from "@iconify/react";
import { getProject, type Project } from "@/data/projects";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Image slider ─────────────────────────────────────────────────────────────
function ProjectSlider({ images, title }: { images: string[]; title: string }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const count = images.length;
  const current = ((index % count) + count) % count;

  const paginate = (step: number) =>
    setState(([i]) => [i + step, step]);

  const goTo = (target: number) =>
    setState(() => [target, target > current ? 1 : -1]);

  // ── Autoplay: advance every 2s; pauses on hover, resets after manual nav ──
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => paginate(1), 3000);
    return () => clearInterval(id);
  }, [index, paused, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x;
    if (swipe < -80) paginate(1);
    else if (swipe > 80) paginate(-1);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 320 : -320, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -320 : 320, opacity: 0, scale: 0.96 }),
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          aspectRatio: "16 / 8",
          border: "1px solid rgba(139,128,255,0.20)",
          boxShadow:
            "0 0 0 1px rgba(139,128,255,0.10), 0 30px 80px rgba(53,32,220,0.30)",
          background: "rgba(8,11,30,0.6)",
        }}
      >
        <AnimatePresence custom={dir} initial={false} mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} — slide ${current + 1}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.55, ease: EASE },
              opacity: { duration: 0.35 },
              scale: { duration: 0.55, ease: EASE },
            }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
            draggable={true}
          />
        </AnimatePresence>

        {/* gradient for control contrast */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,18,0.35) 0%, transparent 30%)",
          }}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all hover:border-[#8B80FF]/60 hover:bg-black/60"
            >
              <Icon icon="tabler:chevron-left" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all hover:border-[#8B80FF]/60 hover:bg-black/60"
            >
              <Icon icon="tabler:chevron-right" className="h-5 w-5" />
            </button>

            {/* counter */}
            <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
              {current + 1} / {count}
            </div>
          </>
        )}
      </div>

      {/* dots / thumbnails */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "26px" : "8px",
                background:
                  i === current
                    ? "linear-gradient(90deg,#8B80FF,#C0BAFF)"
                    : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Case study list block ────────────────────────────────────────────────────
function StudyBlock({
  icon,
  label,
  items,
  accent,
}: {
  icon: string;
  label: string;
  items: string[];
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 md:p-7"
      style={{
        background: "rgba(139,128,255,0.05)",
        border: "1px solid rgba(139,128,255,0.16)",
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: accent, border: "1px solid rgba(139,128,255,0.30)" }}
        >
          <Icon icon={icon} className="h-5 w-5 text-[#C0BAFF]" />
        </span>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon
              icon="tabler:point-filled"
              className="mt-1 h-4 w-4 shrink-0 text-[#8B80FF]"
            />
            <span className="text-white/65 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const project: Project | undefined = getProject(params.slug);

  if (!project) notFound();

  return (
    <main className="relative w-full overflow-hidden py-24 px-4">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* ── Back ── */}
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#C0BAFF]"
        >
          <Icon icon="tabler:arrow-left" className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10"
        >
          {/* <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
              style={{
                background: "rgba(139,128,255,0.12)",
                border: "1px solid rgba(139,128,255,0.30)",
                color: "rgba(192,186,255,0.95)",
              }}
            >
              {project.category}
            </span>
            <span className="text-sm text-white/40">{project.service}</span>
          </div> */}

          <h1
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/55">
            {project.overview}
          </p>

          {/* meta */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/35">
                Client
              </p>
              <p className="text-white/85">{project.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/35">
                Year
              </p>
              <p className="text-white/85">{project.year}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/35">
                Service
              </p>
              <p className="text-white/85">{project.service}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Slider ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="mb-16"
        >
          {project.video ? (
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "16 / 8",
                border: "1px solid rgba(139,128,255,0.20)",
                boxShadow:
                  "0 0 0 1px rgba(139,128,255,0.10), 0 30px 80px rgba(53,32,220,0.30)",
                background: "rgba(8,11,30,0.6)",
              }}
            >
              <video
                src={project.video}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ) : (
            <ProjectSlider images={project.images} title={project.title} />
          )}
        </motion.div>

        {/* ── Case study ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16"
        >
          <div className="mb-7 text-center">
            <span className="text-sm font-medium tracking-wide text-[#C0BAFF]">
              Case Study
            </span>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              The Challenge &amp; Our Approach
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <StudyBlock
              icon="tabler:clipboard-list"
              label="Client Requirements"
              items={project.requirements}
              accent="rgba(139,128,255,0.14)"
            />
            <StudyBlock
              icon="tabler:bulb"
              label="How We Delivered"
              items={project.solution}
              accent="rgba(53,32,220,0.20)"
            />
          </div>
        </motion.div>

        {/* ── Tech stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16"
        >
          <div className="mb-7 text-center">
            <span className="text-sm font-medium tracking-wide text-[#C0BAFF]">
              Tech Stack
            </span>
            <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Tools &amp; Technologies
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="flex w-32 flex-col items-center gap-3 rounded-2xl px-4 py-6"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139,128,255,0.16)",
                }}
              >
                <Icon icon={tech.icon} className="h-10 w-10 text-white" />
                <span className="text-center text-sm font-medium text-white/80">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center gap-4 rounded-3xl px-6 py-12 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(8,11,120,0.45), rgba(0,0,77,0.35))",
            border: "1px solid rgba(139,128,255,0.20)",
          }}
        >
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Have a project in mind?
          </h2>
          <p className="max-w-md text-white/55">
            Let&apos;s build something that speaks for itself — just like this
            one.
          </p>
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
                  Start a Project
                </span>
              </div>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
            </Link>
        </motion.div>
      </div>
    </main>
  );
}
