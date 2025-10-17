import React from 'react';
import { getAllBlogPosts } from '@/lib/blog';
import { Hero } from '@/components/organisms';
import { heroConfigs } from '@/config/content';
import { MasonryGrid } from '@/components/organisms';
import styles from './articles.module.css';

export default async function ArticlesPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <Hero config={heroConfigs.articles} />
      
      <section id="articles-content" className={`section ${styles.section}`}>
        <div className="container">
          <h2 className={styles.title}>LATEST ENGINEERING INSIGHTS</h2>
          <MasonryGrid posts={posts} />
        </div>
      </section>
    </div>
  );
}
