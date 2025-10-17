import { render, screen } from '@testing-library/react';
import { Image } from '../Image';

describe('Image', () => {
  it('renders with correct src and alt', () => {
    render(<Image src="/test.jpg" alt="Test image" width={100} height={100} />);
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
  });

  it('applies priority when specified', () => {
    render(<Image src="/test.jpg" alt="Test" width={100} height={100} priority />);
    const image = screen.getByAltText('Test');
    expect(image).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Image src="/test.jpg" alt="Test" width={100} height={100} className="custom-image" />);
    const image = screen.getByAltText('Test');
    expect(image).toHaveClass('custom-image');
  });
});
