import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Edit3,
  Users,
  ShieldCheck,
  Sparkles,
  Save,
  X,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PricingPlan } from '../../types';
import '../../styles/dashboard.css';

export const SuperAdminPlansPage: React.FC = () => {
  const { pricingPlans, updatePricingPlan, showToast } = useApp();
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const totalPaidSubscribers = pricingPlans.reduce((acc, p) => acc + p.activeSubscribers, 0);

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    updatePricingPlan(editingPlan.id, editingPlan);
    setEditingPlan(null);
    showToast(`Updated "${editingPlan.name}" plan details`, 'success');
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, featureInput.trim()]
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <CreditCard size={26} color="#A78BFA" />
            Plans & Subscription Pricing
          </h1>
          <p className="dashboard-subtitle">
            Manage verified subscription tiers, feature entitlements, pricing terms, and subscriber distribution across the platform.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} />
            <span>Verified Pricing Active</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="plans-pricing-grid">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              padding: '28px',
              borderColor: plan.id === 'plan_pro' ? 'rgba(124, 58, 237, 0.4)' : undefined,
              boxShadow: plan.id === 'plan_pro' ? '0 0 24px rgba(124, 58, 237, 0.15)' : undefined
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge badge-neutral" style={{ textTransform: 'uppercase', fontSize: '10px' }}>
                  Tier: {plan.id.replace('plan_', '')}
                </span>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setEditingPlan(plan)}
                  style={{ padding: '4px 8px' }}
                >
                  <Edit3 size={13} />
                  <span>Edit Plan</span>
                </button>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                {plan.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#5F6B85', marginBottom: '16px', minHeight: '38px', lineHeight: '1.4' }}>
                {plan.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: '#111625' }}>{plan.price}</span>
                <span style={{ fontSize: '13px', color: '#5F6B85' }}>/ {plan.billingPeriod}</span>
              </div>

              <div style={{ borderTop: '1px solid #E8ECF5', paddingTop: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Included Entitlements
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#374151' }}>
                      <Check size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ paddingTop: '14px', borderTop: '1px solid #E8ECF5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', color: '#5F6B85' }}>
                <Users size={13} style={{ display: 'inline', marginRight: '4px' }} />
                {plan.activeSubscribers} Users
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setEditingPlan(plan)}>
                Manage Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="modal-overlay" onClick={() => setEditingPlan(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Configure Plan: {editingPlan.name}</div>
              <button className="btn-ghost" onClick={() => setEditingPlan(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePlan} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Plan Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Verified Price (USD)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Billing Cadence
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={editingPlan.billingPeriod}
                    onChange={(e) => setEditingPlan({ ...editingPlan, billingPeriod: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  className="input-field"
                  rows={2}
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Features & Limits
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Add new feature entitlement..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddFeature}>
                    <Plus size={14} /> Add
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
                  {editingPlan.features.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: '#FAFBFD',
                        border: '1px solid #E8ECF5',
                        color: '#111625',
                        fontSize: '12px'
                      }}
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => handleRemoveFeature(i)}
                        style={{ padding: '2px', color: '#F87171' }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setEditingPlan(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Save size={14} />
                  <span>Save Plan Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
