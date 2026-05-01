import { Link } from 'react-router-dom';
import {FiMail,
  FiShield,
  FiHome,
  FiAlertTriangle,
  FiGlobe } from 'react-icons/fi';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">

        {/* Left: Site name */}
        <div className="nav-left">
          <Link to="/" className="site-name">
            Cybersecurity Tool
          </Link>
        </div>

        {/* Center: Tools */}
        <div className="nav-center">
          <Link to="/" className="nav-item">
            <FiHome className="nav-icon" />
            Home
          </Link>

          <Link to="/Malware-tool" className="nav-item">
            <FiShield className="nav-icon" />
            Malware Info Tool
          </Link>

          <Link to="/email-analyzer" className="nav-item">
            <FiAlertTriangle className="nav-icon" />
            Email Analyzer
          </Link>

           <Link to="/website-safety" className="nav-item">
            <FiGlobe className="nav-icon" />
            Website Safety Checker
          </Link>


          <Link to="/contact" className="nav-item">
            <FiMail className="nav-icon" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
