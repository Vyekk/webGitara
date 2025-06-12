import storage from 'utils/storage';
import { v4 as uuidv4 } from 'uuid';

const existingSongs = storage.loadSongs();

const songs = [
    {
        id: '1',
        songTitle: 'Hallelujah',
        author: 'Leonard Cohen',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 4 },
            { userId: 4, value: 5 },
            { userId: 5, value: 4 },
        ],
        comments: [
            { content: 'Idealne do headbangingu 💀', author: { idUser: 'u012', username: 'Sara' } },
            { content: 'Dobrze się tego słucha wieczorem.', author: { idUser: 'u013', username: 'Leo' } },
        ],
        bpm: 56,
        tablature: [
            [{ guitarString: 5, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 1, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 1, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 1, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 1, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 2, duration: '8n' }],
        ],
    },
    {
        id: '2',
        songTitle: 'Smoke on the Water',
        author: 'Deep Purple',
        rating: [
            { userId: 1, value: 3 },
            { userId: 2, value: 3 },
            { userId: 3, value: 3 },
            { userId: 4, value: 3 },
            { userId: 5, value: 3 },
        ],
        comments: [
            { content: 'Ciężki riff, klasyka!', author: { idUser: 'u001', username: 'Mike' } },
            { content: 'Uwielbiam to intro', author: { idUser: 'u002', username: 'Sophie' } },
        ],
        bpm: 112,
        tablature: [
            [{ guitarString: 4, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 5, duration: '8n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 6, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 5, duration: '8n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 0, duration: '8n' }],
        ],
    },
    {
        id: '3',
        songTitle: 'Seven Nation Army',
        author: 'The White Stripes',
        rating: [
            { userId: 1, value: 2 },
            { userId: 2, value: 2 },
            { userId: 3, value: 2 },
            { userId: 4, value: 3 },
            { userId: 5, value: 2 },
        ],
        comments: [
            { content: 'Trochę za głośny gain, ale fajne.', author: { idUser: 'u011', username: 'Max' } },
            { content: 'Idealne do headbangingu 💀', author: { idUser: 'u012', username: 'Sara' } },
        ],
        bpm: 120,
        tablature: [
            [{ guitarString: 6, guitarFret: 7, duration: '4n' }],
            [{ guitarString: 6, guitarFret: 7, duration: '8n' }],
            [{ guitarString: 6, guitarFret: 10, duration: '8n' }],
            [{ guitarString: 6, guitarFret: 7, duration: '8n' }],
            [{ guitarString: 6, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 6, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 6, guitarFret: 2, duration: '4n' }],
        ],
    },
    {
        id: '4',
        songTitle: 'Iron Man',
        author: 'Black Sabbath',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 5 },
            { userId: 4, value: 5 },
            { userId: 5, value: 5 },
        ],
        comments: [
            { content: 'Uwielbiam ten motyw przewodni!', author: { idUser: 'u009', username: 'Kevin' } },
            { content: 'Świetna robota, graj więcej!', author: { idUser: 'u010', username: 'Julia' } },
        ],
        bpm: 96,
        tablature: [
            [{ guitarString: 6, guitarFret: 0, duration: '4n' }],
            [{ guitarString: 6, guitarFret: 3, duration: '4n' }],
            [{ guitarString: 5, guitarFret: 5, duration: '4n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 5, duration: '8n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 6, guitarFret: 0, duration: '4n' }],
        ],
    },
    {
        id: '5',
        songTitle: 'Satisfaction',
        author: 'The Rolling Stones',
        rating: [
            { userId: 1, value: 1 },
            { userId: 2, value: 0 },
            { userId: 3, value: 1 },
            { userId: 4, value: 1 },
            { userId: 5, value: 1 },
        ],
        comments: [
            { content: 'Intro przypomina stare Iron Maiden.', author: { idUser: 'u014', username: 'Emma' } },
            { content: 'Zrobiłem z tego swój dzwonek 😂', author: { idUser: 'u015', username: 'Daniel' } },
        ],
        bpm: 136,
        tablature: [
            [{ guitarString: 5, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 4, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 2, duration: '8n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 4, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 2, duration: '8n' }],
        ],
    },
    {
        id: '6',
        songTitle: 'Happy Birthday',
        author: 'unknown',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 5 },
            { userId: 4, value: 5 },
            { userId: 5, value: 5 },
        ],
        liked: true,
        comments: [
            { content: 'Great vibe!', author: 'Charlie' },
            { content: 'Perfect for road trips!', author: 'Lily' },
        ],
        bpm: 100,
        tablature: [
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }], // C
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }], // C
            [{ guitarString: 2, guitarFret: 3, duration: '8n' }], // D
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }], // C
            [{ guitarString: 2, guitarFret: 6, duration: '8n' }], // F
            [{ guitarString: 2, guitarFret: 5, duration: '4n' }], // E (ćwierćnuta)

            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 8, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 6, duration: '4n' }],

            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 10, duration: '8n' }], // A
            [{ guitarString: 2, guitarFret: 6, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 5, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 3, duration: '4n' }],

            [{ guitarString: 2, guitarFret: 11, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 11, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 11, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 8, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 6, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 8, duration: '4n' }],
            [{ guitarString: 2, guitarFret: 6, duration: '4n' }],
        ],
    },
    {
        id: '7',
        songTitle: 'Twinkle Twinkle Little Star',
        author: 'Traditional',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 5 },
            { userId: 4, value: 5 },
            { userId: 5, value: 5 },
        ],
        comments: [
            { content: 'Great for beginners!', author: { idUser: 1, username: 'Anna' } },
            { content: 'I played this as a kid!', author: { idUser: 2, username: 'Tom' } },
        ],
        bpm: 90,
        tablature: [
            [{ guitarString: 1, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 1, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 4, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 4, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 6, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 6, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 4, duration: '4n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 4, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 5, guitarFret: 4, duration: '4n' }],
        ],
    },
    {
        id: '8',
        songTitle: 'Ode to Joy',
        author: 'Ludwig van Beethoven',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 5 },
            { userId: 4, value: 5 },
            { userId: 5, value: 5 },
        ],
        comments: [
            { content: 'Beethoven for beginners!', author: { idUser: 3, username: 'Clara' } },
            { content: 'Sounds elegant even simple.', author: { idUser: 4, username: 'Liam' } },
        ],
        bpm: 92,
        tablature: [
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }], // Pauza – opcjonalna nuta pustej struny
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 2, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '4n' }],
            [{ rest: true, duration: '8n' }],
        ],
    },
    {
        id: '9',
        songTitle: 'Mary Had a Little Lamb',
        author: 'Traditional',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 5 },
            { userId: 4, value: 5 },
            { userId: 5, value: 5 },
        ],
        comments: [
            { content: 'Fun and easy to learn!', author: { idUser: 3, username: 'Clara' } },
            { content: 'My kids love it!', author: { idUser: 1, username: 'Anna' } },
        ],
        bpm: 160,
        tablature: [
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: -1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '8n' }],
            [{ rest: true, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 1, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 3, duration: '8n' }],
            [{ guitarString: 2, guitarFret: 3, duration: '4n' }],
        ],
    },
    {
        id: '10',
        songTitle: 'Strings test',
        author: 'Admin',
        rating: [
            { userId: 1, value: 5 },
            { userId: 2, value: 5 },
            { userId: 3, value: 5 },
            { userId: 4, value: 5 },
            { userId: 5, value: 5 },
        ],
        comments: [],
        bpm: 160,
        tablature: [
            [{ guitarString: 1, guitarFret: 0, duration: '4n' }],
            [{ guitarString: 2, guitarFret: 0, duration: '4n' }],
            [{ guitarString: 3, guitarFret: 0, duration: '4n' }],
            [{ guitarString: 4, guitarFret: 0, duration: '4n' }],
            [{ guitarString: 5, guitarFret: 0, duration: '4n' }],
            [{ guitarString: 6, guitarFret: 0, duration: '4n' }],
        ],
    },
    {
        id: '11',
        songTitle: 'Frets test',
        author: 'Admin',
        rating: [
            { userId: 1, value: 1 },
            { userId: 2, value: 0 },
            { userId: 3, value: 1 },
            { userId: 4, value: 1 },
            { userId: 5, value: 1 },
        ],
        comments: [],
        bpm: 160,
        tablature: [],
    },
];

for (let string = 1; string <= 6; string++) {
    for (let fret = 0; fret <= 24; fret++) {
        songs[10].tablature.push([
            {
                guitarString: string,
                guitarFret: fret,
                duration: '4n',
            },
        ]);
    }
}

(() => {
    if (!Array.isArray(songs) || songs.length === 0) return;
    songs.forEach((song) => {
        song.comments.forEach((comment) => {
            comment.idComment = uuidv4();
        });
    });

    const totalRatings = songs.reduce((sum, song) => sum + song.rating.length, 0);
    const totalScore = songs.reduce((sum, song) => sum + song.rating.reduce((s, r) => s + r, 0), 0);

    const globalAverage = totalRatings > 0 ? totalScore / totalRatings : 0;
    const m = totalRatings / songs.length || 1;

    const songsWithWeighted = songs.map((song) => {
        const v = song.rating.length;
        const r = v > 0 ? song.rating.reduce((a, b) => a + b, 0) / v : 0;

        const weightedScore = (v / (v + m)) * r + (m / (v + m)) * globalAverage;

        return {
            ...song,
            weightedScore,
            ratingCount: v,
        };
    });

    songsWithWeighted.sort((a, b) => {
        if (b.weightedScore === a.weightedScore) {
            return a.songTitle.localeCompare(b.songTitle);
        }
        return b.weightedScore - a.weightedScore;
    });

    songsWithWeighted.forEach((song, index) => {
        song.place = index + 1;
    });

    if (!Array.isArray(existingSongs) || existingSongs.length === 0) {
        // storage.saveSongs(songsWithWeighted);
    }
})();
