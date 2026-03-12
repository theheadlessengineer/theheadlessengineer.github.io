import { Card } from '@/components/atoms/Card';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  readonly title: string;
  readonly excerpt: string;
  readonly slug: string;
  readonly category: string;
  readonly status: 'active' | 'beta' | 'stable' | 'archived';
  readonly license: string;
  readonly lastCommit: string;
  readonly tags: readonly string[];
  readonly stats?: {
    readonly stars?: number;
  };
  readonly featured?: boolean;
}

export function ProjectCard({
  title,
  excerpt,
  slug,
  category,
  status,
  license,
  lastCommit,
  tags,
  stats,
  featured,
}: ProjectCardProps): JSX.Element {
  return (
    <Card
      href={`/projects/${slug}`}
      title={featured ? `FEATURED · ${category}` : category}
      className={featured ? styles.featured : ''}
    >
      <div className={styles.header}>
        <span className={styles.name}>{title}</span>
        <span className={`${styles.status} ${styles[status]}`}>
          {status === 'active' && '● Active'}
          {status === 'beta' && '◐ Beta'}
          {status === 'stable' && '● Stable'}
          {status === 'archived' && '○ Archived'}
        </span>
      </div>
      <p className={styles.excerpt}>{excerpt}</p>
      <div className={styles.tags}>
        {tags.slice(0, 4).map(tag => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className={styles.meta}>
        {stats?.stars !== undefined && (
          <>
            <span className={styles.stars}>★ {stats.stars.toLocaleString()}</span>
            <span className={styles.separator}>·</span>
          </>
        )}
        <span>{license}</span>
        <span className={styles.separator}>·</span>
        <span>{lastCommit}</span>
      </div>
    </Card>
  );
}
