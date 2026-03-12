import { z } from 'zod';

export const testimonialFrontmatterSchema = z
  .object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    excerpt: z.string(),
    author: z.string().min(1),
    role: z.string().min(1),
    company: z.string().min(1),
    publishedAt: z.union([
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      z.date().transform(d => d.toISOString().split('T')[0]),
    ]),
    published: z.boolean().optional().default(true),
  })
  .passthrough();

export const testimonialSchema = testimonialFrontmatterSchema.extend({
  content: z.string().min(100),
});

export type TestimonialFrontmatter = z.infer<typeof testimonialFrontmatterSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
