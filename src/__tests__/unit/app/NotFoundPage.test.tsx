import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('NotFound', () => {
  it('Should display the correct info', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading');
    const p = screen.getByRole('paragraph');
    const linkToHome = screen.getByRole('link');

    expect(title).toBeInTheDocument();
    expect(p).toBeInTheDocument();
    expect(linkToHome).toBeInTheDocument();
    expect(screen.getByAltText('Not found image')).toBeInTheDocument();

    expect(title).toHaveTextContent(/Ups!/i);
    expect(p).toHaveTextContent(
      /We can not find the page you are looking for/i
    );

    expect(linkToHome).toHaveTextContent(/Return home/i);
  });
});
