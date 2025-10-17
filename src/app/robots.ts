export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = seoConfig.defaultMeta.siteUrl;
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
