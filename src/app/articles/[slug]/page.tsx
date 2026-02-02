import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedPosts } from '@/lib/blog';
import { PostCard } from '@/components/molecules';
import { CodeCopyButton } from '@/components/atoms';
import styles from './article.module.css';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);

  return (
    <div>
      <article className={styles.article}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/articles" className={styles.backLink}>Articles</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link 
              href={`/articles/category/${post.category}/${post.subcategory}`}
              className={styles.backLink}
            >
              {post.subcategory.charAt(0).toUpperCase() + post.subcategory.slice(1).replace('-', ' ')}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </nav>

          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <time className={styles.date}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className={styles.readingTime}>{post.readingTime} min read</span>
            </div>
            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
          <CodeCopyButton />
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <PostCard
                  key={relatedPost.slug}
                  slug={relatedPost.slug}
                  title={relatedPost.title}
                  excerpt={relatedPost.excerpt}
                  category={relatedPost.category}
                  subcategory={relatedPost.subcategory}
                  publishedAt={relatedPost.publishedAt}
                  readingTime={relatedPost.readingTime}
                  tags={relatedPost.tags}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
