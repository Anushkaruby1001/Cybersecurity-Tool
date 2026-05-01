import AnalyticsCharts from './AnalyticsCharts';
import { FiPlay, FiShield } from 'react-icons/fi';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';
import '../styles/Home.css';
import cyberImg from '../assets/Cybersecurity2.png';
import { useNavigate, useLocation } from 'react-router-dom';
import TrustSection from './TrustSection';


const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div className="home-container">

      {/* Header */}
      <div className="home-header">
        <FiShield className="home-logo" />
        <h1>Welcome to Cybersecurity Tool</h1>
      </div>

      {/* Launch Button */}
      <button
        className="tool-btn"
        onClick={() => navigate('/Malware-tool')}
      >
        <FiPlay className="btn-icon" />
        Launch First Tool
      </button>

      {/* Media Section */}
      <div className="home-media">

        {/* Image */}
        <div className="image-container">
          <img
            src={cyberImg}
            alt="Cybersecurity"
            className="home-image"
          />
          <button className="overlay-btn">
            New Tool Coming Soon..
          </button>
        </div>



        {/* Social Section */}
        <div className="social-icons">

          <h3 className="social-title">Connect with us</h3>

          <div className="social-item">
            <FaInstagram />
            <span>Instagram</span>
          </div>

          <div className="social-item">
            <FaLinkedin />
            <span>LinkedIn</span>
          </div>

          <div className="social-item">
            <FaFacebook />
            <span>Facebook</span>
          </div>

          <div className="social-item">
            <FaYoutube />
            <span>YouTube</span>
          </div>

        </div>
      </div>
      {/* ================= Threat Protection ================= */}
      <section className="home-section">
        <h2 className="section-title">What We Protect You From</h2>

        <div className="card-grid">
          <div className="info-card">
            <h3>Malware Files</h3>
            <p>Detects harmful files that can damage or control your system.</p>
          </div>

          <div className="info-card">
            <h3>Phishing Emails</h3>
            <p>Identifies fake emails designed to steal your personal data.</p>
          </div>

          <div className="info-card">
            <h3>Malicious Websites</h3>
            <p>Flags unsafe websites that may spread scams or malware.</p>
          </div>

          <div className="info-card">
            <h3>Weak Passwords</h3>
            <p>Highlights passwords that are easy to guess or compromised.</p>
          </div>
        </div>
      </section>

      {/* ================= Security Tools ================= */}
      <section className="home-section">
        <h2 className="section-title">Our Security Tools</h2>

        <div className="card-grid">

          <div
            className={`tool-card ${location.pathname === '/malware-tool' ? 'active' : ''}`}
            onClick={() => navigate('/malware-tool')}
          >
            <h3>Malware Info Tool</h3>
            <p>Analyze files for malware behavior and risk indicators.</p>
            <span className="tool-action">Try Now →</span>
          </div>

          <div
            className={`tool-card ${location.pathname === '/email-analyzer' ? 'active' : ''}`}
            onClick={() => navigate('/email-analyzer')}
          >
            <h3>Suspicious Email Analyzer</h3>
            <p>Detect phishing attempts and scam indicators in emails.</p>
            <span className="tool-action">Try Now →</span>
          </div>

          <div
            className={`tool-card ${location.pathname === '/website-safety' ? 'active' : ''}`}
            onClick={() => navigate('/website-safety')}
          >
            <h3>Website Safety Checker</h3>
            <p>Check if a website is safe, trusted, or potentially dangerous.</p>
            <span className="tool-action">Try Now →</span>
          </div>

        </div>

      </section>
      {/* ================= Analytics Dashboard ================= */}
      <section className="home-section">
        <h2 className="section-title">Cybersecurity Analytics</h2>
        <AnalyticsCharts />
      </section>
      {/* ================= Trust Section ================= */}
      <TrustSection />



    </div>
  );
};

export default Home;
