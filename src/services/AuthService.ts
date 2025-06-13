import { AuthData } from 'types';
import { STORAGE_KEYS } from './StorageService';

export class AuthService {
    loadAuth(): AuthData | null {
        const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
        return raw ? JSON.parse(raw) : null;
    }

    saveAuth(auth: AuthData): void {
        localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
    }

    clearAuth(): void {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
}
