import React, { useEffect } from 'react';
import { useSgahDetalleStore } from '../hooks';
import { PropTypes } from 'prop-types';
import { WithoutInfoAlert } from '../components/alerts/WithoutInfoAlert';
import { formatCurrency } from '../helpers';

const BalanceDetail = React.memo(({ etiqueta, monto }) => (
    <div className="balance-detail ">
        <p>{etiqueta}</p>
        <p>{monto}</p>
    </div>
));

export const SgahResumenPage = () => {
    const { startDetalleResumen, resumen } = useSgahDetalleStore();

    const { montoAhorro, montoGasto, montoInversion, montoPrestamo } = resumen;

    useEffect(() => {
        startDetalleResumen();
    }, []);

    return (
        <aside className="detail flex-responsive-column center-x-y">
            <h2>Resumen Financiero</h2>
            {!resumen || Object.keys(resumen).length === 0 ? (
                <WithoutInfoAlert />
            ) : (
                <div className="balance-container">
                    <BalanceDetail
                        etiqueta="Saldo Disponible"
                        monto={formatCurrency(montoGasto)}
                    />
                    <BalanceDetail
                        etiqueta="Prestamos"
                        monto={formatCurrency(montoPrestamo)}
                    />
                    <BalanceDetail
                        etiqueta="Ahorros Acumulados"
                        monto={formatCurrency(montoAhorro)}
                    />
                    <BalanceDetail
                        etiqueta="Inversiones"
                        monto={formatCurrency(montoInversion)}
                    />
                </div>
            )}
        </aside>
    );
};

BalanceDetail.propTypes = {
    etiqueta: PropTypes.string.isRequired,
    monto: PropTypes.string,
};
