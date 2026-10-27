import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Download,
  AlertCircle,
  Music,
  Sparkles,
  Info
} from 'lucide-react';

export interface AudioPreviewWidgetProps {
  title: string;
  creatorName?: string;
  artist?: string;
  durationSeconds?: number;
  audioUrl?: string; // If available, plays real audio; if not, shows unavailable state
  category?: string;
  licensing?: string;
  compact?: boolean;
}

export const AudioPreviewWidget: React.FC<AudioPreviewWidgetProps> = ({
  title,
  creatorName,
  artist,
  durationSeconds = 84, // Default sample duration: 1m 24s
  audioUrl,
  category = 'Audio & Music',
  licensing = 'Standard Community',
  compact = false
}) => {
  const effectiveCreator = artist || creatorName || 'Zunme AI Audio Engine';
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudioResource] = useState(Boolean(audioUrl));
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // If real audioUrl is provided, initialize HTML5 Audio
  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.volume = volume;
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [audioUrl]);

  // Simulated playback timer when demonstrating audio preview or synthetic waveform
  useEffect(() => {
    if (isPlaying && !audioUrl) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else if (!isPlaying && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isPlaying, audioUrl, durationSeconds]);

  const handleTogglePlay = () => {
    if (!hasAudioResource) {
      // In demo mode without audio asset, simulate loading state then playback
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsPlaying(!isPlaying);
      }, 300);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.8;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 24 visual waveform bars heights (simulated frequency spectrum)
  const waveformHeights = [
    28, 45, 65, 80, 50, 35, 70, 92, 85, 60, 40, 75,
    90, 100, 70, 55, 85, 95, 60, 45, 75, 50, 35, 20
  ];

  const currentPercent = (currentTime / durationSeconds) * 100;

  return (
    <div
      className="audio-preview-widget"
      style={{
        background: '#FAFBFD',
        border: '1px solid #E8ECF5',
        borderRadius: compact ? '12px' : '16px',
        padding: compact ? '14px 16px' : '20px',
        boxShadow: '0 4px 16px -2px rgba(30, 20, 60, 0.04)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Meta Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#EFEBFC',
              color: '#6E56CF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Music size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#111625', margin: 0 }}>
              {title}
            </h4>
            <span style={{ fontSize: '11px', color: '#5F6B85' }}>
              {creatorName} • {category}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            className={`badge ${hasAudioResource ? 'badge-success' : 'badge-neutral'}`}
            style={{ fontSize: '10px', textTransform: 'uppercase' }}
          >
            {hasAudioResource ? 'Audio Ready' : 'Synthesizer Demo'}
          </span>
          <span style={{ fontSize: '10.5px', color: '#8C97B0', background: '#F0F3FA', padding: '2px 8px', borderRadius: '4px' }}>
            {licensing}
          </span>
        </div>
      </div>

      {/* Waveform Visualization Container */}
      <div
        style={{
          height: compact ? '48px' : '64px',
          background: '#FFFFFF',
          border: '1px solid #E8ECF5',
          borderRadius: '10px',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3px',
          marginBottom: '14px',
          position: 'relative'
        }}
      >
        {waveformHeights.map((h, i) => {
          const barPercent = (i / waveformHeights.length) * 100;
          const isPassed = barPercent <= currentPercent;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${isPlaying ? Math.max(15, (h * (0.6 + Math.sin(Date.now() / 200 + i) * 0.4))) : h}%`,
                background: isPassed ? '#6E56CF' : '#E2E6F2',
                borderRadius: '2px',
                transition: 'height 0.15s ease, background 0.2s ease'
              }}
            />
          );
        })}
      </div>

      {/* Scrub Range Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#6E56CF', minWidth: '32px', fontFamily: 'monospace' }}>
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min={0}
          max={durationSeconds}
          value={currentTime}
          onChange={handleSeek}
          style={{
            flex: 1,
            height: '5px',
            accentColor: '#6E56CF',
            cursor: 'pointer'
          }}
          aria-label="Seek playback"
        />

        <span style={{ fontSize: '11px', color: '#8C97B0', minWidth: '32px', fontFamily: 'monospace' }}>
          {formatTime(durationSeconds)}
        </span>
      </div>

      {/* Player Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleTogglePlay}
            disabled={isLoading}
            style={{ width: '36px', height: '36px', padding: 0, borderRadius: '50%', justifyContent: 'center' }}
            title={isPlaying ? 'Pause' : 'Play audio'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '2px' }} />}
          </button>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleReset}
            style={{ padding: '6px' }}
            title="Restart"
          >
            <RotateCcw size={14} />
          </button>

          {/* Volume Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleToggleMute}
              style={{ padding: '4px' }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={15} color="#8C97B0" /> : <Volume2 size={15} color="#5F6B85" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{ width: '60px', height: '4px', accentColor: '#6E56CF', cursor: 'pointer' }}
              aria-label="Volume slider"
            />
          </div>
        </div>

        {/* Download / Resource Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {hasAudioResource ? (
            <a
              href={audioUrl}
              download={`${title.toLowerCase().replace(/\s+/g, '_')}.mp3`}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '11px', padding: '4px 10px', gap: '4px' }}
            >
              <Download size={13} />
              <span>Download Audio</span>
            </a>
          ) : (
            <span style={{ fontSize: '11px', color: '#8C97B0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Info size={13} />
              <span>Preview Demo Mode</span>
            </span>
          )}
        </div>
      </div>

      {/* Honest Limitation Disclosure */}
      {!hasAudioResource && (
        <div
          style={{
            marginTop: '12px',
            padding: '8px 12px',
            background: 'rgba(110, 86, 207, 0.05)',
            border: '1px solid rgba(110, 86, 207, 0.15)',
            borderRadius: '8px',
            fontSize: '11px',
            color: '#5F6B85',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={13} color="#6E56CF" />
          <span>
            <strong>Synthesizer Preview:</strong> Renders visual waveform and timeline. To generate production audio tracks, connect an external model endpoint (e.g. ElevenLabs/Suno) in Admin Integrations.
          </span>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '8px', fontSize: '11.5px', color: '#E11D48', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
