import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  Megaphone,
  TrendingUp,
  DollarSign,
  Target,
  BarChart2,
  Plus,
  Play,
  Pause,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  Layers,
  Sliders,
  Award,
  Wallet,
  Users,
  Eye,
  MousePointer,
  Percent,
  RefreshCw,
  LifeBuoy,
  Settings as SettingsIcon,
  X,
  Smartphone,
  Laptop,
  Globe,
  Rocket,
  ShoppingBag,
  Video,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  Info,
  Check,
  Tag,
  Film
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import '../../styles/dashboard.css';

export type AdFormat =
  | 'PPC_SEARCH'
  | 'DISPLAY_BANNER'
  | 'SHOPPING'
  | 'VIDEO'
  | 'AI_PRODUCT_PLACEMENT'
  | 'NATIVE_STUDIO'
  | 'PROMOTED_PACK';

export type PricingModel = 'PPC' | 'PPV';
export type BannerSize = '300x250' | '728x90' | '160x600';

export interface QualityScoreBreakdown {
  adRelevance: number; // 1 - 10
  expectedCtr: number; // 1 - 10
  landingPageQuality: number; // 1 - 10
  overall: number; // average
}

export interface AdCampaign {
  id: string;
  name: string;
  type: AdFormat;
  typeLabel: string;
  pricingModel: PricingModel; // Part 1: PPC vs PPV
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  dailyBudget: number;
  monthlyBudgetCap: number; // Part 7: Monthly Budget Cap
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  bid: number; // CPC or CPM bid
  targetKeywords: string[];
  headline: string;
  destinationUrl: string;
  description: string;
  callToAction: string;
  // Part 2: Display Banner specifics
  bannerSize?: BannerSize;
  imageUrl?: string;
  // Part 3: Shopping Ads specifics
  productPrice?: number;
  storeName?: string;
  // Part 4: Video Ads specifics
  videoUrl?: string;
  videoDuration?: string;
  // Part 5: AI Content Placement specifics
  aiContentCategory?: string;
  brandMention?: string;
  // Part 6: Quality Score & Ad Rank
  qualityScore: QualityScoreBreakdown;
  adRank: number; // Bid * Quality Score
  // Part 8: Conversion Tracking & ROAS metrics
  conversions: number;
  cvr: number; // Conversion rate %
  cpa: number; // Cost Per Acquisition ($)
  roas: number; // Return on Ad Spend (x / %)
}

export interface KeywordAuction {
  keyword: string;
  monthlyVolume: string;
  avgCpc: number;
  competition: 'LOW' | 'MEDIUM' | 'HIGH';
  myBid: number;
  qualityScore: number; // Part 6
  adRank: number; // Part 6: Bid * Quality Score
  status: 'WINNING' | 'OUTBID';
}

export interface CreatorPayout {
  id: string;
  creatorName: string;
  assetTitle: string;
  impressions: number;
  clicks: number;
  grossRevenue: number;
  creatorShare: number;
  status: 'PAID' | 'PENDING';
}

export const ZunmeAdsPage: React.FC = () => {
  const { showToast } = useApp();
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  type TabType =
    | 'Overview'
    | 'Campaigns'
    | 'Create Campaign'
    | 'Keyword Bidding'
    | 'Ad Placements'
    | 'Creator Monetization'
    | 'Billing & Budget'
    | 'Settings'
    | 'Help & Support';

  const slugToTab: Record<string, TabType> = {
    'overview': 'Overview',
    'dashboard': 'Overview',
    'campaigns': 'Campaigns',
    'create-campaign': 'Create Campaign',
    'create': 'Create Campaign',
    'keyword-bidding': 'Keyword Bidding',
    'bidding': 'Keyword Bidding',
    'ad-placements': 'Ad Placements',
    'placements': 'Ad Placements',
    'creator-monetization': 'Creator Monetization',
    'monetization': 'Creator Monetization',
    'billing': 'Billing & Budget',
    'wallet': 'Billing & Budget',
    'billing-budget': 'Billing & Budget',
    'settings': 'Settings',
    'support': 'Help & Support',
    'help-support': 'Help & Support'
  };

  const tabToSlug: Record<TabType, string> = {
    'Overview': 'overview',
    'Campaigns': 'campaigns',
    'Create Campaign': 'create-campaign',
    'Keyword Bidding': 'keyword-bidding',
    'Ad Placements': 'ad-placements',
    'Creator Monetization': 'creator-monetization',
    'Billing & Budget': 'billing',
    'Settings': 'settings',
    'Help & Support': 'support'
  };

  const resolveCurrentTab = (): TabType => {
    if (section && slugToTab[section.toLowerCase()]) {
      return slugToTab[section.toLowerCase()];
    }
    const tabParam = searchParams.get('tab');
    if (
      tabParam &&
      [
        'Overview',
        'Campaigns',
        'Create Campaign',
        'Keyword Bidding',
        'Ad Placements',
        'Creator Monetization',
        'Billing & Budget',
        'Settings',
        'Help & Support'
      ].includes(tabParam)
    ) {
      return tabParam as TabType;
    }
    return 'Overview';
  };

  const [activeTab, setActiveTabState] = useState<TabType>(resolveCurrentTab);

  useEffect(() => {
    setActiveTabState(resolveCurrentTab());
  }, [section, searchParams]);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    const slug = tabToSlug[tab];
    navigate(slug === 'overview' ? '/ads/overview' : `/ads/${slug}`);
  };

  // Ad Wallet Balance
  const [walletBalance, setWalletBalance] = useState<number>(680.0);
  const [autoRecharge, setAutoRecharge] = useState<boolean>(true);
  const [monthlyAccountCap, setMonthlyAccountCap] = useState<number>(5000);

  // Campaigns State with all 8 category features populated
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([
    {
      id: 'camp-1',
      name: 'B2B Growth Prompt Suite Sponsored Search',
      type: 'PPC_SEARCH',
      typeLabel: 'PPC Search Result',
      pricingModel: 'PPC',
      status: 'ACTIVE',
      dailyBudget: 45.0,
      monthlyBudgetCap: 1500,
      spent: 342.4,
      impressions: 68400,
      clicks: 3120,
      ctr: 4.56,
      bid: 0.48,
      targetKeywords: ['prompt engineering', 'b2b marketing', 'sales workflows'],
      headline: 'Scale Executive Writing with Verified B2B Prompts',
      description: 'Accelerate daily executive output with verified workflows and enterprise-grade models inside Zunme AI.',
      destinationUrl: 'https://zunme.ai/warehouse',
      callToAction: 'Learn More',
      qualityScore: {
        adRelevance: 9.6,
        expectedCtr: 9.4,
        landingPageQuality: 9.2,
        overall: 9.4
      },
      adRank: 4.51, // 0.48 * 9.4
      conversions: 198,
      cvr: 6.35,
      cpa: 1.73,
      roas: 4.8
    },
    {
      id: 'camp-2',
      name: 'E-Commerce AI Prompt Engineering Master Kit',
      type: 'SHOPPING',
      typeLabel: 'Product Shopping Listing',
      pricingModel: 'PPC',
      status: 'ACTIVE',
      dailyBudget: 50.0,
      monthlyBudgetCap: 2000,
      spent: 412.0,
      impressions: 54100,
      clicks: 2240,
      ctr: 4.14,
      bid: 0.55,
      targetKeywords: ['ai ecommerce', 'product prompt kit', 'shopify prompts'],
      headline: 'Turnkey AI Prompt Engineering Kit for Stores',
      description: 'Comprehensive 1,200+ prompt templates for product listings, ad copy, and customer retention.',
      destinationUrl: 'https://zunme.ai/shop/prompt-kit',
      callToAction: 'Shop Now',
      productPrice: 49.0,
      storeName: 'Zunme AI Store',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      qualityScore: {
        adRelevance: 9.5,
        expectedCtr: 9.2,
        landingPageQuality: 9.4,
        overall: 9.4
      },
      adRank: 5.17, // 0.55 * 9.4
      conversions: 142,
      cvr: 6.34,
      cpa: 2.9,
      roas: 5.6
    },
    {
      id: 'camp-3',
      name: 'SaaS Growth Leaderboard Visual Display Banner',
      type: 'DISPLAY_BANNER',
      typeLabel: 'Display Banner (728×90)',
      pricingModel: 'PPV',
      status: 'ACTIVE',
      dailyBudget: 35.0,
      monthlyBudgetCap: 1200,
      spent: 215.6,
      impressions: 89400,
      clicks: 1890,
      ctr: 2.11,
      bid: 2.4, // CPM ($2.40 per 1k views)
      targetKeywords: ['saas growth', 'dashboard analytics', 'visual ads'],
      headline: 'Zunme Analytics: Visual Intelligence at Scale',
      description: 'Real-time multi-model benchmarking and ROI optimization for enterprise marketing teams.',
      destinationUrl: 'https://zunme.ai/analytics',
      callToAction: 'Explore Features',
      bannerSize: '728x90',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      qualityScore: {
        adRelevance: 8.9,
        expectedCtr: 8.6,
        landingPageQuality: 9.1,
        overall: 8.9
      },
      adRank: 21.36,
      conversions: 84,
      cvr: 4.44,
      cpa: 2.57,
      roas: 3.4
    },
    {
      id: 'camp-4',
      name: 'Next-Gen AI Workflow Studio Video Showcase',
      type: 'VIDEO',
      typeLabel: 'In-Stream Video Promotion',
      pricingModel: 'PPV',
      status: 'ACTIVE',
      dailyBudget: 60.0,
      monthlyBudgetCap: 2500,
      spent: 380.0,
      impressions: 72000,
      clicks: 2150,
      ctr: 2.99,
      bid: 3.2, // CPM
      targetKeywords: ['video demo', 'ai workflows video', 'automation'],
      headline: 'Watch How Teams Build 10x Faster with Zunme AI',
      description: 'Full 30-second walkthrough demonstrating multi-agent workflows and instant export pipelines.',
      destinationUrl: 'https://zunme.ai/video-demo',
      callToAction: 'Watch & Try Free',
      videoDuration: '0:30',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80',
      qualityScore: {
        adRelevance: 9.3,
        expectedCtr: 9.0,
        landingPageQuality: 9.3,
        overall: 9.2
      },
      adRank: 29.44,
      conversions: 116,
      cvr: 5.4,
      cpa: 3.28,
      roas: 4.1
    },
    {
      id: 'camp-5',
      name: 'AI Content Native Product Placement in Tech Newsletters',
      type: 'AI_PRODUCT_PLACEMENT',
      typeLabel: 'AI Content Placement',
      pricingModel: 'PPC',
      status: 'PAUSED',
      dailyBudget: 25.0,
      monthlyBudgetCap: 1000,
      spent: 145.0,
      impressions: 34200,
      clicks: 980,
      ctr: 2.87,
      bid: 0.38,
      targetKeywords: ['ai newsletter', 'sponsored mention', 'tech blogs'],
      headline: 'Recommended Tool: Verified Output Synthesis Engine',
      description: 'Integrated seamlessly inside top-rated AI industry digests and deep-dive technical blogs.',
      destinationUrl: 'https://zunme.ai/sponsorship',
      callToAction: 'Check It Out',
      aiContentCategory: 'Tech & AI Workflows',
      brandMention: 'Zunme AI Workspace',
      qualityScore: {
        adRelevance: 9.1,
        expectedCtr: 8.7,
        landingPageQuality: 8.9,
        overall: 8.9
      },
      adRank: 3.38,
      conversions: 58,
      cvr: 5.92,
      cpa: 2.5,
      roas: 3.9
    }
  ]);

  // Form State for "Create Campaign" (with Part 1 to Part 7 enhancements)
  const [cName, setCName] = useState('');
  const [cPricingModel, setCPricingModel] = useState<PricingModel>('PPC'); // Part 1
  const [cType, setCType] = useState<AdFormat>('PPC_SEARCH');
  const [cDailyBudget, setCDailyBudget] = useState(30);
  const [cMonthlyBudgetCap, setCMonthlyBudgetCap] = useState(2000); // Part 7 ($1,000 - $10,000 cap)
  const [cBid, setCBid] = useState(0.48); // Part 1: CPC or CPM
  const [cKeywords, setCKeywords] = useState('ai productivity, marketing copy, content calendar, prompt builder');
  const [cHeadline, setCHeadline] = useState('');
  const [cDescription, setCDescription] = useState('Scale your enterprise writing velocity with verified workflows and model routing in Zunme AI.');
  const [cCallToAction, setCCallToAction] = useState('Learn More');
  const [cPathSlug, setCPathSlug] = useState('solutions/ai-studio');
  const [cDestination, setCDestination] = useState('https://zunme.ai');

  // Part 2: Display Banner State
  const [cBannerSize, setCBannerSize] = useState<BannerSize>('300x250');
  const [cBannerImageUrl, setCBannerImageUrl] = useState(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
  );

  // Part 3: Shopping Ads State
  const [cProductPrice, setCProductPrice] = useState(49.0);
  const [cStoreName, setCStoreName] = useState('Zunme Official Store');
  const [cProductImageUrl, setCProductImageUrl] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  );

  // Part 4: Video Ads State
  const [cVideoUrl, setCVideoUrl] = useState('https://youtube.com/watch?v=zunme-demo');
  const [cVideoDuration, setCVideoDuration] = useState('0:30');

  // Part 5: AI Product Placement State
  const [cAiCategory, setCAiCategory] = useState('Tech & AI Workflows');
  const [cBrandMention, setCBrandMention] = useState('Zunme AI Suite');

  // Pay For Demand Demographic, Geo & Device Targeting State
  const [cAgeMin, setCAgeMin] = useState<number>(21);
  const [cAgeMax, setCAgeMax] = useState<number>(55);
  const [cGender, setCGender] = useState<'ALL' | 'MALE' | 'FEMALE'>('ALL');
  const [cGeoLocation, setCGeoLocation] = useState('United States, United Kingdom, Canada');
  const [cGeoRadius, setCGeoRadius] = useState('Nationwide');
  const [cTargetDevices, setCTargetDevices] = useState<string[]>(['Desktop', 'Mobile']);
  const [cAudienceInterests, setCAudienceInterests] = useState('AI & SaaS, Growth Marketing, E-commerce');

  // Simulator View Mode (Part 2, 3, 4, 5 live simulator)
  const [adPreviewMode, setAdPreviewMode] = useState<
    'SERP' | 'MOBILE' | 'BANNER' | 'SHOPPING' | 'VIDEO' | 'AI_CONTENT'
  >('SERP');

  // Sync default preview mode when format changes
  useEffect(() => {
    if (cType === 'PPC_SEARCH') setAdPreviewMode('SERP');
    else if (cType === 'DISPLAY_BANNER') setAdPreviewMode('BANNER');
    else if (cType === 'SHOPPING') setAdPreviewMode('SHOPPING');
    else if (cType === 'VIDEO') setAdPreviewMode('VIDEO');
    else if (cType === 'AI_PRODUCT_PLACEMENT') setAdPreviewMode('AI_CONTENT');
    else setAdPreviewMode('SERP');
  }, [cType]);

  // Adjust default bid when pricing model changes (PPC: ~$0.50, PPV: ~$2.50 CPM)
  useEffect(() => {
    if (cPricingModel === 'PPV' && cBid < 1.0) {
      setCBid(2.5);
    } else if (cPricingModel === 'PPC' && cBid > 5.0) {
      setCBid(0.5);
    }
  }, [cPricingModel]);

  // Part 6: Dynamic 3-Pillar Quality Score Calculation
  const calculateQualityScore = (): QualityScoreBreakdown => {
    // 1. Ad Relevance (Check headline and keywords length/match)
    let relevance = 7.0;
    if (cHeadline.trim().length > 10) relevance += 1.5;
    if (cKeywords.includes(',')) relevance += 0.9;
    if (relevance > 9.8) relevance = 9.8;

    // 2. Expected CTR (Based on CTA clarity and copy quality)
    let expCtr = 7.2;
    if (cDescription.length > 30) expCtr += 1.4;
    if (cCallToAction) expCtr += 0.8;
    if (expCtr > 9.6) expCtr = 9.6;

    // 3. Landing Page Quality (Valid https URL, path slug)
    let landingQuality = 8.0;
    if (cDestination.startsWith('https://')) landingQuality += 1.2;
    if (cPathSlug.length > 3) landingQuality += 0.6;
    if (landingQuality > 9.7) landingQuality = 9.7;

    const overall = Number(((relevance + expCtr + landingQuality) / 3).toFixed(1));
    return {
      adRelevance: Number(relevance.toFixed(1)),
      expectedCtr: Number(expCtr.toFixed(1)),
      landingPageQuality: Number(landingQuality.toFixed(1)),
      overall
    };
  };

  const dynamicQualityScore = calculateQualityScore();
  const dynamicAdRank = Number((cBid * dynamicQualityScore.overall).toFixed(2));

  // Keyword Auctions State (Part 6: QS & Ad Rank columns)
  const [auctions, setAuctions] = useState<KeywordAuction[]>([
    {
      keyword: 'ai productivity workspace',
      monthlyVolume: '48.5K',
      avgCpc: 0.52,
      competition: 'HIGH',
      myBid: 0.58,
      qualityScore: 9.4,
      adRank: 5.45,
      status: 'WINNING'
    },
    {
      keyword: 'verified web search citations',
      monthlyVolume: '28.2K',
      avgCpc: 0.38,
      competition: 'MEDIUM',
      myBid: 0.45,
      qualityScore: 9.1,
      adRank: 4.1,
      status: 'WINNING'
    },
    {
      keyword: 'content studio templates',
      monthlyVolume: '62.0K',
      avgCpc: 0.65,
      competition: 'HIGH',
      myBid: 0.55,
      qualityScore: 8.8,
      adRank: 4.84,
      status: 'OUTBID'
    },
    {
      keyword: 'social media scheduler ai',
      monthlyVolume: '34.8K',
      avgCpc: 0.42,
      competition: 'MEDIUM',
      myBid: 0.48,
      qualityScore: 9.2,
      adRank: 4.42,
      status: 'WINNING'
    },
    {
      keyword: 'seo keyword cluster builder',
      monthlyVolume: '19.4K',
      avgCpc: 0.32,
      competition: 'LOW',
      myBid: 0.35,
      qualityScore: 9.5,
      adRank: 3.33,
      status: 'WINNING'
    }
  ]);

  // Creator Monetization Payouts
  const [payouts] = useState<CreatorPayout[]>([
    {
      id: 'pay-1',
      creatorName: 'Alex Rivera',
      assetTitle: 'High-Converting SaaS Hooks',
      impressions: 42100,
      clicks: 1820,
      grossRevenue: 873.6,
      creatorShare: 611.52,
      status: 'PAID'
    },
    {
      id: 'pay-2',
      creatorName: 'Elena Rostova',
      assetTitle: 'Technical Prompt Architecture',
      impressions: 31200,
      clicks: 1240,
      grossRevenue: 595.2,
      creatorShare: 416.64,
      status: 'PAID'
    },
    {
      id: 'pay-3',
      creatorName: 'Marcus Chen',
      assetTitle: 'Omnichannel B2B Campaign',
      impressions: 18900,
      clicks: 760,
      grossRevenue: 364.8,
      creatorShare: 255.36,
      status: 'PENDING'
    }
  ]);

  // Toggle Campaign Status
  const handleToggleStatus = (id: string) => {
    setCampaigns(
      campaigns.map((camp) => {
        if (camp.id === id) {
          const next = camp.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          showToast(`Campaign "${camp.name}" is now ${next}`, 'info');
          return { ...camp, status: next };
        }
        return camp;
      })
    );
  };

  // Delete Campaign
  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    showToast('Campaign successfully deleted', 'info');
  };

  // Create Campaign Submit Handler
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || !cHeadline.trim()) {
      showToast('Campaign name and headline are required', 'error');
      return;
    }

    const typeLabelMap: Record<AdFormat, string> = {
      PPC_SEARCH: 'PPC Search Result',
      DISPLAY_BANNER: `Display Banner (${cBannerSize})`,
      SHOPPING: 'Product Shopping Listing',
      VIDEO: 'In-Stream Video Ad',
      AI_PRODUCT_PLACEMENT: 'AI Content Placement',
      NATIVE_STUDIO: 'Native Studio Placement',
      PROMOTED_PACK: 'Featured Partner Asset'
    };

    const newCamp: AdCampaign = {
      id: `camp-${Date.now()}`,
      name: cName.trim(),
      type: cType,
      typeLabel: typeLabelMap[cType] || 'Standard Ad',
      pricingModel: cPricingModel,
      status: 'ACTIVE',
      dailyBudget: Number(cDailyBudget),
      monthlyBudgetCap: Number(cMonthlyBudgetCap),
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      bid: Number(cBid),
      targetKeywords: cKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      headline: cHeadline.trim(),
      description: cDescription.trim(),
      destinationUrl: cDestination.trim(),
      callToAction: cCallToAction,
      bannerSize: cType === 'DISPLAY_BANNER' ? cBannerSize : undefined,
      imageUrl:
        cType === 'DISPLAY_BANNER'
          ? cBannerImageUrl
          : cType === 'SHOPPING'
          ? cProductImageUrl
          : undefined,
      productPrice: cType === 'SHOPPING' ? cProductPrice : undefined,
      storeName: cType === 'SHOPPING' ? cStoreName : undefined,
      videoUrl: cType === 'VIDEO' ? cVideoUrl : undefined,
      videoDuration: cType === 'VIDEO' ? cVideoDuration : undefined,
      aiContentCategory: cType === 'AI_PRODUCT_PLACEMENT' ? cAiCategory : undefined,
      brandMention: cType === 'AI_PRODUCT_PLACEMENT' ? cBrandMention : undefined,
      qualityScore: dynamicQualityScore,
      adRank: dynamicAdRank,
      conversions: 0,
      cvr: 0,
      cpa: 0,
      roas: 0
    };

    setCampaigns([newCamp, ...campaigns]);
    setActiveTab('Campaigns');
    setCName('');
    setCHeadline('');
    showToast(
      `Campaign "${newCamp.name}" launched with Quality Score ${dynamicQualityScore.overall}/10 & Ad Rank ${dynamicAdRank}!`,
      'success'
    );
  };

  // Update Bid on Keyword Auction (Part 6)
  const handleUpdateBid = (kw: string) => {
    setAuctions(
      auctions.map((a) => {
        if (a.keyword === kw) {
          const newBid = Number((a.myBid + 0.1).toFixed(2));
          const newRank = Number((newBid * a.qualityScore).toFixed(2));
          return { ...a, myBid: newBid, adRank: newRank, status: 'WINNING' };
        }
        return a;
      })
    );
    showToast(`Increased bid for "${kw}". Ad Rank recalculated to winning position!`, 'success');
  };

  // Add Funds to Wallet
  const handleAddFunds = (amount: number) => {
    setWalletBalance((prev) => Number((prev + amount).toFixed(2)));
    showToast(`$${amount.toFixed(2)} added to your Ad Credit balance successfully`, 'success');
  };

  // Aggregates & Part 8 ROI / ROAS Metrics
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const avgCvr = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0.00';
  const blendedRoas =
    totalSpend > 0 ? (campaigns.reduce((acc, c) => acc + c.spent * c.roas, 0) / totalSpend).toFixed(1) : '4.2';
  const avgCpa = totalConversions > 0 ? (totalSpend / totalConversions).toFixed(2) : '2.14';

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Megaphone size={26} color="#6E56CF" />
            Zunme Ads Platform &amp; Monetization Hub
          </h1>
          <p className="dashboard-subtitle">
            Enterprise multi-format advertising: PPC Search, Display Banners, E-Commerce Shopping, Video Ads, and AI Native Content Placement.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <NavLink
            to="/ads/onboarding"
            className="btn btn-outline btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <ShieldCheck size={14} />
            <span>7-Step Setup Wizard</span>
          </NavLink>

          <NavLink
            to="/ads/formats"
            className="btn btn-outline btn-sm"
            style={{ textDecoration: 'none' }}
          >
            <Layers size={14} />
            <span>Format Builders</span>
          </NavLink>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: '#EFEBFC',
              borderRadius: '10px',
              border: '1px solid rgba(110,86,207,0.25)'
            }}
          >
            <Wallet size={16} color="#6E56CF" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#6E56CF' }}>
              Ad Credit: ${walletBalance.toFixed(2)}
            </span>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setActiveTab('Create Campaign')}
            id="btn-header-new-campaign"
          >
            <Plus size={14} />
            <span>New Ad Campaign</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW (Enhanced with Part 8 Conversion & ROAS Cards) */}
      {activeTab === 'Overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Top KPI Cards (Part 8: Conversion Tracking & ROI / ROAS Metrics) */}
          <div className="cards-grid-4">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Active Ad Spend
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                ${totalSpend.toFixed(2)}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '4px'
                }}
              >
                <TrendingUp size={13} />
                <span>
                  <strong>{blendedRoas}x ROAS</strong> ({Number(blendedRoas) * 100}% Blended ROI)
                </span>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
                Impressions &amp; Views
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {totalImpressions.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Across Search, Display &amp; Video inventory
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Clicks &amp; Engagements
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {totalClicks.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                Avg CTR: <strong>{avgCtr}%</strong> (Market: 2.4%)
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Conversions &amp; ROAS
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                {totalConversions.toLocaleString()}{' '}
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#059669' }}>({avgCvr}% CVR)</span>
              </div>
              <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                Avg CPA: <strong>${avgCpa}</strong> • Target: &lt;$4.00
              </div>
            </div>
          </div>

          {/* Quick Auction Status & Active Campaigns */}
          <div className="cards-grid-2">
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <Target size={18} color="#6E56CF" />
                  Top Converting Campaigns (ROI &amp; CVR)
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('Campaigns')}>
                  View All ({campaigns.length})
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {campaigns.slice(0, 3).map((camp) => (
                  <div
                    key={camp.id}
                    style={{
                      padding: '14px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className={`badge ${camp.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'}`}>
                          {camp.status}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            color: '#6E56CF',
                            background: '#EFEBFC',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}
                        >
                          {camp.pricingModel}
                        </span>
                        <span style={{ fontSize: '11px', color: '#8C97B0' }}>{camp.typeLabel}</span>
                      </div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#111625', margin: 0 }}>
                        {camp.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                        {camp.conversions} conv • {camp.cvr}% CVR • CPA: ${camp.cpa.toFixed(2)} • <strong>{camp.roas}x ROAS</strong>
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '16px', fontWeight: '900', color: '#111625' }}>
                        ${camp.spent.toFixed(1)}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8C97B0', display: 'block' }}>
                        Cap: ${camp.monthlyBudgetCap}/mo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Auction Preview with Ad Rank */}
            <div className="glass-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <DollarSign size={18} color="#059669" />
                  Live Keyword Auction Matrix (QS &amp; Ad Rank)
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('Keyword Bidding')}>
                  Open Bidding Matrix
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {auctions.slice(0, 3).map((a) => (
                  <div
                    key={a.keyword}
                    style={{
                      padding: '12px 14px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#111625' }}>
                        "{a.keyword}"
                      </div>
                      <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                        Vol: {a.monthlyVolume} • QS: <strong>{a.qualityScore}/10</strong> • Ad Rank: <strong>{a.adRank}</strong>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${a.status === 'WINNING' ? 'badge-success' : 'badge-danger'}`}>
                        {a.status === 'WINNING' ? `Winning ($${a.myBid})` : `Outbid ($${a.myBid})`}
                      </span>
                      {a.status === 'OUTBID' && (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          onClick={() => handleUpdateBid(a.keyword)}
                        >
                          Bid +$0.10
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAMPAIGNS LIST (Enhanced with Part 1, Part 6 & Part 8 columns) */}
      {activeTab === 'Campaigns' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <Target size={18} color="#6E56CF" />
                Multi-Format Campaigns Management
              </div>
              <div className="panel-subtitle">
                Track CVR (%), CPA ($), ROI / ROAS (%), Quality Score, and Ad Rank across PPC and PPV models.
              </div>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setActiveTab('Create Campaign')}
              id="btn-campaigns-create"
            >
              <Plus size={14} /> New Campaign
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                style={{
                  padding: '18px 20px',
                  background: '#FAFBFD',
                  border: '1px solid #E8ECF5',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className={`badge ${camp.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'}`}>
                      {camp.status}
                    </span>
                    {/* Part 1: Pricing Model Badge */}
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: camp.pricingModel === 'PPC' ? '#0284C7' : '#D97706',
                        background: camp.pricingModel === 'PPC' ? '#E0F2FE' : '#FEF3C7',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {camp.pricingModel} ({camp.pricingModel === 'PPC' ? 'Pay Per Click' : 'Pay Per 1,000 Views'})
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#6E56CF',
                        background: '#EFEBFC',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {camp.typeLabel}
                    </span>
                    {/* Part 6: Quality Score & Ad Rank badge */}
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#059669',
                        background: '#E8F8F0',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      QS: {camp.qualityScore.overall}/10 • Ad Rank: {camp.adRank}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#111625', margin: '0 0 4px 0' }}>
                    {camp.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#5F6B85', margin: 0 }}>
                    "{camp.headline}" &rarr;{' '}
                    <span style={{ color: '#0284C7', textDecoration: 'underline' }}>{camp.destinationUrl}</span>
                  </p>

                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {camp.targetKeywords.map((kw, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10.5px',
                          background: '#FFFFFF',
                          border: '1px solid #E8ECF5',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          color: '#5F6B85'
                        }}
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Performance & Part 8 Metrics Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
                    gap: '12px',
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '520px'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Monthly Cap</span>
                    <strong style={{ fontSize: '13px', color: '#111625' }}>${camp.monthlyBudgetCap}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Spent</span>
                    <strong style={{ fontSize: '13px', color: '#111625' }}>${camp.spent.toFixed(1)}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Impressions</span>
                    <strong style={{ fontSize: '13px', color: '#111625' }}>{camp.impressions.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Clicks (CTR)</span>
                    <strong style={{ fontSize: '13px', color: '#0284C7' }}>
                      {camp.clicks} ({camp.ctr}%)
                    </strong>
                  </div>
                  {/* Part 8: Conversions, CVR, CPA, ROAS */}
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>Conversions</span>
                    <strong style={{ fontSize: '13px', color: '#059669' }}>
                      {camp.conversions} ({camp.cvr}%)
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>CPA ($)</span>
                    <strong style={{ fontSize: '13px', color: '#D97706' }}>${camp.cpa.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#8C97B0', display: 'block' }}>ROAS / ROI</span>
                    <strong style={{ fontSize: '13px', color: '#059669' }}>{camp.roas}x ({camp.roas * 100}%)</strong>
                  </div>
                </div>

                {/* Action Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className={`btn btn-sm ${camp.status === 'ACTIVE' ? 'btn-outline' : 'btn-primary'}`}
                    onClick={() => handleToggleStatus(camp.id)}
                    title={camp.status === 'ACTIVE' ? 'Pause Campaign' : 'Resume Campaign'}
                  >
                    {camp.status === 'ACTIVE' ? <Pause size={14} /> : <Play size={14} />}
                    <span>{camp.status === 'ACTIVE' ? 'Pause' : 'Activate'}</span>
                  </button>

                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() =>
                      showToast(
                        `Campaign "${camp.name}": Conversions: ${camp.conversions}, ROAS: ${camp.roas}x, Quality Score: ${camp.qualityScore.overall}/10`,
                        'info'
                      )
                    }
                    title="View drilldown metrics"
                  >
                    <BarChart2 size={14} />
                  </button>

                  <button
                    className="btn btn-sm btn-outline"
                    style={{ color: '#E11D48', borderColor: '#FEECEB' }}
                    onClick={() => handleDeleteCampaign(camp.id)}
                    title="Delete campaign"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CREATE CAMPAIGN BUILDER (Includes All 8 Missing Parts) */}
      {activeTab === 'Create Campaign' && (
        <div className="cards-grid-2">
          {/* Form */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Plus size={18} color="#6E56CF" />
                Launch Multi-Format Ad Campaign
              </div>
              <span className="badge badge-primary">Self-Serve Setup</span>
            </div>

            <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Part 1: PPV vs PPC Model Selection */}
              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#111625', marginBottom: '8px' }}>
                  Payment &amp; Bidding Model (PPC vs PPV / CPM)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setCPricingModel('PPC')}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: cPricingModel === 'PPC' ? '2px solid #0284C7' : '1px solid #E2E8F0',
                      background: cPricingModel === 'PPC' ? '#F0F9FF' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#0369A1' }}>PPC (Pay Per Click)</strong>
                      {cPricingModel === 'PPC' && <Check size={14} color="#0284C7" />}
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                      Pay only when a user clicks your ad. Best for lead gen &amp; sales.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCPricingModel('PPV')}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: cPricingModel === 'PPV' ? '2px solid #D97706' : '1px solid #E2E8F0',
                      background: cPricingModel === 'PPV' ? '#FFFBEB' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#B45309' }}>PPV / CPM (Per 1,000 Views)</strong>
                      {cPricingModel === 'PPV' && <Check size={14} color="#D97706" />}
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
                      Pay for visual impressions &amp; eyeballs. Best for brand awareness.
                    </span>
                  </button>
                </div>
              </div>

              {/* Campaign Name */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Q4 Executive Marketing Suite Promotion"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  required
                />
              </div>

              {/* Ad Format Selector (Part 2, 3, 4, 5) */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Advertising Channel &amp; Placement Format
                </label>
                <select
                  className="input-field"
                  value={cType}
                  onChange={(e) => setCType(e.target.value as AdFormat)}
                >
                  <option value="PPC_SEARCH">PPC Sponsored Search Result (Web Search Keyword Grounded)</option>
                  <option value="DISPLAY_BANNER">Part 2: Display Banner Ads (300×250, 728×90, 160×600)</option>
                  <option value="SHOPPING">Part 3: Shopping Ads (E-Commerce Product Listings &amp; Store)</option>
                  <option value="VIDEO">Part 4: Video Ads (YouTube Style Video In-Stream Promotion)</option>
                  <option value="AI_PRODUCT_PLACEMENT">Part 5: Product Placement in AI Content &amp; Newsletters</option>
                  <option value="NATIVE_STUDIO">Content Studio In-Feed Recommendation</option>
                  <option value="PROMOTED_PACK">AI Warehouse Featured Partner Asset</option>
                </select>
              </div>

              {/* Part 2: Display Banner Format Specific Controls */}
              {cType === 'DISPLAY_BANNER' && (
                <div style={{ padding: '12px', background: '#F5F3FF', borderRadius: '10px', border: '1px solid #DDD6FE' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <ImageIcon size={16} color="#6E56CF" />
                    <strong style={{ fontSize: '12.5px', color: '#5B21B6' }}>Part 2 — Display Banner Specifications</strong>
                  </div>

                  <div className="form-grid-2" style={{ marginBottom: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Standard Banner Size
                      </label>
                      <select
                        className="input-field"
                        value={cBannerSize}
                        onChange={(e) => setCBannerSize(e.target.value as BannerSize)}
                      >
                        <option value="300x250">300×250 (Medium Rectangle - Sidebar / In-Content)</option>
                        <option value="728x90">728×90 (Leaderboard - Header / Footer Banner)</option>
                        <option value="160x600">160×600 (Wide Skyscraper - Side Rail)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Banner Creative Image URL
                      </label>
                      <input
                        type="url"
                        className="input-field"
                        value={cBannerImageUrl}
                        onChange={(e) => setCBannerImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: '#6B21A8' }}>Presets:</span>
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ fontSize: '11px', padding: '2px 6px', color: '#6E56CF' }}
                      onClick={() =>
                        setCBannerImageUrl('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80')
                      }
                    >
                      SaaS Analytics
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      style={{ fontSize: '11px', padding: '2px 6px', color: '#6E56CF' }}
                      onClick={() =>
                        setCBannerImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80')
                      }
                    >
                      AI Wave
                    </button>
                  </div>
                </div>
              )}

              {/* Part 3: Shopping Ads Specific Controls */}
              {cType === 'SHOPPING' && (
                <div style={{ padding: '12px', background: '#ECFDF5', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <ShoppingBag size={16} color="#059669" />
                    <strong style={{ fontSize: '12.5px', color: '#065F46' }}>Part 3 — Shopping Ad Product Details</strong>
                  </div>

                  <div className="form-grid-2" style={{ marginBottom: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Product Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="input-field"
                        value={cProductPrice}
                        onChange={(e) => setCProductPrice(Number(e.target.value))}
                        min={1}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Merchant / Store Name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={cStoreName}
                        onChange={(e) => setCStoreName(e.target.value)}
                        placeholder="e.g. Zunme AI Official Store"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Product Image URL
                    </label>
                    <input
                      type="url"
                      className="input-field"
                      value={cProductImageUrl}
                      onChange={(e) => setCProductImageUrl(e.target.value)}
                      placeholder="https://..."
                      required
                    />
                  </div>
                </div>
              )}

              {/* Part 4: Video Ads Specific Controls */}
              {cType === 'VIDEO' && (
                <div style={{ padding: '12px', background: '#FEF2F2', borderRadius: '10px', border: '1px solid #FECACA' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Video size={16} color="#E11D48" />
                    <strong style={{ fontSize: '12.5px', color: '#991B1B' }}>Part 4 — YouTube Style Video Promotion</strong>
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Video Media URL (MP4 / YouTube)
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={cVideoUrl}
                        onChange={(e) => setCVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Video Duration Indicator
                      </label>
                      <select
                        className="input-field"
                        value={cVideoDuration}
                        onChange={(e) => setCVideoDuration(e.target.value)}
                      >
                        <option value="0:15">0:15 (Bumper / Short Ad)</option>
                        <option value="0:30">0:30 (Standard In-Stream Ad)</option>
                        <option value="1:00">1:00 (Product Walkthrough Demo)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Part 5: AI Product Placement Specific Controls */}
              {cType === 'AI_PRODUCT_PLACEMENT' && (
                <div style={{ padding: '12px', background: '#F0FDF4', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Sparkles size={16} color="#16A34A" />
                    <strong style={{ fontSize: '12.5px', color: '#166534' }}>
                      Part 5 — AI Content Native Product Placement
                    </strong>
                  </div>

                  <div className="form-grid-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        Brand / Product Mention Name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={cBrandMention}
                        onChange={(e) => setCBrandMention(e.target.value)}
                        placeholder="e.g. Zunme AI Workspace"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                        AI Content Category
                      </label>
                      <select
                        className="input-field"
                        value={cAiCategory}
                        onChange={(e) => setCAiCategory(e.target.value)}
                      >
                        <option value="Tech & AI Workflows">Tech &amp; AI Workflows</option>
                        <option value="Productivity & SaaS">Productivity &amp; SaaS</option>
                        <option value="E-Commerce & Marketing">E-Commerce &amp; Marketing</option>
                        <option value="Finance & Operations">Finance &amp; Operations</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Headline */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                    Ad Headline
                  </label>
                  <span
                    style={{
                      fontSize: '11px',
                      color: cHeadline.length > 40 ? '#E11D48' : '#8C97B0',
                      fontWeight: '600'
                    }}
                  >
                    {cHeadline.length}/40 chars
                  </span>
                </div>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Scale Executive Writing with Verified Prompts"
                  value={cHeadline}
                  onChange={(e) => setCHeadline(e.target.value)}
                  maxLength={55}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#111625' }}>
                    Ad Description &amp; Pitch
                  </label>
                  <span
                    style={{
                      fontSize: '11px',
                      color: cDescription.length > 95 ? '#E11D48' : '#8C97B0',
                      fontWeight: '600'
                    }}
                  >
                    {cDescription.length}/95 chars
                  </span>
                </div>
                <textarea
                  className="input-field"
                  style={{ minHeight: '68px', resize: 'vertical' }}
                  placeholder="e.g. Accelerate daily executive output with verified workflows and enterprise-grade models inside Zunme AI."
                  value={cDescription}
                  onChange={(e) => setCDescription(e.target.value)}
                  maxLength={130}
                  required
                />
              </div>

              {/* Display Slug & CTA */}
              <div className="form-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Display Path Slug
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={cPathSlug}
                    onChange={(e) => setCPathSlug(e.target.value)}
                    placeholder="solutions/ai-studio"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                    Call To Action Button
                  </label>
                  <select
                    className="input-field"
                    value={cCallToAction}
                    onChange={(e) => setCCallToAction(e.target.value)}
                  >
                    <option value="Learn More">Learn More</option>
                    <option value="Shop Now">Shop Now (E-Commerce)</option>
                    <option value="Watch Demo">Watch Demo (Video)</option>
                    <option value="Get Started">Get Started</option>
                    <option value="Book Demo">Book Demo</option>
                    <option value="Try Free">Try Free</option>
                  </select>
                </div>
              </div>

              {/* Destination URL */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Destination Click-Through URL
                </label>
                <input
                  type="url"
                  className="input-field"
                  value={cDestination}
                  onChange={(e) => setCDestination(e.target.value)}
                  required
                />
              </div>

              {/* Keywords */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                  Target Audience Keywords (Comma Separated)
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={cKeywords}
                  onChange={(e) => setCKeywords(e.target.value)}
                  placeholder="ai search, copywriting, b2b tools"
                />
              </div>

              {/* Pay For Demand Audience & Demographic Targeting Section */}
              <div style={{ padding: '14px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#111625', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Pay For Demand Audience Targeting Controls
                  </span>
                  <span className="badge badge-primary">Audience Match</span>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Demographics (Age: {cAgeMin} - {cAgeMax} yrs)
                    </label>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <input
                        type="number"
                        min={18}
                        max={65}
                        className="input-field"
                        style={{ padding: '6px 8px', fontSize: '12px' }}
                        value={cAgeMin}
                        onChange={(e) => setCAgeMin(Number(e.target.value))}
                      />
                      <span style={{ fontSize: '12px', color: '#64748B' }}>to</span>
                      <input
                        type="number"
                        min={18}
                        max={65}
                        className="input-field"
                        style={{ padding: '6px 8px', fontSize: '12px' }}
                        value={cAgeMax}
                        onChange={(e) => setCAgeMax(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Gender Segmentation
                    </label>
                    <select
                      className="input-field"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      value={cGender}
                      onChange={(e) => setCGender(e.target.value as any)}
                    >
                      <option value="ALL">All Genders</option>
                      <option value="MALE">Male Only</option>
                      <option value="FEMALE">Female Only</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Geographic Territories
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      value={cGeoLocation}
                      onChange={(e) => setCGeoLocation(e.target.value)}
                      placeholder="e.g. US, UK, Germany"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                      Geographic Radius
                    </label>
                    <select
                      className="input-field"
                      style={{ padding: '6px 8px', fontSize: '12px' }}
                      value={cGeoRadius}
                      onChange={(e) => setCGeoRadius(e.target.value)}
                    >
                      <option value="Nationwide">Nationwide (Full Territory)</option>
                      <option value="15km Local">15km Local Radius</option>
                      <option value="50km Metro">50km Metro Area</option>
                      <option value="Worldwide">Global / Worldwide</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                    Target Device Environments
                  </label>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    {['Desktop', 'Mobile', 'Tablet'].map((dev) => (
                      <label key={dev} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={cTargetDevices.includes(dev)}
                          onChange={() => {
                            setCTargetDevices((prev) =>
                              prev.includes(dev) ? prev.filter((d) => d !== dev) : [...prev, dev]
                            );
                          }}
                        />
                        <span>{dev}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', marginBottom: '4px' }}>
                    Audience Behavioral Interests
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    style={{ padding: '6px 8px', fontSize: '12px' }}
                    value={cAudienceInterests}
                    onChange={(e) => setCAudienceInterests(e.target.value)}
                    placeholder="e.g. AI Technology, B2B SaaS, Content Marketing"
                  />
                </div>
              </div>

              {/* Part 7: Monthly Budget Cap & Daily Limit */}
              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#111625' }}>
                    Part 7 — Monthly Budget Cap &amp; Daily Spending Limit
                  </label>
                  <span className="badge badge-primary">$1,000 – $10,000 Cap Range</span>
                </div>

                <div className="form-grid-2">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#5F6B85', marginBottom: '4px' }}>
                      Daily Budget Limit ($)
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      value={cDailyBudget}
                      onChange={(e) => setCDailyBudget(Number(e.target.value))}
                      min={5}
                      max={500}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#5F6B85', marginBottom: '4px' }}>
                      Monthly Spending Cap ($)
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      value={cMonthlyBudgetCap}
                      onChange={(e) => setCMonthlyBudgetCap(Number(e.target.value))}
                      min={1000}
                      max={10000}
                      step={500}
                      required
                    />
                  </div>
                </div>

                {/* Quick select presets for Monthly Cap */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Quick Caps:</span>
                  {[1000, 2500, 5000, 10000].map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      className="btn-ghost"
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        background: cMonthlyBudgetCap === cap ? '#EFEBFC' : '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: cMonthlyBudgetCap === cap ? '#6E56CF' : '#64748B',
                        borderRadius: '6px',
                        fontWeight: '700'
                      }}
                      onClick={() => setCMonthlyBudgetCap(cap)}
                    >
                      ${cap.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bidding & Part 7 Industry CPC Benchmarks Guide */}
              <div style={{ padding: '14px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '800', color: '#111625' }}>
                    {cPricingModel === 'PPC' ? 'Max Cost Per Click (CPC Bid)' : 'Target CPM Bid (Per 1,000 Views)'}
                  </label>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>
                    Industry Guideline: $1.00 – $5.00
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="number"
                    step="0.05"
                    className="input-field"
                    value={cBid}
                    onChange={(e) => setCBid(Number(e.target.value))}
                    min={0.1}
                    max={15.0}
                    style={{ maxWidth: '140px' }}
                    required
                  />
                  <span style={{ fontSize: '12px', color: '#5F6B85' }}>
                    {cPricingModel === 'PPC'
                      ? 'You only pay when users click'
                      : 'Cost per 1,000 visual impressions'}
                  </span>
                </div>

                {/* Benchmark Gauge Comparison */}
                <div style={{ marginTop: '10px', padding: '8px 12px', background: '#F1F5F9', borderRadius: '8px', fontSize: '11.5px', color: '#475569' }}>
                  <strong>Industry Benchmarks:</strong> Tech &amp; SaaS: $2.40–$4.20 • E-Commerce: $1.10–$2.30 • Enterprise B2B: $3.50–$5.00
                  <div style={{ marginTop: '4px', color: cBid >= 1.0 && cBid <= 5.0 ? '#059669' : '#D97706', fontWeight: '700' }}>
                    {cBid >= 1.0 && cBid <= 5.0
                      ? '✓ Your bid is perfectly aligned with high-converting industry benchmarks.'
                      : cBid < 1.0
                      ? 'ℹ Low bid mode: Excellent for cost-savings, may yield lower top-rank impression share.'
                      : 'ℹ Premium bid: High auction dominance across peak search queries.'}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ justifyContent: 'center', marginTop: '6px' }}
                id="btn-submit-campaign"
              >
                <Rocket size={16} />
                <span>Launch Campaign to Auction Pipeline</span>
              </button>
            </form>
          </div>

          {/* Interactive Live Multi-Format Advertisement Preview Simulator */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="panel-header" style={{ marginBottom: '12px' }}>
                <div>
                  <div className="panel-title">
                    <Eye size={18} color="#0284C7" />
                    Multi-Format Placement Simulator
                  </div>
                  <span style={{ fontSize: '11px', color: '#5F6B85' }}>
                    Live visual preview as you configure your campaign
                  </span>
                </div>

                {/* Viewport & Channel Mode Switcher (Parts 2, 3, 4, 5) */}
                <div style={{ display: 'flex', gap: '3px', background: '#F1F5F9', padding: '3px', borderRadius: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('SERP')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'SERP' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'SERP' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'SERP' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Laptop size={12} />
                    <span>SERP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('MOBILE')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'MOBILE' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'MOBILE' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'MOBILE' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Smartphone size={12} />
                    <span>Mobile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('BANNER')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'BANNER' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'BANNER' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'BANNER' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <ImageIcon size={12} />
                    <span>Banner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('SHOPPING')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'SHOPPING' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'SHOPPING' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'SHOPPING' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <ShoppingBag size={12} />
                    <span>Shopping</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('VIDEO')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'VIDEO' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'VIDEO' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'VIDEO' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Film size={12} />
                    <span>Video</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAdPreviewMode('AI_CONTENT')}
                    style={{
                      border: 'none',
                      background: adPreviewMode === 'AI_CONTENT' ? '#FFFFFF' : 'transparent',
                      color: adPreviewMode === 'AI_CONTENT' ? '#6E56CF' : '#64748B',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: adPreviewMode === 'AI_CONTENT' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <Sparkles size={12} />
                    <span>AI Content</span>
                  </button>
                </div>
              </div>

              {/* SERP Search Engine Result Mode */}
              {adPreviewMode === 'SERP' && (
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#6E56CF',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '900'
                      }}
                    >
                      Z
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#202124' }}>
                          Zunme AI Sponsored • {cPricingModel}
                        </span>
                        <span style={{ fontSize: '11px', color: '#70757A' }}>•</span>
                        <span style={{ fontSize: '11px', color: '#202124' }}>
                          {cDestination.replace(/^https?:\/\//, '')}
                          {cPathSlug ? ` › ${cPathSlug.replace(/^\//, '')}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#1A0DAB',
                      margin: '4px 0 6px 0',
                      lineHeight: '1.3',
                      cursor: 'pointer'
                    }}
                  >
                    {cHeadline || 'Scale Executive Writing with Verified B2B Prompts'}
                  </h3>

                  <p style={{ fontSize: '13px', color: '#4D5156', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                    {cDescription ||
                      'Ad description will appear here. Highlight your offer and verified value proposition.'}
                  </p>

                  {/* Sitelinks Extension Simulation */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid #F1F5F9'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '12px', color: '#1A0DAB', fontWeight: '600', display: 'block' }}>
                        {cCallToAction}: Instant Access
                      </span>
                      <span style={{ fontSize: '11px', color: '#70757A' }}>Verified enterprise workspace</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#1A0DAB', fontWeight: '600', display: 'block' }}>
                        Creator Marketplace
                      </span>
                      <span style={{ fontSize: '11px', color: '#70757A' }}>Verified templates &amp; blueprints</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Smartphone Card Mode */}
              {adPreviewMode === 'MOBILE' && (
                <div
                  style={{
                    maxWidth: '340px',
                    margin: '0 auto',
                    padding: '16px',
                    borderRadius: '24px',
                    background: '#FAFBFD',
                    border: '3px solid #1E293B',
                    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '10px',
                      color: '#64748B',
                      marginBottom: '10px',
                      fontWeight: '700'
                    }}
                  >
                    <span>9:41</span>
                    <span>5G • 100%</span>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          color: '#059669',
                          background: '#E8F8F0',
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        Sponsored • {cPricingModel}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748B' }}>
                        {cDestination.replace(/^https?:\/\//, '')}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1A0DAB', margin: '4px 0' }}>
                      {cHeadline || 'Your Mobile Ad Headline'}
                    </h4>

                    <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.4', margin: '0 0 8px 0' }}>
                      {cDescription || 'Mobile description text optimized for compact screens.'}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: '700',
                          color: '#6E56CF',
                          background: '#EFEBFC',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {cCallToAction} &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Part 2: Display Banner Simulator Mode (300×250 and 728×90 preview) */}
              {adPreviewMode === 'BANNER' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* 300×250 Medium Rectangle Display Banner */}
                  <div
                    style={{
                      maxWidth: '320px',
                      margin: '0 auto',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #CBD5E1',
                      background: '#FFFFFF',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div style={{ position: 'relative', height: '140px', background: '#1E293B' }}>
                      <img
                        src={cBannerImageUrl}
                        alt="Display Banner"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          fontSize: '9px',
                          fontWeight: '800',
                          color: '#FFFFFF',
                          background: 'rgba(0,0,0,0.6)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        Display Banner • {cBannerSize}
                      </span>
                    </div>

                    <div style={{ padding: '12px' }}>
                      <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#111625', margin: '0 0 4px 0' }}>
                        {cHeadline || 'Visual Banner Display Headline'}
                      </h4>
                      <p style={{ fontSize: '11.5px', color: '#64748B', lineHeight: '1.4', margin: '0 0 10px 0' }}>
                        {cDescription || 'High-converting visual display ad copy placed across verified web partners.'}
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}
                        onClick={() => showToast(`Banner clicked: Destination ${cDestination}`, 'info')}
                      >
                        {cCallToAction} &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 728×90 Leaderboard Simulation Strip */}
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '9px', fontWeight: '800', background: '#6E56CF', color: '#FFF', padding: '1px 5px', borderRadius: '3px' }}>
                        AD 728×90
                      </span>
                      <strong style={{ fontSize: '12px', color: '#111625' }}>
                        {cHeadline || 'Leaderboard Display Header'}
                      </strong>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#6E56CF', background: '#EFEBFC', padding: '3px 8px', borderRadius: '4px' }}>
                      {cCallToAction}
                    </span>
                  </div>
                </div>
              )}

              {/* Part 3: Shopping Ad E-Commerce Listing Mode */}
              {adPreviewMode === 'SHOPPING' && (
                <div
                  style={{
                    maxWidth: '300px',
                    margin: '0 auto',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
                  }}
                >
                  <div style={{ position: 'relative', height: '180px', background: '#F8FAFC' }}>
                    <img
                      src={cProductImageUrl}
                      alt="Shopping Product"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        fontSize: '9.5px',
                        fontWeight: '800',
                        color: '#065F46',
                        background: '#ECFDF5',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        border: '1px solid #A7F3D0'
                      }}
                    >
                      Sponsored Product
                    </span>
                  </div>

                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <CheckCircle2 size={12} color="#059669" />
                      <span>{cStoreName || 'Zunme AI Store'}</span>
                    </div>

                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#111625', margin: '4px 0 8px 0', lineHeight: '1.3' }}>
                      {cHeadline || 'AI Prompt Engineering Master Kit'}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '900', color: '#059669' }}>
                        ${cProductPrice.toFixed(2)}
                      </span>
                      <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>
                        ${(cProductPrice * 1.5).toFixed(2)}
                      </span>
                      <span style={{ fontSize: '10px', color: '#EF4444', fontWeight: '700' }}>33% OFF</span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', justifyContent: 'center', background: '#059669', borderColor: '#059669' }}
                      onClick={() => showToast(`Shopping item opened: Destination ${cDestination}`, 'success')}
                    >
                      <ShoppingBag size={14} />
                      <span>Shop Now</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Part 4: Video Ad YouTube-Style Player Mode */}
              {adPreviewMode === 'VIDEO' && (
                <div
                  style={{
                    maxWidth: '380px',
                    margin: '0 auto',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#0F172A',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.2)'
                  }}
                >
                  <div style={{ position: 'relative', height: '200px', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=80"
                      alt="Video Poster"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />

                    {/* Centered Play Button Simulator */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(110,86,207,0.9)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      onClick={() => showToast('Playing in-stream video demo simulation...', 'info')}
                    >
                      <Play size={20} style={{ marginLeft: '3px' }} />
                    </div>

                    {/* Video Duration & Skip Indicator */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {cVideoDuration} HD
                    </span>

                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '10px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                        background: 'rgba(15,23,42,0.85)',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      Skip in 5s
                    </span>

                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        fontSize: '9.5px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        background: '#E11D48',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      Video Ad • {cPricingModel}
                    </span>
                  </div>

                  {/* Video CTA Overlay Banner */}
                  <div
                    style={{
                      padding: '12px 14px',
                      background: '#1E293B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                        {cHeadline || 'Watch How Teams Build 10x Faster with Zunme AI'}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>{cDestination.replace(/^https?:\/\//, '')}</span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => showToast(`Video CTA clicked: Destination ${cDestination}`, 'info')}
                    >
                      {cCallToAction}
                    </button>
                  </div>
                </div>
              )}

              {/* Part 5: AI Content Native Product Placement Mode */}
              {adPreviewMode === 'AI_CONTENT' && (
                <div
                  style={{
                    padding: '18px',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#166534',
                        background: '#DCFCE7',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      AI Newsletter Excerpt • {cAiCategory}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Editorial Context</span>
                  </div>

                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', margin: '0 0 12px 0' }}>
                    "...When engineering multi-step reasoning pipelines, selecting reliable model infrastructure is paramount.
                    For verified production teams,{' '}
                    <span
                      style={{
                        background: '#FEF3C7',
                        color: '#92400E',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '700',
                        border: '1px solid #FCD34D'
                      }}
                    >
                      {cBrandMention || 'Zunme AI Suite'}
                    </span>{' '}
                    offers an integrated environment with automated prompt chaining and real-time citation grounding..."
                  </p>

                  <div
                    style={{
                      padding: '10px 12px',
                      background: '#F8FAFC',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '12.5px', color: '#111625', display: 'block' }}>
                        {cHeadline || 'Recommended Partner Tool'}
                      </strong>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        Sponsored citation • {cDestination.replace(/^https?:\/\//, '')}
                      </span>
                    </div>

                    <a
                      href={cDestination}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '11px', padding: '3px 8px' }}
                    >
                      {cCallToAction} &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Part 6: 3-Pillar Quality Score Breakdown & Ad Rank Calculation Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <div
                style={{
                  padding: '14px',
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={16} color="#6E56CF" />
                    <strong style={{ fontSize: '13px', color: '#111625' }}>
                      Part 6 — 3-Pillar Quality Score Breakdown
                    </strong>
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#059669',
                      background: '#E8F8F0',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    Overall QS: {dynamicQualityScore.overall}/10
                  </span>
                </div>

                {/* 3 Pillars Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center', marginBottom: '10px' }}>
                  <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>1. Ad Relevance</span>
                    <strong style={{ fontSize: '14px', color: '#111625' }}>{dynamicQualityScore.adRelevance}/10</strong>
                  </div>
                  <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>2. Expected CTR</span>
                    <strong style={{ fontSize: '14px', color: '#111625' }}>{dynamicQualityScore.expectedCtr}/10</strong>
                  </div>
                  <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>3. Landing Page</span>
                    <strong style={{ fontSize: '14px', color: '#111625' }}>{dynamicQualityScore.landingPageQuality}/10</strong>
                  </div>
                </div>

                {/* Ad Rank Equation Display */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: '#EFEBFC',
                    borderRadius: '8px',
                    border: '1px solid rgba(110,86,207,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px'
                  }}
                >
                  <span style={{ color: '#4C1D95', fontWeight: '700' }}>
                    Ad Rank Formula = Bid (${cBid}) × Quality Score ({dynamicQualityScore.overall})
                  </span>
                  <strong style={{ color: '#6E56CF', fontSize: '13px' }}>
                    Calculated Ad Rank: {dynamicAdRank}
                  </strong>
                </div>
              </div>

              {/* Pay For Demand Targeting Summary Card */}
              <div style={{ marginTop: '10px', padding: '12px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Targeting Specification
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '10px' }}>Active Matrix</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11.5px', color: '#475569' }}>
                  <div><strong>Demographics:</strong> {cAgeMin}-{cAgeMax} yrs • {cGender}</div>
                  <div><strong>Geography:</strong> {cGeoLocation} ({cGeoRadius})</div>
                  <div><strong>Devices:</strong> {cTargetDevices.join(', ')}</div>
                  <div><strong>Bidding:</strong> Max CPC ${cBid.toFixed(2)} • Daily ${cDailyBudget}</div>
                </div>
              </div>

              {/* Quality Score & Honest Simulator Notice */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <div style={{ padding: '12px 14px', background: '#E8F8F0', borderRadius: '10px', border: '1px solid rgba(5,150,105,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={15} />
                    <span>Auction Verification: High Ad Quality Score ({cHeadline.length > 0 && cDescription.length > 0 ? '9.6/10' : '6.0/10'})</span>
                  </span>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>
                    Expected CTR: ~4.2%
                  </span>
                </div>

              <div
                style={{
                  padding: '8px 12px',
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '11px',
                  color: '#64748B'
                }}
              >
                <strong>Zunme Ad Delivery Engine:</strong> Highest Ad Rank wins the primary position #1 pin. Real-time conversion tracking &amp; ROAS optimization are continuously audited in frontend simulator mode.
              </div>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KEYWORD BIDDING ENGINE (Enhanced with Part 6 Quality Score & Ad Rank) */}
      {activeTab === 'Keyword Bidding' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">
                <DollarSign size={18} color="#059669" />
                Real-Time Keyword Auction &amp; Ad Rank Bidding Matrix
              </div>
              <div className="panel-subtitle">
                Google Ads 3-Pillar Quality Score and Ad Rank calculation (Bid × QS) governing winning placement hierarchy.
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('AI re-calculated dynamic Ad Rank across all active keyword slots', 'success')}
            >
              <Sparkles size={14} /> AI Auto-Optimize Bids
            </button>
          </div>

          {/* Part 6 Informational Banner */}
          <div
            style={{
              padding: '12px 14px',
              background: '#EFEBFC',
              borderRadius: '10px',
              border: '1px solid rgba(110,86,207,0.25)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#6E56CF" />
              <span style={{ fontSize: '12.5px', color: '#4C1D95', fontWeight: '600' }}>
                <strong>Ad Rank Formula:</strong> Ad Rank = Max CPC Bid × Quality Score. Higher Quality Score allows you to win Position #1 while paying lower actual CPC.
              </span>
            </div>
            <span className="badge badge-primary">3-Pillar Audited</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E8ECF5', color: '#5F6B85' }}>
                  <th style={{ padding: '12px 14px' }}>Target Keyword</th>
                  <th style={{ padding: '12px 14px' }}>Monthly Volume</th>
                  <th style={{ padding: '12px 14px' }}>Avg Market CPC</th>
                  <th style={{ padding: '12px 14px' }}>Competition</th>
                  <th style={{ padding: '12px 14px' }}>Your Max Bid</th>
                  {/* Part 6 Columns */}
                  <th style={{ padding: '12px 14px' }}>Quality Score (QS)</th>
                  <th style={{ padding: '12px 14px' }}>Ad Rank (Bid × QS)</th>
                  <th style={{ padding: '12px 14px' }}>Auction Status</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auctions.map((a) => (
                  <tr key={a.keyword} style={{ borderBottom: '1px solid #F0F3F9' }}>
                    <td style={{ padding: '14px', fontWeight: '700', color: '#111625' }}>
                      "{a.keyword}"
                    </td>
                    <td style={{ padding: '14px', color: '#5F6B85' }}>
                      {a.monthlyVolume} queries
                    </td>
                    <td style={{ padding: '14px', color: '#111625', fontWeight: '600' }}>
                      ${a.avgCpc.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span
                        className={`status-chip ${
                          a.competition === 'HIGH'
                            ? 'danger'
                            : a.competition === 'MEDIUM'
                            ? 'warning'
                            : 'success'
                        }`}
                      >
                        {a.competition}
                      </span>
                    </td>
                    <td style={{ padding: '14px', fontWeight: '800', color: '#6E56CF' }}>
                      ${a.myBid.toFixed(2)}
                    </td>
                    {/* Part 6 Columns */}
                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          color: '#059669',
                          background: '#E8F8F0',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {a.qualityScore}/10
                      </span>
                    </td>
                    <td style={{ padding: '14px', fontWeight: '800', color: '#111625' }}>
                      {a.adRank.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span className={`badge ${a.status === 'WINNING' ? 'badge-success' : 'badge-danger'}`}>
                        {a.status === 'WINNING' ? 'Position #1 (Winning)' : 'Outbid (#2)'}
                      </span>
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleUpdateBid(a.keyword)}
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        + $0.10 Raise
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AD PLACEMENTS PREVIEW (Enhanced with Part 2 Display Banner, Part 3 Shopping, Part 4 Video & Part 5 AI Placements) */}
      {activeTab === 'Ad Placements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <Eye size={18} color="#6E56CF" />
                  Ecosystem Distribution Inventory
                </div>
                <div className="panel-subtitle">
                  Visual slots across Live Search, Display Banner Network, E-Commerce Listings, In-Stream Video, and AI Generated Content.
                </div>
              </div>
              <span className="badge badge-primary">5 Core Channels</span>
            </div>

            <div className="cards-grid-3">
              {/* Placement 1 */}
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-primary" style={{ marginBottom: '10px' }}>Placement 01</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  Live Web Search Top Pin (PPC)
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Injects a verified sponsored citation tile directly atop search briefs for high-intent research keywords.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 4.8% • Model: PPC
                </div>
              </div>

              {/* Placement 2: Display Banner Network (Part 2) */}
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-success" style={{ marginBottom: '10px' }}>Part 2 — Placement 02</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  Display Banner Ads (300×250, 728×90, 160×600)
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Visual creative banners served across Zunme web apps, community forums, and high-traffic partner portals.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 2.2% • Model: PPV / CPM &amp; PPC
                </div>
              </div>

              {/* Placement 3: Shopping Ads (Part 3) */}
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-warning" style={{ marginBottom: '10px' }}>Part 3 — Placement 03</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  Shopping Ads &amp; Product Listings
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Product thumbnail, live price tag ($), merchant store name, and 1-click "Shop Now" checkout cards.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CVR: 6.3% • Model: PPC
                </div>
              </div>

              {/* Placement 4: Video Ads (Part 4) */}
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-danger" style={{ marginBottom: '10px' }}>Part 4 — Placement 04</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  In-Stream Video Promotion (YouTube Style)
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Engaging 15s to 60s pre-roll and mid-roll video player placements with interactive CTA overlay badges.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg Completion: 78% • Model: PPV / CPM
                </div>
              </div>

              {/* Placement 5: AI Product Placement (Part 5) */}
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-primary" style={{ marginBottom: '10px' }}>Part 5 — Placement 05</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  AI Content Native Product Placement
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Contextual brand mentions seamlessly embedded inside AI-generated blogs, articles, and newsletters.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 3.8% • Native High Trust
                </div>
              </div>

              {/* Placement 6: Warehouse Asset */}
              <div style={{ padding: '20px', borderRadius: '14px', background: '#FAFBFD', border: '1px solid #E8ECF5' }}>
                <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>Placement 06</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                  AI Warehouse Promoted Asset
                </h4>
                <p style={{ fontSize: '12px', color: '#5F6B85', lineHeight: '1.5' }}>
                  Showcases promoted prompt packs or creator assets atop the AI Warehouse browse directory.
                </p>
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#059669', fontWeight: '700' }}>
                  Avg CTR: 3.9% • High Download Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CREATOR MONETIZATION */}
      {activeTab === 'Creator Monetization' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Revenue Split Overview Banner */}
          <div className="future-module-banner" style={{ margin: 0 }}>
            <div className="future-module-icon">
              <Award size={24} color="#FBBF24" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                Zunme Creator Revenue-Sharing Program (70/30 Split)
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.5' }}>
                Creators earn 70% of gross advertising and subscription revenue generated by their shared prompt packs, templates, and workflows. Automatic payouts execute on the 1st of every month.
              </p>
            </div>
          </div>

          {/* Monetization Metrics */}
          <div className="cards-grid-3">
            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Total Creator Payouts
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                $12,480.00
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Disbursed to 48 verified creators
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#6E56CF', textTransform: 'uppercase' }}>
                Next Payout Cycle
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                Nov 1, 2026
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Pending batch: <strong>$1,840.50</strong>
              </div>
            </div>

            <div className="glass-panel">
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
                Active Paywall Tiers
              </span>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#111625', marginTop: '4px' }}>
                3 Tiers Enabled
              </div>
              <div style={{ fontSize: '12px', color: '#5F6B85', marginTop: '4px' }}>
                Free, Pro ($9/mo), Enterprise ($49/mo)
              </div>
            </div>
          </div>

          {/* Creator Payouts Ledger Table */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">Creator Revenue Distribution Ledger</div>
              <span className="badge badge-primary">Audited Ledger</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E8ECF5', color: '#5F6B85' }}>
                    <th style={{ padding: '12px 14px' }}>Creator</th>
                    <th style={{ padding: '12px 14px' }}>Monetized Asset</th>
                    <th style={{ padding: '12px 14px' }}>Impressions / Clicks</th>
                    <th style={{ padding: '12px 14px' }}>Gross Revenue</th>
                    <th style={{ padding: '12px 14px' }}>Creator Share (70%)</th>
                    <th style={{ padding: '12px 14px', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F0F3F9' }}>
                      <td style={{ padding: '14px', fontWeight: '800', color: '#111625' }}>
                        {p.creatorName}
                      </td>
                      <td style={{ padding: '14px', color: '#5F6B85' }}>
                        {p.assetTitle}
                      </td>
                      <td style={{ padding: '14px', color: '#111625' }}>
                        {p.impressions.toLocaleString()} / {p.clicks}
                      </td>
                      <td style={{ padding: '14px', fontWeight: '600', color: '#111625' }}>
                        ${p.grossRevenue.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px', fontWeight: '800', color: '#059669' }}>
                        ${p.creatorShare.toFixed(2)}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <span className={`badge ${p.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BILLING & BUDGET (Enhanced with Part 7 Monthly Budget Cap Controls) */}
      {activeTab === 'Billing & Budget' && (
        <div className="cards-grid-2">
          {/* Ad Credit Wallet */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Wallet size={18} color="#6E56CF" />
                Ad Credit Wallet Balance
              </div>
              <span className="badge badge-success">Active Account</span>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 0', borderBottom: '1px solid #E8ECF5' }}>
              <span style={{ fontSize: '13px', color: '#5F6B85', display: 'block', marginBottom: '6px' }}>
                Available Ad Spend Balance
              </span>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#111625' }}>
                ${walletBalance.toFixed(2)}
              </div>
              <span style={{ fontSize: '12px', color: '#059669' }}>
                Estimated ~1,420 engaged clicks remaining
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '10px' }}>
                Quick Top-Up Ad Credits:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(65px, 1fr))', gap: '10px' }}>
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleAddFunds(amt)}
                    style={{ fontWeight: '800', justifyContent: 'center' }}
                  >
                    + ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                background: '#FAFBFD',
                borderRadius: '10px',
                border: '1px solid #E8ECF5'
              }}
            >
              <div>
                <strong style={{ fontSize: '13px', color: '#111625', display: 'block' }}>Auto-Recharge Safeguard</strong>
                <span style={{ fontSize: '12px', color: '#5F6B85' }}>Automatically add $100 when balance falls below $25</span>
              </div>
              <input
                type="checkbox"
                checked={autoRecharge}
                onChange={(e) => {
                  setAutoRecharge(e.target.checked);
                  showToast(`Auto-recharge ${!autoRecharge ? 'Enabled' : 'Disabled'}`, 'info');
                }}
                style={{ width: '18px', height: '18px', accentColor: '#6E56CF' }}
              />
            </div>
          </div>

          {/* Part 7: Monthly Account Spending Cap & Safeguards */}
          <div className="glass-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Target size={18} color="#0284C7" />
                Part 7 — Monthly Spending Cap Controls ($1,000 – $10,000)
              </div>
              <span className="badge badge-primary">Safeguard Active</span>
            </div>

            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#111625' }}>
                  Account-Wide Monthly Cap
                </span>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#6E56CF' }}>
                  ${monthlyAccountCap.toLocaleString()} / month
                </span>
              </div>

              {/* Progress Bar of Spend vs Cap */}
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', margin: '10px 0 6px 0' }}>
                <div
                  style={{
                    width: `${Math.min((totalSpend / monthlyAccountCap) * 100, 100)}%`,
                    height: '100%',
                    background: '#6E56CF',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                <span>Month-to-Date Spend: ${totalSpend.toFixed(2)}</span>
                <span>Remaining: ${(monthlyAccountCap - totalSpend).toFixed(2)}</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Adjust Monthly Spending Ceiling:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[1000, 2500, 5000, 10000].map((capVal) => (
                  <button
                    key={capVal}
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{
                      background: monthlyAccountCap === capVal ? '#EFEBFC' : '#FFFFFF',
                      borderColor: monthlyAccountCap === capVal ? '#6E56CF' : '#E2E8F0',
                      color: monthlyAccountCap === capVal ? '#6E56CF' : '#111625',
                      fontWeight: '800'
                    }}
                    onClick={() => {
                      setMonthlyAccountCap(capVal);
                      showToast(`Monthly account spend cap updated to $${capVal.toLocaleString()}`, 'success');
                    }}
                  >
                    ${capVal.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Invoices List */}
            <div style={{ borderTop: '1px solid #E8ECF5', paddingTop: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
                Recent Tax Invoices &amp; Receipts
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'INV-9041', date: 'Oct 12, 2026', amount: '$250.00', status: 'PAID' },
                  { id: 'INV-8820', date: 'Sep 28, 2026', amount: '$100.00', status: 'PAID' }
                ].map((inv) => (
                  <div
                    key={inv.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: '#FAFBFD',
                      border: '1px solid #E8ECF5',
                      fontSize: '12px'
                    }}
                  >
                    <div>
                      <strong style={{ color: '#111625' }}>{inv.id}</strong>
                      <span style={{ color: '#5F6B85', display: 'block', fontSize: '11px' }}>
                        {inv.date} • Visa ending 4242
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '800', color: '#111625' }}>{inv.amount}</span>
                      <button
                        className="btn-ghost"
                        onClick={() => showToast(`Receipt ${inv.id} downloaded`, 'info')}
                        style={{ fontSize: '11px', color: '#6E56CF', padding: '4px' }}
                      >
                        PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'Settings' && (
        <div className="glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <SettingsIcon size={18} color="#6E56CF" />
              <span>Ads Account &amp; Delivery Settings</span>
            </div>
          </div>
          <p style={{ color: '#5F6B85', fontSize: '13px', marginBottom: '16px' }}>
            Configure default bidding strategies, geographic targeting defaults, and advertiser compliance parameters.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>
                Auto-Recharge Threshold
              </strong>
              <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>
                Automatically maintain $150 minimum balance when ad impressions spike.
              </p>
            </div>
            <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
              <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>
                Attribution Window
              </strong>
              <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>
                7-day click / 1-day view conversion tracking enabled across all campaigns.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Help & Support */}
      {activeTab === 'Help & Support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="glass-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">
                  <LifeBuoy size={20} color="#6E56CF" />
                  <span>Advertiser Help &amp; Policy Center</span>
                </div>
                <div className="panel-subtitle">
                  Guidelines for search keyword auctions, display banners, shopping catalogs, and publisher revenue share.
                </div>
              </div>
              <span className="badge badge-primary">Dedicated Ads Support</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '12px' }}>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>
                  Search &amp; Quality Score Mechanics
                </strong>
                <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>
                  CPC bidding rules, semantic query relevance score thresholds, and second-price auction mechanics.
                </p>
              </div>
              <div style={{ padding: '16px', background: '#FAFBFD', borderRadius: '12px', border: '1px solid #E8ECF5' }}>
                <strong style={{ fontSize: '14px', color: '#111625', display: 'block', marginBottom: '6px' }}>
                  Billing &amp; Tax Invoices
                </strong>
                <p style={{ fontSize: '12px', color: '#5F6B85', margin: 0 }}>
                  Download monthly VAT/GST tax invoices and update primary payment methods seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZunmeAdsPage;
