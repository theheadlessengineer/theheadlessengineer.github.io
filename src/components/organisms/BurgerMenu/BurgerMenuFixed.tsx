'use client';

import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link';
import { Icon } from '@/components/atoms';
import { navigationConfig } from '@/config/content';
import styles from './BurgerMenuFixed.module.css';

export const BurgerMenuFixed: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 980);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Disable/enable scroll when menu opens/closes
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className={styles.burgerButton}>
        <Icon name="bars" size="medium" className={styles.burgerIcon} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.burgerButton}>
        <Menu
          right
          isOpen={isOpen}
          onStateChange={handleStateChange}
          customBurgerIcon={<Icon name="bars" size="medium" />}
          customCrossIcon={<Icon name="times" size="medium" />}
          className={styles.menu}
          menuClassName={styles.menuContent}
          morphShapeClassName={styles.morphShape}
          itemListClassName={styles.itemList}
          overlayClassName={styles.overlay}
          width={isMobile ? '100vw' : '50vw'}
        >
          <nav className={styles.navigation}>
            {navigationConfig.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.menuItem}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Menu>
      </div>
    </>
  );
};
