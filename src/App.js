import { Suspense, lazy, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
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

// Scroll to top whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const { data: settings } = useFetch(getSettings, {});
  const s = settings || {};

  const title = s.seo_title || "DK's Portfolio";
  const desc = s.seo_description || "Freelance Mobile App & Web developer.";
  const ga = s.analytics_id;

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        {s.og_image ? <meta property="og:image" content={s.og_image} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {/* Google Analytics (only when an ID is configured) */}
        {ga ? <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}></script> : null}
        {ga ? (
          <script>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}</script>
        ) : null}
      </Helmet>

      <div className="App">
        {isOn(s, "smoke_visible") && <Smoke />}
        <Fireflies />
        <CardFX />
        <ScrollToTop />
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
