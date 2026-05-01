import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FeedbackForm.css"

const tools = [
  "Malware Info Tool",
  "Suspicious Email Analyzer",
  "Website Safety Checker",
];

const FeedbackSection = () => {
  const [toolUsed, setToolUsed] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:5000/api/feedback");
    setFeedbacks(res.data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

 const submitFeedback = async () => {
  if (!toolUsed || !message) {
    alert("Please select a tool and write feedback");
    return;
  }

  setLoading(true);

  try {
    await axios.post("http://localhost:5000/api/feedback", {
      toolUsed,
      message,
      rating,
    });

    setToolUsed("");
    setMessage("");
    setRating("");

    alert("Feedback submitted successfully!");
    fetchFeedbacks();

  } catch (error) {
    console.error("Feedback error:", error);
    alert("Failed to submit feedback. Check backend.");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="feedback-section">

      <h3>Share Feedback</h3>

      <select value={toolUsed} onChange={(e) => setToolUsed(e.target.value)}>
        <option value="">Select Tool</option>
        {tools.map(tool => (
          <option key={tool}>{tool}</option>
        ))}
      </select>

      <textarea
        placeholder="Your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Rating (optional)</option>
        {[1,2,3,4,5].map(n => (
          <option key={n}>{n}</option>
        ))}
      </select>

      <button onClick={submitFeedback} disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>

      {/* Feedback Cards */}
      <div className="feedback-list">
        {feedbacks.map(fb => (
          <div key={fb.id} className="feedback-card">
            <h4>{fb.tool_used}</h4>
            <p>{fb.message}</p>
            {fb.rating && <span>⭐ {fb.rating}/5</span>}
          </div>
        ))}
      </div>

    </section>
  );
};

export default FeedbackSection;
