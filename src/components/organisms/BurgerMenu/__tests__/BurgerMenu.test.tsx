import { render, screen, fireEvent } from '@testing-library/react';
import { BurgerMenu } from '../BurgerMenu';

// Mock navigation config
jest.mock('@/config/content', () => ({
  navigationConfig: {
    main: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' }
    ]
  }
}));

describe('BurgerMenu', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('renders burger button', () => {
    render(<BurgerMenu />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens menu when burger button is clicked', () => {
    render(<BurgerMenu />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('closes menu when close button is clicked', () => {
    render(<BurgerMenu />);
    
    // Open menu
    fireEvent.click(screen.getByRole('button'));
    
    // Close menu
    const closeButton = screen.getAllByRole('button')[1];
    fireEvent.click(closeButton);
    
    expect(document.body.style.overflow).toBe('');
  });

  it('closes menu when overlay is clicked', () => {
    render(<BurgerMenu />);
    
    // Open menu
    fireEvent.click(screen.getByRole('button'));
    
    // Click overlay
    const overlay = document.querySelector('[class*="overlay"]');
    fireEvent.click(overlay!);
    
    expect(document.body.style.overflow).toBe('');
  });

  it('closes menu when navigation link is clicked', () => {
    render(<BurgerMenu />);
    
    // Open menu
    fireEvent.click(screen.getByRole('button'));
    
    // Click navigation link
    fireEvent.click(screen.getByText('Home'));
    
    expect(document.body.style.overflow).toBe('');
  });

  it('disables body scroll when menu is open', () => {
    render(<BurgerMenu />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(document.body.style.overflow).toBe('hidden');
  });
});
