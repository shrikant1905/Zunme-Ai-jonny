import React, { useState, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  PenTool,
  Search,
  Sparkles,
  Copy,
  Bookmark,
  Check,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Lock,
  Layers,
  CheckCircle2,
  X,
  LogIn,
  SlidersHorizontal,
  Bot,
  Zap,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  CLIENT_TEMPLATE_CATEGORIES,
  TEMPLATES_CATALOG,
  ToolTemplate
} from './user/toolsCatalogData';
import { ContentTone, ContentLength } from '../types';
import './PublicStudioPage.css';

export interface PlatformFilterItem {
  id: string;
  name: string;
  icon: string;
  keywords?: string[];
}

export const PLATFORM_QUICK_FILTERS: PlatformFilterItem[] = [
  { id: 'all', name: 'All Platforms', icon: '🌐' },
  { id: 'youtube', name: 'YouTube', icon: '▶️', keywords: ['youtube', 'yt', 'channel video', 'video script', 'video tags', 'video title'] },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', keywords: ['tiktok', 'tik tok', 'short video', 'reels', 'hook generator', 'dance'] },
  { id: 'amazon', name: 'Amazon', icon: '📦', keywords: ['amazon', 'product description', 'listing', 'ecommerce', 'e-commerce', 'bullet points'] },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', keywords: ['linkedin', 'professional bio', 'connection request', 'carousel', 'recommendation'] },
  { id: 'x', name: 'X / Twitter', icon: '𝕏', keywords: ['twitter', 'tweet', 'threads', 'thread', ' x ', 'x post'] },
  { id: 'google', name: 'Google', icon: '🔍', keywords: ['google', 'seo', 'serp', 'sheets & excel', 'search ad'] },
  { id: 'instagram', name: 'Instagram', icon: '📸', keywords: ['instagram', 'ig', 'caption', 'hashtag', 'reels', 'story'] },
  { id: 'facebook', name: 'Facebook', icon: '👥', keywords: ['facebook', 'fb', 'fan page'] }
];

export const PublicStudioPage: React.FC = () => {
  const { user, generatedContent, isGeneratingContent, generateContent, saveToLibrary, showToast } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<ToolTemplate>(TEMPLATES_CATALOG[0]);
  const [visibleLimit, setVisibleLimit] = useState<number>(24);

  // Form State
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState<ContentTone>('Professional');
  const [length, setLength] = useState<ContentLength>('Medium (~500 words)');
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_CATALOG.filter((t) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        t.templateCategory.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPlatform =
        selectedPlatform === 'all' ||
        (() => {
          const filterDef = PLATFORM_QUICK_FILTERS.find((p) => p.id === selectedPlatform);
          if (!filterDef || !filterDef.keywords) return true;
          const fullText = `${t.name} ${t.description} ${t.templateCategory}`.toLowerCase();
          return filterDef.keywords.some((kw) => fullText.includes(kw.toLowerCase()));
        })();

      const matchesSearch =
        !searchQuery ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.templateCategory.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesPlatform && matchesSearch;
    });
  }, [selectedCategory, selectedPlatform, searchQuery]);

  const displayedTemplates = useMemo(() => {
    if (selectedCategory === 'All' && selectedPlatform === 'all' && !searchQuery) {
      return filteredTemplates.slice(0, visibleLimit);
    }
    return filteredTemplates;
  }, [filteredTemplates, selectedCategory, selectedPlatform, searchQuery, visibleLimit]);

  const handleSelectTemplate = (tpl: ToolTemplate) => {
    setSelectedTemplate(tpl);
    const generatorElem = document.getElementById('generator-workspace-pane');
    if (generatorElem) {
      generatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim()) {
      showToast('Please enter a brief topic or instructions first', 'warning');
      return;
    }

    generateContent({
      category: selectedTemplate.category,
      format: selectedTemplate.format,
      instructions: instructions.trim(),
      tone,
      length
    });
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    showToast('Copied content to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveClick = () => {
    if (!generatedContent) return;
    if (!user) {
      // User is not logged in: Prompt sign-in modal as required by client doc
      setShowAuthModal(true);
      return;
    }

    saveToLibrary({
      title: generatedContent.title,
      contentType: generatedContent.category,
      content: generatedContent.content,
      previewText: generatedContent.content.slice(0, 140) + '...',
      tags: [selectedTemplate.format.replace('_', ' '), selectedTemplate.templateCategory, tone]
    });
    showToast('Saved to your personal workspace library!', 'success');
  };

  return (
    <div className="public-studio-page">
      {/* Background Atmosphere Layers */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Public Header */}
      <header className="public-studio-topbar">
        <div className="public-studio-container public-studio-topbar-inner">
          <div className="public-studio-brand-group">
            <NavLink to="/" className="public-studio-brand">
              <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '34px', width: 'auto' }} />
            </NavLink>
            <div className="public-studio-divider" />
            <div className="public-studio-badge">
              <PenTool size={14} color="#6E56CF" />
              <span>Interactive Content Studio</span>
            </div>
          </div>

          <div className="public-studio-topbar-actions">
            <NavLink to="/" className="public-studio-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            {user ? (
              <NavLink to="/user/builders" className="public-studio-signin-btn">
                Workspace Dashboard
              </NavLink>
            ) : (
              <NavLink to="/login" className="public-studio-signin-btn">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="public-studio-main">
        <div className="public-studio-container">
          {/* Hero Banner */}
          <section className="public-studio-hero">
            <div className="public-studio-pill">
              <Sparkles size={14} color="#6E56CF" />
              <span>Client Specification • Initiate &amp; Create AI Content Freely</span>
            </div>
            <h1 className="public-studio-title">Interactive Content Builders</h1>
            <p className="public-studio-subtitle">
              Browse 350+ structured AI generation blueprints across 19 categories. Initiate ideas, generate high-converting copy, and preview results for free. Sign in when ready to save files to your personal library.
            </p>

            {/* Client Business Rule Banner */}
            <div className="public-studio-rule-banner">
              <Zap size={18} color="#D97706" />
              <div>
                <strong>Limited Free Creation Platform:</strong> Anyone can initiate and create content with our AI blueprints. To save results to your project workspace or export assets, sign in to your Zunme account.
              </div>
            </div>
          </section>

          {/* Quick Platform Filters */}
          <section className="studio-platform-filter-bar">
            {PLATFORM_QUICK_FILTERS.map((plat) => (
              <button
                key={plat.id}
                type="button"
                className={`studio-platform-pill ${selectedPlatform === plat.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedPlatform(plat.id);
                  setVisibleLimit(24);
                }}
              >
                <span>{plat.icon}</span>
                <span>{plat.name}</span>
              </button>
            ))}
          </section>

          {/* Category Tabs & Search Bar */}
          <section className="studio-controls-strip">
            <div className="studio-search-wrap">
              <Search size={16} color="#94A3B8" />
              <input
                type="text"
                placeholder="Search templates (e.g., Cold Email, YouTube Hook, Ad Copy, Product Description)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="studio-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="studio-category-scroller">
              {CLIENT_TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`studio-category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleLimit(24);
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                  <span className="cat-count">({cat.count})</span>
                </button>
              ))}
            </div>
          </section>

          {/* Catalog Grid */}
          <section className="studio-templates-grid">
            {displayedTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className={`studio-tpl-card ${selectedTemplate.id === tpl.id ? 'selected' : ''}`}
                onClick={() => handleSelectTemplate(tpl)}
              >
                <div className="studio-tpl-icon-box">
                  <span>{tpl.icon || '✨'}</span>
                </div>
                <div className="studio-tpl-info">
                  <div className="studio-tpl-badge">{tpl.templateCategory}</div>
                  <h3 className="studio-tpl-name">{tpl.name}</h3>
                  <p className="studio-tpl-desc">{tpl.description}</p>
                </div>
                <button type="button" className="studio-tpl-use-btn">
                  <span>Try Builder</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </section>

          {displayedTemplates.length < filteredTemplates.length && (
            <div className="studio-load-more-wrap">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setVisibleLimit((prev) => prev + 24)}
              >
                Load More Templates ({filteredTemplates.length - displayedTemplates.length} remaining)
              </button>
            </div>
          )}

          {/* Live Generator Pane */}
          <section className="studio-generator-pane" id="generator-workspace-pane">
            <div className="generator-pane-header">
              <div className="generator-header-title">
                <span className="tpl-active-emoji">{selectedTemplate.icon || '⚡'}</span>
                <div>
                  <h2>{selectedTemplate.name}</h2>
                  <p>{selectedTemplate.description}</p>
                </div>
              </div>
              <div className="generator-tpl-meta">
                <span>Format: {selectedTemplate.format.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="generator-grid">
              {/* Form Side */}
              <form onSubmit={handleGenerate} className="generator-form">
                <div className="form-group">
                  <label htmlFor="tpl-instructions">What would you like to create?</label>
                  <textarea
                    id="tpl-instructions"
                    rows={4}
                    placeholder={selectedTemplate.promptPlaceholder || 'Describe your product, topic, audience or goal...'}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                  />
                </div>

                <div className="generator-params-row">
                  <div className="form-group flex-1">
                    <label>Tone</label>
                    <select value={tone} onChange={(e) => setTone(e.target.value as ContentTone)}>
                      <option value="Professional">Professional</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Persuasive">Persuasive</option>
                      <option value="Bold & Direct">Bold &amp; Direct</option>
                      <option value="Creative">Creative</option>
                    </select>
                  </div>

                  <div className="form-group flex-1">
                    <label>Output Length</label>
                    <select value={length} onChange={(e) => setLength(e.target.value as ContentLength)}>
                      <option value="Short (~150 words)">Short (~150 words)</option>
                      <option value="Medium (~500 words)">Medium (~500 words)</option>
                      <option value="Detailed (~1,000 words)">Detailed (~1,000 words)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={isGeneratingContent || !instructions.trim()}
                >
                  {isGeneratingContent ? (
                    <>
                      <RefreshCw size={16} className="spin-animate" />
                      <span>Generating with Zunme AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Generate Content (Free)</span>
                    </>
                  )}
                </button>
              </form>

              {/* Live Output Side */}
              <div className="generator-output-box">
                <div className="output-box-header">
                  <span>AI Result</span>
                  {generatedContent && (
                    <div className="output-actions">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={handleCopy}
                        title="Copy to clipboard"
                      >
                        {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handleSaveClick}
                        title="Save to Personal Library"
                      >
                        <Bookmark size={14} />
                        <span>Save to Library</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="output-content-area">
                  {isGeneratingContent ? (
                    <div className="output-loading-state">
                      <div className="cosmic-spinner" />
                      <p>Drafting structured content with Zunme AI...</p>
                    </div>
                  ) : generatedContent ? (
                    <div className="output-markdown-view">
                      <h3>{generatedContent.title}</h3>
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#334155' }}>
                        {generatedContent.content}
                      </div>
                    </div>
                  ) : (
                    <div className="output-empty-state">
                      <Bot size={36} color="#94A3B8" />
                      <p>Enter your instructions on the left and click <strong>Generate Content</strong> to initiate AI generation.</p>
                      <span className="output-hint">No login required to generate preview.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Google-Style Public Footer */}
      <footer className="google-style-footer public-studio-footer">
        <div className="google-footer-left">
          <NavLink to="/ads" className="google-footer-link">Advertising</NavLink>
          <NavLink to="/business" className="google-footer-link">Business</NavLink>
          <NavLink to="/make-ai-work" className="google-footer-link">Make AI Work</NavLink>
        </div>
        <div className="google-footer-right">
          <NavLink to="/privacy" className="google-footer-link">Privacy</NavLink>
          <NavLink to="/settings" className="google-footer-link">Settings</NavLink>
          <NavLink to="/terms" className="google-footer-link">Terms</NavLink>
        </div>
      </footer>

      {/* Sign-In Prompt Modal (Triggered when non-logged-in user clicks Save to Library) */}
      {showAuthModal && (
        <div className="studio-modal-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="studio-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="studio-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="studio-modal-icon-wrap">
                  <Lock size={18} color="#6E56CF" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#1E293B' }}>
                  Sign In to Save Content
                </h3>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: '50%' }}
                onClick={() => setShowAuthModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="studio-modal-body">
              <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
                According to Zunme&apos;s product model, you can freely initiate and create AI content. To save this generated result to your <strong>Personal Workspace Library</strong>, export it, or sync with your projects, please sign in to your Zunme account.
              </p>

              <div className="studio-modal-asset-preview">
                <span className="preview-label">Current Draft:</span>
                <strong className="preview-title">{generatedContent?.title || selectedTemplate.name}</strong>
              </div>

              <div className="studio-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAuthModal(false)}
                >
                  Continue Editing
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate('/login?redirect=/studio')}
                >
                  <LogIn size={15} />
                  <span>Sign In / Create Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
