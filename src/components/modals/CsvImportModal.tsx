import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Table,
  Info,
  Download
} from 'lucide-react';

export interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  expectedColumns?: string[];
  expectedHeaders?: string[];
  targetEntityName?: string;
  sampleFormatDescription?: string;
  sampleCsvTemplate?: string;
  onImport?: (importedRows: Record<string, string>[]) => void;
  onConfirmImport?: (importedRows: Record<string, string>[]) => void;
}

// Utility to export any array of objects or rows to a downloadable CSV
export function exportToCsv(
  filename: string,
  headersOrObjects: string[] | Record<string, any>[],
  maybeRows?: (string | number)[][]
) {
  let headers: string[] = [];
  let rows: (string | number)[][] = [];

  if (Array.isArray(headersOrObjects) && headersOrObjects.length > 0 && typeof headersOrObjects[0] === 'object' && !Array.isArray(headersOrObjects[0])) {
    const list = headersOrObjects as Record<string, any>[];
    headers = Object.keys(list[0]);
    rows = list.map((item) => headers.map((h) => item[h]));
  } else if (Array.isArray(headersOrObjects) && (headersOrObjects.length === 0 || typeof headersOrObjects[0] === 'string')) {
    headers = headersOrObjects as string[];
    rows = maybeRows || [];
  } else {
    headers = ['Field', 'Value'];
    rows = [];
  }

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((val) => {
          const stringVal = String(val ?? '');
          return stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')
            ? `"${stringVal.replace(/"/g, '""')}"`
            : stringVal;
        })
        .join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const CsvImportModal: React.FC<CsvImportModalProps> = ({
  isOpen,
  onClose,
  title,
  expectedColumns,
  expectedHeaders,
  targetEntityName,
  sampleFormatDescription,
  sampleCsvTemplate,
  onImport,
  onConfirmImport
}) => {
  const effectiveExpected = expectedHeaders || expectedColumns || [];
  const effectiveDesc = sampleFormatDescription || sampleCsvTemplate
    ? `Ensure your CSV file contains the required column headers in the first row. Target entity: ${targetEntityName || 'Records'}.`
    : 'Ensure your CSV file contains the required column headers in the first row.';
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedHeaders, setParsedHeaders] = useState<string[]>([]);
  const [parsedRows, setParsedRows] = useState<Record<string, string>[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const resetState = () => {
    setSelectedFile(null);
    setParsedHeaders([]);
    setParsedRows([]);
    setValidationError(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const parseCsvText = (text: string) => {
    setValidationError(null);
    const lines = text
      .split(/\r\n|\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length < 2) {
      setValidationError('The uploaded CSV file is empty or missing data rows.');
      return;
    }

    // Parse header row
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
    setParsedHeaders(headers);

    // Validate expected columns
    const missing = effectiveExpected.filter(
      (exp) => !headers.some((h) => h.toLowerCase() === exp.toLowerCase())
    );

    if (missing.length > 0) {
      setValidationError(`Missing required column headers: ${missing.join(', ')}`);
      return;
    }

    // Parse data rows
    const rows: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
      if (values.length === headers.length || values.some((v) => v.length > 0)) {
        const rowObj: Record<string, string> = {};
        headers.forEach((h, idx) => {
          rowObj[h] = values[idx] || '';
        });
        rows.push(rowObj);
      }
    }

    if (rows.length === 0) {
      setValidationError('No valid data records found in CSV file.');
      return;
    }

    setParsedRows(rows);
  };

  const handleFileChange = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setValidationError('Please select a valid .csv file format.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError('File size exceeds 5MB limit.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        parseCsvText(content);
      }
    };
    reader.onerror = () => {
      setValidationError('Failed to read the selected file.');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmImport = () => {
    if (parsedRows.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      if (onConfirmImport) {
        onConfirmImport(parsedRows);
      } else if (onImport) {
        onImport(parsedRows);
      }
      setIsProcessing(false);
      handleClose();
    }, 400);
  };

  return (
    <div className="dashboard-modal-backdrop" onClick={handleClose}>
      <div
        className="dashboard-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', borderRadius: '20px' }}
      >
        {/* Header */}
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
              <Table size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#111625', margin: 0 }}>
                {title}
              </h3>
              <span style={{ fontSize: '11px', color: '#5F6B85' }}>CSV Batch Ingestion</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-ghost"
            onClick={handleClose}
            style={{ padding: '6px', borderRadius: '8px', cursor: 'pointer' }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#5F6B85', margin: 0 }}>
            {effectiveDesc}
          </p>

          {/* Expected Columns Badge Row */}
          <div>
            <span style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
              Required Column Headers:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {effectiveExpected.map((col, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    color: '#334155',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {col}
                </span>
              ))}
            </div>
          </div>

          {/* Drag & Drop Area */}
          {!selectedFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragOver ? '#6E56CF' : '#CBD5E1'}`,
                borderRadius: '14px',
                background: isDragOver ? '#F8FAFC' : '#FAFBFD',
                padding: '36px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <UploadCloud size={36} color="#6E56CF" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111625', margin: '0 0 4px' }}>
                Drag &amp; drop your CSV file here, or browse
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Supports standard comma-delimited (.csv) files up to 5MB.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="#6E56CF" />
                <div>
                  <strong style={{ fontSize: '13px', color: '#111625', display: 'block' }}>
                    {selectedFile.name}
                  </strong>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>
                    {(selectedFile.size / 1024).toFixed(1)} KB • {parsedRows.length} valid rows detected
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={resetState}
                style={{ padding: '6px', color: '#E11D48' }}
                title="Remove file"
              >
                <Trash2 size={15} />
              </button>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#FEECEB',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Data Preview Table */}
          {parsedRows.length > 0 && !validationError && (
            <div>
              <span style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#111625', marginBottom: '6px' }}>
                Previewing First {Math.min(5, parsedRows.length)} Records:
              </span>
              <div style={{ overflowX: 'auto', border: '1px solid #E8ECF5', borderRadius: '8px', maxHeight: '180px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', textAlign: 'left' }}>
                  <thead style={{ background: '#F8FAFC', position: 'sticky', top: 0 }}>
                    <tr>
                      {parsedHeaders.map((h, i) => (
                        <th key={i} style={{ padding: '8px 10px', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedRows.slice(0, 5).map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        {parsedHeaders.map((h, cIdx) => (
                          <td key={cIdx} style={{ padding: '8px 10px', color: '#1E293B', whiteSpace: 'nowrap' }}>
                            {row[h] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Honest Notice */}
          <div
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: '#F1F5F9',
              fontSize: '11px',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Info size={13} color="#64748B" />
            <span>
              <strong>Local Session Ingestion:</strong> Imported records will be added to your current active workspace session tables.
            </span>
          </div>
        </div>

        {/* Footer */}
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
            onClick={handleClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleConfirmImport}
            disabled={parsedRows.length === 0 || Boolean(validationError) || isProcessing}
          >
            <CheckCircle2 size={14} />
            <span>{isProcessing ? 'Importing Records...' : `Confirm Import (${parsedRows.length} Rows)`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
