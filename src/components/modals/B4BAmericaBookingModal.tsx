import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Video,
  Award,
  HelpCircle,
  Briefcase
} from 'lucide-react';

export interface B4BAmericaBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  onBookingConfirmed?: (bookingDetails: {
    topic: string;
    date: string;
    time: string;
    format: string;
    teamSize: string;
    notes: string;
  }) => void;
}

export const B4BAmericaBookingModal: React.FC<B4BAmericaBookingModalProps> = ({
  isOpen,
  onClose,
  brandName,
  onBookingConfirmed
}) => {
  const [topic, setTopic] = useState('AI One Stop Shop Overview & Onboarding');
  const [preferredDate, setPreferredDate] = useState('2026-10-22');
  const [preferredTime, setPreferredTime] = useState('11:00 AM EST');
  const [format, setFormat] = useState<'VIDEO' | 'PHONE' | 'GROUP'>('VIDEO');
  const [teamSize, setTeamSize] = useState('1-5 members');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onBookingConfirmed) {
      onBookingConfirmed({
        topic,
        date: preferredDate,
        time: preferredTime,
        format,
        teamSize,
        notes
      });
    }
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1E1B4B 0%, #064E3B 100%)',
            color: '#FFFFFF',
            padding: '24px 28px',
            borderTopLeftRadius: '17px',
            borderTopRightRadius: '17px',
            position: 'relative'
          }}
        >
          <button
            onClick={resetAndClose}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.18)',
                color: '#34D399',
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Award size={12} />
              B4B AMERICA OFFICIAL PARTNER
            </span>
            <span
              style={{
                background: 'rgba(52, 211, 153, 0.2)',
                color: '#A7F3D0',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
            >
              100% Free for Small Businesses
            </span>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '900', margin: 0, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            Schedule 1-on-1 Product Training &amp; Client Education
          </h2>
          <p style={{ fontSize: '13px', color: '#CBD5E1', margin: '6px 0 0 0', lineHeight: '1.4' }}>
            B4B America acts as your dedicated personal liaison to educate, train, and guide your business on all Zunme AI tools.
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                Training Session Requested Successfully!
              </h3>
              <p style={{ fontSize: '14px', color: '#475569', maxWidth: '440px', margin: '0 auto 18px', lineHeight: '1.5' }}>
                Your dedicated B4B America Education Lead (<strong>Sarah Jenkins</strong>) has received your request for{' '}
                <strong>{preferredDate}</strong> at <strong>{preferredTime}</strong>. A calendar invite and prep guide have been sent.
              </p>
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '14px',
                  maxWidth: '420px',
                  margin: '0 auto 24px',
                  fontSize: '12.5px',
                  textAlign: 'left',
                  color: '#334155'
                }}
              >
                <div><strong>Selected Topic:</strong> {topic}</div>
                <div style={{ marginTop: '4px' }}><strong>Format:</strong> {format === 'VIDEO' ? '1-on-1 Google Meet / Zoom' : format === 'PHONE' ? 'Direct Phone Call' : 'Team Workshop'}</div>
                <div style={{ marginTop: '4px' }}><strong>Client Organization:</strong> {brandName || 'Small Business Workspace'}</div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ background: '#059669', borderColor: '#059669', minWidth: '160px' }}
                onClick={resetAndClose}
              >
                Done &amp; Return to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Topic Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                  What would you like training on? <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <select
                  className="input-field"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  style={{ width: '100%', fontSize: '13px' }}
                >
                  <option value="AI One Stop Shop Overview & Onboarding">
                    AI One Stop Shop Overview &amp; Full Platform Onboarding
                  </option>
                  <option value="Zunme Ads Low-Budget Starter Campaign Setup">
                    Zunme Ads: Launching Low-Budget Starter Campaigns ($10-$25/day)
                  </option>
                  <option value="nErgy CRM Deep Sync & Lead Ingestion Setup">
                    nErgy CRM: Real-time Lead Synchronization &amp; Deal Pipelines
                  </option>
                  <option value="AI Content Creation & Social Editorial Calendars">
                    AI Content Creation: SEO Blueprints, Templates &amp; Editorial Calendars
                  </option>
                  <option value="Custom Small Business Strategy Consultation">
                    Custom Small Business Strategy Consultation with B4B America
                  </option>
                </select>
              </div>

              {/* Format & Team Size */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                    Preferred Meeting Format
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setFormat('VIDEO')}
                      style={{
                        flex: 1,
                        padding: '9px 10px',
                        borderRadius: '8px',
                        border: format === 'VIDEO' ? '2px solid #059669' : '1px solid #CBD5E1',
                        background: format === 'VIDEO' ? '#ECFDF5' : '#FFFFFF',
                        color: format === 'VIDEO' ? '#065F46' : '#475569',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Video size={14} />
                      Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormat('PHONE')}
                      style={{
                        flex: 1,
                        padding: '9px 10px',
                        borderRadius: '8px',
                        border: format === 'PHONE' ? '2px solid #059669' : '1px solid #CBD5E1',
                        background: format === 'PHONE' ? '#ECFDF5' : '#FFFFFF',
                        color: format === 'PHONE' ? '#065F46' : '#475569',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <PhoneCall size={14} />
                      Phone
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                    Team Members Attending
                  </label>
                  <select
                    className="input-field"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    style={{ width: '100%', fontSize: '13px' }}
                  >
                    <option value="Just me (Solo)">Just me (Solo Founder / Owner)</option>
                    <option value="1-3 members">Small Team (1 - 3 members)</option>
                    <option value="4-10 members">Growing Team (4 - 10 members)</option>
                    <option value="10+ team workshop">All Hands / Cross-functional (10+)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Picker */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                    Preferred Date
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="date"
                      className="input-field"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      style={{ width: '100%', fontSize: '13px' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                    Preferred Time Slot
                  </label>
                  <select
                    className="input-field"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    style={{ width: '100%', fontSize: '13px' }}
                  >
                    <option value="10:00 AM EST">10:00 AM EST (Morning)</option>
                    <option value="11:30 AM EST">11:30 AM EST (Midday)</option>
                    <option value="2:00 PM EST">2:00 PM EST (Afternoon)</option>
                    <option value="4:30 PM EST">4:30 PM EST (Late Afternoon)</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#0F172A', marginBottom: '5px' }}>
                    Contact Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Michael Miller"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    style={{ fontSize: '13px' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#0F172A', marginBottom: '5px' }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="name@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{ fontSize: '13px' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#0F172A', marginBottom: '5px' }}>
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="(555) 000-0000"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Goals / Specific Questions */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
                  What is your primary goal or biggest challenge? (Optional)
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  placeholder="e.g., We want to set up our first $10/day search ad and connect our customer CRM."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ width: '100%', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              {/* Trust Callout */}
              <div
                style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '12px',
                  color: '#166534'
                }}
              >
                <ShieldCheck size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Guaranteed No-Pressure Training:</strong> Sessions are strictly educational to help small businesses leverage Zunme AI tools efficiently on any budget.
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={resetAndClose}
                  style={{ fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    borderColor: '#059669',
                    fontSize: '13px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Calendar size={14} />
                  <span>Confirm Training Booking</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
