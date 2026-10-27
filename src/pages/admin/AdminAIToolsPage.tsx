import React, { useState } from 'react';
import {
  Wand2,
  Search,
  Filter,
  CheckCircle2,
  Sliders,
  FileText,
  Share2,
  Briefcase,
  SearchCheck,
  Palette,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

interface ToolCatalogItem {
  id: string;
  name: string;
  category: 'Writing' | 'Social' | 'Business' | 'SEO' | 'Creative';
  format: string;
  runsCount: number;
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'REVIEW';
  description: string;
}

const DEFAULT_TOOLS: ToolCatalogItem[] = [
  {
    id: 'tool_1',
    name: 'Long-Form Blog Outline Generator',
    category: 'Writing',
    format: 'BLOG_OUTLINE',
    runsCount: 14200,
    status: 'ACTIVE',
    description: 'Generates structured 4-phase article outlines with hooks, subheadings, and key takeaways.'
  },
  {
    id: 'tool_2',
    name: 'High-Converting Email Newsletter',
    category: 'Marketing' as any,
    format: 'EMAIL_NEWSLETTER',
    runsCount: 18900,
    status: 'ACTIVE',
    description: 'Drafts persuasive product announcement and editorial emails with subject line options.'
  },
  {
    id: 'tool_3',
    name: 'Viral Social Media Caption & Hooks',
    category: 'Social',
    format: 'SOCIAL_CAPTION',
    runsCount: 24500,
    status: 'ACTIVE',
    description: 'Produces engagement-optimized captions with hashtag recommendations and call to action.'
  },
  {
    id: 'tool_4',
    name: 'B2B Product Ad Copy Matrix',
    category: 'Business',
    format: 'PRODUCT_AD',
    runsCount: 9200,
    status: 'ACTIVE',
    description: 'Generates multi-variant headlines and primary copy for paid social & search ads.'
  },
  {
    id: 'tool_5',
    name: 'YouTube Retention Video Script',
    category: 'Creative',
    format: 'VIDEO_SCRIPT',
    runsCount: 11400,
    status: 'ACTIVE',
    description: 'Hooks, narrative arcs, visual cue suggestions, and mid-roll transitions.'
  },
  {
    id: 'tool_6',
    name: 'SEO Semantic Content Brief & FAQ',
    category: 'SEO',
    format: 'ARTICLE_SECTION',
    runsCount: 8400,
    status: 'ACTIVE',
    description: 'Synthesizes topical authority keyword sections and people-also-ask responses.'
  }
];

export const AdminAIToolsPage: React.FC = () => {
  const { showToast } = useApp();
  const [tools, setTools] = useState<ToolCatalogItem[]>(DEFAULT_TOOLS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) => {
    const matchesCat = selectedCategory === 'ALL' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleToolStatus = (id: string) => {
    setTools((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'ACTIVE' ? 'REVIEW' : 'ACTIVE';
          showToast(`Tool "${t.name}" status set to ${nextStatus}`, 'info');
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Wand2 size={26} color="#A78BFA" />
            AI Tools & Content Workflows
          </h1>
          <p className="dashboard-subtitle">
            Catalog governance for Content Studio builders, template routing rules, prompt moderation pipelines, and usage analytics.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            {tools.length} Production Tools Active
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search content tools and generators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            {['ALL', 'Writing', 'Social', 'Business', 'SEO', 'Creative'].map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="cards-grid-3">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {tool.category}
                </span>
                <span className={`status-chip ${tool.status === 'ACTIVE' ? 'success' : 'warning'}`}>
                  {tool.status}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                {tool.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4', marginBottom: '16px' }}>
                {tool.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #E8ECF5', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#5F6B85' }}>
                <strong style={{ color: '#111625' }}>{tool.runsCount.toLocaleString()}</strong> runs logged
              </span>

              <button
                className={`btn btn-sm ${tool.status === 'ACTIVE' ? 'btn-outline' : 'btn-secondary'}`}
                onClick={() => toggleToolStatus(tool.id)}
                style={{ padding: '4px 10px', fontSize: '11px' }}
              >
                {tool.status === 'ACTIVE' ? 'Pause Tool' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
