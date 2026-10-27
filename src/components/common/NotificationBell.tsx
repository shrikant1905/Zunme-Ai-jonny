import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  X,
  ShieldAlert,
  TrendingUp,
  Users,
  Megaphone,
  Briefcase,
  Share2,
  SearchCheck,
  Sparkles,
  Package,
  Clock,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Info,
  Folder,
  Layers,
  Award,
  Zap,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './NotificationBell.css';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: string;
  time: string;
  isRead: boolean;
  priority?: 'high' | 'normal' | 'low';
  iconType?: string;
}

const getContextMeta = (role?: string, pathname: string = '') => {
  if (role === 'SUPER_ADMIN' || pathname.startsWith('/super-admin')) {
    return {
      label: 'Super Admin Alerts',
      badgeColor: '#8B5CF6',
      badgeBg: '#F3F0FF',
      notifications: [
        {
          id: 'sa-1',
          title: 'Platform Security Event',
          message: 'Unusual rapid login attempt blocked from IP 192.168.1.104 by automated firewall.',
          category: 'Security',
          time: '4m ago',
          isRead: false,
          priority: 'high',
          iconType: 'security'
        },
        {
          id: 'sa-2',
          title: 'MRR Milestone Achieved',
          message: 'Monthly recurring revenue reached $15,294 (+14.2% MoM run-rate target).',
          category: 'Revenue',
          time: '25m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'revenue'
        },
        {
          id: 'sa-3',
          title: 'Cluster Telemetry Healthy',
          message: 'Platform node uptime is 99.98% across all active inference clusters.',
          category: 'Telemetry',
          time: '1h ago',
          isRead: false,
          priority: 'low',
          iconType: 'telemetry'
        },
        {
          id: 'sa-4',
          title: 'Administrative Policy Update',
          message: 'Global rate-limits for enterprise tier adjusted by root administrator.',
          category: 'Governance',
          time: '3h ago',
          isRead: true,
          priority: 'normal',
          iconType: 'audit'
        },
        {
          id: 'sa-5',
          title: 'New Enterprise Subscriber',
          message: 'Organization #842 upgraded to Enterprise Unlimited Annual Tier.',
          category: 'Billing',
          time: '5h ago',
          isRead: true,
          priority: 'normal',
          iconType: 'user'
        }
      ] as NotificationItem[]
    };
  }

  if (role === 'ADMIN' || pathname.startsWith('/admin')) {
    return {
      label: 'Operations Hub Alerts',
      badgeColor: '#635BFF',
      badgeBg: '#EEF2FF',
      notifications: [
        {
          id: 'adm-1',
          title: 'New Blueprint in Queue',
          message: 'Prompt pack "B2B SaaS Cold Outreach Sequence" submitted and awaiting editorial review.',
          category: 'Review',
          time: '2m ago',
          isRead: false,
          priority: 'high',
          iconType: 'review'
        },
        {
          id: 'adm-2',
          title: 'Support Ticket Escalated',
          message: 'Support inquiry #4289 escalated to Level 2 technical engineering team.',
          category: 'Support',
          time: '18m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'support'
        },
        {
          id: 'adm-3',
          title: 'AI Model Latency Optimized',
          message: 'Gemini 2.5 Pro endpoint latency normalized to 180ms p95 response time.',
          category: 'Infrastructure',
          time: '45m ago',
          isRead: false,
          priority: 'low',
          iconType: 'telemetry'
        },
        {
          id: 'adm-4',
          title: 'Warehouse Catalog Updated',
          message: '3 verified community templates approved and published to AI Warehouse.',
          category: 'Warehouse',
          time: '2h ago',
          isRead: true,
          priority: 'normal',
          iconType: 'warehouse'
        },
        {
          id: 'adm-5',
          title: 'Webhook Sync Verified',
          message: 'Stripe and CRM webhook queues synchronized with 100% success rate.',
          category: 'Integrations',
          time: '4h ago',
          isRead: true,
          priority: 'low',
          iconType: 'integration'
        }
      ] as NotificationItem[]
    };
  }

  if (pathname.startsWith('/ads')) {
    return {
      label: 'Ads Platform Alerts',
      badgeColor: '#A855F7',
      badgeBg: '#FAF5FF',
      notifications: [
        {
          id: 'ads-1',
          title: 'Campaign Milestone Reached',
          message: 'Campaign "Q4 Growth Hack" exceeded 10,000 verified impressions.',
          category: 'Campaigns',
          time: '6m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'ads'
        },
        {
          id: 'ads-2',
          title: 'Keyword Bid Won',
          message: 'Keyword "AI Automation Software" secured #1 sponsored placement (CPC $1.42).',
          category: 'Bidding',
          time: '32m ago',
          isRead: false,
          priority: 'high',
          iconType: 'revenue'
        },
        {
          id: 'ads-3',
          title: 'Wallet Balance Runway',
          message: 'Ad wallet current balance: $3,450.00 (estimated 18 days active runway).',
          category: 'Wallet',
          time: '2h ago',
          isRead: false,
          priority: 'normal',
          iconType: 'billing'
        },
        {
          id: 'ads-4',
          title: 'Creator Monetization Credit',
          message: 'Creator revenue share disbursed for high-CTR sponsored prompt placements.',
          category: 'Monetization',
          time: '5h ago',
          isRead: true,
          priority: 'low',
          iconType: 'creator'
        }
      ] as NotificationItem[]
    };
  }

  if (pathname.startsWith('/business')) {
    return {
      label: 'Business & CRM Alerts',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      notifications: [
        {
          id: 'biz-1',
          title: 'Deep CRM Sync Completed',
          message: 'nErgy CRM sync finished: 48 new qualified enterprise leads refreshed.',
          category: 'CRM Sync',
          time: '5m ago',
          isRead: false,
          priority: 'high',
          iconType: 'crm'
        },
        {
          id: 'biz-2',
          title: 'Quarterly Goal Progress',
          message: 'Q4 Content Marketing campaign reached 78% of lead generation target.',
          category: 'Goals',
          time: '40m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'goals'
        },
        {
          id: 'biz-3',
          title: 'Team Member Joined',
          message: 'Sarah Chen accepted team invitation with Marketing Editor permissions.',
          category: 'Team',
          time: '1h ago',
          isRead: true,
          priority: 'normal',
          iconType: 'team'
        },
        {
          id: 'biz-4',
          title: 'Brand Tone Guidelines Synced',
          message: 'Executive brand voice index refreshed across marketing content builders.',
          category: 'Brand',
          time: '3h ago',
          isRead: true,
          priority: 'low',
          iconType: 'brand'
        }
      ] as NotificationItem[]
    };
  }

  if (pathname.startsWith('/social')) {
    return {
      label: 'Social Scheduler Alerts',
      badgeColor: '#6E56CF',
      badgeBg: '#F3F0FF',
      notifications: [
        {
          id: 'soc-1',
          title: 'Scheduled Post Published',
          message: 'LinkedIn carousel "5 AI Content Trends" published successfully on schedule.',
          category: 'Publishing',
          time: '8m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'social'
        },
        {
          id: 'soc-2',
          title: 'Queue Distribution Ready',
          message: 'Publishing queue has 4 automated posts scheduled for distribution tomorrow.',
          category: 'Queue',
          time: '50m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'queue'
        },
        {
          id: 'soc-3',
          title: 'Channel Auth Active',
          message: 'Twitter / X and LinkedIn account authentication tokens refreshed.',
          category: 'Channels',
          time: '2h ago',
          isRead: true,
          priority: 'low',
          iconType: 'channel'
        }
      ] as NotificationItem[]
    };
  }

  if (pathname.startsWith('/seo')) {
    return {
      label: 'SEO Workspace Alerts',
      badgeColor: '#8B5CF6',
      badgeBg: '#F3F0FF',
      notifications: [
        {
          id: 'seo-1',
          title: 'SERP Movement Alert',
          message: 'Keyword "enterprise ai tools" climbed +4 spots to #3 on Google Search.',
          category: 'Rankings',
          time: '10m ago',
          isRead: false,
          priority: 'high',
          iconType: 'seo'
        },
        {
          id: 'seo-2',
          title: 'Technical Audit Finished',
          message: 'Site crawl complete — Overall Technical Health Score is 94/100.',
          category: 'Audit',
          time: '1h ago',
          isRead: false,
          priority: 'normal',
          iconType: 'audit'
        },
        {
          id: 'seo-3',
          title: 'Content Brief Synthesized',
          message: 'Semantic brief generated for "AI Citation Grounding" with schema markup.',
          category: 'Planner',
          time: '3h ago',
          isRead: true,
          priority: 'low',
          iconType: 'content'
        }
      ] as NotificationItem[]
    };
  }

  if (pathname.startsWith('/creator')) {
    return {
      label: 'Creator Studio Alerts',
      badgeColor: '#EC4899',
      badgeBg: '#FDF2F8',
      notifications: [
        {
          id: 'cre-1',
          title: 'Blueprint Approved',
          message: 'Your workflow "Viral YouTube Hook Architecture" has been approved by admin!',
          category: 'Submissions',
          time: '12m ago',
          isRead: false,
          priority: 'high',
          iconType: 'creator'
        },
        {
          id: 'cre-2',
          title: 'Community Royalty Payout',
          message: '$420.00 royalty payout sent to your connected account for downloads.',
          category: 'Earnings',
          time: '45m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'revenue'
        },
        {
          id: 'cre-3',
          title: '5-Star Review Received',
          message: 'Elena Rostova rated your prompt pack 5/5: "Transformed our outbound pipeline!"',
          category: 'Reviews',
          time: '2h ago',
          isRead: true,
          priority: 'low',
          iconType: 'review'
        }
      ] as NotificationItem[]
    };
  }

  if (pathname.startsWith('/warehouse')) {
    return {
      label: 'AI Warehouse Alerts',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7',
      notifications: [
        {
          id: 'wh-1',
          title: 'Storage Utilization',
          message: 'Storage utilization: 1.20 GB used of 10.00 GB high-speed SSD quota (12%).',
          category: 'Storage',
          time: '15m ago',
          isRead: false,
          priority: 'normal',
          iconType: 'warehouse'
        },
        {
          id: 'wh-2',
          title: 'Collection Updated',
          message: '2 new workflow templates organized into "Client Pitches" collection.',
          category: 'Collections',
          time: '1h ago',
          isRead: false,
          priority: 'low',
          iconType: 'collections'
        },
        {
          id: 'wh-3',
          title: 'Asset Download Metric',
          message: 'Your saved asset "Q4 Launch Kit" was downloaded 42 times this week.',
          category: 'Downloads',
          time: '4h ago',
          isRead: true,
          priority: 'low',
          iconType: 'downloads'
        }
      ] as NotificationItem[]
    };
  }

  // General / Core User Workspace default (/user/* or /app/*)
  return {
    label: 'User Workspace Alerts',
    badgeColor: '#0EA5E9',
    badgeBg: '#F0F9FF',
    notifications: [
      {
        id: 'usr-1',
        title: 'Research Synthesis Ready',
        message: 'Ask Zunme synthesized your deep research topic with 6 live verifiable citations.',
        category: 'Ask Zunme',
        time: '3m ago',
        isRead: false,
        priority: 'high',
        iconType: 'chat'
      },
      {
        id: 'usr-2',
        title: 'Saved to My Library',
        message: '3 authoritative citation links bookmarked to your personal library.',
        category: 'Library',
        time: '30m ago',
        isRead: false,
        priority: 'normal',
        iconType: 'library'
      },
      {
        id: 'usr-3',
        title: 'Token Quota Update',
        message: 'Monthly plan usage: 24% used — 15,200 tokens remaining until cycle renewal.',
        category: 'Usage',
        time: '2h ago',
        isRead: true,
        priority: 'low',
        iconType: 'usage'
      },
      {
        id: 'usr-4',
        title: 'Gemini 2.5 Pro Active',
        message: 'Live Citation Grounding Engine updated with high-speed domain verification.',
        category: 'Updates',
        time: '5h ago',
        isRead: true,
        priority: 'low',
        iconType: 'updates'
      }
    ] as NotificationItem[]
  };
};

const renderNotificationIcon = (iconType?: string, category?: string) => {
  switch (iconType) {
    case 'security':
      return <ShieldAlert size={16} color="#EF4444" />;
    case 'revenue':
    case 'earnings':
      return <TrendingUp size={16} color="#10B981" />;
    case 'telemetry':
      return <Zap size={16} color="#8B5CF6" />;
    case 'audit':
      return <Clock size={16} color="#6366F1" />;
    case 'user':
    case 'team':
      return <Users size={16} color="#3B82F6" />;
    case 'review':
    case 'creator':
      return <Award size={16} color="#EC4899" />;
    case 'support':
      return <Info size={16} color="#F59E0B" />;
    case 'warehouse':
    case 'storage':
    case 'collections':
      return <Package size={16} color="#D97706" />;
    case 'ads':
      return <Megaphone size={16} color="#A855F7" />;
    case 'crm':
      return <Briefcase size={16} color="#059669" />;
    case 'social':
    case 'queue':
      return <Share2 size={16} color="#6E56CF" />;
    case 'seo':
      return <SearchCheck size={16} color="#7C3AED" />;
    case 'chat':
      return <Sparkles size={16} color="#0EA5E9" />;
    case 'library':
      return <Bookmark size={16} color="#6366F1" />;
    case 'billing':
    case 'usage':
      return <CreditCard size={16} color="#0284C7" />;
    default:
      return <Bell size={16} color="#6E56CF" />;
  }
};

export const NotificationBell: React.FC = () => {
  const { user } = useApp();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute context meta based on current role and pathname
  const contextMeta = useMemo(() => {
    return getContextMeta(user?.role, location.pathname);
  }, [user?.role, location.pathname]);

  // Notifications state initialized per context
  const [notifications, setNotifications] = useState<NotificationItem[]>(contextMeta.notifications);

  // When contextMeta changes (e.g., navigating between dashboards), update list
  useEffect(() => {
    setNotifications(contextMeta.notifications);
  }, [contextMeta]);

  // Close on outside click or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((n) => !n.isRead);
    }
    return notifications;
  }, [notifications, filter]);

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications([]);
  };

  return (
    <div className="notification-bell-container" ref={containerRef} style={{ position: 'relative' }}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        className={`notification-bell-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="View notifications"
        title={unreadCount > 0 ? `${unreadCount} unread notifications` : 'Notifications'}
      >
        <Bell size={18} className="bell-icon" />
        {unreadCount > 0 && (
          <span className="notification-badge-counter" aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="notification-dropdown-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="notification-dropdown-panel" role="dialog" aria-label="Notifications panel">
            {/* Header */}
            <div className="notification-panel-header">
              <div className="notification-header-title-row">
                <div className="notification-title-group">
                  <span className="notification-main-title">Notifications</span>
                  <span
                    className="notification-context-pill"
                    style={{
                      color: contextMeta.badgeColor,
                      backgroundColor: contextMeta.badgeBg,
                      borderColor: `${contextMeta.badgeColor}33`
                    }}
                  >
                    {contextMeta.label}
                  </span>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    className="notification-action-btn"
                    onClick={handleMarkAllRead}
                    title="Mark all as read"
                  >
                    <CheckCheck size={14} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="notification-filter-tabs">
                <button
                  type="button"
                  className={`notif-filter-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({notifications.length})
                </button>
                <button
                  type="button"
                  className={`notif-filter-tab ${filter === 'unread' ? 'active' : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  Unread ({unreadCount})
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="notification-list-body">
              {filteredNotifications.length === 0 ? (
                <div className="notification-empty-state">
                  <div className="empty-icon-wrap">
                    <CheckCircle2 size={24} color="#10B981" />
                  </div>
                  <div className="empty-title">All caught up!</div>
                  <div className="empty-desc">
                    {filter === 'unread'
                      ? 'No unread notifications right now.'
                      : 'No notifications at this time.'}
                  </div>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
                    onClick={(e) => handleToggleRead(notif.id, e)}
                  >
                    <div className="notification-item-icon-box">
                      {renderNotificationIcon(notif.iconType, notif.category)}
                    </div>

                    <div className="notification-item-content">
                      <div className="notification-item-top">
                        <span className="notif-category-tag">{notif.category}</span>
                        <span className="notif-timestamp">{notif.time}</span>
                      </div>

                      <div className="notif-title">{notif.title}</div>
                      <div className="notif-message">{notif.message}</div>
                    </div>

                    <div className="notification-item-actions">
                      {!notif.isRead && (
                        <div className="unread-dot" title="Unread" />
                      )}
                      <button
                        type="button"
                        className="notif-item-delete-btn"
                        onClick={(e) => handleDeleteItem(notif.id, e)}
                        title="Dismiss notification"
                        aria-label="Dismiss"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="notification-panel-footer">
                <span className="notif-footer-stats">
                  {unreadCount} unread • {notifications.length} total
                </span>
                <button
                  type="button"
                  className="notif-clear-all-btn"
                  onClick={handleClearAll}
                >
                  <Trash2 size={13} />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
