import React from 'react';
import { geoConfig } from '@/config/seo';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
  context?: string;
}

interface FAQProps {
  items?: FAQItem[];
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({ 
  items,
  className = '' 
}) => {
  // Use structured answers from GEO config if no items provided
  const faqItems = items || Object.entries(geoConfig.structuredAnswers).map(([question, answer]) => ({
    question,
    answer,
    context: 'headless-architecture'
  }));

  return (
    <section 
      className={`${styles.faq} ${className}`}
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className={styles.faqItem}
            itemScope 
            itemType="https://schema.org/Question"
            data-ai-context={item.context}
          >
            <h3 
              className={styles.question}
              itemProp="name"
            >
              {item.question}
            </h3>
            <div 
              className={styles.answer}
              itemScope 
              itemType="https://schema.org/Answer"
              itemProp="acceptedAnswer"
            >
              <p itemProp="text">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
