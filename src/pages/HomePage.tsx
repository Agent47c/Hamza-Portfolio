import Hero from "../components/Hero";
import Journey from "../components/Journey";
import ProjectIndex from "../components/ProjectIndex";
import TechnicalDepth from "../components/TechnicalDepth";
import Philosophy from "../components/Philosophy";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

interface HomePageProps {
  onNavigate: (target: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Journey />
      <ProjectIndex />
      <TechnicalDepth />
      <Philosophy />
      <Experience />
      <Contact />
    </>
  );
};

export default HomePage;
