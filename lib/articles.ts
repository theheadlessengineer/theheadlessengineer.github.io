import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  articleFrontmatterSchema,
  type Article,
  type ArticleFrontmatter,
} from './schemas/article';

export type { Article, ArticleFrontmatter };

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): readonly Article[] {
  const categories = fs.readdirSync(articlesDirectory);
  const articles: Article[] = [];

  categories.forEach(category => {
    const categoryPath = path.join(articlesDirectory, category);
    if (!fs.statSync(categoryPath).isDirectory()) return;

    const files = fs.readdirSync(categoryPath);
    files.forEach(file => {
      if (!file.endsWith('.md') || file.endsWith('.backup')) return;

      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      try {
        const validatedData = articleFrontmatterSchema.parse(data);
        const article = {
          ...validatedData,
          content,
        };

        // Only include published articles (default to true if not specified)
        if (article.published !== false) {
          articles.push(article);
        }
      } catch (error: any) {
        console.error(`\n❌ Validation error in ${filePath}:`);
        if (error.errors) {
          error.errors.forEach((err: any) => {
            console.error(`  - ${err.path.join('.')}: ${err.message}`);
          });
        }
        throw new Error(`Invalid article frontmatter in ${file}`);
      }
    });
  });

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export function getArticlesByCategory(category: string): readonly Article[] {
  const articles = getAllArticles();
  return articles.filter(article => article.category === category);
}
