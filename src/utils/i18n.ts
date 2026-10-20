import { Language } from '../types';

export const translations = {
  tr: {
    // Navigation
    home: 'Komuta Merkezi',
    assets: 'Donanım Envanteri',
    tickets: 'Servis Masası',
    changes: 'Değişiklik CAB',
    compliance: 'ISO 27001 ISMS',
    portal: 'Zimmet Portali',
    settings: 'Görünüm & Sistem',
    pinned: 'Sabitlenenler',
    mode: 'Yetki:',
    superAdmin: 'Süper Admin (CISO)',
    moderatorRole: 'Operasyon Yöneticisi (Mod)',
    technicianRole: 'Saha & Sistem Teknisyeni',
    endUser: 'Çalışan (Kullanıcı)',
    adSync: 'Aktif Dizin (AD Sync)',
    adSyncDesc: 'Kurumsal Active Directory & LDAPS kullanıcı/rol eşitleme',

    // Toolbar
    searchPlaceholder: 'Varlık, seri no, bilet ara (⌘K)...',
    quickCreate: 'Hızlı Ekle',
    newTicket: 'Yeni Çağrı / Bilet',
    registerHardware: 'Donanım Kaydet',
    isoReport: 'ISO 27001 Denetim Raporu',
    notifications: 'Bildirimler & Telemetri',
    outbox: 'Giden E-postalar',

    // Common Buttons
    save: 'Kaydet',
    cancel: 'İptal',
    close: 'Kapat',
    assign: 'Ata',
    resolve: 'Çözümlendi',
    export: 'Dışa Aktar',
    details: 'Detaylar & QR',
    custody: 'Zimmetle',
    viewCustody: 'Zimmet Tutanağı',

    // Sections
    isoPosture: 'ISO 27001 Uyum Skoru',
    enrolledDevices: 'Kayıtlı Cihazlar',
    slaHealth: 'SLA Sağlık Oranı',
    openQueue: 'Açık Çağrılar',
    liveOperations: 'Canlı Operasyon Akışı',
    simulateCall: 'Canlı Çağrı Simüle Et',
    technicianRoster: 'Teknisyen Kadrosu',
    allRecords: 'Tüm Kayıtlar',
    incidents: 'Arızalar / Sistem',
    requests: 'Donanım / Hizmet',
    securityEvents: 'Güvenlik Olayları',
    changesRfc: 'Değişiklikler (CAB)',
    
    // Status
    triage: 'Triage / Yeni',
    inProgress: 'İşlemde',
    pendingCab: 'CAB Onayı Bekliyor',
    resolved: 'Çözümlendi',

    // Company Settings
    companySettings: 'Kurumsal Kimlik & Firma Logosu',
    companyLogoDesc: 'Kurumsal logonuzu yükleyin; sol menüde, resmi zimmet tutanaklarında ve denetim raporlarında otomatik görüntülensin.',
    companyName: 'Firma / Organizasyon Adı',
    uploadLogo: 'Özel Logo Yükle (PNG/SVG)',
    presetLogos: 'Hazır Kurumsal Logolar'
  },
  en: {
    // Navigation
    home: 'Command Center',
    assets: 'Hardware Assets',
    tickets: 'Service Desk',
    changes: 'Change CAB',
    compliance: 'ISO 27001 ISMS',
    portal: 'My Portal',
    settings: 'Appearance & System',
    pinned: 'Pinned',
    mode: 'Role:',
    superAdmin: 'Super Admin (CISO)',
    moderatorRole: 'Operations Lead (Mod)',
    technicianRole: 'Field & Systems Technician',
    endUser: 'Employee (User)',
    adSync: 'Active Directory (AD Sync)',
    adSyncDesc: 'Corporate Active Directory & LDAPS user/role synchronization',

    // Toolbar
    searchPlaceholder: 'Search assets, serials, tickets (⌘K)...',
    quickCreate: 'Quick Create',
    newTicket: 'New Ticket',
    registerHardware: 'Register Hardware',
    isoReport: 'ISO 27001 Audit Report',
    notifications: 'Notifications & Telemetry',
    outbox: 'Outgoing Emails',

    // Common Buttons
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    assign: 'Assign',
    resolve: 'Resolve',
    export: 'Export',
    details: 'Details & QR',
    custody: 'Assign Custody',
    viewCustody: 'Custody Agreement',

    // Sections
    isoPosture: 'ISO 27001 Posture',
    enrolledDevices: 'Enrolled Devices',
    slaHealth: 'SLA Health Rate',
    openQueue: 'Open Queue',
    liveOperations: 'Live Operations Stream',
    simulateCall: 'Simulate Live Call',
    technicianRoster: 'Technician Roster',
    allRecords: 'All Records',
    incidents: 'Incidents / Calls',
    requests: 'Hardware / Service',
    securityEvents: 'Security Events',
    changesRfc: 'Changes (CAB)',

    // Status
    triage: 'Triage / New',
    inProgress: 'In Progress',
    pendingCab: 'Pending CAB',
    resolved: 'Resolved',

    // Company Settings
    companySettings: 'Corporate Identity & Logo',
    companyLogoDesc: 'Upload your company logo to display on the sidebar, official handover forms, and ISO audit reports.',
    companyName: 'Company / Organization Name',
    uploadLogo: 'Upload Custom Logo (PNG/SVG)',
    presetLogos: 'Preset Corporate Logos'
  }
};
