import { getAllProjects } from '@/lib/projects';

// Generate categories dynamically from projects
function getCategories() {
  const projects = getAllProjects();
  const categoryMap = new Map<string, { name: string; description: string }>();

  projects.forEach(project => {
    if (!categoryMap.has(project.category)) {
      // Convert slug to title case
      const name = project.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      categoryMap.set(project.category, {
        name,
        description: `Projects in ${name}`,
      });
    }
  });

  return Object.fromEntries(categoryMap);
}

export const projectsConfig = {
  hero: {
    title: '$ projects',
    description: '> open-source tools, libraries, and experiments',
  },
  backLink: {
    text: 'Back to Projects',
  },
  itemsPerPage: 3,
  get categories() {
    return getCategories();
  },
} as const;

export type ProjectCategory = string;
