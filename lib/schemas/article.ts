import { z } from 'zod';

export const articleSeoSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  keywords: z.array(z.string()).min(1).max(10),
  canonicalUrl: z.string().startsWith('/').or(z.string().url()),
  ogImage: z.string().startsWith('/').or(z.string().url()),
});

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string(),
  excerpt: z.string(),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  tags: z.array(z.string()).min(1).max(10),
  author: z.string().min(2),
  readingTime: z.number().int().positive(),
  published: z.boolean().optional().default(true),
  seo: articleSeoSchema,
}).passthrough();

export const articleSchema = articleFrontmatterSchema.extend({
  content: z.string().min(100),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type ArticleSeo = z.infer<typeof articleSeoSchema>;
export type Article = z.infer<typeof articleSchema>;
