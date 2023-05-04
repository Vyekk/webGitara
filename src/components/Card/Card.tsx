import { ReactNode } from 'react';
import styles from 'components/Card/Card.module.scss';
import Title from 'components/Title/Title';

interface ICardProps {
    title: string;
    children: ReactNode;
}

const Card = ({ title, children }: ICardProps) => (
    <div className={styles.wrapper}>
        <Title tag="h2" orange>
            {title}
        </Title>
        <ul>{children}</ul>
    </div>
);

export default Card;
