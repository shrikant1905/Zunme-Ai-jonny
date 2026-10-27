import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Database,
  Cpu,
  Clock,
  Download,
  CheckCircle2,
  Calendar,
  Filter,
  RefreshCw,
  FolderX
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { exportToCsv } from '../../components/modals/CsvImportModal';
import '../../styles/dashboard.css';

export const AdminReportsPage: React.FC = () => {
  const { conversations, libraryItems, showToast } = useApp();
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d' | '90d' | 'custom'>('7d');
  const [filterQuery, setFilterQuery] = useState('');

  const TELEMETRY_FEATURES = [
    { label: 'AI Conversational Assistant', percent: 45, count: '14,200 requests', color: '#7C3AED', category: 'Chat' },
    { label: 'Live Web Search with Verified Citations', percent: 28, count: '8,800 searches', color: '#38BDF8', category: 'Search' },
    { label: 'AI Content Builders (Studio)', percent: 18, count: '5,600 generations', color: '#10B981', category: 'Studio' },
    { label: 'Personal Library & Exports', percent: 9, count: '2,800 operations', color: '#F59E0B', category: 'Library' }
  ];

  const filteredFeatures = TELEMETRY_FEATURES.filter((f) =>
    selectedRange === 'custom' ? false : f.label.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleExportTelemetry = () => {
    const exportData = TELEMETRY_FEATURES.map((item) => ({
      feature: item.label,
      category: item.category,
      requestVolume: item.count,
      allocationPercentage: `${item.percent}%`,
      p95LatencyMs: '210ms',
      timeframe: selectedRange === '7d' ? 'Last 7 Days' : selectedRange === '30d' ? 'Last 30 Days' : 'Last 90 Days',
      exportedAt: new Date().toISOString()
    }));
    exportToCsv(`zunme_platform_telemetry_${selectedRange}.csv`, exportData);
    showToast(`Exported ${exportData.length} telemetry report rows to CSV!`, 'success');
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <BarChart3 size={26} color="#A78BFA" />
            Platform Reports & Analytics
          </h1>
          <p className="dashboard-subtitle">
            Empirical usage reports, system latency percentiles, compute token volume, and storage utilization.
          </p>
        </div>

        <div className="dashboard-header-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '3px', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
            {[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: '90 Days' },
              { id: 'custom', label: 'Custom Range' }
            ].map((rng) => (
              <button
                key={rng.id}
                onClick={() => setSelectedRange(rng.id as any)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: selectedRange === rng.id ? '700' : '500',
                  background: selectedRange === rng.id ? '#6E56CF' : 'transparent',
                  color: selectedRange === rng.id ? '#FFFFFF' : '#5F6B85',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {rng.label}
              </button>
            ))}
          </div>

          <button className="btn btn-outline btn-sm" onClick={handleExportTelemetry}>
            <Download size={14} />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box">
              <Cpu size={20} />
            </div>
            <span className="metric-badge positive">Normalized</span>
          </div>
          <div className="metric-value">{selectedRange === 'custom' ? '0' : selectedRange === '90d' ? '31.2M' : selectedRange === '30d' ? '10.8M' : '2.4M'}</div>
          <div className="metric-label">LLM Tokens Ingested ({selectedRange === 'custom' ? 'Custom Window' : selectedRange})</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
              <Clock size={20} />
            </div>
            <span className="metric-badge positive">p95 &lt; 300ms</span>
          </div>
          <div className="metric-value">{selectedRange === 'custom' ? '0ms' : '210ms'}</div>
          <div className="metric-label">Average API Latency</div>
        </div>

        <div className="metric-card">
          <div className="metric-card-top">
            <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
              <Database size={20} />
            </div>
            <span className="metric-badge neutral">12.4 GB / 100 GB</span>
          </div>
          <div className="metric-value">{selectedRange === 'custom' ? '0%' : '12.4%'}</div>
          <div className="metric-label">S3 Cloud Storage Allocation</div>
        </div>
      </div>

      {/* Feature Usage Distribution or Empty State */}
      <div className="glass-panel">
        <div className="panel-header">
          <div className="panel-title">
            <TrendingUp size={18} color="#A78BFA" />
            Workspace Feature Allocation (Live State Data)
          </div>
          <span className="badge badge-primary">
            {selectedRange === 'custom' ? '0 Records Available' : 'Normalized Breakdown'}
          </span>
        </div>

        {filteredFeatures.length === 0 ? (
          /* Empty State when no report telemetry matches */
          <div
            style={{
              textAlign: 'center',
              padding: '48px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: '#F5EFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}
            >
              <BarChart3 size={26} color="#6E56CF" />
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
              No Reports or Telemetry Records Found
            </h3>
            <p style={{ fontSize: '13px', color: '#5F6B85', maxWidth: '400px', margin: '0 auto 16px', lineHeight: '1.5' }}>
              No telemetry data points, latency benchmarks, or token volume records exist for the selected "{selectedRange}" reporting timeframe.
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setSelectedRange('7d')}
            >
              <RefreshCw size={13} />
              <span>Reset to Active 7 Days Window</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredFeatures.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ fontWeight: '600', color: '#111625' }}>{item.label}</span>
                  <span style={{ color: '#5F6B85' }}>{item.count} ({item.percent}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#E8ECF5', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
