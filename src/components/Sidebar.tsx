import React, { useRef, useEffect, useState } from 'react';
import {
  LayoutDashboard,
  HardDrive,
  TicketCheck,
  GitBranch,
  ShieldCheck,
  UserCircle2,
  Settings,
  Sparkles,
  ChevronUp,
  Layers,
  CheckCircle2,
  Building,
  Network,
  ArrowRight,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import gsap from 'gsap';
import { useApp, ActiveView } from '../context/AppContext';
import { UserRole } from '../types';
import { animateLens } from '../utils/animations';

export const Sidebar: React.FC = () => {
  const {
    role,
    setRole,
    currentUser,
    setAdModalOpen,
    activeView,
    setActiveView,
    assets,
    tickets,
    companyProfile,
    setSelectedTicket,
    setSelectedAsset,
    setActiveModal,
    language,
    t
  } = useApp();

  const isTr = language === 'tr';
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const hoverLensRef = useRef<HTMLSpanElement>(null);

  const navItems = [
    { id: 'home', label: t('home'), icon: LayoutDashboard },
    { id: 'assets', label: t('assets'), icon: HardDrive, badge: assets.length },
    { id: 'tickets', label: t('tickets'), icon: TicketCheck, badge: tickets.filter(t => t.status !== 'resolved' && t.status !== 'closed').length },
    { id: 'changes', label: t('changes'), icon: GitBranch },
    { id: 'compliance', label: t('compliance'), icon: ShieldCheck, highlight: true },
    { id: 'portal', label: t('portal'), icon: UserCircle2 },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  // Run the squash & stretch elastic lens animation whenever activeView changes
  useEffect(() => {
    if (!trackRef.current || !lensRef.current) return;
    const activeEl = trackRef.current.querySelector<HTMLElement>(`[data-route="${activeView}"]`);
    if (activeEl) {
      animateLens(lensRef.current, trackRef.current, activeEl, 'y', 999);
    }
  }, [activeView]);

  const handleNavItemMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hoverLensRef.current || !trackRef.current) return;
    animateLens(hoverLensRef.current, trackRef.current, e.currentTarget, 'y', 999);
    gsap.to(hoverLensRef.current, { opacity: 1, duration: 0.22, ease: 'power2.out' });
  };

  const handleTrackMouseLeave = () => {
    if (!hoverLensRef.current) return;
    gsap.to(hoverLensRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' });
  };

  const rolesList: { id: UserRole; label: string; desc: string; dotColor: string }[] = [
    { id: 'admin', label: t('superAdmin'), desc: isTr ? 'CISO & Tam Yetki' : 'CISO & Full Governance', dotColor: 'bg-purple-400' },
    { id: 'moderator', label: t('moderatorRole'), desc: isTr ? 'Servis Masası & CAB' : 'Service Desk & CAB Lead', dotColor: 'bg-teal-400' },
    { id: 'technician', label: t('technicianRole'), desc: isTr ? 'Saha & Sistem Müdahale' : 'Field & Systems Specialist', dotColor: 'bg-amber-400' },
    { id: 'user', label: t('endUser'), desc: isTr ? 'Self-Servis Portal' : 'Self-Service Employee', dotColor: 'bg-blue-400' }
  ];

  return (
    <aside className="side glass glass--chrome select-none" aria-label="Workspace">
      {/* Brand Header with Company Logo */}
      <a
        href="#/home"
        onClick={(e) => { e.preventDefault(); setActiveView('home'); }}
        className="brand cursor-pointer group"
        aria-label="ITSM home"
      >
        <span className="brand__mark overflow-hidden" aria-hidden="true">
          {companyProfile.logoUrl ? (
            <img src={companyProfile.logoUrl} alt="Company Logo" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <path d="M3.8 12.5c3.4-1.6 6.4-1.6 9 0s5.2 1.6 7.4 0" />
            </svg>
          )}
        </span>
        <div className="truncate">
          <span className="brand__name truncate block leading-tight group-hover:text-accent transition-colors">
            {companyProfile.name}
          </span>
          <span className="text-[10px] text-text-3 font-mono block truncate">{companyProfile.tagline}</span>
        </div>
      </a>

      {/* Main Nav with Elastic Active Lens AND Floating Liquid Hover Lens */}
      <nav className="nav" aria-label="Main Navigation">
        <div
          ref={trackRef}
          onMouseLeave={handleTrackMouseLeave}
          className="nav__track relative"
        >
          {/* 1. Persistent Active Tab Lens */}
          <span ref={lensRef} className="nav__lens" aria-hidden="true" />

          {/* 2. Interactive Liquid Glass Hover Lens */}
          <span ref={hoverLensRef} className="nav__hover-lens" aria-hidden="true" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <a
                key={item.id}
                href={`#/${item.id}`}
                data-route={item.id}
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={handleNavItemMouseEnter}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(item.id as ActiveView);
                }}
                className="nav__item cursor-pointer group"
              >
                <span className="nav__icon flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                </span>
                <span className="nav__label flex-1 truncate">{item.label}</span>

                {item.badge !== undefined && (
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-accent text-white shadow-sm' : 'bg-fill text-text-2 group-hover:bg-fill-2'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.highlight && !item.badge && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm animate-pulse" />
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Active Directory Quick Gateway */}
      <div className="px-1">
        <button
          type="button"
          onClick={() => setAdModalOpen(true)}
          className="w-full p-2.5 rounded-2xl glass flex items-center justify-between text-xs text-text-2 hover:text-text hover:border-accent/40 hover:bg-fill/40 transition-all cursor-pointer group shadow-sm"
          title="Active Directory (AD / LDAP) Senkronizasyon ve Rol Yönetim Merkezi"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-accent/15 text-accent group-hover:scale-110 transition-transform">
              <Network className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="font-bold text-text text-[11px] leading-tight">Active Directory</p>
              <p className="text-[10px] text-text-3 font-mono">LDAPS Connected</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Pinned Items Section */}
      <div className="side__group">
        <p className="side__label" id="pinned-label">{t('pinned')}</p>
        <ul className="pinned" aria-labelledby="pinned-label">
          <li>
            <a
              href="#/tickets"
              onClick={(e) => {
                e.preventDefault();
                const tick = tickets.find((x) => x.ticketNumber.includes('089'));
                if (tick) setSelectedTicket(tick);
                setActiveView('tickets');
              }}
              className="cursor-pointer group"
            >
              <i className="bg-rose-500 animate-ping" />
              <span className="truncate group-hover:translate-x-1 transition-transform">SEC-089 Lost Token</span>
            </a>
          </li>
          <li>
            <a
              href="#/assets"
              onClick={(e) => {
                e.preventDefault();
                const ast = assets.find((x) => x.assetTag.includes('SW01'));
                if (ast) {
                  setSelectedAsset(ast);
                  setActiveModal('asset_detail');
                }
                setActiveView('assets');
              }}
              className="cursor-pointer group"
            >
              <i className="bg-blue-400" />
              <span className="truncate group-hover:translate-x-1 transition-transform">AST-SW01 Cisco Core</span>
            </a>
          </li>
          <li>
            <a
              href="#/compliance"
              onClick={(e) => {
                e.preventDefault();
                setActiveView('compliance');
              }}
              className="cursor-pointer group"
            >
              <i className="bg-emerald-400" />
              <span className="truncate group-hover:translate-x-1 transition-transform">ISO 27001 Annex A.8.1</span>
            </a>
          </li>
        </ul>
      </div>

      {/* User Profile Card with Live Active Directory 4-Role Switcher */}
      <div className="relative mt-auto">
        <button
          type="button"
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="side__me w-full cursor-pointer hover:border-white/30 border border-transparent transition-all"
          aria-haspopup="menu"
          aria-expanded={roleMenuOpen}
        >
          <img
            src={currentUser.avatarUrl}
            width="36"
            height="36"
            alt={currentUser.displayName}
            className="rounded-full flex-shrink-0 object-cover border border-white/20 shadow-sm"
          />
          <div className="truncate flex-1 text-left">
            <b className="block text-xs font-bold text-text truncate">{currentUser.displayName}</b>
            <small className="block text-[11px] text-text-3 capitalize truncate font-mono">
              {role === 'admin'
                ? t('superAdmin')
                : role === 'moderator'
                ? t('moderatorRole')
                : role === 'technician'
                ? t('technicianRole')
                : t('endUser')}
            </small>
          </div>
          <ChevronUp className={`w-4 h-4 text-text-3 transition-transform duration-200 ${
            roleMenuOpen ? 'rotate-180' : ''
          }`} />
        </button>

        {/* Role Switcher Menu Popup (4 Enterprise Roles + AD Management) */}
        {roleMenuOpen && (
          <div className="absolute bottom-16 left-0 right-0 p-2 glass--chrome rounded-2xl border border-white/20 shadow-2xl z-50 space-y-1 animate-fade-in">
            <div className="px-2 py-1 border-b border-sep/30 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-3">
                {isTr ? '4 Aktif Rol Düzeyi (AD)' : '4 Enterprise Roles (AD)'}
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold">RBAC LIVE</span>
            </div>

            {rolesList.map((r) => {
              const isSelected = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-white font-semibold shadow-sm'
                      : 'text-text-2 hover:bg-fill/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${r.dotColor} flex-shrink-0`} />
                    <div className="text-left">
                      <p className="leading-tight font-semibold">{r.label}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-text-3'}`}>{r.desc}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 ml-1" />}
                </button>
              );
            })}

            {/* AD Integration Launcher Button */}
            <div className="pt-1.5 border-t border-sep/20 mt-1">
              <button
                type="button"
                onClick={() => {
                  setRoleMenuOpen(false);
                  setAdModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-accent hover:bg-accent/15 transition-all border border-accent/20 cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5" />
                  <span>{isTr ? 'Active Directory & LDAP Yönetimi' : 'AD & LDAP Directory Manager'}</span>
                </div>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
