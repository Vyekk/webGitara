import { User } from 'types';
import axios from 'axios';
import API_URL from 'config';

export class UsersService {
    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await axios.get<{ user: User }>(`${API_URL}/api/users/me`, { withCredentials: true });
            return response.data.user;
        } catch (error) {
            return null;
        }
    }
    async loadUsers(): Promise<User[]> {
        try {
            const response = await axios.get(`${API_URL}/api/users`, { withCredentials: true });
            return response.data;
        } catch (error) {
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

    async getUserById(idUser: string): Promise<User | null> {
        try {
            const response = await axios.get<User>(`${API_URL}/api/users/${idUser}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania użytkownika:', error);
            return null;
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const response = await axios.get<User[]>(`${API_URL}/api/users`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
            return [];
        }
    }

    async updateUserFavourites(idUser: string, favourites: string[]): Promise<void> {
        try {
            await axios.put(`${API_URL}/api/users/${idUser}/favourites`, { favourites }, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas aktualizacji ulubionych:', error);
            throw error;
        }
    }

    async getUserFavourites(idUser: string): Promise<string[]> {
        try {
            const response = await axios.get<string[]>(`${API_URL}/api/users/${idUser}/favourites`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania ulubionych:', error);
            return [];
        }
    }

    async updateUserReportedSongs(idUser: string, reportedSongs: string[]): Promise<void> {
        try {
            await axios.put(
                `${API_URL}/api/users/${idUser}/reported-songs`,
                { reportedSongs },
                { withCredentials: true },
            );
        } catch (error) {
            console.error('Błąd podczas aktualizacji reportedSongs:', error);
            throw error;
        }
    }

    async getUserReportedSongs(idUser: string): Promise<string[]> {
        try {
            const response = await axios.get<string[]>(`${API_URL}/api/users/${idUser}/reported-songs`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania reportedSongs:', error);
            return [];
        }
    }

    async updateUserRole(idUser: string, role: string): Promise<void> {
        try {
            await axios.patch(`${API_URL}/api/users/${idUser}/role`, { role }, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas zmiany roli użytkownika:', error);
            throw error;
        }
    }

    async deleteUser(idUser: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/api/users/${idUser}`, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error);
            throw error;
        }
    }

    async updateUserPassword(oldPassword: string, newPassword: string): Promise<void> {
        try {
            await axios.patch(`${API_URL}/api/users/password`, { oldPassword, newPassword }, { withCredentials: true });
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
            await axios.patch(`${API_URL}/api/users/${userId}/stats`, {}, { withCredentials: true });
        } catch (error: unknown) {
            console.error('Błąd podczas aktualizacji statystyk użytkownika:', error);
        }
    }

    async updateUserSongStats(): Promise<void> {
        try {
            await axios.patch(`${API_URL}/api/users/stats`, {}, { withCredentials: true });
        } catch (error: unknown) {
            console.error('Błąd podczas aktualizacji statystyk wszystkich użytkowników:', error);
        }
    }
}
