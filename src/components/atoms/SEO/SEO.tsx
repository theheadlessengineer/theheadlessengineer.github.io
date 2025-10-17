import Head from 'next/head';
import { seoConfig } from '@/config/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  schema?: object;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  schema,
  noIndex = false
}) => {
  const seo = {
    title: title || seoConfig.defaultMeta.title,
    description: description || seoConfig.defaultMeta.description,
    keywords: keywords || seoConfig.defaultMeta.keywords,
    image: image || seoConfig.defaultMeta.image,
    url: url || seoConfig.defaultMeta.siteUrl,
    author: author || seoConfig.defaultMeta.author
  };

  const fullImageUrl = seo.image.startsWith('http') 
    ? seo.image 
    : `${seoConfig.defaultMeta.siteUrl}${seo.image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      <link rel="canonical" href={seo.url} />

      {/* Robots */}
      <meta 
        name="robots" 
        content={noIndex ? 'noindex,nofollow' : 'index,follow'} 
      />
      <meta 
        name="googlebot" 
        content={noIndex ? 'noindex,nofollow' : 'index,follow,max-video-preview:-1,max-image-preview:large,max-snippet:-1'} 
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Headless Engineer" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={seoConfig.defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Article specific */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          <meta property="article:author" content={seo.author} />
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content={seo.keywords} />
        </>
      )}

      {/* Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      )}
    </Head>
  );
};
