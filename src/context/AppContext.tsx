import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  HardwareAsset,
  Ticket,
  IsoControl,
  AuditLogEntry,
  ChangeRequest,
  Technician,
  OutgoingEmail,
  CompanyProfile,
  LookConfig,
  ThemeMode,
  WallPreset,
  AccentPreset,
  GlassMode,
  AdUser,
  ActiveDirectoryConfig
} from '../types';
import {
  INITIAL_ASSETS,
  INITIAL_TICKETS,
  ISO_27001_CONTROLS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CHANGES,
  INITIAL_TECHNICIANS,
  INITIAL_AD_CONFIG,
  INITIAL_AD_USERS
} from '../data/mockData';
import { translations } from '../utils/i18n';

export type ActiveView = 'home' | 'assets' | 'tickets' | 'changes' | 'compliance' | 'portal' | 'settings';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['tr']) => string;

  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  look: LookConfig;
  setLook: React.Dispatch<React.SetStateAction<LookConfig>>;
  updateTheme: (theme: ThemeMode) => void;
  updateWall: (wall: WallPreset) => void;
  updateAccent: (accent: AccentPreset) => void;
  updateGlass: (glass: GlassMode) => void;
  
  // Company Profile & Custom Logo
  companyProfile: CompanyProfile;
  updateCompanyProfile: (name: string, logoUrl: string, tagline?: string) => void;

  assets: HardwareAsset[];
  addAsset: (asset: Omit<HardwareAsset, 'id' | 'qrCodeData' | 'history'>) => void;
  updateAsset: (id: string, updates: Partial<HardwareAsset>) => void;
  assignAsset: (assetId: string, user: { userId: string; userName: string; userEmail: string; department: string }) => void;
  
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'comments' | 'slaRemainingMinutes'>) => void;
  updateTicketStatus: (id: string, status: Ticket['status']) => void;
  reorderTickets: (sourceId: string, targetId: string, newStatus?: Ticket['status']) => void;
  addTicketComment: (ticketId: string, message: string, isInternal: boolean) => void;
  assignTechnician: (ticketId: string, technicianId: string) => void;

  technicians: Technician[];
  
  // Active Directory & LDAP Enterprise Identity Integration (ISO 27001 A.5.15 / A.5.16)
  currentUser: AdUser;
  adUsers: AdUser[];
  adConfig: ActiveDirectoryConfig;
  adModalOpen: boolean;
  setAdModalOpen: (open: boolean) => void;
  syncActiveDirectory: () => Promise<void>;
  switchAdUser: (userId: string) => void;
  updateAdConfig: (config: Partial<ActiveDirectoryConfig>) => void;
  isAdSyncing: boolean;

  // Automated Email Notification System
  outboxEmails: OutgoingEmail[];
  outboxOpen: boolean;
  setOutboxOpen: (open: boolean) => void;

  isoControls: IsoControl[];
  auditLogs: AuditLogEntry[];
  changes: ChangeRequest[];
  
  // Modals & Palette
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  selectedAsset: HardwareAsset | null;
  setSelectedAsset: (asset: HardwareAsset | null) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;

  // Live Simulation
  simulateIncomingLiveEvent: () => void;
  liveEventToast: { message: string; type: string } | null;
  clearLiveEventToast: () => void;

  // Notification badge
  unreadNotifications: number;
  markNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('admin');
  const [language, setLanguage] = useState<Language>('tr'); // Default to Turkish
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [look, setLook] = useState<LookConfig>({
    theme: 'dark',
    wall: 'aurora',
    accent: 'blue',
    glass: 'tinted'
  });

  // Active Directory & LDAP Enterprise Integration State
  const [adUsers, setAdUsers] = useState<AdUser[]>(INITIAL_AD_USERS);
  const [currentUser, setCurrentUser] = useState<AdUser>(INITIAL_AD_USERS[0]);
  const [adConfig, setAdConfig] = useState<ActiveDirectoryConfig>(INITIAL_AD_CONFIG);
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [isAdSyncing, setIsAdSyncing] = useState(false);

  // Company Profile with Logo
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: 'Vitreus Kurumsal',
    logoUrl: '',
    tagline: 'Enterprise ITSM & ISO 27001'
  });

  const [assets, setAssets] = useState<HardwareAsset[]>(INITIAL_ASSETS);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [technicians, setTechnicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [isoControls] = useState<IsoControl[]>(ISO_27001_CONTROLS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [changes] = useState<ChangeRequest[]>(INITIAL_CHANGES);

  // Outbox Emails
  const [outboxEmails, setOutboxEmails] = useState<OutgoingEmail[]>([
    {
      id: 'em-001',
      timestamp: '2026-10-19 22:32:15',
      to: 'lin@enterprise.io',
      recipientName: 'Lin Zhao',
      subject: '[SEC-2026-089] ISO 27001 Güvenlik Olayı: Token İptal Edildi',
      body: 'Sayın Lin Zhao, bildirdiğiniz kayıp donanım tokenı için Okta ve AWS kimlik bilgileri derhal iptal edilmiştir. Yeni token vaulttan hazırlanmaktadır.',
      ticketNumber: 'SEC-2026-089',
      actionType: 'assigned',
      smtpStatus: 'Delivered (250 OK)'
    },
    {
      id: 'em-002',
      timestamp: '2026-10-19 21:40:05',
      to: 'alerts@enterprise.io',
      recipientName: 'NOC Automated Monitoring',
      subject: '[INC-2026-104] Çağrı İşlemde: David Miller Atandı',
      body: 'Cisco C9300 Switch port arıza çağrısı Senior Network Teknisyeni David Miller tarafından incelemeye alınmıştır.',
      ticketNumber: 'INC-2026-104',
      actionType: 'assigned',
      smtpStatus: 'Delivered (250 OK)'
    }
  ]);
  const [outboxOpen, setOutboxOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<HardwareAsset | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [liveEventToast, setLiveEventToast] = useState<{ message: string; type: string } | null>(null);

  // Translation helper
  const t = (key: keyof typeof translations['tr']) => {
    return translations[language][key] || key;
  };

  // Apply look dataset to document element
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.theme = look.theme;
    el.dataset.wall = look.wall;
    el.dataset.accent = look.accent;
    el.dataset.glass = look.glass;
    if (look.glass === 'solid') {
      el.classList.add('is-solid');
    } else {
      el.classList.remove('is-solid');
    }
  }, [look]);

  // Global keydown for ⌘K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setActiveModal(null);
        setOutboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateTheme = (theme: ThemeMode) => setLook((prev) => ({ ...prev, theme }));
  const updateWall = (wall: WallPreset) => setLook((prev) => ({ ...prev, wall }));
  const updateAccent = (accent: AccentPreset) => setLook((prev) => ({ ...prev, accent }));
  const updateGlass = (glass: GlassMode) => setLook((prev) => ({ ...prev, glass }));

  const updateCompanyProfile = (name: string, logoUrl: string, tagline?: string) => {
    setCompanyProfile({
      name,
      logoUrl,
      tagline: tagline || 'Enterprise ITSM & ISO 27001'
    });
    setLiveEventToast({
      message: `🏢 Kurumsal Profil Güncellendi: "${name}"`,
      type: 'info'
    });
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    const matchingUser = adUsers.find((u) => u.assignedRole === newRole);
    if (matchingUser) {
      setCurrentUser(matchingUser);
    }
  };

  const syncActiveDirectory = async () => {
    setIsAdSyncing(true);
    setLiveEventToast({
      message: `🔄 Active Directory (${adConfig.serverHost}) sorgulanıyor...`,
      type: 'info'
    });

    await new Promise((res) => setTimeout(res, 1200));

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setAdConfig((prev) => ({
      ...prev,
      lastSyncTimestamp: now,
      connectionStatus: 'connected'
    }));
    setIsAdSyncing(false);

    logAudit(
      'AD_DIRECTORY_SYNC_SUCCESS',
      'User',
      'OU=Employees,DC=enterprise,DC=corp',
      `Synchronized ${adUsers.length} enterprise accounts via LDAPS (TLS 1.3). Group-to-role mappings active: Admin, Moderator, Technician, User.`,
      'A.5.15 Access control & A.5.16 Identity management'
    );

    setLiveEventToast({
      message: `✅ AD Senkronizasyonu Başarılı: ${adUsers.length} hesap 4 role eşlendi.`,
      type: 'success'
    });
  };

  const switchAdUser = (userId: string) => {
    const user = adUsers.find((u) => u.id === userId);
    if (!user) return;
    setCurrentUser(user);
    setRoleState(user.assignedRole);

    logAudit(
      'AD_USER_SESSION_SWITCH',
      'User',
      user.sAMAccountName,
      `Session context switched to ${user.displayName} (${user.assignedRole.toUpperCase()}) - ${user.title}`,
      'A.5.15 Access control'
    );

    setLiveEventToast({
      message: `👤 Aktif Kullanıcı: ${user.displayName} (${user.assignedRole.toUpperCase()})`,
      type: 'info'
    });
  };

  const updateAdConfig = (config: Partial<ActiveDirectoryConfig>) => {
    setAdConfig((prev) => ({ ...prev, ...config }));
    setLiveEventToast({
      message: `⚙️ AD / LDAP Yapılandırması Güncellendi (${config.serverHost || adConfig.serverHost})`,
      type: 'info'
    });
  };

  const logAudit = (
    action: string,
    entityType: AuditLogEntry['entityType'],
    entityId: string,
    details: string,
    isoControl: string
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const mockHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: now,
      actor: currentUser ? `${currentUser.sAMAccountName}@enterprise.corp` : (role === 'admin' ? 'admin@enterprise.io' : 'employee@enterprise.io'),
      role: role.toUpperCase(),
      ip: '192.168.1.108',
      action,
      entityType,
      entityId,
      details,
      isoControl,
      hash: mockHash
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Helper to dispatch automated outgoing email notifications
  const dispatchAutomatedEmail = (
    to: string,
    recipientName: string,
    subject: string,
    body: string,
    ticketNumber: string,
    actionType: OutgoingEmail['actionType']
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const email: OutgoingEmail = {
      id: `em-${Date.now()}`,
      timestamp: now,
      to,
      recipientName,
      subject,
      body,
      ticketNumber,
      actionType,
      smtpStatus: 'Delivered (250 OK)'
    };

    setOutboxEmails((prev) => [email, ...prev]);
    setLiveEventToast({
      message: `📧 E-posta Gönderildi: ${to} — [${ticketNumber}] ${subject}`,
      type: 'email'
    });

    logAudit(
      'EMAIL_DISPATCHED',
      'Email',
      ticketNumber,
      `Automated notification delivered to ${to} (${subject})`,
      'A.5.24 Incident Communication Protocol'
    );
  };

  const addAsset = (newAssetData: Omit<HardwareAsset, 'id' | 'qrCodeData' | 'history'>) => {
    const id = `ast-${Date.now().toString().slice(-4)}`;
    const asset: HardwareAsset = {
      ...newAssetData,
      id,
      qrCodeData: `https://vitreus.enterprise.io/assets/${newAssetData.assetTag}`,
      history: [
        {
          id: `h-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          action: 'Asset Registered',
          actor: role.toUpperCase(),
          details: `Enrolled into ITAM inventory with classification: ${newAssetData.isoClassification}`
        }
      ]
    };
    setAssets((prev) => [asset, ...prev]);
    logAudit(
      'ASSET_CREATED',
      'Asset',
      asset.assetTag,
      `Hardware device ${asset.name} (${asset.assetTag}) registered. S/N: ${asset.serialNumber}`,
      'A.5.9 Asset Inventory'
    );
  };

  const updateAsset = (id: string, updates: Partial<HardwareAsset>) => {
    setAssets((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    const item = assets.find((a) => a.id === id);
    if (item) {
      logAudit(
        'ASSET_UPDATED',
        'Asset',
        item.assetTag,
        `Attributes modified for asset ${item.assetTag}`,
        'A.5.9 Asset Inventory'
      );
    }
  };

  const assignAsset = (
    assetId: string,
    user: { userId: string; userName: string; userEmail: string; department: string }
  ) => {
    const docId = `DOC-ZMT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];

    setAssets((prev) =>
      prev.map((item) => {
        if (item.id === assetId) {
          return {
            ...item,
            status: 'in_use',
            assignedTo: {
              ...user,
              assignedDate: today,
              custodyDocSigned: true,
              custodyDocId: docId
            },
            history: [
              {
                id: `h-${Date.now()}`,
                date: today,
                action: 'Custody Handover (Zimmet)',
                actor: role.toUpperCase(),
                details: `Physical device assigned to ${user.userName}. Digital custody agreement: ${docId}`
              },
              ...item.history
            ]
          };
        }
        return item;
      })
    );

    const asset = assets.find((a) => a.id === assetId);

    // Send email to employee about hardware custody
    dispatchAutomatedEmail(
      user.userEmail,
      user.userName,
      `[ZİMMET ONAYI] ${asset?.name || 'Cihaz'} Zimmetinize Tanımlandı (${docId})`,
      `Sayın ${user.userName},\n\nŞirketimiz adına ${asset?.name} (${asset?.assetTag}, S/N: ${asset?.serialNumber}) cihazı adınıza zimmetlenmiştir.\nResmi zimmet tutanağınız (${docId}) ISO 27001 standartlarında arşivlenmiştir. Cihazınızı teslim alırken temiz ekran/temiz masa ve güvenlik kurallarına riayet etmenizi rica ederiz.\n\nIT Varlık Yönetimi`,
      asset?.assetTag || assetId,
      'assigned'
    );

    logAudit(
      'CUSTODY_ASSIGNED',
      'Custody',
      asset?.assetTag || assetId,
      `Device ${asset?.name} formally assigned to ${user.userName} (${docId})`,
      'A.5.10 Acceptable Use & Asset Ownership'
    );
  };

  const addTicket = (
    newTicketData: Omit<Ticket, 'id' | 'ticketNumber' | 'createdAt' | 'updatedAt' | 'comments' | 'slaRemainingMinutes'>
  ) => {
    const prefix = newTicketData.type === 'incident' ? 'INC' : newTicketData.type === 'security_incident' ? 'SEC' : 'REQ';
    const num = `${prefix}-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket: Ticket = {
      ...newTicketData,
      id: `tkt-${Date.now()}`,
      ticketNumber: num,
      slaRemainingMinutes: newTicketData.slaTargetMinutes,
      createdAt: now,
      updatedAt: now,
      comments: [
        {
          id: `c-${Date.now()}`,
          author: newTicketData.creator.userName,
          authorRole: role.toUpperCase(),
          timestamp: now,
          message: newTicketData.description,
          isInternal: false
        }
      ]
    };

    setTickets((prev) => [newTicket, ...prev]);
    setUnreadNotifications((prev) => prev + 1);

    // 1. AUTOMATED EMAIL: Ticket Created Notification
    dispatchAutomatedEmail(
      newTicketData.creator.email,
      newTicketData.creator.userName,
      `[${num}] Çağrınız Alındı: ${newTicketData.title}`,
      `Sayın ${newTicketData.creator.userName},\n\nTalebiniz/arızanız "${newTicketData.title}" başarıyla sistemimize kaydedilmiştir.\nÇağrı Numarası: ${num}\nÖncelik Seviyesi: ${newTicketData.priority}\nSLA Hedef Süresi: ${newTicketData.slaTargetMinutes} dakika.\n\nÇağrınız için teknisyen atandığında ve her aşamada tarafınıza otomatik bilgilendirme yapılacaktır.\n\nIT Service Desk`,
      num,
      'created'
    );

    logAudit(
      'TICKET_CREATED',
      'Ticket',
      num,
      `New ${newTicketData.type} logged: "${newTicketData.title}" (${newTicketData.priority})`,
      newTicketData.iso27001Control || 'A.5.24 Incident Management'
    );
  };

  const updateTicketStatus = (id: string, status: Ticket['status']) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    let resolvedTicket: Ticket | undefined;

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          resolvedTicket = { ...t, status, updatedAt: now };
          return resolvedTicket;
        }
        return t;
      })
    );

    const ticket = resolvedTicket || tickets.find((t) => t.id === id);
    if (ticket) {
      // 2. AUTOMATED EMAIL: If status changed to resolved, send resolution email!
      if (status === 'resolved') {
        dispatchAutomatedEmail(
          ticket.creator.email,
          ticket.creator.userName,
          `[${ticket.ticketNumber}] ÇÖZÜMLENDİ: ${ticket.title}`,
          `Sayın ${ticket.creator.userName},\n\n${ticket.ticketNumber} numaralı "${ticket.title}" konulu çağrınız IT ekibimiz tarafından başarıyla çözümlenmiştir.\n\nSorununuz devam ederse veya ek destek isterseniz çağrıyı yeniden açabilirsiniz.\nMemnuniyetinizi değerlendirmek için: https://vitreus.enterprise.io/feedback/${ticket.ticketNumber}\n\nİyi çalışmalar dileriz,\nIT Destek Masası`,
          ticket.ticketNumber,
          'resolved'
        );
      }

      logAudit(
        'TICKET_STATUS_CHANGED',
        'Ticket',
        ticket.ticketNumber,
        `Status progressed to "${status}"`,
        ticket.iso27001Control || 'A.5.24 Incident Management'
      );
    }
  };

  const reorderTickets = (sourceId: string, targetId: string, newStatus?: Ticket['status']) => {
    setTickets((prev) => {
      const sourceIndex = prev.findIndex((t) => t.id === sourceId);
      const targetIndex = prev.findIndex((t) => t.id === targetId);
      if (sourceIndex === -1 || targetIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(sourceIndex, 1);
      if (newStatus && moved.status !== newStatus) {
        moved.status = newStatus;
        logAudit(
          'TICKET_DRAG_DROP_STATUS_UPDATE',
          'Ticket',
          moved.ticketNumber,
          `Card dragged & dropped to column "${newStatus}"`,
          moved.iso27001Control || 'A.5.24 Incident Management'
        );
      }
      updated.splice(targetIndex, 0, moved);
      return updated;
    });
  };

  const addTicketComment = (ticketId: string, message: string, isInternal: boolean) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const authorName = currentUser ? `${currentUser.displayName} (${currentUser.assignedRole.toUpperCase()})` : (role === 'admin' ? 'Selim K. (Admin)' : 'Staff');
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName,
      authorRole: role.toUpperCase(),
      timestamp: now,
      message,
      isInternal
    };

    let targetTicket: Ticket | undefined;
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          targetTicket = {
            ...t,
            updatedAt: now,
            comments: [...t.comments, newComment]
          };
          return targetTicket;
        }
        return t;
      })
    );

    // 3. AUTOMATED EMAIL: If public comment added, send email notification to ticket creator!
    if (!isInternal && targetTicket) {
      dispatchAutomatedEmail(
        targetTicket.creator.email,
        targetTicket.creator.userName,
        `[${targetTicket.ticketNumber}] Çağrınıza Yeni Not Eklendi`,
        `Sayın ${targetTicket.creator.userName},\n\n${targetTicket.ticketNumber} numaralı çağrınız için bir güncelleme yapılmıştır:\n\n${authorName} dedi ki:\n"${message}"\n\nÇağrınızın güncel durumunu portal üzerinden takip edebilirsiniz.`,
        targetTicket.ticketNumber,
        'comment'
      );
    }
  };

  const assignTechnician = (ticketId: string, technicianId: string) => {
    const targetTech = technicians.find((t) => t.id === technicianId);
    if (!targetTech) return;

    let targetTicket: Ticket | undefined;
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          targetTicket = {
            ...t,
            status: t.status === 'new' ? 'in_progress' : t.status,
            assignee: {
              userId: targetTech.id,
              userName: targetTech.name,
              avatar: targetTech.avatar,
              role: targetTech.role
            }
          };
          return targetTicket;
        }
        return t;
      })
    );

    // Update technician workload
    setTechnicians((prev) =>
      prev.map((t) =>
        t.id === technicianId
          ? { ...t, activeTicketsCount: t.activeTicketsCount + 1 }
          : t
      )
    );

    const ticket = targetTicket || tickets.find((t) => t.id === ticketId);
    if (ticket) {
      // 4. AUTOMATED EMAIL: Technician Assigned Notification to User & Technician
      dispatchAutomatedEmail(
        ticket.creator.email,
        ticket.creator.userName,
        `[${ticket.ticketNumber}] Teknisyen Atandı: ${targetTech.name}`,
        `Sayın ${ticket.creator.userName},\n\n${ticket.ticketNumber} numaralı çağrınız için ${targetTech.name} (${targetTech.role}) görevlendirilmiştir.\nUzmanımız sorununuzla ilgili çalışmaya başlamıştır.\n\nİletişim: ${targetTech.email}`,
        ticket.ticketNumber,
        'assigned'
      );
    }

    logAudit(
      'TECHNICIAN_ASSIGNED',
      'Technician',
      ticket?.ticketNumber || ticketId,
      `Assigned to ${targetTech.name} (${targetTech.role}) under ISO A.5.24`,
      'A.5.24 Incident Management'
    );
  };

  // Simulate an incoming live ITSM call or incident
  const simulateIncomingLiveEvent = () => {
    const sampleEvents = [
      {
        title: 'Datacenter PDU Voltage Drop Warning (DC1-Rack14)',
        type: 'incident' as const,
        priority: 'P2 - High' as const,
        desc: 'Phase B voltage dropped to 204V on Rack 14 PDU. Datadog automated snmp-trap received.'
      },
      {
        title: 'New Hardware Zimmet Request: 16" M3 Max for Senior Staff',
        type: 'service_request' as const,
        priority: 'P3 - Medium' as const,
        desc: 'Engineering manager approved request for incoming Staff Security Engineer onboarding.'
      },
      {
        title: 'ISO 27001 Security Alert: Multiple Failed SSH Logins on Perimeter FG-100F',
        type: 'security_incident' as const,
        priority: 'P1 - Critical' as const,
        desc: '14 consecutive invalid credentials from IP 185.220.101.4 against perimeter gateway. IP auto-blacklisted by fail2ban.'
      }
    ];

    const randomEvt = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
    addTicket({
      type: randomEvt.type,
      title: randomEvt.title,
      description: randomEvt.desc,
      priority: randomEvt.priority,
      status: 'new',
      creator: {
        userId: 'live-bot',
        userName: 'Enterprise Live Gateway',
        department: 'Real-Time Telemetry',
        email: 'telemetry@enterprise.io'
      },
      isoClassification: randomEvt.type === 'security_incident' ? 'Restricted' : 'Confidential',
      slaTargetMinutes: randomEvt.priority.startsWith('P1') ? 60 : 240
    });
  };

  const clearLiveEventToast = () => setLiveEventToast(null);

  const markNotificationsRead = () => {
    setUnreadNotifications(0);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        activeView,
        setActiveView,
        look,
        setLook,
        updateTheme,
        updateWall,
        updateAccent,
        updateGlass,
        companyProfile,
        updateCompanyProfile,
        assets,
        addAsset,
        updateAsset,
        assignAsset,
        tickets,
        addTicket,
        updateTicketStatus,
        reorderTickets,
        addTicketComment,
        assignTechnician,
        technicians,
        // Active Directory Integration
        currentUser,
        adUsers,
        adConfig,
        adModalOpen,
        setAdModalOpen,
        syncActiveDirectory,
        switchAdUser,
        updateAdConfig,
        isAdSyncing,
        outboxEmails,
        outboxOpen,
        setOutboxOpen,
        isoControls,
        auditLogs,
        changes,
        searchOpen,
        setSearchOpen,
        activeModal,
        setActiveModal,
        selectedAsset,
        setSelectedAsset,
        selectedTicket,
        setSelectedTicket,
        simulateIncomingLiveEvent,
        liveEventToast,
        clearLiveEventToast,
        unreadNotifications,
        markNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
