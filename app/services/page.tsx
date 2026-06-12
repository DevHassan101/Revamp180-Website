"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import HowWeWorkSection from "@/components/HowWeWorkSection";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Detailed service data ────────────────────────────────────────────────────
// `id` values match the navbar deep-links (e.g. /services#website-revamping).
type Service = {
  id: string;
  label: string;
  icon: string;
  icons?: string[];
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
};

const services: Service[] = [
  {
    id: "website-revamping",
    label: "Website Revamping",
    icon: "tabler:refresh",
    badge: "Core Service",
    tagline: "",
    description:
      "Transform your outdated website into a modern, high-converting digital experience that drives real business results. We audit, redesign, and rebuild — keeping what works and reinventing what doesn't.",
    features: [
      "Full UX & performance audit",
      "Modern, conversion-focused redesign",
      "SEO & speed optimization",
      "Mobile-first responsive rebuild",
    ],
  },
  {
    id: "web-design-development",
    label: "Web Design & Development",
    icon: "tabler:code",
    tagline: "Built for speed & scale",
    description:
      "Custom websites built for speed, performance, and scale — from landing pages to complex web applications. Clean code, pixel-perfect design, and architecture that grows with your business.",
    features: [
      "Custom design systems",
      "Next.js & modern frameworks",
      "Headless CMS integration",
      "Lightning-fast load times",
    ],
  },
  {
    id: "app-design-development",
    label: "App Design & Development",
    icon: "tabler:device-mobile",
    tagline: "Native & cross-platform",
    description:
      "Native and cross-platform mobile apps designed for engagement and built for long-term reliability. From concept and prototyping to launch on the App Store and Google Play.",
    features: [
      "iOS & Android development",
      "Intuitive UX prototyping",
      "API & backend integration",
      "Ongoing maintenance & updates",
    ],
  },
  {
    id: "branding-ui-ux-design",
    label: "Branding & UI/UX Design",
    icon: "tabler:brush",
    tagline: "Identities that last",
    description:
      "Identities and interfaces that leave a lasting impression — from logo design to full design systems. We craft cohesive brands that feel as good as they look across every touchpoint.",
    features: [
      "Logo & visual identity",
      "Complete brand guidelines",
      "UI/UX design systems",
      "Wireframing & prototyping",
    ],
  },
  {
    id: "social-media-management",
    label: "Social Media Management",
    icon: "tabler:brand-instagram",
    icons: [
      "tabler:brand-linkedin",
      "tabler:brand-instagram",
      "tabler:brand-facebook",
      "tabler:brand-youtube",
    ],
    tagline: "Grow your audience",
    description:
      "Strategic content creation, scheduling, and growth management to expand your audience on every platform. We turn followers into a community and a community into customers.",
    features: [
      "Content strategy & calendars",
      "Creative post & reel design",
      "Community management",
      "Analytics & growth reporting",
    ],
  },
  {
    id: "video-editing",
    label: "Video Editing",
    icon: "tabler:video",
    tagline: "Stories that hook",
    description:
      "Professional video editing that tells your brand story and keeps your audience hooked from first frame to last. Reels, ads, explainers, and long-form — edited to perform.",
    features: [
      "Short-form reels & shorts",
      "Promotional & ad edits",
      "Motion graphics & captions",
      "Color grading & sound design",
    ],
  },
];

// ─── Reusable CTA button (matches site-wide style) ────────────────────────────
function CTAButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
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
          {label}
        </span>
      </div>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
    </Link>
  );
}

// ─── Single detailed service row (alternating layout) ─────────────────────────
function ServiceRow({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.id}
      className="relative scroll-mt-28 px-4 py-12 md:py-16"
    >
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-8 lg:gap-14 ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* ── Visual / icon panel ── */}
        <motion.div
          initial={{ opacity: 0, x: reversed ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex w-full shrink-0 items-center justify-center lg:w-[40%]"
        >
          <div
            className="relative flex aspect-square w-full max-w-[340px] items-center justify-center overflow-hidden rounded-3xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,128,255,0.10) 0%, rgba(53,32,220,0.05) 100%)",
              border: "1px solid rgba(139,128,255,0.20)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            {/* glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #3520DC 0%, transparent 65%)",
                opacity: 0.22,
              }}
            />
            {/* top accent line */}
            <div
              className="absolute left-0 right-0 top-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #8B80FF 50%, transparent 100%)",
              }}
            />
            {service.icons ? (
              <div className="relative grid grid-cols-2 gap-3">
                {service.icons.map((ic) => (
                  <div
                    key={ic}
                    className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,128,255,0.20) 0%, rgba(53,32,220,0.12) 100%)",
                      border: "1px solid rgba(139,128,255,0.30)",
                      boxShadow: "0 0 40px rgba(139,128,255,0.18)",
                    }}
                  >
                    <Icon icon={ic} className="h-7 w-7 text-[#8B80FF]" />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,128,255,0.20) 0%, rgba(53,32,220,0.12) 100%)",
                  border: "1px solid rgba(139,128,255,0.30)",
                  boxShadow: "0 0 40px rgba(139,128,255,0.18)",
                }}
              >
                <Icon
                  icon={service.icon}
                  className="h-14 w-14 text-[#8B80FF]"
                />
              </div>
            )}

            {/* index watermark */}
            <span
              className="absolute bottom-4 right-5 select-none font-extrabold leading-none text-white/[0.04]"
              style={{ fontSize: "5rem" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* ── Text panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="w-full lg:w-[60%]"
        >
          <div className="mb-3 flex items-center gap-3">
            {service.tagline && (
              <span className="text-sm font-medium tracking-wide text-[#C0BAFF]">
            {service.tagline}
            </span>
            )}
            {service.badge && (
              <span
                className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white"
                style={{
                  background: "rgba(53,32,220,0.7)",
                  border: "1px solid rgba(139,128,255,0.3)",
                }}
              >
                {service.badge}
              </span>
            )}
          </div>

          <h2
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {service.label}
          </h2>

          <p className="mt-4 max-w-xl leading-relaxed text-white/55">
            {service.description}
          </p>

          <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(139,128,255,0.15)",
                    border: "1px solid rgba(139,128,255,0.28)",
                  }}
                >
                  <Icon
                    icon="tabler:check"
                    className="h-3.5 w-3.5 text-[#8B80FF]"
                  />
                </span>
                <span className="text-[14.5px] text-white/70">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <CTAButton href="/quote" label="Get a Quote" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* ═══ Hero ═══ */}
      <section className="relative px-4 pt-32 pb-12 md:pb-16">
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
            opacity: 0.12,
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(139,128,255,0.10)",
              border: "1px solid rgba(139,128,255,0.28)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B80FF]" />
            <span className="text-sm font-medium tracking-wide text-[#C0BAFF]">
              What We Do
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Services Built to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
            >
              Grow Your Brand
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
          >
            From design to deployment — everything your business needs to stand
            out and scale online. Explore the full range of what we build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.24 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            <CTAButton href="/consultation" label="Free Consultation" />
          </motion.div>
        </div>
      </section>

      {/* ═══ Quick service nav chips ═══ */}
      <section className="relative px-4 pb-4">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2.5">
          {services.map((s, i) => (
            <motion.a
              key={s.id}
              href={`#${s.id}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-colors duration-200 hover:text-white"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(139,128,255,0.16)",
              }}
            >
              <Icon icon={s.icon} className="h-4 w-4 text-[#8B80FF]" />
              {s.label}
            </motion.a>
          ))}
        </div>
      </section>

      {/* ═══ Detailed service rows ═══ */}
      <div className="relative py-8">
        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* ═══ How we work (reused) ═══ */}
      <section className="relative py-12">
        <HowWeWorkSection />
      </section>

      {/* ═══ Closing CTA ═══ */}
      <section className="relative px-4 py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
            opacity: 0.1,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Not sure where to start?
          </h2>
          <p className="max-w-xl leading-relaxed text-white/55">
            Tell us about your project and we&apos;ll recommend the right mix of
            services to hit your goals — no pressure, no jargon.
          </p>
          <CTAButton href="/contact" label="Work With Us" />
        </motion.div>
      </section>
    </main>
  );
}
