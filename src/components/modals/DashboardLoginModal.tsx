import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Crown,
  ShieldCheck,
  Sparkles,
  Database,
  Wand2,
  TrendingUp,
  Briefcase,
  Megaphone,
  PenTool,
  ArrowRight,
  X,
  ExternalLink,
  Layers,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import './DashboardLoginModal.css';

interface DashboardButton {
  id: string;
  name: string;
  path: string;
  role: UserRole;
  roleLabel: string;
  icon: React.ReactNode;
  accentColor: string;
}

interface DashboardLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardLoginModal: React.FC<DashboardLoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { loginWithRole } = useApp();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const dashboardButtons: DashboardButton[] = [
    {
      id: 'super-admin',
      name: 'Super Admin Governance',
      path: '/super-admin',
      role: 'SUPER_ADMIN',
      roleLabel: 'Super Admin',
      icon: <Crown size={18} />,
      accentColor: '#8B5CF6'
    },
    {
      id: 'admin',
      name: 'Admin Operations Hub',
      path: '/admin',
      role: 'ADMIN',
      roleLabel: 'Admin',
      icon: <ShieldCheck size={18} />,
      accentColor: '#635BFF'
    },
    {
      id: 'app',
      name: 'User AI Workspace',
      path: '/app',
      role: 'USER',
      roleLabel: 'Core User',
      icon: <Sparkles size={18} />,
      accentColor: '#0EA5E9'
    },
    {
      id: 'business',
      name: 'Business & CRM Hub',
      path: '/business/overview',
      role: 'USER',
      roleLabel: 'Business',
      icon: <Briefcase size={18} />,
      accentColor: '#10B981'
    },
    {
      id: 'social',
      name: 'Social & Content Scheduler',
      path: '/social/calendar',
      role: 'USER',
      roleLabel: 'Social',
      icon: <Share2 size={18} />,
      accentColor: '#6E56CF'
    },
    {
      id: 'ads',
      name: 'Zunme Ads Platform',
      path: '/ads/overview',
      role: 'USER',
      roleLabel: 'Ads Platform',
      icon: <Megaphone size={18} />,
      accentColor: '#A855F7'
    }
  ];

  const handleSelect = (btn: DashboardButton) => {
    loginWithRole(btn.role, btn.name);
    onClose();
    navigate(btn.path);
  };

  return (
    <div className="dashboard-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="dashboard-modal-container compact-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="compact-modal-header">
          <div className="compact-header-left">
            <div className="compact-header-pill">
              <Layers size={13} />
              <span>Instant Login</span>
            </div>
            <h2 id="modal-title" className="compact-title">
              Choose Dashboard
            </h2>
            <p className="compact-subtitle">
              Click any dashboard button to sign in directly.
            </p>
          </div>
          <button
            type="button"
            className="compact-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Universal Single Sign-On (SSO) Banner (Client Doc Lines 226-230) */}
        <div className="modal-sso-banner">
          <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0 }} />
          <div>
            <strong>Universal Single Sign-On (SSO):</strong>
            <span> Users have an option to use one password to access all Zunme platforms.</span>
          </div>
        </div>

        {/* Buttons List / Grid */}
        <div className="compact-buttons-grid">
          {dashboardButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              className="dashboard-quick-btn"
              onClick={() => handleSelect(btn)}
              style={{ '--btn-accent': btn.accentColor } as React.CSSProperties}
            >
              <div className="quick-btn-icon" style={{ color: btn.accentColor, backgroundColor: `${btn.accentColor}18` }}>
                {btn.icon}
              </div>

              <div className="quick-btn-info">
                <span className="quick-btn-name">{btn.name}</span>
                <span className="quick-btn-path">{btn.path}</span>
              </div>

              <span className="quick-btn-role-badge">
                {btn.roleLabel}
              </span>

              <div className="quick-btn-arrow">
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="compact-modal-footer">
          <button
            type="button"
            className="compact-traditional-link"
            onClick={() => {
              onClose();
              navigate('/login');
            }}
          >
            <span>Standard Email &amp; Password Login</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default DashboardLoginModal;
