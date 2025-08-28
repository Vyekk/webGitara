import { Song, Comment } from 'types';
import axios from 'axios';
import API_URL from 'config';

export class SongsService {
    async getSongById(idSong: string): Promise<Song | null> {
        try {
            const response = await axios.get<Song>(`${API_URL}/api/songs/${idSong}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania utworu:', error);
            return null;
        }
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
    async loadDeletedSongs(): Promise<Song[]> {
        try {
            const response = await axios.get<Song[]>(`${API_URL}/api/songs?deleted=true`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania piosenek:', error);
            return [];
        }
    }

    async addSong(newSong: any): Promise<void> {
        try {
            await axios.post(`${API_URL}/api/songs`, newSong, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas dodawania piosenki:', error);
            throw error;
        }
    }

    async updateSong(updatedSong: any): Promise<void> {
        try {
            await axios.put(`${API_URL}/api/songs/${updatedSong.idSong}`, updatedSong, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas aktualizacji utworu:', error);
            throw error;
        }
    }

    async deleteSongById(id: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/api/songs/${id}`, { withCredentials: true });
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
                { withCredentials: true },
            );
        } catch (error) {
            console.error('Błąd podczas dodawania komentarza:', error);
            throw error;
        }
    }

    async deleteCommentFromSong(songId: string, commentId: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/api/songs/${songId}/comments/${commentId}`, { withCredentials: true });
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
            await axios.post(`${API_URL}/api/songs/lastplayedsongs`, { idUser, idSong }, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas zapisywania ostatnio odtwarzanego utworu:', error);
            throw error;
        }
    }

    async getLastPlayedSongs(idUser: string): Promise<Song[]> {
        try {
            const response = await axios.get<Song[]>(`${API_URL}/api/songs/lastplayedsongs/${idUser}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania ostatnio odtwarzanych utworów:', error);
            return [];
        }
    }

    async rateSong(songId: string, rating: number, idUser: string): Promise<void> {
        try {
            await axios.post(`${API_URL}/api/songs/${songId}/rating`, { idUser, rating }, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas oceniania utworu:', error);
            throw error;
        }
    }

    async getSongHistoryVersions(idSong: string): Promise<{ version_number: number; edited_at: string }[]> {
        try {
            const response = await axios.get<{ version_number: number; edited_at: string }[]>(
                `${API_URL}/api/songs/${idSong}/history`,
                { withCredentials: true },
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
                { withCredentials: true },
            );
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania konkretnej wersji historii utworu:', error);
            throw error;
        }
    }

    async getAllReportedSongs(): Promise<Array<{ idSong: string }>> {
        try {
            const response = await axios.get(`${API_URL}/api/songs/reported_songs/all`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Błąd podczas pobierania wszystkich reported:', error);
            return [];
        }
    }
}
