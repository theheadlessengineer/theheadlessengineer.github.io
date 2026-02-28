import { Button } from '@/components/atoms/Button';
import styles from './CTA.module.css';

export interface CTAProps {
  title: string;
  description: string;
  buttons: ReadonlyArray<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
  }>;
}

export function CTA({ title, description, buttons }: CTAProps): JSX.Element {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.buttons}>
            {buttons.map(button => (
              <Button key={button.label} variant={button.variant} href={button.href}>
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
