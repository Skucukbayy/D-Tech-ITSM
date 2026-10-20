export type UserRole = 'admin' | 'moderator' | 'technician' | 'user';
export type Language = 'tr' | 'en';

export type AssetCategory = 
  | 'laptop' 
  | 'server' 
  | 'network' 
  | 'security_token' 
  | 'mobile' 
  | 'display' 
  | 'peripheral';

export type AssetStatus = 'in_use' | 'in_stock' | 'maintenance' | 'decommissioned';

export type IsoClassification = 'Public' | 'Internal' | 'Confidential' | 'Restricted';

export interface HardwareAsset {
  id: string;
  assetTag: string;
  name: string;
  category: AssetCategory;
  brand: string;
  model: string;
  serialNumber: string;
  macAddress?: string;
  specs: {
    cpu?: string;
    ram?: string;
    storage?: string;
    os?: string;
    screenSize?: string;
    ports?: string;
  };
  status: AssetStatus;
  assignedTo?: {
    userId: string;
    userName: string;
    userEmail: string;
    department: string;
    assignedDate: string;
    custodyDocSigned: boolean;
    custodyDocId: string;
  };
  location: string;
  isoClassification: IsoClassification;
  securityPosture: {
    diskEncryption: boolean;
    edrActive: boolean;
    antivirusUpdated: boolean;
    lastSecurityScan: string;
    cvePatched: boolean;
    vulnerabilitiesCount: number;
    secureDisposalCertified?: boolean;
  };
  purchaseDate: string;
  warrantyExpiry: string;
  purchaseCost: number;
  vendor: string;
  qrCodeData: string;
  notes: string;
  history: {
    id: string;
    date: string;
    action: string;
    actor: string;
    details: string;
  }[];
}

export type TicketType = 'incident' | 'service_request' | 'security_incident' | 'change_request';
export type TicketPriority = 'P1 - Critical' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'pending_approval' | 'resolved' | 'closed';

export interface TicketComment {
  id: string;
  author: string;
  authorRole: string;
  avatar?: string;
  timestamp: string;
  message: string;
  isInternal: boolean;
}

export interface Technician {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  specialty: string;
  status: 'online' | 'busy' | 'on_call';
  activeTicketsCount: number;
  resolvedTicketsCount: number;
  isoClearance: 'Level 1 (Standard)' | 'Level 2 (Confidential)' | 'Level 3 (Restricted / CISO)';
}

export interface OutgoingEmail {
  id: string;
  timestamp: string;
  to: string;
  recipientName: string;
  subject: string;
  body: string;
  ticketNumber: string;
  actionType: 'created' | 'assigned' | 'comment' | 'resolved';
  smtpStatus: 'Delivered (250 OK)';
}

export interface CompanyProfile {
  name: string;
  logoUrl: string;
  tagline: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  type: TicketType;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  creator: {
    userId: string;
    userName: string;
    avatar?: string;
    department: string;
    email: string;
  };
  assignee?: {
    userId: string;
    userName: string;
    avatar?: string;
    role: string;
  };
  linkedAssetId?: string;
  linkedAssetName?: string;
  iso27001Control?: string;
  isoClassification: IsoClassification;
  slaTargetMinutes: number;
  slaRemainingMinutes: number;
  createdAt: string;
  updatedAt: string;
  comments: TicketComment[];
}

export interface IsoControl {
  code: string;
  title: string;
  clause: 'Clause 5 (Organizational)' | 'Clause 6 (People)' | 'Clause 7 (Physical)' | 'Clause 8 (Technological)';
  status: 'Compliant' | 'Partially Compliant' | 'Under Review' | 'Non-Compliant';
  compliancePercent: number;
  evidenceCount: number;
  lastAuditDate: string;
  assignedOfficer: string;
  description: string;
  linkedAssetsCount: number;
  auditCriteria: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  ip: string;
  action: string;
  entityType: 'Asset' | 'Ticket' | 'SecurityPolicy' | 'User' | 'Custody' | 'Technician' | 'Email';
  entityId: string;
  details: string;
  isoControl: string;
  hash: string;
}

export interface ChangeRequest {
  id: string;
  rfcNumber: string;
  title: string;
  risk: 'Low' | 'Medium' | 'High';
  category: 'Standard' | 'Normal' | 'Emergency';
  status: 'Draft' | 'Submitted' | 'CAB_Review' | 'Approved' | 'Implemented' | 'Rejected';
  requester: string;
  plannedDate: string;
  cabVotes: { member: string; role: string; decision: 'approve' | 'reject' | 'pending' }[];
  rollbackPlan: string;
  impactAssessment: string;
}

export type ThemeMode = 'dark' | 'light';
export type WallPreset = 'ash' | 'sand' | 'sage' | 'aurora' | 'smoke' | 'tide' | 'bloom' | 'ember' | 'grove' | 'dusk';
export type AccentPreset = 'blue' | 'purple' | 'pink' | 'orange' | 'green' | 'graphite';
export type GlassMode = 'clear' | 'tinted' | 'solid';

export interface LookConfig {
  theme: ThemeMode;
  wall: WallPreset;
  accent: AccentPreset;
  glass: GlassMode;
}

// Active Directory (AD / LDAPS / Entra ID) Integration Types
export interface AdUser {
  id: string;
  sAMAccountName: string;
  userPrincipalName: string;
  displayName: string;
  mail: string;
  title: string;
  department: string;
  company: string;
  telephoneNumber?: string;
  memberOf: string[];
  assignedRole: UserRole;
  enabled: boolean;
  lastLogonTimestamp: string;
  avatarUrl: string;
  distinguishedName: string;
}

export interface ActiveDirectoryConfig {
  serverHost: string;              // e.g. "ldaps://dc01.enterprise.corp"
  domain: string;                  // e.g. "ENTERPRISE.CORP"
  baseDn: string;                  // e.g. "DC=enterprise,DC=corp"
  bindDn: string;                  // e.g. "CN=svc-itsm-ldap,OU=ServiceAccounts,DC=enterprise,DC=corp"
  port: number;                    // 636 (LDAPS)
  useSsl: boolean;                 // TLS 1.3
  syncIntervalMinutes: number;     // 15 mins
  lastSyncTimestamp: string;
  connectionStatus: 'connected' | 'syncing' | 'error' | 'disconnected';
  groupMappings: {
    adminGroup: string;       // "CN=Domain-Admins,OU=Security-Groups,DC=enterprise,DC=corp"
    moderatorGroup: string;   // "CN=IT-ServiceDesk-Managers,OU=IT-Groups,DC=enterprise,DC=corp"
    technicianGroup: string;  // "CN=IT-Systems-Technicians,OU=IT-Groups,DC=enterprise,DC=corp"
    userGroup: string;        // "CN=Domain-Users,OU=Employees,DC=enterprise,DC=corp"
  };
}
