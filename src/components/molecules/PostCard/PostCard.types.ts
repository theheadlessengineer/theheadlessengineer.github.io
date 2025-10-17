export interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  subcategory: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  className?: string;
}
