import React from 'react';
import styles from './Icon.module.css';

interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'default' | 'circle' | 'solid';
  type?: 'solid' | 'regular' | 'brands';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  variant = 'default',
  type = 'solid',
  className = ''
}) => {
  const iconClasses = [
    styles.icon,
    styles[size],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const iconPrefix = type === 'brands' ? 'fab' : type === 'regular' ? 'far' : 'fa';

  return (
    <span className={iconClasses}>
      <i className={`${iconPrefix} fa-${name}`} aria-hidden="true"></i>
    </span>
  );
};
