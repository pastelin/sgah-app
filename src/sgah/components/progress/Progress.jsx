import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../hooks';

export const Progress = React.memo(
    ({ label, value, progressColor, progressMax }) => {
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
    }
);

Progress.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    progressColor: PropTypes.string,
    progressMax: PropTypes.number,
};

Progress.defaultProps = {
    progressColor: 'defaultColor', // Asumiendo un valor por defecto como ejemplo
    progressMax: 100,
};
