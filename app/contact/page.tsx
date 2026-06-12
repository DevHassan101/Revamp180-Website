"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const fieldIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const expectations = [
  {
    icon: "tabler:clock-hour-4",
    title: "Reply in 2–4 hours",
    sub: "Business Hours: 7 AM – 10 PM (AST)",
  },
  {
    icon: "tabler:file-text",
    title: "Written quote in 24 hours",
    sub: "Detailed and fixed-price",
  },
  {
    icon: "tabler:shield-check",
    title: "No obligation",
    sub: "Zero pressure, just honest advice",
  },
  {
    icon: "tabler:code",
    title: "Talk to the developer",
    sub: "Not an account manager",
  },
];

const contactDetails = [
  {
    icon: "tabler:mail",
    label: "Email",
    value: "info@revamp180.com",
    href: "mailto:info@revamp180.com",
    target: null,
  },
  {
    icon: "tabler:phone",
    label: "Phone",
    value: "+966-502624196",
    href: "tel:+966502624196",
    target: null,
  },
  {
    icon: "tabler:brand-whatsapp",
    label: "Whatsapp",
    value: "Message on WhatsApp",
    href: "https://wa.me/966502624196",
    target: "_blank",
  },
  {
    icon: "tabler:brand-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/company/revamp180",
    href: "https://www.linkedin.com/company/revamp180/",
    target: "_blank",
  },
];

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "new-project", label: "New Project / Quote" },
  { value: "support", label: "Support Request" },
  { value: "feedback", label: "Feedback" },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  company: "", // honeypot
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "rounded-lg border border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.04)] px-3 py-2 text-white placeholder:text-white/40 transition-colors duration-200 focus:border-[rgba(139,128,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(139,128,255,0.25)]";

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.error || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

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
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.08)] px-4 py-1.5 text-xs font-medium tracking-wide text-[#C0BAFF]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B80FF] animate-pulse" />
            We&apos;re online and ready to help
          </motion.span>

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
            Let&apos;s Talk About{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
            >
              Your Project
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
          >
            No sales pitch. No pressure. Tell us what you need — we&apos;ll give
            you an honest answer and a written quote within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── Content grid ── */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Form card ── */}
          <motion.div
            variants={cardIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2"
          >
            <div
              className="group h-full rounded-xl p-6 text-white sm:p-8"
              style={{
                border: "1px solid rgba(139,128,255,0.3)",
                background: "rgba(139,128,255,0.04)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <h2 className="text-xl font-semibold">Send Us a Message</h2>
              <p className="mt-1 text-sm font-light text-white/60">
                We read every message and reply personally.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-green-500/40 bg-green-500/10 px-6 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-green-400"
                  >
                    <Icon icon="tabler:check" className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">Message sent!</h3>
                  <p className="max-w-sm text-sm text-white/60">
                    Thanks for reaching out. We&apos;ll get back to you within
                    2–4 hours during business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-medium text-[#8B80FF] hover:text-[#C0BAFF] transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="mt-6"
                  noValidate
                >
                  {/* Honeypot — hidden from real users */}
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={update("company")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div
                      variants={fieldIn}
                      className="flex flex-col gap-2"
                    >
                      <label htmlFor="fullName" className="text-sm">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        required
                        value={form.fullName}
                        onChange={update("fullName")}
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </motion.div>

                    <motion.div
                      variants={fieldIn}
                      className="flex flex-col gap-2"
                    >
                      <label htmlFor="email" className="text-sm">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </motion.div>

                    <motion.div
                      variants={fieldIn}
                      className="flex flex-col gap-2"
                    >
                      <label htmlFor="phone" className="text-sm">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="+966-502624196"
                        className={inputClass}
                      />
                    </motion.div>

                    <motion.div
                      variants={fieldIn}
                      className="flex flex-col gap-2"
                    >
                      <label htmlFor="subject" className="text-sm">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <SubjectDropdown
                        value={form.subject}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, subject: value }))
                        }
                      />
                    </motion.div>

                    <motion.div
                      variants={fieldIn}
                      className="col-span-1 flex flex-col gap-2 sm:col-span-2"
                    >
                      <label htmlFor="message" className="text-sm">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell us a bit about your project, goals and timeline…"
                        className={`${inputClass} resize-none`}
                      />
                    </motion.div>
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                    >
                      <Icon
                        icon="tabler:alert-circle"
                        className="h-4 w-4 flex-shrink-0"
                      />
                      {error}
                    </motion.p>
                  )}

                  <motion.div variants={fieldIn} className="mt-5">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group/btn relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(135deg,#080B78,#00004D)] py-3.5 transition-all duration-700
                        shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
                        hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
                        disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {status === "loading" ? (
                          <>
                            <Icon
                              icon="tabler:loader-2"
                              className="h-5 w-5 animate-spin"
                            />
                            <span className="text-sm font-semibold tracking-wide text-white md:text-[17px]">
                              Sending…
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-semibold tracking-wide text-white drop-shadow-sm md:text-[17px]">
                              Send Message
                            </span>
                            <Icon
                              icon="tabler:send"
                              className="h-5 w-5 text-white transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                            />
                          </>
                        )}
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* What to expect */}
            <motion.div
              variants={cardIn}
              className="rounded-xl p-6"
              style={{
                background: "rgba(139,128,255,0.12)",
                border: "1px solid rgba(139,128,255,0.3)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wide"
                style={{ color: "#8B80FF" }}
              >
                What to expect
              </h3>
              <div className="flex flex-col gap-4">
                {expectations.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B80FF] text-white">
                      <Icon icon={item.icon} className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-white">{item.title}</p>
                      <p className="text-xs text-white/60">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div
              variants={cardIn}
              className="rounded-xl p-6 text-white"
              style={{
                border: "1px solid rgba(139,128,255,0.3)",
                background: "rgba(139,128,255,0.04)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide">
                Contact Details
              </h3>
              <div className="flex flex-col">
                {contactDetails.map((c, i) => {
                  const inner = (
                    <div className="group flex justify-between items-center gap-3">
                      <div className="flex items-start gap-3 group-hover:ml-2 transition-all duration-200">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B80FF] text-white">
                          <Icon icon={c.icon} className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-[10px] uppercase tracking-wide text-white/60">
                            {c.label}
                          </p>
                          <span className="text-[12px] text-white">{c.value}</span>
                        </div>
                      </div>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" fill="none" />
                        <path
                          d="M9.5 7L14.5 12L9.5 17"
                          stroke="#FFFFFF"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  );
                  const border =
                    i < contactDetails.length - 1
                      ? "border-b border-[rgba(139,128,255,0.2)]"
                      : "";
                  return (
                    <div
                      key={c.label}
                      className={`py-3 first:pt-0 last:pb-0 ${border}`}
                    >
                      {c.href ? (
                        <Link
                          href={c.href}
                          target={c.target || "_self"}
                          className="block transition-opacity hover:opacity-80"
                        >
                          {inner}
                        </Link>
                      ) : (
                        inner
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center pb-24"
      >
        <h2
          className="font-bold text-white"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Do you want to discuss in more detail?
        </h2>
        <p className="max-w-2xl leading-relaxed text-white/55">
          Book a 30-minute free consultation with our lead developer to discuss
          your project, get advice and see if we&apos;re a good fit — no strings
          attached.
        </p>
        <CTAButton href="/consultation" label="Get a Consultation" />
      </motion.div>
    </main>
  );

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
}

// ─── Custom themed subject dropdown ───────────────────────────────────────────
function SubjectDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = subjects.find((s) => s.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Hidden input keeps native form behaviour / value tracking */}
      <input type="hidden" name="subject" value={value} required />

      <button
        type="button"
        id="subject"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-lg border bg-[rgba(139,128,255,0.04)] px-3 py-2 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgba(139,128,255,0.25)] ${
          open
            ? "border-[rgba(139,128,255,0.6)]"
            : "border-[rgba(139,128,255,0.3)] hover:border-[rgba(139,128,255,0.45)]"
        } ${selected ? "text-white" : "text-white/40"}`}
      >
        <span>{selected ? selected.label : "Select a subject"}</span>
        <Icon
          icon="tabler:chevron-down"
          className={`h-4 w-4 flex-shrink-0 text-[#8B80FF] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            role="listbox"
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border border-[rgba(139,128,255,0.3)] p-1 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            style={{
              background: "rgba(13,12,46,0.92)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            {subjects.map((s) => {
              const active = s.value === value;
              return (
                <li key={s.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(s.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ${
                      active
                        ? "bg-[rgba(139,128,255,0.18)] text-white"
                        : "text-white/75 hover:bg-[rgba(139,128,255,0.1)] hover:text-white"
                    }`}
                  >
                    <span>{s.label}</span>
                    {active && (
                      <Icon
                        icon="tabler:check"
                        className="h-4 w-4 text-[#8B80FF]"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
