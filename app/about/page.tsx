import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { aboutConfig } from '@/config/about';
import { Hero } from '@/components/organisms/Hero';
import { CoreServices } from '@/components/organisms/CoreServices';
import { Expertise } from '@/components/organisms/Expertise';
import { Principles } from '@/components/organisms/Principles';
import { Certifications } from '@/components/organisms/Certifications';
import { CTA } from '@/components/organisms/CTA';

export const metadata: Metadata = {
  title: 'About',
  description: aboutConfig.metadata.description,
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: aboutConfig.metadata.description,
    url: `${siteConfig.url}/about`,
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: `About ${siteConfig.name}`,
    description: aboutConfig.metadata.description,
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <main>
      <Hero title={aboutConfig.hero.title} description={aboutConfig.hero.subtitle} />
      <CoreServices {...aboutConfig.coreServices} />
      <Expertise {...aboutConfig.expertise} />
      <Principles {...aboutConfig.principles} />
      <Certifications {...aboutConfig.certifications} />
      <CTA {...aboutConfig.cta} />
    </main>
  );
}
