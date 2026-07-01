"use client";
import { useEffect, useRef } from "react";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

const font = "var(--font-poppins), 'Poppins', sans-serif";

const stats = [
  { num: "50+", label: "Brands Transformed" },
  { num: "6+", label: "Years of Impact" },
  { num: "∞", label: "Room to Grow" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Default export: render BOTH the desktop and mobile experiences, toggling
// between them purely with CSS media queries. This keeps SSR output stable
// (no hydration mismatch) while giving mobile a completely separate design.
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <div className="vm-desktop-root">
        <VisionMissionDesktop />
      </div>
      <div className="vm-mobile-root">
        <VisionMissionMobile />
      </div>
      <style>{`
        /* Desktop by default; swap to the mobile design under 768px. */
        .vm-mobile-root { display: none; }
        @media (max-width: 767px) {
          .vm-desktop-root { display: none; }
          .vm-mobile-root { display: block; }
        }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP / TABLET — original scroll-driven design (unchanged behaviour).
// ─────────────────────────────────────────────────────────────────────────────
function VisionMissionDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orangeFillRef = useRef<HTMLDivElement>(null);
  const checkerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<SVGPolygonElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const head1Ref = useRef<HTMLDivElement>(null);
  const head2Ref = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const target = useRef(0);
  const smooth = useRef(0);

  useEffect(() => {
    let raf = 0;

    const readTarget = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      target.current = clamp01(-top / total);
    };

    const render = () => {
      const contEl = containerRef.current;
      // Skip work while this variant is hidden (display:none → offsetParent null).
      if (!contEl || contEl.offsetParent === null) {
        raf = requestAnimationFrame(render);
        return;
      }

      smooth.current += (target.current - smooth.current) * 0.09;
      const p = smooth.current;

      const move = easeInOutCubic(range(p, 0.12, 0.4));
      const vanish = easeInOutCubic(range(p, 0.86, 1));

      if (globeRef.current) {
        const leftPct = 50 - move * 46 - vanish * 24;
        const scale = 1 + move * 0.05;
        globeRef.current.style.left = `${leftPct}%`;
        globeRef.current.style.top = `50%`;
        globeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        globeRef.current.style.opacity = `${1 - vanish}`;
      }

      const beamP = easeInOutCubic(range(p, 0.3, 0.55));
      const beamOut = easeInOutCubic(range(p, 0.58, 0.72));
      if (beamRef.current) {
        const leftPct = 50 - move * 46 - vanish * 24;
        const apexX = leftPct * 15.36 + 150;
        const rightH = 30 + beamP * 520;
        beamRef.current.setAttribute(
          "points",
          `${apexX},372 ${apexX},396 1700,${420 + rightH} 1700,${420 - rightH}`
        );
        beamRef.current.style.opacity = `${beamP * (1 - beamOut)}`;
      }

      const fillP = easeInOutCubic(range(p, 0.58, 0.74));
      if (orangeFillRef.current) orangeFillRef.current.style.opacity = `${fillP}`;

      const checkP = range(p, 0.6, 0.8);
      if (checkerRef.current) checkerRef.current.style.opacity = `${checkP * 0.4}`;

      const h1In = easeInOutCubic(range(p, 0.42, 0.54));
      const h1Out = easeInOutCubic(range(p, 0.62, 0.7));
      const h1 = h1In * (1 - h1Out);
      if (head1Ref.current) {
        head1Ref.current.style.opacity = `${h1}`;
        head1Ref.current.style.transform = `translateY(calc(-50% + ${(1 - h1In) * 30 - h1Out * 24}px))`;
      }

      const h2 = easeInOutCubic(range(p, 0.7, 0.9));
      if (head2Ref.current) {
        head2Ref.current.style.opacity = `${h2}`;
        head2Ref.current.style.transform = `translateY(calc(-50% + ${(1 - h2) * 34}px))`;
      }

      if (hintRef.current) hintRef.current.style.opacity = `${1 - range(p, 0, 0.05)}`;

      raf = requestAnimationFrame(render);
    };

    readTarget();
    smooth.current = target.current;
    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[350vh] xl:h-[600vh]">
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Star field */}
        <div
          className="about-stars"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        />

        {/* Deep-blue flood */}
        <div
          ref={orangeFillRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            zIndex: 1,
            willChange: "opacity",
          }}
        />

        {/* Beam / cone */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
          viewBox="0 0 1536 768"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00004D" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#00004D" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#00004D" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <polygon
            ref={beamRef}
            points="918,372 918,396 1700,450 1700,390"
            fill="url(#beamGrad)"
            style={{ opacity: 0, willChange: "opacity" }}
          />
        </svg>

        {/* Globe + glow ring */}
        <div
          ref={globeRef}
          className="vm-globe"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1)",
            zIndex: 4,
            willChange: "transform, left, top, opacity",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -40,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #00004D 0%,rgba(0, 0, 0, 1) 100%)",
              filter: "blur(24px)",
              zIndex: 0,
            }}
          />
          <Globe />
        </div>

        {/* Headline 1 — Vision */}
        <div
          ref={head1Ref}
          className="vm-head vm-head1"
          style={{
            position: "absolute",
            zIndex: 5,
            opacity: 0,
            willChange: "opacity, transform",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, marginBottom: 10 }}>
            <div
              style={{
                width: 28,
                height: 2,
                background: "linear-gradient(90deg, #8B80FF 0%, #C0BAFF 50%, #8B80FF 100%)",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                color: "rgba(147,197,253,0.9)",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                fontFamily: font,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Our Vision
            </p>
          </div>

          <h1
            className="vm-h1-title"
            style={{
              color: "#fff",
              fontFamily: font,
              fontWeight: 700,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-0.03em",
              textShadow: "0 0 60px rgba(99,102,241,0.4)",
            }}
          >
            Every brand deserves to
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #8B80FF 0%, #C0BAFF 50%, #8B80FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              } as React.CSSProperties}
            >
              grow without limits.
            </span>
          </h1>

          <p
            className="vm-body-text"
            style={{
              color: "rgba(203,213,225,0.7)",
              fontFamily: font,
              fontWeight: 400,
              marginTop: 17,
              lineHeight: 1.75,
              maxWidth: 480,
            }}
          >
            We turn ambitious ideas into unstoppable brands through bold
            strategy, purposeful design, and technology that scales.
          </p>

          <div className="vm-tags" style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
            {["Strategy", "Design", "Technology", "Growth"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "5px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(99,102,241,0.35)",
                  background: "rgba(99,102,241,0.08)",
                  color: "rgba(165,180,252,0.85)",
                  fontSize: 11,
                  fontFamily: font,
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Headline 2 — Mission */}
        <div
          ref={head2Ref}
          className="vm-head vm-head2"
          style={{
            position: "absolute",
            zIndex: 5,
            opacity: 0,
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                background: "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                color: "rgba(147,197,253,0.90)",
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: font,
                fontWeight: 600,
                margin: 0,
              }}
            >
              Our Mission
            </p>
          </div>

          <h2
            className="vm-h2-title"
            style={{
              color: "#fff",
              fontFamily: font,
              fontWeight: 700,
              lineHeight: 1.3,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            We exist to revamp how businesses grow{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              } as React.CSSProperties}
            >
              turning bold ideas into digital realities.
            </span>
          </h2>

          <p
            className="vm-body-text"
            style={{
              color: "rgba(203,213,225,0.8)",
              fontFamily: font,
              fontWeight: 400,
              marginTop: 18,
              lineHeight: 1.75,
            }}
          >
            Our mission is to make every client&apos;s brand unstoppable. Through
            strategy, design, and technology we craft solutions that scale,
            convert, and leave a lasting impact.
          </p>

          <div className="vm-stats" style={{ display: "flex", gap: 36, marginTop: 30 }}>
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div
                  style={{
                    color: "#a5b4fc",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.8rem)",
                    fontFamily: font,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    color: "rgba(148,163,184,0.65)",
                    fontSize: 12,
                    fontFamily: font,
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 5,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              color: "rgba(148,163,184,0.45)",
              fontSize: 10,
              letterSpacing: "0.18em",
              fontFamily: font,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Scroll
          </span>
          <div className="about-scroll-arrow" />
        </div>
      </div>

      <style>{`
        @keyframes aboutScrollArrow {
          0%, 100% { opacity: 0.35; transform: rotate(45deg) translate(0, 0); }
          50%       { opacity: 0.85; transform: rotate(45deg) translate(3px, 3px); }
        }
        .about-scroll-arrow {
          width: 10px;
          height: 10px;
          border-right: 1.5px solid rgba(148,163,184,0.45);
          border-bottom: 1.5px solid rgba(148,163,184,0.45);
          animation: aboutScrollArrow 1.6s ease-in-out infinite;
        }
        /* ── Globe size ── */
        .vm-globe { width: 540px; height: 540px; }

        /* ── Desktop text positioning ── */
        .vm-head1 {
          left: 38%;
          top: 50%;
          max-width: 680px;
          padding-right: 2rem;
        }
        .vm-head2 {
          left: 30%;
          top: 50%;
          max-width: 700px;
          padding-right: 2rem;
        }
        .vm-h1-title  { font-size: clamp(2rem, 2.8vw, 3.4rem); }
        .vm-h2-title  { font-size: clamp(1.5rem, 2.9vw, 2.8rem); }
        .vm-body-text { font-size: 15px; }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — dedicated design.
// Globe fades in and stays as a dimmed background. Scroll-driven: the Vision
// text rises from below over the globe; scrolling further sends it up and out
// while the Mission text rises in from below. After that the section releases
// and normal scrolling continues.
// ─────────────────────────────────────────────────────────────────────────────
function VisionMissionMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const target = useRef(0);
  const smooth = useRef(0);

  useEffect(() => {
    let raf = 0;

    const readTarget = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      target.current = clamp01(-top / total);
    };

    const render = () => {
      const el = containerRef.current;
      // Skip while hidden (display:none → offsetParent null on desktop).
      if (!el || el.offsetParent === null) {
        raf = requestAnimationFrame(render);
        return;
      }

      smooth.current += (target.current - smooth.current) * 0.1;
      const p = smooth.current;

      // Globe: visible immediately the moment the section is reached (no scroll
      // fade-in — that left the screen blank until you'd scrolled in). Just a
      // gentle upward drift + slight scale as the text rises over it.
      const gDrift = easeInOutCubic(range(p, 0.14, 1));
      if (globeRef.current) {
        globeRef.current.style.opacity = "1";
        globeRef.current.style.transform = `translate(-50%, calc(-50% - ${gDrift * 7}vh)) scale(${0.98 + gDrift * 0.04})`;
      }

      // Text 1 (Vision): rises from below, holds, then exits upward.
      const in1 = easeInOutCubic(range(p, 0.16, 0.36));
      const out1 = easeInOutCubic(range(p, 0.48, 0.6));
      const v1 = in1 * (1 - out1);
      if (t1Ref.current) {
        t1Ref.current.style.opacity = `${v1}`;
        t1Ref.current.style.transform = `translateY(calc(-50% + ${(1 - in1) * 70 - out1 * 52}px))`;
      }

      // Text 2 (Mission): rises from below as text 1 leaves; rests at the end.
      const in2 = easeInOutCubic(range(p, 0.58, 0.8));
      if (t2Ref.current) {
        t2Ref.current.style.opacity = `${in2}`;
        t2Ref.current.style.transform = `translateY(calc(-50% + ${(1 - in2) * 70}px))`;
      }

      // Scrim dims the globe whenever text is on screen (keeps it readable).
      if (scrimRef.current) {
        scrimRef.current.style.opacity = `${Math.max(v1, in2) * 0.6}`;
      }

      if (hintRef.current) hintRef.current.style.opacity = `${1 - range(p, 0, 0.06)}`;

      raf = requestAnimationFrame(render);
    };

    readTarget();
    smooth.current = target.current;
    window.addEventListener("scroll", readTarget, { passive: true });
    window.addEventListener("resize", readTarget);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Star field */}
        <div
          className="about-stars"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        />

        {/* Globe (background) */}
        <div
          ref={globeRef}
          className="vm-m-globe"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.86)",
            opacity: 0,
            zIndex: 1,
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -30,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, #00004D 0%, rgba(0,0,0,1) 100%)",
              filter: "blur(22px)",
              zIndex: 0,
            }}
          />
          <Globe />
        </div>

        {/* Dimming scrim over the globe (behind text) */}
        <div
          ref={scrimRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            opacity: 0,
            pointerEvents: "none",
            willChange: "opacity",
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,0,12,0.45) 0%, rgba(0,0,12,0.86) 72%)",
          }}
        />

        {/* Text 1 — Vision */}
        <div
          ref={t1Ref}
          className="vm-m-text"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            zIndex: 5,
            opacity: 0,
            padding: "0 24px",
            boxSizing: "border-box",
            textAlign: "center",
            willChange: "opacity, transform",
          }}
        >
          <div className="vm-m-eyebrow">
            <span className="vm-m-line" />
            <span className="vm-m-kicker">Our Vision</span>
          </div>

          <h2 className="vm-m-title">
            Every brand deserves to{" "}
            <span className="vm-m-grad">grow without limits.</span>
          </h2>

          <p className="vm-m-body">
            We turn ambitious ideas into unstoppable brands through bold
            strategy, purposeful design, and technology that scales.
          </p>

          <div className="vm-m-tags">
            {["Strategy", "Design", "Technology", "Growth"].map((tag) => (
              <span key={tag} className="vm-m-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Text 2 — Mission */}
        <div
          ref={t2Ref}
          className="vm-m-text"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            zIndex: 5,
            opacity: 0,
            padding: "0 24px",
            boxSizing: "border-box",
            textAlign: "center",
            willChange: "opacity, transform",
          }}
        >
          <div className="vm-m-eyebrow">
            <span className="vm-m-line" />
            <span className="vm-m-kicker">Our Mission</span>
          </div>

          <h2 className="vm-m-title">
            We revamp how businesses grow{" "}
            <span className="vm-m-grad">
              turning bold ideas into digital realities.
            </span>
          </h2>

          <p className="vm-m-body">
            We make every client&apos;s brand unstoppable — crafting solutions
            that scale, convert, and leave a lasting impact.
          </p>

          <div className="vm-m-stats">
            {stats.map(({ num, label }) => (
              <div key={label} className="vm-m-stat">
                <div className="vm-m-stat-num">{num}</div>
                <div className="vm-m-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              color: "rgba(148,163,184,0.5)",
              fontSize: 10,
              letterSpacing: "0.18em",
              fontFamily: font,
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Scroll
          </span>
          <div className="about-scroll-arrow" />
        </div>
      </div>

      <style>{`
        @keyframes aboutScrollArrow {
          0%, 100% { opacity: 0.35; transform: rotate(45deg) translate(0, 0); }
          50%       { opacity: 0.85; transform: rotate(45deg) translate(3px, 3px); }
        }
        .about-scroll-arrow {
          width: 10px;
          height: 10px;
          border-right: 1.5px solid rgba(148,163,184,0.45);
          border-bottom: 1.5px solid rgba(148,163,184,0.45);
          animation: aboutScrollArrow 1.6s ease-in-out infinite;
        }

        .vm-m-globe {
          width: min(320px, 80vw);
          height: min(320px, 80vw);
        }

        .vm-m-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .vm-m-line {
          width: 26px;
          height: 2px;
          border-radius: 2px;
          flex-shrink: 0;
          background: linear-gradient(90deg, #8B80FF 0%, #C0BAFF 50%, #8B80FF 100%);
        }
        .vm-m-kicker {
          color: rgba(147,197,253,0.9);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          font-family: ${font};
          font-weight: 600;
        }
        .vm-m-title {
          color: #fff;
          font-family: ${font};
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
          letter-spacing: -0.02em;
          font-size: clamp(1.6rem, 7vw, 2.3rem);
          text-shadow: 0 0 50px rgba(99,102,241,0.4);
        }
        .vm-m-grad {
          background: linear-gradient(90deg, #8B80FF 0%, #C0BAFF 50%, #8B80FF 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .vm-m-body {
          color: rgba(203,213,225,0.72);
          font-family: ${font};
          font-weight: 400;
          font-size: 13.5px;
          line-height: 1.7;
          margin: 14px auto 0;
          max-width: 30rem;
        }
        .vm-m-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
        }
        .vm-m-tag {
          padding: 5px 13px;
          border-radius: 999px;
          border: 1px solid rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.08);
          color: rgba(165,180,252,0.85);
          font-size: 10.5px;
          font-family: ${font};
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .vm-m-stats {
          display: flex;
          justify-content: center;
          gap: 26px;
          margin-top: 24px;
        }
        .vm-m-stat-num {
          color: #a5b4fc;
          font-family: ${font};
          font-weight: 700;
          line-height: 1;
          font-size: 1.5rem;
        }
        .vm-m-stat-label {
          color: rgba(148,163,184,0.65);
          font-family: ${font};
          font-weight: 400;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}

function Globe() {
  return (
    <img
      src="/images/globe.png"
      alt="Globe"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: "100%",
        filter:
          "drop-shadow(0 0 36px rgba(99,102,241,0.65)) drop-shadow(0 0 70px rgba(59,130,246,0.3))",
      }}
    />
  );
}
