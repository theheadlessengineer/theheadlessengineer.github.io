import React from 'react';
import { Card } from '@/components/atoms/Card';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  category: string;
  subcategory: string;
  count: number;
  href: string;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  subcategory,
  count,
  href,
  className = ''
}) => {
  const displaySubcategory = subcategory.replace('-', ' ');
  const displayCategory = category.replace('-', ' ');

  return (
    <Card href={href} className={className}>
      <h3 className={styles.title}>
        {displaySubcategory}
      </h3>
      <p className={styles.meta}>
        {displayCategory} • {count} post{count !== 1 ? 's' : ''}
      </p>
    </Card>
  );
};
