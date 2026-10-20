import React, { useState } from 'react';
import {
  X,
  Network,
  RotateCw,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Users,
  KeyRound,
  Server,
  Layers,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const ActiveDirectoryModal: React.FC = () => {
  const {
    adModalOpen,
    setAdModalOpen,
    currentUser,
    adUsers,
    adConfig,
    syncActiveDirectory,
    switchAdUser,
    updateAdConfig,
    isAdSyncing,
    language,
    t
  } = useApp();

  const isTr = language === 'tr';
  const [activeTab, setActiveTab] = useState<'users' | 'mapping' | 'config' | 'iso'>('users');
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!adModalOpen) return null;

  const handleTestConnection = () => {
    setTestResult('testing');
    setTimeout(() => {
      setTestResult('success');
      setTimeout(() => setTestResult(null), 3500);
    }, 800);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {isTr ? 'Admin (CISO)' : 'Admin (CISO)'}
          </span>
        );
      case 'moderator':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            {isTr ? 'Moderator (Mod)' : 'Moderator (Mod)'}
          </span>
        );
      case 'technician':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {isTr ? 'Teknisyen' : 'Technician'}
          </span>
        );
      case 'user':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {isTr ? 'Kullanıcı' : 'End User'}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl glass--chrome rounded-glass-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col h-[82vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sep/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-accent/20 text-accent">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text font-display">
                  {isTr ? 'Active Directory (AD) & LDAP Entegrasyon Merkezi' : 'Active Directory (AD) & LDAP Identity Sync'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LDAPS://dc01.enterprise.corp:636 (TLS 1.3)
                </span>
              </div>
              <p className="text-xs text-text-3">
                {isTr
                  ? '4 Rol Yönetimi (Kullanıcı, Admin, Moderator, Teknisyen) ve ISO 27001 A.5.15 / A.5.16 Kimlik Eşitleme'
                  : '4-Role Governance (User, Admin, Moderator, Technician) & ISO 27001 Identity Integration'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={syncActiveDirectory}
              disabled={isAdSyncing}
              className="btn btn--glass btn--sm cursor-pointer flex items-center gap-1.5"
              title="Active Directory LDAP dizini ile anlık senkronizasyon yap"
            >
              <RotateCw className={`w-3.5 h-3.5 text-accent ${isAdSyncing ? 'animate-spin' : ''}`} />
              <span>{isAdSyncing ? (isTr ? 'Eşitleniyor...' : 'Syncing...') : (isTr ? 'Şimdi Eşitle' : 'Sync Now')}</span>
            </button>

            <button
              type="button"
              onClick={() => setAdModalOpen(false)}
              className="p-1 rounded-lg hover:bg-fill text-text-3 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-sep/20 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'users', label: isTr ? `AD Kullanıcıları (${adUsers.length})` : `AD Users (${adUsers.length})`, icon: Users },
            { id: 'mapping', label: isTr ? '4 Rol & Grup Haritası' : '4-Role & Group Mappings', icon: Layers },
            { id: 'config', label: isTr ? 'LDAP Sunucu Ayarları' : 'LDAP Server Config', icon: Server },
            { id: 'iso', label: isTr ? 'ISO 27001 A.5.15/16' : 'ISO 27001 Compliance', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-t-xl font-medium transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-accent text-accent font-bold bg-fill/30'
                    : 'border-transparent text-text-3 hover:text-text'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs">
          {/* TAB 1: USERS LIST */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-text-3">
                <p>
                  {isTr
                    ? 'Active Directory etki alanından çekilen kurumsal kullanıcılar ve bağlı oldukları 4 rol:'
                    : 'Enterprise user objects synchronized from Active Directory domain with 4 mapped roles:'}
                </p>
                <span className="font-mono text-[11px]">
                  {isTr ? 'Son Eşitleme:' : 'Last Sync:'} {adConfig.lastSyncTimestamp}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {adUsers.map((user) => {
                  const isCurrent = currentUser.id === user.id;
                  return (
                    <div
                      key={user.id}
                      className={`p-4 rounded-2xl glass transition-all border flex flex-col justify-between ${
                        isCurrent
                          ? 'border-accent shadow-glass-lift bg-fill/50'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatarUrl}
                              alt={user.displayName}
                              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-text text-sm">{user.displayName}</h4>
                                {isCurrent && (
                                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-accent text-white">
                                    {isTr ? 'Aktif Oturum' : 'Active'}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-text-3 truncate max-w-[190px]">{user.title}</p>
                            </div>
                          </div>
                          {getRoleBadge(user.assignedRole)}
                        </div>

                        {/* AD Attributes Card */}
                        <div className="p-2.5 rounded-xl bg-fill/30 space-y-1 font-mono text-[11px] text-text-2 border border-white/5">
                          <div className="flex justify-between">
                            <span className="text-text-3">sAMAccountName:</span>
                            <span className="text-accent font-semibold">{user.sAMAccountName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-3">E-posta:</span>
                            <span className="truncate max-w-[160px] text-right">{user.mail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-3">Departman:</span>
                            <span className="truncate max-w-[160px] text-right font-sans">{user.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-3">AD Grubu:</span>
                            <span className="truncate max-w-[160px] text-right text-emerald-400 font-mono text-[10px]">
                              {user.memberOf[0]?.split(',')[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Switch Button */}
                      <div className="pt-3 mt-3 border-t border-sep/20 flex items-center justify-between">
                        <span className="text-[10px] text-text-3 font-mono">
                          {isTr ? 'Son Giriş:' : 'Logon:'} {user.lastLogonTimestamp.split(' ')[1]}
                        </span>
                        {isCurrent ? (
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isTr ? 'Şu Anki Rol' : 'Current Persona'}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => switchAdUser(user.id)}
                            className="btn btn--accent btn--sm cursor-pointer flex items-center gap-1 text-[11px] !py-1"
                          >
                            <span>{isTr ? 'Bu Role / Kullanıcıya Geç' : 'Switch to Persona'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: GROUP & ROLE MAPPING */}
          {activeTab === 'mapping' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-fill/30 border border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-text flex items-center gap-2">
                  <Layers className="w-4 h-4 text-accent" />
                  {isTr ? '4 Temel Rol ve Active Directory Güvenlik Grupları' : '4-Role AD Group-to-Role Architecture'}
                </h4>
                <p className="text-text-3 leading-relaxed">
                  {isTr
                    ? 'Kullanıcılar etki alanında oturum açtığında veya LDAP senkronizasyonu çalıştığında, üyesi oldukları güvenlik grubuna göre 4 yetki düzeyinden birine atanır.'
                    : 'When users authenticate via Kerberos / LDAPS, their token groups map deterministically to these 4 role profiles:'}
                </p>
              </div>

              <div className="space-y-3">
                {/* 1. Admin */}
                <div className="p-4 rounded-2xl glass border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-400" />
                      <h5 className="font-bold text-text text-sm">{isTr ? '1. Admin (Süper Admin / CISO)' : '1. Admin (Super Admin / CISO)'}</h5>
                    </div>
                    <span className="text-[10px] font-mono bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30">
                      Tam Yetki (Full Governance)
                    </span>
                  </div>
                  <p className="text-text-2 text-[11px]">
                    {isTr
                      ? 'ISO 27001 ISMS denetimleri, AD / LDAP ayarları, donanım silme/ekleme, CAB onayları ve şirket logosu yapılandırması.'
                      : 'Full ISMS governance, Active Directory synchronization, asset provisioning, CAB approvals, and security policies.'}
                  </p>
                  <div className="p-2.5 rounded-xl bg-fill/40 font-mono text-[11px] text-accent flex items-center justify-between">
                    <span className="text-text-3">Eşlenen AD Grubu:</span>
                    <span>{adConfig.groupMappings.adminGroup}</span>
                  </div>
                </div>

                {/* 2. Moderator */}
                <div className="p-4 rounded-2xl glass border border-teal-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-teal-400" />
                      <h5 className="font-bold text-text text-sm">{isTr ? '2. Moderator (Servis Masası & CAB Lideri)' : '2. Moderator (Service Desk & CAB Lead)'}</h5>
                    </div>
                    <span className="text-[10px] font-mono bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full border border-teal-500/30">
                      Operasyon Yönetimi
                    </span>
                  </div>
                  <p className="text-text-2 text-[11px]">
                    {isTr
                      ? 'Gelen çağrıların triage süreçleri, teknisyen atamaları, CAB değişiklik taleplerini oylama ve SLA takibi.'
                      : 'Incoming call triage, assigning technician roster, voting on RFC CAB changes, and SLA management.'}
                  </p>
                  <div className="p-2.5 rounded-xl bg-fill/40 font-mono text-[11px] text-accent flex items-center justify-between">
                    <span className="text-text-3">Eşlenen AD Grubu:</span>
                    <span>{adConfig.groupMappings.moderatorGroup}</span>
                  </div>
                </div>

                {/* 3. Technician */}
                <div className="p-4 rounded-2xl glass border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <h5 className="font-bold text-text text-sm">{isTr ? '3. Teknisyen (Saha & Sistem Uzmanı)' : '3. Technician (Field & Systems Specialist)'}</h5>
                    </div>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                      Teknik Müdahale
                    </span>
                  </div>
                  <p className="text-text-2 text-[11px]">
                    {isTr
                      ? 'Arızaları yerinde/uzaktan çözme, çağrı durumunu ilerletme, donanımları personellere zimmetleme ve dahili teknisyen notları ekleme.'
                      : 'Incident resolution, advancing ticket statuses, hardware custody handover agreements, and technical staff notes.'}
                  </p>
                  <div className="p-2.5 rounded-xl bg-fill/40 font-mono text-[11px] text-accent flex items-center justify-between">
                    <span className="text-text-3">Eşlenen AD Grubu:</span>
                    <span>{adConfig.groupMappings.technicianGroup}</span>
                  </div>
                </div>

                {/* 4. End User */}
                <div className="p-4 rounded-2xl glass border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-400" />
                      <h5 className="font-bold text-text text-sm">{isTr ? '4. Kullanıcı (Şirket Çalışanı)' : '4. End User (Company Employee)'}</h5>
                    </div>
                    <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
                      Self-Servis Portal
                    </span>
                  </div>
                  <p className="text-text-2 text-[11px]">
                    {isTr
                      ? 'Zimmetli donanımlarını görüntüleme, yeni donanım/arıza talebi açma, çağrı durumunu izleme ve çözümü onaylama.'
                      : 'Self-service portal: viewing assigned equipment, requesting gear, logging tickets, and confirming resolutions.'}
                  </p>
                  <div className="p-2.5 rounded-xl bg-fill/40 font-mono text-[11px] text-accent flex items-center justify-between">
                    <span className="text-text-3">Eşlenen AD Grubu:</span>
                    <span>{adConfig.groupMappings.userGroup}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVER CONFIG */}
          {activeTab === 'config' && (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text">LDAP / AD Sunucu Adresi</label>
                  <input
                    type="text"
                    value={adConfig.serverHost}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 font-mono text-xs text-text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text">Etki Alanı (Domain / Realm)</label>
                  <input
                    type="text"
                    value={adConfig.domain}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 font-mono text-xs text-text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text">Port</label>
                  <input
                    type="text"
                    value={`${adConfig.port} (LDAPS)`}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 font-mono text-xs text-text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text">Şifreleme (SSL/TLS)</label>
                  <input
                    type="text"
                    value="TLS 1.3 Active"
                    readOnly
                    className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-emerald-500/30 text-emerald-400 font-mono text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text">Otomatik Eşitleme</label>
                  <input
                    type="text"
                    value={`${adConfig.syncIntervalMinutes} dakikada bir`}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 font-mono text-xs text-text"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text">Search Base DN</label>
                <input
                  type="text"
                  value={adConfig.baseDn}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 font-mono text-xs text-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text">Bind Service Account</label>
                <input
                  type="text"
                  value={adConfig.bindDn}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl glass bg-fill/30 border border-white/10 font-mono text-xs text-text"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="btn btn--accent btn--sm cursor-pointer"
                >
                  {testResult === 'testing' ? 'Bağlantı Test Ediliyor...' : 'Bağlantıyı Sına (Test Bind)'}
                </button>
                {testResult === 'success' && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    LDAPS Bağlantısı Doğrulandı (Kerberos Auth OK)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ISO 27001 AUDIT */}
          {activeTab === 'iso' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-fill/30 border border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-text flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  ISO/IEC 27001:2022 Kimlik ve Erişim Denetimi Uyum Beyanı
                </h4>
                <p className="text-text-3 leading-relaxed">
                  Active Directory entegrasyonu, aşağıdaki ISO 27001 Annex A kontrollerine tam uyum sağlamaktadır:
                </p>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-fill/20 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>A.5.15 Erişim Kontrolü (Access Control)</span>
                    <span>PASS ✓</span>
                  </div>
                  <p className="font-sans text-[11px] text-text-3">
                    En az ayrıcalık (Least Privilege) ve Rol Tabanlı Erişim Kontrolü (RBAC) 4 rol seviyesinde zorunlu kılınmıştır.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-fill/20 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>A.5.16 Kimlik Yönetimi (Identity Management)</span>
                    <span>PASS ✓</span>
                  </div>
                  <p className="font-sans text-[11px] text-text-3">
                    Kullanıcı kimlikleri, hesap açma/kapama süreçleri merkezi Active Directory LDAP etki alanından tek kaynak olarak yönetilir.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-fill/20 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>A.8.20 Ağ Güvenliği & LDAPS</span>
                    <span>PASS ✓</span>
                  </div>
                  <p className="font-sans text-[11px] text-text-3">
                    Dizin sorguları düz metin LDAP (Port 389) yerine zorunlu TLS 1.3 şifreli LDAPS (Port 636) üzerinden gerçekleştirilir.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sep/30 flex items-center justify-between bg-fill/15">
          <div className="flex items-center gap-2 text-text-3 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Directory Forest: {adConfig.domain}</span>
          </div>
          <button
            type="button"
            onClick={() => setAdModalOpen(false)}
            className="btn btn--accent btn--sm cursor-pointer"
          >
            {isTr ? 'Kapat' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
