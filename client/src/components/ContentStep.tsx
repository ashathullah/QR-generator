import React, { useState } from 'react';
import { QRContent } from '../types/qr';
import { Eye, EyeOff, Globe, Link2, Plus, Trash2 } from 'lucide-react';

interface ContentStepProps {
  content: QRContent;
  onChange: (updates: Record<string, any>) => void;
}

export const ContentStep: React.FC<ContentStepProps> = ({ content, onChange }) => {
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-sm">
          1
        </span>
        <h2 className="text-lg font-bold text-slate-900">Complete the content</h2>
      </div>

      {/* Website */}
      {content.type === 'website' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Enter your Website URL <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Globe className="w-4 h-4" />
              </span>
              <input
                type="url"
                value={content.data.url}
                onChange={(e) => onChange({ url: e.target.value })}
                placeholder="https://www.mywebsite.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Scanners will immediately open this URL in their default browser.
            </p>
          </div>
        </div>
      )}

      {/* Plain Text */}
      {content.type === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Enter Text / Note <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={content.data.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="Enter plain text, notes, instructions or promotional code..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span>Text will be decoded directly on scan without requiring an internet connection.</span>
              <span>{content.data.text.length} chars</span>
            </div>
          </div>
        </div>
      )}

      {/* WiFi */}
      {content.type === 'wifi' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Network Name (SSID) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={content.data.ssid}
                onChange={(e) => onChange({ ssid: e.target.value })}
                placeholder="e.g. Office_Guest_WiFi"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Security Encryption
              </label>
              <select
                value={content.data.encryption}
                onChange={(e) => onChange({ encryption: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm outline-none transition-all bg-white"
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">No Password (Open)</option>
              </select>
            </div>
          </div>

          {content.data.encryption !== 'nopass' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                WiFi Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showWifiPassword ? 'text' : 'password'}
                  value={content.data.password}
                  onChange={(e) => onChange({ password: e.target.value })}
                  placeholder="Enter WiFi password"
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowWifiPassword(!showWifiPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hidden-wifi"
              checked={content.data.hidden}
              onChange={(e) => onChange({ hidden: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="hidden-wifi" className="text-xs font-medium text-slate-600">
              Hidden network (SSID is not broadcasting)
            </label>
          </div>
        </div>
      )}

      {/* vCard */}
      {content.type === 'vcard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                value={content.data.firstName}
                onChange={(e) => onChange({ firstName: e.target.value })}
                placeholder="John"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                value={content.data.lastName}
                onChange={(e) => onChange({ lastName: e.target.value })}
                placeholder="Doe"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Org</label>
              <input
                type="text"
                value={content.data.organization}
                onChange={(e) => onChange({ organization: e.target.value })}
                placeholder="Acme Corp"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={content.data.jobTitle}
                onChange={(e) => onChange({ jobTitle: e.target.value })}
                placeholder="Product Director"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={content.data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+1 (555) 019-2834"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={content.data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder="john.doe@example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Website URL</label>
              <input
                type="url"
                value={content.data.website}
                onChange={(e) => onChange({ website: e.target.value })}
                placeholder="https://johndoe.com"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
              <input
                type="text"
                value={content.data.address}
                onChange={(e) => onChange({ address: e.target.value })}
                placeholder="123 Market St, San Francisco, CA"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* Email */}
      {content.type === 'email' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Recipient Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={content.data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="support@mybrand.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
            <input
              type="text"
              value={content.data.subject}
              onChange={(e) => onChange({ subject: e.target.value })}
              placeholder="Inquiry about services"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Body Message</label>
            <textarea
              rows={3}
              value={content.data.body}
              onChange={(e) => onChange({ body: e.target.value })}
              placeholder="Hi there, I would like more information..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      )}

      {/* WhatsApp */}
      {content.type === 'whatsapp' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number (with Country Code) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={content.data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="e.g. +14155552671"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1">
              Include country code without special characters (e.g. 14155552671).
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Pre-filled Message (Optional)
            </label>
            <textarea
              rows={3}
              value={content.data.message}
              onChange={(e) => onChange({ message: e.target.value })}
              placeholder="Hello! I would like to chat regarding..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      )}

      {/* SMS */}
      {content.type === 'sms' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={content.data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
            <textarea
              rows={3}
              value={content.data.message}
              onChange={(e) => onChange({ message: e.target.value })}
              placeholder="Send this SMS text..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
          </div>
        </div>
      )}

      {/* Phone */}
      {content.type === 'phone' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={content.data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1">
              Scanning opens the phone dialer with this number. Include the country code.
            </p>
          </div>
        </div>
      )}

      {/* Social Links */}
      {content.type === 'social' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Main Profile Link <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Link2 className="w-4 h-4" />
              </span>
              <input
                type="url"
                value={content.data.links?.[0]?.url || ''}
                onChange={(e) =>
                  onChange({
                    links: [{ id: '1', platform: 'Profile', url: e.target.value }],
                  })
                }
                placeholder="https://instagram.com/myaccount or linktr.ee/name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
