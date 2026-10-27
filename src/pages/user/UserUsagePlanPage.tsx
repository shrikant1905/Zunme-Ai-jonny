import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  CreditCard,
  Zap,
  CheckCircle2,
  Database,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const UserUsagePlanPage: React.FC = () => {
  const { conversations, libraryItems, pricingPlans, showToast } = useApp();

  const activePlan = pricingPlans.find((p) => p.isCurrent) || pricingPlans[1];

  const handleUpgrade = (planName: string) => {
    showToast(`Redirecting to verified billing portal for ${planName}...`, 'info');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <CreditCard size={26} color="#A78BFA" />
            Account Usage & Subscription Plan
          </h1>
          <p className="dashboard-subtitle">
            Monitor real-time compute tokens, citation searches executed, library cloud storage, and active plan entitlements.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} />
            <span>Active Tier: {activePlan.name}</span>
          </div>
        </div>
      </div>

      {/* Quota Progress Cards */}
      <div className="cards-grid-3">
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
              Conversations
            </span>
            <MessageSquare size={16} color="#6E56CF" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#111625', marginBottom: '4px' }}>
            {conversations.length} / Unlimited
          </div>
          <div style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '16px' }}>
            Multi-turn LLM reasoning queries executed this billing period.
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E8ECF5' }}>
            <div style={{ width: '12%', height: '100%', background: '#6E56CF', borderRadius: '3px' }} />
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
              Live Web Searches
            </span>
            <Search size={16} color="#0284C7" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#111625', marginBottom: '4px' }}>
            14 / Unlimited
          </div>
          <div style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '16px' }}>
            Real-time research briefs grounded with verified citations.
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E8ECF5' }}>
            <div style={{ width: '8%', height: '100%', background: '#0284C7', borderRadius: '3px' }} />
          </div>
        </div>

        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
              Library Storage
            </span>
            <Database size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#111625', marginBottom: '4px' }}>
            {libraryItems.length * 24} KB / 10 GB
          </div>
          <div style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '16px' }}>
            Saved research briefs, marketing copy, and knowledge notes.
          </div>
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E8ECF5' }}>
            <div style={{ width: '2%', height: '100%', background: '#059669', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* Current Plan Overview & Tiers */}
      <div className="glass-panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">
              <Sparkles size={18} color="#6E56CF" />
              Verified Subscription Plans
            </div>
            <div className="panel-subtitle">Transparent pricing without hidden add-ons or billing lock-in</div>
          </div>
          <span className="badge badge-primary">Monthly Billing</span>
        </div>

        <div className="plans-pricing-grid">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                padding: '22px',
                borderRadius: 'var(--radius-xl)',
                background: plan.isCurrent ? '#F5EFFF' : '#FAFBFD',
                border: plan.isCurrent ? '2px solid #6E56CF' : '1px solid #E8ECF5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: plan.isCurrent ? '0 8px 24px rgba(110, 86, 207, 0.12)' : 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>{plan.name}</span>
                  {plan.isCurrent && <span className="badge badge-success">Current Plan</span>}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: '#111625' }}>{plan.price}</span>
                  <span style={{ fontSize: '12px', color: '#5F6B85' }}>/ {plan.billingPeriod}</span>
                </div>

                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4', marginBottom: '16px' }}>
                  {plan.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} style={{ fontSize: '12px', color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#059669" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`btn btn-sm ${plan.isCurrent ? 'btn-outline' : 'btn-primary'}`}
                onClick={() => handleUpgrade(plan.name)}
                disabled={plan.isCurrent}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {plan.isCurrent ? 'Active Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
