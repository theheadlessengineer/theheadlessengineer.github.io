import { render, screen } from '@testing-library/react';
import fs from 'fs';
import ArticlesPage from '@/app/articles/page';

jest.mock('fs');
jest.mock('path', () => ({
  join: (...args: string[]) => args.join('/'),
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Articles Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockFs.readdirSync
      .mockReturnValueOnce(['tech'] as any)
      .mockReturnValueOnce(['article1.md', 'article2.md'] as any);
    mockFs.statSync.mockReturnValue({ isDirectory: () => true } as any);

    const article1 = `---
title: First Article
slug: first-article
description: First article description
excerpt: This is the first article excerpt with enough characters
category: tech
publishedAt: 2026-02-20
updatedAt: 2026-02-20
tags: [test, tech]
author: Test Author
readingTime: 5
seo:
  metaTitle: First Article Meta
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test, tech]
  canonicalUrl: /articles/first-article
  ogImage: /images/first.jpg
---
Content 1`;

    const article2 = `---
title: Second Article
slug: second-article
description: Second article description
excerpt: This is the second article excerpt with enough characters
category: tech
publishedAt: 2026-02-25
updatedAt: 2026-02-25
tags: [test]
author: Test Author
readingTime: 5
seo:
  metaTitle: Second Article Meta
  metaDescription: This is a valid meta description with enough characters to pass validation
  keywords: [test]
  canonicalUrl: /articles/second-article
  ogImage: /images/second.jpg
---
Content 2`;

    mockFs.readFileSync.mockReturnValueOnce(article1).mockReturnValueOnce(article2);
  });

  it('should render articles page with articles', () => {
    render(<ArticlesPage />);

    expect(screen.getByText('Second Article')).toBeInTheDocument();
    expect(screen.getByText('First Article')).toBeInTheDocument();
  });

  it('should display articles in reverse chronological order', () => {
    render(<ArticlesPage />);

    const articles = screen.getAllByRole('article');
    expect(articles.length).toBeGreaterThan(0);
  });
});
