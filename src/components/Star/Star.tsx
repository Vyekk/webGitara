import styles from './Star.module.scss';

interface StarProps {
    fill?: 'full' | 'half' | 'none';
}

const Star = ({ fill = 'none' }: StarProps) => <div className={`${styles.star} ${styles[fill]}`} />;

export { Star };
