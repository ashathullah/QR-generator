export interface LogoPresetItem {
  id: string;
  name: string;
  category: 'popular' | 'social' | 'custom';
  svgDataUri: string;
}

// Convert SVG string into data URI
export function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const LOGO_PRESETS: LogoPresetItem[] = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#5856d6"/>
        <path d="M36 28v22c0 2.2 1.8 4 4 4v22a2 2 0 0 0 4 0V54c2.2 0 4-1.8 4-4V28a2 2 0 0 0-4 0v14h-2V28a2 2 0 0 0-4 0v14h-2V28a2 2 0 0 0-4 0z" fill="#ffffff"/>
        <path d="M58 28c-1.1 0-2 .9-2 2v20c0 4.4 3.6 8 8 8v18a2 2 0 0 0 4 0V28c0-1.1-.9-2-2-2h-8z" fill="#ffffff"/>
        <rect x="46" y="44" width="4" height="4" fill="#ffffff"/>
        <rect x="52" y="44" width="4" height="4" fill="#ffffff"/>
        <rect x="46" y="50" width="4" height="4" fill="#ffffff"/>
        <rect x="52" y="50" width="4" height="4" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'scan-me-red',
    name: 'Scan Me (Red)',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#ef4444"/>
        <text x="50" y="44" fill="#ffffff" font-size="18" font-weight="900" font-family="Arial, sans-serif" text-anchor="middle">SCAN</text>
        <text x="50" y="66" fill="#ffffff" font-size="20" font-weight="900" font-family="Arial, sans-serif" text-anchor="middle">ME</text>
      </svg>
    `),
  },
  {
    id: 'scan-me-cyan',
    name: 'Scan Me (Cyan)',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#06b6d4"/>
        <text x="50" y="44" fill="#ffffff" font-size="18" font-weight="900" font-family="Arial, sans-serif" text-anchor="middle">SCAN</text>
        <text x="50" y="66" fill="#ffffff" font-size="20" font-weight="900" font-family="Arial, sans-serif" text-anchor="middle">ME</text>
      </svg>
    `),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'social',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#25d366"/>
        <path d="M72.2 27.8C66.3 21.9 58.4 18.6 50 18.6c-17.3 0-31.4 14.1-31.4 31.4 0 5.5 1.4 10.9 4.2 15.7L18 82l16.7-4.4c4.6 2.5 9.8 3.8 15.3 3.8h.1c17.3 0 31.4-14.1 31.4-31.4 0-8.4-3.3-16.3-9.3-22.2zM50 76.1h-.1c-4.7 0-9.2-1.3-13.2-3.6l-.9-.6-9.8 2.6 2.6-9.6-.6-1c-2.5-4-3.9-8.7-3.9-13.5 0-14.4 11.7-26.1 26.1-26.1 7 0 13.5 2.7 18.5 7.6 4.9 4.9 7.6 11.5 7.6 18.5 0 14.3-11.7 26.1-26.3 26.1zm14.3-19.6c-.8-.4-4.6-2.3-5.3-2.5-.7-.3-1.3-.4-1.8.4-.5.8-2 2.5-2.5 3-.4.5-.9.6-1.7.2-.8-.4-3.3-1.2-6.3-3.9-2.3-2.1-3.9-4.7-4.4-5.5-.4-.8 0-1.2.4-1.6.4-.4.8-.9 1.2-1.4.4-.5.5-.8.8-1.4.3-.5.1-1-.1-1.4-.2-.4-1.8-4.4-2.5-6-.7-1.6-1.4-1.4-1.9-1.4h-1.6c-.6 0-1.4.2-2.1 1-.7.8-2.7 2.6-2.7 6.4s2.8 7.5 3.2 8c.4.5 5.4 8.3 13.2 11.6 1.8.8 3.3 1.3 4.4 1.6 1.9.6 3.6.5 4.9.3 1.5-.2 4.6-1.9 5.3-3.7.6-1.8.6-3.4.4-3.7-.2-.3-.8-.5-1.6-.9z" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'google',
    name: 'Google',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
        <path d="M74.8 50.8c0-1.8-.2-3.5-.5-5.2H50v9.8h13.9c-.6 3.2-2.4 5.9-5.1 7.7v6.4h8.3c4.8-4.4 7.7-11 7.7-18.7z" fill="#4285f4"/>
        <path d="M50 76c7 0 12.9-2.3 17.2-6.3l-8.3-6.4c-2.3 1.6-5.3 2.5-8.9 2.5-6.8 0-12.6-4.6-14.7-10.8h-8.6v6.6C21.1 69.9 34.6 76 50 76z" fill="#34a853"/>
        <path d="M35.3 55c-.5-1.6-.8-3.3-.8-5s.3-3.4.8-5v-6.6h-8.6C24.9 42 24 45.9 24 50s.9 8 2.7 11.6l8.6-6.6z" fill="#fbbc05"/>
        <path d="M50 33.7c3.8 0 7.2 1.3 9.9 3.9l7.4-7.4C62.9 26 57 24 50 24c-15.4 0-28.9 6.1-33.3 14.4l8.6 6.6c2.1-6.2 7.9-11.3 14.7-11.3z" fill="#ea4335"/>
      </svg>
    `),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#fdf497"/>
            <stop offset="5%" stop-color="#fdf497"/>
            <stop offset="45%" stop-color="#fd5949"/>
            <stop offset="60%" stop-color="#d6249f"/>
            <stop offset="90%" stop-color="#285aeb"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#ig)"/>
        <rect x="28" y="28" width="44" height="44" rx="12" fill="none" stroke="#ffffff" stroke-width="5"/>
        <circle cx="50" cy="50" r="11" fill="none" stroke="#ffffff" stroke-width="5"/>
        <circle cx="63" cy="37" r="3" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'social',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#1877f2"/>
        <path d="M56 46h7.5l1.2-8.5H56v-5.5c0-2.3.6-3.9 4-3.9h4.3V20.5c-.7-.1-3.3-.3-6.2-.3-6.2 0-10.4 3.8-10.4 10.7v6.6h-7.3v8.5h7.3V78h9.8V46z" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    category: 'social',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#000000"/>
        <path d="M57.6 46.1L74.8 26h-4.1L55.8 43.3 43.9 26H30l18 26.3L30 74h4.1l15.7-18.2L62.4 74H76.3L57.6 46.1zm-5.6 6.5l-1.8-2.6L35.6 29.1h6.2l11.6 16.5 1.8 2.6 15.2 21.8h-6.2L52 52.6z" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'wifi',
    name: 'WiFi',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#0ea5e9"/>
        <path d="M50 68a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-14-11c7.7-7.7 20.3-7.7 28 0a3 3 0 1 0 4.2-4.2c-10-10-26.4-10-36.4 0a3 3 0 1 0 4.2 4.2zm-10-10c13.3-13.3 34.7-13.3 48 0a3 3 0 1 0 4.2-4.2c-15.6-15.6-40.8-15.6-56.4 0a3 3 0 1 0 4.2 4.2z" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'email',
    name: 'Email',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#f59e0b"/>
        <path d="M26 34c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V38c0-2.2-1.8-4-4-4H26zm2 6.5l22 13.7 22-13.7V62H28V40.5zm22 8.3L30.2 38h39.6L50 48.8z" fill="#ffffff"/>
      </svg>
    `),
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#003087"/>
        <path d="M42 26h18c6 0 10.5 4.5 9.5 11-.8 5.6-5.5 8.7-11 8.7H50l-3 18.3h-7L42 26z" fill="#0079c1"/>
        <path d="M49 35h14c4.8 0 8.4 3.6 7.6 8.8-.6 4.5-4.4 7-8.8 7H55.4l-2.4 15.2H47.5L49 35z" fill="#00457c" opacity="0.6"/>
      </svg>
    `),
  },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    category: 'popular',
    svgDataUri: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="#f7931a"/>
        <path d="M66.4 43.6c.9-6-3.7-9.3-10-11.4l2-8.2-5-1.2-2 7.9c-1.3-.3-2.7-.6-4-.9l2-8.1-5-1.2-2 8.2c-1.1-.2-2.2-.5-3.2-.8l.1-.3-6.9-1.7-1.3 5.4s3.7.8 3.6.9c2 .5 2.4 1.8 2.3 2.9l-2.3 9.4c.1 0 .3.1.5.2l-.5-.1-3.3 13.1c-.3.7-.9 1.7-2.4 1.3.1.1-3.6-.9-3.6-.9l-2.5 5.8 6.5 1.6c1.2.3 2.4.6 3.6.9l-2.1 8.3 5 1.2 2-8.2c1.4.4 2.7.7 4 1l-2 8.2 5 1.2 2.1-8.3c8.5 1.6 14.9 1 17.6-6.7 2.2-6.2-.1-9.8-4.6-12.1 3.3-.8 5.8-3 6.4-7.6zm-11.5 16.5c-1.5 6.2-12 2.8-15.4 2l2.7-11c3.4.8 14.3 2.5 12.7 9zm1.5-16.6c-1.4 5.7-10.1 2.8-12.9 2.1l2.5-9.9c2.8.7 11.9 2 10.4 7.8z" fill="#ffffff"/>
      </svg>
    `),
  },
];
