/**
 * Utility function to conditionally join classNames
 * Filters out falsy values for clean className strings
 *
 * @example
 * ```tsx
 * cn('base', isActive && 'active', className)
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
