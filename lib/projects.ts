import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { projectFrontmatterSchema, type Project, type ProjectFrontmatter } from './schemas/project';

export type { Project, ProjectFrontmatter };

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export function getAllProjects(): readonly Project[] {
  const projects: Project[] = [];

  function readProjectsRecursively(dir: string) {
    const entries = fs.readdirSync(dir);

    entries.forEach(entry => {
      const fullPath = path.join(dir, entry);

      try {
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          readProjectsRecursively(fullPath);
        } else if (entry.endsWith('.md') && !entry.endsWith('.backup')) {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          try {
            const validatedData = projectFrontmatterSchema.parse(data);
            const project = {
              ...validatedData,
              content,
            };

            if (project.published !== false) {
              projects.push(project);
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
            throw new Error(`Invalid project frontmatter in ${entry}`);
          }
        }
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
        throw error;
      }
    });
  }

  readProjectsRecursively(projectsDirectory);

  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (b.stats?.stars || 0) - (a.stats?.stars || 0);
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find(project => project.slug === slug) || null;
}

export function getProjectsByCategory(category: string): readonly Project[] {
  const projects = getAllProjects();
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
}
