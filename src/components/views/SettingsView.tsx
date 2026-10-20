import React, { useRef, useEffect, useState } from 'react';
import {
  Palette,
  Sun,
  Moon,
  Shield,
  CheckCircle2,
  Building,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  FileText,
  Network,
  RotateCw,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WallPreset, AccentPreset, GlassMode } from '../../types';
import { animateViewEnter } from '../../utils/animations';

export const SettingsView: React.FC = () => {
  const {
    look,
    updateTheme,
    updateAccent,
    updateGlass,
    companyProfile,
    updateCompanyProfile,
    adConfig,
    currentUser,
    setAdModalOpen,
    syncActiveDirectory,
    isAdSyncing,
    adUsers,
    language,
    t
  } = useApp();
  const isTr = language === 'tr';
  const containerRef = useRef<HTMLDivElement>(null);

  // Local state for company branding form
  const [companyName, setCompanyName] = useState(companyProfile.name);
  const [tagline, setTagline] = useState(companyProfile.tagline || '');
  const [logoPreview, setLogoPreview] = useState(companyProfile.logoUrl);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tl = animateViewEnter(containerRef.current);
    return () => { tl?.kill(); };
  }, []);

  const accents: { id: AccentPreset; name: string; hex: string }[] = [
    { id: 'blue', name: 'Blue', hex: '#2f7cf6' },
    { id: 'purple', name: 'Purple', hex: '#8b5cf6' },
    { id: 'pink', name: 'Pink', hex: '#e9468f' },
    { id: 'orange', name: 'Orange', hex: '#f2711c' },
    { id: 'green', name: 'Green', hex: '#22a559' },
    { id: 'graphite', name: 'Graphite', hex: '#4a4a54' },
  ];

  const glassModes: { id: GlassMode; name: string; desc: string }[] = [
    { id: 'tinted', name: 'Tinted (Default)', desc: 'Balanced frosted glass with specular reflections' },
    { id: 'clear', name: 'Clear', desc: 'Maximum wallpaper transparency' },
    { id: 'solid', name: 'Solid', desc: 'Zero blur opacity' },
  ];

  const PRESET_LOGOS = [
    {
      id: 'vitreus',
      name: 'Vitreus Crystal',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="%232f7cf6"/><path d="M24 10L36 18V30L24 38L12 30V18L24 10Z" fill="white" fill-opacity="0.25" stroke="white" stroke-width="2.5"/><path d="M24 10V38M12 18L36 30M36 18L12 30" stroke="white" stroke-width="2"/></svg>`
    },
    {
      id: 'cybershield',
      name: 'CyberShield',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="%2310b981"/><path d="M24 10L36 15V24C36 31 29 37 24 39C19 37 12 31 12 24V15L24 10Z" fill="white" fill-opacity="0.25" stroke="white" stroke-width="2.5"/><path d="M20 24L23 27L28 21" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      id: 'fintech',
      name: 'FinTech Global',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="%23f59e0b"/><circle cx="24" cy="24" r="14" fill="white" fill-opacity="0.2" stroke="white" stroke-width="2.5"/><path d="M24 16V32M19 20H28C29 20 30 21 30 22C30 23 29 24 28 24H20C19 24 18 25 18 26C18 27 19 28 20 28H29" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`
    },
    {
      id: 'nexus',
      name: 'Nexus Systems',
      svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="12" fill="%238b5cf6"/><circle cx="24" cy="16" r="4" fill="white"/><circle cx="16" cy="30" r="4" fill="white"/><circle cx="32" cy="30" r="4" fill="white"/><path d="M24 16L16 30H32L24 16Z" stroke="white" stroke-width="2" fill="white" fill-opacity="0.2"/></svg>`
    }
  ];

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyProfile(companyName, logoPreview, tagline);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetLogo = () => {
    setLogoPreview('');
  };

  return (
    <div ref={containerRef} className="view space-y-6 pb-16 max-w-5xl">
      {/* 1. Header (Pane .head) */}
      <header className="head">
        <div className="head__lead">
          <h1 className="head__title">{t('settings')}</h1>
          <p className="head__sub">
            {t('companyLogoDesc')}
          </p>
        </div>
      </header>

      {/* 2. Corporate Branding & Logo Upload Section */}
      <section className="card glass space-y-6">
        <header className="card__head pb-3 border-b border-sep/30">
          <div className="card__lead">
            <h2 className="card__title flex items-center gap-2">
              <Building className="w-5 h-5 text-accent" />
              {t('companySettings')}
            </h2>
            <p className="card__sub">
              Sol menü, zimmet tutanakları ve ISO 27001 raporlarında görünen resmi şirket logonuz
            </p>
          </div>
        </header>

        <form onSubmit={handleSaveCompany} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text">
                  {t('companyName')}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Örn: Vitreus Holding A.Ş."
                  className="w-full px-3.5 py-2.5 rounded-xl glass bg-fill/40 border border-white/10 text-xs text-text focus:outline-none focus:border-accent"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text">
                  Kurumsal Slogan / Alt Başlık
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Örn: Enterprise ITSM & ISO 27001 Compliance"
                  className="w-full px-3.5 py-2.5 rounded-xl glass bg-fill/40 border border-white/10 text-xs text-text focus:outline-none focus:border-accent"
                />
              </div>

              {/* File Upload Button & Controls */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-text flex items-center justify-between">
                  <span>{t('uploadLogo')}</span>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Logoyu Kaldır (Varsayılana Dön)
                    </button>
                  )}
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 hover:border-accent/60 rounded-2xl p-5 text-center cursor-pointer transition-all bg-fill/20 hover:bg-fill/30 group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2.5 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-text">
                        Bilgisayarınızdan Logo Yüklemek İçin Tıklayın
                      </p>
                      <p className="text-[11px] text-text-3 mt-0.5">
                        PNG, SVG, JPG veya WebP (Önerilen: 256x256 şeffaf arka plan)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preset Logos */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-text flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  {t('presetLogos')} (Tek Tıkla Seç)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_LOGOS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setLogoPreview(p.svg)}
                      className={`p-2 rounded-xl glass flex items-center gap-2 text-left cursor-pointer transition-all border ${
                        logoPreview === p.svg
                          ? 'border-accent bg-fill/50 shadow-glass-lift'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={p.svg} alt={p.name} className="w-7 h-7 rounded-lg flex-shrink-0" />
                      <span className="text-[11px] font-semibold text-text line-clamp-1">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Live Preview Box */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-fill/20 border border-white/10">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-3">
                  Canlı Arayüz Önizlemesi
                </h3>

                {/* Sidebar Brand Mockup */}
                <div className="p-3.5 rounded-xl glass--chrome border border-white/20 shadow-md">
                  <p className="text-[10px] text-text-3 font-mono mb-2 uppercase">1. Sol Menü (Sidebar) Görünümü</p>
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Building className="w-5 h-5 text-accent" />
                      )}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold text-text truncate">{companyName || 'Şirket Adı'}</p>
                      <p className="text-[10px] text-text-3 font-mono truncate">{tagline || 'ITSM & ISO 27001'}</p>
                    </div>
                  </div>
                </div>

                {/* Handover Doc Mockup */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] space-y-2">
                  <p className="text-[10px] text-text-3 font-mono uppercase">2. Resmi Zimmet Tutanağı Başlığı</p>
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-6 h-6 rounded object-contain bg-white/10 p-0.5 border border-white/10" />
                    ) : null}
                    <div>
                      <p className="font-bold uppercase text-[11px] text-text leading-tight">{companyName || 'ŞİRKET ADI'}</p>
                      <p className="text-[9px] text-text-3 font-mono">Belge No: DOC-ZMT-2026-LIVE</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-emerald-400 font-mono">✓ ISO 27001 Madde A.5.10 & A.8.1 Onaylı Belge</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full btn btn--accent btn--md cursor-pointer flex items-center justify-center gap-2"
                >
                  {savedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Kaydedildi & Canlıya Alındı ✓</span>
                    </>
                  ) : (
                    <>
                      <Building className="w-4 h-4" />
                      <span>Kurumsal Profili Kaydet & Uygula</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* 3. Appearance Card (Theme, Wallpapers, Accents) */}
      <section className="card glass space-y-6">
        <header className="card__head pb-3 border-b border-sep/30">
          <div className="card__lead">
            <h2 className="card__title flex items-center gap-2">
              <Palette className="w-5 h-5 text-accent" />
              Liquid Glass Customizer
            </h2>
            <p className="card__sub">
              {isTr ? 'Tema modu, arayüz aksan renkleri ve cam kırılma seviyeleri' : 'Theme mode, interface accents, and glass refraction'}
            </p>
          </div>
        </header>

        {/* Theme mode */}
        <div className="space-y-2">
          <label className="side__label px-0">Theme Mode</label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => updateTheme('dark')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl glass transition-all cursor-pointer ${
                look.theme === 'dark' ? 'border-accent shadow-glass-lift bg-fill/40 font-bold' : 'text-text-2 hover:border-white/30'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs">Dark Obsidian</span>
              {look.theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-accent ml-auto" />}
            </button>

            <button
              type="button"
              onClick={() => updateTheme('light')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl glass transition-all cursor-pointer ${
                look.theme === 'light' ? 'border-accent shadow-glass-lift bg-fill/40 font-bold' : 'text-text-2 hover:border-white/30'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs">Light Ceramic</span>
              {look.theme === 'light' && <CheckCircle2 className="w-4 h-4 text-accent ml-auto" />}
            </button>
          </div>
        </div>

        {/* Accents */}
        <div className="space-y-2">
          <label className="side__label px-0">Interface Accent Color</label>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {accents.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => updateAccent(acc.id)}
                className={`p-2.5 rounded-2xl glass flex items-center gap-2 transition-all cursor-pointer ${
                  look.accent === acc.id ? 'border-accent shadow-glass-lift bg-fill/50 font-bold' : 'hover:border-white/30'
                }`}
              >
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: acc.hex }} />
                <span className="text-xs font-semibold text-text truncate">{acc.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Glass Refraction */}
        <div className="space-y-2">
          <label className="side__label px-0">Glass Refraction Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {glassModes.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => updateGlass(g.id)}
                className={`p-3 rounded-2xl glass text-left space-y-1 transition-all cursor-pointer ${
                  look.glass === g.id ? 'border-accent shadow-glass-lift bg-fill/50 font-bold' : 'hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text">{g.name}</span>
                  {look.glass === g.id && <CheckCircle2 className="w-3.5 h-3.5 text-accent" />}
                </div>
                <p className="text-[11px] text-text-3 font-normal leading-tight">{g.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Active Directory & LDAP Enterprise Identity Card */}
      <section className="card glass space-y-4">
        <header className="card__head pb-3 border-b border-sep/30">
          <div className="card__lead">
            <h2 className="card__title flex items-center gap-2">
              <Network className="w-5 h-5 text-accent" />
              {isTr ? 'Active Directory (AD / LDAP) Entegrasyonu' : 'Active Directory (AD / LDAP) Integration'}
            </h2>
            <p className="card__sub">
              {isTr
                ? '4 Rol Yönetimi (Admin, Moderator, Teknisyen, Kullanıcı) ve LDAPS (TLS 1.3) etki alanı senkronizasyonu'
                : '4-Role Identity Architecture & LDAPS Domain Synchronization'}
            </p>
          </div>
          <button
            type="button"
            onClick={syncActiveDirectory}
            disabled={isAdSyncing}
            className="btn btn--glass btn--sm cursor-pointer flex items-center gap-1.5"
          >
            <RotateCw className={`w-3.5 h-3.5 text-accent ${isAdSyncing ? 'animate-spin' : ''}`} />
            <span>{isAdSyncing ? (isTr ? 'Eşitleniyor...' : 'Syncing...') : (isTr ? 'Şimdi Eşitle' : 'Sync Now')}</span>
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Domain Controller:</span>
            <p className="font-bold text-accent truncate">{adConfig.serverHost}</p>
          </div>
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Senkronize Kullanıcılar:</span>
            <p className="font-bold text-text font-sans">{adUsers.length} Kurumsal Hesap (4 Rol)</p>
          </div>
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Bağlantı & Şifreleme:</span>
            <p className="font-bold text-emerald-400 font-sans flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> LDAPS SSL/TLS 1.3
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setAdModalOpen(true)}
            className="btn btn--accent btn--sm cursor-pointer flex items-center gap-1.5"
          >
            <Network className="w-4 h-4" />
            <span>{isTr ? 'Active Directory & Rol Eşitleme Panelini Aç' : 'Open Active Directory Manager'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. ISO 27001 Organizational Credentials */}
      <section className="card glass space-y-4">
        <header className="card__head pb-3 border-b border-sep/30">
          <div className="card__lead">
            <h2 className="card__title flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              ISO/IEC 27001:2022 Certification Profile
            </h2>
            <p className="card__sub">Governance and accreditation record</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Lead Auditor:</span>
            <p className="font-bold text-text font-sans">Selim Kucukbay (CISO)</p>
          </div>
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Scope:</span>
            <p className="font-bold text-text font-sans">Global IT Asset Management & Service Desk</p>
          </div>
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Accreditation Body:</span>
            <p className="font-bold text-text font-sans">TÜV NORD CERT GmbH</p>
          </div>
          <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 space-y-1">
            <span className="text-text-3">Status:</span>
            <p className="font-bold text-emerald-400 font-sans">Active & Compliant</p>
          </div>
        </div>
      </section>
    </div>
  );
};
