'use client';

import React, { useEffect } from 'react';
import { Hero, Spotlight, CoreServices, Metrics, CTA } from '@/components/organisms';
import { heroConfigs, spotlightConfigs, pageConfigs } from '@/config/content';
import { profileConfig } from '@/config/profile';

export default function HomePage() {
  useEffect(() => {
    document.body.classList.add('homepage-layout');
    return () => document.body.classList.remove('homepage-layout');
  }, []);

  return (
    <div id="wrapper">
      <Hero config={heroConfigs.home} />
    </div>
  );
}
