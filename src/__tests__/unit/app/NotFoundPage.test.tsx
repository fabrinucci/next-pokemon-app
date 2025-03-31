import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('NotFound', () => {
  it('Should display the correct info', () => {
    render(<NotFound />);

    expect(screen.getByText('Ups!')).toBeInTheDocument();
    expect(
      screen.getByText('We can not find the page you are looking for')
    ).toBeInTheDocument();
    expect(screen.getByAltText('Not found image')).toBeInTheDocument();
  });

  it('Should have the correct href', () => {
    render(<NotFound />);

    const linkToHome = screen.getByRole('link');

    expect(linkToHome).toBeInTheDocument();
    expect(linkToHome).toHaveTextContent(/Return home/i);
    expect(linkToHome).toHaveAttribute('href', '/');
  });
});
