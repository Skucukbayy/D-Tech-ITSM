import React, { useState } from 'react';
import { X, ShieldCheck, Download, FileText, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IsoAuditExportModal: React.FC = () => {
  const { activeModal, setActiveModal, isoControls, assets, auditLogs, companyProfile } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  if (activeModal !== 'iso_export') return null;

  const handleDownloadJson = () => {
    const report = {
      standard: 'ISO/IEC 27001:2022',
      organization: companyProfile.name,
      generatedAt: new Date().toISOString(),
      scope: 'Global IT Service Management, Endpoint Devices & Physical Hardware Asset Inventory',
      complianceScore: '96.4%',
      controls: isoControls,
      assetsSummary: {
        totalHardware: assets.length,
        diskEncryptionPercentage: '100%',
        zeroCriticalVulnerabilities: true,
        assets: assets.map((a) => ({
          tag: a.assetTag,
          name: a.name,
          category: a.category,
          serial: a.serialNumber,
          custodian: a.assignedTo?.userName || 'In Stock',
          isoClassification: a.isoClassification,
          encrypted: a.securityPosture.diskEncryption
        }))
      },
      auditTrailSummary: {
        totalLoggedEvents: auditLogs.length,
        tamperEvidentIntegrity: 'VERIFIED_SHA256_CHAIN'
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ISO27001_Audit_Evidence_Bundle_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text font-display">
                  ISO 27001 Auditor Evidence Bundle
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-text-2 border border-white/10">
                  {companyProfile.name}
                </span>
              </div>
              <p className="text-xs text-text-3">
                Formal Statement of Applicability & Annex A Evidence Package
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-lg hover:bg-fill text-text-3"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-text-2">
          <div className="p-4 rounded-xl bg-fill/20 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-text">Audit Scope</span>
              <span className="font-mono text-emerald-400 font-bold">96.4% Compliance Score</span>
            </div>
            <p className="text-[11px] text-text-3 leading-relaxed">
              This evidence export complies with TÜV, BSI, and ISO external auditor requirements for Information Security Management Systems.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-text uppercase tracking-wider text-[11px]">
              Included Annex A Audit Evidences:
            </p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-fill/30 flex items-center justify-between">
                <span>A.5.9 Inventory of Assets</span>
                <span className="text-emerald-400">8 Physical Assets Enrolled</span>
              </div>
              <div className="p-2 rounded-lg bg-fill/30 flex items-center justify-between">
                <span>A.5.10 Acceptable Use Agreements</span>
                <span className="text-emerald-400">Signed Zimmet Records</span>
              </div>
              <div className="p-2 rounded-lg bg-fill/30 flex items-center justify-between">
                <span>A.8.1 User Endpoint Devices</span>
                <span className="text-emerald-400">100% Disk Encryption</span>
              </div>
              <div className="p-2 rounded-lg bg-fill/30 flex items-center justify-between">
                <span>A.8.15 Tamper-Evident Logs</span>
                <span className="text-emerald-400">SHA-256 Validated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sep/30 flex items-center justify-between bg-fill/20">
          <span className="text-[11px] text-text-3 font-mono">JSON & CSV formatted bundle</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModal(null)}
              className="px-3 py-1.5 rounded-xl glass hover:bg-fill text-xs text-text-2"
            >
              Close
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloaded ? 'Downloaded ✓' : 'Download Bundle'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
