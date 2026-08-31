import { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";

// Semicircle proficiency gauge: purple→pink gradient arc with a grey rounded cap
// and a bold centered % — animates the sweep once it scrolls into view.
export const GradientGauge = ({ percent = 0, size = 200 }) => {
  const [ref, inView] = useInView({ threshold: 0.35 });
  const [val, setVal] = useState(0);
  const [fallback, setFallback] = useState(false);

  // Carousel clones can prevent the IntersectionObserver from firing, so also
  // kick off the animation a moment after mount as a safety net.
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!inView && !fallback) return;
    const target = Number(percent) || 0;
    const dur = 1300;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(eased * target);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, fallback, percent]);

  const stroke = size * 0.075;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const boxH = cy + stroke; // just the top half + stroke room

  const semiLen = Math.PI * r;
  const dash = (val / 100) * semiLen;

  // leading-cap position along the top semicircle (180° → toward 0°)
  const ang = Math.PI - (val / 100) * Math.PI;
  const capX = cx + r * Math.cos(ang);
  const capY = cy - r * Math.sin(ang);

  return (
    <div className="gauge" ref={ref}>
      <svg width="100%" viewBox={`0 0 ${size} ${boxH}`} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a3ab9" />
            <stop offset="100%" stopColor="#c74fb0" />
          </linearGradient>
        </defs>
        {/* faint track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* gradient progress arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${semiLen}`}
        />
        {/* rounded cap at the leading end */}
        {val > 1 && <circle cx={capX} cy={capY} r={stroke / 2} fill="#ffffff" />}
        {/* centered percentage */}
        <text
          x={cx}
          y={cy - r * 0.14}
          textAnchor="middle"
          fontSize={size * 0.125}
          fontWeight="700"
          fill="#ffffff"
        >
          {Math.round(val)}%
        </text>
      </svg>
    </div>
  );
};
