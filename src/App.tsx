import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetail from "./pages/ProjectDetail";
import "./App.css";

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Fast route transition indicator (280ms)
const RouteTransition = () => {
  const { pathname } = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setTransitioning(true);
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 320);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`route-transition-bar ${transitioning ? "is-active" : ""}`}
      aria-hidden="true"
    />
  );
};

const AppContent = () => {
  const { scrollTo } = useSmoothScroll();
  const { pathname } = useLocation();

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <RouteTransition />
      <Navbar onNavigate={scrollTo} />
      <main key={pathname} className="page-content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={scrollTo} />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<HomePage onNavigate={scrollTo} />} />
        </Routes>
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
