import QRCode from 'qrcode';
import { ServerQRRequest } from '../types/index.js';

export class QRService {
  public static async generateSVG(req: ServerQRRequest): Promise<string> {
    const text = req.data || 'https://example.com';
    const errorCorrectionLevel = req.errorCorrectionLevel || 'M';
    const dark = req.color?.dark || '#000000';
    const light = req.color?.light || '#ffffff';

    const svg = await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel,
      color: {
        dark,
        light,
      },
      margin: req.margin ?? 2,
      width: req.size ?? 400,
    });

    return svg;
  }

  public static async generateDataURL(req: ServerQRRequest): Promise<string> {
    const text = req.data || 'https://example.com';
    const errorCorrectionLevel = req.errorCorrectionLevel || 'M';
    const dark = req.color?.dark || '#000000';
    const light = req.color?.light || '#ffffff';

    return QRCode.toDataURL(text, {
      errorCorrectionLevel,
      color: {
        dark,
        light,
      },
      margin: req.margin ?? 2,
      width: req.size ?? 400,
    });
  }
}
