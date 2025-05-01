const songs = [
    {
        id: 1,
        songTitle: 'Bohemian Rhapsody',
        author: 'Queen',
        rating: [5, 5, 4, 5, 5],
        comments: [
            ['Epic song!', 'James'],
            ['A classic!', 'Sophia'],
        ],
        tabulature: [],
    },
    {
        id: 2,
        songTitle: 'Imagine',
        author: 'John Lennon',
        rating: [4, 5, 5, 4, 4],
        comments: [
            ['Beautiful lyrics!', 'David'],
            ['Makes me think...', 'Laura'],
        ],
        tabulature: [],
    },
    {
        id: 3,
        songTitle: 'Like a Rolling Stone',
        author: 'Bob Dylan',
        rating: [3, 4, 5, 4, 5],
        liked: true,
        comments: [
            ['Timeless music!', 'Sam'],
            ['Great storytelling!', 'Ella'],
        ],
        tabulature: [],
    },
    {
        id: 4,
        songTitle: 'Smells Like Teen Spirit',
        author: 'Nirvana',
        rating: [5, 4, 4, 4, 3],
        comments: [
            ['Revolutionary sound!', 'Lucas'],
            ['Still rocking today!', 'Ava'],
        ],
        tabulature: [],
    },
    {
        id: 5,
        songTitle: 'Sweet Child O’ Mine',
        author: 'Guns N’ Roses',
        rating: [5, 5, 4, 4, 5],
        comments: [
            ['Guitar solo is amazing!', 'Ben'],
            ['Such a catchy song!', 'Zoe'],
        ],
        tabulature: [],
    },
    {
        id: 6,
        songTitle: 'Thriller',
        author: 'Michael Jackson',
        rating: [5, 5, 5, 4, 5],
        liked: true,
        comments: [
            ['The music video is legendary!', 'Oliver'],
            ['A masterpiece!', 'Mia'],
        ],
        tabulature: [],
    },
    {
        id: 7,
        songTitle: 'Rolling in the Deep',
        author: 'Adele',
        rating: [4, 4, 3, 4, 3],
        comments: [
            ['Such emotion in her voice!', 'Noah'],
            ['Very powerful song!', 'Isabella'],
        ],
        tabulature: [],
    },
    {
        id: 8,
        songTitle: 'Hallelujah',
        author: 'Leonard Cohen',
        rating: [5, 5, 5, 5, 5],
        comments: [
            ['So moving!', 'Ella'],
            ['One of the best songs ever!', 'Ethan'],
        ],
        tabulature: [
            [[2, 2]],
            [[5, 4]],
            [[5, 2]],
            [[4, 2]],
            [[4, 1]],
            [[2, 2]],
            [[2, 2]],
            [[1, 4]],
            [[3, 2]],
            [
                [1, 2],
                [3, 2],
                [4, 4],
                [5, 2],
            ],
            [[4, 4]],
            [[4, 2]],
            [[5, 2]],
            [[5, 2]],
            [[3, 4]],
            [[3, 1]],
            [[4, 2]],
            [[4, 1]],
            [[6, 4]],
            [[3, 2]],
            [[3, 2]],
            [[6, 1]],
        ],
    },
    {
        id: 9,
        songTitle: 'Let It Be',
        author: 'The Beatles',
        rating: [4, 4, 4, 5, 4],
        comments: [
            ['Such a peaceful song!', 'Mason'],
            ['Timeless and comforting', 'Amelia'],
        ],
        tabulature: [],
    },
    {
        id: 10,
        songTitle: 'Africa',
        author: 'Toto',
        rating: [3, 3, 4, 4, 4],
        liked: true,
        comments: [
            ['Great vibe!', 'Charlie'],
            ['Perfect for road trips!', 'Lily'],
        ],
        tabulature: [],
    },
    {
        id: 11,
        songTitle: 'Happy Birthday',
        author: 'unknown',
        rating: [3, 3, 4, 4, 5, 5],
        liked: true,
        comments: [
            ['Great vibe!', 'Charlie'],
            ['Perfect for road trips!', 'Lily'],
        ],
        tabulature: [
            [[2, 1]], // C
            [[2, 1]], // C
            [[2, 3]], // D
            [[2, 1]], // C
            [[2, 6]], // F
            [[2, 5]], // E

            [[2, 1]], // C
            [[2, 1]], // C
            [[2, 3]], // D
            [[2, 1]], // C
            [[2, 8]], // G
            [[2, 6]], // F

            [[2, 1]], // C
            [[2, 1]], // C
            [[2, 1]], // C
            [[2, 10]], // A
            [[2, 6]], // F
            [[2, 5]], // E
            [[2, 3]], // D

            [[2, 11]], // A#
            [[2, 11]], // A#
            [[2, 11]], // A#
            [[2, 8]], // G
            [[2, 6]], // F
            [[2, 8]], // G
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
