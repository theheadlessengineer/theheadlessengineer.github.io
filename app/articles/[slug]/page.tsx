import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/config/site';
import { articlesConfig } from '@/config/articles';
import { ArticleContent } from '@/components/molecules/ArticleContent';
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

  return (
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

      <div className={styles.backLink}>
        <Link href="/articles">{articlesConfig.backLink.text}</Link>
      </div>
    </article>
  );
}
