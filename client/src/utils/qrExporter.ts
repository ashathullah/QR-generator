import { jsPDF } from 'jspdf';
import { FrameOptions } from '../types/qr';
import { FRAME_DEFINITIONS } from '../frames/frameTemplates';

export function buildCompositeSVG(
  rawQrSvg: string,
  frame: FrameOptions,
  transparent = false
): string {
  const frameDef = FRAME_DEFINITIONS[frame.type] || FRAME_DEFINITIONS.none;

  // Extract <defs> if any, and main content from rawQrSvg
  const defsMatch = rawQrSvg.match(/<defs>([\s\S]*?)<\/defs>/i);
  const defsContent = defsMatch ? defsMatch[1] : '';

  // Extract raw SVG dimensions
  const viewBoxMatch = rawQrSvg.match(/viewBox="([^"]+)"/i);
  let rawWidth = 400;
  let rawHeight = 400;
  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);
    if (parts.length === 4 && parts[2] > 0) {
      rawWidth = parts[2];
      rawHeight = parts[3];
    }
  } else {
    const widthMatch = rawQrSvg.match(/width="(\d+)"/i);
    const heightMatch = rawQrSvg.match(/height="(\d+)"/i);
    if (widthMatch) rawWidth = parseInt(widthMatch[1], 10);
    if (heightMatch) rawHeight = parseInt(heightMatch[1], 10);
  }

  // Remove <svg ...>, </svg>, and <defs>...</defs> to get the pure inner graphical elements
  let innerElements = rawQrSvg
    .replace(/<\?xml[\s\S]*?\?>/i, '')
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '')
    .replace(/<defs>[\s\S]*?<\/defs>/gi, '');

  if (frame.type === 'none') {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${rawWidth} ${rawHeight}" width="${rawWidth}" height="${rawHeight}">
  <defs>${defsContent}</defs>
  ${innerElements}
</svg>`;
  }

  const { qrBbox, viewBox } = frameDef;
  const scale = qrBbox.size / rawWidth;
  const vbParts = viewBox.split(/\s+/).map(Number);
  const vbW = vbParts[2] || 500;
  const vbH = vbParts[3] || 600;

  const bgSvg = frameDef.renderBackground(frame.color, transparent ? 'none' : '#ffffff');
  const fgSvg = frameDef.renderForeground(frame.color, frame.textColor, frame.text);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${viewBox}" width="${vbW}" height="${vbH}">
  <defs>${defsContent}</defs>
  ${bgSvg}
  <g transform="translate(${qrBbox.x}, ${qrBbox.y}) scale(${scale})">
    ${innerElements}
  </g>
  ${fgSvg}
</svg>`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();

  // Asynchronous cleanup to prevent browser from cancelling the download before reading the stream
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 3000);
}

// Fallback to backend export endpoint
async function downloadViaServer(
  svg: string,
  format: string,
  filename: string,
  resolution = 1200
): Promise<boolean> {
  try {
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ svg, format, filename, resolution }),
    });
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const blob = await res.blob();
    downloadBlob(blob, filename);
    return true;
  } catch (e) {
    console.warn('Server export fallback failed:', e);
    return false;
  }
}

export function exportToSVG(fullSvg: string, filename = 'qr-code.svg') {
  const fileContent = fullSvg.startsWith('<?xml')
    ? fullSvg
    : `<?xml version="1.0" encoding="utf-8"?>\n${fullSvg}`;
  const blob = new Blob([fileContent], { type: 'image/svg+xml;charset=utf-8' });
  downloadBlob(blob, filename);
}

export async function svgToCanvas(
  fullSvg: string,
  targetResolution = 1200
): Promise<HTMLCanvasElement> {
  const cleanSvg = fullSvg.replace(/<\?xml[\s\S]*?\?>/i, '').trim();

  // Parse viewBox to get aspect ratio
  const vbMatch = cleanSvg.match(/viewBox="([^"]+)"/i);
  let aspect = 1;
  if (vbMatch) {
    const parts = vbMatch[1].trim().split(/\s+/).map(Number);
    if (parts.length === 4 && parts[2] > 0) {
      aspect = parts[3] / parts[2];
    }
  }

  const canvas = document.createElement('canvas');
  const width = targetResolution;
  const height = Math.round(targetResolution * aspect);
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  return new Promise((resolve, reject) => {
    const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      resolve(canvas);
    };

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl);

      // Strategy 2: Base64 Data URI
      try {
        const base64Data = btoa(unescape(encodeURIComponent(cleanSvg)));
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          ctx.drawImage(fallbackImg, 0, 0, width, height);
          resolve(canvas);
        };
        fallbackImg.onerror = (err) => {
          reject(new Error('Failed to render SVG onto Canvas'));
        };
        fallbackImg.src = `data:image/svg+xml;base64,${base64Data}`;
      } catch (e) {
        reject(e);
      }
    };

    img.src = blobUrl;
  });
}

export async function exportToPNG(
  fullSvg: string,
  filename = 'qr-code.png',
  resolution = 1200
) {
  try {
    const canvas = await svgToCanvas(fullSvg, resolution);
    return new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, filename);
          resolve();
        } else {
          reject(new Error('Canvas toBlob failed'));
        }
      }, 'image/png');
    });
  } catch (err) {
    console.warn('Client-side PNG failed, falling back to server export:', err);
    const ok = await downloadViaServer(fullSvg, 'png', filename, resolution);
    if (!ok) {
      exportToSVG(fullSvg, filename.replace(/\.png$/i, '.svg'));
    }
  }
}

export async function exportToJPEG(
  fullSvg: string,
  filename = 'qr-code.jpg',
  resolution = 1200
) {
  try {
    const canvas = await svgToCanvas(fullSvg, resolution);
    const flatCanvas = document.createElement('canvas');
    flatCanvas.width = canvas.width;
    flatCanvas.height = canvas.height;
    const ctx = flatCanvas.getContext('2d');
    if (!ctx) throw new Error('Flat canvas context unavailable');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, flatCanvas.width, flatCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    return new Promise<void>((resolve, reject) => {
      flatCanvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, filename);
          resolve();
        } else {
          reject(new Error('Canvas toBlob failed for JPEG'));
        }
      }, 'image/jpeg', 0.95);
    });
  } catch (err) {
    console.warn('Client-side JPEG failed, falling back to server export:', err);
    const ok = await downloadViaServer(fullSvg, 'jpeg', filename, resolution);
    if (!ok) {
      exportToSVG(fullSvg, filename.replace(/\.jpe?g$/i, '.svg'));
    }
  }
}

export async function exportToWebP(
  fullSvg: string,
  filename = 'qr-code.webp',
  resolution = 1200
) {
  try {
    const canvas = await svgToCanvas(fullSvg, resolution);
    return new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, filename);
          resolve();
        } else {
          reject(new Error('Canvas toBlob failed for WebP'));
        }
      }, 'image/webp', 0.95);
    });
  } catch (err) {
    console.warn('Client-side WebP failed, falling back to server export:', err);
    const ok = await downloadViaServer(fullSvg, 'webp', filename, resolution);
    if (!ok) {
      exportToSVG(fullSvg, filename.replace(/\.webp$/i, '.svg'));
    }
  }
}

export async function exportToPDF(
  fullSvg: string,
  filename = 'qr-code.pdf'
) {
  try {
    const canvas = await svgToCanvas(fullSvg, 1200);
    const imgData = canvas.toDataURL('image/png');

    const isLandscape = canvas.width > canvas.height;
    const pdf = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 20;
    const availW = pageWidth - margin * 2;
    const availH = pageHeight - margin * 2;

    const ratio = canvas.height / canvas.width;
    let printW = availW;
    let printH = printW * ratio;

    if (printH > availH) {
      printH = availH;
      printW = printH / ratio;
    }

    const x = (pageWidth - printW) / 2;
    const y = (pageHeight - printH) / 2;

    pdf.addImage(imgData, 'PNG', x, y, printW, printH);
    pdf.save(filename);
  } catch (err) {
    console.warn('Client-side PDF failed, falling back to server export:', err);
    const ok = await downloadViaServer(fullSvg, 'pdf', filename, 1200);
    if (!ok) {
      exportToSVG(fullSvg, filename.replace(/\.pdf$/i, '.svg'));
    }
  }
}

export async function copySvgToClipboard(fullSvg: string): Promise<boolean> {
  try {
    const canvas = await svgToCanvas(fullSvg, 800);
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          resolve(true);
        } catch {
          await navigator.clipboard.writeText(fullSvg);
          resolve(true);
        }
      }, 'image/png');
    });
  } catch (e) {
    console.error('Clipboard copy failed:', e);
    return false;
  }
}
