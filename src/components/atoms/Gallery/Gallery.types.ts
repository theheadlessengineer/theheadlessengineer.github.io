export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  columns?: number;
  className?: string;
}
