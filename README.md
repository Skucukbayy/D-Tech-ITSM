# Vitreus ITSM & ITAM Platform
### *Next-Generation Liquid Glass Enterprise Service Desk, Physical Asset Intelligence & ISO/IEC 27001:2022 ISMS Compliance Engine*

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![ISO 27001](https://img.shields.io/badge/ISO%2FIEC_27001-2022_Compliant-00C781?style=for-the-badge&logo=shield&logoColor=white)](https://www.iso.org/standard/27001)
[![Active Directory](https://img.shields.io/badge/Active_Directory-LDAPS_636-0078D4?style=for-the-badge&logo=windows&logoColor=white)](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

**Vitreus ITSM** is a commercial-grade, open-source Enterprise IT Service Management (ITSM) and Physical Asset Management (ITAM) platform designed for modern enterprises that demand both **aesthetic perfection** and **uncompromising security compliance**.

Reverse-engineered and elevated from high-end liquid glass design architectures, Vitreus combines macOS/visionOS translucent depth aesthetics with the stringent requirements of **ISO/IEC 27001:2022 Information Security Management Systems (ISMS)**, **Active Directory (LDAPS / TLS 1.3)** enterprise role-based access control, and **interactive drag-and-drop workflow orchestration**.

---

## ✨ Key Enterprise Capabilities

### 1. 🎛️ Interactive Drag & Drop Kanban & Incident Board
- **Fluid Card Reordering**: Grab any ticket card by its handle (`GripVertical`) and drop onto another card or column to reorder and reprioritize dynamically with visual glow feedback.
- **Dynamic Column Transitions**: Live stage updates across `Triage / New`, `In Progress`, `Pending CAB Approval`, and `Resolved`.
- **SLA Telemetry & Real-Time Countdown**: Per-ticket SLA countdown timers with automated breach warnings.
- **Dual Presentation Modes**: Switch instantly between an interactive Kanban Board and a compact High-Density Data Table.

### 2. 🪟 Centered Liquid Glass Incident Modal Workspace
- **Distraction-Free Inspection**: Incidents and tickets open in a centered, floating liquid glass chrome window with backdrop blur and responsive 2-column layout.
- **Hardware Asset Linking**: Direct association between incidents and physical IT assets (chassis serial, MAC address, rack location).
- **Internal Staff vs. Public Notes**: Technicians can toggle between internal staff notes (hidden from end-users) and public customer-facing communications.
- **Instant Resolution Action**: One-click resolution with automated particle celebration (`canvas-confetti`) and transactional resolution email dispatch.

### 3. 👥 Active Directory (LDAPS / TLS 1.3) & 4 Enterprise Roles
Built-in synchronization engine for Microsoft Active Directory and OpenLDAP over secure LDAPS (Port 636):
- **🛡️ Admin (Süper Admin / CISO)**: Unrestricted control over ISO controls, cryptographic audit logs, Active Directory group bindings, and enterprise settings.
- **⚖️ Moderator (Operasyon Yöneticisi / CAB Lead)**: Authority over Change Advisory Board (CAB) reviews, RFC approvals, and technician workload allocations.
- **🔧 Technician (Saha & Sistem Teknisyeni)**: Assignment queues, ticket resolution, diagnostic logging, and hardware maintenance.
- **👤 User (Şirket Çalışanı / Son Kullanıcı)**: User self-service portal, personalized ticket tracking, and digital asset custody (*Zimmet*) status.

### 4. 💻 Physical Hardware Asset Intelligence (ITAM) & Zimmet Tutanağı
- **Full Lifecycle Asset Registry**: Laptops (MacBook Pro M3 Max), Servers (Dell PowerEdge R750), Switches (Cisco Catalyst 9300), Firewalls (FortiGate 100F), Security Keys (YubiKey 5C NFC FIPS), and Monitors.
- **Security Posture Telemetry**: Real-time tracking of Full-Disk Encryption (FileVault / BitLocker), EDR status (CrowdStrike / Defender), CVE patch status, and last scan timestamps.
- **Digital Custody Protocol (*Zimmet Tutanağı*)**: ISO 27001 A.5.10-compliant digital custody handovers with formal document IDs (`DOC-ZMT-2025-0812`), printable custody records, and automated employee email receipts.
- **Cryptographic QR Tags**: Every asset includes unique QR asset tags linked to verification endpoints.

### 5. 📧 Automated Transactional Email Dispatch (SMTP Engine)
Whenever actions occur in the platform, automated emails are dispatched and logged to the central outbox:
- **On Ticket Creation**: Immediate confirmation with ticket number, SLA window, and priority rating.
- **On Technician Assignment**: Direct notification informing the requester of the assigned specialist.
- **On Resolution**: Comprehensive closure summary with satisfaction feedback link.
- **On Custody Handover**: Formal asset assignment notice with custody document ID.

### 6. 🔒 ISO/IEC 27001:2022 Continuous ISMS Compliance Engine
Built-in mapping to the ISO/IEC 27001:2022 Annex A controls:
| Control | Clause | Objective | Vitreus Implementation |
| :--- | :--- | :--- | :--- |
| **A.5.9** | Clause 5 | Inventory of information and other associated assets | Automated asset registry with unique AST tags, custodians, and serial numbers. |
| **A.5.10** | Clause 5 | Acceptable use of information and other associated assets | Digital *Zimmet Tutanağı* handover workflow with signature audit records. |
| **A.5.11** | Clause 5 | Return of assets | Offboarding checklist, asset recovery verification, and cryptographic data wipe. |
| **A.5.12** | Clause 5 | Classification of information | 4-tier labeling (`Public`, `Internal`, `Confidential`, `Restricted`) across all cards. |
| **A.5.13** | Clause 5 | Labelling of information & equipment | Physical QR barcode tags and chassis classification labels. |
| **A.5.24** | Clause 5 | Information security incident management | P1 triage queues, emergency credential revocation, and 1-hour SLA tracking. |
| **A.7.10** | Clause 7 | Storage media | Mandatory full-disk encryption enforcement verification across all hardware. |
| **A.7.14** | Clause 7 | Secure disposal or reuse of equipment | NIST SP 800-88 Rev. 1 cryptographic purge tracking and destruction certificates. |
| **A.8.1** | Clause 8 | User endpoint devices | MDM integration verification (Jamf Pro & Microsoft Intune), EDR agent monitoring. |
| **A.8.8** | Clause 8 | Management of technical vulnerabilities | CVE tracking, firmware patch scheduling, and automated risk scoring. |
| **A.8.15** | Clause 8 | Logging and monitoring | SHA-256 tamper-evident immutable audit chain for all administrative actions. |
| **A.8.32** | Clause 8 | Change management | Formal Change Advisory Board (CAB) voting, rollback plans, and maintenance windows. |

---

## 🛠️ Technology Stack & Architecture

```
vitreus-itsm/
├── src/
│   ├── components/
│   │   ├── modals/             # Global liquid glass modal dialogs
│   │   │   ├── ActiveDirectoryModal.tsx # LDAPS server configuration & sync
│   │   │   ├── AssetDetailModal.tsx     # Hardware specs & QR asset tags
│   │   │   ├── CustodyHandoverModal.tsx # Zimmet Tutanağı digital signing
│   │   │   ├── IsoAuditExportModal.tsx  # Compliance export (JSON / PDF)
│   │   │   ├── NewAssetModal.tsx        # Hardware asset onboarding
│   │   │   ├── NewTicketModal.tsx       # Incident & Service request triage
│   │   │   ├── OutboxModal.tsx          # Real-time SMTP email dispatch log
│   │   │   └── TicketDetailModal.tsx    # Centered incident workspace
│   │   ├── views/              # Core application views
│   │   │   ├── AssetsView.tsx           # ITAM hardware asset management
│   │   │   ├── ChangesView.tsx          # RFC Change management & CAB votes
│   │   │   ├── ComplianceView.tsx       # ISO 27001 continuous audit center
│   │   │   ├── HomeView.tsx             # Executive telemetry & KPI cockpit
│   │   │   ├── SettingsView.tsx         # Corporate branding & AD controls
│   │   │   ├── TicketsView.tsx          # Drag-and-drop Kanban & table board
│   │   │   └── UserPortalView.tsx       # Employee self-service workspace
│   │   ├── CommandPalette.tsx  # Global ⌘K spotlight command search
│   │   ├── Sidebar.tsx         # Liquid glass spring-lens navigation
│   │   ├── Toolbar.tsx         # Live AD status, quick actions & outbox
│   │   └── Wallpaper.tsx       # Dynamic SVG ambient shader mesh
│   ├── context/
│   │   └── AppContext.tsx      # Central reactive state engine
│   ├── data/
│   │   └── mockData.ts         # Enterprise mock seed (Assets, Tickets, AD)
│   ├── types/
│   │   └── index.ts            # Strict TypeScript interfaces & definitions
│   └── utils/
│       ├── animations.ts       # GSAP 3 physics & spring tweens
│       └── i18n.ts             # English & Turkish localization dictionaries
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

- **Frontend Core**: React 19, TypeScript 5.8, Vite 6
- **Styling Architecture**: Tailwind CSS 3.4 with custom glassmorphic CSS variables (`glass--chrome`, `backdrop-filter`, `border-white/20`)
- **Physics & Motion Engine**: GSAP 3.15 (elastic squash-and-stretch lenses, page transitions)
- **Visual Feedback**: Canvas Confetti & Lucide React Iconography
- **Identity Protocol**: Active Directory / LDAPS TLS 1.3 architecture

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or yarn / pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/your-organization/vitreus-itsm.git
cd vitreus-itsm
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://127.0.0.1:5173/`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## ⚙️ Active Directory & Role Simulation

To test role switching and Active Directory synchronization:
1. Open the application.
2. In the top toolbar, click the **AD LIVE (636)** badge or open **Settings → Active Directory Sync**.
3. Click **Şimdi Senkronize Et (Sync Now)** to execute a simulated LDAPS handshake.
4. Use the user profile selector at the bottom of the sidebar to immediately switch between:
   - **Selim Küçükbay** (`admin` - CISO)
   - **Elena Rostova** (`moderator` - CAB Lead)
   - **David Miller** (`technician` - Network Lead)
   - **Canan Yıldız** (`technician` - SecOps)
   - **Lin Zhao** (`user` - Developer)
   - **Emre Demir** (`user` - Finance)

---

## 🌐 Localization & Custom Branding

- **Bilingual Interface**: Seamlessly toggle between Turkish (**Türkçe**) and English (**English**) directly from the top toolbar.
- **Custom Corporate Logo & Identity**: Upload your company logo and customize corporate headers via the **Settings (Ayarlar)** pane.

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it for personal or enterprise commercial deployments.
