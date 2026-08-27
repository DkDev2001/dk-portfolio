import { useState, useEffect } from "react";
import { Trophy, EmojiSmile, Award, CodeSlash, People, Briefcase, Star, GraphUpArrow } from "react-bootstrap-icons";
import { useInView } from "../hooks/useInView";

// Pick an icon from the stat label keyword.
const iconFor = (label = "") => {
  const t = label.toLowerCase();
  if (t.includes("project")) return Briefcase;
  if (t.includes("client") || t.includes("customer")) return EmojiSmile;
  if (t.includes("happy")) return EmojiSmile;
  if (t.includes("experience") || t.includes("year")) return Award;
  if (t.includes("tech")) return CodeSlash;
  if (t.includes("team") || t.includes("people")) return People;
  if (t.includes("award") || t.includes("win")) return Trophy;
  if (t.includes("review") || t.includes("rating")) return Star;
  return GraphUpArrow;
};

// Counts up from 0 to `value` once it scrolls into view.
export const StatCounter = ({ value = 0, suffix = "", label = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [count, setCount] = useState(0);
  const Icon = iconFor(label);

  useEffect(() => {
    if (!inView) return;
    const target = Number(value) || 0;
    if (target === 0) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-icon"><Icon size={30} /></div>
      <h3>
        {count}
        {suffix}
      </h3>
      <p>{label}</p>
    </div>
  );
};
