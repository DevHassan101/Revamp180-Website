"use client";
import { useEffect, useRef } from "react";

/* easing helpers */
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

  // raw scroll target vs. smoothed (lerped) value — this is what gives inertia
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
      // ease the smoothed value toward the target every frame (the "follow" feel)
      smooth.current += (target.current - smooth.current) * 0.09;
      const p = smooth.current;

      // ---- Globe: center → left edge (stays big), then slides off & vanishes ----
      const move = easeInOutCubic(range(p, 0.12, 0.4));
      const vanish = easeInOutCubic(range(p, 0.86, 1));
      const leftPct = 50 - move * 46 - vanish * 24; // 50% → 4% → -20%
      const scale = 1 + move * 0.05;
      if (globeRef.current) {
        globeRef.current.style.left = `${leftPct}%`;
        globeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        globeRef.current.style.opacity = `${1 - vanish}`;
      }

      // ---- Orange beam: apex anchored at globe's right edge, widening rightward ----
      const beamP = easeInOutCubic(range(p, 0.3, 0.55));
      if (beamRef.current) {
        const apexX = leftPct * 15.36 + 150; // % → SVG units (viewBox 1536 wide) + radius
        const rightH = 30 + beamP * 520; // right edge grows tall
        beamRef.current.setAttribute(
          "points",
          `${apexX},372 ${apexX},396 1700,${420 + rightH} 1700,${420 - rightH}`
        );
        beamRef.current.style.opacity = `${beamP}`;
      }

      // ---- Background floods orange (after headline 1) ----
      const fillP = easeInOutCubic(range(p, 0.58, 0.74));
      if (orangeFillRef.current) orangeFillRef.current.style.opacity = `${fillP}`;

      // ---- Decorative checker squares (top-right) ----
      const checkP = range(p, 0.6, 0.8);
      if (checkerRef.current) checkerRef.current.style.opacity = `${checkP * 0.4}`;

      // ---- Headline 1: fades in inside the wedge, then fades back out ----
      const h1In = easeInOutCubic(range(p, 0.42, 0.54));
      const h1Out = easeInOutCubic(range(p, 0.62, 0.7));
      const h1 = h1In * (1 - h1Out);
      if (head1Ref.current) {
        head1Ref.current.style.opacity = `${h1}`;
        head1Ref.current.style.transform = `translateY(calc(-50% + ${(1 - h1In) * 30 - h1Out * 24}px))`;
      }

      // ---- Headline 2: the "About Crowd" block on the orange flood ----
      const h2 = easeInOutCubic(range(p, 0.7, 0.9));
      if (head2Ref.current) {
        head2Ref.current.style.opacity = `${h2}`;
        head2Ref.current.style.transform = `translateY(calc(-50% + ${(1 - h2) * 34}px))`;
      }

      // ---- Scroll hint fades out as soon as you move ----
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

  const fontStack = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  return (
    <main>
      <div ref={containerRef} style={{ height: "600vh", position: "relative" }}>
        {/* Sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#05053d",
          }}
        >
          {/* Orange flood background */}
          <div
            ref={orangeFillRef}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#4f46e5",
              opacity: 0,
              zIndex: 1,
              willChange: "opacity",
            }}
          />

          {/* Decorative checker squares (top right) */}
          <div
            ref={checkerRef}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 240,
              height: 240,
              opacity: 0,
              zIndex: 3,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: 6,
              willChange: "opacity",
            }}
          >
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#05053d",
                  visibility: i % 2 === 0 ? "hidden" : "visible",
                }}
              />
            ))}
          </div>

          {/* Orange beam / cone */}
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
            <polygon
              ref={beamRef}
              points="918,372 918,396 1700,450 1700,390"
              fill="#4f46e5"
              style={{ opacity: 0, willChange: "opacity" }}
            />
          </svg>

          {/* Globe */}
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
            <Globe />
          </div>

          {/* Headline 1 — appears in the wedge, then fades out */}
          <div
            ref={head1Ref}
            style={{
              position: "absolute",
              left: "34%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
              opacity: 0,
              maxWidth: 720,
              paddingRight: "2rem",
              willChange: "opacity, transform",
            }}
          >
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                fontFamily: fontStack,
                fontWeight: 300,
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Huge ambition doesn&apos;t mean
              <br />
              employing a huge global agency
            </h1>
          </div>

          {/* Headline 2 — the About Crowd block on the orange flood */}
          <div
            ref={head2Ref}
            style={{
              position: "absolute",
              left: "23%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 5,
              opacity: 0,
              maxWidth: 720,
              paddingRight: "2rem",
              willChange: "opacity, transform",
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: fontStack,
                fontWeight: 500,
                marginBottom: 22,
              }}
            >
              — About Crowd
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.8rem, 3.4vw, 3rem)",
                fontFamily: fontStack,
                fontWeight: 300,
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Crowd is an international marketing agency that combines global
              reach with local knowledge and merges human expertise with
              cutting-edge technology.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.92)",
                fontSize: 15,
                fontFamily: fontStack,
                fontWeight: 400,
                marginTop: 28,
              }}
            >
              We craft innovative communications with impactful results.
            </p>
          </div>

          {/* Scroll hint */}
          <div
            ref={hintRef}
            style={{
              position: "absolute",
              bottom: 90,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              letterSpacing: "0.1em",
              fontFamily: fontStack,
              textTransform: "uppercase",
              animation: "crowdHint 2s ease-in-out infinite",
            }}
          >
            scroll ↓
          </div>
        </div>

        <style>{`
          @keyframes crowdHint {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-6px); }
          }
        `}</style>
      </div>
    </main>
  );
}

function Globe() {
  return (
    <img src="/images/globe.png" alt="Globe" style={{ width: "100%", height: "100%" }} />
  );
}
