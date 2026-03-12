import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects } from '@/lib/projects';
import { projectsConfig } from '@/config/projects';
import { siteConfig } from '@/config/site';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { ProjectCard } from '@/components/molecules/ProjectCard';

interface ProjectsPageProps {
  params: { page: string };
}

export async function generateStaticParams() {
  const allProjects = getAllProjects();
  const totalPages = Math.ceil(allProjects.length / projectsConfig.itemsPerPage);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const page = Number(params.page);

  return {
    title: `${projectsConfig.hero.title} - Page ${page} | ${siteConfig.logo}`,
    description: projectsConfig.hero.description,
  };
}

export default function ProjectsPageNumber({ params }: ProjectsPageProps): JSX.Element {
  const allProjects = getAllProjects();
  const currentPage = Number(params.page);
  const totalPages = Math.ceil(allProjects.length / projectsConfig.itemsPerPage);

  if (currentPage < 1 || currentPage > totalPages) notFound();

  const startIndex = (currentPage - 1) * projectsConfig.itemsPerPage;
  const paginatedProjects = allProjects.slice(startIndex, startIndex + projectsConfig.itemsPerPage);

  return (
    <CategoryGrid
      items={paginatedProjects}
      renderItem={project => <ProjectCard key={project.slug} {...project} />}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath="/projects/page"
    />
  );
}
