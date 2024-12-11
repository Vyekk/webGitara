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
