import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Search,
  MessageSquare,
  Trash2,
  Edit2,
  ArrowRight,
  Plus,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const UserHistoryPage: React.FC = () => {
  const {
    conversations,
    selectConversation,
    deleteConversation,
    createNewChat,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const navigate = useNavigate();

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = (id: string) => {
    selectConversation(id);
    navigate('/user/chat');
  };

  const handleStartRename = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(title);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editTitle.trim()) return;
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      conv.title = editTitle.trim();
    }
    setEditingId(null);
    showToast('Conversation renamed', 'success');
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Clock size={26} color="#A78BFA" />
            Conversation History
          </h1>
          <p className="dashboard-subtitle">
            Search, resume, rename, or purge past multi-turn conversational threads separate from your saved personal library items.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              createNewChat();
              navigate('/user/chat');
            }}
          >
            <Plus size={14} />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap" style={{ maxWidth: '440px' }}>
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search conversation topics & titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="badge badge-neutral">
            {filtered.length} Conversations Found
          </span>
        </div>
      </div>

      {/* History List */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#64748B' }}>
            No conversation history matching "{searchQuery}".
          </div>
        ) : (
          filtered.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleOpen(conv.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: '12px',
                background: '#FAFBFD',
                border: '1px solid #E8ECF5',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              className="history-row"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, overflow: 'hidden' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#EFEBFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6E56CF',
                    flexShrink: 0
                  }}
                >
                  <MessageSquare size={16} />
                </div>

                {editingId === conv.id ? (
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      className="input-field"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{ padding: '6px 10px', height: '34px', fontSize: '13px', background: '#FFFFFF', color: '#111625' }}
                      autoFocus
                    />
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => handleSaveRename(conv.id, e)}
                      style={{ padding: '6px' }}
                    >
                      <Check size={14} />
                    </button>
                    <button
                      className="btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                      }}
                      style={{ padding: '6px' }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#111625', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conv.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      Updated: {new Date(conv.updatedAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="btn-ghost"
                  onClick={(e) => handleStartRename(conv.id, conv.title, e)}
                  title="Rename Title"
                  style={{ padding: '6px', color: '#94A3B8' }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  className="btn-ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  title="Delete Conversation"
                  style={{ padding: '6px', color: '#F87171' }}
                >
                  <Trash2 size={14} />
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleOpen(conv.id)}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                >
                  <span>Resume</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
