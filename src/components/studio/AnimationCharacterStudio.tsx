import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  Download,
  Bookmark,
  Share2,
  RefreshCw,
  Film,
  Smile,
  CheckCircle2,
  Store,
  Layers,
  Zap,
  Sliders,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './StudioStyles.css';

export interface AnimatedCharacterPreset {
  id: string;
  name: string;
  archetype: '3D Pixar Mascot' | '2D Anime' | 'Cartoon Comic' | 'Cyberpunk Sci-Fi';
  emoji: string;
  avatarBg: string;
  tagline: string;
  expression: 'Joyful Wink' | 'Friendly Smile' | 'Focused' | 'Confident' | 'Surprised';
  motion: 'Looping Wave' | 'Talking Head & Lip-Sync' | 'Action Walk' | 'Thumbs Up';
  fps: number;
  outfit: string;
}

const PRESET_CHARACTERS: AnimatedCharacterPreset[] = [
  {
    id: 'char-fox',
    name: 'Zunme Fox',
    archetype: '3D Pixar Mascot',
    emoji: '🦊',
    avatarBg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    tagline: 'Playful tech guide for explainer reels & creator onboarding',
    expression: 'Joyful Wink',
    motion: 'Looping Wave',
    fps: 30,
    outfit: 'Royal Purple Tech Hoodie & Holographic Sneakers'
  },
  {
    id: 'char-atlas',
    name: 'Atlas-7 Cyber Guide',
    archetype: 'Cyberpunk Sci-Fi',
    emoji: '🤖',
    avatarBg: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    tagline: 'Holographic narrator for tech deep dives & AI workflows',
    expression: 'Focused',
    motion: 'Talking Head & Lip-Sync',
    fps: 60,
    outfit: 'Neon Luminescent Exosuit & Data Visor'
  },
  {
    id: 'char-aria',
    name: 'Aria Storyteller',
    archetype: '2D Anime',
    emoji: '👩‍🎨',
    avatarBg: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    tagline: 'Engaging character for YouTube Shorts, storytimes & education',
    expression: 'Friendly Smile',
    motion: 'Talking Head & Lip-Sync',
    fps: 30,
    outfit: 'Pastel Studio Apron & Creator Headset'
  },
  {
    id: 'char-leo',
    name: 'Leo the Marketer',
    archetype: 'Cartoon Comic',
    emoji: '🦁',
    avatarBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    tagline: 'High-energy sales coach & social hype mascot',
    expression: 'Confident',
    motion: 'Thumbs Up',
    fps: 24,
    outfit: 'Sharp Tailored Navy Blazer & Golden Tie'
  }
];

export const AnimationCharacterStudio: React.FC = () => {
  const { showToast, saveToLibrary } = useApp();

  const [activeCharacter, setActiveCharacter] = useState<AnimatedCharacterPreset>(PRESET_CHARACTERS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playProgress, setPlayProgress] = useState<number>(45);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Form Controls
  const [charName, setCharName] = useState(PRESET_CHARACTERS[0].name);
  const [charArchetype, setCharArchetype] = useState(PRESET_CHARACTERS[0].archetype);
  const [charExpression, setCharExpression] = useState(PRESET_CHARACTERS[0].expression);
  const [charMotion, setCharMotion] = useState(PRESET_CHARACTERS[0].motion);
  const [charOutfit, setCharOutfit] = useState(PRESET_CHARACTERS[0].outfit);
  const [charFps, setCharFps] = useState(30);

  // Animation Scrubber Simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 60);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectPreset = (preset: AnimatedCharacterPreset) => {
    setActiveCharacter(preset);
    setCharName(preset.name);
    setCharArchetype(preset.archetype);
    setCharExpression(preset.expression);
    setCharMotion(preset.motion);
    setCharOutfit(preset.outfit);
    setCharFps(preset.fps);
    showToast(`Loaded ${preset.name} character animation blueprint`, 'info');
  };

  const handleGenerateAnimation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setActiveCharacter({
        id: `char-custom-${Date.now()}`,
        name: charName,
        archetype: charArchetype,
        emoji: charArchetype === '3D Pixar Mascot' ? '🦊' : charArchetype === 'Cyberpunk Sci-Fi' ? '🤖' : charArchetype === '2D Anime' ? '👩‍🎨' : '🦁',
        avatarBg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        tagline: `Custom ${charArchetype} character with ${charMotion}`,
        expression: charExpression,
        motion: charMotion,
        fps: charFps,
        outfit: charOutfit
      });
      showToast(`✨ Generated "${charName}" animation & turnaround sequence!`, 'success');
    }, 1200);
  };

  const handlePublishToStore = () => {
    showToast(`Published "${activeCharacter.name}" to Zunme Store (Animation & Cartoon Category)! Eligible for 80% creator revenue sharing.`, 'success');
  };

  const handleSaveToLibrary = () => {
    saveToLibrary({
      title: `Character Animation: ${activeCharacter.name}`,
      contentType: 'RESEARCH',
      previewText: `${activeCharacter.archetype} • Motion: ${activeCharacter.motion} • ${activeCharacter.fps}fps`,
      content: `Character Name: ${activeCharacter.name}\nArchetype: ${activeCharacter.archetype}\nExpression: ${activeCharacter.expression}\nMotion: ${activeCharacter.motion}\nOutfit: ${activeCharacter.outfit}\nPacing: ${activeCharacter.fps} FPS\nZunme Store Monetization: Enabled (Commercial Pro)`,
      tags: ['Animation', 'Characters', 'MultiModal Studio']
    });
    showToast('Saved Character Animation Blueprint to My Library!', 'success');
  };

  return (
    <div className="animation-studio-layout">
      {/* Left Column: Character Configuration Controls */}
      <form onSubmit={handleGenerateAnimation} className="image-controls-panel">
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1E293B', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smile size={18} color="#7C3AED" />
            <span>Character &amp; Animation Generator</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Create AI characters, cartoon mascots, and looping animated sequences for explainer videos and social content.
          </p>
        </div>

        {/* Archetype Quick Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>
            Character Style Archetype
          </label>
          <div className="character-archetype-grid">
            {PRESET_CHARACTERS.map(preset => (
              <button
                key={preset.id}
                type="button"
                className={`archetype-btn ${activeCharacter.id === preset.id ? 'active' : ''}`}
                onClick={() => handleSelectPreset(preset)}
              >
                <span className="archetype-emoji">{preset.emoji}</span>
                <span className="archetype-name">{preset.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Character Name & Archetype Picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>Character Name</label>
          <input
            type="text"
            className="input-field"
            value={charName}
            onChange={(e) => setCharName(e.target.value)}
            required
          />
        </div>

        {/* Expression & Motion Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>Expression</label>
            <select
              value={charExpression}
              onChange={(e) => setCharExpression(e.target.value as any)}
              className="input-field"
            >
              <option value="Joyful Wink">Joyful Wink</option>
              <option value="Friendly Smile">Friendly Smile</option>
              <option value="Focused">Focused</option>
              <option value="Confident">Confident</option>
              <option value="Surprised">Surprised</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>Motion Pacing</label>
            <select
              value={charFps}
              onChange={(e) => setCharFps(Number(e.target.value))}
              className="input-field"
            >
              <option value={24}>24 FPS (Cinematic)</option>
              <option value={30}>30 FPS (Reels/Social)</option>
              <option value={60}>60 FPS (Ultra Smooth)</option>
            </select>
          </div>
        </div>

        {/* Animation Sequence Mode */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>Motion Sequence</label>
          <select
            value={charMotion}
            onChange={(e) => setCharMotion(e.target.value as any)}
            className="input-field"
          >
            <option value="Looping Wave">Looping Wave &amp; Welcome</option>
            <option value="Talking Head & Lip-Sync">Talking Head &amp; Audio Lip-Sync</option>
            <option value="Action Walk">Hero Action Walk</option>
            <option value="Thumbs Up">Thumbs Up &amp; Confident Pose</option>
          </select>
        </div>

        {/* Outfit & Visual Prompt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155' }}>Outfit &amp; Aesthetic Details</label>
          <textarea
            className="input-field"
            rows={3}
            value={charOutfit}
            onChange={(e) => setCharOutfit(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isGenerating}
          style={{ justifyContent: 'center', marginTop: '6px' }}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={15} className="animate-spin" />
              <span>Rendering Animation Sequences...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} />
              <span>Generate Animation &amp; Character</span>
            </>
          )}
        </button>
      </form>

      {/* Right Column: Interactive Character Animation Canvas */}
      <div className="character-preview-stage">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#1E293B' }}>
              {activeCharacter.name}
            </h3>
            <span style={{ fontSize: '12.5px', color: '#64748B' }}>
              {activeCharacter.archetype} • {activeCharacter.fps} FPS • {activeCharacter.motion}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handlePublishToStore}
              title="Publish to Zunme Store for Creator Revenue Share"
            >
              <Store size={14} color="#7C3AED" />
              <span>Publish to Store</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleSaveToLibrary}
            >
              <Bookmark size={14} />
              <span>Save</span>
            </button>
          </div>
        </div>

        {/* Viewport Canvas with Floating Character */}
        <div className="character-viewport-box">
          <div className="character-canvas-glow" />

          <div className={`animated-character-entity ${isPlaying ? 'playing' : ''}`}>
            <div className="character-avatar-circle" style={{ background: activeCharacter.avatarBg }}>
              <span>{activeCharacter.emoji}</span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1E293B' }}>
                {activeCharacter.name}
              </div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#7C3AED', background: '#FFFFFF', padding: '2px 8px', borderRadius: '12px', display: 'inline-block', marginTop: '4px' }}>
                Expression: {activeCharacter.expression}
              </div>
            </div>
          </div>
        </div>

        {/* Playback Controls & Frame Scrubber */}
        <div className="character-playback-bar">
          <button
            type="button"
            className="btn btn-ghost"
            style={{ padding: '6px 10px', borderRadius: '8px' }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={17} color="#7C3AED" /> : <Play size={17} color="#7C3AED" />}
          </button>

          <div className="motion-scrubber-track">
            <div className="motion-scrubber-fill" style={{ width: `${playProgress}%` }} />
          </div>

          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', minWidth: '45px' }}>
            {Math.floor((playProgress / 100) * (activeCharacter.fps === 60 ? 4 : 2))}:0{Math.floor(playProgress % 30)}s
          </span>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => showToast('Exporting animated MP4 video loop...', 'info')}
            title="Export animation"
            style={{ marginLeft: '12px' }}
          >
            <Download size={14} />
            <span>Export MP4</span>
          </button>
        </div>

        {/* Character Turnaround Sheet Metadata */}
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={14} color="#635BFF" />
            <span>Multi-Angle Turnaround &amp; Motion Assets</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
              <strong>Front Angle:</strong> <span style={{ color: '#059669' }}>✓ Verified</span>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
              <strong>3/4 Profile:</strong> <span style={{ color: '#059669' }}>✓ Verified</span>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
              <strong>Lip-Sync Nodes:</strong> <span style={{ color: '#059669' }}>✓ 12 Phonemes</span>
            </div>
            <div style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
              <strong>Store Revenue:</strong> <span style={{ color: '#7C3AED' }}>80% Royalty Cut</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
