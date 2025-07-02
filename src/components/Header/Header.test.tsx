import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
    it('renderuje logo i przycisk menu', () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });
});
