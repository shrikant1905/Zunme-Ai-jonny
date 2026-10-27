import React, { useState } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  FileEdit,
  PenTool
} from 'lucide-react';
import { ImageStudio } from '../../components/studio/ImageStudio';
import { VideoScriptStudio } from '../../components/studio/VideoScriptStudio';
import { DocumentCanvas } from '../../components/studio/DocumentCanvas';
import '../../styles/dashboard.css';
import '../../components/studio/StudioStyles.css';

export const StudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'canvas'>('image');

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#6E56CF" />
            Multi-Modal Studio &amp; Rich Canvas
          </h1>
          <p className="dashboard-subtitle">
            Generate high-resolution visual diffusion concepts, scene-by-scene video scripts, and long-form rich documents with inline AI rewrite assistance.
          </p>
        </div>
      </div>

      {/* Navigation Switcher */}
      <div className="studio-tab-bar">
        <button
          className={`studio-nav-pill ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          <ImageIcon size={15} />
          <span>AI Image Diffusion</span>
        </button>

        <button
          className={`studio-nav-pill ${activeTab === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          <Video size={15} />
          <span>Video Script Engine</span>
        </button>

        <button
          className={`studio-nav-pill ${activeTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveTab('canvas')}
        >
          <FileEdit size={15} />
          <span>Rich Document Canvas</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'image' && <ImageStudio />}
      {activeTab === 'video' && <VideoScriptStudio />}
      {activeTab === 'canvas' && <DocumentCanvas />}
    </div>
  );
};
