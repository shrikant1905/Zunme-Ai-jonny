import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  Copy,
  Bookmark,
  Check,
  FileText,
  Layers,
  Send,
  RefreshCw,
  Image as ImageIcon,
  Video,
  FileEdit
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentCategory, ContentFormat, ContentTone, ContentLength } from '../types';
import { ImageStudio } from '../components/studio/ImageStudio';
import { VideoScriptStudio } from '../components/studio/VideoScriptStudio';
import { DocumentCanvas } from '../components/studio/DocumentCanvas';
import '../components/studio/StudioStyles.css';
import './StudioPage.css';

const TONES: ContentTone[] = [
  'Professional',
  'Conversational',
  'Persuasive',
  'Bold & Direct',
  'Creative'
];

const LENGTHS: ContentLength[] = [
  'Short (~150 words)',
  'Medium (~500 words)',
  'Detailed (~1,000 words)'
];

export const StudioPage: React.FC = () => {
  const {
    generatedContent,
    isGeneratingContent,
    generateContent,
    saveToLibrary,
    showToast
  } = useApp();

  const [activeStudioMode, setActiveStudioMode] = useState<'text' | 'image' | 'video' | 'canvas'>('text');

  // Text Studio Form State
  const [category, setCategory] = useState<ContentCategory>('MARKETING');
  const [format, setFormat] = useState<ContentFormat>('EMAIL_NEWSLETTER');
  const [instructions, setInstructions] = useState(
    'Announcing our new eco-friendly water bottle brand launch for early creators with a 20% discount hook.'
  );
  const [tone, setTone] = useState<ContentTone>('Persuasive');
  const [length, setLength] = useState<ContentLength>('Medium (~500 words)');
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim() || isGeneratingContent) return;
    generateContent({
      category,
      format,
      instructions: instructions.trim(),
      tone,
      length
    });
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    setCopied(true);
    showToast('Generated content copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!generatedContent) return;
    saveToLibrary({
      title: generatedContent.title,
      contentType: generatedContent.category,
      previewText: generatedContent.content.slice(0, 140) + '...',
      content: generatedContent.content,
      tags: [generatedContent.category, generatedContent.format.replace('_', ' ')]
    });
  };

  return (
    <div className="studio-page">
      {/* Studio Header */}
      <div className="studio-header-area">
        <h1 className="studio-title">Multi-Modal Content Studio</h1>
        <p className="studio-desc">
          Generate structured text articles, high-fidelity AI diffusion visuals, scene-by-scene video scripts, and rich canvas documents.
        </p>
      </div>

      {/* Studio Mode Navigation */}
      <div className="studio-tab-bar" style={{ marginBottom: '24px' }}>
        <button
          className={`studio-nav-pill ${activeStudioMode === 'text' ? 'active' : ''}`}
          onClick={() => setActiveStudioMode('text')}
        >
          <PenTool size={15} />
          <span>Text &amp; Copy Engine</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioMode === 'image' ? 'active' : ''}`}
          onClick={() => setActiveStudioMode('image')}
        >
          <ImageIcon size={15} />
          <span>AI Image Diffusion</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioMode === 'video' ? 'active' : ''}`}
          onClick={() => setActiveStudioMode('video')}
        >
          <Video size={15} />
          <span>Video Script Engine</span>
        </button>

        <button
          className={`studio-nav-pill ${activeStudioMode === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveStudioMode('canvas')}
        >
          <FileEdit size={15} />
          <span>Rich Document Canvas</span>
        </button>
      </div>

      {/* Sub-Views */}
      {activeStudioMode === 'image' && <ImageStudio />}
      {activeStudioMode === 'video' && <VideoScriptStudio />}
      {activeStudioMode === 'canvas' && <DocumentCanvas />}

      {activeStudioMode === 'text' && (
        <div className="studio-layout-grid">
          {/* Form Card */}
          <div className="studio-form-card">
            {/* Category Tabs */}
            <div className="category-toggle-tabs">
              <button
                type="button"
                className={`category-tab-btn ${category === 'TEXT' ? 'active' : ''}`}
                onClick={() => {
                  setCategory('TEXT');
                  setFormat('BLOG_OUTLINE');
                }}
              >
                Text &amp; Articles
              </button>
              <button
                type="button"
                className={`category-tab-btn ${category === 'MARKETING' ? 'active' : ''}`}
                onClick={() => {
                  setCategory('MARKETING');
                  setFormat('EMAIL_NEWSLETTER');
                }}
              >
                Marketing &amp; Campaigns
              </button>
            </div>

            <form onSubmit={handleGenerate} className="studio-form">
              {/* Format Selection */}
              <div className="form-group">
                <label className="form-label">Content Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as ContentFormat)}
                  className="input-field"
                >
                  {category === 'TEXT' ? (
                    <>
                      <option value="BLOG_OUTLINE">Blog Article Outline</option>
                      <option value="ARTICLE_SECTION">Pillar Article Section</option>
                      <option value="VIDEO_SCRIPT">YouTube Script Outline</option>
                    </>
                  ) : (
                    <>
                      <option value="EMAIL_NEWSLETTER">Email Newsletter / Sequence</option>
                      <option value="SOCIAL_CAPTION">Viral Social Media Hook &amp; Caption</option>
                      <option value="PRODUCT_AD">High-Converting Direct Response Ad</option>
                    </>
                  )}
                </select>
              </div>

              {/* Instructions Prompt */}
              <div className="form-group">
                <label className="form-label">Topic &amp; Specific Directives</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={5}
                  placeholder="Describe your subject, key selling points, target avatar, and required CTA..."
                  className="input-field studio-textarea"
                  required
                />
              </div>

              {/* Tone & Length in 2 Columns */}
              <div className="studio-meta-grid">
                <div className="form-group">
                  <label className="form-label">Brand Voice &amp; Tone</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as ContentTone)}
                    className="input-field"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Output Length</label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value as ContentLength)}
                    className="input-field"
                  >
                    {LENGTHS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGeneratingContent || !instructions.trim()}
                className="btn btn-primary btn-block studio-submit-btn"
              >
                {isGeneratingContent ? (
                  <>
                    <RefreshCw size={17} className="spinner" />
                    <span>Synthesizing Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    <span>Generate Structured Copy</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output Display Card */}
          <div className="studio-output-card">
            <div className="output-card-header">
              <div className="output-header-left">
                <FileText size={18} className="output-header-icon" />
                <span className="output-header-title">
                  {generatedContent ? generatedContent.title : 'Generated Content Preview'}
                </span>
              </div>

              {generatedContent && (
                <div className="output-actions">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn btn-outline btn-sm action-btn"
                    title="Copy content"
                  >
                    {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveToLibrary}
                    className="btn btn-primary btn-sm action-btn"
                    title="Save to Library"
                  >
                    <Bookmark size={14} />
                    <span>Save to Library</span>
                  </button>
                </div>
              )}
            </div>

            <div className="output-card-body">
              {isGeneratingContent ? (
                <div className="output-placeholder-state">
                  <div className="generating-pulse-box">
                    <RefreshCw size={28} className="spinner text-primary" />
                  </div>
                  <p className="placeholder-title">Synthesizing High-Impact Draft...</p>
                  <p className="placeholder-sub">
                    Structuring hook, core narrative points, tone calibration, and closing call-to-action.
                  </p>
                </div>
              ) : generatedContent ? (
                <div className="generated-content-flow">
                  <div className="content-metadata-bar">
                    <span className="meta-badge">{generatedContent.category}</span>
                    <span className="meta-badge">{generatedContent.format.replace('_', ' ')}</span>
                    <span className="meta-badge">{generatedContent.tone}</span>
                    <span className="meta-badge">{generatedContent.wordCount} words</span>
                  </div>
                  <div className="content-render-area">
                    {generatedContent.content.split('\n\n').map((para, idx) => (
                      <p key={idx} className="content-paragraph">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="output-placeholder-state">
                  <div className="empty-icon-wrap">
                    <Layers size={28} />
                  </div>
                  <p className="placeholder-title">No Content Generated Yet</p>
                  <p className="placeholder-sub">
                    Choose a format on the left, enter your topic parameters, and generate production-ready drafts in seconds.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
