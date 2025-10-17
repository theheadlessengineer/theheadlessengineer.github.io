import React from 'react';
import { ProfileCard } from '@/components/molecules';
import styles from './Certifications.module.css';

interface CertificationItem {
  title: string;
  description: string;
  icon: string;
}

interface CertificationsConfig {
  title: string;
  description: string;
  certifications: CertificationItem[];
  variant?: 'default' | 'invert';
}

interface CertificationsProps {
  config: CertificationsConfig;
}

export const Certifications: React.FC<CertificationsProps> = ({ config }) => {
  const sectionClass = config.variant === 'invert' ? 'section invert' : 'section';

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{config.title}</h2>
          <p className="major">{config.description}</p>
        </div>
        
        <div className="card-grid card-grid-4">
          {config.certifications.map((cert) => (
            <ProfileCard
              key={cert.title}
              title={cert.title}
              description={cert.description}
              icon={cert.icon}
              iconVariant="circle"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
