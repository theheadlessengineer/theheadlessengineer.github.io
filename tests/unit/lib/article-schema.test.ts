import { articleFrontmatterSchema, articleSeoSchema } from '@/lib/schemas/article';

describe('Article Schema', () => {
  describe('articleSeoSchema', () => {
    const validSeo = {
      metaTitle: 'Valid Meta Title',
      metaDescription: 'This is a valid meta description',
      keywords: ['test', 'article'],
      canonicalUrl: '/articles/test',
      ogImage: '/images/test.jpg',
    };

    it('should validate correct SEO data', () => {
      expect(() => articleSeoSchema.parse(validSeo)).not.toThrow();
    });

    it('should reject empty metaTitle', () => {
      expect(() => articleSeoSchema.parse({ ...validSeo, metaTitle: '' })).toThrow();
    });

    it('should reject empty metaDescription', () => {
      expect(() => articleSeoSchema.parse({ ...validSeo, metaDescription: '' })).toThrow();
    });

    it('should reject empty keywords array', () => {
      expect(() => articleSeoSchema.parse({ ...validSeo, keywords: [] })).toThrow();
    });

    it('should reject too many keywords', () => {
      expect(() =>
        articleSeoSchema.parse({
          ...validSeo,
          keywords: Array(11).fill('keyword'),
        })
      ).toThrow();
    });

    it('should accept URL for canonicalUrl', () => {
      expect(() =>
        articleSeoSchema.parse({
          ...validSeo,
          canonicalUrl: 'https://example.com/article',
        })
      ).not.toThrow();
    });

    it('should accept URL for ogImage', () => {
      expect(() =>
        articleSeoSchema.parse({
          ...validSeo,
          ogImage: 'https://example.com/image.jpg',
        })
      ).not.toThrow();
    });
  });

  describe('articleFrontmatterSchema', () => {
    const validFrontmatter = {
      title: 'Valid Article Title',
      slug: 'valid-article-slug',
      description: 'This is a valid description with enough characters',
      excerpt:
        'This is a valid excerpt with enough characters to pass the minimum length validation',
      publishedAt: '2026-02-20',
      updatedAt: '2026-02-25',
      category: 'tech',
      tags: ['test', 'article'],
      author: 'Test Author',
      readingTime: 5,
      seo: {
        metaTitle: 'Valid Meta Title',
        metaDescription:
          'This is a valid meta description with enough characters to pass validation',
        keywords: ['test', 'article'],
        canonicalUrl: '/articles/test',
        ogImage: '/images/test.jpg',
      },
    };

    it('should validate correct frontmatter', () => {
      expect(() => articleFrontmatterSchema.parse(validFrontmatter)).not.toThrow();
    });

    it('should reject invalid slug format', () => {
      expect(() =>
        articleFrontmatterSchema.parse({
          ...validFrontmatter,
          slug: 'Invalid Slug!',
        })
      ).toThrow();
    });

    it('should reject invalid date format', () => {
      expect(() =>
        articleFrontmatterSchema.parse({
          ...validFrontmatter,
          publishedAt: '2026/02/20',
        })
      ).toThrow();
    });

    it('should reject negative readingTime', () => {
      expect(() =>
        articleFrontmatterSchema.parse({
          ...validFrontmatter,
          readingTime: -5,
        })
      ).toThrow();
    });

    it('should default published to true', () => {
      const result = articleFrontmatterSchema.parse(validFrontmatter);
      expect(result.published).toBe(true);
    });

    it('should accept published: false', () => {
      const result = articleFrontmatterSchema.parse({
        ...validFrontmatter,
        published: false,
      });
      expect(result.published).toBe(false);
    });

    it('should accept optional subcategory', () => {
      expect(() =>
        articleFrontmatterSchema.parse({
          ...validFrontmatter,
          subcategory: 'frontend',
        })
      ).not.toThrow();
    });

    it('should reject too many tags', () => {
      expect(() =>
        articleFrontmatterSchema.parse({
          ...validFrontmatter,
          tags: Array(11).fill('tag'),
        })
      ).toThrow();
    });

    it('should reject empty tags array', () => {
      expect(() =>
        articleFrontmatterSchema.parse({
          ...validFrontmatter,
          tags: [],
        })
      ).toThrow();
    });
  });
});
