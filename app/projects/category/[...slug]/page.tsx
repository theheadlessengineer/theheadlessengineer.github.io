import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects } from '@/lib/projects';
import { projectsConfig } from '@/config/projects';
import { siteConfig } from '@/config/site';
import { CategoryGrid } from '@/components/organisms/CategoryGrid';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { BackLink } from '@/components/atoms/BackLink';

interface CategoryPageProps {
  params: { slug: string[] };
}

function getProjectsByCategory(category: string) {
  const projects = getAllProjects();
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
}

export async function generateStaticParams() {
  const categories = Object.keys(projectsConfig.categories);
  const params = [];

  for (const category of categories) {
    const projects = getProjectsByCategory(category);
    const totalPages = Math.ceil(projects.length / projectsConfig.itemsPerPage);

    // Use lowercase for URL slugs
    const categorySlug = category.toLowerCase();
    params.push({ slug: [categorySlug] });
    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [categorySlug, page.toString()] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.slug[0];
  const categoryConfig =
    projectsConfig.categories[category as keyof typeof projectsConfig.categories];

  if (!categoryConfig) return {};

  return {
    title: `${categoryConfig.name} | ${siteConfig.logo}`,
    description: categoryConfig.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps): JSX.Element {
  const categorySlug = params.slug[0].toLowerCase();
  const currentPage = params.slug[1] ? Number(params.slug[1]) : 1;

  // Find the actual category name (case-insensitive)
  const actualCategory = Object.keys(projectsConfig.categories).find(
    cat => cat.toLowerCase() === categorySlug
  );

  if (!actualCategory) notFound();

  const categoryConfig =
    projectsConfig.categories[actualCategory as keyof typeof projectsConfig.categories];

  const allProjects = getProjectsByCategory(actualCategory);
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
      basePath={`/projects/category/${categorySlug}`}
      backLink={<BackLink href="/projects" text={projectsConfig.backLink.text} />}
    />
  );
}
