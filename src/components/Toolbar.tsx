import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Moon,
  Sun,
  Bell,
  Download,
  Laptop,
  Ticket as TicketIcon,
  CheckCircle,
  AlertTriangle,
  Mail,
  Languages,
  X,
  Network
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toolbar: React.FC = () => {
  const {
    role,
    activeView,
    look,
    updateTheme,
    language,
    setLanguage,
    t,
    setSearchOpen,
    setActiveModal,
    unreadNotifications,
    markNotificationsRead,
    outboxEmails,
    setOutboxOpen,
    setAdModalOpen
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newMenuOpen, setNewMenuOpen] = useState(false);

  const newMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Clean click-outside listener (NO full-screen blocking overlay!)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (newMenuRef.current && !newMenuRef.current.contains(target)) {
        setNewMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNewMenu = () => {
    setNewMenuOpen((prev) => {
      const next = !prev;
      if (next) setNotificationsOpen(false);
      return next;
    });
  };

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => {
      const next = !prev;
      if (next) {
        setNewMenuOpen(false);
        if (unreadNotifications > 0) markNotificationsRead();
      }
      return next;
    });
  };

  const viewTitles: Record<string, string> = {
    home: language === 'tr' ? 'Komuta Merkezi — Operasyon & ISO 27001' : 'Home — Operations & ISO 27001',
    assets: language === 'tr' ? 'Donanım Envanteri — Fiziki Varlık Takibi' : 'Hardware — Physical Device Inventory',
    tickets: language === 'tr' ? 'Servis Masası — Canlı Çağrı & Triage' : 'Service Desk — Live Queue & Triage',
    changes: language === 'tr' ? 'Değişiklik CAB — ISO A.8.32 Yönetimi' : 'Change CAB — ISO A.8.32 Governance',
    compliance: language === 'tr' ? 'ISO/IEC 27001:2022 — ISMS & Denetim' : 'ISO/IEC 27001:2022 — ISMS & Audit',
    portal: language === 'tr' ? 'Çalışan Portali — Zimmetli Cihazlarım' : 'My Portal — Assigned Equipment',
    settings: language === 'tr' ? 'Ayarlar — Kurumsal Logo & Likit Cam' : 'Settings — Corporate Logo & Liquid Glass',
  };

  const currentTitle = viewTitles[activeView] || 'D-Tech ITSM';

  return (
    <header className="toolbar" aria-label="Toolbar">
      {/* Compact Title Capsule */}
      <div className="toolbar__title glass glass--chrome px-4 py-2 rounded-2xl pointer-events-auto border border-white/20">
        <span className="text-xs font-bold text-text font-display">
          {currentTitle}
        </span>
      </div>

      {/* Tools Capsule */}
      <div className="toolbar__tools glass glass--chrome pointer-events-auto relative z-50">
        {/* Search Pill (⌘K) */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="search-pill cursor-pointer"
          aria-label="Search (⌘K)"
        >
          <Search className="w-4 h-4 text-text-3" />
          <span>{language === 'tr' ? 'Arama' : 'Search'}</span>
          <kbd>⌘K</kbd>
        </button>

        {/* Language Switcher Pill */}
        <button
          type="button"
          onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-fill/50 hover:bg-fill text-xs font-mono font-bold text-text transition-colors cursor-pointer border border-white/10"
          title="Dili Değiştir / Switch Language (TR / EN)"
        >
          <Languages className="w-3.5 h-3.5 text-accent" />
          <span>{language.toUpperCase()}</span>
        </button>

        {/* Active Directory Status Pill */}
        <button
          type="button"
          onClick={() => setAdModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fill/50 hover:bg-fill text-xs font-mono text-text transition-colors cursor-pointer border border-white/10"
          title="Active Directory (LDAPS 636) Bağlantı ve 4-Rol Yönetimi"
        >
          <Network className="w-3.5 h-3.5 text-accent" />
          <span className="font-bold text-[11px]">AD LIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        {/* Outgoing Email Notifications Gateway Button */}
        <button
          type="button"
          onClick={() => setOutboxOpen(true)}
          className="tbtn cursor-pointer relative"
          title={language === 'tr' ? 'Giden E-postalar & SMTP Bildirimleri' : 'Outgoing Email Notifications (SMTP Outbox)'}
        >
          <Mail className="w-4 h-4 text-accent" />
          {outboxEmails.length > 0 && (
            <span className="absolute top-2 right-2 text-[9px] font-mono font-bold bg-accent text-white px-1 rounded-full">
              {outboxEmails.length}
            </span>
          )}
        </button>

        {/* Create Button with Glass Dropdown */}
        <div ref={newMenuRef} className="relative">
          <button
            type="button"
            onClick={toggleNewMenu}
            className={`tbtn cursor-pointer ${newMenuOpen ? 'bg-fill text-accent' : ''}`}
            title={t('quickCreate')}
            aria-haspopup="menu"
            aria-expanded={newMenuOpen}
          >
            <Plus className="w-5 h-5 text-accent" />
          </button>

          {newMenuOpen && (
            <div className="absolute right-0 top-12 w-56 p-1.5 glass--chrome rounded-2xl border border-white/25 shadow-2xl z-50 space-y-1 animate-fade-in pointer-events-auto">
              <div className="flex items-center justify-between px-2 py-1 border-b border-sep/30 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-3">{t('quickCreate')}</span>
                <button
                  type="button"
                  onClick={() => setNewMenuOpen(false)}
                  className="p-0.5 rounded text-text-3 hover:text-text cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveModal('new_ticket');
                  setNewMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-2 hover:text-text hover:bg-fill/50 transition-colors text-left cursor-pointer"
              >
                <TicketIcon className="w-4 h-4 text-accent" />
                <div>
                  <p className="font-semibold text-text">{t('newTicket')}</p>
                  <p className="text-[10px] text-text-3">Incident or Request</p>
                </div>
              </button>

              {role !== 'user' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('new_asset');
                    setNewMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-2 hover:text-text hover:bg-fill/50 transition-colors text-left cursor-pointer"
                >
                  <Laptop className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-text">{t('registerHardware')}</p>
                    <p className="text-[10px] text-text-3">Envantere cihaz ekle</p>
                  </div>
                </button>
              )}

              {role === 'admin' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('iso_export');
                    setNewMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-text-2 hover:text-text hover:bg-fill/50 transition-colors text-left cursor-pointer"
                >
                  <Download className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="font-semibold text-text">{t('isoReport')}</p>
                    <p className="text-[10px] text-text-3">Denetim çıktısı oluştur</p>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => updateTheme(look.theme === 'dark' ? 'light' : 'dark')}
          className="tbtn cursor-pointer"
          title="Toggle Dark/Light Mode"
        >
          {look.theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500" />
          )}
        </button>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            className={`tbtn cursor-pointer ${notificationsOpen ? 'bg-fill text-accent' : ''}`}
            title={t('notifications')}
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white/30 animate-ping" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-12 w-80 p-3 glass--chrome rounded-2xl border border-white/25 shadow-2xl z-50 animate-fade-in pointer-events-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-sep/30">
                <span className="text-xs font-bold text-text">{t('notifications')}</span>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="p-0.5 rounded text-text-3 hover:text-text cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-400 mb-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> P1 Security Incident Active
                  </div>
                  <p className="text-[11px] text-text-2">
                    Lost YubiKey token (SEC-2026-089) requires CISO physical verification.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-fill/40 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-text mb-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> ISO Audit Completed
                  </div>
                  <p className="text-[11px] text-text-3">
                    Annex A.8.1 Endpoint MDM compliance confirmed at 98.4%.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-fill/40 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-text mb-0.5">
                    <Mail className="w-3.5 h-3.5 text-accent" /> Otomatik E-posta Bildirimi
                  </div>
                  <p className="text-[11px] text-text-3">
                    Çağrı durumu güncellendiğinde kullanıcıya otomatik e-posta gönderildi.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Small Avatar Button */}
        <button
          type="button"
          onClick={() => setActiveModal('new_ticket')}
          className="tbtn overflow-hidden p-1 cursor-pointer"
          title="Account profile"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80"
            width="32"
            height="32"
            alt=""
            className="rounded-full object-cover w-full h-full border border-white/20"
          />
        </button>
      </div>
    </header>
  );
};
