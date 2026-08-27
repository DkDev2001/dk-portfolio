// Gradient semicircle loading spinner (purple → pink arc with a soft grey cap).
export const Loader = ({ size = 64, label = "" }) => {
  const stroke = size * 0.12;
  const r = (size - stroke) / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;
  // draw ~62% of the circle as the coloured arc
  const arc = circumference * 0.62;

  return (
    <div className="dk-loader" role="status" aria-label={label || "Loading"}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="dk-loader__spin">
        <defs>
          <linearGradient id="dkLoaderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a3ab9" />
            <stop offset="100%" stopColor="#c74fb0" />
          </linearGradient>
        </defs>
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="url(#dkLoaderGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference}`}
        />
        {/* soft grey cap at the leading end */}
        <circle cx={c + r} cy={c} r={stroke / 2} fill="#6f6f6f" />
      </svg>
      {label ? <span className="dk-loader__label">{label}</span> : null}
    </div>
  );
};
