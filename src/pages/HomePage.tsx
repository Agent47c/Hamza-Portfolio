import { lazy, Suspense } from "react";
import Hero from "../components/Hero";

// Code-split below-the-fold sections to eliminate unused JavaScript on initial load
const Journey = lazy(() => import("../components/Journey"));
const ProjectIndex = lazy(() => import("../components/ProjectIndex"));
const TechnicalDepth = lazy(() => import("../components/TechnicalDepth"));
const Philosophy = lazy(() => import("../components/Philosophy"));
const Experience = lazy(() => import("../components/Experience"));
const Contact = lazy(() => import("../components/Contact"));

interface HomePageProps {
  onNavigate: (target: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Suspense fallback={null}>
        <Journey />
        <ProjectIndex />
        <TechnicalDepth />
        <Philosophy />
        <Experience />
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
