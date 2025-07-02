import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { MemoryRouter } from 'react-router-dom';

describe('Logo', () => {
    it('renderuje logo z linkiem do strony głównej', () => {
        render(
            <MemoryRouter>
                <Logo />
            </MemoryRouter>,
        );
        expect(screen.getByAltText('webGitara')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });
});
