const songs = [
    {
        id: 1,
        songTitle: 'Hallelujah',
        author: 'Leonard Cohen',
        rating: [5, 5, 5, 5, 5],
        comments: [
            ['So moving!', 'Ella'],
            ['One of the best songs ever!', 'Ethan'],
        ],
        bpm: 56,
        tabulature: [
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
        id: 2,
        songTitle: 'Smoke on the Water',
        author: 'Deep Purple',
        rating: [5, 5, 4, 5, 4],
        comments: [
            ['Ikoniczny riff!', 'Tom'],
            ['Każdy od tego zaczyna!', 'Anna'],
        ],
        bpm: 112,
        tabulature: [
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
        id: 3,
        songTitle: 'Seven Nation Army',
        author: 'The White Stripes',
        rating: [5, 4, 4, 5, 4],
        comments: [
            ['Mega groove!', 'Kate'],
            ['Prosty i mocny riff!', 'John'],
        ],
        bpm: 120,
        tabulature: [
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
        id: 4,
        songTitle: 'Iron Man',
        author: 'Black Sabbath',
        rating: [4, 4, 4, 4, 5],
        comments: [
            ['Ciężki riff, klasyka!', 'Mike'],
            ['Uwielbiam to intro', 'Sophie'],
        ],
        bpm: 96,
        tabulature: [
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
        id: 5,
        songTitle: 'Satisfaction',
        author: 'The Rolling Stones',
        rating: [4, 5, 4, 5, 4],
        comments: [
            ['Ikoniczny riff z lat 60.', 'Jack'],
            ['Zawsze wpada w ucho!', 'Maya'],
        ],
        bpm: 136,
        tabulature: [
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
        id: 6,
        songTitle: 'Happy Birthday',
        author: 'unknown',
        rating: [3, 3, 4, 4, 5, 5],
        liked: true,
        comments: [
            ['Great vibe!', 'Charlie'],
            ['Perfect for road trips!', 'Lily'],
        ],
        bpm: 100,
        tabulature: [
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
        id: 7,
        songTitle: 'Twinkle Twinkle Little Star',
        author: 'Traditional',
        rating: [4, 4, 4, 5, 5],
        comments: [
            ['Great for beginners!', 'Anna'],
            ['I played this as a kid!', 'Tom'],
        ],
        bpm: 90,
        tabulature: [
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
        id: 8,
        songTitle: 'Ode to Joy',
        author: 'Ludwig van Beethoven',
        rating: [5, 5, 5, 4, 4],
        comments: [
            ['Beethoven for beginners!', 'Clara'],
            ['Sounds elegant even simple.', 'Liam'],
        ],
        bpm: 92,
        tabulature: [
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
        id: 9,
        songTitle: 'Mary Had a Little Lamb',
        author: 'Traditional',
        rating: [4, 5, 4, 5, 4],
        comments: [
            ['Fun and easy to learn!', 'Nina'],
            ['My kids love it!', 'Jack'],
        ],
        bpm: 160,
        tabulature: [
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
];

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

    localStorage.setItem('songs', JSON.stringify(songsPlaces));
})();
