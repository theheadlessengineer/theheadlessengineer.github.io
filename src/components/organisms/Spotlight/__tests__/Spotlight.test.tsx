import { render, screen } from '@testing-library/react';
import { Spotlight } from '../Spotlight';

const mockConfig = {
  id: 'test-spotlight',
  title: 'Test Spotlight Title',
  description: 'Test spotlight description',
  image: '/test-image.jpg',
  reverse: false,
  theme: 'default' as const
};

describe('Spotlight', () => {
  it('renders title and description', () => {
    render(<Spotlight config={mockConfig} />);
    expect(screen.getByText('Test Spotlight Title')).toBeInTheDocument();
    expect(screen.getByText('Test spotlight description')).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(<Spotlight config={mockConfig} />);
    const image = screen.getByAltText('Test Spotlight Title');
    expect(image).toBeInTheDocument();
  });

  it('applies reverse layout when specified', () => {
    const reverseConfig = { ...mockConfig, reverse: true };
    render(<Spotlight config={reverseConfig} />);
    const spotlight = screen.getByText('Test Spotlight Title').closest('section');
    expect(spotlight).toHaveClass('reverse');
  });

  it('applies theme variant', () => {
    const invertConfig = { ...mockConfig, theme: 'invert' as const };
    render(<Spotlight config={invertConfig} />);
    const spotlight = screen.getByText('Test Spotlight Title').closest('section');
    expect(spotlight).toHaveClass('invert');
  });
});
