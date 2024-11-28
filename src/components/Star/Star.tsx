import { useState } from 'react';
import styles from './Star.module.scss';

interface StarProps {
    fill?: 'full' | 'half' | 'none';
    rating: number;
    rateSong: (rate: number) => void;
}

const Star = ({ fill = 'none', rating, rateSong }: StarProps) => {
    const [songRating] = useState(rating);
    const handleRateSong = (event: React.MouseEvent) => {
        event.stopPropagation();
        rateSong(songRating);
    };
    return <div className={`${styles.star} ${styles[fill]}`} onClick={handleRateSong} />;
};

export { Star };
