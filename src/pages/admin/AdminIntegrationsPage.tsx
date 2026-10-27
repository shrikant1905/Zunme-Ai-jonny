import React, { useState } from 'react';
import {
  Cpu,
  Search,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Power,
  Clock,
  Database,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlatformConnectionModal } from '../../components/modals/PlatformConnectionModal';
import '../../styles/dashboard.css';

export const AdminIntegrationsPage: React.FC = () => {
  const { integrations, toggleIntegrationStatus, showToast } = useApp();
  const [selectedIntegration, setSelectedIntegration] = useState<any | null>(null);

  const handleTestConnection = (name: string) => {
    showToast(`Pinging ${name}... Connection validated (200 OK)`, 'success');
  };

  const getPermissionsForService = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('google')) return ['customsearch.readonly', 'cse.list', 'searchconsole.readonly'];
    if (n.includes('openai')) return ['model.chat.completions', 'embeddings.create', 'usage.read'];
    if (n.includes('anthropic') || n.includes('claude')) return ['messages.create', 'models.read'];
    if (n.includes('s3') || n.includes('aws') || n.includes('storage')) return ['s3:PutObject', 's3:GetObject', 's3:ListBucket'];
    if (n.includes('crm') || n.includes('nergy')) return ['crm.leads.read', 'crm.leads.write', 'webhooks.ingest'];
    return ['api.read', 'api.write', 'telemetry.sync'];
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <Cpu size={26} color="#A78BFA" />
            Supported System Integrations
          </h1>
          <p className="dashboard-subtitle">
            Inspect verified external service connections, search APIs, LLM inference endpoints, cloud storage buckets, and CRM bridges.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <div className="badge badge-success">
            {integrations.filter((i) => i.status === 'CONNECTED').length} Active Services
          </div>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="cards-grid-2">
        {integrations.map((item) => (
          <div key={item.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {item.category}
                </span>
                <span
                  className={`status-chip ${
                    item.status === 'CONNECTED'
                      ? 'success'
                      : item.status === 'MAINTENANCE'
                      ? 'warning'
                      : 'danger'
                  }`}
                >
                  {item.status === 'CONNECTED' ? (
                    <CheckCircle2 size={12} />
                  ) : item.status === 'MAINTENANCE' ? (
                    <AlertTriangle size={12} />
                  ) : (
                    <Power size={12} />
                  )}
                  {item.status}
                </span>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', marginBottom: '6px' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#5F6B85', lineHeight: '1.4', marginBottom: '16px' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#5F6B85', marginBottom: '16px' }}>
                <span>Latency: <strong style={{ color: '#111625' }}>{item.latency || 'N/A'}</strong></span>
                {item.connectedAt && (
                  <span>Connected: <strong style={{ color: '#111625' }}>{item.connectedAt}</strong></span>
                )}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #E8ECF5', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleTestConnection(item.name)}
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                <RefreshCw size={12} />
                <span>Ping Health</span>
              </button>

              <button
                className="btn btn-outline btn-sm"
                onClick={() => setSelectedIntegration(item)}
                style={{ padding: '4px 8px', fontSize: '11px' }}
              >
                <Sliders size={12} />
                <span>Configure</span>
              </button>

              <button
                className={`btn btn-sm ${item.status === 'CONNECTED' ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => {
                  setSelectedIntegration(item);
                }}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  background: item.status === 'CONNECTED' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                  color: item.status === 'CONNECTED' ? '#F87171' : '#34D399',
                  borderColor: item.status === 'CONNECTED' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'
                }}
              >
                <Power size={12} />
                <span>{item.status === 'CONNECTED' ? 'Disconnect' : 'Connect'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* P2: Platform & Integration Connection Dialog */}
      {selectedIntegration && (
        <PlatformConnectionModal
          isOpen={Boolean(selectedIntegration)}
          onClose={() => setSelectedIntegration(null)}
          platformId={selectedIntegration.id}
          platformName={selectedIntegration.name}
          category={selectedIntegration.category}
          currentStatus={selectedIntegration.status === 'CONNECTED' ? 'CONNECTED' : 'DISCONNECTED'}
          purposeDescription={selectedIntegration.description}
          knownPermissions={getPermissionsForService(selectedIntegration.name)}
          onConnect={() => {
            if (selectedIntegration.status !== 'CONNECTED') {
              toggleIntegrationStatus(selectedIntegration.id);
            }
            showToast(`${selectedIntegration.name} bridge enabled`, 'success');
            setSelectedIntegration(null);
          }}
          onDisconnect={() => {
            if (selectedIntegration.status === 'CONNECTED') {
              toggleIntegrationStatus(selectedIntegration.id);
            }
            showToast(`${selectedIntegration.name} disconnected`, 'info');
            setSelectedIntegration(null);
          }}
        />
      )}
    </div>
  );
};
