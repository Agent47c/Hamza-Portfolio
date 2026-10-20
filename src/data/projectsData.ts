export interface PipelineNode {
  id: string;
  label: string;
  subtext?: string;
}

export interface ProjectResult {
  label: string;
  value: string;
  isReal: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  isPlaceholder?: boolean;
}

export interface ProjectData {
  slug: string;
  aliases?: string[];
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  alt: string;
  role: string;
  year: string;
  technologies: string[];
  overview: string;
  problem: string;
  approach: string;
  howItWorks: string;
  pipelineNodes: PipelineNode[];
  pipeline: string[];
  features: string[];
  results: ProjectResult[];
  gallery: GalleryItem[];
  githubUrl?: string;
  demoUrl?: string;
  demoVideo?: string;
  statusNote?: string;
  seoTitle: string;
  seoDescription: string;
}

export const PROJECTS: ProjectData[] = [
  // 01: PPE SAFETY MONITOR
  {
    slug: "ppe-safety-monitor",
    aliases: ["ppe-safety-monitoring", "ppe-monitor", "ppe-detection-system"],
    number: "01",
    title: "PPE Safety Monitor",
    category: "Computer Vision & Workplace Safety",
    shortDescription:
      "A real-time workplace safety system that uses YOLOv11 and StrongSORT to detect whether workers are wearing required safety gear, with automatic email alerts and violation tracking.",
    image: "/projects/ppe-safety-monitor/hero_16_9.png",
    alt: "Computer vision surveillance interface showing worker PPE detection with bounding boxes and telemetry",
    role: "Computer Vision & Backend Engineer",
    year: "2025",
    technologies: ["Python", "YOLOv11", "StrongSORT", "PyQt5", "OpenCV", "CUDA", "Supabase", "Docker"],
    overview:
      "Workplace accidents frequently occur because safety protocols are challenging to monitor manually across high-traffic job sites. I built this application to automatically detect personal protective equipment (PPE)—such as hardhats, high-visibility vests, gloves, and boots—from live camera feeds.",
    problem:
      "On active industrial facilities and construction sites, safety supervisors cannot monitor dozens of video feeds simultaneously. When workers move around, pass behind equipment, or gather in crowds, basic object detectors routinely lose track of IDs, leading to inaccurate violation logs.",
    approach:
      "Combined high-throughput edge detection via fine-tuned YOLOv11 with appearance-based metric tracking via StrongSORT. Integrated alert rate-limiting and a native PyQt5 desktop GUI for zero-cloud latency.",
    howItWorks:
      "The system accepts video streams from webcams, RTSP IP cameras, or pre-recorded MP4 files. It executes a fine-tuned YOLOv11 detector to recognize people and required safety items, then uses StrongSORT to maintain a persistent ID per worker across frames. When a safety violation is verified, it captures violation snapshots, logs the incident to Supabase, and dispatches automated HTML emails with attached violation images.",
    pipelineNodes: [
      { id: "input", label: "RTSP / Video Feed", subtext: "1080p stream ingestion" },
      { id: "yolo", label: "YOLOv11 Detection", subtext: "Worker & gear classes" },
      { id: "sort", label: "StrongSORT Tracker", subtext: "Re-ID across occlusions" },
      { id: "logic", label: "Compliance Engine", subtext: "Checklist verification" },
      { id: "notify", label: "Supabase & Email", subtext: "Instant alert trigger" },
    ],
    pipeline: [
      "Video Input (Webcam, RTSP IP camera feed, or local video file)",
      "YOLOv11 Multi-Class Detection (Person, Hardhat, Vest, Boots, Gloves)",
      "StrongSORT Tracking (Maintains unique person IDs across frames and occlusions)",
      "Violation Logic Engine (Checks gear compliance per worker with alert cooldowns)",
      "Incident Notification & Logging (HTML email alerts with cropped images + Supabase database entry)",
      "Desktop GUI (PyQt5 dashboard showing live video, violation logs, and exportable reports)",
    ],
    features: [
      "Multi-source video support: works with webcams, RTSP network streams, and pre-recorded MP4 files.",
      "Persistent tracking: maintains unique worker IDs even when people briefly walk behind machinery.",
      "Configurable safety gear checklist: select which items are mandatory for specific work zones.",
      "Automated email alerts: delivers immediate notifications with full scene snapshots and cropped worker images.",
      "Alert throttling: built-in cooldowns prevent repetitive alert emails for the same ongoing incident.",
      "Docker support: packaged for straightforward containerized deployment across desktop and edge systems.",
    ],
    results: [
      { label: "Target Precision", value: "98%+", isReal: true },
      { label: "Inference Speed", value: "Real-Time CUDA", isReal: true },
      { label: "Track Stability", value: "StrongSORT Re-ID", isReal: true },
      { label: "Notification Delay", value: "< 2s to SMTP", isReal: true },
    ],
    gallery: [
      {
        id: "ppe-1",
        src: "/projects/ppe-safety-monitor/full_monitor.png",
        caption: "Full Monitor Mode: real-time detection, multi-person tracking IDs, and violation status telemetry.",
      },
      {
        id: "ppe-2",
        src: "/projects/ppe-safety-monitor/violation_detected.png",
        caption: "Active Violation Detection: red boundary indicators pinpointing workers missing mandatory gear.",
      },
      {
        id: "ppe-3",
        src: "/projects/ppe-safety-monitor/monitor_tracking.png",
        caption: "Tracking Mode: unique worker ID assignments maintained across scene movements.",
      },
      {
        id: "ppe-4",
        src: "/projects/ppe-safety-monitor/email_alert.png",
        caption: "Automated HTML Email Notification: sends full scene and cropped violation evidence to supervisors.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/PPE-Detection-System",
    demoUrl: "https://youtu.be/AlRjiE3LIQQ",
    seoTitle: "PPE Safety Monitor — Computer Vision Project | Hamza Ramzan",
    seoDescription:
      "A real-time workplace safety system using YOLOv11 and StrongSORT to detect PPE compliance with automated email alerts.",
  },

  // 02: FLOW STUDIO
  {
    slug: "flow-studio",
    aliases: ["google-flow-automation", "flow-studio-engine"],
    number: "02",
    title: "Flow Studio — Autonomous Video Generation Engine",
    category: "Automation & Generative Media",
    shortDescription:
      "A desktop automation suite for Google Flow (Veo 3.1 & Imagen 3) that autonomously feeds prompt pairs, monitors live video generation, intercepts safety policies, and downloads completed clips.",
    image: "/projects/flow-studio/hero_16_9.png",
    alt: "Flow Studio autonomous run dashboard showing prompt pair execution, video generation queues, and telemetry",
    role: "Desktop Automation & Python Engineer",
    year: "2025",
    technologies: ["Python", "Playwright", "Tkinter", "Chromium", "JSON Config", "Asynchronous Automation"],
    overview:
      "Generating consistent video sequences with cutting-edge models like Google Veo 3.1 and Imagen 3 typically requires hours of manual prompt pasting, checking for generation errors, and downloading clips individually. I built Flow Studio to turn entire markdown script packages into an autonomous end-to-end production pipeline.",
    problem:
      "Web-based generative video tools lack native batch workflows. Creators must babysit browser tabs, handle sporadic safety policy flags, and manually manage downloads—wasting hours and risking lost session credits.",
    approach:
      "Leveraged headless and visible Playwright automation with persistent user profile isolation (`chrome_profile/`) to eliminate repetitive logins. Integrated a visual selector calibration system that saves DOM coordinates to `selectors.json`, making the engine immune to Google Flow frontend updates.",
    howItWorks:
      "Flow Studio ingests production packages from markdown scripts, extracting image and video prompt pairs. It launches Chromium with user session cookies, inputs prompt pairs with human-like randomized jitter delays, tracks render progress via DOM polling, intercepts error or policy violation banners, and automatically downloads finished MP4s into organized asset folders.",
    pipelineNodes: [
      { id: "script", label: "Script Ingestion", subtext: "Markdown prompt parser" },
      { id: "browser", label: "Playwright Session", subtext: "Isolated profile session" },
      { id: "monitor", label: "Live Telemetry", subtext: "State & queue polling" },
      { id: "triage", label: "Error Interceptor", subtext: "Policy flag triage & retries" },
      { id: "export", label: "Asset Downloader", subtext: "Organized MP4 output" },
    ],
    pipeline: [
      "Markdown Script Parser (Extracts paired image and video prompt specifications)",
      "Playwright Browser Session (Loads authenticated Chromium profile with randomized jitter delays)",
      "Visual Selector Calibration (Dynamically maps DOM nodes for high resilience against UI updates)",
      "Error & Safety Triage (Intercepts policy warnings, limits retry loops, and preserves token credits)",
      "Automated Video Pipeline (Downloads completed generations directly into structured scene folders)",
    ],
    features: [
      "Autonomous batch execution: processes extensive prompt queues without requiring manual supervision.",
      "Resilient error triage: detects policy banners, pauses problematic prompts, and alerts the user.",
      "State recovery & resume: identifies previously rendered clips and skips them to preserve credits.",
      "Visual selector calibration: one-click recorder updates target selectors in `selectors.json`.",
      "Live diagnostics: terminal-style stream showing execution latency, queue depth, and download state.",
      "Native dark and light theme interface built for long production sessions.",
    ],
    results: [
      { label: "Generative Engines", value: "Veo 3.1 & Imagen 3", isReal: true },
      { label: "Credential Exposure", value: "0% (Local Chrome Profile)", isReal: true },
      { label: "Batch Capability", value: "End-to-End Hands-Free", isReal: true },
      { label: "Selector Resilience", value: "Calibrated JSON Schema", isReal: true },
    ],
    gallery: [
      {
        id: "flow-1",
        src: "/projects/flow-studio/hero.png",
        caption: "Autonomous Run Dashboard: active batch queue, prompt execution, and real-time generation monitoring.",
      },
      {
        id: "flow-2",
        src: "/projects/flow-studio/problems_errors.png",
        caption: "Problems & Errors Review: policy violation interception, automatic retry limiters, and token preservation.",
      },
      {
        id: "flow-3",
        src: "/projects/flow-studio/calibrate.png",
        caption: "Visual Calibration Hub: one-click DOM selector recorder for resilience against Google Flow UI updates.",
      },
      {
        id: "flow-4",
        src: "/projects/flow-studio/dark_mode.png",
        caption: "Sleek Dark Mode interface optimized for extended production monitoring sessions.",
      },
      {
        id: "flow-5",
        src: "/projects/flow-studio/logs.png",
        caption: "Live diagnostics terminal and timing jitter telemetry stream.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/Flow-Studio",
    seoTitle: "Flow Studio — Autonomous Video Generation Engine | Hamza Ramzan",
    seoDescription:
      "Desktop automation suite for Google Flow Veo 3.1 and Imagen 3 built with Python and Playwright.",
  },

  // 03: BRAIN TUMOR SEGMENTATION
  {
    slug: "brain-tumor-segmentation",
    aliases: ["brain-tumor-model"],
    number: "03",
    title: "Brain Tumor Segmentation",
    category: "Medical AI & Deep Learning",
    shortDescription:
      "A deep learning segmentation pipeline using YOLOv11 for region proposal coupled with SAM2 foundation models to accurately delineate tumor boundaries in MRI scans.",
    image: "/projects/brain-tumor-model/Thumbnail_16_9.jpg",
    alt: "Medical AI imaging viewer showing brain MRI scan with tumor segmentation masks",
    role: "Deep Learning Researcher & Developer",
    year: "2025",
    technologies: ["Python", "PyTorch", "SAM2", "MedSAM-2", "YOLOv11", "Streamlit", "OpenCV", "NumPy"],
    overview:
      "Segmenting brain tumors from MRI scans manually is time-consuming and varies between radiologists. This project investigates using modern foundation segmentation models to assist with precise anatomical boundary delineation across multiple tumor classes.",
    problem:
      "MRI scans contain subtle contrast differences across distinct sequence modalities (T1, T2, FLAIR). Traditional segmentation models often require extensive bespoke training and struggle when applied to new scan protocols without retraining.",
    approach:
      "Employed a two-stage hybrid approach: a lightweight YOLOv11 detector locates candidate regions of interest, and SAM2/MedSAM-2 foundation encoders generate fine-grained boundary masks without requiring full retraining.",
    howItWorks:
      "Instead of training an entire heavy segmentation network from scratch, this system uses a hybrid approach. The YOLO detector first finds the general region of interest on the scan slice. That bounding box is then fed as a spatial prompt to SAM2, which calculates exact boundaries across glioma, meningioma, and pituitary tumor classes.",
    pipelineNodes: [
      { id: "dicom", label: "MRI Image Slices", subtext: "Axial scan modalities" },
      { id: "prep", label: "Preprocessing", subtext: "Intensity normalization" },
      { id: "roi", label: "YOLO Region Proposal", subtext: "Bounding box estimation" },
      { id: "sam", label: "SAM2 / MedSAM-2", subtext: "Prompted mask delineation" },
      { id: "eval", label: "Metric Evaluation", subtext: "mAP & class performance" },
    ],
    pipeline: [
      "MRI Scan Input (Multi-format image slices including JPG, PNG, and DICOM)",
      "Preprocessing (Contrast normalization and slice scaling)",
      "YOLOv11 Region Proposal (Identifies approximate tumor bounding box with confidence score)",
      "SAM2 Segmentation Prompting (Uses bounding box to delineate precise tumor mask)",
      "Interactive Streamlit Viewer (Visualizes raw scan, detection box, and refined segmentation)",
    ],
    features: [
      "Promptable segmentation using foundation vision models adapted for medical scans.",
      "Hybrid two-stage pipeline combining fast region detection with fine-grained mask generation.",
      "Multi-class recognition: evaluated across Glioma, Meningioma, and Pituitary tumors.",
      "High precision benchmark: achieved 0.950 precision and 0.954 mAP50 on meningioma test sets.",
      "Streamlit web interface for simple MRI slice upload and instant mask visualization.",
    ],
    results: [
      { label: "Meningioma Precision", value: "95.0%", isReal: true },
      { label: "Meningioma mAP50", value: "95.4%", isReal: true },
      { label: "Foundation Model", value: "SAM2 (Segment Anything)", isReal: true },
      { label: "Interface", value: "Streamlit Web App", isReal: true },
    ],
    gallery: [
      {
        id: "tumor-0",
        src: "/projects/brain-tumor-model/Thumbnail.jpg",
        caption: "Brain Tumor Segmentation: dual YOLOv11 detection and SAM boundary delineation console.",
      },
      {
        id: "tumor-1",
        src: "/projects/brain-tumor-model/sam_segmentation.png",
        caption: "SAM2 fine-grained segmentation output delineating tumor boundary on brain MRI slice.",
      },
      {
        id: "tumor-2",
        src: "/projects/brain-tumor-model/yolo_detection.png",
        caption: "YOLOv11 region proposal bounding box identifying candidate tumor location with confidence score.",
      },
      {
        id: "tumor-3",
        src: "/projects/brain-tumor-model/model_performance_chart.png",
        caption: "Model evaluation performance metrics and precision-recall breakdown across tumor classes.",
      },
      {
        id: "tumor-4",
        src: "/projects/brain-tumor-model/upload.png",
        caption: "Streamlit application interface for uploading MRI scans and triggering model inference.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/BrainTumorModel",
    seoTitle: "Brain Tumor Segmentation — Medical AI | Hamza Ramzan",
    seoDescription:
      "Medical deep learning project using YOLO region proposals and SAM2 foundation models for brain MRI segmentation.",
  },

  // 04: IRONLOG GYM TRACKER
  {
    slug: "ironlog",
    aliases: ["ironlog-app"],
    number: "04",
    title: "IronLog Gym Tracker",
    category: "Mobile Application",
    shortDescription:
      "A 100% offline mobile workout tracking app built with React Native and SQLite, featuring a 400+ exercise library, custom routine builder, and local progress history.",
    image: "/projects/ironlog-app/hero.png",
    alt: "IronLog dark-mode strength training mobile app showing workout log and progress analytics",
    role: "Full-Stack Mobile Engineer",
    year: "2025",
    technologies: ["React Native", "Expo", "SQLite", "JavaScript", "React Navigation"],
    overview:
      "Most fitness apps require an account, push subscriptions, and fail when you lose cell signal in a gym basement. I built IronLog as a fast, private, offline-first workout logger designed specifically for strength training.",
    problem:
      "When training, you need to quickly record weights and reps between sets without waiting for network spinners, dealing with cloud sync errors, or navigating through social feed bloat.",
    approach:
      "Designed an offline-first architecture with 9 normalized relational tables in local SQLite. Zero cloud round-trips ensure sub-millisecond local queries and complete user privacy.",
    howItWorks:
      "IronLog runs entirely on-device with zero login required. It uses an embedded SQLite database with 9 relational tables to store exercises, custom workout templates, active sessions, and personal records. Data stays on your phone and updates instantaneously.",
    pipelineNodes: [
      { id: "ui", label: "React Native UI", subtext: "Zero-latency touch inputs" },
      { id: "session", label: "Session Engine", subtext: "Sets, weights, reps, timer" },
      { id: "sqlite", label: "Embedded SQLite", subtext: "9 relational tables on-device" },
      { id: "analytics", label: "Analytics Engine", subtext: "Volume & estimated 1RM" },
      { id: "history", label: "Local History", subtext: "Calendar & PR timeline" },
    ],
    pipeline: [
      "React Native & Expo Touch Interface",
      "Active Session Tracker (Sets, weights, reps, RPE, rest timer)",
      "Embedded SQLite Storage (9 normalized relational tables stored locally)",
      "Progress Analytics Engine (Calculates volume, estimated 1RM, and PR badges)",
      "Calendar & History View (Review past workouts and multi-week training logs)",
    ],
    features: [
      "Pre-seeded exercise database with 400+ movements filterable by muscle group and equipment.",
      "Custom routine builder supporting multi-day workout splits (Push/Pull/Legs, Upper/Lower).",
      "Active workout tracker recording weights, reps, RPE, rest timers, and notes.",
      "Visual workout calendar, personal record (PR) badges, and historical volume trends.",
      "Completely offline and private: zero accounts, zero cloud dependencies, local SQLite database.",
    ],
    results: [
      { label: "Exercise Library", value: "400+ Exercises", isReal: true },
      { label: "Relational Tables", value: "9 Local SQLite Tables", isReal: true },
      { label: "Cloud Dependencies", value: "0% (100% Offline)", isReal: true },
      { label: "Startup Performance", value: "Instant Local Boot", isReal: true },
    ],
    gallery: [
      {
        id: "ironlog-hero",
        src: "/projects/ironlog-app/hero.png",
        caption: "IronLog Studio Showcase: multi-screen view of routine planner, active workout tracker, and history analytics.",
      },
      {
        id: "ironlog-workout",
        src: "/projects/ironlog-app/Workout.jpeg",
        caption: "Active Workout Session: real-time set logging, rep & weight inputs, and rest countdown timers.",
      },
      {
        id: "ironlog-plans",
        src: "/projects/ironlog-app/Plans.jpeg",
        caption: "Training Split & Routine Planner: customizable Push/Pull/Legs and muscle group scheduling.",
      },
      {
        id: "ironlog-history",
        src: "/projects/ironlog-app/History.jpeg",
        caption: "Workout History & Volume Progression: session calendar log and personal record progressions.",
      },
      {
        id: "ironlog-exercise",
        src: "/projects/ironlog-app/Excercise.jpeg",
        caption: "Exercise Library: 400+ pre-seeded strength movements filterable by muscle groups and equipment.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/IronLogApp",
    seoTitle: "IronLog Gym Tracker — Offline Mobile App | Hamza Ramzan",
    seoDescription:
      "An offline-first mobile strength training log built with React Native and SQLite, featuring custom plans and a 400+ exercise library.",
  },

  // 05: YOLO ANNOTATION VIEWER
  {
    slug: "annotation-viewer",
    aliases: ["yolo-annotation-viewer", "dataset-bb-checking"],
    number: "05",
    title: "YOLO Annotation Viewer & Dataset Mover",
    category: "Data Engineering & Computer Vision",
    shortDescription:
      "A high-throughput dataset curation tool built with Streamlit and OpenCV to inspect bounding box annotations, filter labeling noise, and organize over 150,000 images.",
    image: "/projects/annotation-viewer/hero_16_9.png",
    alt: "Streamlit application interface displaying YOLO bounding box annotations and dataset organization controls",
    role: "Computer Vision & Data Tooling Engineer",
    year: "2024",
    technologies: ["Python", "Streamlit", "OpenCV", "Pillow", "NumPy", "YOLO Format"],
    overview:
      "Training production vision models requires pristine ground-truth labels. During the development of our workplace safety monitoring system, I needed a fast, reliable tool to audit bounding boxes and clean dataset noise. I built this Streamlit application to rapidly review image-label pairs and quarantine errors with a single click.",
    problem:
      "Annotation teams and third-party tools frequently generate misplaced bounding boxes, duplicate tags, or corrupted labels. Manually inspecting tens of thousands of image-text pairs with generic file viewers is tedious, slow, and risks breaking directory synchronization.",
    approach:
      "Engineered an efficient local dashboard combining Streamlit with OpenCV that parses normalized YOLO coordinate files on-the-fly, matches class IDs to names, and executes atomic file transfers between directories without data loss.",
    howItWorks:
      "Users specify the image directory, label directory, and classes text file. The application parses normalized coordinate annotations (`class x_center y_center width height`), overlays color-coded bounding boxes onto images, and allows operators to approve images or move flawed samples into quarantine folders with one click.",
    pipelineNodes: [
      { id: "ingest", label: "Directory Ingestion", subtext: "Images, txt labels, classes" },
      { id: "parse", label: "YOLO Parser", subtext: "Normalized box math" },
      { id: "render", label: "OpenCV Overlay", subtext: "Real-time bounding boxes" },
      { id: "filter", label: "Audit & Filter", subtext: "Visual inspection & navigation" },
      { id: "mover", label: "Atomic Mover", subtext: "1-Click file quarantine" },
    ],
    pipeline: [
      "Directory Ingestion (Loads paired image directories, text labels, and class definitions)",
      "YOLO Coordinate Parsing (Decodes normalized xywh coordinates to absolute pixel bounding boxes)",
      "OpenCV Visual Overlay (Draws colored bounding boxes with dynamic class text tags)",
      "Rapid Navigation Engine (High-throughput browsing across thousands of dataset items)",
      "Atomic File Transfer (Moves flagged images and corresponding label files into target review folders)",
    ],
    features: [
      "Instant bounding box visualization: parses and renders standard YOLO coordinate format seamlessly.",
      "One-click quarantine: relocates problematic image and text pairs simultaneously without desynchronization.",
      "Class label mapping: dynamically reads class name definitions from arbitrary `classes.txt` files.",
      "High volume capacity: tested and proven on datasets exceeding 150,000 images and 40,000 label files.",
      "Zero-configuration setup: runs locally with standard Python dependencies via Streamlit.",
    ],
    results: [
      { label: "Images Audited", value: "150,000+ Images", isReal: true },
      { label: "Label Files Cleaned", value: "40,000+ Files", isReal: true },
      { label: "Format Support", value: "YOLO (txt / normalized)", isReal: true },
      { label: "Workflow Type", value: "Atomic Directory Sync", isReal: true },
    ],
    gallery: [
      {
        id: "annot-1",
        src: "/projects/annotation-viewer/hero.png",
        caption: "Streamlit dataset audit console displaying YOLO bounding box overlays and one-click quarantine controls.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/Annotation-Viewer",
    seoTitle: "YOLO Annotation Viewer & Dataset Mover | Hamza Ramzan",
    seoDescription:
      "A high-throughput computer vision dataset auditing tool built with Streamlit, Python, and OpenCV.",
  },

  // 06: DEEPSEEK CODE GENERATOR
  {
    slug: "deepseek-code-generator",
    aliases: ["deepseek-coder", "code-generator"],
    number: "06",
    title: "DeepSeek Code Generator & API",
    category: "Local AI & Code Generation",
    shortDescription:
      "An offline-capable AI code assistant powered by DeepSeek Coder 1.3B, featuring both an interactive Gradio web interface and a lightweight Flask REST API.",
    image: "/projects/deepseek-code-generator/hero_16_9.png",
    alt: "DeepSeek Code Generator application interface showing prompt input and generated Python code with inline comments",
    role: "Machine Learning & Backend Engineer",
    year: "2024",
    technologies: ["Python", "PyTorch", "Transformers", "DeepSeek Coder 1.3B", "Gradio", "Flask", "Hugging Face"],
    overview:
      "Modern developers frequently rely on cloud LLMs for code assistance, but sending proprietary code to third-party APIs poses security risks and requires internet connectivity. This project packages the DeepSeek Coder 1.3B model into a self-contained local application accessible via both a web UI and a REST API.",
    problem:
      "Cloud coding APIs require ongoing subscriptions, introduce network latency, and expose proprietary code. Developers need lightweight, local alternatives that can run on standard consumer hardware without cloud dependencies.",
    approach:
      "Deployed the 1.3-billion parameter `deepseek-ai/deepseek-coder-1.3b-base` model using PyTorch and Hugging Face Transformers. Wrapped model inference into dual interfaces: a reactive Gradio UI for quick interactive queries and a Flask server for IDE extensions and automated scripts.",
    howItWorks:
      "Natural language programming prompts are passed to the model tokenizer. The model performs autoregressive code completion, generating clean Python code accompanied by inline explanatory comments. The Flask endpoint allows programmatic integration into local workflows via simple JSON POST requests.",
    pipelineNodes: [
      { id: "input", label: "Prompt Input", subtext: "Natural language query" },
      { id: "hf", label: "Tokenization", subtext: "Hugging Face AutoTokenizer" },
      { id: "deepseek", label: "DeepSeek Coder", subtext: "1.3B base model inference" },
      { id: "filter", label: "Output Parsing", subtext: "Code blocks & inline comments" },
      { id: "serve", label: "Dual Interface", subtext: "Gradio Web UI / Flask REST" },
    ],
    pipeline: [
      "Natural Language Prompt Ingestion (Accepts English specifications of code objectives)",
      "Hugging Face Model Pipeline (Loads weights and initializes CPU/CUDA tokenization tensor buffers)",
      "Autoregressive Generation (Generates syntax-checked Python routines with comprehensive comments)",
      "Interactive Gradio Console (Web interface for rapid query testing and parameter adjustment)",
      "Flask REST Endpoint (`POST /generate` for automated toolchains and local IDE integrations)",
    ],
    features: [
      "Local code generation: runs on consumer CPUs and GPUs without sending code to third-party servers.",
      "Automated inline documentation: generates readable inline comments alongside logic.",
      "Dual-access interfaces: Gradio web dashboard for human interaction, Flask REST API for programmatic calls.",
      "Lightweight memory footprint: DeepSeek Coder 1.3B runs smoothly without enterprise GPU servers.",
      "Zero cloud API keys required: completely private, offline-capable code generation.",
    ],
    results: [
      { label: "Model Architecture", value: "DeepSeek Coder 1.3B", isReal: true },
      { label: "Cloud API Dependency", value: "0% (Fully Local)", isReal: true },
      { label: "Interface Options", value: "Gradio Web + Flask REST", isReal: true },
      { label: "Platform Target", value: "Consumer CPU & CUDA", isReal: true },
    ],
    gallery: [
      {
        id: "deepseek-1",
        src: "/projects/deepseek-code-generator/hero.png",
        caption: "Gradio interactive code generation console displaying natural language prompt and commented Python output.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/DeepSeek_Code_Generator",
    demoVideo: "https://drive.google.com/file/d/1FcBZtFWoNeZ7nV3HNYd0o0ymHYTpnUhB/view?usp=sharing",
    seoTitle: "DeepSeek Code Generator — Local AI Coding Assistant | Hamza Ramzan",
    seoDescription:
      "Local Python code generation tool powered by DeepSeek Coder 1.3B with Gradio web interface and Flask API.",
  },

  // 07: FARM CAMERA OVERVIEW
  {
    slug: "farm-camera-overview",
    aliases: ["farm-camera-video-analytics"],
    number: "07",
    title: "Farm Camera Daily Overview",
    category: "Edge AI & Video Analytics",
    shortDescription:
      "A self-hosted desktop pipeline that downloads Tapo C200 camera recordings over the local network, detects people and livestock with YOLO, and generates an interactive daily HTML summary.",
    image: "/projects/farm-camera-overview/hero_16_9.png",
    alt: "Farm acreage surveillance feed with motion tracking overlays, Tapo C200 telemetry, and daily timeline",
    role: "Edge AI & Systems Engineer",
    year: "2024",
    technologies: ["Python", "YOLOv8", "PyTapo", "FFmpeg", "CustomTkinter", "Windows Task Scheduler"],
    overview:
      "Reviewing 24 hours of farm surveillance video manually is impractical. I built this tool to automatically pull footage from local TP-Link Tapo C200 cameras, detect important activity, and summarize the day into an easy-to-read report.",
    problem:
      "Commercial camera cloud subscriptions are costly and store sensitive video remotely. Without a summary tool, farm owners have to manually scrub through hours of motionless footage to see when animals moved or someone arrived.",
    approach:
      "Direct local LAN socket ingestion via PyTapo without third-party cloud relays. Grouping frame-by-frame detections into clustered incident timelines rendered into self-contained HTML reports.",
    howItWorks:
      "The tool connects to Tapo C200 cameras over local Wi-Fi via PyTapo, downloading recorded video chunks directly from the SD card. It processes frames using YOLOv8 to identify people, vehicles, and livestock, groups continuous detections into distinct events, and outputs a self-contained daily HTML summary report.",
    pipelineNodes: [
      { id: "pytapo", label: "Local LAN Ingestion", subtext: "Direct SD card extraction" },
      { id: "yolo", label: "YOLOv8 Detection", subtext: "Person & livestock classes" },
      { id: "cluster", label: "Event Clustering", subtext: "Incident timestamps" },
      { id: "ffmpeg", label: "FFmpeg Clip Cutter", subtext: "Automated event clips" },
      { id: "html", label: "HTML Report", subtext: "Interactive daily timeline" },
    ],
    pipeline: [
      "Local LAN Camera Ingestion via PyTapo (Pulls video directly from SD card without cloud)",
      "Frame Processing with YOLOv8 (Detects persons, vehicles, cows, horses, sheep, dogs)",
      "Event Consolidation (Clusters frame detections into distinct timestamped incidents)",
      "FFmpeg Video Extraction (Generates concise event clips and keyframe thumbnails)",
      "Interactive HTML Report Builder (Timeline, thumbnail feed, and lightbox playback)",
      "Automated Scheduling (Runs headlessly via Windows Task Scheduler every morning)",
    ],
    features: [
      "Zero cloud reliance: pulls video directly over local Wi-Fi without third-party subscriptions.",
      "Animal and human detection: recognizes persons, vehicles, cows, horses, sheep, and dogs.",
      "Event grouping: merges hundreds of raw detections into clean, timestamped incident blocks.",
      "Interactive HTML report: includes a 24-hour visual timeline, event metrics, and thumbnail player.",
      "Headless operation: runs on an automated daily schedule via Windows Task Scheduler.",
    ],
    results: [
      { label: "Cloud Reliance", value: "0% (Fully Local LAN)", isReal: true },
      { label: "Hardware Support", value: "Tapo C200 via PyTapo", isReal: true },
      { label: "Automation Mode", value: "Windows Task Scheduler", isReal: true },
      { label: "Report Format", value: "Standalone Interactive HTML", isReal: true },
    ],
    gallery: [
      {
        id: "farm-1",
        src: "/projects/farm-camera-overview/hero.png",
        caption: "Daily surveillance analytics dashboard showing detection timeline and incident clips.",
      },
    ],
    statusNote: "Local Desktop Application (Planned GitHub Upload)",
    seoTitle: "Farm Camera Daily Overview — Edge AI Project | Hamza Ramzan",
    seoDescription:
      "Self-hosted edge surveillance tool for Tapo C200 cameras using Python, YOLOv8, and FFmpeg for automated daily event summaries.",
  },

  // 08: WILDLIFE DETECTION MODEL
  {
    slug: "wildlife-detection-model",
    aliases: ["wildlife-detection", "wildlife-vision"],
    number: "08",
    title: "Wildlife Detection Model",
    category: "Computer Vision",
    shortDescription:
      "A specialized computer vision pipeline fine-tuned on multispectral camera streams to detect, classify, and track wild animals in natural habitats and perimeter boundaries.",
    image: "/projects/wildlife-detection-model/Thumbnail_16_9.png",
    alt: "Wildlife vision monitoring interface with bounding boxes detecting wild animals in camera feeds",
    role: "Computer Vision Engineer",
    year: "2025",
    technologies: ["Python", "YOLOv11", "OpenCV", "PyTorch", "CUDA", "Edge AI", "RTSP"],
    overview:
      "Monitoring wildlife movement and protecting rural perimeters from animal intrusions requires continuous, automated camera surveillance. This project develops an edge-deployable vision pipeline that identifies wildlife species across varying lighting and weather conditions.",
    problem:
      "Forest and farm cameras produce thousands of false triggers caused by wind-blown foliage, shadows, and low-light noise. Standard generic object detectors are not trained on regional wildlife species and struggle in dense vegetation.",
    approach:
      "Trained a specialized YOLO model on annotated wildlife datasets covering multiple species under diverse backgrounds. Integrated temporal confidence thresholding to filter environmental false positives before logging detections.",
    howItWorks:
      "Camera frames are captured from RTSP or local video storage. The inference engine runs the fine-tuned detector, identifying animal species with confidence telemetry. Validated detections generate automated event stamps and perimeter violation logs.",
    pipelineNodes: [
      { id: "camera", label: "Video Ingestion", subtext: "RTSP & local camera feeds" },
      { id: "prep", label: "Preprocessing", subtext: "Contrast & gamma balancing" },
      { id: "model", label: "YOLO Inference", subtext: "Species classification & boxes" },
      { id: "filter", label: "Temporal Filter", subtext: "Foliage noise suppression" },
      { id: "log", label: "Event Logging", subtext: "Telemetry & alert triggers" },
    ],
    pipeline: [
      "Multisource Video Capture (Ingests RTSP streams from trail and perimeter surveillance cameras)",
      "Frame Preprocessing (Applies dynamic gamma and contrast correction for dawn/dusk lighting)",
      "Species Classification & Bounding (Fine-tuned YOLO network predicts bounding boxes and species classes)",
      "Temporal Confidence Averaging (Rejects transient foliage motion and camera vibration artifacts)",
      "Perimeter Alert Dispatch (Logs detection coordinates and triggers event alerts)",
    ],
    features: [
      "Specialized species detection: trained to recognize diverse animal classes in dense natural habitats.",
      "Foliage noise rejection: temporal verification avoids false alarms triggered by swaying trees and shadows.",
      "Low-light adaptability: tested across day, dusk, and night vision camera modalities.",
      "Real-time edge throughput: optimized for local NVIDIA Jetson and desktop workstations.",
      "Event snapshot capture: automatically archives detection crops for review.",
    ],
    results: [
      { label: "Target Precision", value: "98%+", isReal: true },
      { label: "Inference Latency", value: "Real-Time CUDA", isReal: true },
      { label: "Noise Rejection", value: "Temporal Thresholding", isReal: true },
      { label: "Deployment Target", value: "Edge Workstations & Jetson", isReal: true },
    ],
    gallery: [
      {
        id: "wildlife-1",
        src: "/projects/wildlife-detection-model/Thumbnail.png",
        caption: "Multispectral wildlife detection console tracking wild animals with confidence telemetry.",
      },
      {
        id: "wildlife-2",
        src: "/projects/wildlife-detection-model/Thumbnail_16_9.png",
        caption: "Standardized 16:9 widescreen presentation display for field operations.",
      },
    ],
    statusNote: "Source Repository & Documentation in Progress",
    githubUrl: "https://github.com/Agent47c/Wildlife_Detection_Model",
    seoTitle: "Wildlife Detection Model — Computer Vision | Hamza Ramzan",
    seoDescription:
      "Specialized edge computer vision system for wildlife detection and perimeter sentry monitoring.",
  },

  // 09: SPAM MAIL DETECTOR
  {
    slug: "spam-mail-detector",
    aliases: ["email-spam-classifier", "spam-detector"],
    number: "09",
    title: "Spam Mail Detection Pipeline",
    category: "NLP & Machine Learning",
    shortDescription:
      "A supervised natural language processing system that classifies emails as spam or ham using TF-IDF feature vectorization and Multinomial Naive Bayes.",
    image: "/projects/spam-mail-detector/Demo_16_9.png",
    alt: "Spam Mail Detector dashboard showing incoming email text analysis, TF-IDF weights, and classification confidence",
    role: "Machine Learning Engineer",
    year: "2025",
    technologies: ["Python", "scikit-learn", "NLTK", "TF-IDF", "Naive Bayes", "Pandas", "NumPy"],
    overview:
      "Email communication remains one of the primary vectors for phishing and unsolicited advertising. As part of my machine learning engineering work, I implemented a fast, accurate text classification pipeline capable of evaluating incoming email headers and body content in milliseconds.",
    problem:
      "Spam messages deliberately use evasive wording, misspelled triggers, and excessive punctuation to bypass simple rule-based keyword filters, causing unwanted messages to flood inboxes.",
    approach:
      "Designed a robust NLP text preprocessing pipeline incorporating tokenization, stop-word removal, and Porter stemming. Transformed cleaned text into high-dimensional TF-IDF matrices and benchmarked probabilistic Naive Bayes against Support Vector Machines.",
    howItWorks:
      "Incoming email text is sanitized, tokenized, and stemmed to its root forms. The TF-IDF vectorizer computes term importance scores across the learned vocabulary. The trained Multinomial Naive Bayes model calculates class posterior probabilities, assigning a high-confidence spam or ham verdict.",
    pipelineNodes: [
      { id: "raw", label: "Email Ingestion", subtext: "Subject line & body text" },
      { id: "prep", label: "Text Preprocessing", subtext: "Tokenize, stop words, stemming" },
      { id: "tfidf", label: "TF-IDF Vectorizer", subtext: "Term frequency-inverse doc math" },
      { id: "bayes", label: "Naive Bayes Classifier", subtext: "Multinomial probability engine" },
      { id: "eval", label: "Spam / Ham Verdict", subtext: "Confidence score & telemetry" },
    ],
    pipeline: [
      "Email Text Ingestion (Parses email subject and message body into raw text buffers)",
      "NLP Preprocessing Pipeline (Lowercases text, strips punctuation, removes stopwords, applies stemming)",
      "TF-IDF Matrix Transformation (Converts text tokens into weighted statistical feature vectors)",
      "Probabilistic Classification (Evaluates class likelihoods via Multinomial Naive Bayes)",
      "Telemetry & Thresholding (Outputs real-time spam probability score and classification verdict)",
    ],
    features: [
      "High-speed text classification: processes and scores email messages in sub-millisecond execution times.",
      "Full NLP pipeline: includes lowercasing, punctuation filtering, stopword pruning, and root stemming.",
      "Feature weight transparency: displays top TF-IDF predictive keywords driving the spam verdict.",
      "Probabilistic output: provides calibrated percentage confidence rather than an opaque binary flag.",
      "Lightweight deployment: runs efficiently without requiring heavy transformer GPU compute.",
    ],
    results: [
      { label: "Target Precision", value: "98%+", isReal: true },
      { label: "Vectorization", value: "TF-IDF Feature Matrices", isReal: true },
      { label: "Algorithm", value: "Multinomial Naive Bayes", isReal: true },
      { label: "Inference Latency", value: "< 5ms per message", isReal: true },
    ],
    gallery: [
      {
        id: "spam-1",
        src: "/projects/spam-mail-detector/Demo.png",
        caption: "Spam mail analysis dashboard showing incoming email, TF-IDF feature weights, and 99.2% classification confidence.",
      },
      {
        id: "spam-2",
        src: "/projects/spam-mail-detector/Demo_16_9.png",
        caption: "Widescreen dashboard overview of the spam classification telemetry.",
      },
    ],
    statusNote: "Source Repository & Documentation in Progress",
    githubUrl: "https://github.com/Agent47c/SpamMailDetector",
    seoTitle: "Spam Mail Detector — NLP & Machine Learning | Hamza Ramzan",
    seoDescription:
      "Supervised machine learning spam detection pipeline using TF-IDF vectorization and Naive Bayes.",
  },

  // 10: BILAL PORTFOLIO
  {
    slug: "bilal-portfolio",
    aliases: ["motion-designer-portfolio", "ahmad-bilal-portfolio"],
    number: "10",
    title: "Ahmad Bilal — Motion Designer Portfolio",
    category: "Client Web Development & Design",
    shortDescription:
      "A high-converting editorial portfolio website designed and engineered for SaaS video editor and motion designer Ahmad Bilal, optimized for speed, aesthetics, and client inquiries.",
    image: "/projects/bilal-portfolio/hero.webp",
    alt: "Modern dark-themed portfolio website interface designed for SaaS motion designer Ahmad Bilal",
    role: "Frontend Developer & UI Designer",
    year: "2024",
    technologies: ["HTML5", "CSS3", "JavaScript", "Vercel", "Responsive Design", "SEO Optimization"],
    overview:
      "Creative professionals need a digital presence that immediately signals craftsmanship and authority. I designed and coded a custom, high-performance portfolio website for motion graphics specialist Ahmad Bilal, translating his video production case studies into an interactive visual narrative.",
    problem:
      "Off-the-shelf website builders like Wix or generic WordPress themes often suffer from bloated scripts, slow video load times, and generic layouts that fail to reflect the premium quality of top-tier video creators.",
    approach:
      "Engineered a lightweight custom frontend using semantic HTML5, pure CSS layout architecture, and minimal vanilla JavaScript. Ensured instant asset loading, responsive video embeds, and frictionless contact touchpoints.",
    howItWorks:
      "The website showcases video reels, client brand testimonials, and production services across dedicated sections. Media assets were converted to modern WebP/WebM formats for sub-second page loads, coupled with structured JSON copy configurations for seamless client updates.",
    pipelineNodes: [
      { id: "design", label: "Art Direction", subtext: "Dark aesthetic & typography" },
      { id: "code", label: "Semantic Frontend", subtext: "Clean HTML5 & CSS architecture" },
      { id: "media", label: "Media Optimization", subtext: "WebP asset compression" },
      { id: "seo", label: "SEO & Copywriting", subtext: "Structured metadata & JSON copy" },
      { id: "deploy", label: "Edge Deployment", subtext: "Vercel edge CDN" },
    ],
    pipeline: [
      "Creative Art Direction (Tailored dark palette, typography, and motion designer identity)",
      "Component Architecture (Hero reel, interactive service modules, and client case study grids)",
      "Asset Performance Pipeline (Lossless compression of hero media into WebP for 90+ Lighthouse score)",
      "Client-Friendly Content Architecture (Modular markdown and JSON schema for straightforward copy updates)",
      "Deployment & Domain Configuration (Continuous integration via GitHub to Vercel edge CDN)",
    ],
    features: [
      "Custom visual identity: bespoke layout reflecting motion graphics precision and typography.",
      "Optimized media delivery: fast-loading WebP assets and responsive video embeds.",
      "High-converting inquiry flows: streamlined call-to-action buttons connecting directly to scheduling.",
      "Zero template bloat: handcrafted codebase without unnecessary third-party frameworks.",
      "SEO optimized: comprehensive meta tags, OpenGraph previews, and semantic heading structure.",
    ],
    results: [
      { label: "Lighthouse Performance", value: "95+ on Mobile & Desktop", isReal: true },
      { label: "Asset Format", value: "Modern WebP / SVG", isReal: true },
      { label: "Page Weight", value: "< 500KB Initial Bundle", isReal: true },
      { label: "Hosting Infrastructure", value: "Vercel Global Edge CDN", isReal: true },
    ],
    gallery: [
      {
        id: "bilal-1",
        src: "/projects/bilal-portfolio/hero.webp",
        caption: "Hero showcase featuring motion designer identity and interactive video service offerings.",
      },
      {
        id: "bilal-2",
        src: "/projects/bilal-portfolio/editing.webp",
        caption: "Process and pacing breakdown highlighting explainer video production methodology.",
      },
      {
        id: "bilal-3",
        src: "/projects/bilal-portfolio/growth.webp",
        caption: "Results and client conversion analytics showcase module.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/Bilal-Portfolio",
    seoTitle: "Ahmad Bilal Motion Designer Portfolio | Hamza Ramzan",
    seoDescription:
      "Bespoke high-performance portfolio website built for SaaS video creator and motion designer Ahmad Bilal.",
  },

  // 11: WINDOWS SMART BACKUP TOOL
  {
    slug: "smart-app-backup",
    aliases: ["windows-backup-tool"],
    number: "11",
    title: "Windows Smart Application Backup Tool",
    category: "Desktop Utility & Automation",
    shortDescription:
      "A clean-architecture Windows utility for backing up and restoring app-specific configurations, user data, and registry settings without cloning entire drives.",
    image: "/projects/smart-app-backup/hero_16_9.png",
    alt: "Windows backup utility dashboard showing registry targets, application profiles, and automation logs",
    role: "Desktop Software Engineer",
    year: "2024",
    technologies: ["Python", "Tkinter", "Windows Registry (winreg)", "JSON Profiles"],
    overview:
      "Setting up a new development workstation or restoring customized software after a fresh Windows install usually takes hours of reconfiguring settings. I built this utility to backup exactly the configurations and registry keys you need.",
    problem:
      "Whole-disk imaging tools create massive multi-gigabyte backup files that copy junk and temp files. Meanwhile, manually hunting down AppData folders and registry entries across `HKCU` and `HKLM` is tedious and error-prone.",
    approach:
      "Designed a declarative profile schema in JSON allowing granular extraction of configuration paths and registry keys, with SHA-256 manifest checks preventing system corruption.",
    howItWorks:
      "The application uses modular JSON profiles to define where specific programs store their configs (such as `%APPDATA%`, `%LOCALAPPDATA%`, and registry paths). It safely exports registry keys using Python's `winreg` library, archives the relevant folders, and generates a manifest file so everything can be restored with a single click.",
    pipelineNodes: [
      { id: "profile", label: "JSON Profile Loader", subtext: "Target paths & registry keys" },
      { id: "validate", label: "Path Validation", subtext: "Blocks critical OS trees" },
      { id: "winreg", label: "Winreg Extraction", subtext: "Exports .reg structures" },
      { id: "archive", label: "Archive & Hash", subtext: "SHA-256 manifest verification" },
      { id: "restore", label: "1-Click Restore", subtext: "Safe re-application" },
    ],
    pipeline: [
      "JSON Profile Loader (Reads application definitions and target paths)",
      "Path Validation (Blocks critical Windows system paths to prevent accidental damage)",
      "Registry Manager (Exports `.reg` structures and restores them safely)",
      "Archive Generator (Compresses application configs with manifest file verification)",
      "Restoration Engine (Verifies file hashes and restores settings to proper paths)",
    ],
    features: [
      "Profile-driven backups: define custom application paths and registry branches in simple JSON.",
      "Safe path validation: blocks accidental selection of critical Windows OS directories.",
      "Registry manager: exports and imports registry structures cleanly without third-party tools.",
      "Manifest verification: records file metadata and hashes to ensure error-free restoration.",
      "Built-in profiles: includes pre-configured setups for tools like VS Code, Chrome, and Notepad++.",
    ],
    results: [
      { label: "Configuration Method", value: "Modular JSON Profiles", isReal: true },
      { label: "Integrity Verification", value: "SHA-256 Manifests", isReal: true },
      { label: "OS Compatibility", value: "Windows 10 / 11", isReal: true },
      { label: "External Dependencies", value: "0 (Native Python Standard Lib)", isReal: true },
    ],
    gallery: [
      {
        id: "backup-1",
        src: "/projects/smart-app-backup/hero.png",
        caption: "Application profile selector and automated registry backup console.",
      },
    ],
    statusNote: "Local Desktop Application (Planned GitHub Upload)",
    seoTitle: "Windows Smart Application Backup Tool | Hamza Ramzan",
    seoDescription:
      "A Windows desktop utility built with Python and winreg for backing up application configurations and registry keys.",
  },

  // 12: HOUSE PRICE PREDICTION
  {
    slug: "house-price-prediction",
    aliases: ["real-estate-valuation", "house-price-prediction-indian"],
    number: "12",
    title: "House Price Prediction Model",
    category: "Machine Learning & Analytics",
    shortDescription:
      "A supervised machine learning regression model predicting real estate prices based on locality, square footage, amenities, and market trends.",
    image: "/projects/house-price-prediction/hero.jpg",
    alt: "Real estate valuation machine learning dashboard showing regression curves and feature charts",
    role: "Machine Learning Intern / Analyst",
    year: "2025",
    technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    overview:
      "Real estate pricing depends on numerous interrelated factors such as location, usable area, room count, and neighborhood amenities. This project walks through the complete data science pipeline from raw housing data to predictive model evaluation.",
    problem:
      "Raw real estate datasets typically contain missing values, extreme price outliers, and skewed distributions that cause basic linear models to produce unreliable valuations.",
    approach:
      "Conducted rigorous exploratory analysis, log-transformed skewed price distributions, evaluated feature collinearity, and benchmarked linear vs tree ensemble regressors.",
    howItWorks:
      "I cleaned and explored the dataset using Pandas and Seaborn, applied log transformations to normalize skewed price attributes, and handled categorical location features. Multiple regression algorithms (Linear Regression, Ridge, Decision Trees, and Random Forest) were trained and compared using cross-validation.",
    pipelineNodes: [
      { id: "eda", label: "EDA & Imputation", subtext: "Correlation & missing values" },
      { id: "fe", label: "Feature Engineering", subtext: "Log transforms & encoding" },
      { id: "models", label: "Model Training", subtext: "Linear, Ridge, RF, Decision Trees" },
      { id: "eval", label: "Cross-Validation", subtext: "RMSE, MAE, R² benchmarking" },
      { id: "explain", label: "Feature Importance", subtext: "Valuation drivers" },
    ],
    pipeline: [
      "Data Ingestion & Cleaning (Missing value imputation and column formatting)",
      "Exploratory Data Analysis (Correlation heatmaps, feature distribution plots)",
      "Feature Engineering (Outlier detection, price log transform, categorical encoding)",
      "Model Training (Linear Regression, Ridge, Decision Trees, Random Forest)",
      "Evaluation & Comparison (Benchmarking with RMSE, MAE, and R-squared metrics)",
    ],
    features: [
      "End-to-end data pipeline covering EDA, data cleaning, feature engineering, and model evaluation.",
      "Comparative analysis across multiple regression models to find the best balance of bias and variance.",
      "Feature importance evaluation identifying the most significant drivers of property value.",
      "Visual diagnostic plots including residual error distributions and prediction vs. actual curves.",
    ],
    results: [
      { label: "Baseline Models", value: "Linear, Ridge, RF, Trees", isReal: true },
      { label: "Validation Strategy", value: "K-Fold Cross-Validation", isReal: true },
      { label: "Feature Engineering", value: "Log-Transform & One-Hot", isReal: true },
      { label: "Core Library", value: "scikit-learn & Pandas", isReal: true },
    ],
    gallery: [
      {
        id: "house-1",
        src: "/projects/house-price-prediction/hero.jpg",
        caption: "Exploratory regression analysis and feature importance distribution plots.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/House_Price_Prediction_Indian",
    seoTitle: "House Price Prediction Model — Machine Learning | Hamza Ramzan",
    seoDescription:
      "A supervised machine learning regression project using scikit-learn, Pandas, and Python for real estate price valuation.",
  },

  // 13: VIRTUAL WARDROBE MANAGER
  {
    slug: "virtual-wardrobe-manager",
    aliases: ["wardrobe-manager", "digital-wardrobe"],
    number: "13",
    title: "Virtual Wardrobe Manager",
    category: "Mobile Application & Vision",
    shortDescription:
      "A digital closet and intelligent outfit coordination application that digitizes clothing items, categorizes apparel by style and season, and suggests personalized outfit combinations.",
    image: "/projects/virtual-wardrobe-manager/hero.png",
    alt: "Virtual Wardrobe Manager application UI displaying digital closet grid, outfit recommendations, and categories",
    role: "Full-Stack & Mobile Developer",
    year: "2024",
    technologies: ["React Native", "TypeScript", "Python", "SQLite", "OpenCV", "Color Analysis"],
    overview:
      "Organizing apparel and finding cohesive outfit pairings every day is a recurring challenge. Virtual Wardrobe Manager digitizes your personal wardrobe into an interactive catalog, helping users coordinate outfits based on color theory, weather, and occasion.",
    problem:
      "Physical closets make it easy to forget owned clothing, leading to redundant purchases and decision fatigue. Existing fashion apps are often bloated with commercial sponsored ads rather than serving as a private, practical wardrobe manager.",
    approach:
      "Built a private, user-centric mobile application that stores catalog data locally. Integrated background segmentation and dominant color extraction algorithms to automatically tag clothing items upon upload.",
    howItWorks:
      "Users snap photos of garments; the app removes backgrounds, analyzes dominant color palettes, and assigns categories. A smart matching engine generates pairing recommendations (tops, bottoms, outerwear, footwear) based on complementary color harmonies.",
    pipelineNodes: [
      { id: "photo", label: "Garment Capture", subtext: "Camera snapshot ingestion" },
      { id: "segment", label: "Background Removal", subtext: "Clean apparel cutout" },
      { id: "palette", label: "Color Extraction", subtext: "Dominant HSL color analysis" },
      { id: "match", label: "Coordination Engine", subtext: "Color harmony & season pairing" },
      { id: "closet", label: "Digital Catalog", subtext: "Offline relational storage" },
    ],
    pipeline: [
      "Garment Photo Ingestion (Captures clothing images from camera or mobile photo library)",
      "Automatic Cutout (Strips background clutter to produce clean catalog thumbnails)",
      "Color & Attribute Tagging (Extracts dominant color palette, formality level, and seasonal suitability)",
      "Smart Outfit Generation (Pairs complementary garments according to color theory rules)",
      "Local Closet Database (Stores wardrobe collections with fast offline filtering)",
    ],
    features: [
      "Instant apparel digitization: upload clothing photos with automatic thumbnail isolation.",
      "Color harmony pairing: generates cohesive outfit sets using complementary and monochromatic rules.",
      "Filterable wardrobe catalog: search by season, occasion (formal, casual, athletic), and color.",
      "Offline-first database: stores personal photos and clothing catalog securely on device.",
      "Minimalist modern dark theme designed for fluid mobile navigation.",
    ],
    results: [
      { label: "Local Privacy", value: "100% On-Device", isReal: true },
      { label: "Color Extraction", value: "Dominant HSL Analysis", isReal: true },
      { label: "Architecture", value: "React Native + SQLite", isReal: true },
      { label: "Wardrobe Capacity", value: "Unlimited Local", isReal: true },
    ],
    gallery: [
      {
        id: "wardrobe-1",
        src: "/projects/virtual-wardrobe-manager/Virtual Wardrobe.png",
        caption: "Digital wardrobe dashboard showing cataloged apparel items, category filters, and outfit pairings.",
      },
      {
        id: "wardrobe-2",
        src: "/projects/virtual-wardrobe-manager/hero.png",
        caption: "Standardized 16:9 widescreen presentation display of the wardrobe manager.",
      },
    ],
    statusNote: "Source Repository & Documentation in Progress",
    githubUrl: "https://github.com/Agent47c/VirtualWardrobeManager",
    seoTitle: "Virtual Wardrobe Manager — Digital Closet & Styling | Hamza Ramzan",
    seoDescription:
      "Digital closet and outfit pairing mobile application with smart color analysis and cataloging.",
  },
];

// Helper to look up project by primary slug or alias
export const findProjectBySlug = (slug?: string): ProjectData | undefined => {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug === slug || (p.aliases && p.aliases.includes(slug)));
};
