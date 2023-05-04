import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Button/Button.module.scss';

interface IButtonProps {
    children: ReactNode;
    href?: string;
    circle?: boolean;
    dark?: boolean;
    [key: string]: any;
}

const Button = ({ children, href, circle, dark, ...props }: IButtonProps) => {
    const buttonStyle = circle ? styles.buttonCircle : styles.button;
    const darkStyle = dark ? styles.buttonDark : '';
    return (
        <>
            {href ? (
                <Link to={href} className={buttonStyle + ' ' + darkStyle}>
                    {children}
                </Link>
            ) : (
                <button {...props} className={buttonStyle + ' ' + darkStyle}>
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;
