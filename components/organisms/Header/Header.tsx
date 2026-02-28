import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { siteConfig } from '@/config/site';
import styles from './Header.module.css';

/**
 * Site-wide header component
 * Displays logo with pipe decorations and navigation links
 * Responsive: Desktop shows horizontal layout, mobile stacks nav below logo
 */
export function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.pipes} aria-hidden="true" />
        <Logo />
        <div className={styles.pipes} aria-hidden="true" />
        <nav className={styles.nav} aria-label="Main navigation">
          {siteConfig.navigation.map((item, index) => (
            <React.Fragment key={item.href}>
              <Link href={item.href}>{item.label}</Link>
              {index < siteConfig.navigation.length - 1 && (
                <div className={`${styles.pipes} ${styles.small}`} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className={`${styles.pipes} ${styles.endPipes}`} aria-hidden="true" />
      </div>
    </header>
  );
}
