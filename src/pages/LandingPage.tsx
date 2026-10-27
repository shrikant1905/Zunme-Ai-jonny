import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MessageSquare,
  Search,
  PenTool,
  Bookmark,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Database,
  Wand2,
  TrendingUp,
  Globe,
  Menu,
  X,
  FileText,
  Mail,
  ShoppingBag,
  Store,
  Bot,
  Mic
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InteractiveContentIcon, DocumentsLibraryIcon } from '../components/common/ClientDocIcons';
import './LandingPage.css';

export interface EcosystemProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'AI & Intelligence' | 'Communication & Cloud' | 'Commerce & Capital' | 'Media & Creative';
  badge: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
  linkTo: string;
  linkText: string;
}

const ZUNME_ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: 'zunme-ai',
    name: 'Zunme AI',
    tagline: 'Voice Agent & Multimodal Assistant',
    category: 'AI & Intelligence',
    badge: 'Flagship Assistant',
    description: 'Conversational voice intelligence and autonomous reasoning engine tailored for personal and business inquiries.',
    highlights: ['Voice & conversational dialogue', 'Real-time grounding', 'Multimodal analysis'],
    icon: <Sparkles size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    accentColor: '#8B5CF6',
    linkTo: '/login',
    linkText: 'Explore AI Assistant'
  },
  {
    id: 'zbox',
    name: 'zBox',
    tagline: 'Communication & MVP Content Sharing',
    category: 'Communication & Cloud',
    badge: 'Universal Inbox (Gmail-Style)',
    description: 'Gmail-style internal mail suite with zBox cross-platform sharing to Google, Facebook, Instagram, YouTube, TikTok, LinkedIn, Amazon & X.',
    highlights: ['zBox cross-platform dispatch', 'Integrated mailbox & drafts', 'One-click AI asset attachments'],
    icon: <Mail size={22} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    accentColor: '#0284C7',
    linkTo: '/zbox',
    linkText: 'Open zBox Hub'
  }
];

export interface StoreFeaturedProduct {
  id: string;
  name: string;
  tag: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  stats: string;
  thumbnail: string;
  linkTo: string;
}

const STORE_FEATURED_PRODUCTS: StoreFeaturedProduct[] = [
  {
    id: 'ai-content',
    name: 'AI Content',
    tag: 'Prompt Architectures',
    description: 'High-converting copywriting frameworks, cold email engines, and executive thought leadership workflows.',
    icon: <FileText size={18} />,
    accentColor: '#6E56CF',
    stats: '12,400+ Downloads • 4.9★',
    thumbnail: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=600&q=80',
    linkTo: '/store'
  }
];

export type LandingSection = 'all' | 'features' | 'how-it-works' | 'showcase' | 'pricing' | 'faq' | 'ecosystem' | 'store' | 'about' | 'business' | 'advertising' | 'zbox';

export const LandingPage: React.FC = () => {
  const { user } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate('/search');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleToggleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setIsListening(false);
          navigate(`/search?q=${encodeURIComponent(transcript)}`);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch (err) {
        setIsListening(false);
      }
    } else {
      setIsListening(true);
      setTimeout(() => setIsListening(false), 2000);
    }
  };

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="landing-page" id="top">
      {/* Background Atmosphere Layers (Preserved Zunme Theme & Ambient Glow) */}
      <div className="landing-atmosphere-wrap" aria-hidden="true">
        <div className="cosmic-grid-overlay" />
        <div className="ambient-aurora-top" />
        <div className="ambient-aurora-accent" />
      </div>

      {/* ==========================================================================
          TASK 1: GOOGLE-STYLE MINIMAL TOP BAR (Client Doc Spec)
          Left: About, Store | Right: Mailbox, Interactive, Docs, Apps, Sign In
          ========================================================================== */}
      <header className="google-landing-header">
        <div className="google-header-content">
          {/* Left Side: About & Store (Doc Line 1) */}
          <div className="google-nav-left">
            <NavLink to="/" className="google-brand-mini-link" title="Zunme AI" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/zunme_icon.png" alt="Zunme" className="google-brand-mini-logo" />
            </NavLink>
            <button
              type="button"
              className="google-nav-link"
              onClick={() => setShowAboutModal(true)}
            >
              About
            </button>
            <NavLink to="/store" className="google-nav-link">
              Store
            </NavLink>
          </div>

          {/* Right Side: Exact 4 Items from Client Doc */}
          <div className="google-nav-right">
            {/* 1. Mailbox Icon (Doc Image 1) -> /zbox */}
            <NavLink
              to="/zbox"
              className="google-nav-icon-btn"
              title="zBox — Secured Business Email &amp; Webmail"
            >
              <img src="/assets/client-icons/mailbox_icon.png" alt="zBox Email" className="google-nav-icon-img blend-icon" />
            </NavLink>

            {/* 2. Interactive Content Icon (Doc Image 2) -> /studio */}
            <NavLink
              to="/studio"
              className="google-nav-icon-btn"
              title="Interactive Studio &amp; AI Tools"
            >
              <InteractiveContentIcon size={34} />
            </NavLink>

            {/* 3. Documents / Pages Icon (Doc Image 3) -> /library */}
            <NavLink
              to="/library"
              className="google-nav-icon-btn"
              title="Documents &amp; Personal Workspace Library"
            >
              <DocumentsLibraryIcon size={34} />
            </NavLink>

            {/* 4. SIGN IN Button (Doc Image 4) */}
            <NavLink
              to="/login"
              className="google-doc-signin-btn"
              title="Sign In to Zunme"
            >
              <span>SIGN IN</span>
              <span className="google-doc-signin-pointer" aria-hidden="true" />
            </NavLink>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer" role="dialog" aria-modal="true">
            <nav className="mobile-nav-links">
              <button
                type="button"
                className="mobile-nav-item"
                onClick={() => {
                  setShowAboutModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                About Zunme AI
              </button>
              <NavLink to="/store" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Store
              </NavLink>
              <NavLink to="/zbox" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                zBox Secured Business Email
              </NavLink>
              <NavLink to="/studio" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Interactive Content Studio
              </NavLink>
              <NavLink to="/library" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Workspace Documents & Library
              </NavLink>
              <NavLink to="/ads" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Advertising Suite
              </NavLink>
              <NavLink to="/business/workspace" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)}>
                Business Solutions
              </NavLink>
            </nav>
            <div className="mobile-drawer-actions">
              <NavLink
                to="/login"
                className="btn btn-primary btn-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Top Right Corner Brand Logo (outside header, within landing canvas) */}
      <NavLink to="/" className="google-top-right-brand" title="Zunme AI">
        <img src="/zunme_logo.png" alt="Zunme AI" className="google-top-right-logo-img" />
      </NavLink>

      {/* ==========================================================================
          TASKS 2 & 3: HERO STAGE & GOOGLE-STYLE CENTRAL SEARCH BAR (Client Doc Spec)
          Brand Wordmark -> Central Search Bar with Voice Mic -> 6 Capability Pills
          ========================================================================== */}
      <main className="google-home-stage">
        {/* Brand Block */}
        <div className="google-brand-block">
          <div className="google-brand-wordmark">Z u n m e</div>
          <h1 className="google-brand-tagline">AI Workspace for Ideas, Content & Discovery.</h1>
          <p className="google-brand-subtitle">
            Search the web, create compelling content, and organize your work with AI-powered tools in one connected workspace.
          </p>
        </div>

        {/* Central Google-Style Rounded Search Bar (Doc Image 5) */}
        <div className="google-search-container" style={{ marginBottom: '26px' }}>
          <form onSubmit={handleGoogleSearchSubmit} className="google-search-bar">
            <div className="google-search-lens">
              <Search size={20} />
            </div>
            <input
              type="text"
              className="google-search-input-field"
              placeholder="Search the web, create compelling content, or ask AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="google-search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear query"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              className={`google-search-mic-btn ${isListening ? 'listening' : ''}`}
              onClick={handleToggleVoiceSearch}
              title={isListening ? "Listening... (Click to stop)" : "Voice Search (Live Mic)"}
            >
              <Mic size={20} />
              {isListening && <span className="mic-pulse-ring" />}
            </button>
          </form>

          {isListening && (
            <div className="voice-listening-indicator">
              <span className="voice-wave-dot" />
              <span className="voice-wave-dot" />
              <span className="voice-wave-dot" />
              <span>Listening for voice query... Speak now</span>
            </div>
          )}
        </div>

        {/* Caption directly under Search Bar */}
        <div className="google-hero-caption" style={{ marginTop: '0px', marginBottom: '18px' }}>
          <Sparkles size={15} />
          <span>Make AI Your Best Friend</span>
        </div>

        {/* The 6 Capability Launchers (Pill Row) */}
        <div className="google-capabilities-group">
          <div className="google-pills-row">
            <NavLink to="/login" className="google-capability-pill">
              <MessageSquare size={14} className="text-purple" />
              <span>AI Chat</span>
            </NavLink>
            <NavLink to="/search" className="google-capability-pill">
              <Search size={14} className="text-blue" />
              <span>Web Search</span>
            </NavLink>
            <NavLink to="/login" className="google-capability-pill">
              <PenTool size={14} className="text-indigo" />
              <span>AI Content Builders</span>
            </NavLink>
            <NavLink to="/warehouse" className="google-capability-pill">
              <Database size={14} className="text-amber" />
              <span>AI Warehouse</span>
            </NavLink>
            <NavLink to="/creator" className="google-capability-pill">
              <Wand2 size={14} className="text-pink" />
              <span>Creator Tools</span>
            </NavLink>
            <NavLink to="/seo" className="google-capability-pill">
              <TrendingUp size={14} className="text-emerald" />
              <span>SEO Workspace</span>
            </NavLink>
          </div>
          <p className="google-capabilities-caption">
            Dedicated AI capabilities organized into one seamless workspace. No tab hopping, no disconnected tools.
          </p>
        </div>
      </main>

      {/* ==========================================================================
          TASK 4: SIMPLE GOOGLE-STYLE SPLIT FOOTER (Client Doc Spec)
          Left: Advertising, Business, Make AI Work | Right: Privacy, Settings, Terms
          ========================================================================== */}
      <footer className="google-style-footer">
        <div className="google-footer-left">
          <NavLink to="/ads" className="google-footer-link">Advertising</NavLink>
          <NavLink to="/business" className="google-footer-link">Business</NavLink>
          <NavLink to="/make-ai-work" className="google-footer-link">Make AI Work</NavLink>
        </div>
        <div className="google-footer-right">
          <NavLink to="/privacy" className="google-footer-link">Privacy</NavLink>
          <div className="google-settings-wrap">
            <button
              type="button"
              className="google-footer-link google-footer-btn"
              onClick={() => setShowSettingsPopup(!showSettingsPopup)}
              aria-haspopup="true"
              aria-expanded={showSettingsPopup}
            >
              Settings
            </button>
            {showSettingsPopup && (
              <div className="google-settings-popup" role="menu">
                <NavLink to="/settings" className="settings-popup-item" onClick={() => setShowSettingsPopup(false)}>
                  <span>Search Settings</span>
                </NavLink>
                <NavLink to="/settings" className="settings-popup-item" onClick={() => setShowSettingsPopup(false)}>
                  <span>Voice &amp; Language</span>
                </NavLink>
                <NavLink to="/settings" className="settings-popup-item" onClick={() => setShowSettingsPopup(false)}>
                  <span>Speed Optimization</span>
                </NavLink>
                <NavLink to="/privacy" className="settings-popup-item" onClick={() => setShowSettingsPopup(false)}>
                  <span>Your Data in Search</span>
                </NavLink>
                <div className="settings-popup-divider" />
                <NavLink to="/settings" className="settings-popup-item font-semibold" onClick={() => setShowSettingsPopup(false)}>
                  <span>All Workspace Settings</span>
                </NavLink>
              </div>
            )}
          </div>
          <NavLink to="/terms" className="google-footer-link">Terms</NavLink>
        </div>
      </footer>

      {/* About Zunme AI Modal Dialog */}
      {showAboutModal && (
        <div className="about-modal-backdrop" onClick={() => setShowAboutModal(false)}>
          <div className="about-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/zunme_icon.png" alt="Zunme" style={{ width: '28px', height: '28px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1E293B', margin: 0 }}>About Zunme AI</h3>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: '50%' }}
                onClick={() => setShowAboutModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="about-modal-body">
              <p>
                <strong>Zunme AI</strong> is an all-in-one AI Workspace engineered for Ideas, Content & Discovery. It unites Conversational Chat, Live Web Search with verified citations, Content Studio blueprints, and Privacy-first ZBox communication into a single connected platform.
              </p>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>⚡ Engineering Philosophy & Speed</h4>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                  Websites built with clean, standard HTML and CSS tend to deliver the fastest load times. By eliminating unnecessary bloated scripts and keeping the entry page pure and focused, Zunme ensures instantaneous page responsiveness and superior search efficiency.
                </p>
              </div>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '14px', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#166534', marginBottom: '6px' }}>🔒 Privacy First</h4>
                <p style={{ fontSize: '13px', color: '#15803D', margin: 0 }}>
                  Unlike traditional ad-supported platforms that monitor user data, Zunme empowers individuals and small business owners with confidential workspace capabilities and private zBox email accounts.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAboutModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowAboutModal(false);
                    navigate('/studio');
                  }}
                >
                  Explore Workspace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};
