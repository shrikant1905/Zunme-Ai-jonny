import React, { useState } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Send,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: 'Billing' | 'Technical' | 'Feature Request' | 'Content Safety';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  message: string;
}

const DEFAULT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_101',
    userEmail: 'sarah.c@cyberdyne.org',
    userName: 'Sarah Connor',
    subject: 'Request for custom brand tone export in Content Studio',
    category: 'Feature Request',
    status: 'IN_PROGRESS',
    priority: 'Medium',
    createdAt: '2026-10-15T07:30:00Z',
    message: 'We want to enforce a persistent brand persona across all generated marketing newsletters.'
  },
  {
    id: 'tkt_102',
    userEmail: 'marcus@soloventure.io',
    userName: 'Marcus Vance',
    subject: 'Web search citation domain filter request',
    category: 'Technical',
    status: 'OPEN',
    priority: 'High',
    createdAt: '2026-10-14T19:10:00Z',
    message: 'Can we restrict real-time search queries to whitelist specific academic or patent domains?'
  },
  {
    id: 'tkt_103',
    userEmail: 'alex.creator@zunme.ai',
    userName: 'Alex Johnson',
    subject: 'Account subscription tier receipt confirmation',
    category: 'Billing',
    status: 'RESOLVED',
    priority: 'Low',
    createdAt: '2026-10-12T11:45:00Z',
    message: 'Needed the verified tax invoice for the $29/mo Pro Creator plan.'
  }
];

export const AdminSupportModerationPage: React.FC = () => {
  const { showToast } = useApp();
  const [tickets, setTickets] = useState<SupportTicket[]>(DEFAULT_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'RESOLVED' } : t))
    );
    showToast(`Ticket ${id} marked as RESOLVED`, 'success');
    if (selectedTicket?.id === id) {
      setSelectedTicket(null);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    showToast(`Response dispatched to ${selectedTicket.userEmail}`, 'success');
    handleResolveTicket(selectedTicket.id);
    setReplyText('');
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <LifeBuoy size={26} color="#A78BFA" />
            Support Requests & Moderation
          </h1>
          <p className="dashboard-subtitle">
            Customer inquiry resolution, user safety reports, feedback review, and direct operational communication.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-warning">
            {tickets.filter((t) => t.status !== 'RESOLVED').length} Open Inquiries
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Requester</th>
                <th>Subject & Issue</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Received</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#111625' }}>{t.userName}</div>
                    <div style={{ fontSize: '11px', color: '#5F6B85' }}>{t.userEmail}</div>
                  </td>

                  <td>
                    <div style={{ fontWeight: '600', color: '#111625' }}>{t.subject}</div>
                    <div style={{ fontSize: '11px', color: '#5F6B85', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.message}
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
                      {t.category}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-chip ${
                        t.priority === 'High' ? 'danger' : t.priority === 'Medium' ? 'warning' : 'neutral'
                      }`}
                      style={{ fontSize: '10px' }}
                    >
                      {t.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-chip ${
                        t.status === 'RESOLVED' ? 'success' : t.status === 'IN_PROGRESS' ? 'warning' : 'info'
                      }`}
                    >
                      {t.status === 'RESOLVED' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {t.status}
                    </span>
                  </td>

                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedTicket(t)}
                        title="View details & respond"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>

                      {t.status !== 'RESOLVED' && (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleResolveTicket(t.id)}
                          title="Mark Resolved"
                          style={{ padding: '4px 8px', fontSize: '11px', color: '#34D399' }}
                        >
                          <CheckCircle2 size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Details & Response Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Ticket: {selectedTicket.id}</div>
              <button className="btn-ghost" onClick={() => setSelectedTicket(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>
                  {selectedTicket.subject}
                </div>
                <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '2px' }}>
                  From: {selectedTicket.userName} ({selectedTicket.userEmail}) • Priority: {selectedTicket.priority}
                </div>
              </div>

              <div style={{ padding: '14px', background: '#FAFBFD', borderRadius: '10px', border: '1px solid #E8ECF5', fontSize: '13px', lineHeight: '1.5', color: '#272F3E' }}>
                {selectedTicket.message}
              </div>

              <form onSubmit={handleSendReply} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                  Operational Reply
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Type official reply to user..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setSelectedTicket(null)}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={13} />
                    <span>Send & Resolve</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
