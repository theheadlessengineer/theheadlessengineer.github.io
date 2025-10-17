import React from 'react';
import { geoConfig } from '@/config/seo';
import styles from './TechnicalTerm.module.css';

interface TechnicalTermProps {
  term: string;
  children: React.ReactNode;
  context?: string;
}

export const TechnicalTerm: React.FC<TechnicalTermProps> = ({ 
  term, 
  children,
  context 
}) => {
  const definition = geoConfig.technicalTerms[term.toLowerCase() as keyof typeof geoConfig.technicalTerms];
  
  return (
    <span 
      className={styles.technicalTerm}
      itemScope 
      itemType="https://schema.org/DefinedTerm"
      data-ai-context={context}
      title={definition}
    >
      <span itemProp="name">{children}</span>
      {definition && (
        <span itemProp="description" className={styles.definition}>
          {definition}
        </span>
      )}
    </span>
  );
};
