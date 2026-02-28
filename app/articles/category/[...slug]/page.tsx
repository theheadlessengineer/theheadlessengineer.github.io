import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArticleGrid } from '@/components/organisms/ArticleGrid';
import { getArticlesByCategory } from '@/lib/articles';
import { articlesConfig } from '@/config/articles';
import { siteConfig } from '@/config/site';

const ARTICLES_PER_PAGE = 6;

interface CategoryPageProps {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  const categories = Object.keys(articlesConfig.categories);
  const params = [];
  
  for (const category of categories) {
    const articles = getArticlesByCategory(category);
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    
    params.push({ slug: [category] });
    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [category, page.toString()] });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.slug[0];
  const categoryConfig =
    articlesConfig.categories[category as keyof typeof articlesConfig.categories];

  if (!categoryConfig) return {};

  return {
    title: `${categoryConfig.name} | ${siteConfig.logo}`,
    description: categoryConfig.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps): JSX.Element {
  const category = params.slug[0];
  const currentPage = params.slug[1] ? Number(params.slug[1]) : 1;
  
  const categoryConfig =
    articlesConfig.categories[category as keyof typeof articlesConfig.categories];

  if (!categoryConfig) notFound();

  const allArticles = getArticlesByCategory(category);
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  return (
    <ArticleGrid
      articles={paginatedArticles}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/articles/category/${category}`}
      backLink={<Link href="/articles">{articlesConfig.backLink.text}</Link>}
    />
  );
}
