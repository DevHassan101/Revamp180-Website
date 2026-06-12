"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import CTAButton from "@/components/CTAButton";

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

const services = [
  "Website Revamping",
  "Web Design & Development",
  "App Design & Development",
  "Branding & UI/UX Design",
  "Social Media Management",
  "Video Editing",
  "Not sure yet — need advice",
];

const budgets = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $20,000",
  "$20,000+",
];

const timelines = [
  "Flexible",
  "ASAP",
  "Within 2 weeks",
  "1 month",
  "2 – 3 months",
  "3+ months",
];

const steps = [
  { id: 1, title: "About You", icon: "tabler:user" },
  { id: 2, title: "Your Project", icon: "tabler:bulb" },
  { id: 3, title: "Budget & Timeline", icon: "tabler:wallet" },
];

const trust = [
  {
    icon: "tabler:file-text",
    title: "Fixed-price quotes",
    sub: "Written, no surprises",
  },
  {
    icon: "tabler:code",
    title: "Clean, documented code",
    sub: "Built to last and scale",
  },
  {
    icon: "tabler:message-2",
    title: "Direct communication",
    sub: "Talk to the developer, not a manager",
  },
  {
    icon: "tabler:shield-check",
    title: "90-day bug guarantee",
    sub: "We stand behind our work",
  },
];

const stats = [
  { value: "445+", label: "Projects" },
  { value: "6+", label: "Years" },
  { value: "97%", label: "Satisfaction" },
  { value: "24h", label: "Quote turnaround" },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  business: "",
  service: "",
  description: "",
  features: "",
  budget: "",
  timeline: "",
  company: "", // honeypot
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "rounded-lg border border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.04)] px-3 py-2 text-white placeholder:text-white/40 transition-colors duration-200 focus:border-[rgba(139,128,255,0.6)] focus:outline-none focus:ring-2 focus:ring-[rgba(139,128,255,0.25)]";

export default function QuotePage() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
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

  const setValue = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Returns an error message for the step, or "" if the step is valid.
  function stepError(s: number) {
    if (s === 1) {
      if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim())
        return "Please fill in the required fields before continuing.";
      if (!emailRegex.test(form.email.trim()))
        return "Please enter a valid email address.";
    }
    if (s === 2) {
      if (!form.service.trim() || !form.description.trim())
        return "Please fill in the required fields before continuing.";
    }
    return "";
  }

  function next() {
    const msg = stepError(step);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, 3));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    // Re-validate earlier steps (user may have edited fields after advancing).
    const msg = stepError(1) || stepError(2);
    if (msg) {
      setError(msg);
      setStep(stepError(1) ? 1 : 2);
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/quote", {
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
      setStep(1);
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
            Written, fixed-price quote in 24 hours
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
            Tell Us About{" "}
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
            The more we know, the more accurate your quote. Share the details
            below and you&apos;ll get a written, fixed-price quote — no
            surprises.
          </motion.p>
        </div>
      </section>

      {/* ── Content grid ── */}
      <section className="px-4">
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
                    <Icon icon="tabler:check" className="h-8 w-8" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">Request received!</h3>
                  <p className="max-w-sm text-sm text-white/60">
                    Thanks for the details. We&apos;ll review your project and
                    send a written, fixed-price quote within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-medium text-[#8B80FF] transition-colors hover:text-[#C0BAFF]"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Stepper */}
                  <div className="mb-8 flex items-center">
                    {steps.map((s, i) => {
                      const done = step > s.id;
                      const active = step === s.id;
                      return (
                        <div
                          key={s.id}
                          className={`flex items-center ${
                            i < steps.length - 1 ? "flex-1" : ""
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
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
                              className={`hidden whitespace-nowrap text-xs sm:block ${
                                active ? "text-white" : "text-white/45"
                              }`}
                            >
                              {s.title}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div className="mx-2 h-px flex-1 -translate-y-2.5 bg-[rgba(139,128,255,0.25)]">
                              <div
                                className="h-px bg-[#8B80FF] transition-all duration-500"
                                style={{ width: step > s.id ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
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

                    <AnimatePresence mode="wait">
                      {/* ── Step 1 ── */}
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          variants={container}
                          initial="hidden"
                          animate="show"
                          exit={{
                            opacity: 0,
                            x: -24,
                            transition: { duration: 0.25 },
                          }}
                        >
                          <h2 className="text-xl font-semibold">About you</h2>
                          <p className="mt-1 text-sm font-light text-white/60">
                            So we know who we&apos;re talking to.
                          </p>

                          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Full Name" required>
                              <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={update("fullName")}
                                placeholder="John Doe"
                                className={inputClass}
                              />
                            </Field>
                            <Field label="Email" required>
                              <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={update("email")}
                                placeholder="you@company.com"
                                className={inputClass}
                              />
                            </Field>
                            <Field label="Phone" required>
                              <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={update("phone")}
                                placeholder="+966-502624196"
                                className={inputClass}
                              />
                            </Field>
                            <Field label="Company / Business">
                              <input
                                type="text"
                                name="business"
                                value={form.business}
                                onChange={update("business")}
                                placeholder="Acme Inc."
                                className={inputClass}
                              />
                            </Field>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 2 ── */}
                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          variants={container}
                          initial="hidden"
                          animate="show"
                          exit={{
                            opacity: 0,
                            x: -24,
                            transition: { duration: 0.25 },
                          }}
                        >
                          <h2 className="text-xl font-semibold">
                            Your project
                          </h2>
                          <p className="mt-1 text-sm font-light text-white/60">
                            Tell us what you&apos;re looking to build.
                          </p>

                          <div className="mt-6 grid grid-cols-1 gap-4">
                            <Field label="Service" required>
                              <ServiceDropdown
                                value={form.service}
                                onChange={(value) => setValue("service", value)}
                              />
                            </Field>

                            <Field label="Project Description" required>
                              <textarea
                                name="description"
                                rows={4}
                                value={form.description}
                                onChange={update("description")}
                                placeholder="What are you building, who is it for, and what problem does it solve?"
                                className={`${inputClass} resize-none`}
                              />
                            </Field>

                            <Field label="Key Features / Requirements">
                              <textarea
                                name="features"
                                rows={3}
                                value={form.features}
                                onChange={update("features")}
                                placeholder="e.g. user accounts, payments, dashboard, multi-language…"
                                className={`${inputClass} resize-none`}
                              />
                            </Field>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 3 ── */}
                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          variants={container}
                          initial="hidden"
                          animate="show"
                          exit={{
                            opacity: 0,
                            x: -24,
                            transition: { duration: 0.25 },
                          }}
                        >
                          <h2 className="text-xl font-semibold">
                            Budget &amp; timeline
                          </h2>
                          <p className="mt-1 text-sm font-light text-white/60">
                            This helps us scope the right solution for you.
                          </p>

                          <div className="mt-6 flex flex-col gap-6">
                            <div>
                              <p className="mb-3 text-sm">Budget range</p>
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {budgets.map((b) => (
                                  <Pill
                                    key={b}
                                    label={b}
                                    selected={form.budget === b}
                                    onClick={() => setValue("budget", b)}
                                  />
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="mb-3 text-sm">Timeline</p>
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {timelines.map((t) => (
                                  <Pill
                                    key={t}
                                    label={t}
                                    selected={form.timeline === t}
                                    onClick={() => setValue("timeline", t)}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
                      >
                        <Icon
                          icon="tabler:alert-circle"
                          className="h-4 w-4 flex-shrink-0"
                        />
                        {error}
                      </motion.p>
                    )}

                    {/* ── Nav buttons ── */}
                    <div className="mt-7 flex items-center justify-between gap-4">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={back}
                          className="inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.3)] px-5 py-3 text-sm font-medium text-white/80 transition-colors hover:border-[rgba(139,128,255,0.6)] hover:text-white"
                        >
                          <Icon icon="tabler:arrow-left" className="h-4 w-4" />
                          Back
                        </button>
                      ) : (
                        <span />
                      )}

                      {step < 3 ? (
                        <button
                          key="next"
                          type="button"
                          onClick={next}
                          className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(135deg,#080B78,#00004D)] px-7 py-3 transition-all duration-700
                            shadow-[0_0_0_1px_rgba(53,32,220,0.25),0_4px_24px_rgba(53,32,220,0.25),0_2px_8px_rgba(0,0,0,0.4)]
                            hover:shadow-[0_0_14px_rgba(180,190,255,0.50),0_0_17px_rgba(255,255,255,0.25)]"
                        >
                          <span className="relative z-10 flex items-center gap-2 text-sm font-semibold tracking-wide text-white md:text-[15px]">
                            Continue
                            <Icon
                              icon="tabler:arrow-right"
                              className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1"
                            />
                          </span>
                          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                        </button>
                      ) : (
                        <button
                          key="submit"
                          type="submit"
                          disabled={status === "loading"}
                          className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[linear-gradient(135deg,#080B78,#00004D)] px-7 py-3 transition-all duration-700
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
                                Sending…
                              </>
                            ) : (
                              <>
                                Get My Quote
                                <Icon
                                  icon="tabler:send"
                                  className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                                />
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                        </button>
                      )}
                    </div>
                  </form>
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
            {/* Why us */}
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
                Why work with us
              </h3>
              <div className="flex flex-col gap-4">
                {trust.map((item) => (
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

            {/* Stats */}
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
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span
                      className="text-2xl font-extrabold"
                      style={{ color: "#C0BAFF" }}
                    >
                      {s.value}
                    </span>
                    <span className="text-xs text-white/60">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Book a call instead */}
            {/* <motion.div
              variants={cardIn}
              className="rounded-xl p-6 text-white"
              style={{
                border: "1px solid rgba(139,128,255,0.3)",
                background: "rgba(139,128,255,0.04)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <h3 className="text-sm font-semibold">Prefer to talk it through?</h3>
              <p className="mt-1 text-sm text-white/60">
                Book a free 30-minute call with our lead developer instead.
              </p>
              <Link
                href="/consultation"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(139,128,255,0.4)] bg-[rgba(139,128,255,0.08)] px-4 py-2 text-sm font-medium text-[#C0BAFF] transition-colors hover:border-[rgba(139,128,255,0.7)] hover:text-white"
              >
                <Icon icon="tabler:calendar" className="h-4 w-4" />
                Book a free call
              </Link>
              <Link
                href="tel:+966502624196"
                className="mt-3 flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Icon icon="tabler:phone" className="h-4 w-4 text-[#8B80FF]" />
                +966-502624196
              </Link>
            </motion.div> */}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center py-24"
        >
          <h2
            className="font-bold text-white"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Prefer to talk it through?
          </h2>
          <p className="max-w-2xl leading-relaxed text-white/55">
            Book a free 30-minute call with our lead developer instead.
          </p>
          <CTAButton href="/consultation" label="Get a Consultation" />
        </motion.div>
      </section>
    </main>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fieldIn} className="flex flex-col gap-2">
      <label className="text-sm">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </motion.div>
  );
}

// ─── Custom themed service dropdown ───────────────────────────────────────────
function ServiceDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
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
      <input type="hidden" name="service" value={value} required />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-lg border bg-[rgba(139,128,255,0.04)] px-3 py-2 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[rgba(139,128,255,0.25)] ${
          open
            ? "border-[rgba(139,128,255,0.6)]"
            : "border-[rgba(139,128,255,0.3)] hover:border-[rgba(139,128,255,0.45)]"
        } ${value ? "text-white" : "text-white/40"}`}
      >
        <span>{value || "Select a service"}</span>
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
            {services.map((s) => {
              const active = s === value;
              return (
                <li key={s} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(s);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ${
                      active
                        ? "bg-[rgba(139,128,255,0.18)] text-white"
                        : "text-white/75 hover:bg-[rgba(139,128,255,0.1)] hover:text-white"
                    }`}
                  >
                    <span>{s}</span>
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

// ─── Selectable pill (budget / timeline) ───────────────────────────────────────
function Pill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2.5 text-center text-sm transition-all duration-200 ${
        selected
          ? "border-[#8B80FF] bg-[rgba(139,128,255,0.18)] text-white"
          : "border-[rgba(139,128,255,0.3)] bg-[rgba(139,128,255,0.04)] text-white/70 hover:border-[rgba(139,128,255,0.55)] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
