import { render, screen, fireEvent } from '@testing-library/react';
import MyPaginator from './MyPaginator';

describe('MyPaginator', () => {
  const onPageChangeMock = jest.fn();

  afterEach(() => {
    onPageChangeMock.mockClear();
  });

  it('renders with required props', () => {
    render(<MyPaginator pageCount={10} onPageChange={onPageChangeMock} currentPage={1} />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  it('displays the correct number of pages', () => {
    render(<MyPaginator pageCount={10} onPageChange={onPageChangeMock} currentPage={1} />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveAttribute('aria-label', 'pagination navigation');
    expect(screen.getAllByRole('button')).toHaveLength(10);
  });

  it('calls onPageChange when a page is clicked', () => {
    render(<MyPaginator pageCount={10} onPageChange={onPageChangeMock} currentPage={1} />);
    const secondPageButton = screen.getByRole('button', { name: 'Go to page 2' });
    fireEvent.click(secondPageButton);
    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(expect.any(Object), 2);
  });
});
