  import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import './LegalPages.css';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="legal-page-wrapper">
      <header className="legal-header">
        <div className="legal-container">
          <NavLink to="/" className="legal-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '32px', width: 'auto', display: 'block' }} />
          </NavLink>
          <NavLink to="/" className="legal-back-link">
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </NavLink>
        </div>
      </header>

      <main className="legal-main">
        <div className="legal-container">
          <div className="legal-card">
            <div className="legal-card-header">
              <div className="legal-badge">
                <Lock size={13} />
                <span>Data Protection &amp; Security Architecture</span>
              </div>
              <h1 className="legal-title">Privacy &amp; Data Protection Policy</h1>
              <p className="legal-date">Last Updated: October 2026 • Encrypted RBAC Standards</p>
            </div>

            <div className="legal-content">
              <section className="legal-section">
                <h2>1. Information We Collect</h2>
                <p>
                  To provide seamless multi-turn AI reasoning and persistent workspace archiving, Zunme AI collects:
                </p>
                <ul>
                  <li><strong>Account Credentials:</strong> Basic email, authentication tokens, and chosen creator or enterprise persona.</li>
                  <li><strong>Workspace Interactions:</strong> Saved prompts, bookmarks in My Library, and SEO research queries.</li>
                  <li><strong>Technical Grounding Logs:</strong> Web search domains retrieved for citation verification.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>2. How We Protect Your Creative Work</h2>
                <p>
                  Zunme AI is built with tenant-isolated workspace boundaries and encrypted role-based access control (RBAC). Your private drafts, unpublished newsletters, and confidential prompt libraries are never shared across public catalog indexes without explicit submission.
                </p>
              </section>

              <section className="legal-section">
                <h2>3. Third-Party AI Routing &amp; Grounding</h2>
                <p>
                  When you submit inquiries to the AI Workspace, queries are routed through encrypted multi-model pipelines (e.g. OpenAI, Anthropic, or Tavily search grounding). No proprietary personal data is utilized to train foundational public weights without consent.
                </p>
              </section>

              <section className="legal-section">
                <h2>4. Your Data Rights &amp; Retention</h2>
                <p>
                  You hold complete control over your generated content. You may delete conversations from History, clear search logs, or export your saved Personal Library assets at any time.
                </p>
              </section>

              <section className="legal-section">
                <h2>5. Confidential Business Communication &amp; Anti-Harvesting Guarantee (zBox)</h2>
                <p>
                  In accordance with the founding charter for <strong>zBox Secured Business Email</strong>, Zunme was engineered to provide small business owners, creators, and entrepreneurs with a trustworthy alternative to big tech platforms that monetize user data.
                </p>
                <ul>
                  <li><strong>Zero Email Scraping:</strong> Zunme zBox communications, draft proposals, and attachments are strictly private and never mined to train foundation models or serve third-party ads.</li>
                  <li><strong>Private zBox Vault:</strong> Files and creative assets stored in your personal zBox repository remain your exclusive property with tenant-level cryptographic isolation.</li>
                  <li><strong>No Third-Party Data Brokering:</strong> We never sell, rent, or disclose your client databases, CRM records, or communications to advertisers.</li>
                </ul>
              </section>
            </div>

            <div className="legal-card-footer">
              <div className="legal-footnote">
                <CheckCircle2 size={14} className="text-emerald" />
                <span>Notice: Standard platform privacy framework provided for interface demonstration.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default PrivacyPage;
