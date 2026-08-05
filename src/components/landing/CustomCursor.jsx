'use client';
import { useEffect, useRef, useState } from 'react';

/*
  Three-layer cursor system:
  1. Dot      — snaps instantly, bright ice-blue
  2. Mid ring — follows at lerp 0.18, cornflower blue
  3. Outer ring — follows at lerp 0.08, deep indigo, larger
  On hover: all rings expand + a soft blue glow pulses
*/

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef   = useRef(null);
  const midRef   = useRef(null);
  const outerRef = useRef(null);
  const glowRef  = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setMounted(true);
    document.documentElement.style.cursor = 'none';

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    // each layer tracks its own lagged position
    let midX = mx,  midY = my;
    let outX = mx,  outY = my;
    let glowX = mx, glowY = my;

    let hovering = false;
    let clicking = false;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const onOver = (e) => {
      hovering = !!e.target?.closest('a, button, input, textarea, select, [role="button"], [role="link"]');
    };
    const onOut  = () => { hovering = false; };

    const onDown = () => { clicking = true; };
    const onUp   = () => { clicking = false; };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      const dot   = dotRef.current;
      const mid   = midRef.current;
      const outer = outerRef.current;
      const glow  = glowRef.current;
      if (!dot || !mid || !outer || !glow) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // ── dot: instant snap ──────────────────────────
      const dotSize = clicking ? 6 : hovering ? 10 : 8;
      dot.style.width  = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.transform = `translate(${mx - dotSize / 2}px, ${my - dotSize / 2}px)`;

      // ── mid ring: lerp 0.18 ────────────────────────
      midX = lerp(midX, mx, 0.18);
      midY = lerp(midY, my, 0.18);
      const midSize  = hovering ? 36 : clicking ? 20 : 26;
      const midHalf  = midSize / 2;
      mid.style.width  = `${midSize}px`;
      mid.style.height = `${midSize}px`;
      mid.style.transform = `translate(${midX - midHalf}px, ${midY - midHalf}px)`;
      mid.style.opacity = hovering ? '0.7' : '0.45';
      mid.style.borderColor = hovering
        ? 'rgba(147,197,253,0.9)'   // blue-300
        : 'rgba(99,179,237,0.6)';   // sky-400

      // ── outer ring: lerp 0.07 ──────────────────────
      outX = lerp(outX, mx, 0.07);
      outY = lerp(outY, my, 0.07);
      const outSize  = hovering ? 58 : clicking ? 38 : 46;
      const outHalf  = outSize / 2;
      outer.style.width  = `${outSize}px`;
      outer.style.height = `${outSize}px`;
      outer.style.transform = `translate(${outX - outHalf}px, ${outY - outHalf}px)`;
      outer.style.opacity = hovering ? '0.35' : '0.18';
      outer.style.borderColor = hovering
        ? 'rgba(96,165,250,0.7)'    // blue-400
        : 'rgba(67,130,202,0.4)';   // indigo-400

      // ── glow blob: slowest, lerp 0.04 ─────────────
      glowX = lerp(glowX, mx, 0.04);
      glowY = lerp(glowY, my, 0.04);
      const glowSize = hovering ? 110 : 80;
      const glowHalf = glowSize / 2;
      glow.style.width  = `${glowSize}px`;
      glow.style.height = `${glowSize}px`;
      glow.style.transform = `translate(${glowX - glowHalf}px, ${glowY - glowHalf}px)`;
      glow.style.opacity = hovering ? '0.12' : '0.055';

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const base = 'pointer-events-none fixed top-0 left-0 rounded-full';

  return (
    <>
      {mounted && (
        <>
          {/* Glow blob — slowest, diffuse blue radial */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className={`${base} z-[9997]`}
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)',
              willChange: 'transform, opacity, width, height',
              transition: 'opacity 0.35s ease, width 0.35s ease, height 0.35s ease',
            }}
          />

          {/* Outer ring — deep indigo, slowest lag */}
          <div
            ref={outerRef}
            aria-hidden="true"
            className={`${base} z-[9998] border`}
            style={{
              borderColor: 'rgba(67,130,202,0.4)',
              willChange: 'transform, opacity, width, height',
              transition: 'opacity 0.3s ease, border-color 0.3s ease, width 0.3s ease, height 0.3s ease',
            }}
          />

          {/* Mid ring — sky blue, medium lag */}
          <div
            ref={midRef}
            aria-hidden="true"
            className={`${base} z-[9999] border-2`}
            style={{
              borderColor: 'rgba(99,179,237,0.6)',
              willChange: 'transform, opacity, width, height',
              transition: 'opacity 0.2s ease, border-color 0.2s ease, width 0.25s ease, height 0.25s ease',
            }}
          />

          {/* Dot — ice blue, snaps to cursor */}
          <div
            ref={dotRef}
            aria-hidden="true"
            className={`${base} z-[10000]`}
            style={{
              background: 'radial-gradient(circle, #e0f2fe 0%, #7dd3fc 60%, transparent 100%)',
              boxShadow: '0 0 6px 2px rgba(125,211,252,0.6)',
              willChange: 'transform, width, height',
              transition: 'width 0.12s ease, height 0.12s ease',
            }}
          />
        </>
      )}
    </>
  );
}
