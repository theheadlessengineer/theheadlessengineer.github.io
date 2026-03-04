import { theme, themeConfig } from '@/config/theme';

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const theme = ${JSON.stringify(theme)};
            const config = ${JSON.stringify(themeConfig)};
            const saved = localStorage.getItem('theme') || config.activeDark;
            const colors = theme[saved];
            const root = document.documentElement;
            
            root.setAttribute('data-theme', saved);
            root.style.setProperty('--color-background', colors.background);
            root.style.setProperty('--color-foreground', colors.foreground);
            root.style.setProperty('--color-accent', colors.accent);
            root.style.setProperty('--color-muted', colors.muted);
            root.style.setProperty('--color-tertiary', colors.tertiary);
          })();
        `,
      }}
    />
  );
}
