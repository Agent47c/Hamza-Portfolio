import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../data/projectsData";
import "./styles/ProjectIndex.css";

gsap.registerPlugin(ScrollTrigger);

export const ProjectIndex = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-tile").forEach((tile) => {
        const img = tile.querySelector(".tile-image-inner img");
        const title = tile.querySelector(".tile-title");
        const actionRow = tile.querySelector(".tile-action-row");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tile,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.from(tile, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        });

        if (img) {
          tl.from(
            img,
            {
              scale: 1.03,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }

        if (title) {
          tl.from(
            title,
            {
              opacity: 0,
              y: 8,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }

        if (actionRow) {
          tl.from(
            actionRow,
            {
              opacity: 0,
              x: -4,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const p1 = PROJECTS[0]; // PPE Safety Monitor (Large Horizontal)
  const p2 = PROJECTS[1]; // Brain Tumor (Side by side left)
  const p3 = PROJECTS[2]; // IronLog (Side by side right)
  const p4 = PROJECTS[3]; // Farm Camera (Large Horizontal)
  const p5 = PROJECTS[4]; // Windows Backup Tool (Side by side left)
  const p6 = PROJECTS[5]; // House Price Prediction (Side by side right)

  return (
    <section className="section project-index-section" id="projects" ref={sectionRef} aria-label="Selected Projects">
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
