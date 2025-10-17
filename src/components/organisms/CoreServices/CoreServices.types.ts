export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

export interface CoreServicesProps {
  services: ServiceItem[];
  className?: string;
}
