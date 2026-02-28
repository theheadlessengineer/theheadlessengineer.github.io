import { getAllArticles } from '@/lib/articles';

// Generate categories dynamically from articles
function getCategories() {
  const articles = getAllArticles();
  const categoryMap = new Map<string, { name: string; description: string }>();

  articles.forEach(article => {
    if (!categoryMap.has(article.category)) {
      // Convert slug to title case
      const name = article.category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      categoryMap.set(article.category, {
        name,
        description: `Articles about ${name.toLowerCase()}`,
      });
    }
  });

  return Object.fromEntries(categoryMap);
}

export const articlesConfig = {
  hero: {
    title: '$ articles',
    description: '> exploring software engineering, performance testing, and system design',
  },
  backLink: {
    text: 'Back to Articles',
  },
  get categories() {
    return getCategories();
  },
} as const;

export type ArticleCategory = string;
