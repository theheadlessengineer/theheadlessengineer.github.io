import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('renders with correct icon name', () => {
    render(<Icon name="home" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('fa-home');
  });

  it('applies size variant', () => {
    render(<Icon name="home" size="large" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('large');
  });

  it('applies variant styles', () => {
    render(<Icon name="home" variant="circle" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('circle');
  });

  it('applies custom className', () => {
    render(<Icon name="home" className="custom-icon" />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveClass('custom-icon');
  });
});
