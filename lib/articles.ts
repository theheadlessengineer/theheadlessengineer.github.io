import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { articleFrontmatterSchema, type Article, type ArticleFrontmatter } from './schemas/article';

export type { Article, ArticleFrontmatter };

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): readonly Article[] {
  const articles: Article[] = [];

  function readArticlesRecursively(dir: string) {
    const entries = fs.readdirSync(dir);

    entries.forEach(entry => {
      const fullPath = path.join(dir, entry);

      try {
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          readArticlesRecursively(fullPath);
        } else if (entry.endsWith('.md') && !entry.endsWith('.backup')) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          try {
            const validatedData = articleFrontmatterSchema.parse(data);
            const article = {
              ...validatedData,
              content,
            };

            if (article.published !== false) {
              articles.push(article);
            }
          } catch (error) {
            console.error(`\n❌ Validation error in ${fullPath}:`);
            if (error && typeof error === 'object' && 'issues' in error) {
              (error.issues as Array<{ path: (string | number)[]; message: string }>).forEach(
                issue => {
                  console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
                }
              );
            } else {
              console.error(error);
            }
            throw new Error(`Invalid article frontmatter in ${entry}`);
          }
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
        throw error;
      }
    });
  }

  readArticlesRecursively(articlesDirectory);

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
