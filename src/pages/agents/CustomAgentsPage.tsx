import React, { useState, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Plus,
  Play,
  Settings,
  Upload,
  Globe,
  Code,
  Image as ImageIcon,
  Zap,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Trash2,
  Layers,
  Search,
  MessageSquare,
  FileText,
  Send,
  RefreshCw,
  X,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './CustomAgentsPage.css';

export interface CustomAgent {
  id: string;
  name: string;
  emoji: string;
  avatarBg: string;
  category: string;
  description: string;
  instructions: string;
  capabilities: {
    webSearch: boolean;
    codeInterpreter: boolean;
    imageGeneration: boolean;
    deepResearch: boolean;
  };
  knowledgeFiles: string[];
  conversationStarters: string[];
  author: string;
  isCustomCreated?: boolean;
}

const PRESET_AGENTS: CustomAgent[] = [
  {
    id: 'agent-b2b-outreach',
    name: 'B2B Cold Outreach Engine',
    emoji: '✉️',
    avatarBg: 'linear-gradient(135deg, #635BFF 0%, #4338CA 100%)',
    category: 'Sales & Marketing',
    description: 'Generates high-converting multi-touch outbound email and LinkedIn sequences tailored to executive decision makers.',
    instructions: 'You are an elite B2B SDR Director. Write concise, value-focused cold outreach with extreme personalization hooks.',
    capabilities: {
      webSearch: true,
      codeInterpreter: false,
      imageGeneration: false,
      deepResearch: true
    },
    knowledgeFiles: ['b2b_saas_objection_handling.pdf', 'enterprise_buyer_personas.csv'],
    conversationStarters: [
      'Draft a 3-touch sequence for VP of Engineering',
      'Generate 5 compelling cold email subject lines',
      'Write a LinkedIn connection request note'
    ],
    author: 'Zunme AI Labs'
  },
  {
    id: 'agent-seo-cluster',
    name: 'Topical Authority SEO Architect',
    emoji: '📈',
    avatarBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    category: 'SEO & Search',
    description: 'Builds comprehensive 12-cluster SEO taxonomies, semantic keyword internal linking, and search intent maps.',
    instructions: 'You are a technical SEO architect. Group keywords into pillar pages and sub-topical clusters with clear crawl hierarchies.',
    capabilities: {
      webSearch: true,
      codeInterpreter: true,
      imageGeneration: false,
      deepResearch: true
    },
    knowledgeFiles: ['semantic_search_indexing_2026.txt'],
    conversationStarters: [
      'Create a topic cluster for AI productivity tools',
      'Map internal linking for a core pillar page',
      'Audit search intent for long-tail queries'
    ],
    author: 'Zunme SEO Core'
  },
  {
    id: 'agent-viral-hooks',
    name: 'YouTube & Shorts Hook Engineer',
    emoji: '🎬',
    avatarBg: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
    category: 'Media & Creative',
    description: 'Specialized in crafting 3-second visual hooks, pattern interrupts, and narrative pacing for viral short-form videos.',
    instructions: 'You are a viral YouTube script producer. Maximize audience retention through visual contrast, pacing, and curiosity loops.',
    capabilities: {
      webSearch: false,
      codeInterpreter: false,
      imageGeneration: true,
      deepResearch: false
    },
    knowledgeFiles: ['viral_retention_curves_guide.md'],
    conversationStarters: [
      'Give me 5 visual hook ideas for an AI tool video',
      'Outline a 60-second YouTube Short with pacing cues',
      'Rewrite this script opening to double watch time'
    ],
    author: 'Zunme Creator Studio'
  },
  {
    id: 'agent-code-refactor',
    name: 'Clean Code & Architecture Mentor',
    emoji: '💻',
    avatarBg: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    category: 'Engineering & Coding',
    description: 'Analyzes code diffs, enforces clean software design patterns, and optimizes TypeScript/Python algorithms.',
    instructions: 'You are a Principal Software Architect. Focus on maintainability, type safety, modular design tokens, and algorithmic complexity.',
    capabilities: {
      webSearch: true,
      codeInterpreter: true,
      imageGeneration: false,
      deepResearch: true
    },
    knowledgeFiles: ['clean_code_patterns_and_diffs.md'],
    conversationStarters: [
      'Refactor this React component for readability',
      'Review this function for edge case vulnerabilities',
      'Explain optimal state management structure'
    ],
    author: 'Zunme Codex Hub'
  }
];

export const CustomAgentsPage: React.FC = () => {
  const { showToast, saveToLibrary } = useApp();

  const [activeView, setActiveView] = useState<'catalog' | 'builder'>('catalog');
  const [agentsList, setAgentsList] = useState<CustomAgent[]>(PRESET_AGENTS);
  const [selectedAgentForTest, setSelectedAgentForTest] = useState<CustomAgent>(PRESET_AGENTS[0]);

  // Builder Form State
  const [builderName, setBuilderName] = useState('');
  const [builderEmoji, setBuilderEmoji] = useState('🤖');
  const [builderCategory, setBuilderCategory] = useState('Writing & Marketing');
  const [builderDescription, setBuilderDescription] = useState('');
  const [builderInstructions, setBuilderInstructions] = useState('');
  const [builderFiles, setBuilderFiles] = useState<string[]>(['brand_guidelines_2026.pdf']);
  const [builderCapabilities, setBuilderCapabilities] = useState({
    webSearch: true,
    codeInterpreter: false,
    imageGeneration: false,
    deepResearch: true
  });
  const [builderStarter1, setBuilderStarter1] = useState('Draft an executive briefing summary');
  const [builderStarter2, setBuilderStarter2] = useState('Analyze key market competitors');

  // Playground Chat State
  const [playgroundMessages, setPlaygroundMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([
    {
      role: 'ai',
      text: `Hello! I am ${PRESET_AGENTS[0].name}. ${PRESET_AGENTS[0].description} What would you like to work on today?`
    }
  ]);
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLaunchAgent = (agent: CustomAgent) => {
    setSelectedAgentForTest(agent);
    setPlaygroundMessages([
      {
        role: 'ai',
        text: `Switched active agent to ${agent.name} (${agent.category}). How can I assist you with ${agent.description.toLowerCase()}?`
      }
    ]);
    setActiveView('builder');
    showToast(`Loaded ${agent.name} into Live Test Playground`, 'info');
  };

  const handlePlaygroundSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!playgroundInput.trim() || isAiResponding) return;

    const userText = playgroundInput.trim();
    setPlaygroundMessages(prev => [...prev, { role: 'user', text: userText }]);
    setPlaygroundInput('');
    setIsAiResponding(true);

    setTimeout(() => {
      setIsAiResponding(false);
      let aiResponse = '';
      if (selectedAgentForTest.id === 'agent-b2b-outreach') {
        aiResponse = `**Synthesized Outreach Strategy:**\n\n**Subject Line:** 15-minute quick question regarding {{Company}}'s 2026 AI pipeline\n\n**Email Body:**\nHi {{FirstName}},\n\nNoticed {{Company}} is scaling its creator operations this quarter. Most engineering teams we partner with lose 8+ hours weekly hopping between disconnected research and drafting tools.\n\nZunme AI consolidates live web-grounded discovery and studio asset generation into one seamless canvas.\n\nOpen to reviewing our 2-minute architectural brief this Thursday at 10am?\n\nBest,\nAlex`;
      } else if (selectedAgentForTest.id === 'agent-seo-cluster') {
        aiResponse = `**Topical Cluster Taxonomy Blueprint:**\n\n1. **Core Pillar:** High-Authority AI Creator Hub (URL: /ai-creator-hub)\n2. **Supporting Cluster A:** Voice Grounded Search Telemetry (Targeting 24k Mo. Vol)\n3. **Supporting Cluster B:** B2B Cold Outreach Prompt Architecture\n4. **Internal Link Rule:** Every cluster links back to the core pillar with contextual anchor keywords. Zero orphan nodes detected.`;
      } else {
        aiResponse = `**Agent Output (${selectedAgentForTest.name}):**\n\nBased on your prompt "${userText}", I have applied the custom instructions and verified against the attached knowledge base (${selectedAgentForTest.knowledgeFiles.join(', ') || 'General Knowledge'}).\n\n- **Directive Adherence:** 100% verified\n- **Tone & Persona:** Optimized for ${selectedAgentForTest.category}\n- **Agentic Grounding:** Live web index citations active.`;
      }

      setPlaygroundMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBuilderFiles(prev => [...prev, file.name]);
    showToast(`Added persistent file: "${file.name}" to Agent Knowledge Base`, 'success');
  };

  const handleRemoveFile = (fileName: string) => {
    setBuilderFiles(prev => prev.filter(f => f !== fileName));
  };

  const handleSaveCustomAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderName.trim()) {
      showToast('Please provide an Agent Name', 'error');
      return;
    }

    const newAgent: CustomAgent = {
      id: `custom-agent-${Date.now()}`,
      name: builderName.trim(),
      emoji: builderEmoji,
      avatarBg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
      category: builderCategory,
      description: builderDescription.trim() || 'Zunme AI Agent built in Zunme Studio.',
      instructions: builderInstructions.trim() || 'Act as a specialized assistant for this workspace.',
      capabilities: builderCapabilities,
      knowledgeFiles: builderFiles,
      conversationStarters: [builderStarter1, builderStarter2].filter(Boolean),
      author: 'You (Custom Created)',
      isCustomCreated: true
    };

    setAgentsList(prev => [newAgent, ...prev]);
    setSelectedAgentForTest(newAgent);
    setPlaygroundMessages([
      {
        role: 'ai',
        text: `✨ Custom Agent "${newAgent.name}" successfully created and online! Instructions, knowledge base, and agentic tools are active.`
      }
    ]);
    showToast(`Custom Agent "${newAgent.name}" saved!`, 'success');
    setActiveView('catalog');
  };

  return (
    <div className="custom-agents-workspace">
      {/* Header Area */}
      <div className="agents-header">
        <div className="agents-title-group">
          <h1>
            <Bot size={28} color="#635BFF" />
            <span>Zunme AI Agent &amp; Custom GPT Builder</span>
          </h1>
          <p className="agents-subtitle">
            Build tailored Zunme AI Agents and Custom GPTs with persistent reference files, custom behavioral instructions, and autonomous agentic task capabilities.
          </p>
        </div>

        <div className="agents-header-actions">
          {activeView === 'catalog' ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setActiveView('builder')}
            >
              <Plus size={16} />
              <span>Create Custom GPT</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setActiveView('catalog')}
            >
              <Layers size={16} />
              <span>Browse All Agents</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Switcher */}
      <div className="agents-mode-nav">
        <button
          type="button"
          className={`agents-nav-tab ${activeView === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveView('catalog')}
        >
          <Layers size={16} />
          <span>Explore Agents &amp; Custom GPTs ({agentsList.length})</span>
        </button>

        <button
          type="button"
          className={`agents-nav-tab ${activeView === 'builder' ? 'active' : ''}`}
          onClick={() => setActiveView('builder')}
        >
          <Sparkles size={16} />
          <span>Agent Builder &amp; Live Test Playground</span>
        </button>
      </div>

      {/* =========================================================================
          VIEW 1: AGENTS CATALOG & DIRECTORY
          ========================================================================= */}
      {activeView === 'catalog' && (
        <div className="agents-grid">
          {agentsList.map(agent => (
            <div key={agent.id} className="agent-card">
              <div>
                <div className="agent-card-header">
                  <div className="agent-avatar-box" style={{ background: agent.avatarBg }}>
                    <span>{agent.emoji}</span>
                  </div>
                  <div className="agent-info">
                    <h3 className="agent-name">{agent.name}</h3>
                    <span className="agent-category-badge">{agent.category}</span>
                  </div>
                </div>

                <p className="agent-description">{agent.description}</p>

                <div className="agent-capabilities-list">
                  {agent.capabilities.webSearch && (
                    <span className="capability-pill">
                      <Globe size={11} color="#059669" />
                      <span>Web Search</span>
                    </span>
                  )}
                  {agent.capabilities.codeInterpreter && (
                    <span className="capability-pill">
                      <Code size={11} color="#635BFF" />
                      <span>Code Codex</span>
                    </span>
                  )}
                  {agent.capabilities.imageGeneration && (
                    <span className="capability-pill">
                      <ImageIcon size={11} color="#EC4899" />
                      <span>Diffusion Studio</span>
                    </span>
                  )}
                  {agent.capabilities.deepResearch && (
                    <span className="capability-pill">
                      <Zap size={11} color="#D97706" />
                      <span>Deep Research</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="agent-card-footer">
                <span className="agent-author">{agent.author}</span>
                <button
                  type="button"
                  className="btn-launch-agent"
                  onClick={() => handleLaunchAgent(agent)}
                >
                  <Play size={13} />
                  <span>Launch Agent</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          VIEW 2: AGENT BUILDER STUDIO (SPLIT FORM & LIVE PLAYGROUND)
          ========================================================================= */}
      {activeView === 'builder' && (
        <div className="agent-builder-split">
          {/* Left Panel: Configuration Form */}
          <form onSubmit={handleSaveCustomAgent} className="builder-form-panel">
            <div>
              <h3 className="builder-section-title">
                <Settings size={16} color="#635BFF" />
                <span>Configure Your Custom Agent</span>
              </h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748B' }}>
                Set up persistent behavioral instructions, upload reference knowledge documents, and toggle agentic tool execution.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '12px' }}>
              <div className="builder-field-group">
                <label className="builder-field-label">Icon / Emoji</label>
                <input
                  type="text"
                  className="builder-input"
                  style={{ textAlign: 'center', fontSize: '18px' }}
                  value={builderEmoji}
                  maxLength={2}
                  onChange={(e) => setBuilderEmoji(e.target.value)}
                />
              </div>

              <div className="builder-field-group">
                <label className="builder-field-label">Agent Name *</label>
                <input
                  type="text"
                  className="builder-input"
                  placeholder="e.g. Executive Strategy Summarizer"
                  value={builderName}
                  onChange={(e) => setBuilderName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="builder-field-group">
              <label className="builder-field-label">Category / Domain</label>
              <select
                className="builder-select"
                value={builderCategory}
                onChange={(e) => setBuilderCategory(e.target.value)}
              >
                <option value="Sales & Marketing">Sales &amp; Marketing</option>
                <option value="SEO & Search">SEO &amp; Search</option>
                <option value="Engineering & Coding">Engineering &amp; Coding</option>
                <option value="Media & Creative">Media &amp; Creative</option>
                <option value="Research & Education">Research &amp; Education</option>
                <option value="General Productivity">General Productivity</option>
              </select>
            </div>

            <div className="builder-field-group">
              <label className="builder-field-label">Short Description</label>
              <input
                type="text"
                className="builder-input"
                placeholder="What does this custom GPT do best?"
                value={builderDescription}
                onChange={(e) => setBuilderDescription(e.target.value)}
              />
            </div>

            <div className="builder-field-group">
              <label className="builder-field-label">System Instructions &amp; Persona</label>
              <textarea
                className="builder-textarea"
                placeholder="What role should this agent adopt? What rules, formatting guidelines, or constraints must it follow?"
                value={builderInstructions}
                onChange={(e) => setBuilderInstructions(e.target.value)}
              />
            </div>

            {/* Persistent Knowledge Base Section */}
            <div className="builder-field-group">
              <label className="builder-field-label">
                <span>Persistent Knowledge Base (Files)</span>
              </label>
              <div
                className="builder-knowledge-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={20} color="#635BFF" style={{ margin: '0 auto 6px auto' }} />
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B' }}>
                  Upload Reference Files (.txt, .pdf, .csv, .md)
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                  Persistent files are embedded into the agent's memory canvas
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />

              {builderFiles.length > 0 && (
                <div className="knowledge-files-list">
                  {builderFiles.map((file, idx) => (
                    <div key={idx} className="knowledge-file-item">
                      <div className="flex items-center gap-2">
                        <FileText size={13} color="#635BFF" />
                        <span>{file}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-ghost"
                        style={{ padding: '2px', color: '#EF4444' }}
                        onClick={() => handleRemoveFile(file)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Capabilities Checkbox Grid */}
            <div className="builder-field-group">
              <label className="builder-field-label">Agentic Capabilities &amp; Tools</label>
              <div className="capabilities-checkbox-grid">
                <div
                  className={`capability-check-card ${builderCapabilities.webSearch ? 'checked' : ''}`}
                  onClick={() => setBuilderCapabilities(prev => ({ ...prev, webSearch: !prev.webSearch }))}
                >
                  <Globe size={16} color="#059669" />
                  <span style={{ fontSize: '12.5px', fontWeight: '600' }}>Live Web Search</span>
                </div>

                <div
                  className={`capability-check-card ${builderCapabilities.codeInterpreter ? 'checked' : ''}`}
                  onClick={() => setBuilderCapabilities(prev => ({ ...prev, codeInterpreter: !prev.codeInterpreter }))}
                >
                  <Code size={16} color="#635BFF" />
                  <span style={{ fontSize: '12.5px', fontWeight: '600' }}>Code Execution</span>
                </div>

                <div
                  className={`capability-check-card ${builderCapabilities.imageGeneration ? 'checked' : ''}`}
                  onClick={() => setBuilderCapabilities(prev => ({ ...prev, imageGeneration: !prev.imageGeneration }))}
                >
                  <ImageIcon size={16} color="#EC4899" />
                  <span style={{ fontSize: '12.5px', fontWeight: '600' }}>Image Diffusion</span>
                </div>

                <div
                  className={`capability-check-card ${builderCapabilities.deepResearch ? 'checked' : ''}`}
                  onClick={() => setBuilderCapabilities(prev => ({ ...prev, deepResearch: !prev.deepResearch }))}
                >
                  <Zap size={16} color="#D97706" />
                  <span style={{ fontSize: '12.5px', fontWeight: '600' }}>Deep Research</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveView('catalog')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <CheckCircle2 size={16} />
                <span>Save &amp; Publish Agent</span>
              </button>
            </div>
          </form>

          {/* Right Panel: Interactive Playground Canvas */}
          <div className="builder-preview-panel">
            <div className="preview-header">
              <div className="preview-agent-info">
                <div className="preview-avatar" style={{ background: selectedAgentForTest.avatarBg }}>
                  <span>{selectedAgentForTest.emoji}</span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1E293B' }}>
                    {selectedAgentForTest.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Live Test Sandbox • {selectedAgentForTest.category}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setPlaygroundMessages([
                  {
                    role: 'ai',
                    text: `Playground cleared. Ready to test ${selectedAgentForTest.name}.`
                  }
                ])}
                title="Clear test chat"
              >
                <RefreshCw size={13} />
                <span>Reset</span>
              </button>
            </div>

            <div className="preview-messages-container">
              {playgroundMessages.map((msg, idx) => (
                <div key={idx} className={`preview-msg ${msg.role}`}>
                  <div className="preview-bubble">
                    <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                  </div>
                </div>
              ))}
              {isAiResponding && (
                <div className="preview-msg ai">
                  <div className="preview-bubble">
                    <span style={{ fontSize: '12px', color: '#64748B' }}>Agent is thinking &amp; grounding...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Conversation Starter Chips */}
            {selectedAgentForTest.conversationStarters && selectedAgentForTest.conversationStarters.length > 0 && (
              <div style={{ padding: '8px 16px', background: '#FFFFFF', borderTop: '1px solid #F1F5F9', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedAgentForTest.conversationStarters.map((starter, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      color: '#475569',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setPlaygroundInput(starter);
                    }}
                  >
                    "{starter}"
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handlePlaygroundSend} className="preview-input-bar">
              <input
                type="text"
                className="preview-input"
                placeholder={`Test chat with ${selectedAgentForTest.name}...`}
                value={playgroundInput}
                onChange={(e) => setPlaygroundInput(e.target.value)}
                disabled={isAiResponding}
              />
              <button
                type="submit"
                className="preview-send-btn"
                disabled={isAiResponding || !playgroundInput.trim()}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
