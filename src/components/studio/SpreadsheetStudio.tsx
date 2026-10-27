import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Upload,
  BarChart2,
  PieChart,
  TrendingUp,
  Filter,
  Download,
  Copy,
  Sparkles,
  Check,
  RefreshCw,
  Table,
  Layers,
  ArrowUpDown,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './StudioStyles.css';

interface DemoDataset {
  id: string;
  name: string;
  category: string;
  headers: string[];
  rows: (string | number)[][];
  summary: {
    totalRecords: number;
    kpi1: { label: string; value: string };
    kpi2: { label: string; value: string };
    kpi3: { label: string; value: string };
  };
  chartData: { label: string; value: number; color: string }[];
}

const DEMO_DATASETS: DemoDataset[] = [
  {
    id: 'ecommerce_q3',
    name: 'E-Commerce Q3 Multi-Channel Campaign ROI',
    category: 'Marketing & Sales',
    headers: ['Channel', 'Ad Spend ($)', 'Impressions', 'Clicks', 'Conversions', 'ROAS (x)'],
    rows: [
      ['Google Search', 4200, '148,000', 4420, 312, '4.2x'],
      ['Meta / Facebook', 3800, '290,000', 5800, 248, '3.4x'],
      ['Instagram Reels', 2900, '340,000', 7100, 310, '4.6x'],
      ['TikTok Ads', 2400, '410,000', 8900, 290, '3.9x'],
      ['YouTube In-Stream', 3100, '190,000', 3200, 180, '2.8x'],
      ['Amazon Sponsored', 4600, '120,000', 4800, 460, '5.1x']
    ],
    summary: {
      totalRecords: 6,
      kpi1: { label: 'Total Ad Spend', value: '$21,000' },
      kpi2: { label: 'Blended ROAS', value: '4.1x' },
      kpi3: { label: 'Top Channel', value: 'Amazon (5.1x)' }
    },
    chartData: [
      { label: 'Google', value: 4200, color: '#4285F4' },
      { label: 'Meta', value: 3800, color: '#1877F2' },
      { label: 'Instagram', value: 2900, color: '#E1306C' },
      { label: 'TikTok', value: 2400, color: '#00F2FE' },
      { label: 'YouTube', value: 3100, color: '#FF0000' },
      { label: 'Amazon', value: 4600, color: '#FF9900' }
    ]
  },
  {
    id: 'saas_churn',
    name: 'B2B SaaS Cohort Retention & Churn Rate',
    category: 'Product & Analytics',
    headers: ['Cohort Month', 'Starting Users', 'M1 Retention', 'M3 Retention', 'M6 Retention', 'LTV ($)'],
    rows: [
      ['January 2026', 1200, '88.4%', '76.2%', '68.5%', 1420],
      ['February 2026', 1450, '91.2%', '79.0%', '71.4%', 1580],
      ['March 2026', 1600, '89.6%', '81.5%', '74.2%', 1690],
      ['April 2026', 1890, '93.1%', '84.8%', '78.1%', 1840],
      ['May 2026', 2100, '94.5%', '86.2%', '80.0%', 1950]
    ],
    summary: {
      totalRecords: 5,
      kpi1: { label: 'Average M1 Retention', value: '91.4%' },
      kpi2: { label: 'Average Customer LTV', value: '$1,696' },
      kpi3: { label: 'Growth Trend', value: '+75% Cohort Size' }
    },
    chartData: [
      { label: 'Jan', value: 1200, color: '#635BFF' },
      { label: 'Feb', value: 1450, color: '#4F46E5' },
      { label: 'Mar', value: 1600, color: '#4338CA' },
      { label: 'Apr', value: 1890, color: '#3730A3' },
      { label: 'May', value: 2100, color: '#312E81' }
    ]
  }
];

export const SpreadsheetStudio: React.FC = () => {
  const { showToast, saveToLibrary } = useApp();

  const [activeDataset, setActiveDataset] = useState<DemoDataset>(DEMO_DATASETS[0]);
  const [searchFilter, setSearchFilter] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const filteredRows = activeDataset.rows.filter((row) =>
    row.some((cell) => String(cell).toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast(`Parsed ${file.name} successfully (CSV Ingested)`, 'success');
      // For demo, switch to second dataset or simulate parsed data
      setActiveDataset(DEMO_DATASETS[1]);
    }
  };

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setAiReport(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiReport(
        `### Zunme AI Automated Dataset Intelligence Report: ${activeDataset.name}\n\n` +
        `• **High-Yield Channel Performance:** The data reveals that Amazon Sponsored placements yield the highest ROAS at 5.1x, followed closely by Instagram Reels at 4.6x. While TikTok Ads capture the largest impression volume (410k), their click-to-conversion rate requires landing page optimization.\n\n` +
        `• **Optimization Recommendation:** Shift 20% of YouTube In-Stream ad budget ($620) towards Instagram Reels and Amazon Sponsored products. This reallocation will increase projected gross revenue by ~$3,400 with zero additional ad spend.\n\n` +
        `• **Data Hygiene Status:** 100% of rows validated; 0 missing values detected; clean currency format verified.`
      );
      showToast('AI analysis completed!', 'success');
    }, 800);
  };

  const handleSaveReport = () => {
    if (!aiReport) return;
    saveToLibrary({
      title: `Dataset Analysis: ${activeDataset.name}`,
      contentType: 'RESEARCH',
      content: aiReport,
      previewText: aiReport.slice(0, 100),
      tags: ['spreadsheets', 'data-analysis', activeDataset.category.toLowerCase()]
    });
    showToast('Saved analysis to My Library!', 'success');
  };

  return (
    <div className="spreadsheet-studio-container" style={{ padding: '24px 0' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '999px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>
            <FileSpreadsheet size={13} />
            <span>Task 9 — Data &amp; Spreadsheets Studio</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: '0 0 6px 0' }}>
            CSV &amp; Spreadsheet Intelligence Engine
          </h2>
          <p style={{ fontSize: '14px', color: '#4B5563', margin: 0, maxWidth: '720px' }}>
            Upload raw spreadsheets or select a dataset to clean anomalies, inspect KPIs, view interactive charts, and generate executive summaries with Zunme AI.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 16px', background: '#635BFF', color: '#FFFFFF', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 2px 4px rgba(99, 91, 255, 0.2)' }}>
            <Upload size={15} />
            <span>Upload CSV / Excel</span>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Dataset Picker Pill Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>Sample Datasets:</span>
        {DEMO_DATASETS.map((ds) => (
          <button
            key={ds.id}
            type="button"
            onClick={() => {
              setActiveDataset(ds);
              setAiReport(null);
            }}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: activeDataset.id === ds.id ? '2px solid #635BFF' : '1px solid #D1D5DB',
              background: activeDataset.id === ds.id ? 'rgba(99, 91, 255, 0.08)' : '#FFFFFF',
              color: activeDataset.id === ds.id ? '#635BFF' : '#374151',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {ds.name}
          </button>
        ))}
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Active Rows</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>{activeDataset.summary.totalRecords} Records</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>{activeDataset.summary.kpi1.label}</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#635BFF', marginTop: '4px' }}>{activeDataset.summary.kpi1.value}</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>{activeDataset.summary.kpi2.label}</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>{activeDataset.summary.kpi2.value}</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>{activeDataset.summary.kpi3.label}</div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#F59E0B', marginTop: '4px' }}>{activeDataset.summary.kpi3.value}</div>
        </div>
      </div>

      {/* 2-Column Layout: Table View & Visual Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Table Viewer Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', background: '#FAFAFA', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Table size={16} color="#635BFF" />
              <span>Structured Data Table</span>
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={14} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Filter table..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{ padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '12px' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto', maxHeight: '320px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  {activeDataset.headers.map((h, i) => (
                    <th key={i} style={{ padding: '10px 14px', fontWeight: '700', color: '#4B5563', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '9px 14px', color: '#1F2937', whiteSpace: 'nowrap' }}>
                        {cIdx === 0 ? <strong>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Bar Graph Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={16} color="#10B981" />
            <span>Visual Allocation &amp; Volume Metrics</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
            {activeDataset.chartData.map((item, idx) => {
              const maxVal = Math.max(...activeDataset.chartData.map((d) => d.value));
              const pct = (item.value / maxVal) * 100;
              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{item.label}</span>
                    <span style={{ fontWeight: '700', color: item.color }}>${item.value.toLocaleString()}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: '#F3F4F6', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: item.color, borderRadius: '999px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            style={{
              marginTop: '16px',
              padding: '11px 16px',
              background: 'linear-gradient(135deg, #635BFF 0%, #4338CA 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={16} className="spin" />
                <span>Running Statistical AI Synthesis...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Run Zunme AI Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Intelligence Output Report Card */}
      {aiReport && (
        <div style={{ background: '#FFFFFF', border: '1px solid #C7D2FE', borderRadius: '12px', padding: '22px', boxShadow: '0 4px 12px rgba(99, 91, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#4338CA', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#10B981" />
              <span>Automated Intelligence Summary</span>
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(aiReport);
                  showToast('Analysis report copied to clipboard!', 'info');
                }}
                style={{ padding: '6px 12px', background: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Copy size={14} />
                <span>Copy</span>
              </button>
              <button
                type="button"
                onClick={handleSaveReport}
                style={{ padding: '6px 12px', background: '#635BFF', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={14} />
                <span>Save to Library</span>
              </button>
            </div>
          </div>
          <div style={{ fontSize: '13.5px', lineHeight: '1.65', color: '#1F2937', whiteSpace: 'pre-wrap' }}>
            {aiReport}
          </div>
        </div>
      )}
    </div>
  );
};
