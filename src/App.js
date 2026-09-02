import { Suspense, lazy, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { CardFX } from "./components/CardFX";
import { Fireflies } from "./components/Fireflies";
import { Smoke } from "./components/Smoke";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { PageSkeleton } from "./components/Skeleton";
import { useFetch } from "./hooks/useFetch";
import { getSettings } from "./services/api";
import "bootstrap/dist/css/bootstrap.min.css";

// Code-split the heavier project routes so the Home bundle stays light.
const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const AboutPage = lazy(() => import("./components/AboutPage"));

const isOn = (settings, key) => {
  const v = settings ? settings[key] : undefined;
  if (v === undefined || v === null) return true;
  return v === "1" || v === 1 || v === true;
};

// Scroll to top whenever the route changes. The global `html { scroll-behavior:
// smooth }` would otherwise animate this jump from the previous scroll position
// (looks like the page scrolling up from the bottom on mobile), so temporarily
// force an instant jump and restore smooth for in-page anchor navigation.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { html.style.scrollBehavior = prev; });
  }, [pathname]);
  return null;
}

// Restore the last in-app route after a reload. The site is embedded in an
// iframe whose `src` has no hash, so reloading the page would reset it to Home;
// we remember the route per-tab and restore it when we land back on Home.
function RoutePersistence() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("dk_route");
      if (saved && saved !== "/" && pathname === "/") navigate(saved, { replace: true });
    } catch (e) { /* storage blocked */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem("dk_route", pathname); } catch (e) { /* ignore */ }
  }, [pathname]);
  return null;
}

function App() {
  const { data: settings } = useFetch(getSettings, {});
  const s = settings || {};

  const title = s.seo_title || "DK's Portfolio";
  const desc = s.seo_description || "Freelance Mobile App & Web developer.";
  const ga = s.analytics_id;

  // Google Analytics — injected imperatively into <head>. react-helmet does not
  // reliably render/execute <script> children, so GA is loaded here instead.
  useEffect(() => {
    if (!ga || window.__gaLoaded) return;
    window.__gaLoaded = true;
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
    document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", ga);
  }, [ga]);

  // Optional image protection (admin toggle) — block right-click context menu and
  // drag-to-save on images site-wide. Off by default (only active when set to "1").
  useEffect(() => {
    if (s.protect_images !== "1" && s.protect_images !== 1) return;
    const isImg = (t) => t && (t.tagName === "IMG" || t.tagName === "PICTURE" ||
      (t.tagName === "svg") || (t.closest && t.closest(".phone-mock, .web-mock, .proj-img, img")));
    const onCtx = (e) => { if (isImg(e.target)) e.preventDefault(); };
    const onDrag = (e) => { if (isImg(e.target)) e.preventDefault(); };
    document.addEventListener("contextmenu", onCtx);
    document.addEventListener("dragstart", onDrag);
    return () => {
      document.removeEventListener("contextmenu", onCtx);
      document.removeEventListener("dragstart", onDrag);
    };
  }, [s.protect_images]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deepak Kumar (DK)",
    jobTitle: "Mobile App & Web Developer",
    description: desc,
  };

  return (
    <HashRouter>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" type="image/x-icon" href={`${process.env.PUBLIC_URL}/favicon.ico`} />
        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        {s.og_image ? <meta property="og:image" content={s.og_image} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="App">
        {isOn(s, "smoke_visible") && <Smoke />}
        <Fireflies />
        <CardFX />
        <ScrollToTop />
        <RoutePersistence />
        <NavBar settings={s} />
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home settings={s} />} />
            <Route path="/about" element={<AboutPage settings={s} />} />
            {isOn(s, "projects_visible") && <Route path="/projects" element={<ProjectsPage settings={s} />} />}
            {isOn(s, "projects_visible") && <Route path="/projects/:id" element={<ProjectDetail />} />}
          </Routes>
        </Suspense>
        {isOn(s, "contact_visible") && <Footer settings={s} />}
      </div>
    </HashRouter>
  );
}

export default App;
