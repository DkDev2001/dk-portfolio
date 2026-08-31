import { useEffect } from "react";

// Contained, professional card interactions — applied globally via event
// delegation so it works on lazy-loaded cards too. Elements opt in with:
//   .fx-card  -> 3D tilt + cursor spotlight + gradient hover border
//   .fx-tilt  -> 3D tilt only (for cards that already have a hover treatment)
// Disabled on touch/coarse pointers and for prefers-reduced-motion.
const MAX_TILT = 6; // degrees

export const CardFX = () => {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let current = null;

    const reset = (el) => {
      if (!el) return;
      el.classList.remove("fx-active");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e) => {
      const card = e.target.closest(".fx-card, .fx-tilt");
      if (current && current !== card) reset(current);
      if (!card) { current = null; return; }

      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;   // 0..1
      const py = (e.clientY - r.top) / r.height;   // 0..1

      card.style.setProperty("--px", (px * 100).toFixed(1) + "%");
      card.style.setProperty("--py", (py * 100).toFixed(1) + "%");
      card.style.setProperty("--rx", ((0.5 - py) * MAX_TILT).toFixed(2) + "deg");
      card.style.setProperty("--ry", ((px - 0.5) * MAX_TILT).toFixed(2) + "deg");
      card.classList.add("fx-active");
      current = card;
    };

    const onLeaveWindow = () => { reset(current); current = null; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
};
