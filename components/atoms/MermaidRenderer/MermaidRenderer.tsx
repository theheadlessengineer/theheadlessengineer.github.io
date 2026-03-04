'use client';

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { theme, type ThemeName } from '@/config/theme';

export function MermaidRenderer() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('dark');

  useEffect(() => {
    const updateTheme = () => {
      const themeValue = document.documentElement.getAttribute('data-theme') as ThemeName || 'dark';
      setCurrentTheme(themeValue);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const colors = theme[currentTheme];
    const isLight = currentTheme.includes('light');

    mermaid.initialize({
      startOnLoad: false,
      theme: isLight ? 'default' : 'dark',
      themeVariables: {
        primaryColor: colors.accent,
        primaryTextColor: colors.foreground,
        primaryBorderColor: colors.accent,
        lineColor: colors.accent,
        secondaryColor: colors.background,
        tertiaryColor: colors.tertiary,
        background: colors.background,
        mainBkg: colors.background,
        textColor: colors.foreground,
        fontSize: '14px',
        fontFamily: 'monospace',
      },
    });

    const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
    mermaidBlocks.forEach((block) => {
      const code = block.textContent || '';
      const pre = block.parentElement;

      if (pre) {
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code;
        pre.replaceWith(div);
      }
    });

    mermaid.run();
  }, [currentTheme]);

  return null;
}
