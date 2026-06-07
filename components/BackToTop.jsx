"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setProgress(pct);
        setVisible(scrollTop > 300);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // SVG circle math
  const size = 50;
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <>
      {/* WhatsApp button */}
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "2rem",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "#25D366",
          border: "none",
          cursor: "pointer",
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.7em"
          height="1.7em"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <g fill="#fff">
            <path
              fillRule="evenodd"
              d="M12 4a8 8 0 0 0-6.895 12.06l.569.718l-.697 2.359l2.32-.648l.379.243A8 8 0 1 0 12 4M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382l1.426-4.829l-.006-.007l-.033-.055A9.96 9.96 0 0 1 2 12"
              clipRule="evenodd"
            />
            <path d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1 1 0 0 0-.34-.075c-.196 0-.362.098-.49.291c-.146.217-.587.732-.723.886c-.018.02-.042.045-.057.045c-.013 0-.239-.093-.307-.123c-1.564-.68-2.751-2.313-2.914-2.589c-.023-.04-.024-.057-.024-.057c.005-.021.058-.074.085-.101c.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711c-.158-.377-.366-.552-.655-.552c-.027 0 0 0-.112.005c-.137.005-.883.104-1.213.311c-.35.22-.94.924-.94 2.16c0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537c1.412.564 2.081.63 2.461.63c.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276c.192-.534.243-1.117.115-1.329c-.088-.144-.239-.216-.43-.308" />
          </g>
        </svg>
      </a>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: "fixed",
          bottom: `calc(1.8rem + ${size}px + 12px)`,
          right: "2rem",
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: "#01004C",
          border: "none",
          cursor: "none",
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Progress ring */}
        <svg
          width={size}
          height={size}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
          }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#5b4bff"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>

        {/* Arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFFFFF"
          width="24px"
          height="24px"
          viewBox="0 0 32 32"
        >
          <path d="M17.504 26.025l.001-14.287 6.366 6.367L26 15.979 15.997 5.975 6 15.971 8.129 18.1l6.366-6.368v14.291z" />
        </svg>
      </button>
    </>
  );
}
