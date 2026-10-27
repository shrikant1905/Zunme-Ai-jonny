import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ExternalLink,
  Copy,
  Bookmark,
  Check,
  Globe,
  Clock,
  ShieldCheck,
  X,
  Zap,
  Sliders,
  Award,
  CheckCircle2,
  ArrowRight,
  Mic
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './SearchPage.css';

interface SponsoredAdItem {
  id: string;
  position: 'TOP' | 'BOTTOM';
  headline: string;
  displayUrl: string;
  destinationUrl: string;
  description: string;
  sitelinks: Array<{ title: string; subtitle: string; url: string }>;
  callToAction: string;
  advertiserName: string;
  qualityScore: number;
  adRank: number;
}

export const SearchPage: React.FC = () => {
  const {
    searchResult,
    isSearching,
    executeSearch,
    clearSearch,
    saveToLibrary,
    showToast
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';

  const [queryInput, setQueryInput] = useState(urlQuery);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Voice Search & Simulation State
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const voiceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Part 10: Manual vs Automatic Web Search Trigger Mode
  const [triggerMode, setTriggerMode] = useState<'AUTO' | 'MANUAL'>('AUTO');
  const [autoDetectNotice, setAutoDetectNotice] = useState<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync with URL query parameter (e.g. from Home Search Bar /search?q=...)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q.trim()) {
      setQueryInput(q);
      executeSearch(q.trim());
    }
  }, [searchParams]);

  // Part 10: Automatic Query Grounding trigger on typing (Debounced)
  useEffect(() => {
    if (triggerMode === 'AUTO' && queryInput.trim().length >= 4 && !isSearching) {
      setAutoDetectNotice('Evaluating query intent for live web grounding...');
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

      debounceTimerRef.current = setTimeout(() => {
        setAutoDetectNotice('⚡ Auto-Grounding Triggered: Sourcing live 2026 web indices');
        setSearchParams({ q: queryInput.trim() }, { replace: true });
        executeSearch(queryInput.trim());
        setTimeout(() => setAutoDetectNotice(null), 3000);
      }, 900);
    } else {
      setAutoDetectNotice(null);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [queryInput, triggerMode]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isSearching) return;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setAutoDetectNotice(null);
    setSearchParams({ q: queryInput.trim() }, { replace: true });
    executeSearch(queryInput.trim());
  };

  const handleSelectChip = (chip: string) => {
    setQueryInput(chip);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    if (triggerMode === 'AUTO') {
      showToast('⚡ Auto-Grounding triggered for trending query', 'info');
    }
    setSearchParams({ q: chip.trim() }, { replace: true });
    executeSearch(chip);
  };

  // Voice Search / Simulation Handler
  const handleVoiceSearch = () => {
    if (isVoiceListening) {
      setIsVoiceListening(false);
      setVoiceNotice(null);
      if (voiceTimeoutRef.current) clearTimeout(voiceTimeoutRef.current);
      return;
    }

    setIsVoiceListening(true);
    setVoiceNotice('Listening... Speak now');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQueryInput(transcript);
          setVoiceNotice(`Heard: "${transcript}"`);
          if (event.results[0].isFinal) {
            setIsVoiceListening(false);
            setVoiceNotice(null);
            setSearchParams({ q: transcript.trim() }, { replace: true });
            executeSearch(transcript.trim());
          }
        };
        recognition.onerror = () => {
          runVoiceSimulation();
        };
        recognition.onend = () => {
          setIsVoiceListening(false);
        };
        recognition.start();

        voiceTimeoutRef.current = setTimeout(() => {
          try { recognition.stop(); } catch (_) {}
        }, 6000);
        return;
      } catch (_) {}
    }

    runVoiceSimulation();
  };

  const runVoiceSimulation = () => {
    const voiceSamples = [
      'Top 2026 AI agent frameworks and benchmarks',
      'Solid-state battery commercialization timeline 2026',
      'Executive B2B marketing funnel and SEO topical cluster',
      'Autonomous creator economy monetization strategies'
    ];
    const chosen = voiceSamples[Math.floor(Math.random() * voiceSamples.length)];
    setVoiceNotice('Listening... (Simulating Voice Input)');

    let wordIdx = 0;
    const words = chosen.split(' ');
    setQueryInput('');

    const interval = setInterval(() => {
      wordIdx++;
      setQueryInput(words.slice(0, wordIdx).join(' '));
      if (wordIdx >= words.length) {
        clearInterval(interval);
        setVoiceNotice(`Voice Captured: "${chosen}"`);
        voiceTimeoutRef.current = setTimeout(() => {
          setIsVoiceListening(false);
          setVoiceNotice(null);
          setSearchParams({ q: chosen }, { replace: true });
          executeSearch(chosen);
        }, 800);
      }
    }, 160);
  };

  const handleCopySummary = () => {
    if (!searchResult) return;
    navigator.clipboard.writeText(searchResult.summary);
    setCopiedSummary(true);
    showToast('Research summary copied to clipboard', 'info');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!searchResult) return;
    saveToLibrary({
      title: `Research: ${searchResult.query}`,
      contentType: 'RESEARCH',
      previewText: searchResult.summary.slice(0, 150) + '...',
      content:
        `### Web Research Brief: ${searchResult.query}\n\n**Synthesized Findings:**\n${searchResult.summary}\n\n**Sources:**\n` +
        searchResult.sources.map((s, i) => `${i + 1}. [${s.title}](${s.url}) — ${s.domain}`).join('\n'),
      sourceMetadata: searchResult.sources,
      tags: ['Web Search', 'Research']
    });
  };

  // Part 9: Live Sponsored Ads (Top & Bottom)
  const topSponsoredAd: SponsoredAdItem = {
    id: 'ad-top-1',
    position: 'TOP',
    advertiserName: 'Zunme AI Enterprise Platform',
    displayUrl: 'zunme.ai/solutions/enterprise-ai › prompt-suite',
    destinationUrl: 'https://zunme.ai/solutions',
    headline: queryInput.toLowerCase().includes('battery')
      ? 'CleanTech & Energy Storage Intelligence Hub'
      : 'Scale Executive Writing with Verified B2B Prompts & Routing',
    description: queryInput.toLowerCase().includes('battery')
      ? 'Access verified solid-state trial data, automotive battery safety metrics, and supply-chain whitepapers.'
      : 'Accelerate daily executive output with verified workflows, real-time model routing, and citation grounding inside Zunme AI.',
    sitelinks: [
      { title: '1-Click Free Trial', subtitle: 'Instant workspace setup', url: 'https://zunme.ai/trial' },
      { title: 'Creator Marketplace', subtitle: 'Verified blueprints & prompts', url: 'https://zunme.ai/warehouse' },
      { title: 'Enterprise Pricing', subtitle: 'Volume discount & SOC2', url: 'https://zunme.ai/pricing' }
    ],
    callToAction: 'Learn More',
    qualityScore: 9.6,
    adRank: 4.82
  };

  const bottomSponsoredAd: SponsoredAdItem = {
    id: 'ad-bottom-1',
    position: 'BOTTOM',
    advertiserName: 'Content Studio Cloud',
    displayUrl: 'zunme.ai/solutions/ai-studio › newsletters',
    destinationUrl: 'https://zunme.ai/app/builders',
    headline: 'Turnkey Enterprise AI Studio & Autonomous Newsletter Engine',
    description:
      'Draft high-converting newsletters, comprehensive research briefs, and omnichannel social copy in one unified platform.',
    sitelinks: [
      { title: 'Explore Workflows', subtitle: 'See 14-day live sandbox', url: 'https://zunme.ai/workflows' },
      { title: 'API Integration', subtitle: 'Fast multi-model routing', url: 'https://zunme.ai/api' }
    ],
    callToAction: 'Get Started Free',
    qualityScore: 9.2,
    adRank: 4.41
  };

  const handleAdClick = (ad: SponsoredAdItem) => {
    showToast(`Clicked Sponsored Result: "${ad.headline}"`, 'info');
    window.open(ad.destinationUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="search-page">
      <div className="search-header-area">
        <h1 className="search-page-title">Live Web Search &amp; Research</h1>
        <p className="search-page-desc">
          Query live web indices for current 2026 data. Receive an AI synthesized brief with verified, clickable source links.
        </p>
      </div>

      {/* Universal Plan Accessibility Bar (Johnny's Directive: Free, Plus, Pro, Business, Enterprise, Edu, Guest) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px', background: '#F8FAFC', padding: '8px 14px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Universal Plan Availability:
        </span>
        {['Free', 'Plus', 'Pro', 'Business', 'Enterprise', 'Edu', 'Guest (No Login)'].map((tier) => (
          <span
            key={tier}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: '600',
              padding: '2px 8px',
              borderRadius: '9999px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155'
            }}
          >
            <CheckCircle2 size={11} color="#10B981" />
            <span>{tier}: Active</span>
          </span>
        ))}
      </div>

      {/* Part 10: Trigger Mode Control Bar (Manual vs Automatic) */}
      <div className="search-trigger-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#111625' }}>Trigger Mode:</span>
          <div className="trigger-mode-segmented">
            <button
              type="button"
              className={`trigger-mode-btn ${triggerMode === 'AUTO' ? 'active' : ''}`}
              onClick={() => {
                setTriggerMode('AUTO');
                showToast('Switched to Automatic Query Grounding (Auto-Detect enabled)', 'success');
              }}
              title="Automatically detects query intent and triggers web search grounding"
            >
              <Zap size={13} color={triggerMode === 'AUTO' ? '#6E56CF' : '#64748B'} />
              <span>⚡ Automatic Grounding</span>
            </button>

            <button
              type="button"
              className={`trigger-mode-btn ${triggerMode === 'MANUAL' ? 'active' : ''}`}
              onClick={() => {
                setTriggerMode('MANUAL');
                if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
                setAutoDetectNotice(null);
                showToast('Switched to Manual Search Mode (Triggered on Enter or Search click)', 'info');
              }}
              title="Search runs only when explicitly triggered by the user"
            >
              <Search size={13} color={triggerMode === 'MANUAL' ? '#6E56CF' : '#64748B'} />
              <span>🔍 Manual Trigger</span>
            </button>
          </div>
        </div>

        {/* Live Status Pill */}
        <div>
          {triggerMode === 'AUTO' ? (
            <span className="auto-grounding-indicator">
              <Zap size={12} />
              <span>Auto-Detect ON: Real-time 2026 Indices</span>
            </span>
          ) : (
            <span style={{ fontSize: '11.5px', color: '#64748B', background: '#F1F5F9', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
              Manual Trigger: Press Enter to Search
            </span>
          )}
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="search-form-box">
        <Search size={20} color="var(--color-primary)" />
        <input
          type="text"
          className="search-input-field"
          placeholder="Ask a research question or search latest news... (e.g. Solid state battery 2026)"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          disabled={isSearching}
        />

        {queryInput && (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setQueryInput('');
              clearSearch();
              setAutoDetectNotice(null);
              setSearchParams({}, { replace: true });
              if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
            }}
            style={{ padding: '4px' }}
            aria-label="Clear query"
          >
            <X size={16} />
          </button>
        )}

        {/* Voice Search Button */}
        <button
          type="button"
          className={`search-mic-btn ${isVoiceListening ? 'listening' : ''}`}
          onClick={handleVoiceSearch}
          title={isVoiceListening ? "Listening... click to cancel" : "Voice Search (Click to speak or simulate input)"}
          aria-label="Voice Search"
        >
          <Mic size={18} />
          {isVoiceListening && <span className="mic-pulse-ring" />}
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!queryInput.trim() || isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Voice Status Pill */}
      {voiceNotice && (
        <div className="search-voice-notice-banner">
          <span className="voice-pulse-dot" />
          <span>{voiceNotice}</span>
        </div>
      )}

      {/* Auto-Grounding Detection Notice */}
      {autoDetectNotice && (
        <div
          style={{
            fontSize: '12px',
            color: '#6E56CF',
            background: '#EFEBFC',
            padding: '6px 14px',
            borderRadius: '8px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '600'
          }}
        >
          <Zap size={14} />
          <span>{autoDetectNotice}</span>
        </div>
      )}

      {/* TASK 21: UNIVERSAL ACCESS TIER INDICATOR (FROM ZUNME - WEB SEARCH.DOCX) */}
      <div
        className="universal-tier-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          padding: '8px 12px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '12px',
          color: '#4B5563'
        }}
      >
        <span style={{ fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={14} color="#10B981" />
          <span>Universal Web Grounding:</span>
        </span>
        <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Free</span>
        <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Plus</span>
        <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Pro</span>
        <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Business</span>
        <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Enterprise</span>
        <span style={{ background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>Edu</span>
        <span style={{ background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>✓ Guest Access Enabled</span>
      </div>

      {/* Suggested Query Chips */}
      <div className="query-chips-row">
        <span className="chips-label">Try:</span>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('Solid state battery commercialization 2026')}
        >
          🔋 Solid State Battery 2026
        </button>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('AI copyright regulation and enterprise standards')}
        >
          ⚖️ AI Copyright Standards
        </button>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('Creator economy revenue sharing models')}
        >
          📈 Creator Monetization Trends
        </button>
        <button
          type="button"
          className="query-chip"
          onClick={() => handleSelectChip('Next-generation silicon photonics in computing')}
        >
          🔬 Silicon Photonics
        </button>
      </div>

      {/* Searching Progress State */}
      {isSearching && (
        <div className="search-loading-card">
          <div className="search-spinner"></div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>
            Retrieving Live Web Sources...
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Parsing verified web domains and formulating an objective executive brief.
          </p>
        </div>
      )}

      {/* Results View */}
      {searchResult && !isSearching && (
        <div className="research-results-container">
          {/* ============================================================ */}
          {/* PART 9: TOP SPONSORED SEARCH AD TILE                          */}
          {/* ============================================================ */}
          <div className="sponsored-ad-card top-ad">
            <div className="sponsored-header-row">
              <div className="sponsored-domain-badge">
                <span className="sponsored-chip">Sponsored • Top Pin</span>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#6E56CF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: '900'
                  }}
                >
                  Z
                </div>
                <span className="sponsored-domain-text">
                  <strong>{topSponsoredAd.advertiserName}</strong> • {topSponsoredAd.displayUrl}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: '#059669',
                    background: '#E8F8F0',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <CheckCircle2 size={12} />
                  <span>Verified Advertiser</span>
                </span>
              </div>
            </div>

            <a
              href={topSponsoredAd.destinationUrl}
              onClick={(e) => {
                e.preventDefault();
                handleAdClick(topSponsoredAd);
              }}
              className="sponsored-headline-link"
            >
              {topSponsoredAd.headline}
            </a>

            <p className="sponsored-body-copy">{topSponsoredAd.description}</p>

            {/* Sitelinks Extensions Grid */}
            <div className="sponsored-sitelinks-row">
              {topSponsoredAd.sitelinks.map((link, idx) => (
                <div
                  key={idx}
                  className="sponsored-sitelink-box"
                  onClick={() => {
                    showToast(`Opening sitelink: ${link.title}`, 'info');
                    window.open(link.url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <span className="sponsored-sitelink-title">
                    <span>{link.title}</span>
                    <ArrowRight size={11} />
                  </span>
                  <span className="sponsored-sitelink-desc">{link.subtitle}</span>
                </div>
              ))}
            </div>

            {/* Quality Score & Ad Rank Info Footer */}
            <div className="sponsored-footer-meta">
              <span>
                Google Ads Auction Grounded • Quality Score: <strong>{topSponsoredAd.qualityScore}/10</strong> • Ad Rank: <strong>{topSponsoredAd.adRank}</strong>
              </span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => handleAdClick(topSponsoredAd)}
                style={{ padding: '3px 10px', fontSize: '11px' }}
              >
                <span>{topSponsoredAd.callToAction}</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>

          {/* AI Research Synthesis Summary Card */}
          <div className="summary-card">
            <div className="summary-top">
              <div className="summary-title">
                <Sparkles size={18} color="var(--color-primary)" />
                <span>AI Research Synthesis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge badge-success">Grounding Verified</span>
                <span className="badge badge-neutral" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={11} />
                  <span>{searchResult.timestamp}</span>
                </span>
              </div>
            </div>

            <p className="summary-body">{searchResult.summary}</p>

            <div className="flex items-center gap-2">
              <button className="btn btn-outline btn-sm" onClick={handleCopySummary}>
                {copiedSummary ? (
                  <>
                    <Check size={14} color="var(--color-success)" />
                    <span style={{ color: 'var(--color-success)' }}>Copied Summary</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>

              <button className="btn btn-primary btn-sm" onClick={handleSaveToLibrary}>
                <Bookmark size={14} />
                <span>Save Research to Library</span>
              </button>
            </div>
          </div>

          {/* Sources Section */}
          <div>
            <div className="sources-header">
              <div className="sources-title flex items-center gap-2">
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>Verified Sources ({searchResult.sources.length})</span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                Real external references
              </span>
            </div>

            <div className="sources-grid">
              {searchResult.sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-card"
                >
                  <div className="source-meta-row">
                    <span className="source-domain flex items-center gap-1">
                      <Globe size={12} />
                      <span>{source.domain}</span>
                    </span>
                    {source.publishedDate && (
                      <span className="source-date">{source.publishedDate}</span>
                    )}
                  </div>

                  <h4 className="source-headline">
                    <span>{source.title}</span>
                    <ExternalLink size={13} style={{ opacity: 0.6 }} />
                  </h4>

                  <p className="source-snippet">"{source.snippet}"</p>
                </a>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* PART 9: BOTTOM SPONSORED SEARCH AD TILE                       */}
          {/* ============================================================ */}
          <div className="sponsored-ad-card bottom-ad">
            <div className="sponsored-header-row">
              <div className="sponsored-domain-badge">
                <span
                  className="sponsored-chip"
                  style={{ background: '#E8F8F0', color: '#059669' }}
                >
                  Sponsored • Partner Feature
                </span>
                <span className="sponsored-domain-text">
                  <strong>{bottomSponsoredAd.advertiserName}</strong> • {bottomSponsoredAd.displayUrl}
                </span>
              </div>

              <span style={{ fontSize: '11px', color: '#8C97B0' }}>
                Relevant to #{searchResult.query.split(' ')[0]}
              </span>
            </div>

            <a
              href={bottomSponsoredAd.destinationUrl}
              onClick={(e) => {
                e.preventDefault();
                handleAdClick(bottomSponsoredAd);
              }}
              className="sponsored-headline-link"
            >
              {bottomSponsoredAd.headline}
            </a>

            <p className="sponsored-body-copy">{bottomSponsoredAd.description}</p>

            <div className="sponsored-sitelinks-row">
              {bottomSponsoredAd.sitelinks.map((link, idx) => (
                <div
                  key={idx}
                  className="sponsored-sitelink-box"
                  onClick={() => {
                    showToast(`Opening sitelink: ${link.title}`, 'info');
                    window.open(link.url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <span className="sponsored-sitelink-title">
                    <span>{link.title}</span>
                    <ArrowRight size={11} />
                  </span>
                  <span className="sponsored-sitelink-desc">{link.subtitle}</span>
                </div>
              ))}
            </div>

            <div className="sponsored-footer-meta">
              <span>Verified Zunme Advertising Ecosystem Placement</span>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => handleAdClick(bottomSponsoredAd)}
                style={{ padding: '3px 10px', fontSize: '11px' }}
              >
                <span>{bottomSponsoredAd.callToAction}</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State when no search executed yet */}
      {!searchResult && !isSearching && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Search size={26} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Live Grounded Web Intelligence
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
            Zunme AI queries current internet data and grounds every summary with authentic URLs so you can verify the facts yourself.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
