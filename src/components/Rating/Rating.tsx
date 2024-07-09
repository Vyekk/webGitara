import { Star } from 'components/Star/Star';
import styles from './Rating.module.scss';
import { useState } from 'react';

const Rating = ({ rating = [], isHover }: { rating?: number[]; isHover: boolean }) => {
    const [userRating, setUserRating] = useState(0);

    const calculateRating = (rating: number[]) => {
        return rating.reduce((a, b) => a + b, 0) / (rating.length || 1);
    };

    const [socialRating, setSocialRating] = useState(calculateRating(rating));

    const rateSong = (rate: number) => {
        setUserRating(rate);
        setSocialRating(calculateRating([...rating, rate]));
    };

    return (
        <div className={styles.rating}>
            {!isHover &&
                Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} fill={i + 1 <= socialRating ? 'full' : 'none'} rating={i + 1} rateSong={rateSong} />
                ))}
            {isHover &&
                Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} fill={i + 1 <= userRating ? 'full' : 'none'} rating={i + 1} rateSong={rateSong} />
                ))}
            <div className={styles.ratingNumber}>({socialRating.toFixed(1)})</div>
        </div>
    );
};

export { Rating };
