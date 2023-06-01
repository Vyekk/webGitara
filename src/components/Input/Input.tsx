import styles from 'components/Input/Input.module.scss';

interface IInputProps {
    children: string;
    id: string;
    type?: string;
}

const Input = ({ children, id, type = 'text' }: IInputProps) => (
    <div className={styles.wrapper}>
        <input type={type} className={styles.input} placeholder={children} id={id} required />
    </div>
);

export default Input;
