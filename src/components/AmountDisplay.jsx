import { formatCurrency } from '../helpers';

export const AmountDisplay = ({ 
    label, 
    amount, 
    isExpenseCategory,
    containerClassName = 'text-2xl font-bold',
    labelClassName = 'text-gray-400 text-sm',
    amountClassName = '',
    showNegativeSign = true
}) => {
    const defaultAmountColor = isExpenseCategory ? 'text-red-300' : 'text-blue-300';
    const finalAmountClassName = amountClassName || `font-black ${defaultAmountColor}`;

    return (
        <p className={containerClassName}>
            <span className={labelClassName}>{label && `${label} : `}</span>
            <span className={finalAmountClassName}>
				{isExpenseCategory && showNegativeSign && '-'}
                {formatCurrency(amount)}
            </span>
        </p>
    );
};
