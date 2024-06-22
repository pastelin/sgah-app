import React, { useEffect, useState } from 'react';
import { useGastoUi, useSgahGastoStore } from '../../../hooks';
import { Progress } from './Progress';

export const ProgressHistoricalBalanceByMonths = ({ label, value, monthNumber, year }) => {
    const [progressColor, setProgressColor] = useState('');
    const { ingresoMensual, gastoMensualPermitido } = useSgahGastoStore();
    const { handleShowFlipCard, startLoadingGastosByHistoricalMonth } =
        useGastoUi();

    useEffect(() => {
        if (value >= gastoMensualPermitido && value < ingresoMensual) {
            setProgressColor('progress-orange');
        } else if (value >= ingresoMensual) {
            setProgressColor('progress-red');
        } else {
            setProgressColor('progress-blue');
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleShowFlipCard(true);
        }
    };

    const onClickProgress = () => {
        console.log('HI THERE', year, monthNumber);
        handleShowFlipCard(true);
        startLoadingGastosByHistoricalMonth(year, monthNumber);
    };

    return (
        <button
            className="progress"
            onClick={onClickProgress}
            onKeyDown={handleKeyDown}
        >
            <Progress
                label={label}
                value={value}
                progressColor={progressColor}
                progressMax={33000}
            />
        </button>
    );
};
