import { ProfileCard } from '@/components/molecules/ProfileCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import styles from './Principles.module.css';

export interface PrinciplesProps {
  title: string;
  description: string;
  principles: ReadonlyArray<{
    title: string;
    value: string;
    description: string;
    href: string;
  }>;
}

export function Principles({ title, description, principles }: PrinciplesProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <h2 className={styles.title}>{title}</h2> */}
          <p className={styles.description}>{description}</p>
        </div>
        <CardGrid count={principles.length}>
          {principles.map(principle => (
            <ProfileCard key={principle.title} {...principle} />
          ))}
        </CardGrid>
      </div>
    </section>
  );
}
