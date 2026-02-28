import Link from 'next/link';
import styles from './Pagination.module.css';

export interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isArticlesPage = basePath === '/articles/page';
  const isCategoryPage = basePath.startsWith('/articles/category/');

  const getPageHref = (page: number) => {
    if (isArticlesPage) {
      return page === 1 ? '/articles' : `${basePath}/${page}`;
    }
    if (isCategoryPage) {
      return page === 1 ? basePath : `${basePath}/${page}`;
    }
    return `${basePath}?page=${page}`;
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {currentPage > 1 && (
        <Link href={getPageHref(currentPage - 1)} className={styles.link}>
          &lt; prev
        </Link>
      )}

      <div className={styles.pages}>
        {pages.map(page =>
          page === currentPage ? (
            <span key={page} className={styles.current} aria-current="page">
              [{page}]
            </span>
          ) : (
            <Link key={page} href={getPageHref(page)} className={styles.link}>
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages && (
        <Link href={getPageHref(currentPage + 1)} className={styles.link}>
          next &gt;
        </Link>
      )}
    </nav>
  );
}
