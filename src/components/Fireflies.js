import { useEffect, useRef } from "react";

// Fireflies background — soft glowing dots that drift and twinkle on the dark
// canvas, behind all content. Canvas-based for smooth performance. Fixed &
// pointer-events:none so it never blocks the UI. Pauses when the tab is
// hidden, lightens on mobile, and renders a still field for reduced-motion.
const COLORS = ["#F729E3", "#AA367C", "#B98CFF", "#6E44FF", "#E9D5FF"];

export const Fireflies = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Cap the backing-store resolution — on phones force 1× so the full-screen
    // canvas repaints cost far less each frame (major scroll-smoothness win).
    const isPhone = window.innerWidth < 768;
    let w = 0, h = 0, dpr = isPhone ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    let flies = [];
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

      const density = w < 768 ? 0.000028 : 0.00006; // fewer on phones (less per-frame gradient work)
      const count = Math.round(w * h * density);
      flies = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        core: rand(0.6, 1.6),        // bright center radius
        glow: rand(5, 13),           // soft halo radius
        color: COLORS[(Math.random() * COLORS.length) | 0],
        base: rand(0.14, 0.4),       // base brightness (subtle)
        vx: rand(-0.14, 0.14),       // slow drift
        vy: rand(-0.14, 0.14),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.5, 1.3),       // twinkle speed
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter"; // glows add up like real light
      for (const f of flies) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.001 * f.speed + f.phase);
        const alpha = f.base * twinkle;

        // soft halo
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.glow);
        g.addColorStop(0, hexA(f.color, alpha * 0.55));
        g.addColorStop(1, hexA(f.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.glow, 0, Math.PI * 2);
        ctx.fill();

        // bright core
        ctx.fillStyle = hexA("#FFFFFF", alpha);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.core, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const step = (t) => {
      if (!running) return;
      for (const f of flies) {
        f.x += f.vx;
        f.y += f.vy;
        // wrap around edges
        if (f.x < -f.glow) f.x = w + f.glow;
        else if (f.x > w + f.glow) f.x = -f.glow;
        if (f.y < -f.glow) f.y = h + f.glow;
        else if (f.y > h + f.glow) f.y = -f.glow;
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
    if (reduce) {
      draw(0); // still field, no animation loop
    } else {
      raf = requestAnimationFrame(step);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireflies" aria-hidden="true" />;
};

// #RRGGBB + alpha -> rgba()
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
