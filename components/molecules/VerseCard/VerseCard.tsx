import { Card } from '@/components/atoms/Card';
import styles from './VerseCard.module.css';

export interface VerseData {
  readonly verse: string;
  readonly transliteration?: string;
  readonly hindi?: string;
  readonly english?: string;
}

export interface VerseCardProps {
  readonly verse: VerseData;
  readonly number: number;
}

export function VerseCard({ verse, number }: VerseCardProps): JSX.Element {
  return (
    <Card title={`${number}`} className={styles.verseCard}>
      <div className={styles.verse}>{verse.verse}</div>
      {verse.transliteration && (
        <div className={styles.transliteration}>{verse.transliteration}</div>
      )}
      {verse.hindi && <div className={styles.hindi}>{verse.hindi}</div>}
      {verse.english && <div className={styles.english}>{verse.english}</div>}
    </Card>
  );
}
