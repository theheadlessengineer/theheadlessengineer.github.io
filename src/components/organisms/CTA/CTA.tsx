import React from 'react';
import { Button } from '@/components/atoms';
import styles from './CTA.module.css';

interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'outline';
}

interface CTAConfig {
  title: string;
  description: string;
  buttons: CTAButton[];
  variant?: 'default' | 'invert';
}

interface CTAProps {
  config: CTAConfig;
}

export const CTA: React.FC<CTAProps> = ({ config }) => {
  const sectionClass = config.variant === 'invert' ? 'section invert' : 'section';

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2>{config.title}</h2>
          <p className={styles.ctaDescription}>{config.description}</p>
          <div className={styles.ctaButtons}>
            {config.buttons.map((button) => (
              <Button 
                key={button.text}
                href={button.href} 
                variant={button.variant} 
                size="large"
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
