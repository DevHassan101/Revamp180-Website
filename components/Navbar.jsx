"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Icon } from "@iconify/react";

const services = [
  {
    name: "Website Revamping",
    desc: "Transform outdated sites into modern experiences",
    icon: "tabler:refresh",
    badge: "Core Service",
    href: "/services#website-revamping",
  },
  {
    name: "Web Design & Development",
    desc: "Custom websites built for performance & scale",
    icon: "tabler:code",
    href: "/services#web-design-development",
  },
  {
    name: "App Design & Development",
    desc: "Native & cross-platform apps users love",
    icon: "tabler:device-mobile",
    href: "/services#app-design-development",
  },
  {
    name: "Branding & UI/UX Design",
    desc: "Identities & interfaces that leave an impression",
    icon: "tabler:brush",
    href: "/services#branding-ui-ux-design",
  },
  {
    name: "Social Media Management",
    desc: "Grow your audience with strategic content",
    icon: "tabler:brand-instagram",
    href: "/services#social-media-management",
  },
  {
    name: "Video Editing",
    desc: "Professional edits that tell your brand story",
    icon: "tabler:video",
    href: "/services#video-editing",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { scrollY } = useScroll();
  const navBorder = useTransform(
    scrollY,
    [0, 60],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.12)"],
  );

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    if (!mobileOpen) setMobileServicesOpen(false);
  }, [mobileOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <motion.nav
      style={{
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: navBorder,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#01004C]/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-11 h-11 rounded-xl overflow-hidden"
            >
              <Image
                src="/images/logo2.jpeg"
                alt="Revamp 180 logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
            <div className="leading-tight select-none">
              <p className="text-[15px] font-extrabold tracking-wide text-white">
                REVAMP <span className="text-[#8B80FF]">180°</span>
              </p>
              <p className="text-[9px] font-medium tracking-[0.22em] text-white/40 uppercase">
                Digital Agency
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={isActive("/")}>Home</NavLink>
            <NavLink href="/about" active={isActive("/about")}>About</NavLink>

            {/* Services Dropdown — hover only, no click toggle, no delay */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-5 py-2 text-[15px] font-medium transition-colors relative cursor-pointer group ${
                  isServicesActive
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Services
                <motion.svg
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
                <motion.span
                  className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full origin-center"
                  style={{
                    background: isServicesActive
                      ? "#8B80FF"
                      : "rgba(255,255,255,0.5)",
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: isServicesActive || servicesOpen ? 1 : 0,
                    opacity: isServicesActive || servicesOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </button>

              {/* Dropdown Panel */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.0, 0.0, 0.2, 1] }}
                    style={{
                      background: "rgba(0,0,46,0.97)",
                      backdropFilter: "blur(24px)",
                      transformOrigin: "top center",
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl shadow-2xl border border-white/10 py-3 z-50 w-[700px]"
                  >
                    {/* Arrow */}
                    <div
                      className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 border-l border-t border-white/10 rotate-45"
                      style={{ background: "rgba(0,0,46,0.97)" }}
                    />

                    <div className="px-4 pb-2.5 pt-1 border-b border-white/[0.06]">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
                        Our Services
                      </p>
                    </div>

                    {/* 2-column grid */}
                    <div className="pt-2 px-2 grid grid-cols-2 gap-x-1">
                      {services.map((s) => (
                        <motion.div
                          key={s.name}
                          whileHover={{ scale: 1.02, x: 3 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                        >
                          <Link
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 hover:bg-white/[0.06] group"
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: "rgba(139,128,255,0.12)",
                                border: "1px solid rgba(139,128,255,0.22)",
                              }}
                            >
                              <Icon
                                icon={s.icon}
                                className="w-[18px] h-[18px] text-[#8B80FF]"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-white/85 group-hover:text-white transition-colors duration-150">
                                  {s.name}
                                </span>
                                {s.badge && (
                                  <span className="text-[9px] font-bold bg-[#3520DC] text-white px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                                    {s.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[12px] text-white/[0.38] mt-0.5 truncate group-hover:text-white/60 transition-colors duration-150">
                                {s.desc}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/projects" active={isActive("/projects")}>Projects</NavLink>
            <NavLink href="/contact" active={isActive("/contact")}>Contact</NavLink>
          </div>

          {/* ── Desktop CTA Buttons ── */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-white/20 text-sm font-semibold text-white/80 hover:border-white/50 hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                <Icon icon="tabler:message-circle" className="w-4 h-4 flex-shrink-0" />
                Free Consultation
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1800C8] text-white text-sm font-semibold hover:bg-[#3520DC] transition-colors duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
                style={{ boxShadow: "0 0 16px rgba(24,0,200,0.4)" }}
              >
                <Icon icon="tabler:bolt" className="w-3.5 h-3.5 flex-shrink-0" />
                Get a Quote →
              </Link>
            </motion.div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle navigation"
          >
            <div className="flex flex-col gap-[5px] w-5 justify-center">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="block h-[2px] w-full bg-white rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-full bg-white rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="block h-[2px] w-full bg-white rounded-full origin-center"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden border-t border-white/10"
            style={{
              overflow: "hidden",
              backgroundColor: "rgba(1,0,76,0.92)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-4 py-3 space-y-0.5">
              <MobileNavLink href="/" active={isActive("/")} onClick={() => setMobileOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" active={isActive("/about")} onClick={() => setMobileOpen(false)}>
                About
              </MobileNavLink>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen((o) => !o)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isServicesActive
                      ? "bg-white/10 text-[#8B80FF]"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  Services
                  <motion.svg
                    animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: "easeOut" }}
                      style={{ overflow: "hidden" }}
                      className="ml-4 mt-1 border-l-2 border-[#8B80FF]/40 pl-3"
                    >
                      <div className="space-y-0.5 py-1">
                        {services.map((s, i) => (
                          <motion.div
                            key={s.name}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04, duration: 0.18 }}
                          >
                            <Link
                              href={s.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.08] transition-colors group"
                            >
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: "rgba(139,128,255,0.12)",
                                  border: "1px solid rgba(139,128,255,0.22)",
                                }}
                              >
                                <Icon icon={s.icon} className="w-4 h-4 text-[#8B80FF]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-white/90">
                                    {s.name}
                                  </span>
                                  {s.badge && (
                                    <span className="text-[9px] font-bold bg-[#3520DC] text-white px-2 py-0.5 rounded-full uppercase">
                                      {s.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-white/40 mt-0.5 truncate">
                                  {s.desc}
                                </p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MobileNavLink href="/projects" active={isActive("/projects")} onClick={() => setMobileOpen(false)}>
                Projects
              </MobileNavLink>
              <MobileNavLink href="/contact" active={isActive("/contact")} onClick={() => setMobileOpen(false)}>
                Contact
              </MobileNavLink>

              {/* Mobile CTAs */}
              <div className="pt-4 pb-2 space-y-2.5 border-t border-white/10 mt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border-2 border-white/20 text-sm font-semibold text-white/80 hover:border-white/50 hover:text-white transition-all"
                >
                  <Icon icon="tabler:message-circle" className="w-4 h-4" />
                  Free Consultation
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-full bg-[#1800C8] text-white text-sm font-semibold hover:bg-[#3520DC] transition-all shadow-lg"
                >
                  <Icon icon="tabler:bolt" className="w-3.5 h-3.5" />
                  Get a Quote →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, active, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-5 py-2 text-[15px] font-medium transition-colors ${
        active ? "text-white" : "text-white/70 hover:text-white"
      }`}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full origin-center"
        style={{ background: active ? "#8B80FF" : "rgba(255,255,255,0.5)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: active || hovered ? 1 : 0,
          opacity: active || hovered ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </Link>
  );
}

function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active
          ? "bg-white/10 text-[#8B80FF]"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
