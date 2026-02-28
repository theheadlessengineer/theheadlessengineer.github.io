import { Card } from '@/components/atoms/Card';
import styles from './ProfileCard.module.css';

export interface ProfileCardProps {
  title: string;
  value: string;
  description: string;
  href: string;
  target?: string;
}

export function ProfileCard({ title, value, description, href, target }: ProfileCardProps): JSX.Element {
  return (
    <Card href={href === '#' ? undefined : href} title={title} target={target}>
      <div className={styles.value}>$ {value}</div>
      <div className={styles.description}>&gt; {description}</div>
    </Card>
  );
}
