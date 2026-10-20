import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { initManualScrollRestoration, getSavedScrollPosition, restoreScrollPosition, saveScrollPosition } from "./utils/scrollRestoration";
import { getMotionPreference } from "./utils/motion";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NetBackground from "./components/NetBackground";
import "./App.css";

// Code-split auxiliary components for minimum initial bundle size
const IntroOverlay = lazy(() => import("./components/IntroOverlay"));
const ToastContainer = lazy(() => import("./components/Toast"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

// 404 Component
const NotFound = () => {
  return (
    <div className="not-found-screen">
      <div className="container">
        <span className="not-found-mono">ERROR 404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-subtext">
          The requested coordinate does not exist or has been relocated.
        </p>
        <a href="/" className="btn-primary" style={{ width: "fit-content", marginTop: "24px" }}>
          <span>Return to Homepage</span>
        </a>
      </div>
    </div>
  );
};

// Route Transition Progress Bar
const RouteTransitionBar = ({ active }: { active: boolean }) => {
  return (
    <div
      className={`route-progress-line ${active ? "is-loading" : ""}`}
      aria-hidden="true"
    />
  );
};

// Precision Scroll Manager for Lenis & History Restoration
const ScrollRestorationManager = () => {
  const location = useLocation();
  const { start, stop } = useSmoothScroll();

  useEffect(() => {
    initManualScrollRestoration();
  }, []);

  useEffect(() => {
    // When returning to home page, restore saved scroll position
    if (location.pathname === "/") {
      const savedY = getSavedScrollPosition(location.key, "/");
      if (savedY !== undefined && savedY > 0) {
        restoreScrollPosition(savedY);
      }
    }

    // Ensure Lenis wheel/touch scrolling never gets stuck after route changes
    stop();
    const timer = setTimeout(() => {
      start();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Save current scroll position before unmounting/navigating away
      saveScrollPosition(location.key, location.pathname);
    };
  }, [location, start, stop]);

  return null;
};

const AppContent = () => {
  const { scrollTo } = useSmoothScroll();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Initialize motion attribute on root HTML element
    document.documentElement.setAttribute("data-motion", getMotionPreference() ? "on" : "off");
  }, []);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 350);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      <NetBackground />
      <Suspense fallback={null}>
        <IntroOverlay />
        <ToastContainer />
      </Suspense>
      <RouteTransitionBar active={isTransitioning} />
      <ScrollRestorationManager />
      <Navbar onNavigate={scrollTo} />
      <main className="page-content-wrapper">
        <Suspense
          fallback={
            <div className="route-suspense-fallback">
              <div className="suspense-loader" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage onNavigate={scrollTo} />} />
            {/* Project routes */}
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Analytics />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
