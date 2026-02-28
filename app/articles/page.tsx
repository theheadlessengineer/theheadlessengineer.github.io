import { Metadata } from 'next';
import { ArticleGrid } from '@/components/organisms/ArticleGrid';
import { getAllArticles } from '@/lib/articles';
import { articlesConfig } from '@/config/articles';
import { siteConfig } from '@/config/site';

const ARTICLES_PER_PAGE = 6;

export const metadata: Metadata = {
  title: `${articlesConfig.hero.title} | ${siteConfig.logo}`,
  description: articlesConfig.hero.description,
};

export default function ArticlesPage(): JSX.Element {
  const allArticles = getAllArticles();
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = allArticles.slice(0, ARTICLES_PER_PAGE);

  return (
    <ArticleGrid
      articles={paginatedArticles}
      fullHeight
      currentPage={1}
      totalPages={totalPages}
      basePath="/articles/page"
    />
  );
}
