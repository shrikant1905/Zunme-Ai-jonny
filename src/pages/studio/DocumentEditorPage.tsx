import React from 'react';
import {
  FileEdit,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { DocumentCanvas } from '../../components/studio/DocumentCanvas';
import '../../styles/dashboard.css';
import '../../components/studio/StudioStyles.css';

export const DocumentEditorPage: React.FC = () => {
  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <FileEdit size={26} color="#6E56CF" />
            Rich Document Canvas
          </h1>
          <p className="dashboard-subtitle">
            Distraction-free rich text editor with inline AI rewrite triggers, real-time readability analytics, and instant Markdown/Plaintext export.
          </p>
        </div>
      </div>

      {/* Main Canvas Component */}
      <DocumentCanvas />
    </div>
  );
};
