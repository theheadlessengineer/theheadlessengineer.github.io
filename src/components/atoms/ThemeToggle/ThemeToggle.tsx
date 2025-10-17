'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Icon } from '@/components/atoms/Icon';

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isInverted, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      style={{ background: 'none', border: 'none', padding: 0 }}
      aria-label={isInverted ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Icon
        name={isInverted ? 'sun' : 'moon'}
        variant="circle"
        size="medium"
      />
    </button>
  );
};
