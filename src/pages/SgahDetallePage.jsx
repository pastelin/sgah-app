import React, { useEffect } from 'react';
import { useSgahDetalleStore } from '../hooks';
import { PropTypes } from 'prop-types';
import { WithoutInfoAlert } from '../components/alerts/WithoutInfoAlert';

const BalanceDetail = React.memo(({ etiqueta, monto }) => (
    <div className="balance-detail">
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
            <h2>Detalle de Saldos</h2>
            {!resumen || Object.keys(resumen).length === 0 ? (
                <WithoutInfoAlert />
            ) : (
                <div className="balance-container">
                    <BalanceDetail
                        etiqueta="Saldo Ahorrado"
                        monto={montoAhorro}
                    />
                    <BalanceDetail
                        etiqueta="Saldo para gastos"
                        monto={montoGasto}
                    />
                    <BalanceDetail
                        etiqueta="Saldo prestado"
                        monto={montoPrestamo}
                    />
                    <BalanceDetail
                        etiqueta="Saldo Invertido"
                        monto={montoInversion}
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
