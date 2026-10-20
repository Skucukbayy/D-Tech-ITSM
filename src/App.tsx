import React from 'react';
import { Wallpaper } from './components/Wallpaper';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { CommandPalette } from './components/CommandPalette';
import { HomeView } from './components/views/HomeView';
import { AssetsView } from './components/views/AssetsView';
import { TicketsView } from './components/views/TicketsView';
import { ChangesView } from './components/views/ChangesView';
import { ComplianceView } from './components/views/ComplianceView';
import { UserPortalView } from './components/views/UserPortalView';
import { SettingsView } from './components/views/SettingsView';
import { NewAssetModal } from './components/modals/NewAssetModal';
import { NewTicketModal } from './components/modals/NewTicketModal';
import { CustodyHandoverModal } from './components/modals/CustodyHandoverModal';
import { IsoAuditExportModal } from './components/modals/IsoAuditExportModal';
import { AssetDetailModal } from './components/modals/AssetDetailModal';
import { OutboxModal } from './components/modals/OutboxModal';
import { ActiveDirectoryModal } from './components/modals/ActiveDirectoryModal';
import { TicketDetailModal } from './components/modals/TicketDetailModal';
import { useApp } from './context/AppContext';
import {
  LayoutDashboard,
  HardDrive,
  TicketCheck,
  ShieldCheck,
  UserCircle2,
  Settings
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeView, setActiveView, t } = useApp();

  return (
    <div className="app relative min-h-screen text-text overflow-x-hidden">
      {/* 1. Dynamic SVG Wallpaper Canvas */}
      <Wallpaper />

      {/* 2. Floating Liquid Glass Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* 3. Floating Liquid Glass Toolbar */}
      <div className="lg:block">
        <Toolbar />
      </div>

      {/* 4. Main Scrollable View Area (Uses exact .main container padding & frame variables) */}
      <main id="main" className="main">
        {activeView === 'home' && <HomeView key="home" />}
        {activeView === 'assets' && <AssetsView key="assets" />}
        {activeView === 'tickets' && <TicketsView key="tickets" />}
        {activeView === 'changes' && <ChangesView key="changes" />}
        {activeView === 'compliance' && <ComplianceView key="compliance" />}
        {activeView === 'portal' && <UserPortalView key="portal" />}
        {activeView === 'settings' && <SettingsView key="settings" />}
      </main>

      {/* 5. Mobile Floating Liquid Glass Tabbar (Pane .tabbar) */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 h-16 glass--chrome rounded-full z-40 flex items-center justify-around px-2 border border-white/20 shadow-2xl">
        {[
          { id: 'home', label: t('home'), icon: LayoutDashboard },
          { id: 'assets', label: t('assets'), icon: HardDrive },
          { id: 'tickets', label: t('tickets'), icon: TicketCheck },
          { id: 'compliance', label: 'ISO', icon: ShieldCheck },
          { id: 'portal', label: t('portal'), icon: UserCircle2 },
          { id: 'settings', label: t('settings'), icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-accent font-bold scale-105' : 'text-text-3'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 6. Global Modals & Command Palette */}
      <CommandPalette />
      <NewAssetModal />
      <NewTicketModal />
      <CustodyHandoverModal />
      <IsoAuditExportModal />
      <AssetDetailModal />
      <OutboxModal />
      <ActiveDirectoryModal />
      <TicketDetailModal />
    </div>
  );
};
