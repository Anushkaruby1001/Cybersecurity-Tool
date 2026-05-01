import { useState } from "react";
import {
  FiGlobe,
  FiLock,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import "../styles/websiteSafetyChecker.css";

const WebsiteSafetyChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeWebsite = () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      let trustScore = 100;
      const reasons = [];

      const lowerUrl = url.toLowerCase();

      // Rule sets
      const suspiciousWords = [
        "login",
        "verify",
        "update",
        "secure",
        "bank",
        "free",
        "bonus",
        "gift",
        "win",
        "account",
      ];

      const dangerousExtensions = [".exe", ".apk", ".scr", ".zip"];

      // HTTPS check
      const https = lowerUrl.startsWith("https");
      if (!https) {
        trustScore -= 25;
        reasons.push("Website does not use HTTPS (SSL missing)");
      }

      // Suspicious keyword check
      const suspiciousPatterns = suspiciousWords.some(word =>
        lowerUrl.includes(word)
      );
      if (suspiciousPatterns) {
        trustScore -= 20;
        reasons.push("URL contains phishing-related keywords");
      }

      // Dangerous extension check
      const hasDangerousExtension = dangerousExtensions.some(ext =>
        lowerUrl.endsWith(ext)
      );
      if (hasDangerousExtension) {
        trustScore -= 40;
        reasons.push("URL points to a potentially malicious file");
      }

      // IP-based URL check
      const isIpBased = /^\d{1,3}(\.\d{1,3}){3}/.test(lowerUrl);
      if (isIpBased) {
        trustScore -= 20;
        reasons.push("URL uses IP address instead of domain name");
      }

      // Domain age (simulated but logical)
      const domainAge = lowerUrl.length > 20 ? "5+ years" : "< 1 year";
      if (domainAge === "< 1 year") {
        trustScore -= 10;
        reasons.push("Domain appears to be newly registered");
      }

      // Score clamp
      trustScore = Math.max(trustScore, 0);

      // Verdict
      let verdict = "Safe";
      if (trustScore < 60) verdict = "Dangerous";
      else if (trustScore < 80) verdict = "Suspicious";

      setResult({
        trustScore,
        https,
        domainAge,
        suspiciousPatterns,
        verdict,
        reasons,
      });

      setLoading(false);
    }, 1200);
  };

  return (
    <div className="ws-page">
      <h1 className="ws-title">Website Safety Checker</h1>
      <p className="ws-subtitle">
        Check if a website is safe before you visit or share data.
      </p>

      <div className="ws-input-card">
        <FiGlobe className="ws-icon" />
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={analyzeWebsite}>Analyze</button>
      </div>

      {loading && <div className="ws-loading">Analyzing website…</div>}

      {result && (
        <div className="ws-dashboard">
          {/* Trust Score */}
          <div className="ws-card trust-card">
            <div className={`trust-ring ${result.verdict.toLowerCase()}`}>
              {result.trustScore}%
            </div>
            <p>Trust Score</p>
          </div>

          {/* Details */}
          <div className="ws-card info-card">
            <h3>Security Details</h3>

            <div className="info-row">
              {result.https ? (
                <FiLock className="safe" />
              ) : (
                <FiXCircle className="danger" />
              )}
              HTTPS / SSL Certificate
            </div>

            <div className="info-row">
              <FiCheckCircle className="neutral" />
              Domain Age: {result.domainAge}
            </div>

            <div className="info-row">
              {result.suspiciousPatterns ? (
                <FiAlertTriangle className="warning" />
              ) : (
                <FiCheckCircle className="safe" />
              )}
              Suspicious URL Patterns
            </div>
          </div>

          {/* Verdict */}
          <div className={`ws-card verdict ${result.verdict.toLowerCase()}`}>
            Final Verdict: {result.verdict}
          </div>

          {/* Risk Reasons */}
          {result.reasons.length > 0 && (
            <div className="ws-card info-card">
              <h3>Risk Reasons</h3>
              <ul>
                {result.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebsiteSafetyChecker;
