import React from 'react';
import { Header, Footer } from '@/components/organisms';
import styles from './PageTemplate.module.css';

interface PageTemplateProps {
  children: React.ReactNode;
  variant?: 'default' | 'fullwidth' | 'article';
  className?: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  variant = 'default',
  className = ''
}) => {
  return (
    <div className={`${styles.template} ${styles[variant]} ${className}`}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
