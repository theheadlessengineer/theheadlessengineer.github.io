import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/config/site';
import { articlesConfig } from '@/config/articles';
import { ArticleContent } from '@/components/molecules/ArticleContent';
import { BackLink } from '@/components/atoms/BackLink';
import styles from './article.module.css';

interface ArticlePageProps {
  params: { slug: string };
}

// Configure marked to add IDs to headings
marked.use({
  renderer: {
    heading({ text, depth }) {
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h${depth} id="${slug}">${text}</h${depth}>`;
    },
  },
});

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);

  if (!article) return {};

  return {
    title: `${article.seo.metaTitle} | ${siteConfig.logo}`,
    description: article.seo.metaDescription,
    keywords: [...article.seo.keywords],
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      images: [article.seo.ogImage],
    },
    other: {
      'article:published_time': article.publishedAt,
      'article:modified_time': article.updatedAt || article.publishedAt,
      'article:author': siteConfig.author.name,
      'article:section': article.category,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps): Promise<JSX.Element> {
  const article = getArticleBySlug(params.slug);

  if (!article) notFound();

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const htmlContent = await marked(article.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.seo.ogImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/articles/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.category}>
            <Link href={`/articles/category/${article.category}`}>{article.category}</Link>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <div className={styles.meta}>
            <span className={styles.date}>{formattedDate}</span>
            <span className={styles.separator}>•</span>
            <span className={styles.readingTime}>{article.readingTime} min read</span>
          </div>
        </header>

        <ArticleContent html={htmlContent} className={styles.content} />

        <BackLink href="/articles" text={articlesConfig.backLink.text} />
      </article>
    </>
  );
}
