import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useParams, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Calendar,
  Layers,
  Sparkles,
  Save,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  AlertCircle,
  Database,
  RefreshCw,
  DollarSign,
  Activity,
  PhoneCall,
  Mail,
  ShieldCheck,
  ExternalLink,
  LifeBuoy,
  X,
  Download,
  Upload,
  Rocket,
  Zap,
  Award,
  Target,
  ShoppingBag,
  Video,
  Eye,
  MousePointer,
  BookOpen,
  Headphones,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusinessProject, CalendarEvent } from '../../types';
import { CsvImportModal, exportToCsv } from '../../components/modals/CsvImportModal';
import { PlatformConnectionModal } from '../../components/modals/PlatformConnectionModal';
import { B4BAmericaBookingModal } from '../../components/modals/B4BAmericaBookingModal';
import '../../styles/dashboard.css';
import './BusinessWorkspacePage.css';

interface CrmLead {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  score: number;
  channel: string;
  dealStage: 'NEW_LEAD' | 'DEMO_SCHEDULED' | 'PROPOSAL_SENT' | 'CLOSED_WON';
  dealValue: number;
  syncedAt: string;
}

export const BusinessWorkspacePage: React.FC = () => {
  const {
    brandProfile,
    updateBrandProfile,
    businessProjects,
    addBusinessProject,
    calendarEvents,
    addCalendarEvent,
    showToast
  } = useApp();

  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  type BusinessTabType = 'Overview' | 'Brand Profile' | 'Projects' | 'Content Calendar' | 'Marketing Content' | 'nErgy CRM Deep Sync' | 'Team & Access' | 'Settings' | 'Help & Support';

  const slugToTab: Record<string, BusinessTabType> = {
    'overview': 'Overview',
    'dashboard': 'Overview',
    'brand-profile': 'Brand Profile',
    'brand': 'Brand Profile',
    'projects': 'Projects',
    'calendar': 'Content Calendar',
    'content-calendar': 'Content Calendar',
    'marketing': 'Marketing Content',
    'marketing-content': 'Marketing Content',
    'crm': 'nErgy CRM Deep Sync',
    'crm-sync': 'nErgy CRM Deep Sync',
    'team': 'Team & Access',
    'team-access': 'Team & Access',
    'settings': 'Settings',
    'support': 'Help & Support',
    'help-support': 'Help & Support'
  };

  const tabToSlug: Record<BusinessTabType, string> = {
    'Overview': 'overview',
    'Brand Profile': 'brand-profile',
    'Projects': 'projects',
    'Content Calendar': 'calendar',
    'Marketing Content': 'marketing',
    'nErgy CRM Deep Sync': 'crm',
    'Team & Access': 'team',
    'Settings': 'settings',
    'Help & Support': 'support'
  };

  const resolveCurrentTab = (): BusinessTabType => {
    if (section && slugToTab[section.toLowerCase()]) {
      return slugToTab[section.toLowerCase()];
    }
    const tabParam = searchParams.get('tab');
    if (tabParam && ['Overview', 'Brand Profile', 'Projects', 'Content Calendar', 'Marketing Content', 'nErgy CRM Deep Sync', 'Team & Access', 'Settings', 'Help & Support'].includes(tabParam)) {
      return tabParam as BusinessTabType;
    }
    return 'Overview';
  };

  const [activeTab, setActiveTabState] = useState<BusinessTabType>(resolveCurrentTab);

  useEffect(() => {
    setActiveTabState(resolveCurrentTab());
  }, [section, searchParams]);

  const setActiveTab = (tab: BusinessTabType) => {
    setActiveTabState(tab);
    const slug = tabToSlug[tab];
    navigate(slug === 'overview' ? '/business/overview' : `/business/${slug}`);
  };

  // Brand Profile State
  const [bName, setBName] = useState(brandProfile.brandName);
  const [bTagline, setBTagline] = useState(brandProfile.tagline);
  const [bVoice, setBVoice] = useState(brandProfile.voiceTone);
  const [bAudience, setBAudience] = useState(brandProfile.targetAudience);
  const [bValues, setBValues] = useState(brandProfile.coreValues);
  const [bMission, setBMission] = useState(brandProfile.missionStatement);

  // New Project State
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<'Marketing Campaign' | 'Product Launch' | 'Brand Rebrand' | 'SEO Revamp'>('Marketing Campaign');
  const [pDueDate, setPDueDate] = useState('2026-11-20');
  const [pDesc, setPDesc] = useState('');

  // Calendar Event State
  const [cTitle, setCTitle] = useState('');
  const [cPlatform, setCPlatform] = useState<'Blog' | 'LinkedIn' | 'Twitter / X' | 'Newsletter' | 'Instagram'>('LinkedIn');
  const [cDate, setCDate] = useState('2026-10-25');

  // nErgy CRM State
  const [isSyncingCrm, setIsSyncingCrm] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadRole, setNewLeadRole] = useState('VP Growth');
  const [newLeadValue, setNewLeadValue] = useState(24000);

  // CSV Import & CRM Connection Dialog States
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const [isCrmConnectModalOpen, setIsCrmConnectModalOpen] = useState(false);
  const [crmConnectedStatus, setCrmConnectedStatus] = useState<'CONNECTED' | 'DISCONNECTED'>('CONNECTED');

  // Part 13: B4B America Education & Training State
  const [isB4BBookingOpen, setIsB4BBookingOpen] = useState(false);

  // Part 14: Small Business Starter Ad Bridge State
  type StarterAdTemplateType = 'SEARCH_PPC' | 'DISPLAY_PPV' | 'SHOPPING_PPC' | 'VIDEO_PPV';
  const [selectedAdTemplate, setSelectedAdTemplate] = useState<StarterAdTemplateType>('SEARCH_PPC');
  const [starterAdBudget, setStarterAdBudget] = useState(15);
  const [starterPaymentModel, setStarterPaymentModel] = useState<'PPC' | 'PPV'>('PPC');
  const [starterHeadline, setStarterHeadline] = useState(
    brandProfile.brandName
      ? `${brandProfile.brandName} | AI One Stop Shop for Small Business`
      : 'Apex Growth | AI One Stop Shop for Small Business'
  );
  const [starterDescription, setStarterDescription] = useState(
    brandProfile.tagline || 'Do more for less cost. Automated workflows, verified AI content, and fast turnaround for businesses on a budget.'
  );
  const [starterKeywords, setStarterKeywords] = useState('small business ai, workflow automation, digital marketing, local growth');
  const [isDeployingAd, setIsDeployingAd] = useState(false);
  const [deployedAdSuccess, setDeployedAdSuccess] = useState(false);

  const handleDeployStarterAd = () => {
    setIsDeployingAd(true);
    setTimeout(() => {
      setIsDeployingAd(false);
      setDeployedAdSuccess(true);
      showToast(
        `Starter Campaign "${starterHeadline.slice(0, 32)}..." deployed to Zunme Ads Engine! ($${starterAdBudget}/day ${starterPaymentModel})`,
        'success'
      );
    }, 900);
  };

  const [crmLeads, setCrmLeads] = useState<CrmLead[]>([
    {
      id: 'lead-1',
      name: 'John Davis',
      email: 'john.davis@acmecorp.com',
      company: 'Acme Corp',
      role: 'VP Growth & Marketing',
      score: 94,
      channel: 'Web Search AI Ingest',
      dealStage: 'PROPOSAL_SENT',
      dealValue: 36000,
      syncedAt: '2 mins ago'
    },
    {
      id: 'lead-2',
      name: 'Sarah Jenkins',
      email: 's.jenkins@fintechscale.io',
      company: 'FintechScale',
      role: 'Chief Marketing Officer',
      score: 98,
      channel: 'Content Studio Lead Form',
      dealStage: 'DEMO_SCHEDULED',
      dealValue: 48000,
      syncedAt: '15 mins ago'
    },
    {
      id: 'lead-3',
      name: 'Michael Brown',
      email: 'mbrown@apexdigital.com',
      company: 'Apex Digital Agency',
      role: 'Founder & CEO',
      score: 82,
      channel: 'Sponsored Native Ad',
      dealStage: 'NEW_LEAD',
      dealValue: 24000,
      syncedAt: '1 hour ago'
    },
    {
      id: 'lead-4',
      name: 'Priya Patel',
      email: 'p.patel@globalretail.co',
      company: 'Global Retail Hub',
      role: 'VP Omnichannel Operations',
      score: 99,
      channel: 'Direct Executive Ingest',
      dealStage: 'CLOSED_WON',
      dealValue: 76500,
      syncedAt: '4 hours ago'
    }
  ]);

  const [crmInteractions] = useState([
    { id: 'int-1', lead: 'Sarah Jenkins', action: 'Executive Brief Synced', detail: 'Generated 5-pillar GTM strategy outline automatically synced to nErgy deal notes', time: '15 mins ago' },
    { id: 'int-2', lead: 'John Davis', action: 'Lead Score Escalated', detail: 'High intent: 4 consecutive competitor search queries logged via Tavily search grounding', time: '45 mins ago' },
    { id: 'int-3', lead: 'Priya Patel', action: 'Deal Stage Updated', detail: 'Contract signed ($76,500 ACV). Automated onboarding webhook dispatched to nErgy CRM', time: '4 hours ago' }
  ]);

  const handleRunCrmSync = () => {
    setIsSyncingCrm(true);
    setTimeout(() => {
      setIsSyncingCrm(false);
      showToast('nErgy CRM Deep Sync executed: 4 deals & 12 interaction logs updated', 'success');
    }, 850);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadEmail.trim()) {
      showToast('Contact name and email are required', 'error');
      return;
    }

    const createdLead: CrmLead = {
      id: `lead-${Date.now()}`,
      name: newLeadName.trim(),
      email: newLeadEmail.trim(),
      company: newLeadCompany.trim() || 'Enterprise Client',
      role: newLeadRole,
      score: 90,
      channel: 'Manual Executive Capture',
      dealStage: 'NEW_LEAD',
      dealValue: Number(newLeadValue) || 15000,
      syncedAt: 'Just now'
    };

    setCrmLeads([createdLead, ...crmLeads]);
    setIsLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadEmail('');
    setNewLeadCompany('');
    showToast(`Lead "${createdLead.name}" pushed to nErgy CRM pipeline!`, 'success');
  };

  const handleSaveBrandProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandProfile({
      brandName: bName,
      tagline: bTagline,
      voiceTone: bVoice,
      targetAudience: bAudience,
      coreValues: bValues,
      missionStatement: bMission
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) return;
    addBusinessProject({
      name: pName.trim(),
      category: pCategory,
      status: 'IN_PROGRESS',
      dueDate: pDueDate,
      progress: 10,
      description: pDesc.trim() || 'Active strategic campaign initiatives.',
      tasksCount: 6
    });
    setPName('');
    setPDesc('');
    setActiveTab('Projects');
  };

  const handleAddCalendarPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cTitle.trim()) return;
    addCalendarEvent({
      title: cTitle.trim(),
      platform: cPlatform,
      date: cDate,
      status: 'Scheduled',
      format: 'Social / Post'
    });
    setCTitle('');
    showToast('Post added to Content Calendar', 'success');
  };

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Briefcase size={26} color="#A78BFA" />
            Small Business & Team Workspace
          </h1>
          <p className="dashboard-subtitle">
            Unify your brand identity, campaign projects, editorial content calendar, and marketing assets into one collaborative dashboard.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-primary">
            {businessProjects.length} Active Business Projects
          </div>
        </div>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box">
                  <Briefcase size={20} />
                </div>
                <span className="metric-badge positive">Active</span>
              </div>
              <div className="metric-value">{businessProjects.length}</div>
              <div className="metric-label">Ongoing Business Campaigns</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box" style={{ color: '#38BDF8', background: 'rgba(56, 189, 248, 0.12)' }}>
                  <Calendar size={20} />
                </div>
                <span className="metric-badge neutral">Scheduled</span>
              </div>
              <div className="metric-value">{calendarEvents.length}</div>
              <div className="metric-label">Editorial Calendar Items</div>
            </div>

            <div className="metric-card">
              <div className="metric-card-top">
                <div className="metric-icon-box" style={{ color: '#34D399', background: 'rgba(16, 185, 129, 0.12)' }}>
                  <Sparkles size={20} />
                </div>
                <span className="metric-badge positive">Synced</span>
              </div>
              <div className="metric-value">{brandProfile.brandName}</div>
              <div className="metric-label">Active Brand Identity Profile</div>
            </div>
          </div>

          {/* Part 13: B4B America Training & Education Onboarding Hub */}
          <div className="b4b-training-hero-card">
            <div className="b4b-badge-row">
              <span className="b4b-pill partner">
                <Award size={13} />
                B4B America Official Partner
              </span>
              <span className="b4b-pill guarantee">
                100% Free Client Education &amp; Onboarding
              </span>
            </div>

            <div>
              <h2 className="b4b-title">
                B4B America — Small Business Training &amp; Education Onboarding Hub
              </h2>
              <p className="b4b-desc">
                B4B America is the official point of contact creating personal relationships with small businesses to educate and train clients on all Zunme AI products. We ensure your business learns how to do more for less cost with our AI One Stop Shop on any budget.
              </p>
            </div>

            <div className="b4b-perks-grid">
              <div className="b4b-perk-card">
                <div className="b4b-perk-icon">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="b4b-perk-title">1-on-1 Product Walkthrough</div>
                  <p className="b4b-perk-text">
                    Personalized 45-min live session to train your team on AI workflows, CRM synchronization, and prompt architecture.
                  </p>
                </div>
              </div>

              <div className="b4b-perk-card">
                <div className="b4b-perk-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC' }}>
                  <Zap size={18} />
                </div>
                <div>
                  <div className="b4b-perk-title">Low-Budget Strategy Consultation</div>
                  <p className="b4b-perk-text">
                    Tailored guidance to launch $10-$25/day starter ads and automate lead intake without hiring an expensive agency.
                  </p>
                </div>
              </div>

              <div className="b4b-perk-card">
                <div className="b4b-perk-icon" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8' }}>
                  <Headphones size={18} />
                </div>
                <div>
                  <div className="b4b-perk-title">Dedicated Point of Contact</div>
                  <p className="b4b-perk-text">
                    Direct phone and email access to Elena Vance &amp; Sarah Jenkins for ongoing client education and support.
                  </p>
                </div>
              </div>
            </div>

            <div className="b4b-actions-row">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  borderColor: '#059669',
                  fontWeight: '800',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => setIsB4BBookingOpen(true)}
              >
                <Calendar size={15} />
                <span>Book 1-on-1 Product Training Session</span>
              </button>

              <button
                type="button"
                className="btn btn-outline"
                style={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onClick={() => setActiveTab('Help & Support')}
              >
                <LifeBuoy size={14} />
                <span>View B4B Support &amp; Education Desk</span>
              </button>
            </div>
          </div>

          <div className="cards-grid-2">
            {/* Active Projects Preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">Active Projects & Deadlines</div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveTab('Projects')}
                  style={{ fontSize: '11px' }}
                >
                  All Projects
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {businessProjects.map((proj) => (
                  <div
                    key={proj.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '700', color: '#111625', fontSize: '13px' }}>{proj.name}</span>
                      <span className="badge badge-neutral" style={{ fontSize: '10px' }}>{proj.category}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#5F6B85' }}>
                      <span>Due: {proj.dueDate}</span>
                      <span>Progress: {proj.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: '#E8ECF5' }}>
                      <div style={{ width: `${proj.progress}%`, height: '100%', background: '#6E56CF', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Calendar Preview */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">Upcoming Content Schedule</div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setActiveTab('Content Calendar')}
                  style={{ fontSize: '11px' }}
                >
                  Open Calendar
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {calendarEvents.map((ev) => (
                  <div
                    key={ev.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', color: '#111625', fontSize: '13px' }}>{ev.title}</div>
                      <div style={{ fontSize: '11px', color: '#5F6B85', marginTop: '2px' }}>
                        Channel: <strong>{ev.platform}</strong> • Date: {ev.date}
                      </div>
                    </div>
                    <span className="badge badge-primary">{ev.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Brand Profile */}
      {activeTab === 'Brand Profile' && (
        <div className="glass-panel" style={{ maxWidth: '780px', margin: '0 auto', width: '100%' }}>
          <div className="panel-header">
            <div className="panel-title">Brand Voice & Persona Configuration</div>
            <span className="badge badge-success">Active Grounding Persona</span>
          </div>

          <form onSubmit={handleSaveBrandProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Brand / Organization Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Brand Tagline
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={bTagline}
                  onChange={(e) => setBTagline(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Tone of Voice & Personality
              </label>
              <input
                type="text"
                className="input-field"
                value={bVoice}
                onChange={(e) => setBVoice(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Primary Target Audience
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={bAudience}
                onChange={(e) => setBAudience(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Core Values & Positioning Pillars
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={bValues}
                onChange={(e) => setBValues(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Mission Statement
              </label>
              <textarea
                className="input-field"
                rows={2}
                value={bMission}
                onChange={(e) => setBMission(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={14} />
                <span>Save Brand Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === 'Projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="input-field"
                placeholder="New project title..."
                value={pName}
                onChange={(e) => setPName(e.target.value)}
                style={{ flex: 1, minWidth: '240px' }}
                required
              />
              <select
                className="input-field"
                style={{ width: '180px' }}
                value={pCategory}
                onChange={(e) => setPCategory(e.target.value as any)}
              >
                <option value="Marketing Campaign">Marketing Campaign</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Brand Rebrand">Brand Rebrand</option>
                <option value="SEO Revamp">SEO Revamp</option>
              </select>
              <input
                type="date"
                className="input-field"
                style={{ width: '160px' }}
                value={pDueDate}
                onChange={(e) => setPDueDate(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Plus size={14} /> Add Project
              </button>
            </form>
          </div>

          <div className="cards-grid-3">
            {businessProjects.map((proj) => (
              <div key={proj.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-neutral" style={{ fontSize: '10px' }}>{proj.category}</span>
                    <span className="status-chip success">{proj.status}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>{proj.name}</h3>
                  <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.4', marginBottom: '14px' }}>{proj.description}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginBottom: '6px' }}>
                    <span>Target: {proj.dueDate}</span>
                    <span>{proj.progress}% Done</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: '#E8ECF5' }}>
                    <div style={{ width: `${proj.progress}%`, height: '100%', background: '#6E56CF', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Content Calendar */}
      {activeTab === 'Content Calendar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
            <form onSubmit={handleAddCalendarPost} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Scheduled post title / hook..."
                value={cTitle}
                onChange={(e) => setCTitle(e.target.value)}
                style={{ flex: 1, minWidth: '240px' }}
                required
              />
              <select
                className="input-field"
                style={{ width: '180px' }}
                value={cPlatform}
                onChange={(e) => setCPlatform(e.target.value as any)}
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter / X">Twitter / X</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Blog">Blog</option>
                <option value="Instagram">Instagram</option>
              </select>
              <input
                type="date"
                className="input-field"
                style={{ width: '160px' }}
                value={cDate}
                onChange={(e) => setCDate(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <Plus size={14} /> Schedule Post
              </button>
            </form>
          </div>

          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Scheduled Asset Title</th>
                    <th>Platform Channel</th>
                    <th>Target Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarEvents.map((ev) => (
                    <tr key={ev.id}>
                      <td style={{ fontWeight: '700', color: '#111625' }}>{ev.title}</td>
                      <td><span className="badge badge-neutral">{ev.platform}</span></td>
                      <td>{ev.date}</td>
                      <td><span className="status-chip success">{ev.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Part 14: Tab: Marketing Content & Small Business Starter Ad Bridge */}
      {activeTab === 'Marketing Content' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Starter Ad Bridge Hero Banner */}
          <div className="ad-bridge-hero">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="ad-bridge-tag">
                  <Rocket size={12} />
                  Zunme Ads — Small Business Starter Bridge
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#FFFFFF', margin: '8px 0 6px 0', letterSpacing: '-0.01em' }}>
                  AI One Stop Shop for the Web — Advertising for Small Businesses
                </h2>
                <p style={{ fontSize: '13.5px', color: '#CBD5E1', margin: 0, maxWidth: '820px', lineHeight: '1.55' }}>
                  Small businesses are on a budget, and the importance of business management, technology, and advertising cannot be overstated. Zunme Ads enables you to do more for less cost with 1-click starter templates, bidding on high-intent search keywords or visual placements with modest daily budgets ($5 - $25/day).
                </p>
              </div>

              <NavLink
                to="/ads/create-campaign"
                className="btn btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
                  borderColor: '#A855F7',
                  fontWeight: '800',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Full Zunme Ads Studio</span>
                <ArrowRight size={14} />
              </NavLink>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '6px', fontSize: '12.5px', color: '#E2E8F0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#34D399" />
                Pay Only For Results (PPC Per Click / PPV Per 1k Views)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#34D399" />
                No Marketing Agency Fees
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#34D399" />
                Instant 1-Click Launch to Live Search Network
              </span>
            </div>
          </div>

          {/* 4 Pre-Engineered Starter Templates Grid */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                  Pre-Engineered 1-Click Starter Ad Presets
                </h3>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', margin: '2px 0 0 0' }}>
                  Select a template to configure your low-budget campaign and deploy to the Zunme Ads network in seconds.
                </p>
              </div>
            </div>

            <div className="ad-templates-grid">
              {/* Preset 1: High-Intent Search Starter */}
              <div
                className={`starter-ad-card ${selectedAdTemplate === 'SEARCH_PPC' ? 'recommended' : ''}`}
                style={{ cursor: 'pointer', border: selectedAdTemplate === 'SEARCH_PPC' ? '2px solid #6E56CF' : undefined }}
                onClick={() => {
                  setSelectedAdTemplate('SEARCH_PPC');
                  setStarterPaymentModel('PPC');
                  setStarterAdBudget(10);
                }}
              >
                <span className="ad-card-badge ppc">PPC • Pay Per Click</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="starter-ad-title">Local High-Intent Search</h4>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Keywords Bidding • $10/day</span>
                  </div>
                </div>
                <p className="starter-ad-desc">
                  Appear directly at the top of Zunme Web Search when customers query your exact services. Pay only when someone clicks.
                </p>
                <div className="starter-ad-specs">
                  <span>Est. Clicks: <strong>25 - 45 / day</strong></span>
                  <span>Avg CPC: <strong>$0.28 - $0.35</strong></span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: selectedAdTemplate === 'SEARCH_PPC' ? '#6E56CF' : '#FFFFFF',
                    color: selectedAdTemplate === 'SEARCH_PPC' ? '#FFFFFF' : '#111625',
                    borderColor: selectedAdTemplate === 'SEARCH_PPC' ? '#6E56CF' : '#CBD5E1'
                  }}
                >
                  {selectedAdTemplate === 'SEARCH_PPC' ? 'Selected Template' : 'Use This Template'}
                </button>
              </div>

              {/* Preset 2: AI One Stop Shop Display */}
              <div
                className={`starter-ad-card ${selectedAdTemplate === 'DISPLAY_PPV' ? 'recommended' : ''}`}
                style={{ cursor: 'pointer', border: selectedAdTemplate === 'DISPLAY_PPV' ? '2px solid #6E56CF' : undefined }}
                onClick={() => {
                  setSelectedAdTemplate('DISPLAY_PPV');
                  setStarterPaymentModel('PPV');
                  setStarterAdBudget(15);
                }}
              >
                <span className="ad-card-badge ppv">PPV • 1,000 Views</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FAF5FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="starter-ad-title">AI One Stop Shop Promotion</h4>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Display Banner • $15/day</span>
                  </div>
                </div>
                <p className="starter-ad-desc">
                  Broadcast your brand banner across Zunme affiliated networks. Fixed low cost per 1,000 verified human impressions.
                </p>
                <div className="starter-ad-specs">
                  <span>Est. Views: <strong>4,200 / day</strong></span>
                  <span>Est. CPM: <strong>$3.50</strong></span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: selectedAdTemplate === 'DISPLAY_PPV' ? '#6E56CF' : '#FFFFFF',
                    color: selectedAdTemplate === 'DISPLAY_PPV' ? '#FFFFFF' : '#111625',
                    borderColor: selectedAdTemplate === 'DISPLAY_PPV' ? '#6E56CF' : '#CBD5E1'
                  }}
                >
                  {selectedAdTemplate === 'DISPLAY_PPV' ? 'Selected Template' : 'Use This Template'}
                </button>
              </div>

              {/* Preset 3: E-Commerce Shopping */}
              <div
                className={`starter-ad-card ${selectedAdTemplate === 'SHOPPING_PPC' ? 'recommended' : ''}`}
                style={{ cursor: 'pointer', border: selectedAdTemplate === 'SHOPPING_PPC' ? '2px solid #6E56CF' : undefined }}
                onClick={() => {
                  setSelectedAdTemplate('SHOPPING_PPC');
                  setStarterPaymentModel('PPC');
                  setStarterAdBudget(20);
                }}
              >
                <span className="ad-card-badge shopping">Shopping • Product</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 className="starter-ad-title">E-Commerce Product Spotlight</h4>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Shopping Ads • $20/day</span>
                  </div>
                </div>
                <p className="starter-ad-desc">
                  Showcase your catalog item with product image, price tag, store name, and instant "Shop Now" direct checkout button.
                </p>
                <div className="starter-ad-specs">
                  <span>Est. Clicks: <strong>40 - 70 / day</strong></span>
                  <span>Direct ROAS: <strong>High Intent</strong></span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: selectedAdTemplate === 'SHOPPING_PPC' ? '#6E56CF' : '#FFFFFF',
                    color: selectedAdTemplate === 'SHOPPING_PPC' ? '#FFFFFF' : '#111625',
                    borderColor: selectedAdTemplate === 'SHOPPING_PPC' ? '#6E56CF' : '#CBD5E1'
                  }}
                >
                  {selectedAdTemplate === 'SHOPPING_PPC' ? 'Selected Template' : 'Use This Template'}
                </button>
              </div>

              {/* Preset 4: Video Ad Spotlight */}
              <div
                className={`starter-ad-card ${selectedAdTemplate === 'VIDEO_PPV' ? 'recommended' : ''}`}
                style={{ cursor: 'pointer', border: selectedAdTemplate === 'VIDEO_PPV' ? '2px solid #6E56CF' : undefined }}
                onClick={() => {
                  setSelectedAdTemplate('VIDEO_PPV');
                  setStarterPaymentModel('PPV');
                  setStarterAdBudget(25);
                }}
              >
                <span className="ad-card-badge ppv">Video • PPV Views</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Video size={20} />
                  </div>
                  <div>
                    <h4 className="starter-ad-title">Video Ad Spotlight</h4>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Video Overlay • $25/day</span>
                  </div>
                </div>
                <p className="starter-ad-desc">
                  Tell your small business story with a short video promo, viewer duration tracking, and clickable call-to-action overlay.
                </p>
                <div className="starter-ad-specs">
                  <span>Est. Views: <strong>6,500 / day</strong></span>
                  <span>Completion Rate: <strong>~72%</strong></span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    background: selectedAdTemplate === 'VIDEO_PPV' ? '#6E56CF' : '#FFFFFF',
                    color: selectedAdTemplate === 'VIDEO_PPV' ? '#FFFFFF' : '#111625',
                    borderColor: selectedAdTemplate === 'VIDEO_PPV' ? '#6E56CF' : '#CBD5E1'
                  }}
                >
                  {selectedAdTemplate === 'VIDEO_PPV' ? 'Selected Template' : 'Use This Template'}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive 1-Click Launch Configuration & Simulator */}
          <div className="glass-panel starter-ad-config-panel" style={{ padding: '24px 28px' }}>
            <div className="panel-header" style={{ marginBottom: '16px' }}>
              <div>
                <div className="panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#A855F7" />
                  <span>1-Click Starter Ad Simulator &amp; Instant Deployment</span>
                </div>
                <div className="panel-subtitle">
                  Configure budget and copy in real-time, then deploy directly to Zunme's advertising engine.
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-success">Bridge Connected to Zunme Ads</span>
              </div>
            </div>

            <div className="starter-ad-config-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px' }}>
              {/* Configuration Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Campaign Headline (Brand + Value Proposition)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={starterHeadline}
                    onChange={(e) => setStarterHeadline(e.target.value)}
                    style={{ width: '100%', fontSize: '13px' }}
                    placeholder="e.g. Apex Growth | AI One Stop Shop for Small Business"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Ad Description &amp; Call to Action
                  </label>
                  <textarea
                    className="input-field"
                    rows={2}
                    value={starterDescription}
                    onChange={(e) => setStarterDescription(e.target.value)}
                    style={{ width: '100%', fontSize: '13px', resize: 'vertical' }}
                    placeholder="Explain what makes your business unique and why users should click..."
                  />
                </div>

                {/* Budget & Model Selector */}
                <div className="starter-budget-model-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                      Daily Budget: <strong>${starterAdBudget} / day</strong>
                    </label>
                    <div className="starter-budget-buttons-row" style={{ display: 'flex', gap: '6px' }}>
                      {[5, 10, 15, 25, 50].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setStarterAdBudget(amount)}
                          style={{
                            flex: 1,
                            padding: '6px 0',
                            borderRadius: '6px',
                            border: starterAdBudget === amount ? '2px solid #6E56CF' : '1px solid #CBD5E1',
                            background: starterAdBudget === amount ? '#F3F0FF' : '#FFFFFF',
                            color: starterAdBudget === amount ? '#6E56CF' : '#475569',
                            fontWeight: '800',
                            fontSize: '11.5px',
                            cursor: 'pointer'
                          }}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                      Billing Model
                    </label>
                    <div className="starter-billing-buttons-row" style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setStarterPaymentModel('PPC')}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          borderRadius: '6px',
                          border: starterPaymentModel === 'PPC' ? '2px solid #2563EB' : '1px solid #CBD5E1',
                          background: starterPaymentModel === 'PPC' ? '#EFF6FF' : '#FFFFFF',
                          color: starterPaymentModel === 'PPC' ? '#2563EB' : '#475569',
                          fontWeight: '800',
                          fontSize: '11.5px',
                          cursor: 'pointer'
                        }}
                      >
                        PPC (Per Click)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStarterPaymentModel('PPV')}
                        style={{
                          flex: 1,
                          padding: '6px 0',
                          borderRadius: '6px',
                          border: starterPaymentModel === 'PPV' ? '2px solid #9333EA' : '1px solid #CBD5E1',
                          background: starterPaymentModel === 'PPV' ? '#FAF5FF' : '#FFFFFF',
                          color: starterPaymentModel === 'PPV' ? '#9333EA' : '#475569',
                          fontWeight: '800',
                          fontSize: '11.5px',
                          cursor: 'pointer'
                        }}
                      >
                        PPV (1k Views)
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Target Keywords (Comma Separated)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={starterKeywords}
                    onChange={(e) => setStarterKeywords(e.target.value)}
                    style={{ width: '100%', fontSize: '12.5px' }}
                    placeholder="small business, consulting, local services, ai tools"
                  />
                </div>

                {/* Deploy Button */}
                <div className="starter-deploy-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isDeployingAd}
                    onClick={handleDeployStarterAd}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #6E56CF 0%, #4F46E5 100%)',
                      borderColor: '#6E56CF',
                      fontWeight: '800',
                      padding: '12px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Rocket size={16} />
                    <span>{isDeployingAd ? 'Deploying to Zunme Ads...' : '1-Click Launch Starter Ad'}</span>
                  </button>

                  <NavLink
                    to="/ads"
                    className="btn btn-outline"
                    style={{ fontSize: '12.5px', whiteSpace: 'nowrap' }}
                  >
                    <span>View All Ads</span>
                    <ExternalLink size={13} style={{ marginLeft: '4px' }} />
                  </NavLink>
                </div>

                {deployedAdSuccess && (
                  <div
                    style={{
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '12px',
                      color: '#065F46',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Campaign live in Zunme Ads sandbox! Bidding is active.</span>
                  </div>
                )}
              </div>

              {/* Live Preview Simulator */}
              <div className="starter-ad-simulator-box">
                <div className="starter-simulator-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Live Ad Appearance Simulator
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>
                    Placement: <strong>Zunme Web Search &amp; Network</strong>
                  </span>
                </div>

                {/* Simulated Search Ad Card */}
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="ad-preview-pill">Sponsored</span>
                    <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: '600', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
                      https://zunme.ai/partner/{brandProfile.brandName ? brandProfile.brandName.toLowerCase().replace(/\s+/g, '-') : 'small-business'}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1D4ED8', margin: 0, cursor: 'pointer', textDecoration: 'underline' }}>
                    {starterHeadline || 'Your Company Headline | AI One Stop Shop'}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.45', margin: '4px 0 0 0' }}>
                    {starterDescription || 'Affordable, verified AI content, workflow acceleration, and personal client education. Learn more now.'}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px', alignItems: 'center' }}>
                    <span
                      style={{
                        background: '#F1F5F9',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: '#475569',
                        fontWeight: '700'
                      }}
                    >
                      Model: {starterPaymentModel === 'PPC' ? 'Pay Per Click ($0.32 avg)' : 'Pay Per View ($3.50 CPM)'}
                    </span>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '11.5px', padding: '4px 12px' }}
                    >
                      {selectedAdTemplate === 'SHOPPING_PPC' ? 'Shop Now' : 'Learn More'}
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: '1.5', background: '#F8FAFC', padding: '10px', borderRadius: '8px' }}>
                  💡 <strong>Small Business Advantage:</strong> You are never locked into long-term agency contracts. Pause, raise, or stop your daily budget at any time with a single click.
                </div>
              </div>
            </div>
          </div>

          {/* Organic Copy Generator Bridge */}
          <div className="glass-panel" style={{ padding: '18px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#111625', margin: 0 }}>
                  Need Organic Content or Ad Copy Variations?
                </h4>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', margin: '3px 0 0 0' }}>
                  Generate multi-platform social posts, blog outlines, or email newsletters grounded in your brand identity ({brandProfile.brandName}).
                </p>
              </div>
              <NavLink to="/app/builders" className="btn btn-outline btn-sm">
                <span>Open Content Builders &rarr;</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* Tab: nErgy CRM Deep Sync */}
      {activeTab === 'nErgy CRM Deep Sync' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* CRM Connection Banner */}
          <div className="glass-panel" style={{ borderLeft: '4px solid #059669', padding: '18px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#E8F8F0',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Database size={22} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                      nErgy CRM Enterprise Bridge: Synchronized
                    </h3>
                    <span className="badge badge-success">Webhook Live</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#5F6B85', margin: '3px 0 0 0' }}>
                    Real-time bidirectional synchronization between Zunme AI conversations, search inquiries, and client CRM records.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleRunCrmSync}
                  disabled={isSyncingCrm}
                >
                  <RefreshCw size={14} className={isSyncingCrm ? 'spin' : ''} />
                  <span>{isSyncingCrm ? 'Syncing...' : 'Run Deep Sync'}</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsLeadModalOpen(true)}
                >
                  <Plus size={14} />
                  <span>Capture New Lead</span>
                </button>
              </div>
            </div>
          </div>

          {/* CRM Pipeline Metrics */}
          <div className="cards-grid-4">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Total Pipeline Value
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                ${crmLeads.reduce((acc, l) => acc + l.dealValue, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>+32% QoQ lead acceleration</span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Active Deals in Flight
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {crmLeads.length} Organizations
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Across 4 synchronized deal stages
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
                Average AI Lead Score
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                93.2 / 100
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                Calculated from workflow intent
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Avg Cycle Velocity
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                14.2 Days
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                2.8x faster with automated summaries
              </div>
            </div>
          </div>

          {/* CRM Leads Table */}
          <div className="glass-panel">
            <div className="panel-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
              <div className="panel-title">
                <Users size={18} color="#6E56CF" />
                Synchronized Lead Pipeline &amp; Customer Interactions
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => exportToCsv('nergy_crm_leads.csv', crmLeads)}
                  title="Export contacts and leads to CSV"
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsCsvImportOpen(true)}
                  title="Upload CSV to import contacts into local pipeline"
                >
                  <Upload size={13} />
                  <span>Import CSV</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsCrmConnectModalOpen(true)}
                  title="Configure nErgy CRM Integration & OAuth"
                >
                  <span>Sync Settings</span>
                </button>
                <span className="badge badge-primary">{crmLeads.length} Synced Records</span>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E8ECF5', color: '#5F6B85' }}>
                    <th style={{ padding: '12px 14px' }}>Contact &amp; Organization</th>
                    <th style={{ padding: '12px 14px' }}>AI Lead Score</th>
                    <th style={{ padding: '12px 14px' }}>Attribution Source</th>
                    <th style={{ padding: '12px 14px' }}>Deal Stage</th>
                    <th style={{ padding: '12px 14px' }}>Pipeline Value</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>CRM Sync</th>
                  </tr>
                </thead>
                <tbody>
                  {crmLeads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #F0F3F9' }}>
                      <td style={{ padding: '14px' }}>
                        <div style={{ fontWeight: '800', color: '#111625' }}>{lead.name}</div>
                        <span style={{ fontSize: '11.5px', color: '#5F6B85' }}>
                          {lead.role} • <strong>{lead.company}</strong>
                        </span>
                        <div style={{ fontSize: '11px', color: '#8C97B0' }}>{lead.email}</div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '900', color: lead.score >= 90 ? '#059669' : '#D97706' }}>
                          {lead.score}/100
                        </span>
                      </td>
                      <td style={{ padding: '14px', color: '#5F6B85' }}>
                        <span style={{ background: '#FAFBFD', border: '1px solid #E8ECF5', padding: '3px 8px', borderRadius: '6px', fontSize: '11px' }}>
                          {lead.channel}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span className={`badge ${lead.dealStage === 'CLOSED_WON' ? 'badge-success' : lead.dealStage === 'PROPOSAL_SENT' ? 'badge-primary' : 'badge-neutral'}`}>
                          {lead.dealStage.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '14px', fontWeight: '800', color: '#111625' }}>
                        ${lead.dealValue.toLocaleString()}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => showToast(`Lead notes synced to nErgy CRM for ${lead.company}`, 'success')}
                          style={{ fontSize: '11px', padding: '4px 10px' }}
                        >
                          Push to nErgy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Interaction Timeline */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Activity size={18} color="#0284C7" />
                Recent AI-Customer Interaction Activity Logs
              </div>
              <span className="badge badge-neutral">Auto-Audited</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {crmInteractions.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: '#FAFBFD',
                    border: '1px solid #E8ECF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6E56CF' }} />
                    <div>
                      <strong style={{ color: '#111625' }}>{item.lead}</strong> — <span style={{ color: '#6E56CF', fontWeight: '600' }}>{item.action}</span>
                      <p style={{ margin: '2px 0 0 0', color: '#5F6B85', fontSize: '12px' }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#8C97B0' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEAD INGEST MODAL */}
      {isLeadModalOpen && (
        <div className="dashboard-modal-backdrop" onClick={() => setIsLeadModalOpen(false)}>
          <div className="dashboard-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="panel-header" style={{ padding: '16px 20px', borderBottom: '1px solid #E8ECF5', margin: 0, background: '#FAFAFC', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <div className="panel-title" style={{ fontSize: '16px', color: '#111625', fontWeight: '800' }}>
                <Users size={18} color="#059669" />
                <span>Capture Lead to nErgy CRM</span>
              </div>
              <button className="btn-ghost" onClick={() => setIsLeadModalOpen(false)} style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCaptureLead} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Jordan Miller"
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Corporate Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="jordan@enterpriseco.com"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. TechCorp Solutions"
                    value={newLeadCompany}
                    onChange={(e) => setNewLeadCompany(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Target Role
                  </label>
                  <select
                    className="input-field"
                    value={newLeadRole}
                    onChange={(e) => setNewLeadRole(e.target.value)}
                  >
                    <option value="VP Growth">VP Growth</option>
                    <option value="Chief Marketing Officer">Chief Marketing Officer</option>
                    <option value="Head of Product">Head of Product</option>
                    <option value="Procurement Director">Procurement Director</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Estimated Deal Value ($)
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={newLeadValue}
                  onChange={(e) => setNewLeadValue(Number(e.target.value))}
                  min={1000}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsLeadModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Database size={14} />
                  <span>Ingest to nErgy CRM</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Team & Access (supported status clearly stated) */}
      {activeTab === 'Team & Access' && (
        <div className="glass-panel">
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <Users size={24} color="#A78BFA" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Multi-User Team Collaboration & Access Controls
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                You are currently in Single-Owner Workspace mode. Multi-seat team invites and role-based permissions (RBAC) are included with the Business & Agency plan ($99/mo) and will activate upon team member invitation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'Settings' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">Business Workspace Settings</div>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '13px' }}>
            Manage organization defaults, currency preferences, and notification webhooks.
          </p>
        </div>
      )}

      {/* Tab: Help & Support */}
      {activeTab === 'Help & Support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Part 13: B4B America Dedicated Support & Training Desk */}
          <div className="b4b-support-lead-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="b4b-avatar-box">
                <Award size={24} />
              </div>
              <div className="b4b-support-details">
                <div className="b4b-lead-name">
                  <span>B4B America — Small Business Education &amp; Priority Desk</span>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>Personal Point of Contact</span>
                </div>
                <div className="b4b-lead-role">
                  Dedicated Client Success Lead: <strong>Sarah Jenkins &amp; Elena Vance</strong>
                </div>
                <div className="b4b-contact-meta">
                  <span>
                    <PhoneCall size={13} color="#059669" />
                    <strong>+1 (800) 555-B4BA (2422)</strong>
                  </span>
                  <span>
                    <Mail size={13} color="#059669" />
                    <strong>business@b4bamerica.org</strong>
                  </span>
                  <span>
                    <Clock size={13} color="#059669" />
                    Mon–Fri 8am–8pm EST • Guaranteed &lt; 1hr response
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderColor: '#059669',
                fontWeight: '800',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setIsB4BBookingOpen(true)}
            >
              <Calendar size={15} />
              <span>Schedule 1-on-1 Product Training</span>
            </button>
          </div>

          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <BookOpen size={20} color="#10B981" />
                  <span>Small Business Client Education Modules</span>
                </div>
                <div className="panel-subtitle">
                  Curated learning paths designed by B4B America to help small businesses leverage the AI One Stop Shop on any budget.
                </div>
              </div>
              <span className="badge badge-success">
                Self-Paced &amp; 1-on-1 Supported
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Rocket size={18} color="#10B981" />
                  <strong style={{ fontSize: '14px', color: '#111625' }}>Zunme AI One Stop Shop Essentials</strong>
                </div>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                  Overview of AI content creation, SEO clusters, writing prompts, and brand persona synchronization.
                </p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '11px' }}
                  onClick={() => setIsB4BBookingOpen(true)}
                >
                  Request Module Walkthrough
                </button>
              </div>

              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Target size={18} color="#10B981" />
                  <strong style={{ fontSize: '14px', color: '#111625' }}>Low-Budget Ads Strategy ($10 - $25/day)</strong>
                </div>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                  How small businesses can bid on high-intent search keywords and deploy display banners without huge agency budgets.
                </p>
                <NavLink
                  to="/business/marketing"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '11px' }}
                >
                  Open Starter Ad Bridge &rarr;
                </NavLink>
              </div>

              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Users size={18} color="#10B981" />
                  <strong style={{ fontSize: '14px', color: '#111625' }}>CRM Deep Sync &amp; Lead Workflows</strong>
                </div>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                  Connect nErgy CRM, synchronize real-time lead updates, and configure automatic opportunity ingestion pipelines.
                </p>
                <NavLink
                  to="/business/crm"
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '11px' }}
                >
                  View CRM Pipeline &rarr;
                </NavLink>
              </div>
            </div>
          </div>

          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Mail size={18} color="#10B981" />
                <span>Submit Priority Ticket (Routed to B4B America &amp; Zunme Ops)</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Priority ticket dispatched to B4B America Client Relations & Zunme Ops! Response in under 1 hour.', 'success');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '640px' }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Subject
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Inquiring about custom CRM webhook endpoint mapping"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Description &amp; Details
                </label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Provide context on your workflow or question..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', background: '#059669', borderColor: '#059669' }}>
                <Mail size={14} />
                <span>Send Priority Ticket</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* P2: CSV Import Dialog for CRM Contacts */}
      <CsvImportModal
        isOpen={isCsvImportOpen}
        onClose={() => setIsCsvImportOpen(false)}
        title="Import CRM Contacts & Leads (CSV)"
        targetEntityName="CRM Leads"
        expectedHeaders={['name', 'email', 'company', 'role', 'dealStage', 'dealValue']}
        sampleCsvTemplate={`name,email,company,role,dealStage,dealValue\nAlice Morgan,alice@nexuscloud.io,Nexus Cloud,CTO,DEMO_SCHEDULED,32000\nRobert Chen,robert@hypergrowth.ai,HyperGrowth,Head of Growth,NEW_LEAD,18000\nSophia Ramirez,sophia@stellarbrand.com,Stellar Brands,VP Marketing,PROPOSAL_SENT,45000`}
        onConfirmImport={(parsedRows: Record<string, string>[]) => {
          const imported: CrmLead[] = parsedRows.map((r: Record<string, string>, i: number) => ({
            id: `lead-import-${Date.now()}-${i}`,
            name: r.name || 'Imported Lead',
            email: r.email || 'lead@enterprise.com',
            company: r.company || 'Enterprise Account',
            role: r.role || 'Executive',
            score: Math.floor(Math.random() * 20) + 80,
            channel: 'CSV Ingest',
            dealStage: (r.dealStage as any) || 'NEW_LEAD',
            dealValue: Number(r.dealValue) || 20000,
            syncedAt: 'Just now'
          }));
          setCrmLeads((prev) => [...imported, ...prev]);
          showToast(`Successfully imported ${imported.length} leads into local CRM state!`, 'success');
        }}
      />

      {/* P2: Platform Connection Modal for nErgy CRM */}
      <PlatformConnectionModal
        isOpen={isCrmConnectModalOpen}
        onClose={() => setIsCrmConnectModalOpen(false)}
        platformId="nergy_crm"
        platformName="nErgy CRM Enterprise Bridge"
        category="CRM & Pipeline Sync"
        currentStatus={crmConnectedStatus}
        purposeDescription="Synchronizes real-time qualified website leads, conversational research insights, and customer deal stages into your active CRM pipeline."
        knownPermissions={['crm.leads.read', 'crm.leads.write', 'crm.deals.write', 'webhooks.ingest']}
        onConnect={() => {
          setCrmConnectedStatus('CONNECTED');
          showToast('nErgy CRM connection verified and authorized in sandbox', 'success');
        }}
        onDisconnect={() => {
          setCrmConnectedStatus('DISCONNECTED');
          showToast('nErgy CRM disconnected', 'info');
        }}
      />

      {/* Part 13: B4B America 1-on-1 Product Training & Client Education Modal */}
      <B4BAmericaBookingModal
        isOpen={isB4BBookingOpen}
        onClose={() => setIsB4BBookingOpen(false)}
        brandName={brandProfile.brandName}
        onBookingConfirmed={(booking) => {
          showToast(`Training session booked with B4B America for ${booking.date} at ${booking.time}!`, 'success');
        }}
      />
    </div>
  );
};
