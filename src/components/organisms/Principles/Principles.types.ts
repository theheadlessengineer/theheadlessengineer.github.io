export interface Principle {
  title: string;
  description: string;
  icon?: string;
}

export interface PrinciplesProps {
  principles: Principle[];
  className?: string;
}
