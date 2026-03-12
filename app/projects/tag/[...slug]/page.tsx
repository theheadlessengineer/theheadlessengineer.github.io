import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects } from '@/lib/projects';
import { siteConfig } from '@/config/site';
import { projectsConfig } from '@/config/projects';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { BackLink } from '@/components/atoms/BackLink';

interface TagPageProps {
  params: { slug: string[] };
}

function getProjectsByTag(tag: string) {
  const projects = getAllProjects();
  return projects.filter(project => project.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  const tags = new Set<string>();

  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });

  const params = [];

  for (const tag of Array.from(tags)) {
    const tagProjects = getProjectsByTag(tag);
    const totalPages = Math.ceil(tagProjects.length / projectsConfig.itemsPerPage);

    // Use lowercase for URL slugs
    const tagSlug = tag.toLowerCase();
    params.push({ slug: [tagSlug] });
    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [tagSlug, page.toString()] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.slug[0]);

  return {
    title: `Projects tagged with "${tag}" | ${siteConfig.logo}`,
    description: `Browse all projects tagged with ${tag}`,
  };
}

export default async function ProjectTagPage({ params }: TagPageProps): Promise<JSX.Element> {
  const tagSlug = params.slug[0].toLowerCase();
  const currentPage = params.slug[1] ? Number(params.slug[1]) : 1;

  // Find projects with this tag (case-insensitive)
  const allProjects = getAllProjects();
  const matchingProjects = allProjects.filter(project =>
    project.tags.some(t => t.toLowerCase() === tagSlug)
  );

  if (matchingProjects.length === 0) notFound();

  const totalPages = Math.ceil(matchingProjects.length / projectsConfig.itemsPerPage);

  if (currentPage < 1 || currentPage > totalPages) notFound();

  const startIndex = (currentPage - 1) * projectsConfig.itemsPerPage;
  const paginatedProjects = matchingProjects.slice(
    startIndex,
    startIndex + projectsConfig.itemsPerPage
  );

  return (
    <CategoryGrid
      items={paginatedProjects}
      renderItem={project => <ProjectCard key={project.slug} {...project} />}
      fullHeight
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/projects/tag/${tagSlug}`}
      backLink={<BackLink href="/projects" text={projectsConfig.backLink.text} />}
    />
  );
}
