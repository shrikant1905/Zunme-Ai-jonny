import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  Megaphone,
  TrendingUp,
  Target,
  ShoppingBag,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart2,
  DollarSign,
  Smartphone,
  Eye,
  Globe,
  Sliders,
  Tv,
  Image as ImageIcon,
  PlaySquare,
  HelpCircle
} from 'lucide-react';
import './PublicAdvertisingPage.css';

export const PublicAdvertisingPage: React.FC = () => {
  const [selectedFormatCategory, setSelectedFormatCategory] = useState<'all' | 'visual' | 'interactive' | 'ecommerce'>('all');

  const adFormats = [
    { id: 'ar', name: '3D Reality / AR Ads', category: 'interactive', badge: 'Next-Gen', desc: 'Augmented reality experiences allowing users to interact with 3D product models in real-time.' },
    { id: 'carousel', name: 'Carousel Ads (AMI)', category: 'visual', badge: 'High Engagement', desc: 'Advertising Multiple Images — showcase multi-product collections or sequential storyboards in a single ad.' },
    { id: 'collection', name: 'Collection Ads (SPI)', category: 'ecommerce', badge: 'E-Commerce', desc: 'Several Product Images paired with a master video or image hero banner, ideal for instant catalogs.' },
    { id: 'instant', name: 'Instant Experience Ads', category: 'interactive', badge: 'Full-Screen', desc: 'Fast-loading full-screen mobile canvas designed for immersive brand storytelling and zero latency.' },
    { id: 'lead', name: 'Lead Bait Ads', category: 'interactive', badge: 'High Conversion', desc: 'Collect verified emails, phone numbers, and customer inquiries with auto-filled forms directly in the ad.' },
    { id: 'zbox', name: 'zBox Messenger Ads', category: 'interactive', badge: 'Direct Messaging', desc: 'Appear directly inside the zBox secure messaging hub to initiate direct, confidential 1-on-1 business conversations.' },
    { id: 'offer', name: 'Offer Ads (AI Special)', category: 'ecommerce', badge: 'Limited-Time Deals', desc: 'Discount and deal banners with built-in countdown timers, coupon redemption tracking, and fast conversions.' },
    { id: 'playable', name: 'Playable & Game Ads', category: 'interactive', badge: 'Gamified', desc: 'Interactive gamified previews allowing users to test-drive features or play mini-games before downloading.' },
    { id: 'stories', name: 'Stories Ads', category: 'visual', badge: 'Vertical Video', desc: 'Edge-to-edge 9:16 vertical video and animated slides engineered for rapid mobile taps and swipes.' },
    { id: 'motion', name: 'Interactive Motion Ads (IM)', category: 'visual', badge: 'Sound & Motion', desc: 'High-definition video ads with dynamic overlays, clickable hotspots, and engaging audio-visual cues.' },
    { id: 'safl', name: 'Local Services Ads (SAFL)', category: 'ecommerce', badge: 'Local Businesses', desc: 'Service Ads for Locals — geo-targeted ads for plumbing, real estate, legal, and local retail providers.' },
    { id: 'dynamic', name: 'Dynamic Retargeting Ads', category: 'ecommerce', badge: 'Behavioral', desc: 'Automatically displays personalized products based on users browsing habits (UBH) and search query history.' },
    { id: 'static', name: 'Single Static Visuals (SSVI)', category: 'visual', badge: 'Standard Banner', desc: 'Crisp image creatives paired with targeted headlines and benefit-driven calls-to-action.' }
  ];

  const filteredFormats = adFormats.filter((fmt) => {
    if (selectedFormatCategory === 'all') return true;
    return fmt.category === selectedFormatCategory;
  });

  return (
    <div className="public-ads-page">
      {/* Background Atmosphere */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Public Header */}
      <header className="public-ads-topbar">
        <div className="public-ads-container public-ads-topbar-inner">
          <NavLink to="/" className="public-ads-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '34px', width: 'auto' }} />
          </NavLink>
          <div className="public-ads-topbar-links">
            <NavLink to="/" className="public-ads-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            <NavLink to="/login" className="public-ads-signin-btn">
              Sign In to Ad Manager
            </NavLink>
          </div>
        </div>
      </header>

      <main className="public-ads-main">
        <div className="public-ads-container">
          {/* Hero Section */}
          <section className="public-ads-hero">
            <div className="public-ads-pill">
              <Megaphone size={14} color="#6E56CF" />
              <span>Client Specification • Multi-Platform Advertising (MPA) Suite</span>
            </div>
            <h1 className="public-ads-title">Zunme Advertising Platform</h1>
            <p className="public-ads-subtitle">
              Reach millions of high-intent buyers, creators, and business owners across all Zunme channels, partner networks, and major platforms with AI-driven bidding and real-time optimization.
            </p>
            <div className="public-ads-hero-actions">
              <NavLink to="/login" className="btn btn-primary btn-lg">
                <span>Create Ad Account</span>
                <ArrowRight size={18} />
              </NavLink>
              <a href="#onboarding" className="btn btn-secondary btn-lg">
                <span>How to Get Started</span>
              </a>
            </div>
          </section>

          {/* Section 1: 7-Step Onboarding from Client Document */}
          <section id="onboarding" className="public-ads-card">
            <div className="card-header-row">
              <div className="card-icon-badge">
                <Target size={24} color="#6E56CF" />
              </div>
              <div>
                <h2 className="card-section-title">Getting Started with Zunme Advertising</h2>
                <p className="card-section-desc">
                  Direct specification from our onboarding document: follow these 7 simple steps to launch your campaign.
                </p>
              </div>
            </div>

            <div className="onboarding-steps-grid">
              <div className="step-card">
                <div className="step-num">01</div>
                <h3>Sign Up</h3>
                <p>Visit the Zunme sign-in page and create a Zunme Pro account with valid credentials.</p>
              </div>
              <div className="step-card">
                <div className="step-num">02</div>
                <h3>Business Info</h3>
                <p>Provide details about your brand, whether you operate online, in-store, or hybrid.</p>
              </div>
              <div className="step-card">
                <div className="step-num">03</div>
                <h3>Product Data</h3>
                <p>Upload your product catalog either manually or via automated Merchant data feed.</p>
              </div>
              <div className="step-card">
                <div className="step-num">04</div>
                <h3>Select Objective</h3>
                <p>Choose brand awareness, website traffic, lead generation, or direct sales conversion.</p>
              </div>
              <div className="step-card">
                <div className="step-num">05</div>
                <h3>Define Audience</h3>
                <p>Target precise customer demographics, search behaviors (UBH), and geolocations.</p>
              </div>
              <div className="step-card">
                <div className="step-num">06</div>
                <h3>Set Budget</h3>
                <p>Establish daily or lifetime budgets with smart algorithmic bidding (PPC / PPV).</p>
              </div>
              <div className="step-card highlight-step">
                <div className="step-num">07</div>
                <h3>Create Your Ad</h3>
                <p>Assemble multi-asset responsive copy, visuals, and video scripts in 1 click.</p>
              </div>
            </div>
          </section>

          {/* Section 2: The Two Pillars (MPA & Merchant Zone) */}
          <section className="pillars-grid">
            {/* Pillar 1 */}
            <div className="pillar-box">
              <div className="pillar-tag">Pillar 01</div>
              <h3 className="pillar-title">Zunme MPA (Multi-Platform Advertising)</h3>
              <p className="pillar-desc">
                Automated ad buying across multiple partner channels with sophisticated real-time bidding capabilities and centralized cross-channel campaign analytics.
              </p>
              <ul className="pillar-points">
                <li>
                  <CheckCircle2 size={15} color="#10B981" />
                  <span><strong>Audience Targeting:</strong> Matches Google Display &amp; Amazon Sponsored Display reach.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#10B981" />
                  <span><strong>Brand Placement:</strong> High-impact prominent hero slots matching Amazon Sponsored Brands.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#10B981" />
                  <span><strong>Product Placement:</strong> Contextual product embeds based on live search queries.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#10B981" />
                  <span><strong>Smart Bidding:</strong> Machine learning algorithms adjust bids automatically to maximize conversion ROI.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-box">
              <div className="pillar-tag">Pillar 02</div>
              <h3 className="pillar-title">Zunme Merchant Zone</h3>
              <p className="pillar-desc">
                A dedicated commerce hub allowing businesses to showcase product catalogs across Zunme networks, including OMP Deals, CRM nErgy, and B4B America.
              </p>
              <ul className="pillar-points">
                <li>
                  <CheckCircle2 size={15} color="#6E56CF" />
                  <span><strong>Free Organic Listings:</strong> Display inventory in organic Zunme AI search results without upfront cost.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#6E56CF" />
                  <span><strong>Shopping &amp; Video Ads:</strong> Promoted rich media ads for fast e-commerce checkout.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#6E56CF" />
                  <span><strong>Zunme SAFL:</strong> Service Ads for Locals connecting geo-targeted consumers with local shops.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#6E56CF" />
                  <span><strong>ZIC - SQ:</strong> Zunme Improve Content Search Query intelligence for higher ranking.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Pay For Demand (13 Ad Formats from Client Doc) */}
          <section className="public-ads-card">
            <div className="card-header-row">
              <div className="card-icon-badge">
                <BarChart2 size={24} color="#2563EB" />
              </div>
              <div>
                <h2 className="card-section-title">Pay For Demand • 13 High-Converting Ad Formats</h2>
                <p className="card-section-desc">
                  Based on the client document <em>"Major Types of Ads — Zunme Specification"</em>: complete multi-format coverage.
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="format-filters-bar">
              <button
                type="button"
                className={`format-filter-btn ${selectedFormatCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFormatCategory('all')}
              >
                All 13 Formats
              </button>
              <button
                type="button"
                className={`format-filter-btn ${selectedFormatCategory === 'visual' ? 'active' : ''}`}
                onClick={() => setSelectedFormatCategory('visual')}
              >
                Visual &amp; Video
              </button>
              <button
                type="button"
                className={`format-filter-btn ${selectedFormatCategory === 'interactive' ? 'active' : ''}`}
                onClick={() => setSelectedFormatCategory('interactive')}
              >
                Interactive &amp; AR
              </button>
              <button
                type="button"
                className={`format-filter-btn ${selectedFormatCategory === 'ecommerce' ? 'active' : ''}`}
                onClick={() => setSelectedFormatCategory('ecommerce')}
              >
                E-Commerce &amp; Local
              </button>
            </div>

            {/* Formats Grid */}
            <div className="formats-catalog-grid">
              {filteredFormats.map((fmt) => (
                <div key={fmt.id} className="format-item-card">
                  <div className="format-card-top">
                    <h4 className="format-card-title">{fmt.name}</h4>
                    <span className="format-card-badge">{fmt.badge}</span>
                  </div>
                  <p className="format-card-desc">{fmt.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Banner */}
          <section className="public-ads-cta-banner">
            <h2>Ready to Scale Your Business with Zunme Ads?</h2>
            <p>
              Create your ad account today. Reach the right audience, manage budgets from $5/day, and monitor conversion metrics in real-time.
            </p>
            <div className="cta-buttons">
              <NavLink to="/login" className="btn btn-primary btn-lg">
                <span>Sign In / Create Ad Account</span>
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

export default PublicAdvertisingPage;
