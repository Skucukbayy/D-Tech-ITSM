import React, { useRef, useEffect } from 'react';
import {
  Laptop,
  KeyRound,
  Monitor,
  HardDrive,
  FileText,
  Plus,
  ShieldCheck,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { animateViewEnter } from '../../utils/animations';

export const UserPortalView: React.FC = () => {
  const {
    language,
    assets,
    tickets,
    setActiveModal,
    setSelectedTicket,
    setSelectedAsset
  } = useApp();

  const isTr = language === 'tr';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = animateViewEnter(containerRef.current);
    return () => { tl?.kill(); };
  }, []);

  const myAssignedAssets = assets.filter(
    (a) => a.assignedTo?.userId === 'usr-101' || a.assignedTo?.userId === 'usr-104'
  );

  const myTickets = tickets.filter(
    (t) => t.creator.userName.includes('Selim') || t.creator.userName.includes('Lin')
  );

  return (
    <div ref={containerRef} className="view space-y-6 pb-16">
      {/* 1. Header (Pane .head) */}
      <header className="head">
        <div className="head__lead">
          <h1 className="head__title">{isTr ? 'Çalışan Portali & Zimmet Masası' : 'Employee Self-Service'}</h1>
          <p className="head__sub">
            {isTr
              ? 'Üzerinize zimmetlenmiş şirket bilişim donanımlarını inceleyin, resmi teslim tutanağını indirin ve destek talebi oluşturun.'
              : 'Review your assigned enterprise equipment, track open IT requests, and download custody agreements.'}
          </p>
        </div>

        <div className="head__actions">
          <button
            type="button"
            onClick={() => setActiveModal('new_ticket')}
            className="btn btn--accent cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isTr ? 'Donanım / Destek Talep Et' : 'Request Gear / Support'}</span>
          </button>
        </div>

        <div className="head__stats">
          <div className="stat">
            <span className="stat__label">{isTr ? 'Zimmetli Donanım' : 'Assigned Devices'}</span>
            <span className="stat__value text-accent">{myAssignedAssets.length}</span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Açık Taleplerim' : 'My Open Tickets'}</span>
            <span className="stat__value text-amber-400">{myTickets.length}</span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Zimmet Durumu' : 'Zimmet Status'}</span>
            <span className="stat__value text-emerald-400">{isTr ? 'İmzalı & Aktif' : 'Signed'}</span>
          </div>
        </div>
      </header>

      {/* 2. My Assigned Hardware (Zimmetli Cihazlar) */}
      <div className="space-y-4">
        <h3 className="card__title text-base font-bold text-text">
          {isTr ? 'Zimmetli Şirket Donanımlarım' : 'My Custody Hardware (Zimmetli Cihazlarım)'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {myAssignedAssets.map((asset) => (
            <section
              key={asset.id}
              className="card glass space-y-4 hover:border-white/40 transition-all"
            >
              <header className="card__head">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-fill flex items-center justify-center text-accent">
                    {asset.category === 'laptop' && <Laptop className="w-5 h-5" />}
                    {asset.category === 'security_token' && <KeyRound className="w-5 h-5" />}
                    {asset.category === 'display' && <Monitor className="w-5 h-5" />}
                    {asset.category !== 'laptop' && asset.category !== 'security_token' && asset.category !== 'display' && (
                      <HardDrive className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="card__title text-sm">{asset.name}</h4>
                    <p className="card__sub font-mono text-xs text-text-3">{asset.assetTag}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Signed
                </span>
              </header>

              <div className="p-3 rounded-2xl bg-fill/30 text-xs font-mono space-y-1 text-text-2">
                <div className="flex justify-between">
                  <span className="text-text-3">Serial:</span>
                  <span className="text-text font-semibold">{asset.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-3">Zimmet Tutanağı:</span>
                  <span className="text-accent">{asset.assignedTo?.custodyDocId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-3">Handover Date:</span>
                  <span className="text-text-3 font-sans">{asset.assignedTo?.assignedDate}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedAsset(asset);
                  setActiveModal('custody_handover');
                }}
                className="btn btn--glass btn--sm w-full cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-accent" />
                <span>View Custody Agreement</span>
              </button>
            </section>
          ))}
        </div>
      </div>

      {/* 3. My Open Tickets */}
      <section className="card glass space-y-4">
        <header className="card__head">
          <div className="card__lead">
            <h3 className="card__title">My Active Requests</h3>
            <p className="card__sub">Track support and hardware replenishment requests</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal('new_ticket')}
            className="btn btn--accent btn--sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Request</span>
          </button>
        </header>

        <div className="space-y-2">
          {myTickets.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedTicket(t)}
              className="p-3.5 rounded-2xl bg-fill/30 hover:bg-fill/60 transition-colors flex items-center justify-between cursor-pointer border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-10 rounded-full flex-shrink-0 ${
                  t.priority.startsWith('P1') ? 'bg-rose-500' : 'bg-blue-500'
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-text-3">{t.ticketNumber}</span>
                    <span className="text-xs font-bold text-text">{t.title}</span>
                  </div>
                  <p className="text-[11px] text-text-3 mt-0.5">{t.description.substring(0, 80)}...</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-fill text-text-2 capitalize">
                  {t.status.replace('_', ' ')}
                </span>
                <p className="text-[10px] text-text-3 mt-1 font-mono">Updated {t.updatedAt.split(' ')[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Policy Reminder */}
      <div className="p-4 rounded-2xl glass border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-text-2 space-y-1">
          <p className="font-bold text-text">
            ISO 27001 Clean Desk & Endpoint Security Policy
          </p>
          <p className="leading-relaxed text-text-3">
            Please remember to lock your screen (⌘ + Control + Q on macOS) whenever leaving your workstation. Never share your YubiKey or write down passwords. Report lost equipment immediately via the P1 emergency channel.
          </p>
        </div>
      </div>
    </div>
  );
};
