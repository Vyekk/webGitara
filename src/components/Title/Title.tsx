import { CSSProperties, ReactNode } from 'react';
import styles from 'components/Title/Title.module.scss';

interface ITitleProps {
    children: ReactNode;
    center?: boolean;
    orange?: boolean;
    black?: boolean;
    tag?: keyof JSX.IntrinsicElements;
}

const Title = ({ children, center, tag: Tag = 'h2', orange, black }: ITitleProps) => {
    let titleStyle = orange ? styles.titleOrange : styles.title;
    titleStyle = black ? styles.titleBlack : titleStyle;
    const textCenter: CSSProperties = center ? { textAlign: 'center' } : {};
    return (
        <Tag style={textCenter} className={titleStyle}>
            {children}
        </Tag>
    );
};

export default Title;
