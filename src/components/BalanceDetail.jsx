import PropTypes from 'prop-types';

import React from 'react';
import { formatCurrency } from '../hooks';

export const BalanceDetail = React.memo(({ label, balance }) => {
    console.log(`Renderizando BalanceDetail: ${label} - ${balance}`);
    return (
        <p className="m-2 font-medium opacity-80 text-center">
            {label}:{' '}
            <span className="text-red tracking-widest">
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
