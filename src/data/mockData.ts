import {
  HardwareAsset,
  Ticket,
  IsoControl,
  AuditLogEntry,
  ChangeRequest,
  Technician,
  AdUser,
  ActiveDirectoryConfig
} from '../types';

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'tech-001',
    name: 'David Miller',
    role: 'Senior Network & Infrastructure Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    email: 'david.miller@enterprise.io',
    specialty: 'Cisco Routing/Switching, Firewalls & Datacenter Cabling',
    status: 'online',
    activeTicketsCount: 2,
    resolvedTicketsCount: 142,
    isoClearance: 'Level 2 (Confidential)'
  },
  {
    id: 'tech-002',
    name: 'Sarah Jenkins',
    role: 'IT Hardware Asset & Logistics Coordinator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    email: 'sarah.j@enterprise.io',
    specialty: 'ITAM, Zimmet Tutanağı Yönetimi, Apple/Dell Tedarik',
    status: 'online',
    activeTicketsCount: 1,
    resolvedTicketsCount: 215,
    isoClearance: 'Level 2 (Confidential)'
  },
  {
    id: 'tech-003',
    name: 'Selim Kucukbay',
    role: 'Lead Architect & CISO Deputy',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    email: 'selim@enterprise.io',
    specialty: 'ISO 27001 ISMS, P1 Security Incident Response, Jamf MDM',
    status: 'online',
    activeTicketsCount: 2,
    resolvedTicketsCount: 380,
    isoClearance: 'Level 3 (Restricted / CISO)'
  },
  {
    id: 'tech-004',
    name: 'Alex Rivera',
    role: 'DevOps & Cloud Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    email: 'alex.rivera@enterprise.io',
    specialty: 'AWS/Azure Cloud, Kubernetes, Linux Server Hardening',
    status: 'on_call',
    activeTicketsCount: 0,
    resolvedTicketsCount: 98,
    isoClearance: 'Level 2 (Confidential)'
  },
  {
    id: 'tech-005',
    name: 'Zeynep Aydin',
    role: 'Incident Response Lead & SecOps',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    email: 'zeynep@enterprise.io',
    specialty: 'SIEM/EDR Triage, Phishing, Adli Bilişim & Kanıt Toplama',
    status: 'online',
    activeTicketsCount: 1,
    resolvedTicketsCount: 167,
    isoClearance: 'Level 3 (Restricted / CISO)'
  },
  {
    id: 'tech-006',
    name: 'Kerem Demir',
    role: 'Field Support & Endpoint Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    email: 'kerem.demir@enterprise.io',
    specialty: 'MacOS / Windows Arıza Tespiti, Donanım Onarım, Monitör Kurulum',
    status: 'busy',
    activeTicketsCount: 1,
    resolvedTicketsCount: 184,
    isoClearance: 'Level 1 (Standard)'
  }
];

export const INITIAL_ASSETS: HardwareAsset[] = [
  {
    id: 'ast-001',
    assetTag: 'AST-2026-M3X',
    name: 'MacBook Pro 16" M3 Max',
    category: 'laptop',
    brand: 'Apple',
    model: 'MacBook Pro 16,1 (2024)',
    serialNumber: 'C02G901XMD6R',
    macAddress: 'F0:18:98:3A:42:1B',
    specs: {
      cpu: 'Apple M3 Max 16-Core',
      ram: '64 GB Unified LPDDR5',
      storage: '1 TB NVMe SSD',
      os: 'macOS Sequoia 15.3',
      screenSize: '16.2" Liquid Retina XDR',
      ports: '3x TB4, HDMI 2.1, MagSafe 3, SDXC'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-101',
      userName: 'Selim K. (Lead Architect)',
      userEmail: 'selim@enterprise.io',
      department: 'Infrastructure & SecOps',
      assignedDate: '2025-01-15',
      custodyDocSigned: true,
      custodyDocId: 'DOC-ZMT-2025-0812'
    },
    location: 'Istanbul HQ - 4th Floor - Room 402',
    isoClassification: 'Restricted',
    securityPosture: {
      diskEncryption: true,
      edrActive: true,
      antivirusUpdated: true,
      lastSecurityScan: '2026-10-18 09:30',
      cvePatched: true,
      vulnerabilitiesCount: 0,
      secureDisposalCertified: false
    },
    purchaseDate: '2024-11-20',
    warrantyExpiry: '2027-11-20',
    purchaseCost: 3899,
    vendor: 'Apple Business Enterprise',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-M3X',
    notes: 'Primary workstation for Head of SecOps. Zero-trust enrolled with Jamf Pro & Cloudflare WARP.',
    history: [
      { id: 'h1', date: '2024-11-20', action: 'Asset Procurement', actor: 'Procurement Dept', details: 'Purchased via PO #88219' },
      { id: 'h2', date: '2024-11-22', action: 'Security Baseline Applied', actor: 'SysAdmin Lin', details: 'FileVault enabled, CrowdStrike Falcon MDM enrolled' },
      { id: 'h3', date: '2025-01-15', action: 'Custody Handover (Zimmet)', actor: 'IT Asset Lead', details: 'Digital handover signed by Selim K.' }
    ]
  },
  {
    id: 'ast-002',
    assetTag: 'AST-2026-SRV1',
    name: 'Dell PowerEdge R750 2U Rack Server',
    category: 'server',
    brand: 'Dell Technologies',
    model: 'PowerEdge R750 Rack Server',
    serialNumber: '7X91KM3',
    macAddress: '00:1E:67:D2:C1:90',
    specs: {
      cpu: '2x Intel Xeon Platinum 8368 (76 Cores total)',
      ram: '512 GB DDR4-3200 ECC Registered',
      storage: '8x 3.84TB SAS SSD Enterprise (RAID 10)',
      os: 'Ubuntu Server 24.04 LTS HWE',
      ports: '4x 25GbE SFP28, iDRAC9 Enterprise'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-100',
      userName: 'Core Infrastructure Team',
      userEmail: 'devops@enterprise.io',
      department: 'Platform Engineering',
      assignedDate: '2024-05-10',
      custodyDocSigned: true,
      custodyDocId: 'DOC-DC-2024-0012'
    },
    location: 'Primary Datacenter DC-1 - Rack Row B / Rack 14U',
    isoClassification: 'Confidential',
    securityPosture: {
      diskEncryption: true,
      edrActive: true,
      antivirusUpdated: true,
      lastSecurityScan: '2026-10-19 02:00',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2024-04-12',
    warrantyExpiry: '2029-04-12',
    purchaseCost: 14200,
    vendor: 'Dell Enterprise Direct',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-SRV1',
    notes: 'Kubernetes Master Node 01. Strict dual-custody access protocol under ISO 27001 Annex A.11 Physical Security.',
    history: [
      { id: 'h1', date: '2024-04-12', action: 'Server Commissioned', actor: 'Data Center Lead', details: 'Rack mounted in DC-1 Rack 14' },
      { id: 'h2', date: '2024-05-10', action: 'ISO 27001 Physical Audit', actor: 'Auditor Meyer', details: 'Verified physical cage access controls' }
    ]
  },
  {
    id: 'ast-003',
    assetTag: 'AST-2026-SW01',
    name: 'Cisco Catalyst 9300-48UXM Switch',
    category: 'network',
    brand: 'Cisco Systems',
    model: 'C9300-48UXM-A',
    serialNumber: 'FOC2419L0P3',
    macAddress: '70:B3:17:84:DE:61',
    specs: {
      cpu: 'Cisco UADP 2.0 ASIC Quad-Core',
      ram: '16 GB DRAM',
      storage: '16 GB Flash + 120GB SSD',
      os: 'Cisco IOS XE 17.12.3b',
      ports: '48x Multi-Gigabit mGig PoE+ (90W), 4x 40G Uplinks'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-102',
      userName: 'Network Engineering Group',
      userEmail: 'netops@enterprise.io',
      department: 'Network Operations',
      assignedDate: '2023-09-01',
      custodyDocSigned: true,
      custodyDocId: 'DOC-NET-2023-991'
    },
    location: 'HQ Floor 2 - MDF Telecom Closet Rack 01',
    isoClassification: 'Confidential',
    securityPosture: {
      diskEncryption: false,
      edrActive: false,
      antivirusUpdated: false,
      lastSecurityScan: '2026-10-15 14:00',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2023-08-15',
    warrantyExpiry: '2028-08-15',
    purchaseCost: 6850,
    vendor: 'Cisco Gold Partner Inc.',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-SW01',
    notes: 'Core Distribution Switch. 802.1X Network Access Control enforced for all physical ethernet wall outlets.',
    history: [
      { id: 'h1', date: '2023-09-01', action: 'Installed & Configured', actor: 'Network Eng', details: 'Radius 802.1x authentication configured' }
    ]
  },
  {
    id: 'ast-004',
    assetTag: 'AST-2026-YUBI-44',
    name: 'YubiKey 5C NFC FIPS Security Key',
    category: 'security_token',
    brand: 'Yubico',
    model: 'YubiKey 5C NFC FIPS',
    serialNumber: 'YB-89218402',
    specs: {
      os: 'FIPS 140-2 Level 3 Certified Firmware 5.4.3',
      ports: 'USB-C / NFC Dual Interface'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-104',
      userName: 'Lin Zhao (Product Lead)',
      userEmail: 'lin@enterprise.io',
      department: 'Product & Design',
      assignedDate: '2025-02-01',
      custodyDocSigned: true,
      custodyDocId: 'DOC-ZMT-2025-0104'
    },
    location: 'Assigned to Custodian (Mobile)',
    isoClassification: 'Restricted',
    securityPosture: {
      diskEncryption: true,
      edrActive: true,
      antivirusUpdated: true,
      lastSecurityScan: '2026-10-19 11:00',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2025-01-20',
    warrantyExpiry: '2027-01-20',
    purchaseCost: 85,
    vendor: 'Yubico AB',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-YUBI-44',
    notes: 'Hardware MFA token for GitHub Enterprise, AWS Production & Okta FastPass phishing-resistant FIDO2 authentication.',
    history: [
      { id: 'h1', date: '2025-02-01', action: 'Token Provisioned', actor: 'SecOps', details: 'Enrolled in Okta FIDO2 & AWS IAM MFA' }
    ]
  },
  {
    id: 'ast-005',
    assetTag: 'AST-2026-M14P',
    name: 'MacBook Pro 14" M3 Pro',
    category: 'laptop',
    brand: 'Apple',
    model: 'MacBook Pro 14,2 (2024)',
    serialNumber: 'C02H189KM21L',
    macAddress: 'F0:18:98:81:AA:99',
    specs: {
      cpu: 'Apple M3 Pro 11-Core',
      ram: '36 GB Unified LPDDR5',
      storage: '512 GB SSD',
      os: 'macOS Sequoia 15.3',
      screenSize: '14.2" Liquid Retina XDR'
    },
    status: 'in_stock',
    location: 'HQ IT Warehouse - Secure Cage Cabinet A-03',
    isoClassification: 'Internal',
    securityPosture: {
      diskEncryption: true,
      edrActive: true,
      antivirusUpdated: true,
      lastSecurityScan: '2026-10-17 16:45',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2025-03-10',
    warrantyExpiry: '2028-03-10',
    purchaseCost: 2399,
    vendor: 'Apple Business Enterprise',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-M14P',
    notes: 'Imaged with corporate Gold Master. Ready for immediate deployment to incoming developer or manager.',
    history: [
      { id: 'h1', date: '2025-03-10', action: 'Device Received', actor: 'IT Helpdesk', details: 'Added to inventory stock pool' }
    ]
  },
  {
    id: 'ast-006',
    assetTag: 'AST-2026-FW01',
    name: 'Fortinet FortiGate 100F Firewall',
    category: 'network',
    brand: 'Fortinet',
    model: 'FG-100F Next-Gen Security Gateway',
    serialNumber: 'FGT100FT2189912',
    macAddress: '00:09:0F:7D:63:B1',
    specs: {
      cpu: 'Fortinet SOC4 & CP9 Hardware Acceleration',
      ram: '8 GB Memory',
      storage: 'Internal Flash Storage',
      os: 'FortiOS 7.4.4',
      ports: '2x 10GE SFP+ FortiLink, 18x GE RJ45, 4x GE SFP'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-102',
      userName: 'Cyber Security Operations Center',
      userEmail: 'csoc@enterprise.io',
      department: 'SecOps',
      assignedDate: '2024-02-18',
      custodyDocSigned: true,
      custodyDocId: 'DOC-FW-2024-102'
    },
    location: 'Datacenter DC-1 - Edge Perimeter Rack 01',
    isoClassification: 'Restricted',
    securityPosture: {
      diskEncryption: true,
      edrActive: true,
      antivirusUpdated: true,
      lastSecurityScan: '2026-10-19 04:00',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2024-02-10',
    warrantyExpiry: '2027-02-10',
    purchaseCost: 4950,
    vendor: 'Fortinet Platinum Partner',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-FW01',
    notes: 'Perimeter Next-Gen Firewall. IPS/IDS, SSL Deep Inspection and IPsec tunnels compliant with ISO 27001 Annex A.13.',
    history: [
      { id: 'h1', date: '2024-02-18', action: 'Deployment in HA Pair', actor: 'CISO Office', details: 'Configured active-passive high availability cluster' }
    ]
  },
  {
    id: 'ast-007',
    assetTag: 'AST-2026-MON32',
    name: 'Dell UltraSharp 32" 4K Video Conferencing Monitor',
    category: 'display',
    brand: 'Dell Technologies',
    model: 'U3223QZ 4K HDR IPS Black',
    serialNumber: 'CN-0K791X-74261',
    specs: {
      screenSize: '31.5" 4K UHD (3840 x 2160)',
      ports: 'USB-C 90W PD, RJ45 Ethernet, 4K Sony Starvis Webcam, Echo-cancelling Mic'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-101',
      userName: 'Selim K. (Lead Architect)',
      userEmail: 'selim@enterprise.io',
      department: 'Infrastructure & SecOps',
      assignedDate: '2025-01-15',
      custodyDocSigned: true,
      custodyDocId: 'DOC-ZMT-2025-0812'
    },
    location: 'Istanbul HQ - 4th Floor - Room 402',
    isoClassification: 'Internal',
    securityPosture: {
      diskEncryption: false,
      edrActive: false,
      antivirusUpdated: false,
      lastSecurityScan: '2026-09-01',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2025-01-10',
    warrantyExpiry: '2028-01-10',
    purchaseCost: 980,
    vendor: 'Dell Enterprise Direct',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-MON32',
    notes: 'Equipped with built-in physical privacy webcam shutter for compliance with clean desk policy.',
    history: [
      { id: 'h1', date: '2025-01-15', action: 'Assigned with Laptop', actor: 'IT Asset Lead', details: 'Added to Selim K. asset custody list' }
    ]
  },
  {
    id: 'ast-008',
    assetTag: 'AST-2026-IP16P',
    name: 'iPhone 16 Pro 256GB Titanium',
    category: 'mobile',
    brand: 'Apple',
    model: 'iPhone 16 Pro (A3293)',
    serialNumber: 'DN6M829QG8',
    specs: {
      cpu: 'Apple A18 Pro 6-Core',
      ram: '8 GB Memory',
      storage: '256 GB NVMe',
      os: 'iOS 18.2 Enterprise MDM Enrolled',
      screenSize: '6.3" Super Retina XDR 120Hz'
    },
    status: 'in_use',
    assignedTo: {
      userId: 'usr-103',
      userName: 'Zeynep A. (On-Call Incident Lead)',
      userEmail: 'zeynep@enterprise.io',
      department: 'Incident Response & NOC',
      assignedDate: '2024-10-05',
      custodyDocSigned: true,
      custodyDocId: 'DOC-ZMT-2024-9901'
    },
    location: 'Assigned to Custodian (Duty Phone)',
    isoClassification: 'Confidential',
    securityPosture: {
      diskEncryption: true,
      edrActive: true,
      antivirusUpdated: true,
      lastSecurityScan: '2026-10-18 22:00',
      cvePatched: true,
      vulnerabilitiesCount: 0
    },
    purchaseDate: '2024-09-28',
    warrantyExpiry: '2026-09-28',
    purchaseCost: 1199,
    vendor: 'Turkcell Kurumsal',
    qrCodeData: 'https://vitreus.enterprise.io/assets/AST-2026-IP16P',
    notes: '24/7 Duty escalation phone. Microsoft Intune MDM containerized work profile active.',
    history: [
      { id: 'h1', date: '2024-10-05', action: 'Device Enrolled', actor: 'SecOps', details: 'Intune MDM profile & PagerDuty escalation enrolled' }
    ]
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt-001',
    ticketNumber: 'INC-2026-104',
    type: 'incident',
    title: 'Core Switch SW01 Port Gi1/0/24 CRC Errors Detected',
    description: 'Automated Datadog Network Monitor alert: 4,820 CRC input errors observed on uplink Gi1/0/24 connecting to DC-1 compute cluster. Potential fiber optic patch cord degradation.',
    priority: 'P2 - High',
    status: 'in_progress',
    creator: {
      userId: 'sys-bot',
      userName: 'Datadog Network Sentry',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      department: 'NOC Automated Monitoring',
      email: 'alerts@enterprise.io'
    },
    assignee: {
      userId: 'tech-001',
      userName: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'Senior Network Technician'
    },
    linkedAssetId: 'ast-003',
    linkedAssetName: 'Cisco Catalyst 9300-48UXM Switch (AST-2026-SW01)',
    iso27001Control: 'A.8.14 Redundancy of information processing facilities',
    isoClassification: 'Confidential',
    slaTargetMinutes: 240,
    slaRemainingMinutes: 85,
    createdAt: '2026-10-19 19:15',
    updatedAt: '2026-10-19 21:40',
    comments: [
      {
        id: 'c1',
        author: 'Datadog Network Sentry',
        authorRole: 'System',
        timestamp: '2026-10-19 19:15',
        message: 'Threshold exceeded: Interface GigabitEthernet1/0/24 error rate > 2.5% over 5-minute sampling window.',
        isInternal: false
      },
      {
        id: 'c2',
        author: 'David Miller',
        authorRole: 'Technician',
        timestamp: '2026-10-19 20:30',
        message: 'Checked transceiver SFP DOM diagnostic readings. Optical RX power dropped to -14.2 dBm. Preparing replacement 10G LC patch cord for datacenter maintenance.',
        isInternal: true
      }
    ]
  },
  {
    id: 'tkt-002',
    ticketNumber: 'SEC-2026-089',
    type: 'security_incident',
    title: 'ISO 27001 Security Incident: Suspected Lost YubiKey MFA Token',
    description: 'Employee reported lost YubiKey 5C NFC after business travel flight TK1822. Immediate revocation of Okta WebAuthn credential and AWS IAM temporary access credentials required under ISO 27001 A.5.24 & A.5.25 protocol.',
    priority: 'P1 - Critical',
    status: 'in_progress',
    creator: {
      userId: 'usr-104',
      userName: 'Lin Zhao',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      department: 'Product Lead',
      email: 'lin@enterprise.io'
    },
    assignee: {
      userId: 'tech-003',
      userName: 'Selim Kucukbay',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      role: 'Lead Architect & CISO Deputy'
    },
    linkedAssetId: 'ast-004',
    linkedAssetName: 'YubiKey 5C NFC FIPS Security Key (AST-2026-YUBI-44)',
    iso27001Control: 'A.5.24 Information security incident management',
    isoClassification: 'Restricted',
    slaTargetMinutes: 60,
    slaRemainingMinutes: 28,
    createdAt: '2026-10-19 22:10',
    updatedAt: '2026-10-19 22:32',
    comments: [
      {
        id: 'c1',
        author: 'Selim K.',
        authorRole: 'CISO Deputy',
        timestamp: '2026-10-19 22:15',
        message: 'Okta WebAuthn credential ID 00u821.. deactivated. AWS IAM credentials invalidated. Zero failed login attempts registered since departure.',
        isInternal: true
      },
      {
        id: 'c2',
        author: 'Selim K.',
        authorRole: 'CISO Deputy',
        timestamp: '2026-10-19 22:30',
        message: 'Replacement YubiKey 5C prepared from vault storage (AST-2026-YUBI-99). Awaiting physical custody handover signature.',
        isInternal: false
      }
    ]
  },
  {
    id: 'tkt-003',
    ticketNumber: 'REQ-2026-042',
    type: 'service_request',
    title: 'Hardware Procurement: 4K External Monitor for Remote Desk',
    description: 'Requesting secondary high-resolution 32" 4K external display for multi-window architecture review and high-DPI CAD schematics.',
    priority: 'P3 - Medium',
    status: 'pending_approval',
    creator: {
      userId: 'usr-105',
      userName: 'Emre V.',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
      department: 'DevOps & Cloud Systems',
      email: 'emre@enterprise.io'
    },
    assignee: {
      userId: 'tech-002',
      userName: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      role: 'IT Asset Coordinator'
    },
    iso27001Control: 'A.5.10 Acceptable use of information and other associated assets',
    isoClassification: 'Internal',
    slaTargetMinutes: 1440,
    slaRemainingMinutes: 1120,
    createdAt: '2026-10-18 11:20',
    updatedAt: '2026-10-19 14:00',
    comments: [
      {
        id: 'c1',
        author: 'Sarah Jenkins',
        authorRole: 'IT Asset Coordinator',
        timestamp: '2026-10-19 14:00',
        message: 'Budget approval requested from Engineering Manager. Stock unit Dell U3223QZ available in warehouse cage.',
        isInternal: true
      }
    ]
  },
  {
    id: 'tkt-004',
    ticketNumber: 'CHG-2026-018',
    type: 'change_request',
    title: 'RFC: FortiGate 100F Firmware Upgrade to FortiOS 7.4.5',
    description: 'Scheduled maintenance to apply security patch resolving CVE-2026-18921 (SSL VPN web portal buffer overflow vulnerability). Maintenance window scheduled for Saturday 02:00-04:00 AM UTC.',
    priority: 'P2 - High',
    status: 'in_progress',
    creator: {
      userId: 'usr-101',
      userName: 'Selim K.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      department: 'Infrastructure & SecOps',
      email: 'selim@enterprise.io'
    },
    assignee: {
      userId: 'tech-001',
      userName: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      role: 'Senior Network Technician'
    },
    linkedAssetId: 'ast-006',
    linkedAssetName: 'Fortinet FortiGate 100F Firewall (AST-2026-FW01)',
    iso27001Control: 'A.8.32 Change management',
    isoClassification: 'Confidential',
    slaTargetMinutes: 2880,
    slaRemainingMinutes: 1940,
    createdAt: '2026-10-17 15:00',
    updatedAt: '2026-10-19 18:20',
    comments: [
      {
        id: 'c1',
        author: 'Selim K.',
        authorRole: 'CISO Deputy',
        timestamp: '2026-10-17 15:30',
        message: 'CAB Review completed with 3/3 unanimous approvals. Rollback image verified on secondary partition.',
        isInternal: true
      }
    ]
  }
];

export const ISO_27001_CONTROLS: IsoControl[] = [
  {
    code: 'A.5.9',
    title: 'Inventory of Information and Other Associated Assets',
    clause: 'Clause 5 (Organizational)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 42,
    lastAuditDate: '2026-10-15',
    assignedOfficer: 'CISO Office & IT Asset Manager',
    description: 'An inventory of information and other associated assets, including owners, physical locations, and technical specs, is identified, maintained, and audited.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'All physical hardware assigned unique Asset Tags (AST-2026)',
      'Designated custodians documented for 100% of devices',
      'Regular bi-annual physical audits conducted in DC and HQ'
    ]
  },
  {
    code: 'A.5.10',
    title: 'Acceptable Use of Information and Associated Assets',
    clause: 'Clause 5 (Organizational)',
    status: 'Compliant',
    compliancePercent: 96,
    evidenceCount: 128,
    lastAuditDate: '2026-10-12',
    assignedOfficer: 'HR & IT Compliance',
    description: 'Rules for acceptable use and procedures for handling assets are formally documented and digitally signed via Zimmet Tutanağı by each custodian.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'Digital signature on Zimmet Tutanağı required prior to handover',
      'Clean Desk / Clean Screen policy binding',
      'Restrictions on third-party software installation'
    ]
  },
  {
    code: 'A.5.11',
    title: 'Return of Assets',
    clause: 'Clause 5 (Organizational)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 34,
    lastAuditDate: '2026-10-10',
    assignedOfficer: 'HR & IT Operations',
    description: 'All personnel and external party users shall return all of the organizational assets in their possession upon termination of their employment or contract.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'Offboarding checklist cross-referenced with asset registry',
      'Cryptographic data wiping certificate before re-issuance',
      'Immediate revocation of physical and logical access'
    ]
  },
  {
    code: 'A.5.12',
    title: 'Classification of Information',
    clause: 'Clause 5 (Organizational)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 75,
    lastAuditDate: '2026-10-10',
    assignedOfficer: 'Data Protection Officer',
    description: 'Information and assets are classified as Public, Internal, Confidential, or Restricted in accordance with legal and business criticality.',
    linkedAssetsCount: 8,
    auditCriteria: [
      '4-tier classification standard strictly applied',
      'Security tokens & core routers designated as Restricted',
      'Classification badges displayed across all tickets and assets'
    ]
  },
  {
    code: 'A.5.13',
    title: 'Labelling of Information & Equipment',
    clause: 'Clause 5 (Organizational)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 88,
    lastAuditDate: '2026-10-14',
    assignedOfficer: 'IT Warehouse Lead',
    description: 'An appropriate set of procedures for information and physical equipment labelling shall be developed and implemented in accordance with classification scheme.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'Tamper-evident physical QR code stickers on all chassis',
      'Direct link to cloud asset verification ledger',
      'Classification level physically designated on hardware'
    ]
  },
  {
    code: 'A.5.24',
    title: 'Information Security Incident Management Planning',
    clause: 'Clause 5 (Organizational)',
    status: 'Compliant',
    compliancePercent: 95,
    evidenceCount: 64,
    lastAuditDate: '2026-10-19',
    assignedOfficer: 'CSIRT Team Lead',
    description: 'Responsibilities and procedures for detecting, reporting, assessing, and responding to information security events and incidents.',
    linkedAssetsCount: 4,
    auditCriteria: [
      'Dedicated P1 Security Incident triage queue with 1-hour SLA',
      'Emergency token revocation protocol in identity provider',
      'Evidence collection and root-cause analysis (RCA) reporting'
    ]
  },
  {
    code: 'A.7.10',
    title: 'Storage Media & Data Protection',
    clause: 'Clause 7 (Physical)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 140,
    lastAuditDate: '2026-10-18',
    assignedOfficer: 'SecOps Team',
    description: 'Storage media shall be managed through its lifecycle of acquisition, use, transportation, and disposal in accordance with organization classification.',
    linkedAssetsCount: 8,
    auditCriteria: [
      '100% full-disk encryption enforced via MDM',
      'Physical drive serial tracking in datacenter servers',
      'Removable media encryption enforcement'
    ]
  },
  {
    code: 'A.7.14',
    title: 'Secure Disposal or Re-use of Equipment',
    clause: 'Clause 7 (Physical)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 22,
    lastAuditDate: '2026-10-08',
    assignedOfficer: 'IT Asset Lead',
    description: 'Items of equipment containing storage media shall be verified to ensure that any sensitive data and licensed software have been destroyed or securely overwritten.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'NIST SP 800-88 Rev. 1 cryptographic purge verification',
      'Formal certificate of destruction issued for decommissioned gear',
      'Asset status updated to "Decommissioned" in immutable ledger'
    ]
  },
  {
    code: 'A.8.1',
    title: 'User Endpoint Devices',
    clause: 'Clause 8 (Technological)',
    status: 'Compliant',
    compliancePercent: 98,
    evidenceCount: 310,
    lastAuditDate: '2026-10-18',
    assignedOfficer: 'SecOps Team',
    description: 'Endpoint security configuration: mandatory full-disk encryption (FileVault/BitLocker), EDR protection, remote wipe capability, and idle lock.',
    linkedAssetsCount: 5,
    auditCriteria: [
      'MDM Jamf Pro & Microsoft Intune compliance enrollment',
      'CrowdStrike Falcon active sensor verification',
      'Remote lock & cryptographic wipe capability active'
    ]
  },
  {
    code: 'A.8.8',
    title: 'Management of Technical Vulnerabilities',
    clause: 'Clause 8 (Technological)',
    status: 'Partially Compliant',
    compliancePercent: 88,
    evidenceCount: 19,
    lastAuditDate: '2026-10-19',
    assignedOfficer: 'Vulnerability Management Team',
    description: 'System components are monitored for security vulnerabilities, evaluated for risk exposure, and patched within designated SLA timelines.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'FortiOS firmware update scheduled (RFC-2026-031)',
      'Automated CVE scanning on servers and network devices',
      '14-day SLA for critical patch deployment'
    ]
  },
  {
    code: 'A.8.15',
    title: 'Logging and Monitoring',
    clause: 'Clause 8 (Technological)',
    status: 'Compliant',
    compliancePercent: 100,
    evidenceCount: 890,
    lastAuditDate: '2026-10-19',
    assignedOfficer: 'SecOps Audit Team',
    description: 'Audit logs recording user activities, exceptions, faults and security events are produced, stored, protected against tampering, and regularly reviewed.',
    linkedAssetsCount: 8,
    auditCriteria: [
      'SHA-256 cryptographic chain for all custody and admin actions',
      'Centralized immutable log aggregation with NTP time-sync',
      'Zero unauthorized log deletion or modification'
    ]
  },
  {
    code: 'A.8.32',
    title: 'Change Management',
    clause: 'Clause 8 (Technological)',
    status: 'Compliant',
    compliancePercent: 94,
    evidenceCount: 38,
    lastAuditDate: '2026-10-17',
    assignedOfficer: 'Change Advisory Board (CAB)',
    description: 'Changes to information processing facilities and systems are subject to formal change management procedures and security impact assessments.',
    linkedAssetsCount: 4,
    auditCriteria: [
      'Mandatory security impact assessment prior to change execution',
      'CAB quorum approval documented (3/3 votes)',
      'Verified rollback plan and maintenance window specification'
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1093',
    timestamp: '2026-10-19 23:15:42',
    actor: 'admin@enterprise.io',
    role: 'Admin / CISO Deputy',
    ip: '192.168.10.42 (VPN-HQ)',
    action: 'TECHNICIAN_ASSIGNED',
    entityType: 'Technician',
    entityId: 'INC-2026-104',
    details: 'Ticket assigned to Senior Network Tech David Miller (tech-001) with SLA countdown 85m',
    isoControl: 'A.5.24 Incident Management',
    hash: '8f72a4b3d1c8e9f2a0b1c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718'
  },
  {
    id: 'log-1092',
    timestamp: '2026-10-19 22:32:14',
    actor: 'selim@enterprise.io',
    role: 'Admin / CISO Deputy',
    ip: '192.168.10.42 (VPN-HQ)',
    action: 'REVOKE_MFA_CREDENTIAL',
    entityType: 'Custody',
    entityId: 'AST-2026-YUBI-44',
    details: 'Emergency credential revocation initiated for lost hardware token under ISO A.5.24',
    isoControl: 'A.5.24 Incident Management',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'log-1091',
    timestamp: '2026-10-19 21:40:02',
    actor: 'david.miller@enterprise.io',
    role: 'Technician (Mod)',
    ip: '10.0.4.15 (DC1-KVM)',
    action: 'DIAGNOSTIC_RUN',
    entityType: 'Asset',
    entityId: 'AST-2026-SW01',
    details: 'DOM optical diagnostics queried on Cisco C9300 Gi1/0/24 interface',
    isoControl: 'A.8.14 Redundancy & Health',
    hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'log-1090',
    timestamp: '2026-10-19 18:22:50',
    actor: 'selim@enterprise.io',
    role: 'Admin',
    ip: '192.168.10.42 (VPN-HQ)',
    action: 'CAB_APPROVAL_GRANTED',
    entityType: 'SecurityPolicy',
    entityId: 'CHG-2026-018',
    details: 'Unanimous CAB approval logged for FortiOS 7.4.5 security upgrade window',
    isoControl: 'A.8.32 Change Management',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'log-1089',
    timestamp: '2026-10-19 14:05:12',
    actor: 'sarah.j@enterprise.io',
    role: 'Technician (Mod)',
    ip: '192.168.10.19 (HQ-Wired)',
    action: 'INVENTORY_AUDIT_VERIFIED',
    entityType: 'Asset',
    entityId: 'AST-2026-M14P',
    details: 'Physical barcode scanned in Warehouse Cage A-03. FileVault encryption verified 100%.',
    isoControl: 'A.5.9 Asset Inventory',
    hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
  }
];

export const INITIAL_CHANGES: ChangeRequest[] = [
  {
    id: 'chg-01',
    rfcNumber: 'RFC-2026-031',
    title: 'Core Datacenter Firewall FortiOS 7.4.5 Security Patch',
    risk: 'High',
    category: 'Normal',
    status: 'Approved',
    requester: 'Selim K. (Lead Architect)',
    plannedDate: '2026-10-24 02:00 UTC',
    cabVotes: [
      { member: 'Dr. Aris Thorne', role: 'Chief Information Security Officer (CISO)', decision: 'approve' },
      { member: 'Elena Rostova', role: 'Head of Infrastructure', decision: 'approve' },
      { member: 'Marcus Vance', role: 'Lead Compliance Auditor', decision: 'approve' }
    ],
    rollbackPlan: 'Secondary flash image maintains FortiOS 7.4.4. Boot-once flag set. In event of BGP routing failure, failback command executes automatically within 180 seconds.',
    impactAssessment: 'High-availability cluster will failover seamlessly. Estimated 0 packet drop during session synchronization. Tested on staging lab bench.'
  },
  {
    id: 'chg-02',
    rfcNumber: 'RFC-2026-032',
    title: 'RADIUS 802.1X Certificate Authority Root Renewal',
    risk: 'Medium',
    category: 'Standard',
    status: 'CAB_Review',
    requester: 'David Miller (NetOps)',
    plannedDate: '2026-10-28 20:00 UTC',
    cabVotes: [
      { member: 'Dr. Aris Thorne', role: 'CISO', decision: 'pending' },
      { member: 'Elena Rostova', role: 'Head of Infrastructure', decision: 'approve' }
    ],
    rollbackPlan: 'Re-push legacy root certificate through Jamf Pro and Microsoft Intune MDM profile.',
    impactAssessment: 'Zero client downtime; new certificate pushed 7 days prior to switchover date.'
  }
];

export const INITIAL_AD_CONFIG: ActiveDirectoryConfig = {
  serverHost: 'ldaps://dc01.enterprise.corp',
  domain: 'ENTERPRISE.CORP',
  baseDn: 'DC=enterprise,DC=corp',
  bindDn: 'CN=svc-itsm-ldap,OU=ServiceAccounts,DC=enterprise,DC=corp',
  port: 636,
  useSsl: true,
  syncIntervalMinutes: 15,
  lastSyncTimestamp: '2026-10-19 23:15:00',
  connectionStatus: 'connected',
  groupMappings: {
    adminGroup: 'CN=Domain-Admins,OU=Security-Groups,DC=enterprise,DC=corp',
    moderatorGroup: 'CN=IT-ServiceDesk-Managers,OU=IT-Groups,DC=enterprise,DC=corp',
    technicianGroup: 'CN=IT-Systems-Technicians,OU=IT-Groups,DC=enterprise,DC=corp',
    userGroup: 'CN=Domain-Users,OU=Employees,DC=enterprise,DC=corp'
  }
};

export const INITIAL_AD_USERS: AdUser[] = [
  {
    id: 'usr-ad-01',
    sAMAccountName: 'skucukbay',
    userPrincipalName: 'selim.kucukbay@enterprise.corp',
    displayName: 'Selim Küçükbay',
    mail: 'selim@enterprise.io',
    title: 'Chief Information Security Officer (CISO)',
    department: 'Information Security & Infrastructure',
    company: 'Vitreus Enterprise Corp',
    telephoneNumber: '+90 (212) 555-0199',
    memberOf: [
      'CN=Domain-Admins,OU=Security-Groups,DC=enterprise,DC=corp',
      'CN=CISO-Steering,OU=Security,DC=enterprise,DC=corp',
      'CN=Enterprise-Admins,CN=Users,DC=enterprise,DC=corp'
    ],
    assignedRole: 'admin',
    enabled: true,
    lastLogonTimestamp: '2026-10-19 23:42:10',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    distinguishedName: 'CN=Selim Kucukbay,OU=Executive,OU=Employees,DC=enterprise,DC=corp'
  },
  {
    id: 'usr-ad-02',
    sAMAccountName: 'erostova',
    userPrincipalName: 'elena.rostova@enterprise.corp',
    displayName: 'Elena Rostova',
    mail: 'elena.rostova@enterprise.io',
    title: 'Service Desk Lead & CAB Moderator',
    department: 'IT Service Management (ITSM)',
    company: 'Vitreus Enterprise Corp',
    telephoneNumber: '+90 (212) 555-0145',
    memberOf: [
      'CN=IT-ServiceDesk-Managers,OU=IT-Groups,DC=enterprise,DC=corp',
      'CN=CAB-Voting-Members,OU=Governance,DC=enterprise,DC=corp'
    ],
    assignedRole: 'moderator',
    enabled: true,
    lastLogonTimestamp: '2026-10-19 23:20:15',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    distinguishedName: 'CN=Elena Rostova,OU=ITSM,OU=Employees,DC=enterprise,DC=corp'
  },
  {
    id: 'usr-ad-03',
    sAMAccountName: 'dmiller',
    userPrincipalName: 'david.miller@enterprise.corp',
    displayName: 'David Miller',
    mail: 'david.miller@enterprise.io',
    title: 'Senior Network & Datacenter Specialist',
    department: 'Network & Cloud Infrastructure',
    company: 'Vitreus Enterprise Corp',
    telephoneNumber: '+90 (212) 555-0182',
    memberOf: [
      'CN=IT-Systems-Technicians,OU=IT-Groups,DC=enterprise,DC=corp',
      'CN=Datacenter-Access,OU=Physical-Access,DC=enterprise,DC=corp'
    ],
    assignedRole: 'technician',
    enabled: true,
    lastLogonTimestamp: '2026-10-19 22:50:00',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    distinguishedName: 'CN=David Miller,OU=Infrastructure,OU=Employees,DC=enterprise,DC=corp'
  },
  {
    id: 'usr-ad-04',
    sAMAccountName: 'cyildiz',
    userPrincipalName: 'canan.yildiz@enterprise.corp',
    displayName: 'Canan Yıldız',
    mail: 'canan.yildiz@enterprise.io',
    title: 'Cyber Defense & Endpoint Specialist',
    department: 'SOC & SecOps',
    company: 'Vitreus Enterprise Corp',
    telephoneNumber: '+90 (212) 555-0164',
    memberOf: [
      'CN=IT-Systems-Technicians,OU=IT-Groups,DC=enterprise,DC=corp',
      'CN=SOC-Tier2,OU=Security,DC=enterprise,DC=corp'
    ],
    assignedRole: 'technician',
    enabled: true,
    lastLogonTimestamp: '2026-10-19 23:10:44',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    distinguishedName: 'CN=Canan Yildiz,OU=SOC,OU=Employees,DC=enterprise,DC=corp'
  },
  {
    id: 'usr-ad-05',
    sAMAccountName: 'lzhao',
    userPrincipalName: 'lin.zhao@enterprise.corp',
    displayName: 'Lin Zhao',
    mail: 'lin@enterprise.io',
    title: 'Principal Software Engineer',
    department: 'Product & Cloud Engineering',
    company: 'Vitreus Enterprise Corp',
    telephoneNumber: '+90 (212) 555-0121',
    memberOf: [
      'CN=Domain-Users,OU=Employees,DC=enterprise,DC=corp',
      'CN=GitHub-Developers,OU=Groups,DC=enterprise,DC=corp'
    ],
    assignedRole: 'user',
    enabled: true,
    lastLogonTimestamp: '2026-10-19 21:05:00',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    distinguishedName: 'CN=Lin Zhao,OU=Engineering,OU=Employees,DC=enterprise,DC=corp'
  },
  {
    id: 'usr-ad-06',
    sAMAccountName: 'edemir',
    userPrincipalName: 'emre.demir@enterprise.corp',
    displayName: 'Emre Demir',
    mail: 'emre.demir@enterprise.io',
    title: 'Senior Financial Controller',
    department: 'Finance & Operations',
    company: 'Vitreus Enterprise Corp',
    telephoneNumber: '+90 (212) 555-0138',
    memberOf: [
      'CN=Domain-Users,OU=Employees,DC=enterprise,DC=corp',
      'CN=Finance-ERP-Users,OU=Groups,DC=enterprise,DC=corp'
    ],
    assignedRole: 'user',
    enabled: true,
    lastLogonTimestamp: '2026-10-19 18:30:12',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    distinguishedName: 'CN=Emre Demir,OU=Finance,OU=Employees,DC=enterprise,DC=corp'
  }
];
