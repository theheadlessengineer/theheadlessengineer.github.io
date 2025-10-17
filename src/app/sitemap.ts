export const dynamic = 'force-static';

import { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.defaultMeta.siteUrl;
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Add dynamic routes for articles/blog posts here
    // Example:
    // ...articles.map((article) => ({
    //   url: `${baseUrl}/articles/${article.slug}`,
    //   lastModified: new Date(article.updatedAt),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // })),
  ];
}
