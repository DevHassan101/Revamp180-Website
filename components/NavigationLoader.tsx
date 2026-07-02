"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

// Full-screen loading overlay shown in the gap between clicking a project card
// and the detail page actually rendering. Call `startNavLoader()` on click; the
// overlay clears itself once the route commits (pathname changes).
const NavLoaderContext = createContext<() => void>(() => {});

export function useNavLoader() {
  return useContext(NavLoaderContext);
}

export default function NavigationLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setLoading(true);
    // Safety net: never let the overlay get stuck if navigation is cancelled.
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setLoading(false), 12000);
  };

  // The route has committed (new page is rendering) → hide the overlay.
  useEffect(() => {
    setLoading(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [pathname]);

  return (
    <NavLoaderContext.Provider value={start}>
      {children}

      {loading && (
        <div className="nav-loader" role="status" aria-label="Loading">
          {/* Soft radial glow */}
          <div className="nav-loader-glow" />

          <div className="nav-loader-inner">
            <div className="nav-loader-ring" />
            <div className="nav-loader-text">
              <p className="nav-loader-title">Loading project</p>
              <span className="nav-loader-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>

          <style>{`
            .nav-loader {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              background: rgba(2, 3, 16, 0.82);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              animation: nav-loader-fade 0.25s ease both;
            }
            @keyframes nav-loader-fade {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            .nav-loader-glow {
              position: absolute;
              left: 50%;
              top: 50%;
              width: min(60vw, 420px);
              height: min(60vw, 420px);
              transform: translate(-50%, -50%);
              border-radius: 50%;
              pointer-events: none;
              background: radial-gradient(circle, rgba(139,128,255,0.22) 0%, transparent 70%);
              filter: blur(30px);
            }

            .nav-loader-inner {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 26px;
            }

            .nav-loader-ring {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: conic-gradient(
                from 0deg,
                rgba(139,128,255,0) 0%,
                rgba(139,128,255,0.6) 55%,
                #C0BAFF 100%
              );
              -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px));
              mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px));
              animation: nav-loader-spin 0.9s linear infinite;
              filter: drop-shadow(0 0 12px rgba(139,128,255,0.45));
            }
            @keyframes nav-loader-spin {
              to { transform: rotate(360deg); }
            }

            .nav-loader-text {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
            }
            .nav-loader-title {
              margin: 0;
              font-family: var(--font-poppins), 'Poppins', sans-serif;
              font-weight: 600;
              font-size: 15px;
              letter-spacing: 0.02em;
              background: linear-gradient(90deg, #8B80FF, #C0BAFF, #8B80FF);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .nav-loader-dots {
              display: inline-flex;
              gap: 5px;
            }
            .nav-loader-dots i {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #8B80FF;
              display: inline-block;
              animation: nav-loader-bounce 1.2s ease-in-out infinite;
            }
            .nav-loader-dots i:nth-child(2) { animation-delay: 0.16s; }
            .nav-loader-dots i:nth-child(3) { animation-delay: 0.32s; }
            @keyframes nav-loader-bounce {
              0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
              40% { opacity: 1; transform: translateY(-4px); }
            }
          `}</style>
        </div>
      )}
    </NavLoaderContext.Provider>
  );
}
