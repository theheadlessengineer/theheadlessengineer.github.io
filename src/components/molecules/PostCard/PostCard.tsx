import React from 'react';
import { Card } from '@/components/atoms/Card';
import styles from './PostCard.module.css';

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  subcategory: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  slug,
  title,
  excerpt,
  category,
  subcategory,
  publishedAt,
  readingTime,
  tags,
  className = ''
}) => {
  const displayCategory = category.replace('-', ' ');
  const displaySubcategory = subcategory.replace('-', ' ');
  const formattedDate = new Date(publishedAt).toLocaleDateString();

  return (
    <Card href={`/articles/${slug}`} className={`${styles.postCard} ${className}`}>
      <div className={styles.header}>
        <span className={styles.category}>
          {displayCategory} / {displaySubcategory}
        </span>
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.excerpt}>{excerpt}</p>
      
      <div className={styles.tags}>
        {tags.slice(0, 2).map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      
      <div className={styles.meta}>
        <time className={styles.date}>{formattedDate}</time>
        <span className={styles.readingTime}>{readingTime} min read</span>
      </div>
    </Card>
  );
};
