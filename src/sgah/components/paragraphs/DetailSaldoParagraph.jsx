import React from 'react';
import { formatCurrency } from '../../../hooks';

const DetailSaldoParagraph = React.memo(({ label, saldo }) => {
    return (
        <p>
            {label}: <span>{formatCurrency(saldo)}</span>
        </p>
    );
});

export { DetailSaldoParagraph };