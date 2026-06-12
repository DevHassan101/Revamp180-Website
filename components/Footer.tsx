import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const services = [
  { label: "Website Revamping",        href: "/services#website-revamping"        },
  { label: "Web Design & Development", href: "/services#web-design-development"   },
  { label: "App Design & Development", href: "/services#app-design-development"   },
  { label: "Branding & UI/UX Design",  href: "/services#branding-ui-ux-design"    },
  { label: "Social Media Management",  href: "/services#social-media-management"  },
  { label: "Video Editing",            href: "/services#video-editing"            },
];

const quickLinks = [
  { label: "Home",     href: "/"         },
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact"  },
];

const socials = [
  { icon: "tabler:brand-instagram", href: "#", label: "Instagram" },
  { icon: "tabler:brand-linkedin",  href: "#", label: "LinkedIn"  },
  { icon: "tabler:brand-facebook",  href: "#", label: "Facebook"  },
  { icon: "tabler:brand-whatsapp",  href: "#", label: "WhatsApp"  },
];

const contactDetails = [
  { icon: "tabler:mail",     value: "info@revamp180.com",  href: "mailto:info@revamp180.com" },
  { icon: "tabler:phone",    value: "+966-502624196",     href: "tel:+966502624196"          },
  { icon: "tabler:map-pin",  value: "Riyadh, Saudi Arabia",    href: null                         },
];

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000018 0%, #00000F 100%)" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,128,255,0.35), transparent)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-[200px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #1800C8 0%, transparent 70%)",
          opacity: 0.08,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/logo2.jpeg"
                  alt="Revamp 180 logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <p className="text-[14px] font-extrabold tracking-wide text-white">
                  REVAMP <span style={{ color: "#8B80FF" }}>180°</span>
                </p>
                <p
                  className="text-[9px] font-medium tracking-[0.22em] uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Digital Agency
                </p>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed mb-6 max-w-[240px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              We help businesses build powerful digital experiences — on time
              and on budget.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-[rgba(139,128,255,0.45)]"
                  style={{
                    background: "rgba(139,128,255,0.08)",
                    border: "1px solid rgba(139,128,255,0.18)",
                  }}
                >
                  <Icon icon={s.icon} className="w-4 h-4" style={{ color: "#8B80FF" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p
              className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-5"
              style={{ color: "rgba(139,128,255,0.7)" }}
            >
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
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

          {/* Col 3 — Services */}
          <div>
            <p
              className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-5"
              style={{ color: "rgba(139,128,255,0.7)" }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:w-3"
                      style={{ background: "rgba(139,128,255,0.5)" }}
                    />
                    <span className="group-hover:text-white transition-colors duration-150">
                      {s.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + CTA */}
          <div>
            <p
              className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-5"
              style={{ color: "rgba(139,128,255,0.7)" }}
            >
              Contact
            </p>

            <ul className="space-y-4 mb-7">
              {contactDetails.map((c) => (
                <li key={c.value}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="group flex items-start gap-3 hover:opacity-80 transition-opacity"
                    >
                      <ContactRow c={c} />
                    </a>
                  ) : (
                    <div className="flex items-start gap-3">
                      <ContactRow c={c} />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_14px_rgba(8,11,120,0.55)] hover:shadow-[0_0_20px_rgba(139,128,255,0.55),0_0_50px_rgba(53,32,220,0.45),0_0_80px_rgba(24,0,200,0.25)]"
              style={{
                background: "linear-gradient(135deg, #080B78 0%, #00004D 100%)",
                border: "1.5px solid transparent",
              }}
            >
              Get a Free Quote
              <Icon icon="tabler:arrow-right" className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
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
              Crafted with care in Pakistan
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}

function ContactRow({ c }: { c: { icon: string; value: string } }) {
  return (
    <>
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{
          background: "rgba(139,128,255,0.10)",
          border: "1px solid rgba(139,128,255,0.2)",
        }}
      >
        <Icon icon={c.icon} className="w-4 h-4" style={{ color: "#8B80FF" }} />
      </div>
      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {c.value}
      </span>
    </>
  );
}
