
"use client";
import { useEffect, useRef, useState } from "react";


export default function AboutPage() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = height - windowHeight;
      const scrolled = -top;
      const progress = Math.min(Math.max(scrolled / totalScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const p = scrollProgress;

  // Globe X: starts at 50% (center), moves to ~10% (left)
  const globeLeftPercent =
    p < 0.3
      ? 50
      : p < 0.7
        ? 50 - ((p - 0.3) / 0.4) * 40
        : 10;

  // Globe scale: starts big, shrinks as it moves left
  const globeScale =
    p < 0.3
      ? 1
      : p < 0.7
        ? 1 - ((p - 0.3) / 0.4) * 0.45
        : 0.55;

  // Orange beam cone: appears after p=0.4
  const beamOpacity = p < 0.4 ? 0 : Math.min((p - 0.4) / 0.3, 1);
  // Cone width angle: from thin line to full spread
  const coneSpread = p < 0.4 ? 0 : Math.min((p - 0.4) / 0.3, 1);

  // Text opacity: fades in after p=0.65
  const textOpacity = p < 0.65 ? 0 : Math.min((p - 0.65) / 0.2, 1);
  const textTranslateY = p < 0.65 ? 30 : 30 - ((p - 0.65) / 0.2) * 30;

  // Orange fill background: spreads from right
  const orangeFillOpacity = p < 0.6 ? 0 : Math.min((p - 0.6) / 0.25, 1);

  // Checkerboard pattern opacity (top-right decorative squares)
  const checkerOpacity = p < 0.65 ? 0 : Math.min((p - 0.65) / 0.2, 1);

  // Section label opacity
  const labelOpacity = textOpacity;


  return (
    <main className="p-6 mt-20">
      <div
        ref={containerRef}
        style={{ height: "500vh", position: "relative" }}
      >
        {/* Sticky viewport */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Orange fill background layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#f26419",
              opacity: orangeFillOpacity,
              zIndex: 1,
              transition: "opacity 0.05s linear",
            }}
          />

          {/* Decorative checkerboard squares (top right) */}
          {orangeFillOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 220,
                height: 220,
                opacity: checkerOpacity * 0.45,
                zIndex: 3,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: 4,
              }}
            >
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#c94e0a",
                    borderRadius: 2,
                    visibility:
                      i === 0 || i === 2 || i === 4 || i === 6 || i === 8
                        ? "hidden"
                        : "visible",
                  }}
                />
              ))}
            </div>
          )}

          {/* Orange beam / cone */}
          {beamOpacity > 0 && (
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                opacity: beamOpacity,
              }}
              viewBox="0 0 1536 768"
              preserveAspectRatio="xMidYMid slice"
            >
              <polygon
                points={`
                ${globeLeftPercent * 15.36}, ${384 - coneSpread * 230}
                ${globeLeftPercent * 15.36}, ${384 + coneSpread * 230}
                1700, 900
                1700, -100
              `}
                fill="#f26419"
              />
            </svg>
          )}

          {/* Globe */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${globeLeftPercent}%`,
              transform: `translate(-50%, -50%) scale(${globeScale})`,
              width: 520,
              height: 520,
              zIndex: 4,
              transition: "transform 0.05s linear, left 0.05s linear",
            }}
          >
            <Globe />
          </div>

          {/* Text overlay */}
          {textOpacity > 0 && (
            <div
              style={{
                position: "absolute",
                left: "28%",
                top: "50%",
                transform: `translateY(calc(-50% + ${textTranslateY}px))`,
                zIndex: 5,
                opacity: textOpacity,
                maxWidth: 760,
                paddingRight: "2rem",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  marginBottom: 24,
                }}
              >
                — About Crowd
              </p>
              <h1
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
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
          )}
          

          {/* Scroll hint */}
          {p < 0.05 && (
            <div
              style={{
                position: "absolute",
                bottom: 90,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
                letterSpacing: "0.1em",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                textTransform: "uppercase",
                animation: "fadeUpDown 2s ease-in-out infinite",
              }}
            >
              scroll ↓
            </div>
          )}
        </div>

        <style>{`
        @keyframes fadeUpDown {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.8; transform: translateX(-50%) translateY(-6px); }
        }
      `}</style>
      </div>
    </main>
  );



  function Globe() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #5580ff 0%, #1a2fd4 40%, #0a0f6b 100%)",
          boxShadow:
            "inset -30px -20px 60px rgba(0,0,100,0.6), inset 20px 20px 40px rgba(100,150,255,0.3), 0 0 80px rgba(30,50,200,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cloud layer simulation */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: `
            radial-gradient(ellipse 60% 30% at 30% 70%, rgba(255,255,255,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 40% 20% at 70% 40%, rgba(255,255,255,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 50% 25% at 50% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)
          `,
          }}
        />
        {/* Continent hints */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.3,
          }}
          viewBox="0 0 520 520"
        >
          <ellipse cx="230" cy="180" rx="80" ry="55" fill="#3355cc" />
          <ellipse cx="290" cy="260" rx="60" ry="70" fill="#2244bb" />
          <ellipse cx="170" cy="300" rx="50" ry="40" fill="#3355cc" />
          <ellipse cx="350" cy="200" rx="35" ry="25" fill="#2244bb" />
        </svg>
      </div>
    );
  }
}