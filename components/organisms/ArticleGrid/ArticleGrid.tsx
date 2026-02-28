import { PostCard, PostCardProps } from '@/components/molecules/PostCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import { Pagination } from '@/components/atoms/Pagination';
import styles from './ArticleGrid.module.css';

export interface ArticleGridProps {
  readonly articles: readonly PostCardProps[];
  readonly fullHeight?: boolean;
  readonly currentPage?: number;
  readonly totalPages?: number;
  readonly basePath?: string;
  readonly backLink?: React.ReactNode;
}

export function ArticleGrid({
  articles,
  fullHeight = false,
  currentPage,
  totalPages,
  basePath,
  backLink,
}: ArticleGridProps): JSX.Element {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={articles.length}>
          {articles.map(article => (
            <PostCard key={article.slug} {...article} />
          ))}
        </CardGrid>
        {currentPage && totalPages && basePath && (
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        )}
        {backLink && <div className={styles.backLink}>{backLink}</div>}
      </div>
    </section>
  );
}
