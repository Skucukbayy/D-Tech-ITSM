import React, { useState, useRef, useEffect } from 'react';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChangeRequest } from '../../types';
import { animateViewEnter } from '../../utils/animations';

export const ChangesView: React.FC = () => {
  const { changes, language } = useApp();
  const isTr = language === 'tr';
  const [selectedChange, setSelectedChange] = useState<ChangeRequest | null>(changes[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = animateViewEnter(containerRef.current);
    return () => { tl?.kill(); };
  }, []);

  return (
    <div ref={containerRef} className="view space-y-6 pb-16">
      {/* 1. Header (Pane .head) */}
      <header className="head">
        <div className="head__lead">
          <h1 className="head__title">{isTr ? 'Değişiklik Yönetimi (CAB)' : 'Change Advisory Board'}</h1>
          <p className="head__sub">
            {isTr
              ? 'ISO 27001 Madde A.8.32 Değişiklik Yönetimi, altyapı risk değerlendirmesi ve geri alma (rollback) onayı.'
              : 'ISO 27001 Annex A.8.32 Change Management, production risks, and rollback verification.'}
          </p>
        </div>

        <div className="head__stats">
          <div className="stat">
            <span className="stat__label">{isTr ? 'Aktif RFC' : 'Active RFCs'}</span>
            <span className="stat__value text-purple-400">{changes.length}</span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'CAB Onayı' : 'CAB Status'}</span>
            <span className="stat__value text-emerald-400">{isTr ? 'Yeter Sayı Tamam' : 'Quorum Met'}</span>
          </div>
          <div className="stat">
            <span className="stat__label">{isTr ? 'Bakım Penceresi' : 'Scheduled Window'}</span>
            <span className="stat__value text-text">{isTr ? 'Cts 02:00' : 'Sat 02:00'}</span>
          </div>
        </div>
      </header>

      {/* 2. Grid of Changes + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List */}
        <div className="space-y-3 lg:col-span-5">
          <p className="side__label px-1">{isTr ? 'Aktif RFC Başvuruları' : 'Active RFC Submissions'}</p>
          {changes.map((chg) => (
            <div
              key={chg.id}
              onClick={() => setSelectedChange(chg)}
              className={`p-4 rounded-3xl glass transition-all cursor-pointer border ${
                selectedChange?.id === chg.id
                  ? 'border-accent shadow-glass-lift bg-fill/40'
                  : 'hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-mono font-bold text-text-3">{chg.rfcNumber}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    chg.risk === 'High'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {chg.risk} Risk
                </span>
              </div>
              <h4 className="text-xs font-bold text-text mb-2 line-clamp-2">{chg.title}</h4>
              <div className="flex items-center justify-between text-[11px] text-text-3 pt-2 border-t border-sep/20">
                <span>By {chg.requester.split(' ')[0]}</span>
                <span className="text-emerald-400 font-semibold">{chg.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Details Panel */}
        {selectedChange && (
          <section className="card glass lg:col-span-7 space-y-6">
            <header className="card__head pb-4 border-b border-sep/30">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-text-3">
                    {selectedChange.rfcNumber}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    Status: {selectedChange.status}
                  </span>
                </div>
                <h3 className="card__title text-base">{selectedChange.title}</h3>
              </div>
            </header>

            {/* Impact Assessment */}
            <div className="p-4 rounded-2xl bg-fill/30 border border-white/5 space-y-1 text-xs">
              <h5 className="font-bold text-text flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Security Impact Assessment
              </h5>
              <p className="text-text-2 leading-relaxed">{selectedChange.impactAssessment}</p>
            </div>

            {/* Rollback Plan */}
            <div className="p-4 rounded-2xl bg-fill/30 border border-white/5 space-y-1 text-xs">
              <h5 className="font-bold text-text flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-blue-400" /> Rollback & Recovery Procedure
              </h5>
              <p className="text-text-2 leading-relaxed">{selectedChange.rollbackPlan}</p>
            </div>

            {/* Change Advisory Board Votes */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-text-3 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-purple-400" /> CAB Approval Quorum
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedChange.cabVotes.map((vote, idx) => (
                  <div key={idx} className="p-3 rounded-2xl glass text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-text">{vote.member.split(' ')[0]}</span>
                      {vote.decision === 'approve' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <p className="text-[10px] text-text-3 truncate">{vote.role}</p>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        vote.decision === 'approve'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {vote.decision}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
