import React from 'react';
import {
  Globe,
  FileText,
  Wifi,
  Contact,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Share2,
} from 'lucide-react';
import { QRContentType } from '../types/qr';

interface TypeSelectorProps {
  activeType: QRContentType;
  onSelectType: (type: QRContentType) => void;
}

interface TypeItem {
  type: QRContentType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const TYPES: TypeItem[] = [
  { type: 'website', label: 'Website', icon: Globe, description: 'URL / Web link' },
  { type: 'text', label: 'Text', icon: FileText, description: 'Plain text / note' },
  { type: 'wifi', label: 'WiFi', icon: Wifi, description: 'Connect to network' },
  { type: 'vcard', label: 'vCard', icon: Contact, description: 'Digital business card' },
  { type: 'email', label: 'Email', icon: Mail, description: 'Send prefilled email' },
  { type: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, description: 'Direct WhatsApp chat' },
  { type: 'sms', label: 'SMS', icon: MessageSquare, description: 'Send SMS message' },
  { type: 'phone', label: 'Phone', icon: Phone, description: 'Call a number' },
  { type: 'social', label: 'Links', icon: Share2, description: 'Social media profile' },
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  activeType,
  onSelectType,
}) => {
  return (
    <div className="w-full bg-slate-50/80 p-2 rounded-2xl border border-slate-200/80 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-2">
        {TYPES.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.type;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelectType(item.type)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 group text-center ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600/30'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60 shadow-sm'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold tracking-tight">{item.label}</span>
              <span
                className={`text-[10px] hidden sm:block truncate max-w-full mt-0.5 ${
                  isActive ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {item.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
