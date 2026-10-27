import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Lock, Bell, AlertTriangle, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './SettingsPage.css';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout, showToast } = useApp();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSavingProfile(true);
    setTimeout(() => {
      updateProfile(fullName.trim());
      setIsSavingProfile(false);
    }, 400);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Please enter your current password', 'warning');
      return;
    }
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    setIsSavingSecurity(true);
    setTimeout(() => {
      setIsSavingSecurity(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password updated successfully', 'success');
    }, 600);
  };

  return (
    <div className="settings-page">
      <div className="settings-header-area">
        <h1 className="settings-title">Account Settings</h1>
        <p className="settings-desc">
          Manage your personal profile details, authentication credentials, and workspace preferences.
        </p>
      </div>

      {/* Profile Card */}
      <div className="settings-card">
        <h2 className="settings-card-title">Profile Information</h2>
        <p className="settings-card-subtitle">
          Update your public name and view your registered email
        </p>

        <div className="settings-avatar-row">
          <div className="large-avatar-circle">
            {user ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong style={{ fontSize: '15px' }}>{user?.fullName}</strong>
              <span className="badge badge-primary">{user?.role}</span>
            </div>
            <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {user?.email}
            </span>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="settings-name">
              Full Name
            </label>
            <input
              id="settings-name"
              type="text"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="settings-email">
              Email Address (Fixed)
            </label>
            <input
              id="settings-email"
              type="email"
              className="input-field"
              value={user?.email || ''}
              disabled
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSavingProfile || fullName === user?.fullName}
          >
            {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>

      {/* Security & Password Card */}
      <div className="settings-card">
        <h2 className="settings-card-title">Security & Password</h2>
        <p className="settings-card-subtitle">
          Ensure your account stays protected by using a unique password
        </p>

        <form onSubmit={handleSecuritySubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="current-pass">
              Current Password
            </label>
            <input
              id="current-pass"
              type="password"
              className="input-field"
              placeholder="••••••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="new-pass">
                New Password
              </label>
              <input
                id="new-pass"
                type="password"
                className="input-field"
                placeholder="min. 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirm-pass">
                Confirm New Password
              </label>
              <input
                id="confirm-pass"
                type="password"
                className="input-field"
                placeholder="repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-outline"
            disabled={isSavingSecurity || !currentPassword || !newPassword}
          >
            {isSavingSecurity ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="settings-card danger-zone-card">
        <h2 className="settings-card-title flex items-center gap-2">
          <AlertTriangle size={18} />
          <span>Danger Zone</span>
        </h2>
        <p className="settings-card-subtitle">
          Actions with significant account implications
        </p>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div style={{ fontWeight: 600, fontSize: '13.5px' }}>Sign Out of All Sessions</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              Invalidates all active tokens across devices and browsers.
            </div>
          </div>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
          >
            Sign Out Everywhere
          </button>
        </div>
      </div>
    </div>
  );
};
