import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { siteConfig } from '@/config/site';
import { projectsConfig } from '@/config/projects';
import { ContentDetail } from '@/components/organisms/ContentDetail';
import { StatsGrid } from '@/components/organisms/StatsGrid';
import { StatsCard, StatItem } from '@/components/molecules/StatsCard';
import { ActionButtons, ActionButton } from '@/components/molecules/ActionButtons';

interface ProjectPageProps {
  params: { slug: string };
}

marked.use({
  renderer: {
    heading({ text, depth }) {
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h${depth} id="${slug}">${text}</h${depth}>`;
    },
  },
});

export async function generateStaticParams() {
  const projects = getAllProjects();
  // Filter out reserved route names to avoid conflicts
  return projects
    .map(project => ({ slug: project.slug }))
    .filter(p => p.slug !== 'page' && p.slug !== 'category' && p.slug !== 'tag');
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) return {};

  return {
    title: `${project.seo.metaTitle} | ${siteConfig.logo}`,
    description: project.seo.metaDescription,
    keywords: [...project.seo.keywords],
    openGraph: {
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      images: [project.seo.ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps): Promise<JSX.Element> {
  const project = getProjectBySlug(params.slug);

  if (!project) notFound();

  const htmlContent = await marked(project.content);

  // Build meta items
  const metaItems = [project.category, project.license, `Last commit: ${project.lastCommit}`];
  if (project.stats?.buildStatus) {
    metaItems.push(`● Build ${project.stats.buildStatus}`);
  }

  // Build stats for StatsCard
  const stats: StatItem[] = [];
  if (project.stats?.stars !== undefined) {
    stats.push({ key: 'Stars', value: `★ ${project.stats.stars.toLocaleString()}`, accent: true });
  }
  if (project.stats?.forks !== undefined) {
    stats.push({ key: 'Forks', value: project.stats.forks.toLocaleString() });
  }
  if (project.stats?.contributors !== undefined) {
    stats.push({ key: 'Contributors', value: project.stats.contributors });
  }
  if (project.stats?.coverage !== undefined) {
    stats.push({ key: 'Coverage', value: `${project.stats.coverage}%`, accent: true });
  }
  if (project.stats?.buildStatus) {
    stats.push({ key: 'Build', value: `● ${project.stats.buildStatus}`, accent: true });
  }
  if (project.stats?.version) {
    stats.push({ key: 'Latest', value: project.stats.version });
  }
  stats.push({ key: 'License', value: project.license });

  // Build actions for ActionButtons
  const actions: ActionButton[] = [];
  if (project.links?.github) {
    actions.push({ label: 'GitHub Repo', href: project.links.github });
  }
  if (project.links?.docs) {
    actions.push({ label: 'Documentation', href: project.links.docs });
  }
  if (project.links?.demo) {
    actions.push({ label: 'Live Demo', href: project.links.demo, variant: 'secondary' });
  }
  if (project.links?.npm) {
    actions.push({ label: 'npm', href: project.links.npm, variant: 'secondary' });
  }
  if (project.links?.crates) {
    actions.push({ label: 'Crates.io', href: project.links.crates, variant: 'secondary' });
  }

  const sidebar = (
    <StatsGrid>
      {stats.length > 0 && <StatsCard title="Stats" stats={stats} />}
      {actions.length > 0 && <ActionButtons title="Links" actions={actions} />}
    </StatsGrid>
  );

  return (
    <ContentDetail
      header={{
        category: {
          name: project.category,
          href: `/projects/category/${project.category.toLowerCase()}`,
        },
        title: project.title,
        excerpt: project.excerpt,
        metaItems,
        tags: project.tags,
        tagBasePath: '/projects/tag',
      }}
      content={htmlContent}
      backLink={{
        href: '/projects',
        text: projectsConfig.backLink.text,
      }}
      sidebar={sidebar}
    />
  );
}
