import { useEffect, useRef } from "react";

// Aurora background — large soft gradient orbs that slowly drift behind all
// content (pure CSS, GPU-composited), plus a subtle glow that follows the
// cursor. Fixed & pointer-events:none so it never interferes with the UI.
// Respects prefers-reduced-motion and skips the cursor glow on touch devices.
export const AuroraBackground = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No pointer on touch / coarse devices — keep it pure aurora there.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", x + "px");
      el.style.setProperty("--my", y + "px");
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.classList.add("aurora--cursor-on");
    apply();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="aurora" aria-hidden="true" ref={ref}>
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
      <span className="aurora__blob aurora__blob--4" />
      <div className="aurora__cursor" />
      <div className="aurora__grain" />
    </div>
  );
};
