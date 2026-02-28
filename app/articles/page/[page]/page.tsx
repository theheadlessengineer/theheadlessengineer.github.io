import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleGrid } from '@/components/organisms/ArticleGrid';
import { getAllArticles } from '@/lib/articles';
import { articlesConfig } from '@/config/articles';
import { siteConfig } from '@/config/site';

const ARTICLES_PER_PAGE = 6;

interface ArticlesPageProps {
  params: { page: string };
}

export async function generateStaticParams() {
  const allArticles = getAllArticles();
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const page = Number(params.page);

  return {
    title: `${articlesConfig.hero.title} - Page ${page} | ${siteConfig.logo}`,
    description: articlesConfig.hero.description,
  };
}

export default function ArticlesPageNumber({ params }: ArticlesPageProps): JSX.Element {
  const allArticles = getAllArticles();
  const currentPage = Number(params.page);
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);

  if (currentPage < 1 || currentPage > totalPages) notFound();

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  return (
    <ArticleGrid
      articles={paginatedArticles}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/articles/page"
    />
  );
}
