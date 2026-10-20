import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { PROJECTS, ProjectData } from "../data/projectsData";
import "./styles/ProjectDetail.css";

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project: ProjectData | undefined = PROJECTS[projectIndex];

  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    if (project) {
      document.title = project.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", project.seoDescription);
      }
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-hero-header > *", {
        opacity: 0,
        y: 16,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(".case-study-hero-image", {
        opacity: 0,
        scale: 0.98,
        duration: 0.55,
        delay: 0.08,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, [slug, project]);

  // Support ESC key to quickly return back to projects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (!project) {
    return (
      <div className="case-study-page">
        <div className="container" style={{ textAlign: "center", paddingTop: "120px" }}>
          <h1 className="project-page-title" style={{ fontSize: "2.4rem" }}>
            Project Not Found
          </h1>
          <p style={{ marginTop: "16px", color: "var(--c-text-secondary)" }}>
            The project you're looking for doesn't exist or has moved.
          </p>
          <div style={{ marginTop: "32px" }}>
            <button
              type="button"
              className="btn-github-action"
              onClick={() => navigate("/")}
            >
              ← Return to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="case-study-page" ref={pageRef} aria-label={`Project: ${project.title}`}>
      <div className="container">
        {/* Navigation Bar */}
        <div className="case-study-nav">
          <Link to="/" className="btn-back" aria-label="Return to all projects">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 13L5 8L10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to Projects</span>
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study-github-top"
            >
              <span>GitHub Repository</span>
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
          )}
        </div>

        {/* Project Header */}
        <header className="project-hero-header">
          <div className="project-meta-strip">
            <span className="project-page-num">PROJECT {project.number}</span>
            <span className="project-page-category">{project.category}</span>
          </div>

          <h1 className="project-page-title">{project.title}</h1>
          <p className="project-page-subtitle">{project.shortDescription}</p>

          <div className="project-tech-row">
            {project.technologies.map((t) => (
              <span key={t} className="tech-tag-detailed">
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Hero Visual */}
        <div className="case-study-hero-image">
          <img
            src={project.image}
            alt={project.alt}
            width="1200"
            height="675"
          />
        </div>

        {/* Case Study Content Breakdown */}
        <div className="case-study-body">
          {/* Overview */}
          <section className="case-section">
            <span className="case-section-label">Overview</span>
            <h2 className="case-section-heading">What It Is</h2>
            <p className="case-prose">{project.overview}</p>
          </section>

          {/* The Problem */}
          <section className="case-section">
            <span className="case-section-label">The Problem</span>
            <h2 className="case-section-heading">Why I Built It</h2>
            <p className="case-prose">{project.problem}</p>
          </section>

          {/* How It Works */}
          <section className="case-section">
            <span className="case-section-label">Architecture</span>
            <h2 className="case-section-heading">How It Works</h2>
            <p className="case-prose">{project.howItWorks}</p>

            {project.pipeline && project.pipeline.length > 0 && (
              <div className="pipeline-diagram" style={{ marginTop: "24px" }}>
                {project.pipeline.map((step, idx) => (
                  <div key={idx} className="pipeline-diagram-wrapper">
                    <div className="pipeline-diagram-step">
                      <span className="pipeline-diagram-idx">{idx + 1}</span>
                      <span className="pipeline-diagram-desc">{step}</span>
                    </div>
                    {idx < project.pipeline!.length - 1 && (
                      <div className="pipeline-diagram-connector" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="case-section">
              <span className="case-section-label">Capabilities</span>
              <h2 className="case-section-heading">Key Features</h2>
              <div className="evidence-list">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="evidence-item">
                    <span className="evidence-bullet" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Action / Source Code Panel */}
          <div className="case-study-action-panel">
            <div className="action-panel-text">
              <h4>Project Source Code & Demo</h4>
              <p>
                {project.githubUrl
                  ? "You can inspect the code and setup instructions on GitHub."
                  : project.statusNote || "This project is built and maintained locally."}
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github-action"
                  style={{ backgroundColor: "var(--c-surface)", color: "var(--c-text-primary)", borderColor: "var(--c-border)" }}
                >
                  <span>Watch Demo Video</span>
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
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github-action"
                >
                  <span>View on GitHub</span>
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
              ) : (
                <span className="case-study-github-top" style={{ padding: "12px 20px" }}>
                  {project.statusNote || "Local Application"}
                </span>
              )}
            </div>
          </div>

          {/* Pagination Navigation */}
          <nav className="project-pagination" aria-label="Project Navigation">
            {prevProject ? (
              <Link to={`/projects/${prevProject.slug}`} className="pagination-card">
                <span className="pagination-dir">← Previous Project</span>
                <span className="pagination-title">{prevProject.title}</span>
              </Link>
            ) : (
              <Link to="/" className="pagination-card">
                <span className="pagination-dir">← All Projects</span>
                <span className="pagination-title">Back to Project Index</span>
              </Link>
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="pagination-card"
                style={{ textAlign: "right" }}
              >
                <span className="pagination-dir">Next Project →</span>
                <span className="pagination-title">{nextProject.title}</span>
              </Link>
            ) : (
              <Link
                to="/"
                className="pagination-card"
                style={{ textAlign: "right" }}
              >
                <span className="pagination-dir">All Projects →</span>
                <span className="pagination-title">Back to Homepage</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;
