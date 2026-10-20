import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUpMetric from "./CountUpMetric";
import "./styles/Journey.css";

gsap.registerPlugin(ScrollTrigger);

interface JourneyStage {
  step: string;
  phase: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  takeaway: string;
  tags: string[];
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: "01",
    phase: "WHERE I STARTED",
    year: "2016 — 2022",
    title: "Software & Web Foundations",
    subtitle: "Freelance Web Developer • Shopify & Full-Stack Projects",
    description:
      "Started by building custom web applications and e-commerce stores using JavaScript, HTML, CSS, and Liquid. Dealt directly with clients, responsive layouts, and performance constraints.",
    takeaway: "Lesson: Software isn't theoretical. It has to load fast, handle edge cases, and solve a concrete problem for real people.",
    tags: ["JavaScript", "Responsive UI", "REST APIs", "Liquid", "Shopify"],
  },
  {
    step: "02",
    phase: "UNDER THE HOOD",
    year: "2022 — 2024",
    title: "Systems Administration & Infrastructure",
    subtitle: "System Administrator @ Motion Spectrum",
    description:
      "Administered Windows Server environments, Active Directory domains, GPOs, and corporate networking. Assembled and benchmarked high-performance workstations for specialized workloads.",
    takeaway: "Lesson: Gained deep respect for the hardware and operating system layers that machine learning models run on.",
    tags: ["Windows Server", "Active Directory", "Hardware Tuning", "Networking", "PowerShell"],
  },
  {
    step: "03",
    phase: "THE TURNING POINT",
    year: "2024",
    title: "Dataset Quality & Annotation Leadership",
    subtitle: "QA Team Manager @ Data Nomad",
    description:
      "Promoted to QA Team Manager within 2 months. Led a cross-functional team auditing thousands of computer vision annotation frames across polygon masks, bounding boxes, video feeds, and OCR to maintain 98%+ precision.",
    takeaway: "Core Truth: Clean labels matter more than tuning hyperparameters. If training ground-truth is flawed, production models will fail every time.",
    tags: ["Label Studio", "CVAT", "Dataset Auditing", "QA Protocols", "Computer Vision"],
  },
  {
    step: "04",
    phase: "MACHINE LEARNING",
    year: "Early 2025",
    title: "Supervised Learning & Statistical Pipelines",
    subtitle: "Machine Learning Intern @ Certura",
    description:
      "Built and evaluated predictive models using Random Forest, Decision Trees, and Regression algorithms. Engineered features, handled categorical distributions, and validated with ROC-AUC, precision-recall, and cross-validation.",
    takeaway: "Lesson: How to diagnose overfitting, evaluate data leakage, and establish solid baselines before reaching for heavy architectures.",
    tags: ["scikit-learn", "Python", "Pandas", "Feature Engineering", "NumPy"],
  },
  {
    step: "05",
    phase: "DEEP LEARNING & VISION",
    year: "Mid 2025",
    title: "Computer Vision Tracking & Medical Foundation Models",
    subtitle: "ML Engineer Intern @ Arch Technologies",
    description:
      "Engineered real-time tracking pipelines by combining YOLOv11 with StrongSORT. Fine-tuned foundation models including SAM2 and MedSAM-2 for high-precision MRI segmentation with CUDA acceleration.",
    takeaway: "Lesson: Modern vision requires orchestrating multiple specialized models together to achieve low latency on live streams.",
    tags: ["YOLOv11", "SAM2 / MedSAM-2", "StrongSORT", "PyTorch", "CUDA"],
  },
  {
    step: "06",
    phase: "WHERE I AM NOW",
    year: "2025 — Present",
    title: "Practical Software + ML Engineering",
    subtitle: "Building Complete Products from Model to Application",
    description:
      "Unifying deep learning models with clean application software: the PPE Safety Monitor (YOLO + PyQt5 + email alerting), IronLog (100% offline React Native + SQLite gym tracker), and Farm Camera Video Analytics (local RTSP edge automation).",
    takeaway: "Mission: Build reliable, self-contained systems where machine learning and intuitive software work seamlessly together.",
    tags: ["PyTorch", "React Native", "SQLite", "OpenCV", "Edge AI"],
  },
];

export const Journey = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scroll-driven progressive line draw
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-timeline",
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.2,
            },
          }
        );
      }

      // Animate milestone nodes and stagger their tags
      const milestones = gsap.utils.toArray<HTMLElement>(".journey-milestone");
      milestones.forEach((milestone) => {
        const tags = milestone.querySelectorAll(".milestone-tag");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: milestone,
            start: "top 85%",
            toggleActions: "play none none none",
            onEnter: () => milestone.classList.add("is-active"),
            onLeaveBack: () => milestone.classList.remove("is-active"),
          },
        });

        tl.from(milestone.querySelector(".milestone-card"), {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        });

        if (tags.length > 0) {
          tl.from(
            tags,
            {
              opacity: 0,
              y: 8,
              stagger: 0.03,
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section journey-section" id="journey" ref={sectionRef} aria-label="Career Journey">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Progression</span>
          <h2 className="section-title">My Journey Through Engineering</h2>
          <p className="section-lead">
            How hands-on client work, systems administration, dataset quality management,
            and machine learning shaped my focus on practical computer vision systems.
          </p>
        </div>

        <div className="journey-timeline">
          {/* Scroll-driven vertical progress track */}
          <div className="journey-track" aria-hidden="true">
            <div className="journey-track-base" />
            <div className="journey-track-fill" ref={lineFillRef} />
          </div>

          <div className="journey-milestones">
            {JOURNEY_STAGES.map((item) => (
              <div key={item.step} className="journey-milestone">
                <div className="milestone-marker-wrap">
                  <div className={`milestone-dot ${item.step === "06" ? "milestone-dot-live" : ""}`} />
                  <span className="milestone-step">{item.step}</span>
                </div>

                <div className="milestone-card">
                  <div className="milestone-header">
                    <div className="milestone-meta">
                      <span className="milestone-phase">{item.phase}</span>
                      <span className="milestone-year">{item.year}</span>
                    </div>
                    <h3 className="milestone-title">{item.title}</h3>
                    <p className="milestone-subtitle">{item.subtitle}</p>
                  </div>

                  <p className="milestone-desc">
                    {item.description.includes("98%+") ? (
                      <>
                        {item.description.split("98%+")[0]}
                        <CountUpMetric end={98} suffix="%+" />
                        {item.description.split("98%+")[1]}
                      </>
                    ) : (
                      item.description
                    )}
                  </p>

                  <div className="milestone-takeaway">
                    <div className="takeaway-bar" />
                    <p>{item.takeaway}</p>
                  </div>

                  <div className="milestone-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="milestone-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
