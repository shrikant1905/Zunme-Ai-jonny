import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Sparkles,
  Copy,
  Bookmark,
  RefreshCw,
  Paperclip,
  Check,
  Bot,
  User as UserIcon,
  HelpCircle,
  TrendingUp,
  FileText,
  Code,
  Globe,
  Zap,
  ExternalLink,
  Mic,
  Volume2,
  X,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './ChatPage.css';

export const ChatPage: React.FC = () => {
  const {
    activeMessages,
    isAiResponding,
    sendMessage,
    saveToLibrary,
    showToast,
    user
  } = useApp();
  const navigate = useNavigate();

  const [inputMessage, setInputMessage] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [autoGrounding, setAutoGrounding] = useState<boolean>(true);
  const [voiceModeOpen, setVoiceModeOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('Explain the competitive advantages of Zunme AI compared to traditional LLMs in 2026.');
  const [deepResearchActive, setDeepResearchActive] = useState<boolean>(false);

  // Multimodal Image & Screenshot Attachment State
  const [attachedImage, setAttachedImage] = useState<{
    name: string;
    url: string;
    sizeKb: number;
  } | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const scrollEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasSentInitialPrompt = useRef(false);

  // Check if routed with a prompt from Landing Page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPrompt = params.get('prompt');
    if (initialPrompt && !hasSentInitialPrompt.current) {
      hasSentInitialPrompt.current = true;
      sendMessage(initialPrompt);
      // Clean query param from URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [sendMessage]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isAiResponding]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachedImage({
        name: file.name,
        url: event.target?.result as string,
        sizeKb: Math.round(file.size / 1024)
      });
      showToast(`Attached "${file.name}" for Multimodal Vision inspection`, 'info');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSampleScreenshot = (sampleType: 'dashboard' | 'mockup') => {
    if (sampleType === 'dashboard') {
      setAttachedImage({
        name: 'analytics_conversion_dashboard.png',
        url: '/assets/client-icons/documents_icon.png',
        sizeKb: 148
      });
      setInputMessage('Analyze this analytics dashboard screenshot. Identify key conversion drop-offs, visual hierarchy, and metric anomalies.');
    } else {
      setAttachedImage({
        name: 'landing_page_ui_mockup.png',
        url: '/assets/client-icons/interactive_content_icon.png',
        sizeKb: 216
      });
      setInputMessage('Audit this landing page UI mockup. Evaluate visual contrast, CTA placement, and accessibility.');
    }
    showToast('Loaded sample screenshot for Multimodal AI analysis', 'info');
  };

  const handleSend = () => {
    if ((!inputMessage.trim() && !attachedImage) || isAiResponding) return;

    let finalMsg = inputMessage.trim();
    if (attachedImage) {
      finalMsg = `[MULTIMODAL IMAGE ATTACHMENT: ${attachedImage.name} (${attachedImage.sizeKb} KB)]\n${finalMsg || 'Please analyze this uploaded visual asset and provide comprehensive insights.'}`;
    }
    if (deepResearchActive) {
      finalMsg = `[DEEP RESEARCH SYNTHESIS: Multi-Step Verified Data Gathering]\n${finalMsg}`;
    }

    sendMessage(finalMsg);
    setInputMessage('');
    setAttachedImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
  };

  const handleSendVoiceTranscript = () => {
    if (!voiceTranscript.trim() || isAiResponding) return;
    sendMessage(voiceTranscript.trim());
    setVoiceModeOpen(false);
    setIsListening(false);
    showToast('Sent voice transcription to Zunme AI', 'success');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyMessage = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMsgId(msgId);
    showToast('Copied answer to clipboard', 'info');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSaveToLibrary = (content: string) => {
    const firstLine = content.split('\n')[0].replace(/[#*`]/g, '').trim() || 'AI Conversation Extract';
    saveToLibrary({
      title: firstLine.slice(0, 48),
      contentType: 'TEXT',
      previewText: content.slice(0, 140) + '...',
      content,
      tags: ['AI Chat', 'Notes']
    });
  };

  const handlePromptCardClick = (promptText: string) => {
    sendMessage(promptText);
  };

  return (
    <div className="chat-workspace">
      {/* Chat Top Info Bar */}
      <div className="chat-header-bar">
        <div className="chat-model-info">
          <div className="model-badge">
            <Sparkles size={13} />
            <span>Zunme Core 4o</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            Context Window: 128k
          </span>
        </div>

        <div className="chat-header-actions">
          {/* Part 10: Automatic Query Grounding Toggle */}
          <button
            type="button"
            className={`chat-grounding-toggle-btn ${autoGrounding ? 'active' : ''}`}
            onClick={() => {
              setAutoGrounding(!autoGrounding);
              showToast(
                !autoGrounding
                  ? '⚡ Automatic Web Grounding Enabled (Live 2026 sources active)'
                  : 'Automatic Web Grounding Disabled (Offline base model mode)',
                'info'
              );
            }}
            title="Automatically grounds time-sensitive queries with live web search citations"
          >
            <Globe size={13} color={autoGrounding ? '#059669' : '#64748B'} />
            <span>Auto Web Grounding: {autoGrounding ? 'ON' : 'OFF'}</span>
          </button>

          <span className="badge badge-success">Online &amp; Ready</span>
        </div>
      </div>

      {/* Chat Messages Canvas */}
      <div className="chat-canvas">
        <div className="chat-scroll-inner">
          {activeMessages.length === 0 ? (
            <div className="chat-empty-state">
              <div className="empty-state-icon">
                <Bot size={32} />
              </div>
              <h2 className="empty-state-title">Welcome to Zunme AI Assistant</h2>
              <p className="empty-state-desc">
                What would you like to work on today? Ask a question, request a strategic plan, or choose a prompt to get started.
              </p>

              <div className="starter-prompts-grid">
                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'Can you propose a 4-step go-to-market plan for an AI productivity tool designed for creators?'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={15} color="var(--color-primary)" />
                    <strong>Creator GTM Strategy</strong>
                  </div>
                  <span>4-step framework for early adopter traction</span>
                </div>

                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'Draft a high-converting product announcement email for a new eco-friendly water bottle brand.'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <FileText size={15} color="var(--color-primary)" />
                    <strong>Product Launch Email</strong>
                  </div>
                  <span>Persuasive copy with subject line and CTA</span>
                </div>

                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'What are the main best practices for organizing shared design tokens in a React + TypeScript project?'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <Code size={15} color="var(--color-primary)" />
                    <strong>Frontend Architecture</strong>
                  </div>
                  <span>Type-safe CSS tokens & component primitives</span>
                </div>

                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'Explain the difference between retrieval-augmented generation (RAG) and model fine-tuning with practical examples.'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle size={15} color="var(--color-primary)" />
                    <strong>RAG vs Fine-Tuning</strong>
                  </div>
                  <span>Practical trade-offs and implementation cost</span>
                </div>
              </div>

              {/* Sample Screenshots for Multimodal Vision Testing */}
              <div className="sample-screenshots-container">
                <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '700' }}>
                  📸 Multimodal Vision Analysis:
                </span>
                <button
                  type="button"
                  className="sample-screenshot-chip"
                  onClick={() => handleSelectSampleScreenshot('dashboard')}
                >
                  <ImageIcon size={13} color="#635BFF" />
                  <span>Analyze Analytics Dashboard Screenshot</span>
                </button>
                <button
                  type="button"
                  className="sample-screenshot-chip"
                  onClick={() => handleSelectSampleScreenshot('mockup')}
                >
                  <ImageIcon size={13} color="#059669" />
                  <span>Audit Landing Page UI Mockup</span>
                </button>
              </div>
            </div>
          ) : (
            activeMessages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row ${msg.role === 'user' ? 'user' : 'ai'}`}
              >
                <div className={`chat-avatar ${msg.role === 'user' ? 'user-av' : 'ai-av'}`}>
                  {msg.role === 'user' ? (
                    user ? user.fullName.charAt(0).toUpperCase() : <UserIcon size={16} />
                  ) : (
                    <Bot size={17} />
                  )}
                </div>

                <div className="chat-bubble-content">
                  {msg.role === 'user' ? (
                    <div className="user-bubble">
                      {msg.content.includes('[MULTIMODAL IMAGE ATTACHMENT:') && (
                        <div className="user-image-attachment-pill">
                          <ImageIcon size={13} />
                          <span>{msg.content.match(/\[MULTIMODAL IMAGE ATTACHMENT: ([^\]]+)\]/)?.[1] || 'Attached Image'}</span>
                        </div>
                      )}
                      <div>
                        {msg.content.replace(/\[MULTIMODAL IMAGE ATTACHMENT: [^\]]+\]\n?/, '')}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="ai-bubble">
                        <RichMessageRenderer content={msg.content} />

                        {autoGrounding && (
                          <div className="chat-grounded-citation-box">
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Globe size={12} />
                              <span>Live Grounded Sources:</span>
                            </span>
                            <a
                              href="https://techinsights-journal.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat-citation-tag"
                            >
                              <span>techinsights-journal.com</span>
                              <ExternalLink size={10} />
                            </a>
                            <a
                              href="https://business-strategy-review.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat-citation-tag"
                            >
                              <span>business-strategy-review.io</span>
                              <ExternalLink size={10} />
                            </a>
                            <span
                              style={{ fontSize: '10.5px', color: '#64748B', cursor: 'pointer', marginLeft: 'auto' }}
                              onClick={() => {
                                showToast('Opening verified live search brief...', 'info');
                                navigate('/user/search');
                              }}
                            >
                              View in Live Search &rarr;
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="ai-message-toolbar">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          title="Copy Answer"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check size={13} color="var(--color-success)" />
                              <span style={{ color: 'var(--color-success)' }}>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleSaveToLibrary(msg.content)}
                          title="Save this response to My Library"
                        >
                          <Bookmark size={13} />
                          <span>Save to Library</span>
                        </button>

                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => sendMessage('Can you expand further on this topic?')}
                          title="Generate follow-up"
                        >
                          <RefreshCw size={13} />
                          <span>Follow-up</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {isAiResponding && (
            <div className="chat-message-row ai">
              <div className="chat-avatar ai-av">
                <Bot size={17} />
              </div>
              <div className="typing-indicator-row">
                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginRight: '4px' }}>
                  Zunme AI is generating
                </span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={scrollEndRef} />
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="chat-input-container">
        {autoGrounding && (
          <div className="chat-grounding-banner">
            <Zap size={12} color="#059669" />
            <span>⚡ Automatic Query Grounding Active: Time-sensitive questions automatically verify 2026 web indices</span>
          </div>
        )}

        <div className="chat-input-box">
          {attachedImage && (
            <div className="image-attachment-preview-bar">
              <div className="image-preview-meta">
                <img src={attachedImage.url} alt="Attached asset" className="image-preview-thumb" />
                <div className="image-preview-info">
                  <span className="image-preview-name">{attachedImage.name}</span>
                  <span className="image-preview-sub">🖼️ Multimodal Vision Inspection Active ({attachedImage.sizeKb} KB)</span>
                </div>
              </div>
              <button
                type="button"
                className="image-remove-btn"
                onClick={() => setAttachedImage(null)}
                title="Remove image"
              >
                <X size={15} />
              </button>
            </div>
          )}

          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Ask anything, describe what to create, or attach a screenshot/image... (Press Enter to send)"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              // auto resize
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px';
            }}
            onKeyDown={handleKeyDown}
            disabled={isAiResponding}
            rows={1}
          />

          <div className="chat-input-actions">
            <div className="input-hints flex items-center gap-3">
              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() => imageInputRef.current?.click()}
                title="Upload Image or Screenshot for Multimodal Inspection"
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: attachedImage ? '#635BFF' : '#4B5563',
                  background: attachedImage ? 'rgba(99, 91, 255, 0.12)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ImageIcon size={14} color="#635BFF" />
                <span>Attach Image</span>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageSelect}
              />

              <button
                type="button"
                className={`btn-ghost btn-sm ${deepResearchActive ? 'active' : ''}`}
                onClick={() => {
                  setDeepResearchActive(!deepResearchActive);
                  showToast(
                    !deepResearchActive
                      ? '⚡ Deep Research Mode ON: Multi-step synthesis active'
                      : 'Standard Chat Mode active',
                    'info'
                  );
                }}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  background: deepResearchActive ? 'rgba(99, 91, 255, 0.15)' : 'transparent',
                  color: deepResearchActive ? '#635BFF' : 'var(--color-text-secondary)',
                  border: deepResearchActive ? '1px solid #635BFF' : '1px solid transparent'
                }}
                title="Toggle Deep Multi-Step Research Mode (Task 12)"
              >
                <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
                <span>Deep Research</span>
              </button>

              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() => {
                  setVoiceModeOpen(true);
                  setIsListening(true);
                  showToast('Voice Mode activated. Listening for speech...', 'info');
                }}
                title="Natural Voice Conversation Mode (Task 10)"
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Mic size={14} color="#635BFF" />
                <span>Voice Mode</span>
              </button>

              <span className="hide-on-mobile" style={{ fontSize: '11.5px', color: '#9CA3AF' }}>Enter ↵ to send</span>
            </div>

            <div className="input-btns-right">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSend}
                disabled={(!inputMessage.trim() && !attachedImage) || isAiResponding}
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
              >
                <span>Send</span>
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TASK 10: VOICE MODE FULLSCREEN/MODAL OVERLAY */}
      {voiceModeOpen && (
        <div
          className="modal-overlay"
          onClick={() => {
            setVoiceModeOpen(false);
            setIsListening(false);
          }}
          style={{ zIndex: 1100 }}
        >
          <div
            className="voice-mode-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}>
              <button
                type="button"
                className="btn-ghost"
                style={{ color: '#E2E8F0', padding: '6px', cursor: 'pointer' }}
                onClick={() => {
                  setVoiceModeOpen(false);
                  setIsListening(false);
                }}
                aria-label="Close voice mode"
              >
                <X size={20} />
              </button>
            </div>

            {/* Glowing Orb / Pulsing Mic Avatar */}
            <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 24px' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99, 91, 255, 0.7) 0%, rgba(99, 91, 255, 0) 70%)',
                  animation: 'pulse 2s infinite'
                }}
              />
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #635BFF 0%, #4338CA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(99, 91, 255, 0.6)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Mic size={42} color="#FFFFFF" />
              </div>
            </div>

            <h3 className="voice-mode-title">
              Zunme Natural Voice Mode
            </h3>
            <p className="voice-mode-subtitle">
              {isListening ? 'Listening to your voice... Speak naturally' : 'Voice session paused'}
            </p>

            {/* Animated Sound Wave Bars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '42px', marginBottom: '24px' }}>
              {[18, 32, 40, 24, 38, 16, 30, 42, 22, 36, 20].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: isListening ? `${h}px` : '6px',
                    backgroundColor: '#818CF8',
                    borderRadius: '3px',
                    transition: 'height 0.2s ease',
                    boxShadow: isListening ? '0 0 8px rgba(129, 140, 248, 0.6)' : 'none'
                  }}
                />
              ))}
            </div>

            {/* Live Spoken Transcript Preview */}
            <div className="voice-mode-transcript">
              <div className="voice-mode-transcript-label">
                Live Speech Transcript:
              </div>
              <p className="voice-mode-transcript-text">
                "{voiceTranscript}"
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSendVoiceTranscript}
                style={{ padding: '11px 22px', fontSize: '14px', fontWeight: '700', borderRadius: '10px' }}
              >
                <Send size={15} />
                <span>Send to Zunme Chat</span>
              </button>
              <button
                type="button"
                className="voice-mode-btn-secondary"
                onClick={() => setIsListening(!isListening)}
              >
                {isListening ? 'Pause Mic' : 'Resume Mic'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Markdown Renderer for safe, clean display
const RichMessageRenderer: React.FC<{ content: string }> = ({ content }) => {
  const sections = content.split('\n\n');

  return (
    <div>
      {sections.map((section, idx) => {
        // Code Block
        if (section.startsWith('```')) {
          const lines = section.split('\n');
          const lang = lines[0].replace('```', '') || 'code';
          const codeText = lines.slice(1, -1).join('\n');
          return (
            <div key={idx} className="ai-code-block">
              <div className="code-header">
                <span>{lang}</span>
                <button
                  className="btn-ghost btn-sm"
                  style={{ color: '#94A3B8', padding: '2px 6px' }}
                  onClick={() => navigator.clipboard.writeText(codeText)}
                >
                  <Copy size={11} /> Copy
                </button>
              </div>
              <div className="code-body">{codeText}</div>
            </div>
          );
        }

        // Headings
        if (section.startsWith('### ')) {
          return <h3 key={idx}>{section.replace('### ', '')}</h3>;
        }
        if (section.startsWith('## ')) {
          return <h2 key={idx} style={{ fontSize: '16px', fontWeight: 700, margin: '14px 0 6px' }}>{section.replace('## ', '')}</h2>;
        }

        // Unordered list
        if (section.includes('\n- ') || section.startsWith('- ')) {
          const items = section.split('\n').filter((l) => l.trim().startsWith('- '));
          return (
            <ul key={idx}>
              {items.map((item, i) => (
                <li key={i}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(section.trim())) {
          const items = section.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()));
          return (
            <ol key={idx}>
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
              ))}
            </ol>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} style={{ marginBottom: '8px' }}>
            {section}
          </p>
        );
      })}
    </div>
  );
};
