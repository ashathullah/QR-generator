import React from 'react';
import { ErrorCorrectionLevel } from '../../types/qr';
import { Shield, Sparkles } from 'lucide-react';

interface LevelTabProps {
  currentLevel: ErrorCorrectionLevel;
  hasLogo: boolean;
  onSelectLevel: (level: ErrorCorrectionLevel) => void;
}

interface LevelCard {
  level: ErrorCorrectionLevel;
  name: string;
  percentage: string;
  recoveryText: string;
  recommendedFor: string;
}

const LEVELS: LevelCard[] = [
  {
    level: 'L',
    name: 'Level L',
    percentage: '7%',
    recoveryText: 'Restores up to 7% damaged data',
    recommendedFor: 'Simple QR codes without logos',
  },
  {
    level: 'M',
    name: 'Level M',
    percentage: '15%',
    recoveryText: 'Restores up to 15% damaged data',
    recommendedFor: 'Default balance of density & reliability',
  },
  {
    level: 'Q',
    name: 'Level Q',
    percentage: '25%',
    recoveryText: 'Restores up to 25% damaged data',
    recommendedFor: 'Recommended when adding logos',
  },
  {
    level: 'H',
    name: 'Level H',
    percentage: '30%',
    recoveryText: 'Restores up to 30% damaged data',
    recommendedFor: 'Maximum redundancy & large logos',
  },
];

export const LevelTab: React.FC<LevelTabProps> = ({
  currentLevel,
  hasLogo,
  onSelectLevel,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Error Correction Level
        </label>
        <p className="text-xs text-slate-500 mb-4">
          Error correction allows the QR code to be scanned even if part of it is obscured by a logo, scratched, or damaged.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEVELS.map((item) => {
            const isSelected = currentLevel === item.level;
            const isRecommended = hasLogo && (item.level === 'Q' || item.level === 'H');
            return (
              <button
                key={item.level}
                type="button"
                onClick={() => onSelectLevel(item.level)}
                className={`relative p-4 rounded-xl border text-left transition-all group flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900">{item.name}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.percentage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mb-1">{item.recoveryText}</p>
                  <p className="text-[11px] text-slate-400">{item.recommendedFor}</p>
                </div>

                {isRecommended && (
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    <Sparkles className="w-3 h-3" /> Best for logo
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600">
          <span className="font-bold text-slate-800">Pro-Tip for Logos: </span>
          Higher error correction levels increase the number of data modules in the QR code, providing space for logos without breaking readability across any phone camera.
        </div>
      </div>
    </div>
  );
};
