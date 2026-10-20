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

// Motion is always enabled across the portfolio
export const getMotionPreference = (): boolean => {
  return true;
};

export const setMotionPreference = (_enabled: boolean): void => {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-motion", "on");
};

// Session revealed elements tracker: prevents reveals from replaying or hiding content on back-navigation
const revealedElementsSet = new Set<string>();

export const markElementRevealed = (id: string) => {
  revealedElementsSet.add(id);
};

export const isElementRevealed = (id: string): boolean => {
  return revealedElementsSet.has(id);
};
