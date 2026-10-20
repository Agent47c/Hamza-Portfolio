# Hamza Ramzan — Personal Portfolio Website

> **Role**: Machine Learning & Software Engineer  
> **Location**: Bahawalpur, Pakistan  
> **Education**: BS Software Engineering, The Islamia University of Bahawalpur (2026)  
> **Core Focus**: Computer Vision, Deep Learning, and Practical Software Systems  

---

## 1. Overview & Architecture

This is the personal portfolio of **Hamza Ramzan**. It is designed as a living, premium personal website built around:
- **Dark foundation + warm stone surfaces + industrial orange accent**
- **Natural, direct human copy** that explains actual projects without corporate AI buzzwords
- **Curated Homepage (`/`)**: A fast, scannable index featuring a personal introduction, an art-directed project showcase, an honest approach section, real skills, work experience, and direct contact channels.
- **Dedicated Project Detail Pages (`/projects/:slug`)**: In-depth project case studies with problem statements, architecture flows, real capabilities, and GitHub source code links.
- **Smooth Motion**: Native Lenis smooth scrolling integrated with GSAP ScrollTrigger, respecting `prefers-reduced-motion`.
- **Routing**: Single-page client-side routing via React Router DOM with full Vercel SPA rewrite support (`vercel.json`).

---

## 2. Color System & Styling

The visual identity creates rhythm by pairing dark foundation materials with warm stone surfaces and a distinctive orange accent:

| Token | Hex / Value | Usage & Meaning |
| :--- | :--- | :--- |
| **`--c-bg`** | `#0e0f12` | Dark foundation background (deep charcoal obsidian) |
| **`--c-stone-bg`** | `#f5f2eb` | Warm stone canvas for the Selected Projects section |
| **`--c-stone-surface`** | `#ffffff` | Elevated project tile surface on stone canvas |
| **`--c-stone-border`** | `#dcd5c9` | Architectural border lines on stone canvas |
| **`--c-stone-text`** | `#191816` | High-contrast dark charcoal text on stone |
| **`--c-stone-text-secondary`** | `#5e5951` | Muted descriptions on stone canvas |
| **`--c-accent`** | **`#f05a18`** | **Signature industrial orange accent** (highlighter precision for badges, active states, key CTAs, and markers) |
| **`--c-accent-hover`** | `#ff6826` | Hover state for interactive orange elements |
| **`--c-border`** | `#262a32` | Structural borders on dark surfaces |
| **`--c-text-primary`** | `#f4f2ee` | Warm off-white text on dark backgrounds |
| **`--c-text-secondary`** | `#a3a099` | Muted stone text on dark backgrounds |

- **No Artificial Glow**: Zero neon orange, zero rainbow gradients, zero glowing AI brains or particle grids.
- **Architectural Corners**: Clean 2px border radius across cards and buttons.
- **Tactile Grain**: Subtle SVG fractal noise (`opacity: 0.018`) on `body::after` for physical paper-like texture.

---

## 3. Typography System

- **Headings & Display**: `Space Grotesk` (Google Fonts, weights: 500, 600, 700)
  - Letter-spacing: `-0.02em` to `-0.035em`
  - Used for: Brand monogram, hero titles, section headings, project names, technical labels
- **Body & Prose**: `DM Sans` (Google Fonts, weights: 400, 500)
  - Line-height: `1.6` to `1.7`
  - Used for: Overview copy, problem explanations, timeline descriptions, features
- **Scale**:
  - Hero Headline: `clamp(3.2rem, 9vw, 8.5rem)`
  - Section Titles: `clamp(2rem, 3.8vw, 3.2rem)`
  - Project Titles: `clamp(1.45rem, 2.5vw, 2.4rem)`
  - Body Text: `1rem` (`16px`) / `1.125rem` (`18px`)

---

## 4. Complete Text & Content Audit

### 4.1 Header & Navigation
- **Brand Monogram**: `HAMZA RAMZAN`
- **Status Indicator**: `• Available for engineering roles`
- **Navigation Items**:
  - `Projects` (scrolls to `#projects`)
  - `About` (scrolls to `#about`)
  - `Skills` (scrolls to `#skills`)
  - `Experience` (scrolls to `#experience`)
  - `Contact` (scrolls to `#contact`)
- **Action**: `Resume` (opens `/resume/Hamza_Ramzan_CV.pdf`)

---

### 4.2 Hero Section
- **Eyebrow**: `Hi, I'm`
- **Headline**: `HAMZA RAMZAN`
- **Roles**: `Machine Learning & Software Engineer • Bahawalpur, Pakistan`
- **Statement**:
  > "I build practical machine learning systems and software, with a focus on computer vision, deep learning pipelines, and clean applications that solve real-world problems."
- **CTAs**:
  - `Explore My Work` (scrolls to `#projects`)
  - `View Resume` (opens PDF)
  - `GitHub` (`https://github.com/Agent47c`)
  - `LinkedIn` (`https://www.linkedin.com/in/hamza-ramzan`)
- **Quick Specs**:
  - Core Focus: `Computer Vision & Deep Learning`
  - Current Role: `System Administrator @ Motion Spectrum`
  - Education: `BS Software Engineering (IUB, 2026)`
  - Primary Stack: `Python • PyTorch • React • SQLite`

---

### 4.3 Selected Projects (Homepage Showcase)
- **Section Label**: `Selected Work`
- **Section Title**: `Things I've Built`
- **Section Lead**: `A selection of projects in computer vision, deep learning, mobile development, and system automation. Click any project to see the architecture, features, and source code.`

#### Project Tiles:
1. **PPE Safety Monitor** (`/projects/ppe-safety-monitor`)
   - Category: `Computer Vision & Workplace Safety`
   - Description: *"A real-time workplace safety system that uses YOLOv11 and StrongSORT to detect whether workers are wearing required safety gear, with automatic email alerts and violation tracking."*
   - Tech: `Python • YOLOv11 • StrongSORT • PyQt5 • OpenCV`
   - GitHub: `https://github.com/Agent47c/PPE-Detection-System`
   - Video Demo: `https://youtu.be/AlRjiE3LIQQ`

2. **Brain Tumor Segmentation** (`/projects/brain-tumor-model`)
   - Category: `Medical AI & Deep Learning`
   - Description: *"A deep learning segmentation pipeline using YOLO for region proposal coupled with SAM2 foundation models to accurately outline tumor boundaries in MRI scans."*
   - Tech: `Python • PyTorch • SAM2 • MedSAM-2`
   - GitHub: `https://github.com/Agent47c/BrainTumorModel`

3. **IronLog Gym Tracker** (`/projects/ironlog-app`)
   - Category: `Mobile Application`
   - Description: *"A 100% offline mobile workout tracking app built with React Native and SQLite, featuring a 400+ exercise library, custom routine builder, and local progress history."*
   - Tech: `React Native • Expo • SQLite • JavaScript`
   - GitHub: `https://github.com/Agent47c/IronLogApp`

4. **Farm Camera Daily Overview** (`/projects/farm-camera-overview`)
   - Category: `Edge AI & Video Analytics`
   - Description: *"A self-hosted desktop pipeline that downloads Tapo C200 camera recordings over the local network, detects people and livestock with YOLO, and generates an interactive daily HTML summary."*
   - Tech: `Python • YOLOv8 • PyTapo • FFmpeg`
   - Status: Local Desktop Application (Planned GitHub Upload)

5. **Windows Smart Application Backup Tool** (`/projects/smart-app-backup`)
   - Category: `Desktop Utility & Automation`
   - Description: *"A clean-architecture Windows utility for backing up and restoring app-specific configurations, user data, and registry settings without cloning entire drives."*
   - Tech: `Python • Tkinter • Windows Registry (winreg) • JSON Profiles`
   - Status: Local Desktop Application (Planned GitHub Upload)

6. **House Price Prediction Model** (`/projects/house-price-prediction`)
   - Category: `Machine Learning & Analytics`
   - Description: *"A supervised machine learning regression model predicting real estate prices based on locality, square footage, amenities, and market trends."*
   - Tech: `Python • scikit-learn • Pandas • NumPy • Matplotlib`
   - GitHub: `https://github.com/Agent47c/House_Price_Prediction_Indian`

---

### 4.4 Detailed Project Case Studies (`/projects/:slug`)

Each project route provides a structured, human-readable breakdown:
- **What It Is (Overview)**: Direct explanation of what the application does and why it exists.
- **Why I Built It (The Problem)**: The real limitation or issue being solved.
- **How It Works (Architecture)**: Simple explanation of the dataflow and components.
- **Pipeline Diagram**: Clear, step-by-step visual representation of the stages.
- **Key Features**: Bullet list of concrete capabilities.
- **Source Code & Demo**: Direct link to the public GitHub repository or clear status note.
- **Navigation**: Clean previous and next project pagination.

---

### 4.5 About & Approach Section
- **Section Label**: `About Me`
- **Section Title**: `How I Approach My Work`
- **Lead**: `I'm a software engineering student at The Islamia University of Bahawalpur who spends most of his time building real projects in computer vision, deep learning, and software. Here is what I care about when I build:`
- **Pillar 01 (DATA)**: `Good Data Comes First`  
  *"Working as a QA Team Manager auditing training datasets taught me that clean, consistent labels matter more than tuning hyperparameters for weeks. Before fine-tuning models, I make sure the data is solid, the bounding boxes are accurate, and the edge cases are understood. If the annotations are bad, the model will fail in production."*
- **Pillar 02 (REALITY)**: `Built to Run on Real Hardware`  
  *"A model running in a Jupyter Notebook is only the starting point. What matters is how it performs when hooked up to actual camera streams or installed on an offline phone. Whether it's getting YOLO to run smoothly with multi-object tracking or packaging a mobile app with embedded SQLite, I design for realistic compute limits and responsive everyday use."*
- **Pillar 03 (SYSTEMS)**: `Software Around the Model`  
  *"Machine learning models don't live in a vacuum. With experience in Windows Server administration, Active Directory, and freelance web development, I treat models as part of a complete system. That means writing clean user interfaces, setting up automated backups, handling disconnections gracefully, and making sure someone can actually use what was built."*
- **Closing Note**: *"Build things that actually work, keep the architecture straightforward, and write code that is easy to maintain."*

---

### 4.6 Skills & Tools Section
- **Section Label**: `Toolkit`
- **Section Title**: `Skills & Technologies`
- **Lead**: `Tools and technologies I use regularly across machine learning, software development, and systems administration.`

1. **Machine Learning & Computer Vision** (Core Focus):
   - Description: *Building real-time object tracking, medical segmentation, and predictive regression models.*
   - Tools: `Python`, `PyTorch`, `TensorFlow`, `YOLOv8 / YOLOv11`, `SAM2 / MedSAM-2`, `StrongSORT`, `OpenCV`, `scikit-learn`, `CUDA`, `Pandas`, `NumPy`
2. **Software & Web Development**:
   - Description: *Building responsive web applications, offline-first mobile apps, and practical desktop utilities.*
   - Tools: `JavaScript (ES6+)`, `TypeScript`, `React.js`, `React Native`, `Expo`, `SQLite`, `Node.js`, `REST APIs`, `Vite`, `HTML5 / CSS3`
3. **Systems & Infrastructure**:
   - Description: *Administering corporate server environments, Active Directory networks, and assembling custom workstations.*
   - Tools: `Windows Server (2019/2022)`, `Active Directory & GPO`, `LAN / WAN Networking`, `Hardware Assembly & BIOS Tuning`, `Docker`, `PowerShell`, `Git & GitHub`
4. **Data QA & Creative Media**:
   - Description: *Managing annotation quality assurance workflows, dataset auditing, and AI video workflows.*
   - Tools: `Label Studio & CVAT`, `Dataset QA & Auditing`, `AI Video Generation (Character Consistency)`, `Intermediate Video Editing`, `ComfyUI / Stable Diffusion`

---

### 4.7 Work Experience Section
- **Section Label**: `Career`
- **Section Title**: `Work Experience`
- **Lead**: `Where I have worked and what I was responsible for across machine learning, systems administration, and data quality.`

1. **System Administrator** — `Motion Spectrum • Lahore, Pakistan (Hybrid)` (Jan 2025 – Present) [CURRENT]
   - *Administer Windows Server environments, Active Directory, GPOs, and corporate LAN/WAN infrastructure.*
   - *Assemble, configure, and maintain high-performance workstations for specialized workloads.*
   - *Manage automated scheduled backup routines and system recovery procedures.*
2. **Machine Learning Engineer Intern** — `Arch Technologies • Islamabad, Pakistan (Remote)` (Jun 2025 – Sep 2025)
   - *Built real-time computer vision tracking pipelines using YOLOv11 and StrongSORT.*
   - *Fine-tuned SAM2 and MedSAM-2 foundation segmentation models for medical imaging.*
   - *Developed predictive machine learning models with GPU-accelerated inference using CUDA and PyTorch.*
3. **Machine Learning Intern** — `Certura • Islamabad, Pakistan (Remote)` (Apr 2025 – Jun 2025)
   - *Implemented supervised ML models including Random Forest, Naive Bayes, Decision Trees, and Linear Regression.*
   - *Cleaned structured datasets through feature selection, outlier detection, scaling, and categorical encoding.*
   - *Evaluated model performance using precision, recall, F1-score, ROC-AUC, and RMSE.*
4. **QA Team Manager** — `Data Nomad • Islamabad, Pakistan (Remote)` (Jul 2024 – Dec 2024)
   - *Promoted to QA Team Manager within 2 months of joining.*
   - *Led a cross-functional QA team auditing multi-modal datasets (video, bounding boxes, OCR, audio) to maintain 98%+ precision.*
   - *Standardized annotation guidelines and trained specialists to improve dataset consistency.*
5. **Data Labeling Specialist** — `Data Nomad • Islamabad, Pakistan (Remote)` (Feb 2024 – Jul 2024)
   - *Performed high-precision polygon and bounding box annotation on thousands of computer vision frames.*
   - *Used Label Studio and CVAT for autonomous driving, retail, and security datasets.*
6. **Freelance Web Developer** — `Freelance / Client Projects • Remote` (Feb 2016 – Present)
   - *Built and customized e-commerce stores on Shopify and sites on WordPress using HTML, CSS, JavaScript, and Liquid.*
   - *Focused on clean mobile responsiveness, speed optimization, and SEO.*
7. **Education**:
   - `Bachelor of Science in Software Engineering (BSSE)`
   - *The Islamia University of Bahawalpur, Pakistan • Expected Graduation: 2026*

---

### 4.8 Contact Section
- **Section Label**: `Contact`
- **Headline**: `Let's Talk.`
- **Subtext**: *"I am open to full-time roles in machine learning, computer vision, and software engineering. If you have a question about one of my projects or want to discuss an opportunity, send me an email."*
- **Email**: `hamza.jani7433@gmail.com` (with one-click clipboard copy status feedback)
- **Phone & Location**: `+92 3465288405` • Bahawalpur, Pakistan (PKT / UTC+5)
- **Direct Links**:
  - GitHub: [https://github.com/Agent47c](https://github.com/Agent47c)
  - LinkedIn: [https://www.linkedin.com/in/hamza-ramzan](https://www.linkedin.com/in/hamza-ramzan)
  - Resume PDF: `/resume/Hamza_Ramzan_CV.pdf`
- **Footer**: `© 2026 Hamza Ramzan. Built with React, TypeScript, and Lenis. Bahawalpur, Pakistan.`

---

## 5. Technology Stack & Packages

- **Frontend**: React 18.3.1, TypeScript 5.5.3, Vite 5.4.21
- **Router**: React Router DOM 7.9.4
- **Smooth Scroll**: Lenis 1.3.27
- **Animation**: GSAP 3.15.0 & ScrollTrigger
- **Analytics**: `@vercel/analytics` 1.4.1

---

## 6. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (TypeScript + Vite bundler)
npm run build

# 4. Preview production build locally
npm run preview
```
