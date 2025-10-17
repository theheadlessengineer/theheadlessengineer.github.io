/**
 * CONTENT CONFIGURATION
 * 
 * All website content including navigation, hero sections, page content, and UI text.
 * Contains: navigation menus, hero configurations, page-specific content, CTAs, and metrics.
 */

import { profileConfig } from './profile';

// Navigation configuration
export const navigationConfig = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Articles', href: '/articles' },
    { label: 'Contact', href: '/contact' }
  ],
  services: [
    { label: 'Full-Stack Engineering', href: '/articles/category/software-architecture/patterns' },
    { label: 'AI/ML Engineering', href: '/articles/category/software-architecture/principles' },
    { label: 'Cloud Infrastructure', href: '/articles/category/software-architecture/design-patterns' },
    { label: 'Systems Integration', href: '/articles' }
  ]
};

// Contact methods configuration
export const contactMethodsConfig = {
  methods: [
    {
      title: 'Email',
      description: 'Drop me a line for project inquiries, collaborations, or just to say hello.',
      icon: 'envelope',
      iconType: 'solid' as const,
      url: 'mailto:hello@headlessengineer.com'
    },
    {
      title: 'LinkedIn',
      description: 'Connect with me professionally and stay updated on my latest projects.',
      icon: 'linkedin',
      iconType: 'brands' as const,
      url: 'https://linkedin.com/in/headlessengineer'
    },
    {
      title: 'GitHub',
      description: 'Explore my open-source contributions and technical projects.',
      icon: 'github',
      iconType: 'brands' as const,
      url: 'https://github.com/headlessengineer'
    },
    {
      title: 'Schedule Call',
      description: 'Book a consultation to discuss your project requirements and technical needs.',
      icon: 'calendar',
      iconType: 'solid' as const,
      url: 'https://calendly.com/headlessengineer'
    }
  ]
};

// Hero configurations for all pages
export const heroConfigs = {
  home: {
    title: 'HEADLESS ENGINEER',
    tagline: 'Limitless tech. One composable mind.',
    rotatingSentences: [
      'Limitless tech. One composable mind.',
      'Empowering businesses through headless architecture.',
      'Building the future, one API at a time.',
      'Decoupled systems. Infinite possibilities.',
      'API-first. Performance-driven. Future-ready.'
    ],
    description: 'Empowering businesses through modular, scalable, and architecture-neutral engineering solutions that evolve with their environments.',
    primaryCta: {
      text: 'Explore Services',
      href: '/about'
    },
    secondaryCta: {
      text: 'Articles',
      href: '/articles'
    }
  },
  about: {
    title: 'About Headless Engineer',
    tagline: 'Transforming complex business challenges into scalable digital solutions',
    rotatingSentences: [
      'Transforming complex business challenges into scalable digital solutions',
      'Modern architecture for modern businesses.',
      'Composable commerce. Scalable experiences.',
      'Headless solutions. Limitless potential.'
    ],
    description: 'With over 12 years of experience in enterprise e-commerce, AI automation, and cloud architecture, I specialize in building future-proof systems that drive measurable business results.',
    primaryCta: {
      text: 'View Projects',
      href: '#projects'
    },
    secondaryCta: {
      text: 'Get In Touch',
      href: '/contact'
    }
  },
  articles: {
    title: 'Engineering Articles',
    tagline: 'Insights, patterns, and best practices',
    rotatingSentences: [
      'Insights, patterns, and best practices',
      'Deep dives into modern architecture.',
      'Real-world engineering solutions.',
      'From concept to production-ready code.'
    ],
    description: 'Explore in-depth technical articles covering software architecture, design patterns, and modern development practices. Learn from real-world experiences and industry insights.',
    primaryCta: {
      text: 'Explore Articles',
      href: '#articles-content'
    },
    secondaryCta: {
      text: '',
      href: ''
    }
  },
  contact: {
    title: 'Get In Touch',
    tagline: 'Ready to build something amazing together?',
    rotatingSentences: [
      'Ready to build something amazing together?',
      'Let\'s discuss your next project.',
      'Transform your ideas into reality.',
      'Engineering excellence, delivered.'
    ],
    description: 'Whether you need architectural guidance, full-stack development, or AI integration, I\'m here to help turn your vision into a scalable, production-ready solution.',
    primaryCta: {
      text: 'Start Conversation',
      href: '#contact-form'
    },
    secondaryCta: {
      text: 'View Portfolio',
      href: '/about'
    }
  }
};

// Page-specific content configurations
export const pageConfigs = {
  home: {
    metrics: {
      title: 'Proven Track Record',
      description: 'Measurable results from recent projects',
      metrics: [
        {
          number: '70+',
          label: 'Performance Improvement via Headless Architecture'
        },
        {
          number: '8-10%',
          label: 'Conversion Rate Increase via Semantic Search'
        },
        {
          number: '40%',
          label: 'Team Productivity Boost with GenAI'
        },
        {
          number: '12+',
          label: 'Years of Enterprise Experience'
        }
      ]
    },
    cta: {
      title: 'Ready to Transform Your Digital Architecture?',
      description: 'Let\'s discuss how headless solutions can accelerate your business growth and improve your technical capabilities.',
      buttons: [
        {
          text: 'Start Your Project',
          href: '/contact',
          variant: 'primary' as const
        },
        {
          text: 'Learn More',
          href: '/about',
          variant: 'outline' as const
        }
      ]
    }
  },
  about: {
    mission: {
      items: [
        {
          title: 'Mission',
          content: 'To bridge the gap between cutting-edge technology and practical business solutions, enabling organizations to harness the full potential of AI, cloud computing, and modern software architecture.'
        },
        {
          title: 'Vision',
          content: 'A future where intelligent automation and scalable architecture empower businesses to focus on innovation rather than technical complexity, creating sustainable competitive advantages.'
        },
        {
          title: 'Values',
          content: 'Excellence in engineering, transparency in communication, and commitment to delivering solutions that not only meet today\'s needs but anticipate tomorrow\'s challenges.'
        }
      ]
    },
    cta: {
      title: 'Let\'s Build Something Extraordinary Together',
      description: 'Ready to leverage cutting-edge technology for your next project? Let\'s discuss how we can transform your ideas into scalable, production-ready solutions.',
      buttons: [
        {
          text: 'Start a Project',
          href: '/contact',
          variant: 'primary' as const
        },
        {
          text: 'View Articles',
          href: '/articles',
          variant: 'outline' as const
        }
      ]
    }
  },
  contact: {
    cta: {
      title: 'Let\'s Start Building',
      description: 'Ready to transform your ideas into reality? Get in touch and let\'s discuss your next project.',
      buttons: [
        {
          text: 'Send Message',
          href: '#contact-form',
          variant: 'primary' as const
        },
        {
          text: 'View Portfolio',
          href: '/about',
          variant: 'outline' as const
        }
      ]
    }
  }
};

// Spotlight configurations
export const spotlightConfigs = [
  {
    id: 'headless-architecture',
    title: 'Headless Architecture Excellence',
    description: 'Specializing in decoupled systems that deliver unmatched performance, scalability, and developer experience. From headless CMS implementations to API-first architectures.',
    image: '/images/spotlight/headless.jpg',
    reverse: false,
    theme: 'default' as const
  }
];
