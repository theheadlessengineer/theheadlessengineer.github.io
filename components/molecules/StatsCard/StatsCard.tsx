import { Card } from '@/components/atoms/Card';
import styles from './StatsCard.module.css';

export interface StatItem {
  readonly key: string;
  readonly value: string | number;
  readonly accent?: boolean;
}

export interface StatsCardProps {
  readonly title: string;
  readonly stats: readonly StatItem[];
}

export function StatsCard({ title, stats }: StatsCardProps): JSX.Element {
  return (
    <Card title={title} className={styles.card}>
      {stats.map(stat => (
        <div key={stat.key} className={styles.stat}>
          <span className={styles.statKey}>{stat.key}</span>
          <span className={`${styles.statVal} ${stat.accent ? styles.accent : ''}`}>
            {stat.value}
          </span>
        </div>
      ))}
    </Card>
  );
}
