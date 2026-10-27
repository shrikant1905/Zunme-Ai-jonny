import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid,
  Bot,
  Mail,
  PenTool,
  Film,
  Server,
  Briefcase,
  Landmark,
  Award,
  ShoppingBag,
  Activity,
  Layers,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import './EcosystemAppsLauncher.css';

export interface EcosystemAppItem {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  iconBg: string;
  to: string;
  badge?: string;
  isExternal?: boolean;
}

export const ECOSYSTEM_APPS: EcosystemAppItem[] = [
  {
    id: 'zunme-ai',
    name: 'Zunme AI',
    tagline: 'Core Workspace & Chat',
    icon: <Bot size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #6E56CF 0%, #4338CA 100%)',
    to: '/user/dashboard',
    badge: 'Core'
  },
  {
    id: 'zbox',
    name: 'zBox',
    tagline: 'Secured Email & MVP Share',
    icon: <Mail size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    to: '/zbox',
    badge: 'Email'
  },
  {
    id: 'content-studio',
    name: 'Content Studio',
    tagline: '1,000+ Blueprints',
    icon: <PenTool size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)',
    to: '/user/builders'
  },
  {
    id: 'zunme-store',
    name: 'Zunme Store',
    tagline: 'Digital Asset Shop',
    icon: <Film size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
    to: '/store',
    badge: 'Shop'
  },
  {
    id: 'merchant-zone',
    name: 'Merchant Zone',
    tagline: 'Catalog & Shopify Sync',
    icon: <ShoppingBag size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
    to: '/merchant-zone'
  },
  {
    id: 'mvp-suite',
    name: 'MVP Suite',
    tagline: '8 Platform Accelerators',
    icon: <Layers size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    to: '/user/mvp',
    badge: '8 MVPs'
  },
  {
    id: 'crm-nergy',
    name: 'CRM nErgy',
    tagline: 'CRM & ERP Deep Sync',
    icon: <Briefcase size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    to: '/business/crm'
  },
  {
    id: 'b4b-america',
    name: 'B4B America',
    tagline: 'Small Business Onboarding',
    icon: <ShieldCheck size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
    to: '/business/overview',
    badge: 'Partner'
  },
  {
    id: 'oal-marketplace',
    name: 'OAL Market',
    tagline: 'Commercial Funding Hub',
    icon: <Landmark size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
    to: '/business/overview'
  },
  {
    id: 'oal-money-club',
    name: 'OAL Money',
    tagline: 'INV IQ AI Credit Scoring',
    icon: <Award size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    to: '/business/overview',
    badge: 'INV IQ'
  },
  {
    id: 'omp-deals',
    name: 'OMP Deals',
    tagline: 'Commercial Trade Escrow',
    icon: <ShoppingBag size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
    to: '/merchant-zone'
  },
  {
    id: 'swmtp',
    name: 'SWMTP',
    tagline: 'Web Telemetry & SEO',
    icon: <Activity size={16} color="#FFFFFF" />,
    iconBg: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
    to: '/seo'
  }
];

export const EcosystemAppsLauncher: React.FC<{ variant?: 'dark' | 'light' }> = ({ variant = 'light' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={`ecosystem-launcher-wrap ${variant}`} ref={dropdownRef}>
      <button
        type="button"
        className="ecosystem-launcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Zunme Ecosystem Apps — 10 Connected Platforms (Google Products Style)"
        aria-label="Open Zunme Ecosystem Apps Launcher"
        aria-expanded={isOpen}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="waffle-9dots-svg"
        >
          <circle cx="4.5" cy="4.5" r="2.2" />
          <circle cx="12" cy="4.5" r="2.2" />
          <circle cx="19.5" cy="4.5" r="2.2" />
          <circle cx="4.5" cy="12" r="2.2" />
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="19.5" cy="12" r="2.2" />
          <circle cx="4.5" cy="19.5" r="2.2" />
          <circle cx="12" cy="19.5" r="2.2" />
          <circle cx="19.5" cy="19.5" r="2.2" />
        </svg>
        <span className="ecosystem-live-dot" title="10 Connected Ecosystem Apps Active" />
      </button>

      {isOpen && (
        <>
          <div
            className="ecosystem-mobile-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="ecosystem-launcher-dropdown">
          {/* Header */}
          <div className="ecosystem-dropdown-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
                  Zunme Platforms
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>
                  10 Connected Ecosystem Apps
                </p>
              </div>
            </div>
            <button
              type="button"
              className="ecosystem-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>

          {/* Grid of Apps (Clean Google Products Style) */}
          <div className="ecosystem-apps-grid">
            {ECOSYSTEM_APPS.map((app) => (
              <NavLink
                key={app.id}
                to={app.to}
                className="ecosystem-app-card"
                onClick={() => setIsOpen(false)}
                title={`${app.name} • ${app.tagline}`}
              >
                <div className="ecosystem-app-icon" style={{ background: app.iconBg }}>
                  {app.icon}
                  {app.badge && <span className="ecosystem-app-badge">{app.badge}</span>}
                </div>
                <span className="ecosystem-app-name">{app.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Footer */}
          <div className="ecosystem-dropdown-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748B' }}>
              <ShieldCheck size={12} color="#10B981" />
              <span>Universal SSO Login</span>
            </div>
            <NavLink
              to="/#ecosystem"
              className="ecosystem-footer-link"
              onClick={() => setIsOpen(false)}
            >
              <span>Explore All</span>
              <ExternalLink size={10} />
            </NavLink>
          </div>
        </div>
      </>
      )}
    </div>
  );
};
