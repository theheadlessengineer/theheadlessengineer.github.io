import React from 'react';
import { ProfileCard } from '@/components/molecules';
import styles from './CoreServices.module.css';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface CoreServicesProps {
  title?: string;
  description?: string;
  services: Service[];
  variant?: 'home' | 'about';
}

export const CoreServices: React.FC<CoreServicesProps> = ({
  title = 'Core Services',
  description = 'Comprehensive engineering solutions for modern digital challenges',
  services,
  variant = 'home'
}) => {
  const gridClass = services.length === 3 ? 'card-grid-3' : 'card-grid-4';
  
  return (
    <section className={`section ${variant === 'about' ? styles.sectionAlt : ''}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{title}</h2>
          <p className="major">{description}</p>
        </div>
        
        <div className={`card-grid ${gridClass}`}>
          {services.map((service) => (
            <ProfileCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              iconVariant="circle"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
