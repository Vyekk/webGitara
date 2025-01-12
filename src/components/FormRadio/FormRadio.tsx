import React from 'react';
import styles from 'components/Form/FormRadio.module.scss';

interface IRadioProps {
    name: string;
    value: string;
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ name, value, checked, ...props }: IRadioProps) => (
    <div className={styles.wrapper}>
        <input
            {...props}
            id={value}
            className={styles.radio}
            checked={checked}
            type="radio"
            value={value}
            name={name}
        />
        <label className={styles.radioLabel} htmlFor={name}>
            {value}
        </label>
    </div>
);

export default Radio;
