import styles from './MetaInfo.module.css';

export interface MetaInfoProps {
  readonly items: readonly string[];
  readonly separator?: string;
}

export function MetaInfo({ items, separator = '•' }: MetaInfoProps): JSX.Element {
  return (
    <div className={styles.meta}>
      {items.map((item, index) => (
        <span key={index}>
          <span className={styles.item}>{item}</span>
          {index < items.length - 1 && <span className={styles.separator}>{separator}</span>}
        </span>
      ))}
    </div>
  );
}
