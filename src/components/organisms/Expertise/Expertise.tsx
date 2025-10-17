import React from 'react';
import { ProfileCard } from '@/components/molecules';
import styles from './Expertise.module.css';

interface ExpertiseItem {
  title: string;
  description: string;
  icon: string;
}

interface ExpertiseConfig {
  title: string;
  description: string;
  expertise: ExpertiseItem[];
  variant?: 'default' | 'invert';
}

interface ExpertiseProps {
  config: ExpertiseConfig;
}

export const Expertise: React.FC<ExpertiseProps> = ({ config }) => {
  const sectionClass = config.variant === 'invert' ? 'section invert' : 'section';

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{config.title}</h2>
          <p className="major">{config.description}</p>
        </div>
        
        <div className="card-grid card-grid-4">
          {config.expertise.map((tech) => (
            <ProfileCard
              key={tech.title}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              iconVariant="circle"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
