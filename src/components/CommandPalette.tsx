import React, { useState, useMemo } from 'react';
import {
  Search,
  Laptop,
  TicketCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { useApp, ActiveView } from '../context/AppContext';

export const CommandPalette: React.FC = () => {
  const {
    searchOpen,
    setSearchOpen,
    assets,
    tickets,
    setActiveView,
    setSelectedAsset,
    setSelectedTicket,
    setActiveModal
  } = useApp();

  const [query, setQuery] = useState('');

  const filteredAssets = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.assetTag.toLowerCase().includes(q) ||
        a.serialNumber.toLowerCase().includes(q) ||
        a.model.toLowerCase().includes(q) ||
        a.brand.toLowerCase().includes(q)
    );
  }, [query, assets]);

  const filteredTickets = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tickets.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.ticketNumber.toLowerCase().includes(q) ||
        t.creator.userName.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }, [query, tickets]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass--chrome rounded-glass-xl border border-white/25 shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-sep/30">
          <Search className="w-5 h-5 text-accent flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, asset tag, serial number (e.g. AST-2026, MacBook, C02G...)"
            className="w-full bg-transparent text-sm font-medium text-text placeholder-text-3 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md hover:bg-fill text-text-3"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-fill text-[11px] font-mono text-text-3 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Quick Navigation Suggestions when query is empty */}
          {!query.trim() && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-3 px-2">
                Quick Shortcuts
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { view: 'assets', label: 'Hardware Inventory', desc: 'Browse all 8 physical assets', icon: Laptop },
                  { view: 'tickets', label: 'Service Desk Board', desc: 'View active incidents & SLAs', icon: TicketCheck },
                  { view: 'compliance', label: 'ISO 27001 Controls', desc: 'Audit compliance score & logs', icon: ShieldCheck },
                  { view: 'portal', label: 'My Custody Portal', desc: 'Assigned devices & requests', icon: Sparkles },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.view}
                      onClick={() => {
                        setActiveView(item.view as ActiveView);
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 rounded-2xl glass hover:border-white/40 transition-all text-left group"
                    >
                      <div className="p-2 rounded-xl bg-fill group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text">{item.label}</p>
                        <p className="text-[11px] text-text-3">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Asset Search Results */}
          {filteredAssets.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-3 px-2 mb-1.5">
                Physical Hardware Assets ({filteredAssets.length})
              </p>
              <div className="space-y-1">
                {filteredAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      setSelectedAsset(asset);
                      setActiveModal('asset_detail');
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl glass hover:border-white/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-fill">
                        <Laptop className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text group-hover:text-accent transition-colors">
                          {asset.name}
                        </p>
                        <p className="text-[11px] text-text-3 font-mono">
                          {asset.assetTag} • S/N: {asset.serialNumber} • {asset.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/20 text-accent-ink border border-accent/30">
                      {asset.status.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ticket Search Results */}
          {filteredTickets.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-3 px-2 mb-1.5">
                Service Desk Tickets ({filteredTickets.length})
              </p>
              <div className="space-y-1">
                {filteredTickets.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setActiveView('tickets');
                      setSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl glass hover:border-white/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-fill">
                        <TicketCheck className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-text group-hover:text-accent transition-colors">
                          {ticket.title}
                        </p>
                        <p className="text-[11px] text-text-3">
                          {ticket.ticketNumber} • {ticket.priority} • By {ticket.creator.userName}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-3 group-hover:text-text transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {query.trim() && filteredAssets.length === 0 && filteredTickets.length === 0 && (
            <div className="p-8 text-center text-text-3">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching by Asset Tag (e.g. AST-2026), serial number, or ticket code.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-fill/30 border-t border-sep/20 flex items-center justify-between text-[11px] text-text-3">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
