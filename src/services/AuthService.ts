import { AuthData, Credentials } from 'types';

export class AuthService {
    private STORAGE_KEY = 'auth';

    async login(credentials: Credentials): Promise<AuthData> {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Błąd logowania');
        }

        const data: AuthData = await response.json();
        this.saveAuth(data);
        return data;
    }

    logout(): void {
        this.clearAuth();
    }

    loadAuth(): AuthData | null {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    }

    saveAuth(auth: AuthData): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(auth));
    }

    clearAuth(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
    getToken(): string | null {
        const auth = this.loadAuth();
        return auth?.token ?? null;
    }
    getAuthHeaders() {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}
