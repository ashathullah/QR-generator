import React from 'react';
import { ShapeOptions, DotType, CornerSquareType, CornerDotType } from '../../types/qr';
import { ArrowLeftRight } from 'lucide-react';

interface ShapeTabProps {
  shape: ShapeOptions;
  onChange: (updates: Partial<ShapeOptions>) => void;
  onInvert: () => void;
}

const DOT_STYLES: { id: DotType; label: string; svg: string }[] = [
  {
    id: 'square',
    label: 'Square',
    svg: `<rect x="15" y="15" width="20" height="20" fill="currentColor"/><rect x="45" y="15" width="20" height="20" fill="currentColor"/><rect x="15" y="45" width="20" height="20" fill="currentColor"/><rect x="45" y="45" width="20" height="20" fill="currentColor"/>`,
  },
  {
    id: 'rounded',
    label: 'Rounded',
    svg: `<rect x="15" y="15" width="20" height="20" rx="6" fill="currentColor"/><rect x="45" y="15" width="20" height="20" rx="6" fill="currentColor"/><rect x="15" y="45" width="20" height="20" rx="6" fill="currentColor"/><rect x="45" y="45" width="20" height="20" rx="6" fill="currentColor"/>`,
  },
  {
    id: 'dots',
    label: 'Dots',
    svg: `<circle cx="25" cy="25" r="10" fill="currentColor"/><circle cx="55" cy="25" r="10" fill="currentColor"/><circle cx="25" cy="55" r="10" fill="currentColor"/><circle cx="55" cy="55" r="10" fill="currentColor"/>`,
  },
  {
    id: 'classy',
    label: 'Classy',
    svg: `<path d="M15 15h10a10 10 0 0 1 10 10v10H15z" fill="currentColor"/><path d="M45 15h20v20H55a10 10 0 0 1-10-10z" fill="currentColor"/><path d="M15 45h20v10a10 10 0 0 1-10 10H15z" fill="currentColor"/><path d="M55 45h10v20H45v-10a10 10 0 0 1 10-10z" fill="currentColor"/>`,
  },
  {
    id: 'classy-rounded',
    label: 'Classy Rounded',
    svg: `<path d="M15 15h20v10a10 10 0 0 1-10 10H15z" fill="currentColor"/><path d="M45 15h10a10 10 0 0 1 10 10v20H45z" fill="currentColor"/><path d="M15 45h10a10 10 0 0 1 10 10v10H15z" fill="currentColor"/><circle cx="55" cy="55" r="10" fill="currentColor"/>`,
  },
  {
    id: 'extra-rounded',
    label: 'Smooth',
    svg: `<rect x="15" y="15" width="20" height="20" rx="10" fill="currentColor"/><rect x="45" y="15" width="20" height="20" rx="10" fill="currentColor"/><rect x="15" y="45" width="20" height="20" rx="10" fill="currentColor"/><rect x="45" y="45" width="20" height="20" rx="10" fill="currentColor"/>`,
  },
];

const CORNER_SQUARE_STYLES: { id: CornerSquareType; label: string; svg: string }[] = [
  {
    id: 'square',
    label: 'Square',
    svg: `<rect x="10" y="10" width="60" height="60" fill="none" stroke="currentColor" stroke-width="10"/>`,
  },
  {
    id: 'extra-rounded',
    label: 'Rounded',
    svg: `<rect x="10" y="10" width="60" height="60" rx="16" fill="none" stroke="currentColor" stroke-width="10"/>`,
  },
  {
    id: 'dot',
    label: 'Circle',
    svg: `<circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="10"/>`,
  },
];

const CORNER_DOT_STYLES: { id: CornerDotType; label: string; svg: string }[] = [
  {
    id: 'square',
    label: 'Square',
    svg: `<rect x="25" y="25" width="30" height="30" fill="currentColor"/>`,
  },
  {
    id: 'dot',
    label: 'Dot',
    svg: `<circle cx="40" cy="40" r="16" fill="currentColor"/>`,
  },
];

export const ShapeTab: React.FC<ShapeTabProps> = ({
  shape,
  onChange,
  onInvert,
}) => {
  return (
    <div className="space-y-6">
      {/* Body Shape Style */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Body Pattern Style
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {DOT_STYLES.map((style) => {
            const isSelected = shape.dotsType === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ dotsType: style.id })}
                className={`flex flex-col items-center p-2.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <svg
                  viewBox="0 0 80 80"
                  className="w-10 h-10 mb-1"
                  dangerouslySetInnerHTML={{ __html: style.svg }}
                />
                <span className="text-xs font-semibold">{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Body Colors & Gradient */}
      <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Colors & Gradients
          </label>
          <button
            type="button"
            onClick={onInvert}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-sm"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" /> Invert Colors
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* QR Code Foreground Color / Gradient */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Pattern Color
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={shape.isGradient}
                  onChange={(e) => onChange({ isGradient: e.target.checked })}
                  className="w-3.5 h-3.5 text-blue-600 rounded"
                />
                Use Gradient
              </label>
            </div>

            {!shape.isGradient ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={shape.dotsColor}
                  onChange={(e) => onChange({ dotsColor: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200"
                />
                <input
                  type="text"
                  value={shape.dotsColor}
                  onChange={(e) => onChange({ dotsColor: e.target.value })}
                  className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase bg-white"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={shape.gradientColor1}
                      onChange={(e) => onChange({ gradientColor1: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer border border-slate-200"
                    />
                    <span className="text-xs font-mono">{shape.gradientColor1}</span>
                  </div>
                  <span className="text-slate-400">→</span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={shape.gradientColor2}
                      onChange={(e) => onChange({ gradientColor2: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer border border-slate-200"
                    />
                    <span className="text-xs font-mono">{shape.gradientColor2}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <select
                    value={shape.gradientType}
                    onChange={(e) => onChange({ gradientType: e.target.value as any })}
                    className="px-2 py-1 rounded border border-slate-200 bg-white"
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                  {shape.gradientType === 'linear' && (
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-slate-500">Angle:</span>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={shape.gradientRotation}
                        onChange={(e) => onChange({ gradientRotation: Number(e.target.value) })}
                        className="flex-1 accent-blue-600"
                      />
                      <span className="w-8 font-mono">{shape.gradientRotation}°</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Background Color */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Background Color
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={shape.isTransparent}
                  onChange={(e) => onChange({ isTransparent: e.target.checked })}
                  className="w-3.5 h-3.5 text-blue-600 rounded"
                />
                Transparent
              </label>
            </div>

            {!shape.isTransparent ? (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={shape.backgroundColor}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200"
                />
                <input
                  type="text"
                  value={shape.backgroundColor}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase bg-white"
                />
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-2">Transparent background enabled</p>
            )}
          </div>
        </div>
      </div>

      {/* Eye / Corner Styling */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Corner Eyes Styling
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-200/80">
          {/* Corner Square (Outer Eye) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Corner Frame (Outer Border)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {CORNER_SQUARE_STYLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ cornerSquareType: item.id })}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                    shape.cornerSquareType === item.id
                      ? 'border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-500/30'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <svg
                    viewBox="0 0 80 80"
                    className="w-7 h-7 mb-1"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                  <span className="text-[11px] font-semibold">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={shape.cornerSquareColor}
                onChange={(e) => onChange({ cornerSquareColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
              />
              <span className="text-xs font-mono uppercase">{shape.cornerSquareColor}</span>
            </div>
          </div>

          {/* Corner Dot (Inner Eye) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Corner Center (Inner Dot)
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {CORNER_DOT_STYLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ cornerDotType: item.id })}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                    shape.cornerDotType === item.id
                      ? 'border-blue-600 bg-blue-50 text-blue-600 ring-1 ring-blue-500/30'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <svg
                    viewBox="0 0 80 80"
                    className="w-7 h-7 mb-1"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                  <span className="text-[11px] font-semibold">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={shape.cornerDotColor}
                onChange={(e) => onChange({ cornerDotColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
              />
              <span className="text-xs font-mono uppercase">{shape.cornerDotColor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
