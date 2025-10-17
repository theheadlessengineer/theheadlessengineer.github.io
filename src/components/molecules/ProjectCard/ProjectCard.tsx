import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Image } from '@/components/atoms/Image';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  src,
  alt,
  title,
  description,
  className = ''
}) => {
  return (
    <Card className={`${styles.projectCard} ${className}`}>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </Card>
  );
};
