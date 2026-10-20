import React, { useRef, useEffect } from 'react';
import {
  ShieldCheck,
  HardDrive,
  TicketCheck,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Laptop,
  Server,
  Network,
  KeyRound,
  CheckCircle2,
  Lock,
  Plus,
  Play,
  Check,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { animateViewEnter, animateRings } from '../../utils/animations';

export const HomeView: React.FC = () => {
  const {
    role,
    language,
    assets,
    tickets,
    isoControls,
    auditLogs,
    setActiveView,
    setActiveModal,
    setSelectedTicket,
    setSelectedAsset
  } = useApp();

  const isTr = language === 'tr';

  const containerRef = useRef<HTMLDivElement>(null);
  const ringsSvgRef = useRef<SVGSVGElement>(null);

  const totalAssets = assets.length;
  const inUseAssets = assets.filter((a) => a.status === 'in_use').length;
  const encryptedAssets = assets.filter((a) => a.securityPosture.diskEncryption).length;
  const openTickets = tickets.filter((t) => t.status !== 'resolved' && t.status !== 'closed');
  const criticalTickets = tickets.filter((t) => t.priority.startsWith('P1'));

  // ISO compliance average
  const avgIsoScore = (
    isoControls.reduce((acc, curr) => acc + curr.compliancePercent, 0) /
    isoControls.length
  ).toFixed(1);

  // Trigger GSAP entrance animations
  useEffect(() => {
    const tl = animateViewEnter(containerRef.current);
    animateRings(ringsSvgRef.current, {
      tasks: parseFloat(avgIsoScore) / 100, // ISO Posture ring
      focus: 0.986,                         // SLA rate ring
      meet: encryptedAssets / totalAssets   // Encryption ring
    });
    return () => {
      tl?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="view space-y-6 pb-16">
      {/* 1. Header (Exact Pane .head structure) */}
      <header className="head">
        <div className="head__lead">
          <h1 className="head__title">
            {isTr
              ? (role === 'admin'
                  ? 'Güvenlik & Operasyon Komuta Merkezi'
                  : role === 'moderator'
                  ? 'IT Operasyon & CAB Masası'
                  : role === 'technician'
                  ? 'Teknik Müdahale & Saha Masası'
                  : 'Çalışan Bilişim Masam')
              : (role === 'admin'
                  ? 'Security & Operations Center'
                  : role === 'moderator'
                  ? 'IT Operations & CAB Command'
                  : role === 'technician'
                  ? 'Field & Technical Command'
                  : 'My IT Workspace')}
          </h1>
          <p className="head__sub">
            {isTr
              ? 'Sürekli ISO/IEC 27001:2022 ISMS yönetişimi, fiziki donanım zimmeti ve canlı olay müdahalesi.'
              : 'Continuous ISO 27001 ISMS governance, hardware custody, and real-time incident resolution.'}
          </p>
        </div>

        <div className="head__actions">
          <button
            type="button"
            onClick={() => setActiveModal('new_ticket')}
            className="btn btn--accent cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isTr ? 'Yeni Çağrı / Arıza' : 'New Incident'}</span>
          </button>
          {role === 'admin' && (
            <button
              type="button"
              onClick={() => setActiveModal('iso_export')}
              className="btn btn--glass cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isTr ? 'Denetim Paketi' : 'Audit Bundle'}</span>
            </button>
          )}
        </div>

        {/* Floating Stat Pills */}
        <div className="head__stats">
          <div className="stat">
            <span className="stat__label">{isTr ? 'ISO 27001 Skoru' : 'ISO 27001 Posture'}</span>
            <span className="stat__value text-emerald-400">{avgIsoScore}%</span>
          </div>

          <div className="stat">
            <span className="stat__label">{isTr ? 'Kayıtlı Donanım' : 'Enrolled Devices'}</span>
            <span className="stat__value">{totalAssets}</span>
          </div>

          <div className="stat">
            <span className="stat__label">{isTr ? 'SLA Başarısı' : 'SLA Rate'}</span>
            <span className="stat__value text-purple-400">98.6%</span>
          </div>

          <div className="stat">
            <span className="stat__label">{isTr ? 'Açık Çağrılar' : 'Open Queue'}</span>
            <span className="stat__value text-amber-400">{openTickets.length}</span>
          </div>
        </div>
      </header>

      {/* 2. Top Row: Concentric Activity Rings + Emergency Incident Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Apple Activity Rings Widget (Exact Pane .rings) */}
        <section className="card glass lg:col-span-5 flex flex-col justify-between">
          <header className="card__head">
            <div className="card__lead">
              <h2 className="card__title">{isTr ? 'Yönetişim & Sağlık Halkaları' : 'Governance & Health Rings'}</h2>
              <p className="card__sub">{isTr ? 'Canlı telemetri ve metrik dağılımı' : 'Live metric convergence'}</p>
            </div>
            <div className="p-1 rounded-full bg-fill text-text-3">
              <Activity className="w-4 h-4 text-accent" />
            </div>
          </header>

          <div className="rings py-2">
            <svg
              ref={ringsSvgRef}
              className="rings__svg"
              viewBox="0 0 136 136"
              width="136"
              height="136"
              role="img"
              aria-label="Progress rings"
            >
              {/* Track backgrounds */}
              <circle className="rings__track rings--tasks" cx="68" cy="68" r="56" />
              <circle className="rings__track rings--focus" cx="68" cy="68" r="41" />
              <circle className="rings__track rings--meet" cx="68" cy="68" r="26" />

              {/* Animated stroke arcs */}
              <circle className="rings__arc rings--tasks" cx="68" cy="68" r="56" strokeDasharray="351.86" strokeDashoffset="351.86" />
              <circle className="rings__arc rings--focus" cx="68" cy="68" r="41" strokeDasharray="257.61" strokeDashoffset="257.61" />
              <circle className="rings__arc rings--meet" cx="68" cy="68" r="26" strokeDasharray="163.36" strokeDashoffset="163.36" />
            </svg>

            <dl className="rings__legend">
              <div className="rings__row rings--tasks">
                <dt>{isTr ? 'ISO 27001 Uyumu' : 'ISO 27001 Posture'}</dt>
                <dd><b>{avgIsoScore}%</b><small>/ 100%</small></dd>
              </div>
              <div className="rings__row rings--focus">
                <dt>{isTr ? 'SLA Başarısı' : 'SLA Compliance'}</dt>
                <dd><b>98.6%</b><small>/ 100%</small></dd>
              </div>
              <div className="rings__row rings--meet">
                <dt>{isTr ? 'Disk Şifreleme' : 'Drive Encryption'}</dt>
                <dd><b>100%</b><small>/ {totalAssets} {isTr ? 'cihaz' : 'devices'}</small></dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Emergency P1 Incident Card or Live SecOps Alert */}
        <section className="card glass lg:col-span-7 flex flex-col justify-between">
          <header className="card__head">
            <div className="card__lead">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                  {isTr ? 'P1 Kritik Çağrı' : 'P1 Critical Incident'}
                </span>
                <span className="text-xs text-text-3 font-mono">ISO 27001 A.5.24</span>
              </div>
              <h2 className="card__title mt-1">
                {criticalTickets[0]?.title || (isTr ? 'Sistem Parametreleri Normal' : 'System Baseline Optimal')}
              </h2>
            </div>
            <button
              onClick={() => {
                if (criticalTickets[0]) {
                  setSelectedTicket(criticalTickets[0]);
                  setActiveView('tickets');
                }
              }}
              className="btn btn--glass btn--sm cursor-pointer"
            >
              <span>{isTr ? 'İncele (Triage)' : 'Triage'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </header>

          <div className="p-4 rounded-2xl bg-fill/30 border border-white/5 space-y-2 text-xs">
            <p className="text-text-2 leading-relaxed">
              {criticalTickets[0]?.description || (isTr ? 'Sistemde aktif kritik arıza bulunmamaktadır. Tüm cihazlar FileVault ve sıfır güven politikalarına uygundur.' : 'Zero critical incidents recorded. All enterprise endpoints compliant with FileVault and zero-trust policies.')}
            </p>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-sep/20 font-mono">
              <span className="text-text-3">{isTr ? 'Atanan Teknisyen: Selim K. (Lead Architect)' : 'Assigned: Selim K. (Lead Architect)'}</span>
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 28m {isTr ? 'Kalan SLA' : 'SLA Clock'}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Mid Row: Physical Hardware Asset Ledger + Live Incident Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Physical Assets Grid */}
        <section className="card glass lg:col-span-7 space-y-4">
          <header className="card__head">
            <div className="card__lead">
              <h2 className="card__title">{isTr ? 'Fiziki Donanım Envanteri' : 'Physical Hardware Inventory'}</h2>
              <p className="card__sub">{isTr ? 'Kayıtlı demirbaşlar ve zimmet durumu' : 'Enrolled assets & active custody status'}</p>
            </div>
            <button
              onClick={() => setActiveView('assets')}
              className="text-xs font-semibold text-accent flex items-center gap-1 hover:underline cursor-pointer"
            >
              {isTr ? `Tüm Envanter (${totalAssets})` : `Browse All (${totalAssets})`} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </header>

          <div className="space-y-2">
            {assets.slice(0, 4).map((asset) => (
              <div
                key={asset.id}
                onClick={() => {
                  setSelectedAsset(asset);
                  setActiveModal('asset_detail');
                }}
                className="p-3.5 rounded-2xl bg-fill/30 hover:bg-fill/60 transition-all flex items-center justify-between cursor-pointer border border-white/5 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-fill flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    {asset.category === 'laptop' && <Laptop className="w-5 h-5" />}
                    {asset.category === 'server' && <Server className="w-5 h-5" />}
                    {asset.category === 'network' && <Network className="w-5 h-5" />}
                    {asset.category === 'security_token' && <KeyRound className="w-5 h-5" />}
                    {asset.category !== 'laptop' && asset.category !== 'server' && asset.category !== 'network' && asset.category !== 'security_token' && (
                      <HardDrive className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-text group-hover:text-accent transition-colors">{asset.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fill text-text-3 font-semibold">
                        {asset.assetTag}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-3 mt-0.5">
                      {asset.assignedTo ? `${isTr ? 'Zimmetli' : 'Custody'}: ${asset.assignedTo.userName}` : (isTr ? 'Depoda • Müsait' : 'In Stock • Warehouse')}
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      asset.status === 'in_use'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {asset.status === 'in_use' ? (isTr ? 'Zimmetli' : 'In Custody') : (isTr ? 'Stokta' : 'In Stock')}
                    </span>
                    <p className="text-[10px] text-text-3 font-mono mt-0.5">{asset.isoClassification}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Service Desk Feed */}
        <section className="card glass lg:col-span-5 space-y-4">
          <header className="card__head">
            <div className="card__lead">
              <h2 className="card__title">{isTr ? 'Canlı Servis Masası Akışı' : 'Live Service Desk'}</h2>
              <p className="card__sub">{isTr ? 'Gelen çağrılar ve anlık kuyruk' : 'Incoming requests & triage queue'}</p>
            </div>
            <button
              onClick={() => setActiveView('tickets')}
              className="text-xs font-semibold text-accent flex items-center gap-1 hover:underline cursor-pointer"
            >
              {isTr ? 'Kanban Panosu' : 'Ticket Board'} <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </header>

          <div className="space-y-2.5">
            {tickets.slice(0, 3).map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTicket(t);
                  setActiveView('tickets');
                }}
                className="p-3 rounded-2xl bg-fill/30 hover:bg-fill/60 transition-all cursor-pointer border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-text-3 font-semibold">{t.ticketNumber}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      t.priority.startsWith('P1') ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {t.priority.split(' ')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {t.slaRemainingMinutes}m
                  </span>
                </div>
                <h4 className="text-xs font-bold text-text truncate">{t.title}</h4>
                <p className="text-[11px] text-text-3 truncate">
                  {t.creator.userName} • {t.creator.department}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Bottom Row: ISO 27001 Annex A Compliance Radar + Tamper-Evident Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className="card glass lg:col-span-6 space-y-3">
          <header className="card__head">
            <div className="card__lead">
              <h2 className="card__title">ISO 27001:2022 {isTr ? 'Maddeleri' : 'Controls'}</h2>
              <p className="card__sub">{isTr ? 'Ek A (Annex A) Sürekli Doğrulama' : 'Annex A Continuous Verification'}</p>
            </div>
            <button
              onClick={() => setActiveView('compliance')}
              className="text-xs font-semibold text-accent hover:underline cursor-pointer"
            >
              {isTr ? 'Tüm ISMS Raporu' : 'Full ISMS View'}
            </button>
          </header>

          <div className="space-y-3">
            {isoControls.slice(0, 4).map((c) => (
              <div key={c.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text">
                    <span className="font-mono text-accent">{c.code}</span> {c.title}
                  </span>
                  <span className="font-bold text-emerald-400">{c.compliancePercent}%</span>
                </div>
                <div className="w-full bg-fill rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${c.compliancePercent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card glass lg:col-span-6 space-y-3">
          <header className="card__head">
            <div className="card__lead">
              <h2 className="card__title">{isTr ? 'SHA-256 Denetim İzi Telemetrisi' : 'Tamper-Evident Audit Log'}</h2>
              <p className="card__sub">{isTr ? 'Kriptografik Doğrulanmış Blok Zinciri' : 'Cryptographic SHA-256 Chain'}</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {isTr ? 'Doğrulandı ✓' : 'Verified'}
            </span>
          </header>

          <div className="space-y-2">
            {auditLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="p-2.5 rounded-xl bg-fill/25 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent font-mono">{log.action}</span>
                  <span className="text-[10px] text-text-3 font-mono">{log.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-[11px] text-text-2 truncate">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-text-3 font-mono">
                  <span>{log.actor}</span>
                  <span className="text-text-3 truncate max-w-[120px]">{log.hash.substring(0, 12)}...</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
