import React, { useState } from 'react';
import {
  Package,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  Download,
  ThumbsUp,
  Tag,
  ShieldCheck,
  AlertTriangle,
  X,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WarehouseAsset } from '../../types';
import '../../styles/dashboard.css';

interface ModeratedWarehouseAsset extends WarehouseAsset {
  moderationStatus?: 'APPROVED' | 'FLAGGED' | 'PENDING';
}

export const AdminAIWarehousePage: React.FC = () => {
  const { warehouseAssets, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedAsset, setSelectedAsset] = useState<ModeratedWarehouseAsset | null>(null);

  const [assetsList, setAssetsList] = useState<ModeratedWarehouseAsset[]>(() =>
    warehouseAssets.map((a) => ({
      ...a,
      moderationStatus: 'APPROVED'
    }))
  );

  const filtered = assetsList.filter((a) => {
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleModerateAction = (id: string, action: 'approve' | 'flag' | 'delete') => {
    const target = assetsList.find((a) => a.id === id);
    if (!target) return;

    if (action === 'delete') {
      setAssetsList((prev) => prev.filter((a) => a.id !== id));
      if (selectedAsset?.id === id) setSelectedAsset(null);
      showToast(`Asset "${target.title}" removed from marketplace`, 'info');
      return;
    }

    const newStatus = action === 'approve' ? 'APPROVED' : 'FLAGGED';
    setAssetsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, moderationStatus: newStatus } : a))
    );

    if (selectedAsset?.id === id) {
      setSelectedAsset((prev) => prev ? { ...prev, moderationStatus: newStatus } : null);
    }

    showToast(
      action === 'approve'
        ? `Asset "${target.title}" approved for global discovery`
        : `Asset "${target.title}" flagged for copyright/safety review`,
      action === 'approve' ? 'success' : 'warning'
    );
  };

  const handleCycleLicenseTier = (id: string) => {
    const tiers: ('Commercial Pro' | 'Standard Community' | 'Open Source')[] = [
      'Commercial Pro',
      'Standard Community',
      'Open Source'
    ];

    setAssetsList((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const currentIndex = tiers.indexOf(a.licensing);
          const nextTier = tiers[(currentIndex + 1) % tiers.length];
          showToast(`License tier for "${a.title}" updated to "${nextTier}"`, 'success');
          if (selectedAsset?.id === id) {
            setSelectedAsset((prev) => prev ? { ...prev, licensing: nextTier } : null);
          }
          return { ...a, licensing: nextTier };
        }
        return a;
      })
    );
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Package size={26} color="#A78BFA" />
            AI Warehouse Moderation
          </h1>
          <p className="dashboard-subtitle">
            Community and verified marketplace assets directory, safety categorization, copyright licensing reviews, and catalog status.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            {assetsList.length} Active Public Assets
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search assets by title, creator or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            {['ALL', 'Templates', 'Prompts', 'Scripts', 'Copy Packs', 'Workflows', 'Product Placement'].map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${categoryFilter === cat ? 'active' : ''}`}
                style={
                  cat === 'Product Placement'
                    ? categoryFilter === cat
                      ? { background: 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)', borderColor: '#7C3AED', color: '#FFFFFF' }
                      : { border: '1px solid #A855F7', color: '#A855F7', background: 'rgba(168, 85, 247, 0.1)', fontWeight: 700 }
                    : undefined
                }
                onClick={() => setCategoryFilter(cat)}
              >
                {cat === 'Product Placement' ? '🎁 Product Placement & Brand Integrations' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th style={{ minWidth: '260px' }}>Asset Title &amp; Details</th>
                <th style={{ minWidth: '100px', whiteSpace: 'nowrap' }}>Category</th>
                <th style={{ minWidth: '150px', whiteSpace: 'nowrap' }}>Creator &amp; Verification</th>
                <th style={{ minWidth: '160px', whiteSpace: 'nowrap' }}>License Tier</th>
                <th style={{ minWidth: '130px', whiteSpace: 'nowrap' }}>Engagement</th>
                <th style={{ minWidth: '130px', textAlign: 'right', whiteSpace: 'nowrap' }}>Moderation Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: '700', color: '#111625' }}>{asset.title}</span>
                        {asset.moderationStatus === 'FLAGGED' && (
                          <span className="badge badge-danger" style={{ fontSize: '10px', padding: '1px 6px' }}>
                            Flagged
                          </span>
                        )}
                        {asset.moderationStatus === 'APPROVED' && (
                          <span className="badge badge-success" style={{ fontSize: '10px', padding: '1px 6px' }}>
                            Approved
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: '#5F6B85', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {asset.description}
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                      {asset.category}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                      <span style={{ color: '#111625', fontWeight: '600' }}>{asset.creatorName}</span>
                      {asset.isVerifiedCreator && (
                        <span title="Verified Creator" style={{ display: 'inline-flex', alignItems: 'center' }}>
                          <ShieldCheck size={14} color="#34D399" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      className={`status-chip ${
                        asset.licensing === 'Commercial Pro'
                          ? 'info'
                          : asset.licensing === 'Standard Community'
                          ? 'neutral'
                          : 'success'
                      }`}
                      onClick={() => handleCycleLicenseTier(asset.id)}
                      title="Click to cycle license tier (Commercial Pro / Standard Community / Open Source)"
                      style={{
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        fontSize: '11px',
                        padding: '4px 10px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.18s ease',
                        border: '1px solid rgba(110, 86, 207, 0.25)'
                      }}
                    >
                      <Tag size={12} />
                      <span>{asset.licensing}</span>
                    </button>
                  </td>

                  <td style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                      <strong>{asset.downloads.toLocaleString()}</strong> dl • <strong>{asset.likes}</strong> likes
                    </div>
                  </td>

                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedAsset(asset)}
                        title="Inspect full asset details & blueprint"
                        style={{ padding: '5px 8px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Eye size={13} color="#6E56CF" />
                      </button>

                      <button
                        type="button"
                        className={`btn btn-sm ${asset.moderationStatus === 'APPROVED' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleModerateAction(asset.id, 'approve')}
                        style={{
                          padding: '5px 8px',
                          borderRadius: '8px',
                          color: asset.moderationStatus === 'APPROVED' ? '#FFFFFF' : '#059669',
                          borderColor: 'rgba(5, 150, 105, 0.35)',
                          background: asset.moderationStatus === 'APPROVED' ? '#059669' : 'rgba(5, 150, 105, 0.08)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title={asset.moderationStatus === 'APPROVED' ? 'Asset is Approved' : 'Click to Approve Asset'}
                      >
                        <CheckCircle2 size={13} />
                      </button>

                      <button
                        type="button"
                        className={`btn btn-sm ${asset.moderationStatus === 'FLAGGED' ? 'btn-danger' : 'btn-outline'}`}
                        onClick={() => handleModerateAction(asset.id, 'flag')}
                        style={{
                          padding: '5px 8px',
                          borderRadius: '8px',
                          color: asset.moderationStatus === 'FLAGGED' ? '#FFFFFF' : '#E11D48',
                          borderColor: 'rgba(225, 29, 72, 0.35)',
                          background: asset.moderationStatus === 'FLAGGED' ? '#E11D48' : 'rgba(225, 29, 72, 0.08)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title={asset.moderationStatus === 'FLAGGED' ? 'Asset is Flagged' : 'Flag Asset for Review'}
                      >
                        <AlertTriangle size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Inspection & Moderation Modal */}
      {selectedAsset && (
        <div
          className="dashboard-modal-backdrop"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="dashboard-modal-container admin-warehouse-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '680px' }}
          >
            {/* Header */}
            <div className="panel-header admin-warehouse-modal-header" style={{ padding: '18px 24px', borderBottom: '1px solid #E8ECF5', margin: 0, background: '#FAFAFC', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EFEBFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={20} color="#6E56CF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                    Asset Moderation &amp; Blueprint
                  </h3>
                  <span style={{ fontSize: '12px', color: '#5F6B85' }}>
                    ID: {selectedAsset.id} • Category: {selectedAsset.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setSelectedAsset(null)}
                style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="admin-warehouse-modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Asset Title & Description */}
              <div style={{ background: '#FAFBFD', padding: '16px', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                    {selectedAsset.title}
                  </h4>
                  <span className={`status-chip ${selectedAsset.moderationStatus === 'FLAGGED' ? 'danger' : 'success'}`}>
                    {selectedAsset.moderationStatus || 'APPROVED'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#5F6B85', lineHeight: '1.6', margin: 0 }}>
                  {selectedAsset.description}
                </p>
              </div>

              {/* Creator & Metadata Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
                  <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Creator</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <strong style={{ fontSize: '13px', color: '#111625' }}>{selectedAsset.creatorName}</strong>
                    {selectedAsset.isVerifiedCreator && <ShieldCheck size={14} color="#059669" />}
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
                  <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>License Tier</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span className="status-chip info" style={{ fontSize: '11px' }}>
                      {selectedAsset.licensing}
                    </span>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleCycleLicenseTier(selectedAsset.id)}
                      style={{ fontSize: '10px', padding: '2px 6px' }}
                    >
                      Cycle Tier
                    </button>
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
                  <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Engagement Stats</span>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111625', marginTop: '4px' }}>
                    {selectedAsset.downloads.toLocaleString()} downloads • {selectedAsset.likes} likes
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
                  <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Asset Rating &amp; Format</span>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#111625', marginTop: '4px' }}>
                    ★ {selectedAsset.rating} / 5.0 • {selectedAsset.format}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#111625', display: 'block', marginBottom: '8px' }}>
                  Discovery Tags
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedAsset.tags.map((tag) => (
                    <span key={tag} className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content / Prompt Blueprint Preview */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                    Blueprint / Prompt Content Preview
                  </span>
                  <span style={{ fontSize: '11px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Passed Security Scan
                  </span>
                </div>
                <pre style={{
                  padding: '14px',
                  background: '#111625',
                  color: '#A5B4FC',
                  borderRadius: '10px',
                  fontSize: '12px',
                  lineHeight: '1.6',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
{`// System Blueprint Specification for [${selectedAsset.title}]
Target Category: ${selectedAsset.category}
Licensing Policy: ${selectedAsset.licensing}
Verified Authority: ${selectedAsset.isVerifiedCreator ? 'True (Cryptographic Signature Valid)' : 'Standard Community'}

--- EXECUTION BLUEPRINT ---
Prompt Framework:
Act as a world-class executive copywriter and AI reasoning specialist.
Generate a structured, high-conversion multi-tier output adhering to Zunme AI quality benchmarks.
Validate references, maintain structural symmetry, and apply optimal conversion triggers.`}
                </pre>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="admin-warehouse-modal-footer">
              <button
                type="button"
                className="btn btn-outline btn-sm admin-warehouse-modal-remove-btn"
                style={{ color: '#E11D48', borderColor: '#FEECEB' }}
                onClick={() => handleModerateAction(selectedAsset.id, 'delete')}
              >
                <Trash2 size={14} />
                <span>Remove Asset</span>
              </button>

              <div className="admin-warehouse-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-sm admin-warehouse-modal-action-btn"
                  onClick={() => setSelectedAsset(null)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-sm admin-warehouse-modal-action-btn"
                  style={{ background: '#FEF3E2', color: '#D97706', border: '1px solid rgba(217, 119, 6, 0.3)' }}
                  onClick={() => handleModerateAction(selectedAsset.id, 'flag')}
                >
                  <AlertTriangle size={14} />
                  <span>Flag Asset</span>
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm admin-warehouse-modal-action-btn"
                  style={{ background: '#059669', borderColor: '#059669' }}
                  onClick={() => handleModerateAction(selectedAsset.id, 'approve')}
                >
                  <CheckCircle2 size={14} />
                  <span>Approve Asset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
