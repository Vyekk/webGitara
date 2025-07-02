import { render, screen } from '@testing-library/react';
import Footer from './Footer';

it('renderuje stopkę z informacją o prawach autorskich', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
