"use client";
import { useEffect } from "react";

const SPAN_COUNT = 15;

export default function CursorTrail() {
  useEffect(() => {
    const startColor = { r: 139, g: 128, b: 255 };
    const endColor = { r: 30, g: 15, b: 120 };
    const spans = [];

    for (let i = 0; i < SPAN_COUNT; i++) {
      const t = i / (SPAN_COUNT - 1);

      const size = Math.round(14 - t * 10);
      const r = Math.round(startColor.r + t * (endColor.r - startColor.r));
      const g = Math.round(startColor.g + t * (endColor.g - startColor.g));
      const b = Math.round(startColor.b + t * (endColor.b - startColor.b));

      const s = document.createElement("span");
      Object.assign(s.style, {
        position: "fixed",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `rgb(${r},${g},${b})`,
        pointerEvents: "none",
        zIndex: "9998",
        transform: "translate3d(-100px,-100px,0)",
        transition: `all ${(i + 1) * 30}ms ease-out`,
      });
      document.body.appendChild(s);
      spans.push(s);
    }

    const box = document.createElement("div");
    Object.assign(box.style, {
      position: "fixed",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: `rgb(${startColor.r},${startColor.g},${startColor.b})`,
      pointerEvents: "none",
      zIndex: "9999",
      transform: "translate3d(-100px,-100px,0)",
    });
    document.body.appendChild(box);

    const handleMove = (e) => {
      const x = e.clientX - 7;
      const y = e.clientY - 7;
      box.style.transform = `translate3d(${x}px,${y}px,0)`;
      spans.forEach((s) => {
        const half = parseInt(s.style.width) / 2;
        s.style.transform = `translate3d(${e.clientX - half}px,${e.clientY - half}px,0)`;
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      spans.forEach((s) => s.remove());
      box.remove();
    };
  }, []);

  return null;
}
