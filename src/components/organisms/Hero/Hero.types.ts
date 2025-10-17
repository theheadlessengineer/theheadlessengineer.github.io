export interface HeroConfig {
  title: string;
  tagline: string;
  rotatingSentences?: string[];
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export interface HeroProps {
  config: HeroConfig;
  className?: string;
}
