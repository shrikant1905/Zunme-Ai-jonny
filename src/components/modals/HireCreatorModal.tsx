import React, { useState } from 'react';
import {
  X,
  Briefcase,
  Calendar,
  DollarSign,
  Link as LinkIcon,
  Send,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './ModalsExtended.css';

export interface HireCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  creatorTier?: string;
  creatorRole?: string;
}

export const HireCreatorModal: React.FC<HireCreatorModalProps> = ({
  isOpen,
  onClose,
  creatorName,
  creatorTier = 'Verified Pro',
  creatorRole = 'AI Content & Prompt Specialist'
}) => {
  const { showToast } = useApp();

  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Content Creation & Copy');
  const [budgetRange, setBudgetRange] = useState('$250 - $500');
  const [deadline, setDeadline] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const categories = [
    'Content Creation & Copy',
    'Custom Prompt Engineering',
    'Social Media Campaigns',
    'AI Image & Visual Generation',
    'Video Script & Storyboarding',
    'SEO & Content Strategy Architecture',
    'Brand Identity & Voice Guidelines'
  ];

  const budgetOptions = [
    '$100 - $250 (Quick Sprint)',
    '$250 - $500 (Standard Delivery)',
    '$500 - $1,000 (Multi-Asset Pack)',
    '$1,000+ (Enterprise Custom Project)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!projectTitle.trim()) {
      setError('Please provide a project title.');
      return;
    }
    if (!description.trim() || description.length < 20) {
      setError('Please write at least 20 characters describing project scope and expectations.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        `Project brief sent to ${creatorName}! They will review your brief within 24 hours.`,
        'success'
      );
      // Reset form and close
      setProjectTitle('');
      setDescription('');
      setReferenceLink('');
      setDeadline('');
      onClose();
    }, 600);
  };

  return (
    <div
      className="hire-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hire-modal-title"
    >
      <div className="hire-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="hire-modal-header">
          <div className="hire-header-info">
            <div className="hire-header-badge">
              <Briefcase size={13} />
              <span>Direct Creator Hiring</span>
            </div>
            <h2 id="hire-modal-title" className="hire-modal-title">
              Hire {creatorName}
            </h2>
            <p className="hire-modal-sub">
              {creatorTier} • {creatorRole}
            </p>
          </div>
          <button
            type="button"
            className="hire-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="hire-alert-error" role="alert">
            <AlertCircle size={15} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="hire-modal-form">
          <div className="hire-form-group">
            <label className="hire-form-label" htmlFor="hire-project-title">
              Project Title <span className="req-star">*</span>
            </label>
            <input
              id="hire-project-title"
              type="text"
              className="hire-input"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. 10 High-Converting AI Newsletter Templates"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="hire-form-row">
            <div className="hire-form-group">
              <label className="hire-form-label" htmlFor="hire-category">
                Category
              </label>
              <select
                id="hire-category"
                className="hire-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="hire-form-group">
              <label className="hire-form-label" htmlFor="hire-budget">
                Budget Scope
              </label>
              <select
                id="hire-budget"
                className="hire-select"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                disabled={isSubmitting}
              >
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hire-form-row">
            <div className="hire-form-group">
              <label className="hire-form-label" htmlFor="hire-deadline">
                Target Deadline (Optional)
              </label>
              <div className="hire-input-with-icon">
                <Calendar size={14} className="hire-field-icon" />
                <input
                  id="hire-deadline"
                  type="date"
                  className="hire-input"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="hire-form-group">
              <label className="hire-form-label" htmlFor="hire-ref-link">
                Reference / Moodboard URL (Optional)
              </label>
              <div className="hire-input-with-icon">
                <LinkIcon size={14} className="hire-field-icon" />
                <input
                  id="hire-ref-link"
                  type="url"
                  className="hire-input"
                  value={referenceLink}
                  onChange={(e) => setReferenceLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="hire-form-group">
            <label className="hire-form-label" htmlFor="hire-desc">
              Project Brief &amp; Expectations <span className="req-star">*</span>
            </label>
            <textarea
              id="hire-desc"
              rows={4}
              className="hire-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your goals, deliverables, specific tone, target audience, and any requirements..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="hire-modal-footer">
            <button
              type="button"
              className="hire-btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="hire-btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Dispatching Brief...</span>
              ) : (
                <>
                  <span>Send Project Brief</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default HireCreatorModal;
