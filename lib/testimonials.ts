import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  testimonialFrontmatterSchema,
  type Testimonial,
  type TestimonialFrontmatter,
} from './schemas/testimonial';

export type { Testimonial, TestimonialFrontmatter };

const testimonialsDirectory = path.join(process.cwd(), 'content/testimonials');

export function getAllTestimonials(): readonly Testimonial[] {
  const testimonials: Testimonial[] = [];

  function readTestimonialsRecursively(dir: string) {
    const entries = fs.readdirSync(dir);

    entries.forEach(entry => {
      const fullPath = path.join(dir, entry);

      try {
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          readTestimonialsRecursively(fullPath);
        } else if (entry.endsWith('.md') && !entry.endsWith('.backup')) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          try {
            const validatedData = testimonialFrontmatterSchema.parse(data);
            const testimonial = {
              ...validatedData,
              content,
            };

            if (testimonial.published !== false) {
              testimonials.push(testimonial);
            }
          } catch (error) {
            console.error(`\n❌ Validation error in ${fullPath}:`);
            if (error && typeof error === 'object' && 'issues' in error) {
              (error.issues as Array<{ path: (string | number)[]; message: string }>).forEach(
                issue => {
                  console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
                }
              );
            } else {
              console.error(error);
            }
            throw new Error(`Invalid testimonial frontmatter in ${entry}`);
          }
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
        throw error;
      }
    });
  }

  readTestimonialsRecursively(testimonialsDirectory);

  return testimonials.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getTestimonialBySlug(slug: string): Testimonial | null {
  const testimonials = getAllTestimonials();
  return testimonials.find(testimonial => testimonial.slug === slug) || null;
}
