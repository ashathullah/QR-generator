import React from 'react';
import { FrameOptions, FrameType } from '../../types/qr';
import { FRAME_DEFINITIONS } from '../../frames/frameTemplates';
import { Type, Palette } from 'lucide-react';

interface FrameTabProps {
  frame: FrameOptions;
  onChange: (updates: Partial<FrameOptions>) => void;
  onSelectType: (type: FrameType) => void;
}

const COLOR_PRESETS = [
  '#000000',
  '#1e293b',
  '#2563eb',
  '#4f46e5',
  '#7c3aed',
  '#db2777',
  '#dc2626',
  '#ea580c',
  '#059669',
  '#0891b2',
];

export const FrameTab: React.FC<FrameTabProps> = ({
  frame,
  onChange,
  onSelectType,
}) => {
  const frameKeys = Object.keys(FRAME_DEFINITIONS) as FrameType[];

  return (
    <div className="space-y-6">
      {/* Frame Selectors */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Choose a Frame Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {frameKeys.map((key) => {
            const def = FRAME_DEFINITIONS[key];
            const isSelected = frame.type === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => onSelectType(key)}
                className={`relative flex flex-col items-center p-2.5 rounded-xl border transition-all text-center group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/30 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-2">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-14 h-14 transition-transform group-hover:scale-105"
                    dangerouslySetInnerHTML={{ __html: def.thumbnailSvg }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {def.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {frame.type !== 'none' && (
        <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-4">
          {/* Frame Label Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-400" />
              Frame Label Text
            </label>
            <input
              type="text"
              value={frame.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="e.g. Scan me!"
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-blue-500 text-sm bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Frame Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                Frame Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={frame.color}
                  onChange={(e) => onChange({ color: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200"
                />
                <input
                  type="text"
                  value={frame.color}
                  onChange={(e) => onChange({ color: e.target.value })}
                  className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase bg-white"
                />
              </div>

              {/* Color swatches */}
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                {COLOR_PRESETS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onChange({ color: c })}
                    style={{ backgroundColor: c }}
                    className={`w-5 h-5 rounded-full border border-black/10 transition-transform hover:scale-110 ${
                      frame.color === c ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Frame Text Color */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Label Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={frame.textColor}
                  onChange={(e) => onChange({ textColor: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer border border-slate-200"
                />
                <input
                  type="text"
                  value={frame.textColor}
                  onChange={(e) => onChange({ textColor: e.target.value })}
                  className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono uppercase bg-white"
                />
              </div>

              {/* Quick text color choices */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => onChange({ textColor: '#ffffff' })}
                  className="px-2.5 py-1 rounded border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  White
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ textColor: '#000000' })}
                  className="px-2.5 py-1 rounded border border-slate-200 bg-black text-xs font-medium text-white hover:bg-slate-900"
                >
                  Black
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
