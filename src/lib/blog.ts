import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

// Frontmatter validation schema
interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  subcategory: string;
  tags: string[];
  author: string;
  readingTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
    ogImage: string;
  };
}

interface BlogPost extends BlogFrontmatter {
  content: string;
  htmlContent: string;
  filePath: string;
}

// Validation functions
function validateFrontmatter(frontmatter: Record<string, unknown>, filePath: string): BlogFrontmatter {
  const errors: string[] = [];

  // Required string fields
  const requiredStrings = ['title', 'slug', 'description', 'excerpt', 'publishedAt', 'updatedAt', 'category', 'subcategory', 'author'];
  requiredStrings.forEach(field => {
    if (!frontmatter[field] || typeof frontmatter[field] !== 'string' || (frontmatter[field] as string).trim() === '') {
      errors.push(`Missing or invalid ${field}`);
    }
  });

  // Validate dates
  if (frontmatter.publishedAt && !isValidDate(frontmatter.publishedAt as string)) {
    errors.push('Invalid publishedAt date format (expected YYYY-MM-DD)');
  }
  if (frontmatter.updatedAt && !isValidDate(frontmatter.updatedAt as string)) {
    errors.push('Invalid updatedAt date format (expected YYYY-MM-DD)');
  }

  // Validate tags array
  if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0) {
    errors.push('Tags must be a non-empty array');
  }

  // Validate readingTime
  if (typeof frontmatter.readingTime !== 'number' || frontmatter.readingTime <= 0) {
    errors.push('Reading time must be a positive number');
  }

  // Validate SEO object
  if (!frontmatter.seo || typeof frontmatter.seo !== 'object') {
    errors.push('SEO object is required');
  } else {
    const seo = frontmatter.seo as Record<string, unknown>;
    const seoRequiredStrings = ['metaTitle', 'metaDescription', 'canonicalUrl', 'ogImage'];
    seoRequiredStrings.forEach(field => {
      if (!seo[field] || typeof seo[field] !== 'string') {
        errors.push(`SEO ${field} is required and must be a string`);
      }
    });

    if (!Array.isArray(seo.keywords) || seo.keywords.length === 0) {
      errors.push('SEO keywords must be a non-empty array');
    }
  }

  // Validate slug format (URL-friendly)
  if (frontmatter.slug && !/^[a-z0-9-]+$/.test(frontmatter.slug as string)) {
    errors.push('Slug must contain only lowercase letters, numbers, and hyphens');
  }

  // Validate category and subcategory format
  if (frontmatter.category && !/^[a-z0-9-]+$/.test(frontmatter.category as string)) {
    errors.push('Category must contain only lowercase letters, numbers, and hyphens');
  }
  if (frontmatter.subcategory && !/^[a-z0-9-]+$/.test(frontmatter.subcategory as string)) {
    errors.push('Subcategory must contain only lowercase letters, numbers, and hyphens');
  }

  if (errors.length > 0) {
    throw new Error(`Frontmatter validation failed for ${filePath}:\n${errors.join('\n')}`);
  }

  return frontmatter as unknown as BlogFrontmatter;
}

function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// Get all markdown files recursively
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Process markdown content
async function processMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  
  return result.toString();
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const markdownFiles = getAllMarkdownFiles(BLOG_DIRECTORY);
  const posts: BlogPost[] = [];

  for (const filePath of markdownFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      // Validate frontmatter
      const validatedFrontmatter = validateFrontmatter(frontmatter, filePath);
      
      // Process markdown to HTML
      const htmlContent = await processMarkdown(content);
      
      posts.push({
        ...validatedFrontmatter,
        content,
        htmlContent,
        filePath: path.relative(BLOG_DIRECTORY, filePath)
      });
    } catch (error) {
      console.error(`Error processing blog post ${filePath}:`, error);
      // Skip invalid posts in production, throw in development
      if (process.env.NODE_ENV === 'development') {
        throw error;
      }
    }
  }

  // Sort by published date (newest first)
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string, subcategory?: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  
  return posts.filter(post => {
    if (subcategory) {
      return post.category === category && post.subcategory === subcategory;
    }
    return post.category === category;
  });
}

// Get blog categories with post counts
export async function getBlogCategories(): Promise<{ category: string; subcategory: string; count: number }[]> {
  const posts = await getAllBlogPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach(post => {
    const key = `${post.category}/${post.subcategory}`;
    categoryMap.set(key, (categoryMap.get(key) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([key, count]) => {
    const [category, subcategory] = key.split('/');
    return { category, subcategory, count };
  });
}

// Get related posts
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  
  // Filter out current post and find related by tags and category
  const relatedPosts = posts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let score = 0;
      
      // Same category/subcategory gets higher score
      if (post.category === currentPost.category) score += 3;
      if (post.subcategory === currentPost.subcategory) score += 2;
      
      // Shared tags get points
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      score += sharedTags.length;
      
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);

  return relatedPosts;
}
