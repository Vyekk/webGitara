import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Button/Button.module.scss';
import classNames from 'classnames';

interface IButtonProps {
    children?: ReactNode;
    href?: string;
    circle?: boolean;
    isDark?: boolean;
    transparent?: boolean;
    className?: string;
    isActive?: boolean;
    [key: string]: any;
}

const Button = ({ children, href, circle, isDark, transparent, className, isActive, ...props }: IButtonProps) => {
    const buttonClassName = classNames(
        styles.button,
        {
            [styles.buttonCircle]: circle,
            [styles.buttonTransparent]: transparent,
            [styles.buttonDark]: isDark,
            [styles.buttonActive]: isActive,
        },
        className,
    );

    if (href) {
        return (
            <Link to={href} className={buttonClassName}>
                <div className={styles.linkContentWrapper}>{children}</div>
            </Link>
        );
    }

    return (
        <button {...props} className={buttonClassName}>
            <div className={styles.buttonContentWrapper}>{children}</div>
        </button>
    );
};

export default Button;
