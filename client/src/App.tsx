import React from 'react';
import { Navbar } from './components/Navbar';
import { TypeSelector } from './components/TypeSelector';
import { ContentStep } from './components/ContentStep';
import { DesignStep } from './components/DesignStep';
import { PreviewStep } from './components/PreviewStep';
import { useQRCode } from './hooks/useQRCode';
import { Sparkles, CheckCircle2, Shield, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const {
    config,
    compositeSvg,
    isGenerating,
    setContentType,
    updateContentData,
    setFrameType,
    updateFrame,
    updateShape,
    invertColors,
    updateLogo,
    setLevel,
  } = useQRCode();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            QR Code Generator: Create your Free QR Code
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Generate branded QR codes in seconds, customize frames, shapes, and logos with zero subscription fees or expired links.
          </p>
        </div>

        {/* Content Type Selector */}
        <TypeSelector
          activeType={config.content.type}
          onSelectType={setContentType}
        />

        {/* Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Step 1 (Content) & Step 2 (Design) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ContentStep
              content={config.content}
              onChange={updateContentData}
            />

            <DesignStep
              frame={config.frame}
              shape={config.shape}
              logo={config.logo}
              level={config.level.errorCorrectionLevel}
              onUpdateFrame={updateFrame}
              onSelectFrameType={setFrameType}
              onUpdateShape={updateShape}
              onInvertShape={invertColors}
              onUpdateLogo={updateLogo}
              onSelectLevel={setLevel}
            />
          </div>

          {/* Right Column: Step 3 (Live Preview & Download) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <PreviewStep
              compositeSvg={compositeSvg}
              isGenerating={isGenerating}
              isTransparent={config.shape.isTransparent}
              onToggleTransparent={(isTransparent) => updateShape({ isTransparent })}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">100% Free & Permanent</h3>
            <p className="text-xs text-slate-500">
              Unlike commercial generators that redirect links through paid servers, your QR code stores the direct data and never expires.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Private & Safe</h3>
            <p className="text-xs text-slate-500">
              All codes are generated client-side in your browser. Your confidential WiFi keys, contacts, and personal links stay on your device.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Vector & High Resolution</h3>
            <p className="text-xs text-slate-500">
              Export pure SVG vector graphics for high-quality billboards and business cards, or download crisp 4K PNG, JPEG, and PDF files.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} QR Studio. Free Open-Source QR Code Generator.</p>
        </div>
      </footer>
    </div>
  );
};
