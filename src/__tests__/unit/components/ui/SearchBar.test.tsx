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
  });

  it('Should update input value on change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search pokemon');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input).toHaveValue('pikachu');
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
