import { render, screen } from '@testing-library/react';
import { PageTemplate } from '../PageTemplate';

// Mock the Header and Footer components
jest.mock('@/components/organisms', () => ({
  Header: () => <header data-testid="header">Header</header>,
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

describe('PageTemplate', () => {
  it('renders children content', () => {
    render(
      <PageTemplate>
        <div>Test content</div>
      </PageTemplate>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    render(
      <PageTemplate>
        <div>Content</div>
      </PageTemplate>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(
      <PageTemplate variant="fullwidth">
        <div>Content</div>
      </PageTemplate>
    );
    const template = screen.getByText('Content').closest('div');
    expect(template).toHaveClass('fullwidth');
  });

  it('applies custom className', () => {
    render(
      <PageTemplate className="custom-template">
        <div>Content</div>
      </PageTemplate>
    );
    const template = screen.getByText('Content').closest('div');
    expect(template).toHaveClass('custom-template');
  });
});
