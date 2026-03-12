import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/config/site';
import { articlesConfig } from '@/config/articles';
import { ContentDetail } from '@/components/organisms/ContentDetail';

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
  // Filter out reserved route names to avoid conflicts
  return articles
    .map(article => ({ slug: article.slug }))
    .filter(a => a.slug !== 'page' && a.slug !== 'category' && a.slug !== 'tag');
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
    <ContentDetail
      header={{
        category: {
          name: article.category,
          href: `/articles/category/${article.category}`,
        },
        title: article.title,
        excerpt: article.excerpt,
        metaItems: [formattedDate, `${article.readingTime} min read`],
        tags: article.tags,
        tagBasePath: '/articles/tag',
      }}
      content={htmlContent}
      backLink={{
        href: '/articles',
        text: articlesConfig.backLink.text,
      }}
      jsonLd={articleSchema}
    />
  );
}
