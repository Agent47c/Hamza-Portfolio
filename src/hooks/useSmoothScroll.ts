import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionPreference } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

// Singleton reference for global smooth-scroll interaction
let globalLenisInstance: Lenis | null = null;

export const getLenis = () => globalLenisInstance;

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user motion preference toggle or system setting
    if (!getMotionPreference()) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.25,
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

    const handleMotionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (!customEvent.detail.enabled) {
        lenis.destroy();
        globalLenisInstance = null;
      }
    };

    window.addEventListener("motion-preference-changed", handleMotionChange);

    return () => {
      window.removeEventListener("motion-preference-changed", handleMotionChange);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (globalLenisInstance === lenis) {
        globalLenisInstance = null;
      }
    };
  }, []);

  // Smooth scroll to target with offset for sticky navbar (-80px)
  const scrollTo = (target: string | number | HTMLElement, offset: number = -80) => {
    const lenis = globalLenisInstance || lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset,
        duration: 1.05,
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
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
    if (lenis) {
      lenis.start();
      lenis.resize();
    }
  };

  const resize = () => {
    const lenis = globalLenisInstance || lenisRef.current;
    if (lenis) lenis.resize();
  };

  return { scrollTo, stop, start, resize };
};

export default useSmoothScroll;
