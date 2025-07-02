import { User } from 'types';
import axios from 'axios';
import { AuthService } from './AuthService';
import API_URL from 'config';

export class UsersService {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    private getAuthHeaders() {
        return this.authService.getAuthHeaders();
    }

    async loadUsers(): Promise<User[]> {
        try {
            const response = await axios.get(`${API_URL}/api/users`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error: unknown) {
            console.error('Błąd podczas pobierania użytkowników:', error);
            return [];
        }
    }

    async registerUser(user: { username: string; password: string; email: string }) {
        try {
            await axios.post(`${API_URL}/api/users/register`, user);
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as any).response?.data?.error
            ) {
                throw new Error((error as any).response.data.error);
            } else {
                throw new Error('Coś poszło nie tak, spróbuj ponownie.');
            }
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            const response = await axios.get(`${API_URL}/api/users/${id}`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error: unknown) {
            console.error('Błąd podczas pobierania użytkownika:', error);
            return null;
        }
    }

    async updateUserPassword(oldPassword: string, newPassword: string): Promise<void> {
        try {
            await axios.put(
                `${API_URL}/api/users/password`,
                { oldPassword, newPassword },
                { headers: this.getAuthHeaders() },
            );
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as any).response?.data?.error
            ) {
                throw new Error((error as any).response.data.error);
            } else {
                throw new Error('Coś poszło nie tak, spróbuj ponownie.');
            }
        }
    }

    async updateUserStats(userId: string): Promise<void> {
        try {
            await axios.put(`${API_URL}/api/users/${userId}/stats`, null, {
                headers: this.getAuthHeaders(),
            });
        } catch (error: unknown) {
            console.error('Błąd podczas aktualizacji statystyk użytkownika:', error);
        }
    }

    async updateUserSongStats(): Promise<void> {
        try {
            await axios.put(`${API_URL}/api/users/stats/all`, null, {
                headers: this.getAuthHeaders(),
            });
        } catch (error: unknown) {
            console.error('Błąd podczas aktualizacji statystyk wszystkich użytkowników:', error);
        }
    }

    async updateUserFavourites(userId: string, favourites: string[]): Promise<void> {
        try {
            await axios.put(
                `${API_URL}/api/users/${userId}/favourites`,
                { favourites },
                {
                    headers: this.getAuthHeaders(),
                },
            );
        } catch (error: unknown) {
            console.error('Błąd podczas aktualizacji ulubionych utworów użytkownika:', error);
        }
    }

    async updateUserRole(userId: string, newRole: 'admin' | 'moderator' | 'user'): Promise<void> {
        try {
            await axios.put(
                `${API_URL}/api/users/${userId}/role`,
                { role: newRole },
                {
                    headers: this.getAuthHeaders(),
                },
            );
        } catch (error: unknown) {
            console.error('Błąd podczas zmiany roli użytkownika:', error);
            throw error;
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/api/users/${userId}`, {
                headers: this.getAuthHeaders(),
            });
        } catch (error: unknown) {
            console.error('Błąd podczas usuwania użytkownika:', error);
            throw error;
        }
    }

    async getUserFavourites(userId: string): Promise<string[]> {
        try {
            const response = await axios.get<string[]>(`${API_URL}/api/users/${userId}/favourites`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania favourites:', error);
            return [];
        }
    }
}
