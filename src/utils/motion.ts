/**
 * Centralized Motion & Animation System
 * Single source of truth for easing curves, durations, and motion tokens.
 */

export const MOTION = {
  // Easing curves
  easeOutCubic: [0.22, 1, 0.36, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeGsap: "power3.out",
  easeGsapFast: "power2.out",

  // Durations (in seconds for GSAP / ms for CSS)
  duration: {
    micro: 0.2,
    fast: 0.35,
    normal: 0.55,
    reveal: 0.75,
    page: 0.5,
  },

  // Stagger intervals
  stagger: {
    micro: 0.02,
    fast: 0.04,
    normal: 0.08,
  },
};

// Motion Toggle (Override prefers-reduced-motion)
const MOTION_STORAGE_KEY = "hamza_motion_preference";

export const getMotionPreference = (): boolean => {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem(MOTION_STORAGE_KEY);
  if (saved !== null) {
    return saved === "true";
  }
  // Default to system preference
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const setMotionPreference = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOTION_STORAGE_KEY, enabled ? "true" : "false");
  document.documentElement.setAttribute("data-motion", enabled ? "on" : "off");
  window.dispatchEvent(new CustomEvent("motion-preference-changed", { detail: { enabled } }));
};

// Session revealed elements tracker: prevents reveals from replaying or hiding content on back-navigation
const revealedElementsSet = new Set<string>();

export const markElementRevealed = (id: string) => {
  revealedElementsSet.add(id);
};

export const isElementRevealed = (id: string): boolean => {
  return revealedElementsSet.has(id);
};
