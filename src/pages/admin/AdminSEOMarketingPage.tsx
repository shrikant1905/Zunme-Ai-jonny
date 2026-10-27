import React from 'react';
import {
  SearchCheck,
  TrendingUp,
  BarChart,
  Target,
  FileText,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export const AdminSEOMarketingPage: React.FC = () => {
  const { seoKeywords } = useApp();

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <SearchCheck size={26} color="#A78BFA" />
            SEO & Marketing Operations
          </h1>
          <p className="dashboard-subtitle">
            Supported platform content workflows, keyword index tracking, search intent categorization, and organic growth telemetry.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <span className="badge badge-primary">
            {seoKeywords.length} Targeted Keywords
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">
              <Target size={20} />
            </div>
            <span className="metric-badge positive">Top Intent</span>
          </div>
          <div className="metric-value">64,900</div>
          <div className="metric-label">Aggregated Monthly Search Volume</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
              <TrendingUp size={20} />
            </div>
            <span className="metric-badge positive">Low/Med</span>
          </div>
          <div className="metric-value">50.5</div>
          <div className="metric-label">Average Keyword Difficulty Score</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
              <FileText size={20} />
            </div>
            <span className="metric-badge neutral">100% Verified</span>
          </div>
          <div className="metric-value">4</div>
          <div className="metric-label">Published Cornerstone Articles</div>
        </div>
      </div>

      {/* Active Keyword Targets Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="panel-header" style={{ padding: 'var(--space-4) var(--space-5)', margin: 0 }}>
          <div className="panel-title">Tracked SEO Focus Keywords</div>
          <span className="badge badge-neutral">Operational View</span>
        </div>

        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Target Keyword</th>
                <th>Search Volume</th>
                <th>Difficulty</th>
                <th>Estimated CPC</th>
                <th>Search Intent</th>
                <th>Lifecycle Status</th>
              </tr>
            </thead>
            <tbody>
              {seoKeywords.map((kw) => (
                <tr key={kw.id}>
                  <td style={{ fontWeight: '700', color: '#111625' }}>{kw.keyword}</td>
                  <td>{kw.searchVolume}</td>
                  <td>
                    <span
                      className={`status-chip ${
                        kw.difficulty === 'Easy'
                          ? 'success'
                          : kw.difficulty === 'Moderate'
                          ? 'warning'
                          : 'danger'
                      }`}
                    >
                      {kw.difficulty} ({kw.difficultyScore})
                    </span>
                  </td>
                  <td>{kw.cpc}</td>
                  <td>
                    <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                      {kw.intent}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-primary" style={{ fontSize: '10px' }}>
                      {kw.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
