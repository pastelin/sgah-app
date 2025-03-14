import { formatCurrency } from '../helpers';

export const AmountDisplay = ({ label, amount, isExpenseCategory }) => {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {label && `${label}:`}
            <span className={`font-black ${isExpenseCategory ? 'text-red-300' : 'text-blue-300'}`}>
				{isExpenseCategory && '-'}
                {formatCurrency(amount)}
            </span>
        </p>
    );
};
