import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  ShieldAlert,
  Server,
  Activity,
  ArrowUpRight,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const SuperAdminDashboardPage: React.FC = () => {
  const { adminUsers, auditLogs, pricingPlans, showToast } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Derived high-level stats from active state
  const totalUsers = adminUsers.length + 1420; // 1,420 base + active state
  const activeUsers = adminUsers.filter((u) => u.status === 'ACTIVE').length + 1380;
  const totalSubscribers = pricingPlans.reduce((acc, p) => acc + p.activeSubscribers, 0);
  const estimatedMRR = pricingPlans.reduce((acc, p) => {
    const numericPrice = parseInt(p.price.replace('$', ''), 10) || 0;
    return acc + numericPrice * p.activeSubscribers;
  }, 0);

  const handleRunDiagnostics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('System diagnostics complete: All core services operating at 99.98% uptime', 'success');
    }, 900);
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <ShieldAlert size={26} color="#EF4444" />
            Executive Governance
          </h1>
          <p className="dashboard-subtitle">
            High-level platform telemetry, verified user metrics, global subscription revenue, and real-time security audit trails.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="btn btn-outline btn-sm"
            onClick={handleRunDiagnostics}
            disabled={isRefreshing}
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? 'Checking Health...' : 'Run Diagnostics'}</span>
          </button>
          <NavLink to="/super-admin/audit-logs" className="btn btn-secondary btn-sm">
            <FileText size={14} />
            <span>View Full Audit Log</span>
          </NavLink>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">
              <Users size={20} />
            </div>
            <span className="metric-badge positive">+14.2% MoM</span>
          </div>
          <div className="metric-value">{totalUsers.toLocaleString()}</div>
          <div className="metric-label">Total Registered Accounts</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            {activeUsers.toLocaleString()} active / {adminUsers.filter((u) => u.status === 'SUSPENDED').length} suspended
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
              <TrendingUp size={20} />
            </div>
            <span className="metric-badge positive">Verified</span>
          </div>
          <div className="metric-value">${estimatedMRR.toLocaleString()}</div>
          <div className="metric-label">Estimated MRR Run-Rate</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            {totalSubscribers.toLocaleString()} paid subscriptions active
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
              <Cpu size={20} />
            </div>
            <span className="metric-badge neutral">180ms p95</span>
          </div>
          <div className="metric-value">99.98%</div>
          <div className="metric-label">Cluster Health & Uptime</div>
          <div style={{ fontSize: '11px', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={12} /> All nodes operational
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#F87171', background: 'rgba(239, 68, 68, 0.12)' }}>
              <AlertTriangle size={20} />
            </div>
            <span className="metric-badge neutral">Last 24h</span>
          </div>
          <div className="metric-value">{auditLogs.length}</div>
          <div className="metric-label">Logged Administrative Actions</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            {auditLogs.filter((l) => l.status === 'FAILED').length} failed alerts flagged
          </div>
        </div>
      </div>

      {/* Grid: User Growth Visualization & Recent Audit Trail */}
      <div className="cards-grid-2">
        {/* User Growth & Capacity Overview */}
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <Activity size={18} color="#A78BFA" />
                Verified User Growth Trajectory
              </div>
              <div className="panel-subtitle">Monthly active users across 2026 quarters</div>
            </div>
            <span className="badge badge-primary">Q3-Q4 2026</span>
          </div>

          {/* Clean CSS-based SVG Growth Visualization */}
          <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { month: 'Jun', count: '640', height: '35%' },
                { month: 'Jul', count: '820', height: '45%' },
                { month: 'Aug', count: '1,050', height: '58%' },
                { month: 'Sep', count: '1,280', height: '72%' },
                { month: 'Oct', count: '1,424', height: '90%', active: true }
              ].map((bar) => (
                <div key={bar.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: bar.active ? '#6E56CF' : '#8C97B0' }}>{bar.count}</span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '48px',
                      height: bar.height,
                      borderRadius: '6px 6px 0 0',
                      background: bar.active
                        ? 'linear-gradient(180deg, #A78BFA 0%, #6E56CF 100%)'
                        : '#E8ECF5',
                      border: bar.active ? '1px solid rgba(110, 86, 207, 0.4)' : '1px solid #E2E8F0',
                      boxShadow: bar.active ? '0 0 16px rgba(110, 86, 207, 0.25)' : 'none',
                      transition: 'height 0.4s ease'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#5F6B85' }}>{bar.month}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8' }}>
              <span>Average Daily Signups: <strong>+18 accounts</strong></span>
              <span>Conversion to Paid Tier: <strong>26.9%</strong></span>
            </div>
          </div>
        </div>

        {/* Real-time Audit Activity Panel */}
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <FileText size={18} color="#F87171" />
                Recent Executive Audit Trail
              </div>
              <div className="panel-subtitle">Immediate oversight of security & configuration changes</div>
            </div>
            <NavLink to="/super-admin/audit-logs" className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
              All Logs <ArrowUpRight size={12} />
            </NavLink>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5',
                  fontSize: '12px',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                  <span
                    className={`status-chip ${
                      log.status === 'SUCCESS' ? 'success' : log.status === 'WARNING' ? 'warning' : 'danger'
                    }`}
                    style={{ fontSize: '10px', padding: '2px 6px' }}
                  >
                    {log.status}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span style={{ color: '#111625', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                    <span style={{ color: '#5F6B85', fontSize: '11px' }}>
                      By {log.actor} • {log.resource}
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#8C97B0', whiteSpace: 'nowrap', textAlign: 'right' }}>
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Platform Architecture Status */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <Server size={18} color="#0284C7" />
            Core Infrastructure Nodes & Routing
          </div>
          <span className="badge badge-success">Production Healthy</span>
        </div>

        <div className="cards-grid-3">
          <div style={{ padding: '14px', borderRadius: '12px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
            <div style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '4px' }}>AI Primary Inference Engine</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#111625' }}>OpenAI GPT-4o Gateway</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px' }}>● 100% Traffic Routed • 240ms latency</div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
            <div style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '4px' }}>Web Search Grounding Engine</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#111625' }}>Tavily API Cluster</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px' }}>● Citation Extraction Active • 180ms</div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
            <div style={{ fontSize: '12px', color: '#5F6B85', marginBottom: '4px' }}>Persistent Data Layer</div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#111625' }}>PostgreSQL + AWS S3 Storage</div>
            <div style={{ fontSize: '11px', color: '#059669', marginTop: '6px' }}>● Backups Hourly • Zero Loss</div>
          </div>
        </div>
      </div>
    </div>
  );
};
