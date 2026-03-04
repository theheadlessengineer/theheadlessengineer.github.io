import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPrayerBySlug, getAllPrayers } from '@/lib/prayers';
import { siteConfig } from '@/config/site';
import { Card } from '@/components/atoms/Card';
import { BackLink } from '@/components/atoms/BackLink';
import styles from './prayer.module.css';

interface PrayerPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const prayers = getAllPrayers();
  return prayers.map(prayer => ({ slug: prayer.slug }));
}

export async function generateMetadata({ params }: PrayerPageProps): Promise<Metadata> {
  const prayer = getPrayerBySlug(params.slug);

  if (!prayer) return {};

  return {
    title: `${prayer.title} | ${siteConfig.logo}`,
    description: `Read ${prayer.title} - Sacred prayer and hymn`,
  };
}

export default function PrayerPage({ params }: PrayerPageProps): JSX.Element {
  const prayer = getPrayerBySlug(params.slug);

  if (!prayer) notFound();

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{prayer.title}</h1>
      </header>

      <div className={styles.verses}>
        {prayer.verses.map((verse, index) => (
          <Card key={index} className={styles.verseCard} title={`${index + 1}`}>
            <div className={styles.verse}>{verse.verse}</div>
            {verse.transliteration && (
              <div className={styles.transliteration}>{verse.transliteration}</div>
            )}
            {verse.hindi && <div className={styles.hindi}>{verse.hindi}</div>}
            {verse.english && <div className={styles.english}>{verse.english}</div>}
          </Card>
        ))}
      </div>

      <BackLink href="/prayers" text="Back to Prayers" />
    </article>
  );
}
