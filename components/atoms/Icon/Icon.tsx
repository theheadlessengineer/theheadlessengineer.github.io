import styles from './Icon.module.css';

export interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps): JSX.Element {
  return (
    <span className={`${styles.icon} ${styles[size]} ${className || ''}`} aria-hidden="true">
      {name}
    </span>
  );
}
