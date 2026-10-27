import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PenTool,
  Search,
  Filter,
  Sparkles,
  Copy,
  Bookmark,
  Check,
  RefreshCw,
  FileText,
  FileSpreadsheet,
  Share2,
  Briefcase,
  SearchCheck,
  Palette,
  ArrowRight,
  Video,
  Music,
  Award,
  Building2,
  Mail,
  Tv,
  Heart,
  Users,
  Image as ImageIcon,
  Building,
  Target,
  Flame,
  GraduationCap,
  FlaskConical,
  DollarSign,
  MessageCircle,
  Star,
  Edit3,
  Bot,
  LayoutGrid,
  Zap,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  ContentCategory,
  ContentFormat,
  ContentTone,
  ContentLength
} from '../../types';
import '../../styles/dashboard.css';
import { ImageStudio } from '../../components/studio/ImageStudio';
import { VideoScriptStudio } from '../../components/studio/VideoScriptStudio';
import { DocumentCanvas } from '../../components/studio/DocumentCanvas';
import { SpreadsheetStudio } from '../../components/studio/SpreadsheetStudio';
import '../../components/studio/StudioStyles.css';

import {
  CLIENT_TEMPLATE_CATEGORIES,
  TEMPLATES_CATALOG,
  ToolTemplate,
  CategoryCardDef
} from './toolsCatalogData';
import { AudioPreviewWidget } from '../../components/studio/AudioPreviewWidget';

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

export const UserContentBuildersPage: React.FC = () => {
  const {
    generatedContent,
    isGeneratingContent,
    generateContent,
    saveToLibrary,
    showToast
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const validTabs = ['templates', 'images', 'video', 'canvas', 'spreadsheets'] as const;
  type StudioTabType = typeof validTabs[number];
  const urlTab = searchParams.get('tab') as StudioTabType;

  const [activeStudioTab, setActiveStudioTabState] = useState<StudioTabType>(
    urlTab && validTabs.includes(urlTab) ? urlTab : 'templates'
  );

  useEffect(() => {
    const tabParam = searchParams.get('tab') as StudioTabType;
    if (tabParam && validTabs.includes(tabParam) && tabParam !== activeStudioTab) {
      setActiveStudioTabState(tabParam);
    }
  }, [searchParams]);

  const setActiveStudioTab = (tab: StudioTabType) => {
    setActiveStudioTabState(tab);
    setSearchParams(tab === 'templates' ? {} : { tab });
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<ToolTemplate>(TEMPLATES_CATALOG[0]);
  const [visibleLimit, setVisibleLimit] = useState<number>(36);

  // Form State
  const [instructions, setInstructions] = useState('');
  const [tone, setTone] = useState<ContentTone>('Professional');
  const [length, setLength] = useState<ContentLength>('Medium (~500 words)');
  const [copied, setCopied] = useState(false);

  // Filter templates by selected category, platform, and search text
  const filteredTemplates = TEMPLATES_CATALOG.filter((t) => {
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

  const displayedTemplates =
    selectedCategory === 'All' && selectedPlatform === 'all' && !searchQuery
      ? filteredTemplates.slice(0, visibleLimit)
      : filteredTemplates;

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleLimit(36);
  };

  const handlePlatformSelect = (platId: string) => {
    setSelectedPlatform(platId);
    setVisibleLimit(36);
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPlatform('all');
    setSearchQuery('');
    setVisibleLimit(36);
  };

  const handleSelectTemplate = (tpl: ToolTemplate) => {
    setSelectedTemplate(tpl);
    if (!instructions) {
      setInstructions('');
    }
    // Smooth scroll down to generator panel
    const generatorElem = document.getElementById('generator-workspace-pane');
    if (generatorElem) {
      generatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim()) {
      showToast('Please enter your topic or instructions first', 'warning');
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

  const handleSave = () => {
    if (!generatedContent) return;
    saveToLibrary({
      title: generatedContent.title,
      contentType: generatedContent.category,
      content: generatedContent.content,
      previewText: generatedContent.content.slice(0, 140) + '...',
      tags: [selectedTemplate.format.replace('_', ' '), selectedTemplate.templateCategory, tone]
    });
  };

  const handleOpenInCanvas = () => {
    setActiveStudioTab('canvas');
    showToast('Switched to Rich Document Canvas', 'info');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <PenTool size={26} color="#A78BFA" />
            AI Content Builders &amp; Templates
          </h1>
          <p className="dashboard-subtitle">
            Search 1,000+ structured generation blueprints or click any category icon below to generate production-ready copy, scripts, and business frameworks.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary" style={{ padding: '8px 14px', fontSize: '13px' }}>
            <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
            19 Core Creative &amp; Business Categories
          </div>
        </div>
      </div>

      {/* Studio Mode Navigation */}
      <div className="studio-tab-bar">
        <button
          className={`studio-nav-pill ${activeStudioTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('templates')}
        >
          <PenTool size={15} />
          <span>Templates Catalog (19 Categories)</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('images')}
        >
          <Sparkles size={15} />
          <span>AI Image Studio</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('video')}
        >
          <Video size={15} />
          <span>Video Script Engine</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('canvas')}
        >
          <FileText size={15} />
          <span>Rich Document Canvas</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioTab === 'spreadsheets' ? 'active' : ''}`}
          onClick={() => setActiveStudioTab('spreadsheets')}
        >
          <FileSpreadsheet size={15} />
          <span>Spreadsheet &amp; Data Studio</span>
        </button>
      </div>

      {activeStudioTab === 'images' && <ImageStudio />}
      {activeStudioTab === 'video' && <VideoScriptStudio />}
      {activeStudioTab === 'canvas' && <DocumentCanvas />}
      {activeStudioTab === 'spreadsheets' && <SpreadsheetStudio />}

      {activeStudioTab === 'templates' && (
        <>
          {/* ============================================================ */}
          {/* CLIENT SPECIFICATION: Search for templates or click on icon   */}
          {/* ============================================================ */}
          <div className="glass-panel" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SearchCheck size={18} color="#6E56CF" />
                  Search for templates or click on icon:
                </h2>
                <p style={{ fontSize: '13px', color: '#5F6B85', margin: '4px 0 0 0' }}>
                  Filter directly by industry or search by topic, role, or content format.
                </p>
              </div>

              {/* Live Search Input */}
              <div className="search-box-wrap" style={{ minWidth: 'min(100%, 320px)', margin: 0 }}>
                <Search size={16} />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Type to search blueprints (e.g. Sales, Podcast, Email)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Exact 19 PDF Category Icons Grid / Carousel */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '8px',
                maxHeight: '260px',
                overflowY: 'auto',
                padding: '4px',
                scrollbarWidth: 'thin'
              }}
            >
              {CLIENT_TEMPLATE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '10px 8px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #6E56CF' : '1px solid #E8ECF5',
                      background: isSelected ? '#F5EFFF' : '#FFFFFF',
                      boxShadow: isSelected ? '0 4px 14px rgba(110,86,207,0.18)' : '0 1px 3px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '20px', lineHeight: '1.2' }}>{cat.emoji}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: isSelected ? '800' : '600',
                        color: isSelected ? '#6E56CF' : '#111625',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '115px'
                      }}
                      title={cat.name}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* P3: Platform Quick Filters Bar */}
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #F0F3FA' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#111625', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Share2 size={13} color="#6E56CF" />
                  Filter by Target Platform:
                </span>
                {selectedPlatform !== 'all' && (
                  <button
                    className="btn-ghost"
                    onClick={() => setSelectedPlatform('all')}
                    style={{ fontSize: '11px', color: '#6E56CF', padding: '2px 6px' }}
                  >
                    Reset Platform Filter
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'thin' }}>
                {PLATFORM_QUICK_FILTERS.map((plat) => {
                  const isActive = selectedPlatform === plat.id;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => handlePlatformSelect(plat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: isActive ? '700' : '500',
                        border: isActive ? '1px solid #6E56CF' : '1px solid #E8ECF5',
                        background: isActive ? '#6E56CF' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : '#475467',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 2px 8px rgba(110,86,207,0.25)' : 'none'
                      }}
                    >
                      <span>{plat.icon}</span>
                      <span>{plat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Status Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #F0F3FA', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '13px', color: '#5F6B85' }}>
                Showing <strong>{filteredTemplates.length}</strong> blueprints in{' '}
                <strong style={{ color: '#6E56CF' }}>{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</strong>
                {selectedPlatform !== 'all' && (
                  <span>
                    {' '}• Platform: <strong style={{ color: '#6E56CF' }}>{PLATFORM_QUICK_FILTERS.find((p) => p.id === selectedPlatform)?.name}</strong>
                  </span>
                )}
                {searchQuery && <span> matching "{searchQuery}"</span>}
              </div>

              {(selectedCategory !== 'All' || selectedPlatform !== 'all' || searchQuery) && (
                <button
                  className="btn-ghost"
                  onClick={handleClearAllFilters}
                  style={{ fontSize: '12px', color: '#6E56CF', padding: '4px 8px', fontWeight: '700' }}
                >
                  Clear All Filters (Reset)
                </button>
              )}
            </div>
          </div>

          {/* Template Selector Grid */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            {filteredTemplates.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E8ECF5'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#F5EFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}
                >
                  <Search size={22} color="#6E56CF" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  No Matching Blueprints Found
                </h3>
                <p style={{ fontSize: '13px', color: '#5F6B85', maxWidth: '420px', margin: '0 auto 16px' }}>
                  No templates match category "{selectedCategory}", platform "{selectedPlatform}", and query "{searchQuery}".
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleClearAllFilters}
                >
                  Reset All Filters &amp; View Catalog
                </button>
              </div>
            ) : (
              <div className="cards-grid-3">
              {displayedTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className="glass-panel"
                  style={{
                    cursor: 'pointer',
                    borderColor: selectedTemplate.id === tpl.id ? '#6E56CF' : undefined,
                    background: selectedTemplate.id === tpl.id ? '#FAF7FF' : '#FFFFFF',
                    boxShadow: selectedTemplate.id === tpl.id ? '0 8px 24px rgba(110, 86, 207, 0.16)' : undefined,
                    transition: 'all 0.18s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '24px' }}>{tpl.icon}</span>
                      <span className="badge badge-neutral" style={{ fontSize: '10px', fontWeight: '700' }}>
                        {tpl.templateCategory}
                      </span>
                    </div>
                    {tpl.badge && <span className="badge badge-primary">{tpl.badge}</span>}
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                    {tpl.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4', marginBottom: '12px' }}>
                    {tpl.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #F0F3FA' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#8B5CF6' }}>
                      {tpl.format.replace('_', ' ')}
                    </span>
                    <button
                      className="btn btn-outline btn-sm"
                      style={{
                        padding: '4px 10px',
                        fontSize: '11px',
                        borderColor: selectedTemplate.id === tpl.id ? '#6E56CF' : undefined,
                        color: selectedTemplate.id === tpl.id ? '#6E56CF' : undefined
                      }}
                    >
                      {selectedTemplate.id === tpl.id ? 'Selected' : 'Use Blueprint →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

            {selectedCategory === 'All' && !searchQuery && filteredTemplates.length > visibleLimit && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  className="btn btn-outline"
                  onClick={() => setVisibleLimit((prev) => prev + 36)}
                  style={{ padding: '10px 28px', fontSize: '13px', fontWeight: '700', borderRadius: '12px', background: '#FFFFFF' }}
                >
                  Load More Blueprints ({filteredTemplates.length - visibleLimit} remaining) &darr;
                </button>
              </div>
            )}
          </div>

          {/* ============================================================ */}
          {/* GENERATOR WORKSPACE PANE                                    */}
          {/* ============================================================ */}
          <div id="generator-workspace-pane" className="cards-grid-2">
            {/* Input Configuration Card */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <Sparkles size={18} color="#6E56CF" />
                  Blueprint Generator: {selectedTemplate.name}
                </div>
                <span className="badge badge-primary">{selectedTemplate.templateCategory}</span>
              </div>

              <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#111625' }}>
                      Topic, Context &amp; Instructions
                    </label>
                    <span style={{ fontSize: '11px', color: '#5F6B85' }}>Be as specific as possible</span>
                  </div>
                  <textarea
                    className="input-field"
                    rows={5}
                    placeholder={selectedTemplate.promptPlaceholder}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                      Tone of Voice
                    </label>
                    <select
                      className="input-field"
                      value={tone}
                      onChange={(e) => setTone(e.target.value as ContentTone)}
                    >
                      <option value="Professional">Professional</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Persuasive">Persuasive</option>
                      <option value="Bold & Direct">Bold & Direct</option>
                      <option value="Creative">Creative</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                      Target Length
                    </label>
                    <select
                      className="input-field"
                      value={length}
                      onChange={(e) => setLength(e.target.value as ContentLength)}
                    >
                      <option value="Short (~150 words)">Short (~150 words)</option>
                      <option value="Medium (~500 words)">Medium (~500 words)</option>
                      <option value="Detailed (~1,000 words)">Detailed (~1,000 words)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isGeneratingContent}
                  style={{ marginTop: '8px' }}
                >
                  {isGeneratingContent ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Generating Structured Copy with Zunme AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Generate Content &rarr;</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Output Canvas */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="panel-header">
                <div className="panel-title">
                  <FileText size={18} color="#059669" />
                  Generated Output Canvas
                </div>
                {generatedContent && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-outline btn-sm" onClick={handleCopy}>
                      {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleSave}>
                      <Bookmark size={13} />
                      <span>Save</span>
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={handleOpenInCanvas} title="Edit in rich canvas">
                      <Edit3 size={13} />
                      <span>Canvas</span>
                    </button>
                  </div>
                )}
              </div>

              {/* P1: Audio and Music Preview UI for Audio Blueprints */}
              {(selectedTemplate.templateCategory === 'Audio & Music' ||
                (generatedContent && (generatedContent.title.toLowerCase().includes('audio') || generatedContent.title.toLowerCase().includes('song') || generatedContent.title.toLowerCase().includes('sound')))) && (
                <div style={{ marginBottom: '14px' }}>
                  <AudioPreviewWidget
                    title={generatedContent ? `${generatedContent.title} (Audio Preview)` : `${selectedTemplate.name} Synthesized Demo`}
                    artist="Zunme AI Acoustic Studio"
                    durationSeconds={48}
                  />
                </div>
              )}

              {generatedContent ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5F6B85', borderBottom: '1px solid #E8ECF5', paddingBottom: '8px' }}>
                    <span>Format: <strong>{generatedContent.format}</strong></span>
                    <span>Word Count: <strong>{generatedContent.wordCount} words</strong></span>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '10px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      overflowY: 'auto',
                      maxHeight: '380px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      color: '#272F3E'
                    }}
                  >
                    {generatedContent.content}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#5F6B85',
                    padding: '48px 24px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: '#EFEBFC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}
                  >
                    <Sparkles size={22} color="#6E56CF" />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Ready to Draft
                  </h4>
                  <p style={{ fontSize: '13px', maxWidth: '320px' }}>
                    Select any blueprint from the 19 categories above, enter your topic or target context, and click Generate Content.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
