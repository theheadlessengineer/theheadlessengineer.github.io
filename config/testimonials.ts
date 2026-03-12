import { getAllTestimonials } from '@/lib/testimonials';

export const testimonialsConfig = {
  hero: {
    title: '$ testimonials',
    description: '> what people say about our work',
  },
  backLink: {
    text: 'Back to Testimonials',
  },
  itemsPerPage: 3,
} as const;
