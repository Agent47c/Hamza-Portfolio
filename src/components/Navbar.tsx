import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

interface NavbarProps {
  onNavigate: (target: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (window.scrollY / docHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver on homepage
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["journey", "projects", "skills", "experience", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        onNavigate(target);
      }, 100);
    } else {
      onNavigate(target);
    }
  };

  return (
    <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link
            to="/"
            className="navbar-brand"
            onClick={() => {
              if (location.pathname === "/") {
                onNavigate("#hero");
              }
            }}
          >
            <div className="brand-monogram">
              HAMZA <span>RAMZAN</span>
            </div>
            <div className="brand-status">
              <span className="status-dot"></span>
              <span>Available for engineering roles</span>
            </div>
          </Link>

          <nav className="navbar-links" aria-label="Main Navigation">
            <a
              href="#journey"
              className={`nav-link ${activeSection === "journey" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#journey");
              }}
            >
              <span className="nav-indicator" aria-hidden="true" />
              <span>Journey</span>
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === "projects" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#projects");
              }}
            >
              <span className="nav-indicator" aria-hidden="true" />
              <span>Work</span>
            </a>
            <a
              href="#skills"
              className={`nav-link ${activeSection === "skills" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#skills");
              }}
            >
              <span className="nav-indicator" aria-hidden="true" />
              <span>Skills</span>
            </a>
            <a
              href="#experience"
              className={`nav-link ${activeSection === "experience" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#experience");
              }}
            >
              <span className="nav-indicator" aria-hidden="true" />
              <span>Experience</span>
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === "contact" ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
            >
              <span className="nav-indicator" aria-hidden="true" />
              <span>Contact</span>
            </a>
          </nav>

          <div className="navbar-actions">
            <a
              href="/resume/Hamza_Ramzan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cv"
              title="Open Resume PDF"
            >
              <span>Resume</span>
              <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <button
              type="button"
              className={`mobile-toggle ${mobileMenuOpen ? "is-open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav-links">
          <a
            href="#journey"
            className={`mobile-nav-link ${activeSection === "journey" ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#journey");
            }}
          >
            Journey
          </a>
          <a
            href="#projects"
            className={`mobile-nav-link ${activeSection === "projects" ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#projects");
            }}
          >
            Work
          </a>
          <a
            href="#skills"
            className={`mobile-nav-link ${activeSection === "skills" ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#skills");
            }}
          >
            Skills
          </a>
          <a
            href="#experience"
            className={`mobile-nav-link ${activeSection === "experience" ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#experience");
            }}
          >
            Experience
          </a>
          <a
            href="#contact"
            className={`mobile-nav-link ${activeSection === "contact" ? "is-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
          >
            Contact
          </a>
        </div>

        <div className="mobile-drawer-footer">
          <p>Hamza Ramzan • Machine Learning & Software Engineer</p>
          <p>Bahawalpur, Pakistan • 2026</p>
        </div>
      </div>

      {/* Thin scroll-progress indicator line under navbar */}
      <div
        className="navbar-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </header>
  );
};

export default Navbar;
