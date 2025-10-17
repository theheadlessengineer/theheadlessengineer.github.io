'use client';

import React, { useState } from 'react';
import { PostCard } from '@/components/molecules';
import { Button } from '@/components/atoms';
import styles from './MasonryGrid.module.css';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  subcategory: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
}

interface MasonryGridProps {
  posts: BlogPost[];
  className?: string;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  posts,
  className = ''
}) => {
  const [visibleCount, setVisibleCount] = useState(10);
  
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, posts.length));
  };

  return (
    <div className={`${styles.masonryContainer} ${className}`}>
      <div className={styles.masonryGrid}>
        {visiblePosts.map((post) => (
          <div key={post.slug} className={styles.masonryItem}>
            <PostCard
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              subcategory={post.subcategory}
              publishedAt={post.publishedAt}
              readingTime={post.readingTime}
              tags={post.tags}
            />
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <Button
            variant="outline"
            size="medium"
            onClick={loadMore}
            className={styles.loadMoreButton}
          >
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};
