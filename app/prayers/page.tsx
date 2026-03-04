import { Metadata } from 'next';
import { PrayerCard } from '@/components/molecules/PrayerCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import { getAllPrayers } from '@/lib/prayers';
import { siteConfig } from '@/config/site';
import styles from './prayers.module.css';

export const metadata: Metadata = {
  title: `Prayers | ${siteConfig.logo}`,
  description: 'Collection of sacred prayers and hymns',
};

export default function PrayersPage(): JSX.Element {
  const prayers = getAllPrayers();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <CardGrid count={prayers.length}>
          {prayers.map(prayer => (
            <PrayerCard
              key={prayer.slug}
              title={prayer.title}
              slug={prayer.slug}
              description={prayer.description}
              category={prayer.category}
            />
          ))}
        </CardGrid>
      </div>
    </main>
  );
}
