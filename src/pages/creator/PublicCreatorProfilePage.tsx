import React, { useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Download,
  Share2,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HireCreatorModal } from '../../components/modals/HireCreatorModal';
import { AssetPaywallModal } from '../../components/modals/AssetPaywallModal';
import './PublicCreatorProfilePage.css';

interface CreatorAsset {
  id: string;
  title: string;
  category: string;
  downloads: number;
  likes: number;
  isPro: boolean;
  format: string;
}

export const PublicCreatorProfilePage: React.FC = () => {
  const { creatorId } = useParams<{ creatorId: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(1420);
  const [activeTab, setActiveTab] = useState<'assets' | 'reviews' | 'about'>('assets');
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedPaywallAsset, setSelectedPaywallAsset] = useState<CreatorAsset | null>(null);

  // Format dynamic creator handle and display name for known or arbitrary creatorId
  const formattedName = creatorId
    ? creatorId
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : 'Marcus Vance';

  // Mock creator portfolio mapping
  const creator = {
    id: creatorId || 'marcus-vance',
    name: creatorId === 'sarah-chen' ? 'Sarah Chen' : formattedName,
    handle: creatorId ? `@${creatorId.replace(/-/g, '_')}` : '@marcus_vance',
    tier: creatorId === 'sophia-lin' || creatorId === 'david-kim'
      ? 'Tier 1 • Emerging Creator'
      : creatorId === 'marcus-vance' || !creatorId
      ? 'Tier 3 • Master Partner'
      : 'Tier 2 • Verified Pro',
    badge: 'Verified Creator',
    bio: creatorId === 'sarah-chen'
      ? 'Specializing in LLM reasoning chains, autonomous agent workflows, and programmatic SEO.'
      : 'Pioneering multimodal prompt architecture, enterprise SEO blueprints, and executive content frameworks. Trusted by 5,000+ creators on Zunme AI.',
    specialty: 'Prompt Engineering & Topical SEO Architecture',
    rating: 4.95,
    reviewsCount: 184,
    totalDownloads: '48.2k',
    totalAssets: 24,
    joinedDate: 'November 2024'
  };

  const assets: CreatorAsset[] = [
    {
      id: 'ast-1',
      title: 'Topical Authority SEO Cluster Architect (12 Nodes)',
      category: 'SEO Blueprints',
      downloads: 5120,
      likes: 420,
      isPro: true,
      format: 'Workflow Schema'
    },
    {
      id: 'ast-2',
      title: 'High-Converting B2B LinkedIn Carousel Blueprint',
      category: 'Social Media',
      downloads: 8940,
      likes: 710,
      isPro: false,
      format: 'Template Preset'
    },
    {
      id: 'ast-3',
      title: 'Multimodal E-Commerce Product Ad Video Script Framework',
      category: 'Video Scripts',
      downloads: 3200,
      likes: 290,
      isPro: true,
      format: 'Story Script'
    },
    {
      id: 'ast-4',
      title: 'Newsletter Growth Hook Engine (50 Open-Loop Hooks)',
      category: 'Email & Copy',
      downloads: 6410,
      likes: 530,
      isPro: false,
      format: 'Copy Pack'
    }
  ];

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
      showToast(`Unfollowed ${creator.name}`, 'info');
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
      showToast(`You are now following ${creator.name}! You will receive new asset alerts.`, 'success');
    }
  };

  const handleAssetClick = (asset: CreatorAsset) => {
    if (asset.isPro) {
      setSelectedPaywallAsset(asset);
    } else {
      showToast(`Asset "${asset.title}" copied to your clipboard & saved to library!`, 'success');
    }
  };

  return (
    <div className="creator-profile-page">
      {/* Top Banner Navigation */}
      <div className="creator-profile-topbar">
        <div className="creator-profile-container">
          <button
            type="button"
            className="btn-back-link"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            <span>Back to Workspace</span>
          </button>
          <NavLink to="/" className="creator-profile-brand">
            <img src="/zunme_logo.png" alt="Zunme AI" style={{ height: '30px', width: 'auto', display: 'block' }} />
          </NavLink>
        </div>
      </div>

      {/* Hero Banner Header */}
      <div className="creator-hero-banner">
        <div className="creator-profile-container">
          <div className="creator-hero-card">
            <div className="creator-avatar-wrap">
              <div className="creator-avatar-letter">
                {creator.name.charAt(0)}
              </div>
              <div className="creator-verified-badge" title="Verified Zunme Creator">
                <ShieldCheck size={18} />
              </div>
            </div>

            <div className="creator-details">
              <div className="creator-name-row">
                <h1 className="creator-name">{creator.name}</h1>
                <span className="creator-tier-pill">{creator.tier}</span>
                <span className="creator-specialty-badge">{creator.badge}</span>
              </div>
              <p className="creator-handle">{creator.handle} • Joined {creator.joinedDate}</p>
              <p className="creator-bio">{creator.bio}</p>

              <div className="creator-metrics-row">
                <div className="c-metric">
                  <span className="c-metric-val">{creator.totalDownloads}</span>
                  <span className="c-metric-lbl">Total Downloads</span>
                </div>
                <div className="c-metric-divider" />
                <div className="c-metric">
                  <span className="c-metric-val">{followerCount.toLocaleString()}</span>
                  <span className="c-metric-lbl">Followers</span>
                </div>
                <div className="c-metric-divider" />
                <div className="c-metric">
                  <span className="c-metric-val">
                    <Star size={14} className="star-icon" fill="#F59E0B" />
                    {creator.rating}
                  </span>
                  <span className="c-metric-lbl">{creator.reviewsCount} Reviews</span>
                </div>
              </div>
            </div>

            <div className="creator-hero-actions">
              <button
                type="button"
                className={`btn-follow ${isFollowing ? 'is-following' : ''}`}
                onClick={handleFollowToggle}
              >
                <Heart size={15} fill={isFollowing ? 'currentColor' : 'none'} />
                <span>{isFollowing ? 'Following' : 'Follow Creator'}</span>
              </button>
              <button
                type="button"
                className="btn-hire-creator"
                onClick={() => setIsHireModalOpen(true)}
              >
                <Briefcase size={15} />
                <span>Hire for Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Portfolio Section */}
      <div className="creator-body-section">
        <div className="creator-profile-container">
          <div className="creator-tabs-bar">
            <button
              type="button"
              className={`creator-tab ${activeTab === 'assets' ? 'active' : ''}`}
              onClick={() => setActiveTab('assets')}
            >
              <Layers size={15} />
              <span>Published Assets ({assets.length})</span>
            </button>
            <button
              type="button"
              className={`creator-tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star size={15} />
              <span>Reviews ({creator.reviewsCount})</span>
            </button>
            <button
              type="button"
              className={`creator-tab ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <Award size={15} />
              <span>Creator Credentials</span>
            </button>
          </div>

          {/* Tab 1: Published Assets */}
          {activeTab === 'assets' && (
            <div className="creator-assets-grid">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="creator-asset-card"
                  onClick={() => handleAssetClick(asset)}
                >
                  <div className="asset-card-top">
                    <span className="asset-category-pill">{asset.category}</span>
                    {asset.isPro ? (
                      <span className="asset-pro-badge">PRO ONLY</span>
                    ) : (
                      <span className="asset-free-badge">COMMUNITY FREE</span>
                    )}
                  </div>
                  <h3 className="asset-card-title">{asset.title}</h3>
                  <div className="asset-format-meta">{asset.format}</div>
                  <div className="asset-card-footer">
                    <div className="asset-downloads">
                      <Download size={13} />
                      <span>{asset.downloads.toLocaleString()} downloads</span>
                    </div>
                    <span className="asset-action-link">
                      {asset.isPro ? 'Unlock Pro Asset →' : 'Use in Workspace →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Reviews */}
          {activeTab === 'reviews' && (
            <div className="creator-reviews-list">
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-name">Alex Johnson, Head of Content</div>
                  <div className="review-stars">★★★★★</div>
                </div>
                <p className="review-text">
                  "Marcus's SEO clusters transformed our organic strategy. The topical maps are mathematically sound and generate immediate ranking velocity."
                </p>
                <div className="review-date">Verified Purchase • 2 weeks ago</div>
              </div>
              <div className="review-card">
                <div className="review-header">
                  <div className="reviewer-name">Elena Rostova, Founder</div>
                  <div className="review-stars">★★★★★</div>
                </div>
                <p className="review-text">
                  "Hired Marcus for a custom LinkedIn newsletter campaign. Delivered ahead of schedule with 10 stellar templates."
                </p>
                <div className="review-date">Custom Project Review • 1 month ago</div>
              </div>
            </div>
          )}

          {/* Tab 3: About */}
          {activeTab === 'about' && (
            <div className="creator-credentials-panel">
              <div className="cred-item">
                <h4>Verified Creator Rights</h4>
                <p>All assets published under verified cryptographic authorship on Zunme AI, protected by digital copyright and licensing compliance.</p>
              </div>
              <div className="cred-item">
                <h4>Accepted Custom Commission Categories</h4>
                <p>SEO Topical Mapping, Technical Prompt Engineering, Enterprise Editorial Architecture, Newsletter Sequence Drafting.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hire Creator Modal */}
      <HireCreatorModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        creatorName={creator.name}
        creatorTier={creator.tier}
      />

      {/* Asset Paywall Modal */}
      {selectedPaywallAsset && (
        <AssetPaywallModal
          isOpen={!!selectedPaywallAsset}
          onClose={() => setSelectedPaywallAsset(null)}
          assetTitle={selectedPaywallAsset.title}
          creatorName={creator.name}
          category={selectedPaywallAsset.category}
        />
      )}
    </div>
  );
};
export default PublicCreatorProfilePage;
