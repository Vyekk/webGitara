import { Song, User, Comment } from 'types';
import bcrypt from 'bcryptjs';

const STORAGE_KEYS = {
    SONGS: 'songs',
    IS_FRETBOARD_REVERSED: 'isFretboardReversed',
    AUTH: 'auth',
    USERS_KEY: 'users',
};

type SongWithAverage = Song & { averageRating: number };

export type AuthData = {
    token: string;
    user: User;
    favourites?: string[];
};

export interface IStorage {
    // Songs related methods
    loadSongs(): Promise<Song[]>;
    saveSongs(songs: Song[]): Promise<void>;
    addSong(newSong: Song): Promise<void>;
    getTopRatedSongs(): Promise<Song[]>;
    deleteSongById(id: string): Promise<void>;
    addCommentToSong(songId: string, comment: Comment): Promise<void>;
    deleteCommentFromSong(songId: string, commentId: string): Promise<void>;
    // Fretboard related methods
    loadIsFretboardReversed(): boolean;
    saveIsFretboardReversed(value: boolean): void;
    // Auth related methods
    loadAuth(): AuthData | null;
    saveAuth(auth: AuthData): void;
    clearAuth(): void;
}

export class LocalStorageImpl implements IStorage {
    async loadSongs(): Promise<Song[]> {
        const raw = localStorage.getItem(STORAGE_KEYS.SONGS);
        return raw ? JSON.parse(raw) : [];
    }

    async saveSongs(songs: Song[]): Promise<void> {
        localStorage.setItem(STORAGE_KEYS.SONGS, JSON.stringify(songs));
    }

    async addCommentToSong(songId: string, comment: Comment): Promise<void> {
        const songs = await this.loadSongs();
        const updatedSongs = songs.map((song) =>
            song.id === songId
                ? {
                      ...song,
                      comments: song.comments ? [...song.comments, comment] : [comment],
                  }
                : song,
        );
        await this.saveSongs(updatedSongs);
    }

    async deleteCommentFromSong(songId: string, commentId: string): Promise<void> {
        const songs = await this.loadSongs();
        const updatedSongs = songs.map((song) => {
            if (song.id === songId) {
                const updatedComments = song.comments?.filter((c) => c.idComment !== commentId) || [];
                return { ...song, comments: updatedComments };
            }
            return song;
        });
        await this.saveSongs(updatedSongs);
    }

    async addSong(newSong: Song): Promise<void> {
        const songs = await this.loadSongs();
        const existingIndex = songs.findIndex((song: Song) => song.id === newSong.id);
        if (existingIndex !== -1) {
            songs[existingIndex] = newSong;
        } else {
            songs.push(newSong);
        }
        await this.saveSongs(songs);
    }

    async getTopRatedSongs(): Promise<Song[]> {
        const songs: Song[] = await this.loadSongs();

        if (songs.length === 0) {
            return [];
        }

        const totalRatings = songs.reduce((sum, song) => sum + song.rating.length, 0);
        const totalAverage = songs.reduce((sum, song) => {
            return sum + song.rating.reduce((s, r) => s + r.value, 0);
        }, 0);

        const globalAverage = totalRatings > 0 ? totalAverage / totalRatings : 0;
        const m = totalRatings / songs.length;

        const songsWithWeighted: SongWithAverage[] = songs.map((song) => {
            const r =
                song.rating.length > 0
                    ? song.rating.reduce((sum, rate) => sum + rate.value, 0) / song.rating.length
                    : 0;

            const v = song.rating.length;

            const weightedScore = (v / (v + m)) * r + (m / (v + m)) * globalAverage;

            return {
                ...song,
                averageRating: weightedScore,
            };
        });

        const sorted = songsWithWeighted.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);

        const topSongs: Song[] = sorted.map(({ averageRating, ...song }) => song);

        return topSongs;
    }

    async updateUserSongStats(): Promise<void> {
        const users = this.loadUsers();
        const songs = await this.loadSongs();

        const userMap: Record<string, { total: number; count: number }> = {};

        for (const song of songs) {
            if (!song.rating || song.rating.length === 0) continue;
            const avg = song.rating.reduce((a, b) => a + b.value, 0) / song.rating.length;
            if (song.idUser !== undefined) {
                if (!userMap[song.idUser]) userMap[song.idUser] = { total: 0, count: 0 };
                userMap[song.idUser].total += avg;
                userMap[song.idUser].count += 1;
            }
        }

        const updatedUsers = users.map((user) => {
            const stats = userMap[user.idUser];
            return {
                ...user,
                average_published_song_rating: stats ? stats.total / stats.count : 0,
                number_of_ratings_received: stats ? stats.count : 0,
            };
        });

        await this.saveUsers(updatedUsers);
    }

    async deleteSongById(id: string): Promise<void> {
        const songs = await this.loadSongs();
        const updatedSongs = songs.filter((song: Song) => song.id !== id);
        await this.saveSongs(updatedSongs);
    }

    loadIsFretboardReversed(): boolean {
        const raw = localStorage.getItem(STORAGE_KEYS.IS_FRETBOARD_REVERSED);
        return raw ? JSON.parse(raw) : false;
    }

    saveIsFretboardReversed(value: boolean): void {
        localStorage.setItem(STORAGE_KEYS.IS_FRETBOARD_REVERSED, JSON.stringify(value));
    }

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

    loadUsers = (): User[] => {
        const users = localStorage.getItem(STORAGE_KEYS.USERS_KEY);
        return users ? JSON.parse(users) : [];
    };

    getUserById(idUser: string): User | undefined {
        const users = this.loadUsers();
        return users.find((user) => user.idUser === idUser);
    }

    async saveUsers(users: User[]): Promise<void> {
        localStorage.setItem(STORAGE_KEYS.USERS_KEY, JSON.stringify(users));
    }

    async updateUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        const users = this.loadUsers();
        const user = users.find((u) => u.idUser === userId);

        if (!user) {
            throw new Error('Nie znaleziono użytkownika.');
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw new Error('Stare hasło jest nieprawidłowe.');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await this.saveUsers(users);
    }

    addUser = async (user: User) => {
        const users = this.loadUsers();
        users.push(user);
        localStorage.setItem(STORAGE_KEYS.USERS_KEY, JSON.stringify(users));
    };

    findUserByCredentials = async (username: string, password: string) => {
        const users = this.loadUsers();
        const user = users.find((u) => u.username === username);

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        return passwordMatch ? user : null;
    };

    async updateUserStats(userId: string): Promise<void> {
        const users = this.loadUsers();
        const songs = await this.loadSongs();

        const user = users.find((u) => u.idUser === userId);
        if (!user) return;

        const userSongs = songs.filter((song) => song.idUser === userId);
        const allRatings = userSongs.flatMap((song) => song.rating ?? []);

        const totalRatings = allRatings.length;
        const avgRating = totalRatings > 0 ? allRatings.reduce((sum, r) => sum + r.value, 0) / totalRatings : 0;

        user.number_of_ratings_received = totalRatings;
        user.average_published_song_rating = parseFloat(avgRating.toFixed(2));

        await this.saveUsers(users);
    }
}

const storage = new LocalStorageImpl();
export default storage;
