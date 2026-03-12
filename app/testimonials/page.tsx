import { Metadata } from 'next';
import { getAllTestimonials } from '@/lib/testimonials';
import { siteConfig } from '@/config/site';
import { testimonialsConfig } from '@/config/testimonials';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { TestimonialCard } from '@/components/molecules/TestimonialCard';

export const metadata: Metadata = {
  title: `${testimonialsConfig.hero.title} | ${siteConfig.logo}`,
  description: testimonialsConfig.hero.description,
};

export default function TestimonialsPage(): JSX.Element {
  const testimonials = getAllTestimonials();
  const totalPages = Math.ceil(testimonials.length / testimonialsConfig.itemsPerPage);
  const paginatedTestimonials = testimonials.slice(0, testimonialsConfig.itemsPerPage);

  return (
    <CategoryGrid
      items={paginatedTestimonials}
      renderItem={testimonial => <TestimonialCard key={testimonial.slug} {...testimonial} />}
      fullHeight
      currentPage={1}
      totalPages={totalPages}
      basePath="/testimonials/page"
    />
  );
}
