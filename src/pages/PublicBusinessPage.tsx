import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  Users,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Globe,
  Database,
  Mail,
  DollarSign,
  Award,
  BarChart2,
  Cpu,
  Clock,
  ExternalLink
} from 'lucide-react';
import './PublicBusinessPage.css';

export const PublicBusinessPage: React.FC = () => {
  const businessProducts = [
    {
      id: 'crm',
      name: 'CRM nErgy',
      category: 'Enterprise CRM & ERP',
      tagline: 'AI CRM-ERP Platform for Small Business & Creators',
      desc: 'Seamless contact management, client pipelines, deal tracking, and revenue forecasting designed for modern businesses.',
      icon: <Users size={22} color="#10B981" />,
      features: ['Automated Lead Ingestion', 'Deal Pipeline Stages', 'Client Activity Logs', 'Smart Revenue Forecasting']
    },
    {
      id: 'zbox',
      name: 'zBox Business Email',
      category: 'Secure Communication',
      tagline: 'Private Webmail & Cross-Platform zBox Sharing',
      desc: 'Confidential business email accounts with tenant-isolated encryption. Connect directly to MVP platforms for instant content distribution.',
      icon: <Mail size={22} color="#2563EB" />,
      features: ['Confidential Email (@zunme)', 'Zero AI Email Mining', 'zBox Cloud Storage Vault', 'One-Click MVP Sharing']
    },
    {
      id: 'b4b',
      name: 'B4B America Sales Engine',
      category: 'Growth & Consulting',
      tagline: 'Dedicated Sales Network & Client Acquisition',
      desc: 'Connecting small business owners with consulting partners and enterprise sales teams to drive adoption and scale revenue.',
      icon: <Briefcase size={22} color="#6E56CF" />,
      features: ['Consulting Strategy Booking', 'Enterprise Client Matching', 'Sales Rep Network Access', 'Project Financing Support']
    },
    {
      id: 'oal',
      name: 'OAL Marketplace & Money Club',
      category: 'Financing & Capital',
      tagline: 'INVIQ AI Investment Scoring & Loan Securing',
      desc: 'Online marketplace where small business owners, entrepreneurs, and real estate investors connect to secure funding, loans, and venture capital.',
      icon: <DollarSign size={22} color="#F59E0B" />,
      features: ['INVIQ Credit Scoring AI', 'Lender Matchmaking Network', 'Real Estate Project Loans', 'Capital Acquisition Tracker']
    },
    {
      id: 'omp',
      name: 'OMP Deals Marketplace',
      category: 'E-Commerce & Trades',
      tagline: 'Online Marketplace Connecting Buyers & Sellers',
      desc: 'A verified commerce directory for business-to-business and business-to-consumer transactions, wholesale inventory, and liquidation deals.',
      icon: <Layers size={22} color="#0EA5E9" />,
      features: ['Verified Merchant Stores', 'Direct B2B Invoicing', 'Wholesale Bulk Listings', 'Integrated Escrow Deals']
    },
    {
      id: 'swmtp',
      name: 'SWMTP Tracking Platform',
      category: 'Data & Analytics',
      tagline: 'Super Web Mastering Tracking Platform',
      desc: 'Comprehensive web telemetry, traffic provenance reporting, conversion attribution, and Googlebot crawl analytics for website owners.',
      icon: <BarChart2 size={22} color="#8B5CF6" />,
      features: ['Real-Time Web Analytics', 'Googlebot Crawl Diagnostic', 'Conversion Attribution', 'Custom Executive Dashboards']
    },
    {
      id: 'cloud',
      name: 'Zunme Cloud Hosting',
      category: 'Infrastructure',
      tagline: 'Sub-Second Speeds & Server Infrastructure',
      desc: 'High-performance cloud servers, media storage, and CDN endpoints optimized for instantaneous page load speeds and search indexation.',
      icon: <Zap size={22} color="#D97706" />,
      features: ['Sub-Second CDN Delivery', 'Automated Daily Backups', 'Encrypted Asset Vault', '99.99% Uptime Guarantee']
    },
    {
      id: 'studio',
      name: 'AI Content Studio',
      category: 'Creation Engine',
      tagline: '1,000+ AI Blueprints for Business Copywriting',
      desc: 'Integrated with CRM nErgy to automatically generate executive thought leadership, client proposals, pitch decks, and ad copy.',
      icon: <Sparkles size={22} color="#EC4899" />,
      features: ['1,000+ Business Blueprints', 'Automated Proposal Canvas', 'Executive Op-Ed Writer', 'Brand Voice Lock']
    }
  ];

  return (
    <div className="public-biz-page">
      {/* Background Atmosphere */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Public Header */}
      <header className="public-biz-topbar">
        <div className="public-biz-container public-biz-topbar-inner">
          <NavLink to="/" className="public-biz-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '34px', width: 'auto' }} />
          </NavLink>
          <div className="public-biz-topbar-links">
            <NavLink to="/" className="public-biz-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            <NavLink to="/login" className="public-biz-signin-btn">
              Sign In to Business Hub
            </NavLink>
          </div>
        </div>
      </header>

      <main className="public-biz-main">
        <div className="public-biz-container">
          {/* Hero Section */}
          <section className="public-biz-hero">
            <div className="public-biz-pill">
              <Briefcase size={14} color="#10B981" />
              <span>Client Specification • Google-Style Products &amp; Solutions</span>
            </div>
            <h1 className="public-biz-title">Zunme for Business</h1>
            <p className="public-biz-subtitle">
              Engineered specifically for small business owners, entrepreneurs, and modern creators. Uniting CRM nErgy, confidential zBox communication, B4B America sales, and financing under one cohesive AI workspace.
            </p>
            <div className="public-biz-hero-actions">
              <NavLink to="/login" className="btn btn-primary btn-lg">
                <span>Access Business Suite</span>
                <ArrowRight size={18} />
              </NavLink>
              <a href="#products-showcase" className="btn btn-secondary btn-lg">
                <span>Explore Products Showcase</span>
              </a>
            </div>
          </section>

          {/* Section 1: Google-Style Products Showcase (Client Doc Reference) */}
          <section id="products-showcase" className="public-biz-showcase-section">
            <div className="biz-section-header">
              <span className="biz-section-kicker">Unified Business Portfolio</span>
              <h2 className="biz-section-title">Zunme Products, Brands &amp; Platforms</h2>
              <p className="biz-section-desc">
                Inspired by modern enterprise ecosystems: interconnected tools built to operate together seamlessly without fragmented subscriptions.
              </p>
            </div>

            <div className="biz-products-grid">
              {businessProducts.map((prod) => (
                <div key={prod.id} className="biz-product-card">
                  <div className="biz-card-top">
                    <div className="biz-card-icon-box">
                      {prod.icon}
                    </div>
                    <div>
                      <span className="biz-card-cat">{prod.category}</span>
                      <h3 className="biz-card-title">{prod.name}</h3>
                    </div>
                  </div>

                  <p className="biz-card-tagline">{prod.tagline}</p>
                  <p className="biz-card-desc">{prod.desc}</p>

                  <div className="biz-card-features">
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="biz-feature-pill">
                        <CheckCircle2 size={12} color="#10B981" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Complete Workflow (Client Doc: "Features Product How It Works The Workflow Platform Showcase FAQ Pricing") */}
          <section className="public-biz-workflow-card">
            <div className="workflow-header">
              <h2>The Connected Business Workflow</h2>
              <p>How small business owners use Zunme to acquire leads, communicate privately, and close deals.</p>
            </div>

            <div className="workflow-steps-row">
              <div className="workflow-step-item">
                <div className="workflow-step-num">Step 1</div>
                <h4>Generate &amp; Capture</h4>
                <p>Run targeted ads via Zunme Merchant Zone or build SEO assets to capture incoming client inquiries.</p>
              </div>

              <div className="workflow-arrow-div" aria-hidden="true">→</div>

              <div className="workflow-step-item">
                <div className="workflow-step-num">Step 2</div>
                <h4>CRM nErgy Sync</h4>
                <p>Contacts and leads automatically sync into your CRM nErgy pipeline with automated status tracking.</p>
              </div>

              <div className="workflow-arrow-div" aria-hidden="true">→</div>

              <div className="workflow-step-item">
                <div className="workflow-step-num">Step 3</div>
                <h4>Private zBox Email</h4>
                <p>Send encrypted proposals and contracts via private zBox mail with zero corporate data surveillance.</p>
              </div>

              <div className="workflow-arrow-div" aria-hidden="true">→</div>

              <div className="workflow-step-item">
                <div className="workflow-step-num">Step 4</div>
                <h4>Close &amp; Scale</h4>
                <p>Leverage OAL Marketplace for project funding or expand sales with B4B America enterprise consulting.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Privacy & Speed Commitments */}
          <section className="biz-commitments-grid">
            <div className="commitment-card">
              <div className="commitment-icon-wrap" style={{ background: '#F0FDF4' }}>
                <Shield size={24} color="#16A34A" />
              </div>
              <h3>Confidentiality Guarantee</h3>
              <p>
                Unlike traditional advertising-supported business software, Zunme never mines your client databases, CRM records, or proprietary proposals to train public models or sell to competitors.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-icon-wrap" style={{ background: '#FFFBEB' }}>
                <Zap size={24} color="#D97706" />
              </div>
              <h3>Sub-Second Speed Architecture</h3>
              <p>
                Built with lightweight HTML and modern CSS foundations to eliminate clunky enterprise bloat, ensuring instantaneous loading times for you and your clients.
              </p>
            </div>
          </section>

          {/* Bottom Banner */}
          <section className="public-biz-cta-banner">
            <h2>Ready to Transform Your Business Operations?</h2>
            <p>
              Sign in to your Zunme Business Workspace or create an account to activate CRM nErgy and zBox business email.
            </p>
            <div className="cta-buttons">
              <NavLink to="/login" className="btn btn-primary btn-lg">
                <span>Sign In to Business Hub</span>
                <ArrowRight size={18} />
              </NavLink>
              <NavLink to="/" className="btn btn-secondary btn-lg">
                <span>Back to Home</span>
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PublicBusinessPage;
