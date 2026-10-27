import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Sparkles,
  Search,
  Filter,
  Star,
  Download,
  Eye,
  ArrowRight,
  ArrowLeft,
  Store,
  Layers,
  Film,
  Smile,
  Image as ImageIcon,
  Video,
  Bot,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  Tag,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './ZunmeStorePage.css';

export type StoreCategoryType = 
  | 'All'
  | 'AI Content'
  | 'Animation'
  | 'Cartoon'
  | 'Images / Photos'
  | 'Videos / AI Videos'
  | 'AI Builder';

export interface StoreItem {
  id: string;
  title: string;
  category: 'AI Content' | 'Animation' | 'Cartoon' | 'Images / Photos' | 'Videos / AI Videos' | 'AI Builder';
  description: string;
  thumbnail: string;
  author: string;
  authorHandle: string;
  rating: number;
  reviewsCount: number;
  downloads: number;
  price: number;
  isFree: boolean;
  tags: string[];
  specs: string[];
  demoLicense: 'Standard Commercial' | 'Extended Multi-Use' | 'Creative Commons Demo';
  createdAt: string;
}

const SAMPLE_STORE_ITEMS: StoreItem[] = [
  // 1. AI Content
  {
    id: 'item-content-1',
    title: 'Enterprise B2B Lead-Gen & Copywriting Pack',
    category: 'AI Content',
    description: 'Comprehensive 45-module prompt framework for executive thought leadership, case study narratives, and outbound sales sequences.',
    thumbnail: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=600&q=80',
    author: 'Elena Vance',
    authorHandle: '@elena_ai',
    rating: 4.96,
    reviewsCount: 184,
    downloads: 3420,
    price: 29.0,
    isFree: false,
    tags: ['B2B', 'Copywriting', 'ColdEmail', 'Prompts'],
    specs: ['45 Prompt Files', 'Markdown & JSON', 'Compatible with Zunme Omni-4 & GPT-4'],
    demoLicense: 'Standard Commercial',
    createdAt: '2026-09-15'
  },
  {
    id: 'item-content-2',
    title: 'Viral Social Media Hook & Headline Swipe File',
    category: 'AI Content',
    description: 'Over 200 battle-tested algorithmic hooks for LinkedIn carousels, X threads, and YouTube Shorts retention.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    author: 'Marcus Brody',
    authorHandle: '@marcus_growth',
    rating: 4.88,
    reviewsCount: 92,
    downloads: 2150,
    price: 0,
    isFree: true,
    tags: ['Hooks', 'Headlines', 'SocialMedia', 'Viral'],
    specs: ['200+ Templates', 'PDF & Notion Hub', 'Lifetime Free Updates'],
    demoLicense: 'Creative Commons Demo',
    createdAt: '2026-09-28'
  },

  // 2. Animation
  {
    id: 'item-anim-1',
    title: 'Cyberpunk Tech HUD & UI Motion Graphic Assets',
    category: 'Animation',
    description: 'Futuristic sci-fi heads-up display motion graphics, holographic charts, and looping cybernetic indicators.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    author: 'Kaelen Voss',
    authorHandle: '@voss_fx',
    rating: 4.92,
    reviewsCount: 76,
    downloads: 1480,
    price: 39.0,
    isFree: false,
    tags: ['Animation', 'HUD', 'Lottie', 'AfterEffects', 'SciFi'],
    specs: ['4K 60fps Alpha Channel', 'Lottie JSON + MP4', 'Transparent Background'],
    demoLicense: 'Extended Multi-Use',
    createdAt: '2026-08-20'
  },
  {
    id: 'item-anim-2',
    title: 'SaaS Micro-Interactions Lottie Animation Pack',
    category: 'Animation',
    description: 'Clean vector animations for web apps: success checkmarks, upload spinners, celebration confetti, and empty states.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    author: 'Sophie Martin',
    authorHandle: '@sophie_motion',
    rating: 4.98,
    reviewsCount: 140,
    downloads: 4120,
    price: 19.0,
    isFree: false,
    tags: ['Lottie', 'UIAnimation', 'SaaS', 'WebDesign'],
    specs: ['32 Lottie JSONs', 'DotLottie + GIF', 'React / Webflow Ready'],
    demoLicense: 'Standard Commercial',
    createdAt: '2026-09-02'
  },

  // 3. Cartoon
  {
    id: 'item-cart-1',
    title: 'Neo-Tokyo Anime Character Vector Avatar Collection',
    category: 'Cartoon',
    description: 'Hand-crafted high resolution anime avatars with 120 interchangeable hairstyles, expressions, and accessories.',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    author: 'Kenji Takahashi',
    authorHandle: '@kenji_art',
    rating: 4.94,
    reviewsCount: 110,
    downloads: 2890,
    price: 24.0,
    isFree: false,
    tags: ['Anime', 'Vector', 'Avatar', 'Cartoon', 'CharacterDesign'],
    specs: ['SVG & Figma Component Library', '4000x4000 Transparent PNGs'],
    demoLicense: 'Standard Commercial',
    createdAt: '2026-08-11'
  },
  {
    id: 'item-cart-2',
    title: 'Friendly Tech Mascot 3D Cartoon Expressions',
    category: 'Cartoon',
    description: 'Charming 3D rendered mascot characters for onboarding walkthroughs, brand identity, and customer support illustrations.',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    author: 'Clara Oswald',
    authorHandle: '@clara_3d',
    rating: 4.9,
    reviewsCount: 64,
    downloads: 1670,
    price: 0,
    isFree: true,
    tags: ['3DCartoon', 'Mascot', 'Illustrations', 'BrandAsset'],
    specs: ['24 Rendered Poses', 'High-Res Alpha PNGs', 'Blender Rig Included'],
    demoLicense: 'Creative Commons Demo',
    createdAt: '2026-09-18'
  },

  // 4. Images / Photos
  {
    id: 'item-img-1',
    title: 'Hyper-Realistic Studio Product Podiums & Backdrops',
    category: 'Images / Photos',
    description: 'Pristine 8K photorealistic marble, concrete, and minimalist podium environments tailored for e-commerce product mockups.',
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    author: 'Studio Minimal',
    authorHandle: '@minimal_spaces',
    rating: 4.97,
    reviewsCount: 230,
    downloads: 5120,
    price: 35.0,
    isFree: false,
    tags: ['StockPhoto', 'Podium', 'ProductPhotography', '8K', 'Minimalist'],
    specs: ['50 RAW Uncompressed Images', '8192 x 5464 Resolution', 'sRGB Pro Color Profile'],
    demoLicense: 'Extended Multi-Use',
    createdAt: '2026-07-29'
  },
  {
    id: 'item-img-2',
    title: 'Global Remote Workplace & Diversity Editorial Pack',
    category: 'Images / Photos',
    description: 'Authentic high-end photography depicting distributed tech teams, modern collaborative spaces, and creative workspaces.',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    author: 'Daniel Zhao',
    authorHandle: '@zhao_photos',
    rating: 4.89,
    reviewsCount: 88,
    downloads: 1980,
    price: 0,
    isFree: true,
    tags: ['Editorial', 'Workplace', 'Startup', 'Photography', 'Free'],
    specs: ['30 Curated Photos', 'Full Commercial Clearance', 'Web & Print Ready'],
    demoLicense: 'Creative Commons Demo',
    createdAt: '2026-09-10'
  },

  // 5. Videos / AI Videos
  {
    id: 'item-vid-1',
    title: 'AI Drone Aerotropolis & Futuristic Megacity B-Roll',
    category: 'Videos / AI Videos',
    description: 'Breathtaking 4K drone cinematography generated with state-of-the-art spatial AI, showcasing smart cities and vertical gardens.',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    author: 'AeroAI Studios',
    authorHandle: '@aero_visuals',
    rating: 4.95,
    reviewsCount: 165,
    downloads: 3200,
    price: 49.0,
    isFree: false,
    tags: ['AIVideo', 'BRoll', '4KDrone', 'Futuristic', 'SmartCity'],
    specs: ['12 ProRes 422 Clips', '3840x2160 30fps', 'Royalty-Free Audio Included'],
    demoLicense: 'Standard Commercial',
    createdAt: '2026-08-30'
  },
  {
    id: 'item-vid-2',
    title: 'Organic Liquid Chrome & Abstract Fluid Motion Reels',
    category: 'Videos / AI Videos',
    description: 'Mesmerizing vertical 9:16 background reels designed for high-aesthetic TikTok, Instagram Reels, and luxury brand ads.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    author: 'Liquid Lab',
    authorHandle: '@liquid_lab',
    rating: 4.91,
    reviewsCount: 94,
    downloads: 2450,
    price: 22.0,
    isFree: false,
    tags: ['VerticalVideo', 'FluidMotion', 'InstagramReels', 'TikTokAds'],
    specs: ['10 Seamless Loops', '1080x1920 Vertical', 'H.264 / MP4'],
    demoLicense: 'Standard Commercial',
    createdAt: '2026-09-22'
  },

  // 6. AI Builder
  {
    id: 'item-bld-1',
    title: 'Autonomous Competitor Price Scraper & Alert Agent',
    category: 'AI Builder',
    description: 'Configurable autonomous agent workflow that monitors competitor e-commerce catalogs, parses pricing, and flags price-drop alerts.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    author: 'DevMatrix Lab',
    authorHandle: '@devmatrix',
    rating: 4.98,
    reviewsCount: 210,
    downloads: 4890,
    price: 59.0,
    isFree: false,
    tags: ['AIBuilder', 'Agent', 'Scraper', 'Automation', 'PriceTracking'],
    specs: ['Node.js + Python Scripts', 'Zunme Agent Spec v2.1', 'Webhook Integration'],
    demoLicense: 'Extended Multi-Use',
    createdAt: '2026-09-05'
  },
  {
    id: 'item-bld-2',
    title: 'Customer Support FAQ Classifier & Auto-Responder Bot',
    category: 'AI Builder',
    description: 'Pre-trained retrieval agent that ingests help documentation and answers customer queries with 94% first-contact resolution.',
    thumbnail: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80',
    author: 'SupportIQ',
    authorHandle: '@support_iq',
    rating: 4.93,
    reviewsCount: 120,
    downloads: 2950,
    price: 0,
    isFree: true,
    tags: ['AIBuilder', 'Chatbot', 'CustomerSupport', 'RAG', 'Agent'],
    specs: ['Embeddings Pipeline Config', 'Pre-built Guardrails', 'CRM Sync Compatible'],
    demoLicense: 'Creative Commons Demo',
    createdAt: '2026-09-14'
  }
];

export const ZunmeStorePage: React.FC = () => {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  // Normalize route param to Category
  const categoryMap: Record<string, StoreCategoryType> = {
    'ai content': 'AI Content',
    'ai-content': 'AI Content',
    'animation': 'Animation',
    'cartoon': 'Cartoon',
    'images / photos': 'Images / Photos',
    'images-photos': 'Images / Photos',
    'images': 'Images / Photos',
    'videos / ai videos': 'Videos / AI Videos',
    'videos': 'Videos / AI Videos',
    'ai-videos': 'Videos / AI Videos',
    'ai builder': 'AI Builder',
    'ai-builder': 'AI Builder',
    'builder': 'AI Builder'
  };

  const getCategoryFromRoute = (param?: string): StoreCategoryType => {
    if (!param) return 'All';
    const decoded = decodeURIComponent(param).toLowerCase().trim();
    return categoryMap[decoded] || 'All';
  };

  const [selectedCategory, setSelectedCategory] = useState<StoreCategoryType>(() => getCategoryFromRoute(routeCategory));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'downloads' | 'price-low' | 'price-high'>('featured');
  const [filterPrice, setFilterPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [activeItemModal, setActiveItemModal] = useState<StoreItem | null>(null);

  // Sync selectedCategory when user clicks sidebar category links
  useEffect(() => {
    setSelectedCategory(getCategoryFromRoute(routeCategory));
  }, [routeCategory]);

  const categories: { label: StoreCategoryType; icon: React.ReactNode; count: number }[] = [
    { label: 'All', icon: <Layers size={15} />, count: SAMPLE_STORE_ITEMS.length },
    { label: 'AI Content', icon: <Sparkles size={15} />, count: SAMPLE_STORE_ITEMS.filter(i => i.category === 'AI Content').length },
    { label: 'Animation', icon: <Film size={15} />, count: SAMPLE_STORE_ITEMS.filter(i => i.category === 'Animation').length },
    { label: 'Cartoon', icon: <Smile size={15} />, count: SAMPLE_STORE_ITEMS.filter(i => i.category === 'Cartoon').length },
    { label: 'Images / Photos', icon: <ImageIcon size={15} />, count: SAMPLE_STORE_ITEMS.filter(i => i.category === 'Images / Photos').length },
    { label: 'Videos / AI Videos', icon: <Video size={15} />, count: SAMPLE_STORE_ITEMS.filter(i => i.category === 'Videos / AI Videos').length },
    { label: 'AI Builder', icon: <Bot size={15} />, count: SAMPLE_STORE_ITEMS.filter(i => i.category === 'AI Builder').length }
  ];

  const filteredItems = useMemo(() => {
    return SAMPLE_STORE_ITEMS.filter(item => {
      // Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTag = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTag) return false;
      }
      // Price Filter
      if (filterPrice === 'free' && !item.isFree) return false;
      if (filterPrice === 'paid' && item.isFree) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy, filterPrice]);

  const handleDownloadDemo = (item: StoreItem) => {
    showToast(`Asset "${item.title}" added to your workspace library (Demo Prototype).`, 'success');
    setActiveItemModal(null);
  };

  return (
    <div className="public-store-wrapper">
      {/* Background Atmosphere Layers */}
      <div className="cosmic-grid-overlay" aria-hidden="true" />
      <div className="ambient-aurora-top" aria-hidden="true" />
      <div className="ambient-aurora-accent" aria-hidden="true" />

      {/* Top Public Header */}
      <header className="public-store-topbar">
        <div className="public-store-topbar-inner">
          <div className="public-store-brand-group">
            <NavLink to="/user/home" className="public-store-brand-link" title="Zunme AI Workspace">
              <img src="/zunme_logo.png" alt="Zunme AI" className="public-store-brand-logo" />
            </NavLink>
            <div className="public-store-brand-divider" />
            <div className="public-store-brand-tag">
              <ShoppingBag size={14} style={{ color: '#6E56CF' }} />
              <span>Zunme Digital Shop</span>
            </div>
          </div>

          <div className="public-store-topbar-actions">
            <NavLink to="/user/home" className="public-store-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </NavLink>
            <NavLink to="/merchant-zone" className="public-store-merchant-link">
              <Store size={15} />
              <span>Merchant Zone</span>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Store Content Stage */}
      <main className="public-store-main-stage">
        <div className="store-page-container">
          {/* Hero Banner */}
          <div className="store-hero-banner">
        <div className="store-hero-content">
          <div className="store-hero-badge">
            <ShoppingBag size={13} />
            <span>Zunme Digital Store • Verified Marketplace</span>
          </div>
          <h1 className="store-hero-title">
            Premium AI Assets, Motion &amp; Builder Components
          </h1>
          <p className="store-hero-subtitle">
            Explore ready-to-deploy AI content packs, Lottie animations, cartoon artwork, photorealistic backdrops, cinematic video reels, and autonomous AI builder agents created by verified specialists.
          </p>
          <div className="store-hero-actions">
            <NavLink to="/merchant-zone" className="btn btn-primary btn-glow" style={{ textDecoration: 'none' }}>
              <Store size={15} />
              <span>Merchant Zone (Sell Goods)</span>
            </NavLink>
            <NavLink to="/user/home" className="btn btn-ghost" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
              <span>Return to Workspace</span>
              <ChevronRight size={14} />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Navigation Bar */}
      <div className="store-categories-nav">
        {categories.map(cat => (
          <button
            key={cat.label}
            type="button"
            className={`store-category-pill ${selectedCategory === cat.label ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.label)}
          >
            {cat.icon}
            <span>{cat.label}</span>
            <span className="pill-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Controls Bar: Search, Price Filter, and Sorting */}
      <div className="store-controls-bar">
        <div className="store-search-box">
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder={`Search across ${selectedCategory === 'All' ? 'all 6 categories' : selectedCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <X size={15} color="var(--color-text-muted)" />
            </button>
          )}
        </div>

        <div className="store-filter-sort-group">
          {/* Price Selector */}
          <div className="store-price-filter-wrap" style={{ display: 'flex', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            <button
              type="button"
              onClick={() => setFilterPrice('all')}
              style={{
                border: 'none',
                background: filterPrice === 'all' ? 'var(--color-primary-light)' : 'transparent',
                color: filterPrice === 'all' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterPrice('free')}
              style={{
                border: 'none',
                background: filterPrice === 'free' ? 'var(--color-primary-light)' : 'transparent',
                color: filterPrice === 'free' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Free
            </button>
            <button
              type="button"
              onClick={() => setFilterPrice('paid')}
              style={{
                border: 'none',
                background: filterPrice === 'paid' ? 'var(--color-primary-light)' : 'transparent',
                color: filterPrice === 'paid' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Premium
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            className="store-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="rating">Highest Rated</option>
            <option value="downloads">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid or Empty State */}
      {filteredItems.length === 0 ? (
        <div className="store-empty-state">
          <ShoppingBag size={42} color="var(--color-text-muted)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
            No assets found
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Try adjusting your search keywords or switching categories.
          </p>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setFilterPrice('all'); }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="store-catalog-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="store-product-card">
              <div className="store-card-thumbnail-wrap">
                <img src={item.thumbnail} alt={item.title} className="store-card-thumbnail" loading="lazy" />
                <span className="store-card-category-badge">{item.category}</span>
                <span className="store-card-license-badge">{item.isFree ? 'Free' : `$${item.price.toFixed(2)}`}</span>
              </div>

              <div className="store-card-body">
                <h3 className="store-card-title" title={item.title}>
                  {item.title}
                </h3>
                <p className="store-card-description">
                  {item.description}
                </p>

                <div className="store-card-meta">
                  <div className="store-card-creator">
                    <span className="store-card-avatar">{item.author.charAt(0)}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.author}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{item.rating}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>({item.reviewsCount})</span>
                  </div>
                </div>

                <div className="store-card-footer">
                  <div>
                    <span className={`store-card-price ${item.isFree ? 'free' : ''}`}>
                      {item.isFree ? 'FREE' : `$${item.price.toFixed(2)}`}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>
                      {item.demoLicense}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline"
                      onClick={() => setActiveItemModal(item)}
                      title="Quick Preview"
                    >
                      <Eye size={14} />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDownloadDemo(item)}
                      title="Add to Workspace"
                    >
                      <Download size={14} />
                      <span>{item.isFree ? 'Get' : 'Buy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Merchant Callout Bar */}
      <div className="store-merchant-callout">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
            <Store size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#1E1648', margin: 0 }}>
              Are you an AI Creator or Digital Merchant?
            </h4>
            <p style={{ fontSize: '13px', color: '#5F6B85', margin: '4px 0 0 0' }}>
              Publish your animations, prompts, photo packs, and custom AI builders on the Zunme Store via the Merchant Zone.
            </p>
          </div>
        </div>

        <NavLink to="/merchant-zone" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
          <span>Open Merchant Zone</span>
          <ArrowRight size={14} />
        </NavLink>
      </div>

      {/* Product Detail / Preview Modal */}
      {activeItemModal && (
        <div className="store-modal-backdrop" onClick={() => setActiveItemModal(null)}>
          <div className="store-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-primary">{activeItemModal.category}</span>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>ID: {activeItemModal.id}</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setActiveItemModal(null)}
                style={{ padding: '6px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="store-modal-body">
              <div style={{ width: '100%', height: '240px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img
                  src={activeItemModal.thumbnail}
                  alt={activeItemModal.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  {activeItemModal.title}
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {activeItemModal.description}
                </p>
              </div>

              {/* Author & Metrics */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="store-card-avatar" style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                    {activeItemModal.author.charAt(0)}
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block', color: 'var(--color-text-primary)' }}>
                      {activeItemModal.author}
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {activeItemModal.authorHandle}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Rating</span>
                    <strong style={{ fontSize: '13px', color: '#D97706', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={13} fill="#D97706" /> {activeItemModal.rating}
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Downloads</span>
                    <strong style={{ fontSize: '13px', color: 'var(--color-text-primary)' }}>
                      {activeItemModal.downloads.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  Specifications &amp; Inclusions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {activeItemModal.specs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                      <CheckCircle2 size={15} color="var(--color-success)" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {activeItemModal.tags.map(t => (
                  <span key={t} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '3px 8px', borderRadius: '4px' }}>
                    #{t}
                  </span>
                ))}
              </div>

              {/* Prototype Notice */}
              <div style={{ padding: '10px 14px', background: '#FEF3E2', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#B45309' }}>
                <strong>Demo Prototype Notice:</strong> In this verification build, testing asset checkout loads the demo payload into your active session without external billing.
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block' }}>Licensing: {activeItemModal.demoLicense}</span>
                  <strong style={{ fontSize: '20px', color: 'var(--color-primary)' }}>
                    {activeItemModal.isFree ? 'FREE' : `$${activeItemModal.price.toFixed(2)}`}
                  </strong>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setActiveItemModal(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleDownloadDemo(activeItemModal)}
                  >
                    <Download size={15} />
                    <span>{activeItemModal.isFree ? 'Download Asset' : `Buy & Add to Library ($${activeItemModal.price})`}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </main>

      {/* Google-Style Public Footer */}
      <footer className="google-style-footer public-store-footer">
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
