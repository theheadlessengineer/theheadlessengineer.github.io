import { CardGrid } from '@/components/molecules/CardGrid';
import { Pagination } from '@/components/atoms/Pagination';
import styles from './CategoryGrid.module.css';

export interface CategoryGridProps<T> {
  readonly items: readonly T[];
  readonly renderItem: (item: T) => React.ReactNode;
  readonly fullHeight?: boolean;
  readonly currentPage?: number;
  readonly totalPages?: number;
  readonly basePath?: string;
  readonly backLink?: React.ReactNode;
}

export function CategoryGrid<T>({
  items,
  renderItem,
  fullHeight = false,
  currentPage,
  totalPages,
  basePath,
  backLink,
}: CategoryGridProps<T>): JSX.Element {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={items.length}>{items.map(renderItem)}</CardGrid>
        {currentPage && totalPages && basePath && (
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        )}
        {backLink && <div className={styles.backLink}>{backLink}</div>}
      </div>
    </section>
  );
}
