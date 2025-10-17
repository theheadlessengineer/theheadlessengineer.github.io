import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
  title: string;
  description: string;
  icon?: string;
  iconVariant?: 'default' | 'circle' | 'solid';
  iconType?: 'solid' | 'regular' | 'brands';
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  description,
  icon,
  iconVariant = 'circle',
  iconType = 'solid',
  className = '',
  onClick,
  href
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  const cardProps = {
    className: `${styles.profileCard} ${className} ${(href || onClick) ? styles.clickable : ''}`,
    ...(href || onClick ? { onClick: handleClick } : {})
  };

  return (
    <Card {...cardProps}>
      {icon && (
        <div className={styles.iconContainer}>
          <Icon 
            name={icon} 
            size="large" 
            variant={iconVariant}
            type={iconType}
          />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
};
