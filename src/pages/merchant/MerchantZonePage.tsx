import React, { useState, useMemo, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Store,
  Package,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Trash2,
  Megaphone,
  ArrowRight,
  BarChart2,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  HelpCircle,
  X,
  Sliders,
  Check,
  ArrowLeft,
  Link2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './MerchantZonePage.css';

export interface MerchantProduct {
  id: string;
  sku: string;
  title: string;
  category: 'AI Content' | 'Animation' | 'Cartoon' | 'Images / Photos' | 'Videos / AI Videos' | 'AI Builder' | 'General Goods';
  price: number;
  inventory: number;
  status: 'ACTIVE_ORGANIC' | 'ACTIVE_BOOSTED' | 'DRAFT';
  views: number;
  sales: number;
  imageUrl: string;
  description: string;
  createdAt: string;
}

const INITIAL_MERCHANT_PRODUCTS: MerchantProduct[] = [
  {
    id: 'prod-101',
    sku: 'ZUN-AIC-001',
    title: 'Enterprise B2B Lead-Gen & Copywriting Pack',
    category: 'AI Content',
    price: 29.0,
    inventory: 999,
    status: 'ACTIVE_BOOSTED',
    views: 8420,
    sales: 142,
    imageUrl: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=300&q=80',
    description: '45-module prompt framework for executive thought leadership and cold outbound sequences.',
    createdAt: '2026-09-15'
  },
  {
    id: 'prod-102',
    sku: 'ZUN-ANM-002',
    title: 'Cyberpunk Tech HUD & UI Motion Graphic Assets',
    category: 'Animation',
    price: 39.0,
    inventory: 999,
    status: 'ACTIVE_ORGANIC',
    views: 3120,
    sales: 48,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80',
    description: 'Futuristic sci-fi heads-up display motion graphics with alpha channel transparency.',
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-103',
    sku: 'ZUN-IMG-003',
    title: 'Hyper-Realistic Studio Product Podiums & Backdrops',
    category: 'Images / Photos',
    price: 35.0,
    inventory: 999,
    status: 'ACTIVE_BOOSTED',
    views: 12400,
    sales: 230,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=80',
    description: '8K photorealistic marble and minimalist podium environments tailored for e-commerce mockups.',
    createdAt: '2026-07-29'
  },
  {
    id: 'prod-104',
    sku: 'ZUN-BLD-004',
    title: 'Autonomous Competitor Price Scraper & Alert Agent',
    category: 'AI Builder',
    price: 59.0,
    inventory: 999,
    status: 'ACTIVE_ORGANIC',
    views: 4890,
    sales: 85,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80',
    description: 'Autonomous agent that monitors competitor prices and triggers instant price-drop webhook notifications.',
    createdAt: '2026-09-05'
  },
  {
    id: 'prod-105',
    sku: 'ZUN-CRT-005',
    title: 'Friendly Tech Mascot 3D Cartoon Expressions',
    category: 'Cartoon',
    price: 0,
    inventory: 999,
    status: 'ACTIVE_ORGANIC',
    views: 6200,
    sales: 410,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    description: 'Free onboarding mascot expressions with Blender project files and transparent PNGs.',
    createdAt: '2026-09-18'
  }
];

export const MerchantZonePage: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();

  type MerchantTab = 'overview' | 'listings' | 'feed-upload' | 'visibility-ads' | 'analytics';

  const [activeTab, setActiveTab] = useState<MerchantTab>(() => {
    if (section && ['overview', 'listings', 'feed-upload', 'visibility-ads', 'analytics'].includes(section.toLowerCase())) {
      return section.toLowerCase() as MerchantTab;
    }
    return 'overview';
  });

  // Sync tab with section route parameter
  useEffect(() => {
    if (section && ['overview', 'listings', 'feed-upload', 'visibility-ads', 'analytics'].includes(section.toLowerCase())) {
      setActiveTab(section.toLowerCase() as MerchantTab);
    }
  }, [section]);

  const [products, setProducts] = useState<MerchantProduct[]>(INITIAL_MERCHANT_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MerchantProduct | null>(null);

  // Form Fields
  const [formSku, setFormSku] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<MerchantProduct['category']>('AI Content');
  const [formPrice, setFormPrice] = useState<number>(19.0);
  const [formInventory, setFormInventory] = useState<number>(100);
  const [formStatus, setFormStatus] = useState<MerchantProduct['status']>('ACTIVE_ORGANIC');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Feed Import & Ingestion Wizard State
  const [feedSourceType, setFeedSourceType] = useState<'csv' | 'shopify' | 'remote-url'>('csv');
  const [feedStep, setFeedStep] = useState<1 | 2 | 3>(1);
  const [feedUploadedFileName, setFeedUploadedFileName] = useState<string>('fashion_catalog_march_2026.csv');
  const [feedDetectedRows, setFeedDetectedRows] = useState<number>(28);
  const [feedUrl, setFeedUrl] = useState('');
  const [feedUploading, setFeedUploading] = useState(false);
  const [feedParsedCount, setFeedParsedCount] = useState<number | null>(null);

  // Column Mapping State
  const [columnMappings, setColumnMappings] = useState({
    title: 'product_name',
    sku: 'sku',
    price: 'regular_price',
    category: 'category_type',
    inventory: 'stock_quantity',
    imageUrl: 'image_link',
    description: 'description_html'
  });

  // Shopify Integration State
  const [shopifyConnected, setShopifyConnected] = useState<boolean>(true);
  const [shopifyStoreDomain, setShopifyStoreDomain] = useState<string>('fashion-atelier.myshopify.com');
  const [shopifyApiKey, setShopifyApiKey] = useState<string>('shpat_7a8f9b2c3d4e5f6g');
  const [shopifyConnecting, setShopifyConnecting] = useState<boolean>(false);
  const [shopifySyncing, setShopifySyncing] = useState<boolean>(false);
  const [shopifyAutoSync, setShopifyAutoSync] = useState<boolean>(true);
  const [shopifyLastSyncTime, setShopifyLastSyncTime] = useState<string>('2 minutes ago');
  const [shopifyProductsCount, setShopifyProductsCount] = useState<number>(140);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false;
      }
      if (filterCategory !== 'All' && p.category !== filterCategory) return false;
      if (filterStatus !== 'All' && p.status !== filterStatus) return false;
      return true;
    });
  }, [products, searchQuery, filterCategory, filterStatus]);

  // Handle open modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormSku(`ZUN-${Math.random().toString(36).substring(2, 6).toUpperCase()}-00${products.length + 1}`);
    setFormTitle('');
    setFormCategory('AI Content');
    setFormPrice(25.0);
    setFormInventory(500);
    setFormStatus('ACTIVE_ORGANIC');
    setFormDescription('');
    setFormImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: MerchantProduct) => {
    setEditingProduct(p);
    setFormSku(p.sku);
    setFormTitle(p.title);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormInventory(p.inventory);
    setFormStatus(p.status);
    setFormDescription(p.description);
    setFormImageUrl(p.imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Please provide a valid product title.', 'error');
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        sku: formSku,
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        inventory: Number(formInventory),
        status: formStatus,
        description: formDescription,
        imageUrl: formImageUrl || p.imageUrl
      } : p));
      showToast(`Product "${formTitle}" updated successfully.`, 'success');
    } else {
      const newProd: MerchantProduct = {
        id: `prod-${Date.now()}`,
        sku: formSku || `SKU-${Date.now().toString().slice(-4)}`,
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        inventory: Number(formInventory),
        status: formStatus,
        views: 0,
        sales: 0,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
        description: formDescription,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [newProd, ...prev]);
      showToast(`Product "${formTitle}" added to merchant inventory.`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product listing removed from catalog.', 'info');
  };

  const handleToggleBoost = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'ACTIVE_BOOSTED' ? 'ACTIVE_ORGANIC' : 'ACTIVE_BOOSTED';
        showToast(
          nextStatus === 'ACTIVE_BOOSTED'
            ? `Shopping ad boost enabled for ${p.title}.`
            : `Listing reverted to standard organic distribution.`,
          'success'
        );
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleSelectFeedFile = () => {
    setFeedUploading(true);
    setTimeout(() => {
      setFeedUploading(false);
      setFeedUploadedFileName('fashion_catalog_march_2026.csv');
      setFeedDetectedRows(28);
      setFeedStep(2);
      showToast('File parsed: 28 items detected. Please review and confirm column mappings.', 'info');
    }, 600);
  };

  const handleConfirmMappingAndImport = () => {
    setFeedUploading(true);
    setTimeout(() => {
      setFeedUploading(false);
      setFeedStep(3);
      setFeedParsedCount(feedDetectedRows);
      const newImportedProduct: MerchantProduct = {
        id: `prod-imp-${Date.now()}`,
        sku: 'IMP-CAT-028',
        title: 'Nordic Digital Media & Asset Collection (Imported from Feed)',
        category: 'AI Content',
        price: 34.0,
        inventory: 150,
        status: 'ACTIVE_ORGANIC',
        views: 0,
        sales: 0,
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80',
        description: 'Batch imported via CSV feed with verified column mappings: Title, Price, SKU, and Category.',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProducts(prev => [newImportedProduct, ...prev]);
      showToast(`Success! ${feedDetectedRows} items verified and added to active catalog.`, 'success');
    }, 900);
  };

  const handleConnectShopify = () => {
    if (!shopifyStoreDomain.trim()) {
      showToast('Please enter your Shopify store domain.', 'error');
      return;
    }
    setShopifyConnecting(true);
    setTimeout(() => {
      setShopifyConnecting(false);
      setShopifyConnected(true);
      setShopifyProductsCount(140);
      setShopifyLastSyncTime('Just now');
      showToast(`Connected to ${shopifyStoreDomain}! 140 products imported.`, 'success');
    }, 1200);
  };

  const handleSyncShopifyNow = () => {
    setShopifySyncing(true);
    setTimeout(() => {
      setShopifySyncing(false);
      setShopifyLastSyncTime('Just now');
      showToast(`Shopify sync complete: ${shopifyProductsCount} products up to date.`, 'success');
    }, 1000);
  };

  const handleDisconnectShopify = () => {
    setShopifyConnected(false);
    showToast('Shopify store disconnected from Zunme Merchant Zone.', 'info');
  };

  const handleSimulateFeedUpload = () => {
    setFeedUploading(true);
    setTimeout(() => {
      setFeedUploading(false);
      setFeedParsedCount(28);
      showToast('Product feed parsed: 28 items verified against Zunme Store schema.', 'success');
    }, 1200);
  };

  return (
    <div className="merchant-page-container">
      {/* Top Banner */}
      <div className="merchant-header-banner">
        <div className="merchant-header-info">
          <div className="merchant-header-icon">
            <Store size={26} />
          </div>
          <div>
            <h1 className="merchant-header-title">Zunme Merchant Zone</h1>
            <p className="merchant-header-subtitle">
              Manage digital store listings, sync catalog feeds, and amplify visibility across Zunme Search &amp; MPA Shopping Ads.
            </p>
          </div>
        </div>

        <div className="merchant-header-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleOpenAddModal}
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
          <NavLink to="/store" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            <ShoppingBag size={15} />
            <span>View Public Store</span>
          </NavLink>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="merchant-nav-tabs">
        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart2 size={16} />
          <span>Overview</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          <Package size={16} />
          <span>Product Listings ({products.length})</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'feed-upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed-upload')}
        >
          <UploadCloud size={16} />
          <span>Product Feed &amp; Import</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'visibility-ads' ? 'active' : ''}`}
          onClick={() => setActiveTab('visibility-ads')}
        >
          <Megaphone size={16} />
          <span>Visibility &amp; Shopping Ads</span>
        </button>

        <button
          type="button"
          className={`merchant-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={16} />
          <span>Sales &amp; Analytics (Demo)</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* KPI Summary Cards */}
          <div className="merchant-kpi-grid">
            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Active Listings</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#ECFDF5', color: '#059669' }}>
                  <Package size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">{products.filter(p => p.status !== 'DRAFT').length}</div>
              <div className="merchant-kpi-subtext" style={{ color: '#059669' }}>
                <CheckCircle2 size={13} />
                <span>Synchronized with Store</span>
              </div>
            </div>

            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Shopping Ad Boosted</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#F3E8FF', color: '#7E22CE' }}>
                  <Megaphone size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">{products.filter(p => p.status === 'ACTIVE_BOOSTED').length}</div>
              <div className="merchant-kpi-subtext">
                <span>Featured placement in Zunme Search</span>
              </div>
            </div>

            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Total Catalog Views</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                  <Eye size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">
                {products.reduce((acc, p) => acc + p.views, 0).toLocaleString()}
              </div>
              <div className="merchant-kpi-subtext" style={{ color: '#0284C7' }}>
                <TrendingUp size={13} />
                <span>+24.8% organic growth</span>
              </div>
            </div>

            <div className="merchant-kpi-card">
              <div className="merchant-kpi-header">
                <span className="merchant-kpi-label">Gross Revenue (Demo)</span>
                <div className="merchant-kpi-icon-wrap" style={{ background: '#FEF3C7', color: '#D97706' }}>
                  <DollarSign size={17} />
                </div>
              </div>
              <div className="merchant-kpi-value">
                ${products.reduce((acc, p) => acc + (p.price * p.sales), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="merchant-kpi-subtext">
                <span>515 total orders fulfilled</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Educational Callout */}
          <div className="glass-panel merchant-callout-panel">
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                Free Organic Placement vs. Paid Shopping Ads
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', maxWidth: '720px' }}>
                All approved products are automatically indexed organically in the Zunme Store at zero cost. To feature your items at the top of AI Search queries and across the Zunme Display Network, activate a Shopping Ad Boost.
              </p>
            </div>
            <div className="merchant-callout-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setActiveTab('feed-upload')}
              >
                <UploadCloud size={15} />
                <span>Sync Feed</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveTab('visibility-ads')}
              >
                <Megaphone size={15} />
                <span>Shopping Ads Manager</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div>
          {/* Table Controls */}
          <div className="merchant-table-controls">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', maxWidth: '420px' }}>
              <div className="store-search-box" style={{ width: '100%' }}>
                <Search size={15} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="Search products by title or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select
                className="store-sort-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="AI Content">AI Content</option>
                <option value="Animation">Animation</option>
                <option value="Cartoon">Cartoon</option>
                <option value="Images / Photos">Images / Photos</option>
                <option value="Videos / AI Videos">Videos / AI Videos</option>
                <option value="AI Builder">AI Builder</option>
              </select>

              <select
                className="store-sort-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="ACTIVE_ORGANIC">Organic Active</option>
                <option value="ACTIVE_BOOSTED">Boosted (Shopping Ads)</option>
                <option value="DRAFT">Draft</option>
              </select>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleOpenAddModal}
              >
                <Plus size={14} />
                <span>New Item</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="merchant-table-wrap">
            <table className="merchant-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status &amp; Visibility</th>
                  <th>Views / Sales</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
                      No product listings match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-text-primary)' }}>
                              {p.title}
                            </strong>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                              Added: {p.createdAt}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ fontSize: '11px', background: '#F1F5F9', padding: '3px 6px', borderRadius: '4px' }}>
                          {p.sku}
                        </code>
                      </td>
                      <td>
                        <span className="badge badge-primary" style={{ fontSize: '11px' }}>{p.category}</span>
                      </td>
                      <td>
                        <strong style={{ fontSize: '14px', color: 'var(--color-primary)' }}>
                          {p.price === 0 ? 'FREE' : `$${p.price.toFixed(2)}`}
                        </strong>
                      </td>
                      <td>
                        {p.status === 'ACTIVE_BOOSTED' ? (
                          <span className="status-pill boosted" title="Promoted via Shopping Ads on Zunme Search">
                            <Megaphone size={11} /> Boosted
                          </span>
                        ) : p.status === 'ACTIVE_ORGANIC' ? (
                          <span className="status-pill active" title="Free organic listing in Store">
                            <CheckCircle2 size={11} /> Organic Free
                          </span>
                        ) : (
                          <span className="status-pill draft">Draft</span>
                        )}
                      </td>
                      <td>
                        <div style={{ fontSize: '12px' }}>
                          <div><Eye size={12} style={{ display: 'inline', marginRight: '4px' }} />{p.views.toLocaleString()} views</div>
                          <div style={{ color: '#059669', fontWeight: 600 }}>{p.sales} sales</div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            type="button"
                            className={`btn btn-sm ${p.status === 'ACTIVE_BOOSTED' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => handleToggleBoost(p.id)}
                            title={p.status === 'ACTIVE_BOOSTED' ? 'Remove Ad Boost' : 'Boost with Shopping Ad'}
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                          >
                            <Megaphone size={13} />
                            <span>{p.status === 'ACTIVE_BOOSTED' ? 'Boosted' : 'Boost'}</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Product"
                            style={{ padding: '6px' }}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-ghost"
                            onClick={() => handleDeleteProduct(p.id)}
                            title="Delete"
                            style={{ padding: '6px', color: '#E11D48' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT FEED & UPLOAD (CSV MAPPING + SHOPIFY INTEGRATION) */}
      {activeTab === 'feed-upload' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Feed Ingestion Source Tabs */}
          <div className="feed-source-nav">
            <button
              type="button"
              className={`feed-source-btn ${feedSourceType === 'csv' ? 'active' : ''}`}
              onClick={() => setFeedSourceType('csv')}
            >
              <FileSpreadsheet size={16} />
              <span>CSV / XML File Upload (Column Mapper)</span>
            </button>
            <button
              type="button"
              className={`feed-source-btn ${feedSourceType === 'shopify' ? 'active' : ''}`}
              onClick={() => setFeedSourceType('shopify')}
            >
              <ShoppingBag size={16} />
              <span>Shopify Store Direct Sync</span>
              {shopifyConnected && <span className="status-pill active" style={{ fontSize: '10px', padding: '1px 6px' }}>Connected</span>}
            </button>
            <button
              type="button"
              className={`feed-source-btn ${feedSourceType === 'remote-url' ? 'active' : ''}`}
              onClick={() => setFeedSourceType('remote-url')}
            >
              <UploadCloud size={16} />
              <span>Remote Feed URL (XML / RSS)</span>
            </button>
          </div>

          {/* SOURCE 1: CSV / XML WITH COLUMN MAPPING */}
          {feedSourceType === 'csv' && (
            <div className="glass-panel">
              {/* Step Wizard Header */}
              <div className="feed-wizard-steps">
                <div className={`feed-step-badge ${feedStep >= 1 ? 'active' : ''}`}>
                  <span className="step-num">1</span>
                  <span>Upload File</span>
                </div>
                <div className="feed-step-arrow"><ArrowRight size={14} /></div>
                <div className={`feed-step-badge ${feedStep >= 2 ? 'active' : ''}`}>
                  <span className="step-num">2</span>
                  <span>Map Columns &amp; Schema</span>
                </div>
                <div className="feed-step-arrow"><ArrowRight size={14} /></div>
                <div className={`feed-step-badge ${feedStep === 3 ? 'active' : ''}`}>
                  <span className="step-num">3</span>
                  <span>Import &amp; Sync</span>
                </div>
              </div>

              {/* STEP 1: FILE SELECTION */}
              {feedStep === 1 && (
                <div>
                  <div className="merchant-feed-dropzone" onClick={handleSelectFeedFile}>
                    <FileSpreadsheet size={44} color="var(--color-primary)" style={{ marginBottom: '12px' }} />
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                      {feedUploading ? 'Reading Feed & Detecting Headers...' : 'Select or Drag & Drop Product Feed (CSV, TSV, XML)'}
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', maxWidth: '460px', margin: '0 auto 16px' }}>
                      Supports Zunme Store specification, Google Merchant Center Feed, Shopify exports, and custom supplier CSVs.
                    </p>
                    <button type="button" className="btn btn-primary btn-sm" disabled={feedUploading}>
                      {feedUploading ? <RefreshCw size={14} className="spin" /> : <UploadCloud size={14} />}
                      <span>{feedUploading ? 'Processing File...' : 'Choose CSV / XML File'}</span>
                    </button>
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-md)' }}>
                    <div>
                      <strong style={{ fontSize: '13px', color: '#1E293B', display: 'block' }}>Need a sample feed template?</strong>
                      <span style={{ fontSize: '12px', color: '#64748B' }}>Test the column mapping workflow with our pre-loaded sample catalog.</span>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={handleSelectFeedFile}
                    >
                      <span>Load Sample CSV (28 Items)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: COLUMN MAPPING & SCHEMA MATCHING */}
              {feedStep === 2 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 4px 0' }}>
                        Match Your CSV Columns to Zunme Catalog Schema
                      </h3>
                      <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', margin: 0 }}>
                        File: <strong style={{ color: '#0F172A' }}>{feedUploadedFileName}</strong> • <strong>{feedDetectedRows} products</strong> detected across 11 source headers.
                      </p>
                    </div>
                    <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <CheckCircle2 size={13} />
                      <span>7 of 7 Fields Auto-Matched</span>
                    </span>
                  </div>

                  {/* Column Mapping Table */}
                  <div className="column-mapping-table-wrap">
                    <table className="column-mapping-table">
                      <thead>
                        <tr>
                          <th>Zunme Schema Property</th>
                          <th>Requirement</th>
                          <th>Detected CSV Column Header</th>
                          <th>Sample Data Preview</th>
                          <th>Match Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Product Title</strong></td>
                          <td><span className="req-tag required">Required</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.title}
                              onChange={(e) => setColumnMappings({ ...columnMappings, title: e.target.value })}
                            >
                              <option value="product_name">product_name (Detected)</option>
                              <option value="title">title</option>
                              <option value="item_title">item_title</option>
                              <option value="name">name</option>
                            </select>
                          </td>
                          <td><span className="preview-val">Enterprise B2B Lead-Gen Pack</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>

                        <tr>
                          <td><strong>SKU / Identifier</strong></td>
                          <td><span className="req-tag required">Required</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.sku}
                              onChange={(e) => setColumnMappings({ ...columnMappings, sku: e.target.value })}
                            >
                              <option value="sku">sku (Detected)</option>
                              <option value="id">id</option>
                              <option value="item_sku">item_sku</option>
                              <option value="barcode">barcode</option>
                            </select>
                          </td>
                          <td><span className="preview-val">ZUN-AIC-001</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>

                        <tr>
                          <td><strong>Product Price ($ USD)</strong></td>
                          <td><span className="req-tag required">Required</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.price}
                              onChange={(e) => setColumnMappings({ ...columnMappings, price: e.target.value })}
                            >
                              <option value="regular_price">regular_price (Detected)</option>
                              <option value="price">price</option>
                              <option value="unit_price">unit_price</option>
                              <option value="cost">cost</option>
                            </select>
                          </td>
                          <td><span className="preview-val">$29.00</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>

                        <tr>
                          <td><strong>Product Category</strong></td>
                          <td><span className="req-tag required">Required</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.category}
                              onChange={(e) => setColumnMappings({ ...columnMappings, category: e.target.value })}
                            >
                              <option value="category_type">category_type (Detected)</option>
                              <option value="category">category</option>
                              <option value="collection">collection</option>
                              <option value="tags">tags</option>
                            </select>
                          </td>
                          <td><span className="preview-val">AI Content</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>

                        <tr>
                          <td><strong>Stock Inventory</strong></td>
                          <td><span className="req-tag optional">Optional</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.inventory}
                              onChange={(e) => setColumnMappings({ ...columnMappings, inventory: e.target.value })}
                            >
                              <option value="stock_quantity">stock_quantity (Detected)</option>
                              <option value="inventory">inventory</option>
                              <option value="qty">qty</option>
                              <option value="quantity">quantity</option>
                            </select>
                          </td>
                          <td><span className="preview-val">999</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>

                        <tr>
                          <td><strong>Primary Image URL</strong></td>
                          <td><span className="req-tag required">Required</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.imageUrl}
                              onChange={(e) => setColumnMappings({ ...columnMappings, imageUrl: e.target.value })}
                            >
                              <option value="image_link">image_link (Detected)</option>
                              <option value="image_url">image_url</option>
                              <option value="photo">photo</option>
                              <option value="thumbnail">thumbnail</option>
                            </select>
                          </td>
                          <td><span className="preview-val">https://images.unsplash.com/...</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>

                        <tr>
                          <td><strong>Product Description</strong></td>
                          <td><span className="req-tag optional">Optional</span></td>
                          <td>
                            <select
                              className="mapping-select"
                              value={columnMappings.description}
                              onChange={(e) => setColumnMappings({ ...columnMappings, description: e.target.value })}
                            >
                              <option value="description_html">description_html (Detected)</option>
                              <option value="description">description</option>
                              <option value="body">body</option>
                              <option value="summary">summary</option>
                            </select>
                          </td>
                          <td><span className="preview-val">45-module prompt framework...</span></td>
                          <td><span className="match-tag-ok"><Check size={12} /> Matched</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Actions Bar */}
                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setFeedStep(1)}
                    >
                      <ArrowLeft size={14} />
                      <span>Choose Different File</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleConfirmMappingAndImport}
                      disabled={feedUploading}
                    >
                      {feedUploading ? <RefreshCw size={14} className="spin" /> : <CheckCircle2 size={15} />}
                      <span>{feedUploading ? 'Importing Products...' : `Confirm & Import ${feedDetectedRows} Products to Catalog`}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: IMPORT SUCCESS & SUMMARY */}
              {feedStep === 3 && (
                <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 14px rgba(5, 150, 105, 0.2)' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    Catalog Feed Successfully Ingested!
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                    <strong>{feedParsedCount} product listings</strong> have been validated against the Zunme Store schema and added to your active catalog.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', maxWidth: '540px', margin: '0 auto 24px' }}>
                    <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Items Ingested</span>
                      <strong style={{ fontSize: '18px', color: '#0F172A' }}>{feedParsedCount}</strong>
                    </div>
                    <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Validation Errors</span>
                      <strong style={{ fontSize: '18px', color: '#059669' }}>0</strong>
                    </div>
                    <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '11px', color: '#64748B', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Listing Mode</span>
                      <strong style={{ fontSize: '18px', color: '#2563EB' }}>Organic Free</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setActiveTab('listings')}
                    >
                      <Package size={15} />
                      <span>View Products in Listings Table ({products.length})</span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setFeedStep(1)}
                    >
                      <span>Upload Another Feed</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SOURCE 2: SHOPIFY DIRECT STORE INTEGRATION */}
          {feedSourceType === 'shopify' && (
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <ShoppingBag size={20} color="#059669" />
                  Shopify Store Integration &amp; Real-Time Inventory Sync
                </div>
                {shopifyConnected ? (
                  <span className="status-pill active">
                    <CheckCircle2 size={12} /> Connected &amp; Synced
                  </span>
                ) : (
                  <span className="status-pill draft">Not Connected</span>
                )}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                Connect your Shopify e-commerce storefront directly with Zunme Merchant Zone. Products, pricing, and stock levels synchronize automatically without manual CSV exports.
              </p>

              {shopifyConnected ? (
                /* CONNECTED SHOPIFY STATE WITH CLIENT-SPECIFIED VISUAL STEP-BY-STEP INDICATORS */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Visual Connection Step-by-Step Indicators */}
                  <div className="shopify-sync-steps-card">
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                      Step-by-Step Store Connection &amp; Ingestion Pipeline
                    </h4>
                    <div className="shopify-steps-grid">
                      <div className="shopify-step-indicator-item done">
                        <div className="step-check-icon"><Check size={13} /></div>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>Store Authorization</strong>
                          <span style={{ fontSize: '11.5px', color: '#059669' }}>Connected: {shopifyStoreDomain}</span>
                        </div>
                      </div>

                      <div className="shopify-step-indicator-item done">
                        <div className="step-check-icon"><Check size={13} /></div>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>Catalog Ingestion</strong>
                          <span style={{ fontSize: '11.5px', color: '#059669' }}>{shopifyProductsCount} Products Imported</span>
                        </div>
                      </div>

                      <div className="shopify-step-indicator-item done">
                        <div className="step-check-icon"><Check size={13} /></div>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>Inventory Webhook</strong>
                          <span style={{ fontSize: '11.5px', color: '#059669' }}>Real-time sync enabled</span>
                        </div>
                      </div>

                      <div className="shopify-step-indicator-item done">
                        <div className="step-check-icon"><Check size={13} /></div>
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0F172A', display: 'block' }}>Shopping Ads</strong>
                          <span style={{ fontSize: '11.5px', color: '#7E22CE' }}>Ready for 1-Click Boost</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Sync Metrics Strip */}
                  <div className="merchant-kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                    <div className="merchant-kpi-card">
                      <span className="merchant-kpi-label">Imported Products</span>
                      <div className="merchant-kpi-value">{shopifyProductsCount}</div>
                      <span className="merchant-kpi-subtext" style={{ color: '#059669' }}>Active in Store</span>
                    </div>

                    <div className="merchant-kpi-card">
                      <span className="merchant-kpi-label">Last Synchronized</span>
                      <div className="merchant-kpi-value" style={{ fontSize: '17px' }}>{shopifyLastSyncTime}</div>
                      <span className="merchant-kpi-subtext">Automatic polling</span>
                    </div>

                    <div className="merchant-kpi-card">
                      <span className="merchant-kpi-label">Sync Schedule</span>
                      <div className="merchant-kpi-value" style={{ fontSize: '17px' }}>Every 6 Hours</div>
                      <span className="merchant-kpi-subtext" style={{ color: '#2563EB' }}>Background Webhook</span>
                    </div>

                    <div className="merchant-kpi-card">
                      <span className="merchant-kpi-label">Store Domain</span>
                      <div className="merchant-kpi-value" style={{ fontSize: '14px', wordBreak: 'break-all' }}>{shopifyStoreDomain}</div>
                      <span className="merchant-kpi-subtext">TLS 1.3 Verified</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSyncShopifyNow}
                        disabled={shopifySyncing}
                      >
                        <RefreshCw size={14} className={shopifySyncing ? 'spin' : ''} />
                        <span>{shopifySyncing ? 'Syncing Shopify Products...' : 'Sync Catalog Now'}</span>
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setActiveTab('listings')}
                      >
                        <Package size={14} />
                        <span>View Imported Listings</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ color: '#E11D48', fontSize: '12.5px' }}
                      onClick={handleDisconnectShopify}
                    >
                      Disconnect Store
                    </button>
                  </div>
                </div>
              ) : (
                /* DISCONNECTED / CONNECT FORM */
                <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                      Shopify Store Domain (*.myshopify.com)
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. fashion-atelier.myshopify.com"
                      value={shopifyStoreDomain}
                      onChange={(e) => setShopifyStoreDomain(e.target.value)}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                      Enter your primary myshopify domain URL found in your Shopify admin settings.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                      Admin API Access Token / App Secret
                    </label>
                    <input
                      type="password"
                      className="input-field"
                      placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxx"
                      value={shopifyApiKey}
                      onChange={(e) => setShopifyApiKey(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ alignSelf: 'flex-start', minWidth: '220px' }}
                    onClick={handleConnectShopify}
                    disabled={shopifyConnecting}
                  >
                    {shopifyConnecting ? <RefreshCw size={14} className="spin" /> : <Link2 size={15} />}
                    <span>{shopifyConnecting ? 'Authorizing Shopify API...' : 'Connect Shopify Store'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SOURCE 3: REMOTE XML / RSS FEED ENDPOINT */}
          {feedSourceType === 'remote-url' && (
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <UploadCloud size={18} color="var(--color-primary)" />
                  Remote Feed URL Endpoint Ingestion
                </div>
                <span className="badge badge-primary">Automated Polling</span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '18px' }}>
                Provide an XML, TSV, or JSON product feed URL hosted on your e-commerce server. Zunme Merchant Zone will poll this URL periodically to synchronize stock and pricing.
              </p>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                  Remote Feed Endpoint URL
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="url"
                    className="input-field"
                    placeholder="https://yourstore.com/feeds/zunme-catalog.xml"
                    value={feedUrl}
                    onChange={(e) => setFeedUrl(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSimulateFeedUpload}
                    disabled={feedUploading}
                  >
                    <RefreshCw size={14} className={feedUploading ? 'spin' : ''} />
                    <span>{feedUploading ? 'Polling...' : 'Sync Remote Feed'}</span>
                  </button>
                </div>
              </div>

              {feedParsedCount !== null && (
                <div style={{ marginTop: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid rgba(5, 150, 105, 0.25)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  <span>
                    Feed successfully ingested: <strong>{feedParsedCount} items</strong> verified against Zunme Store schema.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: VISIBILITY & SHOPPING ADS */}
      {activeTab === 'visibility-ads' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="cards-grid-2">
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <CheckCircle2 size={18} color="#059669" />
                  Organic Free Listing Program
                </div>
                <span className="badge badge-success">Active</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                Your approved catalog items are presented to customers browsing the Zunme Store and relevant AI search queries at zero cost.
              </p>
              <ul style={{ fontSize: '13px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '18px' }}>
                <li>Zero listing or hosting fees for verified accounts.</li>
                <li>Indexed across standard search queries and categories.</li>
                <li>Direct checkout and instant digital delivery.</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              <div className="panel-header">
                <div className="panel-title">
                  <Megaphone size={18} color="#A855F7" />
                  Zunme Shopping Ads &amp; Search Promotion
                </div>
                <span className="badge badge-primary">High Reach</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                Drive 4.5x more buyers to your listings with keyword-triggered Shopping Ads across Zunme Search and the Multi-Platform Advertising (MPA) network.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <NavLink to="/ads/create-campaign" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  <Megaphone size={15} />
                  <span>Launch Shopping Campaign</span>
                </NavLink>
                <NavLink to="/ads/onboarding" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                  <span>7-Step Ad Setup Wizard</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ANALYTICS (DEMO) */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <BarChart2 size={18} color="var(--color-primary)" />
                Merchant Performance Insights (Prototype Demo)
              </div>
              <span className="badge badge-primary">Last 30 Days</span>
            </div>

            <div style={{ padding: '10px 14px', background: '#FEF3E2', border: '1px solid rgba(217, 119, 6, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '12px', color: '#B45309', marginBottom: '16px' }}>
              <strong>Demo Environment:</strong> Metrics reflect simulated marketplace traffic for prototyping and catalog validation.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'var(--color-bg-alt)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 700 }}>Organic vs Boosted Views</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                  <div style={{ flex: 1, background: '#E2E8F0', height: '10px', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: '62%', background: '#059669' }} title="Organic: 62%" />
                    <div style={{ width: '38%', background: '#A855F7' }} title="Shopping Ads: 38%" />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px', color: 'var(--color-text-secondary)' }}>
                  <span>Organic (62%)</span>
                  <span>Paid Boost (38%)</span>
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-alt)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 700 }}>Conversion Rate</span>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)', marginTop: '8px' }}>
                  3.84%
                </div>
                <span style={{ fontSize: '12px', color: '#059669' }}>+0.42% above store benchmark</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="store-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="store-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="store-modal-header">
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>
                {editingProduct ? 'Edit Product Listing' : 'Add New Product to Merchant Zone'}
              </h3>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsModalOpen(false)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="store-modal-body">
              <div className="merchant-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Product Title *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. 3D Character Model Rig Pack"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    SKU Identifier
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="merchant-form-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Store Category *
                  </label>
                  <select
                    className="input-field"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                  >
                    <option value="AI Content">AI Content</option>
                    <option value="Animation">Animation</option>
                    <option value="Cartoon">Cartoon</option>
                    <option value="Images / Photos">Images / Photos</option>
                    <option value="Videos / AI Videos">Videos / AI Videos</option>
                    <option value="AI Builder">AI Builder</option>
                    <option value="General Goods">General Goods</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Price ($ USD) — Enter 0 for Free *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    className="input-field"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Listing Distribution Mode
                </label>
                <select
                  className="input-field"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                >
                  <option value="ACTIVE_ORGANIC">Organic Free (Standard Store Index)</option>
                  <option value="ACTIVE_BOOSTED">Boosted (Shopping Ads + Priority Search)</option>
                  <option value="DRAFT">Draft (Unpublished)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  className="input-field"
                  placeholder="https://images.unsplash.com/..."
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Product Description &amp; Usage Rights
                </label>
                <textarea
                  className="input-field"
                  style={{ minHeight: '80px' }}
                  placeholder="Describe your digital asset, file formats, and commercial usage guidelines..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={15} />
                  <span>{editingProduct ? 'Save Changes' : 'Create Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
