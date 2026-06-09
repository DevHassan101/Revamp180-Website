"use client";
import { useEffect, useRef } from "react";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const range = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orangeFillRef = useRef<HTMLDivElement>(null);
  const checkerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<SVGPolygonElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const head1Ref = useRef<HTMLDivElement>(null);
  const head2Ref = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  const target = useRef(0);
  const smooth = useRef(0);

  useEffect(() => {
    let raf = 0;

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();

    const readTarget = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight;
      target.current = clamp01(-top / total);
    };

    const render = () => {
      smooth.current += (target.current - smooth.current) * 0.09;
      const p = smooth.current;
      const mob = isMobileRef.current;

      const move = easeInOutCubic(range(p, 0.12, 0.4));
      const vanish = easeInOutCubic(range(p, 0.86, 1));

      if (globeRef.current) {
        if (mob) {
          const topPct = 50 - move * 14;
          globeRef.current.style.left = `50%`;
          globeRef.current.style.top = `${topPct}%`;
          globeRef.current.style.transform = `translate(-50%, -50%)`;
          globeRef.current.style.opacity = `${1 - vanish}`;
        } else {
          const leftPct = 50 - move * 46 - vanish * 24;
          const scale = 1 + move * 0.05;
          globeRef.current.style.left = `${leftPct}%`;
          globeRef.current.style.top = `50%`;
          globeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
          globeRef.current.style.opacity = `${1 - vanish}`;
        }
      }

      const beamP = easeInOutCubic(range(p, 0.3, 0.55));
      const beamOut = easeInOutCubic(range(p, 0.58, 0.72));
      if (beamRef.current) {
        if (mob) {
          beamRef.current.style.opacity = "0";
        } else {
          const leftPct = 50 - move * 46 - vanish * 24;
          const apexX = leftPct * 15.36 + 150;
          const rightH = 30 + beamP * 520;
          beamRef.current.setAttribute(
            "points",
            `${apexX},372 ${apexX},396 1700,${420 + rightH} 1700,${420 - rightH}`
          );
          beamRef.current.style.opacity = `${beamP * (1 - beamOut)}`;
        }
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
        // both mobile and desktop: translateY(calc(-50% + offset)) since top:50% is used everywhere
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
    window.addEventListener("resize", checkMobile);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readTarget);
      window.removeEventListener("resize", readTarget);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const font = "var(--font-poppins), 'Poppins', sans-serif";

  const stats = [
    { num: "50+", label: "Brands Transformed" },
    { num: "5+", label: "Years of Impact" },
    { num: "∞", label: "Room to Grow" },
  ];

  return (
    <>
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

          {/* Dot grid — hidden on mobile */}
          <div
            ref={checkerRef}
            className="vm-checker"
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 252,
              height: 252,
              opacity: 0,
              zIndex: 3,
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gridTemplateRows: "repeat(7, 1fr)",
              gap: 8,
              willChange: "opacity",
            }}
          >
            {[...Array(49)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  backgroundColor: "rgba(147,197,253,0.55)",
                  visibility: i % 3 === 2 ? "hidden" : "visible",
                }}
              />
            ))}
          </div>

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
                Vision &amp; Mission
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
          .about-stars {
            background-image:
              radial-gradient(circle 1px   at  8% 12%, rgba(255,255,255,0.80) 0%, transparent 100%),
              radial-gradient(circle 1px   at 22% 38%, rgba(255,255,255,0.50) 0%, transparent 100%),
              radial-gradient(circle 1.5px at 38%  6%, rgba(255,255,255,0.90) 0%, transparent 100%),
              radial-gradient(circle 1px   at 55% 20%, rgba(255,255,255,0.60) 0%, transparent 100%),
              radial-gradient(circle 2px   at 68% 14%, rgba(147,197,253,0.70) 0%, transparent 100%),
              radial-gradient(circle 1px   at 82% 30%, rgba(255,255,255,0.50) 0%, transparent 100%),
              radial-gradient(circle 1px   at 92%  8%, rgba(255,255,255,0.80) 0%, transparent 100%),
              radial-gradient(circle 1px   at 12% 55%, rgba(255,255,255,0.40) 0%, transparent 100%),
              radial-gradient(circle 1px   at 48% 62%, rgba(255,255,255,0.60) 0%, transparent 100%),
              radial-gradient(circle 1.5px at 78% 58%, rgba(147,197,253,0.50) 0%, transparent 100%),
              radial-gradient(circle 1px   at  3% 80%, rgba(255,255,255,0.70) 0%, transparent 100%),
              radial-gradient(circle 1px   at 32% 82%, rgba(255,255,255,0.40) 0%, transparent 100%),
              radial-gradient(circle 1px   at 62% 78%, rgba(255,255,255,0.60) 0%, transparent 100%),
              radial-gradient(circle 1px   at 88% 72%, rgba(255,255,255,0.50) 0%, transparent 100%),
              radial-gradient(circle 2px   at 45% 48%, rgba(165,180,252,0.50) 0%, transparent 100%),
              radial-gradient(circle 1px   at 18% 25%, rgba(255,255,255,0.30) 0%, transparent 100%),
              radial-gradient(circle 1px   at 72% 45%, rgba(255,255,255,0.40) 0%, transparent 100%),
              radial-gradient(circle 1px   at 95% 65%, rgba(255,255,255,0.50) 0%, transparent 100%),
              radial-gradient(circle 1px   at 58% 92%, rgba(255,255,255,0.30) 0%, transparent 100%),
              radial-gradient(circle 1.5px at 28% 70%, rgba(147,197,253,0.40) 0%, transparent 100%);
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

          /* ── Mobile overrides ── */
          @media (max-width: 767px) {
            .vm-globe {
              width: min(300px, 72vw) !important;
              height: min(300px, 72vw) !important;
            }
            .vm-checker { display: none !important; }

            /* head1 sits in the lower half while globe is still visible above */
            .vm-head1 {
              left: 0 !important;
              top: 62% !important;
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 20px !important;
              box-sizing: border-box !important;
            }
            /* head2 is centered — globe is gone by the time it appears */
            .vm-head2 {
              left: 0 !important;
              top: 50% !important;
              width: 100% !important;
              max-width: 100% !important;
              padding: 0 20px !important;
              box-sizing: border-box !important;
            }

            .vm-h1-title  { font-size: clamp(1.55rem, 5.5vw, 2.2rem); }
            .vm-h2-title  { font-size: clamp(1.25rem, 4.8vw, 1.9rem); }
            .vm-body-text { font-size: 13px; margin-top: 12px !important; }
            .vm-stats     { gap: 20px !important; margin-top: 18px !important; }
            .vm-tags      { margin-top: 16px !important; }
          }
        `}</style>
      </div>
    </>
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
