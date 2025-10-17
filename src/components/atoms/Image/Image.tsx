'use client';

import React, { useState } from 'react';
import NextImage from 'next/image';
import { ImageProps } from '@/types';
import styles from './Image.module.css';

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  fill = false,
  className = '',
  id
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc('/images/logo.svg');
      setHasError(true);
    }
  };

  const imageClasses = [
    styles.image,
    hasError ? styles.placeholder : '',
    className
  ].filter(Boolean).join(' ');

  if (fill) {
    return (
      <NextImage
        src={imgSrc}
        alt={hasError ? 'Site Logo' : alt}
        fill
        priority={priority}
        className={imageClasses}
        id={id}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={handleError}
      />
    );
  }

  return (
    <NextImage
      src={imgSrc}
      alt={hasError ? 'Site Logo' : alt}
      width={width || 800}
      height={height || 600}
      priority={priority}
      className={imageClasses}
      id={id}
      onError={handleError}
    />
  );
};
