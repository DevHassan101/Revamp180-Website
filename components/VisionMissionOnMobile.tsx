"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VisionMissionOnMobile() {
  const globeRef = useRef<HTMLDivElement>(null);
  const head1Ref = useRef<HTMLDivElement>(null);
  const head2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const font = "var(--font-poppins), 'Poppins', sans-serif";
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stats = [
    { num: "50+", label: "Brands Transformed" },
    { num: "6+", label: "Years of Impact" },
    { num: "∞", label: "Room to Grow" },
  ];
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Crossfade the two headlines with scroll: Vision holds through the first
  // half, then hands off to Mission in the second half.
  const head1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const head2Opacity = useTransform(scrollYProgress, [0.5, 0.65, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full">
      {/* Sticky viewport: pins to the top while the outer container scrolls
          its full 200vh. overflow-hidden clips the sliding track. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Shared background (globe) — lives in the pinned viewport so it
            stays put while the children slide over it. Give the children
            transparent / semi-transparent backgrounds to let it show through.
            <Image src="/images/globe.png" fill ... /> */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Globe sits dead-center in the pinned viewport and never moves —
              the children slide over it while it stays put. */}
          <div
            ref={globeRef}
            className="vm-m-globe"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min(78vw, 380px)",
              height: "min(78vw, 380px)",
              zIndex: 1,
            }}
          >
            {/* Soft glow halo behind the globe */}
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
        </div>

        {/* The sliding track — 200vh tall, moved by `y` as we scroll. */}
        <motion.div style={{ y }} className="relative z-10 h-[200vh] w-full">
          <div className="child-1 relative flex h-screen w-full items-center">
            <motion.div
              ref={head1Ref}
              className="vm-head vm-head1"
              style={{
                position: "relative",
                zIndex: 5,
                width: "100%",
                maxWidth: 560,
                margin: "0 auto",
                // Dark glassy panel so text stays readable over the globe
                padding: "30px 26px",
                borderRadius: 22,
                background: "rgba(3,5,22,0.2)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(139,128,255,0.16)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                opacity: head1Opacity,
                willChange: "opacity, transform",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 2,
                    background:
                      "linear-gradient(90deg, #8B80FF 0%, #C0BAFF 50%, #8B80FF 100%)",
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
                  fontSize: "clamp(1.9rem, 6.5vw, 2.6rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: "-0.03em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.5)",
                }}
              >
                Every brand deserves to
                <br />
                <span
                  style={
                    {
                      background:
                        "linear-gradient(90deg, #8B80FF 0%, #C0BAFF 50%, #8B80FF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    } as React.CSSProperties
                  }
                >
                  grow without limits.
                </span>
              </h1>

              <p
                className="vm-body-text"
                style={{
                  color: "rgba(226,232,240,0.96)",
                  fontFamily: font,
                  fontSize: "clamp(0.95rem, 3.6vw, 1.05rem)",
                  fontWeight: 400,
                  marginTop: 17,
                  lineHeight: 1.75,
                  maxWidth: 480,
                }}
              >
                We turn ambitious ideas into unstoppable brands through bold
                strategy, purposeful design, and technology that scales.
              </p>

              <div
                className="vm-tags"
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
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
            </motion.div>
          </div>
          <div className="child-2 relative flex h-screen w-full items-center">
            {/* Headline 2 — Mission */}
            <motion.div
              ref={head2Ref}
              className="vm-head vm-head2"
              style={{
                position: "relative",
                zIndex: 5,
                width: "100%",
                maxWidth: 560,
                margin: "0 auto",
                // Dark glassy panel so text stays readable over the globe
                padding: "30px 26px",
                borderRadius: 22,
                background: "rgba(3,5,22,0.2)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(139,128,255,0.16)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                opacity: head2Opacity,
                willChange: "opacity, transform",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 2,
                    background:
                      "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
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
                  fontSize: "clamp(1.5rem, 5.5vw, 2rem)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.5)",
                }}
              >
                We exist to revamp how businesses grow{" "}
                <span
                  style={
                    {
                      background:
                        "linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    } as React.CSSProperties
                  }
                >
                  turning bold ideas into digital realities.
                </span>
              </h2>

              <p
                className="vm-body-text"
                style={{
                  color: "rgba(226,232,240,0.96)",
                  fontFamily: font,
                  fontSize: "clamp(0.95rem, 3.6vw, 1.05rem)",
                  fontWeight: 400,
                  marginTop: 18,
                  lineHeight: 1.75,
                }}
              >
                Our mission is to make every client&apos;s brand unstoppable.
                Through strategy, design, and technology we craft solutions that
                scale, convert, and leave a lasting impact.
              </p>

              <div
                className="vm-stats"
                style={{ display: "flex", gap: 36, marginTop: 30 }}
              >
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
                        color: "rgba(203,213,225,0.88)",
                        fontSize: 12,
                        fontFamily: font,
                        fontWeight: 500,
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
            </motion.div>
          </div>
        </motion.div>
      </div>
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
