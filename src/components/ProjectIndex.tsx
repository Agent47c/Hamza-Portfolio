import { useRef, useEffect, MouseEvent, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, ProjectData } from "../data/projectsData";
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

  const renderHorizontalTile = (p: ProjectData) => (
    <Link
      key={p.slug}
      to={`/projects/${p.slug}`}
      className="project-tile project-tile-horizontal project-surface-dark"
      aria-label={`Open project details: ${p.title}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleCardClick(e, p.slug)}
    >
      <div className="project-horizontal-content">
        <div className="tile-badge-group">
          <span className="tile-idx">{p.number}</span>
          <span className="tile-cat-divider">//</span>
          <span className="tile-cat">{p.category}</span>
        </div>

        <div className="tile-title-group">
          <h3 className="tile-title tile-title-lg">{p.title}</h3>
          <p className="tile-desc">{p.shortDescription}</p>
        </div>

        <div className="tile-meta-block">
          <div className="tile-tech-list">
            {p.technologies.slice(0, 5).map((t) => (
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
            src={p.image}
            alt={p.alt}
            loading="lazy"
            width="800"
            height="480"
          />
        </div>
      </div>
    </Link>
  );

  const renderStackedTile = (p: ProjectData) => (
    <Link
      key={p.slug}
      to={`/projects/${p.slug}`}
      className="project-tile project-tile-stacked project-surface-charcoal"
      aria-label={`Open project details: ${p.title}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => handleCardClick(e, p.slug)}
    >
      <div className="tile-image-container tile-image-stacked">
        <div className="tile-image-inner">
          <img
            src={p.image}
            alt={p.alt}
            loading="lazy"
            width="600"
            height="380"
          />
        </div>
      </div>

      <div className="tile-stacked-content">
        <div className="tile-stacked-main">
          <div className="tile-badge-group">
            <span className="tile-idx">{p.number}</span>
            <span className="tile-cat-divider">//</span>
            <span className="tile-cat">{p.category}</span>
          </div>

          <h3 className="tile-title tile-title-md">{p.title}</h3>
          <p className="tile-desc">{p.shortDescription}</p>
        </div>

        <div className="tile-stacked-footer">
          <div className="tile-tech-list">
            {p.technologies.slice(0, 4).map((t) => (
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
  );

  return (
    <section className="section project-index-section" id="projects" ref={sectionRef} aria-label="Selected Projects">
      <span id="work" className="section-anchor-shim" aria-hidden="true" style={{ position: "absolute", top: "-80px" }} />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-lead">
            Curated engineering projects across computer vision, deep learning pipelines,
            desktop automation, mobile development, and systems. Click any project to inspect the architecture and source code.
          </p>
        </div>

        <div className="project-curated-showcase">
          {Array.from({ length: Math.ceil(PROJECTS.length / 3) }).map((_, blockIdx) => {
            const horizontal = PROJECTS[blockIdx * 3];
            const stacked1 = PROJECTS[blockIdx * 3 + 1];
            const stacked2 = PROJECTS[blockIdx * 3 + 2];

            return (
              <Fragment key={blockIdx}>
                {horizontal && renderHorizontalTile(horizontal)}
                {(stacked1 || stacked2) && (
                  <div className="project-side-pair">
                    {stacked1 && renderStackedTile(stacked1)}
                    {stacked2 && renderStackedTile(stacked2)}
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectIndex;
