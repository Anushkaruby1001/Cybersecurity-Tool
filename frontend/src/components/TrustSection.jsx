import { FiLock, FiEye, FiShield, FiInfo } from 'react-icons/fi';
import '../styles/TrustSection.css';

const TrustSection = () => {
  return (
    <section className="trust-section">
      <h2 className="trust-title">Your Privacy & Safety,Clearly Explained</h2>

      <div className="trust-grid">

        <div className="trust-card">
          <FiShield className="trust-icon" />
          <h3>No Execution of Files</h3>
          <p>
            Uploaded files are never executed. Analysis is static and focused
            only on file structure and known patterns.
          </p>
        </div>

        <div className="trust-card">
          <FiEye className="trust-icon" />
          <h3>Client-Side Analysis</h3>
          <p>
            All analysis runs directly in your browser. Nothing is sent to
            external servers.
          </p>
        </div>

        <div className="trust-card">
          <FiLock className="trust-icon" />
          <h3>No Data Collection</h3>
          <p>
            We do not store, track, or log uploaded files, URLs, or user
            activity.
          </p>
        </div>

        <div className="trust-card">
          <FiInfo className="trust-icon" />
          <h3>Educational Use Only</h3>
          <p>
            This tool is designed for learning, awareness, and early risk
            understanding , not as a final security decision maker.
          </p>
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
