// Shimmer skeleton placeholders shown while data / lazy routes load.
export const Skeleton = ({ w = "100%", h = 16, r = 8, className = "", style = {} }) => (
    <span className={`skeleton ${className}`} style={{ width: w, height: h, borderRadius: r, ...style }} />
);

// A grid of card skeletons (for Projects / Services / Testimonials while loading).
export const SkeletonCards = ({ count = 6 }) => (
    <div className="skeleton-grid">
        {Array.from({ length: count }).map((_, i) => (
            <div className="skeleton-card" key={i}>
                <Skeleton h={180} r={16} />
                <Skeleton w="70%" h={16} style={{ marginTop: 14 }} />
                <Skeleton w="45%" h={12} style={{ marginTop: 8 }} />
            </div>
        ))}
    </div>
);

// Full-page skeleton used as a Suspense fallback for lazy routes.
export const PageSkeleton = () => (
    <div className="page-skeleton">
        <Skeleton w="40%" h={34} />
        <Skeleton w="60%" h={16} style={{ marginTop: 12, marginBottom: 30 }} />
        <SkeletonCards count={6} />
    </div>
);
