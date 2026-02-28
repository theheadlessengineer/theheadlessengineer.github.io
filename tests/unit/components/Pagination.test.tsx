import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/atoms/Pagination';

describe('Pagination', () => {
  it('should not render when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} basePath="/articles/page" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render page numbers', () => {
    render(<Pagination currentPage={2} totalPages={5} basePath="/articles/page" />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('[2]')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should mark current page with brackets', () => {
    render(<Pagination currentPage={3} totalPages={5} basePath="/articles/page" />);

    const currentPage = screen.getByText('[3]');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('should show prev link when not on first page', () => {
    render(<Pagination currentPage={2} totalPages={5} basePath="/articles/page" />);

    const prevLink = screen.getByRole('link', { name: /prev/i });
    expect(prevLink).toBeInTheDocument();
    expect(prevLink).toHaveAttribute('href', '/articles');
  });

  it('should not show prev link on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} basePath="/articles/page" />);

    expect(screen.queryByRole('link', { name: /prev/i })).not.toBeInTheDocument();
  });

  it('should show next link when not on last page', () => {
    render(<Pagination currentPage={2} totalPages={5} basePath="/articles/page" />);

    const nextLink = screen.getByRole('link', { name: /next/i });
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute('href', '/articles/page/3');
  });

  it('should not show next link on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} basePath="/articles/page" />);

    expect(screen.queryByRole('link', { name: /next/i })).not.toBeInTheDocument();
  });

  it('should generate correct URLs for articles page', () => {
    render(<Pagination currentPage={2} totalPages={3} basePath="/articles/page" />);

    expect(screen.getByText('1')).toHaveAttribute('href', '/articles');
    expect(screen.getByText('3')).toHaveAttribute('href', '/articles/page/3');
  });

  it('should generate correct URLs for query-based pagination', () => {
    render(<Pagination currentPage={2} totalPages={3} basePath="/search" />);

    expect(screen.getByText('1')).toHaveAttribute('href', '/search?page=1');
    expect(screen.getByText('3')).toHaveAttribute('href', '/search?page=3');
  });
});
