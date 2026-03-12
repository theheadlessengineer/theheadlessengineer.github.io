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

  // Check if it's a main listing page, category page, or tag page
  const isMainPage = basePath === '/articles/page' || basePath === '/projects/page';
  const isCategoryPage =
    basePath.startsWith('/articles/category/') || basePath.startsWith('/projects/category/');
  const isTagPage = basePath.startsWith('/articles/tag/') || basePath.startsWith('/projects/tag/');

  const getPageHref = (page: number) => {
    if (isMainPage) {
      // For main pages: /articles or /projects for page 1, /articles/page/2 or /projects/page/2 for others
      const mainPath = basePath.replace('/page', '');
      return page === 1 ? mainPath : `${basePath}/${page}`;
    }
    if (isCategoryPage || isTagPage) {
      // For category/tag pages: /articles/category/slug or /projects/tag/slug for page 1
      return page === 1 ? basePath : `${basePath}/${page}`;
    }
    return `${basePath}/${page}`;
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
