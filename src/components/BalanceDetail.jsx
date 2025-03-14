import React from 'react';
import { formatCurrency } from '../hooks';

export const BalanceDetail = React.memo(({ label, saldo }) => {
    return (
        <p className="m-2 font-medium opacity-80 text-center">
            {label}:{' '}
            <span className="text-red tracking-widest">
                {formatCurrency(saldo)}
            </span>
        </p>
    );
});
