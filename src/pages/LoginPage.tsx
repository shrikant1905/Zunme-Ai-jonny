import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  AlertCircle,
  Crown,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Share2,
  Megaphone,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { SSOPlatformsCallout } from '../components/auth/SSOPlatformsCallout';
import './AuthPages.css';

interface PersonaRole {
  id: string;
  name: string;
  subtitle: string;
  path: string;
  role: UserRole;
  roleBadge: string;
  email: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const LoginPage: React.FC = () => {
  const { loginWithRole } = useApp();
  const navigate = useNavigate();

  // Exactly the 6 dashboards from the original modal shown in Image 2
  const personas: PersonaRole[] = [
    {
      id: 'super-admin',
      name: 'Super Admin Governance',
      subtitle: '/super-admin',
      path: '/super-admin/dashboard',
      role: 'SUPER_ADMIN',
      roleBadge: 'Super Admin',
      email: 'superadmin@zunme.ai',
      icon: <Crown size={18} />,
      accentColor: '#8B5CF6'
    },
    {
      id: 'admin',
      name: 'Admin Operations Hub',
      subtitle: '/admin',
      path: '/admin/dashboard',
      role: 'ADMIN',
      roleBadge: 'Admin',
      email: 'admin@zunme.ai',
      icon: <ShieldCheck size={18} />,
      accentColor: '#635BFF'
    },
    {
      id: 'user',
      name: 'User AI Workspace',
      subtitle: '/user',
      path: '/user/home',
      role: 'USER',
      roleBadge: 'Core User',
      email: 'alex.creator@zunme.ai',
      icon: <Sparkles size={18} />,
      accentColor: '#0EA5E9'
    },
    {
      id: 'business',
      name: 'Business & CRM Hub',
      subtitle: '/business',
      path: '/business/overview',
      role: 'USER',
      roleBadge: 'Business',
      email: 'business@zunme.ai',
      icon: <Briefcase size={18} />,
      accentColor: '#10B981'
    },
    {
      id: 'social',
      name: 'Social & Content Scheduler',
      subtitle: '/social',
      path: '/social/calendar',
      role: 'USER',
      roleBadge: 'Social',
      email: 'social@zunme.ai',
      icon: <Share2 size={18} />,
      accentColor: '#6E56CF'
    },
    {
      id: 'ads',
      name: 'Zunme Ads Platform',
      subtitle: '/ads',
      path: '/ads/overview',
      role: 'USER',
      roleBadge: 'Ads Platform',
      email: 'ads@zunme.ai',
      icon: <Megaphone size={18} />,
      accentColor: '#A855F7'
    }
  ];

  const [selectedPersona, setSelectedPersona] = useState<PersonaRole>(personas[0]);
  const [email, setEmail] = useState<string>(personas[0].email);
  const [password, setPassword] = useState<string>('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPersona = (persona: PersonaRole) => {
    setSelectedPersona(persona);
    setEmail(persona.email);
  };

  const handleSignInWithRole = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginWithRole(selectedPersona.role, selectedPersona.name);
      setIsLoading(false);
      navigate(selectedPersona.path);
    }, 400);
  };

  return (
    <div className="energy-auth-page landing-theme-login">
      {/* Background Atmosphere Layers from Home Page */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Global Bar matching Home Page */}
      <header className="energy-auth-topbar">
        <NavLink
          to="/"
          className="energy-topbar-brand"
          title="Zunme AI"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <img src="/zunme_icon.png" alt="Zunme AI" style={{ height: '26px', width: 'auto', display: 'block' }} />
          <span style={{ fontWeight: 800, fontSize: '15px', color: '#111625', letterSpacing: '-0.02em' }}>
            Zunme AI
          </span>
        </NavLink>

        <div className="energy-topbar-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <NavLink
            to="/"
            className="energy-back-home-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#4B5565',
              background: '#F1F5F9',
              border: '1px solid #E2E8F0',
              padding: '5px 12px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.18s ease'
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </NavLink>
          <div className="energy-status-tag">
            <Eye size={14} />
            <span>Super Admin: VISIBLE</span>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="energy-auth-main">
        <div className="energy-auth-grid">
          {/* Left Column: Login Card with Home Page Luxury Card Styling */}
          <div className="energy-login-card">
            <div className="energy-login-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '38px', width: 'auto', display: 'block' }} />
              </div>
              <p className="energy-card-meta">Next-Gen Unified AI Platform</p>
              <p className="energy-card-desc">Sign in to continue to your workspace.</p>
              <SSOPlatformsCallout />
            </div>

            {error && (
              <div className="energy-alert-error" role="alert">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignInWithRole} className="energy-form">
              <div className="energy-form-group">
                <label className="energy-label" htmlFor="business-email">
                  Business Email
                </label>
                <div className="energy-input-wrap">
                  <span className="energy-input-icon">✉</span>
                  <input
                    id="business-email"
                    type="email"
                    className="energy-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="energy-form-group">
                <label className="energy-label" htmlFor="business-password">
                  Password
                </label>
                <div className="energy-input-wrap">
                  <span className="energy-input-icon">🔒</span>
                  <input
                    id="business-password"
                    type={showPassword ? 'text' : 'password'}
                    className="energy-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="energy-pw-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Persona Context Card */}
              <div className="energy-context-box">
                <div className="energy-context-row">
                  <span className="energy-ctx-muted">Authenticated as</span>
                  <span className="energy-ctx-highlight">{selectedPersona.roleBadge}</span>
                </div>
                <div className="energy-context-row">
                  <span className="energy-ctx-muted">Target Dashboard</span>
                  <span className="energy-ctx-org">{selectedPersona.name}</span>
                </div>
              </div>

              <button
                type="submit"
                className="energy-submit-btn"
                disabled={isLoading}
              >
                <span>
                  {isLoading
                    ? 'Authenticating...'
                    : `Sign in with Selected Role: ${selectedPersona.name}`}
                </span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="energy-card-footer">
              <div className="energy-footer-badge">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>Secure enterprise session • Tenant-isolated workspace</span>
              </div>
            </div>
          </div>

          {/* Right Column: Persona Grid */}
          <div className="energy-personas-panel">
            <div className="energy-personas-header">
              <h2 className="energy-panel-title">Choose Dashboard</h2>
              <p className="energy-panel-subtitle">Click any dashboard button to sign in directly.</p>
            </div>

            <div className="energy-personas-grid personas-grid-6">
              {personas.map((persona) => {
                const isSelected = selectedPersona.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    className={`energy-persona-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        // Direct instant sign-in on clicking already selected card
                        loginWithRole(persona.role, persona.name);
                        navigate(persona.path);
                      } else {
                        handleSelectPersona(persona);
                      }
                    }}
                    onDoubleClick={() => {
                      loginWithRole(persona.role, persona.name);
                      navigate(persona.path);
                    }}
                  >
                    <div
                      className="persona-icon-box"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-primary, #6E56CF)' : `${persona.accentColor}18`,
                        color: isSelected ? '#FFFFFF' : persona.accentColor
                      }}
                    >
                      {persona.icon}
                    </div>

                    <div className="persona-text-col">
                      <span className="persona-name">{persona.name}</span>
                      <span className="persona-sub">{persona.subtitle}</span>
                    </div>

                    <span className="persona-badge-tag">{persona.roleBadge}</span>

                    <span
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        loginWithRole(persona.role, persona.name);
                        navigate(persona.path);
                      }}
                      title={`Sign in to ${persona.name}`}
                    >
                      <ArrowRight size={15} className="persona-arrow" />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="energy-personas-bottom">
              <div className="energy-security-note">
                <Shield size={14} className="text-emerald" />
                <span>Encrypted RBAC Security Layer Active</span>
              </div>
              <div className="energy-roles-counter">
                <span>6 Dashboards Configured • Instant 1-Click Access</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
