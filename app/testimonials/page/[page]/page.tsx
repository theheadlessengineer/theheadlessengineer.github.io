import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { TestimonialCard } from '@/components/molecules/TestimonialCard';
import { getAllTestimonials } from '@/lib/testimonials';
import { testimonialsConfig } from '@/config/testimonials';

export function generateStaticParams() {
  const testimonials = getAllTestimonials();
  const totalPages = Math.ceil(testimonials.length / testimonialsConfig.itemsPerPage);
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));
}

interface TestimonialsPageProps {
  params: {
    page: string;
  };
}

export function generateMetadata({ params }: TestimonialsPageProps): Metadata {
  const page = parseInt(params.page, 10);
  const testimonials = getAllTestimonials();
  const totalPages = Math.ceil(testimonials.length / testimonialsConfig.itemsPerPage);

  if (page > totalPages) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `Testimonials - Page ${page}`,
  };
}

export default function TestimonialsPage({ params }: TestimonialsPageProps): JSX.Element | null {
  const page = parseInt(params.page, 10);
  const testimonials = getAllTestimonials();
  const totalPages = Math.ceil(testimonials.length / testimonialsConfig.itemsPerPage);

  if (page > totalPages) {
    return null;
  }

  const startIndex = (page - 1) * testimonialsConfig.itemsPerPage;
  const paginatedTestimonials = testimonials.slice(
    startIndex,
    startIndex + testimonialsConfig.itemsPerPage
  );

  return (
    <CategoryGrid
      items={paginatedTestimonials}
      renderItem={testimonial => <TestimonialCard key={testimonial.slug} {...testimonial} />}
      fullHeight
      currentPage={page}
      totalPages={totalPages}
      basePath="/testimonials/page"
    />
  );
}
