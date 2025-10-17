export interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  href?: string;
}

export interface ProjectShowcaseProps {
  projects: Project[];
  className?: string;
}
