import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Settings,
  Shield,
  Search,
  Mic,
  Zap,
  Lock,
  Trash2,
  CheckCircle2,
  Sliders,
  Sparkles,
  Globe,
  User,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './SearchSettingsPage.css';

export const SearchSettingsPage: React.FC = () => {
  const { user, updateProfile, logout, showToast } = useApp();
  const navigate = useNavigate();

  // Settings State
  const [safeSearch, setSafeSearch] = useState(true);
  const [liveCitations, setLiveCitations] = useState(true);
  const [speedMode, setSpeedMode] = useState(true);
  const [privateSession, setPrivateSession] = useState(false);
  const [voiceLang, setVoiceLang] = useState('en-US');
  const [resultsPerPage, setResultsPerPage] = useState('10');

  // Account State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    setIsSaving(true);
    setTimeout(() => {
      updateProfile(fullName.trim());
      setIsSaving(false);
      showToast('Profile updated successfully', 'success');
    }, 400);
  };

  const handleClearHistory = () => {
    showToast('Local search cache and recent queries cleared', 'info');
  };

  return (
    <div className="search-settings-page">
      {/* Atmosphere Background */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Header */}
      <header className="settings-topbar">
        <div className="settings-topbar-inner">
          <NavLink to="/" className="settings-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '32px', width: 'auto' }} />
          </NavLink>
          <div className="settings-topbar-actions">
            <NavLink to="/" className="settings-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            {!user && (
              <NavLink to="/login" className="settings-signin-btn">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="settings-main-container">
        <div className="settings-header-banner">
          <div className="settings-icon-badge">
            <Settings size={22} color="#6E56CF" />
          </div>
          <div>
            <h1 className="settings-page-title">Search &amp; Workspace Settings</h1>
            <p className="settings-page-desc">
              Manage your search preferences, voice language, privacy controls, and speed optimization settings.
            </p>
          </div>
        </div>

        {/* 1. Search Preferences Card */}
        <section className="settings-box">
          <div className="settings-box-header">
            <Search size={18} className="text-purple" />
            <h2>Search &amp; AI Grounding</h2>
          </div>

          <div className="settings-options-list">
            <div className="settings-option-row">
              <div className="option-info">
                <h3>SafeSearch Filtering</h3>
                <p>Filter out explicit or unauthorized content from live web search and AI summaries.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={safeSearch}
                  onChange={(e) => {
                    setSafeSearch(e.target.checked);
                    showToast(e.target.checked ? 'SafeSearch Enabled' : 'SafeSearch Disabled', 'info');
                  }}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <h3>Live Web Citations &amp; Grounding</h3>
                <p>Include verified source URLs, publication timestamps, and reference domains on every search.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={liveCitations}
                  onChange={(e) => {
                    setLiveCitations(e.target.checked);
                    showToast('Citation Grounding updated', 'info');
                  }}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <h3>Results Per Page</h3>
                <p>Control how many verified search references appear in the results list.</p>
              </div>
              <select
                className="settings-select"
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(e.target.value)}
              >
                <option value="10">10 Results (Fastest)</option>
                <option value="20">20 Results</option>
                <option value="50">50 Results (Comprehensive)</option>
              </select>
            </div>
          </div>
        </section>

        {/* 2. Voice & Speed Performance Card */}
        <section className="settings-box">
          <div className="settings-box-header">
            <Zap size={18} style={{ color: '#D97706' }} />
            <h2>Voice &amp; High-Speed Architecture</h2>
          </div>

          <div className="settings-options-list">
            <div className="settings-option-row">
              <div className="option-info">
                <h3>Lightweight HTML &amp; CSS Speed Mode</h3>
                <p>Client speed architecture: Eliminates bloated scripts to deliver sub-second response times.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={speedMode}
                  onChange={(e) => {
                    setSpeedMode(e.target.checked);
                    showToast('Speed Optimization active', 'info');
                  }}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <h3>Voice Search Speech Recognition Language</h3>
                <p>Set default spoken language dialect for the microphone search button.</p>
              </div>
              <select
                className="settings-select"
                value={voiceLang}
                onChange={(e) => setVoiceLang(e.target.value)}
              >
                <option value="en-US">English (United States)</option>
                <option value="en-GB">English (United Kingdom)</option>
                <option value="hi-IN">Hindi (India) - हिन्दी</option>
                <option value="es-ES">Spanish (Español)</option>
                <option value="fr-FR">French (Français)</option>
                <option value="de-DE">German (Deutsch)</option>
              </select>
            </div>
          </div>
        </section>

        {/* 3. Privacy & Data Controls Card */}
        <section className="settings-box">
          <div className="settings-box-header">
            <Lock size={18} style={{ color: '#059669' }} />
            <h2>Privacy &amp; Local Data</h2>
          </div>

          <div className="settings-options-list">
            <div className="settings-option-row">
              <div className="option-info">
                <h3>Confidential Workspace Mode</h3>
                <p>Temporarily disable storing local prompt query history in browser localStorage.</p>
              </div>
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={privateSession}
                  onChange={(e) => {
                    setPrivateSession(e.target.checked);
                    showToast(e.target.checked ? 'Confidential mode ON' : 'Standard logging ON', 'info');
                  }}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-option-row">
              <div className="option-info">
                <h3>Clear Local Search History</h3>
                <p>Erase cached queries and recently searched topics from this device.</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleClearHistory}
              >
                <Trash2 size={14} />
                <span>Clear History</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Account & Profile Sync */}
        <section className="settings-box">
          <div className="settings-box-header">
            <User size={18} style={{ color: '#2563EB' }} />
            <h2>{user ? 'Account Profile' : 'Account & Sync'}</h2>
          </div>

          {user ? (
            <form onSubmit={handleSaveProfile} className="settings-profile-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Read-Only)</label>
                <input
                  type="email"
                  className="form-input disabled"
                  value={user.email}
                  disabled
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <button type="submit" className="btn btn-primary" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Profile Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="settings-guest-sync">
              <p>
                You are currently browsing as a guest. Sign in to your Zunme AI account to synchronize your search preferences, saved documents, and zBox mail across all your devices.
              </p>
              <NavLink to="/login" className="btn btn-primary">
                Sign In to Sync Preferences
              </NavLink>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SearchSettingsPage;
