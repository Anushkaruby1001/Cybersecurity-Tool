import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import '../styles/contact.css';
import FeedbackSection from './FeedbackSection';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Reach out for support, feedback, or security concerns</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject (optional)"
          value={form.subject}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">
          <FiSend className="send-icon" />
          Send Message
        </button>
        <button
        className="feedback-toggle"
        onClick={() => setShowFeedback(!showFeedback)}
      >
        {showFeedback ? "Close Feedback" : "Share Feedback"}
      </button>

      {/* FEEDBACK SECTION (CONDITIONAL) */}
      {showFeedback && <FeedbackSection />}
        {success && (
          <div className="success-msg">
            ✅ Message sent successfully. We’ll get back to you soon.
          </div>
        )}
      </form>
      <div className="security-note">
        ⚠️ Do not share passwords, confidential data, or sensitive system details.
      </div>
      
    </div>
  );
};

export default Contact;
