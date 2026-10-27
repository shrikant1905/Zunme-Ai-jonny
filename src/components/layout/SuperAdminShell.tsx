import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  FileText,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationBell } from '../common/NotificationBell';
import './SuperAdminShell.css';

export const SuperAdminShell: React.FC = () => {
  const { user, logout, toggleRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  const displayName = (user?.fullName || 'Super Administrator').replace(/\s*\([^)]*\)/g, '').trim();

  return (
    <div className="superadmin-shell">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="superadmin-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: STRICTLY 5 Menu Items + Logout */}
      <aside className={`superadmin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="superadmin-brand-section">
          <NavLink to="/super-admin" className="superadmin-brand-link">
            <img src="/zunme_logo_white.png" alt="Zunme AI" style={{ height: '32px', width: 'auto', display: 'block' }} />
          </NavLink>
          <button
            className="btn-ghost hide-on-desktop"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* The 5 Required Menu Items */}
        <nav className="superadmin-nav" aria-label="Super Admin Navigation">
          <NavLink
            to="/super-admin/dashboard"
            className={() => `superadmin-nav-item ${location.pathname === '/super-admin' || location.pathname === '/super-admin/dashboard' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/super-admin/users"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={18} />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/super-admin/plans"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <CreditCard size={18} />
            <span>Plans & Pricing</span>
          </NavLink>

          <NavLink
            to="/super-admin/audit-logs"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FileText size={18} />
            <span>Audit Logs</span>
          </NavLink>

          <NavLink
            to="/super-admin/settings"
            className={({ isActive }) => `superadmin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer with Logout at the Very Bottom */}
        <div className="superadmin-footer">
          <button
            className="superadmin-logout-btn"
            onClick={handleLogout}
            title="Sign out of Super Admin"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main View Canvas */}
      <div className="superadmin-main">
        {/* Top Header */}
        <header className="superadmin-topbar">
          <div className="topbar-left">
            <button
              className="btn-ghost hide-on-desktop"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="topbar-right">
            <NotificationBell />
            <div className="superadmin-profile-menu-wrap" style={{ position: 'relative' }}>
              <button
                type="button"
                className="superadmin-topbar-profile-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-expanded={profileDropdownOpen}
                aria-haspopup="true"
                title="Account Menu"
              >
                <div className="superadmin-topbar-avatar">
                  {displayName.charAt(0) || 'A'}
                </div>
                <ChevronDown size={14} className={`dropdown-chevron ${profileDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="superadmin-dropdown-backdrop"
                    onClick={() => setProfileDropdownOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                  />
                  <div className="superadmin-profile-dropdown" style={{ zIndex: 100 }}>
                    <div className="dropdown-user-header">
                      <div className="dropdown-avatar">{displayName.charAt(0) || 'A'}</div>
                      <div className="dropdown-user-details">
                        <span className="dropdown-name">{displayName}</span>
                        <span className="dropdown-email">{user?.email || 'superadmin@zunme.ai'}</span>
                        <span className="dropdown-role-tag">Super Administrator</span>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <button
                      type="button"
                      className="dropdown-item dropdown-logout-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut size={15} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="superadmin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
