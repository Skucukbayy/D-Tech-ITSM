import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  TicketCheck,
  Plus,
  Clock,
  CheckCircle2,
  HardDrive,
  MessageSquare,
  Shield,
  Send,
  X,
  Radio,
  UserCheck,
  Sparkles,
  ArrowRight,
  User,
  GitBranch,
  ShieldAlert,
  HelpCircle,
  Activity,
  ChevronRight,
  GripVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Ticket, TicketStatus, TicketType } from '../../types';
import { animateViewEnter, animateSegPill } from '../../utils/animations';

export const TicketsView: React.FC = () => {
  const {
    role,
    language,
    tickets,
    technicians,
    updateTicketStatus,
    reorderTickets,
    addTicketComment,
    assignTechnician,
    simulateIncomingLiveEvent,
    liveEventToast,
    clearLiveEventToast,
    loadSampleData,
    setActiveModal,
    setSelectedTicket,
    selectedTicket
  } = useApp();

  const isTr = language === 'tr';

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [techRosterOpen, setTechRosterOpen] = useState(false);

  // Drag & Drop State
  const [draggedTicketId, setDraggedTicketId] = useState<string | null>(null);
  const [dragOverTicketId, setDragOverTicketId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<TicketStatus | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const segTrackRef = useRef<HTMLDivElement>(null);
  const segPillRef = useRef<HTMLSpanElement>(null);

  // Trigger GSAP entrance animation
  useEffect(() => {
    const tl = animateViewEnter(containerRef.current);
    return () => { tl?.kill(); };
  }, []);

  // Animate segmented pill on toggle
  useEffect(() => {
    if (!segTrackRef.current || !segPillRef.current) return;
    const activeBtn = segTrackRef.current.querySelector<HTMLElement>(`[data-value="${viewMode}"]`);
    if (activeBtn) {
      animateSegPill(segPillRef.current, segTrackRef.current, activeBtn);
    }
  }, [viewMode]);

  const statuses: { id: TicketStatus; label: string; dotColor: string }[] = [
    { id: 'new', label: isTr ? 'Triage / Yeni Çağrı' : 'Triage / New Call', dotColor: 'bg-blue-400' },
    { id: 'in_progress', label: isTr ? 'İşlemde (In Progress)' : 'In Progress', dotColor: 'bg-amber-400' },
    { id: 'pending_approval', label: isTr ? 'CAB / Onay Bekliyor' : 'Pending CAB Approval', dotColor: 'bg-purple-400' },
    { id: 'resolved', label: isTr ? 'Çözümlendi (Resolved)' : 'Resolved & Closed', dotColor: 'bg-emerald-400' },
  ];

  // Filter tickets by type
  const filteredTickets = useMemo(() => {
    if (selectedTypeFilter === 'all') return tickets;
    return tickets.filter((t) => t.type === selectedTypeFilter);
  }, [tickets, selectedTypeFilter]);

  const handleAdvanceStatus = (ticket: Ticket, e: React.MouseEvent) => {
    e.stopPropagation();
    const order: TicketStatus[] = ['new', 'in_progress', 'pending_approval', 'resolved'];
    const currentIndex = order.indexOf(ticket.status);
    if (currentIndex < order.length - 1) {
      const nextStatus = order[currentIndex + 1];
      updateTicketStatus(ticket.id, nextStatus);
      if (nextStatus === 'resolved') {
        confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } });
      }
    }
  };

  // Drag & Drop Handlers
  const handleDragStart = (ticketId: string, e: React.DragEvent) => {
    setDraggedTicketId(ticketId);
    e.dataTransfer.setData('text/plain', ticketId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCardDragOver = (targetTicket: Ticket, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTicketId !== targetTicket.id) {
      setDragOverTicketId(targetTicket.id);
    }
  };

  const handleCardDrop = (targetTicket: Ticket, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedTicketId && draggedTicketId !== targetTicket.id) {
      reorderTickets(draggedTicketId, targetTicket.id, targetTicket.status);
    }
    setDraggedTicketId(null);
    setDragOverTicketId(null);
    setDragOverColId(null);
  };

  const handleColDragOver = (colId: TicketStatus, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColId !== colId) {
      setDragOverColId(colId);
    }
  };

  const handleColDrop = (colId: TicketStatus, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedTicketId) {
      updateTicketStatus(draggedTicketId, colId);
    }
    setDraggedTicketId(null);
    setDragOverTicketId(null);
    setDragOverColId(null);
  };

  return (
    <div ref={containerRef} className="view space-y-6 pb-16">
      {/* 1. Header (Pane .head) */}
      <header className="head">
        <div className="head__lead">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> {isTr ? 'Canlı Operasyon Akışı' : 'Live Operations Stream'}
            </span>
            <span className="text-xs text-text-3 font-semibold">{isTr ? 'Sürüklenebilir İnteraktif Biletler' : 'Interactive Draggable Queue'}</span>
          </div>
          <h1 className="head__title">{isTr ? 'Servis Masası & Canlı Dağıtım' : 'Service Desk & Live Dispatch'}</h1>
          <p className="head__sub">
            {isTr
              ? 'Gelen arızalar, kullanıcı donanım talepleri, ISO 27001 güvenlik bildirimleri ve CAB değişiklikleri. Kartları sürükleyip bırakarak yeniden sıralayabilirsiniz.'
              : 'Incoming incidents, hardware requests, ISO 27001 security alerts, and live CAB changes. Drag & drop cards to reorder or update stages.'}
          </p>
        </div>

        <div className="head__actions">
          {/* Live Simulator Button */}
          <button
            type="button"
            onClick={simulateIncomingLiveEvent}
            className="btn btn--glass cursor-pointer"
            title="Simulate incoming real-time ticket or alert"
          >
            <Activity className="w-4 h-4 text-accent animate-pulse" />
            <span>{isTr ? 'Canlı Çağrı Simüle Et' : 'Simulate Live Call'}</span>
          </button>

          {/* Technician Roster Button */}
          <button
            type="button"
            onClick={() => setTechRosterOpen(true)}
            className="btn btn--glass cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-purple-400" />
            <span>{isTr ? `Teknisyen Kadrosu (${technicians.length})` : `Technician Roster (${technicians.length})`}</span>
          </button>

          {/* Segmented Control from Pane (.seg) */}
          <div ref={segTrackRef} className="seg" role="group" aria-label="View layout">
            <span ref={segPillRef} className="seg__pill" aria-hidden="true" />
            <button
              type="button"
              data-value="kanban"
              aria-pressed={viewMode === 'kanban'}
              onClick={() => setViewMode('kanban')}
              className="seg__btn cursor-pointer"
            >
              Kanban
            </button>
            <button
              type="button"
              data-value="list"
              aria-pressed={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              className="seg__btn cursor-pointer"
            >
              {isTr ? 'Liste Tablosu' : 'Table List'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('new_ticket')}
            className="btn btn--accent cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isTr ? 'Çağrı Aç' : 'New Ticket'}</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="head__stats">
          <div className="stat">
            <span className="stat__label">{isTr ? 'Toplam Kayıt' : 'Total Records'}</span>
            <span className="stat__value">{tickets.length}</span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'P1 Acil / İhlal' : 'P1 Incidents'}</span>
            <span className="stat__value text-rose-400">
              {tickets.filter(t => t.priority.startsWith('P1')).length}
            </span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'İşlemde (Aktif)' : 'In Progress'}</span>
            <span className="stat__value text-amber-400">
              {tickets.filter(t => t.status === 'in_progress').length}
            </span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Aktif Teknisyen' : 'Online Techs'}</span>
            <span className="stat__value text-emerald-400">
              {technicians.filter(t => t.status === 'online').length} / {technicians.length}
            </span>
          </div>
        </div>
      </header>

      {/* Live Event Toast Notification */}
      {liveEventToast && (
        <div className="p-3.5 rounded-2xl glass border border-accent/40 bg-accent/10 flex items-center justify-between text-xs animate-fade-in shadow-glass-lift">
          <div className="flex items-center gap-2.5">
            <Radio className="w-4 h-4 text-accent animate-pulse" />
            <span className="font-semibold text-text">{liveEventToast.message}</span>
          </div>
          <button
            type="button"
            onClick={clearLiveEventToast}
            className="p-1 rounded text-text-3 hover:text-text cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Type Filter Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: isTr ? 'Tüm Kayıtlar (All)' : 'All Records', count: tickets.length },
          { id: 'incident', label: isTr ? 'Arızalar / Çağrılar' : 'Incidents', count: tickets.filter(t => t.type === 'incident').length },
          { id: 'service_request', label: isTr ? 'Donanım & Hizmet Talepleri' : 'Hardware Requests', count: tickets.filter(t => t.type === 'service_request').length },
          { id: 'security_incident', label: isTr ? 'Güvenlik Olayları (ISO A.5.24)' : 'Security Events', count: tickets.filter(t => t.type === 'security_incident').length },
          { id: 'change_request', label: isTr ? 'Değişiklik RFC (ISO A.8.32)' : 'Changes (CAB)', count: tickets.filter(t => t.type === 'change_request').length },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedTypeFilter(tab.id)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedTypeFilter === tab.id
                ? 'bg-accent text-white shadow-sm font-semibold'
                : 'glass text-text-2 hover:text-text'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedTypeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-fill text-text-3'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Clean Slate Empty State Banner */}
      {tickets.length === 0 && (
        <div className="p-6 rounded-2xl glass border border-white/10 bg-fill/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs animate-fade-in shadow-glass-lift">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-accent/20 text-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-text text-sm">
                {isTr ? 'Temiz Kurulum: Henüz Açık Çağrı Kaydı Yok' : 'Clean Slate: No Tickets Recorded Yet'}
              </p>
              <p className="text-text-3 mt-0.5">
                {isTr
                  ? 'Sistem kullanıma hazır. Yeni bir çağrı açabilir veya örnek kurumsal senaryoları yükleyebilirsiniz.'
                  : 'System is ready for production. Open a new request or load demo dataset.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setActiveModal('new_ticket')}
              className="btn btn--accent btn--sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isTr ? 'Yeni Çağrı Aç' : 'New Request'}</span>
            </button>
            <button
              type="button"
              onClick={loadSampleData}
              className="btn btn--glass btn--sm cursor-pointer text-accent hover:border-accent"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTr ? 'Örnek Demo Verilerini Yükle' : 'Load Demo Data'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Live Sürüklenebilir (Drag & Drop) Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {statuses.map((col) => {
            const colTickets = filteredTickets.filter((t) => t.status === col.id);
            const isColTarget = dragOverColId === col.id;
            return (
              <section
                key={col.id}
                onDragOver={(e) => handleColDragOver(col.id, e)}
                onDragLeave={() => { if (dragOverColId === col.id) setDragOverColId(null); }}
                onDrop={(e) => handleColDrop(col.id, e)}
                className={`card glass min-h-[520px] flex flex-col p-4 transition-all duration-200 ${
                  isColTarget ? 'ring-2 ring-accent/60 bg-accent/10 border-accent' : ''
                }`}
              >
                <header className="card__head px-1 mb-3 pb-2 border-b border-sep/30">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${col.dotColor}`} />
                    <h3 className="card__title text-xs uppercase tracking-wider">{col.label}</h3>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-fill text-text-3 font-mono">
                    {colTickets.length}
                  </span>
                </header>

                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {colTickets.map((ticket) => {
                    const isDragging = draggedTicketId === ticket.id;
                    const isTarget = dragOverTicketId === ticket.id;
                    return (
                      <div
                        key={ticket.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(ticket.id, e)}
                        onDragOver={(e) => handleCardDragOver(ticket, e)}
                        onDragLeave={() => { if (dragOverTicketId === ticket.id) setDragOverTicketId(null); }}
                        onDrop={(e) => handleCardDrop(ticket, e)}
                        onDragEnd={() => {
                          setDraggedTicketId(null);
                          setDragOverTicketId(null);
                          setDragOverColId(null);
                        }}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`p-3.5 rounded-2xl glass transition-all cursor-grab active:cursor-grabbing group space-y-2.5 border select-none ${
                          isDragging
                            ? 'opacity-35 scale-95 border-dashed border-accent'
                            : isTarget
                            ? 'border-accent ring-2 ring-accent/70 bg-accent/25 scale-[1.02] shadow-glass-lift'
                            : 'border-white/10 hover:border-white/40'
                        }`}
                      >
                        {/* Drag Handle & Priority */}
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-text-3/50 group-hover:text-accent transition-colors">
                              <GripVertical className="w-3.5 h-3.5" />
                            </span>
                            <span className="font-mono font-bold text-text-3">{ticket.ticketNumber}</span>
                            <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-fill text-text-3 uppercase">
                              {ticket.type === 'security_incident' ? 'SEC' : ticket.type === 'change_request' ? 'RFC' : ticket.type === 'service_request' ? 'REQ' : 'INC'}
                            </span>
                          </div>
                          <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                            ticket.priority.startsWith('P1')
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                              : ticket.priority.startsWith('P2')
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {ticket.priority.split(' ')[0]}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-bold text-text group-hover:text-accent transition-colors line-clamp-2">
                          {ticket.title}
                        </h4>

                        {/* Linked Hardware */}
                        {ticket.linkedAssetName && (
                          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-fill/40 text-[10px] text-text-2 truncate font-mono">
                            <HardDrive className="w-3 h-3 text-accent flex-shrink-0" />
                            <span className="truncate">{ticket.linkedAssetName}</span>
                          </div>
                        )}

                        {/* Technician Assignee Pill */}
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-sep/20">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold overflow-hidden"
                              title={`Teknisyen: ${ticket.assignee?.userName || 'Atanmadı'}`}
                            >
                              {ticket.assignee?.avatar ? (
                                <img src={ticket.assignee.avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                ticket.assignee ? ticket.assignee.userName.charAt(0) : '?'
                              )}
                            </div>
                            <span className="text-[10px] text-text-2 truncate max-w-[90px]">
                              {ticket.assignee ? ticket.assignee.userName.split(' ')[0] : (isTr ? 'Atanmadı' : 'Unassigned')}
                            </span>
                          </div>

                          {/* Quick Advance Button */}
                          {ticket.status !== 'resolved' && (
                            <button
                              type="button"
                              onClick={(e) => handleAdvanceStatus(ticket, e)}
                              className="p-1 rounded-md bg-fill/50 hover:bg-accent hover:text-white text-text-3 transition-colors text-[10px] flex items-center gap-0.5 cursor-pointer"
                              title={isTr ? 'Sonraki Aşamaya İlerlet' : 'Advance Stage'}
                            >
                              <span>{isTr ? 'İlerlet' : 'Next'}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {colTickets.length === 0 && (
                    <div className="p-8 text-center text-text-3 text-xs italic opacity-60 border border-dashed border-white/10 rounded-2xl">
                      {isTr ? 'Bu sütuna kart sürükleyin' : 'Drag ticket here'}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 4. Table List View */}
      {viewMode === 'list' && (
        <section className="card glass p-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-sep/30 text-text-3 font-semibold pb-2">
                <th className="py-2.5 px-3">Çağrı No</th>
                <th className="py-2.5 px-3">Tür</th>
                <th className="py-2.5 px-3">Öncelik</th>
                <th className="py-2.5 px-3">Başlık & Konu</th>
                <th className="py-2.5 px-3">Durum</th>
                <th className="py-2.5 px-3">Atanan Teknisyen</th>
                <th className="py-2.5 px-3">Talep Eden</th>
                <th className="py-2.5 px-3 text-right">SLA Kalan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sep/20">
              {filteredTickets.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className="hover:bg-fill/30 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 font-mono font-bold text-text-3">{t.ticketNumber}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fill uppercase">
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      t.priority.startsWith('P1') ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-text">{t.title}</td>
                  <td className="py-3 px-3 capitalize font-semibold text-text-2">{t.status.replace('_', ' ')}</td>
                  <td className="py-3 px-3 text-text">
                    <span className="font-semibold text-accent">{t.assignee?.userName || (isTr ? 'Atanmadı' : 'Unassigned')}</span>
                  </td>
                  <td className="py-3 px-3 text-text-2">{t.creator.userName}</td>
                  <td className="py-3 px-3 text-right font-mono text-amber-400 font-bold">{t.slaRemainingMinutes}m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* 5. Technician Roster & Capacity Modal */}
      {techRosterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between p-5 border-b border-sep/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text font-display">
                    {isTr ? 'IT Teknisyen Kadrosu & Kapasite Takibi' : 'IT Technician Roster & Live Capacity'}
                  </h3>
                  <p className="text-xs text-text-3">
                    {isTr ? 'ISO 27001 Annex A.5.24 Olay Müdahale Uzmanları' : 'ISO 27001 Incident Response Specialists'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTechRosterOpen(false)}
                className="p-1 rounded-lg hover:bg-fill text-text-3 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3">
              {technicians.map((tech) => (
                <div
                  key={tech.id}
                  className="p-3.5 rounded-2xl bg-fill/25 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tech.avatar}
                      alt={tech.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-text">{tech.name}</h4>
                        <span className={`w-2 h-2 rounded-full ${
                          tech.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`} />
                        <span className="text-[10px] font-mono text-text-3 capitalize">{tech.status}</span>
                      </div>
                      <p className="text-[11px] text-text-3 mt-0.5">{tech.role}</p>
                      <p className="text-[10px] text-accent mt-0.5 font-mono">{tech.specialty}</p>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="text-xs font-bold text-text font-mono">
                      {tech.activeTicketsCount} {isTr ? 'Aktif Çağrı' : 'Active'}
                    </span>
                    <p className="text-[10px] text-emerald-400 font-mono">
                      {tech.resolvedTicketsCount} {isTr ? 'Çözüldü' : 'Resolved'}
                    </p>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fill text-text-3 block">
                      {tech.isoClearance}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-sep/30 flex justify-end">
              <button
                type="button"
                onClick={() => setTechRosterOpen(false)}
                className="btn btn--accent btn--sm cursor-pointer"
              >
                {isTr ? 'Kapat' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
