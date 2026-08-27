import { useState, useEffect, useRef } from "react";

// Reveal-on-scroll using IntersectionObserver. Fires ONCE (no replay/jank),
// unlike react-on-screen's TrackVisibility. Returns [ref, inView].
export function useInView(options = { threshold: 0.05, rootMargin: "0px 0px 120px 0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is unavailable, just show it.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    // Already in (or near) the viewport at mount → reveal immediately.
    // Guarantees above-the-fold content never stays hidden if the observer
    // callback is delayed, while below-the-fold content still waits for scroll.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + 120 && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target); // once only
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
