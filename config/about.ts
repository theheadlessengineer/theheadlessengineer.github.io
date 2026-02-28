export const aboutConfig = {
  metadata: {
    description:
      'Tech Architect and Staff Engineer with over 12 years of experience designing distributed systems, leading senior engineering teams, and driving architectural decisions that scale across enterprise-grade platforms. Known for the rare combination of hands-on technical depth and the strategic clarity to know when to go deep and when to zoom out.',
  },
  hero: {
    title: 'Who is HEADLESSENGINEER?',
    subtitle:
      'The name is deliberate. Headless architecture is not just a technical pattern — it is a philosophy about separation of concerns, composability, and building for change.\n\nHe is a Tech Architect and Staff Engineer who has spent over 12 years making the hard calls that define how systems — and the teams behind them — evolve under pressure. He has directed architectural strategy across enterprise platforms serving millions of transactions, led teams of eight to twelve senior engineers across multiple European markets, and introduced engineering practices that outlast the projects that inspired them.\n\nWhat sets him apart is the rare combination of hands-on technical depth and the strategic clarity to know when to go deep and when to zoom out. He does not just build for today — he builds for what the system needs to become.',
  },
  coreServices: {
    title: 'Core Services',
    description: 'What I bring to the table',
    services: [
      {
        title: 'Technical Architecture',
        value: 'System Design at Scale',
        description:
          'End-to-end architecture for distributed, high-availability platforms — from composability and build-vs-buy decisions to zero-downtime migration strategies and evolutionary design that survives contact with reality',
        href: '#',
      },
      {
        title: 'Engineering Leadership',
        value: 'Teams That Outlast the Project',
        description:
          'Building senior engineering teams that are more capable, more autonomous, and more confident than when he found them — through rigorous standards, honest coaching, and a culture where quality is a habit, not a checkpoint',
        href: '#',
      },
      {
        title: 'AI-Augmented Engineering',
        value: 'Changing How Teams Think',
        description:
          'Embedding AI-driven development practices that do not just accelerate delivery — they raise the ceiling of what a lean, focused engineering team believes it can accomplish',
        href: '#',
      },
    ],
  },
  expertise: {
    title: 'Technical Expertise',
    description: 'Technologies and tools I work with',
    skills: [
      {
        title: 'Backend',
        value: 'Go, PHP, GraphQL, REST APIs',
        description:
          'Production-grade distributed services and API layers built for enterprise scale — designed for resilience, observability, and the engineers who will maintain them long after launch',
        href: '#',
      },
      {
        title: 'Cloud & DevOps',
        value: 'AWS, Docker, Kubernetes, CI/CD',
        description:
          'Cloud-native infrastructure and automated delivery pipelines built for zero-downtime systems — where deployment is boring by design',
        href: '#',
      },
      {
        title: 'AI & Automation',
        value: 'Claude Code, Amazon Q, Gemini CLI',
        description:
          'AI-assisted development and multi-agent workflow automation — not as a novelty, but as a deliberate practice that compounds across every engineer on the team',
        href: '#',
      },
    ],
  },
  principles: {
    title: 'Engineering Principles',
    description: 'Core values that guide my work',
    principles: [
      {
        title: 'Architecture as a Craft',
        value: 'Design for Tomorrow',
        description:
          'The best architectural decision is rarely the cleverest one — it is the one the team can own, evolve, and trust when things go wrong at 2am. Every decision is a long-term investment. ADRs, clean boundaries, and evolutionary thinking over convenient shortcuts.',
        href: '#',
      },
      {
        title: 'Standards Without Compromise',
        value: 'Quality is a Process, Not a Gate',
        description:
          'Speed and standards are in constant tension. The answer is never to sacrifice one for the other — it is to build the processes that make both possible simultaneously. TDD, BDD, and rigorous review are not overhead. They are the foundation.',
        href: '#',
      },
      {
        title: 'Multiplier Mindset',
        value: 'Lead by Growing Others',
        description:
          'The measure of great engineering leadership is not the systems built — it is the team left behind. More capable, more autonomous, more confident. The goal is to make yourself the least important person in the room as fast as possible.',
        href: '#',
      },
    ],
  },
  certifications: {
    title: 'Certifications & Credentials',
    description: 'Formal recognition across platforms and disciplines',
    certifications: [
      {
        title: 'Spryker',
        value: 'Foundation Developer',
        description: 'Backend developer certification — Spryker, 2023',
        href: '#',
      },
      {
        title: 'Adobe Commerce',
        value: 'Commerce Developer',
        description: 'Backend developer certification — Adobe, 2023',
        href: '#',
      },
      {
        title: 'AWS',
        value: 'Cloud Practitioner',
        description: 'AWS Cloud Quest digital badge — 2022',
        href: '#',
      },
      {
        title: 'AI Development',
        value: 'Practitioner',
        description: 'Certified practitioner across Claude Code, Amazon Q, and Gemini CLI — 2024',
        href: '#',
      },
    ],
  },
  cta: {
    title: "Let's Shape What's Next",
    description:
      "If you are looking for a Staff Engineer or Tech Architect who can own the hard problems, align engineering strategy with business outcomes, and build the systems and teams that scale — let's talk.",
    buttons: [
      { label: 'Contact Me', href: '/contact', variant: 'primary' as const },
      { label: 'View Articles', href: '/articles', variant: 'secondary' as const },
    ],
  },
} as const;
