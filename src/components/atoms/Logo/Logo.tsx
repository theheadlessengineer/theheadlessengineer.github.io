import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const logoText = siteConfig.title.toLowerCase().replace(/\s+/g, '');

  return (
    <Link href="/" className={`${styles.logo} ${className}`}>
      {logoText}
    </Link>
  );
};
