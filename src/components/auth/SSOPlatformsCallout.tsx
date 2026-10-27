import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface SSOPlatformItem {
  name: string;
  badge: string;
  color: string;
  bg: string;
  icon: string;
}

export const SSO_ECOSYSTEM_PLATFORMS: SSOPlatformItem[] = [
  { name: 'Zunme AI', badge: 'Autonomous Core', color: '#6366F1', bg: '#EEF2FF', icon: '🤖' },
  { name: 'zBox', badge: 'Secure Email & Vault', color: '#0EA5E9', bg: '#F0F9FF', icon: '📦' },
  { name: 'Store', badge: 'AI Gear & Hardware', color: '#D97706', bg: '#FEF3C7', icon: '🛍️' },
  { name: 'Merchant', badge: 'Seller Hub', color: '#059669', bg: '#ECFDF5', icon: '💼' },
  { name: 'CRM nErgy', badge: 'Sales & Pipelines', color: '#7C3AED', bg: '#F5F3FF', icon: '⚡' },
  { name: 'MPA Ads', badge: 'Pay-For-Demand', color: '#DB2777', bg: '#FDF2F8', icon: '📢' },
  { name: 'Content', badge: 'Studio Library', color: '#EA580C', bg: '#FFF7ED', icon: '🎨' },
  { name: 'Scheduler', badge: 'Omnichannel Posts', color: '#0D9488', bg: '#F0FDFA', icon: '📅' },
  { name: 'SEO nTel', badge: 'SWMTP Crawlers', color: '#0891B2', bg: '#ECFEFF', icon: '🕷️' },
  { name: 'Warehouse', badge: 'Model Orchestration', color: '#475569', bg: '#F1F5F9', icon: '🏭' },
];

export const SSOPlatformsCallout: React.FC = () => {
  return (
    <div className="sso-unified-badge-card" aria-label="Universal Single Sign-On platforms">
      <div className="sso-badge-header">
        <div className="sso-badge-title">
          <ShieldCheck size={14} className="sso-shield-icon" />
          <span>Universal Single Sign-On (SSO)</span>
        </div>
        <span className="sso-ecosystem-pill">1 Account • 10 Platforms</span>
      </div>

      <p className="sso-badge-subtitle">
        One password seamlessly unlocks your entire connected enterprise ecosystem:
      </p>

      <div className="sso-platforms-grid">
        {SSO_ECOSYSTEM_PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="sso-platform-chip"
            title={`${platform.name} — ${platform.badge}`}
            style={{
              '--chip-accent': platform.color,
              '--chip-bg': platform.bg,
            } as React.CSSProperties}
          >
            <span className="sso-chip-icon">{platform.icon}</span>
            <span className="sso-chip-name">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
