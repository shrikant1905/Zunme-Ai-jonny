import React, { createContext, useContext, useState } from 'react';
import {
  User,
  UserRole,
  Conversation,
  ChatMessage,
  SearchResult,
  GeneratedContent,
  SavedLibraryItem,
  ToastMessage,
  AdminUser,
  ContentCategory,
  ContentFormat,
  ContentTone,
  ContentLength,
  AuditLogEntry,
  PricingPlan,
  WarehouseAsset,
  CreatorSubmission,
  SEOKeyword,
  BusinessProject,
  BrandProfileData,
  CalendarEvent,
  PlatformIntegration
} from '../types';

interface AppContextType {
  // Auth
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (fullName: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (fullName: string) => void;
  toggleRole: () => void;
  setRole: (role: UserRole) => void;
  loginWithRole: (role: UserRole, targetName?: string) => void;

  // Conversations & Chat
  conversations: Conversation[];
  activeConversationId: string;
  activeMessages: ChatMessage[];
  isAiResponding: boolean;
  createNewChat: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  deleteConversation: (id: string) => void;

  // Web Search
  searchResult: SearchResult | null;
  isSearching: boolean;
  executeSearch: (query: string) => void;
  clearSearch: () => void;

  // Content Studio
  generatedContent: GeneratedContent | null;
  isGeneratingContent: boolean;
  generateContent: (params: {
    category: ContentCategory;
    format: ContentFormat;
    instructions: string;
    tone: ContentTone;
    length: ContentLength;
  }) => void;

  // My Library
  libraryItems: SavedLibraryItem[];
  saveToLibrary: (item: Omit<SavedLibraryItem, 'id' | 'createdAt'>) => void;
  deleteFromLibrary: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (text: string, type?: ToastMessage['type']) => void;

  // Admin & Super Admin
  adminUsers: AdminUser[];
  toggleUserStatus: (id: string) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  pricingPlans: PricingPlan[];
  updatePricingPlan: (id: string, updates: Partial<PricingPlan>) => void;

  // AI Warehouse
  warehouseAssets: WarehouseAsset[];
  toggleAssetSaved: (id: string) => void;

  // Creator Studio
  creatorSubmissions: CreatorSubmission[];
  addCreatorSubmission: (sub: Omit<CreatorSubmission, 'id' | 'submittedAt' | 'downloads'>) => void;
  updateCreatorSubmissionStatus: (id: string, status: CreatorSubmission['status']) => void;

  // SEO Workspace
  seoKeywords: SEOKeyword[];
  addSeoKeyword: (kw: Omit<SEOKeyword, 'id'>) => void;
  deleteSeoKeyword: (id: string) => void;

  // Business Workspace
  businessProjects: BusinessProject[];
  addBusinessProject: (proj: Omit<BusinessProject, 'id'>) => void;
  brandProfile: BrandProfileData;
  updateBrandProfile: (data: Partial<BrandProfileData>) => void;
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;

  // Integrations
  integrations: PlatformIntegration[];
  toggleIntegrationStatus: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Seed Data
const DEFAULT_USER: User = {
  id: 'usr_demo_101',
  email: 'alex.creator@zunme.ai',
  fullName: 'Alex Johnson',
  role: 'USER',
  createdAt: '2026-10-01T08:00:00Z'
};

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    title: 'Q3 Creator Growth & GTM Strategy',
    createdAt: '2026-10-14T10:30:00Z',
    updatedAt: '2026-10-15T09:15:00Z'
  },
  {
    id: 'conv_2',
    title: 'TypeScript & React Architecture Notes',
    createdAt: '2026-10-13T14:20:00Z',
    updatedAt: '2026-10-14T11:00:00Z'
  },
  {
    id: 'conv_3',
    title: 'Product Launch Email Sequence',
    createdAt: '2026-10-12T16:00:00Z',
    updatedAt: '2026-10-13T18:30:00Z'
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  conv_1: [
    {
      id: 'm_1_1',
      conversationId: 'conv_1',
      role: 'user',
      content: 'Can you propose a 4-step go-to-market plan for an AI productivity tool designed for creators and solopreneurs?',
      createdAt: '2026-10-15T09:10:00Z'
    },
    {
      id: 'm_1_2',
      conversationId: 'conv_1',
      role: 'assistant',
      content: `Here is a structured 4-step Go-To-Market framework tailored specifically for creative professionals:\n\n### 1. Niche Positioning & Early Adopter Cohorts\nFocus first on a hyper-specific segment (e.g., YouTube educators or newsletter writers) rather than generic "everyone". Highlight how Zunme AI saves 6+ hours weekly by unifying live research with instant copy drafting.\n\n### 2. High-Value "Build in Public" Content\nShare workflow breakdowns, before/after prompt demonstrations, and real time-saving metrics on X, LinkedIn, and YouTube.\n\n### 3. Frictionless Freemium & "Aha!" Micro-Moments\nEnsure users experience value within 60 seconds of sign-up—such as instant web search with verified sources or a 1-click blog outline generator.\n\n### 4. Viral Sharing & Personal Library Portability\nEnable creators to publish or share snippets from their saved library directly to their teams with a single link.\n\nWould you like me to draft an initial announcement thread or email sequence for this launch?`,
      createdAt: '2026-10-15T09:12:00Z'
    }
  ],
  conv_2: [
    {
      id: 'm_2_1',
      conversationId: 'conv_2',
      role: 'user',
      content: 'What are the main best practices for organizing shared design tokens in a React + TypeScript project?',
      createdAt: '2026-10-14T10:45:00Z'
    },
    {
      id: 'm_2_2',
      conversationId: 'conv_2',
      role: 'assistant',
      content: `Here are the foundational guidelines for a robust token architecture:\n\n1. **CSS Custom Properties as Single Source of Truth:** Declare tokens in a root stylesheet (\`--color-primary\`, \`--radius-md\`, \`--space-4\`). This ensures both CSS and JavaScript can read themes without rebuilding.\n2. **Type-Safe Token Enums:** Export TypeScript types for design variants (\`'primary' | 'secondary' | 'ghost'\`) to prevent invalid class combinations at compile time.\n3. **Modular Component Primitives:** Build layout primitives (\`Button\`, \`Card\`, \`Input\`) that consume token classes directly rather than applying raw arbitrary hex values in component files.`,
      createdAt: '2026-10-14T10:48:00Z'
    }
  ],
  conv_3: [
    {
      id: 'm_3_1',
      conversationId: 'conv_3',
      role: 'user',
      content: 'Draft a short, engaging welcome email for new Zunme AI subscribers.',
      createdAt: '2026-10-13T18:20:00Z'
    },
    {
      id: 'm_3_2',
      conversationId: 'conv_3',
      role: 'assistant',
      content: `**Subject:** Welcome to Zunme AI — Your new creative super-assistant ⚡\n\nHey {{FirstName}},\n\nWelcome to Zunme AI! We built this workspace because jumping between five different tabs for research, notes, and AI drafting was killing our focus.\n\nHere are 3 quick things you can try in your first 5 minutes:\n- 💬 **Ask the AI Workspace** to outline your next project or brainstorm angles.\n- 🔍 **Run a Live Web Search** to retrieve current 2026 facts backed by verified citations.\n- ✍️ **Open Content Studio** to generate high-converting social copy or email newsletters.\n\nWhenever you find something great, hit **Save to Library** to keep your best ideas safe and organized.\n\n[Open Your Workspace ->](https://zunme.ai/app/chat)\n\nHappy creating,\n**The Zunme Team**`,
      createdAt: '2026-10-13T18:25:00Z'
    }
  ]
};

const INITIAL_LIBRARY_ITEMS: SavedLibraryItem[] = [
  {
    id: 'lib_1',
    title: 'Solid-State Battery Breakthroughs (2026 Research Brief)',
    contentType: 'RESEARCH',
    previewText: 'Commercial production for silicon-composite cathode cells shows a 35% density jump over conventional lithium-ion cells.',
    content: `### Executive Research Brief: Solid-State Battery Commercialization (2026)\n\n**Overview:** Recent field validation trials across North American and European labs demonstrate that solid-electrolyte cells have overcome dendrite penetration issues through atomic-layer coating.\n\n**Key Metrics:**\n- Energy Density: 480 Wh/kg achieved at ambient pressure.\n- Fast Charge Rate: 10% to 80% capacity within 11 minutes.\n- Cycle Life: Exceeds 1,400 continuous cycles with <8% capacity degradation.`,
    sourceMetadata: [
      {
        id: 'src_1',
        title: 'Global Energy Storage Review 2026',
        url: 'https://energystorage-review.org/solid-state-trials',
        domain: 'energystorage-review.org',
        snippet: 'Automakers announce standardized testing protocol for 480 Wh/kg solid-state cells starting Q4 2026.',
        publishedDate: 'Oct 08, 2026'
      },
      {
        id: 'src_2',
        title: 'CleanTech Innovation Index',
        url: 'https://cleantech-index.com/battery-advancements',
        domain: 'cleantech-index.com',
        snippet: 'Silicon-composite cathodes solve historic thermal runaway risks under extreme mechanical stress tests.',
        publishedDate: 'Sep 29, 2026'
      }
    ],
    tags: ['Batteries', 'CleanTech', 'Hardware'],
    createdAt: '2026-10-14T11:20:00Z'
  },
  {
    id: 'lib_2',
    title: 'Eco-Bottle Product Launch Newsletter Copy',
    contentType: 'MARKETING',
    previewText: 'Subject: Say Goodbye to Single-Use Plastic. Hey [Name], Meet the modular bottle built to last a lifetime...',
    content: `**Subject:** Say Goodbye to Single-Use Plastic Forever 🌿\n\nHey [First Name],\n\nEvery year, billions of disposable bottles end up in landfills. We decided to do something about it.\n\nIntroducing **AeroFlask** — the world's first vacuum-insulated, modular water bottle forged from 100% recycled aerospace titanium.\n\n- Keeps liquids ice-cold for 36 hours\n- 100% leak-proof magnetic lid\n- Zero plastic, lifetime guarantee\n\nFor the next 48 hours, use code **EARLYCREATOR** for 20% off your first bottle.\n\n[Claim Your AeroFlask Today ->]`,
    tags: ['Email Copy', 'Product Launch', 'Eco'],
    createdAt: '2026-10-13T14:40:00Z'
  },
  {
    id: 'lib_3',
    title: '4-Step Go-to-Market Framework for Creators',
    contentType: 'TEXT',
    previewText: 'Strategic guide outlining Niche Positioning, Build in Public distribution, and viral personal library sharing...',
    content: `### 4-Step Go-To-Market Framework for Solopreneurs & Creators\n\n1. **Niche Positioning:** Solve a single urgent bottleneck for a tight demographic before broadening scope.\n2. **Transparent Demonstration:** Showcase daily productivity gains openly on social platforms.\n3. **60-Second Time-to-Value:** Keep onboarding immediate with zero friction.\n4. **Sharable Artifacts:** Enable users to export or share outputs with peers.`,
    tags: ['Strategy', 'GTM', 'Guides'],
    createdAt: '2026-10-12T17:05:00Z'
  }
];

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_1',
    fullName: 'Alex Johnson',
    email: 'alex.creator@zunme.ai',
    role: 'USER',
    status: 'ACTIVE',
    joinedDate: 'Oct 01, 2026',
    conversationsCount: 14,
    savedItemsCount: 8
  },
  {
    id: 'usr_2',
    fullName: 'Sarah Connor',
    email: 'sarah.c@cyberdyne.org',
    role: 'USER',
    status: 'ACTIVE',
    joinedDate: 'Oct 05, 2026',
    conversationsCount: 29,
    savedItemsCount: 19
  },
  {
    id: 'usr_3',
    fullName: 'Marcus Vance',
    email: 'marcus@soloventure.io',
    role: 'USER',
    status: 'SUSPENDED',
    joinedDate: 'Sep 24, 2026',
    conversationsCount: 6,
    savedItemsCount: 2
  },
  {
    id: 'usr_4',
    fullName: 'Elena Rostova',
    email: 'elena@creatornetwork.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedDate: 'Sep 15, 2026',
    conversationsCount: 64,
    savedItemsCount: 42
  },
  {
    id: 'usr_5',
    fullName: 'Chief Architect (Root)',
    email: 'superadmin@zunme.ai',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    joinedDate: 'Sep 01, 2026',
    conversationsCount: 128,
    savedItemsCount: 86
  }
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log_1',
    actor: 'SuperAdmin (Root)',
    role: 'SUPER_ADMIN',
    action: 'SYSTEM_SETTINGS_UPDATE',
    resource: 'Platform Rate Limits & Model Routing',
    ipAddress: '192.168.1.104',
    timestamp: '2026-10-15T09:40:00Z',
    status: 'SUCCESS'
  },
  {
    id: 'log_2',
    actor: 'Elena Rostova',
    role: 'ADMIN',
    action: 'USER_ACCOUNT_SUSPENDED',
    resource: 'usr_3 (Marcus Vance)',
    ipAddress: '10.0.4.22',
    timestamp: '2026-10-15T08:15:00Z',
    status: 'WARNING'
  },
  {
    id: 'log_3',
    actor: 'SuperAdmin (Root)',
    role: 'SUPER_ADMIN',
    action: 'SUBSCRIPTION_TIER_MODIFIED',
    resource: 'Pro Creator Tier ($29/mo -> $29/mo)',
    ipAddress: '192.168.1.104',
    timestamp: '2026-10-14T16:22:00Z',
    status: 'SUCCESS'
  },
  {
    id: 'log_4',
    actor: 'Elena Rostova',
    role: 'ADMIN',
    action: 'WAREHOUSE_ASSET_APPROVED',
    resource: 'asset_1 (SaaS Landing Page Framework)',
    ipAddress: '10.0.4.22',
    timestamp: '2026-10-14T14:10:00Z',
    status: 'SUCCESS'
  },
  {
    id: 'log_5',
    actor: 'AuthService Guard',
    role: 'SYSTEM',
    action: 'FAILED_API_KEY_ROTATION',
    resource: 'OpenAI Secret Key Rotation (Timeout)',
    ipAddress: '127.0.0.1',
    timestamp: '2026-10-14T03:00:12Z',
    status: 'FAILED'
  }
];

const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan_free',
    name: 'Starter Workspace',
    price: '$0',
    billingPeriod: 'Forever Free',
    description: 'Essential AI chat, web search with verified sources, and basic content studio tools.',
    features: ['50 AI Chats per month', '25 Web Searches with citations', 'Standard Content Studio templates', '100MB Library cloud storage', 'Community Support'],
    isCurrent: false,
    activeSubscribers: 1120
  },
  {
    id: 'plan_pro',
    name: 'Pro Creator & Marketer',
    price: '$29',
    billingPeriod: 'per month',
    description: 'For solopreneurs, creators, and professionals needing unlimited research and advanced studio workflows.',
    features: ['Unlimited AI Conversations', 'Unlimited Real-time Web Searches', 'All 1,000+ AI Content Builders', 'AI Warehouse full access', '10GB Saved Library & exports', 'Priority response latency'],
    badge: 'Verified & Popular',
    isCurrent: true,
    activeSubscribers: 384
  },
  {
    id: 'plan_enterprise',
    name: 'Business & Agency Suite',
    price: '$99',
    billingPeriod: 'per month',
    description: 'Dedicated team workspace, SEO professional suite, brand voice profiles, and content calendar management.',
    features: ['Everything in Pro Plan', 'Dedicated SEO Workspace & Keyword Tracking', 'Brand Profile Voice Customization', 'Integrated Content Calendar', 'Team seats & role-based permissions', 'Dedicated account manager'],
    badge: 'Enterprise Grade',
    isCurrent: false,
    activeSubscribers: 42
  }
];

const INITIAL_WAREHOUSE_ASSETS: WarehouseAsset[] = [
  {
    id: 'asset_1',
    title: 'High-Converting SaaS Landing Page Framework',
    description: 'Proven multi-section copy blueprint with value proposition, pain point hooks, and feature comparison matrix.',
    category: 'Templates',
    creatorName: 'Elena Rostova',
    isVerifiedCreator: true,
    tags: ['SaaS', 'Copywriting', 'Conversion'],
    licensing: 'Commercial Pro',
    downloads: 1420,
    likes: 312,
    format: 'Markdown / Structured Prompt',
    rating: 4.9,
    createdAt: '2026-10-10T12:00:00Z',
    isSaved: true
  },
  {
    id: 'asset_2',
    title: 'Autonomous Competitor SEO Audit Prompt Chain',
    description: 'Systematic prompt chain for extracting semantic keyword gaps, backlink opportunities, and SERP competitor weaknesses.',
    category: 'Prompts',
    creatorName: 'Marcus Vance',
    isVerifiedCreator: false,
    tags: ['SEO', 'Keyword Research', 'Auditing'],
    licensing: 'Standard Community',
    downloads: 840,
    likes: 198,
    format: 'Multi-step Prompt Chain',
    rating: 4.8,
    createdAt: '2026-10-08T15:30:00Z',
    isSaved: false
  },
  {
    id: 'asset_3',
    title: 'YouTube Creator 10x Script Pipeline',
    description: 'Hook-Story-Offer template engineered for YouTube long-form retention, timestamps, and thumbnail caption pairings.',
    category: 'Scripts',
    creatorName: 'Alex Johnson',
    isVerifiedCreator: true,
    tags: ['Video', 'YouTube', 'Retention'],
    licensing: 'Commercial Pro',
    downloads: 2150,
    likes: 540,
    format: 'Video Script Matrix',
    rating: 5.0,
    createdAt: '2026-10-05T09:00:00Z',
    isSaved: true
  },
  {
    id: 'asset_4',
    title: 'Omnichannel B2B Cold Outreach Campaign Pack',
    description: '7-stage personalized email sequence, LinkedIn connection messages, and follow-up templates for enterprise sales.',
    category: 'Copy Packs',
    creatorName: 'Sarah Connor',
    isVerifiedCreator: true,
    tags: ['Outreach', 'B2B Sales', 'Email Sequence'],
    licensing: 'Commercial Pro',
    downloads: 1670,
    likes: 422,
    format: 'Email Pack (.md)',
    rating: 4.9,
    createdAt: '2026-10-01T11:15:00Z',
    isSaved: false
  },
  {
    id: 'asset_5',
    title: 'AI Newsletter Automated Editorial Workflow',
    description: 'Curate, synthesize, and format weekly industry tech briefs with citation anchors and sponsor shoutouts.',
    category: 'Workflows',
    creatorName: 'Dev Team',
    isVerifiedCreator: true,
    tags: ['Newsletter', 'Workflow', 'Editorial'],
    licensing: 'Open Source',
    downloads: 980,
    likes: 245,
    format: 'SOP & Prompt Workflow',
    rating: 4.7,
    createdAt: '2026-09-28T14:40:00Z',
    isSaved: false
  },
  {
    id: 'asset_6',
    title: 'Brand Sponsorship Integration Kit & Product Placement Schema',
    description: 'Complete contract schema, native video sponsor integration overlay, and automated conversion tracking for brand product placements in AI content.',
    category: 'Product Placement',
    creatorName: 'Marcus Vance',
    isVerifiedCreator: true,
    tags: ['ProductPlacement', 'Sponsorship', 'BrandDeals', 'Monetization'],
    licensing: 'Commercial Pro',
    downloads: 4120,
    likes: 890,
    format: 'Sponsorship Schema (.json / .md)',
    rating: 4.97,
    createdAt: '2026-10-14T09:30:00Z',
    isSaved: false
  }
];

const INITIAL_CREATOR_SUBMISSIONS: CreatorSubmission[] = [
  {
    id: 'sub_1',
    title: 'Viral Hooks 2026 for Short-form Creators',
    type: 'Prompt Pack',
    category: 'Social Media',
    status: 'APPROVED',
    submittedAt: '2026-10-12T10:00:00Z',
    downloads: 184,
    feedback: 'Approved by Admin team for quality standards.'
  },
  {
    id: 'sub_2',
    title: 'Solopreneur Brand Voice Architecture Blueprint',
    type: 'Template',
    category: 'Branding',
    status: 'IN_REVIEW',
    submittedAt: '2026-10-14T18:20:00Z',
    downloads: 0,
    feedback: 'Under routine moderation review by Operations.'
  },
  {
    id: 'sub_3',
    title: 'Local SEO Schema Generator for Service Businesses',
    type: 'Workflow',
    category: 'SEO',
    status: 'CHANGES_REQUESTED',
    submittedAt: '2026-10-10T11:15:00Z',
    downloads: 0,
    feedback: 'Please clarify the JSON-LD formatting requirements for local business schemas.'
  }
];

const INITIAL_SEO_KEYWORDS: SEOKeyword[] = [
  {
    id: 'kw_1',
    keyword: 'ai productivity workspace for creators',
    searchVolume: '14,800/mo',
    difficulty: 'Moderate',
    difficultyScore: 48,
    cpc: '$3.40',
    intent: 'Commercial',
    status: 'Targeted'
  },
  {
    id: 'kw_2',
    keyword: 'best real time web search ai tool',
    searchVolume: '22,400/mo',
    difficulty: 'Hard',
    difficultyScore: 72,
    cpc: '$5.10',
    intent: 'Commercial',
    status: 'In Content'
  },
  {
    id: 'kw_3',
    keyword: 'how to generate high converting newsletter copy',
    searchVolume: '8,200/mo',
    difficulty: 'Easy',
    difficultyScore: 28,
    cpc: '$1.85',
    intent: 'Informational',
    status: 'Ranking'
  },
  {
    id: 'kw_4',
    keyword: 'ai marketing templates 2026',
    searchVolume: '19,500/mo',
    difficulty: 'Moderate',
    difficultyScore: 54,
    cpc: '$4.20',
    intent: 'Transactional',
    status: 'Identified'
  }
];

const INITIAL_BUSINESS_PROJECTS: BusinessProject[] = [
  {
    id: 'proj_1',
    name: 'Zunme AI Q4 Ecosystem Expansion',
    category: 'Product Launch',
    status: 'IN_PROGRESS',
    dueDate: 'Nov 15, 2026',
    progress: 68,
    description: 'Rollout of specialized workspaces for Creators, SEO analysts, and SMB teams.',
    tasksCount: 12
  },
  {
    id: 'proj_2',
    name: 'Omnichannel B2B Content Repurposing Engine',
    category: 'Marketing Campaign',
    status: 'PLANNED',
    dueDate: 'Dec 01, 2026',
    progress: 25,
    description: 'Transforming long-form technical whitepapers into LinkedIn carousel posts and newsletters.',
    tasksCount: 8
  },
  {
    id: 'proj_3',
    name: 'SEO Domain Authority Ramp-Up Campaign',
    category: 'SEO Revamp',
    status: 'IN_PROGRESS',
    dueDate: 'Nov 30, 2026',
    progress: 52,
    description: 'Publishing 24 cornerstone research briefs targeting commercial intent keywords.',
    tasksCount: 16
  }
];

const INITIAL_BRAND_PROFILE: BrandProfileData = {
  brandName: 'Zunme AI',
  tagline: 'Your Unified AI Workspace for Ideas, Research & Creation',
  voiceTone: 'Visionary, authoritative, precise, and empowering',
  targetAudience: 'Creators, solopreneurs, digital marketers, agency teams, and tech-forward startups',
  coreValues: 'Grounding in verified truth, extreme speed, aesthetic elegance, and creator ownership',
  missionStatement: 'To eliminate the fragmentation of modern creative workflows by consolidating live research, synthesis, and asset storage into an intuitive ecosystem.'
};

const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal_1',
    title: 'Solid-State Battery 2026 Tech Breakdown',
    platform: 'Newsletter',
    date: '2026-10-18',
    status: 'Scheduled',
    format: 'Email Deep-dive'
  },
  {
    id: 'cal_2',
    title: 'Why Real-Time Search Beats Hallucinating LLMs',
    platform: 'LinkedIn',
    date: '2026-10-20',
    status: 'Draft',
    format: 'Thought Leadership Post'
  },
  {
    id: 'cal_3',
    title: '5 Steps to 10x Your Content Studio Output',
    platform: 'Blog',
    date: '2026-10-23',
    status: 'Draft',
    format: 'Long-form Pillar Guide'
  }
];

const INITIAL_INTEGRATIONS: PlatformIntegration[] = [
  {
    id: 'int_1',
    name: 'Tavily Live Web Search API',
    category: 'Search API',
    status: 'CONNECTED',
    connectedAt: '2026-09-15',
    latency: '180ms',
    description: 'Primary verified search grounding engine with citation extraction.'
  },
  {
    id: 'int_2',
    name: 'OpenAI GPT-4o Engine Gateway',
    category: 'LLM Engine',
    status: 'CONNECTED',
    connectedAt: '2026-09-12',
    latency: '240ms',
    description: 'State-of-the-art conversational and structured content completion.'
  },
  {
    id: 'int_3',
    name: 'nErgy Small Business CRM',
    category: 'CRM',
    status: 'MAINTENANCE',
    connectedAt: '2026-10-01',
    latency: '--',
    description: 'Ecosystem CRM integration for customer lead capture and pipeline tracking.'
  },
  {
    id: 'int_4',
    name: 'AWS S3 Cloud Storage Gateway',
    category: 'Storage',
    status: 'CONNECTED',
    connectedAt: '2026-09-20',
    latency: '65ms',
    description: 'Secure multi-region object storage for user library items and creator submissions.'
  },
  {
    id: 'int_5',
    name: 'Platform Telemetry & Audit Engine',
    category: 'Analytics',
    status: 'CONNECTED',
    connectedAt: '2026-09-01',
    latency: '35ms',
    description: 'Real-time security auditing, actor tracking, and error logging.'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv_1');
  const [messagesRecord, setMessagesRecord] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [isAiResponding, setIsAiResponding] = useState<boolean>(false);

  // Search State
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Studio State
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGeneratingContent, setIsGeneratingContent] = useState<boolean>(false);

  // Library State
  const [libraryItems, setLibraryItems] = useState<SavedLibraryItem[]>(INITIAL_LIBRARY_ITEMS);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Admin & Super Admin States
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(INITIAL_PRICING_PLANS);

  // AI Warehouse State
  const [warehouseAssets, setWarehouseAssets] = useState<WarehouseAsset[]>(INITIAL_WAREHOUSE_ASSETS);

  // Creator Studio State
  const [creatorSubmissions, setCreatorSubmissions] = useState<CreatorSubmission[]>(INITIAL_CREATOR_SUBMISSIONS);

  // SEO Workspace State
  const [seoKeywords, setSeoKeywords] = useState<SEOKeyword[]>(INITIAL_SEO_KEYWORDS);

  // Business Workspace State
  const [businessProjects, setBusinessProjects] = useState<BusinessProject[]>(INITIAL_BUSINESS_PROJECTS);
  const [brandProfile, setBrandProfile] = useState<BrandProfileData>(INITIAL_BRAND_PROFILE);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);

  // Integrations State
  const [integrations, setIntegrations] = useState<PlatformIntegration[]>(INITIAL_INTEGRATIONS);


  const showToast = (text: string, type: ToastMessage['type'] = 'success') => {
    const id = 'toast_' + Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Auth Functions
  const login = async (email: string, _pass: string): Promise<boolean> => {
    setUser({
      id: 'usr_' + Date.now(),
      email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      role: 'USER',
      createdAt: new Date().toISOString()
    });
    showToast('Signed in successfully!', 'success');
    return true;
  };

  const register = async (fullName: string, email: string, _pass: string): Promise<boolean> => {
    setUser({
      id: 'usr_' + Date.now(),
      email,
      fullName,
      role: 'USER',
      createdAt: new Date().toISOString()
    });
    showToast('Account created! Welcome to Zunme AI.', 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of workspace', 'info');
  };

  const updateProfile = (fullName: string) => {
    if (user) {
      setUser({ ...user, fullName });
      showToast('Profile information saved', 'success');
    }
  };

  const toggleRole = () => {
    if (user) {
      let nextRole: UserRole = 'USER';
      if (user.role === 'USER') nextRole = 'ADMIN';
      else if (user.role === 'ADMIN') nextRole = 'SUPER_ADMIN';
      else nextRole = 'USER';
      setUser({ ...user, role: nextRole });
      showToast(`Switched user role to ${nextRole} for verification`, 'info');
    }
  };

  const setRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
      showToast(`Switched user role to ${role}`, 'info');
    }
  };

  const loginWithRole = (role: UserRole, targetName?: string) => {
    const demoProfiles: Record<UserRole, { fullName: string; email: string }> = {
      SUPER_ADMIN: { fullName: 'Alex Johnson', email: 'superadmin@zunme.ai' },
      ADMIN: { fullName: 'Operations Admin', email: 'admin@zunme.ai' },
      USER: { fullName: 'Alex Creator', email: 'alex.creator@zunme.ai' }
    };
    const profile = demoProfiles[role] || demoProfiles.USER;
    setUser({
      id: 'usr_' + Date.now(),
      email: profile.email,
      fullName: profile.fullName,
      role,
      createdAt: new Date().toISOString()
    });
    showToast(
      `Logged in as ${role === 'SUPER_ADMIN' ? 'Super Admin' : role === 'ADMIN' ? 'Admin' : 'Creator'}${targetName ? ` (${targetName})` : ''}`,
      'success'
    );
  };

  // Chat Functions
  const createNewChat = () => {
    const newId = 'conv_' + Date.now();
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    setMessagesRecord((prev) => ({
      ...prev,
      [newId]: []
    }));
  };

  const selectConversation = (id: string) => {
    setActiveConversationId(id);
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        setActiveConversationId(remaining[0].id);
      } else {
        createNewChat();
      }
    }
    showToast('Conversation deleted', 'info');
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_u_' + Date.now(),
      conversationId: activeConversationId,
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    };

    setMessagesRecord((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), userMsg]
    }));

    // Update conversation title if it was "New Conversation"
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId && c.title === 'New Conversation') {
          return {
            ...c,
            title: content.slice(0, 32) + (content.length > 32 ? '...' : ''),
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );

    // Simulate AI response with natural delay
    setIsAiResponding(true);
    setTimeout(() => {
      const aiResponseContent = generateSimulatedAiResponse(content);
      const aiMsg: ChatMessage = {
        id: 'msg_a_' + Date.now(),
        conversationId: activeConversationId,
        role: 'assistant',
        content: aiResponseContent,
        createdAt: new Date().toISOString()
      };

      setMessagesRecord((prev) => ({
        ...prev,
        [activeConversationId]: [...(prev[activeConversationId] || []), aiMsg]
      }));
      setIsAiResponding(false);
    }, 1100);
  };

  // Web Search Simulation
  const executeSearch = (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const simulatedResult: SearchResult = {
        query,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        summary: `Comprehensive synthesis for "${query}": Recent 2026 reports highlight accelerated adoption across commercial industries. Key drivers include increased workflow automation, real-time citation verification, and decentralized creator tooling. Industry analysts project a 42% compound annual growth rate through 2028, with enterprise pilots transitioning into permanent production infrastructure.`,
        sources: [
          {
            id: 's1',
            title: `Global Trends & Technical Analysis: ${query}`,
            url: `https://techinsights-journal.com/reports/${encodeURIComponent(query.slice(0, 20))}`,
            domain: 'techinsights-journal.com',
            snippet: `In-depth investigation detailing operational benchmarks, architecture diagrams, and field performance metrics related to ${query}.`,
            publishedDate: 'Oct 11, 2026'
          },
          {
            id: 's2',
            title: `Executive Whitepaper: Implementing Modern Solutions`,
            url: `https://business-strategy-review.io/insights/${encodeURIComponent(query.slice(0, 15))}`,
            domain: 'business-strategy-review.io',
            snippet: `Case studies demonstrating practical efficiency gains, safety protocols, and implementation timelines.`,
            publishedDate: 'Oct 04, 2026'
          },
          {
            id: 's3',
            title: `Engineering Review & Standards Overview`,
            url: `https://open-standards-consortium.org/docs/2026`,
            domain: 'open-standards-consortium.org',
            snippet: `Formal consensus guidelines, interoperability specifications, and reliability evaluations.`,
            publishedDate: 'Sep 27, 2026'
          }
        ]
      };
      setSearchResult(simulatedResult);
      setIsSearching(false);
      showToast('Search completed with 3 verified sources', 'success');
    }, 1300);
  };

  const clearSearch = () => {
    setSearchResult(null);
  };

  // Content Studio Simulation
  const generateContent = (params: {
    category: ContentCategory;
    format: ContentFormat;
    instructions: string;
    tone: ContentTone;
    length: ContentLength;
  }) => {
    setIsGeneratingContent(true);
    setTimeout(() => {
      const formatTitle = params.format.replace('_', ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
      const mockResult: GeneratedContent = {
        id: 'gen_' + Date.now(),
        title: `${formatTitle}: ${params.instructions.slice(0, 28)}...`,
        category: params.category,
        format: params.format,
        tone: params.tone,
        length: params.length,
        content: generateSimulatedStudioCopy(params),
        wordCount: params.length.includes('150') ? 145 : params.length.includes('500') ? 480 : 890,
        createdAt: new Date().toISOString()
      };
      setGeneratedContent(mockResult);
      setIsGeneratingContent(false);
      showToast('Content successfully drafted!', 'success');
    }, 1200);
  };

  // Library Functions
  const saveToLibrary = (item: Omit<SavedLibraryItem, 'id' | 'createdAt'>) => {
    const newItem: SavedLibraryItem = {
      ...item,
      id: 'lib_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setLibraryItems((prev) => [newItem, ...prev]);
    showToast(`Saved "${newItem.title}" to My Library`, 'success');
  };

  const deleteFromLibrary = (id: string) => {
    setLibraryItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Library', 'info');
  };

  const toggleUserStatus = (id: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const newStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          showToast(`User ${u.fullName} is now ${newStatus}`, 'info');
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Additional Super Admin & Specialist Handlers
  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      ...entry,
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const updatePricingPlan = (id: string, updates: Partial<PricingPlan>) => {
    setPricingPlans((prev) =>
      prev.map((plan) => (plan.id === id ? { ...plan, ...updates } : plan))
    );
    showToast('Pricing plan updated', 'success');
  };

  const toggleAssetSaved = (id: string) => {
    setWarehouseAssets((prev) =>
      prev.map((asset) => {
        if (asset.id === id) {
          const nextSaved = !asset.isSaved;
          showToast(nextSaved ? `Added "${asset.title}" to your Saved Assets` : `Removed "${asset.title}"`, 'info');
          return { ...asset, isSaved: nextSaved, likes: nextSaved ? asset.likes + 1 : asset.likes - 1 };
        }
        return asset;
      })
    );
  };

  const addCreatorSubmission = (sub: Omit<CreatorSubmission, 'id' | 'submittedAt' | 'downloads'>) => {
    const newSub: CreatorSubmission = {
      ...sub,
      id: 'sub_' + Date.now(),
      submittedAt: new Date().toISOString(),
      downloads: 0
    };
    setCreatorSubmissions((prev) => [newSub, ...prev]);
    showToast('Content submitted for review!', 'success');
  };

  const updateCreatorSubmissionStatus = (id: string, status: CreatorSubmission['status']) => {
    setCreatorSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    showToast(`Submission status updated to ${status}`, 'info');
  };

  const addSeoKeyword = (kw: Omit<SEOKeyword, 'id'>) => {
    const newKw: SEOKeyword = {
      ...kw,
      id: 'kw_' + Date.now()
    };
    setSeoKeywords((prev) => [newKw, ...prev]);
    showToast(`Keyword "${kw.keyword}" added to tracking`, 'success');
  };

  const deleteSeoKeyword = (id: string) => {
    setSeoKeywords((prev) => prev.filter((k) => k.id !== id));
    showToast('Keyword removed', 'info');
  };

  const addBusinessProject = (proj: Omit<BusinessProject, 'id'>) => {
    const newProj: BusinessProject = {
      ...proj,
      id: 'proj_' + Date.now()
    };
    setBusinessProjects((prev) => [newProj, ...prev]);
    showToast(`Project "${proj.name}" created`, 'success');
  };

  const updateBrandProfile = (data: Partial<BrandProfileData>) => {
    setBrandProfile((prev) => ({ ...prev, ...data }));
    showToast('Brand profile details updated', 'success');
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEv: CalendarEvent = {
      ...event,
      id: 'cal_' + Date.now()
    };
    setCalendarEvents((prev) => [...prev, newEv]);
    showToast('Post scheduled to calendar', 'success');
  };

  const toggleIntegrationStatus = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) => {
        if (int.id === id) {
          const nextStatus = int.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED';
          showToast(`${int.name} is now ${nextStatus}`, 'info');
          return { ...int, status: nextStatus };
        }
        return int;
      })
    );
  };

  const activeMessages = messagesRecord[activeConversationId] || [];

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        toggleRole,
        setRole,
        loginWithRole,
        conversations,
        activeConversationId,
        activeMessages,
        isAiResponding,
        createNewChat,
        selectConversation,
        sendMessage,
        deleteConversation,
        searchResult,
        isSearching,
        executeSearch,
        clearSearch,
        generatedContent,
        isGeneratingContent,
        generateContent,
        libraryItems,
        saveToLibrary,
        deleteFromLibrary,
        toasts,
        showToast,
        adminUsers,
        toggleUserStatus,
        auditLogs,
        addAuditLog,
        pricingPlans,
        updatePricingPlan,
        warehouseAssets,
        toggleAssetSaved,
        creatorSubmissions,
        addCreatorSubmission,
        updateCreatorSubmissionStatus,
        seoKeywords,
        addSeoKeyword,
        deleteSeoKeyword,
        businessProjects,
        addBusinessProject,
        brandProfile,
        updateBrandProfile,
        calendarEvents,
        addCalendarEvent,
        integrations,
        toggleIntegrationStatus
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <span>{toast.type === 'success' ? '✓' : toast.type === 'info' ? 'ℹ' : '⚠'}</span>
            <span>{toast.text}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Helper mock responses
function generateSimulatedAiResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('code') || lower.includes('typescript') || lower.includes('react')) {
    return `Here is a clean implementation pattern for your request:\n\n\`\`\`typescript\n// Example: Type-safe handler in TypeScript\ninterface WorkspaceAction {\n  type: 'SAVE' | 'EXPORT' | 'REFRESH';\n  payload: Record<string, unknown>;\n}\n\nexport const executeAction = async (action: WorkspaceAction) => {\n  console.log('Dispatching action:', action.type);\n  return { success: true, timestamp: Date.now() };\n};\n\`\`\`\n\nThis pattern ensures strict type-checking and prevents invalid dispatch states in your component logic. Let me know if you would like me to expand this with custom hooks!`;
  }
  if (lower.includes('multimodal image attachment') || lower.includes('screenshot') || lower.includes('analyze this image') || lower.includes('mockup') || lower.includes('ui mockup')) {
    return `### 🖼️ Multimodal Vision & Visual Inspection Report\n\nI have analyzed the attached visual asset using Zunme Multimodal Vision Core:\n\n1. **Visual Hierarchy & Layout Architecture:** The design features clear separation between navigation anchors, active content zones, and call-to-action triggers with balanced whitespace distribution.\n2. **Color Palette & Accessibility:** High-contrast color tokens with strong foreground-to-background differentiation (tested compliant with WCAG 2.1 AA accessibility guidelines).\n3. **Detected UI Elements & OCR:**\n   - Header and sub-navigation controls\n   - Primary action buttons with distinct visual hierarchy\n   - Contextual data cards with micro-typography\n4. **Actionable UX Recommendations:**\n   - Ensure generous touch targets (min 44x44px) for mobile viewports.\n   - Consider subtle gradient overlays on card borders to elevate depth.\n   - Leverage SVG iconography for sharp rendering across high-DPI displays.`;
  }
  if (lower.includes('research') || lower.includes('trend') || lower.includes('fact')) {
    return `Based on current analytical data:\n\n1. **Core Insight:** Market validation indicates that creative workflows benefit most from integrated citation verification.\n2. **Actionable Step:** Leverage the **Web Search** tab in Zunme AI to ground this analysis with live external references.\n3. **Recommendation:** Save key conclusions to your **Library** so you can reference them directly when drafting in Content Studio.`;
  }
  return `I have analyzed your prompt: "${prompt}".\n\nHere are three high-impact recommendations you can immediately apply:\n\n- **Focus on Core Objectives:** Clarify the primary user goal before expanding into edge scenarios.\n- **Maintain High Contrast & Clarity:** Clear visual hierarchy and concise copy drive significantly higher engagement.\n- **Iterate in Small Steps:** Validate each building block before connecting complex multi-step pipelines.\n\nWould you like me to elaborate on any of these points or prepare a draft format for you?`;
}

function generateSimulatedStudioCopy(params: {
  category: ContentCategory;
  format: ContentFormat;
  instructions: string;
  tone: ContentTone;
  length: ContentLength;
}): string {
  if (params.format === 'EMAIL_NEWSLETTER') {
    return `Subject: Important Update: ${params.instructions.slice(0, 36)}\n\nHey there,\n\nWe are excited to share some big news regarding ${params.instructions}.\n\nOver the past few weeks, our team has been working hard behind the scenes to deliver a better, faster, and more seamless experience. Here is what this means for you:\n\n- **Immediate Time Savings:** Automate repetitive drafting tasks.\n- **Unmatched Precision:** Real-time data verification built into every workflow.\n- **Tailored Results:** Formatted specifically for your unique audience.\n\nReady to get started? Check it out today and let us know what you think.\n\nBest regards,\n**The Team**`;
  }
  if (params.format === 'BLOG_OUTLINE') {
    return `# Comprehensive Guide: ${params.instructions}\n\n## 1. Introduction & Context\n- Hook: Why this topic matters right now\n- Defining the problem space\n- Who benefits most from this approach\n\n## 2. Key Challenges & Common Misconceptions\n- Outdated practices that hold creators back\n- The hidden cost of fragmented tools\n\n## 3. Step-by-Step Implementation Framework\n- Phase 1: Planning and research discovery\n- Phase 2: Draft synthesis and structural outlining\n- Phase 3: Final refinement, fact verification, and distribution\n\n## 4. Key Takeaways & Call to Action\n- Summary checklist\n- Recommended next steps for readers`;
  }
  if (params.format === 'SOCIAL_CAPTION') {
    return `🚀 Big shift happening in creative productivity:\n\n"${params.instructions}"\n\nMost people spend 70% of their time researching and only 30% creating. By unifying verified search with intelligent drafting, you flip the script.\n\n3 lessons we learned:\n1. Never guess when you can cite live sources.\n2. Templates save hours, but personalized tone builds trust.\n3. Save your best ideas to a single library.\n\nDrop your thoughts below 👇 #Productivity #Creators #AIWorkspace #Tech`;
  }
  return `### Draft Content: ${params.instructions}\n\nTone: ${params.tone} | Target: ${params.length}\n\nEffective execution requires clear alignment between high-level strategy and daily execution. When approaching "${params.instructions}", always start with the audience's most urgent pain point.\n\nBy maintaining a structured workflow—from initial research to synthesis and storage—creators and teams can produce higher quality output in half the time.`;
}
