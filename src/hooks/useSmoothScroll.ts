import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Singleton reference for global smooth-scroll interaction (e.g. Back to Top)
let globalLenisInstance: Lenis | null = null;

export const getLenis = () => globalLenisInstance;

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (globalLenisInstance === lenis) {
        globalLenisInstance = null;
      }
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, offset: number = -60) => {
    const lenis = globalLenisInstance || lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset,
        duration: 1.1,
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }
  };

  const stop = () => {
    const lenis = globalLenisInstance || lenisRef.current;
    if (lenis) lenis.stop();
  };

  const start = () => {
    const lenis = globalLenisInstance || lenisRef.current;
    if (lenis) lenis.start();
  };

  return { scrollTo, stop, start };
};

export default useSmoothScroll;
