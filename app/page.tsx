import type { Metadata } from 'next';
import { Hero } from '@/components/organisms/Hero';
import { siteConfig } from '@/config/site';
import { homeConfig } from '@/config/home';

export const metadata: Metadata = {
  title: 'Home',
  description: homeConfig.hero.description,
  openGraph: {
    title: `${siteConfig.name} - ${homeConfig.hero.title}`,
    description: homeConfig.hero.description,
    url: siteConfig.url,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${homeConfig.hero.title}`,
    description: homeConfig.hero.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'Full-Stack Developer',
    description: siteConfig.description,
    sameAs: [
      'https://github.com/popatkaran',
      'https://linkedin.com/in/popatkaran',
      'https://twitter.com/popatkaran',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero {...homeConfig.hero} />
      </main>
    </>
  );
}
