export interface PageTemplateProps {
  children: React.ReactNode;
  variant?: 'default' | 'fullwidth' | 'article';
  className?: string;
}

export type PageTemplateVariant = 'default' | 'fullwidth' | 'article';
