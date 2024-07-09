import { useState } from 'react';
import styles from './Star.module.scss';

interface StarProps {
    fill?: 'full' | 'half' | 'none';
    rating: number;
    rateSong: (rate: number) => void;
}

const Star = ({ fill = 'none', rating, rateSong }: StarProps) => {
    const [songRating] = useState(rating);
    return <div className={`${styles.star} ${styles[fill]}`} onClick={() => rateSong(songRating)} />;
};

export { Star };
