import 'animate.css';
import { useInView } from "../hooks/useInView";

// Scroll reveal using the original animate.css entrances (sliding/zoom), but
// triggered ONCE via IntersectionObserver so they never replay/jank on scroll.
// `animation` = any animate.css name (fadeInLeftBig, fadeInTopLeft, zoomIn, ...).
export const Reveal = ({ children, animation = "fadeInUp", delay = 0, className = "", as: Tag = "div" }) => {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`${inView ? `animate__animated animate__${animation}` : "reveal-hidden"} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};
