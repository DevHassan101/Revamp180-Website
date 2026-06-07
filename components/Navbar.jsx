"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { ChevronDown, MoveUpRight } from "lucide-react";
import styles from "./navbar.module.css";

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [mobileCtaHovered, setMobileCtaHovered] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <header
        className={`w-full fixed top-0 left-0 z-50 px-6 lg:px-10 transition-all duration-500 ${
          scrolled ? "bg-transparent" : "bg-transparent"
        }`}
      >
        <nav
          className={`grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ease-in-out ${scrolled ? "px-2 py-1.5" : "py-0"}`}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className={`col-start-1 flex items-center gap-3 shrink-0 z-50 transition-all duration-500 ${scrolled ? "mt-0" : "mt-5 md:mt-2"}`}
          >
            <div className="relative w-32 h-11 flex items-center">
              {/* Text */}
              <div
                className={`absolute inset-0 flex items-center transition-all duration-200 ${
                  scrolled
                    ? "opacity-0 scale-90 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
              >
                <p className="text-[18px] xl:text-[22px] font-extrabold tracking-wide text-white whitespace-nowrap">
                  REVAMP 180°
                </p>
              </div>

              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`absolute inset-0 flex items-center transition-all duration-300 ${
                  scrolled
                    ? "opacity-100 scale-100 delay-150"
                    : "opacity-0 scale-75 pointer-events-none delay-0"
                }`}
              >
                <Image
                  src="/images/revamp-transparent.png"
                  alt="Revamp 180 logo"
                  width={54}
                  height={54}
                  className="rounded-xl object-cover"
                  priority
                />
              </motion.div>
            </div>
          </Link>

          {/* ── Desktop Nav — White Pill (ByteCloude design) ── */}
          <div
            className={`col-start-2 hidden lg:flex items-center justify-center relative h-[65px] xl:h-[68px] self-start transition-opacity duration-150 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            {/* White pill shape — only visible when not scrolled */}
            <div
              className={`absolute inset-0 bg-white transition-opacity duration-700 ease-in-out ${styles.maskShape} ${scrolled ? "invisible" : "visible"}`}
            />

            <ul className="relative flex items-center gap-3 xl:gap-8 px-13 xl:px-20 h-full z-10">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-[12px] xl:text-[15px] tracking-wide xl:tracking-wider font-medium transition-all duration-500 uppercase ${
                      scrolled
                        ? isActive(item.href)
                          ? "text-[#8B80FF]"
                          : "text-white hover:text-[#8B80FF]"
                        : "hover:text-blue-600"
                    }`}
                    style={!scrolled ? { color: "#01004C" } : {}}
                  >
                    <span
                      className={`px-2 py-[3px] inline-block relative transition-all duration-200 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:rounded-full before:bg-gradient-to-r before:from-[#8B80FF] before:via-[#3520DC] before:to-[#00004D] before:w-0 hover:before:w-[70%] before:transition-all before:duration-300 hover:[text-shadow:0_0_12px_rgba(139,128,255,0.75)] ${
                        !scrolled && isActive(item.href) ? "" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}

              {/* Services dropdown */}
              <li>
                <div
                  ref={dropdownRef}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 text-[12px] xl:text-[15px] tracking-wide xl:tracking-wider font-medium transition-all duration-500 uppercase cursor-pointer ${
                      scrolled
                        ? isServicesActive
                          ? "text-[#8B80FF]"
                          : "text-white hover:text-[#8B80FF]"
                        : "hover:text-blue-600"
                    }`}
                    style={!scrolled ? { color: "#01004C" } : {}}
                    aria-haspopup="true"
                    aria-expanded={servicesOpen}
                  >
                    <span
                      className={`px-2 inline-block relative transition-all duration-200 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:rounded-full before:bg-gradient-to-r before:from-[#8B80FF] before:via-[#3520DC] before:to-[#00004D] before:w-0 hover:before:w-[70%] before:transition-all before:duration-300 hover:[text-shadow:0_0_12px_rgba(139,128,255,0.75)] ${
                        !scrolled && isServicesActive
                          ? "border border-[#01004C]/70"
                          : ""
                      }`}
                    >
                      Services
                    </span>
                    <motion.span
                      animate={{ rotate: servicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-center"
                    >
                      <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4" />
                    </motion.span>
                  </button>

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.0, 0.0, 0.2, 1],
                        }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl shadow-2xl border border-white/10 py-3 z-50 w-[680px]"
                        style={{
                          background: "rgba(0,0,46,0.97)",
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          transformOrigin: "top center",
                        }}
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
                        <div className="pt-2 px-2 pb-2 grid grid-cols-2 gap-x-1">
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
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] group transition-colors duration-150"
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
              </li>

              {[
                { name: "Projects", href: "/projects" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-[12px] xl:text-[15px] tracking-wide xl:tracking-wider font-medium transition-all duration-500 uppercase ${
                      scrolled
                        ? isActive(item.href)
                          ? "text-[#8B80FF]"
                          : "text-white hover:text-[#8B80FF]"
                        : "hover:text-blue-600"
                    }`}
                    style={!scrolled ? { color: "#01004C" } : {}}
                  >
                    <span
                      className={`px-2 py-[3px] inline-block relative transition-all duration-200 before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:rounded-full before:bg-gradient-to-r before:from-[#8B80FF] before:via-[#3520DC] before:to-[#00004D] before:w-0 hover:before:w-[70%] before:transition-all before:duration-300 hover:[text-shadow:0_0_12px_rgba(139,128,255,0.75)] ${
                        !scrolled && isActive(item.href)
                          ? "border border-[#01004C]/70"
                          : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right col: CTA + Hamburger ── */}
          <div className="col-start-3 flex items-center justify-end">
            {/* Desktop CTA Buttons */}
            <div
              className={`hidden lg:flex items-center gap-1 z-50 group ${scrolled ? "mt-0" : "mt-2"}`}
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              <Link
                href="/contact"
                aria-label="linkToContactUs"
                className="relative px-8 py-3 rounded-full text-white text-sm font-semibold tracking-wide overflow-hidden transition-all duration-500"
                style={
                  ctaHovered
                    ? {
                        background: "linear-gradient(135deg, #080B78 0%, #00004D 100%)",
                        border: "1.5px solid rgba(139,128,255,0.5)",
                        boxShadow: "0 0 32px rgba(8,11,120,0.85), 0 0 60px rgba(80,70,255,0.35)",
                      }
                    : {
                        background: "linear-gradient(135deg, #080B78 0%, #00004D 100%)",
                        border: "1.5px solid transparent",
                        boxShadow: "0 0 28px rgba(8,11,120,0.55)",
                      }
                }
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative z-10 transition-all duration-500 group-hover:tracking-wider">
                  Get A Quote
                </span>
              </Link>
              <button
                aria-label="rightToContactUs"
                className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:rotate-45"
                style={
                  ctaHovered
                    ? {
                        background: "linear-gradient(135deg, #080B78 0%, #00004D 100%)",
                        border: "1.5px solid rgba(139,128,255,0.5)",
                        boxShadow: "0 0 32px rgba(8,11,120,0.85), 0 0 60px rgba(80,70,255,0.35)",
                      }
                    : {
                        background: "linear-gradient(135deg, #080B78 0%, #00004D 100%)",
                        border: "1.5px solid transparent",
                        boxShadow: "0 0 28px rgba(8,11,120,0.55)",
                      }
                }
              >
                <MoveUpRight size={18} className="text-white relative z-10" strokeWidth={2.5} />
              </button>
            </div>
            {/* Mobile Hamburger */}
            <motion.button
              className={`lg:hidden z-50 p-2 transition-all duration-500 ${scrolled ? "mt-0" : "mt-5"}`}
              onClick={() => setMobileOpen((o) => !o)}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle navigation"
            >
              <div className="flex flex-col gap-[5px] w-5 justify-center">
                <motion.span
                  animate={
                    mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="block h-[2px] w-full bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block h-[2px] w-full bg-white rounded-full"
                />
                <motion.span
                  animate={
                    mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="block h-[2px] w-full bg-white rounded-full origin-center"
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#01004C] rounded-r-3xl z-50 transform transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#8B80FF]/40">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image
                  src="/images/logo2.jpeg"
                  alt="Revamp 180 logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight select-none">
                <p className="text-[14px] font-extrabold tracking-wide text-white">
                  REVAMP <span className="text-[#8B80FF]">180°</span>
                </p>
                <p className="text-[8px] font-medium tracking-[0.22em] text-white/40 uppercase">
                  Digital Agency
                </p>
              </div>
            </Link>
          </div>

          {/* Drawer Links */}
          <ul className="flex-1 overflow-y-auto pb-5">
            {[
              { name: "Home", href: "/" },
              { name: "About Us", href: "/about" },
            ].map((item) => (
              <li key={item.name} className="border-b border-[#8B80FF]/20">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-6 py-4 font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-[#8B80FF]"
                      : "text-white hover:text-[#8B80FF]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Services Accordion */}
            <li className="border-b border-[#8B80FF]/20">
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                className={`w-full flex items-center justify-between px-6 py-4 font-medium transition-colors ${
                  isServicesActive ? "text-[#8B80FF]" : "text-white"
                }`}
              >
                Services
                <motion.span
                  animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                    className="ml-4 border-l-2 border-[#8B80FF]/40 pl-3 pb-2"
                  >
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
                            <Icon
                              icon={s.icon}
                              className="w-4 h-4 text-[#8B80FF]"
                            />
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
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {[
              { name: "Portfolio", href: "/projects" },
              { name: "Contact Us", href: "/contact" },
            ].map((item) => (
              <li key={item.name} className="border-b border-[#8B80FF]/20">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-6 py-4 font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-[#8B80FF]"
                      : "text-white hover:text-[#8B80FF]"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTAs (Revamp style) */}
          <div className="p-6 border-t border-[#8B80FF]/40 space-y-2.5">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border-2 border-white/20 text-sm font-semibold text-white/80 hover:border-[#8B80FF]/60 hover:text-white transition-all duration-300"
            >
              <Icon icon="tabler:message-circle" className="w-4 h-4" />
              Free Consultation
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              onMouseEnter={() => setMobileCtaHovered(true)}
              onMouseLeave={() => setMobileCtaHovered(false)}
              className="flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-full text-white text-sm font-semibold transition-all duration-500"
              style={
                mobileCtaHovered
                  ? {
                      background: "rgba(255,255,255,0.05)",
                      border: "1.5px solid rgba(139,128,255,0.35)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "none",
                    }
                  : {
                      background: "linear-gradient(135deg, #080B78 0%, #00004D 100%)",
                      border: "1.5px solid transparent",
                      boxShadow: "0 0 28px rgba(8,11,120,0.55)",
                    }
              }
            >
              <Icon icon="tabler:bolt" className="w-3.5 h-3.5" />
              Get a Quote →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
