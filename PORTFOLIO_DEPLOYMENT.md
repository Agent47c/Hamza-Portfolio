# 🚀 Hamza Ramzan — Portfolio Deployment & Architecture Guide

A production-ready personal portfolio website for **Hamza Ramzan**, Machine Learning & Software Engineer, built with **React 18**, **TypeScript**, **Three.js / React Three Fiber**, and **GSAP**.

---

## 📋 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Architecture & Project Structure](#-architecture--project-structure)
3. [Component Breakdown & Content Mapping](#-component-breakdown--content-mapping)
4. [Added Projects & Skills](#-added-projects--skills)
5. [Replacing Placeholder Images with Real Images](#-replacing-placeholder-images-with-real-images)
6. [Local Development & Building](#-local-development--building)
7. [Vercel Deployment Guide](#-vercel-deployment-guide)
8. [Alternative Hosting (Netlify / GitHub Pages)](#-alternative-hosting)
9. [Pre-Launch Checklist](#-pre-launch-checklist)

---

## 🔍 Executive Summary

This repository was transitioned from a template into an accurate portfolio showcasing Hamza Ramzan's professional qualifications, technical skills, and software engineering projects.

### Profile Highlights
- **Name**: Hamza Ramzan
- **Title**: Machine Learning / Software Engineer
- **Email**: `hamza.jani7433@gmail.com`
- **Location**: Bahawalpur, Pakistan
- **Education**: BS Software Engineering — The Islamia University of Bahawalpur (2026)
- **GitHub**: [github.com/Agent47c](https://github.com/Agent47c)
- **LinkedIn**: [linkedin.com/in/hamza-ramzan](https://www.linkedin.com/in/hamza-ramzan)
- **Resume**: Automatically served from `/resume/Hamza_Ramzan_CV.pdf`

---

## 🏗️ Architecture & Project Structure

```
Portfolio-Website/
├── index.html                   # HTML entry point (SEO metadata, title, OpenGraph tags)
├── package.json                 # Scripts, dependencies (React, Vite, Three.js, GSAP)
├── tsconfig.json                # TypeScript root configuration
├── vite.config.ts               # Vite bundler configuration
├── public/
│   ├── favicon.svg              # Site favicon
│   ├── resume/
│   │   └── Hamza_Ramzan_CV.pdf  # Direct PDF download of Hamza's CV
│   ├── images/                  # Tech stack & project showcase images
│   └── models/                  # 3D assets & HDR environments for Three.js
└── src/
    ├── main.tsx                 # React DOM mount point
    ├── App.tsx                  # Root component (LoadingProvider, Suspense wrappers)
    ├── index.css                # Global design system & theme CSS variables
    ├── components/
    │   ├── Landing.tsx          # Hero section with large typography & titles
    │   ├── Loading.tsx          # Initial loading animation & marquee banner
    │   ├── Navbar.tsx           # Fixed glassmorphism navigation & smooth scroll
    │   ├── About.tsx            # Professional background & education summary
    │   ├── WhatIDo.tsx          # Interactive ML/AI and Software Engineering skill cards
    │   ├── Career.tsx           # Chronological work history & timeline
    │   ├── Work.tsx             # Horizontal pinned scroll showcasing 6 core projects
    │   ├── WorkImage.tsx        # Project preview card with hover effects & GitHub link
    │   ├── TechStack.tsx        # 3D physics-based interactive sphere simulation
    │   ├── SocialIcons.tsx      # Magnetic hover social buttons & CV download
    │   ├── Contact.tsx          # Direct contact info, social links & copyright footer
    │   ├── Cursor.tsx           # Custom smooth interactive cursor
    │   └── Character/           # 3D model canvas & environment
```

---

## 🧩 Component Breakdown & Content Mapping

### 1. Hero & Header (`Landing.tsx`, `Navbar.tsx`, `Loading.tsx`)
- **Landing**: Displays "HAMZA RAMZAN" with rotating subtitles "ML Engineer" and "Developer".
- **Loading**: Interactive 0–100% loading sequence with marquee displaying "Machine Learning Engineer · Software Engineer".
- **Navbar**: Initials brand "HR", direct mailto connect link, and smooth scrolling to `#about`, `#work`, and `#contact`.

### 2. Professional Summary (`About.tsx`)
- Accurately details academic credentials from The Islamia University of Bahawalpur.
- Highlights practical ML experience: medical image segmentation (SAM2), real-time PPE detection (YOLOv11), NLP classifiers, and predictive analytics.
- Mentions system administration, dataset QA management, AI video generation with character consistency, and video editing.

### 3. Skills Matrix (`WhatIDo.tsx`)
- **ML / AI Engineering**: Python, TensorFlow, PyTorch, YOLOv8/v11, SAM2, OpenCV, scikit-learn, Pandas, Matplotlib, NLP.
- **Software Development**: JavaScript, TypeScript, React, React Native, Node.js, WordPress, Shopify, HTML/CSS, AI Video (Character Consistency), Video Editing (Intermediate).

### 4. Experience Timeline (`Career.tsx`)
- **Motion Spectrum** (Jan 2025 – Present) — *System Administrator*: Windows Server & client environments, Active Directory, GPOs, LAN/WAN infrastructure, security & automated backups.
- **Arch Technologies** (Jun 2025 – Sep 2025) — *ML Engineer Intern*: YOLO, SAM2, MedSAM-2, real-time PPE tracking with StrongSORT.
- **Certura** (Apr 2025 – Jun 2025) — *ML Intern*: Supervised learning algorithms, end-to-end ML pipelines from data preprocessing to model evaluation.
- **Data Nomad** (Jul 2024 – Dec 2024) — *QA Team Manager / Data Labeling QA*: Promoted within 2 months; audited multimodal datasets (video, image, audio, OCR) for enterprise AI training.

---

## 🚀 Added Projects & Skills

All 4 new projects plus 2 flagship machine learning projects are configured in `Work.tsx`:

| # | Project | Category | Key Tech Stack | Source Code Link |
|---|---|---|---|---|
| **01** | **PPE Safety Monitor** | Computer Vision | Python, YOLOv11, StrongSORT, PyQt5, Supabase | [GitHub](https://github.com/Agent47c/PPE-Detection-System) |
| **02** | **Brain Tumor Model** | Medical AI | Python, YOLO, SAM2, MedSAM-2, PyTorch | [GitHub](https://github.com/Agent47c/BrainTumorModel) |
| **03** | **Farm Camera Overview** | AI / IoT | Python, YOLOv8, Tkinter, RTSP, FFmpeg | *Coming to GitHub* |
| **04** | **IronLog Gym Tracker** | Mobile App | React Native, Expo, SQLite, JavaScript | [GitHub](https://github.com/Agent47c/IronLogApp) |
| **05** | **Smart App Backup** | Desktop Tool | Python, Tkinter, Windows Registry, JSON | *Coming to GitHub* |
| **06** | **House Price Prediction** | Machine Learning | Python, scikit-learn, Pandas, Regression | [GitHub](https://github.com/Agent47c/House_Price_Prediction_Indian) |

---

## 🖼️ Replacing Placeholder Images with Real Images

Per your instruction, **no AI images were generated**. To add your real project screenshots or demo recordings:

1. Place your screenshot files into:
   ```
   Portfolio-Website/public/images/
   ```
   *(e.g., `ppe-preview.png`, `farm-camera.png`, `ironlog.png`, `backup-tool.png`, `brain-tumor.png`)*

2. Open `src/components/Work.tsx` and update the `image` property in the `projects` array:
   ```typescript
   {
     name: "PPE Safety Monitor",
     category: "Computer Vision",
     tech: "Python, YOLOv11, StrongSORT, PyQt5, Supabase",
     image: "/images/ppe-preview.png", // <-- Replace here
     github: "https://github.com/Agent47c/PPE-Detection-System",
   },
   ```

3. *(Optional)* If you have short video previews (e.g. mp4/webm), place them in `src/assets/` and add `video="my-clip.mp4"` to `WorkImage` for animated hover previews.

---

## 💻 Local Development & Building

### Prerequisites
- Node.js 18+ installed

### Development Server
```bash
cd Portfolio-Website
npm run dev
```
Navigate to `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Build output is saved to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## ☁️ Vercel Deployment Guide

The website is already optimized for Vercel deployment:
- `@vercel/analytics` is installed.
- Single-page Vite build with clean output directory.

### Step 1: Push Repository to GitHub
Ensure all changes are committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "Update portfolio for Hamza Ramzan with new projects and CV details"
git push origin main
```

### Step 2: Import into Vercel
1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Select your repository `Portfolio-Website`.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

---

## 🌐 Alternative Hosting

### Netlify
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. In `vite.config.ts`, set `base: '/<repo-name>/'`
3. Run `npm run build` and deploy.

---

## ✅ Pre-Launch Checklist

- [x] SEO title and meta descriptions updated for Hamza Ramzan
- [x] CV PDF available at `/resume/Hamza_Ramzan_CV.pdf`
- [x] Hero section displays Hamza Ramzan and ML/Software titles
- [x] About section reflects education, ML expertise, and technical background
- [x] Added 4 new projects (PPE Safety Monitor, Farm Camera, IronLog, Backup Tool)
- [x] Added AI Video Generation (Character Consistency) & Video Editing skills
- [x] Career experience updated with Motion Spectrum, Arch Technologies, Certura, and Data Nomad
- [x] Social links set to GitHub (`Agent47c`) and LinkedIn
- [x] Contact email set to `hamza.jani7433@gmail.com`
- [x] Zero build errors on `npm run build`
- [ ] Drop in your real project screenshots into `/public/images/` whenever ready!
