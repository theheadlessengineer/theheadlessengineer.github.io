export interface ExpertiseArea {
  title: string;
  description: string;
  skills: string[];
  icon?: string;
}

export interface ExpertiseProps {
  areas: ExpertiseArea[];
  className?: string;
}
