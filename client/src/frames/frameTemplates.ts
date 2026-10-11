import rawFrames from './rawFrames.json';
import { FrameType } from '../types/qr';

export interface QRBoundingBox {
  x: number;
  y: number;
  size: number;
}

export interface FrameDefinition {
  id: FrameType;
  name: string;
  viewBox: string;
  qrBbox: QRBoundingBox;
  // bg fills the area behind the QR: '#ffffff' normally, 'none' when the QR background is transparent
  renderBackground: (color: string, bg: string) => string;
  renderForeground: (color: string, textColor: string, text: string) => string;
  thumbnailSvg: string;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export const FRAME_DEFINITIONS: Record<FrameType, FrameDefinition> = {
  none: {
    id: 'none',
    name: 'No Frame',
    viewBox: '0 0 500 500',
    qrBbox: { x: 0, y: 0, size: 500 },
    renderBackground: () => '',
    renderForeground: () => '',
    thumbnailSvg: '<rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4 4"/><rect x="25" y="25" width="50" height="50" rx="4" fill="#cbd5e1"/>'
  },
  'bottom-banner': {
    id: 'bottom-banner',
    name: 'Bottom Banner',
    viewBox: '0 0 500 620',
    qrBbox: { x: 50, y: 40, size: 400 },
    renderBackground: (color, bg) => `
      <rect x="30" y="20" width="440" height="580" rx="28" fill="${bg}" stroke="${color}" stroke-width="16"/>
      <rect x="30" y="470" width="440" height="130" rx="20" fill="${color}"/>
      <rect x="30" y="470" width="440" height="30" fill="${color}"/>
    `,
    renderForeground: (_color, textColor, text) => `
      <text x="250" y="545" fill="${textColor}" font-size="46" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Scan me!')}</text>
    `,
    thumbnailSvg: '<rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="#334155" stroke-width="4"/><rect x="10" y="66" width="80" height="24" rx="4" fill="#334155"/><text x="50" y="80" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">SCAN ME</text>'
  },
  'top-banner': {
    id: 'top-banner',
    name: 'Top Banner',
    viewBox: '0 0 500 620',
    qrBbox: { x: 50, y: 170, size: 400 },
    renderBackground: (color, bg) => `
      <rect x="30" y="20" width="440" height="580" rx="28" fill="${bg}" stroke="${color}" stroke-width="16"/>
      <rect x="30" y="20" width="440" height="130" rx="20" fill="${color}"/>
      <rect x="30" y="120" width="440" height="30" fill="${color}"/>
    `,
    renderForeground: (_color, textColor, text) => `
      <text x="250" y="90" fill="${textColor}" font-size="46" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Scan me!')}</text>
    `,
    thumbnailSvg: '<rect x="10" y="10" width="80" height="80" rx="6" fill="none" stroke="#334155" stroke-width="4"/><rect x="10" y="10" width="80" height="24" rx="4" fill="#334155"/><text x="50" y="24" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">SCAN ME</text>'
  },
  'box-banner': {
    id: 'box-banner',
    name: 'Badge Box',
    viewBox: '0 0 500 640',
    qrBbox: { x: 50, y: 100, size: 400 },
    renderBackground: (color, bg) => `
      <rect x="25" y="60" width="450" height="550" rx="24" fill="${bg}" stroke="${color}" stroke-width="12"/>
      <rect x="120" y="20" width="260" height="76" rx="38" fill="${color}"/>
    `,
    renderForeground: (_color, textColor, text) => `
      <text x="250" y="62" fill="${textColor}" font-size="34" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'SCAN ME')}</text>
    `,
    thumbnailSvg: '<rect x="12" y="18" width="76" height="72" rx="6" fill="none" stroke="#334155" stroke-width="4"/><rect x="25" y="8" width="50" height="18" rx="9" fill="#334155"/><text x="50" y="20" fill="#ffffff" font-size="7" font-weight="bold" text-anchor="middle">SCAN ME</text>'
  },
  'chef-hat': {
    id: 'chef-hat',
    name: 'Chef Hat',
    viewBox: '0 0 1000 1300',
    qrBbox: { x: 230, y: 535, size: 540 },
    renderBackground: (color, bg) => {
      const paths = rawFrames.chef_paths.map((d: string) => `<path fill="${color}" d="${d}"/>`).join('');
      return `
        <rect x="205" y="510" width="590" height="590" rx="16" fill="${bg}"/>
        ${paths}
      `;
    },
    renderForeground: (_color, textColor, text) => `
      <text x="500" y="1213" fill="${textColor}" font-size="90" font-weight="bold" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Scan me!')}</text>
    `,
    thumbnailSvg: '<path d="M35 25c-5 0-9-3-9-7 0-6 7-9 12-8 3-7 13-9 18-5 5-4 15-2 18 5 5-1 12 2 12 8 0 4-4 7-9 7H35z" fill="#334155"/><rect x="38" y="25" width="24" height="8" fill="#334155"/><rect x="20" y="33" width="60" height="58" rx="6" fill="none" stroke="#334155" stroke-width="4"/><rect x="20" y="75" width="60" height="16" rx="2" fill="#334155"/><text x="50" y="86" fill="#ffffff" font-size="6" font-weight="bold" text-anchor="middle">Scan me!</text>'
  },
  'waiter-platter': {
    id: 'waiter-platter',
    name: 'Waiter Serving',
    viewBox: '0 0 422.3 550.1',
    qrBbox: { x: 111, y: 100, size: 200 },
    renderBackground: (color, bg) => {
      const paths = rawFrames.waiter_paths.map((item: { d: string; class: string }) => {
        const fill = item.class.includes('white-area') ? '#ffffff' : color;
        const opacity = item.class.includes('st4') ? ' fill-opacity="0.5"' : '';
        return `<path fill="${fill}"${opacity} d="${item.d}"/>`;
      }).join('');
      return `
        <rect x="100" y="90" width="222" height="222" rx="12" fill="${bg}"/>
        ${paths}
      `;
    },
    renderForeground: (_color, textColor, text) => `
      <text x="211" y="45" fill="${textColor}" font-size="24" font-weight="bold" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Scan me!')}</text>
    `,
    thumbnailSvg: '<rect x="25" y="15" width="50" height="50" rx="4" fill="none" stroke="#334155" stroke-width="3"/><ellipse cx="50" cy="68" rx="35" ry="6" fill="#334155"/><path d="M20 85c15-4 30-10 40-10 10 0 15 5 15 5s-10 12-25 12c-12 0-25-4-30-7z" fill="#334155"/>'
  },
  phone: {
    id: 'phone',
    name: 'Smartphone',
    viewBox: '0 0 500 750',
    qrBbox: { x: 65, y: 140, size: 370 },
    renderBackground: (color, bg) => `
      <rect x="30" y="20" width="440" height="710" rx="54" fill="${bg}" stroke="${color}" stroke-width="16"/>
      <rect x="190" y="50" width="120" height="18" rx="9" fill="${color}"/>
      <circle cx="335" cy="59" r="6" fill="${color}"/>
      <rect x="170" y="690" width="160" height="8" rx="4" fill="${color}"/>
    `,
    renderForeground: (color, textColor, text) => `
      <rect x="65" y="540" width="370" height="80" rx="16" fill="${color}"/>
      <text x="250" y="585" fill="${textColor}" font-size="36" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Scan with Camera')}</text>
    `,
    thumbnailSvg: '<rect x="25" y="8" width="50" height="84" rx="10" fill="none" stroke="#334155" stroke-width="4"/><rect x="42" y="13" width="16" height="3" rx="1.5" fill="#334155"/><rect x="32" y="22" width="36" height="36" rx="2" fill="#cbd5e1"/><rect x="30" y="64" width="40" height="12" rx="3" fill="#334155"/>'
  },
  bubble: {
    id: 'bubble',
    name: 'Speech Bubble',
    viewBox: '0 0 500 680',
    qrBbox: { x: 50, y: 50, size: 400 },
    renderBackground: (color, bg) => `
      <path d="M60 20 h380 a40 40 0 0 1 40 40 v480 a40 40 0 0 1 -40 40 h-160 l-50 70 l-20 -70 h-150 a40 40 0 0 1 -40 -40 v-480 a40 40 0 0 1 40 -40 z" fill="${bg}" stroke="${color}" stroke-width="16" stroke-linejoin="round"/>
      <rect x="50" y="475" width="400" height="85" rx="18" fill="${color}"/>
    `,
    renderForeground: (_color, textColor, text) => `
      <text x="250" y="520" fill="${textColor}" font-size="40" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Scan me!')}</text>
    `,
    thumbnailSvg: '<path d="M15 15h70a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H55l-12 12-4-12H15a8 8 0 0 1-8-8V23a8 8 0 0 1 8-8z" fill="none" stroke="#334155" stroke-width="4"/><text x="50" y="55" fill="#334155" font-size="12" font-weight="bold" text-anchor="middle">SCAN ME</text>'
  },
  ticket: {
    id: 'ticket',
    name: 'Ticket Coupon',
    viewBox: '0 0 500 650',
    qrBbox: { x: 60, y: 40, size: 380 },
    renderBackground: (color, bg) => `
      <rect x="30" y="20" width="440" height="610" rx="24" fill="${bg}" stroke="${color}" stroke-width="14" stroke-dasharray="12 12"/>
      <circle cx="30" cy="440" r="28" fill="${bg}" stroke="${color}" stroke-width="14"/>
      <circle cx="470" cy="440" r="28" fill="${bg}" stroke="${color}" stroke-width="14"/>
      <line x1="60" y1="440" x2="440" y2="440" stroke="${color}" stroke-width="4" stroke-dasharray="8 8"/>
      <rect x="50" y="470" width="400" height="120" rx="16" fill="${color}"/>
    `,
    renderForeground: (_color, textColor, text) => `
      <text x="250" y="535" fill="${textColor}" font-size="42" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'OFFER / COUPON')}</text>
    `,
    thumbnailSvg: '<rect x="12" y="15" width="76" height="70" rx="6" fill="none" stroke="#334155" stroke-width="3" stroke-dasharray="3 3"/><circle cx="12" cy="55" r="5" fill="#ffffff" stroke="#334155" stroke-width="2"/><circle cx="88" cy="55" r="5" fill="#ffffff" stroke="#334155" stroke-width="2"/><text x="50" y="72" fill="#334155" font-size="8" font-weight="bold" text-anchor="middle">COUPON</text>'
  },
  clipboard: {
    id: 'clipboard',
    name: 'Clipboard',
    viewBox: '0 0 500 660',
    qrBbox: { x: 50, y: 110, size: 400 },
    renderBackground: (color, bg) => `
      <rect x="30" y="60" width="440" height="570" rx="24" fill="${bg}" stroke="${color}" stroke-width="14"/>
      <rect x="160" y="20" width="180" height="60" rx="12" fill="${color}"/>
      <rect x="180" y="35" width="140" height="20" rx="6" fill="#ffffff"/>
      <rect x="50" y="535" width="400" height="80" rx="14" fill="${color}"/>
    `,
    renderForeground: (_color, textColor, text) => `
      <text x="250" y="580" fill="${textColor}" font-size="38" font-weight="800" font-family="Inter, -apple-system, sans-serif" text-anchor="middle" dominant-baseline="middle">${escapeXml(text || 'Check Details')}</text>
    `,
    thumbnailSvg: '<rect x="15" y="20" width="70" height="70" rx="6" fill="none" stroke="#334155" stroke-width="3"/><rect x="35" y="12" width="30" height="14" rx="3" fill="#334155"/><text x="50" y="78" fill="#334155" font-size="7" font-weight="bold" text-anchor="middle">CLIPBOARD</text>'
  },
};
