import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGastoUi, useSgahGastoStore } from '../../../hooks';
import { Progress } from './Progress';

export const ProgressHistoricalBalanceByYear = ({
    label,
    gastos,
    monthNumber,
    year,
    ingresos,
}) => {
    const [progressColor, setProgressColor] = useState('');
    const { gastoMensualPermitido } = useSgahGastoStore();
    const { handleShowFlipCard, startLoadingHistoricalBalanceByMonth } =
        useGastoUi();

    useEffect(() => {
        if (gastos <= gastoMensualPermitido) {
            setProgressColor('progress-blue');
        } else if (gastos >= gastoMensualPermitido && gastos < ingresos) {
            setProgressColor('progress-orange');
        } else {
            setProgressColor('progress-red');
        }
    }, [gastos, gastoMensualPermitido, ingresos]);

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
        startLoadingHistoricalBalanceByMonth(year, monthNumber);
    }, [
        startLoadingHistoricalBalanceByMonth,
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
                value={gastos}
                progressColor={progressColor}
                progressMax={33000}
            />
        </button>
    );
};

ProgressHistoricalBalanceByYear.propTypes = {
    label: PropTypes.string.isRequired,
    gastos: PropTypes.number.isRequired,
    monthNumber: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    ingresos: PropTypes.number.isRequired,
};
