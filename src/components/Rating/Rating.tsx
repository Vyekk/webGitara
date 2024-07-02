import { Star } from 'components/Star/Star';
import styles from './Rating.module.scss';

const Rating = ({ rating = [] }: { rating?: number[] }) => {
    const songRating = rating.reduce((a, b) => a + b, 0) / (rating.length || 1);
    const fullStars = Math.floor(songRating);
    const halfStars = songRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className={styles.rating}>
            {Array(fullStars)
                .fill(null)
                .map((_, i) => (
                    <Star key={`full-${i}`} fill="full" />
                ))}
            {Array(halfStars)
                .fill(null)
                .map((_, i) => (
                    <Star key={`half-${i}`} fill="half" />
                ))}
            {Array(emptyStars)
                .fill(null)
                .map((_, i) => (
                    <Star key={`empty-${i}`} fill="none" />
                ))}
            <div className={styles.ratingNumber}>({songRating.toFixed(1)})</div>
        </div>
    );
};

export { Rating };
