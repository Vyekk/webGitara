import React, { useState } from 'react';
import styles from 'components/Slider/Slider.module.scss';

interface ISliderProps {
    max: number;
}

const Slider = ({ max }: ISliderProps) => {
    const [value, setValue] = useState(1); // Początkowa wartość slidera

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    return (
        <div className={styles.slider}>
            <label>
                Krok: {value}
                <input type="range" min="1" max={max + 1} value={value} onChange={handleChange} />
            </label>
        </div>
    );
};

export default Slider;
