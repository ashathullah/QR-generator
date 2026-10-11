import React from 'react';
import { QrCode, Sparkles, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">QR Studio</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> 100% Free
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">No paywalls • No shortened redirect links • Permanent</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="hidden md:flex items-center gap-1 text-slate-500 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Pure Client-Side Generation</span>
          </div>
          <a
            href="#faq"
            className="text-slate-600 hover:text-blue-600 font-medium transition-colors hidden sm:block"
          >
            FAQ
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};
