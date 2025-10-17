// Core configuration types
export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: string;
  social: SocialConfig;
}

export interface SocialConfig {
  twitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  email?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  border: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
}

// Enhanced type definitions for full theme support
export type BannerStyle = 'style1' | 'style2' | 'style3' | 'style4' | 'style5';
export type SpotlightStyle = 'style1' | 'style2' | 'style3' | 'style4' | 'style5';
export type GalleryStyle = 'style1' | 'style2';
export type ItemsStyle = 'style1' | 'style2' | 'style3';
export type WrapperStyle = 'style1';

export type SizeModifier = 'small' | 'medium' | 'big';
export type ColorScheme = 'color1' | 'color2' | 'color3' | 'color4' | 'color5' | 'color6' | 'color7';
export type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in';
export type Orientation = 'left' | 'right' | 'center';
export type Alignment = 'left' | 'center' | 'right';

export interface ComponentAnimationConfig {
  onload?: {
    content?: AnimationType;
    image?: AnimationType;
  };
  onscroll?: {
    content?: AnimationType;
    image?: AnimationType;
  };
}

// Enhanced component configurations
export interface BannerConfig {
  style: BannerStyle;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  orientation: Orientation;
  contentAlign: Alignment;
  imagePosition: Alignment;
  fullscreen?: boolean;
  halfscreen?: boolean;
  colorScheme?: ColorScheme;
  invert?: boolean;
  animations?: ComponentAnimationConfig;
  // Style-specific options
  phoneType?: 'iphone' | 'android'; // For style4
}

export interface SpotlightConfig {
  id: string;
  style: SpotlightStyle;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  orientation: Orientation;
  contentAlign: Alignment;
  imagePosition: Alignment;
  fullscreen?: boolean;
  halfscreen?: boolean;
  colorScheme?: ColorScheme;
  invert?: boolean;
  animations?: ComponentAnimationConfig;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  fullImage: string;
  category?: string;
}

export interface GalleryConfig {
  style: GalleryStyle;
  title: string;
  description: string;
  items: GalleryItem[];
  size: SizeModifier;
  lightbox: boolean;
  animations?: ComponentAnimationConfig;
}

export interface FeatureItem {
  id: string;
  icon: string;
  iconStyle?: 'style1' | 'style2';
  iconType?: 'solid' | 'regular' | 'brands';
  title: string;
  description: string;
}

export interface ItemsConfig {
  style: ItemsStyle;
  title: string;
  description: string;
  items: FeatureItem[];
  size: SizeModifier;
  animations?: ComponentAnimationConfig;
}

export interface WrapperConfig {
  style: WrapperStyle;
  colorScheme?: ColorScheme;
  invert?: boolean;
  align?: Alignment;
}

export interface ContactConfig {
  title: string;
  description: string;
  fields: ContactField[];
  submitText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select, radio
}

// Page types
export interface PageConfig {
  slug: string;
  title: string;
  description: string;
  sections: SectionConfig[];
}

export interface SectionConfig {
  type: 'banner' | 'spotlight' | 'gallery' | 'items' | 'contact' | 'wrapper' | 'custom';
  config: BannerConfig | SpotlightConfig | GalleryConfig | ItemsConfig | ContactConfig | WrapperConfig;
}

// Blog types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  featured: boolean;
  image?: string;
}

export interface BlogConfig {
  postsPerPage: number;
  categories: string[];
  tags: string[];
  featuredPosts: number;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface NavigationConfig {
  main: NavigationItem[];
  footer: NavigationItem[];
}

// Component props interfaces
export interface BaseComponentProps {
  className?: string;
  id?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  iconPosition?: 'left' | 'right';
  fit?: boolean;
}

export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  position?: Alignment;
}

export interface IconProps extends BaseComponentProps {
  name: string;
  type?: 'solid' | 'regular' | 'brands';
  style?: 'style1' | 'style2';
  size?: SizeModifier;
  color?: string;
}
