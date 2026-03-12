import { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import { siteConfig } from '@/config/site';
import { projectsConfig } from '@/config/projects';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { ProjectCard } from '@/components/molecules/ProjectCard';

export const metadata: Metadata = {
  title: `${projectsConfig.hero.title} | ${siteConfig.logo}`,
  description: projectsConfig.hero.description,
};

export default function ProjectsPage(): JSX.Element {
  const projects = getAllProjects();
  const totalPages = Math.ceil(projects.length / projectsConfig.itemsPerPage);
  const paginatedProjects = projects.slice(0, projectsConfig.itemsPerPage);

  return (
    <CategoryGrid
      items={paginatedProjects}
      renderItem={project => <ProjectCard key={project.slug} {...project} />}
      fullHeight
      currentPage={1}
      totalPages={totalPages}
      basePath="/projects/page"
    />
  );
}
