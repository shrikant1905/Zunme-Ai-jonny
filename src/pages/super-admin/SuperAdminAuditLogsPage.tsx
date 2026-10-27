import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  ShieldAlert,
  Clock,
  Eye,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuditLogEntry } from '../../types';
import '../../styles/dashboard.css';

export const SuperAdminAuditLogsPage: React.FC = () => {
  const { auditLogs, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'WARNING' | 'FAILED'>('ALL');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesQuery =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `zunme_audit_logs_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported audit logs to JSON report', 'success');
  };

  return (
    <div className="dashboard-page-container">
      {/* Page Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1>
            <FileText size={26} color="#F87171" />
            Administrative Audit Logs
          </h1>
          <p className="dashboard-subtitle">
            Immutable, timestamped records of security events, administrative policy modifications, and actor authorization actions.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button className="btn btn-outline btn-sm" onClick={handleExportLogs}>
            <Download size={14} />
            <span>Export Compliance Report</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: 'var(--space-4)' }}>
        <div className="filter-toolbar" style={{ margin: 0 }}>
          <div className="search-box-wrap">
            <Search size={16} />
            <input
              type="text"
              className="input-field"
              placeholder="Search by actor, action name, resource or IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-pills-row">
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase' }}>
              Severity:
            </span>
            {(['ALL', 'SUCCESS', 'WARNING', 'FAILED'] as const).map((s) => (
              <button
                key={s}
                className={`filter-pill ${statusFilter === s ? 'active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s === 'ALL' ? 'All Severities' : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor & Role</th>
                <th>Action Performed</th>
                <th>Resource / Target</th>
                <th>Origin IP</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Inspect</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: '#94A3B8' }}>
                    No administrative audit logs match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '12px' }}>
                        <Clock size={13} />
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontWeight: '700', color: '#111625' }}>{log.actor}</div>
                    </td>

                    <td>
                      <code
                        style={{
                          background: '#FAFBFD',
                          color: '#6E56CF',
                          border: '1px solid #E8ECF5',
                          padding: '3px 6px',
                          borderRadius: '4px',
                          fontSize: '11px'
                        }}
                      >
                        {log.action}
                      </code>
                    </td>

                    <td>
                      <div style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#5F6B85' }}>
                        {log.resource}
                      </div>
                    </td>

                    <td>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#94A3B8' }}>
                        {log.ipAddress}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-chip ${
                          log.status === 'SUCCESS' ? 'success' : log.status === 'WARNING' ? 'warning' : 'danger'
                        }`}
                      >
                        {log.status === 'SUCCESS' ? (
                          <CheckCircle2 size={12} />
                        ) : log.status === 'WARNING' ? (
                          <AlertTriangle size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {log.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedLog(log)}
                        title="View raw entry details"
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Detail Modal */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Audit Record: {selectedLog.id}</div>
              <button className="btn-ghost" onClick={() => setSelectedLog(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#FAFBFD', borderRadius: '8px', border: '1px solid #E8ECF5' }}>
                  <div style={{ fontSize: '11px', color: '#5F6B85' }}>Executing Actor</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#111625', marginTop: '2px' }}>{selectedLog.actor}</div>
                  <div style={{ fontSize: '11px', color: '#6E56CF' }}>Role: {selectedLog.role}</div>
                </div>

                <div style={{ padding: '12px', background: '#FAFBFD', borderRadius: '8px', border: '1px solid #E8ECF5' }}>
                  <div style={{ fontSize: '11px', color: '#5F6B85' }}>Timestamp & IP</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#111625', marginTop: '2px' }}>{new Date(selectedLog.timestamp).toLocaleString()}</div>
                  <div style={{ fontSize: '11px', color: '#8C97B0' }}>IP: {selectedLog.ipAddress}</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Action Type
                </label>
                <div style={{ padding: '10px 12px', background: '#FAFBFD', borderRadius: '8px', border: '1px solid #E8ECF5', fontFamily: 'monospace', color: '#111625' }}>
                  {selectedLog.action}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#111625', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Resource Affected & Mutation Details
                </label>
                <div style={{ padding: '12px', background: '#FAFBFD', borderRadius: '8px', border: '1px solid #E8ECF5', color: '#111625' }}>
                  {selectedLog.resource}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setSelectedLog(null)}>
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
