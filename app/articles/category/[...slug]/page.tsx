import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { PostCard } from '@/components/molecules/PostCard';
import { BackLink } from '@/components/atoms/BackLink';
import { getArticlesByCategory } from '@/lib/articles';
import { articlesConfig } from '@/config/articles';
import { siteConfig } from '@/config/site';

interface CategoryPageProps {
  params: { slug: string[] };
}

export async function generateStaticParams() {
  const categories = Object.keys(articlesConfig.categories);
  const params = [];

  for (const category of categories) {
    const articles = getArticlesByCategory(category);
    const totalPages = Math.ceil(articles.length / articlesConfig.itemsPerPage);

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
  const totalPages = Math.ceil(allArticles.length / articlesConfig.itemsPerPage);

  const startIndex = (currentPage - 1) * articlesConfig.itemsPerPage;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + articlesConfig.itemsPerPage);

  return (
    <CategoryGrid
      items={paginatedArticles}
      renderItem={article => <PostCard key={article.slug} {...article} />}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/articles/category/${category}`}
      backLink={<BackLink href="/articles" text={articlesConfig.backLink.text} />}
    />
  );
}
