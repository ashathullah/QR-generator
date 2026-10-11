import { useState, useEffect, useRef, useMemo } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QRCodeConfig, QRContentType, DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel, FrameType } from '../types/qr';
import { generateQRPayload } from '../utils/qrPayload';
import { buildCompositeSVG } from '../utils/qrExporter';

const DEFAULT_CONFIG: QRCodeConfig = {
  content: {
    type: 'website',
    data: { url: 'https://github.com' },
  },
  frame: {
    type: 'bottom-banner',
    text: 'Scan me!',
    color: '#000000',
    textColor: '#ffffff',
  },
  shape: {
    dotsType: 'rounded',
    dotsColor: '#000000',
    isGradient: false,
    gradientType: 'linear',
    gradientColor1: '#2563eb',
    gradientColor2: '#9333ea',
    gradientRotation: 45,
    backgroundColor: '#ffffff',
    isTransparent: false,
    cornerSquareType: 'extra-rounded',
    cornerSquareColor: '#000000',
    cornerDotType: 'dot',
    cornerDotColor: '#000000',
  },
  logo: {
    url: null,
    size: 0.25,
    margin: 4,
    hideBackgroundDots: true,
  },
  level: {
    errorCorrectionLevel: 'Q',
  },
  size: 500,
};

export function useQRCode() {
  const [config, setConfig] = useState<QRCodeConfig>(DEFAULT_CONFIG);
  const [rawSvg, setRawSvg] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null);

  // Initialize QRCodeStyling once
  useEffect(() => {
    qrCodeInstanceRef.current = new QRCodeStyling({
      width: 500,
      height: 500,
      type: 'svg',
      data: 'https://github.com',
      image: '',
      dotsOptions: {
        type: 'rounded',
        color: '#000000',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#000000',
      },
      cornersDotOptions: {
        type: 'dot',
        color: '#000000',
      },
      qrOptions: {
        errorCorrectionLevel: 'Q',
      },
    });
  }, []);

  // Update raw QR code whenever config changes
  useEffect(() => {
    if (!qrCodeInstanceRef.current) return;

    const payload = generateQRPayload(config.content);

    const dotsOptions: any = {
      type: config.shape.dotsType,
    };

    if (config.shape.isGradient) {
      dotsOptions.gradient = {
        type: config.shape.gradientType,
        rotation: (config.shape.gradientRotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: config.shape.gradientColor1 },
          { offset: 1, color: config.shape.gradientColor2 },
        ],
      };
    } else {
      dotsOptions.color = config.shape.dotsColor;
    }

    const options: Partial<Options> = {
      width: 500,
      height: 500,
      data: payload,
      image: config.logo.url || undefined,
      imageOptions: {
        hideBackgroundDots: config.logo.hideBackgroundDots,
        imageSize: config.logo.size,
        margin: config.logo.margin,
        crossOrigin: 'anonymous',
      },
      dotsOptions,
      backgroundOptions: {
        color: config.shape.isTransparent ? 'transparent' : config.shape.backgroundColor,
      },
      cornersSquareOptions: {
        type: config.shape.cornerSquareType,
        color: config.shape.cornerSquareColor,
      },
      cornersDotOptions: {
        type: config.shape.cornerDotType,
        color: config.shape.cornerDotColor,
      },
      qrOptions: {
        errorCorrectionLevel: config.level.errorCorrectionLevel,
      },
    };

    qrCodeInstanceRef.current.update(options);

    setIsGenerating(true);
    qrCodeInstanceRef.current.getRawData('svg')
      .then((blob) => {
        if (blob) {
          return blob.text();
        }
        return '';
      })
      .then((svgText) => {
        setRawSvg(svgText);
        setIsGenerating(false);
      })
      .catch((err) => {
        console.error('Failed to get raw SVG from qr-code-styling:', err);
        setIsGenerating(false);
      });
  }, [config]);

  // Full composite SVG with active frame
  const compositeSvg = useMemo(() => {
    if (!rawSvg) return '';
    return buildCompositeSVG(rawSvg, config.frame, config.shape.isTransparent);
  }, [rawSvg, config.frame, config.shape.isTransparent]);

  // Content Handlers
  const setContentType = (type: QRContentType) => {
    setConfig((prev) => {
      let newData: any = {};
      switch (type) {
        case 'website':
          newData = { url: '' };
          break;
        case 'text':
          newData = { text: '' };
          break;
        case 'wifi':
          newData = { ssid: '', password: '', encryption: 'WPA', hidden: false };
          break;
        case 'vcard':
          newData = {
            firstName: '',
            lastName: '',
            organization: '',
            jobTitle: '',
            phone: '',
            email: '',
            address: '',
            website: '',
            note: '',
          };
          break;
        case 'email':
          newData = { email: '', subject: '', body: '' };
          break;
        case 'whatsapp':
          newData = { phone: '', message: '' };
          break;
        case 'sms':
          newData = { phone: '', message: '' };
          break;
        case 'phone':
          newData = { phone: '' };
          break;
        case 'social':
          newData = { title: 'My Links', links: [{ id: '1', platform: 'GitHub', url: '' }] };
          break;
      }
      return {
        ...prev,
        content: { type, data: newData } as any,
      };
    });
  };

  const updateContentData = (fieldUpdates: Record<string, any>) => {
    setConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        data: {
          ...prev.content.data,
          ...fieldUpdates,
        },
      } as any,
    }));
  };

  // Frame Handlers
  const setFrameType = (type: FrameType) => {
    setConfig((prev) => ({
      ...prev,
      frame: { ...prev.frame, type },
    }));
  };

  const updateFrame = (updates: Partial<typeof DEFAULT_CONFIG.frame>) => {
    setConfig((prev) => ({
      ...prev,
      frame: { ...prev.frame, ...updates },
    }));
  };

  // Shape Handlers
  const updateShape = (updates: Partial<typeof DEFAULT_CONFIG.shape>) => {
    setConfig((prev) => ({
      ...prev,
      shape: { ...prev.shape, ...updates },
    }));
  };

  const invertColors = () => {
    setConfig((prev) => ({
      ...prev,
      shape: {
        ...prev.shape,
        dotsColor: prev.shape.backgroundColor === 'transparent' ? '#000000' : prev.shape.backgroundColor,
        backgroundColor: prev.shape.dotsColor,
        cornerSquareColor: prev.shape.backgroundColor === 'transparent' ? '#000000' : prev.shape.backgroundColor,
        cornerDotColor: prev.shape.backgroundColor === 'transparent' ? '#000000' : prev.shape.backgroundColor,
      },
    }));
  };

  // Logo Handlers
  const updateLogo = (updates: Partial<typeof DEFAULT_CONFIG.logo>) => {
    setConfig((prev) => {
      // Auto upgrade error correction to Q or H when logo is attached
      const nextLevel = updates.url && (prev.level.errorCorrectionLevel === 'L' || prev.level.errorCorrectionLevel === 'M')
        ? 'Q'
        : prev.level.errorCorrectionLevel;

      return {
        ...prev,
        logo: { ...prev.logo, ...updates },
        level: { errorCorrectionLevel: nextLevel },
      };
    });
  };

  // Level Handlers
  const setLevel = (errorCorrectionLevel: ErrorCorrectionLevel) => {
    setConfig((prev) => ({
      ...prev,
      level: { errorCorrectionLevel },
    }));
  };

  return {
    config,
    rawSvg,
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
  };
}
