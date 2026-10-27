import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import './AuthPages.css';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <NavLink to="/" className="auth-brand-logo">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '36px', width: 'auto', display: 'block' }} />
          </NavLink>
          <h1 className="auth-title">Reset Your Password</h1>
          <p className="auth-subtitle">
            Enter your email and we'll send you recovery instructions
          </p>
        </div>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-light)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={26} />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '600', marginBottom: '8px' }}>
              Check your inbox
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              If an account exists for <strong>{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <NavLink to="/login" className="btn btn-primary w-full">
              Back to Sign In
            </NavLink>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="recovery-email">
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="recovery-email"
                  type="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? 'Sending Link...' : 'Send Recovery Link'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <NavLink
                to="/login"
                className="auth-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={14} />
                <span>Return to Sign In</span>
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
