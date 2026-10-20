import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Philosophy.css";

gsap.registerPlugin(ScrollTrigger);

export const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".philosophy-row").forEach((row) => {
        const line = row.querySelector(".philosophy-heading-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        tl.from(row, {
          opacity: 0,
          y: 18,
          duration: 0.45,
          ease: "power2.out",
        });

        if (line) {
          tl.from(
            line,
            {
              scaleX: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.25"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section philosophy-section" id="about" ref={sectionRef} aria-label="About and Approach">
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">How I Approach My Work</h2>
          <p className="section-lead">
            I'm a software engineering student at The Islamia University of Bahawalpur who spends most of his time
            building real projects in computer vision, deep learning, and software. Here is what I care about when I build:
          </p>
        </div>

        <div className="philosophy-grid">
          <div className="philosophy-row">
            <div className="philosophy-num">01 / DATA</div>
            <div className="philosophy-heading-wrap">
              <h3 className="philosophy-heading">Good Data Comes First</h3>
              <div className="philosophy-heading-line" aria-hidden="true" />
            </div>
            <div className="philosophy-body">
              <p>
                Working as a <strong>QA Team Manager auditing training datasets</strong> taught me that clean,
                consistent labels matter more than tuning hyperparameters for weeks.
              </p>
              <p>
                Before fine-tuning models, I make sure the data is solid, the bounding boxes are accurate,
                and the edge cases are understood. If the annotations are bad, the model will fail in production.
              </p>
            </div>
          </div>

          <div className="philosophy-row">
            <div className="philosophy-num">02 / REALITY</div>
            <div className="philosophy-heading-wrap">
              <h3 className="philosophy-heading">Built to Run on Real Hardware</h3>
              <div className="philosophy-heading-line" aria-hidden="true" />
            </div>
            <div className="philosophy-body">
              <p>
                A model running in a Jupyter Notebook is only the starting point. What matters is how it performs
                when hooked up to actual camera streams or installed on an offline phone.
              </p>
              <p>
                Whether it's getting YOLO to run smoothly with multi-object tracking or packaging a mobile app
                with embedded SQLite, I design for realistic compute limits and responsive everyday use.
              </p>
            </div>
          </div>

          <div className="philosophy-row">
            <div className="philosophy-num">03 / SYSTEMS</div>
            <div className="philosophy-heading-wrap">
              <h3 className="philosophy-heading">Software Around the Model</h3>
              <div className="philosophy-heading-line" aria-hidden="true" />
            </div>
            <div className="philosophy-body">
              <p>
                Machine learning models don't live in a vacuum. With experience in <strong>Windows Server administration,
                Active Directory, and freelance web development</strong>, I treat models as part of a complete system.
              </p>
              <p>
                That means writing clean user interfaces, setting up automated backups, handling disconnections gracefully,
                and making sure someone can actually use what was built.
              </p>
            </div>
          </div>
        </div>

        {/* Deliberate closing statement with larger type */}
        <div className="philosophy-closing-statement" role="region" aria-label="Engineering Mission">
          <span className="closing-statement-label">MY GOAL AS AN ENGINEER</span>
          <p className="closing-statement-text">
            Build things that actually work, keep the architecture straightforward, and write code that is easy to maintain.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
