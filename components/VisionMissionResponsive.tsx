"use client";

import { useEffect, useState } from "react";
import VisionMission from "@/components/VisionMission";
import VisionMissionOnMobile from "@/components/VisionMissionOnMobile";

// Renders ONLY ONE of the two variants at a time — never both. This avoids the
// style/scroll conflicts that happen when both mount and are merely hidden with
// display:none (shared CSS + useScroll listeners fighting each other).
export default function VisionMissionResponsive() {
  // null until mounted so the server render and first client render match
  // (no hydration mismatch, and only one variant is ever in the tree).
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile === null) return null;
  return isMobile ? <VisionMissionOnMobile /> : <VisionMission />;
}
