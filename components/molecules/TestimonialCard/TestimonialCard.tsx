import { Card } from '@/components/atoms/Card';
import styles from './TestimonialCard.module.css';

export interface TestimonialCardProps {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly publishedAt: string;
}

export function TestimonialCard({
  slug,
  title,
  excerpt,
  author,
  role,
  company,
  publishedAt,
}: TestimonialCardProps): JSX.Element {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card title="Testimonial">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.excerpt}>{excerpt}</p>
      <div className={styles.author}>
        <span className={styles.authorName}>{author}</span>
        <span className={styles.authorRole}>{role}</span>
        <span className={styles.authorCompany}>{company}</span>
      </div>
      <div className={styles.meta}>
        <span className={styles.date}>{formattedDate}</span>
      </div>
    </Card>
  );
}
