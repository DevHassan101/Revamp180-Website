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
      smooth.current += (target.current - smooth.current) * 0.09;
      const p = smooth.current;

      const move = easeInOutCubic(range(p, 0.12, 0.4));
      const vanish = easeInOutCubic(range(p, 0.86, 1));
      const leftPct = 50 - move * 46 - vanish * 24;
      const scale = 1 + move * 0.05;
      if (globeRef.current) {
        globeRef.current.style.left = `${leftPct}%`;
        globeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        globeRef.current.style.opacity = `${1 - vanish}`;
      }

      const beamP = easeInOutCubic(range(p, 0.3, 0.55));
      const beamOut = easeInOutCubic(range(p, 0.58, 0.72));
      if (beamRef.current) {
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

  const font = "var(--font-poppins), 'Poppins', sans-serif";

  const stats = [
    { num: "50+", label: "Brands Transformed" },
    { num: "5+", label: "Years of Impact" },
    { num: "∞", label: "Room to Grow" },
  ];

  return (
    <>
      <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
        {/* ── Sticky viewport ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            background:
              "linear-gradient(160deg, rgba(8,11,120,0.35) 0%, rgba(0,0,0,1) 55%)",
          }}
        >
          {/* Star field — pure CSS */}
          <div
            className="about-stars"
            style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
          />

          {/* Deep-blue flood (replaces orange) */}
          <div
            ref={orangeFillRef}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle, rgba(8,11,120,1) 0%, rgba(0,0,0,1) 100%)",
              opacity: 0,
              zIndex: 1,
              willChange: "opacity",
            }}
          />

          {/* Dot grid — top right corner */}
          <div
            ref={checkerRef}
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

          {/* Beam / cone with gradient */}
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
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
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
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1)",
              width: 540,
              height: 540,
              zIndex: 4,
              willChange: "transform, left, opacity",
            }}
          >
            {/* Ambient glow sits behind the globe image */}
            <div
              style={{
                position: "absolute",
                inset: -40,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.32) 0%, rgba(59,130,246,0.14) 45%, transparent 70%)",
                filter: "blur(24px)",
                zIndex: 0,
              }}
            />
            <Globe />
          </div>

          {/* Headline 1 — fades in inside the wedge */}
          <div
            ref={head1Ref}
            style={{
              position: "absolute",
              left: "34%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
              opacity: 0,
              maxWidth: 680,
              paddingRight: "2rem",
              willChange: "opacity, transform",
            }}
          >
            <p
              style={{
                color: "rgba(147,197,253,0.75)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: font,
                fontWeight: 500,
                margin: "0 0 14px 0",
              }}
            >
              Our Vision
            </p>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(1.8rem, 3.5vw, 3.1rem)",
                fontFamily: font,
                fontWeight: 600,
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: "-0.025em",
                textShadow: "0 0 50px rgba(99,102,241,0.35)",
              }}
            >
              Every brand deserves to
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                } as React.CSSProperties}
              >
                grow without limits.
              </span>
            </h1>
          </div>

          {/* Headline 2 — About Revamp180 block */}
          <div
            ref={head2Ref}
            style={{
              position: "absolute",
              left: "23%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
              opacity: 0,
              maxWidth: 700,
              paddingRight: "2rem",
              willChange: "opacity, transform",
            }}
          >
            {/* Label row */}
            <div
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
            >
              <div
                style={{
                  width: 28,
                  height: 2,
                  background: "linear-gradient(90deg, #6366f1, #06b6d4)",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  color: "rgba(147,197,253,0.85)",
                  fontSize: 11,
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
              style={{
                color: "#fff",
                fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
                fontFamily: font,
                fontWeight: 600,
                lineHeight: 1.3,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              We exist to revamp how businesses grow —{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #a5b4fc, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                } as React.CSSProperties}
              >
                turning bold ideas into digital realities.
              </span>
            </h2>

            <p
              style={{
                color: "rgba(203,213,225,0.8)",
                fontSize: 15,
                fontFamily: font,
                fontWeight: 400,
                marginTop: 22,
                lineHeight: 1.75,
              }}
            >
              Our mission is to make every client&apos;s brand unstoppable. Through
              strategy, design, and technology — we craft solutions that scale,
              convert, and leave a lasting impact.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 36, marginTop: 30 }}>
              {stats.map(({ num, label }) => (
                <div key={label}>
                  <div
                    style={{
                      color: "#a5b4fc",
                      fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
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
                      fontSize: 10,
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
