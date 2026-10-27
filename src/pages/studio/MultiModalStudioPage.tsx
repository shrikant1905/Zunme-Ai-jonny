import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  Film
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ImageStudio } from '../../components/studio/ImageStudio';
import { VideoScriptStudio } from '../../components/studio/VideoScriptStudio';
import { AnimationCharacterStudio } from '../../components/studio/AnimationCharacterStudio';
import '../../styles/dashboard.css';
import '../../components/studio/StudioStyles.css';

interface MultiModalStudioPageProps {
  defaultEngine?: 'image' | 'video' | 'animation';
}

export const MultiModalStudioPage: React.FC<MultiModalStudioPageProps> = ({ defaultEngine = 'image' }) => {
  const [searchParams] = useSearchParams();
  const urlTab = searchParams.get('tab') as 'image' | 'video' | 'animation' | null;

  const [activeEngine, setActiveEngine] = useState<'image' | 'video' | 'animation'>(
    urlTab && ['image', 'video', 'animation'].includes(urlTab)
      ? urlTab
      : defaultEngine
  );

  useEffect(() => {
    const tabParam = searchParams.get('tab') as 'image' | 'video' | 'animation' | null;
    if (tabParam && ['image', 'video', 'animation'].includes(tabParam)) {
      setActiveEngine(tabParam);
    }
  }, [searchParams]);

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#6E56CF" />
            Multi-Modal Studio
          </h1>
          <p className="dashboard-subtitle">
            Generate high-fidelity visual concepts, structured scene-by-scene video scripts, and custom AI mascot animations with turnaround motion previews.
          </p>
        </div>
      </div>

      {/* Engine Switcher Tab Bar */}
      <div className="studio-tab-bar">
        <button
          className={`studio-nav-pill ${activeEngine === 'image' ? 'active' : ''}`}
          onClick={() => setActiveEngine('image')}
        >
          <ImageIcon size={15} />
          <span>AI Image Studio</span>
        </button>

        <button
          className={`studio-nav-pill ${activeEngine === 'video' ? 'active' : ''}`}
          onClick={() => setActiveEngine('video')}
        >
          <Video size={15} />
          <span>AI Video Script Engine</span>
        </button>

        <button
          className={`studio-nav-pill ${activeEngine === 'animation' ? 'active' : ''}`}
          onClick={() => setActiveEngine('animation')}
        >
          <Film size={15} />
          <span>AI Animation &amp; Characters</span>
        </button>
      </div>

      {/* Engine View */}
      {activeEngine === 'image' && <ImageStudio />}
      {activeEngine === 'video' && <VideoScriptStudio />}
      {activeEngine === 'animation' && <AnimationCharacterStudio />}
    </div>
  );
};
