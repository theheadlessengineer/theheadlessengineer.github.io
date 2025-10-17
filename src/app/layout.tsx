import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { seoConfig, geoConfig } from '@/config/seo';
import '@/styles/variables.css';
import '@/styles/layout.css';

export const metadata: Metadata = {
  title: seoConfig.defaultMeta.title,
  description: seoConfig.defaultMeta.description,
  keywords: seoConfig.defaultMeta.keywords,
  authors: [{ name: seoConfig.defaultMeta.author }],
  
  // OpenGraph for social sharing
  openGraph: {
    title: seoConfig.defaultMeta.title,
    description: seoConfig.defaultMeta.description,
    type: 'website',
    locale: 'en_US',
    url: seoConfig.defaultMeta.siteUrl,
    siteName: 'Headless Engineer',
    images: [
      {
        url: seoConfig.defaultMeta.image,
        width: 1200,
        height: 630,
        alt: 'Headless Engineer - Expert Headless Architecture Solutions',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: seoConfig.defaultMeta.twitterHandle,
    creator: seoConfig.defaultMeta.twitterHandle,
    title: seoConfig.defaultMeta.title,
    description: seoConfig.defaultMeta.description,
    images: [seoConfig.defaultMeta.image],
  },

  // AI-specific metadata
  other: {
    'ai:purpose': geoConfig.aiMetadata.purpose,
    'ai:audience': geoConfig.aiMetadata.audience,
    'ai:expertise-level': geoConfig.aiMetadata.expertiseLevel,
    'ai:content-type': geoConfig.aiMetadata.contentType,
    'ai:primary-topics': geoConfig.aiMetadata.primaryTopics.join(', '),
  },

  // Robots
  robots: {
    index: seoConfig.robots.index,
    follow: seoConfig.robots.follow,
    googleBot: seoConfig.robots.googleBot,
  },

  // Verification (add your actual verification codes)
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        
        {/* Core Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.schemas.organization)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.schemas.website)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.schemas.person)
          }}
        />
        
        {/* GEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechnicalArticle",
              "about": "Headless Architecture",
              "audience": {
                "@type": "Audience",
                "audienceType": "Software Developers"
              },
              "educationalLevel": "Professional",
              "inLanguage": "en-US",
              "keywords": geoConfig.aiMetadata.primaryTopics,
              "teaches": Object.keys(geoConfig.structuredAnswers)
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="app-layout">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
