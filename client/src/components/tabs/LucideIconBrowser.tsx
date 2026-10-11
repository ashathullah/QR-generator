import React, { useMemo, useState } from 'react';
import { icons } from 'lucide-react';
import { Search } from 'lucide-react';
import { LogoOptions } from '../../types/qr';
import { svgToDataUri } from '../../utils/logoPresets';

interface LucideIconBrowserProps {
  logo: LogoOptions;
  onChange: (updates: Partial<LogoOptions>) => void;
}

const ICON_NAMES = Object.keys(icons);
// ponytail: renders at most this many matches; virtualize the grid if browsing everything at once matters
const MAX_RESULTS = 240;

// Turns a Lucide icon's inner SVG markup into a logo: white on a filled circle,
// or (circle off) the icon alone in `color` on a transparent background.
function buildIconLogo(inner: string, color: string, circle: boolean): string {
  const icon = (pos: string, stroke: string) =>
    `<svg ${pos} viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  return svgToDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${
      circle
        ? `<circle cx="50" cy="50" r="48" fill="${color}"/>${icon('x="24" y="24" width="52" height="52"', '#ffffff')}`
        : icon('x="4" y="4" width="92" height="92"', color)
    }</svg>`
  );
}

// Searchable grid of every Lucide icon. Picking one sets it as the QR logo.
// Lazy-loaded by LogoTab because importing the full icon map is large.
const LucideIconBrowser: React.FC<LucideIconBrowserProps> = ({ logo, onChange }) => {
  const [query, setQuery] = useState('');
  const [color, setColor] = useState('#2563eb');
  const [circle, setCircle] = useState(true);
  const [selected, setSelected] = useState<{ name: string; inner: string } | null>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/[\s-]/g, '');
    return q ? ICON_NAMES.filter((name) => name.toLowerCase().includes(q)) : ICON_NAMES;
  }, [query]);

  const apply = (name: string, inner: string, nextColor = color, nextCircle = circle) => {
    setSelected({ name, inner });
    onChange({ url: buildIconLogo(inner, nextColor, nextCircle), presetId: `lucide:${name}` });
  };

  // Re-renders the selected icon logo when its color or circle setting changes
  const restyle = (nextColor: string, nextCircle: boolean) => {
    setColor(nextColor);
    setCircle(nextCircle);
    if (selected && logo.presetId === `lucide:${selected.name}`) apply(selected.name, selected.inner, nextColor, nextCircle);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Or Pick a Lucide Icon
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={circle}
              onChange={(e) => restyle(color, e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded"
            />
            Circle
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
            {circle ? 'Circle color' : 'Icon color'}
            <input
              type="color"
              value={color}
              onChange={(e) => restyle(e.target.value, circle)}
              className="w-7 h-7 rounded-md border border-slate-200 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="relative flex items-center mb-3">
        <span className="absolute left-3.5 text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${ICON_NAMES.length} icons (e.g. coffee, phone, heart)`}
          aria-label="Search Lucide icons"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-sm outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 p-2">
        {matches.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">No icons match "{query}".</p>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1.5">
            {matches.slice(0, MAX_RESULTS).map((name) => {
              const Icon = icons[name as keyof typeof icons];
              const isSelected = logo.presetId === `lucide:${name}`;
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  aria-label={name}
                  onClick={(e) => {
                    const svg = e.currentTarget.querySelector('svg');
                    if (svg) apply(name, svg.innerHTML);
                  }}
                  className={`aspect-square rounded-lg border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-600 ring-2 ring-blue-500/30'
                      : 'border-transparent bg-white text-slate-700 hover:border-slate-300 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        )}
      </div>
      <p className="text-xs text-slate-400 mt-1.5">
        {matches.length > MAX_RESULTS
          ? `Showing ${MAX_RESULTS} of ${matches.length} icons. Search to narrow down.`
          : `${matches.length} icon${matches.length === 1 ? '' : 's'}`}
      </p>
    </div>
  );
};

export default LucideIconBrowser;
