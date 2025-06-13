import { Song, Comment, LastPlayedEntry } from 'types';
import { STORAGE_KEYS } from './StorageService';

export class SongsService {
    async loadSongs(): Promise<Song[]> {
        const raw = localStorage.getItem(STORAGE_KEYS.SONGS);
        return raw ? JSON.parse(raw) : [];
    }

    async saveSongs(songs: Song[]): Promise<void> {
        localStorage.setItem(STORAGE_KEYS.SONGS, JSON.stringify(songs));
    }

    async addSong(newSong: Song): Promise<void> {
        const songs = await this.loadSongs();
        const index = songs.findIndex((s) => s.id === newSong.id);
        if (index !== -1) {
            songs[index] = newSong;
        } else {
            songs.push(newSong);
        }
        await this.saveSongs(songs);
    }

    async deleteSongById(id: string): Promise<void> {
        const songs = await this.loadSongs();
        const updated = songs.filter((song) => song.id !== id);
        await this.saveSongs(updated);
    }

    async addCommentToSong(songId: string, comment: Comment): Promise<void> {
        const songs = await this.loadSongs();
        const updated = songs.map((song) =>
            song.id === songId ? { ...song, comments: song.comments ? [...song.comments, comment] : [comment] } : song,
        );
        await this.saveSongs(updated);
    }

    async deleteCommentFromSong(songId: string, commentId: string): Promise<void> {
        const songs = await this.loadSongs();
        const updated = songs.map((song) => {
            if (song.id === songId) {
                const filteredComments = song.comments?.filter((c) => c.idComment !== commentId) || [];
                return { ...song, comments: filteredComments };
            }
            return song;
        });
        await this.saveSongs(updated);
    }

    async getTopRatedSongs(): Promise<Song[]> {
        const songs = await this.loadSongs();
        if (!songs.length) return [];

        const totalRatings = songs.reduce((sum, song) => sum + song.rating.length, 0);
        const totalAverage = songs.reduce((sum, song) => sum + song.rating.reduce((s, r) => s + r.value, 0), 0);
        const globalAverage = totalRatings > 0 ? totalAverage / totalRatings : 0;
        const m = totalRatings / songs.length;

        const weightedSongs = songs.map((song) => {
            const r =
                song.rating.length > 0
                    ? song.rating.reduce((sum, rate) => sum + rate.value, 0) / song.rating.length
                    : 0;
            const v = song.rating.length;
            const weightedScore = (v / (v + m)) * r + (m / (v + m)) * globalAverage;

            return { ...song, averageRating: weightedScore };
        });

        weightedSongs.sort((a, b) => b.averageRating - a.averageRating);

        const updatedSongs: Song[] = weightedSongs.map((song, idx) => ({
            ...song,
            place: idx < 3 ? idx + 1 : 0,
        }));

        await this.saveSongs(updatedSongs);
        return updatedSongs.filter((s) => s.place > 0);
    }

    async saveLastPlayedSong(idUser: string, idSong: string): Promise<void> {
        const raw = localStorage.getItem(STORAGE_KEYS.LAST_PLAYED_SONGS);
        let history: LastPlayedEntry[] = raw ? JSON.parse(raw) : [];

        history = history.filter((e) => !(e.idUser === idUser && e.idSong === idSong));

        history.unshift({ idUser, idSong, lastPlayed: new Date().toISOString() });

        const userEntries = history.filter((e) => e.idUser === idUser).slice(0, 3);
        const others = history.filter((e) => e.idUser !== idUser);

        localStorage.setItem(STORAGE_KEYS.LAST_PLAYED_SONGS, JSON.stringify([...userEntries, ...others]));
    }

    async getLastPlayedSongs(idUser: string): Promise<Song[]> {
        const raw = localStorage.getItem(STORAGE_KEYS.LAST_PLAYED_SONGS);
        const history: LastPlayedEntry[] = raw ? JSON.parse(raw) : [];

        const lastPlayedIds = history
            .filter((e) => e.idUser === idUser)
            .sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime())
            .slice(0, 3)
            .map((e) => e.idSong);

        const songs = await this.loadSongs();
        return lastPlayedIds.map((id) => songs.find((s) => s.id === id)).filter(Boolean) as Song[];
    }
}
