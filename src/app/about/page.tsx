import React from 'react';
import { 
  Hero,
  Spotlight, 
  CoreServices, 
  Expertise,
  Principles,
  Certifications,
  CTA
} from '@/components/organisms';
import { heroConfigs, pageConfigs } from '@/config/content';
import { profileConfig } from '@/config/profile';

// Modern About Page with actual personal information

const journeySpotlightConfig = {
  id: 'journey',
  title: 'The Journey',
  description: 'From building my first e-commerce platform to architecting AI-powered solutions for enterprise clients, my 12+ year journey has been driven by one constant: the pursuit of engineering excellence. Every project teaches something new, every challenge becomes an opportunity to innovate.',
  image: '/images/spotlight/journey.jpg',
  reverse: false,
  theme: 'default' as const
};

const expertiseConfig = {
  title: 'Technical Expertise',
  description: 'Deep knowledge across the technology stack',
  expertise: profileConfig.expertise,
  variant: 'default' as const
};

const certificationsConfig = {
  title: 'Certifications & Recognition',
  description: 'Industry-validated expertise',
  certifications: profileConfig.certifications
};

const principlesConfig = {
  title: 'Engineering Principles',
  description: 'Core values that guide every technical decision and solution',
  principles: profileConfig.principles
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '200vh' }}>
      <Hero config={heroConfigs.about} />
      
      <Spotlight config={journeySpotlightConfig} />
      
      <CoreServices 
        title="Core Services"
        description="Comprehensive engineering solutions for modern digital challenges"
        services={profileConfig.services}
        variant="about"
      />
      
      <Expertise config={expertiseConfig} />
      
      <Principles config={principlesConfig} />
      
      <Certifications config={certificationsConfig} />

      <CTA config={pageConfigs.about.cta} />
    </div>
  );
}
