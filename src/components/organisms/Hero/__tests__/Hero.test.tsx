import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

const mockConfig = {
  title: 'Test Hero Title',
  tagline: 'Test tagline',
  description: 'Test description',
  primaryCta: {
    text: 'Primary Button',
    href: '/primary'
  },
  secondaryCta: {
    text: 'Secondary Button',
    href: '/secondary'
  }
};

describe('Hero', () => {
  it('renders title, tagline, and description', () => {
    render(<Hero config={mockConfig} />);
    expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
    expect(screen.getByText('Test tagline')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero config={mockConfig} />);
    expect(screen.getByRole('link', { name: 'Primary Button' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Secondary Button' })).toBeInTheDocument();
  });

  it('renders only primary CTA when secondary not provided', () => {
    const configWithoutSecondary = { ...mockConfig };
    delete configWithoutSecondary.secondaryCta;
    
    render(<Hero config={configWithoutSecondary} />);
    expect(screen.getByRole('link', { name: 'Primary Button' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Secondary Button' })).not.toBeInTheDocument();
  });
});
