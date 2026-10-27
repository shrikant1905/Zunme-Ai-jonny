import React, { useState } from 'react';
import {
  Video,
  Sparkles,
  Download,
  Bookmark,
  Copy,
  Check,
  Clock,
  Eye,
  Layers,
  FileText,
  Volume2,
  Tv
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './StudioStyles.css';

export interface ScriptScene {
  id: string;
  sceneNumber: number;
  timestamp: string;
  bRollVisual: string;
  voiceover: string;
  onScreenText: string;
}

export interface GeneratedVideoScript {
  id: string;
  topic: string;
  platform: 'YouTube Long-form' | 'TikTok' | 'Instagram Reel' | 'LinkedIn Video';
  duration: '30s' | '60s' | '3-5min';
  hookStyle: 'Curiosity Gap' | 'Contrarian Hot Take' | 'Data Shock' | 'Story Loop';
  scenes: ScriptScene[];
  createdAt: string;
}

const DEFAULT_SCRIPT: GeneratedVideoScript = {
  id: 'script-sample',
  topic: 'Why AI Autonomous Agent Workflows Are Replacing Traditional SaaS Tools in 2026',
  platform: 'YouTube Long-form',
  duration: '3-5min',
  hookStyle: 'Contrarian Hot Take',
  createdAt: '2026-10-15',
  scenes: [
    {
      id: 'sc-1',
      sceneNumber: 1,
      timestamp: '0:00 - 0:15',
      bRollVisual: 'Fast cut montage: Person struggling with 8 browser tabs, closing windows in frustration, followed by crisp snap zoom on modern dark-mode AI terminal.',
      voiceover: '"If your team is still paying for 7 different software subscriptions just to write, research, and format content... you are already operating 2 years in the past."',
      onScreenText: '🚨 Standard SaaS Is Dying'
    },
    {
      id: 'sc-2',
      sceneNumber: 2,
      timestamp: '0:15 - 0:55',
      bRollVisual: 'Split screen comparing manual copy-paste workflow vs autonomous Zunme AI workspace executing web citations and drafts in 400ms.',
      voiceover: '"Autonomous agents don\'t just chat with you. They actively ground themselves with real-time web verification, draft multi-channel copy, and store everything in an indexed warehouse."',
      onScreenText: '⚡ The Autonomous Shift'
    },
    {
      id: 'sc-3',
      sceneNumber: 3,
      timestamp: '0:55 - 2:30',
      bRollVisual: 'Screen recording walkthrough of live search citations, turning bullet points into a 3-part B2B email sequence.',
      voiceover: '"Watch what happens when we ask for a verified outreach framework. Instead of generic hallucinations, it cites active SEC filings and news sources with zero latency."',
      onScreenText: '🔍 100% Verified Citations'
    },
    {
      id: 'sc-4',
      sceneNumber: 4,
      timestamp: '2:30 - 3:00',
      bRollVisual: 'Host looking directly at camera, soft background bokeh, hand gesture pointing toward description link.',
      voiceover: '"The creators and founders winning right now aren\'t working harder. They\'ve built an integrated AI ecosystem. Click below to explore the Zunme blueprints."',
      onScreenText: '🔗 Get The Blueprint Below'
    }
  ]
};

export const VideoScriptStudio: React.FC = () => {
  const { showToast, saveToLibrary } = useApp();

  const [topic, setTopic] = useState('Why AI Autonomous Agent Workflows Are Replacing Traditional SaaS Tools in 2026');
  const [platform, setPlatform] = useState<'YouTube Long-form' | 'TikTok' | 'Instagram Reel' | 'LinkedIn Video'>('YouTube Long-form');
  const [duration, setDuration] = useState<'30s' | '60s' | '3-5min'>('3-5min');
  const [hookStyle, setHookStyle] = useState<'Curiosity Gap' | 'Contrarian Hot Take' | 'Data Shock' | 'Story Loop'>('Contrarian Hot Take');
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<GeneratedVideoScript>(DEFAULT_SCRIPT);
  const [copiedScript, setCopiedScript] = useState(false);

  const handleGenerateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      showToast('Please provide a video topic or concept', 'warning');
      return;
    }

    setIsGenerating(true);
    showToast('Synthesizing structured video scenes...', 'info');

    setTimeout(() => {
      let generatedScenes: ScriptScene[] = [];

      if (duration === '30s') {
        generatedScenes = [
          {
            id: `sc-${Date.now()}-1`,
            sceneNumber: 1,
            timestamp: '0:00 - 0:05',
            bRollVisual: 'Bold typographic flash on screen with ambient sunset purple flare.',
            voiceover: `"Stop scrolling if you create content with AI. 99% of people are using ChatGPT completely wrong."`,
            onScreenText: '⚠️ STOP SCROLLING'
          },
          {
            id: `sc-${Date.now()}-2`,
            sceneNumber: 2,
            timestamp: '0:05 - 0:22',
            bRollVisual: 'Rapid 3-step screen grab showing prompt -> verified sources -> exportable blueprint.',
            voiceover: `"Here is the exact 3-step prompt chain you need for high-converting hooks without sounding robotic."`,
            onScreenText: '💡 The 3-Step Chain'
          },
          {
            id: `sc-${Date.now()}-3`,
            sceneNumber: 3,
            timestamp: '0:22 - 0:30',
            bRollVisual: 'Creator smiling with clear gesture toward comment section.',
            voiceover: `"Save this video right now before you lose it, and check the caption for the free template."`,
            onScreenText: '📌 Save For Later'
          }
        ];
      } else {
        generatedScenes = [
          {
            id: `sc-${Date.now()}-1`,
            sceneNumber: 1,
            timestamp: '0:00 - 0:15',
            bRollVisual: 'High-contrast cinematic b-roll with subtle glitch text transition.',
            voiceover: `"Here is the brutal truth about ${topic}: what worked last year will quietly bankrupt your attention this year."`,
            onScreenText: `🎯 ${hookStyle.toUpperCase()}`
          },
          {
            id: `sc-${Date.now()}-2`,
            sceneNumber: 2,
            timestamp: '0:15 - 1:15',
            bRollVisual: 'Data chart animation showing 300% velocity improvement with connected workspaces.',
            voiceover: `"When you decouple research from drafting, your creative cognitive load drops to zero. That is why unified platforms are taking over."`,
            onScreenText: '📊 The Velocity Multiplier'
          },
          {
            id: `sc-${Date.now()}-3`,
            sceneNumber: 3,
            timestamp: '1:15 - 2:30',
            bRollVisual: 'Live screencast of prompt instructions generating 3 customized variants in real time.',
            voiceover: `"Let us break down the exact execution framework step-by-step so you can replicate this in your own workspace today."`,
            onScreenText: '⚡ Step-by-Step Blueprint'
          },
          {
            id: `sc-${Date.now()}-4`,
            sceneNumber: 4,
            timestamp: '2:30 - 3:00',
            bRollVisual: 'Clean end card with logo and next-video suggestion tile.',
            voiceover: `"Drop your biggest bottleneck in the comments, and subscribe for weekly autonomous AI playbooks."`,
            onScreenText: '🔔 Subscribe for More'
          }
        ];
      }

      const newScript: GeneratedVideoScript = {
        id: `script-${Date.now()}`,
        topic: topic.trim(),
        platform,
        duration,
        hookStyle,
        scenes: generatedScenes,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setScript(newScript);
      setIsGenerating(false);
      showToast('Video script synthesized successfully!', 'success');
    }, 1100);
  };

  const handleCopyFormattedScript = () => {
    let text = `# Video Script: ${script.topic}\nPlatform: ${script.platform} | Duration: ${script.duration} | Hook: ${script.hookStyle}\n\n`;
    script.scenes.forEach((sc) => {
      text += `--- SCENE ${sc.sceneNumber} (${sc.timestamp}) ---\n`;
      text += `[VISUAL]: ${sc.bRollVisual}\n`;
      text += `[AUDIO]: ${sc.voiceover}\n`;
      text += `[OVERLAY]: ${sc.onScreenText}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    showToast('Full script copied to clipboard', 'info');
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleSaveToMyLibrary = () => {
    saveToLibrary({
      title: `[Video Script] ${script.topic}`,
      contentType: 'TEXT',
      previewText: script.scenes[0]?.voiceover || 'Video script blueprint',
      content: JSON.stringify(script, null, 2),
      tags: ['VideoScript', script.platform, script.duration]
    });
    showToast('Script saved to Personal Library!', 'success');
  };

  const handleExportMarkdown = () => {
    let text = `# Video Production Script: ${script.topic}\n\n`;
    text += `**Target Platform:** ${script.platform}\n`;
    text += `**Planned Duration:** ${script.duration}\n`;
    text += `**Hook Framework:** ${script.hookStyle}\n`;
    text += `**Date:** ${script.createdAt}\n\n`;
    text += `## Scene Breakdown\n\n`;

    script.scenes.forEach((sc) => {
      text += `### Scene ${sc.sceneNumber} (${sc.timestamp})\n`;
      text += `- **Visual Direction & B-Roll:** ${sc.bRollVisual}\n`;
      text += `- **Voiceover / Spoken Script:** *${sc.voiceover}*\n`;
      text += `- **On-Screen Text Overlay:** \`${sc.onScreenText}\`\n\n`;
    });

    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${script.topic.toLowerCase().replace(/[^a-z0-9]/g, '_')}_script.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported script as markdown (.md)', 'success');
  };

  return (
    <div className="video-studio-layout">
      {/* Script Generator Controls Column */}
      <div className="image-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F0F3FA', paddingBottom: '12px' }}>
          <Video size={20} color="#6E56CF" />
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#111625', margin: 0 }}>
            AI Video Script Engine
          </h2>
        </div>

        <form onSubmit={handleGenerateScript} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="studio-form-group">
            <label className="studio-label">Video Concept / Core Topic *</label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="e.g., Why B2B cold outbound email is dead and how autonomous agents get 42% reply rates..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="studio-form-group">
              <label className="studio-label">Target Platform</label>
              <select
                className="input-field"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
              >
                <option value="YouTube Long-form">YouTube Long-form</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram Reel">Instagram Reel</option>
                <option value="LinkedIn Video">LinkedIn Video</option>
              </select>
            </div>

            <div className="studio-form-group">
              <label className="studio-label">Duration</label>
              <select
                className="input-field"
                value={duration}
                onChange={(e) => setDuration(e.target.value as any)}
              >
                <option value="30s">30s Short-Form</option>
                <option value="60s">60s Explainer</option>
                <option value="3-5min">3-5 min Deep Dive</option>
              </select>
            </div>
          </div>

          <div className="studio-form-group">
            <label className="studio-label">Hook Psychology Style</label>
            <select
              className="input-field"
              value={hookStyle}
              onChange={(e) => setHookStyle(e.target.value as any)}
            >
              <option value="Contrarian Hot Take">Contrarian Hot Take (High Tension)</option>
              <option value="Curiosity Gap">Curiosity Gap (Open Loops)</option>
              <option value="Data Shock">Data Shock (Numbers & Proof)</option>
              <option value="Story Loop">Story Loop (Narrative Arc)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isGenerating}
            style={{ padding: '12px' }}
          >
            {isGenerating ? (
              <>
                <Sparkles size={15} className="spinner" />
                <span>Generating Scene Architecture...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>Generate Video Script</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Script Scenes Breakdown Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '14px 20px', borderRadius: 'var(--radius-xl)', border: '1px solid #E8ECF5', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{script.platform}</span>
              <span className="badge badge-neutral">{script.duration}</span>
              <span className="badge badge-neutral">{script.hookStyle}</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: '6px 0 0 0' }}>
              {script.topic}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-outline btn-sm" onClick={handleCopyFormattedScript}>
              {copiedScript ? <Check size={13} color="#059669" /> : <Copy size={13} />}
              <span>{copiedScript ? 'Copied' : 'Copy'}</span>
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleSaveToMyLibrary}>
              <Bookmark size={13} />
              <span>Save to Library</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleExportMarkdown}>
              <Download size={13} />
              <span>Export Script (.md)</span>
            </button>
          </div>
        </div>

        {/* Scene-by-Scene Timeline */}
        <div className="video-scene-timeline">
          {script.scenes.map((sc) => (
            <div key={sc.id} className="scene-card">
              <div className="scene-header">
                <span className="scene-timestamp-badge">
                  <Clock size={12} />
                  <span>Scene {sc.sceneNumber} • {sc.timestamp}</span>
                </span>
                <span className="scene-caption-pill">
                  <Tv size={12} />
                  <span>Overlay: {sc.onScreenText}</span>
                </span>
              </div>

              {/* B-Roll Visual Direction */}
              <div className="scene-broll-box">
                <Eye size={15} color="#6E56CF" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: '11.5px', color: '#111625', display: 'block', textTransform: 'uppercase' }}>
                    Visual B-Roll Recommendation
                  </strong>
                  <span>{sc.bRollVisual}</span>
                </div>
              </div>

              {/* Voiceover Script */}
              <div className="scene-voiceover-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6E56CF', fontStyle: 'normal', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>
                  <Volume2 size={13} />
                  <span>Voiceover / Spoken Audio</span>
                </div>
                <span>{sc.voiceover}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
