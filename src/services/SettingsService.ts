import { STORAGE_KEYS } from './StorageService';

export class SettingsService {
    loadIsFretboardReversed(): boolean {
        const raw = localStorage.getItem(STORAGE_KEYS.IS_FRETBOARD_REVERSED);
        return raw === 'true';
    }

    saveIsFretboardReversed(value: boolean): void {
        localStorage.setItem(STORAGE_KEYS.IS_FRETBOARD_REVERSED, value.toString());
    }
}
