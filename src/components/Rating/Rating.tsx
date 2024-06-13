import { Star } from 'components/Star/Star';
import styles from './Rating.module.scss';

const Rating = ({ rating = 0 }: { rating?: number }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
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
            <div className={styles.ratingNumber}>({rating})</div>
        </div>
    );
};

export { Rating };
