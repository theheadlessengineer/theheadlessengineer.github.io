'use client';

import React, { useState } from 'react';
import { Image } from '@/components/atoms/Image';
import { Icon } from '@/components/atoms/Icon';
import styles from './Gallery.module.css';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const Gallery: React.FC<GalleryProps> = ({
  items,
  columns = 3,
  className = ''
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % items.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + items.length) % items.length);
  };

  const galleryClasses = [
    styles.gallery,
    styles[`columns${columns}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <>
      <div className={galleryClasses}>
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={styles.galleryItem}
            onClick={() => openLightbox(index)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={styles.image}
              />
              <div className={styles.overlay}>
                <Icon name="search-plus" size="large" variant="default" />
              </div>
            </div>
            {item.title && (
              <div className={styles.caption}>
                <h4 className={styles.title}>{item.title}</h4>
                {item.description && (
                  <p className={styles.description}>{item.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <Icon name="times" size="large" variant="default" />
            </button>
            
            <button 
              className={styles.prevButton}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <Icon name="chevron-left" size="large" variant="default" />
            </button>
            
            <button 
              className={styles.nextButton}
              onClick={nextImage}
              aria-label="Next image"
            >
              <Icon name="chevron-right" size="large" variant="default" />
            </button>

            <div className={styles.lightboxImage}>
              <Image
                src={items[currentImage].src}
                alt={items[currentImage].alt}
                fill
                className={styles.fullImage}
                priority
              />
            </div>

            {items[currentImage].title && (
              <div className={styles.lightboxCaption}>
                <h3>{items[currentImage].title}</h3>
                {items[currentImage].description && (
                  <p>{items[currentImage].description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
