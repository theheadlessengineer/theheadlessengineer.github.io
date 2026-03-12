import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllArticles } from '@/lib/articles';
import { siteConfig } from '@/config/site';
import { articlesConfig } from '@/config/articles';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { PostCard } from '@/components/molecules/PostCard';
import { BackLink } from '@/components/atoms/BackLink';

interface TagPageProps {
  params: { slug: string[] };
}

function getArticlesByTag(tag: string) {
  const articles = getAllArticles();
  return articles.filter(article => article.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  const tags = new Set<string>();

  articles.forEach(article => {
    article.tags.forEach(tag => tags.add(tag));
  });

  const params = [];

  for (const tag of Array.from(tags)) {
    const tagArticles = getArticlesByTag(tag);
    const totalPages = Math.ceil(tagArticles.length / articlesConfig.itemsPerPage);

    // Use lowercase for URL slugs
    const tagSlug = tag.toLowerCase();
    params.push({ slug: [tagSlug] });
    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [tagSlug, page.toString()] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.slug[0]);

  return {
    title: `Articles tagged with "${tag}" | ${siteConfig.logo}`,
    description: `Browse all articles tagged with ${tag}`,
  };
}

export default async function ArticleTagPage({ params }: TagPageProps): Promise<JSX.Element> {
  const tagSlug = params.slug[0].toLowerCase();
  const currentPage = params.slug[1] ? Number(params.slug[1]) : 1;

  // Find articles with this tag (case-insensitive)
  const allArticles = getAllArticles();
  const matchingArticles = allArticles.filter(article =>
    article.tags.some(t => t.toLowerCase() === tagSlug)
  );

  if (matchingArticles.length === 0) notFound();

  const totalPages = Math.ceil(matchingArticles.length / articlesConfig.itemsPerPage);

  if (currentPage < 1 || currentPage > totalPages) notFound();

  const startIndex = (currentPage - 1) * articlesConfig.itemsPerPage;
  const paginatedArticles = matchingArticles.slice(
    startIndex,
    startIndex + articlesConfig.itemsPerPage
  );

  return (
    <CategoryGrid
      items={paginatedArticles}
      renderItem={article => <PostCard key={article.slug} {...article} />}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/articles/tag/${tagSlug}`}
      backLink={<BackLink href="/articles" text={articlesConfig.backLink.text} />}
    />
  );
}
