import { Frequency, Sampler, Volume } from 'tone';

const tuning: Record<number, number> = {
    1: 64, // E4
    2: 59, // B3
    3: 55, // G3
    4: 50, // D3
    5: 45, // A2
    6: 40, // E2
};

const baseUrls: Record<number, string> = {
    1: '/samples/e1.mp3',
    2: '/samples/b2.mp3',
    3: '/samples/g3.mp3',
    4: '/samples/d4.mp3',
    5: '/samples/a5.mp3',
    6: '/samples/e6.mp3',
};

const samplers: Record<number, Sampler> = {};

export async function setupSamplePlayer(volume: Volume) {
    const promises = Object.entries(baseUrls).map(async ([stringNumber, url]) => {
        const midi = tuning[Number(stringNumber)];
        const note = Frequency(midi, 'midi').toNote();

        const sampler = new Sampler({
            urls: {
                [note]: url,
            },
            release: 1,
            baseUrl: '',
        }).connect(volume);

        samplers[Number(stringNumber)] = sampler;
    });

    await Promise.all(promises);
}

export function playNote(stringNumber: number, fret: number, durationSec: number) {
    const baseMidi = tuning[stringNumber];
    if (baseMidi === undefined) return;

    const targetMidi = baseMidi + fret;
    const sampler = samplers[stringNumber];
    if (!sampler) return;

    const note = Frequency(targetMidi, 'midi').toNote();

    sampler.triggerAttackRelease(note, durationSec);
}
