import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Bookmark,
  ZoomIn,
  Sliders,
  ChevronDown,
  RefreshCw,
  X,
  Image as ImageIcon,
  Check,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './StudioStyles.css';

export interface GeneratedImageItem {
  id: string;
  prompt: string;
  style: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3';
  imageUrl: string;
  seed: number;
  quality: string;
  createdAt: string;
  savedToWarehouse?: boolean;
}

const INITIAL_IMAGES: GeneratedImageItem[] = [
  {
    id: 'img-1',
    prompt: 'Hyper-detailed futuristic obsidian workstation with violet holographic volumetric displays and ambient neon rim lighting',
    style: 'Cinematic',
    aspectRatio: '16:9',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    seed: 849204,
    quality: 'Ultra HD (4K)',
    createdAt: '2026-10-14'
  },
  {
    id: 'img-2',
    prompt: 'Minimalist porcelain isometric 3D studio with frosted glass crystals and soft peach sunrise shadows',
    style: '3D Render',
    aspectRatio: '1:1',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    seed: 391024,
    quality: 'Ultra HD (4K)',
    createdAt: '2026-10-15'
  },
  {
    id: 'img-3',
    prompt: 'Photorealistic editorial portrait of a tech innovator looking at translucent data streams, raytracing depth of field',
    style: 'Photorealistic',
    aspectRatio: '9:16',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    seed: 712903,
    quality: 'Ultra HD (4K)',
    createdAt: '2026-10-15'
  },
  {
    id: 'img-4',
    prompt: 'Cyberpunk Tokyo street market with rain reflections and floating neon AI banners, cinematic composition',
    style: 'Cyberpunk',
    aspectRatio: '16:9',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80',
    seed: 521940,
    quality: 'Ultra HD (4K)',
    createdAt: '2026-10-13'
  }
];

const STYLES = ['Photorealistic', '3D Render', 'Anime', 'Cyberpunk', 'Cinematic', 'Minimalist'];
const RATIOS: Array<'1:1' | '16:9' | '9:16' | '4:3'> = ['1:1', '16:9', '9:16', '4:3'];

export const ImageStudio: React.FC = () => {
  const { showToast } = useApp();

  // Generator Controls
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  const [selectedRatio, setSelectedRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('16:9');
  const [negativePrompt, setNegativePrompt] = useState('blurry, low resolution, watermark, distorted, overexposed');
  const [seed, setSeed] = useState(482910);
  const [quality, setQuality] = useState('Ultra HD (4K)');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Gallery
  const [images, setImages] = useState<GeneratedImageItem[]>(INITIAL_IMAGES);
  const [zoomedImage, setZoomedImage] = useState<GeneratedImageItem | null>(null);

  const handleGenerateImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      showToast('Please enter an image prompt description', 'warning');
      return;
    }

    setIsGenerating(true);
    showToast('Synthesizing image with diffusion engine...', 'info');

    // Simulate diffusion generation
    setTimeout(() => {
      // Pick a curated dynamic visual based on style
      const pool = [
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
      ];
      const randomUrl = pool[Math.floor(Math.random() * pool.length)];

      const newImg: GeneratedImageItem = {
        id: `img-${Date.now()}`,
        prompt: prompt.trim(),
        style: selectedStyle,
        aspectRatio: selectedRatio,
        imageUrl: randomUrl,
        seed: seed + Math.floor(Math.random() * 1000),
        quality,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setImages([newImg, ...images]);
      setIsGenerating(false);
      showToast('Image rendered successfully!', 'success');
    }, 1200);
  };

  const handleSaveToWarehouse = (img: GeneratedImageItem) => {
    setImages(
      images.map((item) => (item.id === img.id ? { ...item, savedToWarehouse: true } : item))
    );
    showToast(`Saved "${img.prompt.slice(0, 30)}..." to AI Warehouse`, 'success');
  };

  const handleDownloadImage = (img: GeneratedImageItem) => {
    // Trigger download
    const a = document.createElement('a');
    a.href = img.imageUrl;
    a.target = '_blank';
    a.download = `zunme_render_${img.seed}.jpg`;
    a.click();
    showToast('Download started', 'success');
  };

  return (
    <div className="image-studio-layout">
      {/* Generator Controls Column */}
      <div className="image-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #F0F3FA', paddingBottom: '12px' }}>
          <ImageIcon size={20} color="#6E56CF" />
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#111625', margin: 0 }}>
            Image Diffusion Studio
          </h2>
        </div>

        <form onSubmit={handleGenerateImage} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Prompt */}
          <div className="studio-form-group">
            <label className="studio-label">
              <span>Prompt Description *</span>
            </label>
            <textarea
              className="input-field"
              rows={4}
              placeholder="Describe what you want to render in vivid detail (e.g., futuristic holographic workspace, rim lighting, octane render)..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>

          {/* Style Selector */}
          <div className="studio-form-group">
            <label className="studio-label">Aesthetic Style</label>
            <div className="style-selector-grid">
              {STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`style-chip-btn ${selectedStyle === style ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="studio-form-group">
            <label className="studio-label">Aspect Ratio</label>
            <div className="aspect-ratio-selector">
              {RATIOS.map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  className={`ratio-chip-btn ${selectedRatio === ratio ? 'active' : ''}`}
                  onClick={() => setSelectedRatio(ratio)}
                >
                  <div
                    className="ratio-box-preview"
                    style={{
                      width: ratio === '16:9' ? '22px' : ratio === '9:16' ? '12px' : '16px',
                      height: ratio === '9:16' ? '22px' : ratio === '16:9' ? '12px' : '16px'
                    }}
                  />
                  <span>{ratio}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Accordion: Negative prompt & Seed / Quality */}
          <div>
            <div
              className="advanced-accordion-trigger"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} color="#6E56CF" />
                <span>Negative Prompt &amp; Seed Controls</span>
              </div>
              <ChevronDown
                size={14}
                style={{
                  transform: isAdvancedOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s'
                }}
              />
            </div>

            {isAdvancedOpen && (
              <div className="advanced-accordion-content">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#5F6B85', marginBottom: '4px' }}>
                    Negative Prompt (Elements to avoid)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ fontSize: '12px', height: '34px' }}
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#5F6B85', marginBottom: '4px' }}>
                      Seed #
                    </label>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input
                        type="number"
                        className="input-field"
                        style={{ fontSize: '12px', height: '34px' }}
                        value={seed}
                        onChange={(e) => setSeed(Number(e.target.value))}
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0 8px' }}
                        title="Randomize Seed"
                        onClick={() => setSeed(Math.floor(Math.random() * 900000) + 100000)}
                      >
                        <RefreshCw size={12} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#5F6B85', marginBottom: '4px' }}>
                      Quality Preset
                    </label>
                    <select
                      className="input-field"
                      style={{ fontSize: '12px', height: '34px' }}
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                    >
                      <option value="Ultra HD (4K)">Ultra HD (4K)</option>
                      <option value="Standard Definition">Standard (1080p)</option>
                      <option value="Fast Draft">Fast Draft (720p)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isGenerating}
            style={{ padding: '12px' }}
          >
            {isGenerating ? (
              <>
                <RefreshCw size={15} className="spinner" />
                <span>Synthesizing Canvas...</span>
              </>
            ) : (
              <>
                <Sparkles size={15} />
                <span>Render AI Image</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Gallery Showcase Column */}
      <div className="image-gallery-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '14px 20px', borderRadius: 'var(--radius-xl)', border: '1px solid #E8ECF5' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
              Generated Artifacts Gallery ({images.length})
            </h3>
            <p style={{ fontSize: '12px', color: '#5F6B85', margin: '2px 0 0 0' }}>
              Full resolution outputs ready for warehouse storage and high-DPI export.
            </p>
          </div>
        </div>

        <div className="gallery-grid">
          {images.map((img) => (
            <div key={img.id} className="gallery-card">
              <div
                className={`gallery-image-wrap ratio-${img.aspectRatio.replace(':', '-')}`}
                onClick={() => setZoomedImage(img)}
              >
                <img src={img.imageUrl} alt={img.prompt} className="gallery-card-img" />
                <div className="gallery-card-overlay">
                  <span className="btn btn-primary btn-sm" style={{ pointerEvents: 'none' }}>
                    <ZoomIn size={14} />
                    <span>Zoom</span>
                  </span>
                </div>
              </div>

              <div className="gallery-card-info">
                <div className="gallery-card-prompt">{img.prompt}</div>

                <div className="gallery-card-meta">
                  <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                    {img.style} • {img.aspectRatio}
                  </span>
                  <span>Seed: {img.seed}</span>
                </div>

                <div className="gallery-card-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, fontSize: '11px', padding: '4px 8px' }}
                    onClick={() => handleSaveToWarehouse(img)}
                  >
                    {img.savedToWarehouse ? <Check size={12} color="#059669" /> : <Bookmark size={12} />}
                    <span>{img.savedToWarehouse ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, fontSize: '11px', padding: '4px 8px' }}
                    onClick={() => handleDownloadImage(img)}
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="modal-overlay" onClick={() => setZoomedImage(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: '800px', width: '92%', padding: '16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header" style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary">{zoomedImage.style}</span>
                <span className="badge badge-neutral">{zoomedImage.aspectRatio}</span>
                <span className="badge badge-neutral">{zoomedImage.quality}</span>
              </div>
              <button className="btn-ghost" onClick={() => setZoomedImage(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxHeight: '520px', background: '#111625', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={zoomedImage.imageUrl}
                alt={zoomedImage.prompt}
                style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>

            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <p style={{ fontSize: '13px', color: '#111625', fontWeight: '600', maxWidth: '520px', margin: 0 }}>
                {zoomedImage.prompt}
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleSaveToWarehouse(zoomedImage)}
                >
                  <Bookmark size={14} />
                  <span>Save to Warehouse</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownloadImage(zoomedImage)}
                >
                  <Download size={14} />
                  <span>Download PNG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
