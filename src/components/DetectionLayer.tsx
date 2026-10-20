import { useEffect, useRef } from "react";
import { getMotionPreference } from "../utils/motion";

interface DetectionBox {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  label: string;
  confidence: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const LABELS = [
  "person 0.94",
  "hardhat 0.98",
  "vest 0.96",
  "tumor_roi 0.99",
  "agri_cattle 0.95",
  "tapo_feed 0.97",
];

export const DetectionLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disabled on small screens or when reduced motion is preferred
    if (window.innerWidth < 768 || !getMotionPreference()) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    window.addEventListener("resize", handleResize);

    const boxes: DetectionBox[] = [];
    let nextId = 0;

    const spawnBox = (): DetectionBox => {
      const boxWidth = Math.floor(80 + Math.random() * 90);
      const boxHeight = Math.floor(60 + Math.random() * 80);
      const labelText = LABELS[Math.floor(Math.random() * LABELS.length)];

      return {
        id: nextId++,
        x: Math.floor(30 + Math.random() * Math.max(100, width - boxWidth - 60)),
        y: Math.floor(20 + Math.random() * Math.max(80, height - boxHeight - 40)),
        width: boxWidth,
        height: boxHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.3,
        label: labelText,
        confidence: 0.92 + Math.random() * 0.07,
        opacity: 0,
        life: 0,
        maxLife: 260 + Math.random() * 120, // ~4-6 seconds at 60fps
      };
    };

    // Keep max 2-3 boxes active
    boxes.push(spawnBox());

    let lastSpawn = 0;

    const loop = (time: number) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Periodically spawn new box if under limit
      if (boxes.length < 3 && time - lastSpawn > 1800) {
        boxes.push(spawnBox());
        lastSpawn = time;
      }

      for (let i = boxes.length - 1; i >= 0; i--) {
        const box = boxes[i];
        box.life++;

        // Smooth fade-in and fade-out
        const progress = box.life / box.maxLife;
        if (progress < 0.2) {
          box.opacity = (progress / 0.2) * 0.35;
        } else if (progress > 0.8) {
          box.opacity = ((1 - progress) / 0.2) * 0.35;
        } else {
          box.opacity = 0.35;
        }

        box.x += box.vx;
        box.y += box.vy;

        // Draw Bounding Box with hairline border
        ctx.strokeStyle = `rgba(232, 90, 32, ${box.opacity})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        // Corner tick marks
        const cornerLen = 6;
        ctx.strokeStyle = `rgba(232, 90, 32, ${box.opacity * 1.5})`;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(box.x, box.y + cornerLen);
        ctx.lineTo(box.x, box.y);
        ctx.lineTo(box.x + cornerLen, box.y);
        // Bottom-right
        ctx.moveTo(box.x + box.width - cornerLen, box.y + box.height);
        ctx.lineTo(box.x + box.width, box.y + box.height);
        ctx.lineTo(box.x + box.width, box.y + box.height - cornerLen);
        ctx.stroke();

        // Label Tag
        ctx.fillStyle = `rgba(11, 12, 13, ${box.opacity * 1.8})`;
        ctx.fillRect(box.x, box.y - 14, 82, 14);

        ctx.font = "9px 'JetBrains Mono', 'Fira Code', monospace";
        ctx.fillStyle = `rgba(242, 240, 234, ${box.opacity * 2.2})`;
        ctx.fillText(box.label, box.x + 4, box.y - 3);

        if (box.life >= box.maxLife) {
          boxes.splice(i, 1);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    // Pause when page is hidden or off-screen
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting && document.visibilityState === "visible";
    });

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-detection-canvas"
      aria-hidden="true"
    />
  );
};

export default DetectionLayer;
