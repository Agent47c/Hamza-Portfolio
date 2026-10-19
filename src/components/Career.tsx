import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">

          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>PC Builder Specialist</h4>
                <h5>Freelance - Pakistan</h5>
              </div>
              <h3>2016</h3>
            </div>
            <p>
              Assembled 20+ high-performance gaming and productivity workstations, specializing
              in component selection, cooling, BIOS tuning, and hardware optimization.
              Provided post-build diagnostics and software troubleshooting for Motion
              Spectrum and private clients.

            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Shopify & WordPress Developer</h4>
                <h5>Freelance</h5>
              </div>
              <h3>2018</h3>
            </div>
            <p>
              Built and customized Shopify and WordPress websites using HTML, CSS, JavaScript,
              and Liquid, with a focus on performance, mobile responsiveness, and SEO.
              Managed product listings, plugins, integrations, and customer support.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Labeling Specialist</h4>
                <h5>Data Nomad - Pakistan</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Performed high-precision polygon and bounding box annotation using Label Studio
              and CVAT for computer vision datasets across autonomous driving, retail,
              and security domains. Developed efficient labeling workflows to ensure
              dataset consistency and accuracy.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>QA Team Manager</h4>
                <h5>Data Nomad - Pakistan</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Promoted to QA Team Manager within 2 months, leading a cross-functional
              team auditing multimodal datasets and improving accuracy to 98%+.
              Standardized annotation guidelines, trained specialists, and
              implemented inter-annotator agreement and quality control
              measures to improve dataset reliability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>ML Intern</h4>
                <h5>Certura - Pakistan</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Implemented supervised machine learning models including Linear Regression,
              Naive Bayes, Decision Trees, and Random Forests; processed and cleaned
              structured datasets through feature selection, outlier detection,
              scaling, and encoding, while performing EDA and evaluating models
              using precision, recall, F1-score, ROC-AUC, and RMSE.

            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>ML Engineer Intern</h4>
                <h5>Arch Technologies - Pakistan</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Engineered real-time computer vision pipelines using YOLOv11 and StrongSORT,
              fine-tuned SAM2/MedSAM-2 for brain tumor segmentation, and built predictive
              regression and NLP models for real estate valuation and spam classification
              using PyTorch, TensorFlow, Scikit-learn, and Pandas, with GPU-accelerated
              inference via CUDA.

            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>System Administrator</h4>
                <h5>Motion Spectrum - Pakistan</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Administered Windows Server and Windows 10/11 environments, managing Active
              Directory, GPOs, network shares, permissions, LAN/WAN, DHCP/DNS, and
              security policies. Built and maintained high-performance workstations
              while implementing automated backups and disaster recovery procedures.

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
