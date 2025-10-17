import React from 'react';
import { ProfileCard } from '@/components/molecules';
import styles from './Principles.module.css';

interface Principle {
  title: string;
  description: string;
  icon: string;
}

interface PrinciplesConfig {
  title: string;
  description: string;
  principles: Principle[];
  variant?: 'default' | 'invert';
}

interface PrinciplesProps {
  config: PrinciplesConfig;
}

export const Principles: React.FC<PrinciplesProps> = ({ config }) => {
  const sectionClass = config.variant === 'invert' ? 'section invert' : 'section';

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{config.title}</h2>
          <p className="major">{config.description}</p>
        </div>
        
        <div className="card-grid card-grid-4">
          {config.principles.map((principle) => (
            <ProfileCard
              key={principle.title}
              title={principle.title}
              description={principle.description}
              icon={principle.icon}
              iconVariant="circle"
              iconType="solid"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
