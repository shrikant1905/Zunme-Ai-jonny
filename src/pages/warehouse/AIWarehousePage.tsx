import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Package,
  Search,
  Filter,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Download,
  Tag,
  ShieldCheck,
  X,
  ExternalLink,
  Layers,
  ArrowRight,
  UploadCloud,
  HardDrive,
  Folder,
  FolderPlus,
  LayoutGrid,
  List,
  Trash2,
  Copy,
  Check,
  FileText,
  FileCode,
  Video,
  Plus,
  AlertTriangle,
  MoveRight,
  Calendar,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssetPaywallModal } from '../../components/modals/AssetPaywallModal';
import { AudioPreviewWidget } from '../../components/studio/AudioPreviewWidget';
import '../../styles/dashboard.css';
import './AIWarehousePage.css';

export interface WarehouseManagedAsset {
  id: string;
  title: string;
  description: string;
  type: 'Prompt Pack' | 'Workflow' | 'Template' | 'Video Script' | 'Research Dataset' | 'Audio & Music';
  category: string;
  collection: string;
  sizeKb: number;
  tags: string[];
  licensing: 'Commercial Pro' | 'Standard Community' | 'MIT Open Source';
  downloads: number;
  creatorName: string;
  isVerifiedCreator: boolean;
  createdAt: string;
  content: string;
}

const INITIAL_WAREHOUSE_ASSETS: WarehouseManagedAsset[] = [
  {
    id: 'wh-1',
    title: 'Omnichannel B2B Cold Outreach Sequence',
    description: 'Multi-touch outbound email and LinkedIn sequence targeting decision makers.',
    type: 'Workflow',
    category: 'Email Marketing',
    collection: 'Client Pitches',
    sizeKb: 48,
    tags: ['B2B', 'ColdOutbound', 'Sales', 'Email'],
    licensing: 'Commercial Pro',
    downloads: 4820,
    creatorName: 'Alex Johnson',
    isVerifiedCreator: true,
    createdAt: '2026-10-02',
    content: 'Role: Senior Enterprise SDR\nStep 1: Pain point hook\nStep 2: Case study validation\nStep 3: Low friction CTA'
  },
  {
    id: 'wh-2',
    title: 'Viral YouTube Script & 3-Second Visual Hooks',
    description: 'High-retention video script structure with pacing cues and psychological hooks.',
    type: 'Video Script',
    category: 'Video',
    collection: 'YouTube Shorts',
    sizeKb: 124,
    tags: ['YouTube', 'Shorts', 'Storytelling', 'Video'],
    licensing: 'Commercial Pro',
    downloads: 3650,
    creatorName: 'Elena Rostova',
    isVerifiedCreator: true,
    createdAt: '2026-10-04',
    content: '[0:00 - 0:03] Extreme contrast visual hook\n[0:04 - 0:25] Premise setup\n[0:26 - 0:55] Payoff payoff'
  },
  {
    id: 'wh-3',
    title: 'Q4 Product Launch Press Release & Pitch Kit',
    description: 'Comprehensive media announcement blueprint with founder quotes and feature tables.',
    type: 'Template',
    category: 'Branding',
    collection: 'Q4 Campaigns',
    sizeKb: 86,
    tags: ['PR', 'ProductLaunch', 'Branding', 'MediaKit'],
    licensing: 'Commercial Pro',
    downloads: 1420,
    creatorName: 'Sarah Jenkins',
    isVerifiedCreator: true,
    createdAt: '2026-10-06',
    content: 'FOR IMMEDIATE RELEASE:\nHeadline: Zunme AI Launches Phase 2 Creator Marketplace\nCity/Date: San Francisco, Q4 2026'
  },
  {
    id: 'wh-4',
    title: 'Deep Semantic SEO Topical Cluster Architecture',
    description: 'Generates 1 pillar node and 12 cluster sub-articles with search intent classification.',
    type: 'Prompt Pack',
    category: 'SEO',
    collection: 'SEO Blueprints',
    sizeKb: 64,
    tags: ['SEO', 'SemanticSearch', 'TopicalAuthority', 'ContentStrategy'],
    licensing: 'Commercial Pro',
    downloads: 5120,
    creatorName: 'Marcus Vance',
    isVerifiedCreator: true,
    createdAt: '2026-10-08',
    content: 'Analyze Entity: Primary keyword -> Synthesize 12 topical cluster nodes with parent/child internal anchors.'
  },
  {
    id: 'wh-5',
    title: 'Executive Brand Voice Guidelines & Tone Matrix',
    description: 'Brand persona documentation, vocabulary blacklists, and executive communication rules.',
    type: 'Template',
    category: 'Branding',
    collection: 'Client Pitches',
    sizeKb: 112,
    tags: ['BrandVoice', 'ExecutiveStyle', 'StyleGuide'],
    licensing: 'Standard Community',
    downloads: 1870,
    creatorName: 'Alex Johnson',
    isVerifiedCreator: true,
    createdAt: '2026-10-09',
    content: 'Voice Principles: Crisp, authoritative, non-fluffy, hyper-relevant.'
  },
  {
    id: 'wh-6',
    title: 'Automated E-commerce Email Retargeting Funnel',
    description: 'Cart abandonment, post-purchase onboarding, and VIP customer winback triggers.',
    type: 'Workflow',
    category: 'Email Marketing',
    collection: 'Email Funnels',
    sizeKb: 92,
    tags: ['EmailFunnels', 'Ecommerce', 'Retargeting', 'Lifecycle'],
    licensing: 'Commercial Pro',
    downloads: 2310,
    creatorName: 'David Kim',
    isVerifiedCreator: false,
    createdAt: '2026-10-10',
    content: 'Cart Abandon Trigger 1 (1 hour): Subtle reminder\nCart Abandon Trigger 2 (24 hours): Social proof\nCart Abandon Trigger 3 (48 hours): Special perk'
  },
  {
    id: 'wh-audio-1',
    title: 'Cinematic Ambient Background Theme & Stems',
    description: 'Royalty-free synth atmospheric audio stems for product launch videos and podcast intros.',
    type: 'Audio & Music',
    category: 'Audio & Music',
    collection: 'Client Pitches',
    sizeKb: 2420,
    tags: ['Audio', 'Music', 'Podcast', 'Soundtrack'],
    licensing: 'Commercial Pro',
    downloads: 890,
    creatorName: 'Marcus Vance',
    isVerifiedCreator: true,
    createdAt: '2026-10-11',
    content: 'Track Key: D minor | BPM: 110 | Mood: Uplifting Tech Ambient | Stems: Bass, Lead Synth, Kick Drum, Atmospheric Pad'
  },
  {
    id: 'wh-7',
    title: 'High-CTR YouTube Shorts Curiosity Loops',
    description: 'Rapid 15-second script frameworks with cliffhangers optimized for algorithm loops.',
    type: 'Video Script',
    category: 'Video',
    collection: 'YouTube Shorts',
    sizeKb: 34,
    tags: ['YouTube', 'Shorts', 'Hooks', 'ViralVideo'],
    licensing: 'MIT Open Source',
    downloads: 3890,
    creatorName: 'Elena Rostova',
    isVerifiedCreator: true,
    createdAt: '2026-10-11',
    content: 'Loop Hook: "Most people think X, but what if I told you..."'
  },
  {
    id: 'wh-8',
    title: 'Black Friday & Cyber Monday Multi-Channel Ad Matrix',
    description: 'Omnichannel ad variations for Meta, Google Performance Max, and LinkedIn Ads.',
    type: 'Prompt Pack',
    category: 'Social Media',
    collection: 'Q4 Campaigns',
    sizeKb: 78,
    tags: ['Q4', 'PaidAds', 'BlackFriday', 'Copywriting'],
    licensing: 'Commercial Pro',
    downloads: 2890,
    creatorName: 'Sophia Lin',
    isVerifiedCreator: true,
    createdAt: '2026-10-12',
    content: 'Headline variations: Urgency, exclusivity, FOMO, proof.'
  },
  {
    id: 'wh-9',
    title: 'Brand Sponsorship Integration Kit & Product Placement Schema',
    description: 'Complete contract schema, native video sponsor integration overlay, and automated conversion tracking for brand product placements.',
    type: 'Prompt Pack',
    category: 'Product Placement',
    collection: 'Client Pitches',
    sizeKb: 68,
    tags: ['ProductPlacement', 'Sponsorship', 'BrandDeals', 'Monetization'],
    licensing: 'Commercial Pro',
    downloads: 4120,
    creatorName: 'Marcus Vance',
    isVerifiedCreator: true,
    createdAt: '2026-10-14',
    content: '[SPONSORSHIP & PRODUCT PLACEMENT FRAMEWORK]\nTarget Sponsor: {{sponsor_brand}}\nProduct / Offering: {{product_name}}\nContent Medium: {{video_or_article}}\n\n1. Seamless contextual product bridge\n2. Natural problem-solution demo\n3. Trackable CTA handshake with verified discount webhook.'
  }
];

export const AIWarehousePage: React.FC = () => {
  const { showToast } = useApp();

  // Managed Assets State
  const [assets, setAssets] = useState<WarehouseManagedAsset[]>(INITIAL_WAREHOUSE_ASSETS);

  const [collections, setCollections] = useState<string[]>([
    'All Assets',
    'Q4 Campaigns',
    'Client Pitches',
    'YouTube Shorts',
    'SEO Blueprints',
    'Email Funnels'
  ]);

  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const slugToCollection: Record<string, string> = {
    'all': 'All Assets',
    'all-assets': 'All Assets',
    'dashboard': 'All Assets',
    'q4-campaigns': 'Q4 Campaigns',
    'client-pitches': 'Client Pitches',
    'youtube-shorts': 'YouTube Shorts',
    'seo-blueprints': 'SEO Blueprints',
    'email-funnels': 'Email Funnels'
  };

  const collectionToSlug: Record<string, string> = {
    'All Assets': 'dashboard',
    'Q4 Campaigns': 'q4-campaigns',
    'Client Pitches': 'client-pitches',
    'YouTube Shorts': 'youtube-shorts',
    'SEO Blueprints': 'seo-blueprints',
    'Email Funnels': 'email-funnels'
  };

  const resolveCurrentCollection = (): string => {
    if (section && slugToCollection[section.toLowerCase()]) {
      return slugToCollection[section.toLowerCase()];
    }
    const colParam = searchParams.get('collection');
    if (colParam) {
      return colParam;
    }
    return 'All Assets';
  };

  const [activeCollection, setActiveCollectionState] = useState<string>(resolveCurrentCollection);

  useEffect(() => {
    setActiveCollectionState(resolveCurrentCollection());
  }, [section, searchParams]);

  const setActiveCollection = (col: string) => {
    setActiveCollectionState(col);
    const slug = collectionToSlug[col] || col.toLowerCase().replace(/\s+/g, '-');
    navigate(slug === 'dashboard' ? '/warehouse/dashboard' : `/warehouse/${slug}`);
  };

  // Search, Filters & View Mode
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouseCategory, setSelectedWarehouseCategory] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Multi-select Batch Actions State
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showMoveCollectionModal, setShowMoveCollectionModal] = useState(false);
  const [targetMoveCollection, setTargetMoveCollection] = useState(collections[1]);

  // Create Collection Modal State
  const [showCreateCollectionModal, setShowCreateCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Selected Asset Detail Modal
  const [selectedAsset, setSelectedAsset] = useState<WarehouseManagedAsset | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  // Asset Paywall Modal State
  const [paywallAsset, setPaywallAsset] = useState<WarehouseManagedAsset | null>(null);

  // Storage Quota Calculations
  const totalAssetsCount = assets.length;
  const totalBytesKb = assets.reduce((acc, a) => acc + a.sizeKb, 0);
  // Simulated storage calculation: 1.2 GB base + dynamic KB converted
  const storageUsedGb = Number((1.2 + totalBytesKb / (1024 * 1024)).toFixed(2));
  const storageTotalGb = 10;
  const storageUsedPercent = Math.min(100, Math.round((storageUsedGb / storageTotalGb) * 100));

  // Active Categories & Tags
  const activeCategories = useMemo(() => Array.from(new Set(assets.map((a) => a.category))), [assets]);
  const activeTags = useMemo(() => Array.from(new Set(assets.flatMap((a) => a.tags))), [assets]);

  // Filtered Assets based on collection, category, and search
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesCollection =
        activeCollection === 'All Assets' || asset.collection === activeCollection;

      const matchesCategory =
        selectedWarehouseCategory === 'ALL' || asset.category === selectedWarehouseCategory;

      const matchesSearch =
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCollection && matchesCategory && matchesSearch;
    });
  }, [assets, activeCollection, selectedWarehouseCategory, searchQuery]);

  // Checkbox Selection Logic
  const isAllVisibleSelected =
    filteredAssets.length > 0 &&
    filteredAssets.every((a) => selectedAssetIds.includes(a.id));

  const handleToggleSelectAll = () => {
    if (isAllVisibleSelected) {
      // Deselect visible
      const visibleIds = new Set(filteredAssets.map((a) => a.id));
      setSelectedAssetIds(selectedAssetIds.filter((id) => !visibleIds.has(id)));
    } else {
      // Select all visible
      const newIds = new Set([...selectedAssetIds, ...filteredAssets.map((a) => a.id)]);
      setSelectedAssetIds(Array.from(newIds));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    if (selectedAssetIds.includes(id)) {
      setSelectedAssetIds(selectedAssetIds.filter((i) => i !== id));
    } else {
      setSelectedAssetIds([...selectedAssetIds, id]);
    }
  };

  // Batch Action: Export
  const handleBatchExport = () => {
    const selectedAssets = assets.filter((a) => selectedAssetIds.includes(a.id));
    const exportData = JSON.stringify(selectedAssets, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zunme_warehouse_export_${selectedAssets.length}_assets.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${selectedAssets.length} assets successfully!`, 'success');
  };

  // Batch Action: Move Collection
  const handleBatchMoveCollection = () => {
    setAssets(
      assets.map((a) =>
        selectedAssetIds.includes(a.id) ? { ...a, collection: targetMoveCollection } : a
      )
    );
    showToast(`Moved ${selectedAssetIds.length} assets to "${targetMoveCollection}"`, 'success');
    setShowMoveCollectionModal(false);
    setSelectedAssetIds([]);
  };

  // Batch Action: Delete
  const handleBatchDelete = () => {
    const count = selectedAssetIds.length;
    setAssets(assets.filter((a) => !selectedAssetIds.includes(a.id)));
    setSelectedAssetIds([]);
    setShowDeleteConfirmModal(false);
    showToast(`Deleted ${count} assets from AI Warehouse`, 'info');
  };

  // Single Asset Delete
  const handleDeleteSingle = (id: string, title: string) => {
    setAssets(assets.filter((a) => a.id !== id));
    setSelectedAssetIds(selectedAssetIds.filter((i) => i !== id));
    if (selectedAsset?.id === id) setSelectedAsset(null);
    showToast(`Deleted "${title}"`, 'info');
  };

  // Single Asset Download (.md)
  const handleDownloadSingle = (asset: WarehouseManagedAsset) => {
    if (asset.licensing === 'Commercial Pro') {
      setPaywallAsset(asset);
      return;
    }
    const content = `# ${asset.title}\n\n**Collection**: ${asset.collection} | **Type**: ${asset.type}\n**Category**: ${asset.category} | **License**: ${asset.licensing}\n\n## Description\n${asset.description}\n\n## Content / Instructions\n\`\`\`\n${asset.content}\n\`\`\`\n`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded "${asset.title}"`, 'success');
  };

  const handleSimulatedPaywallUnlock = (asset: WarehouseManagedAsset) => {
    const content = `# ${asset.title}\n\n**Collection**: ${asset.collection} | **Type**: ${asset.type}\n**Category**: ${asset.category} | **License**: ${asset.licensing} (UNLOCKED)\n\n## Description\n${asset.description}\n\n## Content / Instructions\n\`\`\`\n${asset.content}\n\`\`\`\n`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_unlocked.md`;
    a.click();
    URL.revokeObjectURL(url);
    setPaywallAsset(null);
  };

  // Create New Collection
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    if (collections.includes(newCollectionName.trim())) {
      showToast('Collection already exists', 'warning');
      return;
    }
    const updated = [...collections, newCollectionName.trim()];
    setCollections(updated);
    setActiveCollection(newCollectionName.trim());
    setNewCollectionName('');
    setShowCreateCollectionModal(false);
    showToast(`Created collection "${newCollectionName.trim()}"`, 'success');
  };

  // Quick Tagging in Modal
  const handleAddTagToSelected = () => {
    if (!newTagInput.trim() || !selectedAsset) return;
    const cleanTag = newTagInput.trim().replace(/^#/, '');
    if (selectedAsset.tags.includes(cleanTag)) {
      showToast('Tag already attached', 'warning');
      return;
    }
    const updatedAsset = {
      ...selectedAsset,
      tags: [...selectedAsset.tags, cleanTag]
    };
    setSelectedAsset(updatedAsset);
    setAssets(assets.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)));
    setNewTagInput('');
    showToast(`Tag #${cleanTag} added`, 'success');
  };

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Package size={26} color="#6E56CF" />
            AI Warehouse &amp; Asset Management
          </h1>
          <p className="dashboard-subtitle">
            Manage your saved prompt chains, collection folders, blueprints, and multi-agent workflows with quota metrics and batch actions.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <NavLink to="/creator" className="btn btn-outline btn-sm">
            <UploadCloud size={14} />
            <span>Creator Marketplace</span>
          </NavLink>
        </div>
      </div>

      {/* 1. Storage & Quota Stats Bar */}
      <div className="storage-quota-panel">
        <div className="storage-metrics-grid">
          {/* Quota Progress */}
          <div className="storage-progress-col">
            <div className="storage-progress-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HardDrive size={16} color="#6E56CF" />
                <span>Cloud Storage Quota</span>
              </div>
              <span style={{ color: '#6E56CF' }}>
                {storageUsedGb} GB / {storageTotalGb} GB ({storageUsedPercent}%)
              </span>
            </div>
            <div className="storage-progress-track">
              <div
                className="storage-progress-fill"
                style={{ width: `${storageUsedPercent}%` }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#5F6B85' }}>
              <span>High-speed SSD indexing</span>
              <span>Available: {(storageTotalGb - storageUsedGb).toFixed(2)} GB</span>
            </div>
          </div>

          {/* Metric 1: Total Assets */}
          <div className="storage-stat-item">
            <div className="storage-stat-icon-box">
              <Package size={20} />
            </div>
            <div className="storage-stat-content">
              <span className="storage-stat-number">{totalAssetsCount}</span>
              <span className="storage-stat-label">Total Assets</span>
            </div>
          </div>

          {/* Metric 2: Categories */}
          <div className="storage-stat-item">
            <div className="storage-stat-icon-box" style={{ color: '#059669', background: '#E8F8F0', borderColor: 'rgba(5, 150, 105, 0.25)' }}>
              <Layers size={20} />
            </div>
            <div className="storage-stat-content">
              <span className="storage-stat-number">{activeCategories.length}</span>
              <span className="storage-stat-label">Active Categories</span>
            </div>
          </div>

          {/* Metric 3: Active Tags */}
          <div className="storage-stat-item">
            <div className="storage-stat-icon-box" style={{ color: '#D97706', background: '#FEF3C7', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
              <Tag size={20} />
            </div>
            <div className="storage-stat-content">
              <span className="storage-stat-number">{activeTags.length}</span>
              <span className="storage-stat-label">Managed Tags</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Folder / Collection Organization Bar */}
      <div className="collections-panel">
        <div className="collections-pills-row">
          {collections.map((col) => {
            const count =
              col === 'All Assets'
                ? assets.length
                : assets.filter((a) => a.collection === col).length;

            return (
              <button
                key={col}
                className={`collection-folder-pill ${activeCollection === col ? 'active' : ''}`}
                onClick={() => setActiveCollection(col)}
              >
                <Folder size={14} />
                <span>{col}</span>
                <span className="collection-badge-count">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          className="btn-new-collection"
          onClick={() => setShowCreateCollectionModal(true)}
        >
          <FolderPlus size={14} />
          <span>New Collection</span>
        </button>
      </div>

      {/* 2.5 Dedicated Category & Product Placement Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', padding: '2px 0' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#5F6B85', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '4px' }}>
          Asset Category:
        </span>
        {['ALL', 'Social Media', 'SEO', 'Branding', 'Email Marketing', 'Video', 'Product Placement'].map((cat) => {
          const isSelected = selectedWarehouseCategory === cat;
          const count = cat === 'ALL' ? assets.length : assets.filter((a) => a.category === cat).length;
          const isProductPlacement = cat === 'Product Placement';

          return (
            <button
              key={cat}
              className={`collection-folder-pill ${isSelected ? 'active' : ''}`}
              style={
                isProductPlacement && isSelected
                  ? { background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)', borderColor: '#7C3AED', color: '#FFFFFF', boxShadow: '0 4px 14px rgba(124,58,237,0.3)' }
                  : isProductPlacement
                  ? { border: '1px solid #C084FC', color: '#7E22CE', background: '#FAF5FF', fontWeight: 700 }
                  : undefined
              }
              onClick={() => setSelectedWarehouseCategory(cat)}
            >
              <span>{cat === 'ALL' ? 'All Categories' : isProductPlacement ? '🎁 Product Placement & Brand Integrations' : cat}</span>
              <span className="collection-badge-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Search Bar, Quick Tagging & View Mode Toggle */}
      <div className="warehouse-controls-bar">
        {/* Search */}
        <div className="warehouse-search-wrap">
          <Search size={16} color="#8C97B0" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            className="warehouse-search-input"
            placeholder="Search by asset name, content, tag, or collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="view-mode-toggle-group">
            <button
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Card Grid View"
            >
              <LayoutGrid size={14} />
              <span>Grid</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Structured Table View"
            >
              <List size={14} />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Tags Quick Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#5F6B85', textTransform: 'uppercase' }}>
          Quick Tag Filter:
        </span>
        {activeTags.slice(0, 8).map((t) => (
          <button
            key={t}
            className={`asset-tag-pill ${searchQuery === t ? 'active' : ''}`}
            style={{ cursor: 'pointer', border: searchQuery === t ? '1px solid #6E56CF' : undefined }}
            onClick={() => setSearchQuery(searchQuery === t ? '' : t)}
          >
            #{t}
          </button>
        ))}
        {searchQuery && (
          <button
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '11px', padding: '2px 8px', color: '#EF4444' }}
            onClick={() => setSearchQuery('')}
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* 4. ASSET DISPLAY: GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="warehouse-grid">
          {filteredAssets.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px', background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid #E8ECF5' }}>
              <Package size={36} color="#8C97B0" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                No Assets Found
              </h3>
              <p style={{ fontSize: '13px', color: '#5F6B85' }}>
                No assets match your current collection filter or search query.
              </p>
            </div>
          ) : (
            filteredAssets.map((asset) => {
              const isSelected = selectedAssetIds.includes(asset.id);

              return (
                <div
                  key={asset.id}
                  className={`warehouse-card ${isSelected ? 'selected' : ''}`}
                >
                  <div>
                    {/* Top Row: Checkbox, Collection & Size */}
                    <div className="warehouse-card-top">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          className="warehouse-checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(asset.id)}
                          aria-label={`Select ${asset.title}`}
                        />
                        <span className="collection-pill-mini">
                          <Folder size={11} />
                          <span>{asset.collection}</span>
                        </span>
                      </div>
                      <span className="asset-size-badge">{asset.sizeKb} KB</span>
                    </div>

                    {/* Title */}
                    <h3
                      className="asset-card-title"
                      onClick={() => setSelectedAsset(asset)}
                      style={{ fontSize: '15px' }}
                    >
                      {asset.title}
                    </h3>

                    {/* Description */}
                    <p className="asset-card-desc" style={{ fontSize: '12.5px' }}>
                      {asset.description}
                    </p>

                    {/* Tags */}
                    <div className="asset-tags-wrap" style={{ marginBottom: '12px' }}>
                      {asset.tags.map((t, idx) => (
                        <span key={idx} className="asset-tag-pill">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F3FA', paddingTop: '12px', fontSize: '11.5px', color: '#5F6B85' }}>
                      <span>{asset.type}</span>
                      <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, fontSize: '11.5px', padding: '5px 10px' }}
                        onClick={() => setSelectedAsset(asset)}
                      >
                        Inspect
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ padding: '5px 8px' }}
                        title="Download Asset"
                        onClick={() => handleDownloadSingle(asset)}
                      >
                        <Download size={13} />
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ padding: '5px 8px', color: '#EF4444' }}
                        title="Delete Asset"
                        onClick={() => handleDeleteSingle(asset.id, asset.title)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 5. ASSET DISPLAY: STRUCTURED TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      className="warehouse-checkbox"
                      checked={isAllVisibleSelected}
                      onChange={handleToggleSelectAll}
                      aria-label="Select all visible assets"
                    />
                  </th>
                  <th>Asset Name &amp; Collection</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Tags</th>
                  <th>Date Added</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#5F6B85' }}>
                      No assets found matching current criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => {
                    const isSelected = selectedAssetIds.includes(asset.id);

                    return (
                      <tr
                        key={asset.id}
                        style={{ background: isSelected ? '#FAF9FE' : undefined }}
                      >
                        <td>
                          <input
                            type="checkbox"
                            className="warehouse-checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectOne(asset.id)}
                            aria-label={`Select ${asset.title}`}
                          />
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-md)', background: '#EFEBFC', color: '#6E56CF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {asset.type === 'Video Script' ? (
                                <Video size={16} />
                              ) : asset.type === 'Workflow' ? (
                                <Layers size={16} />
                              ) : (
                                <FileText size={16} />
                              )}
                            </div>
                            <div>
                              <div
                                style={{ fontWeight: '800', color: '#111625', cursor: 'pointer' }}
                                onClick={() => setSelectedAsset(asset)}
                              >
                                {asset.title}
                              </div>
                              <div style={{ fontSize: '11px', color: '#5F6B85', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Folder size={10} />
                                <span>{asset.collection}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                            {asset.type}
                          </span>
                        </td>
                        <td style={{ fontWeight: '600', color: '#111625' }}>{asset.sizeKb} KB</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {asset.tags.map((t, idx) => (
                              <span key={idx} className="asset-tag-pill" style={{ fontSize: '10px' }}>
                                #{t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ color: '#5F6B85', fontSize: '12px' }}>
                          {new Date(asset.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ padding: '4px 8px', fontSize: '11px' }}
                              onClick={() => setSelectedAsset(asset)}
                            >
                              Inspect
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ padding: '4px 8px' }}
                              onClick={() => handleDownloadSingle(asset)}
                              title="Download"
                            >
                              <Download size={13} />
                            </button>
                            <button
                              className="btn btn-outline btn-sm"
                              style={{ padding: '4px 8px', color: '#EF4444' }}
                              onClick={() => handleDeleteSingle(asset.id, asset.title)}
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. FLOATING BATCH ACTIONS TOOLBAR (Appears when 1+ selected) */}
      {selectedAssetIds.length > 0 && (
        <div className="floating-batch-toolbar">
          <span className="batch-count-tag">
            {selectedAssetIds.length} {selectedAssetIds.length === 1 ? 'Asset' : 'Assets'} Selected
          </span>

          <button className="batch-btn" onClick={handleBatchExport}>
            <Download size={14} />
            <span>Bulk Export (.json)</span>
          </button>

          <button
            className="batch-btn"
            onClick={() => setShowMoveCollectionModal(true)}
          >
            <Folder size={14} />
            <span>Move to Collection</span>
          </button>

          <button
            className="batch-btn danger"
            onClick={() => setShowDeleteConfirmModal(true)}
          >
            <Trash2 size={14} />
            <span>Delete Selected</span>
          </button>

          <button
            className="batch-btn"
            style={{ background: 'transparent', border: 'none', color: '#94A3B8' }}
            onClick={() => setSelectedAssetIds([])}
          >
            Cancel
          </button>
        </div>
      )}

      {/* MODAL: CREATE COLLECTION */}
      {showCreateCollectionModal && (
        <div className="modal-overlay" onClick={() => setShowCreateCollectionModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderPlus size={18} color="#6E56CF" />
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', margin: 0 }}>
                  Create New Collection
                </h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowCreateCollectionModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Collection Folder Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Enterprise Case Studies"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowCreateCollectionModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BATCH MOVE TO COLLECTION */}
      {showMoveCollectionModal && (
        <div className="modal-overlay" onClick={() => setShowMoveCollectionModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Folder size={18} color="#6E56CF" />
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', margin: 0 }}>
                  Move {selectedAssetIds.length} Assets
                </h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowMoveCollectionModal(false)}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Select Target Collection:
                </label>
                <select
                  className="input-field"
                  value={targetMoveCollection}
                  onChange={(e) => setTargetMoveCollection(e.target.value)}
                >
                  {collections
                    .filter((c) => c !== 'All Assets')
                    .map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowMoveCollectionModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleBatchMoveCollection}
                >
                  Confirm Move
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BATCH DELETE CONFIRMATION */}
      {showDeleteConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirmModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={20} color="#EF4444" />
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', margin: 0 }}>
                  Confirm Bulk Deletion
                </h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowDeleteConfirmModal(false)}>
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '13.5px', color: '#4B5565', lineHeight: '1.5', marginTop: '8px' }}>
              Are you sure you want to delete <strong>{selectedAssetIds.length}</strong> selected assets from your AI Warehouse? This action will permanently remove their cached prompts and blueprints.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ background: '#EF4444', borderColor: '#EF4444' }}
                onClick={handleBatchDelete}
              >
                Delete {selectedAssetIds.length} Items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSET DETAIL & QUICK TAGGING */}
      {selectedAsset && (
        <div className="modal-overlay" onClick={() => setSelectedAsset(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: '680px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary">{selectedAsset.category}</span>
                <span className="collection-pill-mini">
                  <Folder size={11} />
                  <span>{selectedAsset.collection}</span>
                </span>
                <span className="status-chip info">{selectedAsset.licensing}</span>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedAsset(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111625', marginBottom: '6px' }}>
                  {selectedAsset.title}
                </h2>
                <div style={{ fontSize: '12px', color: '#5F6B85', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>Created by <strong>{selectedAsset.creatorName}</strong></span>
                  <span>•</span>
                  <span>File Size: {selectedAsset.sizeKb} KB</span>
                  <span>•</span>
                  <span>Added: {new Date(selectedAsset.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5', fontSize: '13px', lineHeight: '1.6', color: '#272F3E' }}>
                {selectedAsset.description}
              </div>

              {(selectedAsset.category === 'Audio & Music' || selectedAsset.type === 'Audio & Music' || selectedAsset.tags.includes('Audio')) && (
                <div style={{ marginTop: '4px' }}>
                  <AudioPreviewWidget
                    title={selectedAsset.title}
                    artist={selectedAsset.creatorName}
                    durationSeconds={54}
                  />
                </div>
              )}

              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#6E56CF', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Blueprint Directives &amp; Content
                </div>
                <pre className="prompt-code-box" style={{ maxHeight: '200px' }}>
                  {selectedAsset.content}
                </pre>
              </div>

              {/* Quick Tagging Section */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                  Asset Tags:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
                  {selectedAsset.tags.map((t, idx) => (
                    <span key={idx} className="asset-tag-pill">
                      #{t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', maxWidth: '320px' }}>
                  <input
                    type="text"
                    className="input-field"
                    style={{ height: '32px', fontSize: '12px' }}
                    placeholder="New tag..."
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTagToSelected();
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                    onClick={handleAddTagToSelected}
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', paddingTop: '14px', borderTop: '1px solid #F0F3FA' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedAsset.content);
                    showToast('Blueprint content copied!', 'success');
                  }}
                >
                  <Copy size={13} />
                  <span>Copy Content</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownloadSingle(selectedAsset)}
                >
                  <Download size={13} />
                  <span>Download (.md)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset Paywall Modal for Commercial Pro Assets */}
      {paywallAsset && (
        <AssetPaywallModal
          isOpen={Boolean(paywallAsset)}
          onClose={() => setPaywallAsset(null)}
          assetTitle={paywallAsset.title}
          creatorName={paywallAsset.creatorName}
          category={paywallAsset.category}
          licensing={paywallAsset.licensing}
          mockPrice="$4.99"
          onUnlockSimulate={() => handleSimulatedPaywallUnlock(paywallAsset)}
        />
      )}
    </div>
  );
};
