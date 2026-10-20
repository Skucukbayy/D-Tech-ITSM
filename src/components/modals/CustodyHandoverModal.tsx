import React, { useState } from 'react';
import { X, FileText, CheckCircle2, Printer, Download, ShieldCheck, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustodyHandoverModal: React.FC = () => {
  const { activeModal, setActiveModal, selectedAsset, assignAsset, companyProfile } = useApp();

  const [assigneeName, setAssigneeName] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [assigneeDept, setAssigneeDept] = useState('Product & Engineering');
  const [signed, setSigned] = useState(false);

  if (activeModal !== 'custody_handover' || !selectedAsset) return null;

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigneeName || !assigneeEmail) return;

    assignAsset(selectedAsset.id, {
      userId: `usr-${Date.now().toString().slice(-3)}`,
      userName: assigneeName,
      userEmail: assigneeEmail,
      department: assigneeDept
    });
    setSigned(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const isAlreadyAssigned = Boolean(selectedAsset.assignedTo);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/20 text-accent">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text font-display">
                Bilişim Donanımı Zimmet & Teslim Tutanağı
              </h3>
              <p className="text-xs text-text-3">
                ISO/IEC 27001:2022 Madde A.5.10 & A.8.1 Varlık Kullanım Taahhütnamesi
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-text-2">
          {/* Official Document Paper Simulation */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 font-sans text-text">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                {companyProfile.logoUrl ? (
                  <img
                    src={companyProfile.logoUrl}
                    alt="Company Logo"
                    className="w-10 h-10 rounded-xl object-contain bg-white/10 p-1 border border-white/20 shadow-sm"
                  />
                ) : null}
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide">
                    {companyProfile.name}
                  </h4>
                  <p className="text-[11px] text-text-3 font-mono">
                    Belge No: {selectedAsset.assignedTo?.custodyDocId || 'DOC-ZMT-2026-DRAFT'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ISO 27001 UYUMLU
                </span>
                <p className="text-[10px] text-text-3 font-mono mt-1">
                  Tarih: {selectedAsset.assignedTo?.assignedDate || new Date().toISOString().split('T')[0]}
                </p>
              </div>
            </div>

            {/* Asset Table */}
            <div>
              <p className="font-bold text-xs mb-2 uppercase tracking-wider text-text-3">
                Teslim Edilen Fiziki Donanım Bilgileri
              </p>
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-fill/20 border border-white/5 font-mono text-[11px]">
                <div><span className="text-text-3">Varlık Adı:</span> {selectedAsset.name}</div>
                <div><span className="text-text-3">Demirbaş No:</span> {selectedAsset.assetTag}</div>
                <div><span className="text-text-3">Seri No (S/N):</span> {selectedAsset.serialNumber}</div>
                <div><span className="text-text-3">Kategori:</span> {selectedAsset.category}</div>
                <div><span className="text-text-3">Disk Şifreleme:</span> {selectedAsset.securityPosture.diskEncryption ? 'FileVault AKTİF' : 'N/A'}</div>
                <div><span className="text-text-3">Bilgi Sınıfı:</span> {selectedAsset.isoClassification}</div>
              </div>
            </div>

            {/* Terms of Acceptable Use (ISO 27001 A.5.10) */}
            <div className="space-y-1.5 text-[11px] text-text-2 leading-relaxed bg-fill/10 p-3 rounded-xl">
              <p className="font-bold text-text">Teslim ve Kullanım Şartları (Taahhüt):</p>
              <ul className="list-disc pl-4 space-y-1 text-text-3">
                <li>İşbu tutanak ile teslim edilen fiziki cihaz sadece şirket iş amaçları doğrultusunda kullanılacaktır.</li>
                <li>ISO 27001 Temiz Masa / Temiz Ekran politikası uyarınca çalışma alanı terk edilirken ekran kilitlenecektir.</li>
                <li>Cihaz üzerindeki tam disk şifreleme (FileVault/BitLocker) ve EDR yazılımı kapatılamaz veya yetkisiz müdahale edilemez.</li>
                <li>İşten ayrılma durumunda cihaz tüm aksesuarlarıyla birlikte eksiksiz olarak IT departmanına iade edilecektir.</li>
              </ul>
            </div>

            {/* Signatures Row */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <p className="font-semibold text-text text-[11px]">Teslim Eden (IT Yöneticisi):</p>
                <p className="text-[10px] text-text-3 font-mono">Selim K. (CISO & SysAdmin)</p>
                <div className="h-12 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-emerald-400 font-mono text-[11px]">
                  ✓ E-İmza ile Onaylandı
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-text text-[11px]">Teslim Alan (Zimmet Sahibi):</p>
                <p className="text-[10px] text-text-3 font-mono">
                  {selectedAsset.assignedTo?.userName || assigneeName || 'Henüz atanmadı'}
                </p>
                <div className="h-12 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-emerald-400 font-mono text-[11px]">
                  {isAlreadyAssigned || signed ? '✓ Dijital Islak İmza Doğrulandı' : 'İmza Bekleniyor...'}
                </div>
              </div>
            </div>
          </div>

          {/* If Asset is not yet assigned, show assignment form */}
          {!isAlreadyAssigned && !signed && (
            <form onSubmit={handleAssign} className="p-4 rounded-xl glass border border-accent/30 space-y-3">
              <p className="font-bold text-text flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-accent" /> Bu Cihazı Çalışana Zimmetle
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-text-3 mb-1 block">Çalışan Adı Soyadı</label>
                  <input
                    required
                    type="text"
                    value={assigneeName}
                    onChange={(e) => setAssigneeName(e.target.value)}
                    placeholder="Örn: Mehmet Can"
                    className="w-full px-3 py-1.5 rounded-xl glass text-xs text-text outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-text-3 mb-1 block">Kurumsal E-posta</label>
                  <input
                    required
                    type="email"
                    value={assigneeEmail}
                    onChange={(e) => setAssigneeEmail(e.target.value)}
                    placeholder="mehmet@enterprise.io"
                    className="w-full px-3 py-1.5 rounded-xl glass text-xs text-text outline-none focus:border-accent"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-accent text-white font-semibold text-xs shadow-md"
              >
                Zimmeti Onayla ve Belgeyi İmzala
              </button>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-sep/30 flex items-center justify-between bg-fill/20">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass hover:bg-fill text-xs font-semibold text-text"
          >
            <Printer className="w-4 h-4 text-accent" />
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-1.5 rounded-xl bg-accent text-white text-xs font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
