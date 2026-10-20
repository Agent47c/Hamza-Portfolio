import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUpMetric from "./CountUpMetric";
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
      "Administer and support Windows Server and Windows 10/11 environments, ensuring system stability, security, and performance.",
      "Build, configure, and deploy custom workstations and desktops, including hardware selection, BIOS/UEFI setup, and OS installation.",
      "Manage Active Directory (AD) users, groups, OUs, and Group Policy Objects (GPOs) for access control and security enforcement.",
      "Configure and maintain file servers, shared drives, NTFS permissions, and monitor LAN/WAN, DHCP, and DNS infrastructure.",
      "Implement security, backup, patch management, troubleshooting, and performance optimization to minimize downtime.",
    ],
  },
  {
    period: "Jun 2025 — Sep 2025",
    role: "Machine Learning Engineer Intern",
    company: "Arch Technologies",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Developed and evaluated ML models for real-world use cases including spam detection, tumor segmentation, and house price prediction.",
      "Applied YOLO, SAM2, and MedSAM-2 for medical imaging and object detection tasks.",
      "Built regression and NLP models using scikit-learn, TF-IDF, and Naive Bayes.",
      "Implemented real-time PPE tracking pipeline integrating YOLOv11 and StrongSORT.",
      "Utilized PyTorch, TensorFlow, OpenCV, Pandas, and Matplotlib for data analysis, pipeline execution, and visualization.",
    ],
  },
  {
    period: "Apr 2025 — Jun 2025",
    role: "Machine Learning Intern",
    company: "Certura",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Built and optimized supervised machine learning models including Linear Regression, Naive Bayes, and Random Forest.",
      "Implemented full data preprocessing pipelines (cleaning, feature scaling, vectorization) to prepare datasets for training.",
      "Evaluated models using performance metrics including RMSE and accuracy, and visualized feature importance.",
      "Gained hands-on experience in supervised learning, feature engineering, and interpreting model performance for real-world datasets.",
    ],
  },
  {
    period: "Jul 2024 — Dec 2024",
    role: "QA Team Manager / Data Labeling QA",
    company: "Data Nomad",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Promoted to QA Team Manager within 2 months of joining, demonstrating strong leadership and annotation mastery.",
      "Audited labeled datasets (video, image, audio, OCR) for accuracy, consistency, and strict adherence to annotation standards (maintaining 98%+ precision).",
      "Detected and corrected labeling errors to improve AI model training quality and data integrity.",
      "Provided detailed feedback and training support to labeling teams to enhance annotation precision.",
      "Coordinated with project managers to implement quality control measures and optimize review workflows.",
    ],
  },
  {
    period: "Feb 2024 — Jul 2024",
    role: "Data Labeling Specialist",
    company: "Data Nomad",
    location: "Islamabad, Pakistan",
    type: "Remote",
    points: [
      "Annotated video, image, audio, and OCR data for AI/ML training using tools like Label Studio, CVAT, and custom platforms.",
      "Followed strict annotation guidelines to ensure dataset accuracy and consistency for computer vision and NLP models.",
      "Assisted in preparing and organizing large-scale datasets for autonomous driving, retail, and security models.",
      "Collaborated with QA teams to identify labeling errors, improve annotation standards, and boost model performance.",
    ],
  },
  {
    period: "Feb 2016 — Present",
    role: "Shopify & WordPress Developer & Virtual Assistant",
    company: "Freelance",
    location: "Pakistan",
    type: "Freelance",
    points: [
      "Developed and customized Shopify and WordPress websites with a focus on performance, aesthetics, and SEO.",
      "Managed product listings, store updates, SEO optimization, and third-party app/plugin integration.",
      "Ensured responsive, mobile-friendly designs and handled virtual assistant operations and client support.",
    ],
  },
  {
    period: "Jun 2016 — Present",
    role: "PC Builder (Gaming & Productivity)",
    company: "Freelance",
    location: "Pakistan",
    type: "Freelance",
    points: [
      "Assembled and tailored high-performance gaming and productivity desktops, maximizing performance through optimal component selection, advanced cooling, and overclocking.",
      "Offered post-build diagnostics, maintenance, and resolved hardware/software issues.",
      "Built and delivered 10 high-performance custom PCs for Motion Spectrum and multiple corporate and gaming clients in one month.",
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
                    <li key={i}>
                      {pt.includes("98%+") ? (
                        <>
                          {pt.split("98%+")[0]}
                          <CountUpMetric end={98} suffix="%+" />
                          {pt.split("98%+")[1]}
                        </>
                      ) : (
                        pt
                      )}
                    </li>
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
