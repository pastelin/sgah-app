import PropTypes from 'prop-types';

import React from 'react';
import { formatCurrency } from '../hooks';

export const BalanceDetail = React.memo(({ label, balance, containerClassName, labelClassName, amountClassName }) => {
    console.log(`Renderizando BalanceDetail: ${label} - ${balance}`);
    return (
        <p className={`${containerClassName } m-2 font-medium text-center`}>
            <span className={`${labelClassName} opacity-70`}>{label}:{' '}</span>
            <span className={`${amountClassName ? amountClassName : "text-red tracking-widest opacity-80"}`}>
                {formatCurrency(balance)}
            </span>
        </p>
    );
});

BalanceDetail.propTypes = {
    label: PropTypes.string.isRequired,
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
};
