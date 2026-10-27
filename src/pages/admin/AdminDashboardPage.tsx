import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Wand2,
  Package,
  Sparkles,
  LifeBuoy,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const AdminDashboardPage: React.FC = () => {
  const {
    adminUsers,
    libraryItems,
    creatorSubmissions,
    warehouseAssets,
    integrations
  } = useApp();

  const activeUsersCount = adminUsers.filter((u) => u.status === 'ACTIVE').length;
  const pendingReviewsCount = creatorSubmissions.filter((s) => s.status === 'IN_REVIEW').length;
  const connectedIntegrationsCount = integrations.filter((i) => i.status === 'CONNECTED').length;

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Wand2 size={26} color="#A78BFA" />
            Operations Overview
          </h1>
          <p className="dashboard-subtitle">
            Central operational hub for managing platform workflows, content review queues, creator submissions, and support requests.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-success">
            {connectedIntegrationsCount} / {integrations.length} Integrations Connected
          </div>
        </div>
      </div>

      {/* Overview Summaries (User, Content, Pending Review, Support) */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">
              <Users size={20} />
            </div>
            <span className="metric-badge positive">{activeUsersCount} Active</span>
          </div>
          <div className="metric-value">{adminUsers.length}</div>
          <div className="metric-label">Registered Accounts</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            {adminUsers.filter((u) => u.role === 'ADMIN').length} Staff Administrators
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
              <Package size={20} />
            </div>
            <span className="metric-badge neutral">Indexed</span>
          </div>
          <div className="metric-value">{warehouseAssets.length + libraryItems.length}</div>
          <div className="metric-label">Total Platform Content Assets</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            {warehouseAssets.length} public assets • {libraryItems.length} saved in library
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#FBBF24', background: 'rgba(245, 158, 11, 0.12)' }}>
              <Clock size={20} />
            </div>
            <span className="metric-badge warning">Needs Action</span>
          </div>
          <div className="metric-value">{pendingReviewsCount}</div>
          <div className="metric-label">Pending Creator Submissions</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            Awaiting operational review & approval
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
              <LifeBuoy size={20} />
            </div>
            <span className="metric-badge positive">All Clear</span>
          </div>
          <div className="metric-value">2</div>
          <div className="metric-label">Open Support Tickets</div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>
            Avg resolution time: 42 mins
          </div>
        </div>
      </div>

      {/* Grid: Platform Usage Graph + Pending Tasks */}
      <div className="cards-grid-2">
        {/* Platform Usage Graph based on real data */}
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <TrendingUp size={18} color="#A78BFA" />
                Platform Tool Usage & API Telemetry
              </div>
              <div className="panel-subtitle">Weekly queries and generation requests</div>
            </div>
            <span className="badge badge-primary">Active Week</span>
          </div>

          <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { day: 'Mon', count: '3,840', h: '55%' },
                { day: 'Tue', count: '4,620', h: '68%' },
                { day: 'Wed', count: '5,180', h: '78%' },
                { day: 'Thu', count: '4,950', h: '72%' },
                { day: 'Fri', count: '6,420', h: '92%', active: true },
                { day: 'Sat', count: '3,100', h: '45%' },
                { day: 'Sun', count: '2,900', h: '40%' }
              ].map((bar) => (
                <div key={bar.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: bar.active ? '#DDD6FE' : '#94A3B8' }}>{bar.count}</span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '36px',
                      height: bar.h,
                      borderRadius: '6px 6px 0 0',
                      background: bar.active
                        ? 'linear-gradient(180deg, #A78BFA 0%, #6E56CF 100%)'
                        : '#E8ECF5',
                      border: bar.active ? '1px solid rgba(110, 86, 207, 0.4)' : '1px solid #E2E8F0'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#5F6B85' }}>{bar.day}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8' }}>
              <span>Peak Day: <strong>Friday (6,420 runs)</strong></span>
              <span>Avg Latency: <strong>210ms</strong></span>
            </div>
          </div>
        </div>

        {/* Pending Operational Tasks */}
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <FileCheck2 size={18} color="#38BDF8" />
                Pending Operational Tasks
              </div>
              <div className="panel-subtitle">Action items requiring review</div>
            </div>
            <span className="badge badge-warning">3 Pending</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#111625' }}>
                  Review Creator Submission: Solopreneur Blueprint
                </div>
                <div style={{ fontSize: '11px', color: '#5F6B85', marginTop: '2px' }}>
                  Submitted by Sarah Connor • Branding Category
                </div>
              </div>
              <NavLink to="/admin/creators" className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                Review
              </NavLink>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#111625' }}>
                  Approve AI Warehouse Asset: Competitor SEO Chain
                </div>
                <div style={{ fontSize: '11px', color: '#5F6B85', marginTop: '2px' }}>
                  Submitted by Marcus Vance • Prompts Category
                </div>
              </div>
              <NavLink to="/admin/warehouse" className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                Moderate
              </NavLink>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#111625' }}>
                  nErgy CRM Integration Scheduled Health Check
                </div>
                <div style={{ fontSize: '11px', color: '#5F6B85', marginTop: '2px' }}>
                  Currently in MAINTENANCE mode for pipeline sync
                </div>
              </div>
              <NavLink to="/admin/integrations" className="btn btn-outline btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                Status
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Operational Activity */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <Clock size={18} color="#A78BFA" />
            Recent Operational Activity Log
          </div>
          <span className="badge badge-neutral">Live Telemetry</span>
        </div>

        <div className="admin-activity-list">
          {[
            { action: 'Creator Submission Approved', desc: 'Viral Hooks 2026 published to Community Warehouse', time: '12 mins ago', badge: 'success' },
            { action: 'User Suspended for Rate Limit Abuse', desc: 'usr_3 flagged by automated anomaly monitor', time: '1 hour ago', badge: 'warning' },
            { action: 'Tavily Search Engine Benchmark', desc: '180ms p95 response time validated across 1,200 queries', time: '3 hours ago', badge: 'info' },
            { action: 'New Content Studio Preset Deployed', desc: 'Added "LinkedIn Carousel Strategy" to 1,000+ catalog', time: '6 hours ago', badge: 'success' }
          ].map((act, i) => (
            <div key={i} className="admin-activity-item">
              <div className="admin-activity-main">
                <span className={`status-chip ${act.badge}`}>{act.action}</span>
                <span className="admin-activity-desc">{act.desc}</span>
              </div>
              <span className="admin-activity-time">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
