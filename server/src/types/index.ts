export interface ServerQRRequest {
  data: string;
  size?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  format?: 'svg' | 'png' | 'pdf';
  frameText?: string;
}
