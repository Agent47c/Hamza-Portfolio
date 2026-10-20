import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyData {
  id: string;
  number: string;
  tag: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  problem: string;
  solution: string;
  decisions: string;
  pipeline: string[];
  tools: string[];
  githubUrl: string;
}

const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "ppe-monitor",
    number: "CASE STUDY 01",
    tag: "Computer Vision & Edge IoT",
    title: "Real-Time PPE Safety Compliance System",
    summary:
      "A high-throughput computer vision pipeline engineered to monitor hardhats, high-visibility vests, and safety boots in heavy industrial environments with automated alert triggers.",
    image: "/images/ppe_monitor.jpg",
    alt: "Computer vision surveillance interface showing worker PPE detection with bounding boxes and telemetry",
    problem:
      "Construction and fabrication sites suffer high visual occlusions, scaffolding clutter, and dynamic lighting. Conventional frame-by-frame object detectors lose tracks constantly, generating false positive alarms and overwhelming safety supervisors.",
    solution:
      "Engineered an asynchronous dual-stage processing architecture coupling a fine-tuned YOLOv11 detector with StrongSORT deep feature re-identification. Batched inference through CUDA streams and connected events to an automated Supabase data store and SMTP incident dispatcher.",
    decisions:
      "Utilized CUDA tensor batching to sustain sub-30ms per-frame latency on single GPU nodes. Implemented deep Re-ID appearance embeddings to maintain persistent worker identity even when individuals pass behind construction machinery.",
    pipeline: [
      "RTSP Multi-Camera Stream Ingest",
      "CUDA Frame Normalization & Tensor Batching",
      "YOLOv11 Multi-Class Detector (Hardhat / Vest / Boots)",
      "StrongSORT Multi-Object Tracking & Appearance Re-ID",
      "Rule Engine & Event Dispatch (Supabase + SMTP + PyQt5 Dashboard)",
    ],
    tools: ["Python", "YOLOv11", "StrongSORT", "OpenCV", "CUDA", "PyQt5", "Docker", "Supabase", "SMTP"],
    githubUrl: "https://github.com/Agent47c",
  },
  {
    id: "brain-tumor",
    number: "CASE STUDY 02",
    tag: "Medical AI & Foundation Models",
    title: "Domain-Adapted Brain Tumor MRI Segmentation",
    summary:
      "Coupling foundation vision models with medical imaging decoders to automate precise volumetric glioma boundary delineation on multi-sequence MRI scans.",
    image: "/images/brain_tumor.jpg",
    alt: "Medical AI DICOM workstation showing multi-sequence axial brain MRI scan with tumor segmentation masks",
    problem:
      "Manual slice-by-slice contouring of brain tumor margins across axial T1, T2, and FLAIR MRI volumes is labor-intensive and suffers significant inter-observer variability during neurosurgical resection planning.",
    solution:
      "Engineered a zero-shot prompt-guided segmentation pipeline adapting Segment Anything Model 2 (SAM2) and MedSAM-2 architectures. Coarse region proposals are generated via YOLO bounding boxes and passed as spatial prompts to the medical mask decoder.",
    decisions:
      "Fine-tuned only the mask decoder weights and prompt embedding layers, preserving pretrained vision representations while preventing catastrophic forgetting on clinical MRI slice contrasts. Evaluated boundaries via Dice Similarity Coefficient and Hausdorff Distance.",
    pipeline: [
      "Multi-Sequence DICOM Volume Ingest (T1 / T2 / FLAIR)",
      "Voxel Normalization & Contrast Window Standardization",
      "YOLO Region-of-Interest (ROI) Spatial Bounding Box Proposals",
      "SAM2 / MedSAM-2 Prompt-Guided Mask Decoder Generation",
      "Volumetric Boundary Reconstruction & Dice-Coefficient Scoring",
    ],
    tools: ["Python", "PyTorch", "SAM2", "MedSAM-2", "YOLO", "OpenCV", "NumPy", "CUDA"],
    githubUrl: "https://github.com/Agent47c",
  },
  {
    id: "ironlog",
    number: "CASE STUDY 03",
    tag: "Mobile Architecture & Analytics",
    title: "IronLog: Local-First Strength Training Engine",
    summary:
      "A distraction-free, zero-latency workout tracking mobile application architected for immediate set recording and automated progressive overload calculation without network dependencies.",
    image: "/images/ironlog.jpg",
    alt: "IronLog dark-mode strength training mobile application showing barbell workout logs and volume progression graphs",
    problem:
      "Existing mobile fitness applications rely heavily on cloud round-trips, fail completely in low-reception gym basements, and introduce cluttered social feeds that impede workout pace.",
    solution:
      "Architected a local-first mobile client using React Native, Expo, and embedded SQLite. Every workout event is written atomically to an indexed local relational database, powering real-time progressive overload charts and one-rep-max estimations with zero network lag.",
    decisions:
      "Adopted an optimistic UI state layer paired with transactional SQLite writes. Eliminated external sync bottlenecks during workouts, guaranteeing instantaneous touch responsiveness even under aggressive background battery-saver policies.",
    pipeline: [
      "React Native Touch & Gesture UI Layer",
      "Optimistic Set State Store & Input Validation",
      "Embedded SQLite Relational Persistence Engine",
      "Progressive Overload & Volume Analytics Calculation",
      "Historical Trend Visualization & Personal Record Extraction",
    ],
    tools: ["React Native", "Expo", "SQLite", "JavaScript", "TypeScript", "React Navigation"],
    githubUrl: "https://github.com/Agent47c",
  },
  {
    id: "farm-camera",
    number: "CASE STUDY 04",
    tag: "Edge Automation & Computer Vision",
    title: "Autonomous Edge Video Digest (Tapo C200)",
    summary:
      "An automated edge surveillance pipeline ingesting 24-hour continuous IP camera feeds, filtering movement via YOLO detection, and synthesizing high-density timelapse digests.",
    image: "/images/farm_camera.jpg",
    alt: "Farm acreage surveillance feed with motion tracking overlays, Tapo C200 camera telemetry, and timelapse timeline",
    problem:
      "Reviewing 24 hours of raw surveillance footage across remote Tapo C200 IP cameras requires hours of tedious manual scrubbing. Storage space quickly saturates while critical livestock movements and intrusion events remain buried in stagnant footage.",
    solution:
      "Built a headless scheduled edge automation daemon in Python. The system interfaces directly with camera RTSP endpoints via PyTapo, runs lightweight YOLO motion and entity classification on buffered frames, and stitches significant events into concise 90-second MP4 digests via FFmpeg.",
    decisions:
      "Implemented a dynamic frame skipping algorithm that ramps sampling rate from 1 FPS during quiescent periods to 30 FPS when humans, vehicles, or livestock are detected, drastically cutting compute and disk consumption without missing transient incidents.",
    pipeline: [
      "Tapo C200 RTSP Stream Discovery & Ingest via PyTapo",
      "Dynamic Frame Buffer & Temporal Motion Gating",
      "YOLO Edge Entity Classifier (Human / Vehicle / Animal)",
      "FFmpeg Intelligent Timelapse Compression & Stitching",
      "Automated Scheduled Delivery via Windows Task Scheduler",
    ],
    tools: ["Python", "YOLO", "PyTapo", "FFmpeg", "OpenCV", "Tkinter", "Windows Task Scheduler"],
    githubUrl: "https://github.com/Agent47c",
  },
];

interface ArchiveProject {
  idx: string;
  name: string;
  category: string;
  tools: string;
}

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    idx: "05",
    name: "Windows Smart Application Backup Tool",
    category: "Desktop Utility & Automation",
    tools: "Python, Windows Registry API (winreg), JSON Profiles, Tkinter, Windows Task Scheduler",
  },
  {
    idx: "06",
    name: "House Price Predictive Analytics",
    category: "Machine Learning & Predictive Modeling",
    tools: "Python, scikit-learn, Pandas, NumPy, Matplotlib, Seaborn",
  },
  {
    idx: "07",
    name: "Motion Spectrum Enterprise NAS Infrastructure",
    category: "Enterprise Network Infrastructure",
    tools: "Windows Server, Active Directory, RAID Configuration, Network Storage, DHCP/DNS, Automated GPO",
  },
  {
    idx: "08",
    name: "High-Performance Workstation Architecture",
    category: "Hardware Tuning & Benchmarking",
    tools: "Custom Hardware Assembly, BIOS/UEFI Tuning, Advanced Cooling Solutions, Performance Benchmarking",
  },
];

export const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-study").forEach((study) => {
        gsap.from(study.querySelector(".case-study-top"), {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: study,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        gsap.from(study.querySelector(".case-study-visual"), {
          opacity: 0,
          scale: 0.98,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: study,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section work-section" id="work" ref={sectionRef} aria-label="Selected Engineering Work">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Engineered Products & Case Studies</h2>
          <p className="section-lead">
            Production computer vision systems, foundation model fine-tuning, and robust local-first software.
            Each project is approached with architectural rigor, measurable performance, and real-world deployment constraints.
          </p>
        </div>

        <div className="case-study-list">
          {CASE_STUDIES.map((project) => (
            <article key={project.id} className="case-study" id={project.id}>
              <div className="case-study-top">
                <div className="case-study-meta">
                  <span className="case-study-number">{project.number}</span>
                  <span className="case-study-tag">{project.tag}</span>
                </div>
                <h3 className="case-study-title">{project.title}</h3>
                <p className="case-study-summary">{project.summary}</p>
              </div>

              <div className="case-study-visual">
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  width="1200"
                  height="675"
                />
              </div>

              <div className="case-study-details">
                <div className="case-study-column">
                  <div className="breakdown-block">
                    <span className="breakdown-title">The Engineering Challenge</span>
                    <p className="breakdown-text">{project.problem}</p>
                  </div>

                  <div className="breakdown-block">
                    <span className="breakdown-title">Technical Solution</span>
                    <p className="breakdown-text">{project.solution}</p>
                  </div>

                  <div className="breakdown-block">
                    <span className="breakdown-title">Key Architectural Decisions</span>
                    <p className="breakdown-text">{project.decisions}</p>
                  </div>

                  <div className="case-study-links">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-link"
                      aria-label={`View ${project.title} repository on GitHub`}
                    >
                      <span>Repository on GitHub</span>
                      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="case-study-column">
                  <div className="pipeline-box">
                    <span className="pipeline-title">Execution Pipeline</span>
                    <div className="pipeline-flow">
                      {project.pipeline.map((step, idx) => (
                        <div key={idx} className="pipeline-step-item">
                          <div className="pipeline-node">{step}</div>
                          {idx < project.pipeline.length - 1 && (
                            <div className="pipeline-arrow">↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="breakdown-block">
                    <span className="breakdown-title">Technologies & Stack</span>
                    <div className="tech-pill-list">
                      {project.tools.map((tool) => (
                        <span key={tool} className="tech-pill">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Systems Archive Index */}
        <div className="archive-wrapper">
          <div className="archive-header">
            <span className="section-label">Additional Systems</span>
            <h3 className="archive-title">Engineering Archive & Utility Systems</h3>
          </div>

          <div className="archive-table" role="table" aria-label="Additional Projects Archive">
            {ARCHIVE_PROJECTS.map((item) => (
              <div key={item.idx} className="archive-row" role="row">
                <div className="archive-idx" role="cell">{item.idx}</div>
                <div className="archive-name" role="cell">{item.name}</div>
                <div className="archive-category" role="cell">{item.category}</div>
                <div className="archive-tools" role="cell">{item.tools}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
