import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Laptop,
  Server,
  Network,
  KeyRound,
  Smartphone,
  Monitor,
  HardDrive,
  ShieldCheck,
  Lock,
  Download,
  QrCode,
  FileText,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssetCategory, AssetStatus, HardwareAsset } from '../../types';
import { animateViewEnter } from '../../utils/animations';

export const AssetsView: React.FC = () => {
  const {
    role,
    language,
    assets,
    setSelectedAsset,
    setActiveModal,
    loadSampleData,
    t
  } = useApp();

  const isTr = language === 'tr';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger GSAP entrance animation
  useEffect(() => {
    const tl = animateViewEnter(containerRef.current);
    return () => { tl?.kill(); };
  }, []);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.assetTag.toLowerCase().includes(search.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        asset.model.toLowerCase().includes(search.toLowerCase()) ||
        asset.assignedTo?.userName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || asset.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || asset.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [assets, search, selectedCategory, selectedStatus]);

  const getCategoryIcon = (category: AssetCategory) => {
    switch (category) {
      case 'laptop':
        return Laptop;
      case 'server':
        return Server;
      case 'network':
        return Network;
      case 'security_token':
        return KeyRound;
      case 'mobile':
        return Smartphone;
      case 'display':
        return Monitor;
      default:
        return HardDrive;
    }
  };

  const exportCsv = () => {
    const headers = ['Asset Tag,Name,Category,Brand,Model,Serial Number,Location,Status,Custodian,ISO Classification,Encrypted\n'];
    const rows = assets.map((a) =>
      `"${a.assetTag}","${a.name}","${a.category}","${a.brand}","${a.model}","${a.serialNumber}","${a.location}","${a.status}","${a.assignedTo?.userName || 'Unassigned'}","${a.isoClassification}","${a.securityPosture.diskEncryption}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DTech_Hardware_Assets_ISO27001_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div ref={containerRef} className="view space-y-6 pb-16">
      {/* 1. Header (Exact Pane .head structure) */}
      <header className="head">
        <div className="head__lead">
          <h1 className="head__title">{isTr ? 'Fiziki Donanım & Demirbaş Envanteri' : 'Hardware Asset Inventory'}</h1>
          <p className="head__sub">
            {isTr
              ? 'Fiziki cihaz kayıtları, zimmet taahhütnameleri (A.5.10) ve ISO 27001 Madde A.5.9 varlık envanter doğrulaması.'
              : 'Physical device registry, custodian handover documentation (Zimmet), and ISO 27001 Annex A.5.9 verification.'}
          </p>
        </div>

        <div className="head__actions">
          <button
            type="button"
            onClick={exportCsv}
            className="btn btn--glass cursor-pointer"
            title="Export CSV Ledger for ISO auditors"
          >
            <Download className="w-4 h-4 text-accent" />
            <span>{isTr ? 'A.5.9 CSV İndir' : 'Export A.5.9 CSV'}</span>
          </button>

          {role !== 'user' && (
            <button
              type="button"
              onClick={() => setActiveModal('new_asset')}
              className="btn btn--accent cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isTr ? 'Donanım Kaydet' : 'Enroll Device'}</span>
            </button>
          )}
        </div>

        {/* Stats Row */}
        <div className="head__stats">
          <div className="stat">
            <span className="stat__label">{isTr ? 'Toplam Kayıtlı' : 'Total Enrolled'}</span>
            <span className="stat__value">{assets.length}</span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Zimmette' : 'In Custody'}</span>
            <span className="stat__value text-emerald-400">
              {assets.filter(a => a.status === 'in_use').length}
            </span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Depoda (Müsait)' : 'In Warehouse'}</span>
            <span className="stat__value text-blue-400">
              {assets.filter(a => a.status === 'in_stock').length}
            </span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Disk Şifreleme' : 'Drive Encryption'}</span>
            <span className="stat__value text-purple-400">100%</span>
          </div>
        </div>
      </header>

      {/* 2. Search & Category Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isTr ? 'Demirbaş no, seri no, model veya zimmetli kullanıcı ara...' : 'Search by asset tag, serial, model, or custodian...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-full glass text-xs text-text placeholder-text-3 outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: isTr ? 'Tüm Donanımlar' : 'All Equipment' },
            { id: 'laptop', label: isTr ? 'Dizüstü (Laptop)' : 'Laptops' },
            { id: 'server', label: isTr ? 'Sunucular' : 'Servers' },
            { id: 'network', label: isTr ? 'Ağ & Switch' : 'Network' },
            { id: 'security_token', label: isTr ? 'Güvenlik Anahtarı' : 'Security Keys' },
            { id: 'display', label: isTr ? 'Monitörler' : 'Monitors' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-accent text-white shadow-sm font-semibold'
                  : 'glass text-text-2 hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Slate Empty State Banner */}
      {assets.length === 0 && (
        <div className="p-6 rounded-2xl glass border border-white/10 bg-fill/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs animate-fade-in shadow-glass-lift">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-accent/20 text-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-text text-sm">
                {isTr ? 'Temiz Kurulum: Henüz Kayıtlı Fiziki Donanım Yok' : 'Clean Slate: No Hardware Assets Registered Yet'}
              </p>
              <p className="text-text-3 mt-0.5">
                {isTr
                  ? 'ITAM envanteriniz hazır. Yeni bir donanım tanımlayabilir veya örnek demo envanterini yükleyebilirsiniz.'
                  : 'ITAM repository is ready. Onboard a physical asset or load the sample enterprise fleet.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setActiveModal('new_asset')}
              className="btn btn--accent btn--sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isTr ? 'Yeni Cihaz Tanımla' : 'Add Asset'}</span>
            </button>
            <button
              type="button"
              onClick={loadSampleData}
              className="btn btn--glass btn--sm cursor-pointer text-accent hover:border-accent"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTr ? 'Örnek Donanım Envanterini Yükle' : 'Load Demo Assets'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Assets Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => {
          const Icon = getCategoryIcon(asset.category);
          return (
            <section
              key={asset.id}
              className="card glass flex flex-col justify-between hover:translate-y-[-2px] transition-all"
            >
              <div>
                <header className="card__head mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-fill flex items-center justify-center text-accent flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="card__title text-sm">{asset.name}</h3>
                      <p className="card__sub font-mono font-semibold text-xs text-text-3">
                        {asset.assetTag}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      asset.isoClassification === 'Restricted'
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        : asset.isoClassification === 'Confidential'
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                        : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                    }`}
                  >
                    {asset.isoClassification}
                  </span>
                </header>

                {/* Specs Box */}
                <div className="p-3 rounded-2xl bg-fill/30 space-y-1.5 text-xs text-text-2 mb-3 border border-white/5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-text-3">{isTr ? 'Seri No (S/N):' : 'Serial No:'}</span>
                    <span className="font-semibold text-text">{asset.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-3">{isTr ? 'Konum:' : 'Location:'}</span>
                    <span className="truncate max-w-[170px] text-right font-sans">{asset.location}</span>
                  </div>
                  {asset.specs.cpu && (
                    <div className="flex justify-between">
                      <span className="text-text-3">{isTr ? 'İşlemci / Donanım:' : 'CPU / SOC:'}</span>
                      <span className="font-sans text-[11px] truncate max-w-[160px]">{asset.specs.cpu}</span>
                    </div>
                  )}
                </div>

                {/* Custodian Info */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                      {asset.assignedTo ? asset.assignedTo.userName.charAt(0) : '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-text text-[11px]">
                        {asset.assignedTo ? asset.assignedTo.userName : (isTr ? 'Depo Stoğu (Müsait)' : 'Warehouse Stock')}
                      </p>
                      <p className="text-[10px] text-text-3">
                        {asset.assignedTo ? asset.assignedTo.department : (isTr ? 'Zimmete Hazır' : 'Available for Zimmet')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-text-3">
                    {asset.securityPosture.diskEncryption && (
                      <span title="FileVault Disk Encryption Active">
                        <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                    {asset.securityPosture.edrActive && (
                      <span title="EDR Agent Active">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-sep/30 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAsset(asset);
                    setActiveModal('asset_detail');
                  }}
                  className="btn btn--glass btn--sm flex-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-accent" />
                  <span>{isTr ? 'Detay & QR' : 'Details & QR'}</span>
                </button>

                {role !== 'user' && !asset.assignedTo && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setActiveModal('custody_handover');
                    }}
                    className="btn btn--accent btn--sm flex-1 cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{isTr ? 'Zimmetle' : 'Assign'}</span>
                  </button>
                )}

                {asset.assignedTo && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setActiveModal('custody_handover');
                    }}
                    className="btn btn--glass btn--sm !px-2.5 cursor-pointer"
                    title={isTr ? 'Zimmet Tutanağını Görüntüle' : 'View Custody Agreement (Zimmet Tutanağı)'}
                  >
                    <FileText className="w-3.5 h-3.5 text-text-3" />
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
