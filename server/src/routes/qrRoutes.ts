import { Router, Request, Response } from 'express';
import { spawn } from 'child_process';
import { QRService } from '../services/qrService.js';

export const qrRouter = Router();

qrRouter.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

qrRouter.post('/generate', async (req: Request, res: Response) => {
  try {
    const { data, format = 'svg', ...options } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Data parameter is required' });
    }

    if (format === 'svg') {
      const svg = await QRService.generateSVG({ data, ...options });
      return res.json({ format: 'svg', result: svg });
    } else {
      const dataUrl = await QRService.generateDataURL({ data, ...options });
      return res.json({ format: 'png', result: dataUrl });
    }
  } catch (error: any) {
    console.error('Server QR generation error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate QR code' });
  }
});

qrRouter.post('/export', (req: Request, res: Response) => {
  try {
    const { svg, format = 'png', filename = 'qr-code', resolution = 1200 } = req.body;
    if (!svg) {
      return res.status(400).json({ error: 'SVG string is required' });
    }

    if (format === 'svg') {
      const outFilename = filename.endsWith('.svg') ? filename : `${filename}.svg`;
      res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${outFilename}"`);
      return res.send(svg);
    }

    // Convert via ImageMagick convert
    const density = Math.max(72, Math.round((resolution / 500) * 72));
    const targetFormat = format === 'jpeg' ? 'jpg' : format;
    const outFilename = filename.endsWith(`.${targetFormat}`) ? filename : `${filename}.${targetFormat}`;

    const args = ['-density', density.toString()];
    if (format === 'jpeg') {
      args.push('-background', 'white', '-flatten');
    }
    args.push('svg:-', `${targetFormat}:-`);

    const child = spawn('convert', args);
    const chunks: Buffer[] = [];
    let errOutput = '';

    child.stdout.on('data', (chunk) => chunks.push(chunk));
    child.stderr.on('data', (err) => { errOutput += err.toString(); });

    child.on('close', (code) => {
      if (code === 0 && chunks.length > 0) {
        const mime = format === 'pdf'
          ? 'application/pdf'
          : format === 'jpeg'
          ? 'image/jpeg'
          : `image/${format}`;

        res.setHeader('Content-Type', mime);
        res.setHeader('Content-Disposition', `attachment; filename="${outFilename}"`);
        const buffer = Buffer.concat(chunks);
        res.setHeader('Content-Length', buffer.length.toString());
        return res.send(buffer);
      } else {
        console.error('ImageMagick error:', errOutput);
        return res.status(500).json({ error: 'Image conversion failed on server', details: errOutput });
      }
    });

    child.stdin.write(svg);
    child.stdin.end();
  } catch (error: any) {
    console.error('Server export error:', error);
    return res.status(500).json({ error: error.message || 'Export error' });
  }
});
