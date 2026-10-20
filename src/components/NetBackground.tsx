import { useEffect, useRef } from "react";
import { getMotionPreference } from "../utils/motion";
import "./styles/NetBackground.css";

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isAccent: boolean;
}

interface ClickPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const NetBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number | null = null;
    let isRunning = false;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let nodes: NetNode[] = [];
    const pulses: ClickPulse[] = [];

    // Density scaled appropriately for screen width
    const getNodeCount = (w: number) => {
      if (w < 640) return 24;
      if (w < 1024) return 38;
      return 56;
    };

    const getMaxDist = (w: number) => {
      if (w < 640) return 100;
      if (w < 1024) return 125;
      return 150;
    };

    const initNodes = (w: number, h: number) => {
      const count = getNodeCount(w);
      const newNodes: NetNode[] = [];

      for (let i = 0; i < count; i++) {
        // ~18% accent nodes (orange), others slate
        const isAccent = Math.random() < 0.18;
        newNodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: isAccent ? 2.0 : 1.35,
          isAccent,
        });
      }
      return newNodes;
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        nodes = initNodes(width, height);
      } else {
        const targetCount = getNodeCount(width);
        if (Math.abs(nodes.length - targetCount) > 8) {
          nodes = initNodes(width, height);
        } else {
          nodes.forEach((n) => {
            n.x = Math.min(n.x, width);
            n.y = Math.min(n.y, height);
          });
        }
      }
    };

    resizeCanvas();

    // Mouse tracking anywhere on the viewport
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handlePointerDown = (e: MouseEvent) => {
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.9,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Render step
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDist = getMaxDist(width);
      const mouseMaxDist = 165;
      const len = nodes.length;

      // 1. Move nodes
      for (let i = 0; i < len; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce at viewport boundaries
        if (n.x <= 0) {
          n.x = 0;
          n.vx = Math.abs(n.vx);
        } else if (n.x >= width) {
          n.x = width;
          n.vx = -Math.abs(n.vx);
        }

        if (n.y <= 0) {
          n.y = 0;
          n.vy = Math.abs(n.vy);
        } else if (n.y >= height) {
          n.y = height;
          n.vy = -Math.abs(n.vy);
        }
      }

      // 2. Triangular geometric mesh facets (Vanta NET look)
      const triangleDist = maxDist * 0.72;
      for (let i = 0; i < len; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < len; j++) {
          const nj = nodes[j];
          const dx1 = ni.x - nj.x;
          const dy1 = ni.y - nj.y;
          const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
          if (d1 > triangleDist) continue;

          for (let k = j + 1; k < len; k++) {
            const nk = nodes[k];
            const dx2 = nj.x - nk.x;
            const dy2 = nj.y - nk.y;
            const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (d2 > triangleDist) continue;

            const dx3 = ni.x - nk.x;
            const dy3 = ni.y - nk.y;
            const d3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
            if (d3 < triangleDist) {
              const triAlpha = (1 - (d1 + d2 + d3) / (triangleDist * 3)) * 0.038;
              ctx.beginPath();
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
              ctx.lineTo(nk.x, nk.y);
              ctx.closePath();
              ctx.fillStyle =
                ni.isAccent || nj.isAccent || nk.isAccent
                  ? `rgba(232, 90, 32, ${triAlpha * 1.6})`
                  : `rgba(180, 189, 204, ${triAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      // 3. Draw inter-node connection lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < len; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < len; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);

            if (ni.isAccent || nj.isAccent) {
              ctx.strokeStyle = `rgba(232, 90, 32, ${alpha * 1.4})`;
            } else {
              ctx.strokeStyle = `rgba(180, 189, 204, ${alpha})`;
            }
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor
        if (mouse.active) {
          const mdx = ni.x - mouse.x;
          const mdy = ni.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseMaxDist) {
            const mAlpha = (1 - mdist / mouseMaxDist) * 0.38;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(232, 90, 32, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.lineWidth = 0.8;
          }
        }
      }

      // 3.5 Draw interactive click ripples and dynamic connecting lines
      if (pulses.length > 0) {
        for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
          const p = pulses[pIdx];
          p.radius += 5.5;
          p.alpha *= 0.955;

          if (p.alpha < 0.02 || p.radius >= p.maxRadius) {
            pulses.splice(pIdx, 1);
            continue;
          }

          // Soft expanding glow ring
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(232, 90, 32, ${p.alpha * 0.12})`);
          grad.addColorStop(0.5, `rgba(232, 90, 32, ${p.alpha * 0.04})`);
          grad.addColorStop(1, "rgba(232, 90, 32, 0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Connecting beam animations between click epicenter and nearby network nodes
          for (let i = 0; i < len; i++) {
            const n = nodes[i];
            const dx = n.x - p.x;
            const dy = n.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < p.radius && dist > p.radius - 100) {
              const proximity = 1 - Math.abs(dist - (p.radius - 50)) / 50;
              const lineAlpha = Math.max(0, proximity) * p.alpha * 0.6;
              if (lineAlpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(n.x, n.y);
                ctx.strokeStyle = `rgba(232, 90, 32, ${lineAlpha})`;
                ctx.lineWidth = 1.0;
                ctx.stroke();
                ctx.lineWidth = 0.8;
              }
            }
          }
        }
      }

      // 4. Draw node points
      for (let i = 0; i < len; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        if (n.isAccent) {
          ctx.fillStyle = "rgba(232, 90, 32, 0.75)";
          ctx.shadowColor = "rgba(232, 90, 32, 0.4)";
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = "rgba(180, 189, 204, 0.45)";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    // Safe animation loop management
    const loop = () => {
      if (!isRunning) return;
      draw();
      animId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      animId = requestAnimationFrame(loop);
    };

    const stop = () => {
      isRunning = false;
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    // Pause when tab is hidden or window blurred to save 100% resources
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        if (getMotionPreference()) start();
      }
    };

    const handleWindowBlur = () => stop();
    const handleWindowFocus = () => {
      if (!document.hidden && getMotionPreference()) start();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    if (getMotionPreference()) {
      start();
    } else {
      draw(); // Draw static frame once for reduced motion
    }

    return () => {
      stop();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  return (
    <div className="global-net-canvas-container" aria-hidden="true">
      <canvas className="global-net-canvas" ref={canvasRef} />
    </div>
  );
};

export default NetBackground;
