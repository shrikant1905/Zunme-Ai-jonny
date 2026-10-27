import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Share2,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BarChart2,
  Plus,
  Trash2,
  Edit3,
  Eye,
  RefreshCw,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  ArrowUpRight,
  Zap,
  Globe,
  MessageCircle,
  ThumbsUp,
  ExternalLink,
  LifeBuoy,
  Settings as SettingsIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlatformConnectionModal } from '../../components/modals/PlatformConnectionModal';
import '../../styles/dashboard.css';
import './SocialSchedulerPage.css';

type SocialPlatform = 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok';
type TabType = 'calendar' | 'queue' | 'composer' | 'accounts' | 'analytics' | 'settings' | 'support';

interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  platforms: SocialPlatform[];
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: 'SCHEDULED' | 'PUBLISHED' | 'DRAFT';
  hasMedia: boolean;
  mediaType?: 'image' | 'video';
  optimalScore?: number;
  engagementStats?: {
    impressions: number;
    likes: number;
    shares: number;
  };
}

interface ConnectedAccount {
  id: string;
  platform: SocialPlatform;
  name: string;
  handle: string;
  platformName: string;
  avatarBg: string;
  accentColor: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'NEEDS_REAUTH';
  followers: string;
  monthlyReach: string;
  lastSynced: string;
}

export const SocialSchedulerPage: React.FC = () => {
  const { showToast } = useApp();
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const slugToTab: Record<string, TabType> = {
    'calendar': 'calendar',
    'dashboard': 'calendar',
    'overview': 'calendar',
    'queue': 'queue',
    'publishing-queue': 'queue',
    'channels': 'accounts',
    'accounts': 'accounts',
    'analytics': 'analytics',
    'channel-analytics': 'analytics',
    'settings': 'settings',
    'support': 'support',
    'help-support': 'support'
  };

  const tabToSlug: Record<TabType, string> = {
    'calendar': 'calendar',
    'queue': 'queue',
    'composer': 'calendar',
    'accounts': 'channels',
    'analytics': 'analytics',
    'settings': 'settings',
    'support': 'support'
  };

  const resolveCurrentTab = (): TabType => {
    if (section && slugToTab[section.toLowerCase()]) {
      return slugToTab[section.toLowerCase()];
    }
    const tabParam = searchParams.get('tab');
    if (tabParam && ['calendar', 'queue', 'composer', 'accounts', 'analytics', 'settings', 'support'].includes(tabParam)) {
      return tabParam as TabType;
    }
    return 'calendar';
  };

  const [activeTab, setActiveTabState] = useState<TabType>(resolveCurrentTab);

  useEffect(() => {
    setActiveTabState(resolveCurrentTab());
  }, [section, searchParams]);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    const slug = tabToSlug[tab];
    navigate(`/social/${slug}`);
  };

  const [platformFilter, setPlatformFilter] = useState<string>('ALL');

  // Month navigation state (defaults to October 2026)
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date(2026, 9, 16));

  const calendarYear = currentCalendarDate.getFullYear();
  const calendarMonthIndex = currentCalendarDate.getMonth();
  const currentMonthLabel = currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentCalendarDate(new Date(calendarYear, calendarMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentCalendarDate(new Date(calendarYear, calendarMonthIndex + 1, 1));
  };

  const handleTodayMonth = () => {
    setCurrentCalendarDate(new Date(2026, 9, 16));
  };

  // Modal State for Composer
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [previewPlatform, setPreviewPlatform] = useState<SocialPlatform>('twitter');

  // Composer Form State
  const [composeTitle, setComposeTitle] = useState('');
  const [composeContent, setComposeContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['twitter', 'linkedin']);
  const [scheduledDate, setScheduledDate] = useState('2026-10-18');
  const [scheduledTime, setScheduledTime] = useState('09:30');
  const [hasMediaAttachment, setHasMediaAttachment] = useState(false);
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);

  // Modal State for Add Channel
  const [isAddChannelOpen, setIsAddChannelOpen] = useState(false);
  const [newChannelPlatform, setNewChannelPlatform] = useState<SocialPlatform>('twitter');
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelHandle, setNewChannelHandle] = useState('');
  const [newChannelFollowers, setNewChannelFollowers] = useState('');

  // Reusable Platform Connection Dialog State
  const [connectionModal, setConnectionModal] = useState<{
    isOpen: boolean;
    platformId: string;
    platformName: string;
    category?: string;
    currentStatus: 'CONNECTED' | 'DISCONNECTED' | 'NEEDS_REAUTH' | 'NOT_CONFIGURED';
    purposeDescription?: string;
    knownPermissions?: string[];
    accountId?: string;
  } | null>(null);

  const openPlatformConnectionDialog = (acc: ConnectedAccount) => {
    const permMap: Record<string, string[]> = {
      twitter: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
      linkedin: ['w_member_social', 'r_liteprofile', 'r_emailaddress'],
      instagram: ['instagram_basic', 'instagram_content_publish', 'pages_read_engagement'],
      youtube: ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube.readonly'],
      tiktok: ['user.info.basic', 'video.upload', 'video.publish']
    };
    setConnectionModal({
      isOpen: true,
      platformId: acc.platform,
      platformName: acc.platformName,
      category: 'Social Media Broadcast',
      currentStatus: acc.status,
      purposeDescription: `Direct automated publishing, queue synchronization, and cross-channel engagement telemetry for ${acc.platformName}.`,
      knownPermissions: permMap[acc.platform] || ['profile.basic', 'content.publish'],
      accountId: acc.id
    });
  };

  const handleModalConnect = () => {
    if (!connectionModal?.accountId) return;
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === connectionModal.accountId
          ? { ...a, status: 'CONNECTED', lastSynced: 'Just now' }
          : a
      )
    );
    showToast(`${connectionModal.platformName} connection authorized!`, 'success');
    setConnectionModal(null);
  };

  const handleModalDisconnect = () => {
    if (!connectionModal?.accountId) return;
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === connectionModal.accountId
          ? { ...a, status: 'DISCONNECTED', lastSynced: 'Disconnected' }
          : a
      )
    );
    showToast(`${connectionModal.platformName} disconnected`, 'info');
    setConnectionModal(null);
  };

  // Initial Scheduled Posts
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: 'post-1',
      title: 'Zunme AI Workspace Launch Breakdown',
      content: '🚀 Excited to unveil Zunme AI: the unified workspace uniting verified web research, conversational reasoning, and rapid copy creation in one sleek environment. Experience the new benchmark for creator velocity.',
      platforms: ['twitter', 'linkedin'],
      scheduledDate: '2026-10-16',
      scheduledTime: '09:00',
      status: 'SCHEDULED',
      hasMedia: true,
      mediaType: 'image',
      optimalScore: 98
    },
    {
      id: 'post-2',
      title: '5 AI Prompt Frameworks for B2B Growth',
      content: 'Most creators use AI prompts backwards. Here are the 5 core structural frameworks our top power users rely on to generate 10x higher quality executive output: 🧵👇',
      platforms: ['twitter'],
      scheduledDate: '2026-10-17',
      scheduledTime: '14:30',
      status: 'SCHEDULED',
      hasMedia: false,
      optimalScore: 94
    },
    {
      id: 'post-3',
      title: 'Instagram Visual Guide: Brand Positioning',
      content: 'Modern brand architecture is about clarity, contrast, and consistency. Swipe through our 7-step playbook for positioning your product in crowded markets. #ProductDesign #AI #Creators',
      platforms: ['instagram'],
      scheduledDate: '2026-10-19',
      scheduledTime: '18:15',
      status: 'SCHEDULED',
      hasMedia: true,
      mediaType: 'image',
      optimalScore: 91
    },
    {
      id: 'post-4',
      title: 'Executive Walkthrough: Live Citation Engine',
      content: 'Full video walkthrough of our real-time Tavily search grounding engine. Never hallucinate facts again when drafting research memos.',
      platforms: ['youtube', 'linkedin'],
      scheduledDate: '2026-10-21',
      scheduledTime: '11:00',
      status: 'SCHEDULED',
      hasMedia: true,
      mediaType: 'video',
      optimalScore: 96
    },
    {
      id: 'post-5',
      title: 'Creator Economy 2026 Trends Report',
      content: 'We surveyed 1,200 digital entrepreneurs. Here are the 3 major shifts in AI content workflows happening right now.',
      platforms: ['linkedin', 'twitter'],
      scheduledDate: '2026-10-14',
      scheduledTime: '10:00',
      status: 'PUBLISHED',
      hasMedia: true,
      mediaType: 'image',
      engagementStats: {
        impressions: 24500,
        likes: 1340,
        shares: 312
      }
    }
  ]);

  // Connected Accounts
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: 'acc-twitter',
      platform: 'twitter',
      name: 'X (Twitter)',
      platformName: 'X / Twitter',
      handle: '@zunme_ai',
      avatarBg: '#0F1419',
      accentColor: '#1DA1F2',
      status: 'CONNECTED',
      followers: '18.4K',
      monthlyReach: '142.5K',
      lastSynced: '10 mins ago'
    },
    {
      id: 'acc-linkedin',
      platform: 'linkedin',
      name: 'LinkedIn Company',
      platformName: 'LinkedIn',
      handle: 'Zunme AI Technologies',
      avatarBg: '#0A66C2',
      accentColor: '#0A66C2',
      status: 'CONNECTED',
      followers: '12.8K',
      monthlyReach: '89.2K',
      lastSynced: '1 hour ago'
    },
    {
      id: 'acc-instagram',
      platform: 'instagram',
      name: 'Instagram Creator',
      platformName: 'Instagram',
      handle: '@zunme.workspace',
      avatarBg: 'linear-gradient(135deg, #F58529, #D62976, #962FBF, #4F5BD5)',
      accentColor: '#E1306C',
      status: 'CONNECTED',
      followers: '34.1K',
      monthlyReach: '210.8K',
      lastSynced: '25 mins ago'
    },
    {
      id: 'acc-youtube',
      platform: 'youtube',
      name: 'YouTube Channel',
      platformName: 'YouTube',
      handle: 'Zunme AI Official',
      avatarBg: '#FF0000',
      accentColor: '#FF0000',
      status: 'CONNECTED',
      followers: '6.9K',
      monthlyReach: '48.0K',
      lastSynced: '3 hours ago'
    },
    {
      id: 'acc-tiktok',
      platform: 'tiktok',
      name: 'TikTok Business',
      platformName: 'TikTok',
      handle: '@zunme_official',
      avatarBg: '#000000',
      accentColor: '#FE2C55',
      status: 'DISCONNECTED',
      followers: '--',
      monthlyReach: '--',
      lastSynced: 'Not connected'
    }
  ]);

  // Synchronize events and search params for Schedule Post and tab navigation
  useEffect(() => {
    const handleOpenComposer = () => {
      setEditingPostId(null);
      setComposeTitle('');
      setComposeContent('');
      setSelectedPlatforms(['twitter', 'linkedin']);
      setScheduledDate('2026-10-18');
      setScheduledTime('09:30');
      setHasMediaAttachment(false);
      setIsComposerOpen(true);
    };

    const handleSwitchTab = (e: any) => {
      if (e.detail && ['calendar', 'queue', 'composer', 'accounts', 'analytics', 'settings', 'support'].includes(e.detail)) {
        setActiveTab(e.detail as TabType);
      }
    };

    window.addEventListener('open-social-composer', handleOpenComposer);
    window.addEventListener('switch-social-tab', handleSwitchTab);

    if (searchParams.get('compose') === 'true') {
      handleOpenComposer();
    }
    const tabParam = searchParams.get('tab');
    if (tabParam && ['calendar', 'queue', 'composer', 'accounts', 'analytics', 'settings', 'support'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }

    return () => {
      window.removeEventListener('open-social-composer', handleOpenComposer);
      window.removeEventListener('switch-social-tab', handleSwitchTab);
    };
  }, [searchParams]);

  // Platform styling helpers
  const getPlatformIcon = (platform: SocialPlatform, size: number = 14) => {
    switch (platform) {
      case 'twitter':
        return <Globe size={size} />;
      case 'linkedin':
        return <Share2 size={size} />;
      case 'instagram':
        return <ImageIcon size={size} />;
      case 'youtube':
        return <ExternalLink size={size} />;
      case 'tiktok':
        return <Zap size={size} />;
      default:
        return <Share2 size={size} />;
    }
  };

  const getPlatformLabel = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter': return 'X (Twitter)';
      case 'linkedin': return 'LinkedIn';
      case 'instagram': return 'Instagram';
      case 'youtube': return 'YouTube';
      case 'tiktok': return 'TikTok';
    }
  };

  const getPlatformBadgeColor = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter': return '#0284C7';
      case 'linkedin': return '#0A66C2';
      case 'instagram': return '#E11D48';
      case 'youtube': return '#DC2626';
      case 'tiktok': return '#111625';
    }
  };

  const getPlatformAvatarBg = (platform: SocialPlatform) => {
    switch (platform) {
      case 'twitter': return '#0F1419';
      case 'linkedin': return '#0A66C2';
      case 'instagram': return 'linear-gradient(135deg, #F58529, #D62976, #962FBF, #4F5BD5)';
      case 'youtube': return '#FF0000';
      case 'tiktok': return '#000000';
      default: return '#6E56CF';
    }
  };

  // Open Post Composer in Edit Mode
  const handleOpenEditPost = (post: ScheduledPost) => {
    setEditingPostId(post.id);
    setComposeTitle(post.title);
    setComposeContent(post.content);
    setSelectedPlatforms(post.platforms.length > 0 ? post.platforms : ['twitter']);
    setScheduledDate(post.scheduledDate);
    setScheduledTime(post.scheduledTime);
    setHasMediaAttachment(post.hasMedia);
    setIsComposerOpen(true);
  };

  // Toggle platform selection in composer
  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length === 1) {
        showToast('At least one target platform must remain selected', 'warning');
        return;
      }
      setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  // AI Repurposing Optimization
  const handleAiRepurpose = () => {
    if (!composeContent.trim()) {
      showToast('Please enter some content before running AI optimization', 'info');
      return;
    }
    setIsAiOptimizing(true);
    setTimeout(() => {
      setIsAiOptimizing(false);
      setComposeContent((prev) => `${prev.trim()}\n\n💡 Pro tip: Verified research briefs accelerate creative throughput by 4.2x. What is your go-to AI workflow?`);
      showToast('AI synthesized platform hooks and tailored caption styling', 'success');
    }, 900);
  };

  // Submit Schedule or Update existing post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeContent.trim()) {
      showToast('Post content is required', 'error');
      return;
    }

    if (editingPostId) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === editingPostId
            ? {
                ...p,
                title: composeTitle.trim() || composeContent.slice(0, 36) + '...',
                content: composeContent,
                platforms: selectedPlatforms,
                scheduledDate,
                scheduledTime,
                hasMedia: hasMediaAttachment,
                mediaType: hasMediaAttachment ? (p.mediaType || 'image') : undefined
              }
            : p
        )
      );
      showToast(`Post updated successfully for ${scheduledDate} at ${scheduledTime}`, 'success');
      setEditingPostId(null);
    } else {
      const newPost: ScheduledPost = {
        id: `post-${Date.now()}`,
        title: composeTitle.trim() || composeContent.slice(0, 36) + '...',
        content: composeContent,
        platforms: selectedPlatforms,
        scheduledDate,
        scheduledTime,
        status: 'SCHEDULED',
        hasMedia: hasMediaAttachment,
        mediaType: hasMediaAttachment ? 'image' : undefined,
        optimalScore: 95
      };

      setPosts([newPost, ...posts]);
      showToast(`Post scheduled across ${selectedPlatforms.length} channels for ${scheduledDate} at ${scheduledTime}`, 'success');
    }

    setIsComposerOpen(false);
    setComposeTitle('');
    setComposeContent('');
    setHasMediaAttachment(false);
  };

  // Add New Social Channel
  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName.trim()) {
      showToast('Please enter a channel name', 'warning');
      return;
    }
    const cleanHandle = newChannelHandle.trim()
      ? (newChannelHandle.trim().startsWith('@') ? newChannelHandle.trim() : `@${newChannelHandle.trim()}`)
      : `@${newChannelName.trim().toLowerCase().replace(/\s+/g, '_')}`;

    const existingIndex = accounts.findIndex(
      (a) => a.platform === newChannelPlatform || a.handle.toLowerCase() === cleanHandle.toLowerCase()
    );

    if (existingIndex >= 0) {
      setAccounts((prev) =>
        prev.map((acc, idx) =>
          idx === existingIndex
            ? {
                ...acc,
                name: newChannelName.trim(),
                handle: cleanHandle,
                status: 'CONNECTED',
                followers: newChannelFollowers.trim() || (acc.followers === '--' ? '18.4K' : acc.followers),
                monthlyReach: acc.monthlyReach === '--' ? '92.0K' : acc.monthlyReach,
                lastSynced: 'Just now'
              }
            : acc
        )
      );
      showToast(`${newChannelName.trim()} (${cleanHandle}) connected & updated!`, 'success');
    } else {
      const newAcc: ConnectedAccount = {
        id: `acc-${Date.now()}`,
        platform: newChannelPlatform,
        name: newChannelName.trim(),
        platformName: getPlatformLabel(newChannelPlatform),
        handle: cleanHandle,
        avatarBg: getPlatformAvatarBg(newChannelPlatform),
        accentColor: getPlatformBadgeColor(newChannelPlatform),
        status: 'CONNECTED',
        followers: newChannelFollowers.trim() || '14.2K',
        monthlyReach: '78.5K',
        lastSynced: 'Just now'
      };
      setAccounts((prev) => [...prev, newAcc]);
      showToast(`${newAcc.name} (${newAcc.handle}) connected successfully!`, 'success');
    }

    setIsAddChannelOpen(false);
    setNewChannelName('');
    setNewChannelHandle('');
    setNewChannelFollowers('');
  };

  // Publish Now Immediate Override
  const handlePublishNow = (id: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? {
              ...p,
              status: 'PUBLISHED',
              engagementStats: { impressions: 140, likes: 18, shares: 4 }
            }
          : p
      )
    );
    showToast('Post successfully broadcast to live social API endpoints!', 'success');
  };

  // Delete Post
  const handleDeletePost = (id: string) => {
    setPosts(posts.filter((p) => p.id !== id));
    showToast('Scheduled post removed from queue', 'info');
  };

  // Toggle Account Connection
  const handleToggleAccount = (id: string) => {
    setAccounts(
      accounts.map((acc) => {
        if (acc.id === id) {
          const isConn = acc.status === 'CONNECTED';
          return {
            ...acc,
            status: isConn ? 'DISCONNECTED' : 'CONNECTED',
            followers: isConn ? '--' : (acc.followers === '--' ? '15.2K' : acc.followers),
            monthlyReach: isConn ? '--' : (acc.monthlyReach === '--' ? '72.0K' : acc.monthlyReach),
            lastSynced: isConn ? 'Disconnected' : 'Just now'
          };
        }
        return acc;
      })
    );
    const target = accounts.find((a) => a.id === id);
    showToast(`${target?.name} ${target?.status === 'CONNECTED' ? 'disconnected' : 'connected successfully'}`, 'info');
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (platformFilter === 'ALL') return true;
    return p.platforms.includes(platformFilter as SocialPlatform);
  });

  const queuedPosts = filteredPosts.filter((p) => p.status === 'SCHEDULED');
  const publishedPosts = filteredPosts.filter((p) => p.status === 'PUBLISHED');

  // Calendar cells generation for responsive monthly calendar
  interface CalendarCell {
    dayNum: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
    dayPosts: ScheduledPost[];
  }

  const calendarCells = useMemo<CalendarCell[]>(() => {
    const firstDayOfWeek = new Date(calendarYear, calendarMonthIndex, 1).getDay(); // 0 (Sun) - 6 (Sat)
    const daysInMonth = new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(calendarYear, calendarMonthIndex, 0).getDate();

    const cells: CalendarCell[] = [];

    // Leading days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const prevMonthIndex = calendarMonthIndex === 0 ? 11 : calendarMonthIndex - 1;
      const prevYear = calendarMonthIndex === 0 ? calendarYear - 1 : calendarYear;
      const mStr = String(prevMonthIndex + 1).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      const dateStr = `${prevYear}-${mStr}-${dStr}`;
      const dayPosts = filteredPosts.filter((p) => p.scheduledDate === dateStr);
      cells.push({
        dayNum: day,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === '2026-10-16',
        isWeekend: cells.length % 7 === 0 || cells.length % 7 === 6,
        dayPosts
      });
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const mStr = String(calendarMonthIndex + 1).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      const dateStr = `${calendarYear}-${mStr}-${dStr}`;
      const dayPosts = filteredPosts.filter((p) => p.scheduledDate === dateStr);
      const dayOfWeek = (firstDayOfWeek + day - 1) % 7;
      cells.push({
        dayNum: day,
        dateStr,
        isCurrentMonth: true,
        isToday: dateStr === '2026-10-16',
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        dayPosts
      });
    }

    // Trailing days from next month to complete the row
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      const trailingCount = 7 - remainder;
      for (let day = 1; day <= trailingCount; day++) {
        const nextMonthIndex = calendarMonthIndex === 11 ? 0 : calendarMonthIndex + 1;
        const nextYear = calendarMonthIndex === 11 ? calendarYear + 1 : calendarYear;
        const mStr = String(nextMonthIndex + 1).padStart(2, '0');
        const dStr = String(day).padStart(2, '0');
        const dateStr = `${nextYear}-${mStr}-${dStr}`;
        const dayPosts = filteredPosts.filter((p) => p.scheduledDate === dateStr);
        const dayOfWeek = cells.length % 7;
        cells.push({
          dayNum: day,
          dateStr,
          isCurrentMonth: false,
          isToday: dateStr === '2026-10-16',
          isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
          dayPosts
        });
      }
    }

    return cells;
  }, [calendarYear, calendarMonthIndex, filteredPosts]);

  return (
    <div className="dashboard-page-container">
      {/* Page Header (Compact & Executive) */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1 className="social-page-title" style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Share2 size={22} color="#6E56CF" />
            Social Content Command Center
          </h1>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setActiveTab('accounts')}
          >
            <Globe size={14} />
            <span>Connected Channels ({accounts.filter((a) => a.status === 'CONNECTED').length})</span>
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsComposerOpen(true)}
          >
            <Plus size={14} />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Top Level Navigation Tabs */}
      <div className="tabs-nav-bar social-scheduler-tabs">
        <button
          className={`tab-item-btn ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <CalendarIcon size={14} />
          <span>Calendar</span>
          <span className="tab-counter-badge">{posts.length}</span>
        </button>

        <button
          className={`tab-item-btn ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          <Clock size={14} />
          <span className="tab-text-full">Publishing Queue</span>
          <span className="tab-text-short">Queue</span>
          <span className="tab-counter-badge">{queuedPosts.length}</span>
        </button>

        <button
          className={`tab-item-btn ${activeTab === 'accounts' ? 'active' : ''}`}
          onClick={() => setActiveTab('accounts')}
        >
          <Globe size={14} />
          <span>Channels</span>
        </button>

        <button
          className={`tab-item-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart2 size={14} />
          <span>Analytics</span>
        </button>
      </div>

      {/* Tab: Calendar View */}
      {activeTab === 'calendar' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="social-calendar-card">
            {/* Calendar Toolbar */}
            <div className="social-calendar-toolbar">
              <div className="calendar-nav-group">
                <h2 className="calendar-month-title">
                  {currentMonthLabel}
                </h2>
                <div className="calendar-nav-buttons">
                  <button
                    className="calendar-nav-btn"
                    onClick={handlePrevMonth}
                    title="Previous Month"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    className="calendar-nav-btn"
                    onClick={handleNextMonth}
                    title="Next Month"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <button
                  className="calendar-today-btn"
                  onClick={handleTodayMonth}
                  title="Jump to Current Date (October 16, 2026)"
                >
                  Today
                </button>
                <div className="calendar-stat-pill">
                  <CalendarIcon size={13} color="#6E56CF" />
                  <span>{filteredPosts.length} posts ({queuedPosts.length} scheduled)</span>
                </div>
              </div>

              {/* Platform Filter Buttons */}
              <div className="calendar-filters-group">
                <span className="filter-label">Filter Channel:</span>
                {[
                  { key: 'ALL', label: 'All Channels', color: '#6E56CF' },
                  { key: 'twitter', label: 'Twitter / X', color: '#0284C7' },
                  { key: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
                  { key: 'instagram', label: 'Instagram', color: '#E11D48' },
                  { key: 'youtube', label: 'YouTube', color: '#DC2626' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setPlatformFilter(item.key)}
                    className={`channel-filter-btn ${platformFilter === item.key ? 'active' : ''}`}
                  >
                    {item.key !== 'ALL' && (
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: platformFilter === item.key ? '#FFFFFF' : item.color
                        }}
                      />
                    )}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Grid Frame */}
            <div className="calendar-grid-wrapper">
              <div className="calendar-grid-container">
                {/* Weekday Row */}
                <div className="calendar-weekday-row">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="calendar-weekday-cell">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="calendar-days-grid">
                  {calendarCells.map((cell) => {
                    const isOutside = !cell.isCurrentMonth;
                    const isToday = cell.isToday;
                    const isWeekend = cell.isWeekend;

                    return (
                      <div
                        key={cell.dateStr}
                        className={`calendar-day-cell ${isOutside ? 'outside-month' : ''} ${isToday ? 'is-today' : ''} ${isWeekend ? 'weekend' : ''}`}
                        onClick={() => {
                          setScheduledDate(cell.dateStr);
                          setEditingPostId(null);
                          setComposeTitle('');
                          setComposeContent('');
                          setIsComposerOpen(true);
                        }}
                      >
                        {/* Day Cell Top Bar */}
                        <div className="day-cell-top">
                          <span className="day-number-badge">
                            {cell.dayNum}
                          </span>
                          <div className="day-cell-actions">
                            {cell.dayPosts.length > 0 && (
                              <span className="day-count-badge">
                                {cell.dayPosts.length}
                              </span>
                            )}
                            <button
                              className="day-quick-add-btn"
                              title={`Schedule post for ${cell.dateStr}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setScheduledDate(cell.dateStr);
                                setEditingPostId(null);
                                setComposeTitle('');
                                setComposeContent('');
                                setIsComposerOpen(true);
                              }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Events list inside cell */}
                        <div className="day-events-list">
                          {cell.dayPosts.slice(0, 1).map((post) => {
                            const primaryPlatform = post.platforms[0] || 'twitter';
                            const platformColor = getPlatformBadgeColor(primaryPlatform);
                            return (
                              <div
                                key={post.id}
                                className={`calendar-event-pill status-${post.status.toLowerCase()}`}
                                style={{ borderLeft: `3px solid ${platformColor}` }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenEditPost(post);
                                }}
                                title={`${post.title} (${post.scheduledTime}) - Click to edit`}
                              >
                                <span
                                  className="event-platform-indicator"
                                  style={{ background: platformColor }}
                                />
                                <span className="event-pill-time">{post.scheduledTime}</span>
                                <span className="event-pill-title">{post.title}</span>
                              </div>
                            );
                          })}
                          {cell.dayPosts.length > 1 && (
                            <div style={{ fontSize: '9px', fontWeight: '800', color: '#6E56CF', paddingLeft: '2px' }}>
                              +{cell.dayPosts.length - 1} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Calendar Legend & Quick Guide */}
            <div className="calendar-legend-bar">
              <div className="calendar-legend-items">
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: '#0284C7' }} />
                  <span>Twitter / X</span>
                </div>
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: '#0A66C2' }} />
                  <span>LinkedIn</span>
                </div>
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: '#E11D48' }} />
                  <span>Instagram</span>
                </div>
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: '#DC2626' }} />
                  <span>YouTube</span>
                </div>
                <div style={{ width: '1px', height: '14px', background: '#E2E8F0', margin: '0 4px' }} />
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: '#10B981' }} />
                  <span>Published</span>
                </div>
                <div className="calendar-legend-item">
                  <span className="legend-dot" style={{ background: '#6E56CF' }} />
                  <span>Scheduled</span>
                </div>
              </div>

              <div className="calendar-legend-hint">
                <Sparkles size={12} color="#6E56CF" />
                <span>Click any date or '+' to schedule. Click post to edit.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Publishing Queue */}
      {activeTab === 'queue' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Queue Statistics */}
          <div className="cards-grid-4">
            <div className="glass-panel">
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase', marginBottom: '8px' }}>
                Pending Queue
              </div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625' }}>
                {queuedPosts.length} Posts
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Ready for automated distribution
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase', marginBottom: '8px' }}>
                Published This Month
              </div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625' }}>
                28 Broadcasts
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                100% successful API delivery
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase', marginBottom: '8px' }}>
                Next Broadcast
              </div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#111625' }}>
                Tomorrow 09:00 AM
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                X &amp; LinkedIn synchronized
              </div>
            </div>

            <div className="glass-panel">
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase', marginBottom: '8px' }}>
                Optimal Time Sync
              </div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625' }}>
                96% Score
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Peak audience engagement timing
              </div>
            </div>
          </div>

          {/* Queue List Cards */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Clock size={18} color="#6E56CF" />
                Upcoming Scheduled Broadcasts
              </div>
              <span className="badge badge-primary">{queuedPosts.length} In Pipeline</span>
            </div>

            {queuedPosts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', color: '#5F6B85' }}>
                <Clock size={36} color="#8C97B0" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                  No posts currently in queue
                </h3>
                <p style={{ fontSize: '13px', marginBottom: '16px' }}>
                  Compose your first cross-platform post to populate your automated publishing schedule.
                </p>
                <button className="btn btn-primary btn-sm" onClick={() => setIsComposerOpen(true)}>
                  <Plus size={14} /> Compose New Post
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {queuedPosts.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      padding: '16px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#6E56CF', background: '#EFEBFC', padding: '2px 8px', borderRadius: '6px' }}>
                          {post.scheduledDate} at {post.scheduledTime}
                        </span>

                        {post.platforms.map((plt) => (
                          <span
                            key={plt}
                            style={{
                              fontSize: '11px',
                              fontWeight: '700',
                              color: getPlatformBadgeColor(plt),
                              background: '#FFFFFF',
                              border: `1px solid ${getPlatformBadgeColor(plt)}30`,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            {getPlatformIcon(plt, 12)}
                            <span>{getPlatformLabel(plt)}</span>
                          </span>
                        ))}

                        {post.hasMedia && (
                          <span style={{ fontSize: '11px', color: '#5F6B85', background: '#E8ECF5', padding: '2px 8px', borderRadius: '6px' }}>
                            Media Attached ({post.mediaType})
                          </span>
                        )}
                      </div>

                      <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                        {post.title}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#5F6B85', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                        {post.content}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePublishNow(post.id)}
                        title="Publish immediately to all selected channels"
                      >
                        <Send size={13} />
                        <span>Publish Now</span>
                      </button>
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => handleOpenEditPost(post)}
                        title="Edit post parameters"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline"
                        style={{ color: '#E11D48', borderColor: '#FEECEB' }}
                        onClick={() => handleDeletePost(post.id)}
                        title="Cancel scheduled broadcast"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Connected Channels */}
      {activeTab === 'accounts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <Globe size={18} color="#6E56CF" />
                  Social Platform Integrations
                </div>
                <div className="panel-subtitle">Authorize social media channels to allow direct automated publishing via OAuth API bridges</div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setNewChannelPlatform('twitter');
                  setNewChannelName('X / Twitter Channel');
                  setNewChannelHandle('@zunme_ai');
                  setNewChannelFollowers('22.4K');
                  setIsAddChannelOpen(true);
                }}
              >
                <Plus size={14} /> Add Channel
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: '#FAFBFD',
                    border: '1px solid #E8ECF5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          background: acc.avatarBg,
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getPlatformIcon(acc.platform, 20)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', margin: 0 }}>
                          {acc.name}
                        </h4>
                        <span style={{ fontSize: '12px', color: '#5F6B85' }}>
                          {acc.handle}
                        </span>
                      </div>
                    </div>

                    <span className={`badge ${acc.status === 'CONNECTED' ? 'badge-success' : 'badge-neutral'}`}>
                      {acc.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '12px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Audience Reach</span>
                      <strong style={{ fontSize: '15px', color: '#111625' }}>{acc.followers}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>30d Monthly Reach</span>
                      <strong style={{ fontSize: '15px', color: '#111625' }}>{acc.monthlyReach}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: '#8C97B0' }}>
                      Sync: {acc.lastSynced}
                    </span>
                    <button
                      className={`btn btn-sm ${acc.status === 'CONNECTED' ? 'btn-outline' : 'btn-primary'}`}
                      onClick={() => openPlatformConnectionDialog(acc)}
                    >
                      {acc.status === 'CONNECTED' ? 'Manage Connection' : 'Connect Channel'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Analytics View */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Top Aggregate KPI Cards */}
          <div className="cards-grid-4">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Total Impressions
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '6px' }}>
                482,500
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>+24.6% vs last 30 days</span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Engagement Rate
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '6px' }}>
                5.4%
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>Above industry avg (3.1%)</span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
                Link Inquiries / Clicks
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '6px' }}>
                14,280
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>High conversion intent</span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Follower Growth
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '6px' }}>
                +3,190
              </div>
              <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <TrendingUp size={13} />
                <span>Across 4 active channels</span>
              </div>
            </div>
          </div>

          {/* Performance by Platform Breakdown */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <BarChart2 size={18} color="#6E56CF" />
                Cross-Platform Distribution Breakdown
              </div>
              <span className="badge badge-primary">Oct 2026 Cycle</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'X (Twitter)', share: 44, reach: '212,300 views', color: '#0284C7' },
                { name: 'LinkedIn Company', share: 32, reach: '154,400 views', color: '#0A66C2' },
                { name: 'Instagram Creator', share: 18, reach: '86,850 views', color: '#E11D48' },
                { name: 'YouTube Video Shorts', share: 6, reach: '28,950 views', color: '#DC2626' }
              ].map((item) => (
                <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ fontWeight: '700', color: '#111625' }}>{item.name}</span>
                    <span style={{ color: '#5F6B85' }}>{item.reach} ({item.share}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: '#E8ECF5', overflow: 'hidden' }}>
                    <div style={{ width: `${item.share}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <SettingsIcon size={18} color="#6E56CF" />
              <span>Social Scheduler Automation Settings</span>
            </div>
          </div>
          <p style={{ color: '#5F6B85', fontSize: '13px', marginBottom: '16px' }}>
            Configure default post timezones, hashtag generation templates, and auto-publishing API retry parameters.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>Default Publishing Timezone</strong>
              <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>Sync posts to target audience local active peaks automatically.</p>
            </div>
            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>API Failure Auto-Retry</strong>
              <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>Up to 3 automated retries with exponential backoff on platform rate limits.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Help & Support */}
      {activeTab === 'support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <LifeBuoy size={20} color="#6E56CF" />
                  <span>Social Integrations Help &amp; Support</span>
                </div>
                <div className="panel-subtitle">
                  OAuth token refreshment guides, multi-platform media aspect ratio specifications, and live developer support.
                </div>
              </div>
              <span className="badge badge-primary">
                Multi-Channel Support
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>OAuth Re-Authorization</strong>
                <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>How to refresh expired tokens for X (Twitter), LinkedIn Company pages, and Instagram Creators.</p>
              </div>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>Media Dimensions</strong>
                <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>Optimal image/video ratios across platforms (1200x675 for X, 1:1 for Instagram, 16:9 for YouTube).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPOSER MODAL (Full Multi-Channel Studio) */}
      {isComposerOpen && (
        <div
          className="dashboard-modal-backdrop"
          onClick={() => {
            setEditingPostId(null);
            setIsComposerOpen(false);
          }}
        >
          <div
            className="dashboard-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '820px' }}
          >
            {/* Modal Header */}
            <div className="panel-header" style={{ padding: '18px 24px', borderBottom: '1px solid #E8ECF5', margin: 0, background: '#FAFAFC', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <div className="panel-title" style={{ fontSize: '17px', color: '#111625', fontWeight: '800' }}>
                <Edit3 size={20} color="#6E56CF" />
                <span>{editingPostId ? 'Edit Scheduled Broadcast' : 'Multi-Channel Post Composer'}</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  setEditingPostId(null);
                  setIsComposerOpen(false);
                }}
                style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Target Platforms Checkboxes */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                  Select Channels for Synchronized Broadcast:
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {(['twitter', 'linkedin', 'instagram', 'youtube'] as SocialPlatform[]).map((plt) => {
                    const isSelected = selectedPlatforms.includes(plt);
                    return (
                      <button
                        type="button"
                        key={plt}
                        onClick={() => togglePlatform(plt)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          background: isSelected ? '#EFEBFC' : '#FAFBFD',
                          border: isSelected ? '2px solid #6E56CF' : '1px solid #E8ECF5',
                          color: isSelected ? '#6E56CF' : '#5F6B85',
                          fontWeight: '700',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        {getPlatformIcon(plt, 14)}
                        <span>{getPlatformLabel(plt)}</span>
                        {isSelected && <Check size={14} color="#6E56CF" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title / Campaign Tag */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Internal Campaign Title (Optional)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Zunme AI Product Launch Sequence #1"
                  value={composeTitle}
                  onChange={(e) => setComposeTitle(e.target.value)}
                />
              </div>

              {/* Main Text Content */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                    Post Copy &amp; Hashtags
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    onClick={handleAiRepurpose}
                    disabled={isAiOptimizing}
                    style={{ fontSize: '11px', padding: '3px 8px', gap: '4px' }}
                  >
                    <Sparkles size={12} color="#6E56CF" />
                    <span>{isAiOptimizing ? 'Synthesizing...' : 'AI Enhance Copy'}</span>
                  </button>
                </div>
                <textarea
                  className="input-field"
                  rows={5}
                  placeholder="Write your cross-platform announcement, insights, or hook..."
                  value={composeContent}
                  onChange={(e) => setComposeContent(e.target.value)}
                  required
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8C97B0', marginTop: '4px' }}>
                  <span>Characters: {composeContent.length}</span>
                  <span>Twitter Cap: 280 • LinkedIn Cap: 3,000 • Instagram: 2,200</span>
                </div>
              </div>

              {/* Media Attachment Simulation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: '#FAFBFD', borderRadius: '10px', border: '1px solid #E8ECF5' }}>
                <input
                  type="checkbox"
                  id="mediaCheck"
                  checked={hasMediaAttachment}
                  onChange={(e) => setHasMediaAttachment(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#6E56CF' }}
                />
                <label htmlFor="mediaCheck" style={{ fontSize: '13px', fontWeight: '600', color: '#111625', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={16} color="#6E56CF" />
                  <span>Attach High-Res Visual / Creative Asset (1200x675)</span>
                </label>
              </div>

              {/* Schedule Timing & Optimal Recommendation */}
              <div className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Publish Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Publish Time (Local Timezone)
                  </label>
                  <input
                    type="time"
                    className="input-field"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #E8ECF5', paddingTop: '16px' }}>
                <span style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={14} />
                  <span>AI Audience Optimal Score: 98/100</span>
                </span>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setEditingPostId(null);
                      setIsComposerOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    <CalendarIcon size={14} />
                    <span>{editingPostId ? 'Save & Update Broadcast' : 'Confirm & Schedule Broadcast'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CHANNEL MODAL */}
      {isAddChannelOpen && (
        <div
          className="dashboard-modal-backdrop"
          onClick={() => setIsAddChannelOpen(false)}
        >
          <div
            className="dashboard-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '540px' }}
          >
            {/* Modal Header */}
            <div className="panel-header" style={{ padding: '18px 24px', borderBottom: '1px solid #E8ECF5', margin: 0, background: '#FAFAFC', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
              <div className="panel-title" style={{ fontSize: '17px', color: '#111625', fontWeight: '800' }}>
                <Globe size={20} color="#6E56CF" />
                <span>Connect Social Channel</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsAddChannelOpen(false)}
                style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddChannel} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Select Platform */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                  Select Platform:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))', gap: '8px' }}>
                  {(['twitter', 'linkedin', 'instagram', 'youtube', 'tiktok'] as SocialPlatform[]).map((plt) => {
                    const isSelected = newChannelPlatform === plt;
                    return (
                      <button
                        type="button"
                        key={plt}
                        onClick={() => {
                          setNewChannelPlatform(plt);
                          if (!newChannelName || newChannelName.includes('Channel') || newChannelName.includes('Creator') || newChannelName.includes('Organization') || newChannelName.includes('Studio')) {
                            if (plt === 'twitter') setNewChannelName('X / Twitter Channel');
                            else if (plt === 'linkedin') setNewChannelName('LinkedIn Organization');
                            else if (plt === 'instagram') setNewChannelName('Instagram Creator');
                            else if (plt === 'youtube') setNewChannelName('YouTube Studio');
                            else if (plt === 'tiktok') setNewChannelName('TikTok Business');
                          }
                        }}
                        style={{
                          padding: '10px 6px',
                          borderRadius: '10px',
                          background: isSelected ? '#EFEBFC' : '#FAFBFD',
                          border: isSelected ? '2px solid #6E56CF' : '1px solid #E8ECF5',
                          color: isSelected ? '#6E56CF' : '#5F6B85',
                          fontWeight: '700',
                          fontSize: '11px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            background: getPlatformAvatarBg(plt),
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {getPlatformIcon(plt, 14)}
                        </div>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                          {getPlatformLabel(plt)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Channel / Account Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Zunme AI Official or Growth Insights"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  required
                />
              </div>

              {/* Handle / Username */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Account Handle / Username
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. @zunme_ai or @creator_hub"
                  value={newChannelHandle}
                  onChange={(e) => setNewChannelHandle(e.target.value)}
                  required
                />
              </div>

              {/* Followers / Audience */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Audience Size / Current Followers (Optional)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. 24.5K"
                  value={newChannelFollowers}
                  onChange={(e) => setNewChannelFollowers(e.target.value)}
                />
              </div>

              {/* OAuth Security Note */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0', fontSize: '12px', color: '#15803D' }}>
                <CheckCircle2 size={16} />
                <span>Encrypted OAuth 2.0 PKCE authentication handshake ready</span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px', borderTop: '1px solid #E8ECF5', paddingTop: '16px' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setIsAddChannelOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={14} />
                  <span>Authorize &amp; Connect Channel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* P2: Reusable Social Platform Connection Modal */}
      {connectionModal && (
        <PlatformConnectionModal
          isOpen={connectionModal.isOpen}
          onClose={() => setConnectionModal(null)}
          platformId={connectionModal.platformId}
          platformName={connectionModal.platformName}
          category={connectionModal.category}
          currentStatus={connectionModal.currentStatus}
          purposeDescription={connectionModal.purposeDescription}
          knownPermissions={connectionModal.knownPermissions}
          onConnect={handleModalConnect}
          onDisconnect={handleModalDisconnect}
        />
      )}
    </div>
  );
};

export default SocialSchedulerPage;
