import React, { useState, useEffect } from 'react';
import {
  X,
  TicketCheck,
  HardDrive,
  Shield,
  MessageSquare,
  Send,
  UserCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { TicketStatus } from '../../types';

export const TicketDetailModal: React.FC = () => {
  const {
    role,
    language,
    selectedTicket,
    setSelectedTicket,
    technicians,
    updateTicketStatus,
    assignTechnician,
    addTicketComment
  } = useApp();

  const isTr = language === 'tr';

  const [commentText, setCommentText] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState('');

  // Sync selected technician whenever selectedTicket changes
  useEffect(() => {
    if (selectedTicket?.assignee) {
      const match = technicians.find((t) => t.name === selectedTicket.assignee?.userName);
      setSelectedTechId(match?.id || '');
    } else {
      setSelectedTechId('');
    }
  }, [selectedTicket, technicians]);

  if (!selectedTicket) return null;

  const statuses: { id: TicketStatus; label: string }[] = [
    { id: 'new', label: isTr ? 'Triage / Yeni' : 'Triage / New' },
    { id: 'in_progress', label: isTr ? 'İşlemde' : 'In Progress' },
    { id: 'pending_approval', label: isTr ? 'CAB Onayı' : 'CAB Approval' },
    { id: 'resolved', label: isTr ? 'Çözümlendi' : 'Resolved' }
  ];

  const handleResolveTicket = () => {
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, 'resolved');
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.7 }
    });
    setSelectedTicket({ ...selectedTicket, status: 'resolved' });
  };

  const handleAssignTech = () => {
    if (!selectedTicket || !selectedTechId) return;
    assignTechnician(selectedTicket.id, selectedTechId);
    const tech = technicians.find((t) => t.id === selectedTechId);
    if (tech) {
      setSelectedTicket({
        ...selectedTicket,
        assignee: {
          userId: tech.id,
          userName: tech.name,
          avatar: tech.avatar,
          role: tech.role
        }
      });
    }
  };

  const handleSendComment = () => {
    if (!commentText.trim() || !selectedTicket) return;
    addTicketComment(selectedTicket.id, commentText, isInternal);
    setCommentText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedTicket(null);
      }}
    >
      <div className="w-full max-w-4xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-scale-in">
        {/* Modal Chrome Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30 bg-fill/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-accent/20 text-accent flex-shrink-0">
              <TicketCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-text font-display">
                  {selectedTicket.ticketNumber} — {selectedTicket.title}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedTicket.priority.startsWith('P1')
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                      : selectedTicket.priority.startsWith('P2')
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {selectedTicket.priority}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fill text-text-3 uppercase">
                  {selectedTicket.type}
                </span>
              </div>
              <p className="text-xs text-text-3 mt-0.5">
                {isTr ? 'Talep Eden:' : 'Reported by:'} {selectedTicket.creator.userName} (
                {selectedTicket.creator.department}) • {selectedTicket.createdAt}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSelectedTicket(null)}
            className="p-1.5 rounded-lg hover:bg-fill text-text-3 hover:text-text cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden text-xs">
          {/* Left Column: Description, Linked Hardware, Activity Log */}
          <div className="lg:col-span-7 p-6 overflow-y-auto space-y-4 border-r border-sep/20">
            {/* Description Card */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-text-3">
                {isTr ? 'Çağrı Detayları & Açıklama' : 'Incident Details & Telemetry'}
              </label>
              <p className="text-xs text-text-2 leading-relaxed bg-fill/25 p-4 rounded-2xl border border-white/5">
                {selectedTicket.description}
              </p>
            </div>

            {/* Linked Hardware */}
            {selectedTicket.linkedAssetName && (
              <div className="p-3 rounded-2xl bg-fill/20 border border-white/5 flex items-center justify-between font-mono">
                <div className="flex items-center gap-2 text-text">
                  <HardDrive className="w-4 h-4 text-accent" />
                  <span className="font-semibold">{selectedTicket.linkedAssetName}</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {isTr ? 'İlişkili Fiziki Donanım' : 'Linked Asset'}
                </span>
              </div>
            )}

            {/* ISO 27001 Mapping */}
            {selectedTicket.iso27001Control && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 text-xs">
                  <Shield className="w-3.5 h-3.5" /> ISO 27001 Annex A Kontrolü
                </div>
                <p className="text-[11px] text-text-2">{selectedTicket.iso27001Control}</p>
              </div>
            )}

            {/* Comments & Activity Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
                {isTr ? 'Aktivite & Not Günlüğü' : 'Activity Log & Notes'}
              </h4>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {selectedTicket.comments.map((c) => (
                  <div
                    key={c.id}
                    className={`p-3 rounded-2xl space-y-1 ${
                      c.isInternal
                        ? 'bg-amber-500/10 border border-amber-500/20'
                        : 'bg-fill/30 border border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-text">
                        {c.author}{' '}
                        {c.isInternal && (
                          <span className="text-amber-400 text-[10px] ml-1 font-mono">
                            (Dahili IT Notu)
                          </span>
                        )}
                      </span>
                      <span className="text-text-3 font-mono text-[10px]">{c.timestamp}</span>
                    </div>
                    <p className="text-text-2 leading-relaxed text-[11px]">{c.message}</p>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="space-y-2 pt-2 border-t border-sep/20">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-text">
                    {isTr ? 'Yeni Not / Yanıt Ekle:' : 'Add Note / Reply:'}
                  </span>
                  {role !== 'user' && (
                    <label className="flex items-center gap-1.5 text-[11px] text-text-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isInternal}
                        onChange={(e) => setIsInternal(e.target.checked)}
                        className="rounded"
                      />
                      <span>{isTr ? 'Dahili Teknisyen Notu (Kullanıcı Görmez)' : 'Internal Staff Note'}</span>
                    </label>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendComment();
                    }}
                    placeholder={
                      isTr ? 'Çağrıya bir yanıt veya teknik not yazın...' : 'Add a note or response...'
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl glass bg-fill/30 border border-white/10 text-xs text-text placeholder-text-3 outline-none focus:border-accent"
                  />
                  <button
                    type="button"
                    onClick={handleSendComment}
                    className="btn btn--accent btn--sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isTr ? 'Gönder' : 'Send'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Status Action, Technician Assignment, SLA Clock */}
          <div className="lg:col-span-5 p-6 overflow-y-auto space-y-5 bg-fill/10 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Current Status & Progression */}
              <div className="p-4 rounded-2xl glass border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-3">
                    {isTr ? 'Aşama / Durum' : 'Ticket Stage'}
                  </span>
                  <span className="font-bold text-accent font-mono text-xs uppercase">
                    {selectedTicket.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Progress Pills */}
                <div className="grid grid-cols-4 gap-1 pt-1 font-mono text-[9px] text-center">
                  {statuses.map((st, i) => {
                    const curIdx = statuses.findIndex((x) => x.id === selectedTicket.status);
                    const isDone = i <= curIdx;
                    return (
                      <div
                        key={st.id}
                        className={`p-1.5 rounded-lg border transition-all ${
                          isDone
                            ? 'bg-accent/20 border-accent text-accent font-bold'
                            : 'bg-fill/20 border-white/5 text-text-3'
                        }`}
                      >
                        {st.id === 'new'
                          ? 'Triage'
                          : st.id === 'in_progress'
                          ? 'İşlem'
                          : st.id === 'pending_approval'
                          ? 'CAB'
                          : 'Çözüldü'}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technician Assignment */}
              <div className="p-4 rounded-2xl glass border border-accent/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-accent" />
                    {isTr ? 'Teknisyen Görevlendirmesi' : 'Assign Technician'}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400">ISO A.5.24</span>
                </div>

                {role !== 'user' ? (
                  <div className="space-y-2">
                    <select
                      value={selectedTechId}
                      onChange={(e) => setSelectedTechId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 text-xs text-text outline-none cursor-pointer"
                    >
                      <option value="">{isTr ? 'Teknisyen Seçin...' : 'Select Technician...'}</option>
                      {technicians.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.specialty.split(',')[0]}) — {t.activeTicketsCount}{' '}
                          {isTr ? 'Aktif' : 'Active'}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={handleAssignTech}
                      disabled={!selectedTechId}
                      className="w-full btn btn--accent btn--sm cursor-pointer disabled:opacity-40"
                    >
                      {isTr ? 'Teknisyeni Ata / Güncelle' : 'Assign Specialist'}
                    </button>
                  </div>
                ) : null}

                {selectedTicket.assignee && (
                  <div className="flex items-center gap-3 pt-2 border-t border-sep/20">
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-xs overflow-hidden">
                      {selectedTicket.assignee.avatar ? (
                        <img
                          src={selectedTicket.assignee.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        selectedTicket.assignee.userName.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-text text-xs">{selectedTicket.assignee.userName}</p>
                      <p className="text-[10px] text-text-3 font-mono">{selectedTicket.assignee.role}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* SLA Countdown Clock */}
              <div className="p-4 rounded-2xl glass border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-text-3 text-xs">
                    {isTr ? 'SLA Hedef Penceresi:' : 'SLA Target Window:'}
                  </span>
                  <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {selectedTicket.slaRemainingMinutes}m{' '}
                    {isTr ? 'kaldı' : 'remaining'}
                  </span>
                </div>
                <div className="w-full bg-fill rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Resolution Action Button */}
            <div className="pt-4 border-t border-sep/20 space-y-2">
              {role !== 'user' && selectedTicket.status !== 'resolved' && (
                <button
                  type="button"
                  onClick={handleResolveTicket}
                  className="w-full btn btn--accent btn--md cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isTr
                      ? 'Çağrıyı Çözüldü Olarak Kapat & Mail At'
                      : 'Resolve Incident & Notify Requester'}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="w-full btn btn--glass btn--sm cursor-pointer"
              >
                {isTr ? 'Pencereyi Kapat' : 'Close Window'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
