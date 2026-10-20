import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markElementRevealed, isElementRevealed, getMotionPreference } from "../utils/motion";
import "./styles/TechnicalDepth.css";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  isCore?: boolean;
}

interface SkillGroup {
  id: string;
  category: string;
  description: string;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ml-cv",
    category: "Machine Learning & Computer Vision",
    description:
      "Core focus area. Real-time object tracking, medical segmentation with foundation models, supervised learning, and NLP classifiers.",
    skills: [
      { name: "Python", isCore: true },
      { name: "PyTorch", isCore: true },
      { name: "YOLOv8 / YOLOv11", isCore: true },
      { name: "SAM2 / MedSAM-2", isCore: true },
      { name: "StrongSORT", isCore: true },
      { name: "OpenCV", isCore: true },
      { name: "TensorFlow" },
      { name: "scikit-learn", isCore: true },
      { name: "CUDA / GPU Acceleration", isCore: true },
      { name: "NLP & TF-IDF" },
      { name: "Pandas & NumPy", isCore: true },
      { name: "Matplotlib & Seaborn" },
    ],
  },
  {
    id: "software-dev",
    category: "Software & Web Development",
    description:
      "Full-stack and mobile applications: responsive web systems, custom e-commerce, and offline-first mobile utilities.",
    skills: [
      { name: "JavaScript (ES6+)", isCore: true },
      { name: "TypeScript", isCore: true },
      { name: "React.js", isCore: true },
      { name: "React Native", isCore: true },
      { name: "SQLite (Offline-First)", isCore: true },
      { name: "REST APIs", isCore: true },
      { name: "Shopify & Liquid", isCore: true },
      { name: "WordPress & WooCommerce" },
      { name: "Node.js" },
      { name: "Vite" },
      { name: "HTML5 & CSS3", isCore: true },
    ],
  },
  {
    id: "systems-infra",
    category: "Systems & Infrastructure",
    description:
      "Corporate IT infrastructure, Windows Server administration, Active Directory management, and custom workstation engineering.",
    skills: [
      { name: "Windows Server (2019/2022)", isCore: true },
      { name: "Active Directory & GPOs", isCore: true },
      { name: "Workstation Assembly & Tuning", isCore: true },
      { name: "BIOS/UEFI & OS Deployment", isCore: true },
      { name: "File Servers & NTFS Permissions", isCore: true },
      { name: "LAN / WAN, DHCP & DNS" },
      { name: "Backup Routines & Disaster Recovery" },
      { name: "PowerShell", isCore: true },
      { name: "Git & GitHub", isCore: true },
      { name: "Docker" },
    ],
  },
  {
    id: "data-creative",
    category: "Data QA & Creative Media",
    description:
      "Multi-modal dataset quality assurance, annotation workflows (video, image, audio, OCR), and AI media generation.",
    skills: [
      { name: "Label Studio & CVAT", isCore: true },
      { name: "Dataset QA & Auditing", isCore: true },
      { name: "Multi-Modal Annotation (Video, Image, OCR)", isCore: true },
      { name: "AI Video Generation (Character Consistency)" },
      { name: "Video Editing & Storytelling" },
      { name: "ComfyUI / Diffusion Pipelines" },
    ],
  },
];

export const TechnicalDepth = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (!getMotionPreference()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".discipline-card").forEach((card, idx) => {
        const cardId = `skill-card-${card.getAttribute("data-id") || idx}`;
        const chips = card.querySelectorAll(".token-badge");

        // If already revealed during this session, keep visible and don't re-animate
        if (isElementRevealed(cardId)) {
          gsap.set(card, { opacity: 1, y: 0 });
          gsap.set(chips, { opacity: 1, y: 0 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
            onEnter: () => markElementRevealed(cardId),
          },
        });

        tl.from(card, {
          opacity: 0,
          y: 16,
          duration: 0.45,
          ease: "power2.out",
        });

        if (chips.length > 0) {
          tl.from(
            chips,
            {
              opacity: 0,
              y: 8,
              stagger: 0.02,
              duration: 0.25,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const displayedGroups =
    activeTab === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((group) => group.id === activeTab);

  return (
    <section className="section depth-section" id="skills" ref={sectionRef} aria-label="Skills & Tools">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Toolkit</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-lead">
            Tools and technologies I use regularly across machine learning, software development,
            and systems administration.
          </p>

          {/* Interactive Skills Category Tabs */}
          <div className="skills-tabs" role="tablist" aria-label="Filter skills by discipline">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              className={`skills-tab-btn ${activeTab === "all" ? "is-active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              <span className="tab-indicator" aria-hidden="true" />
              <span>All Skills</span>
            </button>
            {SKILL_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={activeTab === group.id}
                className={`skills-tab-btn ${activeTab === group.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(group.id)}
              >
                <span className="tab-indicator" aria-hidden="true" />
                <span>{group.category}</span>
              </button>
            ))}
          </div>

          <div className="skills-legend" role="region" aria-label="Skill proficiency legend">
            <div className="legend-item">
              <span className="legend-dot legend-core" aria-hidden="true" />
              <span className="legend-label">Core Focus (Primary Stack)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-familiar" aria-hidden="true" />
              <span className="legend-label">Familiar (Working Proficiency)</span>
            </div>
          </div>
        </div>

        <div className="disciplines-grid">
          {displayedGroups.map((group) => (
            <div key={group.id} data-id={group.id} className="discipline-card">
              <div className="discipline-header">
                <h3 className="discipline-title">{group.category}</h3>
                <p className="discipline-context">{group.description}</p>
              </div>

              <div className="discipline-details">
                <div className="discipline-tokens">
                  {group.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`token-badge ${skill.isCore ? "token-core" : "token-familiar"}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalDepth;
