import { Song } from 'types';

const STORAGE_KEYS = {
    SONGS: 'songs',
    IS_FRETBOARD_REVERSED: 'isFretboardReversed',
};

// SONGS
export async function loadSongs() {
    const raw = localStorage.getItem(STORAGE_KEYS.SONGS);
    return raw ? JSON.parse(raw) : [];
}

export async function saveSongs(songs: Song[]) {
    localStorage.setItem(STORAGE_KEYS.SONGS, JSON.stringify(songs));
}

// IS_FRETBOARD_REVERSED
export function loadIsFretboardReversed() {
    const raw = localStorage.getItem(STORAGE_KEYS.IS_FRETBOARD_REVERSED);
    return raw ? JSON.parse(raw) : false;
}

export function saveIsFretboardReversed(value: boolean) {
    localStorage.setItem(STORAGE_KEYS.IS_FRETBOARD_REVERSED, JSON.stringify(value));
}

export async function addSong(newSong: Song): Promise<void> {
    const songs = await loadSongs();
    const existingIndex = songs.findIndex((song: Song) => song.id === newSong.id);
    if (existingIndex !== -1) {
        songs[existingIndex] = newSong;
    } else {
        songs.push(newSong);
    }

    await saveSongs(songs);
}

type SongWithAverage = Song & { averageRating: number };

export async function getTopRatedSongs(): Promise<Song[]> {
    const songs: Song[] = await loadSongs();

    if (songs.length === 0) {
        return [];
    }

    const songsWithAvg: SongWithAverage[] = songs.map((song) => {
        const averageRating =
            song.rating.length > 0 ? song.rating.reduce((sum, rate) => sum + rate, 0) / song.rating.length : 0;

        return {
            ...song,
            averageRating,
        };
    });

    const sorted = songsWithAvg.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);

    const topSongs: Song[] = sorted.map(({ averageRating, ...song }) => song);

    return topSongs;
}

export async function deleteSongById(id: string): Promise<void> {
    const songs = await loadSongs();
    const updatedSongs = songs.filter((song: Song) => song.id !== id);
    await saveSongs(updatedSongs);
}
