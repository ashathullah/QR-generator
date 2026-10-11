import React, { useState } from 'react';
import { FrameOptions, ShapeOptions, LogoOptions, ErrorCorrectionLevel, FrameType } from '../types/qr';
import { FrameTab } from './tabs/FrameTab';
import { ShapeTab } from './tabs/ShapeTab';
import { LogoTab } from './tabs/LogoTab';
import { LevelTab } from './tabs/LevelTab';
import { LayoutTemplate, Shapes, Sparkles, SlidersHorizontal } from 'lucide-react';

interface DesignStepProps {
  frame: FrameOptions;
  shape: ShapeOptions;
  logo: LogoOptions;
  level: ErrorCorrectionLevel;
  onUpdateFrame: (updates: Partial<FrameOptions>) => void;
  onSelectFrameType: (type: FrameType) => void;
  onUpdateShape: (updates: Partial<ShapeOptions>) => void;
  onInvertShape: () => void;
  onUpdateLogo: (updates: Partial<LogoOptions>) => void;
  onSelectLevel: (level: ErrorCorrectionLevel) => void;
}

type DesignSubTab = 'frame' | 'shape' | 'logo' | 'level';

export const DesignStep: React.FC<DesignStepProps> = ({
  frame,
  shape,
  logo,
  level,
  onUpdateFrame,
  onSelectFrameType,
  onUpdateShape,
  onInvertShape,
  onUpdateLogo,
  onSelectLevel,
}) => {
  const [activeTab, setActiveTab] = useState<DesignSubTab>('frame');

  const tabs = [
    { id: 'frame', label: 'Frame', icon: LayoutTemplate },
    { id: 'shape', label: 'Shape', icon: Shapes },
    { id: 'logo', label: 'Logo', icon: Sparkles },
    { id: 'level', label: 'Level', icon: SlidersHorizontal },
  ] as const;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-sm">
          2
        </span>
        <h2 className="text-lg font-bold text-slate-900">Design your QR</h2>
      </div>

      {/* Sub tabs navigation */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.id === 'logo' && logo.url && (
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'frame' && (
          <FrameTab
            frame={frame}
            onChange={onUpdateFrame}
            onSelectType={onSelectFrameType}
          />
        )}
        {activeTab === 'shape' && (
          <ShapeTab
            shape={shape}
            onChange={onUpdateShape}
            onInvert={onInvertShape}
          />
        )}
        {activeTab === 'logo' && (
          <LogoTab logo={logo} onChange={onUpdateLogo} />
        )}
        {activeTab === 'level' && (
          <LevelTab
            currentLevel={level}
            hasLogo={!!logo.url}
            onSelectLevel={onSelectLevel}
          />
        )}
      </div>
    </div>
  );
};
