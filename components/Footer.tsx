import Link from "next/link";
import { Icon } from "@iconify/react";
import FloatingWords from "./FloatingWords";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { icon: "tabler:brand-instagram", href: "#", label: "Instagram" },
  { icon: "tabler:brand-linkedin", href: "#", label: "LinkedIn" },
  { icon: "tabler:brand-facebook", href: "#", label: "Facebook" },
  { icon: "tabler:brand-x", href: "#", label: "X" },
  { icon: "tabler:brand-whatsapp", href: "#", label: "WhatsApp" },
];

const contactDetails = [
  {
    icon: "tabler:mail",
    value: "info@revamp180.com",
    href: "mailto:info@revamp180.com",
  },
  { icon: "tabler:phone", value: "+966-502624196", href: "tel:+966502624196" },
  { icon: "tabler:map-pin", value: "Riyadh, Saudi Arabia", href: null },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000018 0%, #00000F 100%)",
      }}
    >
      {/* Floating background words (Refresh / Redesign / Relaunch) */}
      <FloatingWords />

      {/* Top separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.35), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[260px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* ── Main 3-column area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-10 sm:gap-12 lg:gap-8 items-center lg:items-start">
          {/* ── Left — Nav links ── */}

          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start">
            <p
              className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-5"
              style={{ color: "rgba(139,128,255,0.7)" }}
            >
              Quick Links
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:w-3"
                      style={{ background: "rgba(139,128,255,0.5)" }}
                    />
                    <span className="group-hover:text-white transition-colors duration-150">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Center — Wordmark (3D floor perspective) ── */}
          <div className="flex w-full flex-col items-center text-center order-1 lg:order-2 overflow-x-clip pt-[10vw] sm:pt-[7vw] lg:pt-[5rem]">
            <Link href="/" aria-label="Revamp 180 home" className="block max-w-full">
              <h2
                className="leading-none select-none uppercase"
                style={{
                  fontFamily: "var(--font-anton), sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(3rem, 15vw, 11rem)",
                  letterSpacing: "0.01em",
                  color: "#E8E8F5",
                  transform: "perspective(900px) rotateX(62deg) scaleY(4.2)",
                  transformOrigin: "bottom center",
                }}
              >
                REVAMP&nbsp;180
                <span style={{ color: "#8B80FF" }}>°</span>
              </h2>
            </Link>

            {/* Social icons */}
            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[rgba(139,128,255,0.18)]"
                  style={{
                    background: "rgba(139,128,255,0.08)",
                    border: "1px solid rgba(139,128,255,0.18)",
                  }}
                >
                  <Icon
                    icon={s.icon}
                    className="w-[18px] h-[18px]"
                    style={{ color: "#8B80FF" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right — Contact + CTA ── */}
          <div className="flex flex-col items-center lg:items-end gap-5 order-3 lg:order-3">
            <p
              className="w-full text-center lg:text-left text-[10.5px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "rgba(139,128,255,0.7)" }}
            >
              Contact
            </p>

            <ul className="flex flex-col items-center lg:items-end gap-4">
              {contactDetails.map((c) => {
                const inner = (
                  <span className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(139,128,255,0.10)",
                        border: "1px solid rgba(139,128,255,0.2)",
                      }}
                    >
                      <Icon
                        icon={c.icon}
                        className="w-4 h-4"
                        style={{ color: "#8B80FF" }}
                      />
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {c.value}
                    </span>
                  </span>
                );
                return (
                  <li className="w-full" key={c.value}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="hover:opacity-80 transition-opacity"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
            
            {/* CTAs */}
            {/* <div className="flex flex-col items-center lg:items-end gap-3 mt-2">
              
              <Link
              href="/consultation"
              className="group/btn relative inline-flex items-center gap-4 bg-[linear-gradient(135deg,#080B78,#00004D)] pl-1.5 pr-8 md:pr-10 py-1.5 rounded-full transition-all duration-700
    shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
    hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
    cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center shadow-lg">
                  <svg
                    className="w-5 h-5 md:w-5.5 md:h-5.5"
                    fill="none"
                    stroke="#080B78"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-white font-semibold tracking-wide text-sm md:text-[17px] whitespace-nowrap drop-shadow-sm">
                  Book Free Consultation
                </span>
              </div>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></span>
            </Link>
            </div> */}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © {new Date().getFullYear()} Revamp 180°. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#8B80FF" }}
            />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              Crafted by the Revamp 180° team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
