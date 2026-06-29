"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Detect small viewports so the "assemble" animation travels a shorter
// distance on phones (avoids items flinging off-screen / horizontal scroll).
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

type TeamMember = {
  label: string;
  img: string;
  color: string; // vibrant fill — animates → pastel → gray
  w: number; // shape viewBox width
  h: number; // shape viewBox height
  path: string; // exact SVG shape path
  rectH: number; // 0–1: how much of the portrait overflows the shape (top rect)
};

const team: TeamMember[] = [
  {
    label: "Web\nDevelopers",
    img: "/images/our-team/web-developer.png",
    color: "#4F86E8",
    w: 212,
    h: 166,
    rectH: 0.6,
    path: "M211.443 0.185981C239.062 58.4197 214.258 128.024 156.016 155.658C97.7841 183.303 28.1737 158.506 0.554106 100.273L211.443 0.185981Z",
  },
  {
    label: "App\nDevelopers",
    img: "/images/our-team/app-developer.png",
    color: "#F4795B",
    w: 185,
    h: 182,
    rectH: 1,
    path: "M184.586 13.3233L13.9131 0L0.82349 167.678L171.496 181.002L184.586 13.3233Z",
  },
  {
    label: "Founder\n& CEO",
    img: "/images/our-team/founder.png",
    color: "#F6A623",
    w: 171,
    h: 170,
    rectH: 0.55,
    path: "M170.824 84.7246C170.824 131.42 132.774 169.262 85.8237 169.262C38.8732 169.262 0.82373 131.42 0.82373 84.7246C0.82373 38.0296 38.8732 0.186951 85.8237 0.186951C132.774 0.186951 170.824 38.0296 170.824 84.7246Z",
  },
  {
    label: "Branding\nExperts",
    img: "/images/our-team/branding-expert.png",
    color: "#6FCF97",
    w: 203,
    h: 180,
    rectH: 0.91,
    path: "M101.172 0.687866H202.318L151.755 89.7602L101.172 178.832L50.589 89.7602L0.00561523 0.687866H101.172Z",
  },
  {
    label: "UI/UX\nDesigners",
    img: "/images/our-team/ux-designer.png",
    color: "#8E7BEE",
    w: 178,
    h: 190,
    rectH: 0.76,
    path: "M0.82373 94.9458C0.82373 147.07 43.55 189.321 96.2607 189.321V169.515C118.508 186.557 148.147 193.741 177.599 186.544H177.582L131.818 3.73351C118.463 6.99807 106.468 12.8987 96.2607 20.7361V0.570587C43.55 0.570587 0.82373 42.8215 0.82373 94.9458Z",
  },
];

// ─── Colour helpers (vibrant → pastel → gray) ─────────────────────────────────
function hexToRgb(h: string): [number, number, number] {
  const s = h.replace("#", "");
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}
function rgbToHex(r: number, g: number, b: number) {
  const t = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${t(r)}${t(g)}${t(b)}`;
}
function mix(a: string, b: string, t: number) {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}
const pastel = (c: string) => mix(c, "#ffffff", 0.5);
const grayed = (c: string) => mix(c, "#C2C7CC", 0.8);

const BOX = 200; // common square viewBox for every member

// ─── One member: portrait clipped into the exact SVG shape ────────────────────
function TeamShape({ member, index }: { member: TeamMember; index: number }) {
  const isMobile = useIsMobile();
  const dir = 2 - index; // direction/distance from the centre item
  const CONVERGE = isMobile ? 70 : 200; // px each item travels toward centre when stacked
  const clipId = `team-shape-${index}`;
  const rectId = `team-rect-${index}`;

  // Scale the shape to a uniform size and anchor it to the bottom so the
  // portrait's head/shoulders have room to spill out above it.
  const s = Math.min(150 / member.w, 150 / member.h);
  const shapeW = member.w * s;
  const shapeH = member.h * s;
  const tx = (BOX - shapeW) / 2;
  const ty = BOX - shapeH - 6;
  const transform = `translate(${tx} ${ty}) scale(${s})`;

  // Portrait is a touch wider than the shape so shoulders overflow the sides.
  const imgW = shapeW * 1.12;
  const imgX = (BOX - imgW) / 2;

  return (
    // Animation is driven by the parent row's in-view state (via variants), not
    // this item's own visibility — otherwise items that start translated
    // off-screen never enter the viewport, so their "assemble" tween never fires.
    <motion.div
      variants={{
        hidden: { x: dir * CONVERGE, scale: 1.35, opacity: 0 },
        visible: {
          x: [dir * CONVERGE, 0, dir * CONVERGE * 0.1],
          scale: [1.35, 1, 1],
          opacity: [0, 1, 1],
        },
      }}
      transition={{ duration: 3.6, times: [0, 0.45, 0.72], ease: "easeInOut" }}
      style={{ zIndex: 5 - Math.abs(dir) }}
      className="flex flex-col items-center gap-3"
    >
      <svg
        viewBox={`0 0 ${BOX} ${BOX}`}
        className="block h-[125px] w-[125px] sm:h-[165px] sm:w-[165px] lg:h-[200px] lg:w-[200px]"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={member.path} transform={transform} />
          </clipPath>
          <clipPath id={rectId}>
            <rect x={0} y={0} width={BOX} height={BOX * member.rectH} />
          </clipPath>
        </defs>

        {/* coloured shape behind — animates vibrant → pastel → gray */}
        <motion.path
          d={member.path}
          transform={transform}
          variants={{
            hidden: { fill: member.color },
            visible: {
              fill: [
                member.color,
                member.color,
                pastel(member.color),
                grayed(member.color),
              ],
            },
          }}
          transition={{
            duration: 3.6,
            times: [0, 0.45, 0.72, 1],
            ease: "easeInOut",
          }}
        />

        {/* portrait filling the shape */}
        <image
          href={member.img}
          x={imgX}
          y={0}
          width={imgW}
          height={BOX}
          preserveAspectRatio="xMidYMin slice"
          clipPath={`url(#${clipId})`}
        />

        {/* same portrait spilling OUT of the shape (top rect) */}
        <image
          href={member.img}
          x={imgX}
          y={0}
          width={imgW}
          height={BOX}
          preserveAspectRatio="xMidYMin slice"
          clipPath={`url(#${rectId})`}
        />
      </svg>

      <p className="max-w-[125px] whitespace-pre-line text-center text-xs font-semibold leading-tight text-white/80 sm:max-w-[150px] sm:text-sm">
        {member.label}
      </p>
    </motion.div>
  );
}

export default function Team() {
  return (
    // ═══ Let's assemble your team ═══
    <section className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />
      <div className="relative z-10 mx-auto">
        {/* team row — assemble animation: stacked centre → spread → vibrant → pastel → gray.
            The row (always in view) is the trigger; each child animates via variants. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap items-end justify-center gap-x-4 gap-y-8 sm:gap-x-10 sm:gap-y-10 lg:gap-x-12"
        >
          {team.map((m, i) => (
            <TeamShape key={m.label} member={m} index={i} />
          ))}
        </motion.div>

        {/* heading + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-5 text-center sm:mt-16 sm:gap-6"
        >
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s assemble your team.
          </h2>
          <Link
            href="/consultation"
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
                Schedule a Call
              </span>
            </div>
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
