import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Zap,
  CheckCircle2,
  Users,
  Shield,
  Layers,
  ArrowRight,
  Globe,
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  ShoppingBag,
  Twitter,
  Search,
  ExternalLink,
  Share2,
  Workflow,
  Compass,
  Cpu,
  HeartHandshake
} from 'lucide-react';
import './MakeAIWorkPage.css';

interface MVPPlatformInfo {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  features: string[];
  launchPath: string;
}

export const MakeAIWorkPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'social' | 'ecommerce' | 'search'>('all');

  const mvpPlatforms: MVPPlatformInfo[] = [
    {
      id: 'google',
      name: 'Zunme for Google',
      category: 'search',
      color: '#4285F4',
      icon: <Search size={22} color="#4285F4" />,
      tagline: 'Search Engine Indexing, Googlebot Crawlers & Smart Campaigns',
      description: 'Optimized content structure tailored for Googlebot Smartphone and Desktop crawlers, organic SERP ranking, and Merchant Center data feeds.',
      features: ['SEO Metadata Generation', 'Googlebot Mobile-First Crawl Audit', 'SERP Keyword Optimization', 'Google Merchant Feed Sync'],
      launchPath: '/user/mvp/google'
    },
    {
      id: 'youtube',
      name: 'Zunme for YouTube',
      category: 'video',
      color: '#FF0000',
      icon: <Youtube size={22} color="#FF0000" />,
      tagline: 'High-Retention Video Scripts & Engaging Visual Descriptions',
      description: 'Generate structured video blueprints with 5-second attention hooks, timestamped chapters, high-CTR titles, and tags that trigger YouTube algorithmic suggestions.',
      features: ['Viral Hook Generator', 'Timestamped Video Outlines', 'SEO Description Architect', 'Thumbnail Concept Suggestions'],
      launchPath: '/user/mvp/youtube'
    },
    {
      id: 'instagram',
      name: 'Zunme for Instagram',
      category: 'social',
      color: '#E1306C',
      icon: <Instagram size={22} color="#E1306C" />,
      tagline: 'Aesthetic Storytelling, Reels Hooks & High-Engagement Captions',
      description: 'Craft visually paired carousel narratives, micro-vlog scripts for Reels, and high-converting bio hooks that convert casual scrollers into followers.',
      features: ['Reels 3-Second Hooks', 'Carousel Slide Copy', 'Hashtag Tier Engine', 'Story Engagement Prompts'],
      launchPath: '/user/mvp/instagram'
    },
    {
      id: 'facebook',
      name: 'Zunme for Facebook',
      category: 'social',
      color: '#1877F2',
      icon: <Facebook size={22} color="#1877F2" />,
      tagline: 'Multi-Format Ad Copy, Community Discussions & Local Service Ads',
      description: 'Design Facebook Feed ads, Carousel storytelling sets, and community discussion starters mapped to user browsing habits and local business outreach.',
      features: ['Feed & Carousel Ad Sets', 'Local Services (SAFL) Copy', 'Instant Experience Storyboards', 'Community Engagement Prompts'],
      launchPath: '/user/mvp/facebook'
    },
    {
      id: 'tiktok',
      name: 'Zunme for TikTok',
      category: 'video',
      color: '#000000',
      icon: <Zap size={22} color="#00F2FE" />,
      tagline: 'Fast-Paced Short-Form Scripts & Trend-Surfing Hooks',
      description: 'Engineered for rapid viewer retention, TikTok trend synthesis, and call-to-actions designed for viral algorithmic velocity and high completion rates.',
      features: ['Fast-Paced Dialogue Scripts', 'Sound & Trend Framing', 'Retention Spikes & Pacing', 'Interactive Poll Ideas'],
      launchPath: '/user/mvp/tiktok'
    },
    {
      id: 'linkedin',
      name: 'Zunme for LinkedIn',
      category: 'social',
      color: '#0A66C2',
      icon: <Linkedin size={22} color="#0A66C2" />,
      tagline: 'Executive Thought Leadership, B2B Outbound & Industry Insights',
      description: 'Transform raw notes and business data into polished executive commentary, industry point-of-view essays, and high-response B4B outreach messaging.',
      features: ['Executive Op-Ed Formats', 'Frameworks & Carousels', 'B4B Outbound Direct Messages', 'Polls & Analytical Posts'],
      launchPath: '/user/mvp/linkedin'
    },
    {
      id: 'amazon',
      name: 'Zunme for Amazon',
      category: 'ecommerce',
      color: '#FF9900',
      icon: <ShoppingBag size={22} color="#FF9900" />,
      tagline: 'A+ Content, High-Converting Bullet Points & Sponsored Product Ads',
      description: 'Produce high-converting Amazon product titles, 5 benefit-driven bullet points, backend search term arrays, and A+ brand storytelling copy.',
      features: ['Benefit-First Bullet Points', 'A+ Brand Content Blocks', 'Keyword Backend Packing', 'Sponsored Product Ad Copy'],
      launchPath: '/user/mvp/amazon'
    },
    {
      id: 'x',
      name: 'Zunme for X (Twitter)',
      category: 'social',
      color: '#111827',
      icon: <Twitter size={22} color="#1DA1F2" />,
      tagline: 'High-Velocity Threads, Viral One-Liners & Real-Time Commentary',
      description: 'Create compelling threads with irresistible opening hooks, concise value nuggets, and conversion bookmarks that build dedicated personal followings.',
      features: ['Viral Thread Hooks', 'Quote-Tweet Angles', 'One-Liner Punchlines', 'Curated Resource Lists'],
      launchPath: '/user/mvp/x'
    }
  ];

  const filteredPlatforms = mvpPlatforms.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <div className="make-ai-work-page">
      {/* Atmosphere Background */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Bar */}
      <header className="make-ai-topbar">
        <div className="make-ai-container make-ai-topbar-inner">
          <NavLink to="/" className="make-ai-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '34px', width: 'auto' }} />
          </NavLink>
          <div className="make-ai-topbar-links">
            <NavLink to="/" className="make-ai-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            <NavLink to="/login" className="make-ai-signin-btn">
              Sign In
            </NavLink>
          </div>
        </div>
      </header>

      <main className="make-ai-main">
        <div className="make-ai-container">
          {/* Hero Banner */}
          <section className="make-ai-hero">
            <div className="make-ai-pill">
              <Sparkles size={14} className="text-purple" />
              <span>Client Vision Specification • Human-First AI Ecosystem</span>
            </div>
            <h1 className="make-ai-title">Make AI Work for You</h1>
            <p className="make-ai-subtitle">
              Zunme is engineered not to compete with the internet's most visited platforms, but to be their <strong>Best Friend</strong>. We bridge advanced artificial intelligence with human agency, CRM nErgy, and multi-platform workflows.
            </p>
            <div className="make-ai-hero-actions">
              <NavLink to="/user/mvp" className="btn btn-primary btn-lg">
                <span>Explore MVP Integrations</span>
                <ArrowRight size={18} />
              </NavLink>
              <NavLink to="/business" className="btn btn-secondary btn-lg">
                <span>Business &amp; CRM Solutions</span>
              </NavLink>
            </div>
          </section>

          {/* Section 1: The 3 Core Principles from Client Document */}
          <section className="make-ai-principles-card">
            <div className="principles-header">
              <div className="principles-icon-badge">
                <HeartHandshake size={24} color="#6E56CF" />
              </div>
              <div>
                <h2 className="principles-title">Why Zunme is a Different AI Ecosystem</h2>
                <p className="principles-desc">
                  Based on the founding principles in our architecture document: <em>"Create AI Ecosystem — Loyal to Human Agency &amp; Community Empowerment"</em>.
                </p>
              </div>
            </div>

            <div className="principles-grid">
              <div className="principle-box">
                <div className="principle-number">01</div>
                <h3>Frame AI as a Social Technology</h3>
                <p>
                  Recognize the importance of human contributions. Shift the narrative from protecting humans from AI to valuing human input in AI systems, combining machine capabilities with human expertise.
                </p>
                <div className="principle-tag">Human + Machine Synergy</div>
              </div>

              <div className="principle-box">
                <div className="principle-number">02</div>
                <h3>Design AI Loyal to Human Agency</h3>
                <p>
                  Develop AI systems that enhance human creativity and problem-solving through "vibe teaming" — where AI acts as a reliable collaborative partner rather than an opaque black box.
                </p>
                <div className="principle-tag">Creative Collaboration</div>
              </div>

              <div className="principle-box">
                <div className="principle-number">03</div>
                <h3>Coordinate Around Big-Bet Applications</h3>
                <p>
                  Empower communities and small business owners with equitable access to AI resources. Connect directly with CRM nErgy and local networks to generate measurable economic impact.
                </p>
                <div className="principle-tag">Equitable Access</div>
              </div>
            </div>
          </section>

          {/* Section 2: MVP - Most Visited Platforms Suite */}
          <section className="make-ai-mvp-section">
            <div className="mvp-section-header">
              <div>
                <span className="mvp-section-kicker">Most Visited Platforms (MVP) Suite</span>
                <h2 className="mvp-section-title">"Make Zunme Your Best Friend"</h2>
                <p className="mvp-section-desc">
                  These are the most visited platforms online. Zunme provides dedicated, pre-engineered AI prompt frameworks tailored specifically to each platform's distinct algorithms and audiences.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="mvp-filter-tabs">
                <button
                  type="button"
                  className={`mvp-filter-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All 8 Platforms
                </button>
                <button
                  type="button"
                  className={`mvp-filter-btn ${activeTab === 'social' ? 'active' : ''}`}
                  onClick={() => setActiveTab('social')}
                >
                  Social Media
                </button>
                <button
                  type="button"
                  className={`mvp-filter-btn ${activeTab === 'video' ? 'active' : ''}`}
                  onClick={() => setActiveTab('video')}
                >
                  Video &amp; Shorts
                </button>
                <button
                  type="button"
                  className={`mvp-filter-btn ${activeTab === 'ecommerce' ? 'active' : ''}`}
                  onClick={() => setActiveTab('ecommerce')}
                >
                  E-Commerce
                </button>
                <button
                  type="button"
                  className={`mvp-filter-btn ${activeTab === 'search' ? 'active' : ''}`}
                  onClick={() => setActiveTab('search')}
                >
                  Search &amp; Web
                </button>
              </div>
            </div>

            {/* Platforms Cards Grid */}
            <div className="mvp-cards-grid">
              {filteredPlatforms.map((platform) => (
                <div key={platform.id} className="mvp-platform-card">
                  <div className="mvp-card-top">
                    <div className="mvp-card-icon" style={{ borderColor: `${platform.color}30` }}>
                      {platform.icon}
                    </div>
                    <div className="mvp-card-titles">
                      <h3 className="mvp-card-name">{platform.name}</h3>
                      <span className="mvp-card-tagline">{platform.tagline}</span>
                    </div>
                  </div>

                  <p className="mvp-card-desc">{platform.description}</p>

                  <div className="mvp-features-list">
                    {platform.features.map((feat, idx) => (
                      <div key={idx} className="mvp-feature-item">
                        <CheckCircle2 size={13} style={{ color: platform.color, flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mvp-card-footer">
                    <button
                      type="button"
                      className="mvp-launch-btn"
                      onClick={() => navigate(platform.launchPath)}
                      style={{ color: platform.color }}
                    >
                      <span>Launch {platform.name} Tool</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Cross-Platform Content Sharing with zBox & CRM */}
          <section className="make-ai-sharing-card">
            <div className="sharing-card-content">
              <div className="sharing-pill">
                <Share2 size={13} color="#2563EB" />
                <span>Connected Communication</span>
              </div>
              <h2>Unified Content Sharing via zBox &amp; CRM nErgy</h2>
              <p>
                Within Zunme, you don't just generate text or images — you can instantly distribute them. With our encrypted <strong>zBox Webmail</strong> and <strong>CRM nErgy</strong> pipeline, send content directly to your clients, social channels, or zBox cloud vault in 1 click without tab-hopping.
              </p>
              <div className="sharing-actions">
                <NavLink to="/zbox" className="btn btn-primary">
                  Open zBox Webmail
                </NavLink>
                <NavLink to="/business" className="btn btn-secondary">
                  View CRM Pipeline
                </NavLink>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MakeAIWorkPage;
