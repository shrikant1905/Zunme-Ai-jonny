import React, { useState, useId } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  User,
  Mail,
  Lock,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Wand2,
  Image as ImageIcon,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SSOPlatformsCallout } from '../components/auth/SSOPlatformsCallout';
import './RegisterPage.css';

export const RegisterPage: React.FC = () => {
  const { register } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fullNameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const termsId = useId();

  // Dynamic Password Strength Calculation
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', colorClass: '', hint: '' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Weak', colorClass: 'weak', hint: 'Add capital letters & numbers' };
      case 2:
        return { score: 2, label: 'Fair', colorClass: 'fair', hint: 'Add a number & special symbol' };
      case 3:
        return { score: 3, label: 'Good', colorClass: 'good', hint: 'Add a special character like !@#' };
      case 4:
        return { score: 4, label: 'Enterprise Grade', colorClass: 'strong', hint: 'Strong, high-entropy password' };
      default:
        return { score: 0, label: '', colorClass: '', hint: '' };
    }
  };

  const strength = calculatePasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please recheck.');
      return;
    }
    if (!agreeTerms) {
      setError('You must accept the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);
    setTimeout(async () => {
      try {
        await register(fullName, email, password);
        setIsLoading(false);
        navigate('/user/dashboard');
      } catch (err) {
        setIsLoading(false);
        setError('Registration failed. Please try again or sign in.');
      }
    }, 750);
  };

  return (
    <div className="register-viewport">
      {/* Ambient Aurora Orbs */}
      <div className="register-bg-decorations" aria-hidden="true">
        <div className="ambient-orb orb-primary" />
        <div className="ambient-orb orb-sunset" />
        <div className="ambient-orb orb-emerald" />
        <div className="ambient-grid-mesh" />
      </div>

      <div className="register-split-container">
        {/* ============================================================ */}
        {/* LEFT COLUMN: BRAND EXPERIENCE & ECOSYSTEM SHOWCASE           */}
        {/* ============================================================ */}
        <section className="register-showcase">
          <div className="showcase-badge-pill">
            <span className="badge-pulse-dot" />
            <span>Zunme AI 2.0 • Autonomous Workspace</span>
          </div>

          <h1 className="showcase-heading">
            Build, Create & Scale with{' '}
            <span className="gradient-text">Autonomous Intelligence</span>
          </h1>

          <p className="showcase-description">
            Join over 14,000+ creators, marketers, engineers, and businesses crafting high-impact content, live web research, and multi-modal media in one unified studio.
          </p>

          {/* Interactive Feature Capability Cards */}
          <div className="showcase-features-stack">
            <div className="showcase-feature-card">
              <div className="feature-card-icon violet">
                <MessageSquare size={18} />
              </div>
              <div className="feature-card-content">
                <h3>
                  Ask Zunme & Real-Time Web Search
                  <span className="feature-mini-pill">Verified Sources</span>
                </h3>
                <p>Multi-turn LLM reasoning with real-time web citations, fresh URL crawling, and verified factual accuracy.</p>
              </div>
            </div>

            <div className="showcase-feature-card">
              <div className="feature-card-icon emerald">
                <Wand2 size={18} />
              </div>
              <div className="feature-card-content">
                <h3>
                  1,000+ Blueprints & AI Warehouse
                  <span className="feature-mini-pill">Instant Output</span>
                </h3>
                <p>Ready-to-deploy blueprints for viral social content, technical SEO docs, ad copywriting, and CRM workflows.</p>
              </div>
            </div>

            <div className="showcase-feature-card">
              <div className="feature-card-icon sunset">
                <ImageIcon size={18} />
              </div>
              <div className="feature-card-content">
                <h3>
                  Multi-Modal Studio & Creator Hub
                  <span className="feature-mini-pill">Monetization</span>
                </h3>
                <p>Synthesize 4K photorealistic imagery, generate cinematic video scripts, and earn royalties on community assets.</p>
              </div>
            </div>
          </div>

          {/* Social Proof & Security Guarantee */}
          <div className="showcase-social-proof">
            <div className="avatar-stack-group">
              <div className="avatar-stack">
                <div className="stack-avatar" style={{ background: '#6E56CF' }}>A</div>
                <div className="stack-avatar" style={{ background: '#EC4899' }}>M</div>
                <div className="stack-avatar" style={{ background: '#10B981' }}>J</div>
                <div className="stack-avatar" style={{ background: '#3B82F6' }}>S</div>
              </div>
              <div className="avatar-stack-meta">
                <div className="avatar-stack-count">14,200+ Creators & Teams</div>
                <div className="avatar-stack-label">Rated 4.9/5 Across 120+ Countries</div>
              </div>
            </div>

            <div className="security-guarantee-pill">
              <Shield size={15} />
              <span>256-Bit AES Encrypted</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: LUXURY REGISTRATION CARD                      */}
        {/* ============================================================ */}
        <section className="register-form-card" aria-labelledby="register-heading">
          <div className="register-card-header">
            <div className="register-brand-row">
              <NavLink to="/" className="register-brand-link">
                <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '32px', width: 'auto', display: 'block' }} />
              </NavLink>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#10B981', fontWeight: 700 }}>
                <Zap size={14} />
                <span>Instant Access</span>
              </div>
            </div>

            <h2 id="register-heading" className="register-card-title">
              Create Your Free Account
            </h2>
            <p className="register-card-subtitle">
              Get full access to all verified models, live web search, and content builders in 15 seconds.
            </p>
            <SSOPlatformsCallout />
          </div>

          {error && (
            <div className="auth-alert-error" role="alert" style={{ marginBottom: '16px' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="register-input-group">
              <label className="register-label" htmlFor={fullNameId}>
                <span>Full Name</span>
              </label>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <User size={16} />
                </span>
                <input
                  id={fullNameId}
                  type="text"
                  className="register-input-field"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  required
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="register-input-group">
              <label className="register-label" htmlFor={emailId}>
                <span>Work / Personal Email</span>
              </label>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <Mail size={16} />
                </span>
                <input
                  id={emailId}
                  type="email"
                  className="register-input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@company.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="register-input-group">
              <label className="register-label" htmlFor={passwordId}>
                <span>Password</span>
                <span style={{ fontSize: '11px', color: '#8C97B0', fontWeight: 500 }}>Min. 8 characters</span>
              </label>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <Lock size={16} />
                </span>
                <input
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  className="register-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-action"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Dynamic Password Strength Progress Bar */}
              {password.length > 0 && (
                <div className="password-strength-container">
                  <div className="strength-bars-track">
                    <div className={`strength-bar-segment ${strength.score >= 1 ? `active-${strength.colorClass}` : ''}`} />
                    <div className={`strength-bar-segment ${strength.score >= 2 ? `active-${strength.colorClass}` : ''}`} />
                    <div className={`strength-bar-segment ${strength.score >= 3 ? `active-${strength.colorClass}` : ''}`} />
                    <div className={`strength-bar-segment ${strength.score >= 4 ? `active-${strength.colorClass}` : ''}`} />
                  </div>
                  <div className="strength-meta-row">
                    <span className={`strength-label-text ${strength.colorClass}`}>
                      Strength: {strength.label}
                    </span>
                    <span className="strength-hint-text">{strength.hint}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="register-input-group">
              <div className="register-label">
                <label htmlFor={confirmPasswordId}>Confirm Password</label>
                {passwordsMatch && (
                  <span className="password-match-badge matched">
                    <Check size={12} />
                    <span>Passwords match</span>
                  </span>
                )}
                {passwordsMismatch && (
                  <span className="password-match-badge mismatched">
                    <span>Passwords do not match</span>
                  </span>
                )}
              </div>
              <div className="input-icon-wrapper">
                <span className="input-leading-icon">
                  <ShieldCheck size={16} />
                </span>
                <input
                  id={confirmPasswordId}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`register-input-field ${passwordsMatch ? 'input-valid' : ''} ${passwordsMismatch ? 'input-invalid' : ''}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password to verify"
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-action"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="register-terms-row">
              <input
                id={termsId}
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <label htmlFor={termsId} className="register-terms-text">
                I agree to the <NavLink to="/terms">Terms of Service</NavLink> and{' '}
                <NavLink to="/privacy">Privacy Policy</NavLink>. I understand Zunme AI provides encrypted workspaces.
              </label>
            </div>

            {/* Submit Button with Shimmer & Loading State */}
            <button
              type="submit"
              className="btn-register-submit"
              disabled={isLoading}
              id="btn-create-account"
            >
              {isLoading ? (
                <>
                  <div className="spinner-register" />
                  <span>Configuring your AI workspace...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Create Free Account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Trust Guarantees */}
          <div className="register-trust-row">
            <div className="trust-item">
              <CheckCircle2 size={13} />
              <span>Free forever tier</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={13} />
              <span>No credit card</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={13} />
              <span>Instant setup</span>
            </div>
          </div>

          {/* Footer prompt */}
          <div className="register-card-footer">
            Already have an account?{' '}
            <NavLink to="/login">
              <span>Sign in</span>
              <ArrowRight size={13} />
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};
