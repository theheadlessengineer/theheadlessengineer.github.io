import { render, screen, waitFor } from '@testing-library/react';
import { ArticleContent } from '@/components/molecules/ArticleContent';

// Mock mermaid
jest.mock('mermaid', () => ({
  default: {
    initialize: jest.fn(),
    run: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock theme config
jest.mock('@/config/theme', () => ({
  theme: {
    light: {
      accent: '#83d666',
      foreground: '#141414',
      background: '#ffffff',
      tertiary: '#f0f0f0',
    },
    dark: {
      accent: '#83d666',
      foreground: '#e0e0e0',
      background: '#141414',
      tertiary: '#1e1e1e',
    },
  },
}));

describe('ArticleContent', () => {
  it('should render HTML content', () => {
    const html = '<p>Test content</p>';
    render(<ArticleContent html={html} />);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const html = '<p>Test</p>';
    const { container } = render(<ArticleContent html={html} className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should handle code blocks', async () => {
    const html = '<pre><code>const x = 1;</code></pre>';
    render(<ArticleContent html={html} />);

    await waitFor(() => {
      expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    });
  });

  it('should handle empty content', () => {
    const { container } = render(<ArticleContent html="" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle multiple paragraphs', () => {
    const html = '<p>First</p><p>Second</p><p>Third</p>';
    render(<ArticleContent html={html} />);

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
});
