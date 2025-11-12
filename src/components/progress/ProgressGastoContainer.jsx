import React from 'react';
import PropTypes from 'prop-types';
import { useGastoUi, useSgahGastoStore } from '../../hooks';
import { ProgressHistoricalBalanceByMonth } from './ProgressHistoricalBalanceByMonth';
import { ProgressHistoricalBalanceByYear } from './ProgressHistoricalBalanceByYear';
import { BalanceDetail } from '../BalanceDetail';

export const ProgressGastoContainer = React.memo(({ year }) => {
    const {
        styleFlipCardHover,
        handleShowFlipCard,
        monthlyBalanceHistory,
        isHoverFlipCard,
        calcularSaldo,
    } = useGastoUi();

    const { annualBalanceHistory } = useSgahGastoStore();

    return (
        <>
            <div className={`fade-in-down ${isHoverFlipCard ? 'active' : ''}`}>
                <div className="contenedor-saldo flex-responsive-row justify-sa">
                    <BalanceDetail
                        label="Ingresos"
                        balance={calcularSaldo(monthlyBalanceHistory, 1)}
                    />
                    <BalanceDetail
                        label="Saldo Gastado"
                        balance={calcularSaldo(monthlyBalanceHistory, 2)}
                    />
                </div>

                <div className="text-center mb-05">
                    <button
                        className="btn btn-toggle"
                        onClick={() => handleShowFlipCard(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            className="bi bi-arrow-left-right svg-small"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <section
                className={`flip-container flip-card ${styleFlipCardHover}`}
            >
                <article className="progress-container box-shadow flip-face flip-front">
                    {annualBalanceHistory.map(
                        ({
                            saldoGastado,
                            month,
                            monthNumber,
                            saldoIngresado,
                        }) => (
                            <ProgressHistoricalBalanceByYear
                                key={
                                    window.crypto.getRandomValues(
                                        new Uint32Array(1)
                                    )[0]
                                }
                                label={month}
                                monthNumber={monthNumber}
                                gastos={saldoGastado}
                                ingresos={saldoIngresado}
                                year={year}
                            />
                        )
                    )}
                </article>
                <article className="progress-container box-shadow flip-face flip-back">
                    {monthlyBalanceHistory.map(
                        ({ categoria, saldoGastado, origenMovimiento }) => (
                            <ProgressHistoricalBalanceByMonth
                                key={
                                    window.crypto.getRandomValues(
                                        new Uint32Array(1)
                                    )[0]
                                }
                                label={categoria}
                                gastos={saldoGastado}
                                origenMovimiento={origenMovimiento}
                            />
                        )
                    )}
                </article>
            </section>
        </>
    );
});

ProgressGastoContainer.propTypes = {
    year: PropTypes.string.isRequired,
};
