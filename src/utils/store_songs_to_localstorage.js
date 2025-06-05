import { saveSongs, loadSongs } from 'utils/storage';

const existingSongs = loadSongs();

const songs = [
    {
        id: '1',
        songTitle: 'Hallelujah',
        author: 'Leonard Cohen',
        rating: [5, 5, 5, 5, 5],
        comments: [
            { content: 'So moving!', author: 'Ella' },
            { content: 'One of the best songs ever!', author: 'Ethan' },
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
        rating: [5, 5, 4, 5, 4],
        comments: [
            { content: 'Ikoniczny riff!', author: 'Tom' },
            { content: 'Każdy od tego zaczyna!', author: 'Anna' },
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
        rating: [5, 4, 4, 5, 4],
        comments: [
            { content: 'Mega groove!', author: 'Kate' },
            { content: 'Prosty i mocny riff!', author: 'John' },
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
        rating: [4, 4, 4, 4, 5],
        comments: [
            { content: 'Ciężki riff, klasyka!', author: 'Mike' },
            { content: 'Uwielbiam to intro', author: 'Sophie' },
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
        rating: [4, 5, 4, 5, 4],
        comments: [
            { content: 'Ikoniczny riff z lat 60.', author: 'Jack' },
            { content: 'Zawsze wpada w ucho!', author: 'Maya' },
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
        rating: [3, 3, 4, 4, 5, 5],
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
        rating: [4, 4, 4, 5, 5],
        comments: [
            { content: 'Great for beginners!', author: 'Anna' },
            { content: 'I played this as a kid!', author: 'Tom' },
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
        rating: [5, 5, 5, 4, 4],
        comments: [
            { content: 'Beethoven for beginners!', author: 'Clara' },
            { content: 'Sounds elegant even simple.', author: 'Liam' },
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
        rating: [4, 5, 4, 5, 4],
        comments: [
            { content: 'Fun and easy to learn!', author: 'Nina' },
            { content: 'My kids love it!', author: 'Jack' },
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
        rating: [4, 5, 4, 5, 4],
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
        rating: [4, 5, 4, 5, 4],
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
    const songsPlaces = [];
    songs.forEach((song) => {
        const songRatingAvg = song.rating.reduce((acc, curr) => acc + curr, 0) / song.rating.length;
        songsPlaces.push({ ...song, songRatingAvg, ratingCount: song.rating.length });
    });

    songsPlaces.sort((a, b) => {
        if (b.ratingCount === a.ratingCount) {
            if (b.songRatingAvg === a.songRatingAvg) {
                return a.songTitle.localeCompare(b.songTitle);
            }
            return b.songRatingAvg - a.songRatingAvg;
        }
        return b.ratingCount - a.ratingCount;
    });

    songsPlaces.forEach((song, index) => {
        song.place = index + 1;
    });
    if (!Array.isArray(existingSongs) || existingSongs.length === 0) {
        saveSongs(songsPlaces);
    }
})();
