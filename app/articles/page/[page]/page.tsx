import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { PostCard } from '@/components/molecules/PostCard';
import { getAllArticles } from '@/lib/articles';
import { articlesConfig } from '@/config/articles';
import { siteConfig } from '@/config/site';

interface ArticlesPageProps {
  params: { page: string };
}

export async function generateStaticParams() {
  const allArticles = getAllArticles();
  const totalPages = Math.ceil(allArticles.length / articlesConfig.itemsPerPage);

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
  const totalPages = Math.ceil(allArticles.length / articlesConfig.itemsPerPage);

  if (currentPage < 1 || currentPage > totalPages) notFound();

  const startIndex = (currentPage - 1) * articlesConfig.itemsPerPage;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + articlesConfig.itemsPerPage);

  return (
    <CategoryGrid
      items={paginatedArticles}
      renderItem={article => <PostCard key={article.slug} {...article} />}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/articles/page"
    />
  );
}
