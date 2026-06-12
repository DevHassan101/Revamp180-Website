"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
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

// Step transition (slide + fade)
const stepVariants: Variants = {
  enter: { opacity: 0, x: 28 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, x: -28, transition: { duration: 0.25, ease: EASE } },
};

const trustSignals = [
  { icon: "tabler:credit-card-off", label: "Free — no credit card" },
  { icon: "tabler:file-text", label: "Quote within 24 hours" },
  { icon: "tabler:lock", label: "NDA available on request" },
  { icon: "tabler:rosette-discount-check", label: "445+ projects delivered" },
];

const timeSlots = [
  {
    value: "Morning (9 AM – 12 PM)",
    icon: "tabler:sunrise",
    sub: "9 AM – 12 PM",
  },
  {
    value: "Afternoon (12 PM – 4 PM)",
    icon: "tabler:sun",
    sub: "12 PM – 4 PM",
  },
  {
    value: "Evening (4 PM – 8 PM)",
    icon: "tabler:sunset-2",
    sub: "4 PM – 8 PM",
  },
  { value: "I'm flexible", icon: "tabler:clock-hour-4", sub: "Any time works" },
];

const howItWorks = [
  {
    icon: "tabler:target-arrow",
    title: "Discuss your goals",
    sub: "We start with your business objectives and project vision.",
  },
  {
    icon: "tabler:cpu",
    title: "Technical assessment",
    sub: "We evaluate the right tech stack and share recommendations.",
  },
  {
    icon: "tabler:list-check",
    title: "Project outline",
    sub: "Scope, timeline and preliminary details — right on the call.",
  },
  {
    icon: "tabler:file-invoice",
    title: "Written proposal",
    sub: "A detailed, fixed-price proposal in your inbox within 24 hours.",
  },
  {
    icon: "tabler:rocket",
    title: "Start immediately",
    sub: "Once approved, we kick off within 24 hours.",
  },
];

const contactDetails = [
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
    value: "Message on Whatsapp",
    href: "https://wa.me/966502624196",
    target: "_blank",
  },
  {
    icon: "tabler:mail",
    label: "Email",
    value: "info@revamp180.com",
    href: "mailto:info@revamp180.com",
    target: null,
  },
];

const steps = [
  { id: "date", label: "Date", icon: "tabler:calendar" },
  { id: "time", label: "Time", icon: "tabler:clock" },
  { id: "details", label: "Details", icon: "tabler:user" },
] as const;

type StepId = (typeof steps)[number]["id"];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  topic: "",
  company: "", // honeypot
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "rounded-lg border border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.04)] px-3 py-2 text-white placeholder:text-white/40 transition-colors duration-200 focus:border-[rgba(139,128,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(139,128,255,0.25)]";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number) =>
  `${y}-${pad(m + 1)}-${pad(d)}`;

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ConsultationPage() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState<StepId>("date");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const stepIndex = steps.findIndex((s) => s.id === step);

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setValue = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function pickDate(iso: string) {
    setError("");
    setValue("date", iso);
    setStep("time");
  }

  function pickTime(value: string) {
    setError("");
    setValue("time", value);
    setStep("details");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/consultation", {
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
      setStep("date");
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
            30-minute free discovery call
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
            Book Your Free{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
              }}
            >
              Discovery Call
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.72, ease: EASE, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
          >
            Talk your project through with our lead developer — zero obligation.
            Honest advice, the right approach, and a clear path forward.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {trustSignals.map((t) => (
              <motion.span
                key={t.label}
                variants={fieldIn}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.2)] bg-[rgba(139,128,255,0.04)] px-3.5 py-1.5 text-xs text-white/70"
              >
                <Icon icon={t.icon} className="h-4 w-4 text-[#8B80FF]" />
                {t.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Content grid ── */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Booking flow ── */}
          <motion.div
            variants={cardIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-2"
          >
            <div
              className="h-full rounded-xl p-6 text-white sm:p-8"
              style={{
                border: "1px solid rgba(139,128,255,0.3)",
                background: "rgba(139,128,255,0.04)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col items-center gap-3 rounded-xl border border-green-500/40 bg-green-500/10 px-6 py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-green-400"
                  >
                    <Icon icon="tabler:calendar-check" className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">Request received!</h3>
                  <p className="max-w-sm text-sm text-white/60">
                    Thanks — we&apos;ll confirm your discovery call shortly.
                    Keep an eye on your inbox and WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-medium text-[#8B80FF] transition-colors hover:text-[#C0BAFF]"
                  >
                    Book another call
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Stepper */}
                  <div className="mb-8 flex items-center">
                    {steps.map((s, i) => {
                      const done = stepIndex > i;
                      const active = stepIndex === i;
                      return (
                        <div
                          key={s.id}
                          className={`flex items-center ${
                            i < steps.length - 1 ? "flex-1" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${
                                done || active
                                  ? "border-transparent bg-[#8B80FF] text-white"
                                  : "border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.04)] text-white/40"
                              }`}
                            >
                              <Icon
                                icon={done ? "tabler:check" : s.icon}
                                className="h-5 w-5"
                              />
                            </div>
                            <span
                              className={`hidden text-sm sm:block ${
                                active ? "text-white" : "text-white/45"
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div className="mx-3 h-px flex-1 bg-[rgba(139,128,255,0.25)]">
                              <div
                                className="h-px bg-[#8B80FF] transition-all duration-500"
                                style={{ width: stepIndex > i ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {/* ── Step: Date ── */}
                    {step === "date" && (
                      <motion.div
                        key="step-date"
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <h2 className="text-xl font-semibold">Pick a date</h2>
                        <p className="mt-1 text-sm font-light text-white/60">
                          Choose a day that works for your free discovery call.
                        </p>
                        <div className="mt-6">
                          <Calendar selected={form.date} onSelect={pickDate} />
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step: Time ── */}
                    {step === "time" && (
                      <motion.div
                        key="step-time"
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="text-xl font-semibold">
                              Pick a time
                            </h2>
                            <p className="mt-1 text-sm font-light text-white/60">
                              When works best on that day?
                            </p>
                          </div>
                        </div>

                        {/* Selected date chip */}
                        <button
                          type="button"
                          onClick={() => setStep("date")}
                          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.4)] bg-[rgba(139,128,255,0.08)] px-4 py-2 text-sm text-[#C0BAFF] transition-colors hover:border-[rgba(139,128,255,0.7)] hover:text-white"
                        >
                          <Icon icon="tabler:calendar" className="h-4 w-4" />
                          {formatDisplayDate(form.date)}
                          <Icon
                            icon="tabler:pencil"
                            className="h-3.5 w-3.5 opacity-70"
                          />
                        </button>

                        <motion.div
                          variants={container}
                          initial="hidden"
                          animate="show"
                          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                        >
                          {timeSlots.map((t) => {
                            const selected = form.time === t.value;
                            return (
                              <motion.button
                                key={t.value}
                                type="button"
                                variants={fieldIn}
                                onClick={() => pickTime(t.value)}
                                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                                  selected
                                    ? "border-[#8B80FF] bg-[rgba(139,128,255,0.18)]"
                                    : "border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.04)] hover:border-[rgba(139,128,255,0.55)]"
                                }`}
                              >
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#8B80FF] text-white">
                                  <Icon icon={t.icon} className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-white">
                                    {t.value.replace(/\s*\(.*\)/, "")}
                                  </span>
                                  <span className="text-xs text-white/55">
                                    {t.sub}
                                  </span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </motion.div>

                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => setStep("date")}
                            className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.3)] px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-[rgba(139,128,255,0.6)] hover:text-white"
                          >
                            <Icon
                              icon="tabler:arrow-left"
                              className="h-4 w-4"
                            />
                            Back
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step: Details ── */}
                    {step === "details" && (
                      <motion.div
                        key="step-details"
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <h2 className="text-xl font-semibold">Your details</h2>
                        <p className="mt-1 text-sm font-light text-white/60">
                          Last step — where should we send the confirmation?
                        </p>

                        {/* Selected date + time summary */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setStep("date")}
                            className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.4)] bg-[rgba(139,128,255,0.08)] px-4 py-2 text-sm text-[#C0BAFF] transition-colors hover:border-[rgba(139,128,255,0.7)] hover:text-white"
                          >
                            <Icon icon="tabler:calendar" className="h-4 w-4" />
                            {formatDisplayDate(form.date)}
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep("time")}
                            className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.4)] bg-[rgba(139,128,255,0.08)] px-4 py-2 text-sm text-[#C0BAFF] transition-colors hover:border-[rgba(139,128,255,0.7)] hover:text-white"
                          >
                            <Icon icon="tabler:clock" className="h-4 w-4" />
                            {form.time.replace(/\s*\(.*\)/, "")}
                          </button>
                        </div>

                        <motion.form
                          onSubmit={handleSubmit}
                          variants={container}
                          initial="hidden"
                          animate="show"
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
                                Full Name{" "}
                                <span className="text-red-400">*</span>
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
                              className="col-span-1 flex flex-col gap-2 sm:col-span-2"
                            >
                              <label htmlFor="topic" className="text-sm">
                                What would you like to discuss?
                              </label>
                              <textarea
                                id="topic"
                                name="topic"
                                rows={4}
                                value={form.topic}
                                onChange={update("topic")}
                                placeholder="A quick note on your project, goals or questions…"
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

                          <motion.div
                            variants={fieldIn}
                            className="mt-6 flex items-center justify-between gap-4"
                          >
                            <button
                              type="button"
                              onClick={() => setStep("time")}
                              className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.3)] px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-[rgba(139,128,255,0.6)] hover:text-white"
                            >
                              <Icon
                                icon="tabler:arrow-left"
                                className="h-4 w-4"
                              />
                              Back
                            </button>

                            <button
                              type="submit"
                              disabled={status === "loading"}
                              className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(135deg,#080B78,#00004D)] px-7 py-3.5 transition-all duration-700
                                shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
                                hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]
                                disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide text-white md:text-[15px]">
                                {status === "loading" ? (
                                  <>
                                    <Icon
                                      icon="tabler:loader-2"
                                      className="h-5 w-5 animate-spin"
                                    />
                                    Booking…
                                  </>
                                ) : (
                                  <>
                                    Book My Free Call
                                    <Icon
                                      icon="tabler:calendar-plus"
                                      className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                                    />
                                  </>
                                )}
                              </span>
                              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                            </button>
                          </motion.div>
                        </motion.form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
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
            {/* Testimonial */}
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
              <div className="mb-3 flex gap-1 text-[#C0BAFF]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} icon="tabler:star-filled" className="h-4 w-4" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                &ldquo;The discovery call was incredibly helpful. They asked all
                the right questions and had a proposal in my inbox before the
                day was over.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-white">Sarah K.</p>
              <p className="text-xs text-white/55">E-commerce Founder, UK</p>
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
              <h3 className="mb-1 text-sm font-semibold">
                Prefer to reach out directly?
              </h3>
              <p className="mb-5 text-xs text-white/55">
                We usually reply within 2–4 hours.
              </p>
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
                          <span className="text-[12px] text-white">
                            {c.value}
                          </span>
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
                      <Link
                        href={c.href}
                        target={c.target || "_self"}
                        className="block transition-opacity hover:opacity-80"
                      >
                        {inner}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How the call works ── */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 text-center"
          >
            <h2
              className="font-bold text-white"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                letterSpacing: "-0.02em",
              }}
            >
              How the call works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/55">
              No fluff — a focused conversation that leaves you with a clear
              plan.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                variants={cardIn}
                className="relative rounded-xl p-5 text-white"
                style={{
                  border: "1px solid rgba(139,128,255,0.3)",
                  background: "rgba(139,128,255,0.04)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                <span className="absolute right-4 top-4 text-2xl font-extrabold leading-none text-[rgba(139,128,255,0.25)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#8B80FF] text-white">
                  <Icon icon={step.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                  {step.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// ─── Animated calendar ─────────────────────────────────────────────────────────
function Calendar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [view, setView] = useState(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
  );
  // Direction for slide animation (-1 prev, 1 next)
  const [dir, setDir] = useState(0);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  const monthLabel = view.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function changeMonth(delta: number) {
    setDir(delta);
    setView(new Date(year, month + delta, 1));
  }

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthVariants: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -40 : 40,
      transition: { duration: 0.2, ease: EASE },
    }),
  };

  return (
    <div
      className="rounded-xl border border-[rgba(139,128,255,0.25)] bg-[rgba(139,128,255,0.04)] p-4 sm:p-5"
      style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={isCurrentMonth}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(139,128,255,0.3)] text-white/70 transition-colors hover:border-[rgba(139,128,255,0.6)] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Icon icon="tabler:chevron-left" className="h-5 w-5" />
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={monthLabel}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-semibold text-white"
          >
            {monthLabel}
          </motion.span>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(139,128,255,0.3)] text-white/70 transition-colors hover:border-[rgba(139,128,255,0.6)] hover:text-white"
        >
          <Icon icon="tabler:chevron-right" className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-xs font-medium text-white/40">
            {d}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={monthLabel}
          custom={dir}
          variants={monthVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="grid grid-cols-7 gap-1"
        >
          {cells.map((day, i) => {
            if (day === null) return <span key={`b-${i}`} />;

            const iso = toISO(year, month, day);
            const cellDate = new Date(year, month, day);
            const isPast = cellDate < today;
            const isToday = cellDate.getTime() === today.getTime();
            const isSelected = selected === iso;

            return (
              <motion.button
                key={iso}
                type="button"
                disabled={isPast}
                onClick={() => onSelect(iso)}
                whileTap={isPast ? undefined : { scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isPast ? 0.25 : 1,
                  scale: 1,
                  transition: {
                    delay: Math.min(i * 0.012, 0.25),
                    duration: 0.2,
                  },
                }}
                className={`relative flex aspect-square items-center justify-center rounded-lg text-sm transition-colors duration-150 ${
                  isSelected
                    ? "bg-[#8B80FF] font-semibold text-white"
                    : isPast
                      ? "cursor-not-allowed text-white/40"
                      : "text-white/80 hover:bg-[rgba(139,128,255,0.18)] hover:text-white"
                }`}
              >
                {day}
                {isToday && !isSelected && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#8B80FF]" />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
