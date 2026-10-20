export interface ProjectData {
  slug: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  alt: string;
  technologies: string[];
  overview: string;
  problem: string;
  howItWorks: string;
  pipeline?: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  statusNote?: string;
  seoTitle: string;
  seoDescription: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "ppe-safety-monitor",
    number: "01",
    title: "PPE Safety Monitor",
    category: "Computer Vision & Workplace Safety",
    shortDescription:
      "A real-time workplace safety system that uses YOLOv11 and StrongSORT to detect whether workers are wearing required safety gear, with automatic email alerts and violation tracking.",
    image: "/projects/ppe-safety-monitor/hero.jpg",
    alt: "Computer vision surveillance interface showing worker PPE detection with bounding boxes and telemetry",
    technologies: ["Python", "YOLOv11", "StrongSORT", "PyQt5", "OpenCV", "CUDA", "Supabase", "Docker"],
    overview:
      "Workplace accidents often occur because safety protocols are hard to monitor manually across busy job sites. I built this application to automatically detect personal protective equipment (PPE) like hardhats, high-visibility vests, gloves, and boots from live camera feeds.",
    problem:
      "On active construction sites and industrial facilities, supervisors cannot watch dozens of camera feeds simultaneously. When people move around, step behind equipment, or work in crowds, basic object detectors frequently lose track of who is who, leading to false violation alarms.",
    howItWorks:
      "The system takes video streams from webcams, RTSP IP cameras, or pre-recorded video files. It runs a fine-tuned YOLOv11 model to detect people and safety gear, then uses StrongSORT to assign a persistent ID to each person across frames. When a safety violation is confirmed, it logs the incident to Supabase and sends an automated HTML email with photos of the violation.",
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
    githubUrl: "https://github.com/Agent47c/PPE-Detection-System",
    demoUrl: "https://youtu.be/AlRjiE3LIQQ",
    seoTitle: "PPE Safety Monitor — Computer Vision Project | Hamza Ramzan",
    seoDescription:
      "A real-time workplace safety system using YOLOv11 and StrongSORT to detect PPE compliance with automated email alerts.",
  },
  {
    slug: "brain-tumor-model",
    number: "02",
    title: "Brain Tumor Segmentation",
    category: "Medical AI & Deep Learning",
    shortDescription:
      "A deep learning segmentation pipeline using YOLO for region proposal coupled with SAM2 foundation models to accurately outline tumor boundaries in MRI scans.",
    image: "/projects/brain-tumor-model/hero.jpg",
    alt: "Medical AI imaging viewer showing brain MRI scan with tumor segmentation masks",
    technologies: ["Python", "PyTorch", "SAM2", "MedSAM-2", "YOLO", "OpenCV", "NumPy"],
    overview:
      "Segmenting brain tumors from MRI scans by hand is time-consuming and varies between doctors. This project investigates using modern foundation segmentation models to assist with precise anatomical boundary delineation.",
    problem:
      "MRI scans contain subtle contrast differences across different scan sequences (T1, T2, FLAIR). Traditional segmentation models often require large, bespoke labeled datasets and struggle when applied to new scan protocols without extensive retraining.",
    howItWorks:
      "Instead of training an entire segmentation network from scratch, this system uses a hybrid approach. A lightweight YOLO detector first finds the general region of interest on the scan slice. That bounding box is then fed as a spatial prompt to SAM2 and MedSAM-2, which delineate the precise tumor boundary.",
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
    githubUrl: "https://github.com/Agent47c/BrainTumorModel",
    seoTitle: "Brain Tumor Segmentation — Medical AI | Hamza Ramzan",
    seoDescription:
      "Medical deep learning project using YOLO region proposals and SAM2 foundation models for brain MRI segmentation.",
  },
  {
    slug: "ironlog-app",
    number: "03",
    title: "IronLog Gym Tracker",
    category: "Mobile Application",
    shortDescription:
      "A 100% offline mobile workout tracking app built with React Native and SQLite, featuring a 400+ exercise library, custom routine builder, and local progress history.",
    image: "/projects/ironlog-app/hero.jpg",
    alt: "IronLog dark-mode strength training mobile app showing workout log and progress analytics",
    technologies: ["React Native", "Expo", "SQLite", "JavaScript", "React Navigation"],
    overview:
      "Most fitness apps require an account, push subscriptions, and fail when you lose cell signal in a gym basement. I built IronLog as a fast, private, offline-first workout logger designed specifically for strength training.",
    problem:
      "When training, you need to quickly record weights and reps between sets without waiting for network spinners, dealing with cloud sync errors, or navigating through social feed bloat.",
    howItWorks:
      "IronLog runs entirely on-device with zero login required. It uses an embedded SQLite database with 9 relational tables to store exercises, custom workout templates, active sessions, and personal records. Data stays on your phone and updates instantaneously.",
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
    githubUrl: "https://github.com/Agent47c/IronLogApp",
    seoTitle: "IronLog Gym Tracker — Offline Mobile App | Hamza Ramzan",
    seoDescription:
      "An offline-first mobile strength training log built with React Native and SQLite, featuring custom plans and a 400+ exercise library.",
  },
  {
    slug: "farm-camera-overview",
    number: "04",
    title: "Farm Camera Daily Overview",
    category: "Edge AI & Video Analytics",
    shortDescription:
      "A self-hosted desktop pipeline that downloads Tapo C200 camera recordings over the local network, detects people and livestock with YOLO, and generates an interactive daily HTML summary.",
    image: "/projects/farm-camera-overview/hero.jpg",
    alt: "Farm acreage surveillance feed with motion tracking overlays, Tapo C200 telemetry, and daily timeline",
    technologies: ["Python", "YOLOv8", "PyTapo", "FFmpeg", "CustomTkinter", "Windows Task Scheduler"],
    overview:
      "Reviewing 24 hours of farm surveillance video manually is impractical. I built this tool to automatically pull footage from local TP-Link Tapo C200 cameras, detect important activity, and summarize the day into an easy-to-read report.",
    problem:
      "Commercial camera cloud subscriptions are costly and store sensitive video remotely. Without a summary tool, farm owners have to manually scrub through hours of motionless footage to see when animals moved or someone arrived.",
    howItWorks:
      "The tool connects to Tapo C200 cameras over local Wi-Fi via PyTapo, downloading recorded video chunks directly from the SD card. It processes frames using YOLOv8 to identify people, vehicles, and livestock, groups continuous detections into distinct events, and outputs a self-contained daily HTML summary report.",
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
    statusNote: "Local Desktop Application (Planned GitHub Upload)",
    seoTitle: "Farm Camera Daily Overview — Edge AI Project | Hamza Ramzan",
    seoDescription:
      "Self-hosted edge surveillance tool for Tapo C200 cameras using Python, YOLOv8, and FFmpeg for automated daily event summaries.",
  },
  {
    slug: "smart-app-backup",
    number: "05",
    title: "Windows Smart Application Backup Tool",
    category: "Desktop Utility & Automation",
    shortDescription:
      "A clean-architecture Windows utility for backing up and restoring app-specific configurations, user data, and registry settings without cloning entire drives.",
    image: "/projects/smart-app-backup/hero.jpg",
    alt: "Windows backup utility dashboard showing registry targets, application profiles, and automation logs",
    technologies: ["Python", "Tkinter", "Windows Registry (winreg)", "JSON Profiles"],
    overview:
      "Setting up a new development workstation or restoring customized software after a fresh Windows install usually takes hours of reconfiguring settings. I built this utility to backup exactly the configurations and registry keys you need.",
    problem:
      "Whole-disk imaging tools create massive multi-gigabyte backup files that copy junk and temp files. Meanwhile, manually hunting down AppData folders and registry entries across `HKCU` and `HKLM` is tedious and error-prone.",
    howItWorks:
      "The application uses modular JSON profiles to define where specific programs store their configs (such as `%APPDATA%`, `%LOCALAPPDATA%`, and registry paths). It safely exports registry keys using Python's `winreg` library, archives the relevant folders, and generates a manifest file so everything can be restored with a single click.",
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
    statusNote: "Local Desktop Application (Planned GitHub Upload)",
    seoTitle: "Windows Smart Application Backup Tool | Hamza Ramzan",
    seoDescription:
      "A Windows desktop utility built with Python and winreg for backing up application configurations and registry keys.",
  },
  {
    slug: "house-price-prediction",
    number: "06",
    title: "House Price Prediction Model",
    category: "Machine Learning & Analytics",
    shortDescription:
      "A supervised machine learning regression model predicting real estate prices based on locality, square footage, amenities, and market trends.",
    image: "/projects/house-price-prediction/hero.jpg",
    alt: "Real estate valuation machine learning dashboard showing regression curves and feature charts",
    technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    overview:
      "Real estate pricing depends on numerous interrelated factors such as location, usable area, room count, and neighborhood amenities. This project walks through the complete data science pipeline from raw housing data to predictive model evaluation.",
    problem:
      "Raw real estate datasets typically contain missing values, extreme price outliers, and skewed distributions that cause basic linear models to produce unreliable valuations.",
    howItWorks:
      "I cleaned and explored the dataset using Pandas and Seaborn, applied log transformations to normalize skewed price attributes, and handled categorical location features. Multiple regression algorithms (Linear Regression, Ridge, Decision Trees, and Random Forest) were trained and compared using cross-validation.",
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
    githubUrl: "https://github.com/Agent47c/House_Price_Prediction_Indian",
    seoTitle: "House Price Prediction Model — Machine Learning | Hamza Ramzan",
    seoDescription:
      "A supervised machine learning regression project using scikit-learn, Pandas, and Python for real estate price valuation.",
  },
];
