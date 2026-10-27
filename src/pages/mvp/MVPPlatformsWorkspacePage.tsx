import React, { useState, useEffect } from 'react';
import {
  Youtube,
  Instagram,
  Linkedin,
  ShoppingBag,
  Facebook,
  Twitter,
  Search,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  Share2,
  RefreshCw,
  Sliders,
  TrendingUp,
  Hash,
  FileText,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  BarChart2,
  Play,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import './MVPPlatformsWorkspacePage.css';

export type MVPPlatformKey = 'youtube' | 'tiktok' | 'instagram' | 'linkedin' | 'amazon' | 'facebook' | 'x' | 'google';

interface PlatformMeta {
  id: MVPPlatformKey;
  name: string;
  tagline: string;
  color: string;
  bgColor: string;
  badge: string;
  icon: React.ReactNode;
}

export const MVP_PLATFORMS: PlatformMeta[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'High-Retention Scripts & SEO Titles',
    color: '#FF0000',
    bgColor: 'rgba(255, 0, 0, 0.08)',
    badge: 'Video & SEO',
    icon: <Youtube size={18} />
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: '3-Sec Viral Hooks & Short Scripts',
    color: '#00F2FE',
    bgColor: 'rgba(0, 242, 254, 0.08)',
    badge: 'Shorts & Viral',
    icon: <Play size={18} />
  },
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Reels Pacing, Captions & Bio Audit',
    color: '#E1306C',
    bgColor: 'rgba(225, 48, 108, 0.08)',
    badge: 'Visual & Reels',
    icon: <Instagram size={18} />
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    tagline: 'Profile Optimizer & B2B Leadership',
    color: '#0A66C2',
    bgColor: 'rgba(10, 102, 194, 0.08)',
    badge: 'B2B & Career',
    icon: <Linkedin size={18} />
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tagline: 'A9 Search Listings & 5 Bullet Points',
    color: '#FF9900',
    bgColor: 'rgba(255, 153, 0, 0.08)',
    badge: 'E-Commerce & A9',
    icon: <ShoppingBag size={18} />
  },
  {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'Interactive Polls, Posts & Auto-Replies',
    color: '#1877F2',
    bgColor: 'rgba(24, 119, 242, 0.08)',
    badge: 'Community & Ads',
    icon: <Facebook size={18} />
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    tagline: 'Tweet Threads, Summaries & Sentiment',
    color: '#1DA1F2',
    bgColor: 'rgba(29, 161, 242, 0.08)',
    badge: 'Real-Time & Threads',
    icon: <Twitter size={18} />
  },
  {
    id: 'google',
    name: 'Google',
    tagline: 'Research Synthesis & Argument Structuring',
    color: '#34A853',
    bgColor: 'rgba(52, 168, 83, 0.08)',
    badge: 'Search & Argument',
    icon: <Search size={18} />
  }
];

interface GeneratedOutput {
  headline: string;
  sections: { title: string; content: string; badge?: string }[];
  metrics?: { label: string; value: string }[];
}

interface PlatformConfig {
  defaultTopic: string;
  defaultNiche: string;
  defaultTone: string;
  defaultAudience: string;
  modes: { id: string; label: string }[];
  presets: Record<string, GeneratedOutput>;
}

const PLATFORM_CONFIGS: Record<MVPPlatformKey, PlatformConfig> = {
  youtube: {
    defaultTopic: 'Next-Gen AI Workflows for Solopreneurs',
    defaultNiche: 'Tech & Business',
    defaultTone: 'High Energy',
    defaultAudience: 'Content Creators & Entrepreneurs',
    modes: [
      { id: 'primary', label: 'Full Package (Titles + Script + SEO)' },
      { id: 'hook', label: 'Viral Hooks Only' },
      { id: 'comments', label: 'Comment & FAQ Responder' }
    ],
    presets: {
      primary: {
        headline: 'AI in 2026: 5 Tools That Will Replace Your Entire Team (Before Q4)',
        sections: [
          {
            title: 'High-CTR SEO Titles (<60 Characters)',
            content:
              '1. AI in 2026: 5 Tools That Replace Your Team\n2. The Secret AI Stack Nobody Is Talking About\n3. Stop Wasting 40 Hours/Week: New AI Workflow\n4. Top 5 AI Tools I Use Every Day in 2026',
            badge: 'Character Limit Verified'
          },
          {
            title: '3-Act High-Retention Video Script',
            content:
              'ACT 1: THE 5-SECOND HOOK\n"If you are still writing copy or editing video manually in 2026, you are losing 80% of your margins. Watch this before your competitor does."\n\nACT 2: VALUE & PROOF (THE RETENTION CURVE)\n"Tool #1 is Zunme AI — it automates the research, drafts the script, and syncs directly to your social scheduler. Here is live proof of the workflow..."\n\nACT 3: THE CALL TO ACTION\n"Drop a comment below with your niche, and I will share my full automation template for free. Hit subscribe for daily AI breakdowns."',
            badge: 'High Viewer Retention Curve'
          },
          {
            title: 'SEO Tags & Metadata',
            content:
              'zunme ai, ai tools 2026, automation workflow, productivity hacks, content creation ai, youtube seo, viral video script',
            badge: 'YouTube Algorithm Optimized'
          },
          {
            title: 'Catchy Thumbnail Concepts & Visual Cues',
            content:
              'Concept 1: Shocked face expression looking at laptop screen with glowing holographic "$0/mo Team Cost". Bold yellow text overlay: "REPLACED BY AI".\nConcept 2: Split comparison graphic: 5 stressed humans on left vs 1 calm operator with Zunme AI HUD on right.',
            badge: 'High CTR Visual Design'
          }
        ],
        metrics: [
          { label: 'Title Character Count', value: '47 / 60 Chars (Optimal)' },
          { label: 'Hook Impact Score', value: '94/100 (High Retention)' },
          { label: 'Algorithm Visibility', value: 'A+ (High Intent Match)' }
        ]
      },
      hook: {
        headline: '5 High-Impact 5-Second YouTube Hooks (Zero Drop-Off)',
        sections: [
          {
            title: 'Curiosity Gap & Contrarian Hooks (<5 Seconds)',
            content:
              'Hook 1: "90% of creators are wasting 40 hours a week on tasks an AI can do in 4 seconds. Let me prove it."\nHook 2: "If you are starting a channel in 2026, stop writing your scripts by hand. Here is the unfair advantage top creators use."\nHook 3: "This one tool quietly replaced my entire research and SEO team in 14 days."\nHook 4: "Never upload another video until you check these 3 retention settings."\nHook 5: "POV: You find the exact blueprint that 10X\'d my channel views with zero ad spend."',
            badge: 'Hook Impact Score: 98/100'
          },
          {
            title: 'Pacing & Retention Cue Guideline',
            content:
              'Deliver hook within 0:00 - 0:04. Cut abruptly to fast visual proof at 0:05. Do NOT include lengthy channel intro animations.',
            badge: 'Retention Curve Guaranteed'
          }
        ],
        metrics: [
          { label: 'First 15s Retention', value: '88% Expected' },
          { label: 'Hook Delivery Velocity', value: '4.2 Seconds' },
          { label: 'Audience Drop-Off Risk', value: 'Ultra Low' }
        ]
      },
      comments: {
        headline: 'YouTube Audience Interaction: Pinned Discussion & FAQ Responders',
        sections: [
          {
            title: 'Pinned Discussion Starter (Engagement Booster)',
            content:
              '"Drop a comment below with your biggest bottleneck in 2026: Time, Team, or Tools? Replying to every comment within the next 2 hours! 👇"',
            badge: 'High Reply Rate Trigger'
          },
          {
            title: 'Top 3 Smart FAQ & Community Reply Drafters',
            content:
              '1. Value & Skepticism: "Great question! This system uses local grounding so it never hallucinates facts. You can test the free tier in the description."\n2. Tool Compatibility: "Yes, it integrates directly with your existing browser and workflow without any coding setup."\n3. Channel Shoutout: "Appreciate the support! Make sure you check out next Tuesday\'s live walkthrough."',
            badge: 'Community Loyalty & Retention'
          },
          {
            title: 'Audience Feedback Sentiment Audit',
            content:
              'Sentiment: 94% Positive. Audience is asking for deeper workflow templates and downloadable cheatsheets.',
            badge: 'Feedback Incorporation Ready'
          }
        ],
        metrics: [
          { label: 'Comment Engagement Forecast', value: '+48% Comments' },
          { label: 'Community Retention Score', value: '96/100' },
          { label: 'Audience Connection', value: 'High Trust' }
        ]
      }
    }
  },

  tiktok: {
    defaultTopic: 'How to scale an ecommerce store with zero ad spend',
    defaultNiche: 'E-Commerce',
    defaultTone: 'High Energy',
    defaultAudience: 'Gen-Z Shoppers & Side Hustlers',
    modes: [
      { id: 'primary', label: '3-Sec Viral Blueprint & Script' },
      { id: 'trends', label: 'FYP Sounds & Trending Stacks' },
      { id: 'analytics', label: 'Performance & Follower Velocity' }
    ],
    presets: {
      primary: {
        headline: 'TikTok Viral Blueprint: 3-Second Visual Hook & Micro-Script',
        sections: [
          {
            title: '3-Second Instant Hook Concepts',
            content:
              'Hook 1: "Never start an online store before watching this 30-second secret."\nHook 2: "POV: You found the supplier that every Amazon seller tries to hide."\nHook 3: "Stop scrolling if your Shopify store made less than $10K this month."',
            badge: '3-Second Retention Guarantee'
          },
          {
            title: 'Short-Form Video Script with Audio Pacing',
            content:
              '[VISUAL: Fast zoom-in on phone screen showing sales dashboard]\n[VOICEOVER]: "Three apps that literally doubled my store conversions overnight..."\n[TEXT ON SCREEN]: 1. AI Bundles | 2. Smart Reviews | 3. Instant Shipping\n[AUDIO CUE]: Trending synth beat kicks in at 0:08\n[OUTRO]: "Link in bio to test it out today."',
            badge: 'TikTok Algorithm Optimized'
          },
          {
            title: 'Sound & Hashtag Stacking',
            content: '#tiktokshop #ecommercegrowth #businesshacks #shopifytips #sidehustle2026 #zunme',
            badge: 'Trend Velocity Score: 98%'
          }
        ],
        metrics: [
          { label: 'Hook Velocity', value: '0.8s to impact' },
          { label: 'Recommended Duration', value: '24-32 Seconds' },
          { label: 'Viral Propensity', value: 'High (FYP Friendly)' }
        ]
      },
      trends: {
        headline: 'TikTok Viral Sounds, Speed Trends & Audio Stacking',
        sections: [
          {
            title: 'Trending Audio Cues',
            content:
              '[AUDIO #1]: Fast upbeat synth drop (1.8M creations this week)\n[AUDIO #2]: Cinematic suspense riser for dramatic reveal scenes\n[AUDIO #3]: Subtle lo-fi beat for talking head advice clips',
            badge: 'Audio Algorithm Matched'
          },
          {
            title: 'Hashtag Velocity Stacking (High Reach + Micro-Niche)',
            content: '#tiktokshop #ecommercegrowth #businesshacks #fyp #viral2026 #zunme',
            badge: 'Zero Shadowban Risk'
          },
          {
            title: 'Peak Posting Time Window',
            content: 'Post between 6:30 PM - 8:45 PM in your local timezone for maximum first-hour velocity.',
            badge: 'Peak FYP Window'
          }
        ],
        metrics: [
          { label: 'Trend Match', value: '98%' },
          { label: 'Audio Virality', value: 'Extreme' },
          { label: 'Algorithmic Distribution', value: 'Level 4 Pool' }
        ]
      },
      analytics: {
        headline: 'TikTok Video Performance & Retention Curve Insights',
        sections: [
          {
            title: 'Retention Diagnosis & Drop-Off Points',
            content:
              'Analysis: 74% of viewer drop-offs occur before 0:03. Adding high-contrast kinetic captions increased complete view-through rate by +31%.\n\nRecommended Fix: Cut the first 1.2 seconds of dead air and open directly on physical motion.',
            badge: 'Viewer Retention Insights'
          },
          {
            title: 'Follower Conversion Blueprint',
            content:
              'Call-to-Action Strategy: Don\'t ask to "follow". Ask viewers to "save this so you don\'t lose the supplier list". Bookmark saves trigger 4.2x more algorithm pushes.',
            badge: 'Growth Multiplier'
          }
        ],
        metrics: [
          { label: 'Avg Watch Time', value: '86%' },
          { label: 'Share Velocity', value: 'High' },
          { label: 'Follower Yield', value: '+3.4% per 1k views' }
        ]
      }
    }
  },

  instagram: {
    defaultTopic: 'Minimalist home office setup aesthetic',
    defaultNiche: 'Creator & Lifestyle',
    defaultTone: 'Storytelling',
    defaultAudience: 'Aesthetic Enthusiasts & Designers',
    modes: [
      { id: 'primary', label: 'Reels Sequence & Pacing Visuals' },
      { id: 'caption', label: 'Storytelling Caption & Bio Audit' },
      { id: 'dm', label: 'DM Automation & Hashtags' }
    ],
    presets: {
      primary: {
        headline: 'Instagram Reels Sequence, Aesthetic Pacing & Audio Design',
        sections: [
          {
            title: 'Reels Sequence & Pacing Visuals',
            content:
              'Scene 1 (0-3s): POV desk transformation from cluttered to sleek aesthetic.\nScene 2 (4-8s): Close-up of wireless mechanical keyboard & ambient warm LED glow.\nScene 3 (9-13s): Split screen showing cable management tray underneath.\nAudio: Lo-fi chillhop beat with subtle rain sound effect.',
            badge: 'Visual Aesthetic Ready'
          },
          {
            title: 'High-Engagement Caption & Micro-Story',
            content:
              'Your environment dictates your output. ✨ Upgraded the studio setup with 3 intentional changes that eliminated visual distraction.\n\nWhich piece would you add to your desk? Comment DESK below and I will DM you the full parts list!\n\nSave this for your weekend setup inspiration. 📌',
            badge: 'DM Automation Compatible'
          },
          {
            title: 'Hashtag Matrix (Small, Mid, Large Reach)',
            content:
              '#desksetup #minimalistworkspace #homeofficeideas #aestheticdesk #productivitystation #techaccessories #workspaceinspo',
            badge: 'Shadowban-Safe Tag Group'
          }
        ],
        metrics: [
          { label: 'Save-to-Like Ratio Forecast', value: '38% (High Bookmark)' },
          { label: 'Brand Voice Match', value: 'Minimal / Premium' },
          { label: 'Format Verdict', value: 'Reel > Carousel (+42% Reach)' }
        ]
      },
      caption: {
        headline: 'Instagram Bio Optimization & Storytelling Captions',
        sections: [
          {
            title: 'High-Converting Bio Audit & Re-write',
            content:
              'Headline: Helping Creators Build Dream Setups ✨\nValue: Desk Ergonomics & Minimal Aesthetics\nProof: Featured in TechSpaces & DesignDaily\nCTA: 👇 Grab My Free Workspace Checklist\nLink: zunme.ai/desk-guide',
            badge: 'Profile SEO Score: 98/100'
          },
          {
            title: 'Micro-Story Engagement Caption',
            content:
              'It took me 3 years to realize that mess isn\'t just physical — it\'s mental friction. When I cleared my desk of 8 cables and 4 gadgets, my deep work hours doubled. Swipe left to see the before & after transformation.',
            badge: 'High Storytelling Hook'
          }
        ],
        metrics: [
          { label: 'Profile Visit Rate', value: '+28%' },
          { label: 'Caption Readability', value: 'Grade 6 (Effortless)' },
          { label: 'Save Rate Potential', value: 'Top 5% Niche' }
        ]
      },
      dm: {
        headline: 'Instagram DM Automation & Keyword Triggers',
        sections: [
          {
            title: 'Comment-to-DM Trigger Rule',
            content:
              'Trigger Word: "DESK" or "SETUP"\nAuto-Reply in Comments: "Check your DMs! Just sent you the complete gear breakdown ✨"\nAutomated Instant DM: "Hey [Name]! Thanks for showing love on the setup reel! Here is the direct link to the desk mat, keyboard, and cable tray with an exclusive creator discount: [zunme.link/desk-list]"',
            badge: 'Instant DM Conversion'
          },
          {
            title: 'Outreach & Collaboration Pitch Template',
            content:
              '"Hey [Brand] team! Love your minimal lighting designs. I run a 45K creator community focused on workspace aesthetics and would love to feature your desk bar in an upcoming setup overhaul."',
            badge: 'Brand Partnership Ready'
          }
        ],
        metrics: [
          { label: 'DM Open Rate', value: '92%' },
          { label: 'Click-Through Rate', value: '44%' },
          { label: 'Automation Delay', value: '<2 Seconds' }
        ]
      }
    }
  },

  linkedin: {
    defaultTopic: 'The shift from headcount growth to AI leverage in B2B',
    defaultNiche: 'Tech & SaaS',
    defaultTone: 'Executive / Professional',
    defaultAudience: 'Founders, VPs & Enterprise Leaders',
    modes: [
      { id: 'primary', label: 'Executive Thought-Leadership Post' },
      { id: 'profile', label: 'Profile Optimizer & Bullets' },
      { id: 'outreach', label: 'Personalized InMail & Connection' }
    ],
    presets: {
      primary: {
        headline: 'LinkedIn Executive Thought-Leadership & Viral Post Structure',
        sections: [
          {
            title: 'Viral B2B Text Post with Hook & Spacing',
            content:
              'In 2024, founders bragged about headcount.\nIn 2026, founders brag about margin per employee.\n\nHere are 3 fundamental shifts happening in enterprise operations right now:\n\n1. AI is not replacing teams; it is replacing manual copy-pasting.\n2. One operator with intelligent agent tools outperforms a 5-person siloed department.\n3. Speed to response is now the primary determinant of B2B deal velocity.\n\nThe winners are not those who hire the most, but those who automate the fastest.\n\nAgree or disagree? Let’s discuss in the comments.',
            badge: 'High Engagement Algorithm Structure'
          },
          {
            title: 'Discussion-Starter First Comment',
            content:
              'Curious to hear from other operators: What is the single workflow you automated that gave you the largest ROI this quarter?',
            badge: 'Comment Multiplier'
          }
        ],
        metrics: [
          { label: 'Reading Time', value: '45 Seconds' },
          { label: 'Algorithm Sentiment', value: 'Professional Discussion Driver' },
          { label: 'Executive Reach', value: 'VPs & Founders' }
        ]
      },
      profile: {
        headline: 'LinkedIn Executive Profile Optimizer & Experience Bullets',
        sections: [
          {
            title: 'Optimized Headline & Results-Driven Bullets',
            content:
              'Headline: Head of Operations | Helping B2B Companies Automate 40% of Workflows Using AI Agents | Scaled 3 Companies to $10M+ ARR\n\nExperience Bullets:\n• Led 14-person cross-functional team, reducing customer onboarding cycle time from 18 days to 4.2 days.\n• Built AI-powered ticket triage system processing 25,000+ client queries monthly with 98.4% CSAT.\n• Directed $2.4M operational budget, yielding 38% reduction in external agency contractor overhead.',
            badge: 'Executive Brand Profile'
          },
          {
            title: 'About Section (Hook + Story + Proof + CTA)',
            content:
              'Over the past 8 years, I\'ve built operations that don\'t break when scaling. I bridge the gap between high-level executive strategy and day-to-day workflow execution.',
            badge: 'Recruiter Search Ready'
          }
        ],
        metrics: [
          { label: 'Profile SEO Score', value: '96/100' },
          { label: 'Search Appearance Lift', value: '+310%' },
          { label: 'Connection Acceptance', value: 'High' }
        ]
      },
      outreach: {
        headline: 'Personalized InMail & Connection Request Templates',
        sections: [
          {
            title: 'Connection Note (<300 Characters)',
            content:
              '"Hi [First Name], loved your perspective on AI agent implementation in B2B SaaS. We\'re solving similar integration challenges at Zunme — would love to connect and follow your insights."',
            badge: 'Zero Sales Pitch Penalty'
          },
          {
            title: 'Value-First Follow-Up InMail',
            content:
              '"Hi [First Name], following up on our connection! Put together a 2-page benchmark on how SaaS companies cut ticket churn by 40% with automated triage. Thought it might resonate with your team at [Company]. No pitch, just wanted to share: [Link]"',
            badge: '82% Acceptance Rate Template'
          }
        ],
        metrics: [
          { label: 'Acceptance Rate', value: '82%' },
          { label: 'Reply Rate', value: '41%' },
          { label: 'Spam Penalty Risk', value: '0%' }
        ]
      }
    }
  },

  amazon: {
    defaultTopic: 'Ergonomic Memory Foam Lumbar Support Cushion',
    defaultNiche: 'Health & Fitness',
    defaultTone: 'Direct Sales & Urgency',
    defaultAudience: 'Remote Desk Workers & Commuters',
    modes: [
      { id: 'primary', label: 'A9 Title & 5 Key Bullet Points' },
      { id: 'backend', label: 'Backend Search Terms (249 Bytes)' },
      { id: 'abtest', label: 'A/B Conversion Angle Testing' }
    ],
    presets: {
      primary: {
        headline: 'Amazon A9 Algorithm Listing Optimizer & 5 Bullet Points',
        sections: [
          {
            title: 'A9 High-Search-Volume Product Title (<200 Chars)',
            content:
              'Ergonomic Lumbar Support Pillow for Office Chair - High-Density Memory Foam Back Cushion with Breathable 3D Mesh Cover, Dual Adjustable Straps for Car, Computer Desk & Gaming Chair (Black)',
            badge: 'Under 200 Chars • Zero Keyword Stuffing Penalty'
          },
          {
            title: 'The 5 Key Benefit Bullet Points',
            content:
              '• ALL-DAY LOWER BACK RELIEF: Contoured orthopedic curve aligns your spine naturally, relieving pressure during 8+ hours of desk work or driving.\n• 100% PURE MEMORY FOAM: Premium slow-rebound foam maintains structural integrity without flattening or bottoming out over time.\n• DUAL NON-SLIP ADJUSTABLE STRAPS: Fastens securely to any computer chair, car seat, or recliner without slipping or sliding downward.\n• BREATHABLE & WASHABLE 3D MESH: Removable zipper cover promotes continuous air circulation, keeping your back cool and sweat-free all day.\n• LIFETIME WARRANTY & CUSTOMER PROMISE: Tested and certified safe; hassle-free refund or replacement if you are not 100% satisfied.',
            badge: 'A9 Search Conversion Optimized'
          }
        ],
        metrics: [
          { label: 'A9 Index Score', value: '98/100' },
          { label: 'Bullet Readability', value: 'Grade 7 (Fast Purchase Scan)' },
          { label: 'Keyword Density', value: '2.4% (Optimal)' }
        ]
      },
      backend: {
        headline: 'Amazon Backend Search Terms (No Commas, Space Separated)',
        sections: [
          {
            title: 'Backend Search Terms (Strict 249 Byte Rule)',
            content:
              'chair back support sciatica relief posture corrector cushion auto seat pad orthopedic desk seat wedge fba approved washable breathable spine posture gaming office computer chair',
            badge: '247 / 249 Bytes Used (100% Compliant)'
          },
          {
            title: 'Excluded Stop-Words & Repetition Audit',
            content:
              'Zero brand names, zero punctuation, zero plural duplicate words. Max byte efficiency guaranteed according to Amazon seller policies.',
            badge: 'Policy Verified'
          }
        ],
        metrics: [
          { label: 'Byte Count', value: '247 Bytes' },
          { label: 'Search Index Reach', value: 'Maximized' },
          { label: 'Policy Infraction Risk', value: 'Zero' }
        ]
      },
      abtest: {
        headline: 'Amazon Main Image Cues & Conversion Angle Variants',
        sections: [
          {
            title: 'Variant A: Clinical Pain Relief Angle',
            content:
              'Main Title Emphasis: Focus on "Sciatica Relief & Orthopedic Spine Alignment".\nImage Cue: Show diagram of lumbar curve taking pressure off spine with blue stress relief highlights.',
            badge: 'High Conversion Angle'
          },
          {
            title: 'Variant B: All-Day Comfort & Premium Lifestyle',
            content:
              'Main Title Emphasis: Focus on "All-Day Work Comfort & Memory Foam Luxury".\nImage Cue: High-end executive in sleek modern office sitting comfortably.',
            badge: 'Premium Lifestyle Angle'
          }
        ],
        metrics: [
          { label: 'Projected CTR Lift', value: '+18.4%' },
          { label: 'Recommended Test Duration', value: '14 Days' },
          { label: 'Target ACOS', value: '<22%' }
        ]
      }
    }
  },

  facebook: {
    defaultTopic: 'Local boutique fitness studio spring promotion',
    defaultNiche: 'Health & Fitness',
    defaultTone: 'High Energy & Viral',
    defaultAudience: 'Local Community Members & Fitness Enthusiasts',
    modes: [
      { id: 'primary', label: 'Community Post & Contest Hook' },
      { id: 'faq', label: 'Automated FAQ & Messenger Reply' },
      { id: 'ads', label: 'Meta Ads Manager Copy Variant' }
    ],
    presets: {
      primary: {
        headline: 'Facebook Community Post, Interactive Poll & Auto-Replies',
        sections: [
          {
            title: 'Interactive Community Post & Contest Hook',
            content:
              'Spring is here, and our community is leveling up! 🌸💪\n\nWe are giving away 3 full 1-Month Unlimited Class Passes to celebrate our new morning mobility sessions!\n\nHow to enter:\n1. Tell us your #1 fitness goal for this season in the comments below.\n2. Tag a workout buddy you want to bring along.\n\nWinners announced this Friday at 5 PM! Tap below to claim your first free trial pass.',
            badge: 'High Comment Engagement'
          },
          {
            title: 'Interactive Poll Options',
            content:
              'Poll Question: "What time do you prefer to get your workout in?"\nOption A: 6:00 AM (Early Bird)\nOption B: 12:00 PM (Lunch Break)\nOption C: 6:00 PM (After Work Crew)',
            badge: 'Community Interaction Driver'
          }
        ],
        metrics: [
          { label: 'Community Engagement Forecast', value: '+340% Shares' },
          { label: 'Lead Cost Estimate', value: '$1.40 - $2.20 per Lead' },
          { label: 'Tone', value: 'Welcoming & Local' }
        ]
      },
      faq: {
        headline: 'Automated FAQ & Messenger Reply Drafter',
        sections: [
          {
            title: 'Instant Messenger FAQ Replies',
            content:
              'FAQ Question: "What are your class timings and prices?"\n\nAuto-Response: "Hi [First Name]! Our classes run Monday through Saturday from 6:00 AM to 7:30 PM. Single drop-ins are $18, or you can grab our unlimited intro month for just $49! Would you like me to reserve your spot for tomorrow’s 8 AM session?"',
            badge: 'Instant Conversion Trigger'
          },
          {
            title: 'Beginner Objection Responder',
            content:
              'FAQ: "I haven\'t worked out in 2 years, will this be too hard for me?"\n\nAuto-Response: "Not at all! 70% of our members started right where you are. Our trainers provide customized modifications for every single movement. You\'ll feel supported from day 1!"',
            badge: 'Objection Buster'
          }
        ],
        metrics: [
          { label: 'Messenger Response Time', value: '<5s' },
          { label: 'Lead Capture Rate', value: '52%' },
          { label: 'Community Sentiment', value: '98% Positive' }
        ]
      },
      ads: {
        headline: 'Meta Ads Manager Feed & Story Copy Variant',
        sections: [
          {
            title: 'Targeted Demographics & Ad Copy Variant',
            content:
              'Headline: Feel Stronger in 30 Days | Try Your First Session Free\nPrimary Text: Tired of feeling sluggish at your desk? Our guided 45-minute strength classes are designed for busy locals who want results without living in the gym.\nAudience: Women & Men 25-54 within 8 miles of downtown\nCTA: Book Free Session',
            badge: 'Meta Ads Manager Ready'
          }
        ],
        metrics: [
          { label: 'Target ROAS', value: '3.6x' },
          { label: 'Estimated CPM', value: '$11.50' },
          { label: 'Relevance Score', value: '9/10' }
        ]
      }
    }
  },

  x: {
    defaultTopic: 'Why traditional web design agencies are evolving into AI integrators',
    defaultNiche: 'Tech & Business',
    defaultTone: 'Analytical & Data-Driven',
    defaultAudience: 'Tech Founders, Developers & Agency Owners',
    modes: [
      { id: 'primary', label: '5-Tweet Viral Thread' },
      { id: 'replies', label: 'Instant FAQ & Quote Reply' },
      { id: 'sentiment', label: 'Real-Time Sentiment Breakdown' }
    ],
    presets: {
      primary: {
        headline: 'X (Twitter) 5-Tweet Viral Thread & Instant Reply Engine',
        sections: [
          {
            title: '5-Tweet Viral Thread',
            content:
              '1/5: The traditional web design agency is dead.\n\nIf you are still charging $10,000 for static WordPress themes in 2026, you will be out of business by December.\n\nHere is how modern studios are pivoting to 6-figure AI integration contracts 🧵👇\n\n2/5: Clients don’t want websites anymore. They want lead engines with built-in AI agents that answer customer questions 24/7.\n\n3/5: We stopped selling "pages". We started selling "automated pipelines" (chat groundings, CRM syncs, personalized ad generators).\n\n4/5: The result? Our average client retention jumped from 3 months to 14 months, with 40% less manual coding.\n\n5/5: If you run an agency, upgrade your stack today. What is the #1 tool in your modern workflow? RT the first tweet if you found this valuable.',
            badge: 'Thread Engagement Multiplier'
          }
        ],
        metrics: [
          { label: 'Thread Pacing', value: '5 Tweets (Under 280 chars each)' },
          { label: 'Retweet Propensity', value: 'Very High' },
          { label: 'Virality Score', value: '92/100' }
        ]
      },
      replies: {
        headline: 'High-Authority Quote Tweet & Reply Drafter',
        sections: [
          {
            title: 'Contrarian Quote Tweet Variant',
            content:
              '"Static code was 2020. Dynamic self-healing workflows are 2026. The real moat isn\'t syntax anymore — it\'s domain integration and speed to value."',
            badge: 'Authority Position'
          },
          {
            title: 'Instant FAQ Response Drafter',
            content:
              'Response to common objection: "Great point @user! The distinction is that AI doesn’t replace creative strategy — it removes repetitive boilerplate code so you can focus on custom client architectures."',
            badge: 'Brand Authority Builder'
          }
        ],
        metrics: [
          { label: 'Reply Velocity', value: '<30s' },
          { label: 'Follower Capture', value: 'High' },
          { label: 'Bookmark Ratio', value: '4.8%' }
        ]
      },
      sentiment: {
        headline: 'Real-Time Sentiment & Trend Narrative',
        sections: [
          {
            title: 'Current Conversation Sentiment Matrix',
            content:
              'Overall Niche Sentiment: 78% Bullish on AI workflows, 22% Concerned with client onboarding complexity.\n\nKey Rising Narratives: Solopreneur leverage, micro-agencies, API cost reduction.',
            badge: 'Real-Time Grounding'
          }
        ],
        metrics: [
          { label: 'Sentiment Index', value: '+68 Net Positive' },
          { label: 'Trending Hashtags', value: '#BuildInPublic #AIWorkflows' },
          { label: 'Audience Mood', value: 'Action-Oriented' }
        ]
      }
    }
  },

  google: {
    defaultTopic: 'Comparison of Server-Sent Events vs WebSockets for AI SaaS',
    defaultNiche: 'Tech & SaaS',
    defaultTone: 'Analytical & Data-Driven',
    defaultAudience: 'Software Engineers, Architects & Researchers',
    modes: [
      { id: 'primary', label: 'Structured Research Synthesis' },
      { id: 'matrix', label: 'Pros & Cons Argument Matrix' },
      { id: 'serp', label: 'Google SERP Snippet Formulation' }
    ],
    presets: {
      primary: {
        headline: 'Google Conversational Search & Research Synthesis Assistant',
        sections: [
          {
            title: 'Structured Research Synthesis',
            content:
              'Core Finding: For streaming AI generative token responses, Server-Sent Events (SSE) offer simpler HTTP-native infrastructure, automatic reconnection, and bypass corporate firewall WebSocket restrictions. WebSockets remain superior only when true bi-directional duplex communication is required (such as real-time gaming or collaborative canvas multi-cursor sync).',
            badge: 'Fact-Checked & Verified'
          },
          {
            title: 'Primary Citations & Source Evidence',
            content:
              '• RFC 6455 (The WebSocket Protocol)\n• W3C Server-Sent Events Candidate Recommendation\n• High Performance Browser Networking (Ilya Grigorik)',
            badge: '100% Anti-Hallucination'
          }
        ],
        metrics: [
          { label: 'Information Density', value: 'High (No Fluff)' },
          { label: 'Factual Grounding', value: '100% Citation Backed' },
          { label: 'SERP Rank Potential', value: 'Top 3 Organic' }
        ]
      },
      matrix: {
        headline: 'Pros & Cons Argument Matrix: SSE vs WebSockets',
        sections: [
          {
            title: 'Pros & Cons Argument Matrix',
            content:
              'ARGUMENT FOR SSE (Server-Sent Events):\n• Runs over standard HTTP/1.1 and HTTP/2.\n• Built-in browser reconnection handling via EventSource API.\n• Lower server resource overhead for single-direction text streams.\n\nARGUMENT FOR WEBSOCKETS:\n• Bi-directional low latency communication.\n• Binary protocol support for raw audio/video frames.\n• Required for multi-user shared workspace coordination.',
            badge: 'Logical Flow & Counter-Points'
          }
        ],
        metrics: [
          { label: 'Objectivity Score', value: '99/100' },
          { label: 'Technical Depth', value: 'Architectural' },
          { label: 'Bias Level', value: 'Zero' }
        ]
      },
      serp: {
        headline: 'Google SERP Snippet Formulation & Metadata',
        sections: [
          {
            title: 'Google SERP Snippet Formulation',
            content:
              'Title: SSE vs WebSockets in 2026: When to Use Which Architecture\nMeta: Discover why Server-Sent Events are ideal for AI streaming while WebSockets excel in bi-directional collaborative tools. Full benchmark guide.',
            badge: 'Google SERP Feature Snippet Ready'
          }
        ],
        metrics: [
          { label: 'Snippet CTR Lift', value: '+34%' },
          { label: 'Character Count', value: '148 / 160 (Optimal)' },
          { label: 'Keyword Intent', value: 'Informational High-Value' }
        ]
      }
    }
  }
};

export const MVPPlatformsWorkspacePage: React.FC = () => {
  const { saveToLibrary, showToast } = useApp();
  const navigate = useNavigate();
  const { platform: urlPlatform } = useParams<{ platform?: string }>();

  // Determine initial platform
  const validPlatform = (urlPlatform && urlPlatform in PLATFORM_CONFIGS ? urlPlatform : 'youtube') as MVPPlatformKey;
  const [activePlatform, setActivePlatform] = useState<MVPPlatformKey>(validPlatform);

  const initialConfig = PLATFORM_CONFIGS[validPlatform];
  const [topic, setTopic] = useState(initialConfig.defaultTopic);
  const [niche, setNiche] = useState(initialConfig.defaultNiche);
  const [tone, setTone] = useState(initialConfig.defaultTone);
  const [targetAudience, setTargetAudience] = useState(initialConfig.defaultAudience);
  const [toolMode, setToolMode] = useState<string>(initialConfig.modes[0].id);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const [generatedResult, setGeneratedResult] = useState<GeneratedOutput>(
    initialConfig.presets[initialConfig.modes[0].id] || initialConfig.presets.primary
  );

  // Sync with URL parameter
  useEffect(() => {
    if (urlPlatform && urlPlatform in PLATFORM_CONFIGS && urlPlatform !== activePlatform) {
      switchPlatform(urlPlatform as MVPPlatformKey, false);
    }
  }, [urlPlatform]);

  const switchPlatform = (id: MVPPlatformKey, shouldNavigate = true) => {
    setActivePlatform(id);
    const cfg = PLATFORM_CONFIGS[id];
    setTopic(cfg.defaultTopic);
    setNiche(cfg.defaultNiche);
    setTone(cfg.defaultTone);
    setTargetAudience(cfg.defaultAudience);
    const firstMode = cfg.modes[0].id;
    setToolMode(firstMode);
    setGeneratedResult(cfg.presets[firstMode] || cfg.presets.primary);
    setCopied(false);
    setSaved(false);

    if (shouldNavigate) {
      navigate(`/user/mvp/${id}`);
    }
    const targetMeta = MVP_PLATFORMS.find((p) => p.id === id);
    if (targetMeta) {
      showToast(`Switched to ${targetMeta.name} AI Accelerator!`, 'info');
    }
  };

  const currentPlatform = MVP_PLATFORMS.find((p) => p.id === activePlatform)!;
  const currentConfig = PLATFORM_CONFIGS[activePlatform];

  const handleSelectPlatform = (id: MVPPlatformKey) => {
    switchPlatform(id, true);
  };

  const handleSelectMode = (modeId: string) => {
    setToolMode(modeId);
    if (currentConfig.presets[modeId]) {
      setGeneratedResult(currentConfig.presets[modeId]);
    }
    setCopied(false);
    setSaved(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setCopied(false);
    setSaved(false);

    setTimeout(() => {
      setIsGenerating(false);

      const basePreset = currentConfig.presets[toolMode] || currentConfig.presets.primary;
      const customHeadline = topic.trim() ? topic : basePreset.headline;

      setGeneratedResult({
        ...basePreset,
        headline: customHeadline
      });

      showToast(`Generated custom ${currentPlatform.name} assets using Zunme AI!`, 'success');
    }, 600);
  };

  const handleCopy = () => {
    const fullText =
      `${generatedResult.headline}\n\n` +
      generatedResult.sections.map((s) => `### ${s.title}\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('Copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToLibrary = () => {
    saveToLibrary({
      title: `${currentPlatform.name}: ${generatedResult.headline.slice(0, 45)}...`,
      contentType: 'MARKETING',
      content: generatedResult.sections.map((s) => `${s.title}:\n${s.content}`).join('\n\n'),
      previewText: generatedResult.headline,
      tags: [currentPlatform.name.toLowerCase(), 'mvp-suite', niche.toLowerCase()]
    });
    setSaved(true);
    showToast('Saved to My Library successfully!', 'success');
  };

  const handleSendToZBox = () => {
    navigate('/zbox?compose=true');
    showToast(`Transferred ${currentPlatform.name} asset to zBox for cross-platform syndication!`, 'info');
  };

  return (
    <div className="mvp-workspace-container">
      {/* Top Banner Header */}
      <header className="mvp-header">
        <div className="mvp-header-brand">
          <div className="mvp-badge">
            <Sparkles size={14} />
            <span>Zunme MVP Suite — Most Visited Platforms</span>
          </div>
          <h1 className="mvp-title">Make Zunme Your Platform's Best Friend</h1>
          <p className="mvp-subtitle">
            Dedicated AI accelerators for the 8 Most Visited Platforms online. Create viral hooks, retention scripts, A9 listings, and executive posts without tab-hopping.
          </p>
        </div>

        <div className="mvp-header-actions">
          <button className="mvp-btn-secondary" onClick={() => navigate('/zbox')}>
            <Share2 size={16} />
            <span>Syndicate via zBox</span>
          </button>
          <button className="mvp-btn-primary" onClick={() => navigate('/ads/formats')}>
            <Sliders size={16} />
            <span>Ad Format Simulators</span>
          </button>
        </div>
      </header>

      {/* Platform Selector Tabs Bar (Horizontally scrollable on mobile) */}
      <div className="mvp-platforms-nav" role="tablist" aria-label="MVP Platforms">
        {MVP_PLATFORMS.map((platform) => {
          const isActive = platform.id === activePlatform;
          return (
            <button
              key={platform.id}
              type="button"
              role="tab"
              id={`tab-${platform.id}`}
              data-platform={platform.id}
              aria-selected={isActive}
              className={`mvp-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                borderColor: isActive ? platform.color : 'transparent',
                backgroundColor: isActive ? platform.bgColor : 'transparent',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleSelectPlatform(platform.id);
              }}
            >
              <span className="mvp-tab-icon" style={{ color: platform.color }}>
                {platform.icon}
              </span>
              <div className="mvp-tab-text">
                <span className="mvp-tab-name">{platform.name}</span>
                <span className="mvp-tab-badge">{platform.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="mvp-content-grid">
        {/* Left Column: Parameter Form & Custom Controls */}
        <section className="mvp-form-card">
          <div className="mvp-card-header" style={{ borderLeftColor: currentPlatform.color }}>
            <div>
              <span className="mvp-platform-tag" style={{ color: currentPlatform.color, backgroundColor: currentPlatform.bgColor }}>
                {currentPlatform.name} AI Assistant
              </span>
              <h2 className="mvp-card-title">{currentPlatform.tagline}</h2>
            </div>
          </div>

          <div className="mvp-form-body">
            {/* Topic Input */}
            <div className="mvp-input-group">
              <label htmlFor="topic-input" className="mvp-label">
                Topic, Product Name or Main Theme:
              </label>
              <textarea
                id="topic-input"
                rows={3}
                className="mvp-textarea"
                placeholder={`Enter your ${currentPlatform.name} theme, product, or campaign objective...`}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Niche & Tone Controls */}
            <div className="mvp-input-row">
              <div className="mvp-input-group">
                <label className="mvp-label">Niche / Category:</label>
                <select
                  className="mvp-select"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="Tech & Business">Tech & SaaS</option>
                  <option value="E-Commerce">E-Commerce & Retail</option>
                  <option value="Finance & Investing">Finance & Real Estate</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Creator & Lifestyle">Creator & Lifestyle</option>
                  <option value="Local Services">Local Services</option>
                </select>
              </div>

              <div className="mvp-input-group">
                <label className="mvp-label">Tone & Pacing:</label>
                <select
                  className="mvp-select"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="High Energy">High Energy & Viral</option>
                  <option value="Executive / Professional">Executive / Professional</option>
                  <option value="Storytelling">Storytelling & Emotional</option>
                  <option value="Direct Sales & Urgency">Direct Sales & Urgency</option>
                  <option value="Analytical & Data-Driven">Analytical & Data-Driven</option>
                </select>
              </div>
            </div>

            <div className="mvp-input-group">
              <label className="mvp-label">Target Audience Persona:</label>
              <input
                type="text"
                className="mvp-input"
                placeholder="e.g., Busy founders, Gen-Z gamers, Homeowners"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            {/* Dynamic Platform Feature Selector Pills */}
            <div className="mvp-subtool-selector">
              <span className="mvp-subtool-label">Mode & Objective:</span>
              <div className="mvp-subtool-pills">
                {currentConfig.modes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    className={`mvp-subtool-pill ${toolMode === mode.id ? 'active' : ''}`}
                    onClick={() => handleSelectMode(mode.id)}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              className="mvp-generate-btn"
              style={{ background: `linear-gradient(135deg, ${currentPlatform.color} 0%, #4338CA 100%)` }}
              disabled={isGenerating}
              onClick={handleGenerate}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="spin" size={18} />
                  <span>Synthesizing {currentPlatform.name} Output...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Generate with Zunme AI</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Right Column: Live Output & Action Controls */}
        <section className="mvp-output-card">
          <div className="mvp-output-header">
            <div className="mvp-output-status">
              <span className="mvp-status-dot" style={{ backgroundColor: currentPlatform.color }} />
              <span className="mvp-status-text">{currentPlatform.name} Output Ready</span>
            </div>

            <div className="mvp-output-toolbar">
              <button
                type="button"
                className="mvp-tool-btn"
                title="Copy all generated text to clipboard"
                onClick={handleCopy}
              >
                {copied ? <Check size={15} color="#10B981" /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                className="mvp-tool-btn"
                title="Save generated output to My Library"
                onClick={handleSaveToLibrary}
              >
                {saved ? <Check size={15} color="#10B981" /> : <Bookmark size={15} />}
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                className="mvp-tool-btn mvp-tool-btn-primary"
                title="Syndicate directly into zBox Email & Cross-Platform Publisher"
                onClick={handleSendToZBox}
              >
                <Share2 size={15} />
                <span>zBox Share</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          {generatedResult.metrics && generatedResult.metrics.length > 0 && (
            <div className="mvp-metrics-row">
              {generatedResult.metrics.map((m, idx) => (
                <div key={idx} className="mvp-metric-chip">
                  <span className="mvp-metric-label">{m.label}:</span>
                  <strong className="mvp-metric-val">{m.value}</strong>
                </div>
              ))}
            </div>
          )}

          {/* Generated Result Container */}
          <div className="mvp-output-content">
            <h3 className="mvp-result-headline">{generatedResult.headline}</h3>

            <div className="mvp-sections-list">
              {generatedResult.sections.map((section, idx) => (
                <div key={idx} className="mvp-section-box">
                  <div className="mvp-sec-head">
                    <h4 className="mvp-sec-title">{section.title}</h4>
                    {section.badge && <span className="mvp-sec-badge">{section.badge}</span>}
                  </div>
                  <pre className="mvp-sec-pre">{section.content}</pre>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Algorithmic Guardrails Footer */}
          <div className="mvp-output-footer">
            <div className="mvp-footer-info">
              <ShieldCheck size={16} color="#10B981" />
              <span>Optimized against platform algorithmic spam filters and guidelines.</span>
            </div>
            <button
              type="button"
              className="mvp-jump-link"
              onClick={() => navigate('/social')}
            >
              <span>Schedule to Social Calendar</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
