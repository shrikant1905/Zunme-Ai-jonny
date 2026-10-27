import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  UploadCloud,
  ShieldCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  DollarSign,
  Package,
  Layers,
  Send,
  Search,
  Copy,
  Check,
  Download,
  Bookmark,
  BookmarkCheck,
  Star,
  Globe,
  Youtube,
  Github,
  X,
  Eye,
  SlidersHorizontal,
  Share2,
  FileCode,
  FileText,
  Video,
  Hash,
  Users,
  Briefcase,
  Award,
  Crown,
  Zap,
  CheckCircle,
  Calendar,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HireCreatorModal } from '../../components/modals/HireCreatorModal';
import '../../styles/dashboard.css';
import './CreatorStudioPage.css';

export type CreatorTierLevel = 'Tier 1' | 'Tier 2' | 'Tier 3';

export interface CommunityMarketplaceAsset {
  id: string;
  title: string;
  type: 'Prompt Pack' | 'Template' | 'Workflow' | 'Video Script' | 'Product Placement';
  category: 'Social Media' | 'SEO' | 'Branding' | 'Email' | 'Video' | 'Product Placement';
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorTier: CreatorTierLevel; // Part 11: Creator Tier
  isVerifiedCreator: boolean;
  description: string;
  fullPrompt: string;
  previewOutput?: string;
  tags: string[];
  licensing: 'Commercial Pro' | 'Standard Community' | 'MIT Open Source';
  downloads: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  recommendedModel: string;
}

// Part 12: Vetted Creators for Custom Projects Directory
export interface VettedCreatorItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tier: 'Tier 1 • Emerging Creator' | 'Tier 2 • Verified Pro' | 'Tier 3 • Master Partner';
  tierLevel: CreatorTierLevel;
  role: string;
  bio: string;
  rating: number;
  completedProjects: number;
  startingPrice: string;
  turnaroundTime: string;
  specialties: string[];
  availableForHire: boolean;
}

const INITIAL_COMMUNITY_ASSETS: CommunityMarketplaceAsset[] = [
  {
    id: 'asset-1',
    title: 'B2B SaaS Cold Outreach Sequence Engine',
    type: 'Workflow',
    category: 'Email',
    creatorName: 'Alex Johnson',
    creatorHandle: '@alex_ai_creator',
    creatorAvatar: 'AJ',
    creatorTier: 'Tier 2',
    isVerifiedCreator: true,
    description:
      'A 4-step hyper-personalized email outreach workflow with LinkedIn soft-touch triggers, pain-point hooks, and automated objection handling.',
    fullPrompt: `[ROLE & CONTEXT]
You are an elite B2B enterprise SDR with a 42% reply rate on cold outbound campaigns.

[INPUT VARIABLES]
- Prospect Name: {{prospect_name}}
- Company & Industry: {{company_name}}, {{industry}}
- Recent Company Trigger Event: {{funding_or_hire}}
- Core Pain Point: {{specific_bottleneck}}

[INSTRUCTIONS]
Generate a 3-touch sequence:
Touch 1: Ultra-short observation (<65 words) referencing their recent trigger. Avoid pitch slapping.
Touch 2: Value-add framework (+2 days) offering a 1-page playbook addressing {{specific_bottleneck}}.
Touch 3: Graceful permission opt-out with low-friction ask ("Worth a 4-min chat this Thursday?").`,
    previewOutput:
      'Subject: {{company_name}}\'s expansion into {{industry}} — quick observation\n\nHi {{prospect_name}},\n\nSaw your team\'s recent milestone with {{funding_or_hire}}. Most leaders at this stage hit a wall with {{specific_bottleneck}}...',
    tags: ['ColdOutreach', 'B2B', 'SalesEmail', 'LeadGen'],
    licensing: 'Commercial Pro',
    downloads: 4820,
    rating: 4.95,
    reviewsCount: 142,
    createdAt: '2026-09-12',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-2',
    title: 'Viral YouTube Script & Retention Hook Architecture',
    type: 'Video Script',
    category: 'Video',
    creatorName: 'Elena Rostova',
    creatorHandle: '@elena_visuals',
    creatorAvatar: 'ER',
    creatorTier: 'Tier 2',
    isVerifiedCreator: true,
    description:
      'Structure high-retention video scripts with 3-second psychological visual hooks, curiosity loops, and high-converting CTA bridges.',
    fullPrompt: `[OBJECTIVE]
Write an 8-minute YouTube video script designed for 65%+ average viewer retention.

[SCRIPT FORMATTING REQUIREMENTS]
- [0:00 - 0:15] The Hook: Visual cue, tension premise, and bold contrast claim.
- [0:15 - 1:30] The Stakes: Why 90% fail and what changes today.
- [1:30 - 5:00] The 3 Core Pillars with micro-re-hooks every 45 seconds.
- [5:00 - 7:30] Proof & Real Case Study.
- [7:30 - 8:00] Seamless End-screen Handshake CTA.`,
    previewOutput:
      '[VISUAL: Extreme close-up on monitor showing crashing graph]\n\nNARRATOR: "In 2026, standard content strategies are dead. Here is why the top 1% secretly switched..."',
    tags: ['YouTube', 'Storytelling', 'VideoScript', 'Retention'],
    licensing: 'Commercial Pro',
    downloads: 3650,
    rating: 4.92,
    reviewsCount: 98,
    createdAt: '2026-09-28',
    recommendedModel: 'Zunme Creative Pro'
  },
  {
    id: 'asset-3',
    title: 'Deep Semantic SEO Topical Authority Cluster Blueprint',
    type: 'Prompt Pack',
    category: 'SEO',
    creatorName: 'Marcus Vance',
    creatorHandle: '@marcus_seo',
    creatorAvatar: 'MV',
    creatorTier: 'Tier 3',
    isVerifiedCreator: true,
    description:
      'Transform a single root keyword into a complete 20-article topical authority silo with internal link schema and search intent classifications.',
    fullPrompt: `[SEO EXPERT DIRECTIVE]
Analyze the target pillar entity: {{primary_entity}}

1. Output a master Pillar Page outline targeting high-difficulty commercial search intent.
2. Generate 12 Supporting Cluster Topics categorized into Informational, Commercial, and Transactional.
3. Map exact internal anchor text suggestions connecting child cluster nodes to the parent pillar.`,
    tags: ['TopicalAuthority', 'SemanticSEO', 'ContentStrategy'],
    licensing: 'Commercial Pro',
    downloads: 5120,
    rating: 4.98,
    reviewsCount: 210,
    createdAt: '2026-10-02',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-4',
    title: 'Omnichannel Social Repurposing Engine (Twitter/X & LinkedIn)',
    type: 'Template',
    category: 'Social Media',
    creatorName: 'Sophia Lin',
    creatorHandle: '@sophialin_ai',
    creatorAvatar: 'SL',
    creatorTier: 'Tier 1',
    isVerifiedCreator: true,
    description:
      'Ingest any long-form essay, video transcript, or podcast and instantly synthesize 5 high-engagement LinkedIn posts and 2 viral Twitter threads.',
    fullPrompt: `[REPURPOSING SYSTEM]
Input Raw Material: {{source_text_or_notes}}

Generate:
- 1 Contrarian LinkedIn Post (Hook -> Staccato Breakdown -> Lesson -> Question CTA)
- 1 Actionable Cheat-Sheet List Post
- 1 7-Tweet Thread with cliffhanger hooks on tweet 1 & 2
- 1 Personal Reflection Narrative`,
    tags: ['SocialMedia', 'LinkedInHooks', 'Threads', 'ViralGrowth'],
    licensing: 'MIT Open Source',
    downloads: 2940,
    rating: 4.88,
    reviewsCount: 76,
    createdAt: '2026-10-05',
    recommendedModel: 'Zunme Turbo'
  },
  {
    id: 'asset-5',
    title: 'Executive Brand Voice & Tone Identity Guidebook',
    type: 'Template',
    category: 'Branding',
    creatorName: 'Alex Johnson',
    creatorHandle: '@alex_ai_creator',
    creatorAvatar: 'AJ',
    creatorTier: 'Tier 2',
    isVerifiedCreator: true,
    description:
      'Defines your brand voice guidelines, vocabulary blacklist, positioning pillars, and executive communication rules for consistent AI outputs.',
    fullPrompt: `[BRAND IDENTITY PROTOCOL]
Define the brand voice for {{brand_name}}.

Sections:
1. Brand Persona & Core Archetype
2. Tone Modulations: (Marketing vs Support vs Technical Docs)
3. "We Say This / We Never Say That" Vocabulary Guide
4. Sentence Structure, Cadence & Formatting Standard`,
    tags: ['BrandVoice', 'ExecutiveBranding', 'StyleGuide'],
    licensing: 'Standard Community',
    downloads: 1870,
    rating: 4.85,
    reviewsCount: 52,
    createdAt: '2026-09-18',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-6',
    title: 'High-Converting Paid Ad Copy Matrix (Meta & Google Ads)',
    type: 'Prompt Pack',
    category: 'Social Media',
    creatorName: 'David Kim',
    creatorHandle: '@davidkim_growth',
    creatorAvatar: 'DK',
    creatorTier: 'Tier 1',
    isVerifiedCreator: false,
    description:
      '30 modular ad copy variations targeting Problem-Agitate-Solve (PAS) and Before-After-Bridge (BAB) frameworks for performance marketers.',
    fullPrompt: `[PERFORMANCE AD CREATIVE]
Product / Offer: {{offer_details}}
Target Avatar: {{target_customer}}

Generate:
- 5 Short-form Facebook Ad primary texts (<125 characters)
- 5 Storytelling long-form copy variations
- 10 High-CTR Headlines with curiosity triggers
- 5 Google Search Responsive Ad Headlines & Descriptions`,
    tags: ['MetaAds', 'PaidSocial', 'Copywriting', 'Conversion'],
    licensing: 'Commercial Pro',
    downloads: 3290,
    rating: 4.91,
    reviewsCount: 84,
    createdAt: '2026-10-08',
    recommendedModel: 'Zunme Creative Pro'
  },
  {
    id: 'asset-7',
    title: 'Brand Sponsorship Integration Kit & Product Placement Schema',
    type: 'Product Placement',
    category: 'Product Placement',
    creatorName: 'Marcus Vance',
    creatorHandle: '@marcus_seo',
    creatorAvatar: 'MV',
    creatorTier: 'Tier 3',
    isVerifiedCreator: true,
    description:
      'Complete contract schema, native video sponsor integration overlay, and automated conversion tracking for brand product placements in AI content.',
    fullPrompt: `[SPONSORSHIP & PRODUCT PLACEMENT FRAMEWORK]
Target Sponsor: {{sponsor_brand}}
Product / Offering: {{product_name}}
Content Medium: {{video_or_article_or_newsletter}}

[INTEGRATION DIRECTIVE]
1. Seamless contextual product bridge (no jarring commercial breaks).
2. Natural mention during problem-solution demonstration.
3. Trackable CTA handshake with verified discount code / referral webhook.`,
    previewOutput:
      'SPONSOR TRANSITION [03:45]: "Before we break down the algorithm, this video is powered by {{sponsor_brand}}, the tool we personally use to benchmark live server loads..."',
    tags: ['ProductPlacement', 'Sponsorship', 'BrandDeals', 'Monetization'],
    licensing: 'Commercial Pro',
    downloads: 4190,
    rating: 4.97,
    reviewsCount: 164,
    createdAt: '2026-10-10',
    recommendedModel: 'Zunme Omni-4'
  },
  {
    id: 'asset-8',
    title: 'E-Commerce 3D Virtual Product Placement Reel Blueprint',
    type: 'Product Placement',
    category: 'Product Placement',
    creatorName: 'Elena Rostova',
    creatorHandle: '@elena_visuals',
    creatorAvatar: 'ER',
    creatorTier: 'Tier 2',
    isVerifiedCreator: true,
    description:
      'Spatial anchors and visual prompts for seamlessly integrating physical merchant products into AI-generated lifestyle videos and 3D scenes.',
    fullPrompt: `[3D SCENE PRODUCT EMBEDDING]
Product CAD/Photo Reference: {{product_image_url}}
Scene Context: {{modern_office_or_lifestyle_interior}}
Camera Orbit: 360-degree smooth cinematic pan highlighting product ergonomics and brand logo.`,
    previewOutput:
      'Render Spec: 4K 60FPS spatial product integration with dynamic ambient occlusion matching scene illumination.',
    tags: ['ProductPlacement', '3DVideo', 'Ecommerce', 'Reels'],
    licensing: 'Commercial Pro',
    downloads: 3280,
    rating: 4.93,
    reviewsCount: 88,
    createdAt: '2026-10-12',
    recommendedModel: 'Zunme Creative Pro'
  }
];

// Part 12: Vetted Directory of Creators Available for Custom Bespoke Projects
const VETTED_CREATORS_DIRECTORY: VettedCreatorItem[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    handle: '@marcus_seo',
    avatar: 'MV',
    tier: 'Tier 3 • Master Partner',
    tierLevel: 'Tier 3',
    role: 'Enterprise Topical Authority SEO & Semantic Link Architect',
    bio: 'Pioneering multimodal prompt architecture, enterprise SEO blueprints, and executive content frameworks. Trusted by 5,000+ creators on Zunme AI.',
    rating: 4.98,
    completedProjects: 62,
    startingPrice: '$250',
    turnaroundTime: '48 Hours',
    specialties: ['Topical Clusters', 'Semantic SEO', 'Programmatic Workflows', 'Internal Link Graph'],
    availableForHire: true
  },
  {
    id: 'alex-johnson',
    name: 'Alex Johnson',
    handle: '@alex_ai_creator',
    avatar: 'AJ',
    tier: 'Tier 2 • Verified Pro',
    tierLevel: 'Tier 2',
    role: 'B2B Outbound SDR & Autonomous Workflow Automation Architect',
    bio: 'Crafting high-converting B2B cold outbound sequences, automated objection handling, and lead enrichment pipelines for high-growth SaaS teams.',
    rating: 4.95,
    completedProjects: 38,
    startingPrice: '$150',
    turnaroundTime: '24–48 Hours',
    specialties: ['Cold Outreach Sequences', 'B2B Sales Workflows', 'Copywriting', 'Zapier/Make Chaining'],
    availableForHire: true
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    handle: '@elena_visuals',
    avatar: 'ER',
    tier: 'Tier 2 • Verified Pro',
    tierLevel: 'Tier 2',
    role: 'High-Retention Video Scriptwriter & Storyboard Creative Director',
    bio: 'Specializing in psychological visual hooks, YouTube audience retention loops, and short-form storytelling frameworks that convert viewers into customers.',
    rating: 4.92,
    completedProjects: 29,
    startingPrice: '$180',
    turnaroundTime: '24 Hours',
    specialties: ['YouTube Scripting', 'Retention Hooks', 'Storyboarding', 'Short-Form Video'],
    availableForHire: true
  },
  {
    id: 'sophia-lin',
    name: 'Sophia Lin',
    handle: '@sophialin_ai',
    avatar: 'SL',
    tier: 'Tier 1 • Emerging Creator',
    tierLevel: 'Tier 1',
    role: 'Omnichannel Social Repurposing Specialist & Content Strategist',
    bio: 'Transforming long-form technical essays and video transcripts into viral LinkedIn carousels, Twitter/X threads, and executive newsletter editions.',
    rating: 4.88,
    completedProjects: 14,
    startingPrice: '$100',
    turnaroundTime: '24–48 Hours',
    specialties: ['LinkedIn Carousels', 'X/Twitter Threads', 'Newsletter Digests', 'Brand Voice'],
    availableForHire: true
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    handle: '@davidkim_growth',
    avatar: 'DK',
    tier: 'Tier 1 • Emerging Creator',
    tierLevel: 'Tier 1',
    role: 'Performance Paid Ads Copywriter (Meta & Google Ads Engine)',
    bio: 'Direct response copywriter building high-CTR responsive ads and conversion-tested hook frameworks for performance e-commerce and SaaS brands.',
    rating: 4.91,
    completedProjects: 18,
    startingPrice: '$120',
    turnaroundTime: '24 Hours',
    specialties: ['Meta Paid Ads', 'Google Search Ads', 'PAS Framework', 'Conversion Copy'],
    availableForHire: true
  }
];

export const CreatorStudioPage: React.FC = () => {
  const {
    user,
    creatorSubmissions,
    addCreatorSubmission,
    showToast
  } = useApp();

  // Navigation Tabs with Route Sync
  type CreatorTabType =
    | 'Marketplace & Showcase'
    | 'Hire Creators'
    | 'Upload Content'
    | 'My Submissions'
    | 'Creator Profile'
    | 'Earnings & Payouts';

  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const slugToTab: Record<string, CreatorTabType> = {
    'marketplace': 'Marketplace & Showcase',
    'showcase': 'Marketplace & Showcase',
    'dashboard': 'Marketplace & Showcase',
    'hire': 'Hire Creators',
    'hire-creators': 'Hire Creators',
    'directory': 'Hire Creators',
    'upload': 'Upload Content',
    'publish': 'Upload Content',
    'submissions': 'My Submissions',
    'reviews': 'My Submissions',
    'earnings': 'Earnings & Payouts',
    'payouts': 'Earnings & Payouts',
    'monetization': 'Earnings & Payouts',
    'profile': 'Creator Profile',
    'tiers': 'Creator Profile'
  };

  const tabToSlug: Record<CreatorTabType, string> = {
    'Marketplace & Showcase': 'marketplace',
    'Hire Creators': 'hire',
    'Upload Content': 'upload',
    'My Submissions': 'submissions',
    'Earnings & Payouts': 'earnings',
    'Creator Profile': 'profile'
  };

  const resolveCurrentTab = (): CreatorTabType => {
    if (section && slugToTab[section.toLowerCase()]) {
      return slugToTab[section.toLowerCase()];
    }
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      [
        'Marketplace & Showcase',
        'Hire Creators',
        'Upload Content',
        'My Submissions',
        'Creator Profile',
        'Earnings & Payouts'
      ].includes(tabParam)
    ) {
      return tabParam as CreatorTabType;
    }
    return 'Marketplace & Showcase';
  };

  const [activeTab, setActiveTabState] = useState<CreatorTabType>(resolveCurrentTab);

  useEffect(() => {
    setActiveTabState(resolveCurrentTab());
  }, [section, searchParams]);

  const setActiveTab = (tab: CreatorTabType) => {
    setActiveTabState(tab);
    const slug = tabToSlug[tab];
    navigate(slug === 'marketplace' ? '/creator/marketplace' : `/creator/${slug}`);
  };

  // Community Assets State
  const [communityAssets, setCommunityAssets] = useState<CommunityMarketplaceAsset[]>(INITIAL_COMMUNITY_ASSETS);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'ALL' | 'Tier 1' | 'Tier 2' | 'Tier 3'>('ALL'); // Part 11 Filter
  const [selectedSort, setSelectedSort] = useState<'Most Popular' | 'Newest' | 'Top Rated'>('Most Popular');
  const [searchQuery, setSearchQuery] = useState('');

  // Part 12: Marketplace View Switcher (Blueprints vs Hire Creators Directory)
  const [marketplaceViewMode, setMarketplaceViewMode] = useState<'BLUEPRINTS' | 'HIRE_DIRECTORY'>('BLUEPRINTS');

  // Hire Creator Modal State
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [hireModalCreator, setHireModalCreator] = useState<VettedCreatorItem | null>(null);

  // Selected Asset for Modal
  const [activeModalAsset, setActiveModalAsset] = useState<CommunityMarketplaceAsset | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Creator Profile State
  const [isFollowingCreator, setIsFollowingCreator] = useState(false);
  const [followersCount, setFollowersCount] = useState(2840);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Prompt Pack' | 'Template' | 'Workflow' | 'Video Script'>('Prompt Pack');
  const [category, setCategory] = useState<'Social Media' | 'SEO' | 'Branding' | 'Email' | 'Video'>('Social Media');
  const [description, setDescription] = useState('');
  const [fullPrompt, setFullPrompt] = useState('');
  const [tagsInput, setTagsInput] = useState('ViralHooks, SocialGrowth, Engagement');
  const [licensing, setLicensing] = useState<'Commercial Pro' | 'Standard Community' | 'MIT Open Source'>('Commercial Pro');
  const [recommendedModel, setRecommendedModel] = useState('Zunme Omni-4');

  // Handle Form Submission
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !fullPrompt.trim()) {
      showToast('Please provide a title, description, and full prompt instructions', 'warning');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newAsset: CommunityMarketplaceAsset = {
      id: `asset-${Date.now()}`,
      title: title.trim(),
      type,
      category,
      creatorName: user?.fullName || 'Alex Johnson',
      creatorHandle: `@${(user?.fullName || 'alex_creator').toLowerCase().replace(/\s+/g, '_')}`,
      creatorAvatar: (user?.fullName || 'AJ').slice(0, 2).toUpperCase(),
      creatorTier: 'Tier 2', // Default active tier for user
      isVerifiedCreator: true,
      description: description.trim(),
      fullPrompt: fullPrompt.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['AI', category],
      licensing,
      downloads: 1,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
      recommendedModel
    };

    setCommunityAssets([newAsset, ...communityAssets]);

    addCreatorSubmission({
      title: title.trim(),
      type,
      category,
      status: 'APPROVED',
      feedback: 'Verified automated editorial validation passed.'
    });

    showToast(`Published "${title.trim()}" to the Creator Showcase!`, 'success');

    setTitle('');
    setDescription('');
    setFullPrompt('');
    setActiveTab('Marketplace & Showcase');
  };

  // 1-Click Actions
  const handleCopyPrompt = (asset: CommunityMarketplaceAsset) => {
    navigator.clipboard.writeText(asset.fullPrompt);
    setCopiedPromptId(asset.id);
    showToast('Prompt copied to clipboard!', 'success');
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleForkToLibrary = (asset: CommunityMarketplaceAsset) => {
    showToast(`Blueprint "${asset.title}" successfully forked to your Personal Library!`, 'success');
  };

  const handleDownloadAsset = (asset: CommunityMarketplaceAsset) => {
    const content = `# ${asset.title}\n\n**Category**: ${asset.category} | **Type**: ${asset.type}\n**Creator**: ${asset.creatorName} (${asset.creatorHandle}) [${asset.creatorTier}]\n**License**: ${asset.licensing}\n**Recommended Model**: ${asset.recommendedModel}\n\n## Description\n${asset.description}\n\n## Full Blueprint / Prompt\n\`\`\`\n${asset.fullPrompt}\n\`\`\`\n`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded "${asset.title}" (.md)`, 'success');
  };

  const handleToggleFollow = () => {
    if (isFollowingCreator) {
      setIsFollowingCreator(false);
      setFollowersCount((prev) => prev - 1);
      showToast('Unfollowed creator', 'info');
    } else {
      setIsFollowingCreator(true);
      setFollowersCount((prev) => prev + 1);
      showToast('Following Alex Johnson! You will get notified of new blueprints.', 'success');
    }
  };

  const handleOpenHireModal = (creator: VettedCreatorItem) => {
    setHireModalCreator(creator);
    setIsHireModalOpen(true);
  };

  // Filtered & Sorted Showcase Assets (with Part 11 Tier Filtering)
  const filteredAssets = useMemo(() => {
    return communityAssets
      .filter((asset) => {
        const matchesCategory = selectedCategory === 'ALL' || asset.category === selectedCategory;
        const matchesTier = selectedTierFilter === 'ALL' || asset.creatorTier === selectedTierFilter;
        const matchesSearch =
          asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesTier && matchesSearch;
      })
      .sort((a, b) => {
        if (selectedSort === 'Most Popular') return b.downloads - a.downloads;
        if (selectedSort === 'Newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (selectedSort === 'Top Rated') return b.rating - a.rating;
        return 0;
      });
  }, [communityAssets, selectedCategory, selectedTierFilter, selectedSort, searchQuery]);

  const totalMarketplaceDownloads = communityAssets.reduce((sum, a) => sum + a.downloads, 0);

  return (
    <div className="dashboard-page-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Sparkles size={26} color="#6E56CF" />
            Creator Studio &amp; Marketplace
          </h1>
          <p className="dashboard-subtitle">
            Discover verified prompt packs, workflow blueprints, and hire elite vetted AI creators for custom bespoke projects.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setActiveTab('Hire Creators');
              setMarketplaceViewMode('HIRE_DIRECTORY');
            }}
          >
            <Briefcase size={14} />
            <span>Hire Creators Directory</span>
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('Upload Content')}
          >
            <UploadCloud size={14} />
            <span>Publish New Blueprint</span>
          </button>
        </div>
      </div>

      {/* Creator Profile Portfolio Banner */}
      <div className="creator-profile-card">
        <div className="creator-profile-header">
          <div className="creator-bio-section">
            <div className="creator-avatar-wrap">
              <div className="creator-avatar-circle">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              <div className="creator-avatar-badge" title="Verified Creator">
                <CheckCircle2 size={13} />
              </div>
            </div>

            <div className="creator-details">
              <div className="creator-name-row">
                <h2>{user?.fullName || 'Alex Johnson'}</h2>
                <span className="creator-handle">@alex_ai_creator</span>
                {/* Part 11: Official Creator Tier Badge */}
                <span className="creator-tier-badge tier-2">
                  <ShieldCheck size={12} />
                  <span>Tier 2 • Verified Pro</span>
                </span>
                <span className="creator-verified-tag">
                  <Award size={13} />
                  Verified Prompt Architect
                </span>
              </div>
              <p className="creator-bio-text">
                AI systems architect crafting high-converting B2B cold outbound sequences, semantic SEO blueprints, and autonomous content workflows for high-growth teams.
              </p>
              <div className="creator-specialties-row">
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#8C97B0', marginRight: '4px' }}>
                  Specialties:
                </span>
                <span className="specialty-tag">B2B Outbound</span>
                <span className="specialty-tag">Semantic SEO</span>
                <span className="specialty-tag">Workflow Automation</span>
                <span className="specialty-tag">Copywriting</span>
              </div>
            </div>
          </div>

          <div className="creator-stats-socials">
            <div className="creator-stats-pills">
              <div className="stat-mini-item">
                <span className="stat-mini-num">{communityAssets.length}</span>
                <span className="stat-mini-lbl">Blueprints</span>
              </div>
              <div className="stat-mini-item">
                <span className="stat-mini-num">{totalMarketplaceDownloads.toLocaleString()}</span>
                <span className="stat-mini-lbl">Downloads</span>
              </div>
              <div className="stat-mini-item">
                <span className="stat-mini-num">{followersCount.toLocaleString()}</span>
                <span className="stat-mini-lbl">Followers</span>
              </div>
              <div className="stat-mini-item">
                <span className="stat-mini-num" style={{ color: '#D97706' }}>4.9 ★</span>
                <span className="stat-mini-lbl">Avg Rating</span>
              </div>
            </div>

            <div className="creator-actions-row">
              <button
                className={`btn btn-sm ${isFollowingCreator ? 'btn-outline' : 'btn-primary'}`}
                onClick={handleToggleFollow}
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px', fontSize: '12px' }}
              >
                <Users size={13} />
                <span>{isFollowingCreator ? 'Following' : 'Follow Creator'}</span>
              </button>

              <div className="creator-social-links">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="Twitter / X"
                >
                  <Share2 size={14} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="YouTube"
                >
                  <Youtube size={14} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="GitHub"
                >
                  <Github size={14} />
                </a>
                <a
                  href="https://zunme.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn-link"
                  title="Portfolio Website"
                >
                  <Globe size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Sub-Navigation Tabs */}
      <div className="glass-panel creator-subnav-panel">
        <div className="creator-subnav-pills">
          {[
            { key: 'Marketplace & Showcase', label: 'Public Asset Showcase' },
            { key: 'Hire Creators', label: 'Hire Creators Directory' },
            { key: 'Upload Content', label: 'Publish New Blueprint' },
            { key: 'My Submissions', label: 'Submission Reviews' },
            { key: 'Creator Profile', label: 'Creator Tier & Progression' },
            { key: 'Earnings & Payouts', label: '💰 Wallet & Payouts ($3,420)' }
          ].map((tab) => (
            <button
              key={tab.key}
              className={`filter-pill creator-subnav-pill ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.key as any);
                if (tab.key === 'Hire Creators') {
                  setMarketplaceViewMode('HIRE_DIRECTORY');
                } else if (tab.key === 'Marketplace & Showcase') {
                  setMarketplaceViewMode('BLUEPRINTS');
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: PUBLIC ASSET SHOWCASE & MARKETPLACE (Part 11 & Part 12) */}
      {(activeTab === 'Marketplace & Showcase' || activeTab === 'Hire Creators') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Part 12: Marketplace View Switcher Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div className="marketplace-view-toggle">
              <button
                type="button"
                className={`marketplace-view-btn ${marketplaceViewMode === 'BLUEPRINTS' ? 'active' : ''}`}
                onClick={() => setMarketplaceViewMode('BLUEPRINTS')}
              >
                <Package size={14} />
                <span>Asset Blueprints ({filteredAssets.length})</span>
              </button>

              <button
                type="button"
                className={`marketplace-view-btn ${marketplaceViewMode === 'HIRE_DIRECTORY' ? 'active' : ''}`}
                onClick={() => setMarketplaceViewMode('HIRE_DIRECTORY')}
              >
                <Briefcase size={14} />
                <span>Part 12: Hire Creators Directory ({VETTED_CREATORS_DIRECTORY.length})</span>
              </button>
            </div>

            {/* Quick banner notice */}
            <div style={{ fontSize: '12px', color: '#5F6B85', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#059669" />
              <span>All Tier 2 &amp; Tier 3 creators are verified for custom project delivery</span>
            </div>
          </div>

          {/* VIEW A: ASSET BLUEPRINTS SHOWCASE (with Part 11 Tier Badges & Filter) */}
          {marketplaceViewMode === 'BLUEPRINTS' && (
            <>
              {/* Filtering, Search & Sorting Bar */}
              <div className="marketplace-filter-bar">
                {/* Category Pills */}
                <div className="categories-pill-group">
                  {['ALL', 'Social Media', 'SEO', 'Branding', 'Email', 'Video', 'Product Placement'].map((cat) => (
                    <button
                      key={cat}
                      className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                      style={cat === 'Product Placement' && selectedCategory === cat ? { background: '#9333EA', borderColor: '#9333EA' } : undefined}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === 'ALL' ? 'All Categories' : cat === 'Product Placement' ? '🎁 Product Placement & Brand Deals' : cat}
                    </button>
                  ))}
                </div>

                {/* Part 11: Creator Tier Filter & Sort Controls */}
                <div className="filter-controls-right">
                  {/* Creator Tier Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} color="#6E56CF" />
                    <select
                      className="sort-select-box"
                      value={selectedTierFilter}
                      onChange={(e) => setSelectedTierFilter(e.target.value as any)}
                      title="Filter by Creator Tier"
                    >
                      <option value="ALL">All Creator Tiers</option>
                      <option value="Tier 3">Tier 3 (Master Partner)</option>
                      <option value="Tier 2">Tier 2 (Verified Pro)</option>
                      <option value="Tier 1">Tier 1 (Emerging Creator)</option>
                    </select>
                  </div>

                  <div className="marketplace-search">
                    <Search size={15} className="marketplace-search-icon" />
                    <input
                      type="text"
                      placeholder="Search prompts, blueprints, tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="marketplace-search-input"
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SlidersHorizontal size={14} color="#8C97B0" />
                    <select
                      className="sort-select-box"
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value as any)}
                    >
                      <option value="Most Popular">Most Popular</option>
                      <option value="Newest">Newest First</option>
                      <option value="Top Rated">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Asset Grid */}
              <div className="marketplace-grid">
                {filteredAssets.length === 0 ? (
                  <div
                    style={{
                      gridColumn: '1 / -1',
                      textAlign: 'center',
                      padding: '64px',
                      color: '#5F6B85',
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid #E8ECF5'
                    }}
                  >
                    <Package size={36} color="#8C97B0" style={{ margin: '0 auto 12px' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                      No Blueprints Found
                    </h3>
                    <p style={{ fontSize: '13px', color: '#5F6B85' }}>
                      Try relaxing your search query or switching creator tier filter.
                    </p>
                  </div>
                ) : (
                  filteredAssets.map((asset) => (
                    <div key={asset.id} className="marketplace-asset-card">
                      <div>
                        {/* Top Row: Type & License */}
                        <div className="asset-card-top-row">
                          <span className="asset-type-badge">
                            {asset.type === 'Video Script' ? (
                              <Video size={12} />
                            ) : asset.type === 'Workflow' ? (
                              <Layers size={12} />
                            ) : (
                              <FileText size={12} />
                            )}
                            <span>{asset.type}</span>
                          </span>
                          <span className="asset-license-badge">{asset.licensing}</span>
                        </div>

                        {/* Title */}
                        <h3
                          className="asset-card-title"
                          onClick={() => setActiveModalAsset(asset)}
                        >
                          {asset.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="asset-card-desc">{asset.description}</p>

                        {/* Tags */}
                        <div className="asset-tags-wrap">
                          {asset.tags.map((tag, idx) => (
                            <span key={idx} className="asset-tag-pill">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        {/* Creator & Metrics with Part 11 Tier Badge */}
                        <div className="asset-card-creator-row">
                          <div className="creator-mini-meta">
                            <div className="creator-mini-avatar">{asset.creatorAvatar}</div>
                            <div className="creator-mini-name">
                              <span>{asset.creatorName}</span>
                              {/* Part 11: Tier Badge pill */}
                              <span
                                className={`creator-tier-badge ${
                                  asset.creatorTier === 'Tier 3'
                                    ? 'tier-3'
                                    : asset.creatorTier === 'Tier 2'
                                    ? 'tier-2'
                                    : 'tier-1'
                                }`}
                              >
                                {asset.creatorTier === 'Tier 3' && <Crown size={10} />}
                                {asset.creatorTier === 'Tier 2' && <ShieldCheck size={10} />}
                                {asset.creatorTier === 'Tier 1' && <Award size={10} />}
                                <span>
                                  {asset.creatorTier === 'Tier 3'
                                    ? 'Tier 3'
                                    : asset.creatorTier === 'Tier 2'
                                    ? 'Tier 2 Pro'
                                    : 'Tier 1'}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className="asset-metric-indicators">
                            <span className="metric-indicator-item" title="Rating">
                              <Star size={12} color="#D97706" fill="#D97706" />
                              <span>{asset.rating}</span>
                            </span>
                            <span className="metric-indicator-item" title="Downloads">
                              <Download size={12} />
                              <span>{asset.downloads.toLocaleString()}</span>
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="asset-card-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            style={{ flex: 1 }}
                            onClick={() => setActiveModalAsset(asset)}
                          >
                            <Eye size={13} />
                            <span>Inspect Blueprint</span>
                          </button>

                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleCopyPrompt(asset)}
                            title="Quick Copy Prompt"
                          >
                            {copiedPromptId === asset.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                          </button>

                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleForkToLibrary(asset)}
                            title="Fork to My Library"
                          >
                            <Bookmark size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* VIEW B: PART 12 — HIRE CREATORS FOR SPECIAL CUSTOM PROJECTS DIRECTORY */}
          {marketplaceViewMode === 'HIRE_DIRECTORY' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Directory Banner */}
              <div
                style={{
                  padding: '24px',
                  background: 'linear-gradient(135deg, #1E1B4B 0%, #31104B 100%)',
                  borderRadius: 'var(--radius-xl)',
                  color: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ maxWidth: '640px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: '#FBBF24',
                        background: 'rgba(251,191,36,0.15)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                      }}
                    >
                      Part 12 — Direct Client Commissions
                    </span>
                    <span style={{ fontSize: '12px', color: '#A5B4FC' }}>Escrow Guaranteed</span>
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', marginBottom: '6px' }}>
                    Hire Verified AI Creators for Custom Projects
                  </h2>
                  <p style={{ fontSize: '13px', color: '#C7D2FE', lineHeight: '1.5', margin: 0 }}>
                    Commission vetted Tier 2 and Tier 3 creators for specialized prompt engineering, bespoke multi-agent workflows, video scripts, and custom brand AI model tuning.
                  </p>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ background: '#F59E0B', borderColor: '#F59E0B', color: '#1E1B4B', fontWeight: '800' }}
                  onClick={() => {
                    handleOpenHireModal(VETTED_CREATORS_DIRECTORY[0]);
                  }}
                >
                  <Briefcase size={15} />
                  <span>Post Custom Project Brief</span>
                </button>
              </div>

              {/* Creators Directory Grid */}
              <div className="hire-directory-grid">
                {VETTED_CREATORS_DIRECTORY.map((c) => (
                  <div key={c.id} className="hire-creator-card">
                    <div>
                      {/* Top Creator Meta */}
                      <div className="hire-creator-top">
                        <div className="hire-creator-avatar">{c.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                              {c.name}
                            </h3>
                            {/* Tier Badge */}
                            <span
                              className={`creator-tier-badge ${
                                c.tierLevel === 'Tier 3'
                                  ? 'tier-3'
                                  : c.tierLevel === 'Tier 2'
                                  ? 'tier-2'
                                  : 'tier-1'
                              }`}
                            >
                              {c.tierLevel === 'Tier 3' && <Crown size={11} />}
                              {c.tierLevel === 'Tier 2' && <ShieldCheck size={11} />}
                              {c.tierLevel === 'Tier 1' && <Award size={11} />}
                              <span>{c.tier}</span>
                            </span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>{c.handle}</span>
                        </div>
                      </div>

                      <div className="hire-creator-role">{c.role}</div>
                      <p className="hire-creator-bio">{c.bio}</p>

                      {/* Specialties Tags */}
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {c.specialties.map((spec, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '11px',
                              background: '#F1F5F9',
                              color: '#475569',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: '600'
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Meta Rates & Turnaround Strip */}
                      <div className="hire-creator-meta-strip">
                        <div>
                          <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Starting At</span>
                          <strong style={{ fontSize: '14px', color: '#059669' }}>{c.startingPrice}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Turnaround</span>
                          <strong style={{ fontSize: '12px', color: '#111625' }}>{c.turnaroundTime}</strong>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Completed</span>
                          <strong style={{ fontSize: '12px', color: '#6E56CF' }}>
                            ⭐ {c.rating} ({c.completedProjects})
                          </strong>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="hire-creator-actions">
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1, justifyContent: 'center' }}
                          onClick={() => handleOpenHireModal(c)}
                        >
                          <Briefcase size={13} />
                          <span>Hire for Custom Project</span>
                        </button>

                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => navigate(`/creator/${c.id}`)}
                          title="View Public Profile"
                        >
                          <Eye size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PART 11 — CREATOR PROFILE & CONTENT CREATOR TIER SYSTEM */}
      {activeTab === 'Creator Profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Progression Overview Banner */}
          <div className="tier-progression-card">
            <div className="tier-progression-header">
              <div>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '800',
                    color: '#6E56CF',
                    background: '#EFEBFC',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}
                >
                  Part 11 — Progression Level System
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111625', margin: '6px 0 2px 0' }}>
                  Content Creator Progression &amp; Tier Status
                </h2>
                <p style={{ fontSize: '13px', color: '#5F6B85', margin: 0 }}>
                  Publish verified blueprints and complete client custom projects to advance through creator tiers and unlock higher revenue splits.
                </p>
              </div>

              {/* Current Active Badge */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>Current Tier Status</span>
                <span className="creator-tier-badge tier-2" style={{ padding: '6px 14px', fontSize: '13px' }}>
                  <ShieldCheck size={14} />
                  <span>Tier 2 • Verified Pro</span>
                </span>
              </div>
            </div>

            {/* Progression Progress Bar towards Tier 3 */}
            <div style={{ background: '#FAFBFD', padding: '16px', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#111625' }}>
                  Progress to <strong>Tier 3 • Master Partner</strong>
                </span>
                <span style={{ fontSize: '13px', fontWeight: '900', color: '#6E56CF' }}>
                  48.2% Completed
                </span>
              </div>

              <div className="tier-progress-track">
                <div className="tier-progress-fill" style={{ width: '48.2%' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '12px', fontSize: '12px', color: '#64748B' }}>
                <div>
                  <span style={{ display: 'block', color: '#8C97B0', fontSize: '11px' }}>Published Blueprints:</span>
                  <strong style={{ color: '#111625' }}>6 / 15 Blueprints</strong> (9 more needed)
                </div>
                <div>
                  <span style={{ display: 'block', color: '#8C97B0', fontSize: '11px' }}>Community Downloads:</span>
                  <strong style={{ color: '#111625' }}>4,820 / 10,000</strong> (5,180 needed)
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', color: '#8C97B0', fontSize: '11px' }}>Average Rating:</span>
                  <strong style={{ color: '#059669' }}>4.92 ★ (Target: &gt;4.80)</strong>
                </div>
              </div>
            </div>

            {/* 3-Tier Side-by-Side Breakdown Matrix */}
            <div className="tier-matrix-grid">
              {/* Tier 1 */}
              <div className="tier-box">
                <div className="tier-box-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="creator-tier-badge tier-1">
                      <Award size={12} />
                      <span>Tier 1 • Emerging</span>
                    </span>
                    <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>Unlocked</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: '4px 0' }}>
                    Emerging Creator
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                    Entry level for creators sharing their first prompt collections with the community.
                  </p>
                </div>

                <div>
                  <div style={{ padding: '8px 10px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '12px', fontSize: '11.5px' }}>
                    <strong>Requirements:</strong> 0–5 Assets • &lt;1,000 Downloads
                  </div>

                  <ul className="tier-box-perks">
                    <li>
                      <CheckCircle2 size={14} color="#059669" />
                      <span>70% Community Royalties Revenue Split</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#059669" />
                      <span>Standard Community Asset Showcase Listing</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#059669" />
                      <span>Free Community Distribution Licensing</span>
                    </li>
                    <li style={{ opacity: 0.5 }}>
                      <Lock size={14} color="#94A3B8" />
                      <span>Priority 12h Editorial Review (Locked)</span>
                    </li>
                    <li style={{ opacity: 0.5 }}>
                      <Lock size={14} color="#94A3B8" />
                      <span>Hire Directory Client Inquiries (Locked)</span>
                    </li>
                  </ul>
                </div>

                <div style={{ padding: '6px 10px', background: '#E6FFFA', borderRadius: '6px', fontSize: '11px', color: '#0D9488', fontWeight: '700', textAlign: 'center' }}>
                  ✓ Baseline Active Status
                </div>
              </div>

              {/* Tier 2 (Current Active) */}
              <div className="tier-box current-tier">
                <div className="tier-box-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="creator-tier-badge tier-2">
                      <ShieldCheck size={12} />
                      <span>Tier 2 • Verified Pro</span>
                    </span>
                    <span className="badge badge-primary">Your Active Tier</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: '4px 0' }}>
                    Verified Pro Creator
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                    Established AI architects with proven community downloads and verified high-quality reviews.
                  </p>
                </div>

                <div>
                  <div style={{ padding: '8px 10px', background: '#F5F3FF', borderRadius: '8px', border: '1px solid #DDD6FE', marginBottom: '12px', fontSize: '11.5px', color: '#5B21B6' }}>
                    <strong>Requirements:</strong> 5–15 Assets • 1k–10k Downloads • 4.5+ Rating
                  </div>

                  <ul className="tier-box-perks">
                    <li>
                      <CheckCircle2 size={14} color="#6E56CF" />
                      <span><strong>75% Royalties Revenue Split (+5% Boost)</strong></span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#6E56CF" />
                      <span>Priority 12-Hour Automated Moderation Queue</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#6E56CF" />
                      <span><strong>Eligible to receive custom client project commissions in Hire Directory</strong></span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#6E56CF" />
                      <span>Verified Author Shield badge on all published blueprints</span>
                    </li>
                    <li style={{ opacity: 0.5 }}>
                      <Lock size={14} color="#94A3B8" />
                      <span>Dedicated concierge &amp; homepage banner spotlight</span>
                    </li>
                  </ul>
                </div>

                <div style={{ padding: '6px 10px', background: '#EFEBFC', borderRadius: '6px', fontSize: '11.5px', color: '#6E56CF', fontWeight: '800', textAlign: 'center' }}>
                  ★ Active Tier Benefits Operational
                </div>
              </div>

              {/* Tier 3 (Master Partner) */}
              <div className="tier-box">
                <div className="tier-box-header">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="creator-tier-badge tier-3">
                      <Crown size={12} />
                      <span>Tier 3 • Master Partner</span>
                    </span>
                    <span style={{ fontSize: '11px', color: '#B45309', fontWeight: '700' }}>Next Milestone</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: '4px 0' }}>
                    Master Partner
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                    Top 1% elite prompt engineers and enterprise workflow creators shaping the platform ecosystem.
                  </p>
                </div>

                <div>
                  <div style={{ padding: '8px 10px', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #FDE68A', marginBottom: '12px', fontSize: '11.5px', color: '#92400E' }}>
                    <strong>Requirements:</strong> 15+ Assets • 10k+ Downloads • 4.8+ Rating
                  </div>

                  <ul className="tier-box-perks">
                    <li>
                      <CheckCircle2 size={14} color="#D97706" />
                      <span><strong>80% Maximum Royalties Split (+10% Maximum Payout)</strong></span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#D97706" />
                      <span>Top Priority Ranking in "Hire Creators Directory"</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#D97706" />
                      <span>Custom project pricing freedom ($500+ commissions)</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#D97706" />
                      <span>Dedicated Partner Concierge &amp; instant payout settlement</span>
                    </li>
                    <li>
                      <CheckCircle2 size={14} color="#D97706" />
                      <span>Featured Homepage Banner &amp; Editorial Spotlight</span>
                    </li>
                  </ul>
                </div>

                <button
                  className="btn btn-outline btn-sm"
                  style={{ width: '100%', justifyContent: 'center', borderColor: '#F59E0B', color: '#B45309' }}
                  onClick={() => showToast('9 more blueprints needed to unlock Tier 3 Master Partner!', 'info')}
                >
                  <Crown size={13} />
                  <span>Reach Tier 3 Criteria</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD & PUBLISH WITH LIVE PREVIEW */}
      {activeTab === 'Upload Content' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <UploadCloud size={18} color="#6E56CF" />
              Publish Community Blueprint &amp; Prompt Pack
            </div>
            <span className="badge badge-primary">Tier 2 Pro Creator Review (12h)</span>
          </div>

          <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Blueprint Title
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. B2B Cold Outreach Sequence Engine"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Asset Type
                </label>
                <select
                  className="input-field"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                >
                  <option value="Prompt Pack">Prompt Pack (Multiple modular prompts)</option>
                  <option value="Workflow">Workflow (Multi-step chained process)</option>
                  <option value="Template">Template (Structured document/copy preset)</option>
                  <option value="Video Script">Video Script (Visual hooks &amp; retention story)</option>
                </select>
              </div>
            </div>

            <div className="form-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Primary Category
                </label>
                <select
                  className="input-field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                >
                  <option value="Social Media">Social Media</option>
                  <option value="SEO">SEO &amp; Search Grounding</option>
                  <option value="Branding">Branding &amp; Executive Voice</option>
                  <option value="Email">Email &amp; Outbound Marketing</option>
                  <option value="Video">Video Scripts &amp; Hooks</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Licensing Agreement
                </label>
                <select
                  className="input-field"
                  value={licensing}
                  onChange={(e) => setLicensing(e.target.value as any)}
                >
                  <option value="Commercial Pro">Commercial Pro (Free with Creator Attribution)</option>
                  <option value="Standard Community">Standard Community (Non-commercial CC BY)</option>
                  <option value="MIT Open Source">MIT Open Source (Full unrestricted fork)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Summary Pitch &amp; Description
              </label>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Explain what problem this blueprint solves and how creators/businesses should utilize it..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Full Blueprint / Prompt Instructions
              </label>
              <textarea
                className="input-field"
                rows={7}
                placeholder="Paste the full, ready-to-run prompt instructions including [ROLE], [INPUTS], and [FORMAT]..."
                value={fullPrompt}
                onChange={(e) => setFullPrompt(e.target.value)}
                required
                style={{ fontFamily: 'monospace', fontSize: '12.5px' }}
              />
            </div>

            <div className="form-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="B2B, ColdEmail, LeadGen"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Recommended Model Engine
                </label>
                <select
                  className="input-field"
                  value={recommendedModel}
                  onChange={(e) => setRecommendedModel(e.target.value)}
                >
                  <option value="Zunme Omni-4">Zunme Omni-4 (Multi-step reasoning)</option>
                  <option value="Zunme Creative Pro">Zunme Creative Pro (Nuanced tone &amp; voice)</option>
                  <option value="Zunme Turbo">Zunme Turbo (High-velocity drafting)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ justifyContent: 'center', marginTop: '6px' }}
            >
              <UploadCloud size={16} />
              <span>Publish Blueprint to Showcase</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: SUBMISSION REVIEWS & EDITORIAL STATUS */}
      {activeTab === 'My Submissions' && (
        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="panel-header" style={{ padding: 'var(--space-4) var(--space-5)', margin: 0 }}>
            <div className="panel-title">My Submission Review History</div>
            <span className="badge badge-success">Automated Moderation Active</span>
          </div>

          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Blueprint Title</th>
                  <th>Type &amp; Category</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Editorial Moderation Note</th>
                </tr>
              </thead>
              <tbody>
                {creatorSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: '700', color: '#111625' }}>{sub.title}</td>
                    <td>{sub.type} • {sub.category}</td>
                    <td>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status-chip ${
                          sub.status === 'APPROVED' ? 'success' : sub.status === 'IN_REVIEW' ? 'warning' : 'danger'
                        }`}
                      >
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ color: '#5F6B85', fontSize: '12px' }}>
                      {sub.feedback || 'Passed verified quality standards.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: EARNINGS & PAYOUTS (TASK 17: CREATOR REVENUE SHARING & WALLET PAYOUTS) */}
      {activeTab === 'Earnings & Payouts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Royalty Highlight Banner */}
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Creator Marketplace Monetization &amp; Revenue Sharing (75% Royalties on Tier 2)
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                As a Verified Pro (Tier 2 Creator), you earn 75% gross royalties on paid blueprint downloads, recurring template licenses, and custom bespoke client commission projects.
              </p>
            </div>
          </div>

          {/* Wallet KPI Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5F6B85', textTransform: 'uppercase' }}>Available for Payout</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981', marginTop: '6px' }}>$3,420.00</div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> Cleared &amp; Ready to Withdraw
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5F6B85', textTransform: 'uppercase' }}>Pending Clearance</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#F59E0B', marginTop: '6px' }}>$640.00</div>
              <div style={{ fontSize: '12px', color: '#D97706', marginTop: '4px' }}>
                Expected clearance on 1st of next month
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5F6B85', textTransform: 'uppercase' }}>Lifetime Gross Earnings</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#6E56CF', marginTop: '6px' }}>$14,890.00</div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Across 142 blueprint downloads &amp; 8 custom projects
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '14px', fontWeight: '800' }}
                onClick={() => showToast('Payout request of $3,420.00 submitted via Stripe Connect! Estimated arrival: 2 business days.', 'success')}
              >
                <DollarSign size={16} />
                <span>Request Payout ($3,420.00)</span>
              </button>
              <div style={{ fontSize: '11px', color: '#5F6B85', textAlign: 'center', marginTop: '8px' }}>
                Pmt Method: Connected Stripe Account (ending in •••• 4242)
              </div>
            </div>
          </div>

          {/* Revenue Breakdown by Stream */}
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="panel-header" style={{ padding: '16px 20px', margin: 0, borderBottom: '1px solid #E5E7EB' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111625', margin: 0 }}>
                  Recent Revenue Sharing &amp; Commission Statements
                </h3>
                <p style={{ fontSize: '12.5px', color: '#5F6B85', margin: '4px 0 0 0' }}>
                  Audited royalty streams from Zunme Store, Community Marketplace, and Direct Client Hiring.
                </p>
              </div>
              <span className="badge badge-success">Royalty Rate: 75% Verified</span>
            </div>

            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity / Product</th>
                    <th>Revenue Stream</th>
                    <th>Gross Sale</th>
                    <th>Your Royalty (75%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '600' }}>Oct 16, 2026</td>
                    <td style={{ fontWeight: '700', color: '#111625' }}>Enterprise B2B Cold Outreach Sequence</td>
                    <td>Community Marketplace License</td>
                    <td>$120.00</td>
                    <td style={{ color: '#10B981', fontWeight: '800' }}>+$90.00</td>
                    <td><span className="status-chip success">Cleared</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '600' }}>Oct 14, 2026</td>
                    <td style={{ fontWeight: '700', color: '#111625' }}>Custom Topical SEO Map (Hired Project)</td>
                    <td>Direct Client Hire</td>
                    <td>$400.00</td>
                    <td style={{ color: '#10B981', fontWeight: '800' }}>+$300.00</td>
                    <td><span className="status-chip success">Cleared</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '600' }}>Oct 11, 2026</td>
                    <td style={{ fontWeight: '700', color: '#111625' }}>Viral YouTube Script Architecture</td>
                    <td>Community Marketplace License</td>
                    <td>$80.00</td>
                    <td style={{ color: '#10B981', fontWeight: '800' }}>+$60.00</td>
                    <td><span className="status-chip success">Cleared</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '600' }}>Oct 08, 2026</td>
                    <td style={{ fontWeight: '700', color: '#111625' }}>3D Product Placement Reel Blueprint</td>
                    <td>Zunme Store Digital Asset</td>
                    <td>$240.00</td>
                    <td style={{ color: '#10B981', fontWeight: '800' }}>+$180.00</td>
                    <td><span className="status-chip warning">Pending Clear</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ASSET DETAIL MODAL */}
      {activeModalAsset && (
        <div className="modal-overlay" onClick={() => setActiveModalAsset(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: '780px', width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-primary">{activeModalAsset.category}</span>
                <span className="badge badge-neutral">{activeModalAsset.type}</span>
                <span className="status-chip info">{activeModalAsset.licensing}</span>
              </div>
              <button
                className="btn-ghost"
                onClick={() => setActiveModalAsset(null)}
                style={{ padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#111625', marginBottom: '6px' }}>
                  {activeModalAsset.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#5F6B85', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="creator-mini-avatar" style={{ width: '20px', height: '20px', fontSize: '9px' }}>
                      {activeModalAsset.creatorAvatar}
                    </div>
                    <span>By <strong>{activeModalAsset.creatorName}</strong></span>
                    {activeModalAsset.isVerifiedCreator && (
                      <ShieldCheck size={13} color="#059669" />
                    )}
                    <span className="creator-tier-badge tier-2" style={{ padding: '1px 6px', fontSize: '10px' }}>
                      {activeModalAsset.creatorTier}
                    </span>
                  </div>
                  <span>•</span>
                  <span>Rating: ⭐ {activeModalAsset.rating} ({activeModalAsset.reviewsCount} reviews)</span>
                  <span>•</span>
                  <span>{activeModalAsset.downloads.toLocaleString()} Downloads</span>
                  <span>•</span>
                  <span>Recommended: <strong>{activeModalAsset.recommendedModel}</strong></span>
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: '#FAFBFD', border: '1px solid #E8ECF5', fontSize: '13.5px', lineHeight: '1.6', color: '#272F3E' }}>
                {activeModalAsset.description}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#6E56CF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Full Blueprint Prompt Instructions
                  </div>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '11px', color: '#6E56CF' }}
                    onClick={() => handleCopyPrompt(activeModalAsset)}
                  >
                    {copiedPromptId === activeModalAsset.id ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                    <span>{copiedPromptId === activeModalAsset.id ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <pre className="prompt-code-box">
                  {activeModalAsset.fullPrompt}
                </pre>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {activeModalAsset.tags.map((tag, idx) => (
                  <span key={idx} className="asset-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', paddingTop: '14px', borderTop: '1px solid #F0F3FA' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleCopyPrompt(activeModalAsset)}
                >
                  {copiedPromptId === activeModalAsset.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                  <span>{copiedPromptId === activeModalAsset.id ? 'Copied Prompt' : 'Copy Prompt'}</span>
                </button>

                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => handleForkToLibrary(activeModalAsset)}
                >
                  <Bookmark size={14} />
                  <span>Fork to My Library</span>
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownloadAsset(activeModalAsset)}
                >
                  <Download size={14} />
                  <span>Download Blueprint (.md)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PART 12: HIRE CREATOR MODAL */}
      {isHireModalOpen && hireModalCreator && (
        <HireCreatorModal
          isOpen={isHireModalOpen}
          onClose={() => {
            setIsHireModalOpen(false);
            setHireModalCreator(null);
          }}
          creatorName={hireModalCreator.name}
          creatorTier={hireModalCreator.tier}
          creatorRole={hireModalCreator.role}
        />
      )}
    </div>
  );
};

export default CreatorStudioPage;
