import React from 'react';
import {
  X,
  HardDrive,
  QrCode,
  ShieldCheck,
  Lock,
  Printer,
  Calendar,
  DollarSign,
  Cpu,
  User,
  History,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AssetDetailModal: React.FC = () => {
  const { activeModal, setActiveModal, selectedAsset, setActiveModal: setModal } = useApp();

  if (activeModal !== 'asset_detail' || !selectedAsset) return null;

  const handlePrintTag = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/20 text-accent">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text font-display">
                  {selectedAsset.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/20 text-accent-ink border border-accent/30">
                  {selectedAsset.assetTag}
                </span>
              </div>
              <p className="text-xs text-text-3 font-mono">
                S/N: {selectedAsset.serialNumber} • {selectedAsset.location}
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
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-text-2">
          {/* Top section: Hardware Spec Grid + QR Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Left 2 Cols: Technical Attributes */}
            <div className="sm:col-span-2 space-y-2 p-4 rounded-xl bg-fill/20 border border-white/5 font-mono">
              <p className="font-bold text-text text-xs uppercase tracking-wider font-sans mb-2">
                Technical Specifications
              </p>
              <div className="flex justify-between py-1 border-b border-sep/20">
                <span className="text-text-3">Manufacturer:</span>
                <span className="text-text">{selectedAsset.brand}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-sep/20">
                <span className="text-text-3">Exact Model:</span>
                <span className="text-text truncate max-w-[200px]">{selectedAsset.model}</span>
              </div>
              {selectedAsset.specs.cpu && (
                <div className="flex justify-between py-1 border-b border-sep/20">
                  <span className="text-text-3">Processor:</span>
                  <span className="text-text truncate max-w-[200px]">{selectedAsset.specs.cpu}</span>
                </div>
              )}
              {selectedAsset.specs.ram && (
                <div className="flex justify-between py-1 border-b border-sep/20">
                  <span className="text-text-3">Memory / RAM:</span>
                  <span className="text-text">{selectedAsset.specs.ram}</span>
                </div>
              )}
              {selectedAsset.specs.storage && (
                <div className="flex justify-between py-1 border-b border-sep/20">
                  <span className="text-text-3">Primary Storage:</span>
                  <span className="text-text">{selectedAsset.specs.storage}</span>
                </div>
              )}
              {selectedAsset.macAddress && (
                <div className="flex justify-between py-1">
                  <span className="text-text-3">MAC Address:</span>
                  <span className="text-accent">{selectedAsset.macAddress}</span>
                </div>
              )}
            </div>

            {/* Right 1 Col: Physical Barcode / QR Tag */}
            <div className="p-4 rounded-xl glass border border-white/10 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-2 rounded-xl bg-white text-black shadow-inner">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" width="80" height="80" fill="currentColor">
                  <rect x="0" y="0" width="30" height="30" rx="3" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />
                  <rect x="70" y="0" width="30" height="30" rx="3" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />
                  <rect x="0" y="70" width="30" height="30" rx="3" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />
                  <rect x="40" y="10" width="10" height="20" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="70" y="40" width="10" height="10" />
                  <rect x="40" y="70" width="20" height="10" />
                  <rect x="70" y="70" width="20" height="20" />
                </svg>
              </div>
              <p className="font-mono text-[10px] text-text font-bold">{selectedAsset.assetTag}</p>
              <button
                onClick={handlePrintTag}
                className="w-full flex items-center justify-center gap-1 py-1 rounded-lg bg-fill/50 hover:bg-fill text-[10px] text-text-2 border border-white/10"
              >
                <Printer className="w-3 h-3" /> Print Tag
              </button>
            </div>
          </div>

          {/* Custodian & ISO 27001 Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-fill/20 border border-white/5 space-y-2">
              <p className="font-bold text-text uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-accent" /> Assigned Custodian
              </p>
              {selectedAsset.assignedTo ? (
                <div>
                  <p className="font-bold text-text">{selectedAsset.assignedTo.userName}</p>
                  <p className="text-[11px] text-text-3 font-mono">{selectedAsset.assignedTo.userEmail}</p>
                  <p className="text-[11px] text-text-3">{selectedAsset.assignedTo.department}</p>
                  <p className="text-[10px] text-accent font-mono mt-1">
                    Zimmet Belgesi: {selectedAsset.assignedTo.custodyDocId}
                  </p>
                </div>
              ) : (
                <p className="text-text-3 italic">Currently in warehouse storage (Unassigned)</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-fill/20 border border-white/5 space-y-2">
              <p className="font-bold text-text uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Security Posture
              </p>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span>Disk Encryption:</span>
                  <span className={selectedAsset.securityPosture.diskEncryption ? 'text-emerald-400 font-bold' : 'text-text-3'}>
                    {selectedAsset.securityPosture.diskEncryption ? 'Enabled (FileVault)' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>EDR Agent:</span>
                  <span className="text-emerald-400 font-bold">CrowdStrike Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Classification:</span>
                  <span className="text-accent font-bold">{selectedAsset.isoClassification}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit History Timeline */}
          <div className="space-y-2">
            <p className="font-bold text-text uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-accent" /> Asset Custody & Maintenance History
            </p>
            <div className="space-y-2">
              {selectedAsset.history.map((h) => (
                <div key={h.id} className="p-2.5 rounded-xl bg-fill/30 text-[11px] flex items-start justify-between">
                  <div>
                    <span className="font-bold text-text">{h.action}</span>
                    <p className="text-text-3 mt-0.5">{h.details}</p>
                  </div>
                  <div className="text-right text-text-3 font-mono text-[10px]">
                    <div>{h.date}</div>
                    <div>{h.actor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sep/30 flex items-center justify-between bg-fill/20">
          {selectedAsset.assignedTo && (
            <button
              onClick={() => {
                setActiveModal('custody_handover');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass hover:bg-fill text-xs font-semibold text-text"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Zimmet Tutanağını Aç</span>
            </button>
          )}
          <button
            onClick={() => setActiveModal(null)}
            className="ml-auto px-4 py-1.5 rounded-xl bg-accent text-white font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
