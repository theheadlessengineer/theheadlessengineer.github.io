import React from 'react';
import Link from 'next/link';
import styles from './Card.module.css';

interface BaseCardProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<BaseCardProps> = ({
  href,
  onClick,
  className = '',
  children
}) => {
  const cardClasses = `${styles.card} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={cardClasses} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};
