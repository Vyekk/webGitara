import { render, screen } from '@testing-library/react';
import AuthForm from './AuthForm';

jest.mock('services/UsersService', () => ({
    UsersService: jest.fn().mockImplementation(() => ({
        registerUser: jest.fn(),
    })),
}));
jest.mock('context/AuthContext', () => ({
    useAuth: () => ({ login: jest.fn() }),
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('AuthForm', () => {
    it('renderuje formularz logowania z polami Login i Hasło', () => {
        render(<AuthForm />);
        expect(screen.getByText(/Zaloguj się/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Login/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Hasło/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Zaloguj/i })).toBeInTheDocument();
    });
});
