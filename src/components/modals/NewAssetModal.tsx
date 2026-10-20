import React, { useState } from 'react';
import { X, HardDrive, Plus, Shield, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssetCategory, IsoClassification } from '../../types';

export const NewAssetModal: React.FC = () => {
  const { activeModal, setActiveModal, addAsset } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('laptop');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('HQ Floor 3');
  const [isoClassification, setIsoClassification] = useState<IsoClassification>('Confidential');
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [diskEncryption, setDiskEncryption] = useState(true);

  if (activeModal !== 'new_asset') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !serialNumber) return;

    const prefix = category === 'laptop' ? 'M3' : category === 'server' ? 'SRV' : category === 'network' ? 'NET' : 'DEV';
    const assetTag = `AST-2026-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    addAsset({
      name,
      assetTag,
      category,
      brand,
      model: model || name,
      serialNumber,
      status: 'in_stock',
      location,
      isoClassification,
      specs: {
        cpu,
        ram,
        storage,
        os: category === 'laptop' ? 'macOS Sequoia 15.3' : 'Linux / Embedded'
      },
      securityPosture: {
        diskEncryption,
        edrActive: true,
        antivirusUpdated: true,
        lastSecurityScan: new Date().toISOString().substring(0, 16),
        cvePatched: true,
        vulnerabilitiesCount: 0
      },
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiry: '2028-12-31',
      purchaseCost: 2499,
      vendor: brand === 'Apple' ? 'Apple Business Enterprise' : 'Dell Direct Enterprise',
      notes: 'Initial registration into ITAM pool.'
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
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text font-display">
                Register Physical Hardware Asset
              </h3>
              <p className="text-xs text-text-3">
                ISO 27001 Annex A.5.9 Envanter Kaydı
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
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-text-2 mb-1 block">Device Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. MacBook Pro 16 M3 Max"
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="font-semibold text-text-2 mb-1 block">Hardware Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none cursor-pointer"
              >
                <option value="laptop">Laptop / Workstation</option>
                <option value="server">Datacenter Server</option>
                <option value="network">Switch / Firewall</option>
                <option value="security_token">YubiKey / Security Key</option>
                <option value="mobile">Corporate Mobile Phone</option>
                <option value="display">4K Display Monitor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-text-2 mb-1 block">Brand / Manufacturer</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Apple, Dell, Cisco..."
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="font-semibold text-text-2 mb-1 block">Hardware Serial Number</label>
              <input
                required
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="e.g. C02G901XMD6R"
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none focus:border-accent font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-text-2 mb-1 block">Physical Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="HQ Floor 3, Rack 14U..."
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="font-semibold text-text-2 mb-1 block">ISO 27001 Classification</label>
              <select
                value={isoClassification}
                onChange={(e) => setIsoClassification(e.target.value as IsoClassification)}
                className="w-full px-3 py-2 rounded-xl glass text-xs text-text outline-none cursor-pointer"
              >
                <option value="Confidential">Confidential (Default Corporate)</option>
                <option value="Restricted">Restricted / Secret (Keys & Servers)</option>
                <option value="Internal">Internal (Standard)</option>
                <option value="Public">Public</option>
              </select>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="p-3 rounded-xl bg-fill/20 border border-white/5 space-y-2">
            <p className="font-bold text-text-3 uppercase tracking-wider text-[10px]">
              Hardware Specifications (Optional)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                placeholder="CPU: M3 Max 16-Core"
                className="px-2.5 py-1.5 rounded-lg glass text-[11px] text-text outline-none"
              />
              <input
                type="text"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="RAM: 64 GB"
                className="px-2.5 py-1.5 rounded-lg glass text-[11px] text-text outline-none"
              />
              <input
                type="text"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                placeholder="Storage: 1TB NVMe"
                className="px-2.5 py-1.5 rounded-lg glass text-[11px] text-text outline-none"
              />
            </div>
          </div>

          {/* ISO 27001 Security Baseline Checkbox */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="font-semibold text-text">Enforce Full Disk Encryption (A.8.1)</p>
                <p className="text-[10px] text-text-3">Apple FileVault / Windows BitLocker TPM 2.0</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={diskEncryption}
              onChange={(e) => setDiskEncryption(e.target.checked)}
              className="w-4 h-4 rounded text-accent cursor-pointer"
            />
          </div>

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
              <span>Enroll Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
