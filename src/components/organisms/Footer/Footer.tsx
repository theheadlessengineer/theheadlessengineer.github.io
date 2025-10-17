import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { Icon } from '@/components/atoms/Icon';
import { navigationConfig } from '@/config/content';
import styles from './Footer.module.css';

// Mobile navigation with icons
const mobileNavigation = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about', icon: 'user' },
  { label: 'Articles', href: '/articles', icon: 'newspaper' },
  { label: 'Contact', href: '/contact', icon: 'envelope' }
];

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Desktop Footer */}
      <div className={styles.desktopFooter}>
        <div className={styles.container}>
          <nav className={styles.navigation}>
            {navigationConfig.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.link}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Logo className={styles.logo} />
        </div>
      </div>

      {/* Mobile Footer */}
      <div className={styles.mobileFooter}>
        <nav className={styles.mobileNavigation}>
          {mobileNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavItem}
            >
              <Icon name={item.icon} size="medium" />
              <span className={styles.mobileNavLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
