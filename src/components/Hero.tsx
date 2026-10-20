import { useRef, useEffect } from "react";
import gsap from "gsap";
import { scrambleElement } from "../utils/scrambleText";
import "./styles/Hero.css";

interface HeroProps {
  onNavigate: (target: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (eyebrowRef.current) {
      scrambleElement(eyebrowRef.current, "ENGINEERING & DEEP LEARNING", "hero-eyebrow");
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: -10,
        duration: 0.45,
        delay: 0.05,
      })
        .from(
          ".hero-accent-draw",
          {
            scaleX: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .from(
          ".hero-name-word",
          {
            y: "115%",
            duration: 0.75,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          ".hero-roles",
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
          },
          "-=0.35"
        )
        .from(
          ".hero-statement",
          {
            opacity: 0,
            y: 14,
            duration: 0.45,
          },
          "-=0.3"
        )
        .from(
          ".hero-cta-group > *, .hero-social-links > *",
          {
            opacity: 0,
            y: 12,
            stagger: 0.05,
            duration: 0.4,
          },
          "-=0.25"
        )
        .from(
          ".spec-item",
          {
            opacity: 0,
            y: 10,
            stagger: 0.04,
            duration: 0.4,
          },
          "-=0.2"
        )
        .from(
          ".hero-scroll-hint",
          {
            opacity: 0,
            y: 8,
            duration: 0.4,
          },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" ref={heroRef} aria-label="Introduction">
      <div className="hero-ambient-line hero-ambient-line-left" aria-hidden="true" />
      <div className="hero-ambient-line hero-ambient-line-right" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          <div className="hero-title-group">
            <div className="hero-eyebrow-row">
              <span className="hero-eyebrow" ref={eyebrowRef}>ENGINEERING & DEEP LEARNING</span>
              <div className="hero-accent-draw" aria-hidden="true" />
            </div>

            <div className="hero-name-mask">
              <h1 className="hero-name">
                <span className="hero-name-word">HAMZA</span>{" "}
                <span className="hero-name-word hero-name-accent">RAMZAN</span>
              </h1>
            </div>

            <div className="hero-roles">
              <span className="hero-role-item">Deep Learning</span>
              <span className="hero-role-separator">•</span>
              <span className="hero-role-item">Machine Learning</span>
              <span className="hero-role-separator">•</span>
              <span className="hero-role-item">Software Engineering</span>
              <span className="hero-role-separator">•</span>
              <span className="hero-role-item">Computer Vision</span>
            </div>
          </div>

          <p className="hero-statement">
            Building practical systems with code, data, and computer vision. From real-time object tracking
            and medical segmentation pipelines to responsive, offline-first applications.
          </p>

          <div className="hero-actions-container">
            <div className="hero-cta-group">
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("#projects");
                }}
              >
                <span>View my work</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1.5V10.5M6 10.5L10 6.5M6 10.5L2 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="#contact"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("#contact");
                }}
              >
                <span>Get in touch</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="hero-social-links">
              <a
                href="https://github.com/Agent47c"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="GitHub Profile"
              >
                <span>GitHub</span>
                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/hamza-ramzan"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                aria-label="LinkedIn Profile"
              >
                <span>LinkedIn</span>
                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-specs-wrapper">
            <div className="hero-specs" role="region" aria-label="Quick Technical Overview">
              <div className="spec-item">
                <span className="spec-key">Core Focus</span>
                <span className="spec-val">Computer Vision & Deep Learning</span>
              </div>
              <div className="spec-item">
                <span className="spec-key">Current Role</span>
                <span className="spec-val">System Administrator @ Motion Spectrum</span>
              </div>
              <div className="spec-item">
                <span className="spec-key">Education</span>
                <span className="spec-val">BS Software Engineering (IUB, 2026)</span>
              </div>
              <div className="spec-item">
                <span className="spec-key">Primary Stack</span>
                <span className="spec-val">Python • PyTorch • React • SQLite</span>
              </div>
            </div>
          </div>

          <div className="hero-scroll-row" aria-hidden="true">
            <div className="hero-scroll-hint">
              <span className="scroll-indicator-text">SCROLL</span>
              <div className="scroll-indicator-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
