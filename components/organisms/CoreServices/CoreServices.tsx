import { ProfileCard } from '@/components/molecules/ProfileCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import styles from './CoreServices.module.css';

export interface CoreServicesProps {
  title: string;
  description: string;
  services: ReadonlyArray<{
    title: string;
    value: string;
    description: string;
    href: string;
  }>;
}

export function CoreServices({ title, description, services }: CoreServicesProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <h2 className={styles.title}>{title}</h2> */}
          <p className={styles.description}>{description}</p>
        </div>
        <CardGrid count={services.length}>
          {services.map(service => (
            <ProfileCard key={service.title} {...service} />
          ))}
        </CardGrid>
      </div>
    </section>
  );
}
