import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Eye,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminUser, UserRole } from '../../types';
import '../../styles/dashboard.css';

export const SuperAdminUsersPage: React.FC = () => {
  const { adminUsers, toggleUserStatus, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED'>('ALL');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const filteredUsers = adminUsers.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    // In demo state, notify role updated
    showToast(`Role updated to ${newRole} for user ${userId}`, 'success');
  };

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Users size={26} color="#A78BFA" />
            Platform Users & Governance
          </h1>
          <p className="dashboard-subtitle">
            Manage authenticated user directories, platform access statuses, administrative permissions, and activity histories.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            {filteredUsers.length} Users Displayed
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search by name, email or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Role:
            </span>
            {(['ALL', 'USER', 'ADMIN', 'SUPER_ADMIN'] as const).map((r) => (
              <button
                key={r}
                className={`filter-pill ${roleFilter === r ? 'active' : ''}`}
                onClick={() => setRoleFilter(r)}
              >
                {r === 'ALL' ? 'All Roles' : r.replace('_', ' ')}
              </button>
            ))}

            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', marginLeft: '8px' }}>
              Status:
            </span>
            {(['ALL', 'ACTIVE', 'SUSPENDED'] as const).map((s) => (
              <button
                key={s}
                className={`filter-pill ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'ALL' ? 'All Status' : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>User / Identity</th>
                <th>Role Tier</th>
                <th>Account Status</th>
                <th>Joined Date</th>
                <th>Usage Volume</th>
                <th style={{ textAlign: 'right' }}>Administrative Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: '#94A3B8' }}>
                    No platform accounts found matching your query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: item.role === 'SUPER_ADMIN' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(124, 58, 237, 0.2)',
                            color: item.role === 'SUPER_ADMIN' ? '#F87171' : '#DDD6FE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '13px'
                          }}
                        >
                          {item.fullName.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', color: '#111625' }}>{item.fullName}</div>
                          <div style={{ fontSize: '12px', color: '#5F6B85' }}>{item.email}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          item.role === 'SUPER_ADMIN'
                            ? 'badge-primary'
                            : item.role === 'ADMIN'
                            ? 'badge-secondary'
                            : 'badge-neutral'
                        }`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        {item.role === 'SUPER_ADMIN' ? (
                          <ShieldAlert size={12} color="#F87171" />
                        ) : item.role === 'ADMIN' ? (
                          <ShieldCheck size={12} color="#A78BFA" />
                        ) : (
                          <Shield size={12} />
                        )}
                        {item.role.replace('_', ' ')}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-chip ${item.status === 'ACTIVE' ? 'success' : 'danger'}`}
                      >
                        {item.status === 'ACTIVE' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {item.status}
                      </span>
                    </td>

                    <td>{item.joinedDate}</td>

                    <td>
                      <div style={{ fontSize: '12px' }}>
                        <strong>{item.conversationsCount}</strong> chats • <strong>{item.savedItemsCount}</strong> saved
                      </div>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedUser(item)}
                          title="View user details"
                        >
                          <Eye size={13} />
                          <span>Details</span>
                        </button>

                        <button
                          className={`btn btn-sm ${item.status === 'ACTIVE' ? 'btn-danger' : 'btn-secondary'}`}
                          onClick={() => toggleUserStatus(item.id)}
                          title={item.status === 'ACTIVE' ? 'Suspend account' : 'Reactivate account'}
                          style={{
                            background: item.status === 'ACTIVE' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            borderColor: item.status === 'ACTIVE' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                            color: item.status === 'ACTIVE' ? '#F87171' : '#34D399'
                          }}
                        >
                          {item.status === 'ACTIVE' ? <UserX size={13} /> : <UserCheck size={13} />}
                          <span>{item.status === 'ACTIVE' ? 'Suspend' : 'Activate'}</span>
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Account Governance Record</div>
              <button className="btn-ghost" onClick={() => setSelectedUser(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(124, 58, 237, 0.3)',
                    color: '#DDD6FE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800'
                  }}
                >
                  {selectedUser.fullName.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111625' }}>{selectedUser.fullName}</h3>
                  <div style={{ color: '#5F6B85', fontSize: '13px' }}>{selectedUser.email}</div>
                  <div style={{ fontSize: '11px', color: '#8C97B0', marginTop: '2px' }}>User ID: {selectedUser.id}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#FAFBFD', borderRadius: '8px', border: '1px solid #E8ECF5' }}>
                  <div style={{ fontSize: '11px', color: '#5F6B85' }}>Current Role</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#111625', marginTop: '2px' }}>{selectedUser.role}</div>
                </div>

                <div style={{ padding: '12px', background: '#FAFBFD', borderRadius: '8px', border: '1px solid #E8ECF5' }}>
                  <div style={{ fontSize: '11px', color: '#5F6B85' }}>Account Status</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: selectedUser.status === 'ACTIVE' ? '#059669' : '#E11D48', marginTop: '2px' }}>
                    {selectedUser.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedUser(null)}>
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    toggleUserStatus(selectedUser.id);
                    setSelectedUser(null);
                  }}
                >
                  Toggle Status ({selectedUser.status === 'ACTIVE' ? 'Suspend' : 'Activate'})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
