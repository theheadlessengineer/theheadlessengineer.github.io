'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/atoms';
import styles from './Hero.module.css';

interface HeroConfig {
  title: string;
  tagline: string;
  rotatingSentences?: string[];
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

interface HeroProps {
  config: HeroConfig;
}

export const Hero: React.FC<HeroProps> = ({ config }) => {
  const sentences = config.rotatingSentences || [config.tagline];

  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSentence = sentences[currentSentenceIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentCharIndex < currentSentence.length) {
          setDisplayedText(currentSentence.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // Pause before deleting (only if multiple sentences)
          if (sentences.length > 1) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      } else {
        // Deleting
        if (currentCharIndex > 0) {
          setDisplayedText(currentSentence.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          // Move to next sentence
          setIsDeleting(false);
          setCurrentSentenceIndex(prev => (prev + 1) % sentences.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentSentenceIndex, isDeleting, sentences]);

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.tagline}>
            {displayedText}
            <span className={styles.cursor}>|</span>
          </p>
          <p className={styles.description}>{config.description}</p>
          <div className={styles.actions}>
            <Button 
              href={config.primaryCta.href}
              variant="primary"
              size="large"
              className={styles.primaryCta}
            >
              {config.primaryCta.text}
            </Button>
            {config.secondaryCta.text && (
              <Button 
                href={config.secondaryCta.href}
                variant="outline"
                size="large"
                className={styles.secondaryCta}
              >
                {config.secondaryCta.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
