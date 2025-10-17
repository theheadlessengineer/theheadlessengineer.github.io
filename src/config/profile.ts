/**
 * PROFILE CONFIGURATION
 * 
 * Personal and professional information about the site owner.
 * Contains: expertise areas, services, certifications, principles, and professional background.
 */

export interface Principle {
  title: string;
  description: string;
  icon: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface Certification {
  title: string;
  description: string;
  icon: string;
}

export interface Expertise {
  title: string;
  description: string;
  icon: string;
}

export interface ProjectGalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ProfileConfig {
  services: Service[];
  expertise: Expertise[];
  achievements: Achievement[];
  certifications: Certification[];
  projectGallery: ProjectGalleryItem[];
  principles: Principle[];
}

export const profileConfig: ProfileConfig = {
  // Services for both home and about pages
  services: [
    {
      title: 'Full-Stack Engineering',
      description: 'API-first backend development with Go and PHP, modern React frontends, headless CMS integrations, and microservice architecture design.',
      icon: 'code'
    },
    {
      title: 'AI/ML Engineering',
      description: 'Semantic search with vector databases, AI workflow automation, GenAI integration, and intelligent system design with 12+ years of experience.',
      icon: 'brain'
    },
    {
      title: 'Cloud Infrastructure',
      description: 'AWS-certified architecture consulting, serverless solutions, Docker/Kubernetes orchestration, and scalable infrastructure design.',
      icon: 'cloud'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Enterprise platforms using Spryker and Magento, B2B/B2C solutions, payment integrations, and performance optimization.',
      icon: 'shopping-cart'
    }
  ],

  expertise: [
    {
      title: 'Backend Technologies',
      description: 'Go, PHP, Java, Python with expertise in microservices, GraphQL APIs, and high-performance system design.',
      icon: 'code'
    },
    {
      title: 'Database Systems',
      description: 'MySQL, PostgreSQL, Redis, Elasticsearch, Pinecone vector databases, and NoSQL solutions for scalable data architecture.',
      icon: 'database'
    },
    {
      title: 'AI & Automation',
      description: 'n8n workflows, CrewAI, semantic search, vector embeddings, and GenAI integration for intelligent automation.',
      icon: 'brain'
    },
    {
      title: 'DevOps & Architecture',
      description: 'Docker, Kafka, RabbitMQ, CI/CD pipelines, AWS cloud services, and enterprise-grade system architecture.',
      icon: 'tools'
    }
  ],

  achievements: [
    {
      title: '70+ Hours Saved Weekly',
      description: 'AI automation workflows eliminating manual processing through intelligent research analysis and content generation.',
      icon: 'stopwatch'
    },
    {
      title: '8-10% Conversion Increase',
      description: 'Semantic search implementation using Pinecone vector database integrated with existing Elasticsearch infrastructure.',
      icon: 'chart-line'
    },
    {
      title: '40% Productivity Boost',
      description: 'GenAI adoption across engineering teams with AI-first development practices and automated code generation.',
      icon: 'rocket'
    },
    {
      title: 'Open Source Contributor',
      description: 'Custom n8n nodes for Spryker e-commerce platform, enabling seamless automation workflows for the community.',
      icon: 'code-branch'
    }
  ],

  principles: [
    {
      title: 'Technical Expertise',
      description: 'Deep technical understanding with hands-on experience across full-stack development, AI/ML, and cloud architecture.',
      icon: 'code'
    },
    {
      title: 'Think Long Term',
      description: 'Translate business goals into technical roadmaps, anticipate trends, and develop scalable architectural strategies.',
      icon: 'chart-line'
    },
    {
      title: 'Obsess Over The User',
      description: 'Focus on user experience through semantic search, intelligent automation, and performance optimization.',
      icon: 'user'
    },
    {
      title: 'Adapt & Learn',
      description: 'Stay curious about new technologies, embrace AI/ML innovations, and continuously update technical skills.',
      icon: 'brain'
    },
    {
      title: 'Ethical & Principled Decision Making',
      description: 'Maintain high ethical standards, prioritize user privacy and security, and take responsibility for outcomes.',
      icon: 'shield'
    },
    {
      title: 'Resilience & Stress Management',
      description: 'Remain calm under pressure, manage complex projects, and promote work-life balance for sustainable growth.',
      icon: 'heart'
    },
    {
      title: 'Effective Communication',
      description: 'Clearly articulate complex technical concepts to stakeholders and facilitate collaborative discussions.',
      icon: 'comments'
    }
  ],

  certifications: [
    {
      title: 'AWS Cloud Practitioner',
      description: 'Amazon Web Services certified cloud practitioner with expertise in AWS infrastructure and services.',
      icon: 'cloud'
    },
    {
      title: 'Spryker Certified Developer',
      description: 'Spryker Systems certified foundation developer with expertise in e-commerce platform development.',
      icon: 'code'
    },
    {
      title: 'Adobe Commerce Developer',
      description: 'Adobe certified commerce developer with expertise in Magento enterprise solutions.',
      icon: 'shopping-cart'
    },
    {
      title: 'SAP Commerce Cloud',
      description: 'SAP certified technical essentials for commerce cloud platform development and integration.',
      icon: 'cogs'
    }
  ],

  projectGallery: [
    {
      id: 'semantic-search',
      src: '/images/projects/semantic-search.jpg',
      alt: 'AI-Powered Semantic Search Platform',
      title: 'AI-Powered Semantic Search',
      description: 'Pinecone vector database integration with Elasticsearch for natural language product discovery'
    },
    {
      id: 'automation-workflows',
      src: '/images/projects/automation-workflows.jpg',
      alt: 'Enterprise AI Automation Workflows',
      title: 'AI Automation Workflows',
      description: 'n8n and CrewAI workflows for research analysis and content generation'
    },
    {
      id: 'ecommerce-platform',
      src: '/images/projects/ecommerce-platform.jpg',
      alt: 'Enterprise E-commerce Platform',
      title: 'E-commerce Platform Migration',
      description: 'Microservices architecture migration with GoLang and AWS infrastructure'
    },
    {
      id: 'spryker-implementation',
      src: '/images/projects/spryker-implementation.jpg',
      alt: 'Spryker Commerce Cloud Implementation',
      title: 'Spryker B2B Solution',
      description: 'Complex B2B e-commerce solution with multi-store functionality'
    },
    {
      id: 'order-management',
      src: '/images/projects/order-management.jpg',
      alt: 'Real-time Order Management System',
      title: 'Real-time Order Management',
      description: 'Event-driven architecture with Kafka and Redis for high-volume processing'
    },
    {
      id: 'n8n-nodes',
      src: '/images/projects/n8n-nodes.jpg',
      alt: 'Custom n8n Spryker Integration',
      title: 'Open Source n8n Nodes',
      description: 'Custom n8n nodes for Spryker e-commerce platform integration'
    }
  ]
};
