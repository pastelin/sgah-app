import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Progress } from './Progress';

export const ProgressHistoricalBalanceByMonth = React.memo(
    ({ label, gastos, tipoMovimiento }) => {
        const progressColor = useMemo(() => {
            return tipoMovimiento === 1 ? 'progress-blue' : 'progress-red';
        }, [tipoMovimiento]);

        return (
            <button className="progress">
                <Progress
                    label={label}
                    value={gastos}
                    progressColor={progressColor}
                    progressMax={5000}
                />
            </button>
        );
    }
);

ProgressHistoricalBalanceByMonth.propTypes = {
    label: PropTypes.string.isRequired,
    gastos: PropTypes.number.isRequired,
    tipoMovimiento: PropTypes.number.isRequired,
};
