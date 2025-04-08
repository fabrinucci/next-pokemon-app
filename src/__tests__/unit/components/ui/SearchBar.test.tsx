import { useRouter } from 'next/navigation';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from '@/components/ui';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchBar', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('Should render input and button correctly', () => {
    render(<SearchBar />);
    const input = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    expect(input).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Clear' })
    ).not.toBeInTheDocument();
  });

  it('Should update input value on change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search pokemon');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input).toHaveValue('pikachu');
    const clearButton = screen.getByRole('button', { name: 'Clear' });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(clearButton).not.toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('Should disable submit button when query is less than 3 characters', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search pokemon/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'ch' } });
    expect(button).toBeDisabled();
  });

  it('Should enable submit button when query is at least 3 characters', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search pokemon/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'cha' } });
    expect(button).toBeEnabled();
  });

  it('Should call router.push with correct query on submit', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search pokemon');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/search?query=charmander');
  });

  it('Should call router.push with correct query on submit', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search pokemon');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/search?query=charmander');
  });

  it('Should not call router.push if input is empty', () => {
    render(<SearchBar />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(pushMock).not.toHaveBeenCalled();
  });
});
