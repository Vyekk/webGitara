import { Song, Comment } from 'types';
import axios from 'axios';
import { AuthService } from './AuthService';
import API_URL from 'config';

export class SongsService {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    private getAuthHeaders() {
        return this.authService.getAuthHeaders();
    }

    async loadSongs(): Promise<Song[]> {
        try {
            const response = await axios.get<Song[]>(`${API_URL}/api/songs`);
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania piosenek:', error);
            return [];
        }
    }

    async addSong(newSong: any): Promise<void> {
        try {
            if (!newSong.idSong) {
                await axios.post(`${API_URL}/api/songs`, newSong, { headers: this.getAuthHeaders() });
            } else {
                await axios.put(`${API_URL}/api/songs/${newSong.idSong}`, newSong, {
                    headers: this.getAuthHeaders(),
                });
            }
        } catch (error) {
            console.error('Błąd podczas dodawania/edycji piosenki:', error);
            throw error;
        }
    }

    async updateSong(updatedSong: any): Promise<void> {
        try {
            await axios.put(`${API_URL}/api/songs/${updatedSong.idSong}`, updatedSong, {
                headers: this.getAuthHeaders(),
            });
        } catch (error) {
            console.error('Błąd podczas aktualizacji utworu:', error);
            throw error;
        }
    }

    async deleteSongById(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/api/songs/${id}`, { headers: this.getAuthHeaders() });
        } catch (error) {
            console.error('Błąd podczas usuwania piosenki:', error);
            throw error;
        }
    }

    async addCommentToSong(songId: string, comment: Comment): Promise<void> {
        try {
            await axios.post(
                `${API_URL}/api/songs/${songId}/comments`,
                {
                    idUser: comment.author.idUser,
                    content: comment.content,
                },
                {
                    headers: this.getAuthHeaders(),
                },
            );
        } catch (error) {
            console.error('Błąd podczas dodawania komentarza:', error);
            throw error;
        }
    }

    async deleteCommentFromSong(songId: string, commentId: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/api/songs/${songId}/comments/${commentId}`, {
                headers: this.getAuthHeaders(),
            });
        } catch (error) {
            console.error('Błąd podczas usuwania komentarza:', error);
            throw error;
        }
    }

    async getTopRatedSongs(): Promise<Song[]> {
        try {
            const response = await axios.get<Song[]>(`${API_URL}/api/songs/top-rated`);
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania top rated songs:', error);
            return [];
        }
    }

    async saveLastPlayedSong(idUser: string, idSong: string): Promise<void> {
        try {
            await axios.post(
                `${API_URL}/api/songs/lastplayedsongs`,
                { idUser, idSong },
                { headers: this.getAuthHeaders() },
            );
        } catch (error) {
            console.error('Błąd podczas zapisywania ostatnio odtwarzanego utworu:', error);
            throw error;
        }
    }

    async getLastPlayedSongs(idUser: string): Promise<Song[]> {
        try {
            const response = await axios.get<Song[]>(`${API_URL}/api/songs/lastplayedsongs/${idUser}`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania ostatnio odtwarzanych utworów:', error);
            return [];
        }
    }

    async rateSong(songId: string, rating: number, idUser: string): Promise<void> {
        try {
            await axios.post(
                `${API_URL}/api/songs/${songId}/rating`,
                { idUser, rating },
                { headers: this.getAuthHeaders() },
            );
        } catch (error) {
            console.error('Błąd podczas oceniania utworu:', error);
            throw error;
        }
    }

    async getSongHistoryVersions(idSong: string): Promise<{ version_number: number; edited_at: string }[]> {
        try {
            const response = await axios.get<{ version_number: number; edited_at: string }[]>(
                `${API_URL}/api/songs/${idSong}/history`,
                {
                    headers: this.getAuthHeaders(),
                },
            );
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania wersji historii utworu:', error);
            return [];
        }
    }

    async getSongHistoryVersion(idSong: string, version: string): Promise<{ tablature: any; [key: string]: any }> {
        try {
            const response = await axios.get<{ tablature: any; [key: string]: any }>(
                `${API_URL}/api/songs/${idSong}/history/${version}`,
                {
                    headers: this.getAuthHeaders(),
                },
            );
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania konkretnej wersji historii utworu:', error);
            throw error;
        }
    }

    async getAllReportedSongs(): Promise<Array<{ idSong: string }>> {
        try {
            const response = await axios.get(`${API_URL}/api/songs/reported_songs/all`, {
                headers: this.getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania wszystkich reported:', error);
            return [];
        }
    }
}
