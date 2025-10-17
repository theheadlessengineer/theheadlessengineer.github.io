export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface MetricsProps {
  metrics: MetricItem[];
  className?: string;
}
