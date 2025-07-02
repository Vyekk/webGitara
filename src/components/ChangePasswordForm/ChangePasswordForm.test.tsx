import { render, screen } from '@testing-library/react';
import ChangePasswordForm from './ChangePasswordForm';

it('renderuje formularz zmiany hasła z polami i przyciskiem', () => {
    render(<ChangePasswordForm />);
    expect(screen.getByLabelText('Stare hasło:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nowe hasło:')).toBeInTheDocument();
    expect(screen.getByLabelText('Potwierdź nowe hasło:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Zmień hasło/i })).toBeInTheDocument();
});
