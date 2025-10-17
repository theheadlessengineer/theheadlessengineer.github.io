import React from 'react';
import { Image } from '@/components/atoms/Image';
import styles from './Spotlight.module.css';

interface SimpleSpotlightConfig {
  id: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  theme?: 'default' | 'invert';
}

interface SpotlightProps {
  config: SimpleSpotlightConfig;
}

export const Spotlight: React.FC<SpotlightProps> = ({ config }) => {
  const sectionClasses = [
    styles.spotlight,
    config.reverse ? styles.reverse : '',
    config.theme === 'invert' ? 'invert' : ''
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{config.title}</h2>
            <p className={styles.description}>{config.description}</p>
          </div>
          <div className={styles.imageContent}>
            <Image
              src={config.image}
              alt={config.title}
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
