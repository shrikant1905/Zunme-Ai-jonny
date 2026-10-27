export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  isStreaming?: boolean;
}

export interface SearchSource {
  id: string;
  title: string;
  url: string;
  snippet: string;
  domain: string;
  publishedDate?: string;
}

export interface SearchResult {
  query: string;
  summary: string;
  sources: SearchSource[];
  timestamp: string;
}

export type ContentCategory = 'TEXT' | 'MARKETING';

export type ContentFormat =
  | 'BLOG_OUTLINE'
  | 'EMAIL_NEWSLETTER'
  | 'SOCIAL_CAPTION'
  | 'PRODUCT_AD'
  | 'VIDEO_SCRIPT'
  | 'ARTICLE_SECTION';

export type ContentTone = 'Professional' | 'Conversational' | 'Persuasive' | 'Bold & Direct' | 'Creative';

export type ContentLength = 'Short (~150 words)' | 'Medium (~500 words)' | 'Detailed (~1,000 words)';

export interface GeneratedContent {
  id: string;
  title: string;
  category: ContentCategory;
  format: ContentFormat;
  tone: ContentTone;
  length: ContentLength;
  content: string;
  wordCount: number;
  createdAt: string;
}

export type LibraryCategory = 'ALL' | 'TEXT' | 'MARKETING' | 'RESEARCH';

export interface SavedLibraryItem {
  id: string;
  title: string;
  contentType: 'TEXT' | 'MARKETING' | 'RESEARCH';
  content: string;
  previewText: string;
  sourceMetadata?: SearchSource[];
  tags?: string[];
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
  conversationsCount: number;
  savedItemsCount: number;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  badge?: string;
  isCurrent?: boolean;
  activeSubscribers: number;
}

export interface WarehouseAsset {
  id: string;
  title: string;
  description: string;
  category: 'Prompts' | 'Templates' | 'Workflows' | 'Copy Packs' | 'Scripts' | 'Product Placement';
  creatorName: string;
  creatorAvatar?: string;
  isVerifiedCreator?: boolean;
  tags: string[];
  licensing: 'Standard Community' | 'Commercial Pro' | 'Open Source';
  downloads: number;
  likes: number;
  format: string;
  rating: number;
  createdAt: string;
  isSaved?: boolean;
}

export interface CreatorSubmission {
  id: string;
  title: string;
  type: string;
  category: string;
  status: 'APPROVED' | 'IN_REVIEW' | 'CHANGES_REQUESTED' | 'DRAFT';
  submittedAt: string;
  downloads: number;
  feedback?: string;
}

export interface SEOKeyword {
  id: string;
  keyword: string;
  searchVolume: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very Hard';
  difficultyScore: number;
  cpc: string;
  intent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  status: 'Identified' | 'Targeted' | 'In Content' | 'Ranking';
}

export interface BusinessProject {
  id: string;
  name: string;
  category: 'Marketing Campaign' | 'Product Launch' | 'Brand Rebrand' | 'SEO Revamp';
  status: 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED' | 'ON_HOLD';
  dueDate: string;
  progress: number;
  description: string;
  tasksCount: number;
}

export interface BrandProfileData {
  brandName: string;
  tagline: string;
  voiceTone: string;
  targetAudience: string;
  coreValues: string;
  missionStatement: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  platform: 'Blog' | 'LinkedIn' | 'Twitter / X' | 'Newsletter' | 'Instagram';
  date: string;
  status: 'Scheduled' | 'Draft' | 'Published';
  format: string;
}

export interface PlatformIntegration {
  id: string;
  name: string;
  category: 'Search API' | 'LLM Engine' | 'CRM' | 'Storage' | 'Analytics';
  status: 'CONNECTED' | 'DISCONNECTED' | 'MAINTENANCE';
  connectedAt?: string;
  latency?: string;
  description: string;
}

