import React, { useState, useRef, useMemo } from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Highlighter,
  Download,
  Copy,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Check,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './StudioStyles.css';

const INITIAL_DOC_CONTENT = `<h1>The Next Era of AI Workspaces: Autonomous Multi-Turn Execution</h1>

<p>In 2026, the paradigm of modern knowledge work has fundamentally shifted. Standalone chat interfaces and isolated document silos are being actively abandoned in favor of connected, autonomous AI execution environments.</p>

<h2>1. Why Isolated Chatbots Fail</h2>
<p>Traditional large language models suffer from a fatal friction point: <strong>context loss</strong>. You copy research from a browser, paste it into a prompt, generate half-baked copy, and paste it back into your CMS or CRM. Each handover degrades informational fidelity and introduces latency.</p>

<blockquote>"True productivity is not faster typing. True productivity is eliminating the translation tax between discovery, drafting, and deployment."</blockquote>

<h2>2. The Three Pillars of Zunme AI</h2>
<ul>
  <li><strong>Real-time Grounding:</strong> Dynamic web verification ensuring zero hallucination on fast-moving domain entities.</li>
  <li><strong>Multi-Modal Studios:</strong> Unified generation for text, cinematic image diffusion, and structured video scene breakdowns.</li>
  <li><strong>Central Knowledge Warehouse:</strong> Your team's prompt chains, blueprints, and library assets indexed in one secure space.</li>
</ul>

<h3>Technical Architecture Preview</h3>
<pre><code>// Example Zunme AI Agent Invocation Pipeline
const pipeline = new ZunmePipeline({
  grounding: 'realtime-web',
  model: 'zunme-omni-4',
  destination: 'ai-warehouse'
});
await pipeline.execute({ entity: 'SaaS Market 2026' });</code></pre>

<p>By treating research as a first-class continuous data stream, creators and enterprise teams can produce higher-quality output in a fraction of the time.</p>`;

export const DocumentCanvas: React.FC = () => {
  const { showToast } = useApp();

  const editorRef = useRef<HTMLDivElement>(null);
  const [contentHtml, setContentHtml] = useState<string>(INITIAL_DOC_CONTENT);
  const [documentTitle, setDocumentTitle] = useState('Autonomous AI Execution Guidebook');
  const [isCopied, setIsCopied] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(false);

  // Content Statistics
  const stats = useMemo(() => {
    // Extract plain text from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHtml;
    const text = tempDiv.textContent || tempDiv.innerText || '';

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const readingTimeMin = Math.max(1, Math.ceil(words / 200));

    return { words, chars, readingTimeMin };
  }, [contentHtml]);

  // Execute standard formatting commands
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  // AI Inline Assistant Actions
  const handleAiAction = (actionType: 'rewrite' | 'professional' | 'summarize' | 'expand') => {
    setIsAiProcessing(true);
    showToast(`AI Assistant: Applying "${actionType}" optimization...`, 'info');

    setTimeout(() => {
      if (!editorRef.current) return;

      if (actionType === 'rewrite') {
        executeCommand('insertHTML', '<mark>✨ [AI Rewritten]: Streamlined and energized for maximum engagement.</mark> ');
      } else if (actionType === 'professional') {
        executeCommand('insertHTML', '<mark>💼 [Executive Polish]: Calibrated tone for enterprise leadership.</mark> ');
      } else if (actionType === 'summarize') {
        const summary = `<div style="background:#FAFBFD; border-left:3px solid #6E56CF; padding:10px 14px; margin:14px 0; border-radius:4px;"><strong>AI Executive Summary:</strong> Key takeaway is eliminating workflow context fragmentation through connected multi-turn workspaces.</div>`;
        executeCommand('insertHTML', summary);
      } else if (actionType === 'expand') {
        const expansion = `<p><em>Furthermore, empirical performance benchmarks reveal that teams adopting unified workspace architectures cut draft-to-publish cycles by an average of 4.2x within 90 days.</em></p>`;
        executeCommand('insertHTML', expansion);
      }

      setContentHtml(editorRef.current.innerHTML);
      setIsAiProcessing(false);
      showToast('AI adjustment applied to canvas!', 'success');
    }, 800);
  };

  // Export Tools
  const handleExportMarkdown = () => {
    const temp = document.createElement('div');
    temp.innerHTML = contentHtml;
    // Simple HTML to markdown conversion
    let md = `# ${documentTitle}\n\n`;
    md += temp.innerText;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Document downloaded as Markdown (.md)', 'success');
  };

  const handleExportPlainText = () => {
    const temp = document.createElement('div');
    temp.innerHTML = contentHtml;
    const txt = `${documentTitle}\n\n${temp.innerText}`;

    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Document downloaded as Plain Text (.txt)', 'success');
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(contentHtml);
    setIsCopied(true);
    showToast('Formatted HTML copied to clipboard', 'info');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="canvas-wrapper">
      {/* Top Title & Toolbar */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #E8ECF5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <input
          type="text"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          style={{
            fontSize: '18px',
            fontWeight: '900',
            color: '#111625',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            flex: 1,
            minWidth: '240px'
          }}
          placeholder="Untitled Document..."
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn btn-outline btn-sm" onClick={handleCopyHtml}>
            {isCopied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
            <span>{isCopied ? 'Copied HTML' : 'Copy HTML'}</span>
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleExportPlainText}>
            <Download size={13} />
            <span>.TXT</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleExportMarkdown}>
            <Download size={13} />
            <span>Export .MD</span>
          </button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="canvas-toolbar">
        <div className="canvas-tool-group">
          <button
            type="button"
            className="canvas-tool-btn"
            title="Heading 1"
            onClick={() => executeCommand('formatBlock', '<h1>')}
          >
            <Heading1 size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Heading 2"
            onClick={() => executeCommand('formatBlock', '<h2>')}
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Heading 3"
            onClick={() => executeCommand('formatBlock', '<h3>')}
          >
            <Heading3 size={15} />
          </button>

          <div className="canvas-divider" />

          <button
            type="button"
            className="canvas-tool-btn"
            title="Bold"
            onClick={() => executeCommand('bold')}
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Italic"
            onClick={() => executeCommand('italic')}
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Underline"
            onClick={() => executeCommand('underline')}
          >
            <Underline size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Strikethrough"
            onClick={() => executeCommand('strikeThrough')}
          >
            <Strikethrough size={15} />
          </button>

          <div className="canvas-divider" />

          <button
            type="button"
            className="canvas-tool-btn"
            title="Bulleted List"
            onClick={() => executeCommand('insertUnorderedList')}
          >
            <List size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Numbered List"
            onClick={() => executeCommand('insertOrderedList')}
          >
            <ListOrdered size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Blockquote"
            onClick={() => executeCommand('formatBlock', '<blockquote>')}
          >
            <Quote size={15} />
          </button>
          <button
            type="button"
            className="canvas-tool-btn"
            title="Code Block"
            onClick={() => executeCommand('formatBlock', '<pre>')}
          >
            <Code size={15} />
          </button>
          <button
            type="button"
            className={`canvas-tool-btn ${activeHighlight ? 'active' : ''}`}
            title="Highlight Text"
            onClick={() => {
              executeCommand('hiliteColor', '#FEF08A');
              setActiveHighlight(!activeHighlight);
            }}
          >
            <Highlighter size={15} />
          </button>
        </div>
      </div>

      {/* AI Inline Assistant Quick Bar */}
      <div className="canvas-ai-assistant-bar">
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#6E56CF', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase' }}>
          <Sparkles size={13} />
          <span>Inline AI Assistant:</span>
        </span>
        <button
          type="button"
          className="ai-assistant-pill"
          disabled={isAiProcessing}
          onClick={() => handleAiAction('rewrite')}
        >
          Rewrite
        </button>
        <button
          type="button"
          className="ai-assistant-pill"
          disabled={isAiProcessing}
          onClick={() => handleAiAction('professional')}
        >
          Make More Professional
        </button>
        <button
          type="button"
          className="ai-assistant-pill"
          disabled={isAiProcessing}
          onClick={() => handleAiAction('summarize')}
        >
          Insert Summary
        </button>
        <button
          type="button"
          className="ai-assistant-pill"
          disabled={isAiProcessing}
          onClick={() => handleAiAction('expand')}
        >
          Expand Argument
        </button>
      </div>

      {/* Editable Rich Canvas */}
      <div
        ref={editorRef}
        className="canvas-editor-area"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        role="textbox"
        aria-multiline="true"
        aria-label="Document Content Canvas"
      />

      {/* Bottom Status Bar */}
      <div className="canvas-statusbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="canvas-stat-pill">Words: <strong>{stats.words}</strong></span>
          <span>•</span>
          <span className="canvas-stat-pill">Characters: <strong>{stats.chars}</strong></span>
          <span>•</span>
          <span className="canvas-stat-pill">Reading Time: <strong>~{stats.readingTimeMin} min</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '11.5px', fontWeight: '600' }}>
          <Check size={13} />
          <span>Autosaved locally</span>
        </div>
      </div>
    </div>
  );
};
