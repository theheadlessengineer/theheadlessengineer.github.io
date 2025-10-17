/**
 * SITE CONFIGURATION
 * 
 * Core site information, metadata, and global settings.
 * Contains: site title, description, URLs, social links, and basic site identity.
 */

import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  title: 'Headless Engineer',
  description: 'Limitless tech. One composable mind. Modular engineering solutions for the future.',
  url: 'https://headlessengineer.com',
  author: 'Headless Engineer',
  social: {
    twitter: '@headlessengineer',
    github: 'headlessengineer',
    linkedin: 'headlessengineer'
  }
};
