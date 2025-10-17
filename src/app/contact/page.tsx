'use client';

import React, { useEffect } from 'react';
import { ProfileCard } from '@/components/molecules';
import { contactMethodsConfig } from '@/config/content';
import styles from './contact.module.css';

export default function ContactPage() {
  useEffect(() => {
    document.body.classList.add('contact-layout');
    return () => document.body.classList.remove('contact-layout');
  }, []);

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        <div className={styles.greeting}>
          <h1 className={styles.title}>LET&apos;S BUILD AMAZING SOLUTIONS</h1>
          <p className={styles.subtitle}>
            Ready to transform your vision into reality? I&apos;m here to help you create 
            scalable, intelligent solutions that drive real business results.
          </p>
        </div>
        
        <div className={styles.methodsGrid}>
          {contactMethodsConfig.methods.map((method) => (
            <ProfileCard
              key={method.title}
              title={method.title}
              description={method.description}
              icon={method.icon}
              iconVariant="circle"
              iconType={method.iconType}
              href={method.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
