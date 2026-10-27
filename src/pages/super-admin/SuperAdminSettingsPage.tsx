import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Sliders,
  Database,
  Lock,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const SuperAdminSettingsPage: React.FC = () => {
  const { showToast, addAuditLog, user } = useApp();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [defaultModel, setDefaultModel] = useState('gpt-4o');
  const [searchVerificationStrict, setSearchVerificationStrict] = useState(true);
  const [chatHourlyCap, setChatHourlyCap] = useState(60);
  const [searchHourlyCap, setSearchHourlyCap] = useState(30);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(120);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog({
      actor: user?.fullName || 'SuperAdmin (Root)',
      role: 'SUPER_ADMIN',
      action: 'PLATFORM_SETTINGS_UPDATED',
      resource: `Routing: ${defaultModel}, Maintenance: ${maintenanceMode ? 'ON' : 'OFF'}`,
      ipAddress: '192.168.1.104',
      status: 'SUCCESS'
    });
    showToast('Global platform settings saved successfully', 'success');
  };

  const handleResetDefaults = () => {
    setMaintenanceMode(false);
    setDefaultModel('gpt-4o');
    setSearchVerificationStrict(true);
    setChatHourlyCap(60);
    setSearchHourlyCap(30);
    setSessionTimeoutMinutes(120);
    showToast('Settings restored to system baseline defaults', 'info');
  };

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Settings size={26} color="#6E56CF" />
            Global Platform Configuration
          </h1>
          <p className="dashboard-subtitle">
            Configure system-wide parameters, AI engine inference defaults, operational safety toggles, and API rate limiting quotas.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button className="btn btn-outline btn-sm" onClick={handleResetDefaults}>
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleSaveSettings}>
            <Save size={14} />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {/* Platform Maintenance Mode Alert Panel */}
        <div className="glass-panel" style={{ borderLeft: maintenanceMode ? '4px solid #EF4444' : '4px solid #10B981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: maintenanceMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: maintenanceMode ? '#F87171' : '#34D399',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {maintenanceMode ? <AlertTriangle size={22} /> : <CheckCircle2 size={22} />}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625' }}>
                  {maintenanceMode ? 'Global Maintenance Mode is ACTIVE' : 'Platform System Status: Normal Operations'}
                </h3>
                <p style={{ fontSize: '13px', color: '#5F6B85', marginTop: '2px' }}>
                  {maintenanceMode
                    ? 'Non-admin users will see a maintenance screen. Super Admin bypass remains enabled.'
                    : 'All user workspaces, chat inference endpoints, and web search pipelines are available.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              className={`btn btn-sm ${maintenanceMode ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => {
                setMaintenanceMode(!maintenanceMode);
                showToast(`Maintenance mode ${!maintenanceMode ? 'Enabled' : 'Disabled'}`, 'info');
              }}
              style={{
                background: maintenanceMode ? '#FEECEB' : '#FAFBFD',
                borderColor: maintenanceMode ? '#EF4444' : '#E8ECF5',
                color: maintenanceMode ? '#E11D48' : '#111625'
              }}
            >
              {maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
            </button>
          </div>
        </div>

        {/* AI & Search Engine Defaults */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Sliders size={18} color="#6E56CF" />
              AI Model Inference & Search Grounding Policies
            </div>
            <span className="badge badge-primary">Engine Routing</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Primary LLM Routing Engine
              </label>
              <select
                className="input-field"
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
              >
                <option value="gpt-4o">OpenAI GPT-4o (Default Production Baseline)</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet (Extended Context)</option>
                <option value="gpt-4o-mini">OpenAI GPT-4o Mini (Cost-Optimized Fallback)</option>
              </select>
              <span style={{ fontSize: '11px', color: '#5F6B85', marginTop: '4px', display: 'block' }}>
                Determines which model pipeline handles general chat and content studio requests.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Live Search Strict Citation Verification
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                <input
                  type="checkbox"
                  id="strictSearch"
                  checked={searchVerificationStrict}
                  onChange={(e) => setSearchVerificationStrict(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#6E56CF' }}
                />
                <label htmlFor="strictSearch" style={{ fontSize: '13px', color: '#111625', cursor: 'pointer' }}>
                  Require 3+ verified source domains before rendering synthesis
                </label>
              </div>
              <span style={{ fontSize: '11px', color: '#5F6B85', marginTop: '4px', display: 'block' }}>
                Prevents AI hallucination by enforcing structured citation extraction from Tavily API.
              </span>
            </div>
          </div>
        </div>

        {/* API Rate Limits & Quotas */}
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Database size={18} color="#0284C7" />
              API Rate Limiting & User Quotas
            </div>
            <span className="badge badge-neutral">Platform Protection</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Max AI Chats Per Hour (Per Free User)
              </label>
              <input
                type="number"
                className="input-field"
                value={chatHourlyCap}
                onChange={(e) => setChatHourlyCap(Number(e.target.value))}
                min={10}
                max={300}
              />
              <span style={{ fontSize: '11px', color: '#5F6B85', marginTop: '4px', display: 'block' }}>
                Enforced by server Redis rate limiter. Paid tier users receive unthrottled access.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Max Web Searches Per Hour (Per Free User)
              </label>
              <input
                type="number"
                className="input-field"
                value={searchHourlyCap}
                onChange={(e) => setSearchHourlyCap(Number(e.target.value))}
                min={5}
                max={150}
              />
              <span style={{ fontSize: '11px', color: '#5F6B85', marginTop: '4px', display: 'block' }}>
                Protects third-party search provider credits against automated scraping.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Auth Session Idle Timeout (Minutes)
              </label>
              <input
                type="number"
                className="input-field"
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                min={15}
                max={1440}
              />
              <span style={{ fontSize: '11px', color: '#5F6B85', marginTop: '4px', display: 'block' }}>
                Forces re-authentication after specified inactivity window.
              </span>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="button" className="btn btn-outline" onClick={handleResetDefaults}>
            Cancel Changes
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            <span>Apply Global Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
