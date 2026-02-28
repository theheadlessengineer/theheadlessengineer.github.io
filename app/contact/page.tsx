import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { contactConfig } from '@/config/contact';
import { ProfileCard } from '@/components/molecules/ProfileCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: contactConfig.metadata.description,
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: contactConfig.metadata.description,
    url: `${siteConfig.url}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `Contact ${siteConfig.name}`,
    description: contactConfig.metadata.description,
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.greeting}>
          <h1 className={styles.title}>{contactConfig.title}</h1>
          <p className={styles.subtitle}>{contactConfig.subtitle}</p>
        </section>

        <div className={styles.methodsWrapper}>
          <CardGrid count={contactConfig.methods.length}>
            {contactConfig.methods.map(method => (
              <ProfileCard key={method.title} {...method} target='_blank'/>
            ))}
          </CardGrid>
        </div>
      </div>
    </main>
  );
}
