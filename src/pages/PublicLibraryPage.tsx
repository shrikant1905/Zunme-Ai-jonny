import React, { useState, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  FileText,
  Bookmark,
  Copy,
  Check,
  Eye,
  ArrowLeft,
  Sparkles,
  Download,
  ExternalLink,
  Lock,
  Plus,
  X,
  Tag,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DocumentsLibraryIcon } from '../components/common/ClientDocIcons';
import './PublicLibraryPage.css';

interface PublicDocumentItem {
  id: string;
  title: string;
  category: 'RESEARCH' | 'MARKETING' | 'STRATEGY' | 'BLUEPRINT' | 'TECHNICAL';
  categoryLabel: string;
  previewText: string;
  content: string;
  tags: string[];
  wordCount: number;
  readTime: string;
  updatedAt: string;
  citations?: Array<{
    title: string;
    url: string;
    domain: string;
  }>;
}

const PUBLIC_SAMPLE_DOCUMENTS: PublicDocumentItem[] = [
  {
    id: 'doc_1',
    title: 'Global Energy Storage Review & Solid-State Battery Analysis 2026',
    category: 'RESEARCH',
    categoryLabel: 'Research & Analysis',
    previewText: 'Comprehensive research briefing on automotive solid-state battery deployment, 480 Wh/kg cell testing protocols, and cathode stabilization under mechanical stress...',
    content: `# Global Energy Storage Review & Solid-State Battery Analysis (2026)

## Executive Summary
In early 2026, leading clean mobility consortiums finalized standardized durability testing protocols for 480 Wh/kg solid-state lithium-metal battery cells. This briefing compiles verified market research, energy density milestones, and industrial commercialization timelines.

### Key Milestones:
1. **Volumetric Density:** Production-ready solid-state cells have achieved 1,050 Wh/L volumetric energy density, enabling 600+ mile EV ranges without pack weight penalties.
2. **Thermal Safety:** Solid composite ceramic-polymer electrolytes exhibit zero thermal runaway risk up to 210°C in nail-penetration safety trials.
3. **Silicon-Composite Cathodes:** Eliminates dendrite formation through pre-lithiated alloy architectures.

### Industrial Production Outlook:
- **Pilot Phase (Q2 2026):** Low-volume validation runs for aerospace and high-performance automotive platforms.
- **Volume Manufacturing (2027):** Estimated manufacturing cost parity with standard NMC-811 cells reaching $82/kWh.

*Research grounded via verified real-time sources in Zunme AI Research Engine.*`,
    tags: ['Batteries', 'CleanTech', 'Energy', 'Automotive'],
    wordCount: 840,
    readTime: '4 min read',
    updatedAt: 'Updated Today',
    citations: [
      {
        title: 'Global Energy Storage Review 2026',
        url: 'https://energystorage-review.org/solid-state-trials',
        domain: 'energystorage-review.org'
      },
      {
        title: 'CleanTech Innovation Index',
        url: 'https://cleantech-index.com/battery-advancements',
        domain: 'cleantech-index.com'
      }
    ]
  },
  {
    id: 'doc_2',
    title: 'Eco-Bottle Product Launch Newsletter Copy & Cold Outreach Sequence',
    category: 'MARKETING',
    categoryLabel: 'Marketing & Copy',
    previewText: 'High-converting email campaign framework designed to drive 38%+ open rates and 12% click-throughs for direct-to-consumer hardware product launches...',
    content: `# Eco-Bottle Launch Campaign Framework & Email Sequence

## Sequence 1: VIP Founder Announcement
**Subject Line:** Say Goodbye to Single-Use Plastic Forever 🌿
**Preview Text:** Meet the modular bottle engineered to last a lifetime...

Hey {{FirstName}},

Every year, 38 billion single-use bottles end up in landfills. We thought it was time someone engineered a permanent solution.

Introducing **AeroFlask** — the world's first vacuum-insulated, modular bottle forged from 100% aerospace-grade recycled titanium.

- **Ice Cold for 36 Hours:** Dual-wall thermal isolation vacuum chamber.
- **100% Magnetic Seal:** Zero spills, one-hand quick click access.
- **Modular Infuser Base:** Brew loose-leaf tea or cold brew on the go.
- **Lifetime Replacement Warranty:** If it ever breaks, we replace it free.

For the next 48 hours, as an early subscriber, use code **EARLYCREATOR** for 20% off your first bottle.

[Claim Your AeroFlask Today ->]`,
    tags: ['Email Copy', 'Product Launch', 'DTC', 'Conversion'],
    wordCount: 420,
    readTime: '2 min read',
    updatedAt: 'Yesterday'
  },
  {
    id: 'doc_3',
    title: '4-Step Go-to-Market Framework for Creators & Solopreneurs',
    category: 'STRATEGY',
    categoryLabel: 'Strategy & GTM',
    previewText: 'Strategic go-to-market playbook detailing tight niche positioning, public demonstration, time-to-value compression, and viral workspace artifact sharing...',
    content: `# 4-Step Go-To-Market Playbook for Creators & Solopreneurs

## Principle 1: Niche Positioning & Tight ICP
Do not launch for "everyone". Solve one painful, high-frequency friction point for a specific group of 1,000 power users before expanding.

## Principle 2: Build in Public & Transparent Proof
Demonstrate your real daily workflow. Show your screen, show metrics, show mistakes. Authenticity generates 5x higher customer trust than polished marketing copy.

## Principle 3: Sub-60-Second Time-to-Value
A user must experience an "Aha!" moment within 60 seconds of landing on your tool. Eliminate lengthy onboarding questionnaires and forced credit card capture upfront.

## Principle 4: Viral Sharable Artifacts
Enable every generated output (report, diagram, prompt, or blueprint) to be easily shared via a clean public URL, turning everyday usage into compounding word-of-mouth distribution.`,
    tags: ['Strategy', 'GTM', 'Playbook', 'Bootstrapping'],
    wordCount: 560,
    readTime: '3 min read',
    updatedAt: '3 days ago'
  },
  {
    id: 'doc_4',
    title: 'Autonomous Competitor SEO Audit Prompt Chain & Topic Clusters',
    category: 'BLUEPRINT',
    categoryLabel: 'AI Blueprint',
    previewText: 'Structured multi-stage prompt sequence that identifies top keyword gaps, search intent misalignment, and schema markups across competing domain profiles...',
    content: `# Autonomous Competitor SEO Audit Prompt Chain

## Phase 1: Domain Gap Extraction Prompt
\`\`\`
Act as an enterprise SEO Director. Analyze the following target competitor domains:
[DOMAIN_A], [DOMAIN_B]

1. Extract high-volume keywords where Competitor A ranks in positions 1-3, but Competitor B is unranked.
2. Group the extracted keywords into 4 semantic topic clusters based on buyer search intent (Informational, Commercial Investigation, Transactional).
3. Output the clusters in clean markdown tables including Estimated Keyword Difficulty (KD%) and Search Volume.
\`\`\`

## Phase 2: Schema Markup & Content Gap Analysis
Identify programmatic structured data gaps (FAQPage, HowTo, Product, VideoObject) to capture rich snippets on mobile Google SERP results.`,
    tags: ['SEO', 'Prompt Chain', 'Keyword Research', 'Automation'],
    wordCount: 650,
    readTime: '3 min read',
    updatedAt: '4 days ago'
  },
  {
    id: 'doc_5',
    title: 'High-Converting SaaS Landing Page Copy Architecture',
    category: 'MARKETING',
    categoryLabel: 'Marketing & Copy',
    previewText: 'Battle-tested 7-section SaaS landing page layout featuring magnetic hook, pain-point agitation, interactive feature showcase, and social proof grid...',
    content: `# High-Converting SaaS Landing Page Copy Architecture

## 1. Hero Block
- **Super-Badge:** [Industry Award / Capability Micro-Tag]
- **Main H1 Headline:** [Clear Transformation: Desired Result + Without the Main Friction]
- **Supporting Paragraph:** [2 sentences detailing specific outcome and platform capabilities]
- **Dual CTA:** [Primary Free Trial / Demo Button] + [Watch 90-sec Walkthrough]

## 2. Social Proof Ribbon
Display logos of respected companies or verified creator count: *"Trusted by 25,000+ developers, designers & founders"*

## 3. Pain-Point Agitation (Before vs. After)
Contrast the messy old way (tab hopping, fragmented tools, lost files) with the unified Zunme workspace workflow.

## 4. Interactive Capability Showcase
Visual product walk-through showing live inputs, instant results, and one-click cloud exports.`,
    tags: ['SaaS Copy', 'Landing Page', 'Conversion', 'Wireframe'],
    wordCount: 780,
    readTime: '4 min read',
    updatedAt: 'Last week'
  },
  {
    id: 'doc_6',
    title: 'Multi-Cloud Infrastructure Security Hardening & Zero-Trust Checklist',
    category: 'TECHNICAL',
    categoryLabel: 'Technical Spec',
    previewText: 'Technical engineering reference checklist covering IAM least-privilege policies, TLS 1.3 cryptographic cipher enforcement, and automated audit trails...',
    content: `# Multi-Cloud Infrastructure Security Hardening Checklist

## 1. Identity & Access Management (IAM)
- [x] Enforce Hardware MFA (FIDO2 / WebAuthn) for all root and administrative roles.
- [x] Rotate service account credentials every 90 days via automated secrets manager.
- [x] Zero permanent administrative access: Implement Just-In-Time (JIT) access approval workflows.

## 2. Network & Perimeter Defense
- [x] Disable public IP allocation on all production RDS and database clusters.
- [x] Enforce TLS 1.3 only across all API gateways and external ingress points.
- [x] Rate limiting: 120 req/minute per authenticated client token to prevent credential stuffing.

## 3. Data Protection at Rest & In-Transit
- [x] AES-256 encryption with customer-managed KMS keys for all database volumes.
- [x] Automated immutable snapshot backups with multi-region redundancy.`,
    tags: ['Security', 'Cloud', 'ZeroTrust', 'DevOps'],
    wordCount: 920,
    readTime: '5 min read',
    updatedAt: '2 weeks ago'
  }
];

export const PublicLibraryPage: React.FC = () => {
  const { user, showToast } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [viewingDoc, setViewingDoc] = useState<PublicDocumentItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Filter documents
  const filteredDocs = useMemo(() => {
    return PUBLIC_SAMPLE_DOCUMENTS.filter((doc) => {
      const matchesCategory =
        selectedCategory === 'ALL' || doc.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.previewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      ALL: PUBLIC_SAMPLE_DOCUMENTS.length,
      RESEARCH: PUBLIC_SAMPLE_DOCUMENTS.filter((d) => d.category === 'RESEARCH').length,
      MARKETING: PUBLIC_SAMPLE_DOCUMENTS.filter((d) => d.category === 'MARKETING').length,
      STRATEGY: PUBLIC_SAMPLE_DOCUMENTS.filter((d) => d.category === 'STRATEGY').length,
      BLUEPRINT: PUBLIC_SAMPLE_DOCUMENTS.filter((d) => d.category === 'BLUEPRINT').length,
      TECHNICAL: PUBLIC_SAMPLE_DOCUMENTS.filter((d) => d.category === 'TECHNICAL').length
    };
  }, []);

  const handleCopyContent = (doc: PublicDocumentItem) => {
    navigator.clipboard.writeText(doc.content);
    setCopiedId(doc.id);
    showToast('Document content copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleDownloadMarkdown = (doc: PublicDocumentItem) => {
    const element = document.createElement('a');
    const file = new Blob([doc.content], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Document downloaded successfully!', 'info');
  };

  const handleAuthenticatedAction = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      navigate('/user/library');
    }
  };

  return (
    <div className="public-library-page">
      {/* Background Atmosphere Layers */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Public Header */}
      <header className="public-library-topbar">
        <div className="public-library-container public-library-topbar-inner">
          <div className="public-library-brand-group">
            <NavLink to="/" className="public-library-brand">
              <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '34px', width: 'auto' }} />
            </NavLink>
            <div className="public-library-divider" />
            <div className="public-library-badge">
              <DocumentsLibraryIcon size={20} />
              <span>Workspace Documents &amp; Library</span>
            </div>
          </div>

          <div className="public-library-topbar-actions">
            <NavLink to="/" className="public-library-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            {user ? (
              <NavLink to="/user/library" className="public-library-signin-btn">
                My Cloud Library
              </NavLink>
            ) : (
              <NavLink to="/login" className="public-library-signin-btn">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Main Showcase Body */}
      <main className="public-library-main">
        <div className="public-library-container">
          {/* Hero Banner */}
          <section className="public-library-hero">
            <div className="public-library-pill">
              <Sparkles size={14} color="#2563EB" />
              <span>Client Specification • Personal Workspace Documents</span>
            </div>
            <h1 className="public-library-title">Workspace Documents &amp; Library</h1>
            <p className="public-library-subtitle">
              Your centralized personal repository of curated research summaries, verified citations, AI generation frameworks, and strategy documents. Browse sample documents below or sign in to sync your cloud vault across devices.
            </p>

            <div className="public-library-hero-actions">
              <button
                type="button"
                className="btn btn-primary public-library-cta-btn"
                onClick={handleAuthenticatedAction}
              >
                <Plus size={16} />
                <span>Create New Document</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary public-library-sync-btn"
                onClick={handleAuthenticatedAction}
              >
                <Lock size={15} />
                <span>Sync Personal Cloud Vault</span>
              </button>
            </div>
          </section>

          {/* Search & Category Filter Bar */}
          <section className="public-library-filter-panel">
            <div className="public-library-search-wrap">
              <Search size={18} className="public-library-search-icon" />
              <input
                type="text"
                className="public-library-search-input"
                placeholder="Search workspace documents by title, keyword, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="public-library-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="public-library-categories">
              <button
                type="button"
                className={`public-category-tab ${selectedCategory === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('ALL')}
              >
                All Documents
                <span className="public-tab-count">{categoryCounts.ALL}</span>
              </button>
              <button
                type="button"
                className={`public-category-tab ${selectedCategory === 'RESEARCH' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('RESEARCH')}
              >
                Research &amp; Citations
                <span className="public-tab-count">{categoryCounts.RESEARCH}</span>
              </button>
              <button
                type="button"
                className={`public-category-tab ${selectedCategory === 'MARKETING' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('MARKETING')}
              >
                Marketing &amp; Copy
                <span className="public-tab-count">{categoryCounts.MARKETING}</span>
              </button>
              <button
                type="button"
                className={`public-category-tab ${selectedCategory === 'STRATEGY' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('STRATEGY')}
              >
                Strategy &amp; GTM
                <span className="public-tab-count">{categoryCounts.STRATEGY}</span>
              </button>
              <button
                type="button"
                className={`public-category-tab ${selectedCategory === 'BLUEPRINT' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('BLUEPRINT')}
              >
                AI Blueprints
                <span className="public-tab-count">{categoryCounts.BLUEPRINT}</span>
              </button>
              <button
                type="button"
                className={`public-category-tab ${selectedCategory === 'TECHNICAL' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('TECHNICAL')}
              >
                Technical Specs
                <span className="public-tab-count">{categoryCounts.TECHNICAL}</span>
              </button>
            </div>
          </section>

          {/* Documents Grid */}
          <section className="public-library-grid-section">
            <div className="public-library-results-meta">
              <span>Showing {filteredDocs.length} workspace documents</span>
              <span className="public-meta-pill">
                <CheckCircle2 size={13} color="#10B981" />
                AES-256 Vault Encrypted
              </span>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="public-library-empty-state">
                <FileText size={44} color="#94A3B8" />
                <h3>No documents match your query</h3>
                <p>Try searching with another keyword or select "All Documents".</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="public-library-grid">
                {filteredDocs.map((doc) => (
                  <article key={doc.id} className="public-doc-card">
                    <div className="public-doc-card-header">
                      <span className={`public-doc-category-badge badge-${doc.category.toLowerCase()}`}>
                        {doc.categoryLabel}
                      </span>
                      <span className="public-doc-meta-text">
                        {doc.wordCount} words • {doc.readTime}
                      </span>
                    </div>

                    <h3 className="public-doc-card-title">{doc.title}</h3>
                    <p className="public-doc-card-preview">{doc.previewText}</p>

                    <div className="public-doc-tags-list">
                      {doc.tags.map((tag) => (
                        <span key={tag} className="public-doc-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {doc.citations && doc.citations.length > 0 && (
                      <div className="public-doc-citations-strip">
                        <Bookmark size={13} color="#2563EB" />
                        <span>{doc.citations.length} verified research sources</span>
                      </div>
                    )}

                    <div className="public-doc-card-footer">
                      <button
                        type="button"
                        className="public-doc-view-btn"
                        onClick={() => setViewingDoc(doc)}
                      >
                        <Eye size={15} />
                        <span>Read Full Doc</span>
                      </button>
                      <button
                        type="button"
                        className="public-doc-copy-icon-btn"
                        onClick={() => handleCopyContent(doc)}
                        title="Copy content"
                      >
                        {copiedId === doc.id ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                      </button>
                      <button
                        type="button"
                        className="public-doc-copy-icon-btn"
                        onClick={() => handleDownloadMarkdown(doc)}
                        title="Download Markdown"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Document Reader Modal */}
      {viewingDoc && (
        <div className="doc-modal-backdrop" onClick={() => setViewingDoc(null)}>
          <div className="doc-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="doc-modal-header">
              <div className="doc-modal-header-info">
                <span className={`public-doc-category-badge badge-${viewingDoc.category.toLowerCase()}`}>
                  {viewingDoc.categoryLabel}
                </span>
                <span className="public-doc-meta-text">
                  {viewingDoc.wordCount} words • {viewingDoc.readTime} • {viewingDoc.updatedAt}
                </span>
              </div>
              <button
                type="button"
                className="doc-modal-close-btn"
                onClick={() => setViewingDoc(null)}
                aria-label="Close document"
              >
                <X size={20} />
              </button>
            </div>

            <div className="doc-modal-body">
              <h2 className="doc-modal-title">{viewingDoc.title}</h2>

              {viewingDoc.citations && viewingDoc.citations.length > 0 && (
                <div className="doc-modal-citations-box">
                  <div className="doc-modal-citations-title">
                    <Bookmark size={14} color="#2563EB" />
                    <span>Verified Research Citations:</span>
                  </div>
                  <div className="doc-modal-citations-links">
                    {viewingDoc.citations.map((c, idx) => (
                      <a
                        key={idx}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="doc-citation-pill"
                      >
                        <span>{c.title}</span>
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="doc-modal-markdown-content">
                <pre>{viewingDoc.content}</pre>
              </div>
            </div>

            <div className="doc-modal-footer">
              <div className="doc-modal-tags">
                {viewingDoc.tags.map((t) => (
                  <span key={t} className="public-doc-tag">
                    #{t}
                  </span>
                ))}
              </div>
              <div className="doc-modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleDownloadMarkdown(viewingDoc)}
                >
                  <Download size={15} />
                  <span>Download .md</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleCopyContent(viewingDoc)}
                >
                  {copiedId === viewingDoc.id ? (
                    <>
                      <Check size={15} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span>Copy Full Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth / Cloud Sync Prompt Modal */}
      {showAuthModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="auth-modal-icon-badge">
                <Lock size={22} color="#2563EB" />
              </div>
              <h3 className="auth-modal-title">Sync to Personal Cloud Vault</h3>
              <p className="auth-modal-subtitle">
                Sign in to your Zunme AI account to create custom documents, store infinite research summaries, and access your personal library across all devices.
              </p>
            </div>

            <div className="auth-modal-perks">
              <div className="auth-perk-row">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Unlimited cloud documents with instant full-text search</span>
              </div>
              <div className="auth-perk-row">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Direct 1-click save from AI Chat, Web Search &amp; Content Studio</span>
              </div>
              <div className="auth-perk-row">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Multi-format export to Markdown, PDF, and DOCX</span>
              </div>
            </div>

            <div className="auth-modal-actions">
              <NavLink to="/login" className="btn btn-primary btn-block">
                Sign In to Zunme
              </NavLink>
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={() => setShowAuthModal(false)}
              >
                Continue Browsing Sample Docs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google-Style Footer */}
      <footer className="google-style-footer" style={{ marginTop: 'auto' }}>
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
    </div>
  );
};
