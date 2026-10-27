import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wand2,
  Package,
  Sparkles,
  SearchCheck,
  BarChart3,
  LifeBuoy,
  Cpu,
  LogOut,
  Menu,
  X,
  ArrowLeft,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationBell } from '../common/NotificationBell';
import './AdminShell.css';
import './SuperAdminShell.css';

export const AdminShell: React.FC = () => {
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


  const displayName = (user?.fullName || 'Operations Manager').replace(/\s*\([^)]*\)/g, '').trim();

  return (
    <div className="admin-shell">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="admin-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar with the exact approved 9 Operational Items + Logout */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-brand-section">
          <NavLink to="/admin" className="admin-brand-link">
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

        {/* Navigation Items */}
        <nav className="admin-nav" aria-label="Admin Operational Navigation">
          <NavLink
            to="/admin/dashboard"
            className={() => `admin-nav-item ${location.pathname === '/admin' || location.pathname === '/admin/dashboard' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={17} />
            <span>User Management</span>
          </NavLink>

          <NavLink
            to="/admin/tools"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Wand2 size={17} />
            <span>AI Tools & Content</span>
          </NavLink>

          <NavLink
            to="/admin/warehouse"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package size={17} />
            <span>AI Warehouse</span>
          </NavLink>

          <NavLink
            to="/admin/creators"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles size={17} />
            <span>Creator Management</span>
          </NavLink>

          <NavLink
            to="/admin/seo-marketing"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <SearchCheck size={17} />
            <span>SEO & Marketing</span>
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <BarChart3 size={17} />
            <span>Reports & Analytics</span>
          </NavLink>

          <NavLink
            to="/admin/support"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LifeBuoy size={17} />
            <span>Support & Moderation</span>
          </NavLink>

          <NavLink
            to="/admin/integrations"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Cpu size={17} />
            <span>Integrations</span>
          </NavLink>
        </nav>

        {/* Admin Footer & Logout at the Very Bottom */}
        <div className="admin-footer">
          <button className="admin-logout-btn" onClick={handleLogout} title="Sign out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Operational View */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-topbar">
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
                <div className="superadmin-topbar-avatar" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #6E56CF 100%)' }}>
                  {(user?.fullName || 'Admin User').charAt(0).toUpperCase()}
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
                      <div className="dropdown-avatar" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #6E56CF 100%)' }}>
                        {(user?.fullName || 'Admin User').charAt(0).toUpperCase()}
                      </div>
                      <div className="dropdown-user-details">
                        <span className="dropdown-name">{(user?.fullName || 'Admin User').replace(/\s*\([^)]*\)/g, '').trim()}</span>
                        <span className="dropdown-email">{user?.email || 'admin@zunme.ai'}</span>
                        <span className="dropdown-role-tag" style={{ color: '#6E56CF', background: '#F3F0FF' }}>Platform Administrator</span>
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
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
