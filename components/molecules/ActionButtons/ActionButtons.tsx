import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import styles from './ActionButtons.module.css';

export interface ActionButton {
  readonly label: string;
  readonly href: string;
  readonly variant?: 'primary' | 'secondary';
}

export interface ActionButtonsProps {
  readonly title: string;
  readonly actions: readonly ActionButton[];
}

export function ActionButtons({ title, actions }: ActionButtonsProps): JSX.Element {
  return (
    <Card title={title} className={styles.card}>
      <div className={styles.actions}>
        {actions.map(action => (
          <Button
            key={action.href}
            href={action.href}
            variant={action.variant || 'primary'}
            target="_blank"
            rel="noopener noreferrer"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
