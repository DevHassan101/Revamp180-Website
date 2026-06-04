'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const EARTH_TEXTURE =
  'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg';

const STAR_CLIP =
  'polygon(50% 0%, 56% 43%, 100% 50%, 56% 57%, 50% 100%, 44% 57%, 0% 50%, 44% 43%)';

const SPARKLES = [
  { top: '27%', left: '44%', size: 22, color: '#C0BAFF', delay: 0.0 },
  { top: '42%', left: '42%', size: 15, color: '#8B80FF', delay: 0.4 },
  { top: '56%', left: '40%', size: 19, color: '#C0BAFF', delay: 0.8 },
  { top: '37%', left: '36%', size: 14, color: '#8B80FF', delay: 1.2 },
  { top: '64%', left: '36%', size: 17, color: '#C0BAFF', delay: 1.6 },
  { top: '50%', left: '41%', size: 13, color: '#8B80FF', delay: 2.0 },
];

/* ── Earth Globe ───────────────────────────────────────────────────── */
function Earth({ groupRef }) {
  const texture = useTexture(EARTH_TEXTURE);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2.5, 64, 64]}>
        <meshPhongMaterial
          map={texture}
          color={new THREE.Color(0.28, 0.32, 0.78)}
          emissive={new THREE.Color(0.04, 0.03, 0.28)}
          emissiveIntensity={0.6}
          shininess={12}
          specular={new THREE.Color(0.04, 0.04, 0.18)}
        />
      </Sphere>
      <Sphere args={[2.65, 48, 48]}>
        <meshPhongMaterial
          color="#3355ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

/* ── Main component ────────────────────────────────────────────────── */
export default function VisionMissionSection() {
  const containerRef   = useRef(null);
  const globeWrapRef   = useRef(null);
  const panelRef       = useRef(null);
  const labelRef       = useRef(null);
  const headingRef     = useRef(null);
  const subtitleRef    = useRef(null);
  const statsRowRef    = useRef(null);
  const yearsNumRef    = useRef(null);
  const projectsNumRef = useRef(null);
  const satisfNumRef   = useRef(null);
  const missionCardRef = useRef(null);
  const earthGroupRef  = useRef(null);
  const sparkleRefs    = useRef([]);

  const [mounted,  setMounted]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Sparkle pulse ---------------------------------------------------- */
  useEffect(() => {
    if (!mounted) return;
    const anims = sparkleRefs.current.map((el, i) =>
      el ? gsap.to(el, {
        scale: 1.45, duration: 0.85, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: SPARKLES[i]?.delay ?? 0,
      }) : null
    );
    return () => anims.forEach(a => a?.kill());
  }, [mounted]);

  /* Scroll-driven timeline ------------------------------------------ */
  useGSAP(
    () => {
      if (!mounted || !containerRef.current) return;

      const ctx = gsap.context(() => {
        const counter = { years: 0, projects: 0, sat: 0 };

        /* Initial states */
        gsap.set(globeWrapRef.current, { y: '110%', opacity: 0 });
        gsap.set(panelRef.current, { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
        gsap.set(
          [labelRef.current, headingRef.current, subtitleRef.current,
           statsRowRef.current, missionCardRef.current],
          { opacity: 0, y: 40 }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start:   'top top',
            end:     'bottom bottom',
            scrub:   1.2,
          },
        });

        /* Stage 1 — Earth rises */
        tl.to(globeWrapRef.current, {
          y: '0%', opacity: 1, duration: 1, ease: 'power2.out',
        });

        /* Stage 2 — Earth shifts left + indigo wedge sweeps in */
        tl.to(globeWrapRef.current, {
          x: isMobile ? '0%' : '-28%', duration: 1, ease: 'power2.inOut',
        });
        tl.to(panelRef.current, {
          clipPath: isMobile
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'power3.inOut',
        }, '<');

        /* Stage 3 — Label → Heading → Subtitle stagger */
        tl.to(labelRef.current,    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        tl.to(headingRef.current,  { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.15');
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.15');

        /* Stage 3.5 — Stats row + count-up */
        tl.to(statsRowRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
        tl.to(counter, {
          years: 6, projects: 50, sat: 100,
          duration: 0.65,
          ease: 'power2.out',
          onUpdate() {
            if (yearsNumRef.current)
              yearsNumRef.current.textContent = `${Math.round(counter.years)}+`;
            if (projectsNumRef.current)
              projectsNumRef.current.textContent = `${Math.round(counter.projects)}+`;
            if (satisfNumRef.current)
              satisfNumRef.current.textContent = `${Math.round(counter.sat)}%`;
          },
        }, '-=0.2');

        /* Stage 4 — Mission card slides up */
        tl.to(missionCardRef.current, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { dependencies: [mounted, isMobile], revertOnUpdate: true }
  );

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <section ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* Background — matches site theme (deep navy like other sections) */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, #000028 0%, #010045 35%, #01004C 65%, #000028 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 35% 50%, rgba(139,128,255,0.1) 0%, transparent 60%)' }}
        />

        {/* ── Globe wrapper ─────────────────────────────────────────── */}
        <div ref={globeWrapRef} className="absolute inset-0 flex items-center justify-center">
          {mounted && !isMobile && (
            <>
              <Canvas camera={{ position: [0, 0, 8.0], fov: 45 }} className="w-full h-full">
                <ambientLight intensity={0.75} />
                <directionalLight position={[4, 2, 5]} intensity={1.2} color="#c8d0ff" />
                <pointLight position={[-5, 0, 3]} intensity={0.6} color="#7060ff" />
                <Suspense fallback={null}>
                  <Earth groupRef={earthGroupRef} />
                </Suspense>
              </Canvas>

              {SPARKLES.map((s, i) => (
                <div
                  key={i}
                  ref={el => { sparkleRefs.current[i] = el; }}
                  className="absolute pointer-events-none"
                  style={{
                    top: s.top, left: s.left,
                    width: s.size, height: s.size,
                    background: s.color, clipPath: STAR_CLIP,
                    transformOrigin: 'center',
                    filter: `drop-shadow(0 0 5px ${s.color})`,
                    zIndex: 10,
                  }}
                />
              ))}
            </>
          )}

          {mounted && isMobile && (
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{ width: 240, height: 240, boxShadow: '0 0 80px rgba(139,128,255,0.4), 0 0 160px rgba(24,0,200,0.2)' }}
            >
              <img src={EARTH_TEXTURE} alt="Earth" className="w-full h-full object-cover"
                style={{ filter: 'hue-rotate(15deg) saturate(1.8) brightness(0.7)' }} />
            </div>
          )}
        </div>

        {/* ── Indigo wedge panel ────────────────────────────────────── */}
        <div
          ref={panelRef}
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1800C8 0%, #3520DC 100%)', zIndex: 5 }}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
              backgroundSize: '200px 200px',
            }}
          />

          {/* 3×3 dot grid */}
          <div className="absolute pointer-events-none" style={{ top: 24, right: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 18px)', gap: 8 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ width: 18, height: 18, background: 'rgba(139,128,255,0.28)', borderRadius: 3 }} />
            ))}
          </div>

          {/* ── Text area ─────────────────────────────────────────── */}
          <div
            className="absolute inset-0 flex flex-col justify-center"
            style={{
              paddingLeft:  mounted ? (isMobile ? '1.5rem' : '38%') : '38%',
              paddingRight: mounted ? (isMobile ? '1.5rem' :  '6%') :  '6%',
            }}
          >
            {/* Label */}
            <p ref={labelRef} style={{
              color: '#C0BAFF', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
              fontWeight: 600, letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: '1.1rem',
            }}>
              — VISION &amp; MISSION
            </p>

            {/* Heading */}
            <h2 ref={headingRef} style={{
              color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700, lineHeight: 1.08,
              letterSpacing: '-0.02em', marginBottom: '1.2rem',
            }}>
              Our Vision<br />&amp; Mission
            </h2>

            {/* Subtitle */}
            <p ref={subtitleRef} style={{
              color: 'rgba(192,186,255,0.8)',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              lineHeight: 1.7, maxWidth: 520, marginBottom: '1.8rem',
            }}>
              We build digital experiences that transform businesses — combining
              strategy, design, and technology to deliver results that matter.
            </p>

            {/* Stats row */}
            <div ref={statsRowRef} style={{ display: 'flex', gap: '2.5rem', marginBottom: '2rem' }}>
              <div>
                <div ref={yearsNumRef} style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>0+</div>
                <div style={{ color: '#C0BAFF', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.4rem' }}>Years of Excellence</div>
              </div>
              <div style={{ width: 1, background: 'rgba(139,128,255,0.3)', alignSelf: 'stretch' }} />
              <div>
                <div ref={projectsNumRef} style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>0+</div>
                <div style={{ color: '#C0BAFF', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.4rem' }}>Projects Delivered</div>
              </div>
              <div style={{ width: 1, background: 'rgba(139,128,255,0.3)', alignSelf: 'stretch' }} />
              <div>
                <div ref={satisfNumRef} style={{ color: '#ffffff', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>0%</div>
                <div style={{ color: '#C0BAFF', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.4rem' }}>Client Satisfaction</div>
              </div>
            </div>

            {/* Mission card */}
            <div
              ref={missionCardRef}
              style={{
                background: 'rgba(139,128,255,0.08)',
                border: '1px solid rgba(139,128,255,0.25)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 12,
                padding: '1.25rem 1.5rem',
                maxWidth: 460,
              }}
            >
              <p style={{ color: '#C0BAFF', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                Our Mission
              </p>
              <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.93rem', lineHeight: 1.75 }}>
                To deliver innovative, reliable, and high-quality digital solutions
                that help businesses grow, improve efficiency, and achieve their
                goals — through excellence, integrity, and customer-focused services.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,18,0.55))', zIndex: 20 }}
        />
      </div>
    </section>
  );
}
