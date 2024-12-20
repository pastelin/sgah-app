import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Progress } from './Progress';

export const ProgressHistoricalBalanceByMonth = React.memo(
    ({ label, gastos, origenMovimiento }) => {
        const progressColor = useMemo(() => {
            return origenMovimiento === 1 ? 'progress-blue' : 'progress-red';
        }, [origenMovimiento]);

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
    origenMovimiento: PropTypes.number.isRequired,
};
