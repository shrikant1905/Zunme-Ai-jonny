import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Megaphone,
  Eye,
  Layers,
  Sparkles,
  Smartphone,
  Laptop,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ShoppingBag,
  Search,
  Video,
  Play,
  RotateCcw,
  Check,
  Globe,
  SlidersHorizontal,
  Info,
  DollarSign,
  Tag,
  Star,
  PhoneCall,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './AdFormatBuildersPage.css';

type ChannelType = 'FACEBOOK' | 'AMAZON' | 'GOOGLE';

export const AdFormatBuildersPage: React.FC = () => {
  const { showToast } = useApp();

  const [activeChannel, setActiveChannel] = useState<ChannelType>('FACEBOOK');

  // Active Format per Channel
  const [fbFormat, setFbFormat] = useState<string>('CAROUSEL');
  const [amzFormat, setAmzFormat] = useState<string>('SPONSORED_BRANDS');
  const [googFormat, setGoogFormat] = useState<string>('SHOPPING');

  // Common Creative Fields
  const [adTitle, setAdTitle] = useState('Supercharge Workflow with Zunme AI Enterprise');
  const [adBody, setAdBody] = useState('Generate verified high-converting copy, animations, and multimodal assets in minutes.');
  const [ctaText, setCtaText] = useState('Learn More');
  const [destinationUrl, setDestinationUrl] = useState('https://zunme.ai/solutions');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');

  // Carousel Cards State (Facebook)
  const [carouselCards, setCarouselCards] = useState([
    { id: '1', title: 'AI Copywriting Engine', img: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=400&q=80', desc: '45+ Verified Sales Prompts' },
    { id: '2', title: 'Lottie Motion Presets', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', desc: 'Vector UI Animations' },
    { id: '3', title: 'Photorealistic Podiums', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80', desc: '8K Rendered Environments' }
  ]);

  // Lead Ad Questions (Facebook Lead Ads)
  const [leadQuestions, setLeadQuestions] = useState([
    'Full Name',
    'Work Email',
    'Company Size'
  ]);

  // Amazon Sponsored Brands 3-ASIN Showcase
  const [asins, setAsins] = useState([
    { asin: 'B08N5WRWNW', title: 'Zunme Wireless Productivity Pad', price: 49.99, rating: 4.8 },
    { asin: 'B09G9FPHY6', title: 'Ergonomic Creator Desk Stand', price: 79.00, rating: 4.9 },
    { asin: 'B07VGRJDFY', title: 'Studio Ambient Backlight Bar', price: 34.50, rating: 4.7 }
  ]);

  // Google Shopping Details
  const [productPrice, setProductPrice] = useState('29.99');
  const [merchantName, setMerchantName] = useState('Zunme Official Store');

  // Handle Export / Deploy
  const handleDeployDraft = () => {
    showToast(`Ad creative payload generated for ${activeChannel} (${activeChannel === 'FACEBOOK' ? fbFormat : activeChannel === 'AMAZON' ? amzFormat : googFormat}). Saved to session (Demo).`, 'success');
  };

  const addCarouselCard = () => {
    if (carouselCards.length >= 10) {
      showToast('Maximum 10 carousel cards allowed per Facebook ad specifications.', 'error');
      return;
    }
    const newId = String(carouselCards.length + 1);
    setCarouselCards(prev => [
      ...prev,
      { id: newId, title: `Asset Card #${newId}`, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', desc: 'Custom Product Description' }
    ]);
  };

  const removeCarouselCard = (id: string) => {
    if (carouselCards.length <= 2) {
      showToast('Carousel ads require a minimum of 2 cards.', 'error');
      return;
    }
    setCarouselCards(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="ad-builders-container">
      {/* Header Banner */}
      <div className="ad-builders-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary">Multichannel Ad Studio</span>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Document B Ad Specification Matrix</span>
          </div>
          <h1 className="ad-builders-title" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            Advertising Format Builders &amp; Live Simulators
          </h1>
        </div>

        <div className="ad-builders-header-actions" style={{ display: 'flex', gap: '10px' }}>
          <NavLink to="/ads/onboarding" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>
            <span>7-Step Setup Wizard</span>
          </NavLink>
          <NavLink to="/ads/overview" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
            <Megaphone size={14} />
            <span>Ads Dashboard</span>
          </NavLink>
        </div>
      </div>

      {/* Channel Switcher */}
      <div className="channel-switcher-bar">
        <button
          type="button"
          className={`channel-btn ${activeChannel === 'FACEBOOK' ? 'active' : ''}`}
          onClick={() => setActiveChannel('FACEBOOK')}
        >
          <span>Facebook / Meta (12 Formats)</span>
        </button>

        <button
          type="button"
          className={`channel-btn ${activeChannel === 'AMAZON' ? 'active' : ''}`}
          onClick={() => setActiveChannel('AMAZON')}
        >
          <span>Amazon Advertising (4 Formats)</span>
        </button>

        <button
          type="button"
          className={`channel-btn ${activeChannel === 'GOOGLE' ? 'active' : ''}`}
          onClick={() => setActiveChannel('GOOGLE')}
        >
          <span>Google Ads (9 Formats)</span>
        </button>
      </div>

      {/* Format Selection Pills Row */}
      <div className="format-pills-row">
        {activeChannel === 'FACEBOOK' && [
          'IMAGE', 'VIDEO', 'CAROUSEL', 'COLLECTION', 'INSTANT_EXPERIENCE',
          'LEAD_ADS', 'MESSENGER', 'STORIES', 'PLAYABLE', 'DYNAMIC', 'AR_ADS', 'OFFER_ADS'
        ].map(fmt => (
          <button
            key={fmt}
            type="button"
            className={`format-pill ${fbFormat === fmt ? 'active' : ''}`}
            onClick={() => setFbFormat(fmt)}
          >
            {fmt.replace('_', ' ')}
          </button>
        ))}

        {activeChannel === 'AMAZON' && [
          'SPONSORED_PRODUCTS', 'SPONSORED_BRANDS', 'SPONSORED_DISPLAY', 'AMAZON_DSP'
        ].map(fmt => (
          <button
            key={fmt}
            type="button"
            className={`format-pill ${amzFormat === fmt ? 'active' : ''}`}
            onClick={() => setAmzFormat(fmt)}
          >
            {fmt.replace('_', ' ')}
          </button>
        ))}

        {activeChannel === 'GOOGLE' && [
          'SEARCH', 'DISPLAY', 'SHOPPING', 'VIDEO', 'APP', 'DISCOVERY', 'LOCAL_SERVICES', 'PERFORMANCE_MAX', 'SMART'
        ].map(fmt => (
          <button
            key={fmt}
            type="button"
            className={`format-pill ${googFormat === fmt ? 'active' : ''}`}
            onClick={() => setGoogFormat(fmt)}
          >
            {fmt.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main Builder Grid: Configuration (Left) & Real-time Live Simulator (Right) */}
      <div className="builder-workspace-grid">
        {/* Left Column: Tailored Creative Inputs */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="panel-header">
            <div className="panel-title">
              <SlidersHorizontal size={18} color="var(--color-primary)" />
              {activeChannel} • {activeChannel === 'FACEBOOK' ? fbFormat : activeChannel === 'AMAZON' ? amzFormat : googFormat} Builder
            </div>
            <span className="badge badge-primary">Client Compliant</span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Headline / Ad Title
            </label>
            <input
              type="text"
              className="input-field"
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
              Primary Text / Description
            </label>
            <textarea
              className="input-field"
              style={{ minHeight: '70px' }}
              value={adBody}
              onChange={(e) => setAdBody(e.target.value)}
            />
          </div>

          {/* Format-Specific Configuration Controls */}
          {activeChannel === 'FACEBOOK' && fbFormat === 'CAROUSEL' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700 }}>
                  Carousel Cards ({carouselCards.length}/10)
                </label>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={addCarouselCard}
                >
                  <Plus size={13} />
                  <span>Add Card</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {carouselCards.map((c, i) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, width: '20px' }}>#{i + 1}</span>
                    <input
                      type="text"
                      className="input-field"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                      value={c.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCarouselCards(prev => prev.map(card => card.id === c.id ? { ...card, title: val } : card));
                      }}
                    />
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => removeCarouselCard(c.id)}
                      style={{ color: '#E11D48', padding: '4px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeChannel === 'FACEBOOK' && fbFormat === 'LEAD_ADS' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Instant Lead Capture Form Fields
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {leadQuestions.map((q, idx) => (
                  <div key={idx} style={{ padding: '8px 12px', background: '#F1F5F9', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#059669" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeChannel === 'AMAZON' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Targeting ASINs (Amazon Standard Identification Numbers)
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {asins.map(a => (
                  <div key={a.asin} style={{ padding: '8px 12px', background: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: '6px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{a.asin}</strong>
                    <span>{a.title}</span>
                    <span style={{ fontWeight: 700, color: '#D97706' }}>${a.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeChannel === 'GOOGLE' && googFormat === 'SHOPPING' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Price ($)</label>
                <input
                  type="text"
                  className="input-field"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Store Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Call To Action</label>
              <select
                className="input-field"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
              >
                <option value="Learn More">Learn More</option>
                <option value="Shop Now">Shop Now</option>
                <option value="Sign Up">Sign Up</option>
                <option value="Get Quote">Get Quote</option>
                <option value="Download">Download</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Destination URL</label>
              <input
                type="url"
                className="input-field"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDeployDraft}
            style={{ justifyContent: 'center', marginTop: '6px' }}
          >
            <Send size={15} />
            <span>Save &amp; Generate Formatted Campaign Payload</span>
          </button>
        </div>

        {/* Right Column: Live High-Fidelity Simulator */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="panel-header">
              <div className="panel-title">
                <Eye size={18} color="#0284C7" />
                Live Channel Placement Simulator
              </div>
              <span className="badge badge-success">Specs Verified</span>
            </div>

            {/* PREVIEW 1: FACEBOOK STORIES (VERTICAL 9:16) */}
            {activeChannel === 'FACEBOOK' && fbFormat === 'STORIES' ? (
              <div className="phone-simulator-frame">
                <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                  <img src={mediaUrl} alt="Story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#6E56CF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>Z</div>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>Zunme AI Sponsored</span>
                </div>
                <div style={{ position: 'absolute', bottom: 20, insetInline: 20, textAlign: 'center', zIndex: 10 }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.8)', marginBottom: '10px' }}>{adTitle}</p>
                  <div style={{ padding: '10px', background: 'rgba(255,255,255,0.95)', color: '#111625', borderRadius: '20px', fontWeight: 800, fontSize: '13px' }}>
                    {ctaText} ↑
                  </div>
                </div>
              </div>
            ) : activeChannel === 'FACEBOOK' && fbFormat === 'CAROUSEL' ? (
              /* PREVIEW 2: FACEBOOK CAROUSEL (SCROLLABLE CARDS) */
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#6E56CF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>Z</div>
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block' }}>Zunme AI</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Sponsored • Carousel Ad</span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', marginBottom: '10px' }}>{adBody}</p>

                <div className="carousel-preview-strip">
                  {carouselCards.map(c => (
                    <div key={c.id} className="carousel-card-item">
                      <div style={{ height: '140px', background: '#F1F5F9' }}>
                        <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '10px' }}>
                        <strong style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>{c.title}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginBottom: '8px' }}>{c.desc}</span>
                        <div style={{ background: '#F1F5F9', textAlign: 'center', padding: '6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                          {ctaText}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeChannel === 'AMAZON' && amzFormat === 'SPONSORED_BRANDS' ? (
              /* PREVIEW 3: AMAZON SPONSORED BRANDS BANNER */
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                <span style={{ fontSize: '10px', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Sponsored by Zunme Enterprise</span>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F1111', lineHeight: 1.3 }}>{adTitle}</h3>
                    <div style={{ marginTop: '8px', display: 'inline-block', background: '#FFD814', color: '#0F1111', padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: 700 }}>
                      Shop Zunme Store
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {asins.map(a => (
                      <div key={a.asin} style={{ flex: 1, border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', textAlign: 'center' }}>
                        <div style={{ height: '70px', background: '#F8FAFC', borderRadius: '4px', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ShoppingBag size={24} color="#D97706" />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</span>
                        <strong style={{ fontSize: '12px', color: '#B12704' }}>${a.price.toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeChannel === 'GOOGLE' && googFormat === 'SHOPPING' ? (
              /* PREVIEW 4: GOOGLE SHOPPING LISTING CARD */
              <div style={{ maxWidth: '240px', background: '#FFFFFF', border: '1px solid #DADCE0', borderRadius: '8px', overflow: 'hidden', padding: '10px' }}>
                <div style={{ height: '160px', background: '#F8FAFC', borderRadius: '6px', overflow: 'hidden', marginBottom: '8px' }}>
                  <img src={mediaUrl} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#202124', lineHeight: 1.3, marginBottom: '4px' }}>
                  {adTitle}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#202124', marginBottom: '2px' }}>
                  ${productPrice}
                </div>
                <div style={{ fontSize: '11px', color: '#5F6368', marginBottom: '4px' }}>
                  {merchantName}
                </div>
                <div style={{ fontSize: '11px', color: '#137333', fontWeight: 600 }}>
                  Free shipping • 4.9 ★ (120)
                </div>
              </div>
            ) : (
              /* DEFAULT / FALLBACK FEED PREVIEW */
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>Z</div>
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block' }}>Zunme Sponsored Ad</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{activeChannel} • Verified Ad Unit</span>
                  </div>
                </div>
                <div style={{ padding: '0 14px 10px', fontSize: '13px' }}>
                  <p style={{ fontWeight: 700, marginBottom: '4px' }}>{adTitle}</p>
                  <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>{adBody}</p>
                </div>
                <div style={{ height: '200px', background: '#F1F5F9' }}>
                  <img src={mediaUrl} alt="Creative" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFBFD' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{destinationUrl}</span>
                  <div style={{ background: 'var(--color-primary)', color: '#FFFFFF', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                    {ctaText}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px', padding: '10px 14px', background: '#FEF3E2', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#B45309' }}>
            <strong>Demo Simulator Notice:</strong> Renders visual preview conforming to Meta, Amazon, and Google developer display requirements. No external ad spend is incurred.
          </div>
        </div>
      </div>
    </div>
  );
};
