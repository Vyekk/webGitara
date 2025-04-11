import React, { useEffect, useState } from 'react';
import styles from 'components/Slider/Slider.module.scss';

interface ISliderProps {
    max: number;
    value: number;
    onChange: (value: number) => void;
}

const Slider = ({ max, value: externalValue, onChange }: ISliderProps) => {
    const [value, setValue] = useState(externalValue + 1);

    useEffect(() => {
        setValue(externalValue + 1);
    }, [externalValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        onChange(newValue - 1);
    };

    return (
        <div className={styles.slider}>
            <label>
                Krok: {value}
                <input type="range" min="1" max={max} value={value} onChange={handleChange} />
            </label>
        </div>
    );
};

export default Slider;
