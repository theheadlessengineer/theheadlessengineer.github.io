import { ProjectCard, ProjectCardProps } from '@/components/molecules/ProjectCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import { Pagination } from '@/components/atoms/Pagination';
import styles from './ProjectGrid.module.css';

export interface ProjectGridProps {
  readonly projects: readonly ProjectCardProps[];
  readonly fullHeight?: boolean;
  readonly currentPage?: number;
  readonly totalPages?: number;
  readonly basePath?: string;
  readonly backLink?: React.ReactNode;
}

export function ProjectGrid({
  projects,
  fullHeight = false,
  currentPage,
  totalPages,
  basePath,
  backLink,
}: ProjectGridProps): JSX.Element {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={projects.length}>
          {projects.map(project => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </CardGrid>
        {currentPage && totalPages && basePath && (
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        )}
        {backLink && <div className={styles.backLink}>{backLink}</div>}
      </div>
    </section>
  );
}
