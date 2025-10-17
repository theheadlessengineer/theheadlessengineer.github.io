import React from 'react';
import { ProjectCard } from '@/components/molecules';
import styles from './ProjectShowcase.module.css';

interface ProjectItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface ProjectShowcaseConfig {
  title: string;
  description: string;
  projects: ProjectItem[];
  variant?: 'default' | 'invert';
}

interface ProjectShowcaseProps {
  config: ProjectShowcaseConfig;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ config }) => {
  const sectionClass = config.variant === 'invert' ? 'section invert' : 'section';
  const gridClass = config.projects.length === 6 ? 'card-grid-6' : `card-grid-${config.projects.length}`;

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{config.title}</h2>
          <p className="major">{config.description}</p>
        </div>
        
        <div className={`card-grid ${gridClass}`}>
          {config.projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              src={project.src}
              alt={project.alt}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
