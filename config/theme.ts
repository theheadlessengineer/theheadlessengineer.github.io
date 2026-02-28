/**
 * Theme Configuration - SINGLE SOURCE OF TRUTH
 *
 * To change colors:
 * 1. Update values here
 * 2. Update matching values in app/globals.css (lines 7-9 and 28-30)
 * 3. Restart dev server
 *
 * Why two places?
 * - This file: Used by JS/TSX (manifest, OG images, Mermaid)
 * - globals.css: Used by CSS Modules (all components)
 * - CSS can't import from TS, so values must be synced manually
 */

export const theme = {
  dark: {
    background: '#0e0f0e', // near-black with micro green tint — screen depth
    foreground: '#d9e8d9', // phosphor green-white — classic CRT
    accent: '#50C878', // brand green — untouched ✓
    muted: '#4d6b4d', // dimmed green — inactive terminal output
    tertiary: '#1a201a', // panel bg — green-tinted dark
  },
  light: {
    background: '#edf2ed', // cool green-grey paper (not warm cream)
    foreground: '#151f15', // deep green-black
    accent: '#2ea854', // brand green, slightly deeper for light contrast
    muted: '#6b856b', // mid green-grey
    tertiary: '#d4e0d4', // cool green-tinted panel
  },
} as const;

export type Theme = typeof theme;
