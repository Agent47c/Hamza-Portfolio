import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Experience.css";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  period: string;
  status?: string;
  role: string;
  company: string;
  location: string;
  type: string;
  points: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Jan 2025 — Present",
    status: "CURRENT",
    role: "System Administrator",
    company: "Motion Spectrum",
    location: "Lahore, Pakistan",
    type: "Hybrid",
    points: [
      "Administer Windows Server environments, Active Directory, GPOs, and corporate LAN/WAN infrastructure.",
      "Assemble, configure, and maintain high-performance workstations for specialized workloads.",
      "Manage automated scheduled backup routines and system recovery procedures.",
    ],
  },
  {
    period: "Jun 2025 — Sep 2025",
    role: "Machine Learning Engineer Intern",
    company: "Arch Technologies",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Built real-time computer vision tracking pipelines using YOLOv11 and StrongSORT.",
      "Fine-tuned SAM2 and MedSAM-2 foundation segmentation models for medical imaging.",
      "Developed predictive machine learning models with GPU-accelerated inference using CUDA and PyTorch.",
    ],
  },
  {
    period: "Apr 2025 — Jun 2025",
    role: "Machine Learning Intern",
    company: "Certura",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Implemented supervised ML models including Random Forest, Naive Bayes, Decision Trees, and Linear Regression.",
      "Cleaned structured datasets through feature selection, outlier detection, scaling, and categorical encoding.",
      "Evaluated model performance using precision, recall, F1-score, ROC-AUC, and RMSE.",
    ],
  },
  {
    period: "Jul 2024 — Dec 2024",
    role: "QA Team Manager",
    company: "Data Nomad",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Promoted to QA Team Manager within 2 months of joining.",
      "Led a cross-functional QA team auditing multi-modal datasets (video, bounding boxes, OCR, audio) to maintain 98%+ precision.",
      "Standardized annotation guidelines and trained specialists to improve dataset consistency.",
    ],
  },
  {
    period: "Feb 2024 — Jul 2024",
    role: "Data Labeling Specialist",
    company: "Data Nomad",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Performed high-precision polygon and bounding box annotation on thousands of computer vision frames.",
      "Used Label Studio and CVAT for autonomous driving, retail, and security datasets.",
    ],
  },
  {
    period: "Feb 2016 — Present",
    role: "Freelance Web Developer",
    company: "Freelance / Client Projects",
    location: "Remote",
    type: "Freelance",
    points: [
      "Built and customized e-commerce stores on Shopify and sites on WordPress using HTML, CSS, JavaScript, and Liquid.",
      "Focused on clean mobile responsiveness, speed optimization, and SEO.",
    ],
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section experience-section" id="experience" ref={sectionRef} aria-label="Work Experience">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Career</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-lead">
            Where I have worked and what I was responsible for across machine learning, systems administration,
            and data quality.
          </p>
        </div>

        <div className="timeline-list">
          {EXPERIENCES.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-period">
                <span className="timeline-year">{item.period}</span>
                {item.status && (
                  <span className="timeline-status">
                    <span className="status-live-dot" aria-hidden="true" />
                    <span>{item.status}</span>
                  </span>
                )}
              </div>

              <div className="timeline-role-info">
                <h3 className="timeline-title">{item.role}</h3>
                <span className="timeline-company">
                  {item.company} • {item.location} ({item.type})
                </span>
              </div>

              <div className="timeline-description">
                <ul className="timeline-points">
                  {item.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Education row matching 3-column timeline layout */}
          <div className="timeline-item timeline-item-education">
            <div className="timeline-period">
              <span className="timeline-year">2022 — 2026</span>
              <span className="timeline-edu-badge">EDUCATION</span>
            </div>

            <div className="timeline-role-info">
              <h3 className="timeline-title">BS Software Engineering (BSSE)</h3>
              <span className="timeline-company">
                The Islamia University of Bahawalpur • Bahawalpur, Pakistan
              </span>
            </div>

            <div className="timeline-description">
              <p className="education-note">
                Focus on Software Architecture, Data Structures, Algorithms, Computer Vision, and Operating Systems. Expected Graduation: 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
