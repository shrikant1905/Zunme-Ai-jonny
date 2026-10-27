import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  MessageSquare,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CreatorSubmission } from '../../types';
import '../../styles/dashboard.css';

export const AdminCreatorManagementPage: React.FC = () => {
  const { creatorSubmissions, updateCreatorSubmissionStatus, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSub, setSelectedSub] = useState<CreatorSubmission | null>(null);

  const filtered = creatorSubmissions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id: string, status: CreatorSubmission['status']) => {
    updateCreatorSubmissionStatus(id, status);
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#A78BFA" />
            Creator Management & Verification
          </h1>
          <p className="dashboard-subtitle">
            Review creator asset submissions, verify creator badges, provide editorial review feedback, and manage publishing approvals.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-warning">
            {creatorSubmissions.filter((s) => s.status === 'IN_REVIEW').length} Pending Reviews
          </div>
        </div>
      </div>

      {/* Creator Queue Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="panel-header" style={{ padding: 'var(--space-4) var(--space-5)', margin: 0 }}>
          <div className="panel-title">Creator Submissions Review Queue</div>
          <div className="search-box-wrap" style={{ maxWidth: '320px' }}>
            <Search size={14} />
            <input
              type="text"
              className="input-field"
              placeholder="Filter submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 12px 6px 36px' }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Submission Title</th>
                <th>Asset Type</th>
                <th>Category</th>
                <th>Submitted Date</th>
                <th>Review Status</th>
                <th style={{ textAlign: 'right' }}>Editorial Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#111625' }}>{sub.title}</div>
                    {sub.feedback && (
                      <div style={{ fontSize: '11px', color: '#FBBF24', marginTop: '2px' }}>
                        Feedback: {sub.feedback}
                      </div>
                    )}
                  </td>

                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {sub.type}
                    </span>
                  </td>

                  <td>{sub.category}</td>

                  <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>

                  <td>
                    <span
                      className={`status-chip ${
                        sub.status === 'APPROVED'
                          ? 'success'
                          : sub.status === 'IN_REVIEW'
                          ? 'warning'
                          : 'danger'
                      }`}
                    >
                      {sub.status === 'APPROVED' ? (
                        <CheckCircle2 size={12} />
                      ) : sub.status === 'IN_REVIEW' ? (
                        <Clock size={12} />
                      ) : (
                        <AlertCircle size={12} />
                      )}
                      {sub.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleStatusChange(sub.id, 'APPROVED')}
                        disabled={sub.status === 'APPROVED'}
                        title="Approve Submission"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        <CheckCircle2 size={12} />
                        <span>Approve</span>
                      </button>

                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleStatusChange(sub.id, 'CHANGES_REQUESTED')}
                        title="Request Changes"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        <MessageSquare size={12} />
                        <span>Changes</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
