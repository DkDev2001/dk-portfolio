import { useState, useEffect } from "react";
import { SemiCircleProgress } from "react-semicircle-progressbar";
import { useInView } from "../hooks/useInView";

// Semicircle proficiency gauge that animates to `percent` when scrolled into view.
export const ProgressSemi = ({ percent = 0, label = "" }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (inView) setPct(Number(percent) || 0);
  }, [inView, percent]);

  return (
    <div className="progress-item" ref={ref}>
      <SemiCircleProgress
        percentage={pct}
        size={{ width: 180, height: 180 }}
        strokeWidth={12}
        strokeColor="#ffffff"
        strokeLinecap="round"
        hasBackground={true}
        bgStrokeColor="rgba(255,255,255,0.18)"
        fontStyle={{ fontSize: "28px", fontWeight: "700", fill: "#ffffff" }}
      />
      <h5>{label}</h5>
    </div>
  );
};
