import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Button/Button.module.scss';
import classNames from 'classnames';

interface IButtonProps {
    children: ReactNode;
    href?: string;
    circle?: boolean;
    dark?: boolean;
    transparent?: boolean;
    className?: string;
    [key: string]: any;
}

const Button = ({ children, href, circle, dark, transparent, className, ...props }: IButtonProps) => {
    const buttonClassName = classNames(
        styles.button,
        {
            [styles.buttonCircle]: circle,
            [styles.buttonTransparent]: transparent,
            [styles.buttonDark]: dark,
        },
        className,
    );

    if (href) {
        return (
            <Link to={href} className={buttonClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button {...props} className={buttonClassName}>
            {children}
        </button>
    );
};

export default Button;
