import React, { useEffect } from 'react';
import { useSgahDetalleStore } from '../hooks';
import { WithoutInfoAlert } from '../components/alerts/WithoutInfoAlert';
import { formatCurrency } from '../helpers';
import { BalanceDetail } from '../components/details/BalanceDetail';

// Iconos para cada tipo de balance
const ICONS = {
    saldo: '/icons/income.svg',
    prestamo: '/icons/loan.svg',
    ahorro: '/icons/savings.svg',
    inversion: '/icons/investment.svg',
};

export const SgahResumenPage = () => {
    const { startDetalleResumen, resumen } = useSgahDetalleStore();
    const { montoAhorro, montoGasto, montoInversion, montoPrestamo } = resumen;

    useEffect(() => {
        startDetalleResumen();
    }, []);

    return (
        <aside
            className="detail flex-responsive-column center-x-y"
            style={{
                background: '#F8FAFB',
                minHeight: '100vh',
                padding: '2rem 0',
            }}
        >
            <h2
                style={{
                    color: '#2A64F2',
                    fontWeight: 700,
                    marginBottom: '2rem',
                }}
            >
                Resumen Financiero
            </h2>
            {!resumen || Object.keys(resumen).length === 0 ? (
                <WithoutInfoAlert />
            ) : (
                <div
                    className="balance-container"
                    style={{ width: '100%', maxWidth: 480 }}
                >
                    <BalanceDetail
                        etiqueta="Saldo Disponible"
                        monto={formatCurrency(montoGasto)}
                        icon={ICONS.saldo}
                        color="#2A64F2"
                    />
                    <BalanceDetail
                        etiqueta="Prestamos"
                        monto={formatCurrency(montoPrestamo)}
                        icon={ICONS.prestamo}
                        color="#E5484D"
                    />
                    <BalanceDetail
                        etiqueta="Ahorros Acumulados"
                        monto={formatCurrency(montoAhorro)}
                        icon={ICONS.ahorro}
                        color="#18C47C"
                    />
                    <BalanceDetail
                        etiqueta="Inversiones"
                        monto={formatCurrency(montoInversion)}
                        icon={ICONS.inversion}
                        color="#6C7A83"
                    />
                </div>
            )}
        </aside>
    );
};
