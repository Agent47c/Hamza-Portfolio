import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>PPE Safety Monitor</h4>
                  <p>Computer Vision & IoT</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, OpenCV, YOLOv11, StrongSORT, PyQt5, CUDA, Docker, Supabase, SMTP</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="PPE Safety Monitor" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Brain Tumor Segmentation</h4>
                  <p>Medical AI & Deep Learning</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, PyTorch, SAM2, MedSAM-2, YOLO, OpenCV, NumPy</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Brain Tumor Segmentation" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>IronLog Gym Tracker</h4>
                  <p>Mobile Application</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React Native, Expo, SQLite, JavaScript, React Navigation</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="IronLog Gym Tracker" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>Farm Camera Daily Overview (Tapo C200)</h4>
                  <p>Mobile Application</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, YOLO, PyTapo, FFmpeg, OpenCV, Tkinter, Windows Task Scheduler</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Farm Camera Daily Overview" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>Windows Smart Application Backup Tool</h4>
                  <p>Desktop Utility / System Automation</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, Windows Registry API (winreg), JSON Profiles, Tkinter, Windows Task Scheduler</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Windows Smart Application Backup Tool" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>06</h3>
                <div>
                  <h4>House Price Prediction</h4>
                  <p>Machine Learning & Predictive Analytics</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Python, scikit-learn, Pandas, NumPy, Matplotlib, Seaborn</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="House Price Prediction" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>07</h3>
                <div>
                  <h4>Motion Spectrum NAS Setup</h4>
                  <p>Enterprise Network Infrastructure</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Windows Server,  Active Directory, RAID Configuration, Network Storage, DHCP/DNS, Windows Backup & Recovery, Group Policy Objects (GPO)</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Motion Spectrum NAS Setup" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>08</h3>
                <div>
                  <h4>PC Building for Motion Spectrum</h4>
                  <p>High-Performance Hardware Optimization</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Custom Hardware Assembly, Custom Hardware Assembly, Advanced Cooling Solutions, BIOS/UEFI Tuning, Performance Benchmarking, Windows Backup & Recovery,Adobe Softwares Optimization,</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="PC Building for Motion Spectrum" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Work;
