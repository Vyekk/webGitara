import { useEffect, useState } from 'react';
import { Star } from 'components/Star/Star';
import styles from './Rating.module.scss';
import { Song } from 'types';
import useRequiredUser from 'utils/useRequiredUser';
import { useSongs } from 'context/SongsContext';

const Rating = ({ song, isHover }: { song: Song; isHover: boolean }) => {
    const user = useRequiredUser();
    const { rateSong } = useSongs();
    const userId = user.idUser;

    const getUserRating = () => song.rating.find((r) => r.userId === userId)?.value || 0;

    const calculateAverage = () => song.rating.reduce((sum, r) => sum + r.value, 0) / (song.rating.length || 1);

    const [userRating, setUserRating] = useState(getUserRating());
    const [average, setAverage] = useState(calculateAverage());

    useEffect(() => {
        setUserRating(getUserRating());
        setAverage(calculateAverage());
    }, [song]);

    const handleRateSong = async (rate: number) => {
        if (!userId) return;

        try {
            await rateSong(song.id, rate);
        } catch (error) {
            console.error('Błąd przy ocenianiu:', error);
        }
    };

    return (
        <div className={styles.rating}>
            {!isHover &&
                Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} fill={i + 1 <= average ? 'full' : 'none'} rating={i + 1} rateSong={handleRateSong} />
                ))}
            {isHover &&
                Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        fill={i + 1 <= userRating ? 'full' : 'none'}
                        rating={i + 1}
                        rateSong={handleRateSong}
                    />
                ))}
            <div className={styles.ratingNumber}>({average.toFixed(1)})</div>
        </div>
    );
};

export { Rating };
