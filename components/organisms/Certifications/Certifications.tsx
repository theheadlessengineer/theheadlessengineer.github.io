import { ProfileCard } from '@/components/molecules/ProfileCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import styles from './Certifications.module.css';

export interface CertificationsProps {
  title: string;
  description: string;
  certifications: ReadonlyArray<{
    title: string;
    value: string;
    description: string;
    href: string;
  }>;
}

export function Certifications({
  title,
  description,
  certifications,
}: CertificationsProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <h2 className={styles.title}>{title}</h2> */}
          <p className={styles.description}>{description}</p>
        </div>
        <CardGrid count={certifications.length}>
          {certifications.map(cert => (
            <ProfileCard key={cert.title} {...cert} />
          ))}
        </CardGrid>
      </div>
    </section>
  );
}
