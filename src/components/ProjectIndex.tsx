import { useRef, useEffect, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projectsData";
import { saveScrollPosition, incrementNavigationCount } from "../utils/scrollRestoration";
import { markElementRevealed, isElementRevealed } from "../utils/motion";
import "./styles/ProjectIndex.css";

gsap.registerPlugin(ScrollTrigger);

export const ProjectIndex = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-tile").forEach((tile, index) => {
        const tileId = `tile-${index}`;
        // If already revealed during this session, keep visible and don't re-animate
        if (isElementRevealed(tileId)) {
          gsap.set(tile, { opacity: 1, y: 0 });
          return;
        }

        gsap.from(tile, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tile,
            start: "top 90%",
            toggleActions: "play none none none",
            onEnter: () => markElementRevealed(tileId),
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Subtle 3D tilt & border spotlight tracking (disabled on touch)
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variables for pointer spotlight
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Subtle 3D tilt for featured horizontal cards (max 4 degrees)
    if (card.classList.contains("project-tile-horizontal")) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      const img = card.querySelector<HTMLElement>(".tile-image-inner img");
      if (img) {
        img.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`;
      }
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");
    const img = card.querySelector<HTMLElement>(".tile-image-inner img");
    if (img) {
      img.style.transform = "";
    }
  };

  const handleCardClick = (e: MouseEvent<HTMLAnchorElement>, slug: string) => {
    // Save current scroll position before navigating
    saveScrollPosition(window.location.pathname + window.location.search, "/");
    incrementNavigationCount();

    // Use View Transitions API if supported
    if ("startViewTransition" in document && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      e.preventDefault();
      // Set transition name on the clicked image
      const img = e.currentTarget.querySelector(".tile-image-inner img");
      if (img) {
        (img as HTMLElement).style.viewTransitionName = "project-hero-image";
      }

      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        navigate(`/projects/${slug}`);
      });
    }
  };

  const p1 = PROJECTS[0]; // PPE Safety Monitor
  const p2 = PROJECTS[1]; // Brain Tumor Segmentation
  const p3 = PROJECTS[2]; // IronLog Gym Tracker
  const p4 = PROJECTS[3]; // Farm Camera Daily Overview
  const p5 = PROJECTS[4]; // Windows Smart Backup Tool
  const p6 = PROJECTS[5]; // House Price Prediction

  return (
    <section className="section project-index-section" id="projects" ref={sectionRef} aria-label="Selected Projects">
      <span id="work" className="section-anchor-shim" aria-hidden="true" style={{ position: "absolute", top: "-80px" }} />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-lead">
            Curated engineering projects across computer vision, deep learning pipelines,
            mobile development, and system automation. Click any project to inspect the architecture and source code.
          </p>
        </div>

        <div className="project-curated-showcase">
          {/* TODO (Hamza): Replace mockup visual with production screenshot or short looping video demo (muted, playsInline, lazy-loaded) */}
          {/* PROJECT 01: Large Horizontal Anchor Project */}
          {p1 && (
            <Link
              to={`/projects/${p1.slug}`}
              className="project-tile project-tile-horizontal project-surface-dark"
              aria-label={`Open project details: ${p1.title}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCardClick(e, p1.slug)}
            >
              <div className="project-horizontal-content">
                <div className="tile-badge-group">
                  <span className="tile-idx">{p1.number}</span>
                  <span className="tile-cat-divider">//</span>
                  <span className="tile-cat">{p1.category}</span>
                </div>

                <div className="tile-title-group">
                  <h3 className="tile-title tile-title-lg">{p1.title}</h3>
                  <p className="tile-desc">{p1.shortDescription}</p>
                </div>

                <div className="tile-meta-block">
                  <div className="tile-tech-list">
                    {p1.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="tile-tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="tile-action-row">
                    <span>VIEW PROJECT</span>
                    <span className="tile-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </div>

              <div className="tile-image-container tile-image-horizontal">
                <div className="tile-image-inner">
                  <img
                    src={p1.image}
                    alt={p1.alt}
                    loading="lazy"
                    width="800"
                    height="480"
                  />
                  {/* AI-themed hover overlay: YOLO detection boxes & confidence labels */}
                  <div className="ai-overlay ai-overlay-ppe" aria-hidden="true">
                    <svg viewBox="0 0 400 240" className="ai-overlay-svg" preserveAspectRatio="none">
                      <rect x="70" y="40" width="110" height="175" className="ai-box ai-box-worker" />
                      <rect x="90" y="42" width="55" height="38" className="ai-box ai-box-helmet" />
                      <rect x="80" y="85" width="85" height="75" className="ai-box ai-box-vest" />
                      <text x="72" y="34" className="ai-tag">WORKER 0.96</text>
                      <text x="92" y="38" className="ai-tag ai-tag-accent">HARDHAT 0.98</text>
                      <text x="82" y="80" className="ai-tag">VEST 0.94</text>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* PAIR 01: Project 02 + Project 03 Side by Side */}
          <div className="project-side-pair">
            {/* TODO (Hamza): Replace mockup visual with production MRI viewer screenshot or demo clip */}
            {p2 && (
              <Link
                to={`/projects/${p2.slug}`}
                className="project-tile project-tile-stacked project-surface-charcoal"
                aria-label={`Open project details: ${p2.title}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleCardClick(e, p2.slug)}
              >
                <div className="tile-image-container tile-image-stacked">
                  <div className="tile-image-inner">
                    <img
                      src={p2.image}
                      alt={p2.alt}
                      loading="lazy"
                      width="600"
                      height="380"
                    />
                    {/* AI-themed hover overlay: SAM2 tumor contour delineation */}
                    <div className="ai-overlay ai-overlay-tumor" aria-hidden="true">
                      <svg viewBox="0 0 300 190" className="ai-overlay-svg" preserveAspectRatio="none">
                        <path
                          d="M 120,65 C 145,50 180,60 195,85 C 210,110 195,145 165,155 C 135,165 105,140 98,115 C 92,90 102,75 120,65 Z"
                          className="ai-contour"
                        />
                        <circle cx="150" cy="110" r="3.5" className="ai-centroid" />
                        <text x="110" y="52" className="ai-tag ai-tag-accent">SAM2 MASK [0.98 DICE]</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="tile-stacked-content">
                  <div className="tile-stacked-main">
                    <div className="tile-badge-group">
                      <span className="tile-idx">{p2.number}</span>
                      <span className="tile-cat-divider">//</span>
                      <span className="tile-cat">{p2.category}</span>
                    </div>

                    <h3 className="tile-title tile-title-md">{p2.title}</h3>
                    <p className="tile-desc">{p2.shortDescription}</p>
                  </div>

                  <div className="tile-stacked-footer">
                    <div className="tile-tech-list">
                      {p2.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tile-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="tile-action-row">
                      <span>VIEW PROJECT</span>
                      <span className="tile-arrow" aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* TODO (Hamza): Replace mockup visual with real IronLog mobile app screenshot or screen recording */}
            {p3 && (
              <Link
                to={`/projects/${p3.slug}`}
                className="project-tile project-tile-stacked project-surface-charcoal"
                aria-label={`Open project details: ${p3.title}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleCardClick(e, p3.slug)}
              >
                <div className="tile-image-container tile-image-stacked">
                  <div className="tile-image-inner">
                    <img
                      src={p3.image}
                      alt={p3.alt}
                      loading="lazy"
                      width="600"
                      height="380"
                    />
                    {/* AI-themed hover overlay: workout telemetry chart bars growing in */}
                    <div className="ai-overlay ai-overlay-ironlog" aria-hidden="true">
                      <svg viewBox="0 0 300 190" className="ai-overlay-svg" preserveAspectRatio="none">
                        <line x1="40" y1="150" x2="260" y2="150" className="ai-grid-line" />
                        <rect x="60" y="90" width="18" height="60" className="ai-bar ai-bar-1" />
                        <rect x="95" y="65" width="18" height="85" className="ai-bar ai-bar-2" />
                        <rect x="130" y="45" width="18" height="105" className="ai-bar ai-bar-3" />
                        <rect x="165" y="75" width="18" height="75" className="ai-bar ai-bar-4" />
                        <rect x="200" y="35" width="18" height="115" className="ai-bar ai-bar-5" />
                        <text x="40" y="30" className="ai-tag">LOCAL SQLITE • 400+ EXERCISES</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="tile-stacked-content">
                  <div className="tile-stacked-main">
                    <div className="tile-badge-group">
                      <span className="tile-idx">{p3.number}</span>
                      <span className="tile-cat-divider">//</span>
                      <span className="tile-cat">{p3.category}</span>
                    </div>

                    <h3 className="tile-title tile-title-md">{p3.title}</h3>
                    <p className="tile-desc">{p3.shortDescription}</p>
                  </div>

                  <div className="tile-stacked-footer">
                    <div className="tile-tech-list">
                      {p3.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tile-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="tile-action-row">
                      <span>VIEW PROJECT</span>
                      <span className="tile-arrow" aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* TODO (Hamza): Replace mockup visual with production RTSP analytics demo clip */}
          {/* PROJECT 04: Large Horizontal Project */}
          {p4 && (
            <Link
              to={`/projects/${p4.slug}`}
              className="project-tile project-tile-horizontal project-surface-dark"
              aria-label={`Open project details: ${p4.title}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCardClick(e, p4.slug)}
            >
              <div className="project-horizontal-content">
                <div className="tile-badge-group">
                  <span className="tile-idx">{p4.number}</span>
                  <span className="tile-cat-divider">//</span>
                  <span className="tile-cat">{p4.category}</span>
                </div>

                <div className="tile-title-group">
                  <h3 className="tile-title tile-title-lg">{p4.title}</h3>
                  <p className="tile-desc">{p4.shortDescription}</p>
                </div>

                <div className="tile-meta-block">
                  <div className="tile-tech-list">
                    {p4.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="tile-tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="tile-action-row">
                    <span>VIEW PROJECT</span>
                    <span className="tile-arrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </div>

              <div className="tile-image-container tile-image-horizontal">
                <div className="tile-image-inner">
                  <img
                    src={p4.image}
                    alt={p4.alt}
                    loading="lazy"
                    width="800"
                    height="480"
                  />
                  {/* AI-themed hover overlay: sequential event ticks on timeline */}
                  <div className="ai-overlay ai-overlay-farm" aria-hidden="true">
                    <svg viewBox="0 0 400 240" className="ai-overlay-svg" preserveAspectRatio="none">
                      <line x1="30" y1="200" x2="370" y2="200" className="ai-timeline-line" />
                      <circle cx="80" cy="200" r="4" className="ai-tick ai-tick-1" />
                      <circle cx="160" cy="200" r="4" className="ai-tick ai-tick-2" />
                      <circle cx="260" cy="200" r="4" className="ai-tick ai-tick-3" />
                      <circle cx="330" cy="200" r="4" className="ai-tick ai-tick-4" />
                      <text x="32" y="180" className="ai-tag">[08:14:22] LIVESTOCK DETECTED</text>
                      <text x="32" y="40" className="ai-tag ai-tag-accent">TAPO C200 • LOCAL RTSP INGESTION</text>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* PAIR 02: Project 05 + Project 06 Side by Side */}
          <div className="project-side-pair">
            {/* TODO (Hamza): Replace mockup visual with production GUI backup tool screenshot */}
            {p5 && (
              <Link
                to={`/projects/${p5.slug}`}
                className="project-tile project-tile-stacked project-surface-charcoal"
                aria-label={`Open project details: ${p5.title}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleCardClick(e, p5.slug)}
              >
                <div className="tile-image-container tile-image-stacked">
                  <div className="tile-image-inner">
                    <img
                      src={p5.image}
                      alt={p5.alt}
                      loading="lazy"
                      width="600"
                      height="380"
                    />
                  </div>
                </div>

                <div className="tile-stacked-content">
                  <div className="tile-stacked-main">
                    <div className="tile-badge-group">
                      <span className="tile-idx">{p5.number}</span>
                      <span className="tile-cat-divider">//</span>
                      <span className="tile-cat">{p5.category}</span>
                    </div>

                    <h3 className="tile-title tile-title-md">{p5.title}</h3>
                    <p className="tile-desc">{p5.shortDescription}</p>
                  </div>

                  <div className="tile-stacked-footer">
                    <div className="tile-tech-list">
                      {p5.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tile-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="tile-action-row">
                      <span>VIEW PROJECT</span>
                      <span className="tile-arrow" aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* TODO (Hamza): Replace mockup visual with real feature importance & residual analysis plots */}
            {p6 && (
              <Link
                to={`/projects/${p6.slug}`}
                className="project-tile project-tile-stacked project-surface-charcoal"
                aria-label={`Open project details: ${p6.title}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleCardClick(e, p6.slug)}
              >
                <div className="tile-image-container tile-image-stacked">
                  <div className="tile-image-inner">
                    <img
                      src={p6.image}
                      alt={p6.alt}
                      loading="lazy"
                      width="600"
                      height="380"
                    />
                  </div>
                </div>

                <div className="tile-stacked-content">
                  <div className="tile-stacked-main">
                    <div className="tile-badge-group">
                      <span className="tile-idx">{p6.number}</span>
                      <span className="tile-cat-divider">//</span>
                      <span className="tile-cat">{p6.category}</span>
                    </div>

                    <h3 className="tile-title tile-title-md">{p6.title}</h3>
                    <p className="tile-desc">{p6.shortDescription}</p>
                  </div>

                  <div className="tile-stacked-footer">
                    <div className="tile-tech-list">
                      {p6.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tile-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="tile-action-row">
                      <span>VIEW PROJECT</span>
                      <span className="tile-arrow" aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectIndex;
