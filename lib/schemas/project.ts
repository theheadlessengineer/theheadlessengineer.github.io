import { z } from 'zod';

export const projectSeoSchema = z.object({
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  keywords: z.array(z.string()).min(1).max(10),
  canonicalUrl: z.string().startsWith('/').or(z.string().url()),
  ogImage: z.string().startsWith('/').or(z.string().url()),
});

export const projectFrontmatterSchema = z
  .object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string(),
    excerpt: z.string(),
    category: z.string().min(1),
    status: z.enum(['active', 'beta', 'stable', 'archived']),
    license: z.string().min(1),
    lastCommit: z.string().min(1),
    tags: z.array(z.string()).min(1).max(10),
    stats: z
      .object({
        stars: z.number().int().nonnegative().optional(),
        forks: z.number().int().nonnegative().optional(),
        contributors: z.number().int().positive().optional(),
        version: z.string().optional(),
        buildStatus: z.enum(['passing', 'failing', 'unknown']).optional(),
        coverage: z.number().int().min(0).max(100).optional(),
      })
      .optional(),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        docs: z.string().url().optional(),
        npm: z.string().url().optional(),
        crates: z.string().url().optional(),
      })
      .optional(),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
    seo: projectSeoSchema,
  })
  .passthrough();

export const projectSchema = projectFrontmatterSchema.extend({
  content: z.string().min(100),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type ProjectSeo = z.infer<typeof projectSeoSchema>;
export type Project = z.infer<typeof projectSchema>;
