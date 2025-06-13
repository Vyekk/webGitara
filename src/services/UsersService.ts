import { User } from 'types';
import { SongsService } from './SongsService';
import bcrypt from 'bcryptjs';
import { STORAGE_KEYS } from './StorageService';

export class UsersService {
    loadUsers(): User[] {
        const raw = localStorage.getItem(STORAGE_KEYS.USERS);
        return raw ? JSON.parse(raw) : [];
    }

    async saveUsers(users: User[]): Promise<void> {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    async addUser(user: User): Promise<void> {
        const users = this.loadUsers();
        if (users.some((u) => u.idUser === user.idUser)) {
            throw new Error('User with this ID already exists');
        }
        users.push(user);
        await this.saveUsers(users);
    }

    getUserById(idUser: string): User | undefined {
        const users = this.loadUsers();
        return users.find((u) => u.idUser === idUser);
    }

    async updateUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
        const users = this.loadUsers();
        const user = users.find((u) => u.idUser === userId);

        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new Error('Old password is incorrect');

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;

        await this.saveUsers(users);
    }

    async findUserByCredentials(username: string, password: string): Promise<User | null> {
        const users = this.loadUsers();
        const user = users.find((u) => u.username === username);

        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        return match ? user : null;
    }

    async updateUserStats(userId: string): Promise<void> {
        const songsService = new SongsService();
        const songs = await songsService.loadSongs();
        const users = this.loadUsers();
        const user = users.find((u) => u.idUser === userId);
        if (!user) return;

        const userSongs = songs.filter((song) => song.idUser === userId);
        let total = 0;
        let count = 0;

        for (const song of userSongs) {
            if (!song.rating || !song.rating.length) continue;
            const avg = song.rating.reduce((a, b) => a + b.value, 0) / song.rating.length;
            total += avg;
            count++;
        }

        user.average_published_song_rating = count ? total / count : 0;
        user.number_of_ratings_received = count;

        await this.saveUsers(users);
    }

    async updateUserSongStats(): Promise<void> {
        const songsService = new SongsService();
        const songs = await songsService.loadSongs();
        const users = this.loadUsers();

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
}
