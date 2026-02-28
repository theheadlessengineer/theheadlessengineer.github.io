export const notFoundConfig = {
  title: '404: Command Not Found',
  tagline: "The page you're looking for doesn't exist in this directory",
  description:
    "Looks like you've ventured into uncharted territory. The path you requested could not be found on this server.",
  buttons: [
    { label: 'Return Home', href: '/', variant: 'primary' as const },
    { label: 'Browse Articles', href: '/articles', variant: 'secondary' as const },
  ],
} as const;
