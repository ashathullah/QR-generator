import React, { Suspense, lazy, useRef } from 'react';
import { LogoOptions } from '../../types/qr';
import { LOGO_PRESETS } from '../../utils/logoPresets';
import { Upload, X, Check, Image as ImageIcon, Sliders } from 'lucide-react';

const LucideIconBrowser = lazy(() => import('./LucideIconBrowser'));

interface LogoTabProps {
  logo: LogoOptions;
  onChange: (updates: Partial<LogoOptions>) => void;
}

export const LogoTab: React.FC<LogoTabProps> = ({ logo, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      onChange({
        url: dataUri,
        presetId: undefined,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUri = event.target?.result as string;
      onChange({
        url: dataUri,
        presetId: undefined,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Preset Logos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select a Preset Logo
          </label>
          {logo.url && (
            <button
              type="button"
              onClick={() => onChange({ url: null, presetId: undefined })}
              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Remove Logo
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2.5">
          {/* None Option */}
          <button
            type="button"
            onClick={() => onChange({ url: null, presetId: undefined })}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
              !logo.url
                ? 'border-blue-600 bg-blue-50 text-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-400'
            }`}
            title="No Logo"
          >
            <X className="w-4 h-4" />
          </button>

          {LOGO_PRESETS.map((preset) => {
            const isSelected = logo.presetId === preset.id || logo.url === preset.svgDataUri;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() =>
                  onChange({
                    url: preset.svgDataUri,
                    presetId: preset.id,
                  })
                }
                className={`relative w-11 h-11 rounded-xl border p-1 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500/30 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
                title={preset.name}
              >
                <img
                  src={preset.svgDataUri}
                  alt={preset.name}
                  className="w-8 h-8 rounded-full object-contain"
                />
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lucide Icons */}
      <Suspense fallback={<p className="text-xs text-slate-400">Loading icons…</p>}>
        <LucideIconBrowser logo={logo} onChange={onChange} />
      </Suspense>

      {/* Upload Custom Logo */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Or Upload Custom Logo
        </label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            className="hidden"
          />
          <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 text-slate-600 group-hover:text-blue-600 flex items-center justify-center mx-auto mb-2 transition-transform group-hover:scale-110">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Drag and drop or click to upload a logo
          </p>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG, or SVG / 2MB max</p>
        </div>
      </div>

      {/* Logo Controls */}
      {logo.url && (
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" /> Logo Adjustments
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Logo Size */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                <span>Logo Size</span>
                <span className="font-mono text-slate-500">{Math.round(logo.size * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.35"
                step="0.01"
                value={logo.size}
                onChange={(e) => onChange({ size: parseFloat(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Logo Margin */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                <span>Logo Margin / Padding</span>
                <span className="font-mono text-slate-500">{logo.margin}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={logo.margin}
                onChange={(e) => onChange({ margin: parseInt(e.target.value, 10) })}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="hide-bg-dots"
              checked={logo.hideBackgroundDots}
              onChange={(e) => onChange({ hideBackgroundDots: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="hide-bg-dots" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Clear background dots behind logo (Ensures readability)
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
