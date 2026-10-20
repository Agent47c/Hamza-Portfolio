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
  {
    slug: "ppe-safety-monitor",
    aliases: ["ppe-safety-monitoring", "ppe-monitor"],
    number: "01",
    title: "PPE Safety Monitor",
    category: "Computer Vision & Workplace Safety",
    shortDescription:
      "A real-time workplace safety system that uses YOLOv11 and StrongSORT to detect whether workers are wearing required safety gear, with automatic email alerts and violation tracking.",
    image: "/projects/ppe-safety-monitor/hero.jpg",
    alt: "Computer vision surveillance interface showing worker PPE detection with bounding boxes and telemetry",
    role: "Computer Vision & Application Engineer",
    year: "2025",
    technologies: ["Python", "YOLOv11", "StrongSORT", "PyQt5", "OpenCV", "CUDA", "Supabase", "Docker"],
    overview:
      "Workplace accidents often occur because safety protocols are hard to monitor manually across busy job sites. I built this application to automatically detect personal protective equipment (PPE) like hardhats, high-visibility vests, gloves, and boots from live camera feeds.",
    problem:
      "On active construction sites and industrial facilities, supervisors cannot watch dozens of camera feeds simultaneously. When people move around, step behind equipment, or work in crowds, basic object detectors frequently lose track of who is who, leading to false violation alarms.",
    approach:
      "Combined high-throughput edge detection via fine-tuned YOLOv11 with appearance-based metric tracking via StrongSORT. Integrated alert rate-limiting and a native desktop GUI for zero-cloud latency.",
    howItWorks:
      "The system takes video streams from webcams, RTSP IP cameras, or pre-recorded video files. It runs a fine-tuned YOLOv11 model to detect people and safety gear, then uses StrongSORT to assign a persistent ID to each person across frames. When a safety violation is confirmed, it logs the incident to Supabase and sends an automated HTML email with photos of the violation.",
    pipelineNodes: [
      { id: "input", label: "RTSP / Video Feed", subtext: "1080p stream ingestion" },
      { id: "yolo", label: "YOLOv11 Detection", subtext: "Worker & gear classes" },
      { id: "sort", label: "StrongSORT Tracker", subtext: "Re-ID across occlusions" },
      { id: "logic", label: "Compliance Engine", subtext: "Checklist verification" },
      { id: "notify", label: "Supabase & Email", subtext: "Instant alert trigger" },
    ],
    pipeline: [
      "Video Input (Webcam, RTSP IP camera feed, or video file)",
      "YOLOv11 Multi-Class Detection (Person, Hardhat, Vest, Boots, Gloves)",
      "StrongSORT Tracking (Maintains unique person IDs across frames and occlusions)",
      "Violation Logic Engine (Checks gear compliance per worker with alert cooldowns)",
      "Incident Notification & Logging (HTML email alerts with cropped images + Supabase database entry)",
      "Desktop GUI (PyQt5 dashboard showing live video, violation logs, and exportable reports)",
    ],
    features: [
      "Multi-source video support: works with webcams, RTSP network streams, and pre-recorded MP4 files.",
      "Persistent tracking: maintains unique worker IDs even when people briefly walk behind objects.",
      "Configurable safety gear checklist: select which items are mandatory for specific work areas.",
      "Automated email alerts: delivers immediate notifications with full scene snapshots and cropped worker images.",
      "Alert throttling: built-in cooldowns prevent repetitive alert emails for the same incident.",
      "Docker support: packaged for straightforward deployment across desktop and edge systems.",
    ],
    results: [
      { label: "Target Precision", value: "98%+", isReal: true },
      { label: "Inference Speed", value: "Real-Time CUDA", isReal: true },
      { label: "FPS on RTX Workstation", value: "TODO(me)", isReal: false },
      { label: "False Positive Reduction", value: "TODO(me)", isReal: false },
    ],
    gallery: [
      {
        id: "ppe-1",
        src: "/projects/ppe-safety-monitor/hero.jpg",
        caption: "Main surveillance console with bounding box telemetry and gear checklist overlays.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/PPE-Detection-System",
    demoUrl: "https://youtu.be/AlRjiE3LIQQ",
    seoTitle: "PPE Safety Monitor — Computer Vision Project | Hamza Ramzan",
    seoDescription:
      "A real-time workplace safety system using YOLOv11 and StrongSORT to detect PPE compliance with automated email alerts.",
  },
  {
    slug: "brain-tumor-segmentation",
    aliases: ["brain-tumor-model"],
    number: "02",
    title: "Brain Tumor Segmentation",
    category: "Medical AI & Deep Learning",
    shortDescription:
      "A deep learning segmentation pipeline using YOLO for region proposal coupled with SAM2 foundation models to accurately outline tumor boundaries in MRI scans.",
    image: "/projects/brain-tumor-model/hero.jpg",
    alt: "Medical AI imaging viewer showing brain MRI scan with tumor segmentation masks",
    role: "Deep Learning Researcher & Developer",
    year: "2025",
    technologies: ["Python", "PyTorch", "SAM2", "MedSAM-2", "YOLO", "OpenCV", "NumPy"],
    overview:
      "Segmenting brain tumors from MRI scans by hand is time-consuming and varies between doctors. This project investigates using modern foundation segmentation models to assist with precise anatomical boundary delineation.",
    problem:
      "MRI scans contain subtle contrast differences across different scan sequences (T1, T2, FLAIR). Traditional segmentation models often require large, bespoke labeled datasets and struggle when applied to new scan protocols without extensive retraining.",
    approach:
      "Employed a two-stage hybrid approach: lightweight YOLO detectors locate candidate regions of interest, and SAM2/MedSAM-2 foundation encoders generate fine-grained boundary masks without requiring full retraining.",
    howItWorks:
      "Instead of training an entire segmentation network from scratch, this system uses a hybrid approach. A lightweight YOLO detector first finds the general region of interest on the scan slice. That bounding box is then fed as a spatial prompt to SAM2 and MedSAM-2, which delineate the precise tumor boundary.",
    pipelineNodes: [
      { id: "dicom", label: "MRI DICOM Slices", subtext: "T1, T2, FLAIR modalities" },
      { id: "prep", label: "Preprocessing", subtext: "Skull stripping & normalization" },
      { id: "roi", label: "YOLO Region Proposal", subtext: "Bounding box estimation" },
      { id: "sam", label: "SAM2 / MedSAM-2", subtext: "Prompted mask delineation" },
      { id: "eval", label: "Mask Metrics", subtext: "Dice & boundary metrics" },
    ],
    pipeline: [
      "MRI Scan Input (Multi-sequence DICOM and image slices)",
      "Preprocessing (Skull stripping, contrast normalization, and artifact cleanup)",
      "YOLO Region Proposal (Identifies approximate tumor bounding box)",
      "SAM2 / MedSAM-2 Prompting (Uses bounding box to generate detailed mask)",
      "Post-Processing & Mask Refinement (Calculates boundary metrics and visual overlays)",
    ],
    features: [
      "Promptable segmentation using foundation vision models adapted for medical scans.",
      "Hybrid two-stage pipeline combining fast region detection with fine-grained mask generation.",
      "Multi-sequence compatibility across standard axial MRI scan modalities.",
      "Preprocessed pipeline including skull stripping and intensity normalization.",
    ],
    results: [
      { label: "Foundation Models", value: "SAM2 & MedSAM-2", isReal: true },
      { label: "Dice Coefficient", value: "TODO(me)", isReal: false },
      { label: "Mean IoU on Test Set", value: "TODO(me)", isReal: false },
      { label: "Inference Time per Slice", value: "TODO(me)", isReal: false },
    ],
    gallery: [
      {
        id: "tumor-1",
        src: "/projects/brain-tumor-model/hero.jpg",
        caption: "Multi-sequence brain MRI viewer with segmented tumor boundaries.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/BrainTumorModel",
    seoTitle: "Brain Tumor Segmentation — Medical AI | Hamza Ramzan",
    seoDescription:
      "Medical deep learning project using YOLO region proposals and SAM2 foundation models for brain MRI segmentation.",
  },
  {
    slug: "ironlog",
    aliases: ["ironlog-app"],
    number: "03",
    title: "IronLog Gym Tracker",
    category: "Mobile Application",
    shortDescription:
      "A 100% offline mobile workout tracking app built with React Native and SQLite, featuring a 400+ exercise library, custom routine builder, and local progress history.",
    image: "/projects/ironlog-app/hero.jpg",
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
      "Completely offline and private: zero accounts, zero cloud dependencies, encrypted local SQLite.",
    ],
    results: [
      { label: "Exercise Library", value: "400+ Exercises", isReal: true },
      { label: "Relational Tables", value: "9 Local SQLite Tables", isReal: true },
      { label: "Cloud Dependencies", value: "0% (100% Offline)", isReal: true },
      { label: "App Startup Time", value: "TODO(me)", isReal: false },
    ],
    gallery: [
      {
        id: "ironlog-1",
        src: "/projects/ironlog-app/hero.jpg",
        caption: "Dark-mode session logger with set tracking and historical volume trends.",
      },
    ],
    githubUrl: "https://github.com/Agent47c/IronLogApp",
    seoTitle: "IronLog Gym Tracker — Offline Mobile App | Hamza Ramzan",
    seoDescription:
      "An offline-first mobile strength training log built with React Native and SQLite, featuring custom plans and a 400+ exercise library.",
  },
  {
    slug: "farm-camera-overview",
    aliases: ["farm-camera-video-analytics"],
    number: "04",
    title: "Farm Camera Daily Overview",
    category: "Edge AI & Video Analytics",
    shortDescription:
      "A self-hosted desktop pipeline that downloads Tapo C200 camera recordings over the local network, detects people and livestock with YOLO, and generates an interactive daily HTML summary.",
    image: "/projects/farm-camera-overview/hero.jpg",
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
      { label: "Scrubbing Time Saved", value: "TODO(me)", isReal: false },
      { label: "Average Daily Incidents", value: "TODO(me)", isReal: false },
    ],
    gallery: [
      {
        id: "farm-1",
        src: "/projects/farm-camera-overview/hero.jpg",
        caption: "Daily surveillance analytics dashboard showing detection timeline and incident clips.",
      },
    ],
    statusNote: "Local Desktop Application (Planned GitHub Upload)",
    seoTitle: "Farm Camera Daily Overview — Edge AI Project | Hamza Ramzan",
    seoDescription:
      "Self-hosted edge surveillance tool for Tapo C200 cameras using Python, YOLOv8, and FFmpeg for automated daily event summaries.",
  },
  {
    slug: "smart-app-backup",
    aliases: ["windows-backup-tool"],
    number: "05",
    title: "Windows Smart Application Backup Tool",
    category: "Desktop Utility & Automation",
    shortDescription:
      "A clean-architecture Windows utility for backing up and restoring app-specific configurations, user data, and registry settings without cloning entire drives.",
    image: "/projects/smart-app-backup/hero.jpg",
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
      { label: "Setup Time Saved", value: "TODO(me)", isReal: false },
      { label: "Compressed Archive Ratio", value: "TODO(me)", isReal: false },
    ],
    gallery: [
      {
        id: "backup-1",
        src: "/projects/smart-app-backup/hero.jpg",
        caption: "Application profile selector and automated registry backup console.",
      },
    ],
    statusNote: "Local Desktop Application (Planned GitHub Upload)",
    seoTitle: "Windows Smart Application Backup Tool | Hamza Ramzan",
    seoDescription:
      "A Windows desktop utility built with Python and winreg for backing up application configurations and registry keys.",
  },
  {
    slug: "house-price-prediction",
    aliases: ["real-estate-valuation"],
    number: "06",
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
      { label: "R² Score", value: "TODO(me)", isReal: false },
      { label: "RMSE on Validation", value: "TODO(me)", isReal: false },
      { label: "Top Price Driver", value: "TODO(me)", isReal: false },
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
];

// Helper to look up project by primary slug or alias
export const findProjectBySlug = (slug?: string): ProjectData | undefined => {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug === slug || (p.aliases && p.aliases.includes(slug)));
};
