'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isInverted: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isInverted, setIsInverted] = useState(true); // Default to dark theme

  useEffect(() => {
    const saved = localStorage.getItem('theme-inverted');
    if (saved) {
      setIsInverted(JSON.parse(saved));
    } else {
      // Default to dark theme if no saved preference
      setIsInverted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-inverted', JSON.stringify(isInverted));
    
    if (isInverted) {
      document.documentElement.classList.add('invert');
    } else {
      document.documentElement.classList.remove('invert');
    }
  }, [isInverted]);

  const toggleTheme = () => {
    setIsInverted(!isInverted);
  };

  return (
    <ThemeContext.Provider value={{ isInverted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
