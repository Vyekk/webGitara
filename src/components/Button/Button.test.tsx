import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import { MemoryRouter } from 'react-router-dom';

// Test renderowania zwykłego buttona
it('renderuje button z tekstem', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
});

// Test renderowania jako Link
it('renderuje button jako Link, jeśli podano href', () => {
    render(
        <MemoryRouter>
            <Button href="/test">Link</Button>
        </MemoryRouter>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Link');
});

// Test obsługi kliknięcia
it('wywołuje onClick po kliknięciu', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Kliknij</Button>);
    fireEvent.click(screen.getByText('Kliknij'));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
