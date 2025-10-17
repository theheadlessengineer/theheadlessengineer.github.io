'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/atoms';
import { navigationConfig } from '@/config/content';
import styles from './BurgerMenu.module.css';

export const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button className={styles.burgerButton} onClick={toggleMenu}>
        <Icon name="bars" size="medium" />
      </button>

      {isOpen && <div className={styles.overlay} onClick={closeMenu} />}
      
      <div className={`${styles.offcanvas} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={closeMenu}>
          <Icon name="times" size="medium" />
        </button>
        
        <nav className={styles.navigation}>
          {navigationConfig.main.map((item) => (
            <div key={item.href} className={styles.menuItemWrapper}>
              <Link
                href={item.href}
                className={styles.menuItem}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};
