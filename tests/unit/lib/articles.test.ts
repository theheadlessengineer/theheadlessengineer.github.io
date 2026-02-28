import fs from 'fs';
import path from 'path';
import { getAllArticles, getArticleBySlug, getArticlesByCategory } from '@/lib/articles';

jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('lib/articles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPath.join.mockImplementation((...args) => args.join('/'));
  });

  describe('getAllArticles', () => {
    it('should return all published articles sorted by date', () => {
      mockFs.readdirSync.mockReturnValueOnce(['tech'] as any);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);
      mockFs.readdirSync.mockReturnValueOnce(['article1.md', 'article2.md'] as any);

      const article1Content = `---
title: Article 1
slug: article-1
description: First article description
excerpt: First article excerpt with enough characters to pass validation
category: tech
publishedAt: 2026-02-20
updatedAt: 2026-02-20
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Article 1 Meta Title
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, article]
  canonicalUrl: /articles/article-1
  ogImage: /images/article-1.jpg
---
Content 1`;

      const article2Content = `---
title: Article 2
slug: article-2
description: Second article description
excerpt: Second article excerpt with enough characters to pass validation
category: tech
publishedAt: 2026-02-25
updatedAt: 2026-02-25
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Article 2 Meta Title
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, article]
  canonicalUrl: /articles/article-2
  ogImage: /images/article-2.jpg
---
Content 2`;

      mockFs.readFileSync
        .mockReturnValueOnce(article1Content)
        .mockReturnValueOnce(article2Content);

      const articles = getAllArticles();

      expect(articles).toHaveLength(2);
      expect(articles[0].slug).toBe('article-2');
      expect(articles[1].slug).toBe('article-1');
    });

    it('should exclude unpublished articles', () => {
      mockFs.readdirSync.mockReturnValueOnce(['tech'] as any);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);
      mockFs.readdirSync.mockReturnValueOnce(['article1.md'] as any);

      const unpublishedContent = `---
title: Unpublished Article
slug: unpublished
description: Not published article description
excerpt: Not published article excerpt with enough characters to pass validation
category: tech
publishedAt: 2026-02-20
updatedAt: 2026-02-20
published: false
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Unpublished Meta Title
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, article]
  canonicalUrl: /articles/unpublished
  ogImage: /images/unpublished.jpg
---
Content`;

      mockFs.readFileSync.mockReturnValueOnce(unpublishedContent);

      const articles = getAllArticles();

      expect(articles).toHaveLength(0);
    });

    it('should skip non-markdown files', () => {
      mockFs.readdirSync.mockReturnValueOnce(['tech'] as any);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);
      mockFs.readdirSync.mockReturnValueOnce(['article.md', 'readme.txt', 'backup.md.backup'] as any);

      const articleContent = `---
title: Article
slug: article
excerpt: Test
category: tech
publishedAt: 2026-02-20
tags: [test]
---
Content`;

      mockFs.readFileSync.mockReturnValueOnce(articleContent);

      const articles = getAllArticles();

      expect(articles).toHaveLength(1);
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
    });

    it('should throw error for invalid frontmatter', () => {
      mockFs.readdirSync.mockReturnValueOnce(['tech'] as any);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);
      mockFs.readdirSync.mockReturnValueOnce(['invalid.md'] as any);

      const invalidContent = `---
title: Missing Required Fields
---
Content`;

      mockFs.readFileSync.mockReturnValueOnce(invalidContent);

      expect(() => getAllArticles()).toThrow('Invalid article frontmatter');
    });
  });

  describe('getArticleBySlug', () => {
    beforeEach(() => {
      mockFs.readdirSync.mockReturnValueOnce(['tech'] as any);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);
      mockFs.readdirSync.mockReturnValueOnce(['article.md'] as any);

      const articleContent = `---
title: Test Article
slug: test-article
description: Test article description
excerpt: Test article excerpt with enough characters to pass validation
category: tech
publishedAt: 2026-02-20
updatedAt: 2026-02-20
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Test Article Meta Title
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, article]
  canonicalUrl: /articles/test-article
  ogImage: /images/test-article.jpg
---
Content`;

      mockFs.readFileSync.mockReturnValueOnce(content);
    });

    it('should return article by slug', () => {
      const article = getArticleBySlug('test-article');

      expect(article).not.toBeNull();
      expect(article?.slug).toBe('test-article');
      expect(article?.title).toBe('Test Article');
    });

    it('should return null for non-existent slug', () => {
      const article = getArticleBySlug('non-existent');

      expect(article).toBeNull();
    });
  });

  describe('getArticlesByCategory', () => {
    beforeEach(() => {
      mockFs.readdirSync.mockReturnValueOnce(['tech', 'design'] as any);
      mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);
      mockFs.readdirSync
        .mockReturnValueOnce(['tech1.md'] as any)
        .mockReturnValueOnce(['design1.md'] as any);

      const techContent = `---
title: Tech Article
slug: tech-article
description: Tech article description
excerpt: Tech article excerpt with enough characters to pass validation
category: tech
publishedAt: 2026-02-20
updatedAt: 2026-02-20
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Tech Article Meta Title
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, article]
  canonicalUrl: /articles/tech-article
  ogImage: /images/tech-article.jpg
---
Content`;

      const designContent = `---
title: Design Article
slug: design-article
description: Design article description
excerpt: Design article excerpt with enough characters to pass validation
category: design
publishedAt: 2026-02-20
updatedAt: 2026-02-20
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Design Article Meta Title
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, article]
  canonicalUrl: /articles/design-article
  ogImage: /images/design-article.jpg
---
Content`;

      mockFs.readFileSync.mockReturnValueOnce(techContent).mockReturnValueOnce(designContent);
    });

    it('should return articles filtered by category', () => {
      const techArticles = getArticlesByCategory('tech');

      expect(techArticles).toHaveLength(1);
      expect(techArticles[0].category).toBe('tech');
    });

    it('should return empty array for non-existent category', () => {
      const articles = getArticlesByCategory('non-existent');

      expect(articles).toHaveLength(0);
    });
  });
});
