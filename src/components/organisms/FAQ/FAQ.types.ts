export interface FAQItem {
  question: string;
  answer: string;
  context?: string;
}

export interface FAQProps {
  items?: FAQItem[];
  className?: string;
}
