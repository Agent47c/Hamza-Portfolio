import { useState, useEffect } from "react";
import { getMotionPreference } from "../utils/motion";
import "./styles/IntroOverlay.css";

const INTRO_SESSION_KEY = "hamza_intro_seen_session";

export const IntroOverlay = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If user has already visited in this session or prefers reduced motion, skip
    if (typeof window === "undefined") return;
    const hasSeen = sessionStorage.getItem(INTRO_SESSION_KEY);
    if (hasSeen || !getMotionPreference()) {
      return;
    }

    setVisible(true);

    // Auto-dismiss within 800ms
    const timer = setTimeout(() => {
      dismiss();
    }, 800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        dismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="intro-overlay"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome animation"
    >
      <div className="intro-content">
        <div className="intro-monogram">
          <span>HAMZA</span> <span className="intro-accent">RAMZAN</span>
        </div>
        <div className="intro-bar" aria-hidden="true">
          <div className="intro-bar-fill" />
        </div>
        <span className="intro-skip-hint">PRESS ESC OR CLICK TO SKIP</span>
      </div>
    </div>
  );
};

export default IntroOverlay;
