'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Logo, ThemeToggle } from '@/components/atoms';
import { BurgerMenu } from '@/components/organisms';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollDirectionRef = useRef<'up' | 'down'>('up');

  useEffect(() => {
    // Create sentinel elements to detect scroll position and direction
    const topSentinel = document.createElement('div');
    const scrollSentinel = document.createElement('div');
    
    topSentinel.style.position = 'absolute';
    topSentinel.style.top = '0px';
    topSentinel.style.height = '50px';
    topSentinel.style.width = '1px';
    topSentinel.style.pointerEvents = 'none';
    
    scrollSentinel.style.position = 'absolute';
    scrollSentinel.style.top = '100px';
    scrollSentinel.style.height = '1px';
    scrollSentinel.style.width = '1px';
    scrollSentinel.style.pointerEvents = 'none';
    
    document.body.appendChild(topSentinel);
    document.body.appendChild(scrollSentinel);

    const topObserver = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0 }
    );

    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.y < entry.rootBounds!.y) {
          // Scrolling down
          if (scrollDirectionRef.current !== 'down') {
            scrollDirectionRef.current = 'down';
            setIsVisible(false);
            console.log('HIDING header (intersection)');
          }
        } else {
          // Scrolling up
          if (scrollDirectionRef.current !== 'up') {
            scrollDirectionRef.current = 'up';
            setIsVisible(true);
            console.log('SHOWING header (intersection)');
          }
        }
      },
      { threshold: 0 }
    );

    topObserver.observe(topSentinel);
    scrollObserver.observe(scrollSentinel);

    return () => {
      topObserver.disconnect();
      scrollObserver.disconnect();
      document.body.removeChild(topSentinel);
      document.body.removeChild(scrollSentinel);
    };
  }, []);

  console.log('Header render - isVisible:', isVisible);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.transparent} ${!isVisible ? styles.hidden : ''}`}>
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
