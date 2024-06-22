import React from 'react';
import { formatCurrency } from '../../../hooks';

export const Progress = ({label, value, progressColor, progressMax}) => {
    return (
        <>
            <p>
                <b>{label}</b>
                <b>{formatCurrency(+value)}</b>
            </p>
            <progress
                className={progressColor}
                value={value}
                min="0"
                max={progressMax}
            ></progress>
        </>
    );
};
