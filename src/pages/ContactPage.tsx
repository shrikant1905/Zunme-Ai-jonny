import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './LegalPages.css';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Platform Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid business email.');
      return;
    }
    if (!message || message.length < 15) {
      setError('Please describe your inquiry with at least 15 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Thank you! Your message has been received by our support team.', 'success');
    }, 600);
  };

  return (
    <div className="legal-page-wrapper">
      <header className="legal-header">
        <div className="legal-container">
          <NavLink to="/" className="legal-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '32px', width: 'auto', display: 'block' }} />
          </NavLink>
          <NavLink to="/" className="legal-back-link">
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </NavLink>
        </div>
      </header>

      <main className="legal-main">
        <div className="legal-container">
          <div className="contact-grid">
            {/* Left: Info */}
            <div className="contact-info-card">
              <div className="contact-badge">
                <Sparkles size={13} />
                <span>Support &amp; Enterprise Operations</span>
              </div>
              <h1 className="contact-title">Let's Connect with Zunme AI</h1>
              <p className="contact-desc">
                Have inquiries regarding our Creator Studio, AI Warehouse monetization, custom enterprise deployments, or platform APIs? Our team is here to assist.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="detail-label">Support &amp; Inquiries</span>
                    <span className="detail-val">support@zunme.ai</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="detail-label">Response Hours</span>
                    <span className="detail-val">Monday - Friday • 24hr Turnaround</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-icon-box">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="detail-label">Headquarters Gateway</span>
                    <span className="detail-val">San Francisco, CA • Cloud Distributed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact-form-card">
              {isSubmitted ? (
                <div className="contact-success-state">
                  <div className="contact-success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2>Message Sent Successfully!</h2>
                  <p>
                    Thank you for reaching out, <strong>{fullName}</strong>. A Zunme AI representative will review your message and reply to <strong>{email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="contact-btn-submit"
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                      setFullName('');
                      setEmail('');
                    }}
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h2 className="form-card-title">Send a Message</h2>

                  {error && (
                    <div className="contact-alert-error" role="alert">
                      <AlertCircle size={15} />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="contact-field-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="contact-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-email">Business Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="contact-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-subject">Topic</label>
                    <select
                      id="contact-subject"
                      className="contact-select"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="General Platform Inquiry">General Platform Inquiry</option>
                      <option value="Creator Verification & Monetization">Creator Verification &amp; Monetization</option>
                      <option value="Enterprise AI Volume Licensing">Enterprise AI Volume Licensing</option>
                      <option value="Custom API & CRM nErgy Integration">Custom API &amp; CRM nErgy Integration</option>
                      <option value="Report an Issue">Report an Issue</option>
                    </select>
                  </div>

                  <div className="contact-field-group">
                    <label htmlFor="contact-msg">Message</label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      className="contact-textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help your creative or business workflows?"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    className="contact-btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ContactPage;
