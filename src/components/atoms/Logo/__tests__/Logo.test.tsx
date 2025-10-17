import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo', () => {
  it('renders logo text', () => {
    render(<Logo />);
    expect(screen.getByText('Headless Engineer')).toBeInTheDocument();
  });

  it('renders as link when href provided', () => {
    render(<Logo href="/" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('applies size variant', () => {
    render(<Logo size="large" />);
    const logo = screen.getByText('Headless Engineer');
    expect(logo).toHaveClass('large');
  });

  it('applies custom className', () => {
    render(<Logo className="custom-logo" />);
    const logo = screen.getByText('Headless Engineer');
    expect(logo).toHaveClass('custom-logo');
  });
});
