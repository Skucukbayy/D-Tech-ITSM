import React, { useState } from 'react';
import { X, TicketCheck, AlertTriangle, ShieldAlert, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TicketType, TicketPriority, IsoClassification } from '../../types';

export const NewTicketModal: React.FC = () => {
  const { activeModal, setActiveModal, addTicket, assets, role, currentUser } = useApp();

  const [type, setType] = useState<TicketType>('incident');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('P3 - Medium');
  const [linkedAssetId, setLinkedAssetId] = useState('');

  if (activeModal !== 'new_ticket') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const selectedAsset = assets.find((a) => a.id === linkedAssetId);

    const slaMap: Record<TicketPriority, number> = {
      'P1 - Critical': 60,
      'P2 - High': 240,
      'P3 - Medium': 1440,
      'P4 - Low': 4320
    };

    addTicket({
      type,
      title,
      description,
      priority,
      status: 'new',
      creator: {
        userId: currentUser ? currentUser.id : 'usr-current',
        userName: currentUser ? currentUser.displayName : 'Enterprise Staff',
        department: currentUser ? currentUser.department : 'General Staff',
        email: currentUser ? currentUser.mail : 'user@enterprise.io'
      },
      linkedAssetId: selectedAsset?.id,
      linkedAssetName: selectedAsset ? `${selectedAsset.name} (${selectedAsset.assetTag})` : undefined,
      iso27001Control:
        type === 'security_incident'
          ? 'A.5.24 Information security incident management'
          : 'A.5.10 Acceptable use of assets',
      isoClassification: type === 'security_incident' ? 'Restricted' : 'Confidential',
      slaTargetMinutes: slaMap[priority]
    });

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-accent/20 text-accent">
              <TicketCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text font-display">
                Create ITSM Service Request / Incident
              </h3>
              <p className="text-xs text-text-3">
                Tracked under SLA & ISO 27001 Incident Protocol
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-lg hover:bg-fill text-text-3"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Type Selector */}
          <div>
            <label className="font-semibold text-text-2 mb-1.5 block">Ticket Category</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'incident', label: 'IT Incident', desc: 'Broken hardware / error' },
                { id: 'service_request', label: 'Service Request', desc: 'New gear / access' },
                { id: 'security_incident', label: 'Security Breach', desc: 'ISO 27001 Alert' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setType(item.id as TicketType);
                    if (item.id === 'security_incident') setPriority('P1 - Critical');
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    type === item.id
                      ? 'border-accent bg-accent/15 font-bold shadow-sm'
                      : 'border-white/10 glass text-text-2 hover:border-white/30'
                  }`}
                >
                  <p className="font-bold text-text">{item.label}</p>
                  <p className="text-[10px] text-text-3">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-text-2 mb-1 block">Priority & SLA</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none cursor-pointer"
              >
                <option value="P1 - Critical">P1 - Critical (1 Hour SLA)</option>
                <option value="P2 - High">P2 - High (4 Hours SLA)</option>
                <option value="P3 - Medium">P3 - Medium (24 Hours SLA)</option>
                <option value="P4 - Low">P4 - Low (72 Hours SLA)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-text-2 mb-1 block">Linked Hardware Asset</label>
              <select
                value={linkedAssetId}
                onChange={(e) => setLinkedAssetId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none cursor-pointer"
              >
                <option value="">No hardware linked</option>
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.assetTag})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold text-text-2 mb-1 block">Ticket Subject</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. MacBook M3 battery swelling / Request secondary 4K display"
              className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none focus:border-accent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-text-2 mb-1 block">Detailed Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe symptoms, error codes, physical damage, or exact business requirements..."
              className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none focus:border-accent resize-none"
            />
          </div>

          {type === 'security_incident' && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-rose-300 text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-300">ISO 27001 Security Incident Protocol Active</p>
                <p className="text-[11px] text-text-2 mt-0.5">
                  Submitting this ticket alerts the CSIRT Incident Command and immediately flags related assets for forensic quarantine.
                </p>
              </div>
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-3 border-t border-sep/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 rounded-xl glass hover:bg-fill text-xs font-semibold text-text-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-accent text-white font-semibold text-xs shadow-md transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Log Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
