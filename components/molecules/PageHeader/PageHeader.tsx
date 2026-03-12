import Link from 'next/link';
import { MetaInfo } from '@/components/molecules/MetaInfo';
import { TagList } from '@/components/molecules/TagList';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  readonly category?: {
    readonly name: string;
    readonly href: string;
  };
  readonly title: string;
  readonly excerpt?: string;
  readonly metaItems?: readonly string[];
  readonly tags?: readonly string[];
  readonly tagBasePath?: string;
}

export function PageHeader({
  category,
  title,
  excerpt,
  metaItems,
  tags,
  tagBasePath,
}: PageHeaderProps): JSX.Element {
  return (
    <header className={styles.header}>
      {category && (
        <div className={styles.category}>
          <Link href={category.href}>{category.name}</Link>
        </div>
      )}
      <h1 className={styles.title}>{title}</h1>
      {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
      {metaItems && <MetaInfo items={metaItems} />}
      {tags && tagBasePath && <TagList tags={tags} basePath={tagBasePath} />}
    </header>
  );
}
