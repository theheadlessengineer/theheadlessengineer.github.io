/**
 * SEO & GEO CONFIGURATION
 * 
 * Search Engine Optimization and Generative Engine Optimization settings.
 * Contains: meta tags, structured data, AI-specific metadata, and search optimization configs.
 */

// SEO Configuration
export const seoConfig = {
  // Site-wide defaults
  defaultMeta: {
    title: "Headless Engineer - Expert Headless Architecture Solutions",
    description: "Learn headless architecture, CMS implementation, and modern web development. Expert tutorials, guides, and consulting services.",
    keywords: "headless CMS, headless architecture, API-first development, JAMstack, modern web development",
    author: "Headless Engineer",
    siteUrl: "https://headlessengineer.com",
    image: "/images/og-default.jpg",
    twitterHandle: "@headlessengineer"
  },

  // Structured data schemas
  schemas: {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Headless Engineer",
      "url": "https://headlessengineer.com",
      "logo": "https://headlessengineer.com/images/logo.png",
      "description": "Expert headless architecture solutions and consulting",
      "foundingDate": "2024",
      "expertise": [
        "Headless CMS",
        "JAMstack Development", 
        "API-First Architecture",
        "Modern Web Development"
      ]
    },
    
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Headless Engineer",
      "url": "https://headlessengineer.com",
      "description": "Learn headless architecture and modern web development",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://headlessengineer.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Headless Engineer",
      "jobTitle": "Senior Software Architect",
      "description": "Expert in headless architecture and modern web development",
      "url": "https://headlessengineer.com",
      "sameAs": [
        "https://linkedin.com/in/headlessengineer",
        "https://github.com/headlessengineer",
        "https://twitter.com/headlessengineer"
      ],
      "knowsAbout": [
        "Headless CMS",
        "React",
        "Next.js",
        "JAMstack",
        "API Development"
      ]
    }
  },

  // Page-specific SEO templates
  pageTemplates: {
    article: {
      titleTemplate: "%s | Headless Engineer",
      descriptionTemplate: "Learn %s with expert guidance. Step-by-step tutorials and best practices for modern web development.",
      type: "article"
    },
    
    guide: {
      titleTemplate: "Complete Guide: %s | Headless Engineer", 
      descriptionTemplate: "Comprehensive guide to %s. Everything you need to know with practical examples and expert insights.",
      type: "article"
    },

    tutorial: {
      titleTemplate: "How to %s | Headless Engineer",
      descriptionTemplate: "Step-by-step tutorial: %s. Learn with practical examples and expert guidance.",
      type: "article"
    }
  },

  // Robots and crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1
    }
  }
};

// GEO (Generative Engine Optimization) Configuration
export const geoConfig = {
  // AI-specific metadata
  aiMetadata: {
    purpose: "Educational content about headless architecture and modern web development",
    audience: "Software developers, architects, technical decision makers",
    expertiseLevel: "Intermediate to advanced",
    contentType: "Technical tutorials and guides",
    primaryTopics: [
      "headless architecture",
      "headless CMS",
      "API-first development", 
      "JAMstack",
      "modern web development"
    ]
  },

  // Structured answers for common queries
  structuredAnswers: {
    "What is headless architecture?": "Headless architecture separates the frontend presentation layer from the backend content management system, enabling greater flexibility and performance.",
    "How does headless CMS work?": "A headless CMS delivers content via APIs to any frontend framework, allowing developers to build custom user experiences.",
    "Why choose headless over traditional CMS?": "Headless architecture provides better performance, scalability, developer experience, and omnichannel content delivery.",
    "What are the benefits of going headless?": "Faster performance, better developer experience, easier scaling, and future-proof technology stack."
  },

  // Factual statements for AI understanding
  factualStatements: [
    "Headless architecture improves site performance by 40-60%",
    "API-first approach enables content reuse across multiple channels",
    "Decoupled systems reduce security vulnerabilities",
    "JAMstack sites load 2-10x faster than traditional websites"
  ],

  // Technical glossary for AI context
  technicalTerms: {
    "headless": "Architecture pattern where frontend is decoupled from backend",
    "jamstack": "Modern web development architecture based on JavaScript, APIs, and Markup",
    "api-first": "Development approach that prioritizes API design before implementation",
    "decoupled": "System architecture where components operate independently"
  }
};
