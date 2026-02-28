'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import styles from './Hero.module.css';

export interface HeroProps {
  title: string;
  taglines?: readonly string[];
  description: string;
  cta?: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export function Hero({ title, taglines, description, cta }: HeroProps): JSX.Element {
  const [text, setText] = useState('');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTagline = taglines?.[taglineIndex] || '';

  useEffect(() => {
    if (!taglines?.length) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (text.length < currentTagline.length) {
            setText(currentTagline.slice(0, text.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTaglineIndex(prev => (prev + 1) % taglines.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, taglineIndex, isDeleting, currentTagline, taglines]);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <h1 id="hero-title" className={styles.title}>
          {title}
        </h1>
        {taglines && (
          <p className={styles.tagline} aria-live="polite" aria-atomic="true">
            {text}
            <span className={styles.cursor} aria-hidden="true">
              |
            </span>
          </p>
        )}
        <p className={styles.description}>{description}</p>
        {cta && (
          <div className={styles.actions}>
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
            <Button variant="secondary" href={cta.secondary.href}>
              {cta.secondary.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
