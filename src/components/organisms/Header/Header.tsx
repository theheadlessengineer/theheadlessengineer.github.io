'use client';

import React, { useEffect, useRef } from 'react';
import { Logo, ThemeToggle } from '@/components/atoms';
import { BurgerMenu } from '@/components/organisms';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = 0;

    const handleScroll = (event: Event) => {
      // Don't hide header if burger menu is open
      const menuOpen = document.body.style.overflow === 'hidden';
      if (menuOpen) return;

      const target = event.target as EventTarget | null;
      let currentScrollY = 0;

      if (!target || target === window || target === document || target === document.documentElement || target === document.body) {
        currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      } else if (target && 'scrollTop' in target) {
        currentScrollY = (target as Element).scrollTop;
      }

      if (currentScrollY > 50) {
        header.style.backdropFilter = 'blur(10px)';
        header.style.borderBottom = 'none';
        header.style.boxShadow = 'var(--shadow-lg)';
      } else {
        header.style.backdropFilter = 'none';
        header.style.borderBottom = 'none';
        header.style.boxShadow = 'none';
      }

      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        header.style.transform = 'translateY(-100%)';
      } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        header.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    };

    const scrollableElements = [
      window,
      document,
      document.body,
      document.documentElement,
      document.querySelector('main'),
      document.querySelector('.main-content'),
      document.querySelector('[class*="wrapper"]'),
      document.querySelector('.app-layout')
    ].filter(Boolean);

    scrollableElements.forEach(element => {
      element?.addEventListener('scroll', handleScroll, { passive: true });
    });

    return () => {
      scrollableElements.forEach(element => {
        element?.removeEventListener('scroll', handleScroll);
      });
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.actions}>
          <ThemeToggle />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};
