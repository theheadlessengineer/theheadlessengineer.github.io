import { ProfileCard } from '@/components/molecules/ProfileCard';
import { CardGrid } from '@/components/molecules/CardGrid';
import styles from './Expertise.module.css';

export interface ExpertiseProps {
  title: string;
  description: string;
  skills: ReadonlyArray<{
    title: string;
    value: string;
    description: string;
    href: string;
  }>;
}

export function Expertise({ title, description, skills }: ExpertiseProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <h2 className={styles.title}>{title}</h2> */}
          <p className={styles.description}>{description}</p>
        </div>
        <CardGrid count={skills.length}>
          {skills.map(skill => (
            <ProfileCard key={skill.title} {...skill} />
          ))}
        </CardGrid>
      </div>
    </section>
  );
}
