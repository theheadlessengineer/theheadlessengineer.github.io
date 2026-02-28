'use client';

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { CodeCopyButton } from '@/components/atoms/CodeCopyButton';

interface ArticleContentProps {
  html: string;
  className?: string;
}

export function ArticleContent({ html, className }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const initContent = async () => {
      // Handle mermaid diagrams first
      const mermaidBlocks = contentRef.current!.querySelectorAll('pre code.language-mermaid');

      if (mermaidBlocks.length > 0) {
        const mermaid = (await import('mermaid')).default;
        const { theme } = await import('@/config/theme');

        const currentTheme =
          document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
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

        // Store original code before transformation
        const mermaidData: Array<{ div: HTMLDivElement; code: string }> = [];

        mermaidBlocks.forEach(block => {
          const code = block.textContent || '';
          const pre = block.parentElement;

          if (pre) {
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = code;
            pre.replaceWith(div);
            mermaidData.push({ div, code });
          }
        });

        await mermaid.run();

        // Add copy buttons after mermaid renders
        mermaidData.forEach(({ div, code }) => {
          div.style.position = 'relative';
          const buttonContainer = document.createElement('div');
          buttonContainer.setAttribute('data-copy-button', 'true');
          div.appendChild(buttonContainer);
          const root = createRoot(buttonContainer);
          root.render(<CodeCopyButton code={code} />);
        });
      }

      // Add copy buttons to remaining code blocks
      const codeBlocks = contentRef.current!.querySelectorAll('pre > code');

      codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        if (!pre || pre.querySelector('[data-copy-button]')) return;

        pre.style.position = 'relative';

        const code = codeBlock.textContent || '';
        const buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('data-copy-button', 'true');
        pre.appendChild(buttonContainer);

        const root = createRoot(buttonContainer);
        root.render(<CodeCopyButton code={code} />);
      });
    };

    initContent();
  }, [html]);

  return <div ref={contentRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
