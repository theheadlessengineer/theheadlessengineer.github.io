'use client';

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { theme } from '@/config/theme';

export function MermaidRenderer() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const updateTheme = () => {
      const themeValue =
        document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
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

    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme === 'light' ? 'default' : 'dark',
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

    // Find all mermaid code blocks and render them
    const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
    mermaidBlocks.forEach((block, index) => {
      const code = block.textContent || '';
      const pre = block.parentElement;

      if (pre) {
        // Create a div to hold the rendered diagram
        const div = document.createElement('div');
        div.className = 'mermaid';
        div.textContent = code;

        // Replace the pre element with the div
        pre.replaceWith(div);
      }
    });

    // Run mermaid on all .mermaid divs
    mermaid.run();
  }, []);

  return null;
}
