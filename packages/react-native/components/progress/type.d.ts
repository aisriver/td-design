export interface ProgressProps {
  type?: 'circle' | 'line';
  width?: number;
  color?: string | [string, string];
  bgColor?: string;
  strokeWidth?: number;
  value?: number;
  label?: {
    show: boolean;
    position?: 'right' | 'top';
  };
}
