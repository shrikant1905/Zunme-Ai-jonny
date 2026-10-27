import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Copy,
  Trash2,
  Eye,
  Check,
  X,
  ExternalLink,
  Globe,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LibraryCategory, SavedLibraryItem } from '../types';
import './LibraryPage.css';

export const LibraryPage: React.FC = () => {
  const { libraryItems, deleteFromLibrary, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory>('ALL');
  const [viewingItem, setViewingItem] = useState<SavedLibraryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    return libraryItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' || item.contentType === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.previewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [libraryItems, selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      ALL: libraryItems.length,
      TEXT: libraryItems.filter((i) => i.contentType === 'TEXT').length,
      RESEARCH: libraryItems.filter((i) => i.contentType === 'RESEARCH').length,
      MARKETING: libraryItems.filter((i) => i.contentType === 'MARKETING').length
    };
  }, [libraryItems]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const confirmDelete = () => {
    if (deletingId) {
      deleteFromLibrary(deletingId);
      if (viewingItem?.id === deletingId) {
        setViewingItem(null);
      }
      setDeletingId(null);
    }
  };

  const getBadgeClass = (type: string) => {
    if (type === 'RESEARCH') return 'badge-primary';
    if (type === 'MARKETING') return 'badge-success';
    return 'badge-neutral';
  };

  return (
    <div className="library-page">
      <div className="library-header-area">
        <h1 className="library-title">My Saved Library</h1>
        <p className="library-desc">
          Your personal repository of curated AI conversations, research summaries, and generated marketing drafts.
        </p>
      </div>

      {/* Toolbar: Search & Category Filters */}
      <div className="library-toolbar">
        <div className="library-search-box" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} />
          <input
            type="text"
            className="input-field library-search-input"
            placeholder="Search saved items by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingRight: searchQuery ? '32px' : undefined }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#8C97B0',
                display: 'flex',
                alignItems: 'center',
                padding: '4px'
              }}
              title="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="category-filter-pills" role="tablist">
          {(['ALL', 'TEXT', 'RESEARCH', 'MARKETING'] as LibraryCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat === 'ALL' ? 'All Items' : cat.charAt(0) + cat.slice(1).toLowerCase()}</span>
              <span className="badge badge-neutral" style={{ padding: '1px 6px', fontSize: '10px' }}>
                {counts[cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Saved Cards or Rich Empty States */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '64px 24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E8ECF5',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}
        >
          {libraryItems.length === 0 ? (
            /* Case 1: Total library empty */
            <div>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#F5EFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Bookmark size={28} color="#6E56CF" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                Your Library is Empty
              </h3>
              <p style={{ fontSize: '13.5px', color: '#5F6B85', maxWidth: '440px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                You haven't saved any conversational research or content blueprints yet. Generate content or run verified web searches and click "Save to Library" to curate your repository.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <NavLink to="/user/chat" className="btn btn-outline btn-sm">
                  Start AI Chat
                </NavLink>
                <NavLink to="/user/builders" className="btn btn-primary btn-sm">
                  Explore Content Blueprints
                </NavLink>
              </div>
            </div>
          ) : searchQuery ? (
            /* Case 2: No search matches */
            <div>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#F5EFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Search size={28} color="#6E56CF" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                No Results for "{searchQuery}"
              </h3>
              <p style={{ fontSize: '13.5px', color: '#5F6B85', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                No saved items match your search term{selectedCategory !== 'ALL' ? ` within the ${selectedCategory} category` : ''}. Check for spelling errors or try resetting filters.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search Query
                </button>
                {selectedCategory !== 'ALL' && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setSelectedCategory('ALL');
                      setSearchQuery('');
                    }}
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Case 3: Category with 0 items */
            <div>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: '#F5EFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Tag size={28} color="#6E56CF" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                No Items in {selectedCategory === 'TEXT' ? 'Text Drafts' : selectedCategory === 'RESEARCH' ? 'Research Summaries' : 'Marketing Copy'}
              </h3>
              <p style={{ fontSize: '13.5px', color: '#5F6B85', maxWidth: '420px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                You have {counts.ALL} other saved items in your library, but none under category "{selectedCategory}".
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedCategory('ALL')}
              >
                View All Saved Items ({counts.ALL})
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="library-cards-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="library-item-card">
              <div className="card-top-meta">
                <span className={`badge ${getBadgeClass(item.contentType)}`}>
                  {item.contentType}
                </span>
                <span className="card-date">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <h3 className="card-item-title" title={item.title}>
                {item.title}
              </h3>

              <p className="card-preview-body">{item.previewText}</p>

              <div className="card-actions-bar">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setViewingItem(item)}
                >
                  <Eye size={13} />
                  <span>View</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleCopy(item.id, item.content)}
                    title="Copy content"
                    style={{ padding: '6px' }}
                  >
                    {copiedId === item.id ? (
                      <Check size={14} color="var(--color-success)" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>

                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setDeletingId(item.id)}
                    title="Delete item"
                    style={{ padding: '6px', color: 'var(--color-error)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail View Modal */}
      {viewingItem && (
        <div className="modal-backdrop" onClick={() => setViewingItem(null)}>
          <div
            className="modal-container"
            style={{ maxWidth: '720px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-row">
              <div className="flex items-center gap-2">
                <span className={`badge ${getBadgeClass(viewingItem.contentType)}`}>
                  {viewingItem.contentType}
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: '700' }}>
                  {viewingItem.title}
                </h3>
              </div>
              <button
                className="btn-ghost"
                onClick={() => setViewingItem(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body-scroll">
              <div className="modal-body-text">{viewingItem.content}</div>

              {/* Verified Sources display if present */}
              {viewingItem.sourceMetadata && viewingItem.sourceMetadata.length > 0 && (
                <div className="modal-sources-box">
                  <h4 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                    Referenced Verified Sources ({viewingItem.sourceMetadata.length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {viewingItem.sourceMetadata.map((src) => (
                      <a
                        key={src.id}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '6px',
                          border: '1px solid var(--color-border)',
                          fontSize: '13px',
                          textDecoration: 'none'
                        }}
                      >
                        <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>
                          {src.title}
                        </span>
                        <ExternalLink size={13} color="var(--color-primary)" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer-row">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleCopy(viewingItem.id, viewingItem.content)}
              >
                {copiedId === viewingItem.id ? (
                  <>
                    <Check size={14} color="var(--color-success)" />
                    <span>Copied Content</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Full Content</span>
                  </>
                )}
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setViewingItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="modal-backdrop" onClick={() => setDeletingId(null)}>
          <div
            className="modal-container"
            style={{ maxWidth: '420px', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: '14px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-error-light)',
                  color: 'var(--color-error)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AlertTriangle size={18} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700' }}>Confirm Deletion</h3>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Are you sure you want to permanently delete this item from your library? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setDeletingId(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={confirmDelete}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
