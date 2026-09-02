import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/img/logo.svg';
import { useFetch } from "../hooks/useFetch";
import { getContact } from "../services/api";
import { pickPrimary } from "../utils/contact";

const isOn = (settings, key) => {
  const v = settings ? settings[key] : undefined;
  if (v === undefined || v === null) return true;
  return v === "1" || v === 1 || v === true;
};

export const NavBar = ({ settings = {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  const { data: links } = useFetch(getContact, []);
  const primary = pickPrimary(links, settings);

  // Single source of truth for the highlighted nav item.
  const activeId =
    location.pathname.startsWith("/projects") ? "projects" :
    location.pathname === "/about" ? "about" :
    activeSection;

  // Collapse the mobile menu whenever the route changes.
  useEffect(() => { setExpanded(false); }, [location.pathname]);

  useEffect(() => {
    const sections = ["home", "skills", "services"];
    let ticking = false;
    const measure = () => {
      ticking = false;
      setScrolled(window.scrollY > 50);
      if (location.pathname !== "/") return;
      const line = 160; // just below the fixed navbar
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = id;
      }
      setActiveSection((prev) => (prev === current ? prev : current));
    };
    // rAF-throttle so scroll events don't trigger layout reads + re-renders on
    // every pixel (was a source of scroll jank on mobile).
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Scroll to a section on Home; if on another route, go Home first then scroll.
  const goSection = (id) => (e) => {
    e.preventDefault();
    setActiveSection(id);
    setExpanded(false);
    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      // Offset for the fixed navbar; scrollIntoView ignores it.
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 220);
    } else {
      // Wait for the mobile menu to collapse before measuring — otherwise the
      // still-expanded menu shifts layout and the scroll lands in the wrong place.
      setTimeout(scroll, 180);
    }
  };

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={setExpanded} className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" activeKey={activeId}>
            <Nav.Link eventKey="home" className="navbar-link" onClick={goSection("home")} href="/#home">Home</Nav.Link>
            <Nav.Link eventKey="skills" className="navbar-link" onClick={goSection("skills")} href="/#skills">Skills</Nav.Link>
            <Nav.Link eventKey="services" className="navbar-link" onClick={goSection("services")} href="/#services">Services</Nav.Link>
            {isOn(settings, "projects_visible") && <Nav.Link eventKey="projects" as={Link} to="/projects" className="navbar-link" onClick={() => setExpanded(false)}>Projects</Nav.Link>}
            {isOn(settings, "about_visible") && <Nav.Link eventKey="about" as={Link} to="/about" className="navbar-link" onClick={() => setExpanded(false)}>About</Nav.Link>}
          </Nav>
          <span className="navbar-text">
            {primary && (
              <a target="_blank" rel="noreferrer" href={primary.url}>
                <button className="vvd"><span>{primary.label || "Let’s Connect"}</span></button>
              </a>
            )}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
