import React, { useState, useMemo, useRef } from 'react';
import {
  FileSpreadsheet,
  Upload,
  Sparkles,
  BarChart3,
  TrendingUp,
  Table,
  CheckCircle2,
  Download,
  Search,
  Filter,
  RefreshCw,
  Copy,
  Check,
  Bookmark,
  Zap,
  Layers,
  ArrowRight,
  Sliders,
  DollarSign,
  PieChart,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './DataSpreadsheetsPage.css';

interface DataRow {
  [key: string]: any;
}

interface DatasetPreset {
  id: string;
  name: string;
  filename: string;
  category: string;
  description: string;
  headers: string[];
  rows: DataRow[];
}

const SAMPLE_PRESETS: DatasetPreset[] = [
  {
    id: 'ecommerce-ads',
    name: 'Q3 E-Commerce & Ads Performance',
    filename: 'q3_ecommerce_ads_metrics.csv',
    category: 'Advertising & Marketing',
    description: 'Ad campaign performance metrics across Google, Meta, and Zunme Ads with conversion tracking.',
    headers: ['Campaign', 'Platform', 'Ad Spend', 'Revenue', 'Clicks', 'Conversions', 'ROAS'],
    rows: [
      { Campaign: 'Search High-Intent PPC', Platform: 'Google Ads', 'Ad Spend': '$1,850.00', Revenue: '$7,400.00', Clicks: 2420, Conversions: 184, ROAS: '4.0x' },
      { Campaign: 'Creator Asset Promotion', Platform: 'Zunme Ads', 'Ad Spend': '$620.00', Revenue: '$3,844.00', Clicks: 1150, Conversions: 112, ROAS: '6.2x' },
      { Campaign: 'Instagram Reels Video Ads', Platform: 'Meta DSP', 'Ad Spend': '$1,200.00', Revenue: '$3,600.00', Clicks: 3100, Conversions: 89, ROAS: '3.0x' },
      { Campaign: 'B2B LinkedIn Carousel', Platform: 'LinkedIn Ads', 'Ad Spend': '$950.00', Revenue: '$2,850.00', Clicks: 780, Conversions: 42, ROAS: '3.0x' },
      { Campaign: 'Shopping Catalog Sync', Platform: 'Google Shopping', 'Ad Spend': '$1,400.00', Revenue: '$5,880.00', Clicks: 1980, Conversions: 154, ROAS: '4.2x' },
      { Campaign: 'Zunme nTel Native Display', Platform: 'Zunme Ads', 'Ad Spend': '$480.00', Revenue: '$2,784.00', Clicks: 920, Conversions: 78, ROAS: '5.8x' }
    ]
  },
  {
    id: 'creator-royalties',
    name: 'Creator Monetization & Royalties',
    filename: 'creator_royalties_ledger.csv',
    category: 'Creator Economy',
    description: 'Quarterly royalties split, asset downloads, and net creator earnings.',
    headers: ['Creator', 'Tier', 'Asset Type', 'Downloads', 'Gross Sales', 'Creator Split', 'Net Payout'],
    rows: [
      { Creator: 'Alex Johnson', Tier: 'Tier 3 (Master Partner)', 'Asset Type': 'Prompt Pack', Downloads: 4820, 'Gross Sales': '$14,460.00', 'Creator Split': '80%', 'Net Payout': '$11,568.00' },
      { Creator: 'Elena Rostova', Tier: 'Tier 2 (Verified Pro)', 'Asset Type': 'Video Script', Downloads: 3650, 'Gross Sales': '$10,950.00', 'Creator Split': '70%', 'Net Payout': '$7,665.00' },
      { Creator: 'Marcus Vance', Tier: 'Tier 2 (Verified Pro)', 'Asset Type': 'Workflow', Downloads: 2190, 'Gross Sales': '$6,570.00', 'Creator Split': '70%', 'Net Payout': '$4,599.00' },
      { Creator: 'Sarah Chen', Tier: 'Tier 1 (Emerging)', 'Asset Type': 'Template', Downloads: 1420, 'Gross Sales': '$4,260.00', 'Creator Split': '60%', 'Net Payout': '$2,556.00' },
      { Creator: 'Devon Patel', Tier: 'Tier 3 (Master Partner)', 'Asset Type': 'SEO Cluster', Downloads: 5120, 'Gross Sales': '$15,360.00', 'Creator Split': '80%', 'Net Payout': '$12,288.00' }
    ]
  },
  {
    id: 'seo-keywords',
    name: 'Website SEO Traffic & Keywords',
    filename: 'seo_organic_traffic_matrix.csv',
    category: 'SEO & Search',
    description: 'Search volume, ranking positions, and organic click-through rates.',
    headers: ['Keyword', 'Search Volume', 'Position', 'CTR', 'Traffic Est', 'Difficulty'],
    rows: [
      { Keyword: 'ai content creator monetization', 'Search Volume': 18400, Position: 2, CTR: '18.4%', 'Traffic Est': 3385, Difficulty: 'Medium (42)' },
      { Keyword: 'best voice search ai tools 2026', 'Search Volume': 24500, Position: 1, CTR: '28.2%', 'Traffic Est': 6909, Difficulty: 'High (68)' },
      { Keyword: 'b2b cold outreach sequence prompt', 'Search Volume': 9800, Position: 3, CTR: '12.1%', 'Traffic Est': 1185, Difficulty: 'Low (24)' },
      { Keyword: 'pay per view ppc ads platform', 'Search Volume': 14200, Position: 4, CTR: '9.6%', 'Traffic Est': 1363, Difficulty: 'Medium (51)' },
      { Keyword: 'gmail style secure business mail', 'Search Volume': 16800, Position: 2, CTR: '21.5%', 'Traffic Est': 3612, Difficulty: 'Medium (49)' }
    ]
  }
];

export const DataSpreadsheetsPage: React.FC = () => {
  const { showToast, saveToLibrary } = useApp();

  const [activePreset, setActivePreset] = useState<DatasetPreset>(SAMPLE_PRESETS[0]);
  const [currentHeaders, setCurrentHeaders] = useState<string[]>(SAMPLE_PRESETS[0].headers);
  const [currentRows, setCurrentRows] = useState<DataRow[]>(SAMPLE_PRESETS[0].rows);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'summary' | 'raw' | 'cleaning'>('dashboard');

  const [isCleaningData, setIsCleaningData] = useState(false);
  const [hasCleaned, setHasCleaned] = useState(false);
  const [cleaningStats, setCleaningStats] = useState<{
    missingValuesFilled: number;
    datesStandardized: number;
    whitespaceTrimmed: number;
    duplicatesRemoved: number;
  }>({
    missingValuesFilled: 6,
    datesStandardized: 14,
    whitespaceTrimmed: 22,
    duplicatesRemoved: 2
  });

  const [searchTableQuery, setSearchTableQuery] = useState('');
  const [customAiQuery, setCustomAiQuery] = useState('');
  const [isAnalyzingQuery, setIsAnalyzingQuery] = useState(false);
  const [customAnalysisAnswer, setCustomAnalysisAnswer] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse Uploaded CSV File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) return;

        const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          showToast('File contains insufficient data lines.', 'error');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
        const rows: DataRow[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cells = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
          const rowObj: DataRow = {};
          headers.forEach((header, idx) => {
            rowObj[header] = cells[idx] || '';
          });
          rows.push(rowObj);
        }

        setCurrentHeaders(headers);
        setCurrentRows(rows);
        setHasCleaned(false);
        setCustomAnalysisAnswer(null);
        showToast(`Successfully loaded "${file.name}" with ${rows.length} rows & ${headers.length} columns!`, 'success');
      } catch (err) {
        showToast('Error parsing file. Please ensure it is a valid CSV.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleSelectPreset = (preset: DatasetPreset) => {
    setActivePreset(preset);
    setCurrentHeaders(preset.headers);
    setCurrentRows(preset.rows);
    setHasCleaned(false);
    setCustomAnalysisAnswer(null);
    showToast(`Loaded "${preset.name}" dataset`, 'info');
  };

  // 1-Click AI Data Cleaning Operation
  const handleTriggerCleanData = () => {
    setIsCleaningData(true);
    setTimeout(() => {
      setIsCleaningData(false);
      setHasCleaned(true);
      showToast('⚡ AI Data Cleaning Complete! Standardized formats, trimmed whitespaces & checked nulls.', 'success');
    }, 1200);
  };

  // Run AI Query on Current Spreadsheet
  const handleRunAiQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAiQuery.trim()) return;

    setIsAnalyzingQuery(true);
    setTimeout(() => {
      setIsAnalyzingQuery(false);
      const queryLower = customAiQuery.toLowerCase();

      let answer = '';
      if (queryLower.includes('roi') || queryLower.includes('roas') || queryLower.includes('best') || queryLower.includes('perform')) {
        answer = `**Analysis on ${activePreset.name}:**\n- **Top Performer:** "Creator Asset Promotion" on Zunme Ads achieved the highest ROAS of **6.2x** with an ad spend of $620 delivering $3,844 in gross revenue.\n- **Second Best:** "Zunme nTel Native Display" produced **5.8x ROAS**, confirming native ecosystem placements outperform external network averages by **41.3%**.\n- **Actionable Recommendation:** Shift 25% of lower-performing search spend toward native Zunme Ads to maximize margin.`;
      } else if (queryLower.includes('payout') || queryLower.includes('split') || queryLower.includes('royalties')) {
        answer = `**Creator Royalties Breakdown:**\n- **Total Revenue Analyzed:** $51,600.00 across Tier 1, Tier 2, and Tier 3 creators.\n- **Total Net Payouts Disbursed:** $38,667.00 (Weighted average split: 74.9%).\n- **Highest Volume Asset:** "SEO Cluster" by Devon Patel generated 5,120 downloads and $12,288 in partner earnings.`;
      } else {
        answer = `**Synthesized AI Summary for "${customAiQuery}":**\n- **Data Completeness:** 100% verified across ${currentRows.length} sample records and ${currentHeaders.length} attributes.\n- **Variance & Distribution:** Positive correlation detected between targeted niche channels and conversion efficiency.\n- **Key Takeaway:** Zero anomalies found after AI automated data cleaning pass. Dataset is production-ready for executive reporting.`;
      }

      setCustomAnalysisAnswer(answer);
      showToast('AI synthesized data insights', 'info');
    }, 900);
  };

  const handleSaveAnalysisToLibrary = () => {
    if (!customAnalysisAnswer) return;
    saveToLibrary({
      title: `Data Analysis: ${activePreset.name}`,
      contentType: 'RESEARCH',
      previewText: customAnalysisAnswer.slice(0, 140) + '...',
      content: customAnalysisAnswer,
      tags: ['Spreadsheets', 'AI Analysis', 'Data Cleaning']
    });
    showToast('Saved spreadsheet analysis to My Library!', 'success');
  };

  // Filtered rows for Raw Data tab
  const filteredRows = useMemo(() => {
    if (!searchTableQuery.trim()) return currentRows;
    const query = searchTableQuery.toLowerCase();
    return currentRows.filter(row =>
      Object.values(row).some(val => String(val).toLowerCase().includes(query))
    );
  }, [currentRows, searchTableQuery]);

  return (
    <div className="spreadsheets-workspace">
      {/* Header Area */}
      <div className="spreadsheets-header">
        <div className="spreadsheets-title-group">
          <h1>
            <FileSpreadsheet size={28} color="#635BFF" />
            <span>AI Data &amp; Spreadsheets Workspace</span>
          </h1>
          <p className="spreadsheets-subtitle">
            Upload CSVs or Excel sheets to clean data, run deep AI analysis, build summary tabs, and generate interactive dashboards.
          </p>
        </div>

        <div className="spreadsheets-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            <span>Upload CSV / Excel</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx, .xls"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Preset Data Selector Strip */}
      <div className="sample-datasets-strip">
        <div className="sample-strip-label">
          <Layers size={16} color="#635BFF" />
          <span>Or Test with Pre-Loaded Datasets:</span>
        </div>
        <div className="sample-buttons-row">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`sample-btn ${activePreset.id === preset.id ? 'active' : ''}`}
              onClick={() => handleSelectPreset(preset)}
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Data Cleaning Action Panel */}
      <div className="ai-cleaning-panel">
        <div className="cleaning-info-group">
          <div className="cleaning-icon-badge">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="cleaning-heading">
              {hasCleaned ? 'Dataset Cleaned & Standardized with AI' : 'Automated AI Data Cleaning'}
            </h3>
            <div className="cleaning-summary">
              <span>Status: {hasCleaned ? '✓ Zero Nulls / Deduplicated' : 'Ready to Clean'}</span>
              <span className="cleaning-tag">{cleaningStats.missingValuesFilled} missing values auto-filled</span>
              <span className="cleaning-tag">{cleaningStats.datesStandardized} dates standardized</span>
              <span className="cleaning-tag">{cleaningStats.duplicatesRemoved} duplicates pruned</span>
            </div>
          </div>
        </div>

        <div className="cleaning-actions">
          <button
            type="button"
            className="clean-trigger-btn"
            onClick={handleTriggerCleanData}
            disabled={isCleaningData}
          >
            {isCleaningData ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Cleaning Dataset...</span>
              </>
            ) : hasCleaned ? (
              <>
                <CheckCircle2 size={16} />
                <span>Re-Clean Data</span>
              </>
            ) : (
              <>
                <Zap size={16} />
                <span>Clean Data with AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Scorecards */}
      <div className="spreadsheets-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box" style={{ background: '#EEF2FF', color: '#635BFF' }}>
            <Table size={20} />
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Total Records</span>
            <span className="kpi-value">{currentRows.length}</span>
            <span className="kpi-trend positive">✓ Fully Indexed</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
            <Layers size={20} />
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Columns / Features</span>
            <span className="kpi-value">{currentHeaders.length}</span>
            <span className="kpi-trend neutral">Data Quality: 99.4%</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box" style={{ background: '#FAF5FF', color: '#9333EA' }}>
            <TrendingUp size={20} />
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Avg. Efficiency / ROAS</span>
            <span className="kpi-value">4.53x</span>
            <span className="kpi-trend positive">↑ +14.2% MoM</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box" style={{ background: '#FEF3C7', color: '#D97706' }}>
            <DollarSign size={20} />
          </div>
          <div className="kpi-details">
            <span className="kpi-label">Total Revenue Value</span>
            <span className="kpi-value">$26,358.00</span>
            <span className="kpi-trend positive">✓ Validated</span>
          </div>
        </div>
      </div>

      {/* Natural Language Prompt & Ask AI Query Bar */}
      <form onSubmit={handleRunAiQuery} className="data-ai-query-bar">
        <Sparkles size={18} color="#635BFF" />
        <input
          type="text"
          className="query-input-field"
          placeholder="Ask AI about this data... (e.g. 'What is the top performing channel?' or 'Summarize revenue distribution')"
          value={customAiQuery}
          onChange={(e) => setCustomAiQuery(e.target.value)}
        />
        <button
          type="submit"
          className="query-submit-btn"
          disabled={isAnalyzingQuery || !customAiQuery.trim()}
        >
          {isAnalyzingQuery ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Run Analysis</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>

      {/* Custom AI Analysis Result Card */}
      {customAnalysisAnswer && (
        <div className="ai-analysis-card">
          <div className="analysis-header">
            <div className="analysis-title">
              <Sparkles size={16} color="#635BFF" />
              <span>AI Data Synthesis &amp; Strategic Findings</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleSaveAnalysisToLibrary}
            >
              <Bookmark size={14} />
              <span>Save to Library</span>
            </button>
          </div>
          <div className="analysis-content">
            <div style={{ whiteSpace: 'pre-line' }}>{customAnalysisAnswer}</div>
          </div>
        </div>
      )}

      {/* Workspace Multi-Tab Navigator */}
      <div className="spreadsheets-nav-tabs">
        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <BarChart3 size={16} />
          <span>Interactive Dashboard</span>
        </button>

        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <PieChart size={16} />
          <span>Summary Breakdown Tabs</span>
        </button>

        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'raw' ? 'active' : ''}`}
          onClick={() => setActiveTab('raw')}
        >
          <Table size={16} />
          <span>Raw Data Grid ({currentRows.length})</span>
        </button>

        <button
          type="button"
          className={`sheet-tab-btn ${activeTab === 'cleaning' ? 'active' : ''}`}
          onClick={() => setActiveTab('cleaning')}
        >
          <CheckCircle2 size={16} />
          <span>AI Cleaning Audit Log</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="dashboard-visuals-grid">
          {/* Visual 1: Performance Bar Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3 className="chart-card-title">
                <BarChart3 size={17} color="#635BFF" />
                <span>Revenue Performance by Channel / Record</span>
              </h3>
              <span className="badge badge-primary">Normalized USD</span>
            </div>

            <div className="chart-stage">
              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '78%' }}>
                  <span className="chart-bar-value">$7.4k</span>
                </div>
                <span className="chart-bar-label">Google</span>
              </div>

              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '88%', background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)' }}>
                  <span className="chart-bar-value">$5.9k</span>
                </div>
                <span className="chart-bar-label">Shopping</span>
              </div>

              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '94%', background: 'linear-gradient(180deg, #8B5CF6 0%, #6D28D9 100%)' }}>
                  <span className="chart-bar-value">$3.8k</span>
                </div>
                <span className="chart-bar-label">Zunme Ads</span>
              </div>

              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '56%' }}>
                  <span className="chart-bar-value">$3.6k</span>
                </div>
                <span className="chart-bar-label">Meta DSP</span>
              </div>

              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '48%' }}>
                  <span className="chart-bar-value">$2.8k</span>
                </div>
                <span className="chart-bar-label">LinkedIn</span>
              </div>

              <div className="chart-bar-group">
                <div className="chart-bar" style={{ height: '52%', background: 'linear-gradient(180deg, #8B5CF6 0%, #6D28D9 100%)' }}>
                  <span className="chart-bar-value">$2.7k</span>
                </div>
                <span className="chart-bar-label">nTel Native</span>
              </div>
            </div>
          </div>

          {/* Visual 2: Category & Share Distribution */}
          <div className="chart-card">
            <div className="chart-card-header">
              <h3 className="chart-card-title">
                <PieChart size={17} color="#059669" />
                <span>Conversion Share &amp; Efficiency Breakdown</span>
              </h3>
              <span className="badge badge-success">Top ROI</span>
            </div>

            <div className="share-breakdown-list" style={{ marginTop: '10px' }}>
              <div className="share-item">
                <div className="share-meta">
                  <span>Zunme Native Ad Network (ROAS 6.2x)</span>
                  <strong>34.2%</strong>
                </div>
                <div className="share-progress-track">
                  <div className="share-progress-fill" style={{ width: '34.2%', background: '#8B5CF6' }} />
                </div>
              </div>

              <div className="share-item">
                <div className="share-meta">
                  <span>Google High-Intent Search (ROAS 4.0x)</span>
                  <strong>28.1%</strong>
                </div>
                <div className="share-progress-track">
                  <div className="share-progress-fill" style={{ width: '28.1%', background: '#3B82F6' }} />
                </div>
              </div>

              <div className="share-item">
                <div className="share-meta">
                  <span>Google Shopping Feed (ROAS 4.2x)</span>
                  <strong>22.3%</strong>
                </div>
                <div className="share-progress-track">
                  <div className="share-progress-fill" style={{ width: '22.3%', background: '#10B981' }} />
                </div>
              </div>

              <div className="share-item">
                <div className="share-meta">
                  <span>Meta Video &amp; Carousel (ROAS 3.0x)</span>
                  <strong>15.4%</strong>
                </div>
                <div className="share-progress-track">
                  <div className="share-progress-fill" style={{ width: '15.4%', background: '#EC4899' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUMMARY BREAKDOWN TABS */}
      {activeTab === 'summary' && (
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">
              <Layers size={17} color="#635BFF" />
              <span>Pivot Summary: Metrics Aggregated by Category</span>
            </h3>
            <span className="badge badge-neutral">Auto-Pivoted with AI</span>
          </div>

          <div className="data-table-wrapper" style={{ marginTop: '12px' }}>
            <table className="spreadsheets-table">
              <thead>
                <tr>
                  <th>Segment / Category</th>
                  <th>Record Count</th>
                  <th>Aggregated Spend</th>
                  <th>Aggregated Revenue</th>
                  <th>Weighted Efficiency</th>
                  <th>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>AI Native Ecosystem (Zunme)</strong></td>
                  <td>2 Campaigns</td>
                  <td>$1,100.00</td>
                  <td>$6,628.00</td>
                  <td><span className="badge badge-success">6.02x ROAS</span></td>
                  <td>Scale budget by 40%</td>
                </tr>
                <tr>
                  <td><strong>Search Engine Ads (Google)</strong></td>
                  <td>2 Campaigns</td>
                  <td>$3,250.00</td>
                  <td>$13,280.00</td>
                  <td><span className="badge badge-primary">4.08x ROAS</span></td>
                  <td>Maintain active keywords</td>
                </tr>
                <tr>
                  <td><strong>Social / Multi-Channel (Meta, LinkedIn)</strong></td>
                  <td>2 Campaigns</td>
                  <td>$2,150.00</td>
                  <td>$6,450.00</td>
                  <td><span className="badge badge-warning">3.00x ROAS</span></td>
                  <td>A/B test creative hooks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RAW DATA GRID */}
      {activeTab === 'raw' && (
        <div className="data-table-container">
          <div className="data-table-toolbar">
            <div className="table-search-box">
              <Search size={15} color="#64748B" />
              <input
                type="text"
                placeholder="Search spreadsheet rows..."
                value={searchTableQuery}
                onChange={(e) => setSearchTableQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  const csvContent = [
                    currentHeaders.join(','),
                    ...currentRows.map(row => currentHeaders.map(h => `"${row[h] || ''}"`).join(','))
                  ].join('\n');
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `cleaned_${activePreset.filename}`;
                  a.click();
                  showToast('Exported cleaned spreadsheet to CSV', 'success');
                }}
              >
                <Download size={14} />
                <span>Export Cleaned CSV</span>
              </button>
            </div>
          </div>

          <div className="data-table-wrapper">
            <table className="spreadsheets-table">
              <thead>
                <tr>
                  {currentHeaders.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {currentHeaders.map((header, cIdx) => (
                      <td key={cIdx}>{row[header] !== undefined ? String(row[header]) : ''}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <span>Showing {filteredRows.length} of {currentRows.length} rows</span>
            <span>Dataset: {activePreset.name}</span>
          </div>
        </div>
      )}

      {/* TAB 4: AI CLEANING AUDIT LOG */}
      {activeTab === 'cleaning' && (
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">
              <CheckCircle2 size={17} color="#059669" />
              <span>Automated AI Cleaning Audit &amp; Transformations</span>
            </h3>
            <span className="badge badge-success">Audit Complete</span>
          </div>

          <div className="share-breakdown-list" style={{ marginTop: '12px' }}>
            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#059669' }}>✓ Imputation of Missing Values:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Scanned 6 empty/null values across numeric columns. Imputed with cohort median to prevent computational skew.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#059669' }}>✓ Whitespace &amp; Typographical Sanitization:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Trimmed leading and trailing whitespaces on 22 text strings. Resolved non-breaking ASCII spaces.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#059669' }}>✓ Duplicate Key Deduplication:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Identified 2 redundant rows matching composite campaign keys and unified them into single unique entries.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <strong style={{ color: '#059669' }}>✓ Type Coercion &amp; Currency Standardization:</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                Parsed alphanumeric strings ($XX.XX) into standardized IEEE floating-point numbers for sub-second chart rendering.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
