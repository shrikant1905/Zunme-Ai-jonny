import React, { useState } from 'react';
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const AdminUserManagementPage: React.FC = () => {
  const { adminUsers, toggleUserStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED'>('ALL');

  const filtered = adminUsers.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Users size={26} color="#A78BFA" />
            Operational User Management
          </h1>
          <p className="dashboard-subtitle">
            Routine user account directory, activity volume monitoring, and authorized account status maintenance.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <span className="badge badge-neutral">{filtered.length} Users Listed</span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Filter by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            {(['ALL', 'ACTIVE', 'SUSPENDED'] as const).map((s) => (
              <button
                key={s}
                className={`filter-pill ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'ALL' ? 'All Statuses' : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Activity Volume</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#111625' }}>{u.fullName}</div>
                    <div style={{ fontSize: '12px', color: '#5F6B85' }}>{u.email}</div>
                  </td>
                  <td>
                    <span className="badge badge-neutral">
                      {u.role === 'ADMIN' ? <ShieldCheck size={12} color="#A78BFA" /> : <Shield size={12} />}
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-chip ${u.status === 'ACTIVE' ? 'success' : 'danger'}`}>
                      {u.status === 'ACTIVE' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {u.status}
                    </span>
                  </td>
                  <td>{u.joinedDate}</td>
                  <td>{u.conversationsCount} chats • {u.savedItemsCount} saved</td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className={`btn btn-sm ${u.status === 'ACTIVE' ? 'btn-danger' : 'btn-secondary'}`}
                      onClick={() => toggleUserStatus(u.id)}
                      style={{
                        background: u.status === 'ACTIVE' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        borderColor: u.status === 'ACTIVE' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                        color: u.status === 'ACTIVE' ? '#F87171' : '#34D399'
                      }}
                    >
                      {u.status === 'ACTIVE' ? <UserX size={13} /> : <UserCheck size={13} />}
                      <span>{u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}</span>
                    </button>
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
