/**
 * Theme Configuration - SINGLE SOURCE OF TRUTH
 * All theme colors are defined here and applied via CSS variables
 */

export const theme = {
  dark: {
    background: '#0e0f0e',
    foreground: '#d9e8d9',
    accent: '#50C878',
    muted: '#4d6b4d',
    tertiary: '#1a201a',
  },
  light: {
    background: '#edf2ed',
    foreground: '#151f15',
    accent: '#2ea854',
    muted: '#6b856b',
    tertiary: '#d4e0d4',
  },
  light_lux: {
    background: '#e8e8e6',
    foreground: '#2a2a2a',
    accent: '#111110',
    muted: '#9a9a96',
    tertiary: '#d4d4d1',
  },
  dark_lux: {
    background: '#161614',
    foreground: '#d6d6d2',
    accent: '#e8e8e4',
    muted: '#5a5a56',
    tertiary: '#222220',
  }
} as const;

export type ThemeName = keyof typeof theme;
export type Theme = typeof theme;

// Active theme configuration
export const themeConfig = {
  activeLight: 'light' as ThemeName,
  activeDark: 'dark' as ThemeName,
};
