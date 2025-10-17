import { render, screen } from '@testing-library/react';
import { PostCard } from '../PostCard';

const mockPost = {
  slug: 'test-post',
  title: 'Test Post Title',
  excerpt: 'Test post excerpt',
  date: '2024-01-01',
  readingTime: '5 min read',
  tags: ['react', 'typescript'],
  category: 'frontend'
};

describe('PostCard', () => {
  it('renders post title and excerpt', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test post excerpt')).toBeInTheDocument();
  });

  it('renders date and reading time', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('links to post page', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/articles/test-post');
  });
});
