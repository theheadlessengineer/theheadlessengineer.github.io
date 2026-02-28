import type { Metadata } from 'next';
import { Button } from '@/components/atoms/Button';
import { siteConfig } from '@/config/site';
import { notFoundConfig } from '@/config/notfound';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: `404 - Page Not Found | ${siteConfig.logo}`,
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main>
      <section className={styles.hero} aria-labelledby="error-title">
        <div className={styles.container}>
          <h1 id="error-title" className={styles.title}>
            {notFoundConfig.title}
          </h1>
          <p className={styles.tagline}>{notFoundConfig.tagline}</p>
          <p className={styles.description}>{notFoundConfig.description}</p>
          <div className={styles.actions}>
            {notFoundConfig.buttons.map(button => (
              <Button key={button.label} variant={button.variant} href={button.href}>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
