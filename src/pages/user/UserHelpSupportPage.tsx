import React, { useState } from 'react';
import {
  LifeBuoy,
  HelpCircle,
  Send,
  BookOpen,
  MessageSquare,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'How does Zunme AI ground web search with verified citations?',
    a: 'When you submit a query in Live Web Search, our engine routes the search to verified web discovery APIs (such as Tavily). The retrieved text snippets and authoritative URLs are then synthesized by the AI into an executive brief while displaying clickable source citation cards with domains and dates.'
  },
  {
    q: 'What is the difference between Conversation History and My Library?',
    a: 'Conversation History stores your ongoing multi-turn AI dialogs so you can resume them at any time. My Library is your curated personal vault for high-impact outputs, research briefs, and marketing copy you explicitly choose to bookmark.'
  },
  {
    q: 'How do I submit an asset to the AI Warehouse?',
    a: 'Creators on supported plans can navigate to Creator Studio, fill out the Upload Content flow with their asset blueprint, tags, and category, and submit it for operational review.'
  },
  {
    q: 'Can I switch between light and dark themes?',
    a: 'Zunme AI uses an Apple-inspired dark frosted glass interface with cosmic obsidian and electric violet hues, tailored for reduced eye strain during extended research sessions.'
  }
];

export const UserHelpSupportPage: React.FC = () => {
  const { user, showToast } = useApp();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Technical Question');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    showToast('Support ticket dispatched! Our operations team typically responds within 1 hour.', 'success');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <LifeBuoy size={26} color="#A78BFA" />
            Help & Documentation Center
          </h1>
          <p className="dashboard-subtitle">
            Find answers to frequently asked questions, learn about citation grounding, or submit a support ticket to our operations team.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            Average Support Response: &lt; 1hr
          </div>
        </div>
      </div>

      <div className="cards-grid-2">
        {/* Support Ticket Submission Form */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <MessageSquare size={18} color="#A78BFA" />
              Submit a Support Ticket
            </div>
            <span className="badge badge-neutral">Direct Operations Bridge</span>
          </div>

          <form onSubmit={handleSubmitTicket} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Account Email
              </label>
              <input
                type="text"
                className="input-field"
                value={user?.email || 'user@example.com'}
                disabled
                style={{ opacity: 0.7 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Issue Category
                </label>
                <select
                  className="input-field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Technical Question">Technical Question</option>
                  <option value="Billing & Subscriptions">Billing & Subscriptions</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Creator Studio Inquiry">Creator Studio Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Summary of question..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Detailed Description
              </label>
              <textarea
                className="input-field"
                rows={5}
                placeholder="Please describe your question or issue in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <Send size={14} />
              <span>Submit Ticket &rarr;</span>
            </button>
          </form>
        </div>

        {/* FAQs Accordion */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <BookOpen size={18} color="#0284C7" />
              Frequently Asked Questions
            </div>
            <span className="badge badge-neutral">Knowledgebase</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '10px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    color: '#111625',
                    fontWeight: '700',
                    fontSize: '13px',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} color="#6E56CF" /> : <ChevronDown size={16} color="#8C97B0" />}
                </button>

                {openFaq === i && (
                  <div
                    style={{
                      padding: '0 16px 14px 16px',
                      fontSize: '13px',
                      lineHeight: '1.5',
                      color: '#5F6B85',
                      borderTop: '1px solid #E8ECF5',
                      paddingTop: '10px'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
