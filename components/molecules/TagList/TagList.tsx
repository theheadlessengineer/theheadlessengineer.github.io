import { Tag } from '@/components/atoms/Tag';
import styles from './TagList.module.css';

export interface TagListProps {
  readonly tags: readonly string[];
  readonly basePath: string;
}

export function TagList({ tags, basePath }: TagListProps): JSX.Element {
  return (
    <div className={styles.tags}>
      {tags.map(tag => (
        <Tag key={tag} href={`${basePath}/${tag}`}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}
