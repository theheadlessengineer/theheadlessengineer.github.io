import styles from './StatsGrid.module.css';

export interface StatsGridProps {
  readonly children: React.ReactNode;
}

export function StatsGrid({ children }: StatsGridProps): JSX.Element {
  return <div className={styles.infoGrid}>{children}</div>;
}
