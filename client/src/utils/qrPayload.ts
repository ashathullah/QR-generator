import { QRContent } from '../types/qr';

export function generateQRPayload(content: QRContent): string {
  switch (content.type) {
    case 'website': {
      let url = content.data.url.trim();
      if (!url) return 'https://example.com';
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      return url;
    }
    case 'text':
      return content.data.text || 'Hello World';
    case 'wifi': {
      const { ssid, password, encryption, hidden } = content.data;
      const cleanSsid = ssid ? ssid.replace(/[\\;:,"]/g, '\\$&') : '';
      const cleanPass = password ? password.replace(/[\\;:,"]/g, '\\$&') : '';
      return `WIFI:T:${encryption || 'WPA'};S:${cleanSsid};P:${cleanPass};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const { firstName, lastName, organization, jobTitle, phone, email, address, website, note } = content.data;
      const fn = [firstName, lastName].filter(Boolean).join(' ') || 'Contact';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName || ''};${firstName || ''};;;`,
        `FN:${fn}`,
      ];
      if (organization) lines.push(`ORG:${organization}`);
      if (jobTitle) lines.push(`TITLE:${jobTitle}`);
      if (phone) lines.push(`TEL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (address) lines.push(`ADR:;;${address};;;;`);
      if (website) lines.push(`URL:${website}`);
      if (note) lines.push(`NOTE:${note}`);
      lines.push('END:VCARD');
      return lines.join('\n');
    }
    case 'email': {
      const { email, subject, body } = content.data;
      if (!email) return 'mailto:info@example.com';
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);
      const query = params.toString();
      return `mailto:${email}${query ? `?${query}` : ''}`;
    }
    case 'whatsapp': {
      const cleanPhone = (content.data.phone || '').replace(/[^0-9]/g, '');
      const msg = content.data.message || '';
      return `https://wa.me/${cleanPhone}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
    }
    case 'sms': {
      const phone = content.data.phone || '';
      const msg = content.data.message || '';
      return `sms:${phone}${msg ? `?body=${encodeURIComponent(msg)}` : ''}`;
    }
    case 'phone': {
      const phone = (content.data.phone || '').replace(/[^0-9+]/g, '');
      return `tel:${phone || '+15550192834'}`;
    }
    case 'social': {
      if (content.data.links && content.data.links.length > 0) {
        return content.data.links[0].url || 'https://example.com';
      }
      return 'https://example.com';
    }
    default:
      return 'https://example.com';
  }
}
