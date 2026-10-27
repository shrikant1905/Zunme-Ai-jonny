  import React, { useState } from 'react';
import {
  X,
  Shield,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Lock,
  Globe,
  Info,
  Power
} from 'lucide-react';

export interface PlatformConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformName: string;
  platformId?: string;
  platformIcon?: React.ReactNode;
  category?: string;
  currentStatus: 'CONNECTED' | 'DISCONNECTED' | 'NEEDS_REAUTH' | 'MAINTENANCE' | 'NOT_CONFIGURED';
  scopes?: string[];
  knownPermissions?: string[];
  description?: string;
  purposeDescription?: string;
  onToggleStatus?: (newStatus: 'CONNECTED' | 'DISCONNECTED') => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const PlatformConnectionModal: React.FC<PlatformConnectionModalProps> = ({
  isOpen,
  onClose,
  platformName,
  platformId,
  platformIcon,
  category = 'Social & Ecosystem Channel',
  currentStatus,
  scopes,
  knownPermissions,
  description,
  purposeDescription,
  onToggleStatus,
  onConnect,
  onDisconnect
}) => {
  const effectiveScopes = knownPermissions || scopes || [
    'Read profile metadata and organization analytics',
    'Publish and schedule draft content to feed/channel',
    'Access real-time engagement and audience statistics'
  ];
  const effectiveDesc = purposeDescription || description || 'Authorizes Zunme AI to coordinate scheduled broadcasts, sync engagement metrics, and optimize multi-channel reach.';
  const [isProcessing, setIsProcessing] = useState(false);
  const [error] = useState<string | null>(null);

  if (!isOpen) return null;

  const isConnected = currentStatus === 'CONNECTED';

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (isConnected) {
        if (onDisconnect) onDisconnect();
        else if (onToggleStatus) onToggleStatus('DISCONNECTED');
      } else {
        if (onConnect) onConnect();
        else if (onToggleStatus) onToggleStatus('CONNECTED');
      }
      onClose();
    }, 600);
  };

  return (
    <div className="dashboard-modal-backdrop" onClick={onClose}>
      <div
        className="dashboard-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', borderRadius: '20px' }}
      >
        {/* Modal Header */}
        <div
          className="panel-header"
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #E8ECF5',
            background: '#FAFAFC',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            margin: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {platformIcon ? (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#EFEBFC',
                  color: '#6E56CF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {platformIcon}
              </div>
            ) : (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#EFEBFC',
                  color: '#6E56CF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Globe size={18} />
              </div>
            )}
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', margin: 0 }}>
                {platformName} Connection
              </h3>
              <span style={{ fontSize: '11px', color: '#5F6B85' }}>{category}</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
            style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer' }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Status Chip Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '12px',
              background: isConnected ? '#E8F8F0' : '#F1F5F9',
              border: `1px solid ${isConnected ? 'rgba(5, 150, 105, 0.25)' : '#E2E8F0'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isConnected ? (
                <CheckCircle2 size={16} color="#059669" />
              ) : (
                <AlertTriangle size={16} color="#64748B" />
              )}
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: '700',
                  color: isConnected ? '#059669' : '#475569'
                }}
              >
                Status: {currentStatus}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              {isConnected ? 'Active Sandbox Bridge' : 'Not Connected'}
            </span>
          </div>

          {/* Description */}
          <p style={{ fontSize: '13px', color: '#5F6B85', lineHeight: '1.5', margin: 0 }}>
            {effectiveDesc}
          </p>

          {/* Permissions / Scopes List */}
          <div>
            <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '8px' }}>
              Required Permissions &amp; Data Access:
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                background: '#FAFBFD',
                border: '1px solid #E8ECF5',
                borderRadius: '10px',
                padding: '12px 14px'
              }}
            >
              {effectiveScopes.map((scope, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#4B5565' }}>
                  <Lock size={13} color="#6E56CF" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{scope}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Honest Demo State Disclosure */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              fontSize: '11.5px',
              color: '#92400E',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}
          >
            <Info size={14} color="#D97706" style={{ marginTop: '2px', flexShrink: 0 }} />
            <span>
              <strong>Demo Environment Notice:</strong> Third-party OAuth 2.0 authorization requires registered client IDs and server-side secret exchange. In this frontend demo, connecting simulates the authorized state without storing credentials or accessing real account data.
            </span>
          </div>

          {error && (
            <div style={{ color: '#E11D48', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #E8ECF5',
            background: '#FAFAFC',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {isConnected ? (
              <button
                type="button"
                className="btn btn-sm btn-outline"
                style={{ color: '#E11D48', borderColor: '#FEECEB' }}
                onClick={handleAction}
                disabled={isProcessing}
              >
                <Power size={14} />
                <span>{isProcessing ? 'Disconnecting...' : 'Disconnect Account'}</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleAction}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <RefreshCw size={14} className="spin" />
                ) : (
                  <ExternalLink size={14} />
                )}
                <span>{isProcessing ? 'Authorizing...' : `Authorize ${platformName}`}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
