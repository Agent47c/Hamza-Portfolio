import { useState, useRef, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { triggerToast } from "./Toast";
import { getMotionPreference, setMotionPreference } from "../utils/motion";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact = () => {
  const { scrollTo } = useSmoothScroll();
  const [copied, setCopied] = useState(false);
  const [motionOn, setMotionOn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _honey: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMotionOn(getMotionPreference());
  }, []);

  const toggleMotion = () => {
    const next = !motionOn;
    setMotionOn(next);
    setMotionPreference(next);
    triggerToast(`Motion effects: ${next ? "ON" : "OFF"}`, "info");
  };

  const destinationEmail = import.meta.env.VITE_CONTACT_EMAIL || "hamza.jani7433@gmail.com";
  const phone = "+92 3465288405";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-box",
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".contact-header-block > *", {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(
          ".contact-heading-accent",
          {
            color: "#F2F0EA",
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .from(
          ".contact-form-wrapper",
          {
            opacity: 0,
            y: 18,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(destinationEmail);
    setCopied(true);
    triggerToast("Email copied to clipboard", "success");
    // Feedback persists for 1.5s as specified
    setTimeout(() => setCopied(false), 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear inline error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please provide your name";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please provide an email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please include a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot anti-spam
    if (formData._honey) {
      setStatus("success");
      triggerToast("Message delivered successfully", "success");
      return;
    }

    if (!validate()) {
      setStatus("error");
      setServerErrorMessage("");
      return;
    }

    setStatus("submitting");
    setServerErrorMessage("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${destinationEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Contact] ${formData.subject || "New inquiry from " + formData.name}`,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus("success");
        triggerToast("Message delivered successfully", "success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _honey: "",
        });
        setErrors({});
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch {
      setStatus("error");
      setServerErrorMessage(
        "Could not deliver via form relay. Please email directly at hamza.jani7433@gmail.com"
      );
    }
  };

  return (
    <footer className="section contact-section" id="contact" ref={sectionRef} aria-label="Contact and Footer">
      <div className="container">
        <div className="contact-box">
          <div className="contact-grid">
            {/* Left Column: Direct Info & Channels */}
            <div className="contact-info-col">
              <div className="contact-header-block">
                <span className="section-label">Contact</span>
                <h2 className="contact-heading">
                  Let's Build <span className="contact-heading-accent">Something.</span>
                </h2>
                <p className="contact-subtext">
                  I am open to full-time roles in machine learning, computer vision, and software engineering.
                  Have a project, role, or technical problem worth discussing? Send me a message directly.
                </p>
              </div>

              <div className="contact-channels">
                <div className="channel-card">
                  <span className="channel-label">Direct Email</span>
                  <div className="channel-value-row">
                    <a href={`mailto:${destinationEmail}`} className="channel-link">
                      {destinationEmail}
                    </a>
                  </div>
                  <button
                    type="button"
                    className={`btn-copy ${copied ? "copied" : ""}`}
                    onClick={handleCopy}
                    aria-label="Copy email address to clipboard"
                  >
                    <span>{copied ? "Copied ✓" : "Copy email"}</span>
                  </button>
                </div>

                <div className="channel-card">
                  <span className="channel-label">Phone & Location</span>
                  <div className="channel-value-row">
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} className="channel-link">
                      {phone}
                    </a>
                  </div>
                  <span className="channel-sublabel">
                    Bahawalpur, Pakistan (PKT / UTC+5)
                  </span>
                </div>

                <div className="channel-card">
                  <span className="channel-label">Profiles & Resume</span>
                  <div className="social-links-row">
                    <a
                      href="https://github.com/Agent47c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
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
                      className="social-btn"
                      aria-label="LinkedIn Profile"
                    >
                      <span>LinkedIn</span>
                      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>

                    <a
                      href="/resume/Hamza_Ramzan_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-btn"
                      aria-label="Curriculum Vitae"
                    >
                      <span>Resume PDF</span>
                      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form with Persistent Mono Labels & Validation States */}
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className={`form-group ${errors.name ? "has-error" : ""}`}>
                  <label htmlFor="name" className="form-label">
                    NAME <span className="req">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Chen"
                    className="form-input"
                    disabled={status === "submitting"}
                  />
                  {errors.name && <span className="form-inline-error">{errors.name}</span>}
                </div>

                <div className={`form-group ${errors.email ? "has-error" : ""}`}>
                  <label htmlFor="email" className="form-label">
                    EMAIL <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@company.com"
                    className="form-input"
                    disabled={status === "submitting"}
                  />
                  {errors.email && <span className="form-inline-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    SUBJECT
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="ML Project / Engineering Opportunity"
                    className="form-input"
                    disabled={status === "submitting"}
                  />
                </div>

                <div className={`form-group ${errors.message ? "has-error" : ""}`}>
                  <label htmlFor="message" className="form-label">
                    MESSAGE <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about what you are building or looking for..."
                    className="form-textarea"
                    disabled={status === "submitting"}
                  />
                  {errors.message && <span className="form-inline-error">{errors.message}</span>}
                </div>

                {serverErrorMessage && (
                  <div className="form-alert form-alert-error" role="alert">
                    <span>{serverErrorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="form-alert form-alert-success" role="status">
                    <span className="success-icon" aria-hidden="true">✓</span>
                    <span>Message delivered. Thank you! I will respond to your email shortly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <span className="submit-spinner" aria-hidden="true" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer with Motion Toggle & Lenis Back to Top */}
        <div className="site-footer">
          <p className="footer-copy">
            © 2026 Hamza Ramzan. Deep Learning & Software Engineer.
          </p>

          <div className="footer-controls">
            <button
              type="button"
              className="footer-motion-toggle"
              onClick={toggleMotion}
              aria-label={`Toggle motion animations: currently ${motionOn ? "on" : "off"}`}
              title="Toggle site-wide animations & smooth scroll"
            >
              <span className={`motion-indicator-dot ${motionOn ? "is-active" : ""}`} aria-hidden="true" />
              <span className="motion-label">MOTION:</span>
              <span className={`motion-state ${motionOn ? "is-active" : ""}`}>
                {motionOn ? "ON" : "OFF"}
              </span>
            </button>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={() => scrollTo(0)}
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p className="footer-meta">
            Bahawalpur, Pakistan • Built with React, TypeScript & Lenis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
