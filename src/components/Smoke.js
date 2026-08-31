import { useEffect, useRef } from "react";

// Smoke / fog background — large, soft, slowly drifting purple puffs that read
// as atmospheric smoke behind all content. Canvas-based, low-opacity, additive
// so it glows gently on the dark theme. Fixed & pointer-events:none. Pauses on
// tab-hidden and renders a still frame for reduced-motion.
const PUFFS = ["#6E5AA0", "#7C63B0", "#5F52A8", "#8A6BB2", "#9784C8"];

export const Smoke = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let puffs = [];
    let raf = 0;
    let running = true;

    const rand = (a, b) => a + Math.random() * (b - a);

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 7 : 11;
      const R = Math.max(w, h);
      puffs = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.20, 0.38) * R,      // soft radius (a bit smaller → drift reads)
        color: PUFFS[(Math.random() * PUFFS.length) | 0],
        alpha: rand(0.025, 0.055),    // very faint fog
        vx: rand(-0.55, 0.55),        // visible drift
        vy: rand(-0.35, 0.35),
        phase: rand(0, Math.PI * 2),
        pulse: rand(0.7, 1.4),        // more noticeable breathing
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of puffs) {
        const breathe = 0.7 + 0.3 * Math.sin(t * 0.0009 * p.pulse + p.phase);
        const a = p.alpha * breathe;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, hexA(p.color, a));
        g.addColorStop(0.5, hexA(p.color, a * 0.4));
        g.addColorStop(1, hexA(p.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const step = (t) => {
      if (!running) return;
      for (const p of puffs) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.r) p.x = w + p.r;
        else if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        else if (p.y > h + p.r) p.y = -p.r;
      }
      draw(t);
      raf = requestAnimationFrame(step);
    };

    const onResize = () => { build(); if (reduce) draw(0); };
    const onVisibility = () => {
      running = !document.hidden;
      if (running && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
    };

    build();
    if (reduce) draw(0);
    else raf = requestAnimationFrame(step);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="smoke" aria-hidden="true" />;
};

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
