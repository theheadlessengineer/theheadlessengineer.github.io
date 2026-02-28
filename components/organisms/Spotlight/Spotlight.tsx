import styles from './Spotlight.module.css';

export interface SpotlightProps {
  title: string;
  description: string;
  reversed?: boolean;
}

export function Spotlight({ title, description, reversed = false }: SpotlightProps): JSX.Element {
  return (
    <section className={styles.section} data-reversed={reversed}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}
