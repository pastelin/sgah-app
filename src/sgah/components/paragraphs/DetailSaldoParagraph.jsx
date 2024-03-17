import { formatCurrency } from "../../../hooks";

export const DetailSaldoParagraph = ({ label, saldo }) => {
    return (
        <p>
            {label}: <span>{formatCurrency(saldo)}</span>
        </p>
    );
};
