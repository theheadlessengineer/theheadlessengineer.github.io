import React from 'react';
import styles from './Metrics.module.css';

interface MetricItem {
  number: string;
  label: string;
  description?: string;
}

interface MetricsConfig {
  title: string;
  description: string;
  metrics: MetricItem[];
  variant?: 'default' | 'invert';
}

interface MetricsProps {
  config: MetricsConfig;
}

export const Metrics: React.FC<MetricsProps> = ({ config }) => {
  const sectionClass = config.variant === 'invert' ? 'section invert' : 'section';

  return (
    <section className={sectionClass}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>{config.title}</h2>
          <p className="major">{config.description}</p>
        </div>
        
        <div className="card-grid card-grid-4">
          {config.metrics.map((metric) => (
            <div key={metric.label} className={styles.metricItem}>
              <div className={styles.metricNumber}>{metric.number}</div>
              <p className={styles.metricLabel}>{metric.label}</p>
              {metric.description && (
                <p className={styles.metricDescription}>{metric.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
