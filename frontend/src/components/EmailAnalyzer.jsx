import { useState } from "react";
import "../styles/EmailAnalyzer.css";

const KEYWORDS = [
  "urgent",
  "act now",
  "account suspended",
  "verify",
  "click here",
  "limited time",
  "password",
  "bank",
  "free",
  "winner",
  "confirm",
  "login",
];

/* ================= SUGGESTIONS LOGIC ================= */
const getSuggestions = (level) => {
  if (level === "Safe") {
    return [
      "You can proceed normally, but remain cautious.",
      "Avoid clicking unexpected links even in safe emails.",
      "Verify sender identity if the email feels unusual."
    ];
  }

  if (level === "Suspicious") {
    return [
      "Do not click links or download attachments.",
      "Verify the sender through an official website or contact.",
      "Look for subtle spelling or domain inconsistencies."
    ];
  }

  return [
    "Do NOT click any links or open attachments.",
    "Do not reply or share any personal information.",
    "Delete the email or report it to your email provider."
  ];
};

const EmailAnalyzer = () => {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeEmail = () => {
    let score = 0;
    let redFlags = [];
    const text = emailText.toLowerCase();

    /* ---------- URGENCY ---------- */
    if (/urgent|immediately|within 24 hours|act now/.test(text)) {
      score += 15;
      redFlags.push("Urgency or pressure tactics");
    }

    /* ---------- SENSITIVE INFO ---------- */
    if (/password|otp|bank|credit card|login|verify account/.test(text)) {
      score += 20;
      redFlags.push("Request for sensitive information");
    }

    /* ---------- PHISHING LANGUAGE ---------- */
    if (KEYWORDS.some(word => text.includes(word))) {
      score += 10;
      redFlags.push("Common phishing language patterns");
    }

    /* ---------- EMOTIONAL MANIPULATION ---------- */
    if (/winner|congratulations|reward|prize|free/.test(text)) {
      score += 15;
      redFlags.push("Reward-based manipulation");
    }

    if (/account suspended|legal action|security alert/.test(text)) {
      score += 15;
      redFlags.push("Fear-based manipulation");
    }

    /* ---------- AUTHORITY ---------- */
    if (/bank|admin|security team|support team/.test(text)) {
      score += 10;
      redFlags.push("Authority impersonation");
    }

    /* ---------- FORMATTING ---------- */
    if (/!{2,}/.test(emailText)) {
      score += 5;
      redFlags.push("Excessive punctuation");
    }

    if (emailText.length > 600) {
      score += 5;
      redFlags.push("Unusually long message");
    }

    /* ---------- LINKS ---------- */
    if (/http|www\./.test(text)) {
      score += 10;
      redFlags.push("Suspicious external links");
    }

    score = Math.min(score, 100);

    const level =
      score < 30 ? "Safe" :
      score < 70 ? "Suspicious" :
      "Dangerous";

    setResult({ score, level, redFlags });
  };

  return (
    <div className="email-tool">
      <h2 className="tool-title">Suspicious Email Analyzer</h2>

      <div className="email-layout">

        {/* LEFT */}
        <div className="email-input-card">
          <label>Email Content</label>
          <textarea
            className="email-textarea"
            placeholder="Paste the email content here..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
          <button onClick={analyzeEmail}>Analyze Email</button>
        </div>

        {/* RIGHT */}
        <div className="email-result-card">
          {!result ? (
            <p className="placeholder">No analysis yet</p>
          ) : (
            <>
              <div className={`risk-circle ${result.level.toLowerCase()}`}>
                {result.score}%
              </div>

              <h3>{result.level} Email</h3>

              <p><strong>Detected Red Flags:</strong></p>
              <ul>
                {result.redFlags.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>

              {/* SUGGESTIONS */}
              <div className="suggestion-box">
                <h4>Recommended Next Steps</h4>
                <ul>
                  {getSuggestions(result.level).map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default EmailAnalyzer;
