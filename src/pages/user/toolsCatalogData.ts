// Generated from Zunme full.pdf Pages 23-56
import { ContentCategory, ContentFormat } from '../../types';

export interface ToolTemplate {
  id: string;
  name: string;
  category: ContentCategory;
  templateCategory: string;
  format: ContentFormat;
  icon: string;
  badge?: string;
  description: string;
  promptPlaceholder: string;
}

export interface CategoryCardDef {
  id: string;
  name: string;
  emoji: string;
  color: string;
  count: number;
}

export const CLIENT_TEMPLATE_CATEGORIES: CategoryCardDef[] = [
  { id: 'All', name: 'All Blueprints', emoji: '🌐', color: '#6E56CF', count: 356 },
  { id: 'Audio & Music', name: 'Audio & Music', emoji: '🎵', color: '#8B5CF6', count: 11 },
  { id: 'Branding', name: 'Branding', emoji: '🏷️', color: '#EC4899', count: 23 },
  { id: 'Business', name: 'Business', emoji: '💼', color: '#3B82F6', count: 32 },
  { id: 'Content Creation / Creative Writing', name: 'Content Creation / Creative Writing', emoji: '✍️', color: '#10B981', count: 58 },
  { id: 'Email, Messages & Texts', name: 'Email, Messages & Texts', emoji: '✉️', color: '#F59E0B', count: 25 },
  { id: 'Entertainment / Social Media', name: 'Entertainment / Social Media', emoji: '🎬', color: '#F43F5E', count: 14 },
  { id: 'Health & Wellness', name: 'Health & Wellness', emoji: '🌿', color: '#059669', count: 2 },
  { id: 'Human Resources [ HR ]', name: 'Human Resources [ HR ]', emoji: '👥', color: '#6366F1', count: 28 },
  { id: 'Images & Video', name: 'Images & Video', emoji: '🎥', color: '#A855F7', count: 29 },
  { id: 'By Industries', name: 'By Industries', emoji: '🏭', color: '#0EA5E9', count: 13 },
  { id: 'Marketing', name: 'Marketing', emoji: '🎯', color: '#EF4444', count: 2 },
  { id: 'Motivation & Inspirational', name: 'Motivation & Inspirational', emoji: '🔥', color: '#F97316', count: 39 },
  { id: 'Online Courses', name: 'Online Courses', emoji: '🎓', color: '#14B8A6', count: 18 },
  { id: 'Research & Development', name: 'Research & Development', emoji: '🔬', color: '#64748B', count: 17 },
  { id: 'SALES', name: 'SALES', emoji: '💰', color: '#10B981', count: 22 },
  { id: 'Social Media', name: 'Social Media', emoji: '📱', color: '#8B5CF6', count: 12 },
  { id: 'Testimonials & Reviews', name: 'Testimonials & Reviews', emoji: '⭐', color: '#EAB308', count: 4 },
  { id: 'Writing', name: 'Writing', emoji: '📝', color: '#4F46E5', count: 5 },
  { id: 'AI Everything', name: 'AI Everything', emoji: '🤖', color: '#6E56CF', count: 2 }
];

export const TEMPLATES_CATALOG: ToolTemplate[] = [
  {
    "id": "pdf_tpl_1",
    "name": "AI Sound Effects",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "ARTICLE_SECTION",
    "icon": "🎵",
    "description": "Generate sound effects with AI. Create unique sounds for any purpose.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Sound Effects..."
  },
  {
    "id": "pdf_tpl_2",
    "name": "Album Title Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "ARTICLE_SECTION",
    "icon": "🎵",
    "description": "Let AI Help Create the Perfect Album Title!",
    "promptPlaceholder": "Enter your specific context or instructions for Album Title Generator..."
  },
  {
    "id": "pdf_tpl_3",
    "name": "Author Bio Generator",
    "category": "MARKETING",
    "templateCategory": "Audio & Music",
    "format": "SOCIAL_CAPTION",
    "icon": "🎵",
    "description": "Create a professional biography for authors and writers.",
    "promptPlaceholder": "Enter your specific context or instructions for Author Bio Generator..."
  },
  {
    "id": "pdf_tpl_4",
    "name": "Band Name Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "ARTICLE_SECTION",
    "icon": "🎵",
    "description": "Generate unique and catchy band names for your music career.",
    "promptPlaceholder": "Enter your specific context or instructions for Band Name Generator..."
  },
  {
    "id": "pdf_tpl_5",
    "name": "Song Idea Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "ARTICLE_SECTION",
    "icon": "🎵",
    "description": "If you can't think of a song, we can help!",
    "promptPlaceholder": "Enter your specific context or instructions for Song Idea Generator..."
  },
  {
    "id": "pdf_tpl_6",
    "name": "Song Lyrics Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "VIDEO_SCRIPT",
    "icon": "🎵",
    "description": "Generate custom songs from an AI",
    "promptPlaceholder": "Enter your specific context or instructions for Song Lyrics Generator..."
  },
  {
    "id": "pdf_tpl_7",
    "name": "Diss Track Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "ARTICLE_SECTION",
    "icon": "🎵",
    "description": "Create witty and hard-hitting diss track lyrics with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Diss Track Generator..."
  },
  {
    "id": "pdf_tpl_8",
    "name": "Musician Bio Generator",
    "category": "MARKETING",
    "templateCategory": "Audio & Music",
    "format": "SOCIAL_CAPTION",
    "icon": "🎵",
    "description": "Create a professional biography for musicians and bands.",
    "promptPlaceholder": "Enter your specific context or instructions for Musician Bio Generator..."
  },
  {
    "id": "pdf_tpl_9",
    "name": "Rap Lyrics Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "VIDEO_SCRIPT",
    "icon": "🎵",
    "description": "Generate unique rhyming rap lyrics from an AI",
    "promptPlaceholder": "Enter your specific context or instructions for Rap Lyrics Generator..."
  },
  {
    "id": "pdf_tpl_10",
    "name": "Hook Generator",
    "category": "MARKETING",
    "templateCategory": "Audio & Music",
    "format": "SOCIAL_CAPTION",
    "icon": "🎵",
    "description": "Create an irresistible hook to grab your reader’s attention",
    "promptPlaceholder": "Enter your specific context or instructions for Hook Generator..."
  },
  {
    "id": "pdf_tpl_11",
    "name": "DJ Name Generator",
    "category": "TEXT",
    "templateCategory": "Audio & Music",
    "format": "ARTICLE_SECTION",
    "icon": "🎵",
    "description": "Generate unique and catchy DJ names for your music career.",
    "promptPlaceholder": "Enter your specific context or instructions for DJ Name Generator..."
  },
  {
    "id": "pdf_tpl_12",
    "name": "About Me Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "As a creative professional, your bio is one of the first things potential clients will see.",
    "promptPlaceholder": "Enter your specific context or instructions for About Me Generator..."
  },
  {
    "id": "pdf_tpl_13",
    "name": "About Us Page Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate an About Us page for your website",
    "promptPlaceholder": "Enter your specific context or instructions for About Us Page Generator..."
  },
  {
    "id": "pdf_tpl_14",
    "name": "Artist Statement Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Create a professional artist statement for exhibitions, portfolios, or grant applications.",
    "promptPlaceholder": "Enter your specific context or instructions for Artist Statement Generator..."
  },
  {
    "id": "pdf_tpl_15",
    "name": "Professional Bio Generator",
    "category": "MARKETING",
    "templateCategory": "Branding",
    "format": "SOCIAL_CAPTION",
    "icon": "🏷️",
    "description": "Generate a professional bio based on your personal and professional information.",
    "promptPlaceholder": "Enter your specific context or instructions for Professional Bio Generator..."
  },
  {
    "id": "pdf_tpl_16",
    "name": "AIDA Framework",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Attention, Interest, Desire, Action. Generate a sales copy!",
    "promptPlaceholder": "Enter your specific context or instructions for AIDA Framework..."
  },
  {
    "id": "pdf_tpl_17",
    "name": "Business Name Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate business names that are both creative and professional!",
    "promptPlaceholder": "Enter your specific context or instructions for Business Name Generator..."
  },
  {
    "id": "pdf_tpl_18",
    "name": "Call to Action Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate compelling CTAs in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Call to Action Generator..."
  },
  {
    "id": "pdf_tpl_19",
    "name": "Catchy Tagline",
    "category": "MARKETING",
    "templateCategory": "Branding",
    "format": "SOCIAL_CAPTION",
    "icon": "🏷️",
    "description": "Create catchy slogans and taglines for free!",
    "promptPlaceholder": "Enter your specific context or instructions for Catchy Tagline..."
  },
  {
    "id": "pdf_tpl_20",
    "name": "Company Bio Generator",
    "category": "MARKETING",
    "templateCategory": "Branding",
    "format": "SOCIAL_CAPTION",
    "icon": "🏷️",
    "description": "Generate a compelling company bio for your business",
    "promptPlaceholder": "Enter your specific context or instructions for Company Bio Generator..."
  },
  {
    "id": "pdf_tpl_21",
    "name": "Company Mission Statement Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate a compelling company bio for your business",
    "promptPlaceholder": "Enter your specific context or instructions for Company Mission Statement Generator..."
  },
  {
    "id": "pdf_tpl_22",
    "name": "Company Vision Statement Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate a compelling company bio for your business",
    "promptPlaceholder": "Enter your specific context or instructions for Company Vision Statement Generator..."
  },
  {
    "id": "pdf_tpl_23",
    "name": "Core Value Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate meaningful core values for your organization",
    "promptPlaceholder": "Enter your specific context or instructions for Core Value Generator..."
  },
  {
    "id": "pdf_tpl_24",
    "name": "Executive Summary Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate concise and effective executive summaries.",
    "promptPlaceholder": "Enter your specific context or instructions for Executive Summary Generator..."
  },
  {
    "id": "pdf_tpl_25",
    "name": "Idea Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate creative ideas for any topic or project",
    "promptPlaceholder": "Enter your specific context or instructions for Idea Generator..."
  },
  {
    "id": "pdf_tpl_26",
    "name": "Logo Creator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate amazing logo images and art with AI. Express ideas. Stand out.",
    "promptPlaceholder": "Enter your specific context or instructions for Logo Creator..."
  },
  {
    "id": "pdf_tpl_27",
    "name": "Mission Statement Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate a mission statement for your company that will inspire your team",
    "promptPlaceholder": "Enter your specific context or instructions for Mission Statement Generator..."
  },
  {
    "id": "pdf_tpl_28",
    "name": "Motto Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate a catchy and meaningful motto for your business or product!",
    "promptPlaceholder": "Enter your specific context or instructions for Motto Generator..."
  },
  {
    "id": "pdf_tpl_29",
    "name": "Personal Statement Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Creating Strong, Unique Personal Statements Effortlessly!",
    "promptPlaceholder": "Enter your specific context or instructions for Personal Statement Generator..."
  },
  {
    "id": "pdf_tpl_30",
    "name": "Rhyme Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Effortlessly generate rhymes for your poetry or songwriting.",
    "promptPlaceholder": "Enter your specific context or instructions for Rhyme Generator..."
  },
  {
    "id": "pdf_tpl_31",
    "name": "Ship Name Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Create unique and catchy ship names by combining names of couples or fictional characters.",
    "promptPlaceholder": "Enter your specific context or instructions for Ship Name Generator..."
  },
  {
    "id": "pdf_tpl_32",
    "name": "Slogan Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Create slogan for your business or product!",
    "promptPlaceholder": "Enter your specific context or instructions for Slogan Generator..."
  },
  {
    "id": "pdf_tpl_33",
    "name": "Team Name Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate creative and memorable team names for any purpose",
    "promptPlaceholder": "Enter your specific context or instructions for Team Name Generator..."
  },
  {
    "id": "pdf_tpl_34",
    "name": "Vision Statement Generator",
    "category": "TEXT",
    "templateCategory": "Branding",
    "format": "ARTICLE_SECTION",
    "icon": "🏷️",
    "description": "Generate a vision statement for your company or project that will inspire your team",
    "promptPlaceholder": "Enter your specific context or instructions for Vision Statement Generator..."
  },
  {
    "id": "pdf_tpl_35",
    "name": "Startup Ideas",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate your next startup idea",
    "promptPlaceholder": "Enter your specific context or instructions for Startup Ideas..."
  },
  {
    "id": "pdf_tpl_36",
    "name": "Acceptance Criteria Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Quickly and easily generate acceptance criteria for your next project",
    "promptPlaceholder": "Enter your specific context or instructions for Acceptance Criteria Generator..."
  },
  {
    "id": "pdf_tpl_37",
    "name": "Action Items Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate actionable items from meeting notes or discussions",
    "promptPlaceholder": "Enter your specific context or instructions for Action Items Generator..."
  },
  {
    "id": "pdf_tpl_38",
    "name": "AI Headshot Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "PRODUCT_AD",
    "icon": "💼",
    "description": "Generate professional headshots with AI. For LinkedIn, email signatures, and more.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Headshot Generator..."
  },
  {
    "id": "pdf_tpl_39",
    "name": "AI Text-to-Speech",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate audio from text using AI. Supports 30+ languages.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Text-to-Speech..."
  },
  {
    "id": "pdf_tpl_40",
    "name": "Bullet Points Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generates bullet points based on the provided text",
    "promptPlaceholder": "Enter your specific context or instructions for Bullet Points Generator..."
  },
  {
    "id": "pdf_tpl_41",
    "name": "Bullet Points to Paragraph Converter",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Convert your bullet points into a well-structured paragraph!",
    "promptPlaceholder": "Enter your specific context or instructions for Bullet Points to Paragraph Converter..."
  },
  {
    "id": "pdf_tpl_42",
    "name": "Business Description Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "VIDEO_SCRIPT",
    "icon": "💼",
    "description": "Create compelling and professional business descriptions for your company or product",
    "promptPlaceholder": "Enter your specific context or instructions for Business Description Generator..."
  },
  {
    "id": "pdf_tpl_43",
    "name": "Business Memo Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate a business memo based on the provided details",
    "promptPlaceholder": "Enter your specific context or instructions for Business Memo Generator..."
  },
  {
    "id": "pdf_tpl_44",
    "name": "Business Proposal Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "PRODUCT_AD",
    "icon": "💼",
    "description": "Generate a business proposal that will impress your clients",
    "promptPlaceholder": "Enter your specific context or instructions for Business Proposal Generator..."
  },
  {
    "id": "pdf_tpl_45",
    "name": "AI Documentation Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate comprehensive documentation with AI assistance",
    "promptPlaceholder": "Enter your specific context or instructions for AI Documentation Generator..."
  },
  {
    "id": "pdf_tpl_46",
    "name": "Cease and Desist Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "EMAIL_NEWSLETTER",
    "icon": "💼",
    "description": "Generate a formal cease and desist letter to stop unwanted actions or behaviors",
    "promptPlaceholder": "Enter your specific context or instructions for Cease and Desist Letter Generator..."
  },
  {
    "id": "pdf_tpl_47",
    "name": "Company Profile Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate a professional company profile",
    "promptPlaceholder": "Enter your specific context or instructions for Company Profile Generator..."
  },
  {
    "id": "pdf_tpl_48",
    "name": "Demand Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "EMAIL_NEWSLETTER",
    "icon": "💼",
    "description": "Create a professional and effective demand letter to resolve disputes",
    "promptPlaceholder": "Enter your specific context or instructions for Demand Letter Generator..."
  },
  {
    "id": "pdf_tpl_49",
    "name": "Google Sheets & Excel Formula Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Write Google Sheets & Excel formulas within seconds with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Google Sheets & Excel Formula Generator..."
  },
  {
    "id": "pdf_tpl_50",
    "name": "Grant Proposal Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "PRODUCT_AD",
    "icon": "💼",
    "description": "Generate a compelling grant proposal for your project",
    "promptPlaceholder": "Enter your specific context or instructions for Grant Proposal Generator..."
  },
  {
    "id": "pdf_tpl_51",
    "name": "Legal Memo Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate professional legal memos and briefs with structured analysis.",
    "promptPlaceholder": "Enter your specific context or instructions for Legal Memo Generator..."
  },
  {
    "id": "pdf_tpl_52",
    "name": "Legalese Translator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Helps simplify and explain contract language for non-lawyers.",
    "promptPlaceholder": "Enter your specific context or instructions for Legalese Translator..."
  },
  {
    "id": "pdf_tpl_53",
    "name": "Letter of Request Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "EMAIL_NEWSLETTER",
    "icon": "💼",
    "description": "Generate a formal letter of request for any situation",
    "promptPlaceholder": "Enter your specific context or instructions for Letter of Request Generator..."
  },
  {
    "id": "pdf_tpl_54",
    "name": "LinkedIn Bio Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "SOCIAL_CAPTION",
    "icon": "💼",
    "description": "With just a few clicks, you can create a custom bio that will help you stand out from the crowd",
    "promptPlaceholder": "Enter your specific context or instructions for LinkedIn Bio Generator..."
  },
  {
    "id": "pdf_tpl_55",
    "name": "LinkedIn Carousel Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Turn any idea into a scroll-stopping LinkedIn carousel — designed slides plus a ready-to-post caption.",
    "promptPlaceholder": "Enter your specific context or instructions for LinkedIn Carousel Generator..."
  },
  {
    "id": "pdf_tpl_56",
    "name": "LinkedIn Connection Request Message Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "EMAIL_NEWSLETTER",
    "icon": "💼",
    "description": "Craft a personalized connection request on LinkedIn to expand your professional network",
    "promptPlaceholder": "Enter your specific context or instructions for LinkedIn Connection Request Message Generator..."
  },
  {
    "id": "pdf_tpl_57",
    "name": "Create the Perfect Professional Headline for Your Profile",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "SOCIAL_CAPTION",
    "icon": "💼",
    "description": "LinkedIn Post Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Create the Perfect Professional Headline for Your Profile..."
  },
  {
    "id": "pdf_tpl_58",
    "name": "Get more out of LinkedIn with the LinkedIn Post Generator!",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "BLOG_OUTLINE",
    "icon": "💼",
    "description": "LinkedIn Recommendation Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Get more out of LinkedIn with the LinkedIn Post Generator!..."
  },
  {
    "id": "pdf_tpl_59",
    "name": "Meeting Invite Generator",
    "category": "MARKETING",
    "templateCategory": "Business",
    "format": "EMAIL_NEWSLETTER",
    "icon": "💼",
    "description": "Generate a meeting invite that you can use in Google Meet, Zoom, or any other video conferencing tool",
    "promptPlaceholder": "Enter your specific context or instructions for Meeting Invite Generator..."
  },
  {
    "id": "pdf_tpl_60",
    "name": "Meeting Minutes Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Generate concise and organized meeting minutes from your notes",
    "promptPlaceholder": "Enter your specific context or instructions for Meeting Minutes Generator..."
  },
  {
    "id": "pdf_tpl_61",
    "name": "Zunme AI Agent",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "🤖",
    "description": "Your autonomous Zunme AI Agent helps you create content, answer questions, and complete tasks through natural workflows",
    "promptPlaceholder": "Enter your specific context or instructions for Zunme AI Agent..."
  },
  {
    "id": "pdf_tpl_62",
    "name": "conversation.",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Passion Project Generator",
    "promptPlaceholder": "Enter your specific context or instructions for conversation...."
  },
  {
    "id": "pdf_tpl_63",
    "name": "PDF Summarizer",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Summarize PDF documents with ease",
    "promptPlaceholder": "Enter your specific context or instructions for PDF Summarizer..."
  },
  {
    "id": "pdf_tpl_64",
    "name": "Project Timeline Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Effortlessly create accurate and efficient timelines that keep your team on the same page.",
    "promptPlaceholder": "Enter your specific context or instructions for Project Timeline Generator..."
  },
  {
    "id": "pdf_tpl_65",
    "name": "Real Estate Listing Description Generator",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "VIDEO_SCRIPT",
    "icon": "💼",
    "description": "Craft compelling real estate listings that promote fast home sales",
    "promptPlaceholder": "Enter your specific context or instructions for Real Estate Listing Description Generator..."
  },
  {
    "id": "pdf_tpl_66",
    "name": "Text Simplifier",
    "category": "TEXT",
    "templateCategory": "Business",
    "format": "ARTICLE_SECTION",
    "icon": "💼",
    "description": "Simplify your text for better understanding.",
    "promptPlaceholder": "Enter your specific context or instructions for Text Simplifier..."
  },
  {
    "id": "pdf_tpl_67",
    "name": "Acronym Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate an acronym for your company, project, event, or anything else",
    "promptPlaceholder": "Enter your specific context or instructions for Acronym Generator..."
  },
  {
    "id": "pdf_tpl_68",
    "name": "AI Scrambler",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Rewrites provided text to create an original and natural sounding version.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Scrambler..."
  },
  {
    "id": "pdf_tpl_69",
    "name": "AI Story Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Unlock the Magic of Automated Storytelling!",
    "promptPlaceholder": "Enter your specific context or instructions for AI Story Generator..."
  },
  {
    "id": "pdf_tpl_70",
    "name": "AI Text Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate creative and engaging text for any purpose with our AI-powered text generator",
    "promptPlaceholder": "Enter your specific context or instructions for AI Text Generator..."
  },
  {
    "id": "pdf_tpl_71",
    "name": "Ask AI Writer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate a text based on your writing request",
    "promptPlaceholder": "Enter your specific context or instructions for Ask AI Writer..."
  },
  {
    "id": "pdf_tpl_72",
    "name": "Before-After-Bridge Framework",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Before, After, Bridge. Generate marketing copy in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Before-After-Bridge Framework..."
  },
  {
    "id": "pdf_tpl_73",
    "name": "Blog Post Conclusion",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "End your blog post with a bang!",
    "promptPlaceholder": "Enter your specific context or instructions for Blog Post Conclusion..."
  },
  {
    "id": "pdf_tpl_74",
    "name": "Blog Post Intro",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Get your readers hooked from the very beginning",
    "promptPlaceholder": "Enter your specific context or instructions for Blog Post Intro..."
  },
  {
    "id": "pdf_tpl_75",
    "name": "Blog Post Outline",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Because writing a blog post is easy when you have a plan!",
    "promptPlaceholder": "Enter your specific context or instructions for Blog Post Outline..."
  },
  {
    "id": "pdf_tpl_76",
    "name": "Blog Post Title",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Generate catchy titles for your blog posts in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Blog Post Title..."
  },
  {
    "id": "pdf_tpl_77",
    "name": "Book Outline Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Create a structured outline for your book with AI assistance",
    "promptPlaceholder": "Enter your specific context or instructions for Book Outline Generator..."
  },
  {
    "id": "pdf_tpl_78",
    "name": "Book Summarizer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Summarize any book with the help of AI",
    "promptPlaceholder": "Enter your specific context or instructions for Book Summarizer..."
  },
  {
    "id": "pdf_tpl_79",
    "name": "Book Title Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate Unique and Creative Book Titles with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Book Title Generator..."
  },
  {
    "id": "pdf_tpl_80",
    "name": "Chapter Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate unique and captivating story chapters with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Chapter Generator..."
  },
  {
    "id": "pdf_tpl_81",
    "name": "Content Continuer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Takes a piece of text and keeps writing it for you",
    "promptPlaceholder": "Enter your specific context or instructions for Content Continuer..."
  },
  {
    "id": "pdf_tpl_82",
    "name": "Content Idea Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Get inspiration for your next piece of content by generating a huge variety of content ideas",
    "promptPlaceholder": "Enter your specific context or instructions for Content Idea Generator..."
  },
  {
    "id": "pdf_tpl_83",
    "name": "Conversation Starter Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate interesting conversation starters.",
    "promptPlaceholder": "Enter your specific context or instructions for Conversation Starter Generator..."
  },
  {
    "id": "pdf_tpl_84",
    "name": "Custom Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate custom text for any purpose.",
    "promptPlaceholder": "Enter your specific context or instructions for Custom Generator..."
  },
  {
    "id": "pdf_tpl_85",
    "name": "Content Summarizer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Get the main points of any text in a fraction of the time it would take to read it",
    "promptPlaceholder": "Enter your specific context or instructions for Content Summarizer..."
  },
  {
    "id": "pdf_tpl_86",
    "name": "Dialogue Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate a dialogue based on your inputs",
    "promptPlaceholder": "Enter your specific context or instructions for Dialogue Generator..."
  },
  {
    "id": "pdf_tpl_87",
    "name": "Explain Like I'm Five",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Explain a complex or obscure topic in the simplest of terms",
    "promptPlaceholder": "Enter your specific context or instructions for Explain Like I'm Five..."
  },
  {
    "id": "pdf_tpl_88",
    "name": "Ghostwriter",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate a text based on your writing request",
    "promptPlaceholder": "Enter your specific context or instructions for Ghostwriter..."
  },
  {
    "id": "pdf_tpl_89",
    "name": "Grammar Corrector",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Make sure your writing is error-free!",
    "promptPlaceholder": "Enter your specific context or instructions for Grammar Corrector..."
  },
  {
    "id": "pdf_tpl_90",
    "name": "Headline Analyzer",
    "category": "MARKETING",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "SOCIAL_CAPTION",
    "icon": "✍️",
    "description": "Check headlines, blog titles, and more for quality and click ability.",
    "promptPlaceholder": "Enter your specific context or instructions for Headline Analyzer..."
  },
  {
    "id": "pdf_tpl_91",
    "name": "Headline Generator",
    "category": "MARKETING",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "SOCIAL_CAPTION",
    "icon": "✍️",
    "description": "Generate eye-catching headlines with our AI-powered title generator tool.",
    "promptPlaceholder": "Enter your specific context or instructions for Headline Generator..."
  },
  {
    "id": "pdf_tpl_92",
    "name": "Humanize AI Text To Bypass AI Detection",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Transform AI-generated text to make it more human-like and bypass AI detection.",
    "promptPlaceholder": "Enter your specific context or instructions for Humanize AI Text To Bypass AI Detection..."
  },
  {
    "id": "pdf_tpl_93",
    "name": "Industry Content Creation",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Create content for specific industries.",
    "promptPlaceholder": "Enter your specific context or instructions for Industry Content Creation..."
  },
  {
    "id": "pdf_tpl_94",
    "name": "Instant Blog Post Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Generate complete blog posts on any topic in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Instant Blog Post Generator..."
  },
  {
    "id": "pdf_tpl_95",
    "name": "Instant Blog Post Generator V2",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Generate human-like blog posts on any topic in seconds! Undetectable by AI Detectors.",
    "promptPlaceholder": "Enter your specific context or instructions for Instant Blog Post Generator V2..."
  },
  {
    "id": "pdf_tpl_96",
    "name": "Instant Blog Post Generator V3",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Write long, real-time, factual articles with the click of a button. Featured image included.",
    "promptPlaceholder": "Enter your specific context or instructions for Instant Blog Post Generator V3..."
  },
  {
    "id": "pdf_tpl_97",
    "name": "Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✍️",
    "description": "Write any letter in seconds with the free AI letter writer — formal, personal, cover letters, complaints and",
    "promptPlaceholder": "Enter your specific context or instructions for Letter Generator..."
  },
  {
    "id": "pdf_tpl_98",
    "name": "thank-yous, perfectly worded and ready to send.",
    "category": "MARKETING",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "PRODUCT_AD",
    "icon": "✍️",
    "description": "Manuscript Writer",
    "promptPlaceholder": "Enter your specific context or instructions for thank-yous, perfectly worded and ready to send...."
  },
  {
    "id": "pdf_tpl_99",
    "name": "AI-powered tool to assist in writing your manuscript",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "VIDEO_SCRIPT",
    "icon": "✍️",
    "description": "Merge Texts",
    "promptPlaceholder": "Enter your specific context or instructions for AI-powered tool to assist in writing your manuscript..."
  },
  {
    "id": "pdf_tpl_100",
    "name": "Combine two separate texts into one cohesive piece.",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Metaphor Creator",
    "promptPlaceholder": "Enter your specific context or instructions for Combine two separate texts into one cohesive piece...."
  },
  {
    "id": "pdf_tpl_101",
    "name": "Monologue Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate compelling monologues for any character or situation",
    "promptPlaceholder": "Enter your specific context or instructions for Monologue Generator..."
  },
  {
    "id": "pdf_tpl_102",
    "name": "News Article Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate professional news articles on various topics.",
    "promptPlaceholder": "Enter your specific context or instructions for News Article Generator..."
  },
  {
    "id": "pdf_tpl_103",
    "name": "Paraphrasing Tool",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Rephrase any text in a variety of ways",
    "promptPlaceholder": "Enter your specific context or instructions for Paraphrasing Tool..."
  },
  {
    "id": "pdf_tpl_104",
    "name": "Paragraph Expander",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Expand your paragraphs to make them more engaging and interesting to read.",
    "promptPlaceholder": "Enter your specific context or instructions for Paragraph Expander..."
  },
  {
    "id": "pdf_tpl_105",
    "name": "Paragraph Rewriter",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Make your content shine with our easy-to-use content rewriter",
    "promptPlaceholder": "Enter your specific context or instructions for Paragraph Rewriter..."
  },
  {
    "id": "pdf_tpl_106",
    "name": "Paragraph Writer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate paragraphs with the click of a button!",
    "promptPlaceholder": "Enter your specific context or instructions for Paragraph Writer..."
  },
  {
    "id": "pdf_tpl_107",
    "name": "PAS Framework",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Problem-Agitate-Solution. Write Persuasive Copy.",
    "promptPlaceholder": "Enter your specific context or instructions for PAS Framework..."
  },
  {
    "id": "pdf_tpl_108",
    "name": "Reflection Writer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "AI-powered tool for reflective writing",
    "promptPlaceholder": "Enter your specific context or instructions for Reflection Writer..."
  },
  {
    "id": "pdf_tpl_109",
    "name": "Romance Story Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "BLOG_OUTLINE",
    "icon": "✍️",
    "description": "Create captivating romance stories with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Romance Story Generator..."
  },
  {
    "id": "pdf_tpl_110",
    "name": "SCQA Framework",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Situation, Complication, Question, Answer. Create structured, persuasive content.",
    "promptPlaceholder": "Enter your specific context or instructions for SCQA Framework..."
  },
  {
    "id": "pdf_tpl_111",
    "name": "Sentence Expander",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "This will make your writing more engaging and interesting to read",
    "promptPlaceholder": "Enter your specific context or instructions for Sentence Expander..."
  },
  {
    "id": "pdf_tpl_112",
    "name": "Sentence Finisher",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Complete your sentences with the help of AI",
    "promptPlaceholder": "Enter your specific context or instructions for Sentence Finisher..."
  },
  {
    "id": "pdf_tpl_113",
    "name": "Sentence Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate sentences with the click of a button!",
    "promptPlaceholder": "Enter your specific context or instructions for Sentence Generator..."
  },
  {
    "id": "pdf_tpl_114",
    "name": "Sentence Rewriter",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Rewrite your sentences to make them more engaging and interesting to read",
    "promptPlaceholder": "Enter your specific context or instructions for Sentence Rewriter..."
  },
  {
    "id": "pdf_tpl_115",
    "name": "Synopsis Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Generate a concise and appealing synopsis.",
    "promptPlaceholder": "Enter your specific context or instructions for Synopsis Generator..."
  },
  {
    "id": "pdf_tpl_116",
    "name": "🇸🇬Translate to Singlish",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Get your message across in Singlish!",
    "promptPlaceholder": "Enter your specific context or instructions for 🇸🇬Translate to Singlish..."
  },
  {
    "id": "pdf_tpl_117",
    "name": "Text Shortener",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Shorten your text to the most important parts",
    "promptPlaceholder": "Enter your specific context or instructions for Text Shortener..."
  },
  {
    "id": "pdf_tpl_118",
    "name": "Topics and Bullets Generator",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Extract key topics and bullet points from your text",
    "promptPlaceholder": "Enter your specific context or instructions for Topics and Bullets Generator..."
  },
  {
    "id": "pdf_tpl_119",
    "name": "Universal Translator [ Spanish ]",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Accurately translate text between languages with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Universal Translator [ Spanish ]..."
  },
  {
    "id": "pdf_tpl_120",
    "name": "Word Count Tool",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Use our free word count tool to count the number of words and characters in your text.",
    "promptPlaceholder": "Enter your specific context or instructions for Word Count Tool..."
  },
  {
    "id": "pdf_tpl_121",
    "name": "Write like a native speaker",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Clear, concise and authentic writing that gets your message across effectively.",
    "promptPlaceholder": "Enter your specific context or instructions for Write like a native speaker..."
  },
  {
    "id": "pdf_tpl_122",
    "name": "Write like Shakespeare",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "AI Shakespearean text generator",
    "promptPlaceholder": "Enter your specific context or instructions for Write like Shakespeare..."
  },
  {
    "id": "pdf_tpl_123",
    "name": "Writing Enhancer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Improve your writing with our AI-powered tool",
    "promptPlaceholder": "Enter your specific context or instructions for Writing Enhancer..."
  },
  {
    "id": "pdf_tpl_124",
    "name": "Text Tone Analyzer",
    "category": "TEXT",
    "templateCategory": "Content Creation / Creative Writing",
    "format": "ARTICLE_SECTION",
    "icon": "✍️",
    "description": "Analyze the tone of a text.",
    "promptPlaceholder": "Enter your specific context or instructions for Text Tone Analyzer..."
  },
  {
    "id": "pdf_tpl_125",
    "name": "Backlink Outreach Email",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Write an email to get backlinks from other websites",
    "promptPlaceholder": "Enter your specific context or instructions for Backlink Outreach Email..."
  },
  {
    "id": "pdf_tpl_126",
    "name": "Email Response Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Make your email replies more efficient",
    "promptPlaceholder": "Enter your specific context or instructions for Email Response Generator..."
  },
  {
    "id": "pdf_tpl_127",
    "name": "Cold Email Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Write cold emails that work and get responses.",
    "promptPlaceholder": "Enter your specific context or instructions for Cold Email Generator..."
  },
  {
    "id": "pdf_tpl_128",
    "name": "Email Rewriter",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Rewrite and improve your emails for better clarity and impact.",
    "promptPlaceholder": "Enter your specific context or instructions for Email Rewriter..."
  },
  {
    "id": "pdf_tpl_129",
    "name": "Email Subject Line Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Generate attention-grabbing email subject lines in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Email Subject Line Generator..."
  },
  {
    "id": "pdf_tpl_130",
    "name": "Event Invitation Email",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Write a persuasive email to increase attendance at your event",
    "promptPlaceholder": "Enter your specific context or instructions for Event Invitation Email..."
  },
  {
    "id": "pdf_tpl_131",
    "name": "Event Reminder Email Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Generate a reminder email for your upcoming event",
    "promptPlaceholder": "Enter your specific context or instructions for Event Reminder Email Generator..."
  },
  {
    "id": "pdf_tpl_132",
    "name": "Follow Up Email Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Craft a compelling follow-up email to keep your conversation going",
    "promptPlaceholder": "Enter your specific context or instructions for Follow Up Email Generator..."
  },
  {
    "id": "pdf_tpl_133",
    "name": "Text Message Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Generate personalized text messages for various occasions.",
    "promptPlaceholder": "Enter your specific context or instructions for Text Message Generator..."
  },
  {
    "id": "pdf_tpl_134",
    "name": "Waitlist Email Generator",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "EMAIL_NEWSLETTER",
    "icon": "✉️",
    "description": "Craft a compelling waitlist email to keep your users engaged",
    "promptPlaceholder": "Enter your specific context or instructions for Waitlist Email Generator..."
  },
  {
    "id": "pdf_tpl_135",
    "name": "Entertainment & Social Media",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "AI Joke Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Entertainment & Social Media..."
  },
  {
    "id": "pdf_tpl_136",
    "name": "Make your friends laugh. Now you can be the life of the party.",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "AI Interior Design Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Make your friends laugh. Now you can be the life of the party...."
  },
  {
    "id": "pdf_tpl_137",
    "name": "AI Roasting Tool",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "AI-powered roasting tool. Generate humorous and witty roasts.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Roasting Tool..."
  },
  {
    "id": "pdf_tpl_138",
    "name": "AI Sprite Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "Generate game sprite sheets with AI. Create character animations for 2D games.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Sprite Generator..."
  },
  {
    "id": "pdf_tpl_139",
    "name": "AI Transcription",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "VIDEO_SCRIPT",
    "icon": "✉️",
    "description": "Transcribe and summarize audios. Generate titles, descriptions and show notes.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Transcription..."
  },
  {
    "id": "pdf_tpl_140",
    "name": "Content Calendar Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "Plan your content for social media to reach more people and grow your audience",
    "promptPlaceholder": "Enter your specific context or instructions for Content Calendar Generator..."
  },
  {
    "id": "pdf_tpl_141",
    "name": "Facebook Post Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "BLOG_OUTLINE",
    "icon": "✉️",
    "description": "Easily create unique, high-quality posts for your Facebook page - with just one click!",
    "promptPlaceholder": "Enter your specific context or instructions for Facebook Post Generator..."
  },
  {
    "id": "pdf_tpl_142",
    "name": "Instagram Bio",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "SOCIAL_CAPTION",
    "icon": "✉️",
    "description": "Make your Instagram profile stand out with the help of our bio generator",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Bio..."
  },
  {
    "id": "pdf_tpl_143",
    "name": "Instagram Carousel Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "Turn any idea into a save-worthy Instagram carousel — designed slides plus a ready-to-post caption.",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Carousel Generator..."
  },
  {
    "id": "pdf_tpl_144",
    "name": "Instagram Post Caption",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "BLOG_OUTLINE",
    "icon": "✉️",
    "description": "Generate a caption for an Instagram post",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Post Caption..."
  },
  {
    "id": "pdf_tpl_145",
    "name": "Instagram Hashtag Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "Get hashtags for your next Instagram Reel to reach more people!",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Hashtag Generator..."
  },
  {
    "id": "pdf_tpl_146",
    "name": "Instagram Reel Captions",
    "category": "MARKETING",
    "templateCategory": "Email, Messages & Texts",
    "format": "SOCIAL_CAPTION",
    "icon": "✉️",
    "description": "Make your Instagram Reels stand out and get more views!",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Reel Captions..."
  },
  {
    "id": "pdf_tpl_147",
    "name": "Instagram Reel Ideas",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "Get ideas for your next Instagram Reel to get more views!",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Reel Ideas..."
  },
  {
    "id": "pdf_tpl_148",
    "name": "Instagram Threads Post Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "BLOG_OUTLINE",
    "icon": "✉️",
    "description": "Generate a content for an Instagram Threads",
    "promptPlaceholder": "Enter your specific context or instructions for Instagram Threads Post Generator..."
  },
  {
    "id": "pdf_tpl_149",
    "name": "Pinterest Hashtag Generator",
    "category": "TEXT",
    "templateCategory": "Email, Messages & Texts",
    "format": "ARTICLE_SECTION",
    "icon": "✉️",
    "description": "Generate popular hashtags for your Pinterest posts!",
    "promptPlaceholder": "Enter your specific context or instructions for Pinterest Hashtag Generator..."
  },
  {
    "id": "pdf_tpl_150",
    "name": "Podcast Episode Title Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "VIDEO_SCRIPT",
    "icon": "🎬",
    "description": "Generate podcast episode titles that will help you grow your audience",
    "promptPlaceholder": "Enter your specific context or instructions for Podcast Episode Title Generator..."
  },
  {
    "id": "pdf_tpl_151",
    "name": "Podcast Episode Description Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "VIDEO_SCRIPT",
    "icon": "🎬",
    "description": "Generate podcast episode description that will help you grow your audience",
    "promptPlaceholder": "Enter your specific context or instructions for Podcast Episode Description Generator..."
  },
  {
    "id": "pdf_tpl_152",
    "name": "Podcast Show Notes",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "VIDEO_SCRIPT",
    "icon": "🎬",
    "description": "Create show notes that will help you grow your podcast audience",
    "promptPlaceholder": "Enter your specific context or instructions for Podcast Show Notes..."
  },
  {
    "id": "pdf_tpl_153",
    "name": "Podcast Introduction Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "VIDEO_SCRIPT",
    "icon": "🎬",
    "description": "Generate podcast introductions that will help you grow your audience",
    "promptPlaceholder": "Enter your specific context or instructions for Podcast Introduction Generator..."
  },
  {
    "id": "pdf_tpl_154",
    "name": "Podcast Script Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "VIDEO_SCRIPT",
    "icon": "🎬",
    "description": "Generate scripts for your podcast episodes",
    "promptPlaceholder": "Enter your specific context or instructions for Podcast Script Generator..."
  },
  {
    "id": "pdf_tpl_155",
    "name": "Pun Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "🎬",
    "description": "Generate puns that will make everyone laugh.",
    "promptPlaceholder": "Enter your specific context or instructions for Pun Generator..."
  },
  {
    "id": "pdf_tpl_156",
    "name": "Reel Script Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "VIDEO_SCRIPT",
    "icon": "🎬",
    "description": "Create engaging scripts for your Instagram Reels or TikTok videos effortlessly!",
    "promptPlaceholder": "Enter your specific context or instructions for Reel Script Generator..."
  },
  {
    "id": "pdf_tpl_157",
    "name": "Response Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "🎬",
    "description": "Generate perfect responses to any message across multiple platforms with our AI Response Generator.",
    "promptPlaceholder": "Enter your specific context or instructions for Response Generator..."
  },
  {
    "id": "pdf_tpl_158",
    "name": "Save time and improve communication efficiency effortlessly.",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "🎬",
    "description": "Social Media Post Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Save time and improve communication efficiency effortlessly...."
  },
  {
    "id": "pdf_tpl_159",
    "name": "Timestamped Overview Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "🎬",
    "description": "Generate a timestamped overview of a recording transcript",
    "promptPlaceholder": "Enter your specific context or instructions for Timestamped Overview Generator..."
  },
  {
    "id": "pdf_tpl_160",
    "name": "Twitter Bio Generator",
    "category": "MARKETING",
    "templateCategory": "Entertainment / Social Media",
    "format": "SOCIAL_CAPTION",
    "icon": "🎬",
    "description": "Make your Twitter profile stand out with the help of our bio generator",
    "promptPlaceholder": "Enter your specific context or instructions for Twitter Bio Generator..."
  },
  {
    "id": "pdf_tpl_161",
    "name": "Twitter Post Generator",
    "category": "TEXT",
    "templateCategory": "Entertainment / Social Media",
    "format": "BLOG_OUTLINE",
    "icon": "🎬",
    "description": "The easy way to create tweets that get noticed.",
    "promptPlaceholder": "Enter your specific context or instructions for Twitter Post Generator..."
  },
  {
    "id": "pdf_tpl_162",
    "name": "Tweet Reply Generator",
    "category": "MARKETING",
    "templateCategory": "Entertainment / Social Media",
    "format": "SOCIAL_CAPTION",
    "icon": "🎬",
    "description": "Reply to any tweet with a unique, high-quality response.",
    "promptPlaceholder": "Enter your specific context or instructions for Tweet Reply Generator..."
  },
  {
    "id": "pdf_tpl_163",
    "name": "Twitter Thread Generator",
    "category": "MARKETING",
    "templateCategory": "Entertainment / Social Media",
    "format": "SOCIAL_CAPTION",
    "icon": "🎬",
    "description": "Never run out of things to tweet about!",
    "promptPlaceholder": "Enter your specific context or instructions for Twitter Thread Generator..."
  },
  {
    "id": "pdf_tpl_164",
    "name": "Career Path Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "AI-powered tool to suggest potential career paths based on interests and skills.",
    "promptPlaceholder": "Enter your specific context or instructions for Career Path Generator..."
  },
  {
    "id": "pdf_tpl_165",
    "name": "Character Reference Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "EMAIL_NEWSLETTER",
    "icon": "👥",
    "description": "Generate a personalized character reference letter in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Character Reference Letter Generator..."
  },
  {
    "id": "pdf_tpl_166",
    "name": "Cover Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "EMAIL_NEWSLETTER",
    "icon": "👥",
    "description": "Get the job you want with the perfect cover letter!",
    "promptPlaceholder": "Enter your specific context or instructions for Cover Letter Generator..."
  },
  {
    "id": "pdf_tpl_167",
    "name": "Employee Growth Plan Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "BLOG_OUTLINE",
    "icon": "👥",
    "description": "Creating a structured development plan to help employees reach their full potential",
    "promptPlaceholder": "Enter your specific context or instructions for Employee Growth Plan Generator..."
  },
  {
    "id": "pdf_tpl_168",
    "name": "Employee Recognition Letter",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "EMAIL_NEWSLETTER",
    "icon": "👥",
    "description": "Create meaningful recognition letters to celebrate employee achievements",
    "promptPlaceholder": "Enter your specific context or instructions for Employee Recognition Letter..."
  },
  {
    "id": "pdf_tpl_169",
    "name": "Event Planner",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "BLOG_OUTLINE",
    "icon": "👥",
    "description": "Plan and organize your events with ease using AI.",
    "promptPlaceholder": "Enter your specific context or instructions for Event Planner..."
  },
  {
    "id": "pdf_tpl_170",
    "name": "Interview Questions Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Make your next interview preparation a breeze",
    "promptPlaceholder": "Enter your specific context or instructions for Interview Questions Generator..."
  },
  {
    "id": "pdf_tpl_171",
    "name": "Interview Answers Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate answers for common interview questions",
    "promptPlaceholder": "Enter your specific context or instructions for Interview Answers Generator..."
  },
  {
    "id": "pdf_tpl_172",
    "name": "Interview Feedback Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Write Interview Feedback With Ease and Confidence",
    "promptPlaceholder": "Enter your specific context or instructions for Interview Feedback Generator..."
  },
  {
    "id": "pdf_tpl_173",
    "name": "Job Description Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "VIDEO_SCRIPT",
    "icon": "👥",
    "description": "Quickly generate job descriptions for any position",
    "promptPlaceholder": "Enter your specific context or instructions for Job Description Generator..."
  },
  {
    "id": "pdf_tpl_174",
    "name": "Job Offer Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "EMAIL_NEWSLETTER",
    "icon": "👥",
    "description": "Generate a professional job offer letter in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Job Offer Letter Generator..."
  },
  {
    "id": "pdf_tpl_175",
    "name": "Job Qualifications Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Quickly generate job qualifications for any job posting",
    "promptPlaceholder": "Enter your specific context or instructions for Job Qualifications Generator..."
  },
  {
    "id": "pdf_tpl_176",
    "name": "Job Responsibilities Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Quickly generate job responsibilities for any job description",
    "promptPlaceholder": "Enter your specific context or instructions for Job Responsibilities Generator..."
  },
  {
    "id": "pdf_tpl_177",
    "name": "Job Summary Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Get a strong, attention-grabbing summary",
    "promptPlaceholder": "Enter your specific context or instructions for Job Summary Generator..."
  },
  {
    "id": "pdf_tpl_178",
    "name": "Job Title Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate professional job titles in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Job Title Generator..."
  },
  {
    "id": "pdf_tpl_179",
    "name": "Create a structured plan to help employees improve their performance",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "BLOG_OUTLINE",
    "icon": "👥",
    "description": "Policy Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Create a structured plan to help employees improve their performance..."
  },
  {
    "id": "pdf_tpl_180",
    "name": "Reference Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "EMAIL_NEWSLETTER",
    "icon": "👥",
    "description": "Generate a personalized reference letter in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Reference Letter Generator..."
  },
  {
    "id": "pdf_tpl_181",
    "name": "Resignation Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "EMAIL_NEWSLETTER",
    "icon": "👥",
    "description": "Write a resignation letter that can help you leave your job on good terms.",
    "promptPlaceholder": "Enter your specific context or instructions for Resignation Letter Generator..."
  },
  {
    "id": "pdf_tpl_182",
    "name": "Resume Bullet Point Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate professional bullet points for your resume in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Resume Bullet Point Generator..."
  },
  {
    "id": "pdf_tpl_183",
    "name": "Resume Headline Generator",
    "category": "MARKETING",
    "templateCategory": "Human Resources [ HR ]",
    "format": "SOCIAL_CAPTION",
    "icon": "👥",
    "description": "Get the Job You Want with Our Resume Headline Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Resume Headline Generator..."
  },
  {
    "id": "pdf_tpl_184",
    "name": "Resume Objective Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Create your professional resume objective in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Resume Objective Generator..."
  },
  {
    "id": "pdf_tpl_185",
    "name": "Resume Skills Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate a list of skills for your resume",
    "promptPlaceholder": "Enter your specific context or instructions for Resume Skills Generator..."
  },
  {
    "id": "pdf_tpl_186",
    "name": "Resume Summary Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Create your professional resume summary in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Resume Summary Generator..."
  },
  {
    "id": "pdf_tpl_187",
    "name": "SOP Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate Standard Operating Procedures for your business or organization.",
    "promptPlaceholder": "Enter your specific context or instructions for SOP Generator..."
  },
  {
    "id": "pdf_tpl_188",
    "name": "Staff Schedule Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Create a detailed staff schedule for your team or organization.",
    "promptPlaceholder": "Enter your specific context or instructions for Staff Schedule Generator..."
  },
  {
    "id": "pdf_tpl_189",
    "name": "Team Building Activity Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate engaging team building activities to boost morale and collaboration",
    "promptPlaceholder": "Enter your specific context or instructions for Team Building Activity Generator..."
  },
  {
    "id": "pdf_tpl_190",
    "name": "Images & Videos",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "VIDEO_SCRIPT",
    "icon": "👥",
    "description": "AI Art & Images",
    "promptPlaceholder": "Enter your specific context or instructions for Images & Videos..."
  },
  {
    "id": "pdf_tpl_191",
    "name": "AI Photo Generator",
    "category": "TEXT",
    "templateCategory": "Human Resources [ HR ]",
    "format": "ARTICLE_SECTION",
    "icon": "👥",
    "description": "Generate realistic photos with AI. Create custom images for any purpose.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Photo Generator..."
  },
  {
    "id": "pdf_tpl_192",
    "name": "Unlock the Magic of Automated Storytelling!",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "BLOG_OUTLINE",
    "icon": "🎥",
    "description": "Art Prompt Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Unlock the Magic of Automated Storytelling!..."
  },
  {
    "id": "pdf_tpl_193",
    "name": "Awards & Certificates Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Generate realistic Awards & Certificates with AI. Create custom company recognition for staff.",
    "promptPlaceholder": "Enter your specific context or instructions for Awards & Certificates Generator..."
  },
  {
    "id": "pdf_tpl_194",
    "name": "Character Name Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Generate unique character names with ease.",
    "promptPlaceholder": "Enter your specific context or instructions for Character Name Generator..."
  },
  {
    "id": "pdf_tpl_195",
    "name": "Character Description Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Generate detailed descriptions for your characters.",
    "promptPlaceholder": "Enter your specific context or instructions for Character Description Generator..."
  },
  {
    "id": "pdf_tpl_196",
    "name": "Character Backstory Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "BLOG_OUTLINE",
    "icon": "🎥",
    "description": "Create rich and compelling backstories for your characters",
    "promptPlaceholder": "Enter your specific context or instructions for Character Backstory Generator..."
  },
  {
    "id": "pdf_tpl_197",
    "name": "Fanfiction Maker",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Create your own fanfiction stories with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Fanfiction Maker..."
  },
  {
    "id": "pdf_tpl_198",
    "name": "Free AI Image Upscaler",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Use our free tool to upscale your images and improve the quality of your photos.",
    "promptPlaceholder": "Enter your specific context or instructions for Free AI Image Upscaler..."
  },
  {
    "id": "pdf_tpl_199",
    "name": "Logo Creator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Generate amazing logo images and art with AI. Express ideas. Stand out.",
    "promptPlaceholder": "Enter your specific context or instructions for Logo Creator..."
  },
  {
    "id": "pdf_tpl_200",
    "name": "Story Plot Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "BLOG_OUTLINE",
    "icon": "🎥",
    "description": "Generate intriguing story plots with AI",
    "promptPlaceholder": "Enter your specific context or instructions for Story Plot Generator..."
  },
  {
    "id": "pdf_tpl_201",
    "name": "TikTok Hashtags Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Get more TikTok followers and likes",
    "promptPlaceholder": "Enter your specific context or instructions for TikTok Hashtags Generator..."
  },
  {
    "id": "pdf_tpl_202",
    "name": "TikTok Video Captions",
    "category": "MARKETING",
    "templateCategory": "Images & Video",
    "format": "SOCIAL_CAPTION",
    "icon": "🎥",
    "description": "Get more likes and views on your TikTok videos!",
    "promptPlaceholder": "Enter your specific context or instructions for TikTok Video Captions..."
  },
  {
    "id": "pdf_tpl_203",
    "name": "Video Script Outline",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "BLOG_OUTLINE",
    "icon": "🎥",
    "description": "Make your next video a hit with a professional script outline!",
    "promptPlaceholder": "Enter your specific context or instructions for Video Script Outline..."
  },
  {
    "id": "pdf_tpl_204",
    "name": "YouTube Video Description",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Make your videos stand out and rank well with great descriptions!",
    "promptPlaceholder": "Enter your specific context or instructions for YouTube Video Description..."
  },
  {
    "id": "pdf_tpl_205",
    "name": "YouTube Video Ideas",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Get inspired to make your next YouTube video!",
    "promptPlaceholder": "Enter your specific context or instructions for YouTube Video Ideas..."
  },
  {
    "id": "pdf_tpl_206",
    "name": "YouTube Video Title",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Generate catchy titles for your YouTube Videos in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for YouTube Video Title..."
  },
  {
    "id": "pdf_tpl_207",
    "name": "YouTube Video to Article Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Convert any YouTube video into a well-structured article in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for YouTube Video to Article Generator..."
  },
  {
    "id": "pdf_tpl_208",
    "name": "Advertisement Copy Generator",
    "category": "MARKETING",
    "templateCategory": "Marketing",
    "format": "PRODUCT_AD",
    "icon": "🎯",
    "description": "Create compelling advertisements for your products or services.",
    "promptPlaceholder": "Enter your specific context or instructions for Advertisement Copy Generator..."
  },
  {
    "id": "pdf_tpl_209",
    "name": "Clickbait Title Generator",
    "category": "TEXT",
    "templateCategory": "Marketing",
    "format": "ARTICLE_SECTION",
    "icon": "🎯",
    "description": "Generate attention-grabbing titles that get clicks!",
    "promptPlaceholder": "Enter your specific context or instructions for Clickbait Title Generator..."
  },
  {
    "id": "pdf_tpl_210",
    "name": "Email Generation",
    "category": "MARKETING",
    "templateCategory": "Images & Video",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🎥",
    "description": "Create professional emails in minutes with AI. From marketing newsletters to outbound sales emails",
    "promptPlaceholder": "Enter your specific context or instructions for Email Generation..."
  },
  {
    "id": "pdf_tpl_211",
    "name": "Facebook Ad Headlines",
    "category": "MARKETING",
    "templateCategory": "Images & Video",
    "format": "SOCIAL_CAPTION",
    "icon": "🎥",
    "description": "Create attention-grabbing Facebook Headlines that get results!",
    "promptPlaceholder": "Enter your specific context or instructions for Facebook Ad Headlines..."
  },
  {
    "id": "pdf_tpl_212",
    "name": "Facebook Ads Primary Text",
    "category": "MARKETING",
    "templateCategory": "Images & Video",
    "format": "PRODUCT_AD",
    "icon": "🎥",
    "description": "Generate Primary Texts for your Facebook Ads that get more Leads and Sales",
    "promptPlaceholder": "Enter your specific context or instructions for Facebook Ads Primary Text..."
  },
  {
    "id": "pdf_tpl_213",
    "name": "Fill The Gaps",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Add contextually relevant text in the middle of existing content",
    "promptPlaceholder": "Enter your specific context or instructions for Fill The Gaps..."
  },
  {
    "id": "pdf_tpl_214",
    "name": "Google Ads Descriptions",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Get more conversions with our Google Ads Descriptions generator!",
    "promptPlaceholder": "Enter your specific context or instructions for Google Ads Descriptions..."
  },
  {
    "id": "pdf_tpl_215",
    "name": "Google Ads Headlines",
    "category": "MARKETING",
    "templateCategory": "Images & Video",
    "format": "SOCIAL_CAPTION",
    "icon": "🎥",
    "description": "Get more clicks with our Google Ads headlines generator!",
    "promptPlaceholder": "Enter your specific context or instructions for Google Ads Headlines..."
  },
  {
    "id": "pdf_tpl_216",
    "name": "Google My Business - Product Description",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Generate product or service descriptions for your Google My Business",
    "promptPlaceholder": "Enter your specific context or instructions for Google My Business - Product Description..."
  },
  {
    "id": "pdf_tpl_217",
    "name": "Google My Business Post",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "BLOG_OUTLINE",
    "icon": "🎥",
    "description": "Generate What's New post updates for Google My Business",
    "promptPlaceholder": "Enter your specific context or instructions for Google My Business Post..."
  },
  {
    "id": "pdf_tpl_218",
    "name": "Keywords Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Generate relevant keywords from your input text to boost SEO and content relevance.",
    "promptPlaceholder": "Enter your specific context or instructions for Keywords Generator..."
  },
  {
    "id": "pdf_tpl_219",
    "name": "JIRA Issue Creator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Create JIRA or any other issue tracker tickets in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for JIRA Issue Creator..."
  },
  {
    "id": "pdf_tpl_220",
    "name": "Landing Page Copy",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Generate a landing page copy in seconds",
    "promptPlaceholder": "Enter your specific context or instructions for Landing Page Copy..."
  },
  {
    "id": "pdf_tpl_221",
    "name": "Meta Description Generator",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "VIDEO_SCRIPT",
    "icon": "🎥",
    "description": "Generate compelling meta descriptions to improve click-through rates from search results.",
    "promptPlaceholder": "Enter your specific context or instructions for Meta Description Generator..."
  },
  {
    "id": "pdf_tpl_222",
    "name": "SEO Content Brief",
    "category": "TEXT",
    "templateCategory": "Images & Video",
    "format": "ARTICLE_SECTION",
    "icon": "🎥",
    "description": "Generate SEO content briefs that get results!",
    "promptPlaceholder": "Enter your specific context or instructions for SEO Content Brief..."
  },
  {
    "id": "pdf_tpl_223",
    "name": "Get your website to the top of the search engines!",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Marketing Campaign Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Get your website to the top of the search engines!..."
  },
  {
    "id": "pdf_tpl_224",
    "name": "Marketing Email Generator",
    "category": "MARKETING",
    "templateCategory": "By Industries",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🏭",
    "description": "Create compelling marketing emails tailored to your product and audience",
    "promptPlaceholder": "Enter your specific context or instructions for Marketing Email Generator..."
  },
  {
    "id": "pdf_tpl_225",
    "name": "Marketing Plan Generator",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "BLOG_OUTLINE",
    "icon": "🏭",
    "description": "Generate a comprehensive marketing plan for your business",
    "promptPlaceholder": "Enter your specific context or instructions for Marketing Plan Generator..."
  },
  {
    "id": "pdf_tpl_226",
    "name": "Marketing Strategy Generator",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Generate a comprehensive marketing strategy for your business",
    "promptPlaceholder": "Enter your specific context or instructions for Marketing Strategy Generator..."
  },
  {
    "id": "pdf_tpl_227",
    "name": "Newsletter Generator",
    "category": "MARKETING",
    "templateCategory": "By Industries",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🏭",
    "description": "Generate a newsletter that will attract subscribers",
    "promptPlaceholder": "Enter your specific context or instructions for Newsletter Generator..."
  },
  {
    "id": "pdf_tpl_228",
    "name": "Newsletter Name Generator",
    "category": "MARKETING",
    "templateCategory": "By Industries",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🏭",
    "description": "Generate a name for your newsletter that will attract subscribers",
    "promptPlaceholder": "Enter your specific context or instructions for Newsletter Name Generator..."
  },
  {
    "id": "pdf_tpl_229",
    "name": "One Click Article Generation",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Generate SEO-friendly articles with one click.",
    "promptPlaceholder": "Enter your specific context or instructions for One Click Article Generation..."
  },
  {
    "id": "pdf_tpl_230",
    "name": "Presentation Slides Text Generator",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Create compelling presentation content with AI assistance",
    "promptPlaceholder": "Enter your specific context or instructions for Presentation Slides Text Generator..."
  },
  {
    "id": "pdf_tpl_231",
    "name": "Project Report Generator",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Generate comprehensive project reports with ease.",
    "promptPlaceholder": "Enter your specific context or instructions for Project Report Generator..."
  },
  {
    "id": "pdf_tpl_232",
    "name": "User Persona Generator",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Generate detailed user personas for your product or service.",
    "promptPlaceholder": "Enter your specific context or instructions for User Persona Generator..."
  },
  {
    "id": "pdf_tpl_233",
    "name": "Unique Selling Propositions",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Create a statement that differentiates your product from your competitors",
    "promptPlaceholder": "Enter your specific context or instructions for Unique Selling Propositions..."
  },
  {
    "id": "pdf_tpl_234",
    "name": "Unique Value Propositions",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "Create a statement that clearly tells the benefit of your offer",
    "promptPlaceholder": "Enter your specific context or instructions for Unique Value Propositions..."
  },
  {
    "id": "pdf_tpl_235",
    "name": "OKR Generator",
    "category": "TEXT",
    "templateCategory": "By Industries",
    "format": "ARTICLE_SECTION",
    "icon": "🏭",
    "description": "OKR Generator helps you create Key Results for your objectives",
    "promptPlaceholder": "Enter your specific context or instructions for OKR Generator..."
  },
  {
    "id": "pdf_tpl_236",
    "name": "Affirmation Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Create personalized affirmations to boost your confidence and positivity.",
    "promptPlaceholder": "Enter your specific context or instructions for Affirmation Generator..."
  },
  {
    "id": "pdf_tpl_237",
    "name": "Announcement Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate an announcement for your event or news.",
    "promptPlaceholder": "Enter your specific context or instructions for Announcement Generator..."
  },
  {
    "id": "pdf_tpl_238",
    "name": "Baby Shower Speech Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a heartfelt and memorable speech for a baby shower",
    "promptPlaceholder": "Enter your specific context or instructions for Baby Shower Speech Generator..."
  },
  {
    "id": "pdf_tpl_239",
    "name": "Best Man Speech Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a heartfelt and memorable best man speech for the wedding",
    "promptPlaceholder": "Enter your specific context or instructions for Best Man Speech Generator..."
  },
  {
    "id": "pdf_tpl_240",
    "name": "Birthday Card Creator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate personalized birthday cards with ease!",
    "promptPlaceholder": "Enter your specific context or instructions for Birthday Card Creator..."
  },
  {
    "id": "pdf_tpl_241",
    "name": "Birthday Invitation Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a unique and personalized birthday invitation",
    "promptPlaceholder": "Enter your specific context or instructions for Birthday Invitation Generator..."
  },
  {
    "id": "pdf_tpl_242",
    "name": "Compliment Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate unique and personalized compliments",
    "promptPlaceholder": "Enter your specific context or instructions for Compliment Generator..."
  },
  {
    "id": "pdf_tpl_243",
    "name": "Greetings & Wishes Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Create personalized greetings and wishes in a few simple clicks!",
    "promptPlaceholder": "Enter your specific context or instructions for Greetings & Wishes Generator..."
  },
  {
    "id": "pdf_tpl_244",
    "name": "Inspirational Quote Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate uplifting and motivational quotes to inspire others and yourself",
    "promptPlaceholder": "Enter your specific context or instructions for Inspirational Quote Generator..."
  },
  {
    "id": "pdf_tpl_245",
    "name": "Love Letter Generator",
    "category": "MARKETING",
    "templateCategory": "Motivation & Inspirational",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🔥",
    "description": "Create personalized love letters for Valentine’s Day, anniversaries, or any other special occasion.",
    "promptPlaceholder": "Enter your specific context or instructions for Love Letter Generator..."
  },
  {
    "id": "pdf_tpl_246",
    "name": "Maid of Honor Speech Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a heartfelt and memorable maid of honor speech for the wedding",
    "promptPlaceholder": "Enter your specific context or instructions for Maid of Honor Speech Generator..."
  },
  {
    "id": "pdf_tpl_247",
    "name": "Poem Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Unlock Your Creativity with Our Simple, Powerful Poem Generator!",
    "promptPlaceholder": "Enter your specific context or instructions for Poem Generator..."
  },
  {
    "id": "pdf_tpl_248",
    "name": "Pick Up Line Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Never run out of lines - with our Pickup Line Generator!",
    "promptPlaceholder": "Enter your specific context or instructions for Pick Up Line Generator..."
  },
  {
    "id": "pdf_tpl_249",
    "name": "Poem Title Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Creating Poem Title with the Push of a Button!",
    "promptPlaceholder": "Enter your specific context or instructions for Poem Title Generator..."
  },
  {
    "id": "pdf_tpl_250",
    "name": "Prayer Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Create heartfelt and meaningful prayers for various occasions and intentions",
    "promptPlaceholder": "Enter your specific context or instructions for Prayer Generator..."
  },
  {
    "id": "pdf_tpl_251",
    "name": "Prophecy Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate prophetic messages or visions for spiritual inspiration and guidance",
    "promptPlaceholder": "Enter your specific context or instructions for Prophecy Generator..."
  },
  {
    "id": "pdf_tpl_252",
    "name": "Quote Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Making AI quotes easy - one click away!",
    "promptPlaceholder": "Enter your specific context or instructions for Quote Generator..."
  },
  {
    "id": "pdf_tpl_253",
    "name": "Sermon Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate sermons that are inspiring, thought-provoking, and spiritually uplifting.",
    "promptPlaceholder": "Enter your specific context or instructions for Sermon Generator..."
  },
  {
    "id": "pdf_tpl_254",
    "name": "Speech Writer",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a compelling speech for any occasion",
    "promptPlaceholder": "Enter your specific context or instructions for Speech Writer..."
  },
  {
    "id": "pdf_tpl_255",
    "name": "SWOT Analysis Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a SWOT analysis for your business or project.",
    "promptPlaceholder": "Enter your specific context or instructions for SWOT Analysis Generator..."
  },
  {
    "id": "pdf_tpl_256",
    "name": "Thank You, Note Generator,",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a personalized thank you note",
    "promptPlaceholder": "Enter your specific context or instructions for Thank You, Note Generator,..."
  },
  {
    "id": "pdf_tpl_257",
    "name": "Valentine’s Creator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Craft personalized Valentine's Day messages for your loved ones.",
    "promptPlaceholder": "Enter your specific context or instructions for Valentine’s Creator..."
  },
  {
    "id": "pdf_tpl_258",
    "name": "Wedding Invite Message Generator",
    "category": "MARKETING",
    "templateCategory": "Motivation & Inspirational",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🔥",
    "description": "Generate a message for your wedding invite that will impress your guests",
    "promptPlaceholder": "Enter your specific context or instructions for Wedding Invite Message Generator..."
  },
  {
    "id": "pdf_tpl_259",
    "name": "Wedding Speech Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a speech for your wedding that will impress your guests",
    "promptPlaceholder": "Enter your specific context or instructions for Wedding Speech Generator..."
  },
  {
    "id": "pdf_tpl_260",
    "name": "Wedding Vow Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Create heartfelt and personalized wedding vows",
    "promptPlaceholder": "Enter your specific context or instructions for Wedding Vow Generator..."
  },
  {
    "id": "pdf_tpl_261",
    "name": "Workout Plan Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "BLOG_OUTLINE",
    "icon": "🔥",
    "description": "Generate a personalized workout plan based on your fitness goals.",
    "promptPlaceholder": "Enter your specific context or instructions for Workout Plan Generator..."
  },
  {
    "id": "pdf_tpl_262",
    "name": "Checklist Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate comprehensive checklists for any task or project",
    "promptPlaceholder": "Enter your specific context or instructions for Checklist Generator..."
  },
  {
    "id": "pdf_tpl_263",
    "name": "Classroom Jeopardy Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate a custom Classroom Jeopardy game for your students",
    "promptPlaceholder": "Enter your specific context or instructions for Classroom Jeopardy Generator..."
  },
  {
    "id": "pdf_tpl_264",
    "name": "Homework Assignment Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a custom homework assignment for your students",
    "promptPlaceholder": "Enter your specific context or instructions for Homework Assignment Generator..."
  },
  {
    "id": "pdf_tpl_265",
    "name": "Icebreaker Question Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate engaging icebreaker questions for meetings, events, or social gatherings.",
    "promptPlaceholder": "Enter your specific context or instructions for Icebreaker Question Generator..."
  },
  {
    "id": "pdf_tpl_266",
    "name": "IEP Goal Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a specific, measurable, attainable, reasonable, and time-bound IEP goal for your student",
    "promptPlaceholder": "Enter your specific context or instructions for IEP Goal Generator..."
  },
  {
    "id": "pdf_tpl_267",
    "name": "Learning Objective Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Create clear and concise learning objectives for your educational content.",
    "promptPlaceholder": "Enter your specific context or instructions for Learning Objective Generator..."
  },
  {
    "id": "pdf_tpl_268",
    "name": "Lesson Plan Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "BLOG_OUTLINE",
    "icon": "🔥",
    "description": "Create a custom lesson plan for your class that will help you teach your students",
    "promptPlaceholder": "Enter your specific context or instructions for Lesson Plan Generator..."
  },
  {
    "id": "pdf_tpl_269",
    "name": "Quiz Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Create customized quizzes for educational or entertainment purposes",
    "promptPlaceholder": "Enter your specific context or instructions for Quiz Generator..."
  },
  {
    "id": "pdf_tpl_270",
    "name": "Quiz Answer Assistant",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Get help analyzing and answering quiz questions accurately",
    "promptPlaceholder": "Enter your specific context or instructions for Quiz Answer Assistant..."
  },
  {
    "id": "pdf_tpl_271",
    "name": "Reading Passage Generator",
    "category": "MARKETING",
    "templateCategory": "Motivation & Inspirational",
    "format": "PRODUCT_AD",
    "icon": "🔥",
    "description": "Generate custom reading passages with adjustable complexity and topics",
    "promptPlaceholder": "Enter your specific context or instructions for Reading Passage Generator..."
  },
  {
    "id": "pdf_tpl_272",
    "name": "Regex Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate regular expressions with ease.",
    "promptPlaceholder": "Enter your specific context or instructions for Regex Generator..."
  },
  {
    "id": "pdf_tpl_273",
    "name": "Report Card Comment Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate constructive and professional report card comments",
    "promptPlaceholder": "Enter your specific context or instructions for Report Card Comment Generator..."
  },
  {
    "id": "pdf_tpl_274",
    "name": "Riddle Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate fun and challenging riddles for all ages.",
    "promptPlaceholder": "Enter your specific context or instructions for Riddle Generator..."
  },
  {
    "id": "pdf_tpl_275",
    "name": "Riddle Solver",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Solve riddles and get detailed explanations for the answers.",
    "promptPlaceholder": "Enter your specific context or instructions for Riddle Solver..."
  },
  {
    "id": "pdf_tpl_276",
    "name": "Rubric Generator",
    "category": "TEXT",
    "templateCategory": "Motivation & Inspirational",
    "format": "ARTICLE_SECTION",
    "icon": "🔥",
    "description": "Generate a custom rubric for your assignments",
    "promptPlaceholder": "Enter your specific context or instructions for Rubric Generator..."
  },
  {
    "id": "pdf_tpl_277",
    "name": "and behaviors",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Study Guide Maker",
    "promptPlaceholder": "Enter your specific context or instructions for and behaviors..."
  },
  {
    "id": "pdf_tpl_278",
    "name": "Syllabus Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "BLOG_OUTLINE",
    "icon": "🎓",
    "description": "Generate a comprehensive syllabus for your course in minutes",
    "promptPlaceholder": "Enter your specific context or instructions for Syllabus Generator..."
  },
  {
    "id": "pdf_tpl_279",
    "name": "Trivia Question Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate engaging trivia questions for games, quizzes, or events",
    "promptPlaceholder": "Enter your specific context or instructions for Trivia Question Generator..."
  },
  {
    "id": "pdf_tpl_280",
    "name": "Worksheet Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Create a custom worksheet for your students",
    "promptPlaceholder": "Enter your specific context or instructions for Worksheet Generator..."
  },
  {
    "id": "pdf_tpl_281",
    "name": "Answer Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate comprehensive and accurate answers to various questions.",
    "promptPlaceholder": "Enter your specific context or instructions for Answer Generator..."
  },
  {
    "id": "pdf_tpl_282",
    "name": "ChatGPT Persona Instructions Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate ChatGPT instructions to create a persona that will generate responses in a certain style",
    "promptPlaceholder": "Enter your specific context or instructions for ChatGPT Persona Instructions Generator..."
  },
  {
    "id": "pdf_tpl_283",
    "name": "Customer Case Study Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Create case studies that sell!",
    "promptPlaceholder": "Enter your specific context or instructions for Customer Case Study Generator..."
  },
  {
    "id": "pdf_tpl_284",
    "name": "Debate Argument Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate compelling arguments for any debate topic",
    "promptPlaceholder": "Enter your specific context or instructions for Debate Argument Generator..."
  },
  {
    "id": "pdf_tpl_285",
    "name": "Essay Extender",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Extend your essay with relevant content!",
    "promptPlaceholder": "Enter your specific context or instructions for Essay Extender..."
  },
  {
    "id": "pdf_tpl_286",
    "name": "Essay Generator with References",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate well-structured academic essays with proper citations and references!",
    "promptPlaceholder": "Enter your specific context or instructions for Essay Generator with References..."
  },
  {
    "id": "pdf_tpl_287",
    "name": "Essay Intro",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Get an essay introduction in no time!",
    "promptPlaceholder": "Enter your specific context or instructions for Essay Intro..."
  },
  {
    "id": "pdf_tpl_288",
    "name": "Essay Outline",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "BLOG_OUTLINE",
    "icon": "🎓",
    "description": "Get an essay outline in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Essay Outline..."
  },
  {
    "id": "pdf_tpl_289",
    "name": "Essay Title Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate catchy and relevant titles for your essays",
    "promptPlaceholder": "Enter your specific context or instructions for Essay Title Generator..."
  },
  {
    "id": "pdf_tpl_290",
    "name": "FAQ Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate a list of frequently asked questions for your website or app",
    "promptPlaceholder": "Enter your specific context or instructions for FAQ Generator..."
  },
  {
    "id": "pdf_tpl_291",
    "name": "Translate plain text into SQL",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Image Description Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Translate plain text into SQL..."
  },
  {
    "id": "pdf_tpl_292",
    "name": "Introduction Paragraph Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate compelling introductions for your essays, articles, or reports.",
    "promptPlaceholder": "Enter your specific context or instructions for Introduction Paragraph Generator..."
  },
  {
    "id": "pdf_tpl_293",
    "name": "Literature Review Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate a comprehensive literature review based on your research topic",
    "promptPlaceholder": "Enter your specific context or instructions for Literature Review Generator..."
  },
  {
    "id": "pdf_tpl_294",
    "name": "Product Name Generator",
    "category": "TEXT",
    "templateCategory": "Online Courses",
    "format": "ARTICLE_SECTION",
    "icon": "🎓",
    "description": "Generate product names for your business that your customers will love",
    "promptPlaceholder": "Enter your specific context or instructions for Product Name Generator..."
  },
  {
    "id": "pdf_tpl_295",
    "name": "Get quick and reliable answers to any questions",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Research Paper Generator",
    "promptPlaceholder": "Enter your specific context or instructions for Get quick and reliable answers to any questions..."
  },
  {
    "id": "pdf_tpl_296",
    "name": "Research Problem Statement Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate a concise problem statement for your research",
    "promptPlaceholder": "Enter your specific context or instructions for Research Problem Statement Generator..."
  },
  {
    "id": "pdf_tpl_297",
    "name": "Roadmap Generator",
    "category": "MARKETING",
    "templateCategory": "Research & Development",
    "format": "PRODUCT_AD",
    "icon": "🔬",
    "description": "Create a detailed roadmap for your project or product development.",
    "promptPlaceholder": "Enter your specific context or instructions for Roadmap Generator..."
  },
  {
    "id": "pdf_tpl_298",
    "name": "Topic Sentence Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate effective topic sentences for your paragraphs or essays",
    "promptPlaceholder": "Enter your specific context or instructions for Topic Sentence Generator..."
  },
  {
    "id": "pdf_tpl_299",
    "name": "Writing Prompt Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate a prompt for ChatGPT or another AI tool to generate a perfect response for your needs",
    "promptPlaceholder": "Enter your specific context or instructions for Writing Prompt Generator..."
  },
  {
    "id": "pdf_tpl_300",
    "name": "Video Prompt Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "VIDEO_SCRIPT",
    "icon": "🔬",
    "description": "Generate video prompts using camera direction, style, pacing, special effects and more",
    "promptPlaceholder": "Enter your specific context or instructions for Video Prompt Generator..."
  },
  {
    "id": "pdf_tpl_301",
    "name": "Case Converter Tool",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Use our free case converter tool to convert the case of your text.",
    "promptPlaceholder": "Enter your specific context or instructions for Case Converter Tool..."
  },
  {
    "id": "pdf_tpl_302",
    "name": "Contract Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate professional contracts for various business needs",
    "promptPlaceholder": "Enter your specific context or instructions for Contract Generator..."
  },
  {
    "id": "pdf_tpl_303",
    "name": "Investment Policy Statement Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Create a personalized investment policy statement to guide your financial decisions.",
    "promptPlaceholder": "Enter your specific context or instructions for Investment Policy Statement Generator..."
  },
  {
    "id": "pdf_tpl_304",
    "name": "Lead Magnet Generator",
    "category": "MARKETING",
    "templateCategory": "Research & Development",
    "format": "PRODUCT_AD",
    "icon": "🔬",
    "description": "Create compelling magnets to attract and convert potential customers.",
    "promptPlaceholder": "Enter your specific context or instructions for Lead Magnet Generator..."
  },
  {
    "id": "pdf_tpl_305",
    "name": "Legal Document Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate customized legal documents for various purposes",
    "promptPlaceholder": "Enter your specific context or instructions for Legal Document Generator..."
  },
  {
    "id": "pdf_tpl_306",
    "name": "Product Description Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "VIDEO_SCRIPT",
    "icon": "🔬",
    "description": "Create product descriptions that sell!",
    "promptPlaceholder": "Enter your specific context or instructions for Product Description Generator..."
  },
  {
    "id": "pdf_tpl_307",
    "name": "Product Brochure",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Create product brochures that sell!",
    "promptPlaceholder": "Enter your specific context or instructions for Product Brochure..."
  },
  {
    "id": "pdf_tpl_308",
    "name": "Sales Email Generator",
    "category": "MARKETING",
    "templateCategory": "Research & Development",
    "format": "EMAIL_NEWSLETTER",
    "icon": "🔬",
    "description": "Create personalized sales emails to engage potential clients and boost your sales.",
    "promptPlaceholder": "Enter your specific context or instructions for Sales Email Generator..."
  },
  {
    "id": "pdf_tpl_309",
    "name": "Sales Script Creator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "VIDEO_SCRIPT",
    "icon": "🔬",
    "description": "Generate effective sales scripts to close more deals",
    "promptPlaceholder": "Enter your specific context or instructions for Sales Script Creator..."
  },
  {
    "id": "pdf_tpl_310",
    "name": "Sales Pitch Generator",
    "category": "MARKETING",
    "templateCategory": "Research & Development",
    "format": "PRODUCT_AD",
    "icon": "🔬",
    "description": "Create compelling sales pitches to win over potential customers",
    "promptPlaceholder": "Enter your specific context or instructions for Sales Pitch Generator..."
  },
  {
    "id": "pdf_tpl_311",
    "name": "Screenplay Generator",
    "category": "TEXT",
    "templateCategory": "Research & Development",
    "format": "ARTICLE_SECTION",
    "icon": "🔬",
    "description": "Generate professional screenplay content in proper format",
    "promptPlaceholder": "Enter your specific context or instructions for Screenplay Generator..."
  },
  {
    "id": "pdf_tpl_312",
    "name": "Agile User Story Generator",
    "category": "TEXT",
    "templateCategory": "Testimonials & Reviews",
    "format": "BLOG_OUTLINE",
    "icon": "⭐",
    "description": "Get your product features into the hands of users faster with agile user stories",
    "promptPlaceholder": "Enter your specific context or instructions for Agile User Story Generator..."
  },
  {
    "id": "pdf_tpl_313",
    "name": "Discussion Board Response Generator",
    "category": "TEXT",
    "templateCategory": "Testimonials & Reviews",
    "format": "ARTICLE_SECTION",
    "icon": "⭐",
    "description": "Generate high-quality responses for any discussion board topic",
    "promptPlaceholder": "Enter your specific context or instructions for Discussion Board Response Generator..."
  },
  {
    "id": "pdf_tpl_314",
    "name": "Discussion Question Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate engaging discussion questions for any topic",
    "promptPlaceholder": "Enter your specific context or instructions for Discussion Question Generator..."
  },
  {
    "id": "pdf_tpl_315",
    "name": "Feedback Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate constructive feedback for various situations.",
    "promptPlaceholder": "Enter your specific context or instructions for Feedback Generator..."
  },
  {
    "id": "pdf_tpl_316",
    "name": "Letter Of Recommendation Generator",
    "category": "MARKETING",
    "templateCategory": "SALES",
    "format": "EMAIL_NEWSLETTER",
    "icon": "💰",
    "description": "Generate a Letter of Recommendation in Seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Letter Of Recommendation Generator..."
  },
  {
    "id": "pdf_tpl_317",
    "name": "Performance Review Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Make your performance review process easy with our generator!",
    "promptPlaceholder": "Enter your specific context or instructions for Performance Review Generator..."
  },
  {
    "id": "pdf_tpl_318",
    "name": "Peer Review Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate constructive peer reviews for colleagues or team members.",
    "promptPlaceholder": "Enter your specific context or instructions for Peer Review Generator..."
  },
  {
    "id": "pdf_tpl_319",
    "name": "Press Release Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Create Professional Press Releases in Seconds with our Easy-Peasy-to-Use Generator!",
    "promptPlaceholder": "Enter your specific context or instructions for Press Release Generator..."
  },
  {
    "id": "pdf_tpl_320",
    "name": "Review Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate Testimonials & Reviews in Seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Review Generator..."
  },
  {
    "id": "pdf_tpl_321",
    "name": "Review Response Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Write responses to public customer reviews easily!",
    "promptPlaceholder": "Enter your specific context or instructions for Review Response Generator..."
  },
  {
    "id": "pdf_tpl_322",
    "name": "Abstract Generator",
    "category": "TEXT",
    "templateCategory": "AI Everything",
    "format": "ARTICLE_SECTION",
    "icon": "🤖",
    "description": "Generate a concise, professional academic abstract from your research context and highlights.",
    "promptPlaceholder": "Enter your specific context or instructions for Abstract Generator..."
  },
  {
    "id": "pdf_tpl_323",
    "name": "Accounting Solver",
    "category": "TEXT",
    "templateCategory": "AI Everything",
    "format": "ARTICLE_SECTION",
    "icon": "🤖",
    "description": "Solve accounting problems step-by-step with clear explanations. Upload a photo of your accounting",
    "promptPlaceholder": "Enter your specific context or instructions for Accounting Solver..."
  },
  {
    "id": "pdf_tpl_324",
    "name": "AI Tool Creator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Create any AI Tool from a single prompt.",
    "promptPlaceholder": "Enter your specific context or instructions for AI Tool Creator..."
  },
  {
    "id": "pdf_tpl_325",
    "name": "Amazon Product Description (paragraph)",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "VIDEO_SCRIPT",
    "icon": "💰",
    "description": "Create Amazon product descriptions that sell!",
    "promptPlaceholder": "Enter your specific context or instructions for Amazon Product Description (paragraph)..."
  },
  {
    "id": "pdf_tpl_326",
    "name": "Amazon Product Features (bullets)",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Create key features and benefit bullet points for Amazon listings under the \"about this item\" section.",
    "promptPlaceholder": "Enter your specific context or instructions for Amazon Product Features (bullets)..."
  },
  {
    "id": "pdf_tpl_327",
    "name": "Bedtime Story Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "BLOG_OUTLINE",
    "icon": "💰",
    "description": "Generate soothing bedtime stories for kids.",
    "promptPlaceholder": "Enter your specific context or instructions for Bedtime Story Generator..."
  },
  {
    "id": "pdf_tpl_328",
    "name": "Biology Solver",
    "category": "MARKETING",
    "templateCategory": "SALES",
    "format": "SOCIAL_CAPTION",
    "icon": "💰",
    "description": "Solve biology questions with clear, step-by-step explanations. Upload a photo of your biology question or",
    "promptPlaceholder": "Enter your specific context or instructions for Biology Solver..."
  },
  {
    "id": "pdf_tpl_329",
    "name": "Chemistry Problem Solver",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Assist with chemistry problems and provide solutions",
    "promptPlaceholder": "Enter your specific context or instructions for Chemistry Problem Solver..."
  },
  {
    "id": "pdf_tpl_330",
    "name": "Cornell Notes Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate structured Cornell notes in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Cornell Notes Generator..."
  },
  {
    "id": "pdf_tpl_331",
    "name": "Economics Solver",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Solve economics problems step-by-step with clear explanations. Upload a photo of your economics",
    "promptPlaceholder": "Enter your specific context or instructions for Economics Solver..."
  },
  {
    "id": "pdf_tpl_332",
    "name": "help with microeconomics, macroeconomics, graphs, and calculations.",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Etsy Product Description Generator",
    "promptPlaceholder": "Enter your specific context or instructions for help with microeconomics, macroeconomics, graphs, and calculations...."
  },
  {
    "id": "pdf_tpl_333",
    "name": "Event Name Generator",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Generate creative and catchy names for your event",
    "promptPlaceholder": "Enter your specific context or instructions for Event Name Generator..."
  },
  {
    "id": "pdf_tpl_334",
    "name": "Geometry Solver",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Solve geometry problems step-by-step with clear explanations. Upload a photo of your geometry",
    "promptPlaceholder": "Enter your specific context or instructions for Geometry Solver..."
  },
  {
    "id": "pdf_tpl_335",
    "name": "geometry, and proofs.",
    "category": "TEXT",
    "templateCategory": "SALES",
    "format": "ARTICLE_SECTION",
    "icon": "💰",
    "description": "Haiku Generator",
    "promptPlaceholder": "Enter your specific context or instructions for geometry, and proofs...."
  },
  {
    "id": "pdf_tpl_336",
    "name": "History Solver",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "BLOG_OUTLINE",
    "icon": "📱",
    "description": "Answer history questions with clear, structured explanations. Upload a photo of your history question or",
    "promptPlaceholder": "Enter your specific context or instructions for History Solver..."
  },
  {
    "id": "pdf_tpl_337",
    "name": "HTML&CSS Code Generator",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Generate HTML and CSS code snippets with ease.",
    "promptPlaceholder": "Enter your specific context or instructions for HTML&CSS Code Generator..."
  },
  {
    "id": "pdf_tpl_338",
    "name": "Hypothesis Maker",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Generate a hypothesis for your research or project in seconds!",
    "promptPlaceholder": "Enter your specific context or instructions for Hypothesis Maker..."
  },
  {
    "id": "pdf_tpl_339",
    "name": "Java Code Generator",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Generate Java code snippets with ease.",
    "promptPlaceholder": "Enter your specific context or instructions for Java Code Generator..."
  },
  {
    "id": "pdf_tpl_340",
    "name": "Limerick Generator",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Create witty and humorous five-line limericks.",
    "promptPlaceholder": "Enter your specific context or instructions for Limerick Generator..."
  },
  {
    "id": "pdf_tpl_341",
    "name": "Lullaby Generator",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Generate soothing lullabies for kids.",
    "promptPlaceholder": "Enter your specific context or instructions for Lullaby Generator..."
  },
  {
    "id": "pdf_tpl_342",
    "name": "Math Solver",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Easily solve math problems step-by-step with detailed explanations. Upload a photo of your math",
    "promptPlaceholder": "Enter your specific context or instructions for Math Solver..."
  },
  {
    "id": "pdf_tpl_343",
    "name": "accurate math help.",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Physics Solver",
    "promptPlaceholder": "Enter your specific context or instructions for accurate math help...."
  },
  {
    "id": "pdf_tpl_344",
    "name": "mechanics, electricity, waves, and more.",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Recipe Generator",
    "promptPlaceholder": "Enter your specific context or instructions for mechanics, electricity, waves, and more...."
  },
  {
    "id": "pdf_tpl_345",
    "name": "Sonnet Generator",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Create elegant 14-line sonnets in traditional Shakespearean or Petrarchan style.",
    "promptPlaceholder": "Enter your specific context or instructions for Sonnet Generator..."
  },
  {
    "id": "pdf_tpl_346",
    "name": "Statistics Solver",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Solve statistics problems step-by-step with clear explanations. Upload a photo of your statistics question",
    "promptPlaceholder": "Enter your specific context or instructions for Statistics Solver..."
  },
  {
    "id": "pdf_tpl_347",
    "name": "statistics concepts, calculations, and data analysis.",
    "category": "TEXT",
    "templateCategory": "Social Media",
    "format": "ARTICLE_SECTION",
    "icon": "📱",
    "description": "Thesis Statement Generator",
    "promptPlaceholder": "Enter your specific context or instructions for statistics concepts, calculations, and data analysis...."
  },
  {
    "id": "pdf_tpl_348",
    "name": "A I    P l a t f o r m    f o r    C o n t e n t",
    "category": "TEXT",
    "templateCategory": "Writing",
    "format": "ARTICLE_SECTION",
    "icon": "📝",
    "description": "[ ask zunme ]",
    "promptPlaceholder": "Enter your specific context or instructions for A I    P l a t f o r m    f o r    C o n t e n t..."
  },
  {
    "id": "pdf_tpl_349",
    "name": "AI SEO Marketing     Business     Make AI Work",
    "category": "TEXT",
    "templateCategory": "Writing",
    "format": "ARTICLE_SECTION",
    "icon": "📝",
    "description": "Privacy     Settings",
    "promptPlaceholder": "Enter your specific context or instructions for AI SEO Marketing     Business     Make AI Work..."
  },
  {
    "id": "pdf_tpl_350",
    "name": "result to use the content in their projects.",
    "category": "TEXT",
    "templateCategory": "Writing",
    "format": "ARTICLE_SECTION",
    "icon": "📝",
    "description": "Members will have access to exclusive content, images, audio, videos from “VERIFIED Content Builders”",
    "promptPlaceholder": "Enter your specific context or instructions for result to use the content in their projects...."
  },
  {
    "id": "pdf_tpl_351",
    "name": "service rights ]",
    "category": "TEXT",
    "templateCategory": "Writing",
    "format": "ARTICLE_SECTION",
    "icon": "📝",
    "description": "I want this platform to be able to “Integrate” with all AI platforms if that’s possible. I want our content on",
    "promptPlaceholder": "Enter your specific context or instructions for service rights ]..."
  },
  {
    "id": "pdf_tpl_352",
    "name": "this platform to be the first option for AI Content.",
    "category": "TEXT",
    "templateCategory": "Writing",
    "format": "ARTICLE_SECTION",
    "icon": "📝",
    "description": "https://en.wikipedia.org/wiki/Alphabet_Inc.",
    "promptPlaceholder": "Enter your specific context or instructions for this platform to be the first option for AI Content...."
  },
  {
    "id": "pdf_tpl_353",
    "name": "Holistic Daily Routine & Circadian Health Guide",
    "category": "TEXT",
    "templateCategory": "Health & Wellness",
    "format": "ARTICLE_SECTION",
    "icon": "🌿",
    "description": "Evidence-backed daily circadian health routines, hydration protocols, and energy management.",
    "promptPlaceholder": "Enter your target schedule and wellness goals..."
  },
  {
    "id": "pdf_tpl_354",
    "name": "Nutritional Meal Prep & Calorie Matrix Guide",
    "category": "TEXT",
    "templateCategory": "Health & Wellness",
    "format": "BLOG_OUTLINE",
    "icon": "🥑",
    "description": "Balanced macronutrient breakdown, weekly shopping list, and meal prep schedules.",
    "promptPlaceholder": "Enter your dietary preferences (vegan, keto, high protein)..."
  },
  {
    "id": "pdf_tpl_355",
    "name": "Customer Testimonial & Case Study Framework",
    "category": "MARKETING",
    "templateCategory": "Testimonials & Reviews",
    "format": "BLOG_OUTLINE",
    "icon": "⭐",
    "description": "Extract transformative before-and-after customer stories with quantified ROI metrics.",
    "promptPlaceholder": "Enter customer name, problem solved, and quantitative ROI result..."
  },
  {
    "id": "pdf_tpl_356",
    "name": "Automated 5-Star Review Request Email Template",
    "category": "MARKETING",
    "templateCategory": "Testimonials & Reviews",
    "format": "EMAIL_NEWSLETTER",
    "icon": "⭐",
    "description": "Post-purchase review request email asking satisfied customers to share feedback on Google and Trustpilot.",
    "promptPlaceholder": "Enter product name and review platform link..."
  }
];
