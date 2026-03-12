import { TestimonialCard, TestimonialCardProps } from '@/components/molecules/TestimonialCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import { Pagination } from '@/components/atoms/Pagination';
import styles from './TestimonialGrid.module.css';

export interface TestimonialGridProps {
  readonly testimonials: readonly TestimonialCardProps[];
  readonly fullHeight?: boolean;
  readonly currentPage?: number;
  readonly totalPages?: number;
  readonly basePath?: string;
  readonly backLink?: React.ReactNode;
}

export function TestimonialGrid({
  testimonials,
  fullHeight = false,
  currentPage,
  totalPages,
  basePath,
  backLink,
}: TestimonialGridProps): JSX.Element {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={testimonials.length}>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.slug} {...testimonial} />
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
