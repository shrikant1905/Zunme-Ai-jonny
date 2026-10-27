import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Search,
  PenTool,
  Package,
  Bookmark,
  Clock,
  CreditCard,
  Settings,
  LifeBuoy,
  Sparkles,
  SearchCheck,
  Briefcase,
  Megaphone,
  Share2,
  Plus,
  Menu,
  X,
  LogOut,
  Trash2,
  ChevronDown,
  ArrowLeft,
  BarChart2,
  Target,
  DollarSign,
  Eye,
  Award,
  Users,
  Calendar,
  LayoutDashboard,
  ShoppingBag,
  Store,
  Mail,
  ShieldCheck,
  Layers,
  Film,
  Smile,
  Image as ImageIcon,
  Video,
  Bot,
  Globe,
  FileSpreadsheet,
  Code
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationBell } from '../common/NotificationBell';
import { EcosystemAppsLauncher } from './EcosystemAppsLauncher';
import './AppShell.css';
import './SuperAdminShell.css';

export const AppShell: React.FC = () => {
  const {
    user,
    logout,
    conversations,
    activeConversationId,
    selectConversation,
    createNewChat,
    deleteConversation
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const handleNewChatClick = () => {
    createNewChat();
    navigate('/user/chat');
    setMobileMenuOpen(false);
  };

  const handleSelectConv = (id: string) => {
    selectConversation(id);
    navigate('/user/chat');
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Allow public access to store, shop, and merchant zone
  const isPublicRoute =
    location.pathname.startsWith('/store') ||
    location.pathname.startsWith('/shop') ||
    location.pathname.startsWith('/merchant-zone') ||
    location.pathname.startsWith('/merchant');

  if (!user && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  const displayName = (user?.fullName || 'Guest').replace(/\s*\([^)]*\)/g, '').trim();

  return (
    <div className="app-shell">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`app-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        {location.pathname.startsWith('/store') || location.pathname.startsWith('/shop') ? (
          /* ============================================================ */
          /* ZUNME STORE & SHOP DEDICATED PUBLIC SIDEBAR                   */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/store" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)' }}>
                  <Store size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Store</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#A5B4FC', letterSpacing: '0.06em' }}>DIGITAL SHOP</div>
                </div>
              </NavLink>
              <button
                className="btn-ghost hide-on-desktop"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="sidebar-nav-list" aria-label="Store Navigation">
              <NavLink
                to="/store"
                end
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag size={17} />
                <span>All Assets</span>
              </NavLink>

              <div className="sidebar-nav-section-title">CATEGORIES</div>

              <NavLink
                to="/store/AI%20Content"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={17} />
                <span>AI Content</span>
              </NavLink>

              <NavLink
                to="/store/Animation"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Film size={17} />
                <span>Animation</span>
              </NavLink>

              <NavLink
                to="/store/Cartoon"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Smile size={17} />
                <span>Cartoon</span>
              </NavLink>

              <NavLink
                to="/store/Images%20%2F%20Photos"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ImageIcon size={17} />
                <span>Images / Photos</span>
              </NavLink>

              <NavLink
                to="/store/Videos%20%2F%20AI%20Videos"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Video size={17} />
                <span>Videos / AI Videos</span>
              </NavLink>

              <NavLink
                to="/store/AI%20Builder"
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bot size={17} />
                <span>AI Builder</span>
              </NavLink>

              <div className="sidebar-nav-section-title">ECOSYSTEM</div>

              <NavLink
                to="/merchant-zone"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Layers size={17} />
                <span>Merchant Zone</span>
              </NavLink>

              <NavLink
                to="/"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Globe size={17} />
                <span>Return to Home</span>
              </NavLink>
            </nav>
          </>
        ) : location.pathname.startsWith('/zbox') ? (
          /* ============================================================ */
          /* ZBOX COMMUNICATIONS & MVP DEDICATED SIDEBAR                  */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/zbox" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}>
                  <Mail size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>zBox Hub</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#7DD3FC', letterSpacing: '0.06em' }}>SECURED EMAIL &amp; MVP</div>
                </div>
              </NavLink>
              <button
                className="btn-ghost hide-on-desktop"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="sidebar-nav-list" aria-label="zBox Navigation">
              <NavLink
                to="/zbox"
                end
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={17} />
                <span>Inbox &amp; Webmail</span>
              </NavLink>

              <div className="sidebar-nav-section-title">MVP SYNDICATION</div>

              <NavLink
                to="/zbox?tab=sharing"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Share2 size={17} />
                <span>Most Visited Platforms</span>
              </NavLink>

              <NavLink
                to="/zbox?tab=secured-plans"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShieldCheck size={17} />
                <span>Secured Privacy Vault</span>
              </NavLink>

              <div className="sidebar-nav-section-title">ECOSYSTEM</div>

              <NavLink
                to="/"
                className="sidebar-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Globe size={17} />
                <span>Return to Home</span>
              </NavLink>
            </nav>
          </>
        ) : location.pathname.startsWith('/ads') ? (
          /* ============================================================ */
          /* ZUNME ADS PLATFORM DEDICATED SIDEBAR                         */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/ads" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #6E56CF 100%)' }}>
                  <Megaphone size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Ads</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#C4B5FD', letterSpacing: '0.06em' }}>ADS PLATFORM</div>
                </div>
              </NavLink>
              <button
                className="btn-ghost hide-on-desktop"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>


            <nav className="sidebar-nav-list" aria-label="Ads Navigation">
              <NavLink
                to="/ads/overview"
                className={() => `sidebar-nav-item ${location.pathname === '/ads' || location.pathname === '/ads/dashboard' || location.pathname === '/ads/overview' || (location.pathname.startsWith('/ads') && location.search.includes('Overview')) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard size={17} />
                <span>Ads Overview</span>
              </NavLink>

              <NavLink
                to="/ads/campaigns"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/campaigns' || location.search.includes('Campaigns') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Target size={17} />
                <span>All Campaigns</span>
              </NavLink>

              <NavLink
                to="/ads/create-campaign"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/create-campaign' || location.pathname === '/ads/create' || location.search.includes('Create') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus size={17} />
                <span>Create Campaign</span>
              </NavLink>

              <NavLink
                to="/ads/onboarding"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/onboarding' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShieldCheck size={17} />
                <span>7-Step Onboarding</span>
              </NavLink>

              <NavLink
                to="/ads/formats"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/formats' || location.pathname === '/ads/format-builders' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Layers size={17} />
                <span>Format Builders</span>
              </NavLink>

              <NavLink
                to="/ads/keyword-bidding"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/keyword-bidding' || location.pathname === '/ads/bidding' || location.search.includes('Bidding') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <DollarSign size={17} />
                <span>Keyword Bidding</span>
              </NavLink>

              <NavLink
                to="/ads/ad-placements"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/ad-placements' || location.pathname === '/ads/placements' || location.search.includes('Placements') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Eye size={17} />
                <span>Ad Placements</span>
              </NavLink>

              <NavLink
                to="/ads/creator-monetization"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/creator-monetization' || location.pathname === '/ads/monetization' || location.search.includes('Monetization') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Award size={17} />
                <span>Creator Monetization</span>
              </NavLink>

              <NavLink
                to="/ads/billing"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/billing' || location.search.includes('Billing') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CreditCard size={17} />
                <span>Billing & Wallet</span>
              </NavLink>

              <NavLink
                to="/ads/settings"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/settings' || location.search.includes('Settings') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={17} />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/ads/support"
                className={() => `sidebar-nav-item ${location.pathname === '/ads/support' || location.search.includes('Support') || location.search.includes('Help') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LifeBuoy size={17} />
                <span>Help & Support</span>
              </NavLink>
            </nav>


          </>
        ) : location.pathname.startsWith('/business') ? (
          /* ============================================================ */
          /* BUSINESS & CRM WORKSPACE DEDICATED SIDEBAR                   */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/business/overview" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
                  <Briefcase size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Business</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#34D399', letterSpacing: '0.06em' }}>BUSINESS & CRM</div>
                </div>
              </NavLink>
              <button
                className="btn-ghost hide-on-desktop"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="sidebar-new-chat-box">
              <NavLink
                to="/business/crm"
                className="btn-new-chat"
                style={{ background: '#059669', color: '#FFFFFF', textDecoration: 'none' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={16} />
                <span>Deep CRM Sync</span>
              </NavLink>
            </div>

            <nav className="sidebar-nav-list" aria-label="Business Navigation">
              <NavLink
                to="/business/overview"
                className={() => `sidebar-nav-item ${location.pathname === '/business' || location.pathname === '/business/dashboard' || location.pathname === '/business/overview' || (location.pathname.startsWith('/business') && (!location.search || location.search.includes('Overview'))) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard size={17} />
                <span>Business Overview</span>
              </NavLink>

              <NavLink
                to="/business/brand-profile"
                className={() => `sidebar-nav-item ${location.pathname === '/business/brand-profile' || location.search.includes('Brand') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Award size={17} />
                <span>Brand Profile</span>
              </NavLink>

              <NavLink
                to="/business/projects"
                className={() => `sidebar-nav-item ${location.pathname === '/business/projects' || location.search.includes('Projects') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={17} />
                <span>Projects & Goals</span>
              </NavLink>

              <NavLink
                to="/business/calendar"
                className={() => `sidebar-nav-item ${location.pathname === '/business/calendar' || location.search.includes('Calendar') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar size={17} />
                <span>Content Calendar</span>
              </NavLink>

              <NavLink
                to="/business/marketing"
                className={() => `sidebar-nav-item ${location.pathname === '/business/marketing' || location.search.includes('Marketing') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <PenTool size={17} />
                <span>Marketing Content</span>
              </NavLink>

              <NavLink
                to="/business/crm"
                className={() => `sidebar-nav-item ${location.pathname === '/business/crm' || location.search.includes('CRM') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={17} />
                <span>nErgy CRM Deep Sync</span>
              </NavLink>

              <NavLink
                to="/business/team"
                className={() => `sidebar-nav-item ${location.pathname === '/business/team' || location.search.includes('Team') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users size={17} />
                <span>Team & Access</span>
              </NavLink>

              <NavLink
                to="/business/settings"
                className={() => `sidebar-nav-item ${location.pathname === '/business/settings' || location.search.includes('Settings') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={17} />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/business/support"
                className={() => `sidebar-nav-item ${location.pathname === '/business/support' || location.search.includes('Support') || location.search.includes('Help') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LifeBuoy size={17} />
                <span>Help & Support</span>
              </NavLink>
            </nav>


          </>
        ) : location.pathname.startsWith('/social') ? (
          /* ============================================================ */
          /* SOCIAL INTEGRATIONS & CONTENT SCHEDULER SIDEBAR              */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/social/calendar" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-icon-box" style={{ background: 'linear-gradient(135deg, #6E56CF 0%, #4338CA 100%)' }}>
                  <Share2 size={16} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2' }}>Zunme Social</div>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: '#C4B5FD', letterSpacing: '0.06em' }}>CONTENT SCHEDULER</div>
                </div>
              </NavLink>
              <button
                className="btn-ghost hide-on-desktop"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="sidebar-new-chat-box">
              <button
                type="button"
                className="btn-new-chat"
                style={{ background: '#6E56CF', color: '#FFFFFF', border: 'none', cursor: 'pointer', width: '100%', textDecoration: 'none' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/social/calendar?compose=true');
                  window.dispatchEvent(new CustomEvent('open-social-composer'));
                }}
              >
                <Plus size={16} />
                <span>Schedule Post</span>
              </button>
            </div>

            <nav className="sidebar-nav-list" aria-label="Social Navigation">
              <NavLink
                to="/social/calendar"
                className={() => `sidebar-nav-item ${location.pathname === '/social' || location.pathname === '/social/dashboard' || location.pathname === '/social/calendar' || location.search.includes('tab=calendar') ? 'active' : ''}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('switch-social-tab', { detail: 'calendar' }));
                }}
              >
                <Calendar size={17} />
                <span>Calendar & Scheduler</span>
              </NavLink>

              <NavLink
                to="/social/queue"
                className={() => `sidebar-nav-item ${location.pathname === '/social/queue' || location.search.includes('tab=queue') ? 'active' : ''}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('switch-social-tab', { detail: 'queue' }));
                }}
              >
                <Clock size={17} />
                <span>Publishing Queue</span>
              </NavLink>

              <NavLink
                to="/social/channels"
                className={() => `sidebar-nav-item ${location.pathname === '/social/channels' || location.pathname === '/social/accounts' || location.search.includes('tab=accounts') ? 'active' : ''}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('switch-social-tab', { detail: 'accounts' }));
                }}
              >
                <Share2 size={17} />
                <span>Connected Channels</span>
              </NavLink>

              <NavLink
                to="/social/settings"
                className={() => `sidebar-nav-item ${location.pathname === '/social/settings' || location.search.includes('tab=settings') ? 'active' : ''}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('switch-social-tab', { detail: 'settings' }));
                }}
              >
                <Settings size={17} />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/social/support"
                className={() => `sidebar-nav-item ${location.pathname === '/social/support' || location.search.includes('tab=support') ? 'active' : ''}`}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('switch-social-tab', { detail: 'support' }));
                }}
              >
                <LifeBuoy size={17} />
                <span>Help & Support</span>
              </NavLink>
            </nav>


          </>
        ) : (
          /* ============================================================ */
          /* GENERAL USER AI WORKSPACE SIDEBAR                            */
          /* ============================================================ */
          <>
            <div className="sidebar-brand-section">
              <NavLink to="/app" className="brand-link" onClick={() => setMobileMenuOpen(false)}>
                <img src="/zunme_logo_white.png" alt="Zunme AI" style={{ height: '32px', width: 'auto', display: 'block' }} />
              </NavLink>
              <button
                className="btn-ghost hide-on-desktop"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* New Chat Primary Button */}
            <div className="sidebar-new-chat-box">
              <button className="btn-new-chat" onClick={handleNewChatClick}>
                <Plus size={16} />
                <span>New Chat</span>
              </button>
            </div>

            {/* Core Navigation Links */}
            <nav className="sidebar-nav-list" aria-label="Main Navigation">
              <NavLink
                to="/user/home"
                className={() => `sidebar-nav-item ${location.pathname === '/user' || location.pathname === '/user/home' || location.pathname === '/user/dashboard' || location.pathname === '/app' || location.pathname === '/app/home' || location.pathname === '/app/dashboard' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home size={17} />
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/user/chat"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/chat' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare size={17} />
                <span>Ask Zunme</span>
              </NavLink>

              <NavLink
                to="/user/search"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/search' || location.pathname.startsWith('/search') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search size={17} />
                <span>Web Search</span>
              </NavLink>

              <NavLink
                to="/user/builders"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/builders' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <PenTool size={17} />
                <span>AI Content Builders</span>
              </NavLink>

              <NavLink
                to="/warehouse/dashboard"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/warehouse') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package size={17} />
                <span>AI Warehouse</span>
              </NavLink>

              <NavLink
                to="/creator/marketplace"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/creator') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={17} />
                <span>Creator Marketplace</span>
              </NavLink>

              <NavLink
                to="/user/library"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/library' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bookmark size={17} />
                <span>My Library</span>
              </NavLink>

              <NavLink
                to="/user/spreadsheets"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/spreadsheets' || location.pathname === '/spreadsheets' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={17} />
                <span>Data & Spreadsheets</span>
              </NavLink>

              <NavLink
                to="/user/agents"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/agents' || location.pathname === '/agents' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bot size={17} />
                <span>Zunme AI Agents</span>
              </NavLink>

              <NavLink
                to="/user/coding"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/coding' || location.pathname === '/coding' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Code size={17} />
                <span>Coding &amp; Git Studio</span>
              </NavLink>

              <NavLink
                to="/user/animation"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/animation' || location.pathname === '/animation' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Film size={17} />
                <span>Animation &amp; Characters</span>
              </NavLink>

              <NavLink
                to="/store"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/store') || location.pathname.startsWith('/shop') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag size={17} />
                <span>Zunme Store</span>
              </NavLink>

              <NavLink
                to="/merchant-zone"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/merchant-zone') || location.pathname.startsWith('/merchant') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Store size={17} />
                <span>Merchant Zone</span>
              </NavLink>

              <NavLink
                to="/zbox"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/zbox') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Mail size={17} />
                <span>zBox Mail &amp; Share</span>
              </NavLink>

              <NavLink
                to="/seo/crawler"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/seo') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <SearchCheck size={17} />
                <span>SEO &amp; Web Crawler</span>
              </NavLink>

              <NavLink
                to="/user/mvp"
                className={() => `sidebar-nav-item ${location.pathname.startsWith('/user/mvp') || location.pathname.startsWith('/mvp') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Layers size={17} />
                <span>MVP Platform Suite</span>
              </NavLink>

              <NavLink
                to="/user/history"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/history' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Clock size={17} />
                <span>History</span>
              </NavLink>

              <NavLink
                to="/user/usage"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/usage' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CreditCard size={17} />
                <span>Usage & Plan</span>
              </NavLink>

              <NavLink
                to="/user/settings"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/settings' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings size={17} />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/user/support"
                className={({ isActive }) => `sidebar-nav-item ${isActive || location.pathname === '/app/support' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <LifeBuoy size={17} />
                <span>Help & Support</span>
              </NavLink>
            </nav>
          </>
        )}

        {/* Sidebar Footer with Logout at the Very Bottom */}
        <div className="sidebar-footer">
          <button
            className="superadmin-logout-btn"
            onClick={handleLogout}
            title="Sign Out"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: '600',
              color: '#F87171',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease',
              marginTop: '4px'
            }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header Bar */}
        <header className="app-topbar">
          <div className="topbar-left">
            <button
              className="btn-ghost hide-on-desktop"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{ padding: '6px' }}
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="topbar-right">
            <EcosystemAppsLauncher variant="light" />
            {user && <NotificationBell />}
            {user && (
              <div className="superadmin-profile-menu-wrap" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="superadmin-topbar-profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                  title="Account Menu"
                >
                  <div className="superadmin-topbar-avatar" style={{ background: 'linear-gradient(135deg, #10B981 0%, #6E56CF 100%)' }}>
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className={`dropdown-chevron ${profileDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div
                      className="superadmin-dropdown-backdrop"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    />
                    <div className="superadmin-profile-dropdown" style={{ zIndex: 100 }}>
                      <div className="dropdown-user-header">
                        <div className="dropdown-avatar" style={{ background: 'linear-gradient(135deg, #10B981 0%, #6E56CF 100%)' }}>
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="dropdown-user-details">
                          <span className="dropdown-name">{displayName}</span>
                          <span className="dropdown-email">{user.email || 'user@zunme.ai'}</span>
                          <span className="dropdown-role-tag" style={{ color: '#059669', background: '#ECFDF5' }}>
                            {user.role === 'SUPER_ADMIN' ? 'Super Administrator' : user.role === 'ADMIN' ? 'Platform Administrator' : 'Verified Member'}
                          </span>
                        </div>
                      </div>
                      <div className="dropdown-divider" />
                      <button
                        type="button"
                        className="dropdown-item dropdown-logout-btn"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                      >
                        <LogOut size={15} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Canvas Body for Routed Screens */}
        <main className="app-canvas-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
