/**
 * Precision Scroll Restoration & Route Transition Manager
 * Handles manual scroll restoration with Lenis synchronization,
 * in-app history tracking, and exact position restoration on Back/Forward.
 */

import { getLenis } from "../hooks/useSmoothScroll";

// Persistent scroll positions keyed by location.key and pathname
const scrollPositions = new Map<string, number>();

// In-app navigation counter to determine if in-app history exists
let inAppNavigationCount = 0;

export const incrementNavigationCount = () => {
  inAppNavigationCount++;
};

export const hasInAppHistory = (): boolean => {
  return inAppNavigationCount > 0;
};

// Enable manual browser scroll restoration
export const initManualScrollRestoration = () => {
  if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
};

// Save scroll position for a specific key
export const saveScrollPosition = (key: string, pathname: string) => {
  const currentY = window.scrollY || document.documentElement.scrollTop || 0;
  scrollPositions.set(key, currentY);
  // Also store by pathname as a secondary fallback for direct refreshes
  scrollPositions.set(pathname, currentY);
};

// Get saved scroll position
export const getSavedScrollPosition = (key: string, pathname: string): number | undefined => {
  return scrollPositions.get(key) ?? scrollPositions.get(pathname);
};

// Scroll to top immediately with Lenis & native fallback
export const scrollToTopImmediate = () => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
};

// Restore saved position with Lenis & native fallback
export const restoreScrollPosition = (savedY: number) => {
  const lenis = getLenis();

  // Give DOM and layout calculations a cycle to settle
  requestAnimationFrame(() => {
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(savedY, { immediate: true });
    } else {
      window.scrollTo({ top: savedY, behavior: "instant" });
    }
  });
};
