import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  MessageSquare,
  Search,
  Activity,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Ban,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './AdminPage.css';

export const AdminPage: React.FC = () => {
  const { user, toggleRole, adminUsers, toggleUserStatus, conversations, libraryItems } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED'>('ALL');

  // Filter users
  const filteredUsers = adminUsers.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      u.email.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      {/* Top Header */}
      <div className="admin-header-area">
        <div className="admin-title-row">
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="admin-page-title">Operational Administration</h1>
            <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
              System overview, active user management, and operational metrics
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NavLink to="/app/chat" className="btn btn-outline btn-sm">
            <ArrowLeft size={14} />
            <span>Return to Workspace</span>
          </NavLink>
        </div>
      </div>

      {/* Non-Admin Demo Notice */}
      {user?.role !== 'ADMIN' && (
        <div
          style={{
            backgroundColor: 'var(--color-warning-light)',
            border: '1px solid var(--color-warning-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={18} color="var(--color-warning)" />
            <span style={{ fontSize: '13.5px', color: '#92400E' }}>
              <strong>Preview Notice:</strong> Your current session role is <strong>USER</strong>. In production, this route is restricted to administrators.
            </span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={toggleRole}>
            Switch to ADMIN Role (Demo)
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <div className="metric-label-row">
            <span>Total Registered Users</span>
            <Users size={16} color="var(--color-primary)" />
          </div>
          <div className="metric-number-display">{1420 + adminUsers.length}</div>
          <div className="metric-trend-note">
            <Activity size={12} />
            <span>+12% new this week</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label-row">
            <span>Total Conversations</span>
            <MessageSquare size={16} color="var(--color-primary)" />
          </div>
          <div className="metric-number-display">{28540 + conversations.length}</div>
          <div className="metric-trend-note">
            <Activity size={12} />
            <span>Active multi-turn chats</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label-row">
            <span>Total Saved Items</span>
            <Search size={16} color="var(--color-primary)" />
          </div>
          <div className="metric-number-display">{14210 + libraryItems.length}</div>
          <div className="metric-trend-note">
            <Activity size={12} />
            <span>Library assets saved</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label-row">
            <span>System Health</span>
            <CheckCircle size={16} color="var(--color-success)" />
          </div>
          <div className="metric-number-display" style={{ color: 'var(--color-success)' }}>
            99.98%
          </div>
          <div className="metric-trend-note" style={{ color: 'var(--color-text-secondary)' }}>
            All provider endpoints green
          </div>
        </div>
      </div>

      {/* User Directory Table Card */}
      <div className="admin-table-card">
        <div className="table-toolbar">
          <div className="flex items-center gap-3">
            <h2 style={{ fontSize: '15px', fontWeight: '700' }}>User Directory</h2>
            <span className="badge badge-neutral">{filteredUsers.length} Users</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="text"
              className="input-field table-search-input"
              placeholder="Search by name or email..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />

            <select
              className="input-field"
              style={{ width: 'auto' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="SUSPENDED">Suspended Only</option>
            </select>
          </div>
        </div>

        <div className="responsive-table-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Chats</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--color-text-muted)' }}>
                    No users matching search filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div>
                        <strong>{u.fullName}</strong>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                          {u.email}
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge ${u.role === 'ADMIN' ? 'badge-primary' : 'badge-neutral'}`}>
                        {u.role}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                        {u.joinedDate}
                      </span>
                    </td>

                    <td>
                      <span style={{ fontWeight: '500' }}>{u.conversationsCount}</span>
                    </td>

                    <td>
                      <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-error'}`}>
                        {u.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        className={`btn btn-sm ${u.status === 'ACTIVE' ? 'btn-outline' : 'btn-secondary'}`}
                        onClick={() => toggleUserStatus(u.id)}
                        title={u.status === 'ACTIVE' ? 'Suspend access' : 'Activate access'}
                      >
                        {u.status === 'ACTIVE' ? (
                          <>
                            <Ban size={13} color="var(--color-error)" />
                            <span>Suspend</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={13} color="var(--color-success)" />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
