// Animated footer wave built entirely in React (inline SVG, no image asset).
// Uses the site's purple→pink gradient with layered parallax motion.
export const FooterWave = () => (
    <div className="footer-waves" aria-hidden="true">
        <svg
            className="footer-waves__svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
        >
            <defs>
                <path
                    id="dk-wave-path"
                    d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
            </defs>
            <g fill="#1A0B2E">
                <use xlinkHref="#dk-wave-path" x="48" y="0" opacity="0.45">
                    <animate attributeName="x" values="-90;85" dur="11s" calcMode="linear" repeatCount="indefinite" />
                </use>
                <use xlinkHref="#dk-wave-path" x="48" y="3" opacity="0.65">
                    <animate attributeName="x" values="-90;85" dur="8s" calcMode="linear" repeatCount="indefinite" />
                </use>
                <use xlinkHref="#dk-wave-path" x="48" y="5" opacity="0.85">
                    <animate attributeName="x" values="-90;85" dur="6s" calcMode="linear" repeatCount="indefinite" />
                </use>
                <use xlinkHref="#dk-wave-path" x="48" y="7" opacity="1">
                    <animate attributeName="x" values="-90;85" dur="4s" calcMode="linear" repeatCount="indefinite" />
                </use>
            </g>
        </svg>
    </div>
);
