# Project Media Directory

This directory stores project screenshots, diagrams, and hero media.

## Directory Structure

```text
public/
  projects/
    ppe-safety-monitor/
      hero.jpg
      screenshot-01.jpg (optional)
      architecture.jpg (optional)
    brain-tumor-model/
      hero.jpg
    ironlog-app/
      hero.jpg
    farm-camera-overview/
      hero.jpg
    smart-app-backup/
      hero.jpg
    house-price-prediction/
      hero.jpg
```

## How to Update or Add Images

1. Drop your new image file directly into the corresponding project folder (e.g. `public/projects/ppe-safety-monitor/hero.jpg` or `hero.webp`).
2. If using a new filename or adding extra screenshots, reference it in `src/data/projectsData.ts`:
   ```ts
   image: "/projects/ppe-safety-monitor/hero.jpg",
   ```
3. Vite will serve these static assets automatically without any rebuild configuration needed.
