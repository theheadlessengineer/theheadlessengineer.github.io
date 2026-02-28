import Link from 'next/link';
import { Card } from '@/components/atoms/Card';
import styles from './PostCard.module.css';

export interface PostCardProps {
  readonly title: string;
  readonly excerpt: string;
  readonly slug: string;
  readonly category: string;
  readonly publishedAt: string;
  readonly readingTime: number;
  readonly tags: readonly string[];
}

export function PostCard({
  title,
  excerpt,
  slug,
  category,
  publishedAt,
  readingTime,
  tags,
}: PostCardProps): JSX.Element {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card href={`/articles/${slug}`} title={category}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.excerpt}>{excerpt}</p>
      <div className={styles.meta}>
        <span className={styles.date}>{formattedDate}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.readingTime}>{readingTime} min</span>
      </div>
    </Card>
  );
}
