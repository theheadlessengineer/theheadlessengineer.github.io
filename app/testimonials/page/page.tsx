import { TestimonialGrid } from '@/components/organisms/TestimonialGrid';
import { getAllTestimonials } from '@/lib/testimonials';
import { testimonialsConfig } from '@/config/testimonials';

export default function TestimonialsPage(): JSX.Element {
  const testimonials = getAllTestimonials();
  const totalPages = Math.ceil(testimonials.length / testimonialsConfig.itemsPerPage);
  const paginatedTestimonials = testimonials.slice(0, testimonialsConfig.itemsPerPage);

  return (
    <TestimonialGrid
      testimonials={paginatedTestimonials}
      fullHeight
      currentPage={1}
      totalPages={totalPages}
      basePath="/testimonials/page"
    />
  );
}
