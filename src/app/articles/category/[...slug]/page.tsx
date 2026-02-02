import React from 'react';
import Link from 'next/link';
import { getBlogPostsByCategory, getBlogCategories } from '@/lib/blog';
import { MasonryGrid } from '@/components/organisms';
import styles from '../category.module.css';

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Category descriptions mapping
const categoryDescriptions: Record<string, Record<string, string>> = {
  'software-architecture': {
    'design-patterns': 'Explore proven design patterns that solve common software engineering challenges. Learn how to implement scalable, maintainable solutions using time-tested architectural approaches that enhance code quality and team productivity.',
    'principles': 'Discover fundamental software architecture principles that guide decision-making in complex systems. From SOLID principles to domain-driven design, understand the core concepts that create robust, flexible applications.',
    'patterns': 'Deep dive into architectural patterns that shape modern software systems. Learn when and how to apply microservices, event-driven architecture, and other patterns that scale with your business needs.'
  },
  'web-development': {
    'frontend': 'Master modern frontend development techniques and frameworks. From React and Next.js to performance optimization, discover how to build engaging, responsive user experiences that delight users.',
    'backend': 'Build robust backend systems that power modern applications. Explore API design, database optimization, and server architecture patterns that ensure reliability and performance at scale.',
    'fullstack': 'Bridge the gap between frontend and backend development. Learn how to architect complete web applications with seamless integration, optimal performance, and maintainable codebases.'
  }
};

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map(({ category, subcategory }) => ({
    slug: [category, subcategory],
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, subcategory] = slug;
  const posts = await getBlogPostsByCategory(category, subcategory);
  
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1).replace('-', ' ');
  const subcategoryName = subcategory?.charAt(0).toUpperCase() + subcategory?.slice(1).replace('-', ' ');
  
  // Get description or fallback
  const description = categoryDescriptions[category]?.[subcategory] || 
    `Explore insights and best practices in ${subcategoryName.toLowerCase()} within the ${categoryName.toLowerCase()} domain.`;

  return (
    <div>
      <section id="category-hero" className={`section ${styles.section}`}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/articles" className={styles.backLink}>Articles</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>
              {categoryName} / {subcategoryName}
            </span>
          </nav>

          <h1>{subcategoryName}</h1>
          <p className="major">
            {description}
          </p>
        </div>
      </section>
      
      <section id="category-posts" className={`section ${styles.postsSection}`}>
        <div className="container">
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No articles found in this category.</p>
              <Link href="/articles" className={styles.backLink}>
                ← Back to all articles
              </Link>
            </div>
          ) : (
            <MasonryGrid posts={posts} />
          )}
        </div>
      </section>
    </div>
  );
}
