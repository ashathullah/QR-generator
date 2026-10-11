export type QRContentType =
  | 'website'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'whatsapp'
  | 'sms'
  | 'phone'
  | 'social';

export interface WebsiteContent {
  url: string;
}

export interface TextContent {
  text: string;
}

export interface WifiContent {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardContent {
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  note: string;
}

export interface EmailContent {
  email: string;
  subject: string;
  body: string;
}

export interface WhatsappContent {
  phone: string;
  message: string;
}

export interface SmsContent {
  phone: string;
  message: string;
}

export interface PhoneContent {
  phone: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface SocialContent {
  title: string;
  links: SocialLink[];
}

export type QRContent =
  | { type: 'website'; data: WebsiteContent }
  | { type: 'text'; data: TextContent }
  | { type: 'wifi'; data: WifiContent }
  | { type: 'vcard'; data: VCardContent }
  | { type: 'email'; data: EmailContent }
  | { type: 'whatsapp'; data: WhatsappContent }
  | { type: 'sms'; data: SmsContent }
  | { type: 'phone'; data: PhoneContent }
  | { type: 'social'; data: SocialContent };

export type FrameType =
  | 'none'
  | 'bottom-banner'
  | 'top-banner'
  | 'box-banner'
  | 'chef-hat'
  | 'waiter-platter'
  | 'phone'
  | 'bubble'
  | 'ticket'
  | 'clipboard';

export interface FrameOptions {
  type: FrameType;
  text: string;
  color: string;
  textColor: string;
}

export type DotType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';

export interface ShapeOptions {
  dotsType: DotType;
  dotsColor: string;
  isGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientColor1: string;
  gradientColor2: string;
  gradientRotation: number;
  backgroundColor: string;
  isTransparent: boolean;
  cornerSquareType: CornerSquareType;
  cornerSquareColor: string;
  cornerDotType: CornerDotType;
  cornerDotColor: string;
}

export interface LogoPreset {
  id: string;
  name: string;
  svg: string;
  defaultBg?: string;
}

export interface LogoOptions {
  url: string | null;
  presetId?: string;
  size: number;
  margin: number;
  hideBackgroundDots: boolean;
}

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface LevelOptions {
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export interface QRCodeConfig {
  content: QRContent;
  frame: FrameOptions;
  shape: ShapeOptions;
  logo: LogoOptions;
  level: LevelOptions;
  size: number;
}
