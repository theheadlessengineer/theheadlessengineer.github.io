import { Metadata } from 'next';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { PostCard } from '@/components/molecules/PostCard';
import { getAllArticles } from '@/lib/articles';
import { articlesConfig } from '@/config/articles';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `${articlesConfig.hero.title} | ${siteConfig.logo}`,
  description: articlesConfig.hero.description,
};

export default function ArticlesPage(): JSX.Element {
  const allArticles = getAllArticles();
  const totalPages = Math.ceil(allArticles.length / articlesConfig.itemsPerPage);
  const paginatedArticles = allArticles.slice(0, articlesConfig.itemsPerPage);

  return (
    <CategoryGrid
      items={paginatedArticles}
      renderItem={article => <PostCard key={article.slug} {...article} />}
      fullHeight
      currentPage={1}
      totalPages={totalPages}
      basePath="/articles/page"
    />
  );
}
