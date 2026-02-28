import { MetadataRoute } from 'next';
import { theme } from '@/config/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karan Popat - Full-Stack Developer',
    short_name: 'popatkaran',
    description: 'Full-stack developer specializing in modern web technologies',
    start_url: '/',
    display: 'standalone',
    background_color: theme.dark.background,
    theme_color: theme.dark.accent,
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
