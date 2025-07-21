import { AuthData, Credentials } from 'types';
import API_URL from 'config';

export class AuthService {
    async login(credentials: Credentials): Promise<AuthData> {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include', // wysyła ciasteczko
        });

        if (!response.ok) {
            throw new Error('Błąd logowania');
        }

        const data: AuthData = await response.json();
        return data;
    }

    async logout(): Promise<void> {
        await fetch(`${API_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    }
}
