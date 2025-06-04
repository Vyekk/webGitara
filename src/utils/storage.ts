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
    songs.push(newSong);
    await saveSongs(songs);
}
