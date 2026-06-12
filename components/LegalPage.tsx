"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export type LegalSection = {
  heading: string;
  body: string[];
};

export default function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="relative w-full overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative px-4 pt-32 pb-10">
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,128,255,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.08)] px-4 py-1.5 text-xs font-medium tracking-wide text-[#C0BAFF]"
          >
            Legal
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
          >
            {intro}
          </motion.p>

          <p className="mt-4 text-xs uppercase tracking-wide text-white/35">
            Last updated: {updated}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-3xl rounded-xl p-6 text-white sm:p-10"
          style={{
            border: "1px solid rgba(139,128,255,0.3)",
            background: "rgba(139,128,255,0.04)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <div className="flex flex-col gap-9">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="mb-3 text-lg font-semibold text-white">
                  <span className="mr-2 text-[#8B80FF]">{i + 1}.</span>
                  {s.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-[15px] leading-relaxed text-white/60"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
