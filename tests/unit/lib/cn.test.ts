import { cn } from '@/lib/cn';

describe('cn', () => {
  it('should join multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('should filter out falsy values', () => {
    expect(cn('class1', false, 'class2', null, 'class3', undefined)).toBe(
      'class1 class2 class3'
    );
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
  });

  it('should return empty string for all falsy values', () => {
    expect(cn(false, null, undefined)).toBe('');
  });

  it('should handle single class name', () => {
    expect(cn('single')).toBe('single');
  });

  it('should handle empty input', () => {
    expect(cn()).toBe('');
  });
});
