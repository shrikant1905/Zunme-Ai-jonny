import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import './LegalPages.css';

export const TermsPage: React.FC = () => {
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
                <FileText size={13} />
                <span>Legal Framework &amp; Service Agreement</span>
              </div>
              <h1 className="legal-title">Terms and Conditions of Service</h1>
              <p className="legal-date">Last Updated: October 2026 • Effective Worldwide</p>
            </div>

            <div className="legal-content">
              <section className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing, browsing, registering an account, or interacting with the Zunme AI platform (including the AI Chat Workspace, Web Search, Content Builders, and AI Warehouse), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </section>

              <section className="legal-section">
                <h2>2. Platform Usage &amp; Access Tiers</h2>
                <p>
                  Zunme AI provides multi-tiered workspace access for individual knowledge workers, creators, and enterprise organizations:
                </p>
                <ul>
                  <li><strong>Free Community Tier:</strong> Limited queries for multi-turn chat, standard web citation search, and previewing public templates.</li>
                  <li><strong>Pro &amp; Commercial Licenses:</strong> Uncapped downloads, commercial redistribution rights for AI prompts and workflows, and priority LLM token routing.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. Intellectual Property, Copyright &amp; Digital Authorship</h2>
                <p>
                  In accordance with the Zunme AI creator ecosystem guidelines, verified content builders retain intellectual authorship over proprietary prompt engineering frameworks and custom workflow schemas. Users who generate derivative content retain commercial exploitation rights subject to their active licensing plan tier.
                </p>
              </section>

              <section className="legal-section">
                <h2>4. Prohibited Activities</h2>
                <p>
                  You agree not to reverse engineer prompt architecture, deploy unauthorized web crawlers against Zunme AI directory indexes, or submit deceptive, abusive, or copyrighted material without verified license authority.
                </p>
              </section>

              <section className="legal-section">
                <h2>5. Limitation of Liability</h2>
                <p>
                  Zunme AI utilizes multi-model synthesis grounded by live search references. While citation URLs provide transparent publisher verification, outputs should be independently validated for critical financial, legal, or health decision-making.
                </p>
              </section>
            </div>

            <div className="legal-card-footer">
              <div className="legal-footnote">
                <Shield size={14} className="text-violet" />
                <span>Notice: Standard platform placeholder terms provided for product interface demonstration.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default TermsPage;
