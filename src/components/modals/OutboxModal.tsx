import React, { useState } from 'react';
import {
  X,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  User,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OutgoingEmail } from '../../types';

export const OutboxModal: React.FC = () => {
  const { outboxOpen, setOutboxOpen, outboxEmails } = useApp();
  const [selectedEmail, setSelectedEmail] = useState<OutgoingEmail | null>(outboxEmails[0] || null);

  if (!outboxOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/20 text-accent">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text font-display">
                  Otomatik E-posta Bildirim Sunucusu (SMTP Outbox)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SMTP Live 250 OK
                </span>
              </div>
              <p className="text-xs text-text-3">
                Çağrı açıldığında, teknisyen atandığında, not eklendiğinde ve çözüldüğünde kullanıcıya giden bildirimler
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOutboxOpen(false)}
            className="p-1 rounded-lg hover:bg-fill text-text-3 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: 2-column layout (List on left, preview on right) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden text-xs">
          {/* Left Email List */}
          <div className="md:col-span-5 border-r border-sep/30 overflow-y-auto p-3 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-3 px-1 mb-1">
              Son Gönderilen Bildirimler ({outboxEmails.length})
            </p>
            {outboxEmails.map((em) => (
              <div
                key={em.id}
                onClick={() => setSelectedEmail(em)}
                className={`p-3 rounded-2xl glass transition-all cursor-pointer border ${
                  selectedEmail?.id === em.id
                    ? 'border-accent shadow-glass-lift bg-fill/50'
                    : 'hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-text truncate max-w-[170px]">{em.to}</span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold">250 OK</span>
                </div>
                <h4 className="font-bold text-text text-xs line-clamp-1">{em.subject}</h4>
                <div className="flex items-center justify-between text-[10px] text-text-3 mt-1.5 pt-1.5 border-t border-sep/20 font-mono">
                  <span>{em.ticketNumber}</span>
                  <span>{em.timestamp.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Email Preview */}
          <div className="md:col-span-7 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
            {selectedEmail ? (
              <div className="space-y-4">
                {/* Email Meta Card */}
                <div className="p-4 rounded-2xl bg-fill/30 border border-white/5 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-3">Alıcı (To):</span>
                    <span className="font-semibold text-text font-sans">{selectedEmail.recipientName} &lt;{selectedEmail.to}&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-3">Konu:</span>
                    <span className="font-bold text-accent font-sans">{selectedEmail.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-3">Zaman Damgası:</span>
                    <span className="text-text-3">{selectedEmail.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-3">SMTP Teslimat Durumu:</span>
                    <span className="text-emerald-400 font-bold">{selectedEmail.smtpStatus}</span>
                  </div>
                </div>

                {/* Email HTML Body Card */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-sans text-xs text-text leading-relaxed">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="font-bold text-sm text-text">ITSM NOTIFICATION GATEWAY</div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fill text-text-3">
                      Ticket #{selectedEmail.ticketNumber}
                    </span>
                  </div>

                  <pre className="font-sans whitespace-pre-wrap text-text-2 leading-relaxed">
                    {selectedEmail.body}
                  </pre>

                  <div className="pt-3 border-t border-white/10 text-[10px] text-text-3 flex items-center justify-between">
                    <span>Otomatik sistem mesajıdır, yanıtlamayınız.</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" /> TLS 1.3 Şifreli İletim
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-text-3 italic">
                Görüntülemek için soldan bir e-posta seçin.
              </div>
            )}

            <div className="pt-3 border-t border-sep/30 flex justify-end">
              <button
                type="button"
                onClick={() => setOutboxOpen(false)}
                className="btn btn--accent btn--sm cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
