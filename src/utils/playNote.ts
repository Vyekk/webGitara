import * as Tone from 'tone';

const tuning: Record<number, number> = {
    1: 64, // E4
    2: 59, // B3
    3: 55, // G3
    4: 50, // D3
    5: 45, // A2
    6: 40, // E2
};

const baseUrls: Record<number, string> = {
    1: '/samples/e1_2.mp3',
    2: '/samples/b2_2.mp3',
    3: '/samples/g3_2.mp3',
    4: '/samples/d4_2.mp3',
    5: '/samples/a5_2.mp3',
    6: '/samples/e6_2.mp3',
};

const samplers: Record<number, Tone.Sampler> = {};

export async function setupSamplePlayer() {
    await Tone.start();
    const promises = Object.entries(baseUrls).map(async ([stringNumber, url]) => {
        const midi = tuning[Number(stringNumber)];
        const note = Tone.Frequency(midi, 'midi').toNote();

        const sampler = new Tone.Sampler({
            urls: {
                [note]: url,
            },
            release: 1,
            baseUrl: '',
        }).toDestination();

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

    const note = Tone.Frequency(targetMidi, 'midi').toNote();

    sampler.triggerAttackRelease(note, durationSec);
}
