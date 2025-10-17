export interface Certification {
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

export interface CertificationsProps {
  certifications: Certification[];
  className?: string;
}
