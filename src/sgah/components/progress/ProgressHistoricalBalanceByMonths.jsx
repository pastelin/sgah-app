import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGastoUi, useSgahGastoStore } from '../../../hooks';
import { Progress } from './Progress';

export const ProgressHistoricalBalanceByMonths = ({
    label,
    value,
    monthNumber,
    year,
}) => {
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
    }, [value, gastoMensualPermitido, ingresoMensual]);

    const handleKeyDown = useCallback(
        (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                handleShowFlipCard(true);
            }
        },
        []
    );

    const onClickProgress = useCallback(() => {
        handleShowFlipCard(true);
        startLoadingGastosByHistoricalMonth(year, monthNumber);
    }, [
        startLoadingGastosByHistoricalMonth,
        year,
        monthNumber,
    ]);

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

ProgressHistoricalBalanceByMonths.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    monthNumber: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
};
