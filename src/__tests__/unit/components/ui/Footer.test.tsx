import { Footer } from '@/components/ui/Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
  it('Should render the copyright year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} PokeBosti All rights reserved.`)
    ).toBeInTheDocument();
  });

  it('Should display correct links', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/fabrinucci');
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://linkedin.com/in/fabrinucci'
    );
    expect(contactLink).toHaveAttribute(
      'href',
      'mailto:fabrinuccidev@gmail.com'
    );
  });
});
