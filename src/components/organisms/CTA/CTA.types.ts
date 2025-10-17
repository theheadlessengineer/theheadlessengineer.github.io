export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'outline';
}

export interface CTAConfig {
  title: string;
  description: string;
  buttons: CTAButton[];
  variant?: 'default' | 'invert';
}

export interface CTAProps {
  config: CTAConfig;
}
