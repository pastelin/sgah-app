import React, { useEffect, useState } from 'react';
import { Progress } from './Progress';

export const ProgressHistoricalBalanceByMonth = ({
    label,
    value,
    tipoMovimiento,
}) => {
    const [progressColor, setProgressColor] = useState('');

    useEffect(() => {
        if (tipoMovimiento === 1) {
            setProgressColor('progress-blue');
        } else {
            setProgressColor('progress-red');
        }
    }, []);

    return (
        <button className="progress">
            <Progress
                label={label}
                value={value}
                progressColor={progressColor}
                progressMax={5000}
            />
        </button>
    );
};
