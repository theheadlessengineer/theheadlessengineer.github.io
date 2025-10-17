import { render, screen } from '@testing-library/react';
import { ProfileCard } from '../ProfileCard';

const mockProps = {
  title: 'Test Title',
  description: 'Test description',
  icon: 'home',
  href: '/test'
};

describe('ProfileCard', () => {
  it('renders title and description', () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders as link when href provided', () => {
    render(<ProfileCard {...mockProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders icon when provided', () => {
    render(<ProfileCard {...mockProps} />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('fa-home');
  });

  it('applies icon variant', () => {
    render(<ProfileCard {...mockProps} iconVariant="circle" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('circle');
  });
});
