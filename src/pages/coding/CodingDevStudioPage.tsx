import React, { useState } from 'react';
import {
  Code,
  GitCommit,
  GitPullRequest,
  Sparkles,
  Bug,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Copy,
  Check,
  Bookmark,
  RefreshCw,
  Zap,
  Play,
  ArrowRight,
  Terminal,
  FileCode,
  Layers,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './CodingDevStudioPage.css';

interface DiffLine {
  type: 'addition' | 'deletion' | 'context';
  oldLine?: number;
  newLine?: number;
  content: string;
}

interface GitDiffSample {
  id: string;
  title: string;
  filename: string;
  description: string;
  stats: { additions: number; deletions: number };
  aiReview: {
    verdict: 'Approved' | 'Needs Attention';
    securityScore: string;
    performanceGain: string;
    summary: string;
    points: string[];
  };
  lines: DiffLine[];
}

const SAMPLE_DIFFS: GitDiffSample[] = [
  {
    id: 'diff-memo',
    title: 'React Performance: Component Memoization & Hook Optimization',
    filename: 'src/components/analytics/MetricsGrid.tsx',
    description: 'Prevents unnecessary re-renders during high-frequency telemetry updates by wrapping components with useMemo and React.memo.',
    stats: { additions: 9, deletions: 4 },
    aiReview: {
      verdict: 'Approved',
      securityScore: '100% Safe (No injection vectors)',
      performanceGain: '+38% Render Speedup',
      summary: 'High-quality refactor eliminating cascading child re-renders.',
      points: [
        'useMemo correctly caches calculated metric averages across pagination shifts.',
        'Extracted callback handlers with useCallback to maintain reference equality.',
        'Zero breaking changes to parent container component props.'
      ]
    },
    lines: [
      { type: 'context', oldLine: 24, newLine: 24, content: 'export const MetricsGrid: React.FC<MetricsGridProps> = ({ rawMetrics, onRefresh }) => {' },
      { type: 'deletion', oldLine: 25, content: '-  const computedStats = calculateHeavyAggregates(rawMetrics);' },
      { type: 'deletion', oldLine: 26, content: '-  const sortedList = rawMetrics.sort((a, b) => b.value - a.value);' },
      { type: 'addition', newLine: 25, content: '+  // Zunme AI Optimization: Memoize computational passes' },
      { type: 'addition', newLine: 26, content: '+  const computedStats = useMemo(() => {' },
      { type: 'addition', newLine: 27, content: '+    return calculateHeavyAggregates(rawMetrics);' },
      { type: 'addition', newLine: 28, content: '+  }, [rawMetrics]);' },
      { type: 'addition', newLine: 29, content: '+' },
      { type: 'addition', newLine: 30, content: '+  const sortedList = useMemo(() => {' },
      { type: 'addition', newLine: 31, content: '+    return [...rawMetrics].sort((a, b) => b.value - a.value);' },
      { type: 'addition', newLine: 32, content: '+  }, [rawMetrics]);' },
      { type: 'context', oldLine: 27, newLine: 33, content: '  return (' },
      { type: 'context', oldLine: 28, newLine: 34, content: '    <div className="metrics-container">' },
      { type: 'deletion', oldLine: 29, content: '-      <MetricChart data={sortedList} stats={computedStats} />' },
      { type: 'addition', newLine: 35, content: '+      <MemoizedMetricChart data={sortedList} stats={computedStats} />' },
      { type: 'context', oldLine: 30, newLine: 36, content: '    </div>' },
      { type: 'context', oldLine: 31, newLine: 37, content: '  );' }
    ]
  },
  {
    id: 'diff-auth-security',
    title: 'Security Patch: Rate Limiting & JWT Constant-Time Verification',
    filename: 'src/middleware/authGuard.ts',
    description: 'Mitigates timing attacks and enforces client IP request quotas to prevent brute-force attacks.',
    stats: { additions: 8, deletions: 3 },
    aiReview: {
      verdict: 'Approved',
      securityScore: 'Hardened (OWASP Top 10 Compliant)',
      performanceGain: 'Sub-millisecond constant time lookup',
      summary: 'Critical security fix replacing standard string comparison with crypto.timingSafeEqual.',
      points: [
        'Eliminates side-channel timing discrepancy during HMAC token signature verification.',
        'In-memory token bucket enforces 60 requests/minute per client IP.',
        'Provides RFC 7807 compliant error schemas when threshold is breached.'
      ]
    },
    lines: [
      { type: 'context', oldLine: 12, newLine: 12, content: 'export async function verifyApiAuth(req: Request, res: Response, next: NextFunction) {' },
      { type: 'context', oldLine: 13, newLine: 13, content: '  const token = req.headers["authorization"]?.split(" ")[1];' },
      { type: 'deletion', oldLine: 14, content: '-  if (token !== process.env.API_SECRET_KEY) {' },
      { type: 'deletion', oldLine: 15, content: '-    return res.status(401).json({ error: "Invalid credential" });' },
      { type: 'deletion', oldLine: 16, content: '-  }' },
      { type: 'addition', newLine: 14, content: '+  // Constant-time signature comparison to eliminate timing attacks' },
      { type: 'addition', newLine: 15, content: '+  const expectedBuffer = Buffer.from(process.env.API_SECRET_KEY || "");' },
      { type: 'addition', newLine: 16, content: '+  const givenBuffer = Buffer.from(token || "");' },
      { type: 'addition', newLine: 17, content: '+  if (expectedBuffer.length !== givenBuffer.length || !crypto.timingSafeEqual(expectedBuffer, givenBuffer)) {' },
      { type: 'addition', newLine: 18, content: '+    return res.status(401).json({ code: "UNAUTHORIZED", message: "Invalid cryptographic credentials" });' },
      { type: 'addition', newLine: 19, content: '+  }' },
      { type: 'addition', newLine: 20, content: '+  await applyClientIpRateLimit(req.ip);' },
      { type: 'context', oldLine: 17, newLine: 21, content: '  next();' }
    ]
  }
];

export const CodingDevStudioPage: React.FC = () => {
  const { showToast, saveToLibrary } = useApp();

  const [activeTab, setActiveTab] = useState<'diff' | 'codex' | 'debugger'>('diff');
  const [selectedDiff, setSelectedDiff] = useState<GitDiffSample>(SAMPLE_DIFFS[0]);

  // Tab 2: Codex Script Generator
  const [scriptLanguage, setScriptLanguage] = useState('TypeScript');
  const [scriptPrompt, setScriptPrompt] = useState('Create an Express rate-limiting middleware using a sliding window counter with Redis.');
  const [generatedScript, setGeneratedScript] = useState(`import { Request, Response, NextFunction } from 'express';\n\ninterface RateLimitOptions {\n  windowMs: number;\n  maxRequests: number;\n}\n\nexport const createSlidingWindowLimiter = (options: RateLimitOptions) => {\n  const ipHitsMap = new Map<string, number[]>();\n\n  return (req: Request, res: Response, next: NextFunction) => {\n    const ip = req.ip || '127.0.0.1';\n    const now = Date.now();\n    const windowStart = now - options.windowMs;\n\n    const timestamps = (ipHitsMap.get(ip) || []).filter(t => t > windowStart);\n\n    if (timestamps.length >= options.maxRequests) {\n      return res.status(429).json({\n        error: 'Too Many Requests',\n        retryAfterSeconds: Math.ceil(options.windowMs / 1000)\n      });\n    }\n\n    timestamps.push(now);\n    ipHitsMap.set(ip, timestamps);\n    next();\n  };\n};`);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  // Tab 3: Error Debugger
  const [errorInput, setErrorInput] = useState(`TypeError: Cannot read properties of undefined (reading 'map')\n  at MetricsDashboard.tsx:42:28\n  at renderWithHooks (react-dom.development.js:14985:18)`);
  const [debugResult, setDebugResult] = useState<{
    rootCause: string;
    explanation: string;
    fixedCode: string;
  } | null>({
    rootCause: 'Uninitialized Asynchronous Array State',
    explanation: 'The component attempted to invoke .map() on `metricsData` before the network fetch completed, causing an initial render with undefined.',
    fixedCode: `// Fixed: Apply optional chaining and fallback empty array\n{metricsData?.map((item) => (\n  <MetricCard key={item.id} title={item.name} value={item.value} />\n)) ?? (\n  <div className="skeleton-loader">Loading telemetry...</div>\n)}`
  });
  const [isDebugging, setIsDebugging] = useState(false);

  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    showToast('Copied code to clipboard', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptPrompt.trim()) return;

    setIsGeneratingScript(true);
    setTimeout(() => {
      setIsGeneratingScript(false);
      if (scriptPrompt.toLowerCase().includes('python') || scriptLanguage === 'Python') {
        setGeneratedScript(`import time\nimport requests\nfrom typing import Dict, Any\n\ndef fetch_with_exponential_backoff(url: str, max_retries: int = 4) -> Dict[str, Any]:\n    delay = 1.0\n    for attempt in range(max_retries):\n        try:\n            response = requests.get(url, timeout=5.0)\n            if response.status_code == 200:\n                return response.json()\n        except requests.RequestException as e:\n            print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay}s...")\n            time.sleep(delay)\n            delay *= 2.0\n    raise TimeoutError("Maximum retry threshold exceeded.")`);
      } else {
        setGeneratedScript(`// Generated: ${scriptPrompt}\nexport const handleOptimizedPipeline = async <T>(data: T[]): Promise<{ count: number; status: string }> => {\n  const filtered = data.filter(Boolean);\n  // Batch processing with sub-second execution\n  return {\n    count: filtered.length,\n    status: 'COMPLETED_SUCCESSFULLY'\n  };\n};`);
      }
      showToast('AI synthesized clean production script', 'success');
    }, 1000);
  };

  const handleDiagnoseError = () => {
    if (!errorInput.trim()) return;
    setIsDebugging(true);

    setTimeout(() => {
      setIsDebugging(false);
      setDebugResult({
        rootCause: 'Runtime Exception / Null Pointer Dereference',
        explanation: 'Variable is accessed prior to evaluation or missing boundary checks. Guarding with nullish coalescing or optional chaining resolves this immediately.',
        fixedCode: `// Fixed implementation with defensive checks:\nconst safeValue = targetObject?.property ?? 'default_fallback';\nif (Array.isArray(safeValue)) {\n  safeValue.forEach(processItem);\n}`
      });
      showToast('AI Root Cause Diagnosis complete', 'success');
    }, 900);
  };

  const handleSaveToLibrary = () => {
    saveToLibrary({
      title: `Code Blueprint: ${selectedDiff.title}`,
      contentType: 'RESEARCH',
      previewText: `Git Diff Review for ${selectedDiff.filename} (+${selectedDiff.stats.additions} -${selectedDiff.stats.deletions})`,
      content: selectedDiff.lines.map(l => l.content).join('\n'),
      tags: ['Coding', 'Git Diff', 'Engineering']
    });
    showToast('Saved Code Blueprint to My Library!', 'success');
  };

  return (
    <div className="coding-studio-workspace">
      {/* Header Area */}
      <div className="coding-header">
        <div className="coding-title-group">
          <h1>
            <Code size={28} color="#635BFF" />
            <span>Coding &amp; Git Diff Studio</span>
          </h1>
          <p className="coding-subtitle">
            Write scripts with AI Codex workflows, debug runtime errors, and review side-by-side Git diffs with automated security and performance audits.
          </p>
        </div>

        <div className="coding-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSaveToLibrary}
          >
            <Bookmark size={16} />
            <span>Save to Library</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigator */}
      <div className="coding-nav-tabs">
        <button
          type="button"
          className={`coding-tab-btn ${activeTab === 'diff' ? 'active' : ''}`}
          onClick={() => setActiveTab('diff')}
        >
          <GitPullRequest size={16} />
          <span>Review Git Diffs</span>
        </button>

        <button
          type="button"
          className={`coding-tab-btn ${activeTab === 'codex' ? 'active' : ''}`}
          onClick={() => setActiveTab('codex')}
        >
          <Terminal size={16} />
          <span>Write Scripts &amp; Codex</span>
        </button>

        <button
          type="button"
          className={`coding-tab-btn ${activeTab === 'debugger' ? 'active' : ''}`}
          onClick={() => setActiveTab('debugger')}
        >
          <Bug size={16} />
          <span>Debug Errors &amp; Fixer</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: REVIEW GIT DIFFS
          ========================================================================= */}
      {activeTab === 'diff' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="diff-viewer-card">
            <div className="diff-toolbar">
              <div className="diff-sample-chips">
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B' }}>Sample Diffs:</span>
                {SAMPLE_DIFFS.map(diff => (
                  <button
                    key={diff.id}
                    type="button"
                    className={`diff-chip ${selectedDiff.id === diff.id ? 'active' : ''}`}
                    onClick={() => setSelectedDiff(diff)}
                  >
                    <span>{diff.title.slice(0, 36)}...</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="badge badge-success">+{selectedDiff.stats.additions}</span>
                <span className="badge badge-danger">-{selectedDiff.stats.deletions}</span>
              </div>
            </div>

            <div className="diff-summary-banner">
              <div className="flex items-center gap-2">
                <FileCode size={16} />
                <strong>File: {selectedDiff.filename}</strong>
              </div>
              <span>{selectedDiff.description}</span>
            </div>

            {/* Line-by-Line Diff Code Table */}
            <div className="diff-table-container">
              <table className="diff-table">
                <tbody>
                  {selectedDiff.lines.map((line, idx) => (
                    <tr key={idx} className={`diff-line-row ${line.type}`}>
                      <td className="diff-line-num">{line.oldLine || ''}</td>
                      <td className="diff-line-num">{line.newLine || ''}</td>
                      <td className="diff-line-content">{line.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Code Review & Audit Report Card */}
          <div className="ai-review-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div className="flex items-center gap-2">
                <Sparkles size={18} color="#635BFF" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>
                  AI Automated Code Review Audit
                </h3>
              </div>
              <div className="review-badge-row">
                <span className="review-badge" style={{ background: '#ECFDF5', color: '#065F46' }}>
                  <ShieldCheck size={14} />
                  <span>{selectedDiff.aiReview.securityScore}</span>
                </span>
                <span className="review-badge" style={{ background: '#FAF5FF', color: '#7E22CE' }}>
                  <Zap size={14} />
                  <span>{selectedDiff.aiReview.performanceGain}</span>
                </span>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', fontWeight: '500' }}>
              {selectedDiff.aiReview.summary}
            </p>

            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#64748B', lineHeight: '1.6' }}>
              {selectedDiff.aiReview.points.map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: WRITE SCRIPTS & CODEX WORKFLOW
          ========================================================================= */}
      {activeTab === 'codex' && (
        <div className="codex-layout">
          <form onSubmit={handleGenerateScript} className="codex-prompt-card">
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>
                Codex Script Architect
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                Describe what programming task or script you need to build.
              </p>
            </div>

            <div>
              <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Target Language / Environment
              </label>
              <select
                value={scriptLanguage}
                onChange={(e) => setScriptLanguage(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              >
                <option value="TypeScript">TypeScript (Node / React)</option>
                <option value="Python">Python (Data / Automation)</option>
                <option value="JavaScript">JavaScript (ESNext)</option>
                <option value="SQL">SQL (PostgreSQL / MySQL)</option>
                <option value="Bash">Bash / Shell Script</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '12.5px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Prompt / Specifications
              </label>
              <textarea
                value={scriptPrompt}
                onChange={(e) => setScriptPrompt(e.target.value)}
                style={{ width: '100%', minHeight: '120px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isGeneratingScript || !scriptPrompt.trim()}
              style={{ justifyContent: 'center' }}
            >
              {isGeneratingScript ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Synthesizing Script...</span>
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  <span>Write Script with Codex</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Code Output Stage */}
          <div className="codex-editor-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center gap-2">
                <Terminal size={16} color="#635BFF" />
                <strong style={{ fontSize: '14px', color: '#1E293B' }}>{scriptLanguage} Output Canvas</strong>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleCopyCode(generatedScript)}
              >
                {copiedCode ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="codex-editor-stage">
              {generatedScript}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: DEBUG ERRORS & FIXER
          ========================================================================= */}
      {activeTab === 'debugger' && (
        <div className="debug-panel">
          <div className="codex-prompt-card">
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>
                AI Error Diagnosis &amp; Root-Cause Fixer
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                Paste error logs, stack traces, or broken code snippets to diagnose root causes and get verified fixes.
              </p>
            </div>

            <textarea
              className="error-input-box"
              value={errorInput}
              onChange={(e) => setErrorInput(e.target.value)}
              placeholder="Paste stack trace or error log here..."
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDiagnoseError}
                disabled={isDebugging || !errorInput.trim()}
              >
                {isDebugging ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Diagnosing Error...</span>
                  </>
                ) : (
                  <>
                    <Bug size={15} />
                    <span>Diagnose &amp; Fix Error</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {debugResult && (
            <div className="ai-review-card">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} color="#059669" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>
                  Root Cause: {debugResult.rootCause}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#475569' }}>
                {debugResult.explanation}
              </p>
              <div className="fixed-code-box">
                {debugResult.fixedCode}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
