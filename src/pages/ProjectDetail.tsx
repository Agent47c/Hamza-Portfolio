import { useEffect, useRef, useState, useCallback, KeyboardEvent as ReactKeyboardEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, ProjectData, findProjectBySlug } from "../data/projectsData";
import { hasInAppHistory, scrollToTopImmediate, restoreScrollPosition, getSavedScrollPosition } from "../utils/scrollRestoration";
import { useSmoothScroll, getLenis } from "../hooks/useSmoothScroll";
import "./styles/ProjectDetail.css";

gsap.registerPlugin(ScrollTrigger);

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollTo } = useSmoothScroll();

  const [stickyHeaderVisible, setStickyHeaderVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Find project by slug or alias
  const project: ProjectData | undefined = findProjectBySlug(slug);

  const projectIndex = project ? PROJECTS.findIndex((p) => p.slug === project.slug) : -1;
  // Circular wrap-around for Previous and Next projects
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  // Scroll to top immediately on entering via card click
  useEffect(() => {
    scrollToTopImmediate();
  }, [slug]);

  // Document Title, Meta tags, and Screen Reader focus
  useEffect(() => {
    if (project) {
      document.title = project.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", project.seoDescription);
      }
      // Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", project.title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", project.shortDescription);

      // Move focus to page heading for screen readers
      headingRef.current?.focus();
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".case-study-hero > *", {
        opacity: 0,
        y: 16,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate Architecture Pipeline SVG Nodes on Scroll
      gsap.utils.toArray<HTMLElement>(".pipeline-node").forEach((node, idx) => {
        gsap.from(node, {
          opacity: 0,
          scale: 0.95,
          y: 12,
          duration: 0.4,
          delay: idx * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pipeline-diagram-track",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [slug, project]);

  // Sticky mini-header visible when scrolled past hero
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".case-study-hero");
      if (hero) {
        const bottom = hero.getBoundingClientRect().bottom;
        setStickyHeaderVisible(bottom < 80);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle in-page "Back" navigation
  const handleBack = useCallback(() => {
    if (hasInAppHistory()) {
      navigate(-1);
    } else {
      navigate("/");
      setTimeout(() => {
        const savedHomeY = getSavedScrollPosition("/", "/");
        if (savedHomeY !== undefined && savedHomeY > 0) {
          restoreScrollPosition(savedHomeY);
        } else {
          scrollTo("#projects");
        }
      }, 80);
    }
  }, [navigate, scrollTo]);

  // Keyboard navigation: ESC to go back or close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
          const lenis = getLenis();
          if (lenis) lenis.start();
        } else {
          handleBack();
        }
      } else if (lightboxOpen) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev + 1) % (project?.gallery.length || 1));
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev - 1 + (project?.gallery.length || 1)) % (project?.gallery.length || 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBack, lightboxOpen, project?.gallery.length]);

  // Lightbox open / close with Lenis scroll lock
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    const lenis = getLenis();
    if (lenis) lenis.stop();
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    const lenis = getLenis();
    if (lenis) lenis.start();
  };

  if (!project) {
    return (
      <div className="case-study-page">
        <div className="container not-found-container">
          <h1 className="project-page-title">Project Not Found</h1>
          <p className="not-found-desc">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <button type="button" className="btn-back-action" onClick={() => navigate("/")}>
            ← Return to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="case-study-page" ref={pageRef} aria-label={`Project: ${project.title}`}>
      {/* Sticky Mini-Header */}
      <div
        className={`sticky-mini-header ${stickyHeaderVisible ? "is-visible" : ""}`}
        aria-hidden={!stickyHeaderVisible}
      >
        <div className="container mini-header-inner">
          <button
            type="button"
            className="mini-header-back"
            onClick={handleBack}
            aria-label="Back to projects"
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
          <div className="mini-header-title">
            <span className="mini-header-idx">{project.number}</span>
            <span className="mini-header-text">{project.title}</span>
          </div>
          <button
            type="button"
            className="mini-header-top"
            onClick={() => scrollTo(0)}
            aria-label="Scroll to top of project"
          >
            Top ↑
          </button>
        </div>
      </div>

      <div className="container">
        {/* Navigation Bar */}
        <div className="case-study-nav">
          <button
            type="button"
            className="btn-back"
            onClick={handleBack}
            aria-label="Return to projects"
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back to Projects</span>
          </button>

          <div className="case-study-top-actions">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-case-action btn-case-demo"
              >
                <span>Live Demo</span>
                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-case-action btn-case-github"
              >
                <span>GitHub Source</span>
                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* 1. Project Hero */}
        <header className="case-study-hero">
          <div className="case-study-meta-top">
            <span className="case-study-number">{project.number}</span>
            <span className="meta-slash">//</span>
            <span className="case-study-category">{project.category}</span>
          </div>

          <h1
            className="project-page-title"
            tabIndex={-1}
            ref={headingRef}
          >
            {project.title}
          </h1>

          <p className="case-study-summary">{project.shortDescription}</p>

          <div className="case-study-spec-strip" role="region" aria-label="Project Metadata">
            <div className="spec-strip-item">
              <span className="spec-strip-key">ROLE</span>
              <span className="spec-strip-val">{project.role}</span>
            </div>
            <div className="spec-strip-item">
              <span className="spec-strip-key">YEAR</span>
              <span className="spec-strip-val">{project.year}</span>
            </div>
            <div className="spec-strip-item">
              <span className="spec-strip-key">PRIMARY STACK</span>
              <span className="spec-strip-val">{project.technologies.slice(0, 4).join(" • ")}</span>
            </div>
            <div className="spec-strip-item">
              <span className="spec-strip-key">DELIVERY</span>
              <span className="spec-strip-val">{project.statusNote || "Production / Open Source"}</span>
            </div>
          </div>
        </header>

        {/* 2. Large Hero Image or Demo Video Slot */}
        <section className="case-study-media-slot" aria-label="Project Visual">
          <div className="media-container" onClick={() => openLightbox(0)}>
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              width="1200"
              height="675"
              className="case-study-hero-image"
              style={{ viewTransitionName: "project-hero-image" }}
            />
            <div className="media-zoom-hint" aria-hidden="true">
              <span>Inspect Image ↗</span>
            </div>
          </div>
        </section>

        {/* 3. Deep-Dive Content: Overview, Problem, Approach, How It Works */}
        <div className="case-study-body-grid">
          <div className="case-study-main-col">
            <section className="case-study-section">
              <span className="section-mono-label">01 / CONTEXT</span>
              <h2 className="section-subtitle">Overview</h2>
              <p className="case-study-paragraph">{project.overview}</p>
            </section>

            <section className="case-study-section">
              <span className="section-mono-label">02 / THE CHALLENGE</span>
              <h2 className="section-subtitle">Problem & Constraints</h2>
              <p className="case-study-paragraph">{project.problem}</p>
            </section>

            <section className="case-study-section">
              <span className="section-mono-label">03 / METHODOLOGY</span>
              <h2 className="section-subtitle">Engineering Approach</h2>
              <p className="case-study-paragraph">{project.approach}</p>
            </section>

            <section className="case-study-section">
              <span className="section-mono-label">04 / MECHANICS</span>
              <h2 className="section-subtitle">How It Works</h2>
              <p className="case-study-paragraph">{project.howItWorks}</p>
            </section>
          </div>

          <aside className="case-study-sidebar">
            {/* Tech Stack Chips */}
            <div className="sidebar-card">
              <span className="sidebar-title">Technologies Used</span>
              <div className="sidebar-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="sidebar-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results / Outcomes */}
            <div className="sidebar-card">
              <span className="sidebar-title">Verified Results & Metrics</span>
              <div className="sidebar-metrics">
                {project.results.map((res, i) => (
                  <div key={i} className="metric-row">
                    <span className="metric-label">{res.label}</span>
                    <span className={`metric-value ${res.isReal ? "is-verified" : "is-todo"}`}>
                      {res.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Card */}
            <div className="sidebar-card sidebar-card-action">
              <span className="sidebar-title">Source & Artifacts</span>
              <p className="sidebar-note">
                Interested in testing or extending this pipeline?
              </p>
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sidebar-btn-primary"
                >
                  <span>View Repository</span>
                  <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ) : (
                <div className="sidebar-badge-offline">
                  Local / Private Enterprise Source
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* 4. Architecture Section: Animated SVG Pipeline Diagram */}
        <section className="case-study-architecture-section" aria-label="System Architecture">
          <div className="architecture-header">
            <span className="section-mono-label">SYSTEM ARCHITECTURE</span>
            <h2 className="section-subtitle">Data & Inference Pipeline</h2>
            <p className="architecture-lead">
              Sequential flow diagram illustrating data ingestion, neural processing, tracking, and edge alerting.
            </p>
          </div>

          <div className="pipeline-diagram-track">
            {project.pipelineNodes.map((node, i) => (
              <div key={node.id} className="pipeline-step-wrap">
                <div className="pipeline-node">
                  <div className="node-step-badge">{String(i + 1).padStart(2, "0")}</div>
                  <h4 className="node-label">{node.label}</h4>
                  {node.subtext && <p className="node-subtext">{node.subtext}</p>}
                </div>
                {i < project.pipelineNodes.length - 1 && (
                  <div className="pipeline-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detailed Pipeline Breakdown */}
          {project.pipeline && (
            <div className="pipeline-bullet-list">
              {project.pipeline.map((step, idx) => (
                <div key={idx} className="pipeline-bullet-item">
                  <span className="bullet-num">{String(idx + 1).padStart(2, "0")}.</span>
                  <span className="bullet-text">{step}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 5. Key Features Grid */}
        <section className="case-study-features-section" aria-label="Key Features">
          <div className="architecture-header">
            <span className="section-mono-label">FUNCTIONALITY</span>
            <h2 className="section-subtitle">Key System Features</h2>
          </div>

          <div className="features-grid">
            {project.features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <span className="feature-icon">✓</span>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Gallery Section with Lightbox */}
        <section className="case-study-gallery-section" aria-label="Visual Gallery">
          <div className="architecture-header">
            <span className="section-mono-label">ARTIFACTS</span>
            <h2 className="section-subtitle">Visual Documentation</h2>
          </div>

          <div className="gallery-grid">
            {project.gallery.map((item, idx) => (
              <div
                key={item.id}
                className="gallery-item-card"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e: ReactKeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(idx);
                }}
                aria-label={`Enlarge image: ${item.caption}`}
              >
                <div className="gallery-thumb-container">
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <div className="gallery-overlay-hint">Enlarge ↗</div>
                </div>
                <p className="gallery-caption">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Bottom Navigation: Next & Previous Project with Wrap-Around */}
        <nav className="case-study-pagination" aria-label="Project Navigation">
          <Link
            to={`/projects/${prevProject.slug}`}
            className="pagination-card pagination-prev"
            aria-label={`Previous Project: ${prevProject.title}`}
          >
            <span className="pagination-direction">← PREVIOUS PROJECT</span>
            <span className="pagination-title">{prevProject.title}</span>
            <span className="pagination-category">{prevProject.category}</span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="pagination-card pagination-next"
            aria-label={`Next Project: ${nextProject.title}`}
          >
            <span className="pagination-direction">NEXT PROJECT →</span>
            <span className="pagination-title">{nextProject.title}</span>
            <span className="pagination-category">{nextProject.category}</span>
          </Link>
        </nav>
      </div>

      {/* Lightbox Modal with ESC close, arrow keys, and focus trap */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          onClick={closeLightbox}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close Lightbox (ESC)"
            >
              ✕
            </button>

            <img
              src={project.gallery[lightboxIndex]?.src || project.image}
              alt={project.gallery[lightboxIndex]?.caption || project.alt}
              className="lightbox-image"
            />

            <div className="lightbox-footer">
              <p className="lightbox-caption">
                {project.gallery[lightboxIndex]?.caption || project.alt}
              </p>
              <div className="lightbox-controls">
                <button
                  type="button"
                  className="lightbox-arrow"
                  onClick={() =>
                    setLightboxIndex(
                      (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
                    )
                  }
                  aria-label="Previous Image"
                >
                  ←
                </button>
                <span className="lightbox-counter">
                  {lightboxIndex + 1} / {project.gallery.length}
                </span>
                <button
                  type="button"
                  className="lightbox-arrow"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev + 1) % project.gallery.length)
                  }
                  aria-label="Next Image"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProjectDetail;
