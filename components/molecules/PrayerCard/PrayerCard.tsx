import { Card } from '@/components/atoms/Card';
import styles from './PrayerCard.module.css';

export interface PrayerCardProps {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly category?: string;
}

export function PrayerCard({ title, slug, description, category }: PrayerCardProps): JSX.Element {
  return (
    <Card href={`/prayers/${slug}`} title={category || 'Prayer'}>
      <div className={styles.value}>$ {title}</div>
      <div className={styles.description}>&gt; {description}</div>
    </Card>
  );
}
