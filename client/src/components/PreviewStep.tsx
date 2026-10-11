import React, { useState } from 'react';
import {
  Download,
  Copy,
  Printer,
  Check,
  ChevronDown,
  Sparkles,
  Layers,
  FileCode2,
  FileImage,
  FileType,
  Loader2,
} from 'lucide-react';
import {
  exportToSVG,
  exportToPNG,
  exportToJPEG,
  exportToWebP,
  exportToPDF,
  copySvgToClipboard,
} from '../utils/qrExporter';

interface PreviewStepProps {
  compositeSvg: string;
  isGenerating: boolean;
  isTransparent: boolean;
  onToggleTransparent: (isTransparent: boolean) => void;
}

// Checkerboard behind the preview so a transparent background is visible
const CHECKERBOARD = {
  backgroundImage: 'repeating-conic-gradient(#e2e8f0 0% 25%, #ffffff 0% 50%)',
  backgroundSize: '20px 20px',
};

export const PreviewStep: React.FC<PreviewStepProps> = ({
  compositeSvg,
  isGenerating,
  isTransparent,
  onToggleTransparent,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [resolution, setResolution] = useState<number>(1200);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!compositeSvg) return;
    const success = await copySvgToClipboard(compositeSvg);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (!compositeSvg) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; }
            svg { max-width: 80vw; max-height: 80vh; }
            @media print {
              body { margin: 0; }
              svg { max-width: 90%; max-height: 90%; }
            }
          </style>
        </head>
        <body>
          ${compositeSvg}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownload = async (format: 'svg' | 'png' | 'jpeg' | 'webp' | 'pdf') => {
    if (!compositeSvg || downloadingFormat) return;
    setDownloadMenuOpen(false);
    setDownloadingFormat(format);

    try {
      switch (format) {
        case 'svg':
          exportToSVG(compositeSvg, 'my-qr-code.svg');
          break;
        case 'png':
          await exportToPNG(compositeSvg, 'my-qr-code.png', resolution);
          break;
        case 'jpeg':
          await exportToJPEG(compositeSvg, 'my-qr-code.jpg', resolution);
          break;
        case 'webp':
          await exportToWebP(compositeSvg, 'my-qr-code.webp', resolution);
          break;
        case 'pdf':
          await exportToPDF(compositeSvg, 'my-qr-code.pdf');
          break;
      }
      setDownloadSuccess(format.toUpperCase());
      setTimeout(() => setDownloadSuccess(null), 3500);
    } catch (err: any) {
      console.warn('Direct raster export failed, using SVG fallback:', err);
      // Guarantee the user always gets their QR code
      exportToSVG(compositeSvg, 'my-qr-code.svg');
      setDownloadSuccess('SVG (Universal Vector)');
      setTimeout(() => setDownloadSuccess(null), 3500);
    } finally {
      setDownloadingFormat(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shadow-sm">
            3
          </span>
          <h2 className="text-lg font-bold text-slate-900">Download your QR</h2>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3" /> Ready to scan
        </div>
      </div>

      {/* QR Preview Display Card */}
      <div
        style={isTransparent ? CHECKERBOARD : undefined}
        className="relative bg-slate-50 border border-slate-200/80 rounded-2xl p-6 mb-4 flex items-center justify-center min-h-[360px] overflow-hidden group"
      >
        {compositeSvg ? (
          <div
            className="w-full max-w-[280px] max-h-[380px] transition-transform duration-200 group-hover:scale-[1.02] flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: compositeSvg }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2 py-12">
            <div className="w-10 h-10 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-xs font-medium">Generating preview...</span>
          </div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Download Success Notice */}
      {downloadSuccess && (
        <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Downloaded {downloadSuccess} successfully!</span>
        </div>
      )}

      {/* Transparent Background (same setting as Design > Shape > Background) */}
      <label className="flex items-center justify-between mb-3 px-1 text-xs cursor-pointer">
        <span className="text-slate-500 font-medium">Transparent background (PNG, WebP, SVG)</span>
        <input
          type="checkbox"
          checked={isTransparent}
          onChange={(e) => onToggleTransparent(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
      </label>

      {/* Resolution Selector */}
      <div className="flex items-center justify-between mb-4 px-1 text-xs">
        <span className="text-slate-500 font-medium flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Quality:
        </span>
        <div className="flex items-center gap-1">
          {[
            { label: '800px', val: 800 },
            { label: '1200px (HD)', val: 1200 },
            { label: '2048px (4K)', val: 2048 },
          ].map((item) => (
            <button
              key={item.val}
              type="button"
              onClick={() => setResolution(item.val)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                resolution === item.val
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Download Button & Dropdown */}
      <div className="relative mb-3">
        <div className="flex rounded-xl shadow-md shadow-blue-500/20 overflow-hidden">
          <button
            type="button"
            disabled={!compositeSvg || !!downloadingFormat}
            onClick={() => handleDownload('png')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 px-4 flex items-center justify-center gap-2 transition-colors text-sm"
          >
            {downloadingFormat ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing {downloadingFormat.toUpperCase()}...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </>
            )}
          </button>
          <button
            type="button"
            disabled={!compositeSvg || !!downloadingFormat}
            onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
            className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-500 text-white px-3 border-l border-blue-500 flex items-center justify-center transition-colors"
            title="Choose export format"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${downloadMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Dropdown Options */}
        {downloadMenuOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
            <button
              type="button"
              onClick={() => handleDownload('png')}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <FileImage className="w-4 h-4 text-blue-600" />
                <span>PNG Image</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{resolution}x{resolution}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownload('svg')}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <FileCode2 className="w-4 h-4 text-purple-600" />
                <span>SVG Vector Format</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Infinitely Scalable</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownload('jpeg')}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <FileImage className="w-4 h-4 text-amber-600" />
                <span>JPEG Image</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">White Background</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownload('webp')}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <FileImage className="w-4 h-4 text-emerald-600" />
                <span>WebP Image</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Ultra-light</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownload('pdf')}
              className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs text-slate-700 font-semibold border-t border-slate-100"
            >
              <div className="flex items-center gap-2.5">
                <FileType className="w-4 h-4 text-red-600" />
                <span>PDF Document</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Print Ready A4</span>
            </button>
          </div>
        )}
      </div>

      {/* Auxiliary Actions: Copy & Print */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Image</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print QR</span>
        </button>
      </div>
    </div>
  );
};
