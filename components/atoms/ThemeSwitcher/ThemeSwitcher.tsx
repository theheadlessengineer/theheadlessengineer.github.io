'use client';

import { useEffect, useState } from 'react';
import { theme, themeConfig, type ThemeName } from '@/config/theme';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(themeConfig.activeDark);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as ThemeName | null;
    const initial = saved || themeConfig.activeDark;
    setCurrentTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const isLight = currentTheme === themeConfig.activeLight;
    const next = isLight ? themeConfig.activeDark : themeConfig.activeLight;
    setCurrentTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  const isLight = currentTheme === themeConfig.activeLight;

  return (
    <button onClick={toggle} className={styles.switcher} aria-label="Switch theme">
      {isLight ? '[ ☾ ]' : '[ ☀ ]'}
    </button>
  );
}

function applyTheme(themeName: ThemeName) {
  const colors = theme[themeName];
  const root = document.documentElement;
  
  root.setAttribute('data-theme', themeName);
  root.style.setProperty('--color-background', colors.background);
  root.style.setProperty('--color-foreground', colors.foreground);
  root.style.setProperty('--color-accent', colors.accent);
  root.style.setProperty('--color-muted', colors.muted);
  root.style.setProperty('--color-tertiary', colors.tertiary);
}
